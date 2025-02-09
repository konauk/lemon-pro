// components/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        <li><Link to="/" aria-label="Home page">Home</Link></li>
        <li><Link to="/about" aria-label="About us page">About</Link></li>
        <li><Link to="/menu" aria-label="Restaurant menu">Menu</Link></li>
        <li><Link to="/reservations" aria-label="Make a reservation">Book a Table</Link></li>
        <li><Link to="/order-online" aria-label="Order food online">Order Online</Link></li>
        <li><Link to="/contact" aria-label="Contact information">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;