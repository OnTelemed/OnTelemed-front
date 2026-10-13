"use client"

import React from "react"
import { Lock, ShieldCheck, Video, Calendar, UserCheck, HardDrive } from "lucide-react"

export default function SecurityRecordVisual() {
  return (
    <div className="w-full max-w-[460px] bg-slate-950 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-400">
            <Lock size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Prontuário Eletrônico Unificado
            </h4>
            <p className="text-xs text-slate-400">
              Criptografia AES-256 Ponta a Ponta
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold">
          <ShieldCheck size={13} />
          CFM nº 2.314/22
        </div>
      </div>

      {/* Security and Records Details */}
      <div className="py-5 space-y-3">
        {/* Video Consultation item */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Video size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                Sala de Vídeo Criptografada
              </p>
              <p className="text-[11px] text-slate-400">
                Conexão P2P segura sem armazenamento de imagem
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Ativa
          </span>
        </div>

        {/* Clinical History item */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <HardDrive size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                Histórico Clínico Longitudinal
              </p>
              <p className="text-[11px] text-slate-400">
                Laudos, exames e diagnósticos sincronizados
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            LGPD Ok
          </span>
        </div>

        {/* Doctor Validation item */}
        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <UserCheck size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                Acesso Restrito & Auditado
              </p>
              <p className="text-[11px] text-slate-400">
                Apenas médico assistente e paciente com autenticação
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Auditado
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} className="text-slate-500" />
          Retenção segura por 20 anos (CFM)
        </span>
        <span className="text-emerald-400 font-semibold text-[11px]">
          100% Conforme LGPD
        </span>
      </div>
    </div>
  )
}
