'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import DadosAcessoPacienteCard from '@/components/common/Cards/DadosACessoPacienteCard/DadosAcessoPacienteCard';
import DadosPessoaisPacienteCard from '@/components/common/Cards/DadosPessoaisPaciente/DadosPessoaisPacienteCard';
import DadosPessoaisMedicoCard from '@/components/common/Cards/DadosPessoaisMedico/DadosPessoaisMedicoCard';
import TermsModal from '@/components/common/Modals/TermsModal/TermsModal';
import createPessoais from '@/lib/axios/pessoais';
import { saveUser, getUserId } from '@/lib/auth';
import { handleApiError } from '@/lib/errorHandler';

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo') === 'medico' ? 'medico' : 'paciente';

  const [step, setStep] = useState<number>(1);
  const [credentials, setCredentials] = useState<{ email?: string; password?: string; userId?: number } | null>(null);
  const [pessoaisData, setPessoaisData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showTerms, setShowTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const resume = searchParams.get('resume');
    if (resume === '1') {
      try {
        const auth = require('@/lib/auth');
        const u = auth?.getUser?.();
        if (u?.id) {
          setCredentials({ email: u.email, password: '', userId: u.id });
        }
      } catch (e) {
        // ignore
      }
      setStep(2);
    }
  }, [searchParams]);

  function handleTipoChange(tipo: string) {
    router.push(`/register?tipo=${tipo}`);
  }

  function handleNextFromStep1(data?: { email: string; password: string; userId?: number }) {
    if (!data) return;
    setCredentials(data || null);
    setStep(2);
  }

  function handleBackFromStep2() {
    setStep(1);
  }

  function handleCompleteStep2(data?: any) {
    setPessoaisData(data || null);
    if (tipoParam === 'medico') {
      handleSubmitMedico(data);
      return;
    }
    setShowTerms(true);
  }

  async function handleSubmitMedico(data: any) {
    if (!data) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const createMedico = (await import('@/lib/axios/medicos')).default;

      const pd = data || {};
      const toISODate = (d: string) => {
        if (!d) return '';
        if (d.includes('/')) {
          const parts = d.split('/');
          if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return d;
      };

      const payload: any = {
        usuario_id: credentials?.userId || null,
        nome_completo: pd?.name || pd?.nome || '',
        data_nascimento: toISODate(pd?.birthDate || pd?.data_nascimento || ''),
        cpf: (pd?.cpf || '').toString().replace(/\D/g, ''),
        sexo: (pd?.gender || pd?.sexo || '').toString().toLowerCase(),
        crm: pd?.crm || '',
        crm_uf: pd?.crm_uf || '',
        rqe: pd?.rqe || null,
        telefone_celular: (pd?.telefone_celular || '').replace(/\D/g, ''),
      };

      Object.keys(payload).forEach((k) => {
        if (payload[k] === null || typeof payload[k] === 'undefined') {
          delete payload[k];
        }
      });

      const resp = await createMedico(payload);

      try {
        const { saveUser } = await import('@/lib/auth');
        if (resp?.user) {
          const user = resp.user || {};
          const token = (resp as any).token || user.token;
          if (token && !user.token) {
            user.token = token;
          }
          if (token) {
            localStorage.setItem('telemedicina_token', token);
          } else {
            localStorage.removeItem('telemedicina_token');
          }
          localStorage.removeItem('token');
          localStorage.removeItem('auth_token');
          saveUser(user);
        }
      } catch (e) {
        // ignore save failures
      }

      router.push('/inicio');
    } catch (err: any) {
      console.error('[RegisterMedico] Erro:', err);
      handleApiError(err, { setGlobalError: setSubmitError });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-split-wrapper">
      {/* Left Panel - Brand / Visual Area */}
      <div className="auth-split-left">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => {
            if (step === 2) {
              handleBackFromStep2();
            } else {
              router.push('/');
            }
          }}
          className="auth-back-btn"
          aria-label="Voltar"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Central brand area */}
        <div className="auth-brand-center">
          <h2 className="auth-brand-title">
            OnTelemed
          </h2>
          <p className="auth-brand-desc">
            {step === 1
              ? 'Crie sua conta para ter acesso a consultas especializadas, receitas digitais e prontuário seguro.'
              : 'Complete suas informações pessoais para finalizar seu cadastro com total segurança.'}
          </p>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="auth-split-right">
        <div className={step === 2 ? 'auth-form-container-wide' : 'auth-form-container'}>
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={() => {
              if (step === 2) {
                handleBackFromStep2();
              } else {
                router.push('/');
              }
            }}
            className="auth-mobile-back-btn"
          >
            <ArrowLeft size={16} />
            {step === 2 ? 'Voltar para etapa 1' : 'Voltar para o início'}
          </button>

          {step === 1 && (
            <DadosAcessoPacienteCard
              onNext={handleNextFromStep1}
              tipoUsuario={tipoParam}
              onTipoChange={handleTipoChange}
            />
          )}

          {step === 2 &&
            (tipoParam === 'medico' ? (
              <DadosPessoaisMedicoCard
                onBack={handleBackFromStep2}
                onComplete={handleCompleteStep2}
                stepLabel="Etapa 2 de 2"
                loading={submitting}
              />
            ) : (
              <DadosPessoaisPacienteCard
                onBack={handleBackFromStep2}
                onComplete={handleCompleteStep2}
              />
            ))}

          <TermsModal
            open={showTerms}
            onCancel={() => setShowTerms(false)}
            loading={submitting}
            onConfirm={async () => {
              setSubmitError(null);
              setSubmitting(true);
              try {
                const estadoCivilForApi = (() => {
                  const v = String(pessoaisData?.marital || pessoaisData?.estado_civil || '').toLowerCase();
                  if (v.startsWith('solte')) return 'solteiro';
                  if (v.startsWith('casad')) return 'casado';
                  if (v.startsWith('divorc')) return 'divorciado';
                  if (v.startsWith('viuv') || v.startsWith('viúv')) return 'viuvo';
                  return (pessoaisData?.estado_civil || '').toLowerCase();
                })();

                const payload: any = {
                  usuario_id: credentials?.userId ?? getUserId(),
                  nome_completo: pessoaisData?.name || pessoaisData?.nome || '',
                  data_nascimento: (() => {
                    const d = (pessoaisData?.birthDate || '').trim();
                    if (!d) return '';
                    if (d.includes('/')) {
                      const parts = d.split('/');
                      if (parts.length === 3) return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                    }
                    return d;
                  })(),
                  cpf: (pessoaisData?.cpf || '').replace(/\D/g, ''),
                  sexo: (() => {
                    const s = (pessoaisData?.gender || pessoaisData?.sexo || '').toString().toLowerCase();
                    if (s === 'm' || s.startsWith('masc')) return 'M';
                    if (s === 'f' || s.startsWith('fem')) return 'F';
                    return '';
                  })(),
                  estado_civil: estadoCivilForApi,
                  telefone: (pessoaisData?.number || '')?.replace(/\D/g, '') || '',
                  endereco: {
                    endereco: pessoaisData?.address || pessoaisData?.endereco || '',
                    numero: String(pessoaisData?.addressNumber || '').replace(/\D/g, ''),
                    complemento: (pessoaisData?.complement || '').trim() || null,
                    bairro: (pessoaisData?.bairro || '').trim() || null,
                    cep: (pessoaisData?.cep || '').replace(/\D/g, '') || null,
                    cidade: (pessoaisData?.cidade || '').trim() || null,
                    estado: (pessoaisData?.estado || '').trim() || null,
                  },
                  nome_mae: (pessoaisData?.motherName || '').trim(),
                  telefone_responsavel: (() => {
                    const v = (pessoaisData?.motherContact || '')?.replace(/\D/g, '') || '';
                    return v ? v : null;
                  })(),
                  aceitou_tcle: true,
                };

                const resp = await createPessoais(payload);
                if (resp?.user) {
                  try {
                    const user = resp.user || {};
                    const token = resp.token || user.token;
                    if (token && !user.token) {
                      user.token = token;
                    }

                    if (token) {
                      localStorage.setItem('telemedicina_token', token);
                    } else {
                      localStorage.removeItem('telemedicina_token');
                    }
                    localStorage.removeItem('token');
                    localStorage.removeItem('auth_token');

                    saveUser(user);
                  } catch (_) {}
                }
                setShowTerms(false);
                router.push('/inicio');
              } catch (err: any) {
                handleApiError(err, { setGlobalError: setSubmitError });
              } finally {
                setSubmitting(false);
              }
            }}
          />

          {submitError && (
            <div className="auth-global-error" style={{ marginTop: '1.25rem' }}>
              {submitError}
            </div>
          )}
          {loading && <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>Enviando...</div>}
          {error && (
            <div className="auth-global-error" style={{ marginTop: '1.25rem' }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}

