import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Clock, AlertTriangle, DollarSign, ShieldAlert, Calculator, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const TrabalhistaPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const problems = [
        {
            title: "Reversão de Justa Causa",
            icon: ShieldAlert,
            desc: "A empresa te acusou injustamente para não pagar seus direitos? Provamos a verdade e revertemos para demissão sem justa causa, garantindo saque do FGTS e multa de 40%."
        },
        {
            title: "Rescisão Indireta",
            icon: AlertTriangle,
            desc: "O patrão não paga FGTS, atrasa salário ou comete assédio moral? Você pode 'demitir o patrão' e sair com todos os seus direitos, como se fosse demitido sem justa causa."
        },
        {
            title: "Horas Extras e Banco de Horas",
            icon: Clock,
            desc: "Faz horas extras que não são pagas ou 'somem' do banco de horas? Recuperamos os valores dos últimos 5 anos com juros e correção."
        },
        {
            title: "Vínculo Empregatício (PJ/Sem Registro)",
            icon: Briefcase,
            desc: "Trabalha como funcionário mas te obrigaram a abrir MEI ou não assinaram carteira? Buscamos o reconhecimento do vínculo e o pagamento de tudo o que foi sonegado."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado Trabalhista Especialista | Reversão de Justa Causa e Rescisão | Cassorielo Tose</title>
                <meta name="description" content="Advogado Trabalhista para reclamantes. Especialistas em reverter justa causa, rescisão indireta, horas extras e reconhecimento de vínculo. Não deixe dinheiro na mesa." />
            </Helmet>

            <Navbar onOpenModal={() => setIsModalOpen(true)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Hero Section */}
            <section style={{ paddingTop: '140px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
                <div className="bg-noise" />
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
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
                                <ShieldAlert size={16} />
                                <span>Defesa Exclusiva do Trabalhador</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '700' }}>
                                Demitido ou Forçado a Pedir Demissão? <br />
                                <span className="text-gradient" style={{ fontStyle: 'italic' }}>Não Deixe Dinheiro na Mesa.</span>
                            </h1>

                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px', marginInline: 'auto' }}>
                                A empresa tem um departamento jurídico inteiro para proteger o lucro dela.
                                Você precisa de uma defesa especialista para proteger o <strong>seu sustento</strong>.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Analisar Meu Caso Grátis
                                </button>
                                <button onClick={() => document.getElementById('calculator-section').scrollIntoView({ behavior: 'smooth' })} className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calculator size={20} />
                                    Calcular Rescisão
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problems Grid */}
            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {problems.map((item, i) => (
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
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(127, 29, 29, 0.1)',
                                    borderBottomLeftRadius: '12px',
                                    color: 'var(--accent-primary)',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    ALTA PROCURA
                                </div>
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

            {/* Calculator Callout */}
            <section id="calculator-section" className="section-padding">
                <div className="container">
                    <div className="glass-panel" style={{
                        padding: '4rem',
                        textAlign: 'center',
                        background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(40,10,10,0.9) 100%)',
                        border: '1px solid rgba(127, 29, 29, 0.3)'
                    }}>
                        <div style={{ marginBottom: '2rem', display: 'inline-block', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                            <DollarSign size={48} color="var(--accent-primary)" />
                        </div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ainda não sabe quanto tem para receber?</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                            Nossa calculadora exclusiva usa as mesmas regras da Justiça do Trabalho para estimar o valor real da sua rescisão.
                        </p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="btn-primary"
                            style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}
                        >
                            Usar Calculadora Agora <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TrabalhistaPage;
