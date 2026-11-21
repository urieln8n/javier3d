import Image from "next/image";
import { MobileNavigation } from "@/components/mobile-navigation";
import { generalEnquiry } from "@/lib/site";

export function Header() {
  return (
    <header className="header shell">
      <a className="brand" href="#top" aria-label="Hornos JAVA inicio">
        <Image className="brand-logotype" src="/brand/java-wordmark-compact.svg" width={899} height={210} alt="" loading="eager" /><span>Hornos profesionales</span>
      </a>
      <MobileNavigation />
      <nav aria-label="Navegación principal">
        <a href="#modelos">Los hornos</a>
        <a href="#experiencia">La experiencia</a>
        <a href="#preguntas">Tus preguntas</a>
      </nav>
      <a className="header-contact" href={generalEnquiry} target="_blank" rel="noopener noreferrer">
        Hablemos <span aria-hidden="true">↗</span>
      </a>
      <a className="button header-cta" href="#presupuesto" aria-label="Solicitar presupuesto"><span className="header-cta-label"><span className="header-cta-long">Solicitar </span>presupuesto</span><span aria-hidden="true">↗</span></a>
    </header>
  );
}
