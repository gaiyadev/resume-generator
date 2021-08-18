const { signIn, signUp } = require("../../controllers/userController");
var express = require("express");
var router = express.Router();

/* User sign up. */
router.post("/signup", signUp);

/* User sigin. */
router.post("/signin", signIn);

module.exports = router;
