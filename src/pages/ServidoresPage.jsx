import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Landmark, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

const ServidoresPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const painPoints = [
        {
            title: "PASEP Não Depositado",
            desc: "O Banco do Brasil falhou em corrigir os valores das contas individuais de quem entrou antes de 1988. A tese do STJ garante a revisão, que pode ultrapassar R$ 100.000,00 em muitos casos."
        },
        {
            title: "Licença-Prêmio em Pecúnia",
            desc: "Se você se aposentou nos últimos 5 anos e não gozou suas licenças-prêmio, o Estado não pode 'confiscar' esse direito. Convertemos esses meses em dinheiro vivo no seu bolso."
        },
        {
            title: "Reajustes e Quinquênios",
            desc: "Congelamentos ilegais e cálculos errados de adicionais temporais (quinquênio/sexta-parte) corroem seu salário. Buscamos a correção administrativa ou judicial."
        }
    ];

    return (
        <div className="app-container">
            <Helmet>
                <title>Advogado para Servidor Público | PASEP e Licença-Prêmio | Cassorielo Tose</title>
                <meta name="description" content="Servidor Público: Recupere valores do PASEP e Licença-Prêmio não gozada. Análise jurídica especializada para reajustes e direitos administrativos." />
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
                            <Landmark size={16} />
                            <span>Defesa Especializada do Servidor</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '2rem', lineHeight: '1.1', fontWeight: '700' }}>
                            O Estado conta com o seu <br />
                            <span className="text-gradient" style={{ fontStyle: 'italic' }}>desconhecimento</span> para não pagar.
                        </h1>

                        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '700px' }}>
                            Anos de dedicação não podem ser apagados por "erros" administrativos.
                            Seja no PASEP ou na Licença-Prêmio, existe um patrimônio seu que ficou retido nos cofres públicos.
                            Nós sabemos como buscá-lo.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                                Simular Valor do PASEP
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Onde o dinheiro costuma ficar retido</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Identificamos as 3 principais fontes de prejuízo financeiro para servidores.</p>
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
                        <h2 style={{ marginBottom: '1.5rem' }}>Não deixe seu direito prescrever</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            A maioria das ações contra a Fazenda Pública tem prazo de 5 anos.
                            Cada mês que passa é dinheiro que você perde definitivamente.
                        </p>
                        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                            Agendar Análise Jurídica
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ServidoresPage;
