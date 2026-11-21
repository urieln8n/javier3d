// JAVA brand kit. Run with: node scripts/build-brand.mjs
//
// Writes deterministic, dependency-free SVG assets:
//   public/brand/java-wordmark.svg           JAVA laid in brick courses, for large sizes
//   public/brand/java-wordmark-compact.svg   fewer, larger courses for the header and small sizes
//   public/brand/java-arch.svg               voussoir arch drawn from the mouths of the photographed ovens
//   public/brand/java-arch-tall.svg          the same arch on taller piers, for narrow screens
//   public/brand/java-emblem.svg             seal: arch, JAVA and ring lettering
//   public/brand/hilada.svg                  one brick course (hilada) used at section seams
//   public/brand/brick-bond.svg              running-bond tile for brick-filled text
//   app/icon.svg                             favicon
//
// Letter outlines: Archivo by Omnibus-Type (SIL Open Font License 1.1), instanced at wght 900 /
// wdth 112 for "JAVA" (shaped with the font's own kerning) and wght 700 / wdth 112 for the ring
// lettering. They were extracted once into scripts/brand-glyphs.json, so no font tooling is
// needed here. The brickwork is identity graphics, not a claim about materials or construction.

import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const glyphs = JSON.parse(await readFile(new URL("scripts/brand-glyphs.json", root), "utf8"));

// One brick family everywhere: the salmon terracotta and dark joints visible around the mouths
// of the two photographed JAVA ovens.
const bricks = ["#cc8767", "#b97154", "#d79c7e", "#a9614a", "#c27d60"];
const palette = {
  wall: bricks,
  arch: bricks,
  wallMortar: "#2b221e",
  archMortar: "#2b221e",
  edge: "#7a3920",
  extrusion: "#4f2416",
  brass: "#d6b387",
  green: "#102923",
  seal: "#163a31",
};

const n = value => {
  const rounded = Math.round(value * 10) / 10;
  return Object.is(rounded, -0) ? "0" : String(rounded);
};

// mulberry32: repeatable brick tones for every run of this script.
function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toneSequence(seed, count) {
  const rand = random(seed);
  let previous = -1;
  return () => {
    let tone;
    do tone = Math.floor(rand() * count); while (tone === previous);
    previous = tone;
    return tone;
  };
}

// Supports the absolute commands emitted by fontTools' SVGPathPen.
function translatePath(d, dx, dy = 0) {
  const tokens = d.match(/[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/g) ?? [];
  let command = "";
  let index = 0;
  let out = "";
  for (const token of tokens) {
    if (/[A-Za-z]/.test(token)) {
      if (!"MLHVQCZ".includes(token)) throw new Error(`Unsupported path command: ${token}`);
      command = token;
      index = 0;
      out += token;
      continue;
    }
    let value = Number(token);
    if (command === "H") value += dx;
    else if (command === "V") value += dy;
    else value += index % 2 === 0 ? dx : dy;
    out += (index === 0 ? "" : " ") + n(value);
    index += 1;
  }
  return out;
}

function logotype(tracking) {
  const { glyphs: letters, bounds } = glyphs.logotype;
  let d = "";
  let left = Infinity;
  let right = -Infinity;
  letters.forEach((letter, index) => {
    const x = letter.x + tracking * index;
    d += translatePath(letter.d, x);
    left = Math.min(left, x + bounds[index][0]);
    right = Math.max(right, x + bounds[index][2]);
  });
  return {
    d,
    left,
    right,
    top: -Math.max(...bounds.map(bound => bound[3])),
    bottom: -Math.min(...bounds.map(bound => bound[1])),
  };
}

function brickRect(x, y, length, course, joint) {
  return `M${n(x + joint / 2)} ${n(y + joint / 2)}h${n(length - joint)}v${n(course - joint)}h${n(joint - length)}z`;
}

function tonePaths(groups, tones) {
  return groups.map((group, index) => (group.length ? `<path fill="${tones[index]}" d="${group.join("")}"/>` : "")).join("");
}

// One bevel tile serves every brick because the bond is a regular grid.
function bevelPattern(id, x, y, length, course, joint) {
  const face = length - joint;
  const light = course * 0.07;
  const shade = course * 0.11;
  const brick = (bx, by) =>
    `<rect x="${n(bx + joint / 2)}" y="${n(by + joint / 2)}" width="${n(face)}" height="${n(light)}" fill="#fff" opacity=".2"/>` +
    `<rect x="${n(bx + joint / 2)}" y="${n(by + course - joint / 2 - shade)}" width="${n(face)}" height="${n(shade)}" fill="#000" opacity=".2"/>`;
  return `<pattern id="${id}" patternUnits="userSpaceOnUse" x="${n(x)}" y="${n(y)}" width="${n(length)}" height="${n(course * 2)}">` +
    brick(0, 0) + brick(-length / 2, course) + brick(length / 2, course) + `</pattern>`;
}

function grainPattern(id, width, height, size, seed) {
  const rand = random(seed);
  let dots = "";
  for (let index = 0; index < 46; index += 1) {
    const dark = index % 3 !== 0;
    dots += `<rect x="${n(rand() * width)}" y="${n(rand() * height)}" width="${n(size * (0.6 + rand()))}" height="${n(size * (0.5 + rand() * 0.6))}" fill="${dark ? "#3a1a10" : "#f3c9a6"}" opacity="${dark ? ".28" : ".22"}"/>`;
  }
  return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${n(width)}" height="${n(height)}">${dots}</pattern>`;
}

function wordmark({ courses, lengthRatio, jointRatio, tracking, extrusion, edge, grain, seed }) {
  const shape = logotype(tracking);
  const course = -shape.top / courses;
  const length = course * lengthRatio;
  const joint = course * jointRatio;
  const pad = edge + 2;
  const minX = shape.left - pad;
  const maxX = shape.right + pad;
  const minY = shape.top - pad;
  const maxY = shape.bottom + extrusion + pad;
  const originX = minX - length;
  const nextTone = toneSequence(seed, palette.wall.length);
  const groups = palette.wall.map(() => []);
  const rows = Math.ceil((shape.bottom - shape.top) / course);
  for (let row = 0; row < rows; row += 1) {
    const y = shape.top + row * course;
    for (let x = originX - (row % 2) * (length / 2); x < maxX; x += length) groups[nextTone()].push(brickRect(x, y, length, course, joint));
  }
  const width = maxX - minX;
  const height = maxY - minY;
  const pixelScale = 200 / -shape.top;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(width * pixelScale)}" height="${Math.round(height * pixelScale)}" viewBox="${n(minX)} ${n(minY)} ${n(width)} ${n(height)}">` +
    `<defs><path id="letters" d="${shape.d}"/><clipPath id="inside"><use href="#letters"/></clipPath>` +
    bevelPattern("bevel", originX, shape.top, length, course, joint) +
    (grain ? grainPattern("grain", length * 2.37, course * 3.13, course * 0.06, seed + 7) : "") +
    `</defs>` +
    (extrusion ? `<use href="#letters" transform="translate(0 ${n(extrusion)})" fill="${palette.extrusion}"/>` : "") +
    `<g clip-path="url(#inside)"><rect x="${n(minX)}" y="${n(minY)}" width="${n(width)}" height="${n(height)}" fill="${palette.wallMortar}"/>` +
    tonePaths(groups, palette.wall) +
    (grain ? `<rect x="${n(minX)}" y="${n(minY)}" width="${n(width)}" height="${n(height)}" fill="url(#grain)"/>` : "") +
    `<rect x="${n(minX)}" y="${n(minY)}" width="${n(width)}" height="${n(height)}" fill="url(#bevel)"/></g>` +
    `<use href="#letters" fill="none" stroke="${palette.edge}" stroke-width="${n(edge)}" stroke-linejoin="round"/></svg>\n`;
}

// Voussoirs are rectangles of constant width set radially, so the joints open into wedges
// towards the extrados, as on the photographed oven mouths. An odd count puts a keystone on top.
function voussoirs({ cx, cy, outer, inner, count, width, keystoneLift, seed }) {
  const nextTone = toneSequence(seed, palette.arch.length);
  const groups = palette.arch.map(() => []);
  const keystone = [];
  for (let index = 0; index < count; index += 1) {
    const angle = Math.PI - ((index + 0.5) * Math.PI) / count;
    const ux = Math.cos(angle);
    const uy = -Math.sin(angle);
    const vx = Math.sin(angle);
    const vy = Math.cos(angle);
    const isKey = index === (count - 1) / 2;
    const top = outer + (isKey ? keystoneLift : 0);
    const flare = isKey ? width * 0.12 : 0;
    const corners = [
      [cx + inner * ux + (width / 2) * vx, cy + inner * uy + (width / 2) * vy],
      [cx + inner * ux - (width / 2) * vx, cy + inner * uy - (width / 2) * vy],
      [cx + top * ux - (width / 2 + flare) * vx, cy + top * uy - (width / 2 + flare) * vy],
      [cx + top * ux + (width / 2 + flare) * vx, cy + top * uy + (width / 2 + flare) * vy],
    ];
    const d = `M${corners.map(([x, y]) => `${n(x)} ${n(y)}`).join("L")}Z`;
    if (isKey) keystone.push(d);
    else groups[nextTone()].push(d);
  }
  return tonePaths(groups, palette.arch) + `<path fill="#e2b199" d="${keystone.join("")}"/>`;
}

function pier(x, top, bottom, width, course, joint, seed) {
  const nextTone = toneSequence(seed, palette.arch.length);
  const groups = palette.arch.map(() => []);
  for (let y = top; y < bottom - 0.01; y += course) groups[nextTone()].push(brickRect(x, y, width, Math.min(course, bottom - y + joint / 2), joint));
  return tonePaths(groups, palette.arch);
}

function arch({ radius = 300, depth = 60, count = 23, jamb = 24, pad = 22, seed = 41 }) {
  const width = 2 * (radius + pad);
  const cx = width / 2;
  const cy = pad + radius;
  const base = cy + jamb;
  const inner = radius - depth;
  const brickWidth = ((Math.PI * inner) / count) * 0.86;
  const ring = `M${n(cx - radius - 2)} ${n(cy)}A${n(radius + 2)} ${n(radius + 2)} 0 0 1 ${n(cx + radius + 2)} ${n(cy)}V${n(base)}H${n(cx + inner - 1)}V${n(cy)}A${n(inner - 1)} ${n(inner - 1)} 0 0 0 ${n(cx - inner + 1)} ${n(cy)}V${n(base)}H${n(cx - radius - 2)}Z`;
  const opening = `M${n(cx - inner)} ${n(base)}V${n(cy)}A${n(inner)} ${n(inner)} 0 0 1 ${n(cx + inner)} ${n(cy)}V${n(base)}Z`;
  const outline = `M${n(cx - radius - pad + 7)} ${n(base)}V${n(cy)}A${n(radius + pad - 7)} ${n(radius + pad - 7)} 0 0 1 ${n(cx + radius + pad - 7)} ${n(cy)}V${n(base)}`;
  const vault = bevelPattern("vault", cx, cy - inner, 64, 26, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${n(width)}" height="${n(base)}" viewBox="0 0 ${n(width)} ${n(base)}">` +
    `<defs>` +
    `<radialGradient id="ember" gradientUnits="userSpaceOnUse" cx="${n(cx)}" cy="${n(base)}" r="${n(inner * 1.08)}">` +
    `<stop offset="0" stop-color="#f6a55c" stop-opacity=".95"/><stop offset=".2" stop-color="#d8692f" stop-opacity=".78"/><stop offset=".48" stop-color="#6e2c17"/><stop offset=".78" stop-color="#2a1610"/><stop offset="1" stop-color="#150d0b"/></radialGradient>` +
    `<radialGradient id="depth" gradientUnits="userSpaceOnUse" cx="${n(cx)}" cy="${n(cy)}" r="${n(inner)}"><stop offset=".8" stop-opacity="0"/><stop offset="1" stop-opacity=".55"/></radialGradient>` +
    `<radialGradient id="volume" gradientUnits="userSpaceOnUse" cx="${n(cx)}" cy="${n(cy)}" r="${n(radius)}"><stop offset="${n(inner / radius)}" stop-opacity=".34"/><stop offset="${n((inner + depth * 0.4) / radius)}" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/></radialGradient>` +
    `<linearGradient id="light" x1="0" y1="${n(cy - radius)}" x2="0" y2="${n(base)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-opacity=".22"/></linearGradient>` +
    `<clipPath id="springing"><rect width="${n(width)}" height="${n(cy)}"/></clipPath>` +
    `<clipPath id="mouth"><path d="${opening}"/></clipPath>` + vault +
    `</defs>` +
    `<path d="${opening}" fill="url(#ember)"/>` +
    `<g clip-path="url(#mouth)" opacity=".5"><rect width="${n(width)}" height="${n(base)}" fill="url(#vault)"/></g>` +
    `<path d="${opening}" fill="url(#depth)"/>` +
    `<path d="${ring}" fill="${palette.archMortar}"/>` +
    `<g clip-path="url(#springing)">${voussoirs({ cx, cy, outer: radius, inner, count, width: brickWidth, keystoneLift: 6, seed })}</g>` +
    (jamb > 4 ? pier(cx - radius, cy, base, depth, brickWidth * 1.05, 3.4, seed + 1) + pier(cx + inner, cy, base, depth, brickWidth * 1.05, 3.4, seed + 2) : "") +
    `<path d="${ring}" fill="url(#volume)"/><path d="${ring}" fill="url(#light)"/>` +
    `<path d="${outline}" fill="none" stroke="${palette.brass}" stroke-opacity=".5" stroke-width="1.4"/>` +
    `</svg>\n`;
}

function ringLettering(text, cx, cy, baseline, capHeight) {
  const { chars, capHeight: unitsCap } = glyphs.ring;
  const scale = capHeight / unitsCap;
  const mid = baseline + capHeight / 2;
  const circumference = 2 * Math.PI * mid;
  const natural = [...text].reduce((sum, char) => sum + chars[char].advance * scale, 0);
  const tracking = (circumference - natural) / text.length;
  const used = new Set();
  let position = 0;
  let uses = "";
  for (const char of text) {
    const advance = chars[char].advance * scale + tracking;
    if (chars[char].d) {
      const id = `g${char.charCodeAt(0)}`;
      used.add(char);
      const angle = ((position + advance / 2) / circumference) * 360;
      uses += `<use href="#${id}" transform="rotate(${n(angle)} ${n(cx)} ${n(cy)}) translate(${n(cx - (chars[char].advance * scale) / 2)} ${n(cy - baseline)}) scale(${scale.toFixed(5)})"/>`;
    }
    position += advance;
  }
  const defs = [...used].map(char => `<path id="g${char.charCodeAt(0)}" d="${chars[char].d}"/>`).join("");
  return { defs, uses };
}

function emblem() {
  const c = 80;
  const lettering = ringLettering("JAVA · LADRILLO A LADRILLO · HORNOS PARA PIZZA · ", c, c, 61.5, 8.6);
  const mark = logotype(-24);
  const markScale = 12.5 / -mark.top;
  const markWidth = (mark.right - mark.left) * markScale;
  const springing = 95;
  const radius = 31;
  const inner = 21.5;
  const opening = `M${n(c - inner)} ${springing}A${n(inner)} ${n(inner)} 0 0 1 ${n(c + inner)} ${springing}Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">` +
    `<defs>${lettering.defs}<radialGradient id="ember" gradientUnits="userSpaceOnUse" cx="${c}" cy="${springing}" r="${n(inner * 1.1)}"><stop offset="0" stop-color="#f6a55c"/><stop offset=".35" stop-color="#c85a2a"/><stop offset=".75" stop-color="#3a1a10"/><stop offset="1" stop-color="#170e0b"/></radialGradient></defs>` +
    `<circle cx="${c}" cy="${c}" r="79" fill="${palette.seal}"/>` +
    `<circle cx="${c}" cy="${c}" r="75.6" fill="none" stroke="${palette.brass}" stroke-width="1"/>` +
    `<circle cx="${c}" cy="${c}" r="57.4" fill="none" stroke="${palette.brass}" stroke-width=".8" stroke-opacity=".75"/>` +
    `<g fill="#e7cfae">${lettering.uses}</g>` +
    `<path d="${opening}" fill="url(#ember)"/>` +
    `<path d="M${n(c - radius - 1)} ${springing}A${radius + 1} ${radius + 1} 0 0 1 ${n(c + radius + 1)} ${springing}H${n(c + inner - 1)}A${n(inner - 1)} ${n(inner - 1)} 0 0 0 ${n(c - inner + 1)} ${springing}Z" fill="${palette.archMortar}"/>` +
    voussoirs({ cx: c, cy: springing, outer: radius, inner, count: 11, width: ((Math.PI * inner) / 11) * 0.8, keystoneLift: 2.5, seed: 9 }) +
    `<path d="M44 ${springing + 0.6}H116" stroke="${palette.brass}" stroke-width="1.1"/>` +
    `<g transform="translate(${n(c - markWidth / 2 - mark.left * markScale)} ${n(springing + 5 + 12.5)}) scale(${markScale.toFixed(5)})" fill="#d68c5f"><path d="${mark.d}"/></g>` +
    `</svg>\n`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">` +
    `<defs><radialGradient id="ember" gradientUnits="userSpaceOnUse" cx="32" cy="47" r="15"><stop offset="0" stop-color="#f6a55c"/><stop offset=".45" stop-color="#c85a2a"/><stop offset="1" stop-color="#1c100c"/></radialGradient></defs>` +
    `<rect width="64" height="64" rx="12" fill="${palette.green}"/>` +
    `<path d="M18 47A14 14 0 0 1 46 47Z" fill="url(#ember)"/>` +
    `<path d="M4.5 47A27.5 27.5 0 0 1 59.5 47H46.6A14.6 14.6 0 0 0 17.4 47Z" fill="${palette.archMortar}"/>` +
    voussoirs({ cx: 32, cy: 47, outer: 27, inner: 15, count: 7, width: 6, keystoneLift: 1.5, seed: 5 }) +
    `<path d="M3 49H61" stroke="${palette.brass}" stroke-width="3"/></svg>\n`;
}

function hilada() {
  const length = 56;
  const height = 22;
  const joint = 2.4;
  const count = 6;
  const nextTone = toneSequence(23, palette.wall.length);
  const groups = palette.wall.map(() => []);
  for (let index = 0; index < count; index += 1) groups[nextTone()].push(brickRect(index * length, 0, length, height, joint));
  const tile = length * count;
  const bevel = Array.from({ length: count }, (_, index) => `<rect x="${n(index * length + joint / 2)}" y="${n(joint / 2)}" width="${n(length - joint)}" height="1.6" fill="#fff" opacity=".22"/><rect x="${n(index * length + joint / 2)}" y="${n(height - joint / 2 - 2.6)}" width="${n(length - joint)}" height="2.6" opacity=".2"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${height}" viewBox="0 0 ${tile} ${height}"><rect width="${tile}" height="${height}" fill="${palette.archMortar}"/>${tonePaths(groups, palette.wall)}${bevel}</svg>\n`;
}

function brickBond() {
  const length = 60;
  const course = 24;
  const nextTone = toneSequence(31, palette.wall.length);
  const groups = palette.wall.map(() => []);
  for (const [x, y] of [[0, 0], [60, 0], [-30, 24], [30, 24], [90, 24]]) groups[nextTone()].push(brickRect(x, y, length, course, 2.4));
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 120 48"><defs>${bevelPattern("bevel", 0, 0, length, course, 2.4)}<clipPath id="tile"><rect width="120" height="48"/></clipPath></defs><g clip-path="url(#tile)"><rect width="120" height="48" fill="${palette.wallMortar}"/>${tonePaths(groups, palette.wall)}<rect width="120" height="48" fill="url(#bevel)"/></g></svg>\n`;
}

const outputs = {
  "public/brand/java-wordmark.svg": wordmark({ courses: 8, lengthRatio: 2.55, jointRatio: 0.085, tracking: -24, extrusion: 14, edge: 5, grain: true, seed: 11 }),
  "public/brand/java-wordmark-compact.svg": wordmark({ courses: 4, lengthRatio: 2.4, jointRatio: 0.1, tracking: -24, extrusion: 0, edge: 9, grain: false, seed: 13 }),
  "public/brand/java-arch.svg": arch({ jamb: 24 }),
  "public/brand/java-arch-tall.svg": arch({ jamb: 150, seed: 43 }),
  "public/brand/java-emblem.svg": emblem(),
  "public/brand/hilada.svg": hilada(),
  "public/brand/brick-bond.svg": brickBond(),
  "app/icon.svg": favicon(),
};

for (const [path, svg] of Object.entries(outputs)) {
  await writeFile(new URL(path, root), svg);
  console.log(`${path} ${Buffer.byteLength(svg)} bytes`);
}
