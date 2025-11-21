import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, FileText, Users, Globe, ArrowRight, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const PrevidenciarioPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        {
            title: "Planejamento Previdenciário",
            icon: FileText,
            desc: "Não se aposente no escuro. Analisamos todo seu histórico para definir a melhor data e o maior valor possível para sua aposentadoria."
        },
        {
            title: "BPC / LOAS",
            icon: Users,
            desc: "Benefício de um salário mínimo para idosos (+65) ou pessoas com deficiência de baixa renda, mesmo que nunca tenham contribuído."
        },
        {
            title: "Aposentadoria Especial",
            icon: ShieldCheck,
            desc: "Para quem trabalhou exposto a agentes nocivos (médicos, enfermeiros, vigilantes, metalúrgicos). O tempo vale mais e você se aposenta mais cedo."
        },
        {
            title: "Auxílio-Doença e Invalidez",
            icon: Activity,
            desc: "Se o INSS negou seu benefício mesmo você estando incapaz de trabalhar, nós recorremos na justiça para garantir seu sustento."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado Previdenciário Especialista INSS | Aposentadoria e BPC | Cassorielo Tose</title>
                <meta name="description" content="Especialistas em INSS. Planejamento Previdenciário, Aposentadoria Especial, BPC/LOAS e Revisão de Benefícios. Atendimento online em todo o Brasil." />
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
                                <Globe size={16} />
                                <span>Atendimento Online em Todo o Brasil 🇧🇷</span>
                            </div>

                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '700' }}>
                                Conquiste a <span className="text-gradient" style={{ fontStyle: 'italic' }}>Melhor Aposentadoria</span> <br />
                                para o Seu Futuro.
                            </h1>

                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px', marginInline: 'auto' }}>
                                O INSS comete erros que podem custar milhares de reais ao longo da sua vida.
                                Não aceite o primeiro valor que oferecerem. Especialistas garantem o benefício justo.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                    Simular Minha Aposentadoria
                                </button>
                                <button onClick={() => setIsModalOpen(true)} className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                    Tive meu Benefício Negado
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Soluções Completas para o Segurado</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Do planejamento à concessão judicial.</p>
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

            {/* Authority/Trust Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="glass-panel" style={{
                        padding: '4rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem',
                        alignItems: 'center',
                        background: 'linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(40,10,10,0.9) 100%)',
                        border: '1px solid rgba(127, 29, 29, 0.3)'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Por que contratar um especialista?</h2>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                                A previdência é cheia de detalhes. Um código errado no CNIS pode reduzir sua aposentadoria em 40%.
                                Nós auditamos sua vida laboral inteira para encontrar períodos que o INSS "esqueceu".
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    "Análise de PPP para tempo especial",
                                    "Averbação de tempo rural e militar",
                                    "Recuperação de contribuições em atraso",
                                    "Cálculo de todas as regras de transição"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ArrowRight size={14} color="white" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--accent-primary)', lineHeight: '1' }}>+10</div>
                            <div style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Anos de Experiência</div>

                            <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--accent-primary)', lineHeight: '1' }}>100%</div>
                            <div style={{ fontSize: '1.5rem' }}>Digital e Seguro</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrevidenciarioPage;
