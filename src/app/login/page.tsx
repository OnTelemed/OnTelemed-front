'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LoginCard from '@/components/common/Cards/LoginCard/LoginCard';

export default function LoginPage() {
  const router = useRouter();

  function handleLogin(data?: { email: string; password: string }) {
    const user = (data as any)?.user || null;
    if (user && user.registro_full === false) {
      const rawTipo = user.tipo_usuario || user.tipo || user.tipoUsuario || 'paciente';
      const tipo = String(rawTipo || 'paciente').toLowerCase() === 'medico' ? 'medico' : 'paciente';
      router.push(`/register?tipo=${encodeURIComponent(tipo)}&resume=1`);
      return;
    }

    const tipo = String(user?.tipo_usuario || user?.tipo || '').toLowerCase();
    if (tipo === 'admin') {
      router.push('/admin/dashboard');
      return;
    }

    router.push('/inicio');
  }

  return (
    <div className="auth-split-wrapper">
      {/* Left Panel - Brand / Visual Section */}
      <div className="auth-split-left">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="auth-back-btn"
          aria-label="Voltar para a página inicial"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Central brand area */}
        <div className="auth-brand-center">
          <h2 className="auth-brand-title">
            OnTelemed
          </h2>
          <p className="auth-brand-desc">
            Atendimento médico humanizado, tecnologia e segurança na palma da sua mão.
          </p>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="auth-split-right">
        <div className="auth-form-container">
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={() => router.push('/')}
            className="auth-mobile-back-btn"
          >
            <ArrowLeft size={16} />
            Voltar para o início
          </button>

          <LoginCard onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}
