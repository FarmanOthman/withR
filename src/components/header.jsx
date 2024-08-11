import React, { useState } from 'react';
import '../styles/navbar.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <div className="navbar">
                <div 
                    className={`hamburger-menu ${isOpen ? 'active' : ''}`} 
                    id="hamburger-menu" 
                    aria-label="Toggle navigation"
                    onClick={handleHamburgerClick}
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <nav className={isOpen ? 'active' : ''}>
                    <ul className="nav-list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="#">The Arts</a></li>
                        <li><a href="#">Balance</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
  });
  

export default Header;
