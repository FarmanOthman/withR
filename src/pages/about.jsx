import React from 'react';
import styles from '../styles/about/about.module.css';
import heroImage from '../assets/IMG/smart-home-background-with-smartphone-control.png';
import teamMember1 from '../assets/IMG/young-businessman-using-mobile-phone-office-looking-camera.png';
import teamMember2 from '../assets/IMG/portrait-handsome-smiling-businessman-office.png';

function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Who We Are</h1>
          <p>Innovators in Modern Payment Solutions</p>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="Futuristic tech" />
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <h2>Our Journey</h2>
        <p>
          Our team of experts has been at the forefront of technological innovation, 
          crafting the future of payment solutions. We are committed to delivering 
          excellence through our advanced methodologies and customer-focused services.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamMembers}>
          <div className={styles.teamMember}>
            <img src={teamMember1} alt="Team Member 1" />
            <h3>Jane Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className={styles.teamMember}>
            <img src={teamMember2} alt="Team Member 2" />
            <h3>John Smith</h3>
            <p>CTO</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timeline}>
        <h2>Our Milestones</h2>
        <div className={styles.timelineItem}>
          <h3>2010</h3>
          <p>Founded the company with a vision to revolutionize the payment industry.</p>
        </div>
        <div className={styles.timelineItem}>
          <h3>2015</h3>
          <p>Launched our first AI-powered payment processing system.</p>
        </div>
        <div className={styles.timelineItem}>
          <h3>2020</h3>
          <p>Expanded globally, serving millions of users worldwide.</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
