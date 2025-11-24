import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact">
            <div className="container contact-container">
                <div className="contact-info">
                    <h2 className="section-title">Contato</h2>
                    <h3 className="contact-subtitle">Vamos conversar sobre o seu caso?</h3>
                    <p>Entre em contato conosco para agendar uma consulta. Estamos prontos para ouvir você.</p>

                    <div className="info-item">
                        <h4>Endereço</h4>
                        <p>Atendimento Online em Todo o Brasil</p>
                    </div>
                    <div className="info-item">
                        <h4>Telefone / WhatsApp</h4>
                        <p>(14) 99602-9862</p>
                    </div>
                    <div className="info-item">
                        <h4>Email</h4>
                        <p>contato@cassorielotose.adv.br</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target[0].value;
                    const msg = e.target[3].value;
                    const text = `Olá, meu nome é ${name}. ${msg}`;
                    window.open(`https://wa.me/5514996029862?text=${encodeURIComponent(text)}`, '_blank');
                }}>
                    <div className="form-group">
                        <input type="text" placeholder="Seu Nome" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Seu Email" required />
                    </div>
                    <div className="form-group">
                        <input type="tel" placeholder="Seu Telefone" />
                    </div>
                    <div className="form-group">
                        <textarea rows="5" placeholder="Mensagem" required></textarea>
                    </div>
                    <button type="submit" className="btn">Enviar Mensagem no WhatsApp</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
