// src/components/ConfirmedBooking.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ConfirmedBooking() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="confirmation-container">
      <h1>Booking Confirmed!</h1>
      {reservation ? (
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
        </div>
      ) : (
        <p>No reservation details found. Please try making a reservation again.</p>
      )}
      <div className="confirmation-actions">
        <Link to="/" className="button-primary">
          Return to Home
        </Link>
        {!reservation && (
          <Link to="/reservations" className="button-secondary">
            Make a Reservation
          </Link>
        )}
      </div>
    </div>
  );
}

export default ConfirmedBooking;