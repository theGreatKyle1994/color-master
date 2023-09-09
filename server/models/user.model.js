const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    colors: {
      type: Array,
    },
    colorPalettes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
