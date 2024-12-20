const express = require('express');
const Attendee = require('../models/attendee');
const router = express.Router();

// Create attendee
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const newAttendee = new Attendee({ name, email });
  await newAttendee.save();
  res.json(newAttendee);
});

// Get all attendees
router.get('/', async (req, res) => {
  const attendees = await Attendee.find();
  res.json(attendees);
});

// Delete attendee
router.delete('/:id', async (req, res) => {
  await Attendee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Attendee deleted' });
});

module.exports = router;
