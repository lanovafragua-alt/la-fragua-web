"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import styles from "@/app/curso/curso.module.css";

const sections = [
  ["curso-inicio", "El curso"], ["idea", "La idea"],
  ["recorrido", "Qué aprenderás"], ["proyectos", "Qué crearás"],
  ["organizacion", "Cómo se organiza"], ["materiales", "Para aprender"],
  ["recursos", "El aula y las máquinas"], ["ayuntamientos", "Para ayuntamientos"],
  ["preguntas", "Tus dudas"], ["informacion", "Hablamos"],
] as const;

export function CourseProgress() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const top = window.scrollY;
      const last = document.getElementById("informacion");
      const end = last ? last.offsetTop + last.offsetHeight - window.innerHeight : 1;
      setProgress(Math.min(100, Math.max(0, (top / Math.max(1, end)) * 100)));
      let next = 0;
      sections.forEach(([id], index) => {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 185) next = index;
      });
      setCurrent(next);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    const resizeObserver = new ResizeObserver(onScroll);
    const page = document.querySelector(".course-page");
    if (page) resizeObserver.observe(page);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressInner}>
        <span className={styles.currentStep}><b>{String(current + 1).padStart(2, "0")}</b><span>/ 10</span><strong>{sections[current][1]}</strong></span>
        <details ref={menu} className={styles.indexMenu} onKeyDown={(event) => { if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } }}>
          <summary>Tu recorrido <ChevronDown size={16} aria-hidden="true" /></summary>
          <nav aria-label="Secciones del curso">
            {sections.map(([id, label], index) => (
              <a key={id} href={`#${id}`} aria-current={current === index ? "location" : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>
                <span>{String(index + 1).padStart(2, "0")}</span>{label}<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </details>
      </div>
      <progress className={styles.progressBar} value={progress} max={100} aria-label="Progreso de lectura de la página" />
    </div>
  );
}
