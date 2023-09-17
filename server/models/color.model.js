const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
        {
            r: Number,
            g: Number,
            b: Number,
            //* Associate color with user -> ref allows us to populate this field with user info if needed
            userId: {type: mongoose.ObjectId, ref: "User"}
        }, 
        {timestamps: true}
    )

Color = mongoose.model("Color", ColorSchema)

module.exports = Color;