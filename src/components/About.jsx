import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container about-container">
                <div className="about-image">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Escritório" />
                </div>
                <div className="about-content">
                    <h2 className="section-title">Sobre o Escritório</h2>
                    <h3 className="about-subtitle">Compromisso com a justiça e a ética.</h3>
                    <p>
                        A <strong>Cassorielo Tose Advocacia</strong> nasceu com o propósito de oferecer um atendimento jurídico de excelência, pautado na ética, transparência e no compromisso inabalável com os interesses de nossos clientes.
                    </p>
                    <p>
                        Com uma equipe altamente qualificada e em constante atualização, atuamos de forma estratégica para prevenir conflitos e solucionar litígios com agilidade e eficácia.
                    </p>
                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-number">+10</span>
                            <span className="stat-label">Anos de Experiência</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">+500</span>
                            <span className="stat-label">Casos Resolvidos</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
