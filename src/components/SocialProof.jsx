import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    { name: "Maria S.", text: "Profissionalismo impecável. Resolveram meu caso com uma agilidade impressionante." },
    { name: "Carlos A.", text: "A atenção aos detalhes e a estratégia usada foram fundamentais para minha vitória." },
    { name: "Fernanda L.", text: "Senti-me acolhida e segura durante todo o processo de divórcio. Recomendo fortemente." },
    { name: "Roberto M.", text: "Excelência técnica e atendimento humanizado. Uma combinação rara." },
    { name: "Juliana P.", text: "Recuperei meus direitos graças à competência do Dr. João Renan." },
];

const TestimonialCard = ({ name, text }) => (
    <div style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        padding: '1.5rem',
        borderRadius: '12px',
        width: '300px',
        marginRight: '2rem',
        flexShrink: 0,
        color: 'var(--text-primary)'
    }}>
        <p style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '0.95rem' }}>"{text}"</p>
        <p style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{name}</p>
    </div>
);

const SocialProof = () => {
    return (
        <section className="section-padding" style={{ overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--text-secondary)' }}>O que dizem nossos clientes</h2>
            </div>

            <div style={{ display: 'flex', width: '100%' }}>
                <motion.div
                    style={{ display: 'flex' }}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SocialProof;
