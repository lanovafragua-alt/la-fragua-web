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
recuerda en el navegador y puede cambiarse desde "Preferencias de privacidad"
en el pie. PostHog conserva su configuracion independiente.

Se registra un `PageView` inicial y otro por cada cambio de ruta de Next.js.
No se registran compras ni se envian los campos del formulario a Meta.
Se desactiva la configuracion automatica de eventos para este pixel.
El seguimiento de visitas se controla desde React para evitar duplicados.

Para comprobarlo tras el despliegue, abre "Probar eventos" en Meta, visita la
web, acepta la publicidad y navega entre las fichas. La recepcion en Meta debe
verificarse en ese panel. El bloque `noscript` se omite para que no envie
visitas sin poder recoger antes la eleccion del visitante.

## Google Analytics y buscadores

La propiedad GA4 "La Fragua - Web" usa el flujo "La Fragua Web" y el
identificador público `G-VD80VJNN8Y`. `lib/google.ts` contiene este ID y la
verificación pública de Search Console. Se pueden sustituir con las variables
opcionales de `.env.example`; no son claves secretas.

Google Analytics se carga solo con el permiso independiente "Medición de
visitas". Rechazar la publicidad no impide aceptar Analytics, ni al contrario.
La medición mejorada está desactivada en el flujo: `GoogleAnalytics.tsx`
registra una vista inicial y otra por cambio de ruta, sin duplicar el historial.
No registra compras, campos de formularios ni parámetros de URL arbitrarios;
conserva únicamente los parámetros UTM para atribuir campañas. PostHog mantiene
su configuración independiente.

`lib/seo.ts` concentra títulos, descripciones, URL canónicas y datos
estructurados de organización, catálogo y productos. Los precios salen del
catálogo, sin inventar reseñas ni disponibilidad. La portada es la URL canónica
del catálogo; `/tienda/` y `/productos/` son sus alias. La demo 3D lleva `noindex`.

`/robots.txt` permite el rastreo y anuncia `/sitemap.xml`, que contiene las
páginas canónicas públicas. El sitemap se genera desde el catálogo. Los
cambios de estos archivos se publican con el despliegue habitual de Netlify.
Tras verificar la propiedad `https://lafragua.online/` en Search Console,
enviar el sitemap y solicitar la indexación de la portada. Una solicitud no
garantiza ni la inclusión ni una posición determinada en Google.

Comprobaciones locales:

```bash
node --test tests/search-analytics.test.mjs
pnpm lint
pnpm build
```

No se publica una dirección doméstica ni una ficha de Google Maps hasta
confirmar municipio y atención presencial real. Los envíos por mensajería no
equivalen a un negocio que visita a sus clientes.
