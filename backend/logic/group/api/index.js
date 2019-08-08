const express = require("express");
const { 
  createGroup, 
  setSearchable,
  updateGroupInfo, 
  joinGroup, 
  execWeeklySum,
  getGroupById,
  getGroups,
  getGroup,
  searchGroup,
  deleteGroup,
} = require("../controller");
const { userById } = require("../../users/controller");
const router = express.Router();
const { requireLogin } = require("../../../middleware/auth");

router.put("/group/newmember/:groupId/", requireLogin, joinGroup);
router.get("/group", getGroups);
router.post("/group/new", requireLogin, createGroup);
router.get("/group/search", searchGroup);
router.put("/group/sum/:groupId", requireLogin, execWeeklySum);
router.get("/group/:groupId", getGroup);
router.delete("/group/:groupId", requireLogin, deleteGroup);
router.put("/group/:groupId/:userType", requireLogin, setSearchable);
router.put("/group/:groupId", requireLogin, updateGroupInfo);

router.param("groupId", getGroupById);
router.param("userId", userById)

module.exports = router;
