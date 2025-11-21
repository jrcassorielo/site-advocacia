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
                        <p>Av. Paulista, 1000 - São Paulo, SP</p>
                    </div>
                    <div className="info-item">
                        <h4>Telefone</h4>
                        <p>(11) 99999-9999</p>
                    </div>
                    <div className="info-item">
                        <h4>Email</h4>
                        <p>contato@cassorielotose.adv.br</p>
                    </div>
                </div>

                <form className="contact-form">
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
                    <button type="submit" className="btn">Enviar Mensagem</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
