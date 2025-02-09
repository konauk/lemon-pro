// src/components/ConfirmationPage.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <section className="confirmation-section">
        <h1>No Reservation Found</h1>
        <p>Please make a reservation </p>
        <Link to="/reservations" className="button-primary">Make a Reservation</Link>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="confirmation-section">
      <h1>Reservation Confirmed!</h1>
      <div className="confirmation-details">
        <h2>Reservation Details</h2>
        <ul className="details-list">
          <li><strong>Date:</strong> {formatDate(reservation.date)}</li>
          <li><strong>Time:</strong> {reservation.time}</li>
          <li><strong>Number of Guests:</strong> {reservation.guests}</li>
          <li><strong>Occasion:</strong> {reservation.occasion}</li>
        </ul>
        <p className="confirmation-message">
          Thank you for choosing Little Lemon! We look forward to serving you.
        </p>
        <Link to="/" className="button-primary">Return to Home</Link>
      </div>
    </section>
  );
}

export default ConfirmationPage;