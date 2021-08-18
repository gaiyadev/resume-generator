var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let page = express.static("/client/next/server/pages/index.html");

  res.render(page, { title: "Express" });
});

module.exports = router;
