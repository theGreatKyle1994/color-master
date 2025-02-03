const jwt = require("jsonwebtoken");
const secret = process.env.FIRST_SECRET_KEY;

//middleware to authenticate user when requests are made
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, secret, (err, payload) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      // if user is authenticated add the user ID to the request object so that it can be accessed in the routes as needed
      req.body.userId = payload._id;
      next();
    }
  });
};
