const mongoose = require("mongoose");
const { ObjectId, Schema } = mongoose;

const groupSchema = new Schema({
  groupName: { type: String, required: true, unique: true },
  maxCapacity: { type: Number, required: true },
  fixedAmount: { type: Number, required: true },
  description: { type: String, required: true },
  searchable: { type: Boolean, default: false },
  member: [{ type: ObjectId, ref: "User" }],
  groupAdmin: { type: ObjectId, ref: "User" },
  weeklyTotal: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

groupSchema.index({
  groupName: "text",
});

const Group = mongoose.model("Group", groupSchema);

exports.Group = Group;
