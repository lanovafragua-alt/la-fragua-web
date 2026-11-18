import Image from "next/image";
import { courseLearningSteps } from "@/lib/course";
import { CourseSoftwareLogo, type CourseSoftware } from "@/components/CourseSoftwareLogo";
import styles from "@/app/curso/curso.module.css";

const workshopImages = [
  { src: "/images/catalog/soporte-cascos/soporte-cascos-1.jpg", alt: "Soporte para auriculares terminado en el taller de La Fragua", width: 1000, height: 1000 },
  { src: "/images/ascuas-final/ascuas-detalle-exterior.jpg", alt: "Detalle de la superficie de una pieza Ascuas de La Fragua", width: 1440, height: 2550 },
  { src: "/images/ascuas-final/ascuas-producto-mesa.jpg", alt: "Lámpara Ascuas terminada y encendida sobre una mesa", width: 1440, height: 2550 },
];

export function CourseLearningTimeline() {
  return (
    <ol className={styles.learningTimeline}>
      {courseLearningSteps.map((step, index) => {
        const piece = workshopImages[index - 4];
        return (
          <li className={styles.timelineStep} key={step.title}>
            <span className={styles.timelineMarker} aria-hidden="true">{index + 1}</span>
            <article className={styles.timelineCard}>
              <div className={`${styles.timelineVisual} ${index === 0 ? styles.timelinePrinter : ""} ${piece ? styles.timelinePhoto : ""}`}>
                {index === 0 && <Image src="/images/curso/a1.png" alt="Impresora Bambu Lab A1" width={1254} height={1254} />}
                {step.tool && <CourseSoftwareLogo name={step.tool as CourseSoftware} />}
                {piece && <Image src={piece.src} alt={piece.alt} width={piece.width} height={piece.height} />}
              </div>
              <div className={styles.timelineCopy}>
                <span className={styles.timelineLabel}>{step.tool ?? (index === 0 ? "El punto de partida" : "De la prueba a la pieza")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {piece && <small>Pieza del taller de La Fragua</small>}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
