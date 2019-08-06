const { Group } = require("../models");

exports.createGroup = async (req, res, next) => {
  const { user } = req;
  const { groupName, description, maxCapacity, amount } = req.body;

  if (!user) return res.status(403).json({ error: "You are not authorized to create a group" });
  if (!groupName || !description || !maxCapacity || !amount) return res.status(400).json({
    error: "Incomplete group information"
  });

  const isExists = await Group.findOne({ groupName });
  if (isExists) return res.status(400).json({ error: "Group name already taken" });

  let group = await new Group({ groupName, description, maxCapacity, amount });
  group.groupAdmin = user._id;

  group = await group.save();
  return res.json(group);
}

exports.getGroupById = (req, res, next, id) => {
  Group.findById(id)
    .populate("member", "_id firstName lastName balance")
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

  const q = req.query.q.charAt(0).toLowerCase();
  Group.find({ $text: { $search: q } })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message });
    });

  // Group.find({ groupName: {
  //   $regex: new RegExp(q)
  // }}, (err, data) => {
  //   if (err) return res.status(400).json({
  //     error: err.message
  //   });
  //   res.json(data);
  // }).limit(10);
}

exports.getGroup = (req, res) => {
  return res.status(200).json(req.group);
}

exports.getGroups = (req, res) => {
  Group.find({})
    .populate("member", "firstName lastName balance email")
    .then(group => {
      res.json(group);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.setSearchable = (req, res ) => {
  const { groupId, userType } = req.params;
  const { userId } = req.body;
  // check if the user is an admin
  if (userType !== "admin") return res.status(403).json({ error: "Only the group admin have access to this operation" });

  Group.update({ _id: groupId}, { $set: { searchable: true }})
    .then(group => {
      if (!group) return res.status(400).json({ error: "Can not find group with the ID" });
      return res.json({ message: "Success!" });
    })
    .catch(err => { 
      res.json({ error: err.message });
    });  
}

exports.updateGroupInfo = (req, res) => {
  const { groupName, amount, maxCapacity, description } = req.body;
  Group.findByIdAndUpdate({ _id: req.params.id })
    .then(group => {
      if (!group) return res.status(400).json({ error: "Group not found" });

      if (groupName) group.groupName = groupName;
      if (amount) group.amount = amount;
      if (maxCapacity) group.maxCapacity = maxCapacity;
      if (description) group.description = description;

      return group.save();
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

exports.joinGroup = (req, res, next) => {
  // Gets the userID from the request object
  const { userId } = req.body;
  // Updates the group by pushing the user into it
  Group.update({ _id: req.params.groupId}, { $push: { member: userId }}, {
    new: true
  })
    .populate("member", "_id firstName lastName balance")
    .exec((err, result) => {
      // Checks if there is error and return possible error message
      if (err) return res.status(400).json({
        error: err.message
      });
      // Respond with the result
      res.json(result);
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
