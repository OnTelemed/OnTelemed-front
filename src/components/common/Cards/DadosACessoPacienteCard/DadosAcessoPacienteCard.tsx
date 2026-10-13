'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { isEmailAllowedDomain, doPasswordsMatch, isStrongPassword } from '@/lib/validation/validators';
import createAcesso from '@/lib/axios/acesso';
import { doGoogleRegister } from '@/lib/axios/google';
import signInWithGoogle from '@/lib/google';
import { handleApiError } from '@/lib/errorHandler';

type Props = {
  onNext?: (data?: { email: string; password: string; userId?: number }) => void;
  tipoUsuario?: string; // 'paciente' | 'medico'
  onTipoChange?: (tipo: string) => void;
};

export default function DadosAcessoPacienteCard({ onNext, tipoUsuario = 'paciente', onTipoChange }: Props) {
  const router = useRouter();
  const currentTipo = tipoUsuario === 'medico' ? 'medico' : 'paciente';

  const handleTipoChange = (newTipo: string) => {
    router.push(`/register?tipo=${newTipo}`);
    onTipoChange?.(newTipo);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  function isFormValid() {
    return (
      email.trim().length > 0 &&
      password.length > 0 &&
      confirm.length > 0 &&
      doPasswordsMatch(password, confirm) &&
      isEmailAllowedDomain(email)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setGlobalError('');

    let valid = true;
    if (!isEmailAllowedDomain(email)) {
      setEmailError('Informe um e-mail válido de um provedor suportado (ex: gmail.com).');
      valid = false;
    }
    if (!isStrongPassword(password)) {
      setPasswordError(
        'Use ao menos 6 caracteres com maiúscula, minúscula, número e símbolo especial.'
      );
      valid = false;
    }
    if (!doPasswordsMatch(password, confirm)) {
      setConfirmError('As senhas não conferem.');
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    try {
      const resp = await createAcesso({ email, senha: password, tipo_usuario: currentTipo });
      const userId = resp?.userId;
      onNext?.({ email, password, userId });
    } catch (err: any) {
      handleApiError(err, {
        setGlobalError: setGlobalError,
        setFieldError: (field, msg) => {
          if (field === 'email') setEmailError(msg);
          else if (field === 'senha' || field === 'password') setPasswordError(msg);
          else setGlobalError(msg);
        }
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setGlobalError('');
    setLoading(true);
    try {
      const idToken = await signInWithGoogle();
      const resp = await doGoogleRegister({ id_token: idToken, tipo_usuario: currentTipo });
      const user = resp?.user || null;
      const userId = user?.id || resp?.userId || null;
      onNext?.({ email: user?.email || '', password: '', userId });
    } catch (err: any) {
      handleApiError(err, { setGlobalError: setGlobalError });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-container">
      {/* Header */}
      <div className="auth-header">
        <h1 className="auth-title">
          Crie sua conta
        </h1>
        <p className="auth-subtitle">
          Já tem uma conta?{' '}
          <Link href="/login" className="auth-link">
            Faça Login
          </Link>
        </p>
      </div>

      {/* Tipo de Usuário Selector */}
      <div className="auth-type-section">
        <span className="auth-type-label">
          Tipo de Cadastro
        </span>
        <div className="auth-segmented-control">
          <button
            type="button"
            onClick={() => handleTipoChange('paciente')}
            className={`auth-segment-btn ${currentTipo === 'paciente' ? 'active' : ''}`}
          >
            Paciente
          </button>
          <button
            type="button"
            onClick={() => handleTipoChange('medico')}
            className={`auth-segment-btn ${currentTipo === 'medico' ? 'active' : ''}`}
          >
            Médico(a)
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="auth-form" autoComplete="on">
        {/* Email */}
        <div className="auth-field-group">
          <label className="auth-label">
            Endereço de E-mail
          </label>
          <div className="auth-input-wrapper">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              placeholder="seu.email@exemplo.com"
              className={`auth-input ${emailError ? 'error' : ''}`}
              required
            />
          </div>
          {emailError && <span className="auth-error-text">{emailError}</span>}
        </div>

        {/* Password */}
        <div className="auth-field-group">
          <label className="auth-label">
            Crie uma senha
          </label>
          <div className="auth-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              placeholder="Mínimo 6 caracteres"
              className={`auth-input has-toggle ${passwordError ? 'error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="auth-eye-btn"
              aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {passwordError && <span className="auth-error-text">{passwordError}</span>}
        </div>

        {/* Confirm Password */}
        <div className="auth-field-group">
          <label className="auth-label">
            Confirme sua senha
          </label>
          <div className="auth-input-wrapper">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (confirmError) setConfirmError('');
              }}
              placeholder="Digite a senha novamente"
              className={`auth-input has-toggle ${confirmError ? 'error' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="auth-eye-btn"
              aria-label={showConfirm ? 'Ocultar confirmação' : 'Exibir confirmação'}
            >
              {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
          {confirmError && <span className="auth-error-text">{confirmError}</span>}
        </div>

        {/* Global Error Banner */}
        {globalError && (
          <div className="auth-global-error">
            {globalError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid() || loading}
          className="auth-submit-btn"
        >
          {loading && <Loader2 size={19} className="animate-spin" />}
          <span>{loading ? 'Criando conta...' : 'Criar conta'}</span>
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span className="auth-divider-text">ou continue com</span>
        </div>

        {/* Google Signup */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading}
            className="auth-google-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Cadastrar com Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
