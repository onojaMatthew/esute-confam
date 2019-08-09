const express = require("express");
const { 
  createGroup, 
  setSearchable,
  updateGroupInfo, 
  execWeeklySum,
  getGroupById,
  getGroups,
  getGroup,
  searchGroup,
  deleteGroup,
  newMember,
} = require("../controller");

const { userById } = require("../../users/controller");
const router = express.Router();
const { requireLogin } = require("../../../middleware/auth");

// API routes for Associative Group
router.get("/group", getGroups);
router.post("/group/new", requireLogin, createGroup);
router.get("/group/search", searchGroup);
router.put("/group/sum/:groupId", requireLogin, execWeeklySum);
router.put("/group/update", updateGroupInfo);
router.put("/group/newmember/:groupId/:userId", requireLogin, newMember);
router.get("/group/:groupId", getGroup);
router.delete("/group/:groupId", requireLogin, deleteGroup);
router.put("/group/:groupId/:userType", requireLogin, setSearchable);

router.param("groupId", getGroupById);
router.param("userId", userById)

module.exports = router;
