import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import lawyerImage from '../assets/advogado-hero.jpg';

const WhoWeAre = () => {
    return (
        <section className="section-padding" style={{ position: 'relative' }} id="quem-somos">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Advocacia de <span style={{ color: 'var(--accent-primary)' }}>Alta Performance</span>
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)', marginBottom: '2rem' }} />

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        maxWidth: '800px'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>+10</h3>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Anos de Experiência</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>+5.000</h3>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Processos Ativos</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>BR</h3>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Atuação Nacional</p>
                        </div>
                    </div>
                </motion.div>

                <div className="partners-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Partner 1: João Renan */}
                    <motion.div
                        className="glass-panel"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            padding: '2.5rem',
                            borderRadius: '16px',
                            position: 'relative',
                            marginTop: '0'
                        }}
                    >
                        <div style={{
                            height: '400px',
                            marginBottom: '2rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src={lawyerImage}
                                alt="João Renan Cassorielo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'grayscale(100%) contrast(120%) brightness(0.9)'
                                }}
                            />
                        </div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>João Renan Cassorielo</h3>
                        <p style={{ color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '1rem', letterSpacing: '1px' }}>OAB/SP 360.274 | SÓCIO FUNDADOR</p>

                        <a href="https://instagram.com/joaorenan.cassorielo" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', padding: '0.5rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '50px', transition: 'all 0.3s' }} className="hover-instagram">
                            <Instagram size={18} /> @joaorenan.cassorielo
                        </a>

                        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p>
                                <strong>Raciocínio rápido e obsessão por detalhes.</strong> João não joga para empatar. Especialista em encontrar o "pulo do gato" em contracheques, convenções coletivas e leis municipais que a maioria dos advogados ignora.
                            </p>
                            <p>
                                Sua advocacia é movida a <strong>dados e tecnologia</strong>. Utiliza Inteligência Artificial para antecipar riscos e estruturar teses agressivas contra empresas e o Poder Público. Se existe um crédito escondido no seu processo, ele vai encontrar.
                            </p>
                            <p>
                                <em>"Sem juridiquês. Sem burocracia. Foco total no resultado financeiro do cliente."</em>
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ESPECIALIDADES:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['Direito do Trabalho', 'Servidores Públicos', 'Previdenciário', 'Cálculos Complexos'].map(tag => (
                                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Partner 2: Caroline Tose */}
                    <motion.div
                        className="glass-panel partner-card-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            padding: '2.5rem',
                            borderRadius: '16px',
                            position: 'relative',
                        }}
                    >
                        <div style={{
                            height: '400px',
                            marginBottom: '2rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src="/assets/carol-desk.jpg"
                                alt="Dra. Caroline Tose"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'grayscale(20%) contrast(110%)'
                                }}
                            />
                        </div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Caroline Pereira Tose</h3>
                        <p style={{ color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '1rem', letterSpacing: '1px' }}>OAB/SP 390.871 | SÓCIA FUNDADORA</p>

                        <a href="https://instagram.com/carolinetose" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', padding: '0.5rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '50px', transition: 'all 0.3s' }} className="hover-instagram">
                            <Instagram size={18} /> @carolinetose
                        </a>

                        <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <p>
                                <strong>Técnica, empatia e firmeza.</strong> Carol é a advogada que acolhe a dor do cliente, mas age com frieza estratégica para resolver o problema. Referência em Direito de Família e defesa de servidores, ela traduz o "juridiquês" para a língua da vida real.
                            </p>
                            <p>
                                Com forte presença digital (criadora do quadro <em>"Carol Responde"</em>), ela democratiza o acesso aos direitos, orientando milhares de famílias e trabalhadores. Sua missão é garantir que ninguém seja passado para trás por falta de informação.
                            </p>
                            <p>
                                <em>"Proteção patrimonial e paz familiar não são opostos. São conquistas que exigem estratégia."</em>
                            </p>
                        </div>

                        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>ESPECIALIDADES:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['Direito de Família', 'Direito Previdenciário', 'Defesa da Mulher', 'Educação Jurídica'].map(tag => (
                                    <span key={tag} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <style>{`
                .partner-card-2 { margin-top: 4rem; }
                .hover-instagram:hover { background: rgba(255,255,255,0.1); color: white !important; border-color: white !important; }
                @media (max-width: 768px) {
                    .partner-card-2 { margin-top: 0 !important; }
                    .partners-grid { gap: 2rem !important; }
                }
            `}</style>
        </section>
    );
};

export default WhoWeAre;
