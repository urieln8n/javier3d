"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useRef, useState, type ReactNode } from "react";

const CinematicHero = dynamic(
  () => import("@/components/cinematic-hero").then(module => module.CinematicHero),
  {
    ssr: false,
    loading: () => <div className="experience-loading" role="status">Preparando la experiencia JAVA…</div>,
  },
);

class ExperienceBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return (
      <div className="experience-recovery shell" role="alert">
        <p className="eyebrow">La experiencia JAVA</p>
        <h2>Sigamos con<br /><em>tu proyecto.</em></h2>
        <p>La vista interactiva no está disponible en este dispositivo. Puedes ver las fotografías y solicitar tu presupuesto.</p>
        <a className="button" href="#modelos">Ver hornos JAVA ↗</a>
      </div>
    );
    return this.props.children;
  }
}

export function ProductExperience() {
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    setActive(false);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "instant", block: "start" });
      triggerRef.current?.focus({ preventScroll: true });
    });
  };
  return (
    <section ref={sectionRef} id="experiencia" className={`experience-section ${active ? "is-active" : ""}`} aria-label="Experiencia JAVA">
      {active ? (
        <ExperienceBoundary><CinematicHero onExit={close}>
          <div className="hero-copy">
            <p className="eyebrow">JAVA · La experiencia</p>
            <h2>Míralo desde<br /><em>otra perspectiva.</em></h2>
            <p className="lede">Gira, observa y explora una representación del horno.</p>
            <p className="story-disclosure">Maqueta conceptual. La construcción y los materiales del horno real deben confirmarse antes de elegir.</p>
            <div className="hero-actions"><a className="button" href="#presupuesto">Solicitar presupuesto <span aria-hidden="true">↗</span></a><a className="text-link" href="#modelos">Ver fotografías <span aria-hidden="true">↗</span></a></div>
          </div>
        </CinematicHero></ExperienceBoundary>
      ) : (
        <div className="experience-intro shell experience-poster">
          <div className="experience-poster-copy"><p className="eyebrow">JAVA · Otra dimensión</p><h2>No solo<br />lo mires.<br /><em>Explóralo.</em></h2><p className="poster-description">Acércate. Gira. Descubre cada ángulo.<br />Un recorrido que tú diriges.</p><button ref={triggerRef} className="button button-outline" type="button" onClick={() => setActive(true)}>Explorar en 3D <span aria-hidden="true">↗</span></button></div>
          <div className="experience-poster-product">
            <span className="poster-orbit" aria-hidden="true" />
            <span className="poster-dimension" aria-hidden="true">3D</span>
            <Image src="/images/concept/java-concept-preview-v6.png" alt="Anticipo de la maqueta conceptual JAVA que puedes girar en el recorrido 3D" width={1316} height={926} sizes="(max-width: 700px) calc(100vw - 40px), 50vw" />
            <div className="poster-caption"><span className="poster-cross" aria-hidden="true">+</span><span>Tu punto de vista.<br /><strong>Tu próximo proyecto.</strong></span></div>
          </div>
          <p className="reference-note poster-disclosure">Maqueta conceptual · despiece ilustrativo, no técnico. Para elegir tu horno, consulta las fotografías y confirma los datos con JAVA.</p>
        </div>
      )}
    </section>
  );
}
