import React, { useState } from 'react';
import StepWizard from './StepWizard';
import { ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, DollarSign, Clock, ShieldAlert, Zap, Flame, Lock, User, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const InsalubrityCalculator = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        salary: '',
        category: '', // 'geral' or 'saude'
        risks: [], // Array of selected risk IDs
        startDate: '',
        endDate: '',
        isWorking: false,
        // Lead Capture
        name: '',
        phone: ''
    });
    const [result, setResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const MIN_WAGE = 1412;

    const riskOptions = [
        // Insalubridade (Base: Min Wage usually, or Salary for Health)
        { id: 'ruido', label: 'Ruído Excessivo ou Calor', type: 'insalubridade', degree: 0.20, text: 'Insalubridade (Grau Médio)' },
        { id: 'banheiro', label: 'Limpeza de Banheiros (Grande Circulação)', type: 'insalubridade', degree: 0.40, text: 'Insalubridade (Grau Máximo)' },
        { id: 'hosp_geral', label: 'Hospital: Contato Geral', type: 'insalubridade', degree: 0.20, text: 'Insalubridade (Grau Médio)' },
        { id: 'hosp_iso', label: 'Hospital: Isolamento', type: 'insalubridade', degree: 0.40, text: 'Insalubridade (Grau Máximo)' },
        { id: 'quimicos', label: 'Produtos Químicos (Sem EPI)', type: 'insalubridade', degree: 0.40, text: 'Insalubridade (Grau Máximo)' },

        // Periculosidade (Base: Salary)
        { id: 'eletricidade', label: 'Eletricidade (Alta Tensão/Risco)', type: 'periculosidade', degree: 0.30, text: 'Periculosidade (30%)' },
        { id: 'vigilante', label: 'Vigilante / Segurança Armado', type: 'periculosidade', degree: 0.30, text: 'Periculosidade (30%)' },
        { id: 'motoboy', label: 'Motoboy / Uso de Moto', type: 'periculosidade', degree: 0.30, text: 'Periculosidade (30%)' }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleRisk = (id) => {
        setData(prev => {
            const current = prev.risks;
            if (current.includes(id)) return { ...prev, risks: current.filter(r => r !== id) };
            return { ...prev, risks: [...current, id] };
        });
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const calculate = async () => {
        setIsSubmitting(true);
        const salary = parseFloat(data.salary) || MIN_WAGE;
        let bestMonthlyValue = 0;
        let bestType = '';
        let bestDescription = '';

        // Calculate best benefit (Non-cumulative usually)
        data.risks.forEach(riskId => {
            const risk = riskOptions.find(r => r.id === riskId);
            let value = 0;

            if (risk.type === 'periculosidade') {
                // 30% of Salary
                value = salary * 0.30;
            } else {
                // Insalubrity
                // If Health Agent -> Base is Salary (EC 120/2022) - Simplified logic
                // If General -> Base is Min Wage
                const base = data.category === 'saude' ? salary : MIN_WAGE;
                value = base * risk.degree;
            }

            if (value > bestMonthlyValue) {
                bestMonthlyValue = value;
                bestType = risk.type;
                bestDescription = risk.text;
            }
        });

        const start = new Date(data.startDate);
        const end = data.isWorking ? new Date() : new Date(data.endDate);

        // Improved Month Calculation Logic
        const yearsDiff = end.getFullYear() - start.getFullYear();
        const monthsDiff = end.getMonth() - start.getMonth();
        let totalMonths = (yearsDiff * 12) + monthsDiff;

        if (end.getDate() < start.getDate()) {
            totalMonths -= 1;
        }

        // Ensure non-negative
        totalMonths = Math.max(0, totalMonths);


        const PRESCRIBED_MONTHS_LIMIT = 60;

        let lostMonths = 0;
        let recoverableMonths = 0;

        if (totalMonths > PRESCRIBED_MONTHS_LIMIT) {
            lostMonths = totalMonths - PRESCRIBED_MONTHS_LIMIT;
            recoverableMonths = PRESCRIBED_MONTHS_LIMIT;
        } else {
            recoverableMonths = totalMonths;
        }

        const lostAmount = lostMonths * bestMonthlyValue;
        const recoverableAmount = recoverableMonths * bestMonthlyValue;

        const finalResult = {
            monthlyValue: bestMonthlyValue,
            description: bestDescription,
            totalMonths,
            lostMonths,
            lostAmount,
            recoverableMonths,
            recoverableAmount
        };
        setResult(finalResult);

        // Save to Supabase
        try {
            await supabase.from('leads').insert([
                {
                    name: data.name,
                    phone: data.phone,
                    calculator_type: 'insalubridade',
                    data: { ...data, result: finalResult }
                }
            ]);
        } catch (error) {
            console.error('Error saving lead:', error);
        }

        setIsSubmitting(false);
        nextStep();
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className="glass-panel calculator-container" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem', // Fallback
            borderRadius: '24px',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <StepWizard step={step}>
                {/* Step 1: Salary & Category */}
                {step === 0 && (
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Vamos começar pelo básico</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Qual seu Salário Base? (R$)</label>
                            <input
                                type="number"
                                name="salary"
                                value={data.salary}
                                onChange={handleChange}
                                placeholder="Ex: 2500.00"
                                style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', fontSize: '1.2rem' }}
                            />
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                Necessário para calcular Periculosidade e Insalubridade (caso Agente de Saúde).
                            </p>
                        </div>

                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Qual sua categoria profissional?</h4>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button
                                onClick={() => { setData(prev => ({ ...prev, category: 'geral' })); nextStep(); }}
                                style={{
                                    padding: '1.5rem',
                                    background: data.category === 'geral' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Trabalhador Geral</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Indústria, Comércio, Serviços, etc.</span>
                            </button>
                            <button
                                onClick={() => { setData(prev => ({ ...prev, category: 'saude' })); nextStep(); }}
                                style={{
                                    padding: '1.5rem',
                                    background: data.category === 'saude' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    cursor: 'pointer'
                                }}
                            >
                                <strong style={{ display: 'block', fontSize: '1.1rem' }}>Agente de Saúde / Endemias</strong>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Cálculo diferenciado sobre o salário (EC 120/22).</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Risks (Multi-Select) */}
                {step === 1 && (
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>A que você estava exposto?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Marque todas as opções que se aplicam. O sistema calculará o benefício mais vantajoso.
                        </p>

                        <div style={{ display: 'grid', gap: '0.8rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                            {riskOptions.map((item) => (
                                <label
                                    key={item.id}
                                    style={{
                                        padding: '1rem',
                                        background: data.risks.includes(item.id) ? 'rgba(132, 25, 25, 0.2)' : 'rgba(255,255,255,0.05)',
                                        border: data.risks.includes(item.id) ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.risks.includes(item.id)}
                                        onChange={() => toggleRisk(item.id)}
                                        style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <span style={{ display: 'block', fontWeight: '600' }}>{item.label}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {item.type === 'periculosidade' ? 'Periculosidade (Risco de Vida)' : 'Insalubridade (Risco à Saúde)'}
                                        </span>
                                    </div>
                                    {item.type === 'periculosidade' ? <Zap size={18} color="#ffd700" /> : <AlertTriangle size={18} color="#ff9f43" />}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Timeframe */}
                {step === 2 && (
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Quanto tempo durou?</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Data de Início</label>
                                <input type="date" name="startDate" value={data.startDate} onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} />
                            </div>

                            {!data.isWorking && (
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Data Final</label>
                                    <input type="date" name="endDate" value={data.endDate} onChange={handleChange} style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} />
                                </div>
                            )}

                            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="isWorking"
                                    checked={data.isWorking}
                                    onChange={handleChange}
                                    style={{ width: '20px', height: '20px', accentColor: 'var(--accent-primary)' }}
                                />
                                <span>Ainda trabalho nessas condições</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Step 4: Cadastro (Lead Capture) */}
                {step === 3 && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <Lock size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.8rem' }}>Análise Pronta</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Para liberar seu laudo detalhado e a estimativa de valores, informe seus dados abaixo.
                            </p>
                        </div>

                        <div style={{ maxWidth: '400px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Seu Nome Completo"
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', fontSize: '1.1rem' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    placeholder="Seu WhatsApp (com DDD)"
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', fontSize: '1.1rem' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Result Screen */}
                {step === 4 && result && (
                    <div>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <ShieldAlert size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
                            <h3 style={{ fontSize: '1.8rem' }}>Análise de Perdas e Ganhos</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                Baseado em: <strong style={{ color: 'var(--text-primary)' }}>{result.description}</strong>
                            </p>
                        </div>

                        {/* The "Lost Money" Shock */}
                        {result.lostAmount > 0 && (
                            <div style={{
                                background: 'rgba(255, 0, 0, 0.1)',
                                border: '1px solid #ff4444',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                marginBottom: '2rem',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: '#ff4444', fontSize: '1.2rem', marginBottom: '0.5rem' }}>DINHEIRO PERDIDO PARA SEMPRE</h4>
                                <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ff4444' }}>
                                    {formatCurrency(result.lostAmount)}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                    Infelizmente, esse valor prescreveu (passaram-se mais de 5 anos) e não pode mais ser recuperado.
                                </p>
                            </div>
                        )}

                        {/* The "Recoverable" Hope */}
                        <div style={{
                            background: 'rgba(0, 255, 0, 0.05)',
                            border: '1px solid #4caf50',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ color: '#4caf50', fontSize: '1.2rem', marginBottom: '0.5rem' }}>VOCÊ AINDA PODE RECUPERAR</h4>
                            <p style={{ fontSize: '2.5rem', fontWeight: '700', color: '#4caf50' }}>
                                {formatCurrency(result.recoverableAmount)}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                Referente aos últimos 5 anos.
                            </p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                                {result.lostAmount > 0
                                    ? "Não deixe o resto do seu dinheiro prescrever também."
                                    : "Garanta que você receba esse valor antes que o prazo acabe."}
                            </p>
                            <a
                                href={`https://wa.me/5514999999999?text=Olá, fiz o cálculo. Me chamo ${data.name}. Tenho direito a ${result.description} e posso recuperar R$ ${formatCurrency(result.recoverableAmount)}. Quero agir rápido.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    padding: '1.2rem 2.5rem',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 10px 20px rgba(132, 25, 25, 0.3)',
                                    animation: 'pulse 2s infinite'
                                }}
                            >
                                Parar de Perder Dinheiro Agora
                            </a>
                        </div>
                    </div>
                )}
            </StepWizard>

            {/* Navigation Buttons */}
            {step < 4 && (
                <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    {step > 0 ? (
                        <button onClick={prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', fontSize: '1rem', padding: '0.8rem' }}>
                            <ChevronLeft size={20} /> Voltar
                        </button>
                    ) : <div />}

                    {step !== 0 && (
                        <button
                            onClick={step === 3 ? calculate : nextStep}
                            disabled={step === 3 && (!data.name || !data.phone || isSubmitting)}
                            className="nav-button"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                background: (step === 3 && (!data.name || !data.phone)) ? 'gray' : 'var(--text-primary)',
                                color: 'var(--bg-primary)',
                                padding: '0.8rem 2rem',
                                borderRadius: '30px',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: (step === 3 && (!data.name || !data.phone)) ? 'not-allowed' : 'pointer',
                                flex: '1',
                                minWidth: '140px'
                            }}
                        >
                            {step === 3 ? (isSubmitting ? 'Calculando...' : 'Ver Resultado') : 'Próximo'} <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default InsalubrityCalculator;
