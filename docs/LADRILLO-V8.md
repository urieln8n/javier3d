# JAVA — Ladrillo a ladrillo

La frase de Javier, aportada y aprobada por el usuario, pasa a ser la firma principal: «Ladrillo a ladrillo.» Se presenta en dos líneas de gran escala, con énfasis cobre en la segunda. La marca JAVA sigue blanca. Apoyo comercial: «El corazón de tu pizzería empieza aquí. Encuentra tu horno JAVA.» La categoría «Hornos profesionales para pizza» y el presupuesto permanecen visibles.

Se aplica al h1, al pie de página y a los títulos de documento/Open Graph/Twitter. El texto decorativo junto al gran JAVA se simplifica para no repetir el lema. No se añaden afirmaciones sobre fabricación, materiales o construcción a partir del eslogan.

Cambios: `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, expectativas de titular en `tests/home.spec.ts` y este informe. Capturas en `artifacts/ladrillo-v8/`.

Verificación: build PASS, ESLint PASS, 12/12 pruebas comerciales de producción PASS en escritorio/tablet/móvil, incluyendo movimiento reducido, contacto sin JavaScript y recuperación del visor. Capturas de los tres tamaños sin errores de consola, solicitudes fallidas ni overflow; revisión visual del hero desktop y móvil. QA adicional a 320×568 y 812×375 PASS.

No se cambian fotografías, geometría, dependencias ni secciones. Sin despliegue. Commit: NOT CREATED.
