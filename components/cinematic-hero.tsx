"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { OvenScene } from "@/components/oven-scene";

const media = "(prefers-reduced-motion: reduce), (max-height: 650px)";
const subscribeMotion = (notify: () => void) => {
  const query = matchMedia(media);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const motionSnapshot = () => matchMedia(media).matches;
const serverMotionSnapshot = () => true;

const chapters = [
  ["", ""],
  ["01 · Otra perspectiva", "Diseñado para el trabajo profesional"],
  ["02 · De cerca", "Observa sus formas y detalles"],
  ["03 · El conjunto", "Explora el conjunto, pieza a pieza"],
  ["04 · Tu próximo paso", "Imagina tu próximo JAVA"],
];

export function CinematicHero({ children, onExit }: { children: ReactNode; onExit?: () => void }) {
  const track = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [chapter, setChapter] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", progress => {
    const next = progress < .12 ? 0 : progress < .36 ? 1 : progress < .57 ? 2 : progress < .87 ? 3 : 4;
    setChapter(current => current === next ? current : next);
  });
  const active = reduced ? 0 : chapter;
  return (
    <section ref={track} className="cinematic-track" data-reduced={reduced ? "true" : "false"} data-chapter={active} aria-label="JAVA: explora el horno" onKeyDown={event => { if (event.key === "Escape" && onExit) { event.preventDefault(); onExit(); } }}>
      <div className="cinematic-stage hero shell">
        {onExit && <button className="experience-close" type="button" onClick={onExit} aria-label="Cerrar experiencia 3D">Cerrar 3D <span aria-hidden="true">×</span></button>}
        <div className="story-copy">
          <div className="story-intro" hidden={active !== 0}>{children}</div>
          {active !== 0 && <motion.div key={active} className="story-chapter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .25 }}>
            <p className="eyebrow">JAVA · {chapters[active][0]}</p>
            <h2>{chapters[active][1]}</h2>
            <p className="story-disclosure">Maqueta conceptual. Formas, acabados y construcción del horno real pendientes de validación.</p>
            <a className="button" href="#presupuesto">Solicitar presupuesto <span aria-hidden="true">↗</span></a>
          </motion.div>}
        </div>
        <div className="hero-product"><OvenScene progress={scrollYProgress} reduced={Boolean(reduced)} /></div>
        <div className="hero-bottom"><span>{active === 0 ? "El horno, en el centro de tu negocio." : "Desplázate para continuar · JAVA"}</span><a href="#modelos">Ver hornos JAVA <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
