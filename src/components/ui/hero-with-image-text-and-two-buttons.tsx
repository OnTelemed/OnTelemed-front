import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SonarGrid } from "@/components/ui/sonar-grid";

export interface HeroProps {
  title?: string;
  description?: string;
  secondaryText?: string;
  secondaryHref?: string;
  primaryText?: string;
  primaryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

function Hero({
  title = "Sua clínica presencial e telemedicina em uma só plataforma",
  description = "Centralize agenda inteligente, prontuário eletrônico e consultas por vídeo com máxima segurança. Reduza faltas de pacientes e ofereça um atendimento moderno de qualquer lugar.",
  primaryText = "Começar gratuitamente",
  primaryHref = "/register",
  secondaryText = "Já tenho conta",
  secondaryHref = "/login",
  imageSrc = "/images/telemedicina-consulta.jpg",
  imageAlt = "Médica realizando atendimento por telemedicina",
}: HeroProps = {}) {
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
      className="w-full py-8 sm:py-12 lg:py-16 cursor-default bg-background"
    >
      {/* Gentle radial gradient for clarity and contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.45)_0%,transparent_100%)]"
      />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
          {/* Lado Esquerdo: Título, Descrição e CTAs */}
          <div className="flex gap-6 flex-col">
            {/* Título & Descrição com Hierarquia Perfeita */}
            <div className="flex gap-3.5 flex-col">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-left text-foreground leading-[1.2] max-w-xl">
                {title}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/90 max-w-lg text-left font-normal">
                {description}
              </p>
            </div>

            {/* Ações (CTAs alinhados por prioridade de conversão) */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
              {/* Botão Primário em destaque */}
              <Button
                size="lg"
                className="gap-3 rounded-xl font-bold px-7 py-6 shadow-lg shadow-primary/20 bg-primary text-white hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href={primaryHref}>
                  {primaryText} <MoveRight className="w-4 h-4" />
                </a>
              </Button>

              {/* Botão Secundário outline */}
              <Button
                size="lg"
                className="gap-3 rounded-xl font-semibold px-6 py-6 border-border/80 hover:bg-muted/60 transition-all"
                variant="outline"
                asChild
              >
                <a href={secondaryHref}>
                  {secondaryText}
                </a>
              </Button>
            </div>
          </div>

          {/* Lado Direito: Imagem Hero */}
          <div className="bg-muted rounded-2xl aspect-square overflow-hidden shadow-xl border border-border/50 max-w-md mx-auto lg:max-w-none w-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </SonarGrid>
  );
}

export { Hero };
export default Hero;
