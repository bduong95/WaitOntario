const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
//const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboard');
const joinWaitlistRoutes = require('./routes/JoinWaitlistRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
require('dotenv').config();
const listEndpoints = require('express-list-endpoints')


const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => console.log('Connected!'));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', authenticateUser, dashboardRoutes);
app.use('/api/join_waitlist', authenticateUser, joinWaitlistRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});