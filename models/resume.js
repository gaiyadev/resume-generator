const mongoose = require("mongoose");
require("../database/db");
const Joi = require("joi");

const ResumeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 13,
      unique: true,
    },
    lastname: {
      type: String,
      lowercase: true,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    employmentHistory: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },

    middlename: {
      type: String,
      minlength: 4,
      maxlength: 400,
    },
    hobbies: {
      type: String,
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

const Resume = mongoose.model("Resume", ResumeSchema);
module.exports = Resume;

/** ===============================================================================================
 *                            Resume MODEL BUSINESS LOGIC
 * ================================================================================================
 */

/**
 * VALIDATE INPUT
 *
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
 * CREATE A NEW RESume
 * @param {*} newUser
 */
module.exports.newUser = async (newUser) => {
  try {
    return await newUser.save(); //create New resume
  } catch (err) {
    throw err;
  }
};
