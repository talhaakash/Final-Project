import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import axios from "axios";

import "./UpdateEvent.css"; // Import the CSS file

function UpdateEvent() {
  const { id } = useParams(); // Get the event ID from the URL
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    max_guests: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch event data based on the route parameter (event id)
    async function fetchEventData() {
      try {
        const response = await axios.get(`/api/events/${id}/`);
        const eventData = response.data;
        setEventData(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateForm(eventData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make a PUT request to update the event data
      await axios.put(`/api/events/${id}/`, eventData);
      // Redirect to the event detail page or another appropriate page
      navigate(`/events/${id}`); // Use navigate to change the route
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate required fields
    if (!data.title) {
      errors.title = "Title is required";
    }
    if (!data.start_date) {
      errors.start_date = "Start date is required";
    }
    if (!data.end_date) {
      errors.end_date = "End date is required";
    }
    if (!data.location) {
      errors.location = "Location is required";
    }
    if (!data.max_guests) {
      errors.max_guests = "Max guests is required";
    }

    // You can add more validation logic here

    return errors;
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="datetime-local"
            id="start_date"
            name="start_date"
            value={eventData.start_date}
            onChange={handleChange}
          />
          {errors.start_date && (
            <span className="error">{errors.start_date}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="datetime-local"
            id="end_date"
            name="end_date"
            value={eventData.end_date}
            onChange={handleChange}
          />
          {errors.end_date && <span className="error">{errors.end_date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="max_guests">Max Guests:</label>
          <input
            type="number"
            id="max_guests"
            name="max_guests"
            value={eventData.max_guests}
            onChange={handleChange}
          />
          {errors.max_guests && (
            <span className="error">{errors.max_guests}</span>
          )}
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}

export default UpdateEvent;
