const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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

//* MiddleWare
UserSchema.virtual("confirmPassword")
  .get(() => this.confirmPassword)
  .set((value) => (this.confirmPassword = value));

//* Compare Passwords
UserSchema.pre("validate", function (next) {
  // console.log("Made it to the validate function")
  if (this.password !== this.confirmPassword) {
    // console.log("Passwordu do not match");
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

//* Hashing Password
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    console.log(hash)
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
