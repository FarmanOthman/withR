import React from 'react';
import '../styles/hero.css';
import '../styles/responsive.css';
import roboticHand from '../assets/IMG/3d-rendering-biorobots-concept.png';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="main-text">
                <h1>Next Generation <span>Payment</span> Ways.</h1>
                <p>Our team of experts uses a methodology to identify the credit cards most likely to fit your needs. We examine annual percentage rates, annual fees, and more.</p>
            </div>
            <div className="robotic-hand">
                <img src={roboticHand} alt="Robotic Hand" />
            </div>
        </section>
    );
};

export default HeroSection;
