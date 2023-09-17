const Color = require("../models/color.model");
const User = require("../models/user.model");

// Add Favorite Color -> userId is included in the req.body by the authentication middleware
module.exports.addColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    //* After adding color to color collection, add new color to the user's color array
    const updatedUser = await User.findByIdAndUpdate(newColor.userId, {
      $addToSet: { colors: newColor._id },
    });
    res.json(newColor);
  } catch (err) {
    res.status(400).json({ message: "Error Adding Color", error: err });
  }
};

// Find all Colors associated with user
module.exports.findAllColors = (req, res) => {
  Color.find({ userId: req.body.userId })
    .then((allColors) => res.json(allColors))
    .catch((err) =>
      res.status(400).json({ message: "Error Finding all Colors", error: err })
    );
};

// Find One Color
module.exports.findOneColor = (req, res) => {
  Color.findOne({ _id: req.params.id })
    .then((oneColor) => res.json(oneColor))
    .catch((err) =>
      res.status(400).json({ message: "Error Finding Color", error: err })
    );
};

// Update One Color
module.exports.updateColor = (req, res) => {
  Color.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedColor) => res.json(updatedColor))
    .catch((err) =>
      res.status(400).json({ message: "Error Updating Color", error: err })
    );
};

// Delete One favorite -> userId is included in the req.body by the authentication middleware
module.exports.deleteColor = async (req, res) => {
  try {
    deletedColor = await Color.deleteOne({ _id: req.params.id });
    //* After deleting color form color collection, remove color from user's color array
    await User.findByIdAndUpdate(req.body.userId, {
      $pull: { colors: req.params.id },
    });
    res.json(deletedColor);
  } catch (err) {
    res.status(400).json({ message: "Error Deleting Color", error: err });
  }
};
