"use client";

import React from 'react';
import { Header } from '@/components/ui/header-1';
import { Hero } from '@/components/ui/hero-with-image-text-and-two-buttons';
import ClinicFeaturesSection from '@/components/home/ClinicFeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import BrazilCoverageSection from '@/components/home/BrazilCoverageSection';
import BlueCtaBannerSection from '@/components/home/BlueCtaBannerSection';
import Footer4Col from '@/components/ui/footer-column';
import './Home.css';

export default function HomeScreen() {
  return (
    <div className="landing-blank-container">
      <Header links={[]} signInHref="/login" getStartedHref="/register" />
      <main className="flex-1">
        <Hero
          title="Sua clínica presencial e telemedicina em uma só plataforma"
          description="Centralize agenda inteligente, prontuário eletrônico e consultas por vídeo com máxima segurança. Reduza faltas de pacientes e ofereça um atendimento moderno de qualquer lugar."
          primaryText="Começar gratuitamente"
          primaryHref="/register"
          secondaryText="Já tenho conta"
          secondaryHref="/login"
        />
        <ClinicFeaturesSection />
        <HowItWorksSection />
        <BrazilCoverageSection />
        <BlueCtaBannerSection />
      </main>
      <Footer4Col />
    </div>
  );
}
