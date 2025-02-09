// src/components/BookingPage.test.js
// src/components/BookingPage.test.js
import { render, screen } from '@testing-library/react';
import BookingPage from './BookingPage';

describe('BookingPage Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockUpdateTimes = jest.fn();
  const mockSubmitForm = jest.fn();

  beforeEach(() => {
    render(
      <BookingPage 
        availableTimes={mockAvailableTimes}
        updateTimes={mockUpdateTimes}
        submitForm={mockSubmitForm}
      />
    );
  });

  test('Renders the BookingPage heading', () => {
    const headingElement = screen.getByText('Reserve a Table');
    expect(headingElement).toBeInTheDocument();
  });

  test('Renders all form fields', () => {
    // Check for date input
    expect(screen.getByLabelText(/reservation date/i)).toBeInTheDocument();
    
    // Check for time select
    expect(screen.getByLabelText(/reservation time/i)).toBeInTheDocument();
    
    // Check for guests input
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    
    // Check for occasion select
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /submit reservation request/i })).toBeInTheDocument();
  });

  test('Form fields have correct accessibility attributes', () => {
    // Date input accessibility
    const dateInput = screen.getByLabelText(/reservation date/i);
    expect(dateInput).toHaveAttribute('aria-required', 'true');
    expect(dateInput).toHaveAttribute('aria-invalid', 'false');
    
    // Time select accessibility
    const timeSelect = screen.getByLabelText(/reservation time/i);
    expect(timeSelect).toHaveAttribute('aria-required', 'true');
    expect(timeSelect).toHaveAttribute('aria-invalid', 'false');
    
    // Guests input accessibility
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
    expect(guestsInput).toHaveAttribute('aria-invalid', 'false');
    
    // Occasion select accessibility
    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute('aria-required', 'true');
    expect(occasionSelect).toHaveAttribute('aria-invalid', 'false');
  });

  test('Form section has correct accessibility attributes', () => {
    const formSection = screen.getByRole('region', { name: /reservation form/i });
    expect(formSection).toBeInTheDocument();
    
    const form = screen.getByRole('form', { name: /reservation form/i });
    expect(form).toBeInTheDocument();
  });
});