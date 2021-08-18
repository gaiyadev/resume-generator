const User = require("../models/user");
const statusCodes = require("../statusCode/codes");
const { asyncMiddleware } = require("../middleware/async");
//  SIGN UP
module.exports.signUp = asyncMiddleware(async (req, res) => {
  const { username, email, password } = req.body;

  // Validating user data
  const checkErrors = await User.validateUserInput(username, email, password);

  // Checking for errors
  if (checkErrors) {
    return res.status(statusCodes.BadRequest).json({
      error: checkErrors,
    });
  }

  // Check if user already exist
  const getUserByEmail = await User.getUserByEmail(email);
  if (getUserByEmail) {
    return res.status(statusCodes.BadRequest).json({
      error: "Email already taken.",
    });
  }

  //create a User
  const newUser = User({
    username: username,
    email: email.toLowerCase(),
    password: password,
  });

  // saving to database
  const savedUser = await User.newUser(newUser);
  if (!savedUser) {
    return res.status(statusCodes.InternalServerError).json({
      error: "Something went wrong while saving.. try again later",
    });
  }

  //  send response to the client
  return res.status(statusCodes.created).json({
    _id: savedUser._id,
    message: "Account created successfully",
  });
});

// SIGN IN
module.exports.signIn = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;
  let username = "testuser";

  // Validating user data
  const checkErrors = await User.validateUserInput(username, email, password);

  // Checking for errors
  if (checkErrors) {
    return res.status(statusCodes.BadRequest).json({
      error: checkErrors,
    });
  }

  // Check if email exist
  const user = await User.getUserByEmail(email);

  if (!user || user == "" || user == undefined) {
    return res.status(statusCodes.Unauthorized).json({
      error: "Username or Password is invalid.",
    });
  }
  //
  const hash = user.password; //hash password from db
  // Check if password match
  const isPasswordMatch = await User.comparePassword(password, hash);

  if (!isPasswordMatch) {
    return res.status(statusCodes.Unauthorized).json({
      error: "Username or Password is invalid.",
    });
  }
  //Generating access jwt token
  const accessToken = await User.generateAccessToken(
    user._id,
    user.email,
    user.username
  );
  if (!accessToken) return;

  // Returning  response
  return res.status(statusCodes.Ok).json({
    user: {
      _id: user._id,
      email: user.email,
    },
    token: accessToken,
    message: "Login successfully",
    expiredIn: "accessTokenwill expired in 7d",
  });
});

// Get user profile
module.exports.fetchUser = asyncMiddleware(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id: _id });
  if (!user) {
    return res.status(statusCodes.NotFound).json({
      message: "User no found",
    });
  }
  return res.status(statusCodes.Ok).json({
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
  });
});

/** ===============================================================================================
 * USER CHANGE PASSWORD
 * ================================================================================================= *
 */
/**
 *
 * @param {*} req
 * @param {*} res
 */
module.exports.ChangePassword = asyncMiddleware(async (req, res) => {
  const { password, newPassword, comfirmNewPassword } = req.body;
  const { _id } = req.user;

  if (!_id) {
    return res.status(statusCodes.NotFound).json({ error: "User not found" });
  }

  const checkErrors = await User.validatePasswordInput(
    password,
    newPassword,
    comfirmNewPassword
  );

  // Checking for errors
  if (checkErrors) {
    return res.status(statusCodes.BadRequest).json({
      error: checkErrors,
    });
  }

  const checkUser = await User.getUserById(_id);

  if (!checkUser) {
    return res.status(statusCodes.NotFound).json({
      error: "User not found",
    });
  }

  // hasned password
  const hash = checkUser.password;

  // Check if password match
  const isPasswordMatch = await User.comparePassword(password, hash);

  if (!isPasswordMatch) {
    return res.status(statusCodes.BadRequest).json({
      error: "Current password is not correct",
    });
  }

  // newPassword === confirmNewpassword
  if (newPassword !== comfirmNewPassword) {
    return res.status(statusCodes.BadRequest).json({
      error: "New password is not equal to confirm password",
    });
  }
  const newPasswordCheck = await User.comparePassword(
    newPassword,
    checkUser.password
  );

  if (newPasswordCheck) {
    return res.status(statusCodes.BadRequest).json({
      error: "New password can not be the same with the current password",
    });
  }

  const savedPassword = await User.changePassword(newPassword, _id);
  if (!savedPassword) {
    return res.status(statusCodes.BadRequest).json({
      error: "something went wrong. try again later",
    });
  }
  // response
  return res.status(statusCodes.created).json({
    message: "Password changed successfully",
  });
});
