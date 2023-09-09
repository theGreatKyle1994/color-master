const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.testMethod = (req, res) => {
  res.json({ msg: "Success!" });
};
