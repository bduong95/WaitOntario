// authRoutes.js
const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const authController = require("../controllers/authController");
const User = require("../models/User"); // Import the User model

router.post(
    "/register",
    [
        check("firstname").notEmpty().withMessage("First name is required"),
        check("lastname").notEmpty().withMessage("Last name is required"),
        check("email").isEmail().withMessage("Invalid email"),
        check("username").notEmpty().withMessage("Username is required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        check("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
    ],
    authController.register
);

router.post(
	"/login",
	[
		check("emailOrUsername").notEmpty().withMessage("Email or username is required"),
		check("password").notEmpty().withMessage("Password is required")
	],
	authController.login
);

router.post(
	"/forgot-password",
	[
		check('emailOrUsername').notEmpty().withMessage('Email or username is required'),
	],
	authController.forgotPassword);

// Added for testing
router.get("/emails", async (req, res) => {
    try {
        const users = await User.find({}, 'email'); // Fetch all users and only return the email field
        const emails = users.map(user => user.email); // Extract emails from user objects
        res.json(emails);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
    });

module.exports = router;
