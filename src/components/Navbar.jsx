import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = ({ onOpenModal }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Quem Somos', path: '/#quem-somos' },
        { name: 'Áreas de Atuação', path: '/#areas' },
        { name: 'Blog', path: '/blog' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: scrolled ? '1rem 0' : '2rem 0',
                    transition: 'all 0.4s ease',
                    background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent'
                }}
            >
                <div className="container flex-between">
                    {/* Logo */}
                    <Link to="/" style={{ zIndex: 102, position: 'relative' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <img
                            src={logo}
                            alt="Cassorielo Tose Advocacia"
                            style={{
                                height: scrolled ? '40px' : '50px',
                                objectFit: 'contain',
                                transition: 'height 0.3s ease',
                                filter: 'brightness(1.2)' // Pop against dark bg
                            }}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 500,
                                    position: 'relative'
                                }}
                                className="nav-link"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={onOpenModal}
                            className="btn-primary"
                            style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                        >
                            Falar com Advogado
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{ zIndex: 102, color: 'var(--text-primary)' }}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'var(--bg-primary)',
                            zIndex: 101,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2rem'
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + (i * 0.1) }}
                            >
                                <Link
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontSize: '2rem',
                                        fontFamily: 'var(--font-heading)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onOpenModal();
                            }}
                            className="btn-primary"
                            style={{ marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.2rem' }}
                        >
                            Agendar Consulta
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .desktop-menu { display: flex; }
                .mobile-toggle { display: none; }

                .nav-link:hover { color: var(--text-primary) !important; }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: var(--accent-primary);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after { width: 100%; }

                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}</style>
        </>
    );
};

export default Navbar;
