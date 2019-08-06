const express = require("express");
const { 
  postSignup, 
  postSignin, 
  signout, 
  getUserById, 
  userById 
} = require("../controller");
const { signupValidator } = require("../../../validator");
const {requireLogin } = require("../../../middleware/auth");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);
router.get("/signout", signout);
router.get("/user/:userId", requireLogin, getUserById);

router.param("userId", userById);

module.exports = router;
