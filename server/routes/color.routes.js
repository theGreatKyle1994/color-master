const { authenticate } = require("../config/jwt.config");
const ColorController = require("../controllers/color.controller");

// Add authentication to all routes
module.exports = (app) => {
    //* Add favorite color -> userId included in req.body by middleware
    app.post("/api/colors", authenticate, ColorController.addColor);
    //* Find all colors associated with user -> userId included in req.body by middleware
    app.get("/api/colors", authenticate, ColorController.findAllColors);
    //* Find one color by its Id
    app.get("/api/colors/:id", authenticate, ColorController.findOneColor);
    //* Find and update Color by its Id
    app.patch("/api/colors/:id", authenticate, ColorController.updateColor);
    //* Delete favorite color -> add userId to request body
    app.delete("/api/colors/:id", authenticate, ColorController.deleteColor);
}