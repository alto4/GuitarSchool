const express = require('express');
const router = express.Router();

// GET api/lessons
// Get lessons
// Public
router.get('/', (req, res) => res.send('Lesson route'));

module.exports = router;
