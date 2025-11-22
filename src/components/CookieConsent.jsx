import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay slightly to not overwhelm user immediately on load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        right: '20px',
                        zIndex: 999,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div className="glass-panel" style={{
                        maxWidth: '800px',
                        width: '100%',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        background: 'rgba(10, 10, 10, 0.9)', // Darker background for readability
                        border: '1px solid var(--accent-primary)',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                            <div style={{
                                background: 'rgba(127, 29, 29, 0.2)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                color: 'var(--accent-primary)'
                            }}>
                                <Cookie size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Respeitamos sua privacidade</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                                    Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site, em conformidade com a LGPD.
                                    Ao continuar navegando, você concorda com nossa <a href="/privacidade" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Política de Privacidade</a>.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <button
                                onClick={handleAccept}
                                className="btn-primary"
                                style={{ padding: '0.5rem 2rem', fontSize: '0.9rem' }}
                            >
                                Aceitar e Fechar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
