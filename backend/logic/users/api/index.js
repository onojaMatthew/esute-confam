const express = require("express");
const { postSignup, postSignin } = require("../controller");
const { signupValidator } = require("../../../validator");

const router = express.Router();

router.post("/signup", postSignup);
router.post("/signin", postSignin);

module.exports = router;
