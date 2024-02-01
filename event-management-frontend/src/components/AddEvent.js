import React, { useState } from "react";
import axios from "axios"; // You'll need axios to make API requests

function AddEvent() {
  const [formData, setFormData] = useState({
    host: 1, // Replace with the actual user ID (if not 1)
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    max_guests: 0,
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API to create a new event
      await axios.post("/api/events/", formData);
      // Handle success, e.g., show a success message or redirect
      console.log("Event created successfully!");
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Max Guests:</label>
          <input
            type="number"
            name="max_guests"
            value={formData.max_guests}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
