"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { centerAscuasModel, styleAscuasModel } from "@/lib/ascuas-three";

type LoadState = "idle" | "loading" | "ready" | "error";

export function AscuasProductModel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LoadState>("idle");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let disposed = false;
    let animationId = 0;
    let model: THREE.Object3D | null = null;
    let activePointer: number | null = null;
    let loadStarted = false;
    let targetRotation = -0.25;
    let currentRotation = targetRotation;
    const dragStart = new THREE.Vector2();
    const dragRotation = new THREE.Vector2();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fffaf1");

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.35, 7.65);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    scene.add(new THREE.HemisphereLight("#fff0d2", "#6b2a18", 2.1));

    const keyLight = new THREE.SpotLight("#ffd0a0", 38, 26, Math.PI / 4, 0.62, 1.2);
    keyLight.position.set(4, 5, 5.5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight("#f05d23", 32, 14, 1.6);
    fillLight.position.set(-2.6, 1.2, 3);
    scene.add(fillLight);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.15, 96),
      new THREE.MeshBasicMaterial({
        color: "#f1dfc4",
        transparent: true,
        opacity: 0.72,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.48;
    scene.add(floor);

    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    resize();

    const animate = () => {
      if (disposed) return;
      animationId = window.requestAnimationFrame(animate);

      if (model) {
        currentRotation += (targetRotation - currentRotation) * 0.075;
        model.rotation.y = currentRotation;
        if (activePointer === null) {
          targetRotation += 0.0035;
        }
      }

      renderer.render(scene, camera);
    };

    const loadModel = () => {
      if (loadStarted) return;
      loadStarted = true;
      setState("loading");

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        "/models/ascuas-product.glb",
        (gltf) => {
          if (disposed) return;

          model = gltf.scene;
          styleAscuasModel(model);

          const size = centerAscuasModel(model);
          const maxDimension = Math.max(size.x, size.y, size.z);
          const scale = 4.05 / maxDimension;
          model.scale.setScalar(scale);
          model.position.y = -0.08;
          model.rotation.set(0.05, targetRotation, 0);
          scene.add(model);

          setState("ready");
          dracoLoader.dispose();
        },
        undefined,
        () => {
          if (!disposed) setState("error");
          dracoLoader.dispose();
        },
      );
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadModel();
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: "220px" },
    );
    intersectionObserver.observe(wrapper);
    animate();

    const handlePointerDown = (event: PointerEvent) => {
      activePointer = event.pointerId;
      dragStart.set(event.clientX, event.clientY);
      dragRotation.set(targetRotation, 0);
      wrapper.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      targetRotation = dragRotation.x + (event.clientX - dragStart.x) * 0.008;
    };

    const endPointer = (event: PointerEvent) => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      wrapper.releasePointerCapture(event.pointerId);
    };

    wrapper.addEventListener("pointerdown", handlePointerDown);
    wrapper.addEventListener("pointermove", handlePointerMove);
    wrapper.addEventListener("pointerup", endPointer);
    wrapper.addEventListener("pointercancel", endPointer);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      wrapper.removeEventListener("pointerdown", handlePointerDown);
      wrapper.removeEventListener("pointermove", handlePointerMove);
      wrapper.removeEventListener("pointerup", endPointer);
      wrapper.removeEventListener("pointercancel", endPointer);

      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        for (const material of materials) {
          material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[540px] overflow-hidden rounded-lg border border-zinc-950/10 bg-[#fffaf1] shadow-[0_22px_80px_rgba(24,20,12,0.08)] sm:h-[680px]"
    >
      <canvas ref={canvasRef} className="h-full w-full touch-pan-y" />
      {state !== "ready" ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#fffaf1]/72 text-center backdrop-blur-sm">
          <div>
            <span className="mx-auto block size-2 rounded-full bg-ember-500 shadow-[0_0_22px_rgba(240,93,35,0.65)]" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {state === "error" ? "No se pudo cargar el 3D" : "Cargando Ascuas 3D"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
