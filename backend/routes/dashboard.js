const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');

router.get('/',authenticateUser, (req, res) => {
  res.send('testing Welcome to the Dashboard');
});

module.exports = router;