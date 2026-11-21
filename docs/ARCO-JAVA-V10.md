# JAVA — Arco JAVA V10: auditoría profunda, tipografía e identidad

Fecha: 13 de noviembre de 2026. Encargo del usuario: seguir el camino de la identidad de ladrillo con más identidad y más fuerza; auditoría profunda, investigación, cambio de tipografía y una presencia de marca de primer nivel. Esta fase completa el V10 que Codex dejó sin documentar (emblema, marcos arqueados y firma junto al contacto) y lo convierte en un sistema.

No se afirma ninguna valoración económica. «Que se vea valorada en 5.000.000 €» se ha tratado como un listón de oficio visual (el de las marcas premium del sector), no como una cifra: el valor de un negocio no lo establece el aspecto de su web.

## Investigación

| Fuente | Qué aporta | Uso en JAVA |
| --- | --- | --- |
| Fotografías aprobadas de JAVA (ampliadas) | Cada horno real tiene la boca enmarcada por un arco de dovelas de ladrillo salmón con juntas oscuras en cuña. El horno lleva además una marca propia «JΛVΛ» en dorado. | El arco de dovelas pasa a ser la firma gráfica, dibujado a partir de ese arco. La marca impresa del horno no se reproduce a partir de una foto borrosa: falta su vector original. |
| [Gozney: tipografía](https://madegooddesigns.com/gozney-font/) y [Alfa Forni: guía](https://madegooddesigns.com/alfa-forni-brand-guidelines/) (fuentes no oficiales) | Las marcas premium de hornos usan un logotipo dibujado propio y un registro serif de herencia italiana. | Logotipo propio construido con ladrillos + serif de herencia italiana. Se citan como indicio, no como dato oficial. |
| [Bodoni Moda en Google Fonts](https://fonts.google.com/specimen/Bodoni+Moda/about) y [google/fonts](https://github.com/google/fonts) | Bodoni (Parma, s. XVIII) en versión variable con peso y tamaño óptico; licencias verificadas en los `OFL.txt` del repositorio. | Tipografía de display. |
| Capturas previas en `artifacts/research/` (Gozney, Franco Manca, Big Mamma) | Producto protagonista, CTA claro, verde profundo con tipografía editorial. | Se mantienen como referencia; no se copió nada. |

Se compararon especímenes reales en la paleta del sitio: Instrument Serif + Arial (actual), Bodoni Moda + Archivo y Newsreader + Archivo; y cuatro variantes de logotipo (Archivo Black y Archivo 900 al 100/112/125 % de anchura).

## Auditoría profunda

| Prioridad | Hallazgo comprobado | Acción | Estado |
| --- | --- | --- | --- |
| Alta | Tipografía genérica: Instrument Serif con un solo peso y Arial del sistema para el texto. La combinación crema + serif + terracota es la de las plantillas generadas. | Bodoni Moda (display) + Archivo (texto e interfaz), autoalojadas. | Hecho |
| Alta | La marca dependía de fuentes del sistema: en Linux se dibujaba con DejaVu Sans Bold (J descolgada) y en Windows con Arial. La marca no era la misma en cada equipo ni en las capturas de QA. | Logotipo SVG construido con hiladas de ladrillo, idéntico en todos los equipos. | Hecho |
| Alta | El escenario del hero era un óvalo de ladrillo plano sin relación con el producto, y en móvil el horno flotaba sobre la base. | Arco de dovelas tomado de las bocas reales, interior con brasa, línea de solera de latón y hornos apoyados en ella. | Hecho |
| Alta | Los recortes de las fotos dejaban asomar el fondo blanco en la base de la referencia 02 (visible sobre fondo oscuro) y cortaban en recta la base curva de la 01. | Polígonos redibujados justo dentro de cada silueta, verificados superponiéndolos a la foto. Las fotos no se modifican. | Hecho |
| Alta | Regresión de conversión en móvil: el bloque del sello del V10 sin terminar empujaba el formulario fuera de pantalla tras pulsar «Solicitar presupuesto» (fallaba 1 de 27 pruebas). | El sello se oculta en teléfonos (ya abre el hero móvil). 27/27. | Hecho |
| Alta | En portátiles de 1366×768 y 1280×720 el botón de presupuesto quedaba bajo el pliegue (786 y 762 px). | Cabecera y titular a escala compacta en pantallas anchas y bajas: 682 y 668 px. | Hecho |
| Media | WhatsApp es el canal de venta, pero la vista previa de enlaces usaba un recorte de 691 px. Tampoco había icono para iOS. | Tarjeta 1200×630 de 86 KB (marca + foto aprobada) e `apple-icon.png`. La tarjeta se activa al configurar el dominio real, igual que antes. | Hecho |
| Media | Numeración decorativa (01–04 en FAQ, 01–03 en proyectos, «01 — Hablemos») sin secuencia real. | FAQ sin números, claves de arco en los proyectos y «Respuesta por WhatsApp». | Hecho |
| Media | Costuras irregulares: una franja en una sección, un borde de 6 px en otra y nada en el resto. | Una hilada de ladrillo en cada cambio claro/oscuro. | Hecho |
| Media | Nombre de fuente de reserva sin comillas generado por next/font («Bodoni 72») que invalidaba todos los titulares; la variable `--font-sans` chocaba con Tailwind v4. | Reserva corregida y variable renombrada a `--sans`. | Hecho |
| Media | Los scripts de QA fallaban con imágenes en capas fijas y capturaban a mitad de animación. | Corregidos `capture-review.mjs` y `audit-responsive.mjs`. | Hecho |
| Media | Las fotografías son recortes de 691 px: se ven blandas en pantallas retina. Es hoy la mayor distancia con una marca premium. | Necesita los originales en alta resolución. | Pendiente del propietario |
| Media | El logotipo oficial de JAVA (la marca «JΛVΛ» del horno) no existe en vector. El logotipo web es una marca tipográfica de ladrillo, no la oficial. | Aportar el vector para conciliar ambas. | Pendiente del propietario |
| Media | La hoja de estilos acumula capas V4→V10 que se sobrescriben (unas 890 líneas). | Consolidar en una fase de refactorización (Codex, según el flujo del proyecto). | Recomendado |
| Baja | Fuentes: +55 KB frente a la versión anterior (128.808 bytes en 3 archivos precargados). | Subconjunto latino, Bodoni fijada en peso 500, ejes limitados. Vigilar LCP en dispositivos reales. | Aceptado |
| Baja | ↗ y ☰ no existen en Archivo y usan la fuente del sistema. | Iconos SVG propios en una fase posterior. | Recomendado |
| Baja | Los archivos de Instrument Serif siguen en `public/fonts/` sin uso. | Se pueden borrar; no se cargan. | Pendiente de decisión |

Nota de QA: Chromium sin interfaz en Linux redondea el espaciado de Archivo a tamaños pequeños. Con el hinting desactivado, más parecido a Windows y macOS, el espaciado es regular. La fuente original no trae instrucciones de hinting.

## Sistema tipográfico

| Papel | Familia | Licencia | Archivo servido |
| --- | --- | --- | --- |
| Display (titulares, citas) | Bodoni Moda, Indestructible Type | SIL OFL 1.1 | `public/fonts/bodoni-moda/BodoniModa-Latin.woff2` (31.980 B) e itálica (36.836 B), peso 500, tamaño óptico variable |
| Texto e interfaz | Archivo, Omnibus-Type | SIL OFL 1.1 | `public/fonts/archivo/Archivo-Latin.woff2` (59.992 B), peso 400–900, anchura 100–125 % |
| Logotipo | Contornos de Archivo 900 al 112 %, con su propio kerning | SIL OFL 1.1 | Convertidos en trazados: `scripts/brand-glyphs.json` |

Tamaño óptico fijado en 48 (h1) y 28 (h2, h3 y citas): conserva el contraste de Bodoni con trazos finos suficientemente sólidos en pantalla. Las etiquetas usan Archivo expandida al 112 %. Los `OFL.txt` se copian sin cambios junto a cada fuente.

Procedencia (SHA-256 de los originales de google/fonts):

- `BodoniModa[opsz,wght].ttf`: `550f5e34ee0a828d7941b1fe9bc58b34e5260d3f33a61532e6d0a0114e79a5cf`
- `BodoniModa-Italic[opsz,wght].ttf`: `dfff1619f8f6871c6372f8855b67211f9a73b4e93d45aca868cd8f46a48622de`
- `Archivo[wdth,wght].ttf`: `0e094a7d3c7c4c25cf1310c4b30014f1dae9332220b1c2c88f4fa996f0b05053`

## Sistema de identidad

Todo se genera con código, de forma determinista y sin dependencias nuevas: `node scripts/build-brand.mjs`, y después `node scripts/render-social.mjs` (usa Playwright, ya instalado).

- **Logotipo de ladrillo** (`java-wordmark.svg`, 9,9 KB; `java-wordmark-compact.svg` para cabecera y barra móvil): ocho hiladas con aparejo a soga, juntas oscuras, relieve, grano y un leve canto. Es imagen con texto alternativo vacío dentro de enlaces con nombre accesible.
- **Arco JAVA** (`java-arch.svg` y `java-arch-tall.svg`): dovelas rectangulares en disposición radial, juntas en cuña, clave destacada y boca con brasa. Es el escenario del producto: ancho en escritorio y sobre pilares en tablet y móvil.
- **Sello** (`java-emblem.svg`): disco verde con anillos de latón, arco en miniatura, JAVA y el lema en trazados, sin depender de fuentes del sistema.
- **Hilada** (`hilada.svg`): una hilada de ladrillo en cada costura entre secciones claras y oscuras.
- **Clave**: la pieza que cierra el arco marca las secciones, las opciones de proyecto y el remate de los marcos de la colección.
- **Favicon, icono de iOS y tarjeta de enlace** derivados del mismo sistema.
- **Paleta única de ladrillo**: el salmón terracota de las bocas fotografiadas para el logotipo, el arco y las hiladas.
- **Movimiento**: un único momento. El logotipo del hero se levanta hilada a hilada, de abajo arriba, una sola vez (0,84 s) y el arco aparece con su brasa. Con movimiento reducido todo está completo desde el primer fotograma. No hay animación continua.

El ladrillo es identidad gráfica, no una afirmación sobre materiales, construcción ni prestaciones. No se han inventado nombres de modelo, especificaciones, precios, garantías ni historia.

## Verificación

- ESLint (app, components, lib, scripts, tests): PASS. `next build`: PASS.
- Playwright contra producción: **27/27 PASS** en escritorio, tablet y móvil. Cubre el traspaso a WhatsApp interceptado (no se enviaron mensajes), recorrido 3D, movimiento reducido, contacto sin JavaScript, menú móvil, barra de presupuesto y fallo de WebGL.
- Capturas en `artifacts/arch-identity-v10/` para 1440×900, 768×1024, 375×812, 320×568 y 812×375. En todas: cero errores de consola, cero solicitudes fallidas, sin desbordamiento horizontal y ningún canvas antes de activar el 3D. Se revisaron visualmente.
- JavaScript inicial: 146.380 bytes (V9: 146.351). Fuentes: 128.808 bytes en 3 archivos (antes, unos 73.875 bytes de Instrument Serif más Arial del sistema).
- Botón de presupuesto dentro de la primera pantalla: 1440×900 (797 px), 1536×864 (800), 1366×768 (682) y 1280×720 (668). Datos en `laptop-cta.txt`.

## Archivos

Aplicación: `app/layout.tsx`, `app/globals.css` (capa V10), `app/page.tsx`, `app/icon.svg`, `app/apple-icon.png` (nuevo); `components/header.tsx`, `hero-gallery.tsx`, `mobile-quote-bar.tsx`, `lead-form.tsx`. Marca: `public/brand/` (`java-wordmark*.svg`, `java-arch*.svg`, `java-emblem.svg`, `hilada.svg`, `brick-bond.svg`, `java-og.jpg`); `public/fonts/bodoni-moda/` y `public/fonts/archivo/`. Herramientas: `scripts/build-brand.mjs`, `scripts/brand-glyphs.json`, `scripts/render-social.mjs`; correcciones en `scripts/capture-review.mjs` y `scripts/audit-responsive.mjs`. Las fotografías originales no se han modificado.

Sin despliegue. Commit: NOT CREATED.
