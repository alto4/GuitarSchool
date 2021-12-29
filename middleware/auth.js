const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Get header token
  const token = req.header('x-auth-token');

  // Check if token not present
  if (!token) {
    return res.status(401).json({ msg: 'No token found. Authorization denied.' });
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token. Authorization denied.' });
  }
};
