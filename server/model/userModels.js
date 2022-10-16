const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 3,
    unique: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    max: 50,
    min: 8,
    required: true,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
})
//this defines the database in which the data is going to be stored
module.exports = mongoose.model('users', userSchema)
