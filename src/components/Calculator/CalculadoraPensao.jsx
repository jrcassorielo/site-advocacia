import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Home, ShoppingCart, BookOpen, HeartPulse, Smile, DollarSign, AlertCircle } from 'lucide-react';

const CalculadoraPensao = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        // Moradia
        aluguel: 0, condominio: 0, luz: 0, agua: 0, internet: 0,
        pessoasCasa: 2, // Mãe + Filho (padrão)

        // Alimentação
        mercado: 0, feira: 0, merenda: 0,
        pessoasAlimentacao: 2,

        // Educação (Exclusivo)
        mensalidade: 0, material: 0, transporte: 0, cursos: 0,

        // Saúde (Exclusivo)
        plano: 0, remedios: 0, terapia: 0,

        // Lazer/Outros (Exclusivo)
        roupas: 0, passeios: 0, baba: 0,

        // Recebimento
        pensaoAtual: 0
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const totalMoradia = (data.aluguel + data.condominio + data.luz + data.agua + data.internet) / data.pessoasCasa;
    const totalAlimentacao = (data.mercado + data.feira) / data.pessoasAlimentacao + data.merenda; // Merenda é exclusivo
    const totalEducacao = data.mensalidade + data.material + data.transporte + data.cursos;
    const totalSaude = data.plano + data.remedios + data.terapia;
    const totalLazer = data.roupas + data.passeios + data.baba;

    const custoTotalFilho = totalMoradia + totalAlimentacao + totalEducacao + totalSaude + totalLazer;
    const diferenca = custoTotalFilho - data.pensaoAtual;

    const steps = [
        {
            title: "Vamos calcular o custo real?",
            icon: DollarSign,
            content: (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                        Muitas mães pagam a conta sozinhas sem perceber. <br />
                        Vamos somar tudo para você ter argumentos sólidos.
                    </p>
                    <button className="btn-primary" onClick={() => setStep(1)}>Começar Cálculo</button>
                </div>
            )
        },
        {
            title: "Despesas da Casa (Moradia)",
            icon: Home,
            content: (
                <div className="calc-grid">
                    <label>
                        Aluguel/Parcela
                        <input type="number" name="aluguel" value={data.aluguel || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Condomínio/IPTU
                        <input type="number" name="condominio" value={data.condominio || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Luz/Água/Gás
                        <input type="number" name="luz" value={data.luz || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Internet/TV
                        <input type="number" name="internet" value={data.internet || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                        Quantas pessoas moram na casa? (Incluindo a criança)
                        <input type="number" name="pessoasCasa" value={data.pessoasCasa} onChange={handleChange} min="1" />
                    </label>
                </div>
            )
        },
        {
            title: "Alimentação",
            icon: ShoppingCart,
            content: (
                <div className="calc-grid">
                    <label>
                        Supermercado Mensal
                        <input type="number" name="mercado" value={data.mercado || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Feira/Açougue
                        <input type="number" name="feira" value={data.feira || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Quantas pessoas comem em casa?
                        <input type="number" name="pessoasAlimentacao" value={data.pessoasAlimentacao} onChange={handleChange} min="1" />
                    </label>
                    <label style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                        Lanche Escolar (Exclusivo da Criança)
                        <input type="number" name="merenda" value={data.merenda || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                </div>
            )
        },
        {
            title: "Educação (Exclusivo)",
            icon: BookOpen,
            content: (
                <div className="calc-grid">
                    <label>
                        Mensalidade Escolar
                        <input type="number" name="mensalidade" value={data.mensalidade || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Material/Uniforme (Média Mensal)
                        <input type="number" name="material" value={data.material || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Transporte Escolar
                        <input type="number" name="transporte" value={data.transporte || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Cursos Extras/Reforço
                        <input type="number" name="cursos" value={data.cursos || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                </div>
            )
        },
        {
            title: "Saúde e Bem-estar (Exclusivo)",
            icon: HeartPulse,
            content: (
                <div className="calc-grid">
                    <label>
                        Plano de Saúde
                        <input type="number" name="plano" value={data.plano || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Remédios (Média)
                        <input type="number" name="remedios" value={data.remedios || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Terapia/Psicólogo
                        <input type="number" name="terapia" value={data.terapia || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                </div>
            )
        },
        {
            title: "Lazer e Outros",
            icon: Smile,
            content: (
                <div className="calc-grid">
                    <label>
                        Roupas e Calçados
                        <input type="number" name="roupas" value={data.roupas || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Passeios/Lazer
                        <input type="number" name="passeios" value={data.passeios || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                    <label>
                        Babá
                        <input type="number" name="baba" value={data.baba || ''} onChange={handleChange} placeholder="R$ 0,00" />
                    </label>
                </div>
            )
        },
        {
            title: "Situação Atual",
            icon: AlertCircle,
            content: (
                <div className="calc-grid">
                    <label style={{ gridColumn: '1 / -1' }}>
                        Quanto o pai paga de pensão hoje?
                        <input type="number" name="pensaoAtual" value={data.pensaoAtual || ''} onChange={handleChange} placeholder="R$ 0,00" style={{ fontSize: '1.5rem', padding: '1rem' }} />
                    </label>
                </div>
            )
        },
        {
            title: "Resultado da Análise",
            icon: DollarSign,
            content: (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Custo Real do Filho</p>
                            <h3 style={{ color: 'var(--text-primary)' }}>{custoTotalFilho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                        </div>
                        <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(127, 29, 29, 0.1)' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Ele Paga</p>
                            <h3 style={{ color: 'var(--accent-primary)' }}>{data.pensaoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                            {diferenca > 0 ? "Você está cobrindo sozinha:" : "O valor parece cobrir os custos básicos."}
                        </p>
                        {diferenca > 0 && (
                            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
                                {diferenca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </h2>
                        )}
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            *Este valor deveria ser dividido ou pago proporcionalmente à renda de cada um.
                        </p>
                    </div>

                    <button className="btn-primary" onClick={() => window.open(`https://wa.me/5514996029862?text=Olá, fiz o cálculo no site. O custo do meu filho é ${custoTotalFilho.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} e a pensão é só ${data.pensaoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Quero revisar.`, '_blank')}>
                        Solicitar Revisão de Pensão
                    </button>
                </div>
            )
        }
    ];

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '2rem',
                    position: 'relative',
                    background: 'var(--bg-primary)'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                >
                    <X size={24} />
                </button>

                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        padding: '0.8rem',
                        background: 'rgba(127, 29, 29, 0.1)',
                        borderRadius: '12px',
                        color: 'var(--accent-primary)'
                    }}>
                        {React.createElement(steps[step].icon, { size: 24 })}
                    </div>
                    <div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                            Passo {step + 1} de {steps.length}
                        </span>
                        <h2 style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>{steps[step].title}</h2>
                    </div>
                </div>

                <div style={{ minHeight: '300px' }}>
                    {steps[step].content}
                </div>

                {step > 0 && step < steps.length - 1 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                        <button onClick={() => setStep(s => s - 1)} className="btn-outline" style={{ padding: '0.8rem 1.5rem' }}>
                            <ChevronLeft size={18} style={{ marginRight: '0.5rem' }} /> Voltar
                        </button>
                        <button onClick={() => setStep(s => s + 1)} className="btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                            Próximo <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                )}

                <style>{`
                    .calc-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1.5rem;
                    }
                    .calc-grid label {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        font-size: 0.9rem;
                        color: var(--text-secondary);
                    }
                    .calc-grid input {
                        background: rgba(255,255,255,0.05);
                        border: 1px solid var(--glass-border);
                        padding: 0.8rem;
                        border-radius: 8px;
                        color: var(--text-primary);
                        font-size: 1rem;
                    }
                    .calc-grid input:focus {
                        outline: none;
                        border-color: var(--accent-primary);
                    }
                    @media (max-width: 600px) {
                        .calc-grid { grid-template-columns: 1fr; }
                    }
                `}</style>
            </motion.div>
        </div>
    );
};

export default CalculadoraPensao;
