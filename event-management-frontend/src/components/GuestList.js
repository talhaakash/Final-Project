import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { eventId } = useParams(); // Assuming you're using a URL like /events/:eventId/guests

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}/guests/`);
        setGuests(response.data);
      } catch (error) {
        setError("Error fetching guests");
        console.error("Error fetching guests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [eventId]);

  const handleRSVP = async (guestId, newRSVP) => {
    try {
      await axios.patch(`/api/guests/${guestId}/`, { rsvp: newRSVP });
      setGuests(
        guests.map((guest) => {
          if (guest.id === guestId) {
            return { ...guest, rsvp: newRSVP };
          }
          return guest;
        })
      );
    } catch (error) {
      setError("Error updating RSVP");
      console.error("Error updating RSVP", error);
    }
  };

  if (loading) return <p>Loading guests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Guest List</h2>
      {guests.length === 0 ? (
        <p>No guests found for this event.</p>
      ) : (
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              {guest.name} - {guest.email} - RSVP: {guest.rsvp ? "Yes" : "No"}
              <button onClick={() => handleRSVP(guest.id, !guest.rsvp)}>
                Toggle RSVP
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Add a link to go back to the event details */}
      <Link to={`/events/${eventId}`}>Back to Event</Link>
    </div>
  );
};

export default GuestList;
