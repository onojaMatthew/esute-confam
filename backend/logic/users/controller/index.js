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
  User.find(id)
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found"});
      req.profile = user;
      next();
    })
    .catch(err => {
      res.json(err.message);
    });
}

exports.getUserById = (req, res, next) => {
  return res.json(req.profile);
}

exports.deleteUser = (req, res) => {
  const user = req.profile;
  user.remove((err) => {
    if (err) return res.status(400).json({ error: "Cannot delete user"});
    return res.json({ message: "User successfully deleted" });
  });
}

exports.signout = (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Signout success!!" });
};