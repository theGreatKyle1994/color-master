const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.FIRST_SECRET_KEY;

module.exports = {
  // Register user
  registerUser: async (req, res) => {
    // Making sure username isn't taken
    const potentialUser = await User.findOne({ username: req.body.username });
    // If username is free, create user
    if (!potentialUser) {
      await User.create(req.body)
        .then((newUser) => {
          // Generate token on successful register
          const userToken = jwt.sign(
            { _id: newUser._id, username: newUser.username },
            secret,
            { expiresIn: "1h" }
          );
          // Return new user and token
          res
            .status(201)
            .cookie("userToken", userToken, {
              httpOnly: true,
              maxAge: 2000 * 60 * 60,
            })
            .json(newUser);
        })
        .catch((err) => res.status(400).json(err));
    } else {
      // If username is taken, respond with error message
      res.status(400).json({
        errors: {
          username: { message: "Username already taken" },
        },
      });
    }
  },
  // Login user
  loginUser: async (req, res) => {
    //* Populate user's color and palette arrays with colors and palettes that match the IDs in the arrays
    const potentialUser = await User.findOne({ username: req.body.username }).populate("colors").populate("colorPalettes");
    // If user exists prepare to compare passwords
    if (potentialUser) {
      // Compare passwords
      if (await bcrypt.compare(req.body.password, potentialUser.password)) {
        // Create token on password match
        const userToken = jwt.sign(
          { _id: potentialUser._id, username: potentialUser.username },
          secret,
          { expiresIn: "1h" }
        );
        // Respond with user data and token
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            maxAge: 2000 * 60 * 60,
          })
          .json(potentialUser);
      } else {
        // On incorrect password, respond with error messages
        res.status(400).json({
          errors: {
            password: { message: "Incorrect password" },
          },
        });
      }
    } else {
      // On non existant username, respond with error messages
      res.status(400).json({
        errors: {
          username: { message: "Username not found" },
        },
      });
    }
  },
  // Logout user
  logoutUser: (req, res) => {
    res
      .status(200)
      .clearCookie("userToken")
      .json({ message: "logout successful" });
  },
};

//* The Rest of the CRUD operations

//* Finds and displays all users
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error Finding all Users", error: err });
    });
};

//* Finds and displays one user
module.exports.findOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((oneUser) => {
      res.json(oneUser);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error Finding User", error: err });
    });
};

//* Updates a user w/ prefilled info
module.exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error Updating User", error: err });
    });
};

//* Deletes a user
module.exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => {
      res.status(400).json({ message: "Error Deleting User", error: err });
    });
};
