# JAVA — exposición de producto V6

13 de noviembre de 2026. Fase autorizada: mejora visual visible del hero y de la entrada a la experiencia existente. Sin nuevas secciones, dependencias, páginas, backend, despliegue ni commit.

## Cambio visible

El hero presenta el horno sobre un arco marfil con una marca JAVA a gran escala, numeración editorial, cobre y controles de referencia discretos. La fotografía domina el escenario. Los dos botones cambian entre las fotografías aprobadas; «Consultar esta referencia» lleva la selección al formulario existente mediante su mecanismo de `data-model`. Los títulos siguen siendo descripciones visuales, no nombres oficiales de modelos.

Las fotografías originales permanecen intactas. La presentación usa máscaras CSS de la silueta exterior, sin modificar los archivos ni fabricar acabados del horno. El marco reserva dimensiones para ambas proporciones de imagen, de modo que cambiar de referencia no reordena el hero. Las máscaras y sus márgenes deben revisarse si se sustituyen las fotografías.

La entrada al 3D ahora es una composición de exposición: titular editorial, órbita estática, gran marca «3D» y un anticipo del propio modelo existente. La imagen es una captura del renderer local, no una fotografía del producto real. Se identifica como maqueta conceptual. El recorrido mantiene la activación explícita, los controles y la salida del visor.

El FOV de la cámara se reduce de 36° a 30° para dar más presencia al horno, conservando poses, interacción y despiece existentes. No se ha inventado geometría, construcción ni especificaciones nuevas en esta fase.

## Movimiento y rendimiento

- Entrada única y contenida de un segundo en el escenario fotográfico; sin bucles ni listeners de scroll nuevos.
- Con movimiento reducido no hay animación de entrada ni fundido entre referencias.
- El 3D sigue separado de la carga inicial, con renderizado a demanda, DPR máximo 1,5 y sin postprocesado nuevo.
- El anticipo es una imagen local cargada de forma diferida y optimizada por Next. Fuente: `public/images/concept/java-concept-preview-v6.png`, captura a DPR 2 del canvas existente, con controles superpuestos ocultos para la captura. No requiere WebGL para visualizarse.
- JavaScript transferido al inicio observado: 146.336 bytes frente a 145.591 en la ronda anterior, aproximadamente 745 bytes adicionales en esa medición. No equivale a una medición de campo ni a una puntuación de rendimiento.

## Archivos

- `components/hero-gallery.tsx`: nuevo selector fotográfico.
- `app/page.tsx`: integra el escenario en el hero existente.
- `app/globals.css`: composición, arco, máscaras, estados, adaptación y movimiento reducido.
- `components/product-experience.tsx`: anticipo y entrada editorial al 3D.
- `components/oven-scene.tsx`: encuadre de cámara.
- `public/images/concept/java-concept-preview-v6.png`: captura conceptual nueva.
- `tests/product-theatre.spec.ts`: selección y traspaso de referencia al presupuesto.
- `tests/home.spec.ts`: comprueba la fotografía seleccionada en la nueva galería.
- `scripts/capture-review.mjs`: captura ambas referencias y el anticipo, además de las vistas comerciales anteriores.
- `README.md` y este informe.

## Evidencia visual

Capturas renovadas en `artifacts/product-theatre-v6/`: hero, página completa, referencia 02, anticipo de la experiencia y presupuesto en desktop/tablet/móvil, además de los cinco estados del 3D. También menú y acceso móvil al presupuesto, 320×568 y landscape 812×375.

Los datos comerciales y bloqueos de publicación documentados en la auditoría V5 se mantienen. La mejora de presentación no convierte la maqueta en un modelo industrial validado.

## Verificación final

- Build: PASS. ESLint: PASS.
- Producción, Playwright: **27/27 PASS**, 1440×900, 768×1024, 375×812; movimiento reducido, contacto sin JavaScript, formulario/traspaso a WhatsApp interceptado, recuperación ante fallo WebGL, cámara, despiece, reensamblado, rotación y salida del visor.
- Nueva prueba funcional: elegir la referencia 02 y comprobar que llega como `java-02` al formulario, en los tres dispositivos.
- Capturas comerciales normales: **0 errores de consola, 0 solicitudes fallidas**, sin overflow en los tres tamaños. Capturas 3D: también sin errores en los tres dispositivos.
- Revisión adicional 320×568 y 812×375: PASS; se corrigió el desbordamiento de la órbita decorativa a 320 px y se verificó de nuevo el presupuesto en la composición estática de poca altura.
- Capturas inspeccionadas visualmente: hero y selección 02 de escritorio, hero tablet/móvil, anticipo 3D desktop/móvil, móvil de 320 px y estado 3D explotado móvil. Los originales fotográficos conservan sus archivos; el anticipo de maqueta es un activo nuevo separado.
- Servidor de desarrollo existente en `http://localhost:3000`: HTTP 200. Servidor temporal de QA detenido al terminar.

No se enviaron mensajes comerciales durante las pruebas. Commit: NOT CREATED.
