"use client";

import React from "react";
import Image from "next/image";

export default function ClinicFeaturesSection() {
  const benefits = [
    {
      title: "Agendamento inteligente para consultas presenciais e online",
      description: "Gerencie a grade de todos os médicos em uma única agenda que prevê possíveis faltas.",
    },
    {
      title: "Prontuário eletrônico completo integrado à triagem clínica",
      description: "Histórico do paciente, exames e evolução resumidos em segundos para o médico.",
    },
    {
      title: "Telemedicina integrada diretamente ao prontuário",
      description: "Consultas por vídeo seguras (WebRTC) sem depender de links externos de WhatsApp.",
    },
    {
      title: "Prescrições digitais e atestados com assinatura ICP-Brasil",
      description: "Receitas emitidas na hora e enviadas ao paciente, válidas em qualquer farmácia do país.",
    },
    {
      title: "Gestão centralizada para donos de clínicas particulares",
      description: "Controle de médicos, especialidades cadastradas e fluxo de atendimento em tempo real.",
    },
    {
      title: "Suporte especializado e implantação rápida inclusa",
      description: "Treinamento para sua recepção e corpo clínico operarem sem atrito desde o primeiro dia.",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-background overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Lado Esquerdo: Mockup Isométrico do Sistema da Clínica */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <Image
                src="/images/clinic-management-mockup.png"
                alt="Mockup do Sistema de Gestão de Clínica OnTelemed"
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl select-none pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Lado Direito: Título + Lista de Benefícios */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-foreground leading-[1.2]">
                Tudo o que sua clínica precisa para operar em alta performance
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Elimine o retrabalho na recepção, dê total agilidade aos médicos e proporcione uma experiência impecável aos seus pacientes.
              </p>
            </div>

            <div className="space-y-5">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
