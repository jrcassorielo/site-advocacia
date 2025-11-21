import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            padding: '4rem 0',
            borderTop: '1px solid var(--glass-border)'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem'
                }}>
                    {/* Brand */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                            CASSORIELO TOSE
                        </h2>
                        <p style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
                            Advocacia de alta performance focada em resultados estratégicos e proteção de direitos.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Links Rápidos</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Início</Link></li>
                            <li><Link to="/trabalhista" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Direito Trabalhista</Link></li>
                            <li><Link to="/previdenciario" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Direito Previdenciário</Link></li>
                            <li><Link to="/familia" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Família e Sucessões</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contato</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <MapPin size={18} color="var(--accent-primary)" />
                                <span>Rua XV das Colinas, 55 - Iacanga/SP</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Mail size={18} color="var(--accent-primary)" />
                                <span>contato@cassorielotose.com.br</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                <Phone size={18} color="var(--accent-primary)" />
                                <span>(14) 99999-9999</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    paddingTop: '2rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                }}>
                    <div>
                        © {new Date().getFullYear()} Cassorielo Tose Advocacia. Todos os direitos reservados.
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Instagram size={20} style={{ cursor: 'pointer', opacity: 0.7 }} />
                        <Linkedin size={20} style={{ cursor: 'pointer', opacity: 0.7 }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
