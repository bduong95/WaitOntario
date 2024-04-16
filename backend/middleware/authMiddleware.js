const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Extract token from header
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token not found.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = { authenticateUser };