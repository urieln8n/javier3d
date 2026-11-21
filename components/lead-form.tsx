"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { products } from "@/lib/products";
import { site, whatsappUrl } from "@/lib/site";

const subscribeHydration = () => () => {};
const hydratedSnapshot = () => true;
const serverSnapshot = () => false;
const situations = ["Estoy abriendo una pizzería", "Ya tengo una pizzería", "Quiero renovar mi horno", "Otro proyecto profesional"];

export function LeadForm() {
  const hydrated = useSyncExternalStore(subscribeHydration, hydratedSnapshot, serverSnapshot);
  const [model, setModel] = useState("");
  const [situation, setSituation] = useState("");
  const [prepared, setPrepared] = useState<string | null>(null);

  useEffect(() => {
    const selectIntent = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-model], a[data-situation]");
      if (!link) return;
      if (products.some(product => product.id === link.dataset.model)) setModel(link.dataset.model!);
      if (situations.includes(link.dataset.situation ?? "")) setSituation(link.dataset.situation!);
      setPrepared(null);
    };
    document.addEventListener("click", selectIntent);
    return () => document.removeEventListener("click", selectIntent);
  }, []);

  return (
    <form
      className="lead-form"
      aria-describedby="lead-explanation"
      onChange={() => setPrepared(null)}
      onSubmit={event => {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);
        const text = (name: string) => String(fields.get(name) ?? "").trim();
        const selected = products.find(product => product.id === model);
        const message = [
          "Hola, quiero solicitar un presupuesto de hornos JAVA.",
          "",
          `Nombre: ${text("name")}`,
          `Ciudad: ${text("city")}`,
          `Proyecto: ${situation}`,
          `Referencia: ${selected?.name ?? "Quiero orientación para elegir"}`,
          text("contact") && `Contacto adicional: ${text("contact")}`,
          text("message") && `Mensaje: ${text("message")}`,
          "",
          "Origen: web JAVA",
        ].join("\n");
        const url = whatsappUrl(message);
        setPrepared(url);
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <div className="form-topline"><span>Tu proyecto</span><span>Respuesta por WhatsApp</span></div>
      <div className="field-grid">
        <label>Nombre <span aria-hidden="true">*</span><input required name="name" autoComplete="name" maxLength={100} pattern=".*\S.*" placeholder="Cómo te llamas" /></label>
        <label>Ciudad <span aria-hidden="true">*</span><input required name="city" autoComplete="address-level2" maxLength={100} pattern=".*\S.*" placeholder="Dónde estará tu horno" /></label>
      </div>
      <label>¿En qué punto estás? <span aria-hidden="true">*</span><select required name="situation" value={situation} onChange={event => setSituation(event.target.value)}><option value="" disabled>Cuéntanos tu situación</option>{situations.map(option => <option key={option}>{option}</option>)}</select></label>
      <label>¿Qué horno te interesa?<select name="model" value={model} onChange={event => setModel(event.target.value)}><option value="">Quiero orientación para elegir</option>{products.map(product => <option key={product.id} value={product.id}>JAVA · {product.name}</option>)}</select></label>
      <label>Teléfono o email <span className="optional">(opcional)</span><input name="contact" autoComplete="off" maxLength={120} placeholder="Si prefieres otro contacto" /></label>
      <label>Tu idea <span className="optional">(opcional)</span><textarea name="message" rows={3} maxLength={1200} placeholder="El local, la idea, lo que tienes en mente…" /></label>
      <p id="lead-explanation" className="form-note">Abriremos WhatsApp con tu solicitud preparada. Tú revisas y envías el mensaje. Los campos con * son obligatorios.</p>
      <button className="button" type="submit" disabled={!hydrated}>Continuar en WhatsApp <span aria-hidden="true">↗</span></button>
      {prepared && <div className="prepared-message" role="status"><strong>Tu solicitud está preparada.</strong><p>Envíala en WhatsApp para que podamos recibirla.</p><a href={prepared} target="_blank" rel="noopener noreferrer">Abrir mi solicitud en WhatsApp ↗</a></div>}
      <p className="data-note">Esta web no guarda tus datos. Al continuar, abrirás WhatsApp con la información que has escrito.</p>
      <noscript><a href={`https://wa.me/${site.whatsappNumber}`}>Solicita tu presupuesto por WhatsApp</a></noscript>
    </form>
  );
}
