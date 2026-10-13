import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export function Facebook(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Instagram(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Twitter(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export function Github(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Dribbble(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

export interface FooterProps {
  data?: {
    company?: {
      name?: string;
      description?: string;
      logo?: string;
    };
    social?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      github?: string;
    };
    services?: { label: string; href: string }[];
    about?: { label: string; href: string }[];
    help?: { label: string; href: string }[];
    contact?: {
      email?: string;
      phone?: string;
      address?: string;
    };
  };
}

const defaultData = {
  company: {
    name: 'OnTelemed',
    description:
      'Plataforma completa de saúde digital e telemedicina. Atendimento médico humanizado, prescrição digital e prontuário seguro em conformidade com o CFM e LGPD.',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  services: [
    { label: 'Pronto Atendimento 24h', href: '/consultas' },
    { label: 'Consultas com Especialistas', href: '/consultas' },
    { label: 'Receita Digital & Atestados', href: '/historico' },
    { label: 'Prontuário Eletrônico', href: '/perfil' },
  ],
  about: [
    { label: 'Sobre a OnTelemed', href: '/termos' },
    { label: 'Corpo Clínico', href: '/consultas' },
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Privacidade', href: '/termos' },
  ],
  help: [
    { label: 'Dúvidas Frequentes', href: '/termos' },
    { label: 'Suporte ao Paciente', href: 'mailto:suporte@ontelemed.com.br' },
    { label: 'Plantão Clínico Ativo', href: '/consultas' },
  ],
  contact: {
    email: 'contato@ontelemed.com.br',
    phone: '(11) 4002-8922',
    address: 'São Paulo - SP, Brasil',
  },
};

export function Footer4Col({ data = defaultData }: FooterProps) {
  const mergedCompany = { ...defaultData.company, ...data?.company };
  const mergedSocial = { ...defaultData.social, ...data?.social };
  const services = data?.services || defaultData.services;
  const about = data?.about || defaultData.about;
  const help = data?.help || defaultData.help;
  const contact = { ...defaultData.contact, ...data?.contact };

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: mergedSocial.instagram },
    { icon: Facebook, label: 'Facebook', href: mergedSocial.facebook },
    { icon: Twitter, label: 'Twitter', href: mergedSocial.twitter },
    { icon: Github, label: 'GitHub', href: mergedSocial.github },
  ];

  return (
    <footer className="bg-secondary/40 mt-0 w-full rounded-none">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand & Description Column */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <div className="flex items-center">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                {mergedCompany.name}
              </span>
            </div>

            {/* Justified text below the brand name */}
            <p className="text-muted-foreground mt-4 text-base leading-relaxed text-justify max-w-md">
              {mergedCompany.description}
            </p>

            <ul className="mt-8 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2.5 hover:bg-accent rounded-xl inline-flex items-center justify-center border border-border/50"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-5 sm:size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Links & Contact Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10">
            {/* Institucional */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                Institucional
              </p>
              <ul className="space-y-3.5 text-base">
                {about.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Serviços */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                Serviços
              </p>
              <ul className="space-y-3.5 text-base">
                {services.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      href={href}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Atendimento */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                Atendimento
              </p>
              <ul className="space-y-3.5 text-base">
                {help.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div className="text-left">
              <p className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">
                Contato
              </p>
              <ul className="space-y-3.5 text-base">
                <li>
                  <a
                    className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    href={`mailto:${contact.email}`}
                  >
                    <Mail className="text-primary size-5 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    href={`tel:${contact.phone}`}
                  >
                    <Phone className="text-primary size-5 shrink-0" />
                    <span>{contact.phone}</span>
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-start gap-2.5 text-muted-foreground">
                    <MapPin className="text-primary size-5 shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-border/70 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {mergedCompany.name} Soluções em Saúde. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Conformidade CFM Resolução nº 2.314/2022 & LGPD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer4Col;
