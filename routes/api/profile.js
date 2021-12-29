const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// GET api/profile/me
// Get current user's profile
// Private
router.get('/me', auth, async (req, res) => {
  try {
    // Get user id from req token
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'createdOn']);

    // Check for case of no currently populated profile for user
    if (!profile) {
      return res.status(400).json({ msg: 'No existing profile was found for this user.' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

// POST api/profile
// Create or update current user's profile
// Private
router.post(
  '/',
  [
    auth,
    [
      check('instruments', 'Please add at least one instrument.').not().isEmpty(),
      check('level', 'Please specify your level of experience.').not.apply().isEmpty(),
      check('genres', 'Please add at least one genre.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { instruments, level, genres, type, bio } = req.body;

    // Extra profile details
    const profileData = {};

    profileData.user = req.user.id;
    instruments
      ? (profileData.instruments = instruments.split(',').map((instrument) => instrument.trim()))
      : (profileData.instruments = []);
    level ? (profileData.level = level) : (profileData.level = '');
    genres ? (profileData.genres = genres.split(',').map((genre) => genre.trim())) : (profileData.genres = []);
    type ? (profileData.type = type) : (profileData.type = '');
    bio ? (profileData.bio = bio) : (profileData.bio = '');

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update profile if one already exists corresponding to authenticated user
      if (profile) {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileData }, { new: true });

        return res.json(profile);
      }

      // Create a new profile if one doesn't already exist for authenticated user
      profile = new Profile(profileData);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
