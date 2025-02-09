// Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <section aria-label="Contact information">
          <h3>Contact Us</h3>
          <address>
            <p>40 41 Fredrick Street<br />
            Sunderland SR1LN1</p>
            <p>Phone: <a href="tel:+13125550123" aria-label="Call us at (312) 555-0123">(312) 555-0123</a></p>
            <p>Email: <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">info@littlelemon.com</a></p>
          </address>
        </section>
        
        <section aria-label="Social media links">
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="https://facebook.com/littlelemon" aria-label="Visit our Facebook page">Facebook</a></li>
            <li><a href="https://instagram.com/littlelemon" aria-label="Follow us on Instagram">Instagram</a></li>
            <li><a href="https://twitter.com/littlelemon" aria-label="Follow us on Twitter">Twitter</a></li>
          </ul>
        </section>
        
        <section aria-label="Opening hours">
          <h3>Opening Hours</h3>
          <ul>
            <li><span className="day">Monday - Friday:</span> <time>11:00 AM - 10:00 PM</time></li>
            <li><span className="day">Saturday - Sunday:</span> <time>10:00 AM - 11:00 PM</time></li>
          </ul>
        </section>
      </div>
      
      <div className="copyright">
        <p role="contentinfo">&copy; 2025 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}


export default Footer;