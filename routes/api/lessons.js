const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// POST api/lessons
// Create a new lesson
// Private
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

// GET api/lessons
// Get all lessons
// Private
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdOn: -1 });
    res.json(lessons);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

// GET api/lessons/:id
// Get single lesson by ID
// Private
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found.' });
    }
    res.json(lesson);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found.' });
    }

    res.status(500).send('Server Error.');
  }
});

// DELETE api/lessons/:id
// Delete a single lesson
// Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ msg: 'Lesson not found.' });
    }

    // Ensure user attempting to delete lesson is the content creator
    if (lesson.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: "User not authorized to perform this action. Only a lesson's creator or administrator may delete a lesson.",
      });
    }

    await lesson.remove();

    res.json({ msg: 'Lesson successfully removed.' });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Lesson not found.' });
    }

    res.status(500).send('Server Error.');
  }
});

// PUT api/lessons/enroll/:id
// Register for a lesson
// Private
router.put('/enroll/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    // Check if already subscribed
    if (lesson.students.filter((student) => student.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'User already enrolled in the selected lesson.' });
    }

    lesson.students.unshift({ user: req.user.id });
    console.log(lesson);

    await lesson.save();

    res.json(lesson.students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

// PUT api/lessons/unenroll/:id
// Unenroll from a lesson
// Private
router.put('/unenroll/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    // Check if already subscribed
    if (lesson.students.filter((student) => student.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'User is not currently enrolled in the selected lesson.' });
    }

    lesson.students = lesson.students.filter((student) => student.user.toString() !== req.user.id);
    console.log(lesson.students);

    await lesson.save();

    res.json(lesson.students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;
