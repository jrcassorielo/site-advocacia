import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
    return (
        <div className="app-container">
            <Helmet>
                <title>Contato e Localização | Cassorielo Tose Advocacia</title>
                <meta name="description" content="Entre em contato com nosso escritório. Atendimento presencial em Iacanga/SP e online para todo o Brasil. WhatsApp, Telefone e Endereço." />
            </Helmet>

            <Navbar />

            <section className="section-padding" style={{ paddingTop: '150px' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '4rem'
                    }}>
                        {/* Contact Info */}
                        <div>
                            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Fale Conosco</h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                                Estamos prontos para ouvir o seu caso. Agende uma consulta ou visite nosso escritório.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--accent-primary)' }}><MapPin size={24} /></div>
                                    <div>
                                        <h3 style={{ marginBottom: '0.5rem' }}>Endereço</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>Av. das Nações Unidas, 1234<br />Centro, Iacanga - SP<br />CEP: 17180-000</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--accent-primary)' }}><Phone size={24} /></div>
                                    <div>
                                        <h3 style={{ marginBottom: '0.5rem' }}>Telefone & WhatsApp</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>(14) 99602-9862</p>
                                        <p style={{ color: 'var(--text-secondary)' }}>(14) 3294-1111</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--accent-primary)' }}><Mail size={24} /></div>
                                    <div>
                                        <h3 style={{ marginBottom: '0.5rem' }}>Email</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>contato@cassorielotose.adv.br</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--accent-primary)' }}><Clock size={24} /></div>
                                    <div>
                                        <h3 style={{ marginBottom: '0.5rem' }}>Horário de Atendimento</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>Segunda a Sexta: 08h às 18h</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/5514996029862"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                                style={{ marginTop: '3rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <MessageCircle size={20} />
                                Chamar no WhatsApp
                            </a>
                        </div>

                        {/* Map Placeholder */}
                        <div className="glass-panel" style={{ height: '500px', padding: '0', overflow: 'hidden', borderRadius: '20px' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.4467708772856!2d-49.0234567!3d-21.8589123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94be5cb0c0c0c0c1%3A0x0!2sIacanga%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
