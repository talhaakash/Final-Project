import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // This hook allows us to grab the id from the URL

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${id}/`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching event details");
        setLoading(false);
        console.error("Error fetching event details", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  // The event object is now populated, render the details
  return (
    <div>
      <h1>{event.title}</h1>
      <p>
        <strong>Date:</strong> {new Date(event.start_date).toLocaleString()} -{" "}
        {new Date(event.end_date).toLocaleString()}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Max Guests:</strong> {event.max_guests}
      </p>
      <p>
        <strong>Description:</strong> {event.description}
      </p>
      <Link to={`/events/${id}/edit`}>Update Event</Link>{" "}
      {/* Link to Update Event page */}
      {/* Add more fields as necessary */}
    </div>
  );
};

export default EventDetail;
