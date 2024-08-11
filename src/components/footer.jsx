import React from 'react';
import styles from '../styles/footer/footer.module.css'; // Import the CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>&copy; 2024 JustF. All rights reserved.</p>
      <p className={styles.footerText}>Powered by JustF.</p>
      <p className={styles.footerText}>Developed by Farman Othman.</p>
      <p className={styles.footerText}>Version 1.0.0</p>
    </footer>
  );
};

export default Footer;
