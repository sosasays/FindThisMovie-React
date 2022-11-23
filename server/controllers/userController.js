const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {};

// Create a user and save their username and hashed password into the database.
userController.createUser = async (req, res, next) => {
  // Check to ensure the username and password fields aren't empty.
  if (!req.body.username || !req.body.password) {
    return next({ log: 'Missing data, fill out the form.', message: { err : 'Missing data, fill out the form.'} })
  }
  try {
    // Create a new user and save it to the database.
    const insertUser = new User({ username : req.body.username, password : req.body.password });
    await insertUser.save();
    // Create the message to be sent in the response.
    res.locals.message = 'User created successfully.';
    return next();
  }
  catch (err) {
    return next({ log: 'userController.createUser', message: { err : `userController.createUser : You already have an account. : ERR ${err}`} });
  }
};

// Verify the username and password from the request body and authenticate them given the database stored data.
userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Find the user in the database with the matching username they typed in.
    const found = await User.find({ username: username });
    // If a user is not found then an empty array is returned so redirect them to signup.
    if (found.length === 0) {
      return res.redirect(302, '/')
    }
    // Compare the password matched to the user that was found from the database.
    const compare = await bcrypt.compare(password, found[0].password);
    if (!compare) throw 'Wrong username or password.'
    return next();
  }
  catch (err) {
    return next({ log: 'userController.verifyUser', message: { err : `userController.verifyUser : Wrong username or password. : ERR ${err}`} }); 
  }
};

module.exports = userController;
