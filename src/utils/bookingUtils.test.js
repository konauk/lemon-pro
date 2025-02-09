// src/utils/bookingUtils.test.js
import { timesReducer, initializeTimes, UPDATE_TIMES, getAvailableTimes } from './bookingUtils';
import { fetchAPI } from './api';
import { getBookingsByDate } from './bookingStorage';

// Mock the API and storage functions
jest.mock('./api');
jest.mock('./bookingStorage');

describe('Booking Utils', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    fetchAPI.mockReturnValue([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
    
    getBookingsByDate.mockReturnValue([]);
  });

  describe('initializeTimes', () => {
    test('returns available times from API for current date', () => {
      // Setup mock return value for fetchAPI
      const mockTimes = ['17:00', '18:00', '19:00'];
      fetchAPI.mockReturnValueOnce(mockTimes);
      
      // Initialize times
      const initialTimes = initializeTimes();
      
      // Verify fetchAPI was called with a Date object
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      expect(fetchAPI.mock.calls[0][0]).toBeInstanceOf(Date);
      
      // Check if it returns the mock times
      expect(initialTimes).toEqual(mockTimes);
    });

    test('filters out already booked times', () => {
      // Setup mock values
      const apiTimes = ['17:00', '18:00', '19:00'];
      const bookedTimes = [{ time: '18:00' }];
      
      fetchAPI.mockReturnValueOnce(apiTimes);
      getBookingsByDate.mockReturnValueOnce(bookedTimes);
      
      // Get available times
      const availableTimes = initializeTimes();
      
      // Should exclude booked time
      expect(availableTimes).toEqual(['17:00', '19:00']);
    });
  });

  describe('updateTimes', () => {
    test('returns updated times for selected date', () => {
      // Setup mock data
      const selectedDate = '2024-02-09';
      const mockTimes = ['18:00', '19:00', '20:00'];
      fetchAPI.mockReturnValueOnce(mockTimes);
      
      // Initial state doesn't matter for this test
      const initialState = ['17:00'];
      
      // Create update action
      const action = { 
        type: UPDATE_TIMES, 
        payload: selectedDate 
      };
      
      // Get new state
      const newState = timesReducer(initialState, action);
      
      // Verify fetchAPI was called with the correct date
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      const calledDate = fetchAPI.mock.calls[0][0];
      expect(calledDate.toISOString().split('T')[0]).toBe(selectedDate);
      
      // Check if it returns the mock times
      expect(newState).toEqual(mockTimes);
    });

    test('returns same state for unknown action type', () => {
      const initialState = ['17:00', '18:00'];
      const action = { type: 'UNKNOWN_ACTION' };
      
      const newState = timesReducer(initialState, action);
      
      expect(newState).toEqual(initialState);
      expect(fetchAPI).not.toHaveBeenCalled();
    });
  });

  describe('getAvailableTimes', () => {
    test('handles string date input', () => {
      const dateString = '2024-02-09';
      const mockTimes = ['17:00', '18:00'];
      fetchAPI.mockReturnValueOnce(mockTimes);
      
      const times = getAvailableTimes(dateString);
      
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      const calledDate = fetchAPI.mock.calls[0][0];
      expect(calledDate.toISOString().split('T')[0]).toBe(dateString);
      expect(times).toEqual(mockTimes);
    });

    test('handles Date object input', () => {
      const dateObj = new Date('2024-02-09');
      const mockTimes = ['17:00', '18:00'];
      fetchAPI.mockReturnValueOnce(mockTimes);
      
      const times = getAvailableTimes(dateObj);
      
      expect(fetchAPI).toHaveBeenCalledTimes(1);
      expect(fetchAPI).toHaveBeenCalledWith(dateObj);
      expect(times).toEqual(mockTimes);
    });
  });
});