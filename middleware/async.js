const statusCode = require("../statusCode/codes");

module.exports.asyncMiddleware = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      res
        .status(statusCode.InternalServerError)
        .json({ error: "Something went wrong" });
      next(ex);
    }
  };
};
