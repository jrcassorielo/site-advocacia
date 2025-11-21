import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        salary: '',
        startDate: '',
        endDate: '',
        reason: 'sem_justa_causa',
        hasUnregisteredPeriod: false,
        unregisteredStartDate: '',
        unregisteredEndDate: '',
    });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const calculate = (e) => {
        e.preventDefault();

        const salary = parseFloat(formData.salary);
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        if (isNaN(salary) || !formData.startDate || !formData.endDate) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Cálculos Básicos (Estimativas)
        const monthsWorked = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const daysWorkedLastMonth = end.getDate();

        let noticePeriod = 0;
        let vacationProportional = 0;
        let thirteenthProportional = 0;
        let fgtsFine = 0;
        let salaryBalance = (salary / 30) * daysWorkedLastMonth;

        // Lógica simplificada baseada no motivo
        if (formData.reason === 'sem_justa_causa') {
            noticePeriod = salary * (1 + (Math.min(monthsWorked / 12, 20) * 3) / 30); // Aviso prévio indenizado (30 + 3 dias/ano)
            vacationProportional = (salary / 12) * (monthsWorked % 12) * 1.33; // + 1/3
            thirteenthProportional = (salary / 12) * (end.getMonth() + 1);
            fgtsFine = (salary * 0.08 * monthsWorked) * 0.40; // Multa 40% sobre saldo estimado
        } else if (formData.reason === 'pedido_demissao') {
            vacationProportional = (salary / 12) * (monthsWorked % 12) * 1.33;
            thirteenthProportional = (salary / 12) * (end.getMonth() + 1);
            // Sem aviso prévio indenizado e sem multa FGTS
        }

        // Cálculo Período Sem Registro
        let unregisteredTotal = 0;
        if (formData.hasUnregisteredPeriod && formData.unregisteredStartDate && formData.unregisteredEndDate) {
            const unregStart = new Date(formData.unregisteredStartDate);
            const unregEnd = new Date(formData.unregisteredEndDate);
            const unregMonths = (unregEnd.getFullYear() - unregStart.getFullYear()) * 12 + (unregEnd.getMonth() - unregStart.getMonth());

            if (unregMonths > 0) {
                // Estimativa do que foi perdido: FGTS (8%) + Férias + 13º + INSS (não entra no bolso direto mas conta)
                // Aqui focamos no que viria pro bolso: FGTS + Multa + Férias + 13º
                const lostFgts = (salary * 0.08 * unregMonths);
                const lostVacation = (salary / 12) * unregMonths * 1.33;
                const lostThirteenth = (salary / 12) * unregMonths;
                unregisteredTotal = lostFgts + lostVacation + lostThirteenth;

                if (formData.reason === 'sem_justa_causa') {
                    unregisteredTotal += lostFgts * 0.40; // Multa sobre o período sem registro
                }
            }
        }

        const total = salaryBalance + noticePeriod + vacationProportional + thirteenthProportional + fgtsFine + unregisteredTotal;

        setResult({
            salaryBalance,
            noticePeriod,
            vacationProportional,
            thirteenthProportional,
            fgtsFine,
            unregisteredTotal,
            total
        });
        setStep(2);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <section id="calculator" className="section calculator">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Calculadora Trabalhista</h2>
                    <h3 className="calculator-subtitle">Simule seus Direitos</h3>
                </div>

                <div className="calculator-card fade-in">
                    {step === 1 ? (
                        <form onSubmit={calculate} className="calculator-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Último Salário Bruto (R$)</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 2500.00"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Motivo da Rescisão</label>
                                    <select name="reason" value={formData.reason} onChange={handleInputChange}>
                                        <option value="sem_justa_causa">Demissão sem Justa Causa</option>
                                        <option value="pedido_demissao">Pedido de Demissão</option>
                                        <option value="justa_causa">Demissão por Justa Causa</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Data de Admissão</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Data de Saída</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="unregistered-section">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="hasUnregisteredPeriod"
                                        checked={formData.hasUnregisteredPeriod}
                                        onChange={handleInputChange}
                                    />
                                    Trabalhei um período sem registro (sem carteira assinada)
                                </label>

                                {formData.hasUnregisteredPeriod && (
                                    <div className="form-grid fade-in">
                                        <div className="form-group">
                                            <label>Início sem Registro</label>
                                            <input
                                                type="date"
                                                name="unregisteredStartDate"
                                                value={formData.unregisteredStartDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Fim sem Registro</label>
                                            <input
                                                type="date"
                                                name="unregisteredEndDate"
                                                value={formData.unregisteredEndDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-calculate">Calcular Rescisão</button>
                        </form>
                    ) : (
                        <div className="result-container fade-in">
                            <h3>Estimativa de Valores a Receber</h3>
                            <div className="result-grid">
                                <div className="result-item">
                                    <span>Saldo de Salário</span>
                                    <strong>{formatCurrency(result.salaryBalance)}</strong>
                                </div>
                                <div className="result-item">
                                    <span>Aviso Prévio</span>
                                    <strong>{formatCurrency(result.noticePeriod)}</strong>
                                </div>
                                <div className="result-item">
                                    <span>Férias + 1/3</span>
                                    <strong>{formatCurrency(result.vacationProportional)}</strong>
                                </div>
                                <div className="result-item">
                                    <span>13º Salário</span>
                                    <strong>{formatCurrency(result.thirteenthProportional)}</strong>
                                </div>
                                <div className="result-item">
                                    <span>Multa FGTS (40%)</span>
                                    <strong>{formatCurrency(result.fgtsFine)}</strong>
                                </div>
                                {result.unregisteredTotal > 0 && (
                                    <div className="result-item highlight">
                                        <span>Direitos Período s/ Registro</span>
                                        <strong>{formatCurrency(result.unregisteredTotal)}</strong>
                                    </div>
                                )}
                            </div>

                            <div className="total-result">
                                <span>Total Estimado:</span>
                                <strong>{formatCurrency(result.total)}</strong>
                            </div>

                            <p className="disclaimer">
                                * Este cálculo é apenas uma estimativa baseada nas informações fornecidas e não substitui um cálculo oficial feito por um contador ou advogado. Valores como descontos de INSS e IRRF não foram deduzidos.
                            </p>

                            <div className="result-actions">
                                <button onClick={() => setStep(1)} className="btn-outline">Refazer Cálculo</button>
                                <a href="#contact" className="btn">Falar com Advogado</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Calculator;
