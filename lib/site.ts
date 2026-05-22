export const routes = [
  { href: "/", label: "Inicio" },
  { href: "/laboratorio", label: "Laboratorio" },
  { href: "/ascuas", label: "Ascuas" },
  { href: "/focus-mode", label: "Focus Mode" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const processSteps = [
  "idea",
  "boceto",
  "diseño",
  "fallo",
  "rediseño",
  "prototipo",
  "prueba",
  "mejora",
  "producto",
] as const;

export const featureCards = [
  {
    title: "Ascuas",
    eyebrow: "IA con oficio",
    description:
      "Un espacio para convertir intuiciones, preguntas y chispas sueltas en conceptos claros, prototipos y sistemas accionables.",
    href: "/ascuas",
    accent: "ember",
  },
  {
    title: "Laboratorio",
    eyebrow: "Diseño + fabricación",
    description:
      "El taller donde se cruzan 3D, electrónica, luz, NFC, web apps y objetos físicos-digitales hasta encontrar forma real.",
    href: "/laboratorio",
    accent: "gold",
  },
  {
    title: "Focus Mode",
    eyebrow: "Rituales interactivos",
    description:
      "Una línea de experiencias para recuperar atención, energía y presencia mediante objetos, interfaces y pequeñas ceremonias.",
    href: "/focus-mode",
    accent: "oxide",
  },
] as const;

export const productLines = [
  "Objetos impresos y acabados a medida",
  "Piezas NFC y experiencias phygital",
  "Luminarias, soportes y displays interactivos",
  "Web apps conectadas a productos físicos",
  "Prototipos funcionales para marcas y creadores",
] as const;

export const ascuasLampDetails = [
  "PETG translúcido ámbar y naranja fuego para capturar la luz sin esconder las capas.",
  "Núcleo iluminado y pieza hueca para que la llama parezca encendida desde dentro.",
  "Base redonda con control de potencia, cable USB-C y filtros de tono intercambiables.",
  "Diseño orgánico de llama exterior: prototipo, fallo, rediseño y prueba hasta encontrar presencia.",
] as const;

export const chispaDetails = [
  "Soporte físico para activar un modo de foco con gesto, presencia y señal clara.",
  "NFC como puente entre objeto, ritual y experiencia digital.",
  "Base sobria en grafito, carga USB-C y lenguaje visual más técnico que decorativo.",
] as const;

export const ascuasLampGallery = [
  {
    src: "/images/ascuas-lamp-core.png",
    alt: "Ficha del núcleo de la lámpara Ascuas",
    title: "Núcleo",
    description:
      "El corazón de Ascuas: PETG translúcido ámbar, luz interior y grosor controlado.",
  },
  {
    src: "/images/ascuas-lamp-exterior.png",
    alt: "Ficha de la llama exterior de la lámpara Ascuas",
    title: "Llama exterior",
    description:
      "La envoltura da movimiento, difunde la luz y deja respirar el núcleo.",
  },
  {
    src: "/images/ascuas-lamp-base.png",
    alt: "Ficha de base y luz de la lámpara Ascuas",
    title: "Base y luz",
    description:
      "Control de potencia, USB-C y filtros intercambiables para ajustar el tono.",
  },
  {
    src: "/images/ascuas-lamp-details.png",
    alt: "Detalles y planos cerrados de la lámpara Ascuas",
    title: "Detalles",
    description:
      "Planos cerrados de material, capas, flujo, núcleo iluminado, base y control.",
  },
] as const;
