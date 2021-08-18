const mongoose = require("mongoose");
require("../database/db");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 13,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 400,
    },
    resetToken: {
      type: String,
      maxlength: 400,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

/** ===============================================================================================
 *                            USER MODEL BUSINESS LOGIC
 * ================================================================================================
 */

/**
 * VALIDATE USER INPUT
 * @param {*} username
 * @param {*} email
 * @param {*} password
 */
module.exports.validateUserInput = (username, email, password) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(11).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  const { error } = schema.validate({
    username: username,
    email: email,
    password: password,
  });
  if (error) {
    const errors = error.details[0].message;
    return errors;
  }
};

/**
 * FIND USER BY EMAIL
 * @param {*} email
 */
module.exports.getUserByEmail = async (email) => {
  const query = {
    email: email,
  };
  try {
    return await User.findOne(query);
  } catch (err) {
    throw err;
  }
};

/**
 *  FIND USER BY EMAIL OR USERNAME
 * @param {*} username
 * @param {*} email
 */
module.exports.getUserByEmailOrUsername = async (username, email) => {
  try {
    const user = await User.find().or([
      { username: username },
      { email: email },
    ]);
    return user;
  } catch (err) {
    throw err;
  }
};

/**
 * FIND USER BY USERNAME
 * @param {*} username
 */
module.exports.getUserByUsername = async (username) => {
  const query = {
    username: username,
  };
  try {
    return await User.findOne(query);
  } catch (err) {
    throw err;
  }
};

/**
 * CREATE A NEW USER
 * @param {*} newUser
 */
module.exports.newUser = async (newUser) => {
  try {
    const hash = await bcrypt.hash(newUser.password, 10);
    newUser.password = hash; //set hash password
    return await newUser.save(); //create New User
  } catch (err) {
    throw err;
  }
};

/**
 * COMPARE USER PASSWORD
 * @param {*} password
 * @param {*} hash
 */
module.exports.comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
};

/**
 * FIND USER BY ID
 * @param {*} id
 */
module.exports.getUserById = async (id) => {
  try {
    const userId = await User.findById(id);
    return userId;
  } catch (err) {
    throw err;
  }
};

/**
 *  GENERATE JWT ACCESS AUTH TOKEN
 * @param {*} _id
 * @param {*} email
 * @param {*} username
 * @param {*} isActive
 * @param {*} isBanned
 */
module.exports.generateAccessToken = async (_id, email, username) => {
  try {
    const token = await jwt.sign(
      {
        _id: _id,
        email: email,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return token;
  } catch (err) {
    throw err;
  }
};
