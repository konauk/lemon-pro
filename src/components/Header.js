// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <Link to="/" aria-label="Little Lemon Restaurant home page">
          <img src={logo} alt="Little Lemon Restaurant Logo" className="logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;