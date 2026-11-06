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
- Guía de arte: loseta de 26 px en pantalla (excepción decidida: en pantallas de menos de 390 px de ancho el mapa se reduce para caber entero, unos 20 px por loseta), contorno #2b2230, Pixelify Sans, texto de diálogo de 18 px o más, nada por debajo de 11 px, toques de 44 px o más.
- Textos en español de España, frases cortas: como mucho dos frases por globo.

## Cómo trabajamos

- Cada cambio va en una rama y llega a `main` con un pull request que aprueba Fernan.
- Antes de entregar, `npm run qa:partida` debe completar las 15 misiones sin errores.
- `prototipo/index.html` es la versión publicada. `prototipo/legible/` es solo de consulta.
- Toda decisión de diseño que cambie números, misiones o textos se anota en el pull request con su porqué.
