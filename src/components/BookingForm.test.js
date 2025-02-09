import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import * as bookingStorage from '../utils/bookingStorage';

// Mock the bookingStorage module
jest.mock('../utils/bookingStorage', () => ({
  saveBooking: jest.fn(),
  getBookingsByDate: jest.fn().mockReturnValue([])
}));

describe('BookingForm', () => {
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  beforeEach(() => {
    mockSubmitForm.mockClear();
    bookingStorage.saveBooking.mockClear();
    bookingStorage.getBookingsByDate.mockClear();
    bookingStorage.getBookingsByDate.mockReturnValue([]);
  });

  // Input Validation Tests
  describe('Input Validation', () => {
    test('Validates required date field', () => {
      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    });

    test('Validates required time field', () => {
      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      expect(screen.getByText(/time is required/i)).toBeInTheDocument();
    });

    test('Validates number of guests range', () => {
      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      const guestsInput = screen.getByLabelText(/number of guests/i);
      fireEvent.change(guestsInput, { target: { value: '11' } });

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      expect(screen.getByText(/number of guests must be between 1 and 10/i)).toBeInTheDocument();
    });

    test('Updates available times when date changes', () => {
      bookingStorage.getBookingsByDate.mockReturnValue([{ time: '17:00' }]);

      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      const dateInput = screen.getByLabelText(/choose date/i);
      fireEvent.change(dateInput, { target: { value: '2024-02-10' } });

      const timeSelect = screen.getByLabelText(/choose time/i);
      const options = Array.from(timeSelect.options).map(option => option.value);
      
      expect(options).not.toContain('17:00');
      expect(bookingStorage.getBookingsByDate).toHaveBeenCalledWith('2024-02-10');
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    test('Prevents form submission with invalid data', () => {
      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      expect(mockSubmitForm).not.toHaveBeenCalled();
      expect(bookingStorage.saveBooking).not.toHaveBeenCalled();
    });

    test('Successfully submits form with valid data', async () => {
      bookingStorage.saveBooking.mockReturnValue(true);

      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      // Fill in form with valid data
      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: '2024-02-10' }
      });
      fireEvent.change(screen.getByLabelText(/choose time/i), {
        target: { value: '18:00' }
      });
      fireEvent.change(screen.getByLabelText(/number of guests/i), {
        target: { value: '4' }
      });
      fireEvent.change(screen.getByLabelText(/occasion/i), {
        target: { value: 'Birthday' }
      });

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(bookingStorage.saveBooking).toHaveBeenCalledWith({
          date: '2024-02-10',
          time: '18:00',
          guests: 4,
          occasion: 'Birthday'
        });
        expect(mockSubmitForm).toHaveBeenCalled();
      });
    });

    test('Handles storage failure during submission', async () => {
      bookingStorage.saveBooking.mockReturnValue(false);

      render(
        <BookingForm 
          availableTimes={mockAvailableTimes} 
          submitForm={mockSubmitForm} 
        />
      );

      // Fill in form with valid data
      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: '2024-02-10' }
      });
      fireEvent.change(screen.getByLabelText(/choose time/i), {
        target: { value: '18:00' }
      });
      fireEvent.change(screen.getByLabelText(/number of guests/i), {
        target: { value: '4' }
      });
      fireEvent.change(screen.getByLabelText(/occasion/i), {
        target: { value: 'Birthday' }
      });

      const submitButton = screen.getByRole('button', { name: /submit reservation/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to save reservation/i)).toBeInTheDocument();
        expect(mockSubmitForm).not.toHaveBeenCalled();
      });
    });
  });
});