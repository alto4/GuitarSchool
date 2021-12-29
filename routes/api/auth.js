const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// GET api/auth
// Get user auth
// Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error.');
  }
});

// POST api/auth
// Login user
// Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email address.').isEmail(),
    check('password', 'Password is required.').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // Verify email is unique
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: `Invalid credentials. Please try again.`,
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: `Invalid credentials. Please try again.`,
            },
          ],
        });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      // TODO: Change expiresIn to 3600s before deployment
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600000000 }, (error, token) => {
        if (error) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error.');
    }
  }
);

module.exports = router;
