const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// Don't use an arrow function for accessing the password/username being saved in the document.
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
  return next();
})

module.exports = mongoose.model('User', userSchema);
