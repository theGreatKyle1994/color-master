const Palette = require("../models/palette.model");
const User = require("../models/user.model");

// Add Favorite Palette -> userId is included in the req.body by the authentication middleware
module.exports.addPalette = async (req, res) => {
    try{
        const newPalette = await Palette.create(req.body);
        //* After adding palette to palette collection, add new palette to the user's palette array
        const updatedUser = await User.findByIdAndUpdate(newPalette.userId, {$addToSet: {colorPalettes: newPalette._id}})
        res.json(newPalette)
    }
    catch(err){
        res.status(400).json({message: "Error Adding Palette",error: err});
    }
}

// Find all Palettes associated with user
module.exports.findAllPalettes = (req, res) => {
    Palette.find({userId: req.body.userId})
        .then(allPalettes => res.json(allPalettes))
        .catch(err => res.status(400).json({message: 'Error Finding all Palettes',error: err}))
}

// Find One Palette
module.exports.findOnePalette = (req, res) => {
    Palette.findOne({_id: req.params.id})
        .then(onePalette => res.json(onePalette))
        .catch(err => res.status(400).json({message: 'Error Finding Palette',error: err}))
}

// Update One Palette
module.exports.updatePalette = (req, res) => {
    Palette.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(updatedPalette => res.json(updatedPalette))
        .catch(err => res.status(400).json({message: 'Error Updating Palette',error: err}))
}

// Delete One favorite -> userId is included in the req.body by the authentication middleware
module.exports.deletePalette = async (req, res) => {
    try{
        deletedPalette = await Palette.deleteOne({_id: req.params.id});
        //* After deleting palette form palette collection, remove palette from user's palette array
        await User.findByIdAndUpdate(req.body.userId, {$pull: {colorPalettes: req.params.id}})
        res.json(deletedPalette)
    }
    catch(err){
        res.status(400).json({message: "Error Deleting Palette", error: err})
    }
}