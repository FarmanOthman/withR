import React from 'react';
import styles from '../styles/home/hero.module.css'; // Import CSS Module
import roboticHand from '../assets/IMG/3d-rendering-biorobots-concept.png';

const HeroSection = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.mainText}>
                <h1>Next Generation <span className={styles.highlight}>Payment</span> Ways.</h1>
                <p>Our team of experts uses a methodology to identify the credit cards most likely to fit your needs. We examine annual percentage rates, annual fees, and more.</p>
            </div>
            <div className={styles.roboticHand}>
                <img src={roboticHand} alt="Robotic Hand" />
            </div>
        </section>
    );
};

export default HeroSection;
