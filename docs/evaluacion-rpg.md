# Evaluación de Valoria como juego de rol (sprint 2)

Fecha: 6 de noviembre de 2026 · Versión evaluada: rama `sprint-3/evaluacion-rpg`, que es el sprint 2 con guardado en todas las misiones y elección de héroe o heroína.
Listón: Pokémon y Diablo, con Zelda y Stardew Valley de apoyo. Valoria no tiene combate, compras ni cajas de botín, y eso no cuenta como fallo.

## 1. Veredicto

**Nota como juego: 4 de 10.** Valoria es una aventura narrativa bien hecha y bonita, pero todavía no es un juego de rol competente. Sus 15 misiones son guiones lineales: caminas hasta un vecino, lees, contestas una ventana y al final hay una pregunta. No hay un bucle propio que apetezca repetir. El personaje no crece, las criaturas no hacen nada, las monedas no sirven para nada y, al terminar, el mundo se queda mudo. La base es muy buena (arte, villanos que son conceptos, el mundo que recupera el color), pero hoy un niño que juega a Pokémon lo vería como un cuento interactivo y no como «su» juego.

## 2. Cómo lo he medido

- Compilación limpia (`npm run build`) y **cuatro partidas del bot** (`qa/bot.py`): una completa (15 misiones, unos 9 minutos de bot, sin errores) y otras tres desde las misiones 7, 10 y 13. Ninguna se atascó y no hubo errores de consola.
- **Cuatro partidas instrumentadas** con un script propio de Playwright que reutiliza el paso del bot y cuenta, por misión, las líneas de diálogo y sus caracteres, los toques en el mapa, los toques en diálogos y botones, cada ventana abierta (minijuego, tabla, pregunta…), las noches, los sonidos de recompensa y las monedas ganadas o gastadas. También guarda una captura de cada ventana.
- Una prueba del **modo libre** (después de la misión 15): toqué a cuatro vecinos del Mercado y a las parcelas, y abrí los paneles Mapa y Criaturas.
- He mirado capturas de las cinco zonas, del minijuego de amasar, del ojo de tasador, de la tabla de la misión 9, de una pantalla de victoria, de una pregunta, de la pantalla final, del modo libre y de los paneles.
- He leído las 15 misiones (`juego/src/misiones/`), sus textos, el estado, el mundo y la interfaz.

### Cifras de una partida completa

El bot elige siempre la primera opción. En la misión 12 eso le hace fallar las puertas una y otra vez (73 ventanas, 230 líneas), así que esa misión la he corregido a mano con lo que tendría una partida normal.

| Medida (15 misiones) | Valor | Nota |
|---|---|---|
| Líneas de diálogo | ~355 (unas 24 por misión) | 57 caracteres de media, 110 como máximo |
| Texto de diálogo | ~19.500 caracteres, unas 3.300 palabras | sin contar el texto de las ventanas |
| Toques para caminar | ~80 en todo el juego (1–9 por misión) | el objetivo siempre está a uno o dos toques |
| Ventanas (minijuegos, tablas, elecciones, preguntas, medallas) | ~75 | unas 5 por misión |
| …de ellas, preguntas tipo test | 21 al final de las misiones y 6 en el jefe final | **todas las misiones terminan con una** |
| …de ellas, retos de habilidad o de decisión con efecto | ~15 | amasar ×3, ojo de tasador, clasificar, presupuesto ×2, reparto, puertas, elecciones |
| Noches y viajes (pantalla de transición de unos 3 s) | ~34, más de 1,5 minutos | no se pueden saltar |
| Monedas al final | 48 (bot) | no hay nada en qué gastarlas |
| Líneas de Chispín | ~40 % de todas | la mascota explica en lugar de dejar descubrir |

Estimación (no medida con niños): leyendo a 90–120 palabras por minuto, solo los diálogos ocupan entre 30 y 35 minutos de una partida de una hora a hora y media. **Se lee bastante más de lo que se juega.**

## 3. Evaluación por área

| Área | Nota | Qué hace Valoria | Qué haría un gran RPG | Distancia |
|---|---|---|---|---|
| Bucle principal | 3 | Andar hasta el vecino, leer, abrir una ventana, contestar una pregunta y recibir una medalla. Cada misión es un guion distinto que no se repite. | Diablo: actuar y recibir algo en segundos, una y otra vez. Pokémon: explorar, encontrar, mejorar el equipo y superar un hito. Stardew: plantar, esperar, cosechar y reinvertir cada día. | Muy grande. El huerto podría ser ese bucle (y encaja con el interés compuesto), pero solo se usa cuando el guion lo pide. |
| Exploración y mundo | 3 | Cinco zonas de una pantalla (15 columnas), recorridas en línea hacia el sur. Durante la historia no se puede volver a una zona anterior. No hay secretos ni objetos escondidos. | Zelda y Pokémon: el mapa se abre poco a poco, hay atajos, rincones con premio y vuelta a sitios antiguos con algo nuevo. | Grande. El arte invita a explorar, pero explorar no da nada. |
| Progresión del personaje | 2 | No hay niveles, habilidades ni títulos. Solo cambian el gorro (estético) y los patines (te hacen 1,6 veces más rápido), y estos solo se consiguen en la misión del préstamo. | Diablo: el personaje se nota más fuerte en cada sesión. Pokémon: tu equipo sube de nivel y evoluciona. | Muy grande. |
| Criaturas compañeras | 2 | Seis criaturas que el guion regala. Te siguen por el mapa y tienen una frase en un panel. No tienen ningún efecto. El panel dice que Chispín «crece y evoluciona con los frutos de lo invertido», pero no hay código que lo haga. | Pokémon: criaturas que eliges, cuidas, usas en los retos y que crecen contigo. | Muy grande, y en la parte que más engancha a 8–12 años. |
| Recompensas | 5 | Una medalla por misión, una página del Legado y un reto en familia. Lo mejor: la zona recupera el color al ganar (captura `rpg_completa_m01_victoria.png` frente a `rpg_completa_m01_ir_hogaza.png`). Las monedas suben y bajan, pero no compran nada fuera del guion. | Diablo: recompensas variables que sorprenden. Pokémon: medallas que abren cosas nuevas en el mundo. | Media. La recompensa visual es buena. Falta lo variable y que las monedas sirvan para algo. |
| Sensación al jugar (*juice*) | 4 | Estallidos de partículas, 7 sonidos sintetizados, el pan que se aplasta al amasar, voz del sistema. Sin música. Las transiciones son pantallas negras con texto. | Diablo: cada acción tiene sonido, golpe visual y número. | Media o grande. |
| Ritmo y dificultad | 4 | No se puede fallar: las preguntas se repiten hasta acertar (`m15.ts`, líneas 36 y 42). En las cuatro puertas de la misión 12 la respuesta buena es siempre la segunda y la que lleva el icono de una criatura. Hay tensión en la historia (villanos), pero no en el juego. | Tensión y alivio: un reto que puede salir regular, con una pérdida suave y una segunda oportunidad. | Grande. Las reglas de CLAUDE.md permiten pérdidas suaves con aviso y no se usan. |
| Autonomía y decisiones | 4 | Hay alrededor de una decisión real por misión, y algunas son muy buenas (Prisas en la 5, el reparto de la 6, los trocitos de la 9, Deudón en la 11, la tormenta de la 14). Pero todas llevan a la misma medalla y casi ninguna cuenta después. Darle tus monedas a Don Chollo acaba igual que irte. | Pokémon: tu equipo es tuyo. Diablo: tu forma de jugar cambia lo que ocurre. | Media o grande. |
| Interfaz y legibilidad | 7 | Objetivo siempre visible, flecha sobre el destino, botones grandes, voz y textos cortos. Pegas: casi todo pasa en ventanas que tapan el mundo, y las pantallas de medalla (medalla, página y reto) son mucho texto para un niño de 8 años. | Pokémon: legibilidad total, poco texto en pantalla. | Pequeña. |
| Rejugabilidad y motivos para volver | 1 | Una sola historia lineal. Al terminar, el modo libre deja viajar entre zonas, pero **ningún vecino responde y el huerto no hace nada** (medido). No hay tiempo real ni nada que cambie mañana. | Animal Crossing y Stardew: volver mañana porque algo ha crecido. Diablo: volver porque el botín cambia. | Enorme. |

**Media ponderada: unos 4 sobre 10.** La interfaz y el arte suben la nota; la rejugabilidad, el personaje y las criaturas la hunden.

## 4. Fallos

### Graves

**G1. No hay bucle de juego: se lee más de lo que se juega, y cada misión acaba con un examen.**
- Qué pasa: cada misión es un guion de unas 24 líneas, unas 5 ventanas y 1–9 toques para caminar. Las 15 terminan con una pregunta tipo test (21 en total, más 6 en el jefe final). Contestar bien o mal no cambia nada: `Pregunta` devuelve si has acertado y ninguna misión lo usa.
- Dónde: en todas las misiones (`juego/src/misiones/m01.ts`–`m15.ts`, la llamada `this.ui.pregunta(...)` justo antes de `victoria()`). Capturas `med_m1_mXX_pregunta.png`.
- Por qué importa: un RPG engancha con un bucle corto que apetece repetir. Aquí el niño hace, sobre todo, de lector. Y una pregunta al final de cada misión es justo el «examen» que CLAUDE.md quiere esconder.
- Propuesta: cambiar la pregunta final por una **prueba jugada**. El concepto se demuestra haciendo, en el mundo: por ejemplo, el villano vuelve con una variante de su truco y el niño lo resuelve con lo que acaba de descubrir. Si la pregunta se queda, que sea opcional y dé algo (una pista o una semilla), no que cierre la misión.

**G2. El final del juego está vacío: «Seguir explorando» no lleva a nada.**
- Qué pasa: después de la misión 15, tocar a Hogaza, Tasador, Antojo o la señora Semilla no hace nada (medido en modo libre: ningún diálogo). Las parcelas tampoco responden. Solo se puede viajar entre zonas sin nada que hacer.
- Dónde: `juego/src/main.ts`, líneas 143–147. El modo libre no registra ninguna misión, así que nadie escucha los eventos `npc` y `parcela`. Capturas `med_m1_m15_fin.png` y `med_m1_libre.png`.
- Por qué importa: es justo cuando el niño está más encariñado. En Pokémon, después de la liga empieza otra parte del juego. Aquí se apaga.
- Propuesta: un modo libre con vida. Vecinos con frases nuevas según lo que hiciste, el huerto de cada zona sigue creciendo, encargos cortos y una «temporada» nueva de Merma (ver mejora 4).

**G3. Las monedas no sirven para nada.**
- Qué pasa: las monedas solo se gastan cuando el guion lo pide (13 sitios en el código, todos dentro de una misión). El bot acaba con 48 monedas y no hay tienda, mejoras, huerto ni nada en qué invertirlas.
- Dónde: `grep "monedas -="` en `juego/src/misiones/`.
- Por qué importa: en un juego sobre dinero, el dinero tiene que ser la herramienta del jugador, no un marcador. Stardew funciona porque cada moneda se convierte en una decisión.
- Propuesta: un uso permanente para las monedas que enseñe con sus reglas: semillas, abono, herramientas del huerto, trocitos de los talleres de la Ciudad (que suben y bajan con el péndulo) y una hucha que pierde brillo con Merma. Todo ello con precios del mundo, nunca con dinero real.

**G4. Las criaturas son decoración, y Chispín no cumple lo que promete.**
- Qué pasa: Brotín, Escudón, Repartija, Olfatín y Calmín llegan por guion (`estado.criaturas.push(...)` en las misiones 4, 6, 9, 10 y 14), te siguen y no tienen ningún efecto en el juego. El panel dice que Chispín «crece y evoluciona con los frutos de lo invertido» (`ui/minijuegos.tsx`, línea 415), pero no hay código que lo haga crecer.
- Por qué importa: el corazón de Pokémon es encariñarse con criaturas que crecen y que uno usa. Valoria tiene seis criaturas originales con conceptos preciosos y las desaprovecha. Y prometer algo que no pasa resta confianza.
- Propuesta: cada criatura es **una regla del mundo que el niño usa**. Brotín: al replantar, a veces sale una semilla de más. Escudón: protege una parcela de la helada. Repartija: si un taller cae, devuelve parte de lo perdido. Olfatín: marca las ofertas trampa en el mapa. Calmín: deja esperar una noche más en una tormenta. Chispín crece por etapas visibles según lo que el niño ha reinvertido en total, medido de verdad. Hasta que eso exista, hay que quitar la frase del panel.

**G5. No se puede fallar, ni siquiera de forma suave, y la respuesta buena se adivina.**
- Qué pasa: el jefe final (misión 15) son 6 preguntas que se repiten hasta acertar. En las 4 puertas de la misión 12, la respuesta buena es siempre la segunda y la que lleva el icono de una criatura amiga (`textos/m12.ts`, líneas 39–55), y `elegir` no baraja las opciones. Si le das tus monedas a Don Chollo (misión 10), recibes la misma medalla que si te vas.
- Por qué importa: sin riesgo no hay tensión ni alivio, y ganar pierde valor. La regla de Valoria es «nunca se pierde de golpe», no «nunca se pierde».
- Propuesta: consecuencias suaves y con aviso que se arrastren. Por ejemplo: lo que diste a Don Chollo no vuelve, pero Olfatín te ayuda a recuperar una parte en la misión siguiente, o la zona brilla un poco menos hasta que lo arreglas. Barajar las opciones de `elegir`. Un jefe final jugado que use las criaturas y el huerto, no un test.

### Importantes

**I1. Mundo pequeño, lineal y sin secretos.** Cada zona es una pantalla. Durante la historia, el panel Mapa solo deja viajar en modo libre (`ui/minijuegos.tsx`, línea 383), así que no se puede volver al Mercado para ver cómo va el huerto. No hay nada escondido. *Propuesta:* abrir el viaje a las zonas ya terminadas y esconder en cada zona 3–4 rincones con algo (una semilla rara, una página perdida del Legado, una frase de un vecino), con un contador de «secretos de la zona» en el mapa.

**I2. Amasar paga casi lo mismo hagas lo que hagas.** El pago va de 3 a 5 monedas: con 0 aciertos de 6 cobras 3 (`ui/minijuegos.tsx`, línea 27, `Math.max(3, ...)`). La habilidad apenas cuenta. *Propuesta:* pagar por aciertos (1 por golpe bueno y un extra por racha) y dejar repetirlo una vez por estación. Así el trabajo también enseña que esforzarse rinde.

**I3. El personaje no progresa.** No hay niveles, rasgos ni títulos. La única mejora con efecto en el juego (los patines, que dan 1,6 veces más velocidad en `mundo/mundo.ts`, línea 273) solo se consigue en la misión de la deuda pagando o pidiendo prestado. Quien elige lo prudente («No los necesito») se queda sin ella. *Propuesta:* una progresión que mida virtudes y no fuerza: «paciencia», «olfato», «calma», que suben con las decisiones y desbloquean cosas pequeñas y visibles (la mochila, ropa, la forma de Chispín). Los patines podrían conseguirse también ahorrando más adelante.

**I4. Ritmo frenado por transiciones.** Hay unas 34 noches o viajes de unos 3 segundos cada uno (`ui/controlador.ts`, `pasar_noche` y `viajar`) que no se pueden saltar, más esperas de 1–1,5 s en cada victoria. Más de minuto y medio de pantalla negra. *Propuesta:* poder tocar para acelerar, y animar la noche sobre el propio mapa (el huerto creciendo, el reloj girando) en lugar de un fundido a negro.

**I5. Se cuenta en vez de mostrar.** Chispín dice unas 4 de cada 10 líneas. Muchas conclusiones las pronuncia un personaje y luego las repite la pregunta. *Propuesta:* cortar un 30 % del diálogo, sobre todo el de Chispín, y que la tabla o el resultado hablen solos.

**I6. Sin música y con poco sonido.** Hay 7 efectos y ninguna música (también lo dice la auditoría). Sin música, las zonas no tienen identidad sonora. *Propuesta:* un tema corto por zona (que vuelve a sonar con más instrumentos a medida que la zona recupera el brillo) y un sonido de monedas que vuelan al contador.

### Menores

- **M1.** Al ganar la misión 1, el banner dice «¡La panadería vuelve a brillar!» con la barra todavía en «El Mercado brilla al 0 %». Sube 1,4 s después (`m01.ts`, `victoria`; captura `rpg_completa_m01_victoria.png`). El momento de gloria se ve desincronizado.
- **M2.** La pantalla de medalla junta tres bloques de texto (medalla, página y reto en familia): demasiado para 8 años. Mejor que la página del Legado se abra aparte, desde la Mochila.
- **M3.** Los 5 palitos del brillo junto a las monedas no se explican en ningún momento. Solo lo entiende quien abre la Mochila.
- **M4.** Las preguntas sí barajan las opciones, pero las ventanas `elegir` no. Ver G5.

## 5. Lo que ya funciona y no hay que tocar

- **El mundo que recupera el color.** La zona empieza gris y morada y se ilumina con cada victoria. Es una recompensa visual de primera y la mejor idea del juego.
- **Villanos que son conceptos** (Subeprecios, Prisas, Fachada, Don Chollo, Deudón, Euforio, Pánico, Merma). Se entienden y se recuerdan a la primera.
- **Las tablas que demuestran con números.** La bola de nieve (misión 4), los trocitos que crecen frente a Relámpago (misión 9, captura `med_m1_m09_tabla.png`) y la tormenta (misión 14) son el germen del bucle que falta.
- **Decisiones bien planteadas** en las misiones 5, 6, 11 y 14: son tentaciones reales, no preguntas.
- **Legibilidad**: objetivo arriba, flecha en el destino, voz, botones grandes y textos cortos.
- **Solidez técnica**: cuatro partidas del bot sin errores ni atascos, guardado por pasos y elección de héroe o heroína bien integrada.
- **El arte**: pixel art coherente y zonas con identidad propia (nieve, ladrillo, piedra, fiesta).

## 6. Las 5 mejoras con más impacto para el próximo sprint

Ordenadas por impacto entre esfuerzo, de mayor a menor.

1. **Huerto vivo como bucle central** (impacto muy alto, esfuerzo medio). En cada zona hay parcelas siempre disponibles: plantar, esperar una noche o una estación, cosechar y elegir entre vender o replantar. Las monedas compran semillas y abono, y Merma resta brillo a lo que está quieto en la hucha. Resuelve G1 y G3 y es el interés compuesto hecho regla. Las misiones pasan a ser hitos sobre ese bucle, como los gimnasios en Pokémon.
2. **Criaturas con efecto y Chispín que crece de verdad** (impacto alto, esfuerzo medio). Cada criatura modifica una regla del huerto o del mundo (G4). Chispín cambia de forma en 3 etapas según lo reinvertido. Es lo que da cariño y colección.
3. **Pregunta final sustituida por una prueba jugada, y consecuencias suaves que se arrastran** (impacto alto, esfuerzo bajo o medio). Quitar las 15 preguntas obligatorias, barajar `elegir`, que lo que pierdes con Don Chollo o Deudón se note un rato (con aviso y forma de recuperarlo) y un jefe final jugado con huerto y criaturas (G1 y G5).
4. **Modo libre y vuelta a zonas con vida** (impacto alto, esfuerzo bajo). Vecinos con frases nuevas tras cada misión (ya hay `charla_*` en los textos), poder viajar a zonas terminadas, el huerto de cada zona activo y 3–4 secretos por zona (G2 e I1). Es el primer motivo para volver.
5. **Ritmo y *juice*** (impacto medio, esfuerzo bajo). Amasar paga por habilidad (I2), las noches se pueden acelerar y se ven sobre el mapa (I4), las monedas vuelan al contador, hay un tema musical por zona que crece con el brillo (I6) y se recorta un 30 % el diálogo de Chispín (I5).

## 7. Lo que no he podido comprobar

- **Tiempos reales de un niño.** El bot avanza los diálogos al instante. Las duraciones y el reparto entre leer y jugar son estimaciones a partir del número de caracteres. La prueba con niños (`docs/prueba-con-ninos.md`) debería medir el tiempo por misión y en qué momento se aburren.
- **Audio y voz.** Corrí sin sonido. No he evaluado la voz del sistema ni los 7 efectos de oído.
- **Tacto en un móvil real.** Todo se jugó en Chromium emulando 390 × 844 px. No he probado vibración, latencia ni la sensación del dedo.
- **Datos de Pokémon, Diablo y los demás.** Las comparaciones son de diseño general. No cito cifras de esos juegos porque no he abierto fuentes con datos.
