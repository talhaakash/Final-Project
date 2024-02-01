import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import GuestList from "./components/GuestList";
import AddEvent from "./components/AddEvent";
import UpdateEvent from "./components/UpdateEvent";
import "./App.css";

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to Event Management</h2>
      <p>
        This is your home screen. You can navigate to different sections of the
        application using the links below.
      </p>
      <ul>
        <li>
          <Link to="/events" className="nav-link">
            View Events
          </Link>
        </li>
        <li>
          <Link to="/events/add" className="nav-link">
            Add Event
          </Link>
        </li>
        {/* Add other navigation links as needed */}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/add" element={<AddEvent />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/:id/edit" element={<UpdateEvent />} />
            <Route path="/events/:eventId/guests" element={<GuestList />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
