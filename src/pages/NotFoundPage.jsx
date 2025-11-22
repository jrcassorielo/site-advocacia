import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            position: 'relative',
            overflow: 'hidden',
            padding: '2rem'
        }}>
            {/* Background Effects */}
            <div className="bg-noise" />
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                width: '40vw',
                height: '40vw',
                background: 'radial-gradient(circle, rgba(127, 29, 29, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-panel"
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem'
                }}
            >
                <h1 style={{
                    fontSize: '8rem',
                    lineHeight: 1,
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '-1rem'
                }}>
                    404
                </h1>

                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página Não Encontrada</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Parece que o link que você tentou acessar não existe ou foi movido.
                    </p>
                </div>

                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft size={20} /> Voltar para o Início
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
