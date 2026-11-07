# Instrucciones para el equipo de Valoria

Este archivo lo leen Claude y los agentes del equipo al empezar cada sesión. Es la memoria común del proyecto.

## El proyecto

Valoria es un juego de rol en pixel art, en vertical para móvil, para niños de 8 a 12 años. Enseña dinero e inversión haciendo que los conceptos sean las reglas del juego. El niño nunca ve las palabras "lección", "aprender", "examen" o "curso".

- Diseño: sección 3 del *Plan de negocio: app de educación financiera para niños* (artifact de Docs del fundador). Manda sobre cualquier otra idea.
- Auditoría y backlog: `docs/auditoria-2026-11.md`.
- Fundador y decisor: Fernan (GitHub: banjoido). Él aprueba cada entrega.

## Reglas que no se rompen

- Sin compras dirigidas al niño, sin cajas de botín, sin publicidad y sin analítica de terceros.
- Ninguna petición a servidores de terceros desde el juego: fuentes, librerías y sonidos van incluidos.
- Sin chat libre entre niños.
- Personajes, criaturas y nombres originales; nada copiado de otros juegos.
- No se pierde nunca de golpe: las pérdidas son suaves y con aviso.
- Guía de arte: loseta de 26 px en pantalla (los móviles de referencia son los actuales: iPhone de 390–440 px y Android de 360–412 px; por debajo de 390 px el mapa ocupa todo el ancho, unos 24 px por loseta en un Android de 360 px), contorno #2b2230, Pixelify Sans, texto de diálogo de 18 px o más, nada por debajo de 11 px, toques de 44 px o más.
- Textos en español de España, frases cortas: como mucho dos frases por globo.

## Principios de juego (desde la evaluación del sprint 2)

El objetivo es que Valoria sea un juego de rol competente (el crítico debe darle 8 sobre 10 o más), sin perder la buena narración ni el fondo de inversión, ahorro y economía. Informe: `docs/evaluacion-rpg.md`.

- **Jugar más que leer.** Cada misión se resuelve haciendo cosas en el mundo. Como mucho dos frases por globo, y el diálogo de Chispín se reduce: que las tablas y los resultados hablen solos.
- **Nada de exámenes.** Ninguna misión termina con una pregunta tipo test. El concepto se demuestra jugando: el villano vuelve con una variante de su truco y el niño la resuelve.
- **El dinero es la herramienta del jugador.** Las monedas siempre tienen un uso que importa (semillas, abono, herramientas, trocitos de talleres) y la hucha pierde brillo poco a poco con Merma. Ninguna fuente de monedas es infinita.
- **Un bucle propio que apetece repetir:** el huerto vivo (plantar, esperar, cosechar, vender o replantar). Las misiones son hitos sobre ese bucle.
- **Las criaturas cambian reglas del juego**, y Chispín crece de verdad según lo reinvertido. Nada se promete en pantalla que el juego no haga.
- **Las decisiones cuentan:** consecuencias suaves, con aviso, que se notan un tiempo y se pueden recuperar. Las opciones se barajan.
- **El mundo sigue vivo** después de cada misión y después del final: vecinos con frases nuevas, zonas a las que volver, secretos.
- **Cada acción se siente:** sonido, animación y respuesta inmediata.

## Cómo trabajamos

- Cada sprint empieza con una especificación del diseñador, revisada por pedagogía y por el crítico antes de programar, y termina con QA y una nueva evaluación del crítico.

- Cada cambio va en una rama y llega a `main` con un pull request que aprueba Fernan.
- Antes de entregar, `npm run qa:partida` debe completar las 15 misiones sin errores.
- El juego está en `juego/` y su build (`juego/dist/index.html`) es lo que se publica en el artifact «Valoria» cuando Fernan aprueba. `prototipo/` es el original de noviembre de 2026, solo de consulta.
- Toda decisión de diseño que cambie números, misiones o textos se anota en el pull request con su porqué.
