"use client"

import React from "react"
import { FileText, CheckCircle2, QrCode, Shield, Pill, Clock } from "lucide-react"

export default function PrescriptionVisual() {
  return (
    <div className="w-full max-w-[460px] bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/80 relative overflow-hidden select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              Prescrição Médica Digital
            </h4>
            <p className="text-xs text-slate-500">
              Dr. Lucas Albuquerque • CRM 142.890
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
          <CheckCircle2 size={12} />
          ICP-Brasil
        </div>
      </div>

      {/* Medication items */}
      <div className="py-5 space-y-3">
        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center mt-0.5">
              <Pill size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Amoxicilina + Clavulanato 875mg
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Clock size={11} /> 1 comprimido a cada 12h • Uso oral (7 dias)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
            Qtd: 14 comp
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center mt-0.5">
              <Pill size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                Dipirona Monoidratada 500mg/mL
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Clock size={11} /> 30 a 35 gotas se dor ou febre
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
            Qtd: 1 frasco
          </span>
        </div>
      </div>

      {/* Verification footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/40 -mx-6 -mb-6 p-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700">
            <QrCode size={20} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800">
              Validação via QR Code
            </p>
            <p className="text-[10px] text-slate-500">
              Aceito em todas as farmácias e laboratórios
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700">
            <Shield size={12} />
            Assinatura Digital Ativa
          </span>
        </div>
      </div>
    </div>
  )
}
