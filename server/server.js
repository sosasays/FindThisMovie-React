const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// Controller for user signup and login.
const userController = require('./controllers/userController');

// Automatically parse urlencoded body content and form data from incoming requests and place it in req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Connect to MongoDB with the URI.
const mongoURI = 'mongodb+srv://grigenas:SG96236241@cluster1.tdyenht.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(`Failed to connect to MongoDB...${err}`))

app.use('/build', express.static(path.join(__dirname, '../build')));

// Root
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// Sign Up
// app.get('/signup', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// });

app.post('/signup', userController.createUser, (req, res) => {
  return res.redirect('/');
});

// Login
// app.get('/login', (req, res) => {
//   return res.sendFile(path.resolve(__dirname, '../client/login.html'));
// });

app.post('/login', userController.verifyUser, (req, res) => {
  return res.redirect('/');
});


// 404 Handler
app.use('*', (req,res) => {
  res.status(404).send('404 Error: Page Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Listen on Port 3000
app.listen(3000);

module.exports = app;