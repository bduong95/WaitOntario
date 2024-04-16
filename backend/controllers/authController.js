const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, username, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        return res.status(400).json({ message: 'User already exists with this email or username' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
        firstname,
        lastname,
        email,
        username,
        password: hashedPassword,
      });

      // Save user to database
      await user.save();

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
	const { emailOrUsername, password } = req.body;
  
	try {
	  // Find user by email or username
	  const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
	  if (!user) {
		return res.status(400).json({ message: 'Invalid credentials' });
	  }
  
	  // Check password
	  const isMatch = await bcrypt.compare(password, user.password);
	  if (isMatch) {
		// Generate JWT token
		const token = jwt.sign({ userId: user._id }, 'secret');
  
		// Send user data along with token
		return res.json({ token, user });
	  } else {
		return res.status(400).json({ message: 'Invalid credentials' });
	  }
	} catch (err) {
	  console.error('Error logging in user:', err);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  };
  


exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
	  // Find user by email
	  const user = await User.findOne({ email });
	  if (!user) {
		return res.status(400).json({ message: 'User not found with this email' });
	  }
  
	  // Implement your logic for forgot password here (e.g., send reset password email)
	  return res.json({ message: 'Password reset instructions sent to your email' });
	} catch (err) {
	  console.error('Error sending reset password email:', err);
	  return res.status(500).json({ message: 'Internal server error' });
	}
};