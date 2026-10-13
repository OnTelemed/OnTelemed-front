"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

// Exact precomputed dot keys for Brazil on DottedMap({ height: 100, grid: "diagonal" })
const BRAZIL_DOT_KEYS = new Set([
  "63;66","62;67","63;67","62;68","63;68","66;68","68;68","59;69","60;69",
  "61;69","62;69","63;69","64;69","65;69","66;69","67;69","68;69","69;69",
  "58;70","59;70","60;70","61;70","62;70","63;70","64;70","65;70","66;70",
  "67;70","68;70","69;70","59;71","60;71","61;71","62;71","63;71","64;71",
  "65;71","66;71","67;71","68;71","69;71","70;71","71;71","72;71","58;72",
  "59;72","60;72","61;72","62;72","63;72","64;72","65;72","66;72","67;72",
  "68;72","69;72","70;72","71;72","72;72","73;72","74;72","75;72","57;73",
  "58;73","59;73","60;73","61;73","62;73","63;73","64;73","65;73","66;73",
  "67;73","68;73","69;73","70;73","71;73","72;73","73;73","74;73","75;73",
  "76;73","77;73","78;73","56;74","57;74","58;74","59;74","60;74","61;74",
  "62;74","63;74","64;74","65;74","66;74","67;74","68;74","69;74","70;74",
  "71;74","72;74","73;74","74;74","75;74","76;74","77;74","56;75","57;75",
  "58;75","59;75","60;75","61;75","62;75","63;75","64;75","65;75","66;75",
  "67;75","68;75","69;75","70;75","71;75","72;75","73;75","74;75","75;75",
  "76;75","77;75","78;75","56;76","57;76","58;76","59;76","60;76","61;76",
  "62;76","63;76","64;76","65;76","66;76","67;76","68;76","69;76","70;76",
  "71;76","72;76","73;76","74;76","75;76","76;76","77;76","61;77","62;77",
  "63;77","64;77","65;77","66;77","67;77","68;77","69;77","70;77","71;77",
  "72;77","73;77","74;77","75;77","76;77","77;77","61;78","62;78","63;78",
  "64;78","65;78","66;78","67;78","68;78","69;78","70;78","71;78","72;78",
  "73;78","74;78","75;78","76;78","64;79","65;79","66;79","67;79","68;79",
  "69;79","70;79","71;79","72;79","73;79","74;79","75;79","76;79","63;80",
  "64;80","65;80","66;80","67;80","68;80","69;80","70;80","71;80","72;80",
  "73;80","74;80","75;80","65;81","66;81","67;81","68;81","69;81","70;81",
  "71;81","72;81","73;81","74;81","75;81","65;82","66;82","67;82","68;82",
  "69;82","70;82","71;82","72;82","73;82","74;82","75;82","65;83","66;83",
  "67;83","68;83","69;83","70;83","71;83","72;83","73;83","74;83","75;83",
  "65;84","66;84","67;84","68;84","69;84","70;84","71;84","72;84","73;84",
  "74;84","67;85","68;85","69;85","70;85","71;85","72;85","73;85","74;85",
  "66;86","67;86","68;86","69;86","70;86","71;86","67;87","68;87","69;87",
  "70;87","67;88","68;88","69;88","67;89","68;89","69;89","70;89","66;90",
  "67;90","68;90","69;90","66;91","67;91","68;91","69;91","67;92","68;92",
  "68;93"
]);

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface MapProps {
  dots?: Array<{
    start: MapPoint;
    end: MapPoint;
  }>;
  lineColor?: string;
  highlightBrazil?: boolean;
  brazilColor?: string;
  className?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  highlightBrazil = true,
  brazilColor = "#0284c7",
  className = "",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  let activeTheme = "light";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) {
      activeTheme = themeContext.theme;
    }
  } catch {
    activeTheme = "light";
  }

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    if (highlightBrazil) {
      for (const dotKey of BRAZIL_DOT_KEYS) {
        // @ts-expect-error dotted-map points index
        if (map.points && map.points[dotKey]) {
          // @ts-expect-error dotted-map point svgOptions
          map.points[dotKey].svgOptions = {
            color: brazilColor,
            radius: 0.32,
          };
        }
      }
    }

    return map.getSVG({
      radius: 0.22,
      color: activeTheme === "dark" ? "#FFFFFF30" : "#00000030",
      shape: "circle",
      backgroundColor: activeTheme === "dark" ? "black" : "white",
    });
  }, [activeTheme, highlightBrazil, brazilColor]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 40;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div
      className={`w-full aspect-[2/1] dark:bg-black bg-white rounded-2xl relative font-sans overflow-hidden border border-slate-200/60 dark:border-slate-800 shadow-sm ${className}`}
    >
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="Mapa de cobertura"
        height={495}
        width={1056}
        draggable={false}
        priority
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={`url(#path-gradient-${i})`}
                strokeWidth="1.2"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.3 * i,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 2,
                }}
                key={`start-upper-${i}`}
              />
              <defs key={`def-${i}`}>
                <linearGradient
                  id={`path-gradient-${i}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="20%" stopColor={lineColor} stopOpacity="0.8" />
                  <stop offset="80%" stopColor={lineColor} stopOpacity="0.8" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </g>
          );
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="2.5"
                fill={lineColor}
              />
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="2.5"
                fill={lineColor}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default WorldMap;
