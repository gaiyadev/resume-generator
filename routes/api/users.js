const {
  signIn,
  signUp,
  fetchUser,
  ChangePassword,
} = require("../../controllers/userController");
const { isAuthenticated } = require("../../middleware/auth");
var express = require("express");
var router = express.Router();

/* User sign up. */
router.post("/signup", signUp);

/* User sigin. */
router.post("/signin", signIn);

// Fetch user
router.get("/user", isAuthenticated, fetchUser);

// change password
router.put("/changePassword", isAuthenticated, ChangePassword);

module.exports = router;
