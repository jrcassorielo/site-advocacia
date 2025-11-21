import React from 'react';
import './Services.css';

const services = [
    {
        title: "Direito Civil",
        description: "Resolução de conflitos, contratos, responsabilidade civil e direito do consumidor."
    },
    {
        title: "Direito de Família",
        description: "Divórcios, pensão alimentícia, guarda, inventários e planejamento sucessório."
    },
    {
        title: "Direito Trabalhista",
        description: "Defesa de direitos trabalhistas, compliance e assessoria para empresas."
    },
    {
        title: "Direito Empresarial",
        description: "Consultoria jurídica para negócios, contratos sociais e fusões."
    }
];

const Services = () => {
    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Áreas de Atuação</h2>
                    <h3 className="services-subtitle">Especialidades Jurídicas</h3>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon"></div>
                            <h4>{service.title}</h4>
                            <p>{service.description}</p>
                            <a href="#contact" className="service-link">Saiba mais &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
