var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let page = express.static("/client/build/index.html");

  res.render(page, { title: "Express" });
});

module.exports = router;
