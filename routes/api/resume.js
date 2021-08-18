var express = require("express");
const { contact } = require("../../controllers/contactController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", contact);
module.exports = router;
