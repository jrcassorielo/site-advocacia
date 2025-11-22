import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Hero = ({ onOpenModal }) => {
    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '80px', // Navbar height
            overflow: 'hidden'
        }}>
            {/* Backgrounds */}
            <div className="bg-noise" />
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, rgba(127, 29, 29, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1
            }} />

            <div className="container">
                <div className="hero-content" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    flexDirection: 'column-reverse' // Mobile default: Image top (or bottom depending on pref), Text bottom. Let's do Text Top, Image Bottom for standard flow, so column.
                }}>
                    <style>{`
                    .hero-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    @media (min-width: 968px) {
                        .hero-content {
                            flex-direction: row;
                            text-align: left;
                        }
                    }
                `}</style>

                    {/* Text Content */}

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.img
                            src={logo}
                            alt="Cassorielo Tose Advocacia"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                height: '80px',
                                marginBottom: '2rem',
                                filter: 'drop-shadow(0 0 20px rgba(127, 29, 29, 0.2))'
                            }}
                        />

                        <div style={{
                            display: 'inline-flex',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{
                                background: 'rgba(127, 29, 29, 0.1)',
                                border: '1px solid rgba(127, 29, 29, 0.2)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                color: 'var(--accent-primary)',
                                fontWeight: '600'
                            }}>
                                +5.000 Processos
                            </span>
                            <span style={{
                                background: 'rgba(127, 29, 29, 0.1)',
                                border: '1px solid rgba(127, 29, 29, 0.2)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                color: 'var(--accent-primary)',
                                fontWeight: '600'
                            }}>
                                +10 Anos de Atuação
                            </span>
                        </div>

                        <h1 style={{ marginBottom: '1.5rem' }}>
                            Demitido? <span className="text-gradient" style={{ fontStyle: 'italic' }}>Não Assine Nada</span> <br />
                            Antes de Saber Seus Reais Direitos.
                        </h1>

                        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '500px' }}>
                            Empresas erram cálculos — propositalmente ou não. Nossa inteligência jurídica identifica cada centavo que foi sonegado nos últimos 5 anos.
                        </p>

                        <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <style>{`
                                .hero-buttons { justify-content: center; }
                                @media (min-width: 968px) { .hero-buttons { justify-content: flex-start; } }
                            `}</style>
                            <button onClick={onOpenModal} className="btn-primary">
                                Solicitar Análise Gratuita
                            </button>
                            <button className="btn-outline">
                                Conhecer Escritório
                            </button>
                        </div>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '500px',
                            aspectRatio: '3/4',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                        }}>
                            <img
                                src="/assets/carol-window.jpg"
                                alt="Dra. Caroline Cassorielo"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)',
                                opacity: 0.6
                            }} />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="glass-panel"
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                right: '10%',
                                padding: '1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Atuação Nacional</span>
                            <strong style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}>Brasil 🇧🇷</strong>
                            <span style={{ fontSize: '0.9rem' }}>Processos em todos os estados</span>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
