// src/components/BookingForm.js
import React, { useState } from 'react';
import { saveBooking, getBookingsByDate } from '../utils/bookingStorage';

const BookingForm = ({ availableTimes, submitForm }) => {
  // Initialize available time slots with all times
  React.useEffect(() => {
    setAvailableTimeSlots(availableTimes);
  }, [availableTimes]);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday'
  });

  const [errors, setErrors] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }
    
    if (!formData.occasion) {
      newErrors.occasion = 'Occasion is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create submission data with proper type conversion
      const submissionData = {
        ...formData,
        guests: parseInt(formData.guests, 10)
      };
      
      // Save to localStorage first
      const saved = saveBooking(submissionData);
      
      if (saved) {
        // If save was successful, call the submitForm prop
        submitForm(submissionData);
        
        // Reset form
        setFormData({
          date: '',
          time: '',
          guests: 1,
          occasion: 'Birthday'
        });
        
        // Clear any existing errors
        setErrors({});
        
        // Optional: Show success message
        alert('Reservation successfully saved!');
      } else {
        // Handle save failure
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to save reservation. Please try again.'
        }));
      }
    }
  };

  const updateAvailableTimes = (selectedDate) => {
    // Get all reservations for the selected date
    const existingBookings = getBookingsByDate(selectedDate) || [];
    
    // Get all reserved times for that date
    const reservedTimes = new Set(existingBookings.map(booking => booking.time));
    
    // Filter out reserved times from available times
    const filteredTimes = availableTimes.filter(time => !reservedTimes.has(time));
    
    setAvailableTimeSlots(filteredTimes);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If date changes, update available times
    if (name === 'date') {
      updateAvailableTimes(value);
      
      // Reset time selection if it was previously set
      setFormData(prev => ({
        ...prev,
        [name]: value,
        time: ''  // Reset time when date changes
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Reservation form">
      <div className="form-group">
        <label htmlFor="date" id="date-label">Reservation Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          aria-labelledby="date-label"
          aria-required="true"
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && (
          <span id="date-error" className="error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="time" id="time-label">Reservation Time</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-labelledby="time-label"
          aria-required="true"
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? "time-error" : undefined}
        >
          <option value="">Select a time</option>
          {availableTimeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.time && (
          <span id="time-error" className="error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="guests" id="guests-label">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-labelledby="guests-label"
          aria-required="true"
          aria-invalid={!!errors.guests}
          aria-describedby={errors.guests ? "guests-error" : undefined}
        />
        {errors.guests && (
          <span id="guests-error" className="error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion" id="occasion-label">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
          aria-labelledby="occasion-label"
          aria-required="true"
          aria-invalid={!!errors.occasion}
          aria-describedby={errors.occasion ? "occasion-error" : undefined}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {errors.occasion && (
          <span id="occasion-error" className="error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      <button 
        type="submit" 
        className="reserve-button"
        aria-label="Submit reservation request"
      >
        Book your table
      </button>
      
      {errors.submit && (
        <div className="error" role="alert" aria-live="polite">
          {errors.submit}
        </div>
      )}
    </form>
  );
};

export default BookingForm;