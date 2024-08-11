import React from 'react';
import '../styles/about/about.css';

function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Who We Are</h1>
          <p>Innovators in Modern Payment Solutions</p>
        </div>
        <div className="hero-image">
          <img 
            src="../assets/IMG/smart-home-background-with-smartphone-control.png"
            alt="Futuristic tech" 
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Our Journey</h2>
        <p>
          Our team of experts has been at the forefront of technological innovation, 
          crafting the future of payment solutions. We are committed to delivering 
          excellence through our advanced methodologies and customer-focused services.
        </p>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img 
              src="../assets/IMG/young-businessman-using-mobile-phone-office-looking-camera.png" 
              alt="Team Member 1" 
            />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img 
              src="../assets/IMG/portrait-handsome-smiling-businessman-office.png" 
              alt="Team Member 2" 
            />
            <h3>John Smith</h3>
            <p>CTO</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline">
        <h2>Our Milestones</h2>
        <div className="timeline-item">
          <h3>2010</h3>
          <p>Founded the company with a vision to revolutionize the payment industry.</p>
        </div>
        <div className="timeline-item">
          <h3>2015</h3>
          <p>Launched our first AI-powered payment processing system.</p>
        </div>
        <div className="timeline-item">
          <h3>2020</h3>
          <p>Expanded globally, serving millions of users worldwide.</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
