// src/utils/bookingStorage.js

/**
 * Save a booking to localStorage
 */
export const saveBooking = (booking) => {
  try {
    // Get existing bookings
    let existingBookings;
    try {
      existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    } catch {
      existingBookings = [];
    }
    
    // Add metadata to booking
    const enrichedBooking = {
      ...booking,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    // Add new booking to array
    const updatedBookings = [...existingBookings, enrichedBooking];
    
    // Try to save - this is where we might get quota errors
    try {
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (storageError) {
      console.error('Failed to save to localStorage:', storageError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveBooking:', error);
    return false;
  }
};

/**
 * Get all bookings for a specific date
 */
export const getBookingsByDate = (date) => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter(booking => booking.date === date);
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

/**
 * Get all bookings from localStorage
 */
export const getAllBookings = () => {
  try {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
  } catch (error) {
    console.error('Error getting all bookings:', error);
    return [];
  }
};