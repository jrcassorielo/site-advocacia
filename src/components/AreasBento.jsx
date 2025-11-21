import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Scale } from 'lucide-react';

const AreaCard = ({ title, icon: Icon, description, delay, className = '', to }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'block' }}>
        <motion.div
            className={`glass-panel ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                y: -5,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 20px 40px -10px rgba(127, 29, 29, 0.3)'
            }}
            style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                transition: 'all 0.3s ease'
            }}
        >
            <div>
                <div style={{
                    background: 'rgba(127, 29, 29, 0.2)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(127, 29, 29, 0.3)'
                }}>
                    <Icon size={28} color="var(--accent-primary)" />
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
                <p>{description}</p>
            </div>
            <div style={{
                marginTop: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-primary)',
                fontWeight: '600',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                Saiba mais <span>→</span>
            </div>
        </motion.div>
    </Link>
);

const AreasBento = () => {
    return (
        <section className="section-padding" style={{ position: 'relative' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>Áreas de Atuação</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Expertise jurídica refinada para proteger seu patrimônio e seus direitos com a máxima eficiência.
                    </p>
                </motion.div>

                <div className="bento-grid">
                    {/* Trabalhista - Large Card */}
                    <div className="bento-large">
                        <AreaCard
                            title="Trabalhista"
                            icon={Briefcase}
                            description="Maximização de Rescisões. Revertemos justas causas e recuperamos horas extras, adicionais e desvios de função que a empresa 'esqueceu' de pagar."
                            delay={0}
                            to="/trabalhista"
                        />
                    </div>

                    {/* Previdenciário - Medium Card */}
                    <div className="bento-medium">
                        <AreaCard
                            title="Previdenciário"
                            icon={Scale}
                            description="Aposentadoria Inteligente. Não aceite o primeiro valor do INSS. Planejamos o melhor benefício possível para garantir seu futuro."
                            delay={0.2}
                            to="/previdenciario"
                        />
                    </div>

                    {/* Família - Wide Card */}
                    <div className="bento-wide">
                        <AreaCard
                            title="Família e Sucessões"
                            icon={Users}
                            description="Proteção Patrimonial e Familiar. Resolvemos conflitos delicados (divórcios e inventários) com discrição absoluta e agilidade."
                            delay={0.4}
                            to="/familia"
                        />
                    </div>
                </div>
            </div>
            <style>{`
                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    gap: 1.5rem;
                    grid-auto-rows: minmax(280px, auto);
                }
                
                .bento-large { grid-column: span 12; }
                .bento-medium { grid-column: span 12; }
                .bento-wide { grid-column: span 12; }

                @media (min-width: 900px) {
                    .bento-large { grid-column: span 7; }
                    .bento-medium { grid-column: span 5; }
                    .bento-wide { grid-column: span 12; }
                }
            `}</style>
        </section>
    );
};

export default AreasBento;
