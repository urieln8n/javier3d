import * as THREE from "three";

// An original, illustrative approximation for the concept viewer. Not verified JAVA engineering.
export function createOpenDome() {
  const columns = 128;
  const rows = 40;
  const positions: number[] = [];
  const uv: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i <= columns; i++) {
    const phi = (i / columns) * Math.PI * 2;
    const lateral = Math.sin(phi) ** 2 / .42 ** 2;
    const front = Math.cos(phi) > 0 && lateral < 1;
    const cosSquared = front ? (1 - lateral) / (1 / .55 ** 2 - lateral) : 0;
    const thetaMax = front ? Math.acos(Math.sqrt(cosSquared)) : Math.PI / 2;
    for (let j = 0; j <= rows; j++) {
      const theta = (j / rows) * thetaMax;
      positions.push(Math.sin(phi) * Math.sin(theta), Math.cos(theta), Math.cos(phi) * Math.sin(theta));
      uv.push(i / columns, theta / (Math.PI / 2));
      if (i < columns && j < rows) {
        const a = i * (rows + 1) + j;
        const b = (i + 1) * (rows + 1) + j;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createMosaicTextures() {
  const size = 512;
  const color = new Uint8Array(size * size * 4);
  const height = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const col = Math.floor(x / 16);
    const row = Math.floor(y / 32);
    const shade = (Math.sin(col * 73.17 + row * 19.81) * 43758.5453) % 1;
    const value = Math.abs(shade);
    const edgeX = Math.min(x % 16, 15 - x % 16);
    const edgeY = Math.min(y % 32, 31 - y % 32);
    const mortar = edgeX < 1 || edgeY < 1;
    const bevel = Math.min(edgeX, edgeY, 3) / 3;
    const offset = (y * size + x) * 4;
    const base = mortar ? [63, 51, 28] : [157 + value * 45, 119 + value * 36, 53 + value * 20];
    for (let c = 0; c < 3; c++) {
      color[offset + c] = base[c];
      height[offset + c] = mortar ? 35 : 170 + bevel * 65;
    }
    color[offset + 3] = 255;
    height[offset + 3] = 255;
  }
  const map = new THREE.DataTexture(color, size, size);
  map.colorSpace = THREE.SRGBColorSpace;
  const bumpMap = new THREE.DataTexture(height, size, size);
  for (const texture of [map, bumpMap]) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
  }
  return { map, bumpMap };
}

export function createArchBrick(index: number, count = 13) {
  const gap = .018;
  const start = (index / count) * Math.PI + gap;
  const end = ((index + 1) / count) * Math.PI - gap;
  const shape = new THREE.Shape();
  const point = (angle: number, outer: boolean) => new THREE.Vector2(Math.cos(angle) * (outer ? .84 : .64), Math.sin(angle) * (outer ? .69 : .51));
  const a = point(start, false), b = point(start, true), c = point(end, true), d = point(end, false);
  shape.moveTo(a.x, a.y); shape.lineTo(b.x, b.y); shape.lineTo(c.x, c.y); shape.lineTo(d.x, d.y); shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: .16, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: .008, bevelThickness: .008, curveSegments: 2 });
}

export function createBrandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512; canvas.height = 128;
  const context = canvas.getContext("2d")!;
  context.fillStyle = "#111917"; context.fillRect(0, 0, 512, 128);
  context.font = "900 92px Arial"; context.textAlign = "center"; context.textBaseline = "middle";
  context.fillStyle = "#c9ab72"; context.fillText("JAVA", 256, 68);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
