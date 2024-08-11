import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/nav/navbar.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <div className={`navbar ${isOpen ? 'active' : ''}`}>
                <div 
                    className={`hamburger-menu ${isOpen ? 'active' : ''}`} 
                    aria-label="Toggle navigation"
                    onClick={handleHamburgerClick}
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <nav className={isOpen ? 'active' : ''}>
                    <ul className="nav-list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/the-arts">The Arts</Link></li>
                    <li><Link to="/balance">Balance</Link></li>
                    <li><Link to="/about">About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
