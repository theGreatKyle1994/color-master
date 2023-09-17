const { authenticate } = require("../config/jwt.config");
const PaletteController = require("../controllers/palette.controller");

// Add authentication to all routes
module.exports = (app) => {
    //* Add favorite palette -> userId included in req.body by middleware
    app.post("/api/palettes", authenticate, PaletteController.addPalette);
    //* Find all palettes associated with user -> userId included in req.body by middleware
    app.get("/api/palettes", authenticate, PaletteController.findAllPalettes);
    //* Find one palette by its Id
    app.get("/api/palettes/:id", authenticate, PaletteController.findOnePalette);
    //* Find and update Palette by its Id
    app.patch("/api/palettes/:id", authenticate, PaletteController.updatePalette);
    //* Delete favorite palette -> add userId to request body
    app.delete("/api/palettes/:id", authenticate, PaletteController.deletePalette);
}