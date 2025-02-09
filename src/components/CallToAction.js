// components/CallToAction.js
import React from 'react';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>United Kingdom</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <Link to="/reservations" className="button reserve-button">Reserve a Table</Link>
      </div>
    </section>
  );
}

export default CallToAction;