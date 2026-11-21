/* pedido.js — Kit Webs 3D · Pedido por WhatsApp, sin servidor ni dependencias.
   Cómo se usa (lo monta la skill en la Fase 5):
   1) En el <body>: data-whatsapp="34600111222" (prefijo de país, sin + ni espacios) y data-negocio="Nombre".
      Si el negocio no tiene WhatsApp, quita data-whatsapp: el botón abre WhatsApp para elegir contacto y avisa en consola.
   2) Cada producto que se pueda pedir: <article class="m3d-tarjeta" data-producto="Nombre" data-precio="65">
      con un <button type="button" class="m3d-anadir">Añadir al pedido</button> dentro.
      data-precio es opcional ("a consultar"): sin él se pide igual y el total dice "a confirmar".
   3) Un <div class="m3d-pedido" hidden></div> antes de </body>: aquí se dibuja la barra del pedido.
   4) Cualquier enlace con data-whatsapp-texto="Hola, ..." abre WhatsApp con ese texto (para "Escríbenos").
   El mensaje sale con los productos, cantidades, total, y las líneas "Nombre:" y "Día:" para que el cliente las rellene.
   No guarda nada en el navegador: no hace falta aviso de cookies. */
(() => {
  const body = document.body;
  const telefono = (body.dataset.whatsapp || '').replace(/[^\d]/g, '');
  const negocio = body.dataset.negocio || document.title.split('—')[0].trim();
  if (!telefono) console.warn('[pedido] Falta data-whatsapp en <body>: WhatsApp se abrirá para elegir contacto.');

  const enlace = (texto) => `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;
  const euros = (n) => (Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')) + ' €';

  // Enlaces sueltos de "escríbenos"
  document.querySelectorAll('[data-whatsapp-texto]').forEach((a) => {
    a.href = enlace(a.dataset.whatsappTexto);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  const tarjetas = [...document.querySelectorAll('[data-producto]')];
  const barra = document.querySelector('.m3d-pedido');
  if (!tarjetas.length || !barra) return;

  const carrito = new Map(); // nombre → { precio, cantidad }

  barra.innerHTML = `
    <div class="m3d-pedido__info" aria-live="polite">
      <strong class="m3d-pedido__total"></strong>
      <span class="m3d-pedido__lineas"></span>
    </div>
    <button type="button" class="m3d-pedido__vaciar" aria-label="Vaciar el pedido">Vaciar</button>
    <a class="m3d-boton m3d-pedido__enviar" target="_blank" rel="noopener">Enviar por WhatsApp</a>`;
  const $total = barra.querySelector('.m3d-pedido__total');
  const $lineas = barra.querySelector('.m3d-pedido__lineas');
  const $enviar = barra.querySelector('.m3d-pedido__enviar');

  function pintar() {
    let unidades = 0, total = 0, sinPrecio = false;
    const lineas = [];
    for (const [nombre, { precio, cantidad }] of carrito) {
      unidades += cantidad;
      if (precio == null) sinPrecio = true; else total += precio * cantidad;
      lineas.push(`${cantidad} × ${nombre}${precio == null ? '' : ` (${euros(precio * cantidad)})`}`);
    }
    barra.hidden = unidades === 0;
    body.classList.toggle('m3d-con-pedido', unidades > 0);
    $total.textContent = sinPrecio ? (total ? `${euros(total)} + a confirmar` : 'Precio a confirmar') : euros(total);
    $lineas.textContent = `${unidades} ${unidades === 1 ? 'producto' : 'productos'}`;
    const texto = [
      `Hola, quiero hacer un pedido a ${negocio}:`,
      ...lineas.map((l) => `• ${l}`),
      `Total: ${$total.textContent}`,
      '',
      'Nombre:',
      'Día:',
      'Recogida o a domicilio:',
    ].join('\n');
    $enviar.href = enlace(texto);
    tarjetas.forEach((t) => {
      const c = carrito.get(t.dataset.producto)?.cantidad || 0;
      const b = t.querySelector('.m3d-anadir');
      if (b) b.textContent = c ? `Llevas ${c} · añadir` : 'Añadir al pedido';
      t.classList.toggle('m3d-tarjeta--en-pedido', c > 0);
    });
  }

  tarjetas.forEach((t) => {
    const b = t.querySelector('.m3d-anadir');
    if (!b) return;
    b.addEventListener('click', () => {
      const nombre = t.dataset.producto;
      const precio = t.dataset.precio ? parseFloat(t.dataset.precio.replace(',', '.')) : null;
      const actual = carrito.get(nombre) || { precio, cantidad: 0 };
      actual.cantidad++;
      carrito.set(nombre, actual);
      pintar();
    });
  });
  barra.querySelector('.m3d-pedido__vaciar').addEventListener('click', () => { carrito.clear(); pintar(); });
  pintar();
})();
