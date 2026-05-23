"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  centerAscuasModel,
  createAscuasEmbers,
  styleAscuasModel,
} from "@/lib/ascuas-three";

export function AscuasHeroBackdrop() {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const canvas = canvasRef.current;
    const surface = layer?.closest<HTMLElement>("[data-ascuas-interactive-hero]");
    if (!layer || !canvas || !surface) return;

    let animationId = 0;
    let model: THREE.Group | null = null;
    let fitScale = 1;
    let disposed = false;
    let activePointer: number | null = null;
    let targetYaw = -0.35;
    let targetPitch = 0;
    let yaw = targetYaw;
    let pitch = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const dragStart = new THREE.Vector2();
    const dragRotation = new THREE.Vector2();
    const dragPosition = new THREE.Vector2();
    const hover = new THREE.Vector2();
    const targetHover = new THREE.Vector2();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060606");
    scene.fog = new THREE.FogExp2("#060606", 0.078);

    const showcase = new THREE.Group();
    scene.add(showcase);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0, 7.7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;

    scene.add(new THREE.HemisphereLight("#ffd7a1", "#100807", 1.08));

    const keyLight = new THREE.SpotLight("#ffd1a0", 30, 28, Math.PI / 5, 0.64, 1.2);
    keyLight.position.set(3.4, 4, 5.4);
    scene.add(keyLight);

    const emberLight = new THREE.PointLight("#f05d23", 48, 12, 1.7);
    emberLight.position.set(0.45, -0.3, 2);
    scene.add(emberLight);

    const rimLight = new THREE.DirectionalLight("#c85a3d", 2.3);
    rimLight.position.set(-3, 1.4, -1);
    scene.add(rimLight);

    const embers = createAscuasEmbers(76);
    scene.add(embers);

    const timer = new THREE.Timer();
    timer.connect(document);

    const resize = () => {
      const width = layer.clientWidth;
      const height = layer.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.load("/models/ascuas-web.glb", (gltf) => {
      if (disposed) return;

      model = gltf.scene;
      const size = centerAscuasModel(model);
      fitScale = 4.1 / Math.max(size.y, size.x * 1.25);
      styleAscuasModel(model);
      showcase.add(model);
      setReady(true);
    });

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if ((event.target as Element).closest("a, button")) return;

      activePointer = event.pointerId;
      dragStart.set(event.clientX, event.clientY);
      dragRotation.set(targetYaw, targetPitch);
      dragPosition.set(targetOffsetX, targetOffsetY);
      surface.dataset.dragging = "true";
      surface.setPointerCapture(event.pointerId);

      if (event.pointerType === "mouse") event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = surface.getBoundingClientRect();

      if (activePointer === event.pointerId) {
        const travelX = (event.clientX - dragStart.x) / Math.max(bounds.width, 1);
        const travelY = (event.clientY - dragStart.y) / Math.max(bounds.height, 1);
        targetYaw = THREE.MathUtils.clamp(dragRotation.x + travelX * 5.2, -2.15, 2.15);
        targetPitch = THREE.MathUtils.clamp(dragRotation.y + travelY * 1.3, -0.27, 0.27);
        targetOffsetX = THREE.MathUtils.clamp(
          dragPosition.x + travelX * (bounds.width < 768 ? 0.8 : 1.15),
          bounds.width < 768 ? -0.48 : -0.72,
          bounds.width < 768 ? 0.48 : 0.72,
        );
        targetOffsetY = THREE.MathUtils.clamp(dragPosition.y - travelY * 0.54, -0.28, 0.28);
        return;
      }

      if (event.pointerType === "mouse") {
        targetHover.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        targetHover.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      }
    };

    const endDrag = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;

      activePointer = null;
      delete surface.dataset.dragging;
      if (surface.hasPointerCapture(event.pointerId)) {
        surface.releasePointerCapture(event.pointerId);
      }
    };

    const onPointerLeave = () => {
      if (activePointer === null) targetHover.set(0, 0);
    };

    const render = () => {
      animationId = window.requestAnimationFrame(render);
      timer.update();
      const elapsed = timer.getElapsed();
      const mobile = layer.clientWidth < 768;

      hover.lerp(targetHover, reducedMotion ? 0.22 : 0.07);
      yaw = THREE.MathUtils.lerp(yaw, targetYaw, 0.09);
      pitch = THREE.MathUtils.lerp(pitch, targetPitch, 0.09);
      offsetX = THREE.MathUtils.lerp(offsetX, targetOffsetX, 0.09);
      offsetY = THREE.MathUtils.lerp(offsetY, targetOffsetY, 0.09);

      if (model) {
        const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 1.35) * 0.008;
        const idleTurn = reducedMotion ? 0 : Math.sin(elapsed * 0.34) * 0.06;
        const anchorX = mobile ? 0.34 : 1.55;
        const anchorY = mobile ? 0.08 : -0.02;
        const displayScale = mobile ? 0.7 : 0.91;

        showcase.position.x = THREE.MathUtils.lerp(
          showcase.position.x,
          anchorX + offsetX + hover.x * (mobile ? 0.04 : 0.12),
          0.08,
        );
        showcase.position.y = THREE.MathUtils.lerp(
          showcase.position.y,
          anchorY + offsetY - hover.y * 0.05,
          0.08,
        );
        showcase.scale.setScalar(fitScale * displayScale * pulse);
        showcase.rotation.y = yaw + idleTurn + hover.x * 0.09;
        showcase.rotation.x = pitch - hover.y * 0.035;
        showcase.rotation.z = -hover.x * 0.018;
      }

      if (!reducedMotion) {
        embers.rotation.y = elapsed * 0.024;
        embers.position.y = Math.sin(elapsed * 0.34) * 0.06;
        emberLight.intensity = 43 + Math.sin(elapsed * 2.05) * 4.5;
      }

      renderer.render(scene, camera);
    };

    resize();
    surface.addEventListener("pointerdown", onPointerDown);
    surface.addEventListener("pointermove", onPointerMove);
    surface.addEventListener("pointerup", endDrag);
    surface.addEventListener("pointercancel", endDrag);
    surface.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      surface.removeEventListener("pointerdown", onPointerDown);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerup", endDrag);
      surface.removeEventListener("pointercancel", endDrag);
      surface.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      delete surface.dataset.dragging;
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) material.dispose();
      });
      embers.geometry.dispose();
      (embers.material as THREE.Material).dispose();
      timer.dispose();
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 bg-forge-950">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`ascuas-canvas absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_55%,rgba(240,93,35,0.14),transparent_28%,transparent_100%)]" />
    </div>
  );
}
