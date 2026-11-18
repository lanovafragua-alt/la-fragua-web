/** Datos de la propuesta; no equivalen a una edición aprobada o contratada. */
export const courseEdition = {
  name: "Curso municipal de diseño e impresión 3D",
  year: 2027,
  municipality: null as string | null,
  months: 4,
  weeks: 16,
  hours: 72,
  sessions: 48,
  sessionMinutes: 90,
  weeklySessions: 3,
  maxGroups: 3,
  minGroupSize: 6,
  maxGroupSize: 10,
  contactEmail: "lanovafragua@gmail.com",
  contactPhone: "638 89 72 36",
  contactPhoneHref: "tel:+34638897236",
};

export const courseLearningSteps: { title: string; description: string; tool?: string }[] = [
  {
    title: "Conocer la impresora",
    description: "Descubrir cómo se fabrica una pieza por capas, conocer los materiales y aprender a trabajar con seguridad.",
  },
  {
    title: "Diseñar el primer objeto",
    description: "Combinar formas y personalizarlas para crear un primer llavero a partir de una idea propia.",
    tool: "Tinkercad",
  },
  {
    title: "Preparar la impresión",
    description: "Orientar el modelo y elegir capas y soportes para pasar del archivo digital a una pieza física.",
    tool: "Bambu Studio",
  },
  {
    title: "Ampliar las posibilidades",
    description: "Modelar objetos con más libertad y explorar nuevas herramientas según el ritmo y los intereses de cada persona.",
    tool: "Blender",
  },
  {
    title: "Probar y mejorar",
    description: "Comprobar medidas y resistencia, entender los fallos y corregir el diseño antes de volver a fabricar.",
  },
  {
    title: "Dar el acabado",
    description: "Retirar soportes, montar, lijar o pintar cuando la pieza lo necesite, con materiales y supervisión adecuados a cada edad.",
  },
  {
    title: "Crear y presentar un proyecto propio",
    description: "Desarrollar una idea personal y explicar el resultado con fotos o imágenes del modelo. Conocer de forma breve las licencias, los costes y las posibilidades de venta responsable.",
  },
];

export const courseFaqs: { question: string; answer: string }[] = [
  {
    question: "¿Necesito experiencia y para qué edades está pensado?",
    answer: "Se contempla la participación de personas que empiezan desde cero. Las franjas orientativas son 8–12 años, 13–17 años y adultos de 18 años en adelante. Un cuestionario inicial sencillo permitirá adaptar las prácticas, sin examen eliminatorio. Cada grupo tendrá entre 6 y 10 participantes, según demanda.",
  },
  {
    question: "¿Cuándo y dónde serán las clases?",
    answer: "La propuesta para 2027 contempla 16 semanas, 48 sesiones de 90 minutos y 72 horas por participante. La frecuencia de referencia es lunes, miércoles y viernes. Las fechas, los turnos y el aula se acordarán con cada Ayuntamiento; todavía no están confirmados.",
  },
  {
    question: "¿Cuánto costará participar?",
    answer: "El precio para el alumnado todavía no está definido. Las condiciones de participación se concretarán para cada edición con la entidad organizadora y se comunicarán antes de abrir las inscripciones.",
  },
  {
    question: "¿Qué materiales y equipos contempla la propuesta?",
    answer: "Se prevén tres impresoras de La Fragua, consumibles, un kit básico de herramientas, un cuaderno individual y guías de apoyo en preparación. El Ayuntamiento deberá confirmar el aula, los ordenadores y el resto de recursos necesarios. El inventario y las condiciones finales se revisarán antes del inicio.",
  },
  {
    question: "¿Qué objetos podré crear?",
    answer: "Se plantean un llavero personalizado, un puente pequeño con pruebas controladas y un objeto útil para casa, además de un proyecto personal. Son actividades previstas y adaptables al nivel, al tiempo y a la capacidad de impresión; no se promete una pieza grande cada semana.",
  },
  {
    question: "¿Habrá un diploma?",
    answer: "Se prevé un diploma propio de aprovechamiento de La Fragua de 72 horas. Los criterios de asistencia, actividades y proyecto final, así como las firmas, están por concretar. No se anuncia como título oficial, homologación o equivalencia académica.",
  },
  {
    question: "¿Qué relación tiene el proyecto con la Universidad Pablo de Olavide?",
    answer: "La Fragua mantiene conversaciones con el departamento de microcredenciales de la Universidad Pablo de Olavide y cuenta con la disposición de un profesor para asumir la gestión académica. Esta vía está en desarrollo: todavía no se anuncia una microcredencial aprobada ni acreditación universitaria para el curso municipal.",
  },
  {
    question: "¿Puedo inscribirme ya?",
    answer: "La inscripción todavía no está abierta. Puedes contactar para recibir información, pero hacerlo no reserva una plaza. Si la consulta es para una persona menor de edad, debe realizarla su madre, padre o persona adulta responsable. Los Ayuntamientos pueden solicitar una propuesta adaptada a su municipio.",
  },
];
