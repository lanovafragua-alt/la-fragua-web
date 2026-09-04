export const siteUrl = "https://lafragua.online";

export const routes = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/ascuas", label: "Ascuas" },
  { href: "/focus-mode", label: "Chispa" },
] as const;

export const stripePaymentLinks = {
  ascuasLamp: "https://buy.stripe.com/4gM14n2Gbgjc5Oq9J638400",
} as const;

export const contact = {
  email: "lanovafragua@gmail.com",
  phone: "638 89 72 36",
  phoneHref: "tel:+34638897236",
  instagram: "https://www.instagram.com/ascuas.lafragua/",
  instagramLabel: "@ascuas.lafragua",
  tiktok: "https://www.tiktok.com/@ascuas.la.fragua",
  tiktokLabel: "@ascuas.la.fragua",
  facebook: "https://www.facebook.com/profile.php?id=61590603422100",
  facebookLabel: "Ascuas La Fragua",
  etsy: "https://www.etsy.com/shop/LaFraguaDeAscuas",
  etsyLabel: "LaFraguaDeAscuas",
} as const;

const mailto = (subject: string, body: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const customProjectHref = mailto(
  "Quiero crear un proyecto con La Fragua",
  [
    "Hola, La Fragua.",
    "",
    "Quiero hablaros de una idea o encargo personalizado.",
    "",
    "Tipo de pieza:",
    "Medidas aproximadas:",
    "Uso que tendría:",
    "Fecha ideal:",
    "",
    "Gracias.",
  ].join("\n"),
);

export const personalizedLampHref = mailto(
  "Lámpara personalizada con foto",
  [
    "Hola, La Fragua.",
    "",
    "Quiero encargar una lámpara personalizada con mi foto.",
    "",
    "Adjunto la imagen en este correo.",
    "",
    "Nombre:",
    "Código postal:",
    "Dirección:",
    "Teléfono:",
    "",
    "Gracias.",
  ].join("\n"),
);

export const contactLinks = [
  {
    label: "Instagram",
    href: contact.instagram,
    value: contact.instagramLabel,
    kind: "instagram",
  },
  {
    label: "TikTok",
    href: contact.tiktok,
    value: contact.tiktokLabel,
    kind: "tiktok",
  },
  {
    label: "Etsy",
    href: contact.etsy,
    value: contact.etsyLabel,
    kind: "etsy",
  },
  {
    label: "Facebook",
    href: contact.facebook,
    value: contact.facebookLabel,
    kind: "facebook",
  },
  {
    label: "Correo",
    href: `mailto:${contact.email}`,
    value: contact.email,
    kind: "email",
  },
  {
    label: "Teléfono",
    href: contact.phoneHref,
    value: contact.phone,
    kind: "phone",
  },
] as const;

export const shopPromises = [
  "Envío incluido en todos los precios.",
  "Salida por Nacex con seguimiento.",
  "Preparación habitual en 24/48 horas si la pieza está lista.",
] as const;

export const ascuasProduct = {
  name: "Lámpara Ascuas",
  subtitle: "Una brasa de escritorio fabricada capa a capa.",
  officialPrice: "60€",
  launchPrice: "39,90€",
  offerLabel: "Oferta primeras 3 unidades",
  offerNote: "Gastos de envío incluidos",
  shipping: "Envío 24/48h con número de seguimiento por Nacex.",
  shortDescription:
    "Luz cálida, cuerpo translúcido y presencia de objeto ritual. Ascuas nace para que una mesa deje de sentirse apagada.",
  description:
    "Ascuas es la primera pieza física de La Fragua: una lámpara con envoltura roja translúcida, núcleo iluminado y base negra con control frontal. Está pensada como producto real, no como maqueta: un objeto de luz para escritorio, habitación o rincón de trabajo.",
  stripeUrl: stripePaymentLinks.ascuasLamp,
} as const;

const ascuasCatalogImage = {
  src: "/images/catalog/ascuas/ascuas-6.jpg",
  alt: "Lámpara Ascuas encendida sobre un aparador de madera",
} as const;

export const homeChoices = [
  {
    title: "Ascuas",
    eyebrow: "Disponible",
    subtitle: "Lámpara de luz cálida",
    description:
      "La primera pieza oficial de La Fragua. Entra, mira las fotos finales y compra con Stripe.",
    href: "/ascuas",
    cta: "Ver Ascuas",
    imageSrc: ascuasCatalogImage.src,
    imageAlt: ascuasCatalogImage.alt,
    tone: "ember",
  },
  {
    title: "Chispa",
    eyebrow: "Producto",
    subtitle: "Focus Mode físico",
    description:
      "Un dispositivo de mesa para convertir el foco en un gesto: NFC, objeto físico y experiencia digital.",
    href: "/focus-mode",
    cta: "Ver Chispa",
    imageSrc: "/images/proyecto-chispa-device.png",
    imageAlt: "Dispositivo Proyecto Chispa",
    tone: "graphite",
  },
] as const;

export type ProductTone =
  | "ember"
  | "graphite"
  | "electric"
  | "copper"
  | "ruby"
  | "bone"
  | "ink";

export type ProductMedia = {
  src: string;
  alt: string;
  label: string;
  fit?: "cover" | "contain";
};

export type CatalogProduct = {
  slug: string;
  name: string;
  eyebrow: string;
  category: string;
  subtitle: string;
  summary: string;
  price: string;
  compareAtPrice?: string;
  badge?: string;
  href: string;
  purchaseHref: string;
  purchaseLabel: string;
  imageSrc?: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  gallery?: readonly ProductMedia[];
  tone: ProductTone;
  shipping: string;
  prepTime: string;
  details: readonly string[];
  variants?: readonly string[];
  photoNeeds: readonly string[];
  disclaimer?: string;
};

const ascuasCatalogGallery = [
  {
    src: ascuasCatalogImage.src,
    alt: ascuasCatalogImage.alt,
    label: "Aparador",
  },
  {
    src: "/images/catalog/ascuas/ascuas-1.jpg",
    alt: "Lámpara Ascuas encendida sobre una mesa de escritorio",
    label: "Escritorio",
  },
  {
    src: "/images/catalog/ascuas/ascuas-2.jpg",
    alt: "Lámpara Ascuas encendida sobre una mesilla de noche",
    label: "Mesilla",
  },
  {
    src: "/images/catalog/ascuas/ascuas-3.jpg",
    alt: "Lámpara Ascuas encendida en una mesa de salón",
    label: "Salón",
  },
  {
    src: "/images/catalog/ascuas/ascuas-4.jpg",
    alt: "Lámpara Ascuas encendida junto a libros y una butaca",
    label: "Lectura",
  },
  {
    src: "/images/catalog/ascuas/ascuas-5.jpg",
    alt: "Lámpara Ascuas encendida dentro de un setup gaming",
    label: "Setup",
  },
] as const satisfies readonly ProductMedia[];

const carcasas3dsGallery = [
  {
    src: "/images/catalog/carcasas-3ds/charizard-6.jpg",
    alt: "Carcasa Nintendo 3DS XL con diseño Charizard vista de frente",
    label: "Frontal Charizard",
  },
  {
    src: "/images/catalog/carcasas-3ds/charizard-1.jpg",
    alt: "Carcasa Charizard puesta sobre una Nintendo 3DS XL cerrada",
    label: "Cerrada",
  },
  {
    src: "/images/catalog/carcasas-3ds/charizard-2.jpg",
    alt: "Carcasa Charizard apoyada sobre una Nintendo 3DS XL abierta",
    label: "Consola abierta",
  },
  {
    src: "/images/catalog/carcasas-3ds/charizard-5.jpg",
    alt: "Detalle completo del diseño Charizard sobre la carcasa",
    label: "Diseño completo",
  },
  {
    src: "/images/catalog/carcasas-3ds/charizard-4.jpg",
    alt: "Detalle del relieve de Charizard en la carcasa",
    label: "Relieve",
  },
  {
    src: "/images/catalog/carcasas-3ds/charizard-3.jpg",
    alt: "Detalle del logotipo en la carcasa Charizard para Nintendo 3DS XL",
    label: "Detalle logo",
  },
] as const satisfies readonly ProductMedia[];

const soporteR4Gallery = [
  {
    src: "/images/catalog/soporte-r4/r4-portada.jpg",
    alt: "Soporte R4 gigante junto a una Nintendo 3DS XL",
    label: "Portada",
    fit: "contain",
  },
  {
    src: "/images/catalog/soporte-r4/soporte-r4-5.jpg",
    alt: "Nintendo 3DS XL saliendo del soporte R4 gigante",
    label: "Mecanismo",
  },
  {
    src: "/images/catalog/soporte-r4/soporte-r4-1.jpg",
    alt: "Soporte R4 gigante visto de frente con la consola dentro",
    label: "Frontal",
  },
  {
    src: "/images/catalog/soporte-r4/soporte-r4-2.jpg",
    alt: "Detalle frontal del soporte R4 gigante con consola",
    label: "Detalle",
  },
  {
    src: "/images/catalog/soporte-r4/soporte-r4-3.jpg",
    alt: "Parte trasera del soporte R4 gigante con huecos para cartuchos",
    label: "Trasera",
  },
  {
    src: "/images/catalog/soporte-r4/soporte-r4-4.jpg",
    alt: "Soporte R4 gigante cerrado sobre escritorio",
    label: "Cerrado",
  },
] as const satisfies readonly ProductMedia[];

const soporteCascosGallery = [
  {
    src: "/images/catalog/soporte-cascos/soporte-cascos-1.jpg",
    alt: "Soporte modular de La Fragua con auriculares blancos colocados",
    label: "Con auriculares",
  },
  {
    src: "/images/catalog/soporte-cascos/soporte-cascos-2.jpg",
    alt: "Vista lateral del soporte modular con auriculares",
    label: "Vista lateral",
  },
  {
    src: "/images/catalog/soporte-cascos/soporte-cascos-4.jpg",
    alt: "Soporte modular de colores sin auriculares",
    label: "Sin auriculares",
  },
  {
    src: "/images/catalog/soporte-cascos/soporte-cascos-3.jpg",
    alt: "Detalle de las piezas de colores del soporte modular",
    label: "Piezas",
  },
] as const satisfies readonly ProductMedia[];

const lamparaPersonalizadaGallery = [
  {
    src: "/images/catalog/lampara-personalizada/cartel-pareja-personalizado.jpg",
    alt: "Lámpara personalizada con foto convertida en relieve iluminado",
    label: "Ejemplo personalizado",
    fit: "contain",
  },
] as const satisfies readonly ProductMedia[];

const lamparaPerritoGallery = [
  {
    src: "/images/catalog/lampara-perrito/perritos-colgados-luces.jpg",
    alt: "Lámparas de perrito colgadas de una estantería con luces",
    label: "Ambiente",
    fit: "contain",
  },
  {
    src: "/images/catalog/lampara-perrito/perrito-fondo-blanco.jpg",
    alt: "Lámpara de perrito blanca con farol iluminado",
    label: "Producto blanco",
    fit: "contain",
  },
] as const satisfies readonly ProductMedia[];

const cartelLuffyGallery = [
  {
    src: "/images/catalog/cartel-luffy/cartel-luffy-1.jpg",
    alt: "Cartel Wanted Gear 5 blanco retroiluminado",
    label: "Blanco",
    fit: "contain",
  },
  {
    src: "/images/catalog/cartel-luffy/cartel-luffy-2.jpg",
    alt: "Detalle del cartel Wanted Gear 5 blanco con luz cálida",
    label: "Detalle blanco",
    fit: "contain",
  },
  {
    src: "/images/catalog/cartel-luffy/cartel-luffy-3.jpg",
    alt: "Cartel Wanted Gear 5 blanco apoyado sobre una mesa",
    label: "Mesa",
    fit: "contain",
  },
  {
    src: "/images/catalog/cartel-luffy/cartel-luffy-marron-1.jpg",
    alt: "Cartel Wanted Gear 5 marrón retroiluminado",
    label: "Marrón",
    fit: "contain",
  },
] as const satisfies readonly ProductMedia[];

const catalogProductData = [
  {
    slug: "ascuas",
    name: "Lámpara Ascuas",
    eyebrow: "Producto estrella",
    category: "Luz decorativa",
    subtitle: "La brasa de escritorio de La Fragua.",
    summary:
      "Lámpara translúcida con núcleo cálido, base negra y presencia de pieza de autor.",
    price: "39,90€",
    compareAtPrice: "60€",
    badge: "Primeras 3 unidades",
    href: "/ascuas",
    purchaseHref: "/ascuas#pedido",
    purchaseLabel: "Comprar Ascuas",
    imageSrc: ascuasCatalogImage.src,
    imageAlt: ascuasCatalogImage.alt,
    gallery: ascuasCatalogGallery,
    tone: "ember",
    shipping: "Envío incluido por Nacex con seguimiento 24/48h.",
    prepTime: "Listo para preparar pedido.",
    details: [
      "Cuerpo exterior rojo translúcido.",
      "Núcleo interior cálido con efecto de brasa.",
      "Base negra con botón frontal iluminado.",
    ],
    photoNeeds: ["Ya tiene galería final en la ficha de producto."],
  },
  {
    slug: "chispa",
    name: "Proyecto Chispa",
    eyebrow: "Producto definitivo",
    category: "Focus Mode",
    subtitle: "Un gesto físico para entrar en modo concentración.",
    summary:
      "Dispositivo de mesa con estética técnica, NFC y una experiencia pensada para cortar el ruido.",
    price: "Consultar",
    href: "/focus-mode",
    purchaseHref: mailto(
      "Quiero información sobre Proyecto Chispa",
      "Hola, La Fragua.\n\nQuiero información sobre Proyecto Chispa.\n\nGracias.",
    ),
    purchaseLabel: "Consultar Chispa",
    imageSrc: "/images/proyecto-chispa-device.png",
    imageAlt: "Dispositivo Proyecto Chispa",
    tone: "graphite",
    shipping: "Envío incluido por Nacex cuando se active el pedido.",
    prepTime: "Disponible bajo pedido.",
    details: [
      "Objeto físico para activar una rutina de foco.",
      "NFC como puente entre pieza y experiencia digital.",
      "Base sobria con lenguaje de producto tecnológico.",
    ],
    photoNeeds: ["Foto final del producto cerrado.", "Foto en escritorio.", "Detalle del NFC o punto de interacción."],
  },
  {
    slug: "carcasas-nintendo-3ds-xl",
    name: "Carcasas Nintendo 3DS XL",
    eyebrow: "Gaming",
    category: "Accesorio impreso en 3D",
    subtitle: "Frontal, trasera y piezas centrales intercambiables.",
    summary:
      "Carcasas para Nintendo 3DS XL con frentes inspirados en Pikachu y Charizard, más trasera con placa central intercambiable.",
    price: "15€",
    href: "/productos/carcasas-nintendo-3ds-xl",
    purchaseHref: contact.etsy,
    purchaseLabel: "Ver en Etsy",
    imageSrc: carcasas3dsGallery[0].src,
    imageAlt: carcasas3dsGallery[0].alt,
    gallery: carcasas3dsGallery,
    tone: "electric",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Hecho bajo pedido.",
    details: [
      "Probadas sobre Nintendo 3DS XL.",
      "Piezas delanteras y traseras impresas en 3D.",
      "Centro trasero intercambiable con diseños tipo Pikachu o Super Mario.",
    ],
    variants: ["Frontal Pikachu", "Frontal Charizard", "Trasera Nintendo 3DS XL", "Centro Pikachu", "Centro Super Mario"],
    photoNeeds: [
      "Foto frontal de la carcasa Pikachu puesta.",
      "Foto frontal de la carcasa Charizard puesta.",
      "Foto de la trasera completa.",
      "Detalle de la pieza central intercambiable.",
    ],
    disclaimer:
      "Compatible con Nintendo 3DS XL. La consola no está incluida.",
  },
  {
    slug: "soporte-r4-gigante",
    name: "Soporte R4 gigante",
    eyebrow: "Gaming desk",
    category: "Soporte decorativo",
    subtitle: "Una tarjeta retro enorme que esconde la consola.",
    summary:
      "Dock decorativo inspirado en las tarjetas R4 clásicas, con mecanismo para insertar y extraer una Nintendo 3DS XL.",
    price: "34,90€",
    href: "/productos/soporte-r4-gigante",
    purchaseHref: contact.etsy,
    purchaseLabel: "Ver en Etsy",
    imageSrc: soporteR4Gallery[0].src,
    imageAlt: soporteR4Gallery[0].alt,
    imageFit: "contain",
    gallery: soporteR4Gallery,
    tone: "ink",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Listo para enviar o preparar en 24/48h.",
    details: [
      "Formato de tarjeta retro gigante para escritorio.",
      "Mecanismo físico para guardar y sacar la consola.",
      "Montado por piezas y acabado a mano.",
    ],
    photoNeeds: [
      "Foto del soporte con la consola dentro.",
      "Foto del mecanismo expulsando la consola.",
      "Foto lateral mostrando la inclinación.",
      "Detalle trasero del soporte.",
    ],
    disclaimer:
      "Producto decorativo y de exposición. La consola no está incluida.",
  },
  {
    slug: "soporte-auriculares-modular",
    name: "Soporte modular para auriculares",
    eyebrow: "Setup",
    category: "Organización de escritorio",
    subtitle: "Un soporte por piezas con silueta abstracta.",
    summary:
      "Pieza modular impresa en 3D para dejar los auriculares visibles, ordenados y con presencia de taller.",
    price: "27,90€",
    href: "/productos/soporte-auriculares-modular",
    purchaseHref: contact.etsy,
    purchaseLabel: "Ver en Etsy",
    imageSrc: soporteCascosGallery[0].src,
    imageAlt: soporteCascosGallery[0].alt,
    gallery: soporteCascosGallery,
    tone: "graphite",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Listo para enviar o preparar en 24/48h.",
    details: [
      "Estructura modular montada por piezas.",
      "Diseño abstracto para escritorio, gaming o estudio.",
      "Pensado para auriculares de diadema.",
    ],
    photoNeeds: [
      "Foto del soporte montado sin auriculares.",
      "Foto con auriculares puestos.",
      "Detalle de las uniones modulares.",
      "Foto del soporte dentro de un setup real.",
    ],
    disclaimer: "Los auriculares no están incluidos.",
  },
  {
    slug: "lampara-personalizada-foto",
    name: "Lámpara personalizada con foto",
    eyebrow: "Personalizable",
    category: "Retrato 3D iluminado",
    subtitle: "Tu imagen convertida en relieve con luz cálida.",
    summary:
      "Una lámpara tipo retrato 3D: envías una foto, la transformamos en pieza iluminada y lista para regalar.",
    price: "16€",
    href: "/productos/lampara-personalizada-foto",
    purchaseHref: personalizedLampHref,
    purchaseLabel: "Enviar foto por correo",
    imageSrc: lamparaPersonalizadaGallery[0].src,
    imageAlt: lamparaPersonalizadaGallery[0].alt,
    imageFit: "contain",
    gallery: lamparaPersonalizadaGallery,
    tone: "bone",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Hecha por encargo en 1-2 días.",
    details: [
      "Retrato o imagen convertida en relieve translúcido.",
      "Luz cálida USB con cable incluido.",
      "Puede colocarse en mesa o colgarse en pared.",
    ],
    photoNeeds: [
      "Foto del producto encendido de frente.",
      "Foto del producto apagado.",
      "Detalle del relieve.",
      "Ejemplo de una foto original junto al resultado.",
    ],
    disclaimer:
      "El adaptador de pared no está incluido. Si la imagen no sirve, se revisa antes de fabricar.",
  },
  {
    slug: "lampara-perrito",
    name: "Lámpara de perrito",
    eyebrow: "Decoración",
    category: "Luz de estantería",
    subtitle: "Un perrito asomado con luz USB integrada.",
    summary:
      "Lámpara pequeña y simpática para estantería o mueble, con cable USB y posibilidad de color personalizado.",
    price: "10€",
    href: "/productos/lampara-perrito",
    purchaseHref: contact.etsy,
    purchaseLabel: "Ver en Etsy",
    imageSrc: lamparaPerritoGallery[0].src,
    imageAlt: lamparaPerritoGallery[0].alt,
    imageFit: "contain",
    gallery: lamparaPerritoGallery,
    tone: "copper",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Listo para enviar o preparar en 24/48h.",
    details: [
      "Se apoya directamente en balda, escritorio o mueble.",
      "Luz USB incorporada con cable incluido.",
      "Disponible en blanco, negro o color personalizado.",
    ],
    variants: ["Blanco", "Negro", "Personalizado"],
    photoNeeds: [
      "Foto frontal sobre estantería.",
      "Foto lateral para ver la forma.",
      "Foto encendida en ambiente oscuro.",
      "Detalle del cable USB.",
    ],
    disclaimer: "El adaptador de pared no está incluido.",
  },
  {
    slug: "cartel-wanted-luffy-gear-5",
    name: "Cartel Wanted Gear 5",
    eyebrow: "Anime",
    category: "Decoración retroiluminada",
    subtitle: "Cartel físico de pared en versión blanca o marrón.",
    summary:
      "Póster impreso en 3D con relieve, ojos rojos y luz trasera para pared, setup o rincón coleccionista.",
    price: "10€",
    href: "/productos/cartel-wanted-luffy-gear-5",
    purchaseHref: "https://www.etsy.com/listing/4557528301/wanted-luffy-gear-5-poster-one-piece-3d",
    purchaseLabel: "Ver en Etsy",
    imageSrc: cartelLuffyGallery[0].src,
    imageAlt: cartelLuffyGallery[0].alt,
    imageFit: "contain",
    gallery: cartelLuffyGallery,
    tone: "ruby",
    shipping: "Envío incluido por Nacex.",
    prepTime: "Listo para enviar o preparar en 24/48h.",
    details: [
      "Impreso en 3D por capas con sensación de profundidad.",
      "Dos acabados: blanco limpio o marrón estilo cartel.",
      "Retroiluminado por la parte trasera.",
    ],
    variants: ["Blanco", "Marrón con color"],
    photoNeeds: [
      "Foto del acabado blanco encendido.",
      "Foto del acabado marrón encendido.",
      "Foto apagado para ver el relieve.",
      "Detalle de la retroiluminación trasera.",
    ],
    disclaimer:
      "Pieza decorativa inspirada en estética anime. No es un producto oficial.",
  },
] as const satisfies readonly CatalogProduct[];

export const catalogProducts: readonly CatalogProduct[] = catalogProductData;

export const featuredCatalogProducts = catalogProducts.slice(0, 4);

export const productsNeedingPhotos = catalogProducts.filter(
  (product) => !product.imageSrc,
);

export const productBySlug = (slug: string) =>
  catalogProducts.find((product) => product.slug === slug);

export const ascuasProductGallery = ascuasCatalogGallery;

export const ascuasProductDetails = [
  "Oferta de lanzamiento: 39,90€ para las 3 primeras unidades.",
  "Precio oficial después de la oferta: 60€.",
  "Gastos de envío incluidos en la oferta.",
  "Envío 24/48h con número de seguimiento por Nacex.",
  "Envoltura roja translúcida con forma orgánica de llama.",
  "Núcleo interior cálido para un efecto de brasa encendida.",
  "Base negra con botón frontal iluminado.",
] as const;

export const ascuasProcessBlocks = [
  {
    title: "Diseño 3D",
    text: "La forma se trabaja en 3D antes de pasar a fabricación: proporciones, aperturas, núcleo y envoltura.",
    imageSrc: "/images/ascuas-final/ascuas-modelo-3d.jpg",
    imageAlt: "Modelo 3D de Ascuas en Blender",
  },
  {
    title: "Núcleo",
    text: "El corazón translúcido concentra la luz y crea el efecto de brasa encendida desde dentro.",
    imageSrc: "/images/ascuas-final/ascuas-ficha-nucleo.jpg",
    imageAlt: "Ficha del núcleo de la lámpara Ascuas",
  },
  {
    title: "Impresión",
    text: "Cada pieza se imprime capa a capa, revisando acabado, brillo y lectura de la forma.",
    imageSrc: "/images/ascuas-final/ascuas-impresion-bambu.jpg",
    imageAlt: "Núcleo de Ascuas durante la impresión 3D",
  },
  {
    title: "Forma",
    text: "La envoltura exterior deja respirar la luz y genera siluetas distintas según el ángulo.",
    imageSrc: "/images/ascuas-final/ascuas-detalle-exterior.jpg",
    imageAlt: "Detalle de la envoltura exterior de Ascuas",
  },
  {
    title: "Luz",
    text: "El núcleo concentra el brillo y hace que la pieza parezca encendida desde dentro.",
    imageSrc: "/images/ascuas-final/ascuas-detalle-nucleo.jpg",
    imageAlt: "Detalle del núcleo iluminado de Ascuas",
  },
  {
    title: "Control",
    text: "La base negra y el botón frontal aterrizan la pieza: objeto decorativo, sí, pero pensado para usarse.",
    imageSrc: "/images/ascuas-final/ascuas-detalle-boton.jpg",
    imageAlt: "Detalle de la base y botón de Ascuas",
  },
] as const;

export const chispaDetails = [
  "Soporte físico para activar un modo de foco con gesto, presencia y señal clara.",
  "NFC como puente entre objeto, ritual y experiencia digital.",
  "Base sobria en grafito, carga USB-C y lenguaje visual técnico.",
] as const;
