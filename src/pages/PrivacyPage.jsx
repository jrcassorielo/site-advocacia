import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
    return (
        <div className="app-container">
            <Helmet>
                <title>Política de Privacidade | Cassorielo Tose Advocacia</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <Navbar />

            <section className="section-padding" style={{ paddingTop: '150px' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                        <h1 style={{ marginBottom: '2rem' }}>Política de Privacidade</h1>

                        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                A sua privacidade é importante para nós. É política do escritório <strong>Cassorielo Tose Advocacia</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.
                            </p>

                            <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Coleta de Dados</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço (ex: cálculo de rescisão ou contato). Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.
                            </p>

                            <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Uso de Dados</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                            </p>

                            <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Compartilhamento</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                            </p>

                            <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Cookies</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                Nosso site pode usar cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                            </p>

                            <h3 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>5. Compromisso do Usuário</h3>
                            <p style={{ marginBottom: '1rem' }}>
                                O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o escritório oferece no site e com caráter enunciativo, mas não limitativo:
                            </p>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                                <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos.</li>
                            </ul>

                            <p style={{ marginTop: '2rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                Esta política é efetiva a partir de <strong>Novembro/2024</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
