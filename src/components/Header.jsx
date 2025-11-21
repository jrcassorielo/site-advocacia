import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <div className="logo">
                    <h1>Cassorielo Tose</h1>
                    <span>Advocacia</span>
                </div>

                <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Início</a></li>
                        <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre</a></li>
                        <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Áreas de Atuação</a></li>
                        <li><a href="#contact" onClick={() => setIsMenuOpen(false)} className="btn-contact">Contato</a></li>
                    </ul>
                </nav>

                <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
