const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.FIRST_SECRET_KEY;

//* Register/Login/Logout a user
module.exports = {
  registerUser: async (req, res) => {
    console.log("Made it to the register User function");
    try {
      const { username, password } = req.body;
      //* Validate username and password
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid input data types' });
      }
      if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ message: 'Username length must be between 3 and 20 characters' });
      }
      //* Check to see if the username that was sent in the request already exists in the database
      const potentialUser = await User.findOne({ username: req.body.username });
      if(potentialUser){
        //* Reject the request if the username already exists
        res.status(400).json({message: 'username Is already taken'})
      } else {
        //* Create a new user
        const newUser = await User.create(req.body);
        //* Generating a user token
        const userToken = jwt.sign({_id: newUser._id, username: newUser.username}, secret, {expiresIn: '1h'});
        console.log(userToken)
        //* Sending user data back to the client                                 2 Hours
        res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2000 * 60 * 60}).json(newUser);
      }
    }
    catch(err){
      res.status(400).json({message: "Error Registering User",error: err});
    }
  },
  //* Log the user in
  loginUser: async (req, res) => {
    try {
      //* Populate the user's color array with colors associated with the user
      const potentialUser = await User.findOne({ username: req.body.username }).populate("colors");
      if(potentialUser){
        const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password);
        if(passwordsMatch){
          const userToken = jwt.sign({_id: potentialUser._id, username: potentialUser.username}, secret, {expiresIn: '1h'});
          res.status(201).cookie('userToken', userToken, {httpOnly: true, maxAge:2000 * 60 * 60}).json(potentialUser);
          console.log('login successful')
        } else {
          //* Reject the request if the password does not match
          res.status(400).json({message: 'Invalid Username/Password'});
        }
      } else {
        //* Reject the request if the username does not exist
        res.status(400).json({message: 'Invalid Username/Password'});
      }
    }
    catch(err){
      res.status(400).json({error: err});
    }
  },
  //* Log the user out
  logoutUser: (req, res) => {
    res.clearCookie('userToken');
    res.sendStatus(200).json({message: 'Logged out successfully'});
  }
};

//* The Rest of the CRUD operations

//* Finds and displays all users
module.exports.findAllUsers = (req,res) => {
  User.find()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch(err => {
      res.status(400).json({message: 'Error Finding all Users',error: err});
    });
};

//* Finds and displays one user
module.exports.findOneUser = (req,res) => {
  User.findOne({_id: req.params.id})
    .then((oneUser) => {
      res.json(oneUser)
    })
    .catch(err => {
      res.status(400).json({message: 'Error Finding User',error: err});
    });
};

//* Updates a user w/ prefilled info
module.exports.updateUser = (req,res) => {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
    .then(updatedUser => {
      res.json(updatedUser)
    })
    .catch(err => {
      res.status(400).json({message: 'Error Updating User',error: err});
    });
};


//* Deletes a user
module.exports.deleteUser = (req,res) => {
  User.deleteOne({_id: req.params.id})
    .then((deletedUser) => {
      res.json(deletedUser)
    })
    .catch(err => {
      res.status(400).json({message: 'Error Deleting User',error: err});
    });
};



