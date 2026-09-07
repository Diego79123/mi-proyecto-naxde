# Naxde: universo y narrativa de scroll

## Dirección

Retoma la identidad espacial original: azul casi negro, rojo Naxde, luz violeta, tipografía monumental y logo centrado. La composición se organiza como un viaje continuo, con profundidad y movimiento vinculados a la posición del visitante. El menú compartido conserva todas las rutas y utiliza una superficie de pantalla completa, enlaces grandes, foco de teclado y cierre con Escape.

Referencias consultadas:

- [Outreach, Rocani Studio](https://rocani.studio/work/outreach): mundos espaciales y narrativa inmersiva; referencia conceptual, sin copiar sus recursos.
- [Awwwards, selección de storytelling](https://www.awwwards.com/websites/storytelling/): composición, tipografía, transiciones y experiencias de scroll.

## Recorrido

1. El futuro se construye: el planeta se acerca mientras el titular cambia de escala.
2. Por qué Naxde: tres escenas sobre comprender, conectar y acompañar, con asteroides en planos independientes.
3. Soluciones: software, web y comercio electrónico, IA, automatización y marketing; exploración accesible con acordeón.
4. NeoCard: demostración existente de Oscar Rivera dentro de un dispositivo que cambia de perspectiva. Activación explícita para evitar que capture el scroll al recorrer la página.
5. Método: descubrimiento, diseño, construcción y evolución.
6. Proyectos y contacto: accesos a las rutas y los datos ya disponibles.

No se modifican colecciones, reglas ni registros de Firebase. Los contactos del PDF integrados en la portada anterior se mantienen.

## Movimiento y accesibilidad

- Scroll nativo, sin interceptar la rueda ni el teclado.
- Transformaciones y opacidades actualizadas con requestAnimationFrame; React solo cambia el capítulo activo.
- Campo estelar en un solo canvas, con densidad reducida en móvil y pausa al ocultarse la pestaña.
- Control de pausa y respeto de prefers-reduced-motion, con capítulos presentados en lectura continua.
- En móvil, NeoCard usa una composición vertical sin fijación prolongada.
- Navegación por capítulos, enlace para saltar al contenido y controles semánticos Radix existentes.
- Sin sonido ni destellos rápidos.

## Recursos visuales

Generados con la herramienta integrada ImageGen; alpha transparente conservado. Conversión de formato a WebP para entrega web, sin recortes ni cambios de contenido.

- `public/space/planet.webp`: planeta, 1536 × 1024, aproximadamente 333 kB.
- `public/space/asteroid.webp`: asteroide, 1254 × 1254, aproximadamente 389 kB.

Prompt final del planeta:

```text
Use case: stylized-concept
Asset type: isolated cinematic space website asset for independent animation over midnight space.
Primary request: one large photorealistic dark rocky alien planet with elegant thin tilted rings.
Scene/backdrop: genuinely transparent alpha background; no background scene.
Style/medium: luxury cinematic astronomical art, photorealistic rendering.
Composition/framing: landscape 3:2 canvas, planet centered, entire complete planetary silhouette and all rings visible with ample transparent padding on every side.
Lighting/mood: narrow lavender-white rim light with subtle crimson on shadow edge, dramatic dark luxurious mood.
Materials/textures: finely detailed charcoal rocky alien surface; delicate realistic rings.
Constraints: only the single ringed planet, preserve true alpha transparency outside the subject. No stars, no text, no watermark, no additional objects, no solid background.
```

Prompt final del asteroide:

```text
Use case: stylized-concept
Asset type: isolated cinematic space website asset for independent animation over midnight space.
Primary request: one isolated irregular cratered asteroid.
Scene/backdrop: genuinely transparent alpha background; no background scene.
Style/medium: photorealistic cinematic astronomical rendering.
Composition/framing: square canvas, centered entire asteroid visible with ample transparent padding on every side.
Lighting/mood: subtle cold violet edge light, dark cinematic mood.
Materials/textures: rough rocky charcoal surface, detailed natural craters and irregular silhouette.
Constraints: only one asteroid, preserve true alpha transparency outside subject. No stars, no text, no watermark, no additional objects, no solid background.
```

## Validación

`node tests/space-motion.test.cjs` verifica los límites de cada sección, la lectura de los tres capítulos, la ausencia de transiciones vacías y el recorrido inverso.

Antes de producción se corrigió la integración del calendario para react-day-picker v9. La comprobación global de TypeScript pasa y la compilación ahora exige tipos válidos. El comando de compilación es compatible con Windows y Linux. Se conserva la configuración previa de lint.

La validación por HTTP comprueba disponibilidad; no sustituye pruebas visuales ni de interacción en navegador. No se realizaron pruebas de navegador en esta entrega.


## Segunda iteración: continuidad y páginas independientes

- Un único planeta fijo acompaña el comienzo y sale progresivamente; no reaparece al final. Las secciones comparten el mismo fondo estelar y el cierre utiliza órbitas geométricas.
- Nuevo mensaje: «Rompe tu techo. No tu visión».
- Recuperación de ADN Naxde, demostraciones web y app y NeoCard. Iframes locales ajustados al tamaño del dispositivo con ResizeObserver. El dashboard usa datos de demostración y permite cambiar las vistas del gráfico.
- Composiciones propias para nosotros, servicios, web, NeoCard, proyectos y contacto, con apariciones y profundidad vinculadas al desplazamiento. Social AI conserva sus sesiones y herramientas en un estudio oscuro.
- Footer compartido con navegación real, contactos del portafolio y solicitud de boletín guardada en la colección leads. El envío de contacto ahora espera la escritura antes de confirmar éxito. No se enviaron datos de prueba a Firebase.
- Asistente en panel flotante con apertura por teclado, sugerencias, espera/error y acceso al equipo. Se conserva el flujo de IA existente, sin invocar generación durante la validación.
- Logos SVG descargados de [Simple Icons v16](https://github.com/simple-icons/simple-icons) a public/brands. Formas originales monocromas para Next.js, React, Shopify, n8n, Make, WordPress y WhatsApp. Distribución CC0 del proyecto, marcas pertenecientes a sus titulares.
- Referencia consultada: [Lusion](https://lusion.co/). Se toma la continuidad espacial, la tipografía de escala editorial y la relación entre movimiento y contenido como dirección; no se copian sus activos ni sus diseños.
- Compilación de producción completada y 27 rutas generadas. Respuestas HTTP 200 para las ocho páginas principales, las dos demostraciones, la NeoCard de Oscar Rivera y los logos comprobados. Las pruebas de matemática del scroll pasan en ambas direcciones.
- Pendiente de evaluación visual por el usuario en localhost; no se hicieron capturas ni interacción automática en navegador.
