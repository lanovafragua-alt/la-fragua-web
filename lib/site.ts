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
