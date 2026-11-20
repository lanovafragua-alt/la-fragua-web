import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Box, Check, CheckCheck, CircleHelp, Lightbulb, Mail, Monitor, PencilRuler, Phone, Printer, Users } from "lucide-react";
import { CourseProgress } from "@/components/CourseProgress";
import { CourseLearningTimeline } from "@/components/CourseLearningTimeline";
import { CourseSoftwareLogo } from "@/components/CourseSoftwareLogo";
import { AdvertisingPreferencesButton } from "@/components/AdvertisingConsent";
import { courseEdition, courseFaqs } from "@/lib/course";
import { pageMetadata } from "@/lib/seo";
import styles from "./curso.module.css";

export const metadata = pageMetadata({
  title: `${courseEdition.name} para ayuntamientos`,
  description: `De una idea a algo real. Conoce la propuesta de formación de La Fragua para ${courseEdition.year}: diseño, impresión 3D y proyectos propios. Información para participantes y ayuntamientos.`,
  path: "/curso",
  image: "/images/curso/taller-pedro-adolescentes-ia.png",
});

const participantMail = `mailto:${courseEdition.contactEmail}?subject=${encodeURIComponent("Información sobre el curso de diseño e impresión 3D")}&body=${encodeURIComponent("Hola, La Fragua.\n\nMe gustaría recibir información sobre el curso.\nMunicipio de interés:\nGrupo de edad (8–12, 13–17 o adultos):\n\nGracias.")}`;
const councilMail = `mailto:${courseEdition.contactEmail}?subject=${encodeURIComponent("Propuesta de curso para un municipio")}&body=${encodeURIComponent("Hola, La Fragua.\n\nQuerríamos valorar el curso de diseño e impresión 3D.\nAyuntamiento o entidad:\nPersona de contacto:\nNecesidades o recursos disponibles:\n\nGracias.")}`;

function Eyebrow({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className={styles.eyebrow}><span>{number}</span>{children}</p>;
}

export default function CoursePage() {
  return (
    <div className={`course-page ${styles.page}`}>
      <a className={styles.skipLink} href="#idea">Saltar al contenido del curso</a>
      <CourseProgress />

      <section id="curso-inicio" className={`${styles.hero} ${styles.container}`} aria-labelledby="course-title">
        <div className={styles.heroCopy}>
          <p className={styles.status}><span />Propuesta {courseEdition.year} · inscripción aún no abierta</p>
          <h1 id="course-title">Curso municipal de diseño e impresión 3D</h1>
          <p className={styles.heroSubtitle}>De una idea<br />a algo real.</p>
          <p className={styles.intro}>Imaginar, diseñar, imprimir. Y descubrir todo lo que puedes crear con tus propias ideas.</p>
          <p className={styles.heroNote}>Un curso práctico de La Fragua para niños, jóvenes y adultos. {courseEdition.municipality ? `Propuesta para ${courseEdition.municipality}.` : "Adaptable a cada municipio."}</p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#idea">Conocer el curso <ArrowDown size={18} aria-hidden="true" /></a>
            <a className={styles.textLink} href="#ayuntamientos">Llevarlo a mi municipio <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <figure className={styles.heroVisual}>
          <Image src="/images/curso/taller-pedro-adolescentes-ia.png" alt="Escena recreada con IA: Pedro muestra una pieza impresa en 3D a un grupo de adolescentes en un aula" width={1122} height={1402} loading="eager" fetchPriority="high" className={styles.heroPhoto} />
          <figcaption>Escena ilustrativa creada con IA.</figcaption>
        </figure>
        <div className={styles.heroFacts} aria-label="Organización orientativa">
          <div><strong>{courseEdition.months} meses</strong><span>para recorrer el proceso</span></div>
          <div><strong>{courseEdition.hours} horas</strong><span>de aprendizaje por persona</span></div>
          <div><strong>{courseEdition.minGroupSize}–{courseEdition.maxGroupSize} personas</strong><span>por grupo, según demanda</span></div>
          <a href="#organizacion">Así se organiza <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="idea" className={`${styles.section} ${styles.ideaSection}`} aria-labelledby="idea-title">
        <div className={styles.container}>
          <Eyebrow number="02">La idea</Eyebrow>
          <div className={styles.splitHeading}><h2 id="idea-title">Tu idea no tiene<br />por qué quedarse<br /><em>en el papel.</em></h2><div><p className={styles.lead}>Aprenderás a pasar de «¿y si…?» a una pieza que puedes tener en las manos.</p><p>La Fragua es un taller creativo. Aquí el diseño y la impresión 3D sirven para explorar ideas, resolver pequeños problemas y fabricar objetos propios.</p><p>Empezamos desde lo sencillo. Probamos, vemos qué funciona y mejoramos. Los programas son las herramientas; lo que tú quieres crear es el punto de partida.</p></div></div>
          <ol className={styles.process}>
            {[{ Icon: Lightbulb, title: "Imagina", text: "Encuentra una idea o una necesidad." }, { Icon: PencilRuler, title: "Diseña", text: "Dale forma, medidas y sentido." }, { Icon: Printer, title: "Imprime", text: "Convierte el modelo en una pieza." }, { Icon: CheckCheck, title: "Mejora", text: "Prueba, ajusta y vuelve a intentarlo." }].map(({ Icon, title, text }, i) => <li key={title}><div><Icon size={24} aria-hidden="true" /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section id="recorrido" className={`${styles.section} ${styles.container}`} aria-labelledby="learning-title">
        <Eyebrow number="03">Tu recorrido de aprendizaje</Eyebrow>
        <div className={styles.sectionHeading}><h2 id="learning-title">Así aprenderás,<br /><em>paso a paso.</em></h2><p>Demostración breve, práctica individual y revisión. Las actividades se adaptan a la edad y al ritmo de cada grupo.</p></div>
        <CourseLearningTimeline />
        <p className={styles.endnote}>No necesitas saber modelar antes de empezar. El objetivo es ganar autonomía, paso a paso. Las piezas del taller ilustran las posibilidades; no son trabajos realizados en el curso.</p>
      </section>

      <section id="proyectos" className={`${styles.section} ${styles.projectsSection}`} aria-labelledby="projects-title">
        <div className={styles.container}><Eyebrow number="04">Lo que podrías crear</Eyebrow><div className={styles.sectionHeading}><h2 id="projects-title">Pequeños proyectos.<br /><em>Grandes descubrimientos.</em></h2><p>Ejemplos de actividades previstas. Cada reto se ajustará al nivel, al tiempo y a la viabilidad de impresión.</p></div>
          <div className={styles.projectGrid}>
            <article className={styles.projectCard}><figure className={styles.realProject}><Image src="/images/curso/llavero-nombre-canalino.webp" alt="Ejemplo de llavero impreso en 3D con el nombre Leonardo, en azul y blanco" width={1000} height={749} /><figcaption>Ejemplo de <a href="https://www.makeronline.com/en/model/Leonardo%203D%20Printed%20Name%20Keychain%20%E2%80%93%20Personalized/270321.html" target="_blank" rel="noreferrer">canalino</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a></figcaption></figure><div className={styles.projectCopy}><span>01 · TU PRIMER DISEÑO</span><h3>Un llavero con tu nombre.</h3><p>Combinar formas y letras, elegir medidas y preparar tu primer modelo para imprimir.</p></div></article>
            <article className={styles.projectCard}><figure className={`${styles.realProject} ${styles.bridgeProject}`}><Image src="/images/curso/puente-modelo-3d.png" alt="Modelo digital de un puente rojo con dos torres y refuerzos triangulares" width={1130} height={790} /><figcaption>Un puente a pequeña escala · modelo digital de referencia</figcaption></figure><div className={styles.projectCopy}><span>02 · DISEÑAR Y COMPROBAR</span><h3>¿Qué forma resiste mejor?</h3><p>Comparar diseños con pequeñas cargas controladas. Observar, aprender y reforzar la estructura.</p></div></article>
            <article className={styles.projectCard}><figure className={`${styles.realProject} ${styles.fullProject}`}><Image src="/images/catalog/soporte-cascos/soporte-cascos-1.jpg" alt="Soporte para auriculares fabricado por La Fragua, como referencia de un objeto útil" width={1129} height={2000} /><figcaption>Pieza del taller · referencia, no trabajo del curso</figcaption></figure><div className={styles.projectCopy}><span>03 · UNA SOLUCIÓN COTIDIANA</span><h3>Una idea que te sirve.</h3><p>Un soporte, un organizador u otro objeto útil para casa. Diseñar a partir de una necesidad real.</p></div></article>
          </div>
          <div className={styles.personalProject}><span className={styles.personalNumber}>04</span><div><p className={styles.kicker}>El proyecto personal</p><h3>Y después, tu propia idea.</h3><p>Elegir un reto, diseñarlo, probarlo y presentar lo aprendido. El alcance se acordará con cada participante.</p></div><ArrowUpRight size={38} aria-hidden="true" /></div>
          <p className={styles.smallNote}>Las imágenes son referencias de las actividades propuestas.</p>
        </div>
      </section>

      <section id="organizacion" className={`${styles.section} ${styles.container}`} aria-labelledby="organization-title">
        <Eyebrow number="05">Cómo se organiza</Eyebrow><div className={styles.sectionHeading}><h2 id="organization-title">Tiempo para aprender.<br /><em>Espacio para probar.</em></h2><p>Esta es la organización de referencia. El calendario, los turnos y la apertura de grupos se acordarán con cada Ayuntamiento.</p></div>
        <div className={styles.organizationGrid}><div className={styles.hoursCard}><span>POR PARTICIPANTE</span><strong>{courseEdition.hours}<small>horas</small></strong><p>{courseEdition.sessions} sesiones de {courseEdition.sessionMinutes} minutos</p><div>{courseEdition.weeks} semanas · aproximadamente {courseEdition.months} meses</div></div><div className={styles.organizationDetails}><div><h3>Tres encuentros cada semana</h3><p>Lunes, miércoles y viernes, como propuesta de referencia. Horarios y fechas pendientes de confirmar.</p></div><div><h3>Grupos pequeños, atención cercana</h3><p>Entre {courseEdition.minGroupSize} y {courseEdition.maxGroupSize} personas por grupo. Hasta {courseEdition.maxGroups} grupos, en función de la demanda; mínimo orientativo de {courseEdition.minGroupSize} para abrir cada uno.</p></div><div><h3>Actividades adaptadas a cada etapa</h3><div className={styles.ageGroups}><span>8–12 años</span><span>13–17 años</span><span>Adultos · 18+</span></div></div></div></div>
        <div className={styles.inlineCta}><p><strong>¿Te interesa participar?</strong> Podemos informarte de la propuesta y las próximas novedades.</p><a className={styles.textLink} href="#informacion">Quiero recibir información <ArrowRight size={18} aria-hidden="true" /></a></div>
      </section>

      <section id="materiales" className={`${styles.section} ${styles.materialsSection}`} aria-labelledby="materials-title">
        <div className={styles.container}>
          <Eyebrow number="06">Materiales para aprender</Eyebrow>
          <div className={styles.splitHeading}><h2 id="materials-title">Un lugar para tus ideas.<br /><em>Una guía para avanzar.</em></h2><p className={styles.lead}>Se prevén materiales de apoyo para dibujar, anotar pruebas y volver a consultar los pasos de cada herramienta.</p></div>
          <div className={styles.materialsGrid}>
            <article>
              <figure className={styles.materialImage}><Image src="/images/curso/cuaderno-ideas.png" alt="Portada kraft de Mi cuaderno de ideas, con el lema Paso a paso, capa a capa y la marca La Fragua" width={1055} height={1491} /></figure>
              <div className={styles.materialCopy}><PencilRuler size={28} aria-hidden="true" /><h3>Tu cuaderno de ideas</h3><p>Un cuaderno personal para bocetos, medidas, pruebas y descubrimientos. La propuesta contempla hasta 30 cuadernos de unas 50 páginas.</p></div>
            </article>
            <article>
              <figure className={styles.materialImage}><Image src="/images/curso/guia-practica.png" alt="Propuesta de portada de la guía práctica de La Fragua: Diseño e impresión 3D, de la idea al objeto" width={1199} height={1312} /></figure>
              <div className={styles.materialCopy}><BookOpen size={28} aria-hidden="true" /><h3>Una guía práctica</h3><p>Ejercicios y recursos de diseño e impresión con Tinkercad, Bambu Studio y Blender, adaptados a los grupos.</p></div>
            </article>
          </div>
          <p className={styles.smallNote}>Diseños de referencia de los materiales previstos. Los contenidos y las portadas se adaptarán a cada edición.</p>
        </div>
      </section>

      <section id="recursos" className={`${styles.section} ${styles.container}`} aria-labelledby="resources-title">
        <Eyebrow number="07">Las máquinas y el aula</Eyebrow>
        <div className={styles.sectionHeading}><h2 id="resources-title">Un pequeño taller.<br /><em>Muchas posibilidades.</em></h2><p>La propuesta contempla tres impresoras de La Fragua en alquiler durante cuatro meses, junto con materiales y mantenimiento.</p></div>
        <div className={styles.machines}>
          <figure><div className={styles.machineImage}><Image src="/images/curso/a1.png" alt="Modelo Bambu Lab A1 previsto" width={1280} height={1280} /></div><figcaption><strong>Bambu Lab A1</strong><span>Equipo previsto en alquiler</span></figcaption></figure>
          <figure><div className={`${styles.machineImage} ${styles.miniImage}`}><Image src="/images/curso/a1-mini.png" alt="Modelo Bambu Lab A1 Mini previsto" width={1280} height={1280} /></div><figcaption><strong>Bambu Lab A1 Mini</strong><span>Equipo previsto en alquiler</span></figcaption></figure>
          <figure><div className={`${styles.machineImage} ${styles.enderImage}`}><Image src="/images/curso/ender-3-v3-se.png" alt="Impresora Creality Ender-3 V3 SE con una pieza azul en la base" width={1000} height={1000} /></div><figcaption><strong>Creality Ender-3 V3 SE</strong><span>Equipo previsto en alquiler · <a href="https://www.creality.com/products/creality-ender-3-v3-se" target="_blank" rel="noreferrer">imagen de Creality</a></span></figcaption></figure>
        </div>
        <div className={styles.designTools}>
          <h3>Y el sitio donde <em>se diseña.</em></h3>
          <div className={styles.softwareGrid}>
            <article className={styles.blenderFeature}>
              <CourseSoftwareLogo name="Blender" />
              <div><span>Más espacio para tus ideas</span><h4>Blender</h4><p>Para explorar el modelado con más libertad, dar forma a proyectos propios y seguir creciendo. Avanzamos según el nivel y los intereses de cada grupo.</p></div>
            </article>
            <article className={styles.tinkercadFeature}>
              <CourseSoftwareLogo name="Tinkercad" />
              <div><span>Las primeras formas</span><h4>Tinkercad</h4><p>Un punto de partida para combinar figuras, entender el espacio y diseñar tu primer objeto.</p></div>
            </article>
          </div>
        </div>
        <div className={styles.resourceColumns}>
          <div><h3><Box size={22} aria-hidden="true" /> Lo que contempla La Fragua</h3><ul><li>Impresoras, mantenimiento y consumibles para las actividades.</li><li>Trabajo con PLA, PETG y TPU, según cada práctica.</li><li>Kit básico nuevo de herramientas y almacenamiento, como dotación municipal según inventario y condiciones finales.</li><li>Fabricación complementaria limitada en el taller, con alcance y condiciones por acordar.</li></ul><details className={styles.simpleDetails}><summary>Ver el kit de herramientas previsto</summary><p>3 soldadores para plástico, 3 lápices 3D, 1 herramienta rotativa, 3 juegos de alicates y cortadores, 3 rebabadores, 2 juegos de destornilladores y 3 cajas organizadoras. Selección sujeta a cotizaciones, seguridad y actividades.</p></details></div>
          <div><h3><Monitor size={22} aria-hidden="true" /> Lo que revisamos con el municipio</h3><ul><li>Aula, mesas y ordenadores suficientes para los programas.</li><li>Internet, pantalla y permisos de instalación o uso.</li><li>Espacio estable, ventilado y seguro para las impresoras.</li><li>Electricidad, accesibilidad, almacenamiento y organización.</li></ul><p className={styles.pendingNote}>Disponibilidad pendiente de comprobar con cada Ayuntamiento.</p></div>
        </div>
      </section>

      <section id="ayuntamientos" className={`${styles.section} ${styles.councilSection}`} aria-labelledby="council-title">
        <div className={styles.container}>
          <Eyebrow number="08">Para ayuntamientos</Eyebrow>
          <div className={styles.sectionHeading}><h2 id="council-title">Llevemos las ideas<br /><em>a vuestro municipio.</em></h2><p>Un programa práctico de creación digital para distintas edades. Partimos de esta referencia y adaptamos la propuesta al aula, los grupos y las necesidades locales.</p></div>
          <ol className={styles.councilSteps}>
            <li><span>01</span><div><h3>Conocemos vuestras necesidades</h3><p>Público, demanda, espacio y recursos disponibles.</p></div></li>
            <li><span>02</span><div><h3>Definimos una edición viable</h3><p>Grupos, calendario, equipamiento y condiciones.</p></div></li>
            <li><span>03</span><div><h3>Preparamos la propuesta adaptada</h3><p>Alcance, condiciones y organización para valorar.</p></div></li>
          </ol>
          <a className={styles.primaryButton} href={councilMail}>Solicitar una propuesta municipal <ArrowUpRight size={18} aria-hidden="true" /></a>
          <p className={styles.smallNote}>Se abrirá tu aplicación de correo.</p>
          <div className={styles.university}><BookOpen size={25} aria-hidden="true" /><div><h3>Una vía universitaria en estudio</h3><p>La Fragua mantiene conversaciones con el área de microcredenciales de la Universidad Pablo de Olavide. Hay un profesor dispuesto a asumir la gestión académica de la propuesta.</p><p>La colaboración está en estudio. No hay una microcredencial ni una acreditación universitaria confirmadas para este curso.</p></div></div>
        </div>
      </section>

      <section id="preguntas" className={`${styles.section} ${styles.container}`} aria-labelledby="faq-title"><Eyebrow number="09">Preguntas frecuentes</Eyebrow><div className={styles.faqLayout}><div><CircleHelp size={32} aria-hidden="true" /><h2 id="faq-title">Antes de<br /><em>dar el paso.</em></h2><p>La propuesta está planteada para {courseEdition.year}. Las inscripciones aún no están abiertas.</p><div className={styles.editionStatus}><span>ESTADO DE LA EDICIÓN</span><p><Check size={16} aria-hidden="true" /> Programa de referencia definido</p><p><span className={styles.pendingDot} /> Municipio, lugar y calendario por acordar</p><p><span className={styles.pendingDot} /> Plazas y precio por confirmar</p></div></div><div className={styles.faqs}>{courseFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

      <section id="informacion" className={`${styles.section} ${styles.contactSection}`} aria-labelledby="contact-title">
        <div className={styles.container}>
          <Eyebrow number="10">El siguiente paso</Eyebrow>
          <div className={styles.contactIntro}>
            <div>
              <h2 id="contact-title">Las buenas ideas<br /><em>empiezan hablando.</em></h2>
              <div className={styles.contactPerson}>
                <p className={styles.kicker}>Pedro · La Fragua</p>
                <h3>Contacta conmigo.</h3>
                <p>Estoy aquí para resolver tus dudas sobre el curso y ayudarte a llevarlo a tu municipio.</p>
              </div>
              <div className={styles.directContact}>
                <a href={`mailto:${courseEdition.contactEmail}`}><Mail size={19} aria-hidden="true" />{courseEdition.contactEmail}</a>
                <a href={courseEdition.contactPhoneHref}><Phone size={19} aria-hidden="true" />{courseEdition.contactPhone}</a>
              </div>
            </div>
            <figure className={styles.contactPortrait}>
              <Image src="/images/curso/pedro-contacto.png" alt="Pedro, de La Fragua, en un retrato con un taller de impresión 3D al fondo" width={1122} height={1402} />
            </figure>
          </div>
          <div className={styles.contactGrid}>
            <article><Users size={28} aria-hidden="true" /><h3>Quiero aprender a crear</h3><p>Para participantes y familias. Cuéntanos tu municipio y el grupo de edad que te interesa. Si la consulta es para un menor, debe hacerla su persona adulta responsable.</p><a className={styles.primaryButton} href={participantMail}>Quiero recibir información <ArrowUpRight size={18} aria-hidden="true" /></a><small>Consulta informativa. No reserva plaza ni formaliza una inscripción.</small></article>
            <article><Monitor size={28} aria-hidden="true" /><h3>Quiero llevarlo a mi municipio</h3><p>Para ayuntamientos y entidades. Hablemos de vuestro espacio, las personas a las que queréis llegar y una propuesta ajustada a vuestras necesidades.</p><a className={styles.secondaryButton} href={councilMail}>Solicitar una propuesta municipal <ArrowUpRight size={18} aria-hidden="true" /></a><small>Prepararemos la propuesta a partir de los datos que nos facilites.</small></article>
          </div>
          <p className={styles.smallNote}>Los botones de información abren tu aplicación de correo.</p>
        </div>
      </section>

      <footer className={styles.courseFooter}><div className={styles.container}><Link href="/" className={styles.footerBrand}><Image src="/brand/la-fragua-logo-red.png" alt="" width={45} height={45} /><span><strong>LA FRAGUA</strong><small>Donde las ideas toman forma</small></span></Link><div><Link href="/">Volver a La Fragua <ArrowUpRight size={15} aria-hidden="true" /></Link><AdvertisingPreferencesButton /></div></div></footer>
    </div>
  );
}
