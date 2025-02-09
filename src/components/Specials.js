// components/Specials.js
import React from 'react';
import greekSalad from '../assets/lemon-home.jpg';

function Specials() {
  const specialsData = [
    {
      id: 1,
      name: "Full course",
      price: "$15.99",
      description: "Fresh romaine lettuce, crispy croutons, shaved parmesan, and our homemade Caesar dressing.",
      image: greekSalad
    },
    // Add more specials here
  ];

  return (
    <section className="specials">
      <div className="section-header">
        <h2>This week's specials!</h2>
        <button className="menu-button">Online Menu</button>
      </div>
      <div className="specials-grid">
        {specialsData.map(special => (
          <article key={special.id} className="special-card">
            <img src={special.image} alt={special.name} className="special-image" />
            <div className="special-content">
              <h3>{special.name}</h3>
              <p className="price">{special.price}</p>
              <p className="description">{special.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;