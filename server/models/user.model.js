const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [3, "Username must be at least 3 characters."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters."],
      trim: true,
    },
    colors: {
      //* Associate user with colors -> ref allows us to populate this field with all colors assciated to user
      type: [{type: mongoose.ObjectId, ref: "Color"}],
    },
    colorPalettes: {
      //* Associate user with palettes -> ref allows us to populate this field with all palettes assciated to user
      type: [{type: mongoose.ObjectId, ref: "Palette"}],
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
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match");
  }
  next();
});

//* Hashing Password
UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
