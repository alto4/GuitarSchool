const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

// POST api/users
// Register user
// Public
router.post(
  '/',
  [
    check('name', 'Name is required to register').not().isEmpty(),
    check('email', 'Please enter a valid email address.').isEmail(),
    check('password', 'Please enter a password that is at least 6 characters in length.').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Verify email is unique
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: `User already exists with the email ${email}. Please sign in or register with a unique email address.`,
            },
          ],
        });
      }

      // Try to retrieve gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
