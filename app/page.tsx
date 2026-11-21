import Image from "next/image";
import { HeroGallery } from "@/components/hero-gallery";
import { MobileQuoteBar } from "@/components/mobile-quote-bar";
import { Header } from "@/components/header";
import { ProductExperience } from "@/components/product-experience";
import { ProductCard } from "@/components/product-card";
import { LeadForm } from "@/components/lead-form";
import { products } from "@/lib/products";
import { generalEnquiry, site } from "@/lib/site";

const questions = [
  ["¿Cómo solicito un presupuesto?", "Cuéntanos en el formulario tu nombre, ciudad y situación. Prepararemos un mensaje para que lo revises y lo envíes por WhatsApp. También puedes escribirnos directamente."],
  ["¿Qué debo tener en cuenta para elegir?", "El espacio de tu local, el tipo de proyecto y el horno que te interesa son un buen punto de partida. Confirma con nosotros las dimensiones, la configuración y las condiciones de compra antes de decidir."],
  ["¿Dónde puedo consultar las especificaciones?", "Escríbenos por WhatsApp e indica la referencia que te interesa. Consulta las medidas y los datos técnicos concretos del horno para tu proyecto; las fotografías por sí solas no los determinan."],
  ["¿La experiencia 3D muestra un horno real?", "El recorrido 3D es una representación conceptual. Sirve para explorar una forma, pero no acredita la construcción, los materiales ni las prestaciones de un modelo. Para elegir, utiliza las fotografías y confirma la información del producto con JAVA."],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div id="top"><Header /></div>
      <main id="contenido">
        <section className="sales-hero shell" aria-labelledby="hero-title">
          <div className="hero-masthead" aria-hidden="true"><Image className="masthead-logotype" src="/brand/java-wordmark.svg" width={897} height={212} alt="" loading="eager" fetchPriority="high" /><Image className="brand-emblem" src="/brand/java-emblem.svg" width={160} height={160} alt="" /><div>Tu proyecto.<br />Tu horno. JAVA.<i>Hornos profesionales para pizza</i></div></div>
          <div className="sales-hero-copy">
            <p className="eyebrow"><span className="ember-dot" aria-hidden="true" />Hornos profesionales para pizza</p>
            <h1 id="hero-title"><span className="hero-title-line">Ladrillo</span><span className="hero-title-line">a <em>ladrillo.</em></span></h1>
            <p className="hero-description">El corazón de tu pizzería empieza aquí.<br />Encuentra tu horno JAVA.</p>
            <div className="hero-actions"><a className="button" href="#presupuesto">Solicitar presupuesto <span aria-hidden="true">↗</span></a><a className="text-link" href="#modelos">Encuentra tu JAVA <span aria-hidden="true">↓</span></a></div>
            <div className="hero-signature"><span className="signature-rule" /><span>Tu proyecto. Tu horno. JAVA.</span></div>
          </div>
          <HeroGallery />
          <div className="hero-bottomline"><span>Para quienes viven la pizza.</span><span>Abre. Renueva. Hazlo tuyo.</span><a href="#modelos">Conoce JAVA <span aria-hidden="true">↓</span></a></div>
        </section>

        <section id="por-que-java" className="manifesto shell section">
          <p className="eyebrow">Más que una elección</p>
          <h2>Una pizzería tiene alma.<br />El horno ocupa <em>su lugar.</em></h2>
          <div className="manifesto-bottom"><p>El punto de partida de una nueva idea. La pieza que buscas al renovar. El horno que quieres poner en el centro de tu negocio.</p><a href="#presupuesto" className="text-link">Hablemos de tu proyecto <span aria-hidden="true">↗</span></a></div>
        </section>

        <section id="modelos" className="collection-section section">
          <div className="shell">
            <div className="section-heading"><div><p className="eyebrow">La colección visual</p><h2>Dos expresiones.<br /><em>Un nombre: JAVA.</em></h2></div><p>Empieza por lo que ves.<br />Cuéntanos después lo que necesitas.</p></div>
            <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
            <p className="collection-note">Fotografías de las referencias JAVA. Denominación comercial, configuración y especificaciones a confirmar al solicitar información.</p>
          </div>
        </section>

        <section className="project-section shell section" aria-labelledby="project-title">
          <div><p className="eyebrow">Sea cual sea tu próximo paso</p><h2 id="project-title">Hay un proyecto<br /><em>detrás de cada horno.</em></h2><p className="section-description">Cuéntanos el tuyo. Empezamos por ahí.</p></div>
          <div className="project-list">
            <a href="#presupuesto" data-situation="Estoy abriendo una pizzería"><span className="project-mark" aria-hidden="true" /><span><strong>Todo por empezar.</strong><small>Estoy abriendo una pizzería</small></span><span aria-hidden="true">↗</span></a>
            <a href="#presupuesto" data-situation="Quiero renovar mi horno"><span className="project-mark" aria-hidden="true" /><span><strong>Un nuevo capítulo.</strong><small>Quiero renovar mi horno</small></span><span aria-hidden="true">↗</span></a>
            <a href="#presupuesto" data-situation="Otro proyecto profesional"><span className="project-mark" aria-hidden="true" /><span><strong>Una idea diferente.</strong><small>Otro proyecto de hostelería</small></span><span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <ProductExperience />

        <section id="preguntas" className="faq-section shell section">
          <div><p className="eyebrow">Antes de encenderlo todo</p><h2>Buenas preguntas.<br /><em>Una conversación.</em></h2><a href={generalEnquiry} target="_blank" rel="noopener noreferrer" className="text-link">Pregúntanos por WhatsApp <span aria-hidden="true">↗</span></a></div>
          <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary><span>{question}</span><span className="faq-mark" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>

        <section id="presupuesto" className="quote-section section">
          <div className="shell quote-grid">
            <div className="quote-copy"><p className="eyebrow">El próximo JAVA puede ser el tuyo</p><h2>Hablemos<br />de tu <em>pizzería.</em></h2><p>Una idea, una apertura, un cambio.<br />Cuéntanos qué tienes entre manos y solicita tu presupuesto.</p><div className="direct-contact"><span>¿Prefieres ir directo?</span><a href={generalEnquiry} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp <span aria-hidden="true">↗</span></a><a className="contact-phone" href={`tel:${site.phoneHref}`}>{site.phoneLabel}</a></div><div className="quote-brand-signature"><Image src="/brand/java-emblem.svg" width={112} height={112} alt="" /><p>Ladrillo a ladrillo.<span>Tu próximo proyecto empieza<br />con una conversación.</span></p></div></div>
            <LeadForm />
          </div>
        </section>
      </main>
      <MobileQuoteBar />
      <footer className="footer shell"><div className="footer-top"><a href="#top" className="footer-wordmark" aria-label="JAVA, volver al inicio"><Image className="footer-logotype" src="/brand/java-wordmark.svg" width={897} height={212} alt="" /><span>Ladrillo a ladrillo.</span></a><div><span className="eyebrow">Hornos profesionales para pizza</span><a href={generalEnquiry} target="_blank" rel="noopener noreferrer">Hablemos de tu proyecto ↗</a></div></div><div className="footer-bottom"><span>JAVA · Hornos profesionales</span><a href="#modelos">Los hornos</a><a href="#preguntas">Preguntas frecuentes</a><a href="#presupuesto">Solicitar presupuesto ↗</a></div></footer>
    </>
  );
}
