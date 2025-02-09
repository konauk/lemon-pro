// src/App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";

// Create a mock for the logo
// jest.mock('./assets/logo.svg', () => ({
//   default: 'logo.svg'
// }), { virtual: true });

describe("App Component", () => {
  test("renders header with logo", () => {
    render(<App />);
    const logoImage = screen.getByAltText(/little lemon restaurant logo/i);
    expect(logoImage).toBeInTheDocument();
  });

  test("renders navigation menu", () => {
    render(<App />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test("renders footer with copyright", () => {
    render(<App />);
    const copyrightText = screen.getByText(/2025 Little Lemon Restaurant/i);
    expect(copyrightText).toBeInTheDocument();
  });
});