"use client";

import { useEffect, useMemo, type RefObject } from "react";
import * as THREE from "three";
import { createArchBrick, createBrandTexture, createMosaicTextures, createOpenDome } from "@/lib/oven-geometry";

type Parts = {
  dome: RefObject<THREE.Group | null>;
  chimney: RefObject<THREE.Group | null>;
  front: RefObject<THREE.Group | null>;
};

export function OvenModel({ dome, chimney, front }: Parts) {
  const resources = useMemo(() => ({
    domeGeometry: createOpenDome(),
    textures: createMosaicTextures(),
    bricks: Array.from({ length: 13 }, (_, index) => createArchBrick(index)),
    brand: createBrandTexture(),
  }), []);
  useEffect(() => () => {
    resources.domeGeometry.dispose();
    resources.textures.map.dispose(); resources.textures.bumpMap.dispose();
    resources.bricks.forEach(geometry => geometry.dispose()); resources.brand.dispose();
  }, [resources]);

  return (
    <group rotation={[0, -.16, 0]}>
      <mesh position={[0, -.36, 0]}>
        <cylinderGeometry args={[1.57, 1.52, .68, 80]} />
        <meshStandardMaterial color="#111917" metalness={.5} roughness={.36} />
      </mesh>
      <mesh position={[0, -.035, 0]}>
        <cylinderGeometry args={[1.6, 1.6, .065, 80]} />
        <meshStandardMaterial color="#6f613f" metalness={.7} roughness={.36} />
      </mesh>
      <mesh position={[0, -.685, 0]}>
        <cylinderGeometry args={[1.54, 1.54, .06, 80]} />
        <meshStandardMaterial color="#070d0b" metalness={.45} roughness={.4} />
      </mesh>
      <group ref={dome} position={[0, .02, 0]}>
        <mesh geometry={resources.domeGeometry} scale={[1.55, 1.05, 1.55]}>
          <meshStandardMaterial map={resources.textures.map} bumpMap={resources.textures.bumpMap} bumpScale={.012} metalness={.58} roughness={.38} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={chimney} position={[0, .9, .86]}>
        <mesh position={[0, -.06, 0]}>
          <boxGeometry args={[.49, .3, .42]} />
          <meshStandardMaterial color="#101613" metalness={.7} roughness={.26} />
        </mesh>
        <mesh position={[0, .36, 0]}>
          <cylinderGeometry args={[.185, .185, 1.05, 40, 1, true]} />
          <meshStandardMaterial color="#101613" metalness={.72} roughness={.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, .89, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[.185, .017, 8, 40]} />
          <meshStandardMaterial color="#2b322b" metalness={.65} roughness={.35} />
        </mesh>
      </group>
      <group ref={front}>
        <mesh position={[0, .025, 1.28]} scale={[1, .8, 1]}>
          <circleGeometry args={[.65, 48, 0, Math.PI]} />
          <meshStandardMaterial color="#050806" roughness={1} side={THREE.DoubleSide} />
        </mesh>
        {resources.bricks.map((geometry, index) => (
          <mesh key={index} geometry={geometry} position={[0, .015, 1.4]}>
            <meshStandardMaterial color={index % 3 === 0 ? "#bd916e" : index % 3 === 1 ? "#977456" : "#c7a283"} roughness={.86} metalness={0} />
          </mesh>
        ))}
        <mesh position={[0, -.015, 1.39]}>
          <boxGeometry args={[1.75, .09, .58]} />
          <meshStandardMaterial color="#4b4a3a" roughness={.85} />
        </mesh>
        <mesh position={[0, -.35, 0]}>
          <cylinderGeometry args={[1.568, 1.548, .29, 32, 1, true, -.4, .8]} />
          <meshStandardMaterial map={resources.brand} metalness={.25} roughness={.5} />
        </mesh>
        <mesh position={[0, .02, 1.26]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, .45]} />
          <meshStandardMaterial color="#6c4c29" roughness={1} emissive="#9e4014" emissiveIntensity={.13} />
        </mesh>
      </group>
      <pointLight position={[0, .2, 1.1]} intensity={1.3} distance={2} color="#ff9f50" />
    </group>
  );
}
