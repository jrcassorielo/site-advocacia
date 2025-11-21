import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const ProfessoresPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const painPoints = [
        {
            title: "Piso Nacional do Magistério",
            desc: "Muitas prefeituras pagam o valor base abaixo do piso federal ou aplicam reajustes menores do que a lei determina. Essa diferença salarial é cumulativa e deve ser paga retroativamente."
        },
        {
            title: "Hora-Atividade (1/3 da Jornada)",
            desc: "A Lei do Piso garante que 33% da sua carga horária seja para planejamento fora de sala. Se você passa o tempo todo em sala de aula, tem direito a receber essas horas como extras."
        },
        {
            title: "Aposentadoria Especial",
            desc: "O INSS frequentemente ignora o tempo exclusivo de magistério ou indefere pedidos legítimos. Planejamos sua saída para garantir o melhor benefício possível, sem perdas."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado para Professores | Piso Nacional e Aposentadoria | Cassorielo Tose</title>
                <meta name="description" content="Defesa especializada para professores. Cobrança do Piso Nacional do Magistério, horas-atividade e planejamento de aposentadoria especial." />
            </Helmet>

            <Navbar onOpenModal={() => setIsModalOpen(true)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <section style={{ paddingTop: '140px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
                <div className="bg-noise" />
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ maxWidth: '900px' }}
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
                            <GraduationCap size={16} />
                            <span>Direitos do Magistério</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '2rem', lineHeight: '1.1', fontWeight: '700' }}>
                            Ensinar é vocação. <br />
                            Receber o justo é <span className="text-gradient" style={{ fontStyle: 'italic' }}>direito</span>.
                        </h1>

                        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px' }}>
                            Você dedica sua vida a formar o futuro, mas muitas vezes seu próprio futuro financeiro é negligenciado pelo Estado.
                            Lutamos para que o Piso Nacional e a Hora-Atividade saiam do papel e vão para o seu bolso.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Conferir se meu Piso está correto
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>O que costumam "esquecer" de pagar</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Três violações comuns que reduzem o salário do professor.</p>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                        {painPoints.map((item, i) => (
                            <motion.div
                                key={i}
                                className="glass-panel"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{
                                    position: 'absolute', top: 0, right: 0, padding: '1rem',
                                    opacity: 0.1, transform: 'scale(3)', pointerEvents: 'none'
                                }}>
                                    <AlertTriangle size={100} />
                                </div>

                                <div style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
                                    <CheckCircle size={40} />
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
                    <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(145deg, rgba(20,20,20,0.9), rgba(127,29,29,0.1))' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Valorize sua carreira</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Não deixe para depois. A revisão do Piso e da Hora-Atividade pode significar um aumento real no seu salário mensal e na sua futura aposentadoria.
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                            Falar com Especialista em Educação
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ProfessoresPage;
