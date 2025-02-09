// src/utils/bookingUtils.js
import { fetchAPI } from './api';
import { getBookingsByDate } from './bookingStorage';

export const UPDATE_TIMES = 'UPDATE_TIMES';

// Helper function to get available times for a date
export const getAvailableTimes = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Get available times from API
  const availableTimes = fetchAPI(dateObj);
  
  // Get existing bookings for this date
  const existingBookings = getBookingsByDate(dateObj.toISOString().split('T')[0]);
  
  // Filter out times that are already booked
  const bookedTimes = new Set(existingBookings.map(booking => booking.time));
  return availableTimes.filter(time => !bookedTimes.has(time));
};

export const timesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIMES:
      // Get available times for the selected date
      return getAvailableTimes(new Date(action.payload));
    default:
      return state;
  }
};

export const initializeTimes = () => {
  // Initialize with today's available times
  return getAvailableTimes(new Date());
};