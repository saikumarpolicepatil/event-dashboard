const express = require('express');
const Event = require('../models/event');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create event
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, location, date } = req.body;
  const newEvent = new Event({ name, description, location, date });
  await newEvent.save();
  res.json(newEvent);
});

// Get all events
router.get('/', authMiddleware, async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Update event
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, description, location, date } = req.body;
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { name, description, location, date }, { new: true });
  res.json(updatedEvent);
});

// Delete event
router.delete('/:id', authMiddleware, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

module.exports = router;
