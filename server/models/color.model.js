const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
        {
            r: Number,
            g: Number,
            b: Number
        }, 
        {timestamps: true}
    )

Color = mongoose.model("Color", ColorSchema)

module.exports = Color;