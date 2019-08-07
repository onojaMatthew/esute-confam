const { User } = require("../models");
const bcrypt = require("bcrypt")

exports.postSignup = (req, res, next) => {
  // Gets the data from the request object
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) return res.status(400).json({
    error: "You must provide all required information"
  });

  User.findOne({ email })
    .then(user => {
      // checks if the user already exists
      if (user) return res.status(400).json({ error: "User already exists" });
      // hash the password and returns the result of the hash
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
        if (!hashedPassword) return res.status(400).json({ error: err.message });
        const user = new User({
          email,
          password: hashedPassword,
          firstName,
          lastName
        });
        // save the user
        user.save();
        const token = user.generateToken();
        res.header("x-auth-token", token).json({ message: "User successfully created", user });
      });
    })
    .catch(err => {
      res.json({
        error: err.message
      });
    });
}

exports.postSignin = async(req, res, next) => {
  // Gets email and password from the request object
  const { email, password } = req.body;

  // checks that the user submits email and password for login
  if (!email || !password) return res.status(400).json({
    error: "Email and password are required"
  });

  // finds the user with the provided email in the database
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `User with the email ${email} does not exist`
      });
    }
    /* compares the password submitted with the password in the database
      and login the user if the passwords match
    */
    return bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({
          error: "Password do not match"
        });
        const { _id, email, firstName, lastName, userType } = user;
        const token = user.generateToken();
        res.cookie("token", token);
        res.json({ token, user: { _id, email, firstName, lastName, userType } });
      });
  });
}

exports.userById = (req, res, next, id) => {
  User.find({ _id: id })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found"});
      req.profile = user;
      next();
    })
    .catch(err => {
      res.json(err.message);
    });
}

// Set the user userType to admin
exports.setAdmin = (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  if (!userId) return res.status(400).json({ error: "Unknown user"});
  if (userId !== user._id) return res.status(400).json({ error: "Only legitimate user can be an admin" });

  User.update({ _id: userId }, { $set: { userType: "admin" }}, {
    new: true
  }).exec((err) => {
    if (err) return res.status(400).json({ error: "Update failed" });
    res.json({ message: "Success!"});
  });
}

// Gets a single user
exports.getUserById = (req, res, next) => {
  return res.json(req.profile);
}

// gets all users
exports.getUsers = (req, res, next) => {
  User.find()
    .then(user => {
      if (!user) return res.status(400).json({ error: "No user found" });
      res.json(user);
    })
    .catch(err => {
      res.json({ error: err.message });
    });
}

// Adds the user's cooporative group id to the user model
exports.addGroupId = (req, res) => {
  const { userId } = req.params;
  const { user } = req;
  const { groupId } = req.body;
  
  if (!userId) return res.status(400).json({ error: "Unknown user"});
  if (userId !== user) return res.status(400).json({ error: "Only legitimate user can be an admin" });
  if (!groupId) return res.status(400).json({ error: "Group id is not provided" });

  User.update({ _id: userId }, { $set: { groupId: groupId }}, {
    new: true
  }).exec((err) => {
    if (err) return res.status(400).json({ error: "Update failed" });
    res.json({ message: "Success!"});
  }); 
}

// Delete user
exports.deleteUser = (req, res) => {
  const user = req.profile;
  user.remove((err) => {
    if (err) return res.status(400).json({ error: "Cannot delete user"});
    return res.json({ message: "User successfully deleted" });
  });
}

// logout implementation
exports.signout = (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Signout success!!" });
};