import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, AlertCircle, CheckCircle, MessageCircle, MapPin } from 'lucide-react';

const ProcessTracker = () => {
    const [processNumber, setProcessNumber] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    // MAPPING: CNJ Codes to URLs
    // Format: J.TR (Justice.Tribunal)

    const courts = {
        // --- JUSTIÇA DO TRABALHO (J=5) ---
        '5.01': { name: 'TRT-1 (Rio de Janeiro)', url: 'https://pje.trt1.jus.br/consultaprocessual/' },
        '5.02': { name: 'TRT-2 (SP Capital/Litoral)', url: 'https://pje.trt2.jus.br/consultaprocessual/' },
        '5.03': { name: 'TRT-3 (Minas Gerais)', url: 'https://pje.trt3.jus.br/consultaprocessual/' },
        '5.04': { name: 'TRT-4 (Rio Grande do Sul)', url: 'https://pje.trt4.jus.br/consultaprocessual/' },
        '5.05': { name: 'TRT-5 (Bahia)', url: 'https://pje.trt5.jus.br/consultaprocessual/' },
        '5.06': { name: 'TRT-6 (Pernambuco)', url: 'https://pje.trt6.jus.br/consultaprocessual/' },
        '5.07': { name: 'TRT-7 (Ceará)', url: 'https://pje.trt7.jus.br/consultaprocessual/' },
        '5.08': { name: 'TRT-8 (Pará/Amapá)', url: 'https://pje.trt8.jus.br/consultaprocessual/' },
        '5.09': { name: 'TRT-9 (Paraná)', url: 'https://pje.trt9.jus.br/consultaprocessual/' },
        '5.10': { name: 'TRT-10 (DF/Tocantins)', url: 'https://pje.trt10.jus.br/consultaprocessual/' },
        '5.11': { name: 'TRT-11 (Amazonas/Roraima)', url: 'https://pje.trt11.jus.br/consultaprocessual/' },
        '5.12': { name: 'TRT-12 (Santa Catarina)', url: 'https://pje.trt12.jus.br/consultaprocessual/' },
        '5.13': { name: 'TRT-13 (Paraíba)', url: 'https://pje.trt13.jus.br/consultaprocessual/' },
        '5.14': { name: 'TRT-14 (Rondônia/Acre)', url: 'https://pje.trt14.jus.br/consultaprocessual/' },
        '5.15': { name: 'TRT-15 (Campinas/Interior SP)', url: 'https://pje.trt15.jus.br/consultaprocessual/' },
        '5.16': { name: 'TRT-16 (Maranhão)', url: 'https://pje.trt16.jus.br/consultaprocessual/' },
        '5.17': { name: 'TRT-17 (Espírito Santo)', url: 'https://pje.trt17.jus.br/consultaprocessual/' },
        '5.18': { name: 'TRT-18 (Goiás)', url: 'https://pje.trt18.jus.br/consultaprocessual/' },
        '5.19': { name: 'TRT-19 (Alagoas)', url: 'https://pje.trt19.jus.br/consultaprocessual/' },
        '5.20': { name: 'TRT-20 (Sergipe)', url: 'https://pje.trt20.jus.br/consultaprocessual/' },
        '5.21': { name: 'TRT-21 (Rio Grande do Norte)', url: 'https://pje.trt21.jus.br/consultaprocessual/' },
        '5.22': { name: 'TRT-22 (Piauí)', url: 'https://pje.trt22.jus.br/consultaprocessual/' },
        '5.23': { name: 'TRT-23 (Mato Grosso)', url: 'https://pje.trt23.jus.br/consultaprocessual/' },
        '5.24': { name: 'TRT-24 (Mato Grosso do Sul)', url: 'https://pje.trt24.jus.br/consultaprocessual/' },

        // --- JUSTIÇA ESTADUAL (J=8) ---
        '8.01': { name: 'TJ-AC (Acre)', url: 'https://esaj.tjac.jus.br/cpopg/open.do' },
        '8.02': { name: 'TJ-AL (Alagoas)', url: 'https://www2.tjal.jus.br/cpopg/open.do' },
        '8.03': { name: 'TJ-AP (Amapá)', url: 'https://tucujuris.tjap.jus.br/tucujuris/pages/consultar-processo-publico.html' },
        '8.04': { name: 'TJ-AM (Amazonas)', url: 'https://consultasaj.tjam.jus.br/cpopg/open.do' },
        '8.05': { name: 'TJ-BA (Bahia)', url: 'https://consultapublicapje.tjba.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.06': { name: 'TJ-CE (Ceará)', url: 'https://esaj.tjce.jus.br/cpopg/open.do' },
        '8.07': { name: 'TJ-DFT (Distrito Federal)', url: 'https://pje.tjdft.jus.br/consultapublica/ConsultaPublica/listView.seam' },
        '8.08': { name: 'TJ-ES (Espírito Santo)', url: 'https://pje.tjes.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.09': { name: 'TJ-GO (Goiás)', url: 'https://projudi.tjgo.jus.br/BuscaProcessoPublica' },
        '8.10': { name: 'TJ-MA (Maranhão)', url: 'https://pje.tjma.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.11': { name: 'TJ-MT (Mato Grosso)', url: 'https://pje.tjmt.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.12': { name: 'TJ-MS (Mato Grosso do Sul)', url: 'https://esaj.tjms.jus.br/cpopg5/open.do' },
        '8.13': { name: 'TJ-MG (Minas Gerais)', url: 'https://pje-consulta-publica.tjmg.jus.br/' },
        '8.14': { name: 'TJ-PA (Pará)', url: 'https://pje.tjpa.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.15': { name: 'TJ-PB (Paraíba)', url: 'https://pje.tjpb.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.16': { name: 'TJ-PR (Paraná)', url: 'https://projudi.tjpr.jus.br/projudi_consulta/' },
        '8.17': { name: 'TJ-PE (Pernambuco)', url: 'https://pje.tjpe.jus.br/1g/ConsultaPublica/listView.seam' },
        '8.18': { name: 'TJ-PI (Piauí)', url: 'https://pje.tjpi.jus.br/1g/ConsultaPublica/listView.seam' },
        '8.19': { name: 'TJ-RJ (Rio de Janeiro)', url: 'https://www3.tjrj.jus.br/consultaprocessual/#/consultapublica' },
        '8.20': { name: 'TJ-RN (Rio Grande do Norte)', url: 'https://pje.tjrn.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.21': { name: 'TJ-RS (Rio Grande do Sul)', url: 'https://www.tjrs.jus.br/site_php/consulta/index.php' },
        '8.22': { name: 'TJ-RO (Rondônia)', url: 'https://pje.tjro.jus.br/pje/ConsultaPublica/listView.seam' },
        '8.23': { name: 'TJ-RR (Roraima)', url: 'https://projudi.tjrr.jus.br/projudi/' },
        '8.24': { name: 'TJ-SC (Santa Catarina)', url: 'https://eproc1g.tjsc.jus.br/eproc/externo_controlador.php?acao=processo_consulta_publica' },
        '8.25': { name: 'TJ-SE (Sergipe)', url: 'https://www.tjse.jus.br/portal/consultas/judiciais' },
        '8.26': { name: 'TJ-SP (São Paulo)', url: 'https://esaj.tjsp.jus.br/cpopg/open.do' },
        '8.27': { name: 'TJ-TO (Tocantins)', url: 'https://eproc1.tjto.jus.br/eprocV2_prod_1grau/externo_controlador.php?acao=processo_consulta_publica' },

        // --- JUSTIÇA FEDERAL (J=4) ---
        '4.01': { name: 'TRF-1 (Norte/Centro/BA/MG)', url: 'https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam' },
        '4.02': { name: 'TRF-2 (RJ/ES)', url: 'https://eproc.trf2.jus.br/eproc/externo_controlador.php?acao=processo_consulta_publica' },
        '4.03': { name: 'TRF-3 (SP/MS)', url: 'https://pje1g.trf3.jus.br/consultapublica/ConsultaPublica/listView.seam' },
        '4.04': { name: 'TRF-4 (Sul)', url: 'https://eproc.trf4.jus.br/eproc2trf4/externo_controlador.php?acao=processo_consulta_publica' },
        '4.05': { name: 'TRF-5 (Nordeste)', url: 'https://pje.trf5.jus.br/pje/ConsultaPublica/listView.seam' },
        '4.06': { name: 'TRF-6 (Minas Gerais)', url: 'https://pje1g.trf6.jus.br/consultapublica/ConsultaPublica/listView.seam' }
    };

    const handleSearch = () => {
        setError('');
        setResult(null);

        // Remove non-digits
        const cleanNum = processNumber.replace(/\D/g, '');

        if (cleanNum.length < 14) {
            setError('Número de processo inválido. Digite o número completo (CNJ).');
            return;
        }

        // Extract J and TR
        // Format: 0000000-00.0000.J.TR.0000
        // The standard CNJ is 20 digits.
        // J is at index 13 (14th digit)
        // TR is at index 14,15 (15th and 16th digits)

        if (cleanNum.length !== 20) {
            setError('O número deve ter 20 dígitos (Padrão CNJ).');
            return;
        }

        const J = cleanNum.substring(13, 14);
        const TR = cleanNum.substring(14, 16);
        const key = `${J}.${TR}`;

        const court = courts[key];

        if (court) {
            setResult({
                found: true,
                courtName: court.name,
                url: court.url,
                type: J === '5' ? 'Trabalhista' : J === '8' ? 'Cível/Estadual' : 'Federal'
            });
        } else {
            setResult({
                found: false,
                type: J === '5' ? 'Trabalhista' : J === '8' ? 'Cível/Estadual' : 'Federal',
                region: TR
            });
        }
    };

    return (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Rastreador de Processos 🔍</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                            Descubra onde está seu processo e entenda o andamento sem "juridiquês".
                        </p>
                    </div>

                    <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                        <input
                            type="text"
                            placeholder="Digite o número do processo (Ex: 0010234-55...)"
                            value={processNumber}
                            onChange={(e) => setProcessNumber(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                borderRadius: '50px',
                                border: '1px solid var(--glass-border)',
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                                fontSize: '1.1rem',
                                outline: 'none',
                                textAlign: 'center'
                            }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{
                                position: 'absolute',
                                right: '5px',
                                top: '5px',
                                bottom: '5px',
                                padding: '0 1.5rem',
                                borderRadius: '40px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Buscar <Search size={18} />
                        </button>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ color: '#ff4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <AlertCircle size={18} /> {error}
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel"
                                style={{ background: 'rgba(20, 20, 20, 0.8)', padding: '2rem', marginTop: '2rem' }}
                            >
                                {result.found ? (
                                    <>
                                        <div style={{ color: '#00C851', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <CheckCircle size={24} /> Processo Identificado!
                                        </div>
                                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                            Este é um processo <strong>{result.type}</strong> no tribunal:
                                        </p>
                                        <h3 style={{ fontSize: '2rem', color: 'var(--accent-primary)', marginBottom: '2rem' }}>{result.courtName}</h3>

                                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                                            <a
                                                href={result.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-outline"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            >
                                                Ver Andamento Oficial <ArrowRight size={18} />
                                            </a>
                                            <a
                                                href={`https://wa.me/5514996029862?text=Olá, consultei o processo ${processNumber} no site e gostaria de uma análise jurídica.`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-primary"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                            >
                                                <MessageCircle size={18} /> Pedir Análise do Advogado
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ color: '#ffbb33', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <AlertCircle size={24} /> Tribunal não mapeado automaticamente
                                        </div>
                                        <p style={{ marginBottom: '1.5rem' }}>
                                            Identificamos que é um processo <strong>{result.type}</strong> da Região <strong>{result.region}</strong>,
                                            mas nosso sistema automático ainda não tem o link direto deste tribunal.
                                        </p>
                                        <a
                                            href={`https://wa.me/5514996029862?text=Olá, tenho o processo ${processNumber} (Região ${result.region}) e gostaria de saber o andamento.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-primary"
                                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                        >
                                            <MessageCircle size={18} /> Consultar via WhatsApp
                                        </a>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ProcessTracker;
