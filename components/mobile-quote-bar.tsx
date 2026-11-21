"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function MobileQuoteBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const covered = new Map<Element, boolean>();
    const selectors = [".sales-hero", "#presupuesto", "#experiencia", ".footer"];
    const elements = selectors.map(selector => document.querySelector(selector)).filter((element): element is Element => Boolean(element));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) covered.set(entry.target, entry.isIntersecting);
      setVisible(!Array.from(covered.values()).some(Boolean));
    });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <aside className="mobile-quote-bar" aria-label="Acceso rápido al presupuesto" hidden={!visible}>
      <Image className="quote-bar-logotype" src="/brand/java-wordmark-compact.svg" width={899} height={210} alt="" />
      <a className="button" href="#presupuesto">Solicitar presupuesto <span aria-hidden="true">↗</span></a>
    </aside>
  );
}
