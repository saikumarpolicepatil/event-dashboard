import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', location: '', date: '' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents([...events, response.data]);
      setNewEvent({ name: '', description: '', location: '', date: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h2>Event Management</h2>
      <input type="text" placeholder="Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
      <input type="text" placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
      <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
      <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
      <button onClick={handleCreateEvent}>Add Event</button>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventManagement;
