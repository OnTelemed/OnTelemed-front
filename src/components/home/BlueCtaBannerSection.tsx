"use client";

import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SonarGrid } from "@/components/ui/sonar-grid";

export default function BlueCtaBannerSection() {
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
      className="w-full pt-16 pb-10 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16 bg-background cursor-default [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_100%)]"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="rounded-[36px] sm:rounded-[44px] py-14 px-6 sm:py-16 sm:px-12 lg:py-20 lg:px-16 text-white text-center shadow-[0_24px_60px_-12px_rgba(0,75,97,0.35)] relative overflow-hidden flex flex-col items-center justify-center border border-white/15"
          style={{
            background: "linear-gradient(135deg, #005bbf 0%, #004b61 100%)",
          }}
        >
          {/* Subtle background glow decorative elements */}
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Título */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight text-white leading-[1.2]">
              Pronto para levar a sua clínica ao próximo nível?
            </h2>

            {/* Descrição */}
            <p className="mt-4 text-base sm:text-lg text-sky-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
              Modernize a gestão da sua clínica, reduza faltas e atenda no consultório ou por telemedicina com total segurança e praticidade.
            </p>

            {/* Botões de Registro e Login abaixo */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-8 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-white text-[#004b61] hover:bg-slate-100 font-bold px-8 py-6 rounded-xl shadow-xl border-0 gap-3 text-base sm:text-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                asChild
              >
                <Link href="/register">
                  Criar Conta Grátis <MoveRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/80 bg-transparent text-white hover:bg-white/15 hover:text-white font-bold px-8 py-6 rounded-xl text-base sm:text-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                asChild
              >
                <Link href="/login">
                  Já tenho conta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SonarGrid>
  );
}
