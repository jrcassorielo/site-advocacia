import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { HeartHandshake, Shield, Users, Scale, Calculator } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import CalculadoraPensao from '../components/Calculator/CalculadoraPensao';

const FamiliaPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCalcOpen, setIsCalcOpen] = useState(false);

    const services = [
        {
            title: "Divórcio Estratégico",
            icon: Scale,
            desc: "Muito além de assinar papéis. Focamos na partilha justa de bens e na blindagem do seu patrimônio, garantindo que você saia dessa fase com segurança financeira."
        },
        {
            title: "Guarda e Convivência",
            icon: Users,
            desc: "O melhor interesse da criança é nossa bússola. Buscamos acordos de convivência que preservem os laços afetivos e evitem traumas desnecessários."
        },
        {
            title: "Planejamento Sucessório",
            icon: Shield,
            desc: "Evite brigas futuras e impostos excessivos. Organizamos a transmissão de bens (testamentos, doações) para garantir a paz da sua família."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado de Família e Divórcio | Proteção Patrimonial | Cassorielo Tose</title>
                <meta name="description" content="Especialistas em Direito de Família. Divórcio, Guarda, Pensão e Inventários com sigilo absoluto e estratégia patrimonial. Atuação humanizada e firme." />
            </Helmet>

            <Navbar onOpenModal={() => setIsModalOpen(true)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <CalculadoraPensao isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />

            <section style={{ paddingTop: '120px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
                <div className="bg-noise" />
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(127, 29, 29, 0.2)',
                                borderRadius: '50px',
                                border: '1px solid rgba(127, 29, 29, 0.3)',
                                marginBottom: '2rem',
                                color: 'var(--accent-primary)',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>
                                <HeartHandshake size={16} />
                                <span>Direito de Família e Sucessões</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '700' }}>
                                Protegendo o que mais importa: <br />
                                Sua Família e <span className="text-gradient" style={{ fontStyle: 'italic' }}>Seu Patrimônio</span>.
                            </h1>

                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                                Momentos delicados exigem uma advocacia que combine acolhimento humano com firmeza técnica.
                                Resolvemos conflitos com discrição, agilidade e foco total na sua segurança jurídica.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Agendar Consulta Sigilosa
                                </button>
                                <button onClick={() => setIsCalcOpen(true)} className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calculator size={20} />
                                    Calcular Pensão
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute',
                                inset: '-20px',
                                background: 'var(--accent-primary)',
                                opacity: 0.1,
                                borderRadius: '24px',
                                transform: 'rotate(3deg)',
                                zIndex: 0
                            }} />
                            <img
                                src="/assets/carol-window.jpg"
                                alt="Dra. Caroline Cassorielo"
                                style={{
                                    width: '100%',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    zIndex: 1,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Atuação Especializada</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Não somos generalistas. Entendemos a complexidade das relações familiares.</p>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {services.map((item, i) => (
                            <motion.div
                                key={i}
                                className="glass-panel"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ padding: '2.5rem' }}
                            >
                                <div style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                    <item.icon size={40} />
                                </div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.05rem' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/assets/carol-desk.jpg"
                                alt="Dra. Caroline no escritório"
                                style={{
                                    width: '100%',
                                    borderRadius: '20px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
                                Advocacia Humanizada, <br />
                                <span className="text-gradient">mas Firme.</span>
                            </h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Sabemos que um processo de família mal conduzido pode gerar traumas para a vida toda.
                                Nossa missão é resolver o problema, não alimentá-lo.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                A Dra. Caroline Cassorielo lidera nossa equipe de família com uma abordagem que prioriza a
                                proteção do seu patrimônio e o bem-estar emocional dos envolvidos, sem abrir mão de uma
                                defesa combativa quando necessário.
                            </p>
                            <button onClick={() => setIsModalOpen(true)} className="btn-outline">
                                Falar com Dra. Caroline
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FamiliaPage;
