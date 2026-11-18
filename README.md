# La Fragua Web

Primera versión de la web principal de La Fragua, creada con Next.js, Tailwind CSS y App Router para despliegue en Vercel.

## Rutas

- `/`
- `/laboratorio`
- `/ascuas`
- `/focus-mode`
- `/productos`
- `/contacto`
- `/curso`: propuesta de curso municipal de diseño e impresión 3D para 2027.

## Curso municipal

La sección `/curso` tiene un recorrido de diez etapas, indicador de lectura,
preguntas desplegables y contactos por correo y teléfono. No recoge datos
mediante formularios ni abre inscripciones.

Los datos del curso se mantienen en `lib/course.ts`; el contenido y los
estilos están en `app/curso/`. La web no publica importes ni desgloses
económicos: cada entidad recibirá una propuesta adaptada a su edición.
Las notas de preparación se conservan en local y se excluyen del repositorio.

La sección se ha revisado con el propietario, quien ha autorizado su
publicación en `https://lafragua.online/curso/`.

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Producción

```bash
pnpm build
pnpm start
```

## Meta Pixel

El identificador del pixel es `1836904827504099` y se configura en
`components/MetaPixel.tsx`. No necesita nuevas variables en Netlify.

La biblioteca de Meta se carga solo al aceptar la publicidad. La eleccion se
recuerda en el navegador y puede cambiarse desde "Preferencias de publicidad"
en el pie. PostHog conserva su configuracion independiente.

Se registra un `PageView` inicial y otro por cada cambio de ruta de Next.js.
No se registran compras ni se envian los campos del formulario a Meta.
Se desactiva la configuracion automatica de eventos para este pixel.
El seguimiento de visitas se controla desde React para evitar duplicados.

Para comprobarlo tras el despliegue, abre "Probar eventos" en Meta, visita la
web, acepta la publicidad y navega entre las fichas. La recepcion en Meta debe
verificarse en ese panel. El bloque `noscript` se omite para que no envie
visitas sin poder recoger antes la eleccion del visitante.
