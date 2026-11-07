# Evaluación de Valoria tras el sprint 3: QA y crítica como juego de rol

Fecha: 7 de noviembre de 2026 · Versión evaluada: sprint 3 completo (tareas A, B y C integradas; HEAD `f071e7f`) · Evaluación anterior: `docs/evaluacion-rpg.md` (sprint 2, **4 sobre 10**).
Listón: el mismo que la primera vez (Pokémon y Diablo, con Stardew Valley y Animal Crossing de apoyo). No hay combate, compras ni cajas de botín, y eso no cuenta como fallo.

## 1. QA

### Veredicto: **APROBADA**

No he encontrado ningún fallo grave. El sprint cumple sus criterios (secciones 14 y 15 de `docs/especificaciones/sprint-3-bucle.md`) y las partidas antiguas cargan y se terminan. Quedan cinco fallos menores, tres de ellos ya presentes en el sprint 2.

### Qué he comprobado

| Prueba | Resultado |
|---|---|
| `npm install`, `npm run build`, `npx tsc --noEmit` | Bien. `dist/index.html` de 746 kB. |
| `python3 qa/reino.py` (tarea A) | RESULTADO OK. |
| `python3 qa/huerto.py` (tarea B) | TODO BIEN: 10 toques por noche y siesta saltada en menos de 1,5 s. |
| `python3 qa/vida.py` (tarea C) | Las pruebas 1 a 8 dan «ok». Lo corté por tiempo mientras relanzaba la partida completa, que ya cubre la mía. |
| `python3 qa/guardado.py` y `qa/guardado_4_15.py` | RESULTADO OK las dos. |
| `python3 qa/sim_economia.py` | Pasa. Con el perfil «acapara», 132 frutos van a la compostera en 10 días. |
| Partida completa (`qa/bot.py first 60000 eval`) | `('FINAL',)` en 533 s y 5.322 pasos, sin `[pageerror]`. Acaba con 48 monedas, 0 ladrillos y 0 tierras (el bot no compra). |
| Recargar a mitad del huerto (script propio `qa/.build/qa_eval.py`, prueba A) | Recargar justo después de cosechar conserva la cesta y el huerto. Recargar a los 1,5 s y a los 2,6 s de una siesta deja un estado coherente (la noche cuenta una vez). Ver M-QA1 para el caso de los 0,4 s. |
| Recargar a mitad de un viaje (prueba A en modo libre; prueba B en la misión 8) | En la misión 8, al recargar a mitad del viaje de ida y del de vuelta se abre en la Ciudad, en `ir_lupa`, con la flecha y con lo plantado en el Mercado. Después el bot termina la misión. En modo libre se abre en la zona de destino. Sin errores. |
| Partida del sprint 2 en la misión 8, sin campos del reino (prueba C) | Migra a Merma 1, brillo 4, `tiempo` 14 (15 tras la noche de vuelta) y `eleccion_m01` «hucha», y sale «¡Buenos días!». Juega sin errores las misiones 8 a 11 y llega a la 12, donde el bot da vueltas en las puertas (ver la nota bajo los fallos). Otra partida del sprint 2 sembrada en la misión 12, puerta 2 (`qa/.build/s2_m12.py`), migra y se termina hasta el modo libre en 69 s, sin errores, con Merma bajando de 2 a 1 al apagar la máquina. |
| Marcas `{…}` sin resolver | Ninguna en `#ui` ni en el texto de la misión: en las ventanas de las misiones 8 a 15, los puestos, la obra, «¡Buenos días!» y los cuatro paneles. |
| Textos de menos de 11 px | Ninguno. |
| Peticiones a terceros | Ninguna: ni en las páginas (escuchando `request`) ni en el HTML (`grep` de URL). |

### Fallos (todos menores)

- **M-QA1. Si se recarga en el primer segundo de una siesta, se pierde la siesta y no pasa la noche.** `tiempo.usar_siesta()` suma `siestas_dia` antes de que `pasar_noche()` llame a `reino.noche()` (0,9 s después), y ese contador llega al guardado. *Cómo reproducirlo:* modo libre, panel Huerto → «Dormir una noche», recargar antes de 0,9 s. El resultado es `siestas_dia` 0 → 1 con `tiempo` igual. *Esperado:* o se gastan las dos cosas o ninguna. Basta con guardar después de `noche()`.
- **M-QA2. Hay encargos que el jugador no puede cumplir.** Dos de los seis encargos (Copo y Raíz) piden manzanas. Quien no ha plantado un manzano en el Valle no puede cumplirlos ese día, porque el árbol tarda 5 noches. En mi sesión de 4 días, el día 3 tocó «Copo quiere 3 manzanas» sin ningún manzano en el huerto. *Esperado:* que el encargo del día pida un fruto que el jugador ya cultiva, o que avise con tiempo.
- **M-QA3 (ya en el sprint 2). El botón Voz/Mudo mide 56 × 39 px**, por debajo de los 44 px de CLAUDE.md (`.btn.voz { min-height: 36px }` en `estilos.css`). Sale en todas las capturas.
- **M-QA4 (ya en el sprint 2, era M1). Al ganar la misión 1**, el banner dice «¡La panadería vuelve a brillar!» con la barra todavía en «El Mercado brilla al 0 %» (captura `eval_m01_victoria.png`).
- **M-QA5. El título de «¡Buenos días!» lleva un cuadrado amarillo liso** (`<i className="sol">`) en lugar de un dibujo (captura `hd_d3_buenosdias.png`). Es solo pulido.

Nota para las herramientas de QA (no son fallos del juego): `qa/bot.py` se queda dando vueltas en la ventana de trocitos de la misión 9 si entra con 25 monedas, porque marca y desmarca el mismo trocito. A mano funciona. En la prueba C, el script compra un trocito como lo haría un niño. Las puertas de la misión 12 siguen siendo lentas para el bot, que elige siempre la primera opción.

## 2. Crítica: nota nueva

**Nota como juego: 5 de 10** (antes, 4).

El sprint 3 ha hecho lo más difícil: Valoria ya tiene **un bucle propio**. Plantar, regar deslizando, cosechar todo con un toque, vender, comprar tierra y dormir es rápido, se entiende sin explicaciones y enseña con sus reglas. Por primera vez las monedas se gastan en algo que importa: en mi sesión nunca pasé de 39 en la mano. Pero el resto del juego no se ha movido. Las 15 misiones tienen el mismo texto (65.194 caracteres frente a 65.178), siguen terminando con 21 preguntas tipo test, las criaturas no hacen nada y el personaje no crece. Y el bucle, bien hecho, es todavía monótono: al cuarto día cada noche es igual a la anterior. Sube un punto porque arregla dos de los cinco fallos graves; no sube más porque los otros tres siguen ahí.

### Cómo lo he medido

- La partida completa del bot (arriba), reutilizando sus capturas (`qa/.build/capturas/eval_*`).
- **Cuatro días de «modo huerto»** con un script propio (`qa/.build/huerto_dias.py`), en modo libre, a 390 × 844 px. Los toques son reales: clics y gestos del ratón sobre el mapa y los botones, contados con `pointerdown`. Cada día cambio la fecha a «ayer» y recargo, como hace `qa/vida.py`. Estrategia de un jugador aplicado:
  - trabajar con Hogaza (jugando el minijuego de verdad);
  - en cada noche (la de vuelta y dos siestas): cosechar, plantar lo vacío, regar las filas, cumplir el encargo si se puede, vender todo, comprar tierra si sobran 4 monedas o semillas si faltan, y poner 5 ladrillos si hay más de 30 monedas.

  El héroe camina hasta los vecinos, salvo cuando están fuera de la pantalla: entonces el script lo coloca cerca. Eso acorta el tiempo, no los toques.
- Partida del sprint 2 migrada (prueba C) para ver el huerto durante la historia, y la prueba B (viajar al Mercado en mitad de la misión 8).
- Lectura del código nuevo (`reino/`, `ui/puesto.tsx`, `ui/paneles_huerto.tsx`, `textos/huerto.ts`, `textos/vecinos.ts`) y comparación de los textos con `main`.

### Cifras (sección 15.4)

| Medida | Valor | Comentario |
|---|---|---|
| **Toques por noche** | **13 de media** (7 a 22) en 12 noches | 7 en una noche sencilla (cosechar, regar dos filas, vender, dormir). De 13 a 22 si se compra tierra o semillas, se plantan bancales nuevos o se cumple el encargo. `qa/huerto.py` mide 10 con 12 bancales. La especificación pedía 12 o menos: se cumple en la noche típica. |
| Tiempo por noche | 5–14 s de script | Un niño, con la caminata y leyendo, tardaría más o menos el doble (estimación). |
| Trabajo con Hogaza | 10 toques, 11 monedas al día | Paga tanto como vender una noche entera de 9 bancales (11–23). |
| **Monedas al final** | Bot de la historia: **48** (no usa el huerto). Mi sesión: **entre 6 y 39 en la mano**, 28 al acabar el día 4 | El dinero circula: todo lo que entra se convierte en tierra, semillas o ladrillos. En la historia, quien no toca el huerto acaba igual que en el sprint 2. |
| **Uso de puestos** | 19 aperturas en 12 noches: 10 ventas a Tasador, 4 tierras (10, 16, 26 y 40), 4 tandas de semillas | La bola de nieve se ve: de 8 a 12 bancales en 3 días. |
| **Encargos** | 3 de 4 cumplidos | El que faltó pedía manzanas y yo no tenía manzano (M-QA2). |
| **Obra del molino** | 25 ladrillos en 4 días (etapa 1, «Rueda») | Las 4 etapas piden 150 ladrillos: a este ritmo, unos 24 días. Es una meta de ahorro de verdad, pero la etapa 2 queda lejos (30). |
| **Frutos a la compostera** | **0** en mi sesión; 132 en 10 días con el perfil «acapara» de `sim_economia.py` | Quien vende cada noche no pierde nada. La caducidad castiga a quien guarda, como se buscaba. |
| **Leer frente a hacer en el huerto** | 23 globos (1.264 caracteres) frente a unos 196 toques (156 en las noches y 40 trabajando) | Unos 8 toques por globo: el huerto se juega, no se lee. |
| **Leer frente a hacer en la historia** | Igual que en el sprint 2: unas 355 líneas de diálogo y 21 preguntas finales | `textos/m*.ts` no ha cambiado. Hay 216 cadenas nuevas (7.142 caracteres) de vecinos y huerto. |
| Noches y viajes | Ahora **se saltan tocando** (menos de 1,5 s) | Era I4. |

### ¿Apetece volver? (cuatro días de juego)

- **Días 1 y 2: sí.** «¡Buenos días!» resume lo que ha crecido y el encargo del día. La primera tierra dispara «¡Bola de nieve! Lo cosechado ya planta más tierra». La calabaza sale «+5 ¡Buena!» o floja, la rueda del molino aparece en el mapa y el contador de monedas sube y baja con sentido. Para un niño de 8 a 10 años, el gesto de regar deslizando y el «cosechar todo de un toque» se sienten bien.
- **Días 3 y 4: menos.** Con 12 bancales, cada noche es la misma secuencia de 7 toques: no hay ninguna sorpresa ni ningún evento, y el «¡Buenos días!» trae siempre lo mismo. Lo único que cambia es el número de ladrillos, que avanza muy despacio (5 por noche buena). Al acabar las 8 tierras, la bola de nieve se para (como avisó la revisión del sprint 3). Un niño de 12 años que juega a Pokémon lo vería como una tarea diaria de un minuto, no como un motivo para volver.
- Conclusión: **el hábito está, la ilusión todavía no.** Faltan la sorpresa (eventos, semillas raras, Brotín que da una semilla extra), la meta intermedia (un premio a los 15 o 20 ladrillos) y algo propio que crezca (Chispín).

## 3. Evaluación por área

| Área | Sprint 2 | Sprint 3 | Qué ha cambiado | Qué falta para un gran RPG |
|---|---|---|---|---|
| Bucle principal | 3 | **6** | Hay un bucle corto y propio: plantar, regar, cosechar, vender y ampliar, en 7–13 toques por noche, con decisiones (qué plantar, vender o guardar para el encargo, tierra o ladrillo). | Las misiones siguen siendo guiones de lectura con examen al final, y el huerto no tiene variación: cada noche es igual a la anterior. |
| Exploración y mundo | 3 | **5** | Se viaja a las zonas abiertas también durante la historia. Hay 7 secretos en el Mercado y el Valle, con contador en el Mapa, y los 19 vecinos responden en modo libre. | La Ciudad, la Torre y el Reloj no tienen nada nuevo. Los secretos son pocos y se agotan en una tarde. |
| Progresión del personaje | 2 | **3** | Crece el huerto (bancales, molino), no el personaje. | Ni niveles, ni equipo, ni rasgos (sprint 4). |
| Criaturas compañeras | 2 | **2** | Se ha quitado la promesa falsa del panel de Chispín: ahora el juego es honesto. | Siguen sin ningún efecto. Es lo que más engancha a 8–12 años, y está intacto. |
| Recompensas | 5 | **6** | Las monedas compran cosas que cambian el mundo (tierras, etapas del molino). «+3 ¡Buena!», la bola de nieve, el encargo pagado a 1,5 veces y el regalo diario. | Nada variable que sorprenda. Entre la etapa 1 y la 2 del molino hay 20 ladrillos sin ningún premio. |
| Sensación al jugar (*juice*) | 4 | **5** | Salpicaduras al regar con un tono que sube, números flotantes, pulso del contador y noche que se salta. | Sin música. Plantar y cosechar apenas tienen animación. El sol de «¡Buenos días!» es un cuadrado. |
| Ritmo y dificultad | 4 | **5** | Riesgo suave de verdad: calabaza floja, frutos que caducan con aviso «pocho mañana», Merma que sube con aviso. La noche se salta. | La historia sigue sin poder fallarse. La misión 12 sigue adivinable y `elegir` no baraja. |
| Autonomía y decisiones | 4 | **6** | El niño decide qué hacer con su dinero cada noche: ampliar, ahorrar para el molino o cumplir el encargo. Quien acapara pierde frutos en la compostera. | Las decisiones de la historia siguen sin consecuencias (Don Chollo da la misma medalla). |
| Interfaz y legibilidad | 7 | **7** | Puestos claros, con «Vender todo · +23» grande y «pocho mañana» marcado. Panel Huerto y «¡Buenos días!» legibles. Nada por debajo de 11 px. | El botón Voz sigue en 39 px y queda el banner desincronizado de la misión 1. La pantalla se llena: HUD, ficha de herramienta, avisos y objetivo. |
| Rejugabilidad y motivos para volver | 1 | **5** | Noche de vuelta, «¡Buenos días!», encargo diario, 2 siestas al día, trabajo diario y modo libre con vida. | Cada día es igual. No hay temporadas, eventos ni colección, y el molino es una meta larga sin hitos intermedios. |

**Media: 5,0 sobre 10.** Sube todo lo que tocaba el sprint (bucle, autonomía, volver). Lo que no tocaba (criaturas, personaje, misiones) sigue hundiendo la nota.

## 4. Fallos de la evaluación anterior

| Fallo (sprint 2) | Estado | Por qué |
|---|---|---|
| **G1** Se lee más de lo que se juega; examen al final | **Parcial** | Resuelto en el huerto (unos 8 toques por globo). En la historia, nada: el mismo texto y las mismas 21 preguntas finales (`ui.pregunta(` en las 15 misiones). Previsto para los sprints 5 y 6. |
| **G2** El final está vacío | **Resuelto** | En modo libre, los 19 vecinos responden (`qa/vida.py`, prueba 1), y hay huerto, puestos, encargos, trabajo, obra y secretos. Falta que algo cambie con el tiempo (temporadas, sprint 5). |
| **G3** Las monedas no sirven | **Resuelto** | Semillas, abono, 8 tierras, regadera, ladrillos y encargos. Merma sube los precios con aviso. En mi sesión nunca pasé de 39 monedas en la mano. En la historia sin huerto se acaba con 48, como antes, pero ya hay en qué gastarlas. |
| **G4** Criaturas decorativas; Chispín no cumple | **Parcial (mínimo)** | Se quitó la frase falsa del panel. Las criaturas siguen sin efecto (sprint 4). |
| **G5** No se puede fallar; respuesta adivinable | **Parcial** | Hay riesgo suave en el huerto (calabaza floja, caducidad, Merma). La historia no cambia: la misión 12 se adivina, `elegir` no baraja (`ui/controlador.ts` solo baraja `pregunta`) y Don Chollo da la misma medalla. |
| **I1** Mundo lineal sin secretos | **Parcial** | Se viaja durante la historia y hay 7 secretos, pero solo en el Mercado y el Valle. |
| **I2** Amasar paga casi igual | **Resuelto** | Paga de 3 a 11 según los aciertos, una vez al día (`qa/huerto.py`). |
| **I3** El personaje no progresa | **No** | Sin cambios (sprint 4). |
| **I4** Transiciones lentas | **Resuelto en lo esencial** | Las noches y los viajes se saltan tocando (menos de 1,5 s). Siguen siendo fundidos a negro; la noche animada sobre el mapa queda para el sprint 6. |
| **I5** Se cuenta en vez de mostrar | **No** | El diálogo de Chispín no se ha recortado. |
| **I6** Sin música | **No** | Sin música (sprint 6). Hay un sonido nuevo de riego con tono. |
| **M1** Banner y barra desincronizados en la misión 1 | **No** | Sigue (`eval_m01_victoria.png`). |
| **M2** Pantalla de medalla con tres bloques de texto | **No** | Sin cambios. |
| **M3** Los palitos del brillo no se explican | **Parcial** | Ahora parpadean al cambiar y Merma lo cuenta en el puesto y en los avisos («Tus monedas brillan menos»). |
| **M4** `elegir` no baraja | **No** | Sprint 5. |

## 5. Fallos nuevos

### Importantes

**N1. El bucle no sorprende: al tercer día cada noche es idéntica.**
- Qué pasa: con 12 bancales, una noche es cosechar, regar dos filas, vender y dormir (7 toques), siempre igual. La única variación es que la calabaza salga buena o floja. No hay eventos, semillas raras ni visitantes.
- Dónde: `reino/reglas.ts` (`suerte`, `cosechar`); sesión `qa/.build/huerto_dias.py`, días 3 y 4.
- Por qué importa: en Diablo y en Stardew, el bucle aguanta porque cada vuelta trae algo distinto. Sin eso, el hábito se vuelve tarea.
- Propuesta: recompensa variable que salga de las reglas. Una de cada 8 cosechas trae una semilla rara (una variedad nueva con una regla distinta). Brotín, en el sprint 4, «encuentra» semillas al replantar. Un visitante del día compra a mejor precio un fruto concreto.

**N2. El rábano casi no rinde y el molino no tiene hitos intermedios.**
- Qué pasa: replantar se queda un fruto, así que un rábano normal deja 1 en la cesta (`cosechar`: `a_cesta = frutos - 1`). Doce bancales dan unas 11–23 monedas por noche, lo mismo que un solo trabajo con Hogaza (11). Un ladrillo cuesta 5: la etapa 2 del molino (30 ladrillos) queda a unos 6 días y la obra entera (150) a unos 24.
- Por qué importa: el niño no siente que su huerto «produzca»: amasar 10 toques rinde lo mismo que todo el huerto en una noche. Y una meta a 24 días sin premios en medio se abandona.
- Propuesta: mostrar el rendimiento neto en la cosecha («+2, 1 vuelve a la tierra») para que se entienda. Revisar que el huerto lleno rinda claramente más que el trabajo. Dar un pequeño hito visual cada 10 ladrillos (andamio, banderín, vecino que lo comenta).

**N3. El huerto y la historia apenas se tocan.** Durante la historia, el bot termina las 15 misiones sin cultivar nada y acaba con 48 monedas: ninguna misión pide algo del huerto ni lo usa. El plan dice que las misiones son «hitos sobre el bucle», pero hoy son dos juegos en paralelo. *Propuesta:* que algunas misiones pidan o premien algo del huerto (Hogaza necesita 6 rábanos para la feria; Don Chollo quiere comprarte la cosecha a un precio trampa).

### Menores

- **N4.** Encargos imposibles para quien no tiene manzano (M-QA2).
- **N5.** En modo libre, la pantalla lleva a la vez el contador, la estación, el objetivo, la ficha de herramienta, los avisos y el número del Huerto. Para un niño de 8 años hay demasiadas cosas a la vez: el objetivo de modo libre («toca el mapa para viajar») podría ocultarse tras unos segundos.
- **N6.** La siesta se pierde si se recarga en el primer segundo (M-QA1).

## 6. Lo que ya funciona y no hay que tocar

- **Cosechar todo de un toque y regar deslizando.** Es el corazón del bucle y se siente bien: no lo convirtáis en tareas de un toque por bancal.
- **«¡Buenos días!»** como bienvenida diaria: corto, con iconos, con el encargo y el regalo.
- **La cesta con «pocho mañana» y la compostera:** castigo suave, con aviso, que enseña sin regañar.
- **Merma que sube con aviso** y el puesto que lo cuenta con una frase («Merma lo encarece todo. Al menos, tus frutos también valen más.»).
- **La primera tierra y la «bola de nieve»:** el mejor momento pedagógico del sprint.
- **El guardado:** recargas a mitad de viaje y de huerto sin perder nada (salvo el caso de la siesta) y migración limpia del sprint 2.
- Todo lo que ya funcionaba en el sprint 2: el mundo que recupera el color, los villanos que son conceptos, el arte y la legibilidad.

## 7. Las 5 mejoras con más impacto para el sprint 4

El plan v2 reserva el sprint 4 para criaturas, progresión, talleres y caprichos. Mi orden tiene en cuenta ese plan y lo que he medido:

1. **Criaturas que cambian las reglas del huerto, y Chispín que crece de verdad** (impacto muy alto, esfuerzo medio). Es el área con la nota más baja y la que más engancha a 8–12 años. Además resuelve la monotonía (N1): Brotín da a veces una semilla extra al replantar, Escudón protege un bancal y Calmín permite una noche más. Chispín, en 3 formas según `total_replantado` (ya se guarda: 89 en mi sesión de 4 días), con un aviso visible cuando esté cerca de cambiar.
2. **Recompensa variable dentro del bucle** (impacto alto, esfuerzo bajo). Semillas raras ocasionales, un visitante del día que compra caro un fruto concreto e hitos visuales del molino cada 10 ladrillos (N1 y N2). Sin cajas de botín: todo sale de las reglas y se ve antes de decidir.
3. **Talleres de la Ciudad y puesto de caprichos de Antojo** (impacto alto, esfuerzo medio, ya en el plan). Cuando se llenan los 12 bancales (día 3 en mi sesión), el dinero necesita una inversión nueva con riesgo y un gasto que dé alegría. Si no, la bola de nieve se para justo cuando debería acelerar.
4. **Unir el huerto con las misiones** (impacto alto, esfuerzo bajo o medio). Que 4 o 5 misiones (1, 3, 4, 10 y 14) pidan o usen frutos, tierras o monedas del huerto (N3), y que los encargos solo pidan frutos que el jugador ya cultiva (N4). Así las misiones son de verdad «gimnasios» sobre el bucle.
5. **Progresión del hortelano con equipo visible** (impacto medio o alto, esfuerzo medio, ya en el plan). Niveles que suben con lo cosechado y lo replantado y desbloquean cosas pequeñas y visibles: mochila más grande, botas, patines también ahorrando. Es el «me he hecho más fuerte» de Diablo, sin combate.

Aparte, de pocas líneas y fuera del orden: guardar después de `noche()` en la siesta (M-QA1), subir el botón Voz a 44 px (M-QA3) y sincronizar el banner de la misión 1 (M-QA4).

## 8. Lo que no he podido comprobar

- **Tiempos de un niño.** El bot y mis scripts no leen ni dudan. Las duraciones son de script; las de un niño, una estimación.
- **Audio y tacto.** Corrí sin sonido, en Chromium emulando 390 × 844 px, sin un móvil real.
- **Las semanas de juego.** Jugué 4 días de juego cambiando la fecha. No he visto cómo sube Merma durante la historia en partidas de varias semanas, ni el nivel 4 tras el final.
- **Los efectos del huerto en el Valle (manzanos).** Mi sesión jugó solo en el Mercado. Los manzanos los comprueba `qa/huerto.py` (prueba 8), no yo jugando.
