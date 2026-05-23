"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  centerAscuasModel,
  createAscuasEmbers,
  styleAscuasModel,
} from "@/lib/ascuas-three";

type SceneStatus = "loading" | "ready" | "error";

type Frame = {
  progress: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};

const frames: Frame[] = [
  { progress: 0, x: 1.28, y: -0.12, scale: 0.66, rotation: -0.28 },
  { progress: 0.22, x: 1.08, y: -0.04, scale: 0.96, rotation: 0.14 },
  { progress: 0.43, x: -1.18, y: 0, scale: 1.14, rotation: 0.52 },
  { progress: 0.68, x: 1.05, y: 0.1, scale: 1.82, rotation: 0.84 },
  { progress: 1, x: 0.12, y: 0.16, scale: 2.42, rotation: 1.24 },
];

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function interpolateFrames(progress: number) {
  const rightIndex = frames.findIndex((frame) => frame.progress >= progress);
  if (rightIndex <= 0) return frames[0];
  if (rightIndex === -1) return frames[frames.length - 1];

  const left = frames[rightIndex - 1];
  const right = frames[rightIndex];
  const amount = smoothstep(
    (progress - left.progress) / (right.progress - left.progress),
  );

  return {
    progress,
    x: THREE.MathUtils.lerp(left.x, right.x, amount),
    y: THREE.MathUtils.lerp(left.y, right.y, amount),
    scale: THREE.MathUtils.lerp(left.scale, right.scale, amount),
    rotation: THREE.MathUtils.lerp(left.rotation, right.rotation, amount),
  };
}

export function AscuasImmersiveExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<SceneStatus>("loading");
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationId = 0;
    let model: THREE.Group | null = null;
    let fitScale = 1;
    let disposed = false;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060606");
    scene.fog = new THREE.FogExp2("#060606", 0.075);
    const showcase = new THREE.Group();
    scene.add(showcase);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0.05, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.HemisphereLight("#ffd7a1", "#110a07", 1.05));

    const keyLight = new THREE.SpotLight("#ffd1a0", 30, 28, Math.PI / 5, 0.65, 1.2);
    keyLight.position.set(3.2, 4.2, 5.8);
    scene.add(keyLight);

    const emberLight = new THREE.PointLight("#f05d23", 45, 12, 1.7);
    emberLight.position.set(0.3, -0.3, 2.1);
    scene.add(emberLight);

    const rimLight = new THREE.DirectionalLight("#c85a3d", 2.2);
    rimLight.position.set(-3, 1.5, -1);
    scene.add(rimLight);

    const embers = createAscuasEmbers();
    scene.add(embers);

    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    const timer = new THREE.Timer();
    timer.connect(document);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      "/models/ascuas-web.glb",
      (gltf) => {
        if (disposed) return;

        model = gltf.scene;
        const size = centerAscuasModel(model);
        fitScale = 3.9 / Math.max(size.y, size.x * 1.25);
        styleAscuasModel(model);

        showcase.add(model);
        setStatus("ready");
      },
      (event) => {
        if (event.total > 0) {
          setLoadingPercent(Math.round((event.loaded / event.total) * 100));
        }
      },
      () => setStatus("error"),
    );

    const onPointerMove = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetPointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerLeave = () => targetPointer.set(0, 0);

    const render = () => {
      animationId = window.requestAnimationFrame(render);
      timer.update();
      const elapsed = timer.getElapsed();
      const travel = Math.max(container.offsetHeight - window.innerHeight, 1);
      const progress = THREE.MathUtils.clamp(-container.getBoundingClientRect().top / travel, 0, 1);
      const pose = interpolateFrames(progress);
      const mobile = window.innerWidth < 768;

      pointer.lerp(targetPointer, reducedMotion ? 0.25 : 0.06);

      if (model) {
        const x = mobile ? pointer.x * 0.1 : pose.x + pointer.x * 0.18;
        const pulse = reducedMotion ? 1 : 1 + Math.sin(elapsed * 1.45) * 0.008;
        showcase.position.x = THREE.MathUtils.lerp(showcase.position.x, x, 0.07);
        showcase.position.y = THREE.MathUtils.lerp(showcase.position.y, pose.y - pointer.y * 0.08, 0.07);
        showcase.scale.setScalar(fitScale * pose.scale * (mobile ? 0.92 : 1) * pulse);
        showcase.rotation.y = pose.rotation + pointer.x * 0.2 + (reducedMotion ? 0 : elapsed * 0.045);
        showcase.rotation.z = pointer.x * -0.035;
      }

      if (!reducedMotion) {
        embers.rotation.y = elapsed * 0.028;
        embers.position.y = Math.sin(elapsed * 0.38) * 0.08;
        emberLight.intensity = 42 + Math.sin(elapsed * 2.1) * 5 + progress * 14;
      }

      camera.position.z = THREE.MathUtils.lerp(8.15, 6.8, progress);
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
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
    <>
      <section
        ref={containerRef}
        className="relative min-h-[400svh] overflow-clip bg-forge-950"
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <canvas
            ref={canvasRef}
            className="ascuas-canvas absolute inset-0 h-full w-full"
            aria-label="Lámpara Ascuas en tres dimensiones"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_54%,transparent_0%,transparent_22%,rgba(6,6,6,0.38)_63%,rgba(6,6,6,0.9)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-forge-950 to-transparent" />

          {status !== "ready" ? (
            <div className="absolute inset-0 z-20 grid place-items-center bg-forge-950">
              <div className="text-center">
                <span className="mx-auto block size-2 rounded-full bg-ember-300 shadow-[0_0_24px_rgba(255,155,69,0.8)]" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-bone/62">
                  {status === "error"
                    ? "No se pudo encender Ascuas"
                    : `Encendiendo Ascuas ${loadingPercent ? `${loadingPercent}%` : ""}`}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <article className="flex min-h-svh items-center px-5 pb-20 pt-32 sm:px-8 lg:px-16">
            <div className="immersive-copy max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember-200">
                Experimento 01 · Ascuas
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.96] text-bone sm:text-7xl">
                La llama deja de ser imagen.
              </h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-bone/66">
                Una pieza física cruza la pantalla y ocupa su propio espacio.
                Diseño, fabricación y luz en una misma presencia.
              </p>
            </div>
          </article>

          <article className="flex min-h-svh items-center justify-end px-5 py-24 sm:px-8 lg:px-16">
            <div className="immersive-copy max-w-md text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-100">
                Materia
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
                PETG translúcido. Capas visibles.
              </h2>
              <p className="mt-6 text-base leading-8 text-bone/62">
                La fabricación no se esconde: captura la luz y convierte el
                proceso en parte de la piel del objeto.
              </p>
            </div>
          </article>

          <article className="flex min-h-svh items-center px-5 py-24 sm:px-8 lg:px-16">
            <div className="immersive-copy max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember-200">
                Aproximación
              </p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
                La brasa se acerca.
              </h2>
              <p className="mt-6 text-base leading-8 text-bone/62">
                El núcleo iluminado, la envoltura orgánica y la base se leen
                como un solo objeto nacido de la prueba.
              </p>
            </div>
          </article>

          <article className="flex min-h-svh items-end justify-center px-5 pb-16 pt-24 text-center sm:px-8 sm:pb-20">
            <div className="pointer-events-auto max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-100">
                Lámpara Ascuas
              </p>
              <h2 className="mt-5 text-4xl font-semibold text-bone sm:text-5xl">
                Construida capa a capa.
              </h2>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/ascuas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/18 bg-black/24 px-5 py-3 text-sm font-semibold text-bone transition hover:border-gold-200/50 hover:bg-gold-300/10"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  Volver a Ascuas
                </Link>
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-3 text-sm font-semibold text-forge-950 transition hover:bg-ember-300"
                >
                  Ver productos
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
