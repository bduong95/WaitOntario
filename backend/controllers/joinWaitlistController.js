const { validationResult } = require('express-validator');
const JoinWaitlist = require('../models/JoinWaitlist');

// Create new entry in the waitlist
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, contactNumber, purposeOfVisit } = req.body;

  try {
    // Create new waitlist entry
    const joinwaitlistEntry = new JoinWaitlist({
      firstname,
      lastname,
      contactNumber,
      purposeOfVisit,
      userId: req.user.userId,
      locationId: req.params.locationId,
    });
    await joinwaitlistEntry.save();

    return res.status(201).json({ message: 'Waitlist entry created successfully', joinwaitlistEntry });
  } catch (err) {
    console.error('Error creating waitlist entry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all waitlist entries
exports.getAll = async (req, res) => {
  try {
    const waitlistEntries = await JoinWaitlist.find({ userId: req.user.userId });
    return res.json(waitlistEntries);
  } catch (err) {
    console.error('Error retrieving waitlist entries:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update waitlist entry
exports.update = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update waitlist entry
    await JoinWaitlist.findByIdAndUpdate(id, { status }, { new: true });
    return res.json({ message: 'Waitlist entry updated successfully' });
  } catch (err) {
    console.error('Error updating waitlist entry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete waitlist entry
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete waitlist entry
    await JoinWaitlist.findByIdAndDelete(id);
    return res.json({ message: 'Waitlist entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting waitlist entry:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
