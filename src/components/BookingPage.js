// src/components/BookingPage.js
import React from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, updateTimes, submitForm }) {
  return (
    <section className="booking-section" aria-label="Reservation Form">
      <h1>Reserve a Table</h1>
      <BookingForm 
        availableTimes={availableTimes}
        updateTimes={updateTimes}
        submitForm={submitForm}
      />
    </section>
  );
}

export default BookingPage;
