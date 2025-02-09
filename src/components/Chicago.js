// components/Chicago.js
import React from 'react';
import restaurantImage from '../assets/restaurant.jpg';
import chefsImage from '../assets/lemon-home.jpg';

function Chicago() {
  return (
    <section className="chicago-section">
      <div className="chicago-content">
        <div className="text-content">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Little Lemon Chicago opened its doors in 1995, bringing the authentic 
            flavors of the Mediterranean to the heart of the Windy City. Founded by 
            the Antonopoulos family, our restaurant combines traditional recipes 
            passed down through generations with modern culinary innovations.
          </p>
          <p>
            Our cozy restaurant in downtown Chicago has become a beloved 
            neighborhood institution, where locals and visitors alike gather to 
            enjoy fresh, delicious Mediterranean cuisine in a warm, welcoming 
            atmosphere.
          </p>
        </div>
        <div className="image-content">
          <img 
            src={restaurantImage} 
            alt="Little Lemon Chicago Restaurant Interior" 
            className="chicago-image"
          />
          <img 
            src={chefsImage} 
            alt="Little Lemon Chicago Chefs" 
            className="chicago-image-overlay"
          />
        </div>
      </div>
    </section>
  );
}

export default Chicago;