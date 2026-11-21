# JAVA — firma blanca V7

Cambio visual autorizado: marca JAVA en blanco puro, firma de gran escala en el hero y escenario terracota para la fotografía del horno. Se conserva el verde industrial, el producto real aprobado, el selector de referencias y el acceso al presupuesto. Sin datos técnicos nuevos, nuevos activos, dependencias, páginas ni cambios al modelo.

Archivos de aplicación: `app/page.tsx` y `app/globals.css`. La nueva firma es decorativa (`aria-hidden`) para no duplicar la lectura de la marca; el h1 comercial sigue siendo «El corazón de tu pizzería». La marca del encabezado, el pie y el acceso móvil al presupuesto también usa blanco puro. La entrada breve de la firma se desactiva con movimiento reducido.

En móvil se omite el texto decorativo del masthead y se compactan las dos acciones a partir de 361 px para dar más espacio al horno, manteniendo la acción principal y sus 48 px de altura. En pantallas más estrechas se permite el salto natural de las acciones.

Capturas: `artifacts/white-signature-v7/`. Sin commit ni despliegue.

## Resultado

Build y ESLint: PASS. Suite completa de producción: 27/27 PASS. Tras compactar exclusivamente el hero móvil, nueva build PASS y repetición de las 8 pruebas comerciales/móviles pertinentes: 8/8 PASS. Se mantienen movimiento reducido, contacto sin JavaScript, recuperación del visor y selección de referencia hacia el presupuesto.

Capturas renovadas de desktop 1440×900, tablet 768×1024 y móvil 375×812: cero errores de consola, cero solicitudes fallidas y sin overflow horizontal. Comprobaciones adicionales 320×568 y 812×375: PASS. Inspección visual de los tres heroes, incluyendo el horno completo y CTA dentro de la captura móvil final. La transferencia inicial de JavaScript observada no aumenta respecto a V6: 146.336 bytes.

Servidor de desarrollo existente: HTTP 200 en localhost:3000. Se detuvo el servidor temporal de QA. Las fotografías y la geometría permanecen sin cambios. Commit: NOT CREATED.
