"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "@/lib/products";

export function HeroGallery() {
  const [selected, setSelected] = useState(0);
  const product = products[selected];
  return (
    <div className="hero-photo product-theatre" data-reference={selected + 1}>
      <div className="photo-topline"><span>JAVA</span><span>Hornos con presencia.</span></div>
      <span className="theatre-index" aria-hidden="true">0{selected + 1}</span>
      <div className="hero-photo-inner">
        <span className="theatre-arch" aria-hidden="true" />
        {products.map((item, index) => <div key={item.id} className={`reference-frame reference-${index} ${selected === index ? "is-selected" : ""}`} aria-hidden={selected !== index}><Image src={item.image} alt={`Horno profesional JAVA, fotografía de la ${item.name.toLowerCase()}`} fill preload={index === 0} loading={index === 0 ? undefined : "lazy"} sizes="(max-width: 700px) calc(100vw - 40px), 52vw" /></div>)}
      </div>
      <div className="theatre-caption"><span>La colección visual</span><p aria-live="polite" aria-atomic="true">{product.visualTitle}</p></div>
      <div className="theatre-footer">
        <div className="theatre-selector" role="group" aria-label="Fotografía del horno">
          {products.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} aria-label={`Ver ${item.name.toLowerCase()}`} onClick={() => setSelected(index)}><span className={`reference-swatch swatch-${index}`} aria-hidden="true" /><span>0{index + 1}</span></button>)}
        </div>
        <a href="#presupuesto" className="theatre-enquiry" data-model={product.id}>Consultar esta referencia <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
