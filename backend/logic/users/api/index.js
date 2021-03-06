const express = require("express");
const { 
  postSignup, 
  postSignin, 
  signout, 
  getUserById, 
  userById,
  getUsers,
  setAdmin,
  addGroupId,
} = require("../controller");
const { signupValidator } = require("../../../validator");
const {requireLogin } = require("../../../middleware/auth");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/signout", signout);
router.get("/users", getUsers);
router.put("/user/:userId/admin", requireLogin, setAdmin);
router.put("/user/:userId/")
router.get("/user/:userId", getUserById);

router.param("userId", userById);

module.exports = router;
