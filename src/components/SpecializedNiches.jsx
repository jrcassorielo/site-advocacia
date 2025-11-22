import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Landmark, GraduationCap, Stethoscope, Utensils } from 'lucide-react';

const NicheCard = ({ title, icon: Icon, description, delay, to }) => (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'block' }}>
        <motion.div
            className="glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            whileHover={{
                y: -10,
                borderColor: 'var(--accent-primary)',
                boxShadow: '0 20px 40px -10px rgba(127, 29, 29, 0.3)'
            }}
            style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                height: '100%',
                cursor: 'pointer'
            }}
        >
            <div style={{
                background: 'rgba(127, 29, 29, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(127, 29, 29, 0.2)'
            }}>
                <Icon size={24} color="var(--accent-primary)" />
            </div>

            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Ver Direitos Específicos <span>→</span>
                </span>
            </div>
        </motion.div>
    </Link>
);

const SpecializedNiches = () => {
    const niches = [
        {
            title: "Servidores Públicos",
            icon: Landmark,
            description: "Recuperação de PASEP não depositado, correção de Licença-Prêmio e reajustes salariais atrasados. Atuação administrativa e judicial.",
            delay: 0,
            to: "/servidores"
        },
        {
            title: "Professores",
            icon: GraduationCap,
            description: "Luta pelo cumprimento do Piso Nacional, pagamento correto de Hora-Atividade e planejamento de Aposentadoria Especial do Magistério.",
            delay: 0.1,
            to: "/professores"
        },
        {
            title: "Profissionais da Saúde",
            icon: Stethoscope,
            description: "Agentes de Saúde e Enfermagem: Buscamos o grau máximo de insalubridade (40%) e a correta implementação do Piso da Enfermagem.",
            delay: 0.2,
            to: "/saude"
        },
        {
            title: "Apoio Escolar & Merendeiras",
            icon: Utensils,
            description: "Correção de Desvio de Função (limpeza + cozinha) e adicional de insalubridade por exposição ao calor excessivo e produtos químicos.",
            delay: 0.3,
            to: "/apoio-escolar"
        }
    ];

    return (
        <section className="section-padding" style={{ position: 'relative' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>Defesa Especializada por Carreira</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                        Entendemos as minúcias e os direitos específicos de cada profissão. Não somos generalistas; somos especialistas na sua rotina.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {niches.map((niche, index) => (
                        <NicheCard key={index} {...niche} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecializedNiches;
