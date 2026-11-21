# JAVA — auditoría profunda V5

Fecha: 13 de noviembre de 2026. Alcance: revisión y mejoras de la landing existente, sin desplegar, crear páginas, instalar dependencias ni realizar commits.

## Dictamen sobre 50.000 €

No defendería 50.000 € por la implementación actual como producto terminado. Hay una landing comercial personalizada, un recorrido 3D opcional y un formulario que prepara una conversación en WhatsApp. El software no acredita todavía un producto industrial fiel, resultados comerciales, un proceso de captación medido ni una publicación completa.

50.000 € podría ser un presupuesto de proyecto acordado para un alcance sustancial y verificable: estrategia comercial, dirección de arte, fotografía y vídeo originales, modelado fiel aprobado por el fabricante, contenidos técnicos contrastados, integración comercial justificada, medición y optimización de conversión, validación en dispositivos reales y acompañamiento del lanzamiento. Esto describe entregables posibles; no es una tasación, una tarifa de mercado investigada ni una promesa de retorno. Añadir librerías o efectos por sí solo no justifica ese importe.

El salto de calidad pendiente depende sobre todo del producto real y de su presentación. Repetir ajustes de color no sustituye esos entregables.

## Hallazgos y correcciones

| Hallazgo comprobado | Corrección aplicada |
| --- | --- |
| En móvil se ocultaba la navegación sin alternativa. | Menú con `details/summary`, navegación por teclado, cierre con Escape y devolución de foco. Funciona también mediante el control nativo sin JavaScript. |
| Una vez abierto el 3D no había salida explícita. | Botón «Cerrar 3D» y Escape desde la experiencia; desmontaje del visor, recuperación del acceso fotográfico y foco en el activador. |
| En 812×375 el escenario fijo medía 700 px: el presupuesto quedaba fuera del área visible sin un desplazamiento normal útil. | Bajo 650 px de altura, composición estática con desplazamiento natural; el presupuesto se puede llevar completamente al viewport. Sin coreografía de cámara ni explosión animada en esta alternativa. |
| Tras abandonar el hero móvil se perdía el acceso inmediato al presupuesto. | Acceso inferior contextual, oculto cuando están visibles el hero, la experiencia, el formulario o el pie. Sin listeners de scroll continuos. |
| El intercambio de fuente cambiaba las líneas y desplazaba el hero. | Dos líneas editoriales explícitas, anchuras de grid limitadas y acciones móviles apiladas de forma determinista. Tipografía escalada para tablet/móvil. |
| La nueva combinación de menú/marca/CTA desbordaba a 320 px durante la revisión. | Tamaños y espacios compactos para esa anchura, manteniendo controles táctiles de 44 px como mínimo. |
| «Descubre cómo está construido» podía presentar el despiece conceptual como ingeniería real. | «Explora el conjunto, pieza a pieza», conservando la aclaración de maqueta conceptual. |

No se ha cambiado la geometría en esta ronda ni se han retocado las dos fotografías aprobadas. La paleta verde industrial, marfil, cobre y terracota se conserva: es coherente con el producto y permite una jerarquía comercial clara. La limitación visual principal sigue siendo la fotografía de referencia y el modelo conceptual, no la falta de efectos.

## Investigación y criterio

Se contrastó la navegación con las recomendaciones de [estructura de página de W3C WAI](https://www.w3.org/WAI/tutorials/page-structure/) y [navegación de W3C WAI](https://www.w3.org/WAI/tutorials/navigation/), y la prioridad del contenido inicial con [optimización de LCP de web.dev](https://web.dev/articles/optimize-lcp). Se revisó [Marana Forni](https://www.maranaforni.es/) como referencia del sector: el catálogo real, la identificación de producto y la evidencia industrial son asuntos que JAVA debe resolver con sus propios datos. No se copiaron contenidos, imágenes o afirmaciones de otro fabricante.

Las comprobaciones de esta ronda no constituyen una certificación WCAG ni una valoración económica profesional.

## Rendimiento observado

Prueba sintética local de Chromium, viewport 375×812, CPU ×4, latencia de 150 ms, descarga de 200.000 bytes/s, caché nueva y espera de fuentes. Un único muestreo antes/después; sin datos de campo ni puntuación Lighthouse.

| Métrica | Antes | Después |
| --- | --- | --- |
| CLS observado | 0,09193 | 0,01202 |
| LCP local observado | 624 ms | 720 ms |
| Long tasks iniciales | 2 | 2 |

La reducción de desplazamiento es la mejora observada. No se afirma una mejora de LCP: el muestreo posterior fue 96 ms mayor y no permite concluir una tendencia. Evidencia cruda: `artifacts/deep-audit-v5/baseline.json` y `after.json`.

Captura inicial de producción: 0 canvas antes de activar el 3D; aproximadamente 145.591 bytes de JavaScript transferido y 73.875 bytes de fuentes. Son mediciones de transferencia de esa ejecución, no el tamaño de una dependencia instalada. El 3D sigue separado de la carga inicial, con renderizado a demanda y sin postprocesado nuevo.

## Límites y prioridades para defender un proyecto premium

1. Obtener fotografías originales de calidad y referencias reales del horno. Aprobar geometría, materiales y despiece antes de presentarlos como producto fiel.
2. Confirmar nombres comerciales, especificaciones y condiciones de instalación, garantía y soporte. No están inventados en el sitio; los campos desconocidos permanecen pendientes.
3. Confirmar identidad comercial/legal y dominio HTTPS. Actualmente no se habilita la indexación sin un dominio configurado.
4. Validar el proceso de atención de Javier: el destino aprobado es +34 645 466 308. El formulario prepara un mensaje; el usuario debe enviarlo en WhatsApp. Las pruebas interceptan ese destino y no demuestran recepción ni respuesta comercial.
5. Acordar objetivos de negocio y medición proporcionada. No hay evidencia de tasa de conversión, leads entregados, ventas o retorno que permita justificar una valoración por resultados.
6. Probar Safari/iPhone y Android físicos antes de un lanzamiento comercial. La QA actual utiliza Chromium con viewports y preferencias simuladas.

## Archivos de esta ronda

Aplicación: `app/page.tsx`, `app/globals.css`, `components/header.tsx`, `components/mobile-navigation.tsx` (nuevo), `components/mobile-quote-bar.tsx` (nuevo), `components/product-experience.tsx`, `components/cinematic-hero.tsx`.

Verificación/documentación: `tests/deep-audit.spec.ts` (nuevo), `scripts/audit-responsive.mjs` (nuevo), este informe y `README.md`. `app/layout.tsx` se comprobó durante el ajuste de fuentes; se conserva el ajuste automático original de Next.

Capturas: `artifacts/deep-audit-v5/`. Para reproducir, ejecutar build, iniciar producción en 3004 y ejecutar `REVIEW_OUTPUT=artifacts/deep-audit-v5 node scripts/capture-review.mjs`, `REVIEW_OUTPUT=artifacts/deep-audit-v5 node scripts/capture-3d-review.mjs` y `node scripts/audit-responsive.mjs`. Ejecutar pruebas de rendimiento sin otras suites de navegador simultáneas.

Dependencias nuevas: ninguna. Commit: NOT CREATED. Despliegue: no realizado.

## Resultado de la verificación final

- `npm run build`: PASS. ESLint de aplicación, datos, pruebas y script nuevo: PASS.
- Playwright contra producción: **24/24 PASS**, desktop 1440×900, tablet 768×1024 y móvil 375×812; incluye preferencias de movimiento reducido, recorrido reversible, rotación/reset, contacto sin JavaScript, fallo recuperable del renderer, salida/reapertura del 3D y alternativa landscape.
- Capturas comerciales y de los cinco estados 3D renovadas. Console errors y failed requests: **0** en las capturas normales de los tres dispositivos. Los fallos WebGL provocados se prueban por separado, no se presentan como navegación normal.
- Comprobaciones adicionales 320×568 y 812×375: sin overflow horizontal y presupuesto accesible con scroll natural. Capturas de menú y acceso contextual móvil inspeccionadas junto con hero desktop/tablet, página móvil completa y estado 3D explotado.
- El control de calidad técnico de esta ronda pasa. La aprobación premium del producto real continúa pendiente de las fotografías y del modelo validado; no se declara que el sitio actual justifique 50.000 €.
