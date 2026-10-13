"use client";

import React from "react";
import {
  ShieldCheck,
  HeartHandshake,
  Award,
  FileText,
  CalendarCheck2,
  Video,
  FileCheck2,
} from "lucide-react";
import { SonarGrid } from "@/components/ui/sonar-grid";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: CalendarCheck2,
      title: "Agenda Unificada & Triagem",
      description:
        "Seus pacientes agendam consultas presenciais ou online. A triagem inteligente coleta queixas prévias para agilizar o tempo de consulta.",
    },
    {
      number: "02",
      icon: Video,
      title: "Atendimento Presencial ou Teleconsulta",
      description:
        "O médico atende no consultório físico ou abre a sala virtual segura com 1 clique, com o prontuário eletrônico na mesma tela.",
    },
    {
      number: "03",
      icon: FileCheck2,
      title: "Prescrição ICP-Brasil & Histórico",
      description:
        "Emita receitas digitais, atestados e pedidos de exames válidos em todo o Brasil, salvos automaticamente na história clínica do paciente.",
    },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      badge: "Conformidade Regulatória",
      title: "Segurança & LGPD para Clínicas",
      description:
        "Criptografia de ponta a ponta, prontuário protegido e total conformidade com a LGPD e resoluções do CFM.",
    },
    {
      icon: HeartHandshake,
      badge: "Fidelização de Pacientes",
      title: "Experiência Moderna & Confiança",
      description:
        "Comunicação fluida, pontualidade e a comodidade do paciente escolher entre consulta no consultório ou por vídeo.",
    },
    {
      icon: Award,
      badge: "Gestão do Corpo Clínico",
      title: "Médicos Qualificados & RQE",
      description:
        "Controle os cadastros, CRM, RQE e especialidades de cada médico da sua equipe em um painel centralizado.",
    },
    {
      icon: FileText,
      badge: "Prontuário Eletrônico Único",
      title: "História Clínica de Cada Paciente",
      description:
        "Linha do tempo integrada que unifica consultas presenciais e teleconsultas, exames anteriores e evolução do paciente.",
    },
  ];

  return (
    <SonarGrid
      spacing={26}
      dotRadius={1.4}
      baseOpacity={0.25}
      color="#005bbf"
      pingEvery={2.4}
      speed={250}
      ringWidth={90}
      amplitude={2.2}
      interactive={true}
      className="w-full py-16 lg:py-24 bg-background cursor-default"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.2]">
            Como a OnTelemed simplifica o atendimento da sua clínica
          </h2>
          <p className="mt-3.5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Uma plataforma unificada que conecta recepção, consultório presencial e telemedicina em uma rotina produtiva e sem retrabalho.
          </p>
        </div>

        {/* 3 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-extrabold tracking-tight text-primary/30 font-mono">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Pillars Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Os pilares do nosso atendimento
          </h3>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">
            Estrutura desenhada para garantir máxima segurança ao paciente e excelência ao médico.
          </p>
        </div>

        {/* 4 Pillars Grid (Segurança, Confiança, Médicos Qualificados, História Clínica) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-border/80 bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      {pillar.badge}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SonarGrid>
  );
}
