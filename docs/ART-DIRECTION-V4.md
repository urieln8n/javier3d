# JAVA — Verde, marfil y cobre / dirección visual V4

2026-11-13. Encargo: investigar webs y repositorios, elevar la identidad visual y cambiar el horno 3D. Implementado sobre el proyecto existente, con la conversión por WhatsApp aprobada. No publicación ni commit.

## Investigación utilizada

Se visitaron las páginas oficiales y se abrieron capturas de navegador antes de implementar. Las referencias visuales son inspiración de composición/atmósfera; no se importaron fotografías, logotipos, vídeos, textos comerciales ni código propietario de esas webs.

| Referente | Qué se estudió | Aplicación en JAVA |
| --- | --- | --- |
| [Gozney](https://www.gozney.com/) | Producto de gran tamaño, foco visual y jerarquía comercial en el hero. | Fotografía auténtica dominante y un CTA principal claro. |
| [Franco Manca](https://www.francomanca.co.uk/) | Identidad de pizzería reconocible, contraste, calidez y una acción principal legible. | Marca JAVA visible, tonos cálidos secundarios y recorrido de compra directo. No se copiaron su lettering o vídeos. |
| [Big Mamma](https://www.bigmammagroup.com/) | Atmósfera verde profunda y contraste entre tipografía editorial e imagen. | Verde profundo/marfil/cobre, serif editorial y escala tipográfica más característica. |
| [Marana Forni](https://www.maranaforni.es/) | Organización comercial de un fabricante profesional y consulta de producto. | Se conserva la solicitud de información sobre el horno, sin trasladar sus prestaciones a JAVA. Página consultada; no se afirma una inspección visual por screenshot de este referente. |

Capturas de investigación: `artifacts/research/*-clean.png`; `reference-browse.json` registra las visitas. Los modales de región/cookies se cerraron para poder ver las páginas. Las imágenes de investigación no se sirven desde public ni forman parte del producto.

## GitHub: recursos evaluados y uso real

| Repositorio | Uso | Licencia / coste |
| --- | --- | --- |
| [pmndrs/drei](https://github.com/pmndrs/drei) | APIs Environment/Lightformer para iluminación de estudio generada. OrbitControls ya existente. Consultada la documentación oficial del repositorio mediante el conector GitHub y las declaraciones del paquete instalado. | MIT. Paquete ya instalado; ninguna dependencia nueva. Environment usa frames=1, resolución 128, sin presets/HDRI externos. |
| [mrdoob/three.js](https://github.com/mrdoob/three.js) | BufferGeometry, ExtrudeGeometry, CylinderGeometry, DataTexture, CanvasTexture y materiales estándar. La geometría y las fórmulas de este cambio son código propio. | MIT; runtime ya instalado. Sin modelo ajeno descargado. |
| [google/fonts: Instrument Serif](https://github.com/google/fonts/tree/main/ofl/instrumentserif) | Regular e itálica autoalojadas mediante next/font/local. | SIL OFL 1.1, verificada en [OFL.txt](https://github.com/google/fonts/blob/main/ofl/instrumentserif/OFL.txt), incluida sin modificaciones en public/fonts/instrument-serif/OFL.txt. Archivos fuente: 141.604 bytes en total; aproximadamente 73.875 bytes transferidos en el navegador de producción local. |
| [pmndrs/gltfjsx](https://github.com/pmndrs/gltfjsx) | Sigue documentado para un futuro GLB aprobado. No necesario para la geometría propia de esta fase. | No instalado ni ejecutado. |

La búsqueda de modelos genéricos no aportó un modelo verificable del horno JAVA. El modelo implementado es una maqueta propia, identificada como tal. No se declara una plantilla/repositorio de pizzería ajeno como producto de JAVA.

Proveniencia de las fuentes sin modificar:

- Regular, SHA-256: `498efd461f6ddfcb7a111bf9a565709d2085d48201d501ead960d93e84ffbb88`
- Itálica, SHA-256: `08939b8bdf534afec24ae0ef5e03f948940cd9a8fe08e7fecbad040e62327385`

## Sistema visual aplicado

| Función | Color |
| --- | --- |
| Fondo verde profundo | #102923 |
| Panel verde | #18372e |
| Marfil | #f5efdf |
| Papel claro | #f1eddf |
| Cobre/champán | #d6b387 |
| CTA arcilla rojiza | #a43e2d |
| Tinta verde | #15362c |

Instrument Serif reemplaza a Georgia como tipografía editorial, manteniendo un sans de sistema para interfaz y JAVA como marca fuerte. Se ajustaron los tamaños por viewport, la presencia del producto, las líneas, el tratamiento de las referencias y la separación entre hero, colección, experiencia y presupuesto. No se añadieron degradados, neón, glassmorphism ni librerías de componentes.

Contrastes calculados: texto principal sobre verde 13,42:1; texto secundario 8,82:1; cobre sobre verde 7,82:1; texto de CTA 6,03:1; oliva sobre papel 5,39:1; texto secundario sobre papel 5,72:1. No se afirma una certificación integral de accesibilidad.

## Cambio del horno 3D

Se reemplazó la cúpula esférica cerrada, el arco de torus, la boca superpuesta y las llamas de conos por una maqueta más legible:

- Cúpula con geometría propia y abertura arqueada recortada en su superficie.
- Mosaico generado por código, variación determinista y bump map; dos texturas RGBA de 512², repetidas para obtener más detalle sin aumentar tamaño.
- Arco de trece piezas biseladas, boca oscura, plataforma frontal y zócalo diferenciados.
- Chimenea con collar, abertura superior y borde, ubicada hacia el frente de la cúpula.
- Marca JAVA sobre un parche curvo que sigue el zócalo. La primera versión tenía oclusión de las letras; corregida tras inspeccionar la captura.
- Luz de estudio cálida y relleno neutro generados con Lightformer/Environment. Sin HDRIs descargados ni postprocesado.

Las posiciones y proporciones son ilustrativas. No acreditan materiales reales, dimensiones, tipo de combustible, prestaciones ni ingeniería de un horno vendido. El aviso conceptual permanece visible. Las fotografías aprobadas siguen como fuente comercial principal; las dos imágenes originales no se han modificado.

Los grupos de cúpula/chimenea/frontal mantienen la coreografía reversible, reensamblaje, órbita manual, botones/flechas de teclado y reset. Se actualizaron los offsets de la chimenea para el nuevo modelo. No se introdujo movimiento continuo.

## Rendimiento

No dependencias npm añadidas, sin cambios en package.json/package-lock.json. Modelo y texturas de detalle siguen cargándose únicamente al activar la experiencia. Las fuentes son archivos locales con display swap; no peticiones a Google Fonts en runtime.

Medición de carga inicial en los tres tamaños, contextos Chromium nuevos:

- JavaScript: 145.056 bytes codificados / 485.865 descodificados.
- Fuentes: 73.875 bytes codificados / 141.604 descodificados, dos archivos.
- Canvas inicial: 0.
- Errores y desbordamiento horizontal: 0 / ninguno.

No son métricas de campo ni una promesa de rendimiento móvil. Texturas de mosaico: 2 MiB de píxeles base entre color y bump, aproximadamente 2,67 MiB con mipmaps; se generan localmente, sin transferencia de imágenes. El cubemap se captura a 128 px durante un fotograma. Canvas sigue en frameloop demand y DPR máximo 1,5. El detalle nuevo añade un coste de inicialización en el visor; una GPU física de gama media aún debe medirse.

## Verificación y capturas

- Build: PASS.
- ESLint de app, componentes, lib, tests y scripts de captura: PASS.
- Producción: **15 pruebas superadas, 55,0 s**.
- Desktop 1440×900, tablet 768×1024 y móvil 375×812: PASS.
- Preferencia de movimiento reducido, carga opt-in, giro/teclado/reset, reversibilidad, resize, fallo de WebGL, sin JavaScript, formulario y destino WhatsApp: PASS.
- Errores de consola/página y peticiones fallidas: 0 en los casos normales y las capturas de producción. Los fallos de WebGL provocados deliberadamente se comprueban en casos separados.
- No se enviaron mensajes de prueba al contacto; se intercepta la navegación externa en QA.

Se inspeccionaron las capturas completas y del hero en los tres tamaños, además del modelo ensamblado, detalle y despiece. No se observó recorte de producto, pérdida del CTA ni colisión de texto/visor en esos tamaños.

### Ver el resultado

- [Portada desktop](../artifacts/art-direction-v4/desktop-hero.png)
- [Página completa desktop](../artifacts/art-direction-v4/desktop-full.png)
- [Portada móvil](../artifacts/art-direction-v4/mobile-hero.png)
- [Horno nuevo, ensamblado](../artifacts/art-direction-v4/desktop-oven.png)
- [Despiece desktop](../artifacts/art-direction-v4/desktop-3d-exploded.png)
- [Horno móvil](../artifacts/art-direction-v4/mobile-3d-start.png)
- [Despiece móvil](../artifacts/art-direction-v4/mobile-3d-exploded.png)
- [Mediciones de página](../artifacts/art-direction-v4/browser-evidence.json)
- [Errores del visor](../artifacts/art-direction-v4/3d-browser-evidence.json)

Captura reproducible: `REVIEW_OUTPUT=artifacts/art-direction-v4 node scripts/capture-review.mjs` y `node scripts/capture-3d-review.mjs`, con producción en puerto 3004. Las evidencias comerciales de la fase anterior se conservan.

## Archivos y límites

Cambios: app/globals.css, app/layout.tsx, app/icon.svg, components/oven-scene.tsx; nuevos components/oven-model.tsx y lib/oven-geometry.ts; fuentes/licencia en public/fonts/instrument-serif/; scripts/capture-review.mjs y nuevo scripts/capture-3d-review.mjs; este informe y capturas de investigación/QA.

Contacto +34 645 466 308 y flujo de venta intactos. Nombres oficiales, especificaciones, precios, garantías, empresa y términos técnicos siguen pendientes de información real. El salto visual no sustituye el modelado validado con referencias/medidas de Javier. Ningún asset de competidores se publica y ninguna especificación se ha inventado. Sin commits ni despliegue.
