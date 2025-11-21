import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Stethoscope, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const SaudePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const painPoints = [
        {
            title: "Insalubridade Grau Máximo (40%)",
            desc: "Hospitais pagam 20% (grau médio) como padrão, mas a lei garante 40% para quem atua em isolamento, infectologia ou contato com agentes biológicos de alto risco. A diferença em 5 anos é enorme."
        },
        {
            title: "Piso da Enfermagem",
            desc: "A batalha pelo Piso da Enfermagem é lei. Se o seu empregador não está cumprindo ou não pagou os retroativos devidos, nós entramos com a ação de cobrança imediata."
        },
        {
            title: "Aposentadoria Especial (25 Anos)",
            desc: "A exposição constante a vírus e bactérias garante o direito de se aposentar com 25 anos de contribuição, sem o fator previdenciário que reduz o benefício."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado para Enfermagem e Saúde | Insalubridade 40% | Cassorielo Tose</title>
                <meta name="description" content="Advogado especialista em direitos da saúde. Buscamos insalubridade grau máximo (40%) e pagamento do Piso da Enfermagem." />
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
                            <Stethoscope size={16} />
                            <span>Direitos dos Profissionais da Saúde</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '2rem', lineHeight: '1.1', fontWeight: '700' }}>
                            Você cuida da vida dos outros. <br />
                            Nós cuidamos da <span className="text-gradient" style={{ fontStyle: 'italic' }}>sua carreira</span>.
                        </h1>

                        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px' }}>
                            Não aceite receber menos do que o risco exige. A diferença entre o grau médio (20%) e o máximo (40%) de insalubridade pode mudar sua vida financeira.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Calcular Diferença de Insalubridade
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Riscos que geram indenização</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Seu trabalho envolve riscos invisíveis que devem ser compensados.</p>
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
                        <h2 style={{ marginBottom: '1.5rem' }}>Proteja quem protege</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Seja Enfermeiro, Técnico ou Agente de Saúde: seus direitos são inegociáveis.
                            Vamos analisar seu holerite e buscar o que é justo.
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                            Falar com Especialista em Saúde
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default SaudePage;
