// components/CustomersSay.js
import React from 'react';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';


function CustomersSay() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      comment: "The best Mediterranean food in Chicago! The atmosphere is wonderful and the service is exceptional.",
      image: profile1
    },
    {
      id: 2,
      name: "John D.",
      rating: 5,
      comment: "Authentic flavors and great portion sizes. The grilled fish was cooked to perfection!",
      image: profile2
    },
    {
      id: 3,
      name: "Maria G.",
      rating: 5,
      comment: "Love their homemade bread and the friendly staff. A must-visit restaurant in Chicago!",
      image: profile3
    }
    
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What our customers say!</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <article key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-profile">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="profile-image" 
                  />
                  <h3 className="profile-name">{testimonial.name}</h3>
                </div>
                <div className="rating">
                  {"⭐".repeat(testimonial.rating)}
                </div>
              </div>
              <blockquote className="testimonial-text">
                "{testimonial.comment}"
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomersSay;