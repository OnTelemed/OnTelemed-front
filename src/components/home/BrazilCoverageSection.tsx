"use client";

import React from "react";
import { WorldMap } from "@/components/ui/map";
import { MapPin, Users, FileSignature } from "lucide-react";

export default function BrazilCoverageSection() {
  const brazilDots = [
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo (SP)" },
      end: { lat: -3.1190, lng: -60.0217, label: "Manaus (AM)" },
    },
    {
      start: { lat: -15.7975, lng: -47.8919, label: "Brasília (DF)" },
      end: { lat: -12.9777, lng: -38.5016, label: "Salvador (BA)" },
    },
    {
      start: { lat: -25.4284, lng: -49.2733, label: "Curitiba (PR)" },
      end: { lat: -3.7319, lng: -38.5267, label: "Fortaleza (CE)" },
    },
    {
      start: { lat: -19.9167, lng: -43.9345, label: "Belo Horizonte (MG)" },
      end: { lat: -30.0346, lng: -51.2177, label: "Porto Alegre (RS)" },
    },
    {
      start: { lat: -22.9068, lng: -43.1729, label: "Rio de Janeiro (RJ)" },
      end: { lat: -1.4558, lng: -48.4902, label: "Belém (PA)" },
    },
    {
      start: { lat: -15.6014, lng: -56.0979, label: "Cuiabá (MT)" },
      end: { lat: -8.0476, lng: -34.8770, label: "Recife (PE)" },
    },
    {
      start: { lat: -16.6869, lng: -49.2648, label: "Goiânia (GO)" },
      end: { lat: -27.5954, lng: -48.5480, label: "Florianópolis (SC)" },
    },
  ];

  const highlights = [
    {
      icon: MapPin,
      title: "Atenda pacientes em todos os 26 estados e no DF",
      description: "Sua clínica não fica restrita ao bairro ou cidade. Realize teleconsultas para todo o território nacional.",
    },
    {
      icon: Users,
      title: "Otimização de agenda e novos pacientes",
      description: "Preencha horários ociosos e ofereça retornos rápidos por vídeo sem ocupar salas do consultório.",
    },
    {
      icon: FileSignature,
      title: "Receitas digitais válidas nacionalmente",
      description: "Prescrições com assinatura ICP-Brasil aceitas em todas as farmácias do país.",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          {/* Lado Esquerdo: Texto & Descrição seguindo a tipografia e cores do Hero */}
          <div className="flex gap-6 flex-col">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-left text-foreground leading-[1.2]">
                Multiplique o alcance da sua clínica para pacientes de todo o país
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground text-left leading-relaxed">
                A OnTelemed expande a atuação da sua clínica para além das barreiras geográficas. Atenda no consultório e realize teleconsultas seguras para pacientes de qualquer cidade do Brasil.
              </p>
            </div>

            {/* Lista de destaques */}
            <div className="space-y-4 pt-1">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lado Direito: Brasil na tela pura mesmo (sem card, sem bordas, sem fundo escuro) */}
          <div className="w-full flex items-center justify-center py-4">
            <WorldMap
              dots={brazilDots}
              lineColor="#005bbf"
              showLabels={true}
              animationDuration={2.6}
              loop={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
