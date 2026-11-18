import Image from "next/image";
import styles from "@/app/curso/curso.module.css";

export type CourseSoftware = "Blender" | "Tinkercad" | "Bambu Studio";

const logos = {
  Blender: { src: "/images/curso/blender.png", size: 1254, className: styles.blenderLogo },
  Tinkercad: { src: "/images/curso/tinkercad.png", size: 1254, className: styles.tinkercadLogo },
  "Bambu Studio": { src: "/images/curso/bambu-studio.png", size: 192, className: styles.bambuStudioLogo },
};

/** CSS frames the supplied logos without changing their original files. */
export function CourseSoftwareLogo({ name }: { name: CourseSoftware }) {
  const logo = logos[name];
  return (
    <span className={`${styles.softwareLogo} ${logo.className}`}>
      <Image src={logo.src} alt={`Logo de ${name}`} width={logo.size} height={logo.size} />
    </span>
  );
}
