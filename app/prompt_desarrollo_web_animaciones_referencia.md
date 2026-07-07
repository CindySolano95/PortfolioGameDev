# Prompt para IA desarrolladora: página web con animaciones, dinamismo e interacción visual con mouse

## 1. Rol que debe asumir la IA
Actúa como **frontend senior, motion designer e integrador UI/UX**. Debes construir una página web moderna, altamente visual e interactiva, inspirada en los videos de referencia anexos. El objetivo no es copiar las marcas, textos, personajes ni assets exactos de los videos, sino replicar el **lenguaje de movimiento**, la **sensación cinematográfica**, el **scroll dinámico**, las **transiciones fluidas** y los **elementos interactivos controlados por mouse**.

La página debe sentirse como una experiencia visual premium: inmersiva, fluida, con profundidad, capas en movimiento, tarjetas interactivas, botones con microinteracciones, scroll animado y elementos que reaccionan al cursor.

---

## 2. Lectura de los videos de referencia

### Video 1 — Referencia tipo landing/game website
El primer video muestra una landing con estética cinematográfica y fantástica. Se identifican estos comportamientos clave:

- **Hero inmersivo con ilustración de fondo**: escena amplia con profundidad visual, capas de paisaje, niebla, luces y elementos decorativos.
- **Parallax suave**: los planos del fondo, elementos decorativos y contenido principal se desplazan a distintas velocidades.
- **Transiciones entre secciones tipo scroll narrativo**: la página no se siente como un scroll plano, sino como una secuencia de escenas.
- **Secciones oscuras con alto contraste**: fondo morado/negro, luces cálidas, brillos y partículas.
- **Cartas interactivas**: carrusel de cartas con escala, profundidad, rotación y efecto 3D.
- **Flip/reveal de carta**: una carta gira sobre su eje Y y revela su contenido.
- **Navegación fija minimalista**: menú superior limpio, con hover sutil y botón destacado.
- **Textos con entrada animada**: títulos grandes que aparecen con fade, desplazamiento y/o split por líneas.
- **Partículas luminosas**: pequeños puntos de luz que refuerzan la sensación de profundidad y magia.

### Video 2 — Referencia tipo prototipo animado/website showcase
El segundo video muestra una web presentada dentro de un marco visual, con desplazamientos, cambios de sección y elementos con movimiento. Se identifican estos comportamientos clave:

- **Contenedor central tipo viewport/browser mockup**: la web se presenta dentro de un marco con borde blanco, esquinas redondeadas y sombra.
- **Scroll interno animado**: las secciones se desplazan verticalmente con ritmo suave.
- **Secciones con cambios visuales fuertes**: hero, about, misión, carrusel de juegos, reclutamiento y footer.
- **Tarjetas horizontales interactivas**: cards tipo carousel con imágenes, botones y overlays.
- **Botones llamativos**: CTA con contraste, sombra, escala y hover.
- **Imágenes que entran por máscara o desplazamiento**: elementos visuales aparecen desde los bordes o se revelan con clipping.
- **Uso de profundidad**: fondos oscuros, capas, blur, sombras y elementos en primer plano.
- **Movimiento de presentación**: la web parece una demo animada, no una página estática.

---

## 3. Objetivo del desarrollo
Construir una página web con una experiencia interactiva similar a las referencias, adaptada al contenido real del proyecto. La web debe tener:

1. **Carga inicial visualmente potente**.
2. **Hero con fondo animado o parallax**.
3. **Scroll suave y secciones animadas**.
4. **Elementos visuales que reaccionen al mouse**.
5. **Tarjetas/proyectos con hover 3D y carrusel interactivo**.
6. **Transiciones entre bloques que se sientan cinematográficas**.
7. **Microinteracciones en navegación, botones, imágenes y cards**.
8. **Diseño responsive para desktop, tablet y móvil**.

El sitio puede usarse como portfolio, landing de producto, micrositio creativo o presentación institucional. Si el contenido final es un portafolio, adaptar las secciones a: **inicio, sobre mí/nosotros, servicios o capacidades, proyectos destacados, experiencia, contacto**.

---

## 4. Stack técnico recomendado
Desarrollar preferiblemente con:

- **Next.js + React + TypeScript** o **Vite + React + TypeScript**.
- **Tailwind CSS** para estilos base y responsive.
- **GSAP + ScrollTrigger** para animaciones avanzadas de scroll.
- **Lenis** para smooth scrolling.
- **Framer Motion** para microinteracciones, entrada/salida de componentes y animaciones declarativas.
- **CSS variables** para sistema de color, sombras, radios, timing y easings.
- Opcional: **Three.js / React Three Fiber** solo si se implementan efectos 3D reales; si no, usar CSS 3D transforms.

Priorizar rendimiento: usar transforms, opacity y requestAnimationFrame; evitar animar propiedades costosas como width, height, top o left salvo que sea estrictamente necesario.

---

## 5. Dirección visual

### Estilo general
La web debe tener una estética premium, inmersiva y editorial. Las referencias usan un lenguaje visual de fantasía/gaming, pero el desarrollo debe adaptar ese dinamismo a la identidad del proyecto.

Características visuales deseadas:

- Fondos oscuros o degradados profundos.
- Capas con blur, glow y sombras suaves.
- Ilustraciones, imágenes o formas abstractas con parallax.
- Tarjetas con bordes redondeados, profundidad y hover 3D.
- Tipografía grande, expresiva y jerarquizada.
- Botones con presencia visual fuerte.
- Secciones amplias, con aire y narrativa visual.
- Pequeños elementos decorativos flotantes.

### Paleta sugerida
Usar una paleta configurable mediante CSS variables. Por defecto:

```css
:root {
  --color-bg: #100818;
  --color-bg-2: #241034;
  --color-primary: #e6469a;
  --color-secondary: #7b5cff;
  --color-accent: #ffd166;
  --color-text: #ffffff;
  --color-muted: rgba(255, 255, 255, 0.68);
  --color-card: rgba(255, 255, 255, 0.08);
  --radius-xl: 28px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

Ajustar estos colores a la marca real si el usuario entrega branding.

---

## 6. Estructura sugerida de la página

### 6.1. Preloader / Intro breve
Crear una intro corta, máximo 1.5 segundos, con:

- Fondo oscuro o degradado.
- Logo o nombre del proyecto entrando con fade + blur.
- Pequeñas partículas o líneas que se expanden.
- Transición suave hacia el hero.

No debe sentirse pesada ni bloquear la navegación.

### 6.2. Hero cinematográfico
El hero debe ocupar al menos el 100vh en desktop.

Elementos:

- Fondo con varias capas: background, midground, foreground.
- Título principal grande.
- Subtítulo corto.
- CTA principal y secundario.
- Elementos decorativos flotantes.
- Navegación superior fija o sticky.

Animaciones:

- Entrada del título con split text o líneas escalonadas.
- Fondo con parallax al mover el mouse.
- Elementos decorativos con floating loop lento.
- CTA con efecto magnético en hover.
- Glow o spotlight suave siguiendo el cursor.

Comportamiento del mouse:

- Al mover el cursor, las capas del hero deben moverse en distintas intensidades.
- El fondo debe reaccionar de forma sutil, no brusca.
- El botón debe acercarse levemente al cursor cuando está cerca.

### 6.3. Sección narrativa / About
Crear una sección tipo storytelling.

Elementos:

- Texto dividido en bloques cortos.
- Imagen, mockup o ilustración lateral.
- Elementos luminosos o partículas.

Animaciones:

- El texto aparece con fade-up y stagger.
- La imagen entra con máscara, clip-path o desplazamiento lateral.
- El fondo se mueve más lento que el contenido.

### 6.4. Sección de proyectos / Cards interactivas
Inspirarse en la sección de cartas del primer video.

Elementos:

- Carrusel de tarjetas/proyectos.
- Tarjeta central destacada.
- Tarjetas laterales reducidas.
- Controles “previous/next”.
- Indicador de progreso.

Comportamiento:

- Las tarjetas deben poder moverse con mouse drag y también con botones.
- La tarjeta central debe tener mayor escala, sombra y nitidez.
- Las tarjetas laterales deben tener menor escala y opacidad.
- En hover, cada tarjeta debe inclinarse en 3D según la posición del mouse.
- En click, la tarjeta puede hacer flip o abrir un modal con información.

Efectos sugeridos:

```css
.card-3d {
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
}
```

La rotación debe ser moderada: máximo 8 a 12 grados en X/Y.

### 6.5. Sección tipo showcase horizontal
Inspirarse en el segundo video, especialmente en los bloques de cards blancas/horizontales.

Elementos:

- Contenedor amplio con cards horizontales.
- Imagen principal.
- Texto breve.
- CTA.
- Botón tipo play o icono interactivo.

Animaciones:

- Las cards pueden desplazarse horizontalmente al hacer scroll vertical.
- Las imágenes entran con scale + mask.
- Los botones tienen hover con scale, shadow y cambio de color.

### 6.6. Sección de capacidades / servicios
Crear cards pequeñas con iconos o microilustraciones.

Animaciones:

- Entrada escalonada.
- Hover con elevación, brillo de borde y parallax interno.
- Icono con rotación o pequeña animación loop.

### 6.7. CTA final
Debe sentirse como cierre de experiencia.

Elementos:

- Título contundente.
- Texto breve.
- Botón de contacto.
- Fondo con glow o partículas.

Animaciones:

- Entrada con fade-up.
- Botón magnético.
- Spotlight siguiendo el cursor.

### 6.8. Footer
Footer limpio, con links y redes.

Animaciones:

- Hover de links con underline animado.
- Pequeño movimiento en iconos.

---

## 7. Interacciones con mouse obligatorias
Implementar las siguientes interacciones visuales:

### 7.1. Cursor personalizado
Crear un cursor visual compuesto por:

- Punto central pequeño.
- Círculo exterior con delay.
- Expansión en hover sobre links, botones y cards.
- Cambio de texto opcional en cards: “ver”, “drag”, “abrir”.

Debe desactivarse en dispositivos táctiles.

### 7.2. Spotlight / glow siguiendo el mouse
Agregar un radial gradient suave que siga el cursor en secciones oscuras.

Ejemplo conceptual:

```css
.section::before {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(230, 70, 154, 0.18),
    transparent 40%
  );
}
```

Actualizar `--mouse-x` y `--mouse-y` con JavaScript usando requestAnimationFrame.

### 7.3. Magnetic buttons
Los botones principales deben moverse levemente hacia el cursor cuando este se acerque.

Comportamiento:

- Distancia máxima de atracción: 40px.
- Traslación máxima: 8px a 14px.
- Al salir, volver suavemente al centro.

### 7.4. Tilt 3D en cards
Cada card debe inclinarse según la posición del cursor.

Comportamiento:

- Centro de la card = rotación 0.
- Esquinas = rotación máxima.
- Agregar brillo o highlight interno que se mueva con el cursor.
- Al salir, volver a estado inicial con easing.

### 7.5. Parallax de capas
En hero y secciones visuales, implementar capas con distinta sensibilidad:

- Fondo lejano: movimiento muy bajo.
- Elementos medios: movimiento medio.
- Primer plano: movimiento más evidente.
- Texto: movimiento mínimo para no afectar lectura.

### 7.6. Drag horizontal
El carrusel de proyectos debe soportar:

- Arrastre con mouse.
- Swipe en móvil.
- Inercia suave.
- Snap a tarjeta central.

---

## 8. Animaciones de scroll obligatorias

### 8.1. Smooth scroll
Usar Lenis o una solución equivalente para scroll fluido.

Configurar:

- Duración moderada.
- Sensación suave, no lenta.
- Compatible con ScrollTrigger.

### 8.2. Secciones con entrada animada
Cada sección debe tener entrada por scroll:

- Fade.
- TranslateY entre 40px y 120px.
- Blur inicial leve.
- Stagger en textos y cards.

### 8.3. Pinning / escena fija
Al menos una sección debe quedar fija mientras el contenido interno se mueve. Inspirarse en el efecto de viewport central del segundo video.

Ejemplo:

- La sección queda pinned.
- El mockup o card principal permanece centrado.
- Internamente se desplazan textos, imágenes o cards.

### 8.4. Transiciones cinematográficas
Entre secciones usar transiciones como:

- Máscara/clip-path.
- Desvanecimiento con blur.
- Desplazamiento vertical con capas.
- Cambio progresivo de color de fondo.

Evitar cortes abruptos.

---

## 9. Microinteracciones
Implementar microinteracciones en:

- Links del menú: underline animado o glow suave.
- Botones: scale, shadow, magnetic effect y ripple opcional.
- Cards: elevación, tilt, borde iluminado y highlight según cursor.
- Imágenes: scale leve en hover, máscara o desplazamiento interno.
- Iconos: pequeñas rotaciones o floating loops.
- Indicadores de carousel: línea activa animada.

Duraciones sugeridas:

- Hover simple: 180ms a 280ms.
- Entrada de elementos: 600ms a 900ms.
- Transiciones grandes: 900ms a 1400ms.
- Floating loops: 4s a 8s.

Usar easings suaves:

```js
const easeOut = [0.16, 1, 0.3, 1];
const springSoft = { type: "spring", stiffness: 120, damping: 18 };
```

---

## 10. Componentes mínimos a crear

Crear una arquitectura ordenada de componentes:

```txt
/src
  /components
    Navbar.tsx
    CustomCursor.tsx
    Hero.tsx
    ParallaxLayer.tsx
    SectionIntro.tsx
    ProjectCarousel.tsx
    ProjectCard.tsx
    ShowcaseSection.tsx
    ServicesGrid.tsx
    MagneticButton.tsx
    SpotlightSection.tsx
    CTASection.tsx
    Footer.tsx
  /hooks
    useMousePosition.ts
    useMagnetic.ts
    useTilt.ts
    useLenis.ts
    useReducedMotion.ts
  /data
    projects.ts
    services.ts
  /styles
    globals.css
```

---

## 11. Requerimientos responsive

### Desktop
- Aprovechar animaciones completas.
- Usar cursor personalizado.
- Activar tilt 3D, magnetic buttons y parallax con mouse.
- Carrusel draggable con mouse.

### Tablet
- Mantener scroll animado y cards.
- Reducir intensidad de parallax.
- Simplificar cursor personalizado si no aporta.

### Mobile
- Desactivar cursor personalizado.
- Sustituir hover por tap/swipe.
- Reducir partículas y blur para rendimiento.
- Carrusel con swipe nativo.
- Textos más compactos y secciones menos altas.

---

## 12. Accesibilidad y rendimiento

Implementar:

- Soporte para `prefers-reduced-motion`.
- Buen contraste en textos.
- Navegación por teclado.
- Estados focus visibles.
- Botones y links con labels claros.
- Imágenes optimizadas.
- Lazy loading de assets pesados.
- Evitar animaciones que bloqueen el hilo principal.
- Usar `will-change` solo en elementos animados relevantes.
- Mantener 60fps en desktop promedio.

Si `prefers-reduced-motion` está activo:

- Desactivar parallax agresivo.
- Desactivar floating continuo.
- Mantener fades simples.
- Evitar pinning demasiado largo.

---

## 13. Criterios de aceptación
La entrega se considera correcta si cumple con:

1. La página no se siente estática; debe tener movimiento desde el primer pantallazo.
2. El hero tiene profundidad visual y reacción al mouse.
3. El scroll es fluido y las secciones aparecen con transiciones cuidadas.
4. Hay al menos un carrusel de cards con drag, snap y hover 3D.
5. Hay botones magnéticos o con microinteracción visible.
6. Hay spotlight o glow siguiendo el cursor en secciones clave.
7. Las animaciones no son excesivas ni dificultan la lectura.
8. La web funciona correctamente en desktop, tablet y móvil.
9. La arquitectura del código es clara, modular y escalable.
10. La experiencia final recuerda el dinamismo de las referencias sin copiar sus marcas ni assets.

---

## 14. Instrucción final para la IA desarrolladora
Desarrolla una página web completa, responsive y visualmente interactiva siguiendo las referencias descritas. Prioriza la experiencia de movimiento y la interacción con mouse. El resultado debe verse como una web premium, animada y cuidadosamente diseñada, no como una plantilla básica.

Antes de escribir código, define brevemente:

1. Arquitectura del proyecto.
2. Librerías a usar.
3. Componentes principales.
4. Estrategia de animación.
5. Estrategia responsive.

Luego implementa el proyecto con código limpio, comentado solo donde sea necesario, y usando datos mockeables para que el contenido pueda reemplazarse fácilmente.

