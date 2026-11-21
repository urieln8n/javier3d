import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="product-card">
      <div className="product-topline"><span className="brick-wordmark">JAVA / {String(index + 1).padStart(2, "0")}</span><span>Horno profesional para pizza</span></div>
      <div className="product-image">
        <Image src={product.image} alt={`Horno JAVA, ${product.name.toLowerCase()}, fotografía del producto`} fill sizes="(max-width: 700px) calc(100vw - 40px), 46vw" />
      </div>
      <div className="product-copy">
        <div><p className="eyebrow">{product.name}</p><h3>{product.visualTitle}</h3></div>
        <a href="#presupuesto" className="product-quote" data-model={product.id} aria-label={`Solicitar presupuesto: ${product.name}`}><span aria-hidden="true">↗</span></a>
      </div>
      <p className="product-description">{product.description}</p>
      <a href="#presupuesto" className="text-link" data-model={product.id}>Solicitar presupuesto <span aria-hidden="true">↗</span></a>
    </article>
  );
}
