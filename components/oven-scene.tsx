"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { storyPose } from "@/lib/oven-story";
import { OvenModel } from "@/components/oven-model";

type ViewerActions = { turn: (radians: number) => void; reset: () => void };

function DirectedOven({ progress, reduced, actionsRef }: { progress?: MotionValue<number>; reduced: boolean; actionsRef: React.RefObject<ViewerActions | null> }) {
  const { camera, invalidate, size } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const dome = useRef<THREE.Group>(null);
  const chimney = useRef<THREE.Group>(null);
  const front = useRef<THREE.Group>(null);
  const previous = useRef(storyPose(0, false, false));
  useEffect(() => {
    const apply = (value: number) => {
      const pose = storyPose(value, size.width < 400, reduced);
      // Apply only the change in directed pose: preserve the visitor's orbit offset.
      camera.position.add(new THREE.Vector3(...pose.camera as [number, number, number]).sub(new THREE.Vector3(...previous.current.camera as [number, number, number])));
      if (controls.current) {
        controls.current.target.add(new THREE.Vector3(...pose.target as [number, number, number]).sub(new THREE.Vector3(...previous.current.target as [number, number, number])));
        controls.current.update();
      }
      if (dome.current) dome.current.position.y = .02 + pose.exploded * .65;
      if (chimney.current) chimney.current.position.y = .9 + pose.exploded * 1.5;
      if (front.current) front.current.position.z = pose.exploded * .38;
      previous.current = pose;
      invalidate();
    };
    apply(progress?.get() ?? 0);
    actionsRef.current = {
      turn: radians => {
        if (!controls.current) return;
        const offset = camera.position.clone().sub(controls.current.target);
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), radians);
        camera.position.copy(controls.current.target).add(offset);
        controls.current.update(); invalidate();
      },
      reset: () => {
        const pose = storyPose(progress?.get() ?? 0, size.width < 400, reduced);
        camera.position.set(...pose.camera as [number, number, number]);
        controls.current?.target.set(...pose.target as [number, number, number]);
        controls.current?.update(); invalidate();
      },
    };
    const unsubscribe = progress?.on("change", apply);
    return () => { unsubscribe?.(); actionsRef.current = null; };
  }, [actionsRef, camera, invalidate, progress, reduced, size.width]);
  return <><OvenModel dome={dome} chimney={chimney} front={front} /><OrbitControls ref={controls} enablePan={false} enableDamping={false} enableZoom={false} minPolarAngle={0.7} maxPolarAngle={1.55} /></>;
}

export function OvenScene({ progress, reduced = false }: { progress?: MotionValue<number>; reduced?: boolean }) {
  const actionsRef = useRef<ViewerActions | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => document.getElementById("visor")?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div id="visor" className="scene-shell" role="region" aria-label="Vista conceptual de horno JAVA" aria-describedby="viewer-help" tabIndex={0}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); actionsRef.current?.turn(event.key === "ArrowLeft" ? -.2 : .2); }
        if (event.key === "Home") { event.preventDefault(); actionsRef.current?.reset(); }
      }}>
      <Canvas frameloop="demand" camera={{ position: [2.2, 1.6, 7.4], fov: 30 }} dpr={[1, 1.5]} fallback={<p className="scene-fallback">Vista interactiva no disponible. Puedes ver las referencias de hornos más abajo.</p>}>
        <color attach="background" args={["#102923"]} />
        <ambientLight intensity={0.28} />
        <directionalLight position={[4, 6, 5]} intensity={2.8} color="#ffe5b9" />
        <directionalLight position={[-4, 2, 2]} intensity={1} color="#d9e7d2" />
        <spotLight position={[0, 5, -2]} intensity={2} angle={0.45} penumbra={0.9} color="#ff9d5c" />
        <Environment frames={1} resolution={128} environmentIntensity={.7}>
          <Lightformer form="rect" intensity={3} color="#fff1d4" position={[4, 4, 4]} target={[0, 0, 0]} scale={[5, 3]} />
          <Lightformer form="rect" intensity={2} color="#d8e1d2" position={[-4, 2, 1]} target={[0, 0, 0]} scale={[2, 5]} />
          <Lightformer form="rect" intensity={4} color="#ffddb0" position={[0, 5, -4]} target={[0, 0, 0]} scale={[5, 1]} />
        </Environment>
        <DirectedOven progress={progress} reduced={reduced} actionsRef={actionsRef} />
      </Canvas>
      <div id="viewer-help" className="scene-badge">Arrastra o usa las flechas para girar</div>
      <div className="viewer-controls" aria-label="Controles del horno">
        <button type="button" aria-label="Girar horno a la izquierda" onClick={() => actionsRef.current?.turn(-.2)}>←</button>
        <button type="button" aria-label="Girar horno a la derecha" onClick={() => actionsRef.current?.turn(.2)}>→</button>
        <button type="button" onClick={() => actionsRef.current?.reset()}>Restablecer vista</button>
      </div>
      <div className="scene-note">Maqueta conceptual · despiece ilustrativo, no técnico</div>
    </div>
  );
}
