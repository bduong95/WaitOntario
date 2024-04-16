const mongoose = require('mongoose');

const joinwaitlistSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  contactNumber: { type: String, required: true },
  purposeOfVisit: { type: String, required: true },
  status: { type: Number, default: 1 }, // 1 for active, 0 for inactive
  locationId: { type: mongoose.Schema.Types.ObjectId,ref: 'Location' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('JoinWaitlist', joinwaitlistSchema);
