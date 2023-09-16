const Color = require("../models/color.model");

// Add Color
module.exports.addColor = (req, res) => {
    Color.create(req.body)
        .then(newColor => res.json(newColor))
        .catch(err => res.status(400).json({message: "Error Adding Color",error: err}));
}
    
// Find all Colors
module.exports.findAllColors = (req, res) => {
    Color.find()
        .then(allColors => res.json(allColors))
        .catch(err => res.status(400).json({message: 'Error Finding all Colors',error: err}))
}

// Find One Color
module.exports.findOneColor = (req, res) => {
    Color.findOne({_id: req.params.id})
        .then(oneColor => res.json(oneColor))
        .catch(err => res.status(400).json({message: 'Error Finding Color',error: err}))
}

// Update One Color
module.exports.updateColor = (req, res) => {
    Color.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedColor => res.json(updatedColor))
        .catch(err => res.status(400).json({message: 'Error Updating Color',error: err}))
}

// Delete One Color
module.exports.deleteColor =(req, res) => {
    Color.deleteOne({_id: req.params.id})
        .then(deletedColor => res.json(deletedColor))
        .catch(err => res.status(400).json({message: "Error Deleting Color", error: err}))
}