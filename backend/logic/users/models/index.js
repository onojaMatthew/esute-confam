const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["admin", "member"], default: "member" },
  balance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
}

const User = mongoose.model("User", userSchema);

exports.User = User;
