import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Utensils, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const ApoioPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const painPoints = [
        {
            title: "Desvio de Função (Cozinha + Limpeza)",
            desc: "Se você foi contratada para limpeza mas acaba fazendo merenda (ou vice-versa), está trabalhando de graça para o Estado. Buscamos o pagamento das diferenças salariais ou o acúmulo de função."
        },
        {
            title: "Insalubridade por Calor",
            desc: "O trabalho próximo ao fogão industrial gera calor acima do limite legal. Se a empresa não paga o adicional de insalubridade correto, você tem direito a receber os atrasados."
        },
        {
            title: "Produtos Químicos",
            desc: "O manuseio diário de cloro, água sanitária e outros produtos de limpeza sem os EPIs adequados gera direito ao adicional de insalubridade (grau médio ou máximo)."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado para Merendeiras e Apoio | Desvio de Função | Cassorielo Tose</title>
                <meta name="description" content="Defesa para merendeiras e apoio escolar. Indenização por desvio de função (limpeza/cozinha) e insalubridade por calor/químicos." />
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
                            <Utensils size={16} />
                            <span>Direitos das Merendeiras e Apoio</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '2rem', lineHeight: '1.1', fontWeight: '700' }}>
                            Trabalho dobrado merece <br />
                            salário <span className="text-gradient" style={{ fontStyle: 'italic' }}>dobrado</span>.
                        </h1>

                        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px' }}>
                            Muitas vezes você faz o trabalho de duas pessoas e recebe por uma.
                            Seja pelo desvio de função ou pelo calor do fogão, existem direitos trabalhistas que estão sendo ignorados no seu contracheque.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Tenho Direito a Desvio de Função?
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Situações que geram indenização</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Se você passa por isso, procure seus direitos.</p>
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
                        <h2 style={{ marginBottom: '1.5rem' }}>Valorize seu esforço</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Você é essencial para o funcionamento da escola. Não deixe que a prefeitura ou o estado economizem às custas da sua saúde e do seu bolso.
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                            Falar com Especialista
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ApoioPage;
