# JAVA — identidad de ladrillo V9

El usuario solicita sustituir la marca blanca por letras con apariencia de ladrillo y extender el carácter artesanal a partes de la web. Se aplica un patrón vectorial original de aparejo alterno, tonos terracota, juntas y pequeñas marcas superficiales a los wordmarks del encabezado, hero, pie, acceso móvil al presupuesto y marca decorativa del formulario.

La presentación incorpora ladrillo en el escenario fotográfico, una franja en la colección, un pequeño remate en el manifiesto y el borde superior del pie. El cuerpo de texto, los campos y los CTA permanecen sobre fondos lisos para proteger la lectura. El eslogan de Javier «Ladrillo a ladrillo» se conserva como titular principal.

El acabado es una identidad gráfica; no constituye una afirmación nueva sobre los materiales, fabricación o prestaciones de los hornos. No se modifican las fotografías aprobadas ni la geometría conceptual. El patrón es SVG nativo de 1.027 bytes, sin imágenes de terceros, descargas externas ni dependencias nuevas. No añade animación continua. La marca sigue siendo texto real; existe color de reserva para navegadores sin recorte de fondo al texto y alternativa legible para colores forzados.

Archivos: `public/brand/brick-bond.svg` (nuevo), `app/globals.css`, `app/page.tsx`, `components/header.tsx`, `components/mobile-quote-bar.tsx`, `README.md` y este informe.

Capturas: `artifacts/brick-identity-v9/`, incluidas las tres composiciones comerciales, selección de la segunda referencia, página completa y detalles desktop del pie y manifiesto. Se inspeccionan visualmente los heroes desktop/móvil y el pie.

Build y ESLint: PASS. Capturas normales de 1440×900, 768×1024 y 375×812: cero errores de consola y solicitudes fallidas, sin overflow horizontal. Comprobaciones extra 320×568 y 812×375: PASS. Sin aumento sustancial de JS: 146.351 bytes transferidos observados al inicio, 15 bytes más que V8 por la clase del componente existente.

Sin despliegue. Commit: NOT CREATED.

Suite completa Playwright contra producción: **27/27 PASS**, incluyendo recorrido 3D, despiece y reensamblado, controles, movimiento reducido, salida del visor, menú móvil, fotografía seleccionada hacia el formulario, contacto sin JavaScript y fallo recuperable de WebGL. No se enviaron mensajes comerciales durante las pruebas.
