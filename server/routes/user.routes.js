const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  //* Register/Login/Logout a user
  app.post("/api/register", UserController.registerUser);
  app.post("/api/login", UserController.loginUser);
  app.post("/api/logout", UserController.logoutUser);
  //* Find all users
  // app.get("/api/users", UserController.findAllUsers);
  //* Find one user
  // app.get("/api/users/:id", UserController.findOneUser);
  //* Update a user
  // app.patch("/api/users/:id", UserController.updateUser);
  //* Delete a user
  // app.delete("/api/users/:id", UserController.deleteUser);
};
