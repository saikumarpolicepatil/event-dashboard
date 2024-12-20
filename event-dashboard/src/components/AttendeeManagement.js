// src/components/AttendeeManagement.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/attendeeManagement.css';

const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [attendeeName, setAttendeeName] = useState('');
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    // Fetch all attendees
    axios.get('/api/attendees')
      .then((response) => {
        setAttendees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching attendees:', error);
      });
  }, []);

  const handleAddAttendee = () => {
    if (!attendeeName) return;
    
    // Add new attendee to the list
    axios.post('/api/attendees', { name: attendeeName, eventId })
      .then((response) => {
        setAttendees([...attendees, response.data]);
        setAttendeeName('');
      })
      .catch((error) => {
        console.error('Error adding attendee:', error);
      });
  };

  const handleRemoveAttendee = (attendeeId) => {
    // Remove attendee from the list
    axios.delete(`/api/attendees/${attendeeId}`)
      .then(() => {
        setAttendees(attendees.filter(attendee => attendee._id !== attendeeId));
      })
      .catch((error) => {
        console.error('Error removing attendee:', error);
      });
  };

  const handleAssignTask = (attendeeId) => {
    // Logic to assign a task to the selected attendee
    console.log(`Assigning task to attendee ${attendeeId}`);
  };

  return (
    <div className="attendee-management-container">
      <h2>Attendee Management</h2>
      <div>
        <input
          type="text"
          placeholder="Enter attendee name"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
        />
        <button onClick={handleAddAttendee}>Add Attendee</button>
      </div>

      <div className="attendee-list">
        {attendees.map(attendee => (
          <div key={attendee._id} className="attendee-item">
            <div>
              <h3>{attendee.name}</h3>
            </div>
            <div>
              <button onClick={() => handleAssignTask(attendee._id)}>Assign Task</button>
              <button onClick={() => handleRemoveAttendee(attendee._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendeeManagement;
