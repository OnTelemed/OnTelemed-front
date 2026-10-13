"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Brazilian medical interconnectivity routes in Brazil's 58x60 coordinate system
const BRAZIL_CITY_COORDINATES: Record<string, { x: number; y: number }> = {
  "Brasília": { x: 38.5, y: 31.2 },
  "São Paulo": { x: 40.5, y: 43.3 },
  "Rio de Janeiro": { x: 45.5, y: 41.6 },
  "Manaus": { x: 20.5, y: 12.1 },
  "Salvador": { x: 52.0, y: 26.8 },
  "Recife": { x: 57.5, y: 19.1 },
  "Porto Alegre": { x: 33.5, y: 53.7 },
  "Belém": { x: 38.0, y: 9.5 },
  "Cuiabá": { x: 26.0, y: 30.3 },
  "Fortaleza": { x: 52.0, y: 13.0 },
};

const BRAZIL_ROUTES = [
  { from: "São Paulo", to: "Brasília" },
  { from: "Brasília", to: "Manaus" },
  { from: "Brasília", to: "Salvador" },
  { from: "Brasília", to: "Recife" },
  { from: "Brasília", to: "Porto Alegre" },
  { from: "Brasília", to: "Belém" },
  { from: "Brasília", to: "Cuiabá" },
  { from: "São Paulo", to: "Rio de Janeiro" },
];

export default function BrazilMapVisual() {
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    curveFactor: number = 6
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2 - curveFactor;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none">
      {/* 
        Container LIVRE: 
        Sem card, sem fundo branco retangular, sem borda e sem sombra de container.
        O Brasil ocupa todo o espaço com destaque e centralização total na lateral.
      */}
      <div className="relative w-full max-w-[500px] lg:max-w-[560px] xl:max-w-[620px] aspect-[58/60] flex items-center justify-center">
        {/* Dotted Map com APENAS o Brasil em destaque azul vibrante */}
        <Image
          src="/images/brazil-dotted-map.svg"
          alt="Mapa do Brasil - Cobertura Telemedicina"
          width={580}
          height={600}
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_12px_32px_rgba(2,132,199,0.18)]"
          priority
        />

        {/* SVG interativo sobreposto para as rotas e pulsos de telemedicina */}
        <svg
          viewBox="0 0 58 60"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          <defs>
            <linearGradient id="brazil-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arcos animados de conexão entre as capitais */}
          {BRAZIL_ROUTES.map((route, i) => {
            const start = BRAZIL_CITY_COORDINATES[route.from];
            const end = BRAZIL_CITY_COORDINATES[route.to];
            if (!start || !end) return null;

            return (
              <g key={`route-${i}`}>
                <motion.path
                  d={createCurvedPath(start, end, 3 + (i % 3) * 1.5)}
                  fill="none"
                  stroke="url(#brazil-arc-gradient)"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: [0, 1, 1], opacity: [0.2, 1, 0.4] }}
                  transition={{
                    duration: 2.2,
                    delay: i * 0.25,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}

          {/* Nós/capitais com pulsos animados sutis */}
          {Object.entries(BRAZIL_CITY_COORDINATES).map(([cityName, pt], i) => (
            <g key={`city-${cityName}`}>
              {/* Ponto central */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="0.7"
                fill="#0284c7"
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="0.35"
                fill="#ffffff"
              />

              {/* Pulso expansivo */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="0.7"
                fill="#0284c7"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="0.7"
                  to="2.2"
                  dur="2s"
                  begin={`${(i * 0.18) % 2}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.7"
                  to="0"
                  dur="2s"
                  begin={`${(i * 0.18) % 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
