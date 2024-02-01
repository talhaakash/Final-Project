import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events/");
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events");
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}/`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      setError("Error deleting event");
      console.error("Error deleting event", error);
    }
  };

  return (
    <div>
      <h1>Events</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {new Date(event.start_date).toLocaleString()}
            <div>
              <Link to={`/events/${event.id}`}>View Details</Link>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
