import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from '../styles/nav/navbar.module.css';

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const handleHamburgerClick = () => {
        setIsActive(!isActive);
    };

    return (
        <header>
            <div className={`${styles.navbar} ${isActive ? styles.active : ''}`}>
                <div 
                    className={`${styles.hamburgerMenu} ${isActive ? styles.active : ''}`} 
                    aria-label="Toggle navigation"
                    onClick={handleHamburgerClick}
                >
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
                <nav className={isActive ? styles.active : ''}>
                    <ul className={styles.navList}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/the-arts">The Arts</Link></li>
                        <li><Link to="/balance">Balance</Link></li>
                        <li><Link to="/add-card">Add Artwork</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
