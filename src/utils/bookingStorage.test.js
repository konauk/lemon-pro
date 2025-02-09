// src/utils/bookingStorage.test.js
import { saveBooking, getBookingsByDate, getAllBookings } from './bookingStorage';

describe('Booking Storage', () => {
  let mockStorage = {};
  
  beforeEach(() => {
    // Clear mock storage
    mockStorage = {};
    
    // Mock localStorage methods
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(key => mockStorage[key] || null),
        setItem: jest.fn((key, value) => {
          mockStorage[key] = value;
        }),
        removeItem: jest.fn(key => {
          delete mockStorage[key];
        }),
        clear: jest.fn(() => {
          mockStorage = {};
        })
      },
      writable: true
    });
  });

  describe('saveBooking', () => {
    test('handles localStorage errors gracefully', () => {
      // Mock setItem to throw an error
      window.localStorage.setItem.mockImplementationOnce(() => {
        throw new Error('localStorage is full');
      });

      const booking = {
        date: '2024-02-09',
        time: '18:00',
        guests: 2,
        occasion: 'Birthday'
      };

      const result = saveBooking(booking);
      expect(result).toBe(false);
    });

    // ... rest of the tests remain the same ...
  });

  // ... rest of the test suites remain the same ...
});