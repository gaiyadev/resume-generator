const { asyncMiddleware } = require("../middleware/async");
const Contact = require("../models/contact");
const statusCodes = require("../statusCode/codes");

module.exports.contact = asyncMiddleware(async (req, res) => {
  const { email, subject, body } = req.body;
  const checkErrors = await Contact.validateInput(email, subject, body);

  // Checking for errors
  if (checkErrors) {
    return res.status(statusCodes.BadRequest).json({
      error: checkErrors,
    });
  }
  const newContact = Contact({
    email: email.toLowerCase(),
    body,
    subject,
  });

  // saving to database
  const savedUser = await Contact.newContact(newContact);
  if (!savedUser) {
    return res.status(statusCodes.InternalServerError).json({
      error: "Something went wrong while saving.. try again later",
    });
  }

  //  send response to the client
  return res.status(statusCodes.created).json({
    _id: savedUser._id,
    message: "Message sent successfully",
  });
});
