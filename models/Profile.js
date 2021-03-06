const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  username: {
    type: String,
  },
  instruments: {
    type: [String],
  },
  level: {
    type: String,
  },
  genres: {
    type: [String],
  },
  type: {
    type: String,
    default: 'Student',
  },
  bio: {
    type: String,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
