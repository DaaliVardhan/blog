const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  return res.status(302).redirect("/home");
});

module.exports = router;
