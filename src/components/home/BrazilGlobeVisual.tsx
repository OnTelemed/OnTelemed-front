"use client"

import React from "react"
import { GlobeAnalytics, brazilMarkers } from "@/components/ui/cobe-globe-analytics"
import { MapPin, ShieldCheck, Activity } from "lucide-react"

export default function BrazilGlobeVisual() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100/40 via-cyan-50/30 to-transparent blur-2xl pointer-events-none" />

      {/* Floating Status Pill Top */}
      <div className="absolute top-4 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-md pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-slate-800 tracking-tight flex items-center gap-1">
          <Activity size={13} className="text-blue-600" />
          Atendimento Ativo 24/7
        </span>
      </div>

      {/* Floating Pill Bottom Right */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white shadow-lg pointer-events-none">
        <MapPin size={13} className="text-cyan-400" />
        <span className="text-xs font-medium tracking-tight">
          26 Estados + Distrito Federal
        </span>
      </div>

      {/* Globe Container */}
      <div className="w-full h-full relative flex items-center justify-center p-4">
        <GlobeAnalytics
          markers={brazilMarkers}
          speed={0.0015}
          initialPhi={4.75}
          initialTheta={-0.12}
          autoRotate={true}
          className="w-full max-w-[420px]"
        />
      </div>
    </div>
  )
}
