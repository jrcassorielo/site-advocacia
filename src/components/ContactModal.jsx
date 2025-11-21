import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem' // Ensure spacing from edges
                }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(5px)'
                        }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'relative', // Relative to flex container
                            width: '100%',
                            maxWidth: '500px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '24px',
                            padding: 'clamp(1.5rem, 5vw, 3rem)',
                            zIndex: 1001,
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            boxSizing: 'border-box'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                padding: '0.5rem'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', textAlign: 'center' }}>Vamos Conversar?</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Nossa equipe está pronta para analisar seu caso com a discrição e excelência que você merece.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <a
                                href="https://wa.me/5514999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    background: '#25D366',
                                    color: '#fff',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    textAlign: 'center',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.3',
                                    width: '100%',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <MessageCircle size={24} style={{ flexShrink: 0 }} />
                                <span>Iniciar conversa no WhatsApp</span>
                            </a>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                                <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>ou envie um e-mail</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
                            </div>

                            <input
                                type="email"
                                placeholder="Seu melhor e-mail"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <button style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'var(--accent-primary)',
                                color: 'var(--text-primary)',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                marginTop: '0.5rem'
                            }}>
                                Solicitar Contato
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
