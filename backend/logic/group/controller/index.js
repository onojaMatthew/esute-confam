const { Group } = require("../models");

// creates a new cooporative group
exports.createGroup = async (req, res, next) => {
  // get the logged in user from the request object
  const { user } = req;
  const { groupName, description, maxCapacity, fixedAmount } = req.body;
  // check if the user exist if not, return with error message
  if (!user) return res.status(403).json({ error: "You are not authorized to create a group" });

  if (!groupName || !description || !maxCapacity || !fixedAmount) return res.status(400).json({
    error: "Incomplete group information"
  });

  // Find a group with the groupName given and assign it to the the variable
  const isExists = await Group.findOne({ groupName });
  // Check if the group name is already taken or if the group already exists
  if (isExists) return res.status(400).json({ error: "Group name already taken" });

  let group = await new Group({ groupName, description, maxCapacity, fixedAmount });
  group.groupAdmin = user._id;

  // Create the new group in the database
  group = await group.save();
  // respond with the newly created group
  return res.json(group);
}

// Get the cooporative group with the given id
exports.getGroupById = (req, res, next, id) => {
  Group.findById(id)
    .populate("member", "_id firstName lastName balance")
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

// implementing partial and full search
exports.searchGroup = (req, res, next) => {
  // convert search term in the query string to lower case and assign it to the variable q
  const q = req.query.q.toLowerCase();

  Group.find({})
    .then(groups => {
      groups.forEach(group => {
        console.log(group.searchable)
        // if (group.searchable === false) {
        //   Group.find({ $text: { $search: q } })
        //     .then(result => {
        //       res.json(result);
        //     })
        //     .catch(err => {
        //       throw new Error;
        //     });
        // } else {
        //   return;
        // }
      });
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
    .populate("member", "firstName lastName balance email")
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
  const { userId } = req.body;
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
  const { groupName, fixedAmount, maxCapacity, description } = req.body;
  // find and update the group found with the given id
  Group.findByIdAndUpdate({ _id: req.params.id })
    .then(group => {
      // if not group respond with error message
      if (!group) return res.status(400).json({ error: "Group not found" });
      // assign the values to their fields in the database
      if (groupName) group.groupName = groupName;
      if (fixedAmount) group.fixedAmount = fixedAmount;
      if (maxCapacity) group.maxCapacity = maxCapacity;
      if (description) group.description = description;
      // save the provided values in the database
      return group.save();
    })
    .catch(err => {
      // respond with error message if there is/are error
      res.json({ error: err.message });
    });
}

exports.joinGroup = (req, res, next) => {
  // Gets the userID from the request object
  const { userId } = req.body;
  const { user: { _id } } = req;
  console.log(user, "this is the userId")
  if(userId === null || userId === undefined) return res.status(400).json({ 
    error: "User id is required to complete this operation" 
  });
  if (!user || user._id !== userId) return res.status(400).json({ error: "You don't have access to this operation" });
  // Updates the group by pushing the user into it
  Group.update({ _id: req.params.groupId}, { $push: { member: userId }}, {
    new: true
  })
    .populate("member", "_id firstName lastName balance")
    .exec((err, result) => {
      // Checks if there is error and return possible error message
      if (err){ 
        console.log(err.message)
        return res.status(400).json({
        error: err.message
      });}
      // Respond with the result
      return res.json(result);
    });
}

exports.weeklySum = (req, res) => {
  // Get the groupId from the req object
  const { groupId } = req.body;
  // Find a the group with the groupId
  Group.findById(groupId)
    .then(group => {
      // return error message if no group found with the group ID provided
      if (!group) return res.status(400).json({ error: "Group not found" });
      // Update the user found with the group ID
      Group.update({ _id: groupId }, { $inc: { weeklyTotal: "group.amount" }}, {
        new: true
      }).exec((err, result) => {
        // return 400 error status if the update operation failed
        if (err) return res.status(400).json({ error: err.message });
        // respond with result of the update operation
        res.json(result);
      });
    })
    .catch(err => {
      // catch and return any error from the entire process
      res.json({ error: err.message });
    });
}

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