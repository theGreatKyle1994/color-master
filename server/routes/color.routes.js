const { authenticate } = require("../config/jwt.config");
const ColorController = require("../controllers/color.controller");

// Add authentication to all routes
module.exports = (app) => {
  //* Add favorite color for user
  app.post("/api/colors", authenticate, ColorController.addColor);
  //* Find all colors associated with user
  app.get("/api/colors", authenticate, ColorController.findAllColors);
  //* Find one color by its Id
  app.get("/api/colors/:id", ColorController.findOneColor);
  //* Find and update Color by its Id
  app.patch("/api/colors/:id", authenticate, ColorController.updateColor);
  //* Delete favorite color
  app.delete("/api/colors/:id", authenticate, ColorController.deleteColor);
};
