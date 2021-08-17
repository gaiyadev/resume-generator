const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../statusCodes/codes");

// CHECK IS USER IS AUTHENTICATED
module.exports.isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ey665u56jykjmnytk
  try {
    if (!authorization)
      return res.status(Unauthorized).json({ error: "You must be logged in" });
    const token = authorization.replace("Bearer ", "");

    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(Unauthorized).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    const userId = await User.findById(_id);

    if (!userId) return;
    req.user = userId;
    return next();
  } catch (err) {
    return res.status(Unauthorized).json({ error: "You must be logged in" });
  }
};
