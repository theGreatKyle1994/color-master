const { authenticate } = require("../config/jwt.config");
const ColorController = require("../controllers/color.controller");

// Add authentication to all routes
module.exports = (app) => {
    app.post("/api/colors", authenticate, ColorController.addColor);
    app.get("/api/colors", authenticate, ColorController.findAllColors);
    app.get("/api/colors/:id", authenticate, ColorController.findOneColor);
    app.patch("/api/colors/:id", authenticate, ColorController.updateColor);
    app.delete("/api/colors/:id", authenticate, ColorController.deleteColor);
}