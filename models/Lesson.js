const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  students: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Lesson = mongoose.model('lesson', LessonSchema);
