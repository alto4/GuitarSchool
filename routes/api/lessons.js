const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// POST api/lessons
// Create a new lesson
// Prive
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Please include a lesson title.').not().isEmpty(),
      check('description', 'Please include a lesson description.').not().isEmpty(),
      check('level', 'Please specify the skill level this lesson is targeted towards.').not().isEmpty(),
      check('url', 'A URL link is required to create a new lesson.').isURL(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const userProfile = await Profile.findOne({ user: req.user.id });

      const role = userProfile.type;

      if (role !== 'Instructor') {
        return res.status(400).json({
          msg: "Only instructor's can create new lessons. If you wish to create lessons, please apply for instructor status.",
        });
      }

      const newLesson = new Lesson({
        user: req.user.id,
        avatar: user.avatar,
        title: req.body.title,
        description: req.body.description,
        level: req.body.level,
        url: req.body.url,
      });

      const lesson = await newLesson.save();

      res.json(lesson);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
