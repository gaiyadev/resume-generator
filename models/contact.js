const mongoose = require("mongoose");
require("../database/db");
const Joi = require("joi");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 13,
    },
    subject: {
      type: String,
      minlength: 3,
      maxlength: 20,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;

/** ===============================================================================================
 *                            Resume MODEL BUSINESS LOGIC
 * ================================================================================================
 */

/**
 * VALIDATE INPUT
 *
 */
module.exports.validateInput = (email, subject, body) => {
  const schema = Joi.object({
    subject: Joi.string().min(3).max(11).required().optional(),
    email: Joi.string().min(2).max(255).required().email(),
    body: Joi.string().min(4).max(255).required(),
  });
  const { error } = schema.validate({
    subject: subject,
    email: email,
    body: body,
  });
  if (error) {
    const errors = error.details[0].message;
    return errors;
  }
};

/**
 * CREATE A NEW RESume
 * @param {*} newContact
 */
module.exports.newContact = async (newContact) => {
  try {
    return await newContact.save(); //create New resume
  } catch (err) {
    throw err;
  }
};
