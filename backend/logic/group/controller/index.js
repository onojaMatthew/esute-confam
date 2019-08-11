const { Group } = require("../models");
const { weeklyJob, monthlySettlement } = require("../../../middleware/jobs");
const { User } = require("../../users/models")

// creates a new cooporative group
exports.createGroup = async (req, res, next) => {
  // get the logged in user from the request object
  const { user } = req;
  const { groupName, description, maxCapacity } = req.body;
  // check if the user exist if not, return with error message
  if (!user) return res.status(403).json({ error: "You are not authorized to create a group" });

  if (!groupName || !description || !maxCapacity) return res.status(400).json({
    error: "Incomplete group information"
  });

  // Find a group with the groupName given and assign it to the the variable
  const isExists = await Group.findOne({ groupName });
  // Check if the group name is already taken or if the group already exists
  if (isExists) return res.status(400).json({ error: "Group name already taken" });

  let group = await new Group({ groupName, description, maxCapacity });
  group.groupAdmin = user._id;

  // Create the new group in the database
  group = await group.save();
  // respond with the newly created group
  return res.json(group);
}

// Get the cooporative group with the given id
exports.getGroupById = (req, res, next, id) => {
  Group.findById(id)
    .populate("member", "_id firstName lastName balance email paid")
    .populate("groupAdmin", "firstName lastName")
    .then(group => {
      if (!group) return res.status(400).json({ error: "Group not found" });
      req.group = group;
      next();
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Group search
exports.searchGroup = (req, res, next) => {
  // convert search term in the query string to lower case and assign it to the variable q
  const q = req.query.q.toLowerCase();
  Group.find({ $text: { $search: q } })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      throw new Error;
    });
}

// Fetches a single cooporative group
exports.getGroup = (req, res) => {
  return res.json(req.group);
}

// Fetch all the cooporate group from the database
exports.getGroups = (req, res) => {
  Group.find({})
    // populate the group with the member data
    .populate("member", "firstName lastName balance email paid")
    .then(group => {
      res.json(group);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// set the searchable field to true for the group with the given id
exports.setSearchable = (req, res ) => {
  const { groupId, userType } = req.params;
  const { userId, } = req.body;
  // check if the user is an admin
  if (userType !== "admin") return res.status(403).json({ 
    error: "Only the group admin have access to this operation" 
  });

  Group.update({ _id: groupId}, { $set: { searchable: true }})
    .then(group => {
      // if the group with the given is not found, return error message
      if (!group) return res.status(400).json({ error: "Can not find group with the ID" });
      // return success message if the update operation is successfully
      return res.json({ message: "Success!" });
    })
    .catch(err => { 
      // respond with any error that may occur
      res.json({ error: err.message });
    });  
}

//Updates group information
exports.updateGroupInfo = (req, res) => {
  // get the values from the request object
  const { groupId, groupName, fixedAmount, maxCapacity, description } = req.body;
  console.log(groupId)
  // find and update the group found with the given id
  Group.findByIdAndUpdate(groupId)
    .then(group => {
      // if not group respond with error message
      if (!group) return res.status(400).json({ error: "Group not found" });
      // assign the values to their fields in the database
      if (groupName) group.groupName = groupName;
      if (fixedAmount) group.fixedAmount = fixedAmount;
      if (maxCapacity) group.maxCapacity = maxCapacity;
      if (description) group.description = description;

      // save the provided values in the database
      group.save();
      res.json("Successfully updated group");
    })
    .catch(err => {
      // respond with error message if there is/are error
      res.json({ error: err.message });
    });
}

// Adds new member a group
exports.newMember = async (req, res) => {
  const { user: { _id } } = req;
  const { groupId, userId } = req.params;

  if (userId === undefined || userId === null) return res.status(400).json({ error: "User ID is required" });
  if (userId !== _id) return res.status(400).json({ error: "Unknown user" });
  const group = await Group.findOne({ _id: groupId });
  const members = group.member;
  if (members.includes(userId)) return res.status(400).json({ error: "You are already a member of this group." });

  Group.findByIdAndUpdate(groupId, { $push: { member: userId }})
    .then(group => {
      if (!group) return res.status(400).json({ error: "Could not add new member" });
      res.json("New member added successfully");
    }).catch(err => {
      res.json({ error: `Operation failed. ${err.message}`});
    });
}

// Automatically saves up the fixed amount for the group every week
exports.weeklySum = (res, groupId) => {
  Group.findById(groupId)
    .then(group => {
      const fixedAmount = Number(group.fixedAmount)
      // return error message if no group found with the group ID provided
      if (!group) return res.status(400).json({ error: "Group not found" });
      // Update the user found with the group ID
      Group.update({ _id: groupId }, { $inc: { weeklyTotal: fixedAmount }}, {
        new: true
      }).exec((err, result) => {
        // return 400 error status if the update operation failed
        if (err) return res.status(400).json({ error: err.message });
      });
    })
    .catch(err => {
      // catch and return any error from the entire process
      res.json({ error: err.message });
    });
}

// Pays a member at the end of the month
exports.memberMonthlySettlement = (res, groupId) => {
  console.log("stepped in now")
  Group.findById(groupId)
    .then(async (group) => {
      if (!group) return res.status(400).json({ error: "Can not find group" });
      const members = group.member;
      const amount = group.weeklyTotal;
      // Checks if the accumulated fund is 0.
      if (Number(amount) === 0) return res.status(400).json({ error: "Insufficient fund" });

      for(let i = 0; i < members.length; i++) {
        const eachMember = members[i];
        const user = await User.findById(eachMember);
        if (user.paid !== true && members.includes(user._id)) {
          // find the user that has the current ID
          User.find({ _id: eachMember })
            .then( async (user)=> {
              if (!user) return res.status(400).json({ error: "Can not find user" });
              // check if the user found has not been paid
              if (user[0].paid === false) {
                await User.findByIdAndUpdate(eachMember, {
                  $inc: { balance: amount },
                  $set: { paid: true }
                }, { new: true });
                // Deduct the amount paid to the member from the group account
                await Group.findByIdAndUpdate(groupId, { $inc: { weeklyTotal: -amount }}, { new: true });
              }
            })
            .catch(err => {
              res.json({ error: err.message });
            });
          break;
        }
      }
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

/**
 * This restart the round after all members have collected the money in turn
 * so that they can start all over again
 */
exports.startNewRound = (req, res, next) => {
  const {user: { _id, userType } } = req;
  const { groupId, userId } = req.params;
  // Checks if user type is admin
  if (userType !== "admin") return res.status(400).json({ error: "Only admin can start a new round" });
  if (_id !== userId) return res.status(400).json({ error: "Unknown user. Access denied" });

  Group.findById(groupId)
    .then(async (group) => {
      if (!group) return res.status(400).json({ error: "Can not find group" });
      const members = group.member;

      members.forEach(async (member) => {
        console.log(member)
          // find the user that has the current ID
          User.find({ _id: member })
            .then( async (user)=> {
              if (!user) return res.status(400).json({ error: "Can not find user" });
              // check if the user found has not been paid
              if (user[0].paid === true) {
                await User.findByIdAndUpdate(member, {
                  $set: { paid: false }
                }, { new: true });
              }
            })
            .catch(err => {
              res.json({ error: err.message });
            });
      });  
      // this is it
      res.json("Success");
    })
    .catch(err => {
      res.json({ error: err.message });
    });

}


// Deletes a group
exports.deleteGroup = (req, res) => {
  const { user: { userType } } = req;
  
  if (!userType) return res.status(400).json({ error: "Unknown user" });
  if (userType !== "admin") return res.status(400).json({ error: "Only the group admin can delete this group" });
  const group = req.group;
  group.remove((err) => {
    if (err) return res.status(400).json({ error: "Failed to delete group" });
    res.json({ message: "Success" });
  });
}

// Removes a member from the group
exports.removeMember = (req, res) => {
  const { userId, groupId } = req.params;
  console.log(req.user)
  const { user: { _id, userType},  } = req;

  if (!userId) return res.status(400).json({ error: "User ID is required to delete the member" });
  if (_id === undefined || _id === null) return res.status(400).json({ error: "You must be logged in to delete a member" });
  if (userType !== "admin") return res.status(400).json({ error: "Only admin can delete a member"});

  Group.findByIdAndUpdate(groupId, { $pull: { member: userId } })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to remove member" });
      res.json("Member removed successfully");
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Automates weekly fund accumulation
exports.execWeeklySum = (req, res) => {
  // get the group's ID from the request params  
  const { groupId } = req.params;
  const weeklySum = exports.weeklySum;
  console.log("Weekly job starting...");
  weeklyJob(res, weeklySum, groupId);
  res.end();
}

// Handle automatic members monthly settlement job
exports.memberSettlement = (req, res) => {
  // get the group's ID from the request params  
  const { groupId } = req.params;
  const memberMonthlySettlement = exports.memberMonthlySettlement;
  console.log("Monthly job starting...");
  monthlySettlement(res, memberMonthlySettlement, groupId);
  console.log("monthly settlement completed...")
  res.end();
}
