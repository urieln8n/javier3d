"use client";

import { useRef } from "react";

// Native details remains usable without JavaScript; JS adds close/focus behavior.
export function MobileNavigation() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  return (
    <details className="mobile-navigation" ref={detailsRef} onKeyDown={event => {
      if (event.key === "Escape") {
        detailsRef.current?.removeAttribute("open");
        detailsRef.current?.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Menú de navegación"><span aria-hidden="true">☰</span></summary>
      <nav aria-label="Navegación móvil" onClick={event => {
        if (event.target instanceof Element && event.target.closest("a")) detailsRef.current?.removeAttribute("open");
      }}>
        <a href="#modelos">Los hornos <span aria-hidden="true">↗</span></a>
        <a href="#experiencia">La experiencia <span aria-hidden="true">↗</span></a>
        <a href="#preguntas">Tus preguntas <span aria-hidden="true">↗</span></a>
        <a href="#presupuesto">Solicitar presupuesto <span aria-hidden="true">↗</span></a>
      </nav>
    </details>
  );
}
