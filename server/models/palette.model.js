const mongoose = require("mongoose");

const PaletteSchema = new mongoose.Schema(
        {
            color1: {
                r: Number,
                g: Number,
                b: Number
            },
            color2: {
                r: Number,
                g: Number,
                b: Number
            },
            color3: {
                r: Number,
                g: Number,
                b: Number
            },
            color4: {
                r: Number,
                g: Number,
                b: Number
            },
            color5: {
                r: Number,
                g: Number,
                b: Number
            },
            userId: {type: mongoose.ObjectId, ref: "User"}
        },
        {timestamps: true}
    )

const Palette = mongoose.model("Palette", PaletteSchema);

module.exports = Palette;