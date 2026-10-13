"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
  stateCode?: string;
}

export interface MapConnection {
  start: MapPoint;
  end: MapPoint;
}

export interface MapProps {
  dots?: MapConnection[];
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  className?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#005bbf",
  showLabels = true,
  animationDuration = 2.4,
  loop = true,
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Controla a conexão ativa entre estados e suporta hover
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentIdx = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transição sequencial contínua entre as conexões (pausa durante hover)
  useEffect(() => {
    if (!dots || dots.length <= 1 || !loop || hoveredIndex !== null) return;

    const intervalTime = Math.max(animationDuration * 1000, 2800);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dots.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [dots, animationDuration, loop, hoveredIndex]);

  // Mapa pontilhado do Brasil
  const map = useMemo(
    () => new DottedMap({ height: 80, grid: "diagonal", countries: ["BRA"] }),
    []
  );

  const isDark = mounted && theme === "dark";

  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.32,
      color: isDark ? "#ffffff22" : "#005bbf28",
      shape: "circle",
      backgroundColor: "transparent",
    });
  }, [map, isDark]);

  // Projeção precisa das coordenadas (0 0 77 80)
  const projectPoint = (lat: number, lng: number) => {
    try {
      const pin = map.getPin({ lat, lng });
      if (pin && typeof pin.x === "number" && typeof pin.y === "number") {
        return { x: pin.x, y: pin.y };
      }
    } catch {
      // fallback
    }
    const minLat = -33.75;
    const maxLat = 5.27;
    const minLng = -73.98;
    const maxLng = -34.79;
    const x = ((lng - minLng) / (maxLng - minLng)) * 77;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80;
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const curveAmount = Math.max(dist * 0.22, 6);
    const midY = (start.y + end.y) / 2 - curveAmount;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const activeConnection = dots[currentIdx];
  const activeStartPoint = activeConnection
    ? projectPoint(activeConnection.start.lat, activeConnection.start.lng)
    : null;
  const activeEndPoint = activeConnection
    ? projectPoint(activeConnection.end.lat, activeConnection.end.lng)
    : null;

  return (
    <div
      className={`relative w-full max-w-lg mx-auto aspect-[1/1] font-sans select-none bg-transparent ${className}`}
    >
      {/* Background Dotted Map of Brazil */}
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-contain"
        alt="Mapa de atendimento no Brasil"
        height="600"
        width="600"
        draggable={false}
        priority
      />

      {/* SVG Overlay para conexões animadas e transições */}
      <svg
        ref={svgRef}
        viewBox="0 0 77 80"
        className="w-full h-full absolute inset-0 select-none pointer-events-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="brazil-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
            <stop offset="30%" stopColor={lineColor} stopOpacity="0.9" />
            <stop offset="85%" stopColor={lineColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="1" />
          </linearGradient>

          <filter id="brazil-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pontos de cidades estáticos no fundo com suporte a hover */}
        {dots.map((dot, i) => {
          const s = projectPoint(dot.start.lat, dot.start.lng);
          const e = projectPoint(dot.end.lat, dot.end.lng);
          const isCurrent = i === currentIdx;

          return (
            <g
              key={`static-points-${i}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r="0.8"
                fill={isCurrent ? lineColor : isDark ? "#ffffff" : "#09090b"}
                opacity={isCurrent ? 0.95 : 0.25}
                className="transition-all duration-200"
              />
              <circle
                cx={e.x}
                cy={e.y}
                r="0.8"
                fill={isCurrent ? lineColor : isDark ? "#ffffff" : "#09090b"}
                opacity={isCurrent ? 0.95 : 0.25}
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* Transição de Conexão Ativa entre Estados */}
        {activeConnection && activeStartPoint && activeEndPoint && (
          <g key={`active-group-${currentIdx}`}>
            {/* Traçado em curva desenhado de um estado ao outro */}
            <motion.path
              d={createCurvedPath(activeStartPoint, activeEndPoint)}
              fill="none"
              stroke="url(#brazil-path-gradient)"
              strokeWidth="0.85"
              strokeLinecap="round"
              filter="url(#brazil-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
              }}
            />

            {/* Feixe dinâmico viajando suavemente entre os estados */}
            <motion.circle
              r="1.2"
              fill={lineColor}
              filter="url(#brazil-glow)"
              initial={{ offsetDistance: "0%", opacity: 0 }}
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 1, 0.9],
              }}
              transition={{
                duration: 1.1,
                ease: "easeInOut",
              }}
              style={{
                offsetPath: `path('${createCurvedPath(activeStartPoint, activeEndPoint)}')`,
              }}
            />

            {/* Ponto de Origem estável (sem piscar) */}
            <circle
              cx={activeStartPoint.x}
              cy={activeStartPoint.y}
              r="1.5"
              fill={lineColor}
              filter="url(#brazil-glow)"
            />

            {/* Ponto de Destino estável (surge suavemente quando o feixe chega, sem piscar) */}
            <motion.circle
              cx={activeEndPoint.x}
              cy={activeEndPoint.y}
              r="1.6"
              fill={lineColor}
              filter="url(#brazil-glow)"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />
          </g>
        )}
      </svg>

      {/* Rótulo da Cidade de Origem */}
      {showLabels && activeConnection && activeStartPoint && activeConnection.start.label && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`origin-${currentIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              left: `${(activeStartPoint.x / 77) * 100}%`,
              top: `${(activeStartPoint.y / 80) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-full -mt-2 pointer-events-none z-10"
          >
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 shadow-xs whitespace-nowrap">
              {activeConnection.start.label}
            </span>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Rótulo de Destino "Conectado: [Cidade]" (sobe suavemente ao concluir a conexão, sem piscar) */}
      {showLabels && activeConnection && activeEndPoint && activeConnection.end.label && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`destination-${currentIdx}`}
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.92 }}
            transition={{
              delay: 0.92, // Surge exatamente no momento em que a linha e o feixe atingem o destino
              duration: 0.38,
              type: "spring",
              stiffness: 340,
              damping: 22,
            }}
            style={{
              left: `${(activeEndPoint.x / 77) * 100}%`,
              top: `${(activeEndPoint.y / 80) * 100}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-full -mt-2.5 pointer-events-none z-20"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-900 border border-slate-200/90 shadow-md whitespace-nowrap text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                {/* Ponto verde estável, sem radar/ping piscando */}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Conectado: {activeConnection.end.label}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export const BrazilMap = WorldMap;
export default WorldMap;
