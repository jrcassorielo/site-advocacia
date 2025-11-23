import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepWizard from './StepWizard';
import { ChevronRight, ChevronLeft, AlertTriangle, CheckCircle, ShieldAlert, Lock, User, Zap, Briefcase, Clock, HeartPulse, Flame } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';

const RescisaoCalculator = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        // STEP 1: BASICS
        reason: '',
        startDate: '',
        endDate: '',
        noticeType: 'indenizado', // trabalhado, indenizado, nao_teve
        salary: '',
        workShift: '44h', // 44h, 12x36, meio_periodo, outro
        workShiftCustom: '',

        // STEP 2: ROUTINE (Overtime)
        hasOvertime: false,
        overtimeHoursPerWeek: '',
        overtimePercent: '50',
        overtimeReceived: 'nao', // sim, nao, parcial
        hasNightShift: false,
        nightShiftHoursPerWeek: '',
        nightShiftReceived: 'nao',
        lunchBreak: 'sim', // sim, nao
        lunchBreakMinutes: '',

        // STEP 3: HEALTH (Insalubrity)
        isInsalubre: 'nao', // sim, nao, nao_sei
        receivesInsalubridade: 'nao',
        insalubridadeActivity: '', // maximo, medio, minimo
        insalubridadeBase: 'minimo', // minimo, salario

        // STEP 4: RISKS (Periculosidade)
        isDangerous: 'nao', // sim, nao, nao_sei
        receivesPericulosidade: 'nao',
        riskType: '', // eletricidade, inflamaveis, moto, seguranca

        // STEP 5: ROLE (Deviation)
        hasDeviation: false,
        deviationRole: '',
        deviationTargetRole: '',
        hasSalaryDiff: false,
        salaryDiffValue: '', // (Target - Current)

        // FINAL
        amountPaid: '', // Optional
        name: '',
        phone: ''
    });

    const [result, setResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    // --- SIMPLIFIED FORMULAS (BLOCK A & B) ---
    const calculate = async () => {
        setIsSubmitting(true);

        const salary = parseFloat(data.salary) || 0;
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        const today = new Date();

        // Time Constants
        const totalDiffTime = Math.abs(end - start);
        const totalMonthsWorked = Math.floor(totalDiffTime / (1000 * 60 * 60 * 24 * 30.44));
        const totalYearsWorked = Math.floor(totalDiffTime / (1000 * 60 * 60 * 24 * 365.25));

        // 5-Year Limit (60 months)
        const monthsToCalc = Math.min(60, totalMonthsWorked);
        const reflexFactor = 1.30; // +30% for DSR, Vacation, 13th, FGTS

        let rescisao = { total: 0, items: [] };
        let teses = { total: 0, items: [] };

        // --- BLOCK A: RESCISÃO APROXIMADA ---

        // 1. Saldo de Salário
        const daysInMonth = end.getDate();
        const saldoSalario = (salary / 30) * daysInMonth;
        rescisao.total += saldoSalario;
        rescisao.items.push({ label: `Saldo de Salário (${daysInMonth} dias)`, value: saldoSalario });

        // 2. Aviso Prévio
        let avisoValue = 0;
        let projectedEndDate = new Date(end);

        if (data.reason === 'sem_justa_causa') {
            const daysNotice = Math.min(90, 30 + (totalYearsWorked * 3));
            if (data.noticeType === 'indenizado') {
                avisoValue = (salary / 30) * daysNotice;
                rescisao.total += avisoValue;
                rescisao.items.push({ label: `Aviso Prévio Indenizado (${daysNotice} dias)`, value: avisoValue });
                projectedEndDate.setDate(projectedEndDate.getDate() + daysNotice);
            } else if (data.noticeType === 'trabalhado') {
                // Worked notice is salary, already covered or paid. 
            }
        }

        // 3. 13º Proporcional
        if (data.reason !== 'justa_causa') {
            const startYear = start.getFullYear();
            const endYear = projectedEndDate.getFullYear();
            let months13 = projectedEndDate.getMonth() + 1;
            if (projectedEndDate.getDate() < 15) months13--;
            if (startYear === endYear && start.getDate() > 15) months13--; // Started this year
            months13 = Math.max(0, Math.min(12, months13));

            const val13 = (salary / 12) * months13;
            rescisao.total += val13;
            rescisao.items.push({ label: `13º Salário Proporcional (${months13}/12)`, value: val13 });
        }

        // 4. Férias Proporcionais + 1/3
        if (data.reason !== 'justa_causa') {
            // Simplified vesting: months since last anniversary
            const anniversary = new Date(start);
            anniversary.setFullYear(projectedEndDate.getFullYear());
            if (anniversary > projectedEndDate) anniversary.setFullYear(projectedEndDate.getFullYear() - 1);

            let monthsVac = (projectedEndDate.getFullYear() - anniversary.getFullYear()) * 12 + (projectedEndDate.getMonth() - anniversary.getMonth());
            if (projectedEndDate.getDate() >= 15) monthsVac++;
            if (monthsVac < 0) monthsVac += 12;

            const valVac = (salary / 12) * monthsVac;
            const thirdVac = valVac / 3;
            rescisao.total += (valVac + thirdVac);
            rescisao.items.push({ label: `Férias Prop. + 1/3 (${monthsVac}/12)`, value: valVac + thirdVac });
        }

        // 5. Multa 40% FGTS (Estimativa)
        if (data.reason === 'sem_justa_causa') {
            const estimatedBalance = (salary * 0.08) * totalMonthsWorked;
            const fine = estimatedBalance * 0.40;
            rescisao.total += fine;
            rescisao.items.push({ label: 'Multa 40% FGTS (Estimada)', value: fine });
        }

        // --- BLOCK B: TESES (RADAR) ---

        // 1. Horas Extras (Only if NOT received)
        if (data.hasOvertime && data.overtimeHoursPerWeek && data.overtimeReceived === 'nao') {
            const hoursWeek = parseFloat(data.overtimeHoursPerWeek);
            const hoursMonth = hoursWeek * 4.5;
            const hourlyRate = salary / 220;
            const percent = parseFloat(data.overtimePercent) / 100;
            const overtimeRate = hourlyRate * (1 + percent);

            const monthlyVal = hoursMonth * overtimeRate;
            const totalEst = monthlyVal * monthsToCalc * reflexFactor;

            teses.total += totalEst;
            teses.items.push({
                label: 'Horas Extras (Não Pagas)',
                detail: `${hoursWeek}h/sem (5 anos)`,
                value: totalEst,
                flag: true
            });
        }

        // 2. Adicional Noturno (Only if NOT received)
        if (data.hasNightShift && data.nightShiftHoursPerWeek && data.nightShiftReceived === 'nao') {
            const hoursWeek = parseFloat(data.nightShiftHoursPerWeek);
            const hoursMonth = hoursWeek * 4.5;
            const hourlyRate = salary / 220;
            const nightRate = hourlyRate * 0.20; // 20%

            const monthlyVal = hoursMonth * nightRate;
            const totalEst = monthlyVal * monthsToCalc * reflexFactor;

            teses.total += totalEst;
            teses.items.push({
                label: 'Adicional Noturno (Não Pago)',
                detail: `${hoursWeek}h/sem (5 anos)`,
                value: totalEst,
                flag: true
            });
        }

        // 3. Intervalo Intrajornada
        if (data.lunchBreak === 'nao' && data.lunchBreakMinutes) {
            const minutesDone = parseFloat(data.lunchBreakMinutes);
            const minutesOwed = 60 - minutesDone;
            if (minutesOwed > 0) {
                const hoursMonth = (minutesOwed / 60) * 22; // approx 22 days
                const hourlyRate = salary / 220;
                const overtimeRate = hourlyRate * 1.50; // 50%

                const monthlyVal = hoursMonth * overtimeRate;
                const totalEst = monthlyVal * monthsToCalc * reflexFactor;

                teses.total += totalEst;
                teses.items.push({
                    label: 'Intervalo Suprimido',
                    detail: `${minutesOwed}min/dia (5 anos)`,
                    value: totalEst,
                    flag: true
                });
            }
        }

        // 4. Insalubridade
        if (data.isInsalubre === 'sim' && data.receivesInsalubridade === 'nao') {
            const baseVal = data.insalubridadeBase === 'minimo' ? 1412 : salary;

            // Determine Level from Activity
            let percent = 0.20; // Default Medium
            let levelLabel = '20%';

            if (data.insalubridadeActivity === 'maximo') {
                percent = 0.40;
                levelLabel = '40%';
            } else if (data.insalubridadeActivity === 'minimo') {
                percent = 0.10;
                levelLabel = '10%';
            }

            const monthlyVal = baseVal * percent;
            const totalEst = monthlyVal * monthsToCalc * reflexFactor;

            teses.total += totalEst;
            teses.items.push({
                label: 'Adicional de Insalubridade',
                detail: `Grau ${levelLabel} (5 anos)`,
                value: totalEst,
                flag: true
            });
        }

        // 5. Periculosidade
        if (data.isDangerous === 'sim' && data.receivesPericulosidade === 'nao') {
            const monthlyVal = salary * 0.30;
            const totalEst = monthlyVal * monthsToCalc * reflexFactor;

            teses.total += totalEst;
            teses.items.push({
                label: 'Adicional de Periculosidade',
                detail: 'Risco de Vida (30%)',
                value: totalEst,
                flag: true
            });
        }

        // 6. Desvio de Função
        if (data.hasSalaryDiff && data.salaryDiffValue) {
            const diff = parseFloat(data.salaryDiffValue);
            const totalEst = diff * monthsToCalc * reflexFactor;

            teses.total += totalEst;
            teses.items.push({
                label: 'Diferença Salarial (Desvio)',
                detail: 'Equiparação Salarial',
                value: totalEst,
                flag: true
            });
        }

        const finalResult = { rescisao, teses, totalGeral: rescisao.total + teses.total };
        setResult(finalResult);

        // Save Lead
        if (isSupabaseConfigured()) {
            try {
                const { error } = await supabase.from('leads').insert([{
                    name: data.name || 'Anônimo',
                    phone: data.phone || 'Não informado',
                    case_type: 'trabalhista',
                    details: { ...data, result: finalResult }
                }]);
                if (error) console.error('Supabase Error:', error);
                else console.log('Lead saved successfully!');
            } catch (e) { console.error('Save failed:', e); }
        } else {
            console.warn('Supabase not configured. Lead not saved.');
        }

        setIsSubmitting(false);
        nextStep();
    };

    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="glass-panel calculator-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', borderRadius: '24px' }}>
            <StepWizard step={step}>

                {/* STEP 0: BASICS */}
                {step === 0 && (
                    <div>
                        <h3 className="step-title"><User size={24} /> Vamos começar pelo básico</h3>
                        <div className="input-grid">
                            <div className="input-group">
                                <label>Qual foi o motivo da saída?</label>
                                <select name="reason" value={data.reason} onChange={handleChange}>
                                    <option value="">Selecione...</option>
                                    <option value="sem_justa_causa">Dispensa sem Justa Causa</option>
                                    <option value="pedido_demissao">Pedido de Demissão</option>
                                    <option value="justa_causa">Justa Causa</option>
                                    <option value="termino_contrato">Término de Contrato</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Último Salário Base (R$)</label>
                                <input type="number" name="salary" value={data.salary} onChange={handleChange} placeholder="Ex: 2500.00" />
                            </div>
                            <div className="input-group">
                                <label>Data de Admissão</label>
                                <input type="date" name="startDate" value={data.startDate} onChange={handleChange} />
                            </div>
                            <div className="input-group">
                                <label>Data de Saída</label>
                                <input type="date" name="endDate" value={data.endDate} onChange={handleChange} />
                            </div>
                            {data.reason === 'sem_justa_causa' && (
                                <div className="input-group">
                                    <label>Aviso Prévio</label>
                                    <select name="noticeType" value={data.noticeType} onChange={handleChange}>
                                        <option value="indenizado">Indenizado (Recebi sem trabalhar)</option>
                                        <option value="trabalhado">Trabalhado (Cumpri os dias)</option>
                                        <option value="nao_teve">Não tive aviso</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 1: ROUTINE */}
                {step === 1 && (
                    <div>
                        <h3 className="step-title"><Clock size={24} /> A empresa respeitava seu tempo?</h3>

                        <div className="checkbox-list">
                            <label className="checkbox-item">
                                <input type="checkbox" name="hasOvertime" checked={data.hasOvertime} onChange={handleChange} />
                                <span>Fazia horas extras habituais?</span>
                            </label>
                            {data.hasOvertime && (
                                <div className="sub-section">
                                    <label>Média de horas extras por SEMANA:</label>
                                    <input type="number" name="overtimeHoursPerWeek" value={data.overtimeHoursPerWeek} onChange={handleChange} placeholder="Ex: 5" />

                                    <label style={{ marginTop: '1rem', display: 'block' }}>A empresa pagava essas horas?</label>
                                    <select name="overtimeReceived" value={data.overtimeReceived} onChange={handleChange}>
                                        <option value="nao">Não, nunca recebi</option>
                                        <option value="sim">Sim, recebia tudo</option>
                                        <option value="parcial">Recebia só uma parte</option>
                                    </select>
                                </div>
                            )}

                            <label className="checkbox-item">
                                <input type="checkbox" name="hasNightShift" checked={data.hasNightShift} onChange={handleChange} />
                                <span>Trabalhava à noite (22h às 5h)?</span>
                            </label>
                            {data.hasNightShift && (
                                <div className="sub-section">
                                    <label>Média de horas noturnas por SEMANA:</label>
                                    <input type="number" name="nightShiftHoursPerWeek" value={data.nightShiftHoursPerWeek} onChange={handleChange} placeholder="Ex: 10" />

                                    <label style={{ marginTop: '1rem', display: 'block' }}>Recebia Adicional Noturno?</label>
                                    <select name="nightShiftReceived" value={data.nightShiftReceived} onChange={handleChange}>
                                        <option value="nao">Não recebia</option>
                                        <option value="sim">Sim, recebia</option>
                                    </select>
                                </div>
                            )}

                            <div className="input-group" style={{ marginTop: '1rem' }}>
                                <label>Você tinha 1h completa de almoço?</label>
                                <select name="lunchBreak" value={data.lunchBreak} onChange={handleChange}>
                                    <option value="sim">Sim, 1h ou mais</option>
                                    <option value="nao">Não, era menos</option>
                                </select>
                            </div>
                            {data.lunchBreak === 'nao' && (
                                <div className="sub-section">
                                    <label>Quantos minutos você fazia de intervalo?</label>
                                    <input type="number" name="lunchBreakMinutes" value={data.lunchBreakMinutes} onChange={handleChange} placeholder="Ex: 30" />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 2: HEALTH */}
                {step === 2 && (
                    <div>
                        <h3 className="step-title"><HeartPulse size={24} /> Sua saúde foi colocada em risco?</h3>

                        <div className="input-group">
                            <label>Você trabalhava em condições insalubres? (Barulho, calor, produtos químicos, hospital)</label>
                            <select name="isInsalubre" value={data.isInsalubre} onChange={handleChange}>
                                <option value="nao">Não</option>
                                <option value="sim">Sim</option>
                                <option value="nao_sei">Não sei</option>
                            </select>
                        </div>

                        {data.isInsalubre === 'sim' && (
                            <>
                                <div className="input-group">
                                    <label>Você recebia o adicional no holerite?</label>
                                    <select name="receivesInsalubridade" value={data.receivesInsalubridade} onChange={handleChange}>
                                        <option value="nao">Não recebia</option>
                                        <option value="sim">Sim, recebia</option>
                                    </select>
                                </div>

                                {data.receivesInsalubridade === 'nao' && (
                                    <div className="sub-section">
                                        <label>Qual dessas opções descreve melhor seu trabalho?</label>
                                        <div className="radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'start', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                                                <input type="radio" name="insalubridadeActivity" value="maximo" checked={data.insalubridadeActivity === 'maximo'} onChange={handleChange} style={{ marginTop: '4px' }} />
                                                <span>
                                                    <strong>Grau Máximo (40%):</strong> Limpeza de banheiros públicos, contato com esgoto, lixo urbano, ou pacientes em isolamento.
                                                </span>
                                            </label>

                                            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'start', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                                                <input type="radio" name="insalubridadeActivity" value="medio" checked={data.insalubridadeActivity === 'medio'} onChange={handleChange} style={{ marginTop: '4px' }} />
                                                <span>
                                                    <strong>Grau Médio (20%):</strong> Barulho excessivo, calor/frio intenso, manuseio de produtos de limpeza (cloro/ácidos), graxa, óleo, cimento.
                                                </span>
                                            </label>

                                            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'start', background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                                                <input type="radio" name="insalubridadeActivity" value="minimo" checked={data.insalubridadeActivity === 'minimo'} onChange={handleChange} style={{ marginTop: '4px' }} />
                                                <span>
                                                    <strong>Grau Mínimo (10%):</strong> Umidade excessiva ou vibração (menos comum).
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* STEP 3: RISKS */}
                {step === 3 && (
                    <div>
                        <h3 className="step-title"><Flame size={24} /> Risco de Vida (Periculosidade)</h3>

                        <div className="input-group">
                            <label>Você corria risco de vida? (Moto, Eletricidade, Inflamáveis, Segurança)</label>
                            <select name="isDangerous" value={data.isDangerous} onChange={handleChange}>
                                <option value="nao">Não</option>
                                <option value="sim">Sim</option>
                            </select>
                        </div>

                        {data.isDangerous === 'sim' && (
                            <div className="input-group">
                                <label>Você recebia o adicional de Periculosidade (30%)?</label>
                                <select name="receivesPericulosidade" value={data.receivesPericulosidade} onChange={handleChange}>
                                    <option value="nao">Não recebia</option>
                                    <option value="sim">Sim, recebia</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 4: ROLE */}
                {step === 4 && (
                    <div>
                        <h3 className="step-title"><Briefcase size={24} /> Cargo e Função</h3>

                        <label className="checkbox-item">
                            <input type="checkbox" name="hasSalaryDiff" checked={data.hasSalaryDiff} onChange={handleChange} />
                            <span>Tinha colega fazendo a mesma coisa ganhando mais?</span>
                        </label>

                        {data.hasSalaryDiff && (
                            <div className="sub-section">
                                <label>Qual a diferença mensal estimada? (R$)</label>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ex: Ele ganhava 3000, você 2000. Diferença = 1000.</p>
                                <input type="number" name="salaryDiffValue" value={data.salaryDiffValue} onChange={handleChange} placeholder="Ex: 1000.00" />
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 5: LEAD */}
                {step === 5 && (
                    <div className="lead-step">
                        <CheckCircle size={48} color="var(--accent-primary)" />
                        <h3>Análise Pronta!</h3>
                        <p>Calculamos sua rescisão e verificamos 5 teses jurídicas.</p>
                        <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Seu Nome" />
                        <input type="tel" name="phone" value={data.phone} onChange={handleChange} placeholder="Seu WhatsApp" />
                    </div>
                )}

                {/* STEP 6: RESULT */}
                {step === 6 && result && (
                    <div className="result-container">
                        <div className="result-header">
                            <h3>Encontramos Indícios de Direitos Sonegados</h3>
                            <div className="total-badge">
                                <span>Potencial Total Estimado</span>
                                <strong>{formatCurrency(result.totalGeral)}</strong>
                            </div>
                        </div>

                        <div className="result-grid" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                            {/* BLOCK A: RESCISÃO */}
                            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <User size={20} /> Rescisão Básica
                                </h4>
                                <div className="breakdown-list">
                                    {result.rescisao.items.map((item, i) => (
                                        <div key={i} className="breakdown-item">
                                            <span>{item.label}</span>
                                            <span>{formatCurrency(item.value)}</span>
                                        </div>
                                    ))}
                                    <div className="breakdown-item total" style={{ marginTop: '1rem', borderTop: '1px solid white', paddingTop: '0.5rem' }}>
                                        <strong>Total Rescisão</strong>
                                        <strong>{formatCurrency(result.rescisao.total)}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* BLOCK B: TESES */}
                            <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--accent-primary)' }}>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ff9f43' }}>
                                    <AlertTriangle size={20} /> Créditos Recuperáveis (5 Anos)
                                </h4>
                                {result.teses.items.length === 0 ? (
                                    <p>Nenhuma tese adicional identificada.</p>
                                ) : (
                                    <div className="breakdown-list">
                                        {result.teses.items.map((item, i) => (
                                            <div key={i} className="breakdown-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                    <strong>{item.label}</strong>
                                                    <span>{formatCurrency(item.value)}</span>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.detail}</span>
                                            </div>
                                        ))}
                                        <div className="breakdown-item total" style={{ marginTop: '1rem', borderTop: '1px solid white', paddingTop: '0.5rem' }}>
                                            <strong>Total Teses</strong>
                                            <strong>{formatCurrency(result.teses.total)}</strong>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="cta-section" style={{ marginTop: '2rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.9rem' }}>
                                    ⚠️ <strong>Atenção:</strong> Estes valores são <strong>estimativas educativas</strong> baseadas nas suas respostas e consideram reflexos simplificados (30%).
                                    Não substituem o cálculo oficial de um contador ou advogado.
                                </p>
                            </div>
                            <a
                                href={`https://wa.me/5514996029862?text=Olá, fiz o Radar de Direitos. Deu R$ ${formatCurrency(result.totalGeral)}. Quero analisar meu caso.`}
                                target="_blank"
                                className="whatsapp-btn"
                            >
                                Solicitar Análise Gratuita
                            </a>
                        </div>
                    </div>
                )}

            </StepWizard>

            {/* NAV */}
            {step < 6 && (
                <div className="nav-buttons">
                    {step > 0 && <button onClick={prevStep} className="back-btn"><ChevronLeft /> Voltar</button>}
                    <button
                        onClick={step === 5 ? calculate : nextStep}
                        className="next-btn"
                        disabled={step === 0 && (!data.salary || !data.startDate || !data.endDate || !data.reason)}
                    >
                        {step === 5 ? (isSubmitting ? 'Calculando...' : 'Ver Resultado') : 'Próximo'} <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RescisaoCalculator;
