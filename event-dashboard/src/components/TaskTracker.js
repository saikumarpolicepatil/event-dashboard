// src/components/TaskTracker.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/taskTracker.css';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [eventId, setEventId] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fetch tasks for the selected event
    if (eventId) {
      axios.get(`/api/tasks/${eventId}`)
        .then((response) => {
          setTasks(response.data);
          calculateProgress(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [eventId]);

  const calculateProgress = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const progressPercentage = (completedTasks / totalTasks) * 100;
    setProgress(progressPercentage);
  };

  const handleTaskStatusUpdate = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' } : task
    );
    setTasks(updatedTasks);
    calculateProgress(updatedTasks);

    // Call API to update task status in the backend
    axios.put(`/api/tasks/update/${taskId}`, { status: updatedTasks.find(task => task._id === taskId).status })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  return (
    <div className="task-tracker-container">
      <h2>Task Tracker</h2>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <div>
              <h3>{task.name}</h3>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            <div className={`task-status ${task.status.toLowerCase()}`}>
              <span>{task.status}</span>
              <button onClick={() => handleTaskStatusUpdate(task._id)}>
                {task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracker;
