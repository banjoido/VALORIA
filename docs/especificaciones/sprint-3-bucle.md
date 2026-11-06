# Sprint 3 · El bucle: huerto vivo y economía, y modo libre con vida

Fecha: 6 de noviembre de 2026 · Autor: diseñador · Rama: `sprint-3/bucle`
Plan general: `docs/plan-juego-v2.md`. Evaluación de partida: `docs/evaluacion-rpg.md` (G1, G2, G3, I1, I2, I4).
Simulación de la economía: `qa/sim_economia.py` (sección 7).

## 0. Resumen

Después de la misión 2, el niño tiene **su propio huerto** junto a la casa de la señora Semilla. Planta, riega, cosecha y elige entre **replantar o guardar en la cesta**; vende a Tasador y compra semillas, abono, herramientas y tierras. El tiempo avanza con **las noches del reino**: las de las misiones, **dos siestas al día** y **la noche de vuelta** cuando vuelve otro día. **Merma** sube los precios cada dos días jugados, con aviso, y la hucha pierde brillo. Puede **viajar a las zonas ya abiertas** también durante la historia; los vecinos tienen frases nuevas según lo que ha pasado, y hay **3 secretos** en el Mercado y 3 en el Valle.

Fuera de este sprint: efectos de las criaturas, Chispín que evoluciona, niveles, talleres de la Ciudad, caprichos, eventos (helada, fiesta, tormenta) y quitar las preguntas finales. Ver `docs/plan-juego-v2.md`.

## 1. Qué descubre el niño (sin que nadie se lo explique)

1. **Replantar gana a venderlo todo.** Si vende todos los rábanos y vuelve a comprar semillas, se queda casi igual. Si replanta uno de cada bancal, gana el doble.
2. **Lo que tarda más da más.** La calabaza tarda tres noches y da más por noche que el rábano. El manzano tarda cuatro y luego da fruta cada noche sin replantar.
3. **Las monedas quietas compran menos.** Cada dos días, Merma sube los precios. Lo que guardó en la hucha compra menos semillas; sus frutos, en cambio, se venden más caros.
4. **Cuidar compensa.** Lo regado nunca sale flojo. El abono rinde en lo que crece despacio, no en el rábano.
5. **Más tierra, más cosecha.** Una tierra nueva cuesta, pero multiplica todo lo demás.
6. **Volver tiene premio.** Mientras no está, el huerto crece y Chispín le guarda un regalo.

## 2. Una sesión de ejemplo (día 2, misión 5 en curso)

1. Abre el juego. Pantalla **«¡Buenos días!»**: «Ha pasado una noche. Mercado: 6 rábanos listos. Chispín ha encontrado una semilla de calabaza.» Toca «¡A jugar!».
2. La misión 5 está en el Valle. Abre el **Mapa** y viaja al Mercado (botón «Viajar»).
3. Toca un bancal con fruto: se cosechan los cuatro a la vez («+2», «+3 ¡Buena!», «+2», «+1»). Ventana: «¡8 rábanos!» → **Replantar 4 bancales**. Quedan 4 rábanos en la cesta.
4. Toca a Tasador: vende los 4 rábanos (+8). Toca a la señora Semilla: compra una tierra nueva (12) y planta en ella la calabaza del regalo.
5. Riega los bancales tocándolos uno a uno (salpicadura azul). Abre el panel **Huerto** → «Dormir una noche (quedan 2 hoy)». Toca la pantalla de la noche para saltarla. Los rábanos ya están listos: vuelve a cosechar.
6. Vuelve al Valle desde el Mapa y sigue la misión 5 donde la dejó.

## 3. Los bancales: dónde, cuándo y cómo conviven con las misiones

### 3.1 Celdas

Todas las celdas ya son de tierra en el dibujo del mapa; no hay que pintar mapas nuevos.

| Zona | Celdas (x, y) | Tipo | Se abre | Cómo |
|---|---|---|---|---|
| Mercado | (2,4) (3,4) (4,4) (5,4) | bancal | al ganar la misión 2 (`estado.mision > 2`) | gratis |
| Mercado | (2,5) (3,5) (4,5) (5,5) | bancal | al ganar la misión 3 (`estado.mision > 3`) | gratis: «el bancal de la señora Semilla». Son las parcelas de la historia (`MAPAS.zonas.mercado.parcelas`) |
| Mercado | (2,3) (3,3) (4,3) (5,3) | bancal | desde que se abre el huerto | **tierra nueva** a la venta, de izquierda a derecha (ver 6.4) |
| Valle | (9,24) (11,24) (13,24) | hoyo de árbol | al ganar la misión 5 (`estado.mision > 5`) | gratis (el plantón se compra a Copo) |

- Ciudad, Torre y Reloj no tienen huerto en este sprint (los talleres llegan en el sprint 4).
- Las parcelas del Valle de la misión 4 (`(1..4, 9..10)`) siguen siendo de la historia y no se tocan. Fuera de la misión 4, tocarlas da una frase de Chispín (textos, 12.2).
- Los árboles miden 2 losetas de ancho (sprites `arbol_1`…`arbol_4`, 26 × 34 px): por eso los hoyos van separados por una columna. La casilla del pie de un árbol plantado es sólida (como el árbol de la misión 5: se suma a `Mapa.extra_solidos`, sin quitar el de la misión 5). Se toca en su casilla y en la de encima.

### 3.2 Convivencia con las misiones (nada de lo que ya existe cambia de significado)

- **Un evento nuevo.** `Mundo.tocar` comprueba primero las celdas de huerto de la zona (`reino.bancales(zona)`, que solo devuelve las abiertas o a la venta según `estado.mision`) y emite **`"huerto"`**, no `"parcela"`. Las misiones no escuchan `"huerto"`: sus manejadores de `parcela()` no ven nunca el huerto propio.
- **Inventario aparte.** El huerto propio usa `estado.huerto`, `estado.bolsa` y `estado.cesta` (sección 11). `estado.brotes`, `estado.semillas` y `estado.frutos` siguen siendo solo de la historia: la misión 4 puede poner `estado.frutos = 0` y la 6 restarle 24 sin tocar la cesta.
- **Las monedas sí se comparten.** Es la herramienta del jugador. Ninguna misión se bloquea por falta de monedas: todas las compras de la historia tienen otra opción («Ahora no», préstamo, esperar). La regadera de la misión 2 se compra antes de que exista el huerto, y Hogaza paga como mínimo 3.
- **Fila 5 del Mercado.** Al empezar la misión 4 (o al cargar una partida con `estado.mision > 3`), los brotes de la historia que queden en el Mercado se quitan de `estado.brotes` y pasan a la cesta: 1 rábano por brote, 2 si tenía fruto. Se hace una sola vez (`estado.bancal_semilla = true`). Desde entonces esas cuatro celdas son bancales del huerto.

## 4. Semillas, cuidados y cosecha

### 4.1 Lo que se planta (números del juego; los precios dependen de Merma, sección 6.2)

| Cultivo | Dónde | Desde | Noches hasta estar listo | Da | Se replanta |
|---|---|---|---|---|---|
| **Rábano** | bancales | misión 2 | 1 | 2 rábanos | sí: 1 rábano de la cosecha vuelve al bancal |
| **Calabaza** | bancales | misión 4 (Copo) | 3 | 3 calabazas | sí: 1 calabaza vuelve al bancal |
| **Manzano** | hoyos del Valle | misión 5 | 4 para crecer | desde la 5.ª noche, 2 manzanas **cada noche**, hasta 4 en el árbol | no hace falta: el árbol se queda para siempre |

- «Desde» quiere decir al ganar esa misión (`estado.mision > N`).
- Un fruto de rábano o calabaza **también es semilla** (como en la misión 4). Al plantar se usa primero la bolsa y luego la cesta.
- Dibujo de la planta según las noches que le faltan:
  - rábano: `brote_chico` → `brote_fruto` (listo);
  - calabaza: `brote_chico` (3 noches), `brote_grande` (2 y 1 noches), `calabaza_lista` (sprite nuevo, 13 × 13);
  - manzano: `arbol_1` (recién plantado), `arbol_2` (noches 1–2), `arbol_3` (noches 3–4 o sin manzanas), `arbol_4` (con manzanas).
- Un bancal regado se pinta con la tierra más oscura (capa `rgba(43,34,48,0.25)` sobre la loseta) hasta que se cosecha.
- Las 4 tierras a la venta se pintan con un cartel pequeño (sprite nuevo `cartel_venta`, 13 × 13, con una moneda).

### 4.2 Cuidar

- **Regar.** Tocar un bancal plantado y aún no regado, con la regadera de hierro (`estado.regadera === "hierro"`), lo riega. Basta una vez por siembra. Con la regadera reluciente o sin regadera no se puede regar: Chispín lo dice y Yunque vende la de hierro (6.1).
- **Abono.** Tocar un bancal ya regado (o sin regadera), plantado, sin abono y con abono en la bolsa pregunta «¿Le pones abono? Dará 2 frutos más.» (Sí / Ahora no). En un manzano, el abono suma 2 manzanas a su siguiente noche.
- En cualquier otro caso, tocar un bancal que crece muestra un texto flotante: «Lista tras una noche» o «Lista en {n} noches».

### 4.3 Cosechar: suerte suave, nunca cero

Al tocar un bancal listo se cosechan **todos los bancales listos de la zona** (como en la misión 4). Para cada bancal:

| | Cosecha buena | Normal | Floja |
|---|---|---|---|
| **Regado** | 30 %: +50 % redondeando hacia arriba (rábano 3, calabaza 5) | 70 % | nunca |
| **Sin regar** | 10 % | 70 % | 20 %: 1 fruto menos (como mínimo 1) |
| **Con abono** | se suman 2 frutos después de la suerte | | |

La suerte usa `Math.random()`, pero la función recibe el azar como parámetro para poder probarla (sección 14).

Después aparece una ventana `elegir`:
- título «¡{n} frutos!» (icono `fruto`);
- **«Replantar {b} bancales»** (icono `huerto`): en cada bancal cosechado se planta otra vez el mismo cultivo con 1 de sus frutos; el resto va a la cesta. Si la cesta no tiene frutos de ese cultivo (no puede pasar justo después de cosechar), ese bancal se queda vacío;
- **«Todo a la cesta»** (icono `fruto`).

La primera vez que replanta, Chispín dice una frase (12.2). La primera cosecha floja, también.

**Manzanos.** Tocar un manzano con manzanas las pasa todas a la cesta (texto flotante «+{n}»). Con 4 manzanas, el árbol está lleno y no da más hasta que se recojan («¡El árbol está lleno!» al pasar la noche). Esto premia volver sin castigar: nada se pudre.

## 5. El tiempo del reino

### 5.1 Las noches

`estado.tiempo` cuenta **todas las noches del reino** desde el principio y solo sube. Cada noche, cada planta suma una noche (`edad`) y cada manzano crecido da sus manzanas. Hay tres clases:

| Noche | Cuándo | Tope |
|---|---|---|
| **De misión** | cada `interfaz.pasar_noche()` de una misión (unas 30 en toda la historia) | sin tope: la historia es finita |
| **Siesta** | botón «Dormir una noche» del panel Huerto, cuando no hay misión hablando (`!estado.ocupado`, sin ventana abierta) | **2 por día real** (`estado.siestas_dia`) |
| **De vuelta** | al abrir el juego en un día real nuevo | **1**, o **2** si han pasado 2 días o más |

`interfaz.pasar_noche()` llama a `reino.noche()` justo después de cambiar la estación, en todos los casos. La siesta usa también `pasar_noche(siguiente_estacion, "El huerto crece mientras duermes.")`. La noche de vuelta no enseña pantalla de noche: la enseña «¡Buenos días!».

**La noche se salta tocando.** Durante la pantalla de noche o de viaje, un toque en cualquier sitio salta a la mitad que falta (fundido de 0,2 s). Vale para todas las noches, también las de las misiones.

### 5.2 La vuelta y el regalo del día

Al cargar la partida (antes de que la misión retome) y al volver del segundo plano (`visibilitychange` a visible, si `!estado.ocupado`), se llama a `reino.al_abrir(hoy)`, con `hoy` = fecha local `"AAAA-MM-DD"`:

1. Si `hoy <= estado.dia`: no pasa nada (mismo día, o el reloj del móvil ha ido hacia atrás).
2. Si `hoy > estado.dia`: es un día nuevo.
   - `estado.dias_jugados += 1`; `estado.siestas_dia = 0`; `estado.dia = hoy`.
   - Noches de vuelta: 1, o 2 si la diferencia es de 2 días o más. Se aplican con `reino.noche()`.
   - Merma (6.2): sube si toca, o avisa si subirá mañana.
   - **Regalo del día:** 1 semilla de rábano los días impares y 1 de calabaza los pares (si `estado.mision > 4`; si no, rábano). Siempre el mismo: no es una tómbola.
   - Pantalla **«¡Buenos días!»** (10.3) con el resumen.

La partida nueva empieza con `estado.dia = hoy` y `dias_jugados = 1`, sin pantalla de buenos días.

### 5.3 Sin trampas con la fecha

- `estado.dia` guarda **el día más alto visto**. Si el niño atrasa la fecha, no recibe noches ni regalo hasta que la fecha real pase de ese día.
- Adelantar la fecha da, como mucho, lo mismo que un día de juego normal: 2 noches de vuelta, 2 siestas y un regalo. Además, Merma va con los días jugados, así que adelantar el reloj también sube los precios antes.
- No hay forma fiable de saber la hora sin internet, y no se pregunta a ningún servidor (regla del proyecto). Se acepta este margen (ver dudas en la sección 16).

## 6. Economía con uso

### 6.1 Puestos

Cada puesto es una ventana nueva, **Puesto** (10.1), que se abre al tocar al vecino cuando su misión no lo necesita para el guion.

| Vecino | Zona | Desde | Vende | Compra |
|---|---|---|---|---|
| **Señora Semilla** | Mercado | misión 2 | semilla de rábano; calabaza (desde la 4); abono (desde la 3); tierra nueva (las 4, en orden) | — |
| **Tasador** | Mercado | misión 2 | — | rábanos, calabazas, manzanas, pepita de oro |
| **Yunque** | Mercado | misión 2 | regadera de hierro (si no la tiene) | — |
| **Copo** | Valle | misión 5 | plantón de manzano; semillas de rábano y calabaza | rábanos, calabazas, manzanas |
| **Hogaza** | Mercado | misión 2 | trabajo: amasar (6.3) | — |

«Desde» quiere decir al ganar esa misión (`estado.mision > N`).

Comprar un objeto de semilla o abono suma 1 a la bolsa por toque. La tierra nueva también se compra tocando la tierra a la venta (ventana `elegir`: «Tierra nueva · {p} monedas» → «Comprarla» / «Ahora no»).

### 6.2 Precios y Merma

`estado.merma` es el nivel de Merma: 0 antes de la misión 1, **1** desde la misión 1 (la misión 1 lo pone a 1 en sus dos caminos) y como mucho **3**.

| Nivel de Merma | 1 | 2 | 3 |
|---|---|---|---|
| Semilla de rábano | 2 | 3 | 4 |
| Semilla de calabaza | 5 | 6 | 8 |
| Plantón de manzano | 20 | 25 | 30 |
| Abono | 4 | 5 | 6 |
| Regadera de hierro | 8 | 10 | 12 |
| Primera tierra nueva (las siguientes, +5 cada una) | 10 | 12 | 15 |
| **Tasador paga** por rábano / calabaza / manzana | 1 / 3 / 1 | 2 / 4 / 2 | 2 / 5 / 2 |
| Pepita de oro (secreto) | 15 | 15 | 15 |

Lo que da cada bancal por noche (sin suerte), calculado por `qa/sim_economia.py`:

| Merma | Rábano: vende todo y recompra | Rábano: replanta | Calabaza: vende todo | Calabaza: replanta | Calabaza: replanta con abono | Manzano |
|---|---|---|---|---|---|---|
| 1 | 0 | +1 | +1,3 | +2 | +2,7 | +2 |
| 2 | +1 | +2 | +2 | +2,7 | +3,7 | +4 |
| 3 | 0 | +2 | +2,3 | +3,3 | +4,7 | +4 |

**Cuándo sube.** Merma sube un nivel **cada dos días jugados**: al llegar a `dias_jugados` 3 sube a 2, y al llegar a 5 sube a 3. El día anterior (`dias_jugados` 2 y 4) avisa. **Después de la misión 15** (`estado.maquina_apagada`) Merma ya no sube: «la máquina se ha apagado para siempre». Los precios no bajan, pero dejan de subir.

**Aviso y subida (pérdida suave y anunciada):**
- Día antes: línea en «¡Buenos días!» («Merma ronda el reino: mañana todo costará un poco más.») y, en los puestos, una etiqueta «Mañana sube» junto a los precios.
- Día de la subida: línea en «¡Buenos días!» («Merma ha subido los precios. Tus monedas brillan menos.»), sonido `malo` y el segmento de brillo que se apaga parpadea tres veces. En los puestos, ese día, cada precio que ha subido enseña el de antes tachado.

**La hucha y su brillo.** `estado.brillo` deja de escribirse a mano: vale siempre `5 − estado.merma` (4, 3, 2). Los cinco palitos del marcador (`Marcador`) siguen igual. La Mochila añade una línea: «Con tus monedas compras {n} semillas de rábano.» y, si ha subido Merma desde que llegó a esa cantidad, «(antes, {m})», calculado con el precio del nivel anterior. Así el niño ve que lo guardado compra menos, sin que nadie le quite una moneda.

**Cambio en la misión 1.** En `reto()`, los dos caminos ponen `estado.merma = 1` en lugar de `estado.brillo = 3` o `4`. El resultado de la hucha pasa a enseñar 4 palitos dorados (`[ORO, ORO, ORO, ORO, APAGADO]`) para que coincida con el marcador (arregla también el desfase M1 del crítico). El texto de la hucha no cambia.

### 6.3 Trabajo con Hogaza: pago por habilidad

- El minijuego de amasar paga **3 + 1 por golpe bueno + 2 si son 6 de 6** (de 3 a 11). Cambia `MinijuegoAmasar` (`y = Math.max(3, Math.min(5, a))`) por `reino.pago_trabajo(aciertos)` y el texto final («¡Has ganado {y} monedas!») sigue igual. Vale para todas las misiones que lo usan (1, 2 y 7, con Fiel).
- Fuera del guion, Hogaza da trabajo **una vez por noche del reino**: `estado.ultimo_trabajo === estado.tiempo` → ya ha trabajado. La misión 2 pasa a usar el mismo campo (`ultimo_trabajo` en lugar de `ultima_estacion_amasar`).

### 6.4 Tierras nuevas

Las 4 tierras de la fila 3 del Mercado cuestan la primera 10, 12 o 15 (según Merma) y cada siguiente 5 más. Se compran en orden, de (2,3) a (5,3), en el puesto de la Semilla o tocándolas. Quedan en `estado.tierras` y no se pierden nunca.

### 6.5 Nadie se queda sin jugar

`reino.puede_jugar()` es verdadero si hay algo plantado, semillas en la bolsa, rábanos o calabazas en la cesta o monedas para una semilla de rábano. Si es falso al tocar un bancal vacío, **la señora Semilla regala una semilla de rábano** (como mucho una por noche: `estado.ultimo_regalo`). Y Hogaza siempre da trabajo una vez por noche.

### 6.6 No hay monedas infinitas

Toda fuente de monedas depende de una noche del reino:
- cosechas y manzanas: una vez por noche y bancal, con 12 bancales y 3 árboles como mucho;
- trabajo con Hogaza: una vez por noche;
- regalos: uno al día (el del día) y uno por noche si no puede jugar;
- secretos: una sola vez cada uno.

Las noches tienen tope (5.1): como mucho 3 al día fuera de la historia. No se pueden vender semillas, abono ni tierras, así que no hay compraventa que dé beneficio sin esperar. Cota de la simulación: el mejor jugador posible gana como mucho unas 860 monedas en un día de historia y unas 280 en un día de modo libre.

## 7. Simulación de 10 días

`python3 qa/sim_economia.py` (semilla aleatoria 7; con las semillas 1 a 6 las comprobaciones también pasan). Juega 10 días con estas suposiciones: el huerto se abre el día 1 tras la misión 2; los días 1 a 4 hay 21 noches de misión repartidas (4, 6, 6 y 5), los hoyos del Valle se abren el día 3 y la historia acaba el día 4; cada día hay 2 siestas y, desde el día 2, la noche de vuelta; Merma está en 1 los días 1–2, en 2 los días 3–4 y en 3 desde el día 5. Se empieza con 20 monedas y la semilla regalada.

Formas de jugar:
- **Hucha**: trabaja con Hogaza cada noche (4 golpes buenos, 7 monedas) y lo guarda todo.
- **Vende todo**: planta rábanos comprando la semilla, vende toda la cosecha y no replanta ni compra tierra. Trabaja cada noche.
- **Replanta e invierte**: replanta de la cosecha, vende lo que sobra, compra tierras, calabazas y manzanos. Trabaja cada noche.
- **Despistado**: no trabaja ni riega, no duerme siestas; solo juega las noches de las misiones y la de vuelta.
- **Máximo**: abono en todo, trabajo perfecto (6 de 6). Sirve de cota.

Patrimonio al final de cada día (monedas + cesta, bolsa, plantas y tierras a precio de hoy); entre paréntesis, las monedas:

| Forma de jugar | día 1 | día 2 | día 4 | día 6 | día 8 | día 10 | máx. monedas ganadas en un día | regalos por no poder jugar |
|---|---|---|---|---|---|---|---|---|
| Hucha (trabaja y guarda) | 64 (62) | 127 (125) | 247 (244) | 290 (286) | 332 (328) | 374 (370) | 63 | 0 |
| Vende todo (no replanta) | 80 (64) | 165 (149) | 522 (498) | 596 (564) | 670 (638) | 750 (718) | 409 | 0 |
| Replanta e invierte | 129 (11) | 437 (307) | 1512 (1287) | 2017 (1741) | 2451 (2175) | 2865 (2589) | 568 | 0 |
| Despistado | 16 (0) | 12 (0) | 83 (59) | 93 (61) | 95 (63) | 87 (55) | 202 | 0 |
| Máximo posible (cota) | 116 (17) | 516 (384) | 1828 (1600) | 2484 (2204) | 3048 (2768) | 3592 (3312) | 864 | 0 |

Conclusiones:
- **Replantar gana a vender:** el día 10, 2.865 frente a 750 (casi 4 veces). Y vender todo gana a solo guardar (750 frente a 374).
- **Guardar en la hucha pierde:** las 62 monedas guardadas el día 1 compran 31 semillas de rábano ese día y 15 el día 10.
- **Nadie se queda sin jugar:** ninguna forma llega a no poder hacer nada (la comprobación corre en cada noche), y un niño con 0 monedas y nada plantado recibe una semilla (comprobado en el script).
- **No hay monedas infinitas:** la cota es de unas 860 monedas en un día de historia y unas 280 en un día de modo libre.
- **Aviso:** quien invierte bien llena sus 12 bancales y 3 árboles hacia el día 4 y desde ahí solo acumula. Es lo que esperamos (el sprint 4 trae talleres y caprichos), pero hay que vigilarlo en la prueba con niños.

## 8. Modo libre con vida y vuelta a zonas

### 8.1 Viajar durante la historia

- El panel **Mapa** enseña el botón «{zona} · viajar» para cada zona ya abierta (`estado.mision >=` primera misión de la zona) que no sea la actual, **también durante la historia**, si `vida.puede_viajar()`:
  - no hay nada hablando ni ventana abierta (`!estado.ocupado`);
  - el paso actual es un punto de control de la misión (`mision.puntos_control().includes(estado.paso)`; ver `docs/guardado.md`);
  - el paso no es un viaje del guion: `ir_valle`, `ir_ciudad`, `ir_torre`, `ir_reloj` (hay que llegar caminando, como hasta ahora).
  Si no se puede, la fila dice «ABIERTO · termina este paso».
- La zona de la misión lleva la etiqueta **«TU MISIÓN»**. La misión guarda su zona al llamar a `paso()` (`this.zona_mision = estado.zona`).
- **Fuera de la zona de la misión:**
  - el texto de misión dice «Tu misión sigue en {zona}. Toca el mapa para volver.»;
  - no hay flecha (`objetivo_fn` devuelve `null`);
  - los eventos `npc`, `parcela`, `lugar` y `llegada` no van a la misión: `npc` va a `vida.npc()`, y los demás a la vida del reino o a ninguna parte.
- **Al volver** a la zona de la misión: `Mundo.restaurar(estado.mision)`, `mision.preparar_punto(estado.paso)`, el héroe en la entrada de la zona, y `mision.paso(estado.paso)` (pone el texto, suelta al jugador y guarda).
- La misión expone su instancia en `interfaz.mision_actual` (en `MisionBase.jugar`) para que el mapa y la vida del reino la consulten. En modo libre es `null`.

### 8.2 Vecinos que hablan según el progreso

`MisionBase.charla(a)` (lo que pasa al tocar a un vecino que la misión no necesita) llama a `vida.npc(a)`:
1. Si el vecino tiene oficio y su puesto está abierto (6.1): abre el puesto, con su frase arriba. Hogaza ofrece trabajo si no ha trabajado esta noche; si ya ha trabajado, da su frase de charla y «Vuelve tras dormir».
2. Si no: elige una frase de `textos/vecinos.ts` (12.3) por progreso. Toma las frases cuyo `desde <= estado.mision` y cuya condición se cumple. La primera vez enseña la más nueva; los toques siguientes van rotando por las demás.
3. Si no hay ninguna: la `charla_{npc}` de la misión actual, como hasta ahora; y si tampoco, «¡Hola!» de Chispín.

En modo libre (después de la misión 15), `main.ts` escucha `npc` y `parcela` y llama a `vida.npc()` y `vida.parcela()`. Así todos los vecinos responden (arregla G2).

Los villanos ocultos no se tocan. En modo libre, Subeprecios, Prisas, Fachada, Don Chollo, Deudón, Euforio, Pánico y Merma no aparecen.

### 8.3 Presentación del huerto (una vez)

En el primer `paso()` de la misión 3 (o al cargar una partida con `estado.mision >= 3` y `estado.huerto_presentado === false`), la vida del reino lanza un diálogo de la señora Semilla (12.2). Después da 2 semillas de rábano, pone la flecha en el primer bancal hasta el primer plantado y marca `huerto_presentado = true`. La misión no se entera: cuando el diálogo acaba, el jugador queda libre en el paso en que estaba.

### 8.4 Secretos (primera tanda: Mercado y Valle)

Los secretos del Mercado están activos desde la misión 3 y los del Valle desde la 6 (cuando ya hay pistas). Mientras un secreto no se ha encontrado, su casilla suelta una chispa dorada pequeña cada 4 segundos (`mundo.estallido(…, ORO, 3)`). Hay además un vecino que da una pista (12.3). Al tocar la casilla (evento `lugar`), el héroe va a su lado (`mundo.irA(alrededor)`). Al llegar suena `fanfarria`, hay un estallido dorado de 30 y un diálogo corto, y se entrega el premio. Cada secreto se encuentra una sola vez (`estado.secretos`). El panel Mapa enseña «Secretos 1/3» en Mercado y Valle.

| id | Zona | Casillas que se tocan | Premio | Pista |
|---|---|---|---|---|
| `fuente` | Mercado | el agua de la fuente (6..8, 12..13) | 10 monedas | Hogaza |
| `engranaje` | Mercado | (9,2), junto a la máquina vieja | 2 abonos | Yunque |
| `banco` | Mercado | (4,24), entre los pinos del sur | **Nota del abuelo 1** + 1 semilla de calabaza | Tasador |
| `cueva` | Valle | la roca de la cueva (0..2, 24..26) | **pepita de oro** (a la cesta; Tasador paga 15, Merma no la toca) | Raíz |
| `lago` | Valle | el hielo del lago (9..12, 18..19) | 1 plantón de manzano | Escarcha |
| `pino` | Valle | (12,27), junto al último pino | **Nota del abuelo 2** + 1 abono | Anillos |

Las notas se leen con la ventana `carta` que ya existe y quedan en la Mochila («Notas del abuelo (2)»). El programador debe comprobar con `Mapa.bloqueado` que se llega al lado de cada casilla.

## 9. Sensación mínima

Solo con lo que ya existe: los 7 sonidos (`acierto`, `fallo`, `fanfarria`, `malo`, `moneda`, `plantar`, `siguiente`) y `mundo.estallido`. Se añade un **texto flotante**: `mundo.flotante(celda, texto, color)`, que sube 10 px y se desvanece en 0,8 s, dibujado en el lienzo con Pixelify Sans a 7 px de mapa (14 px en pantalla con escala 2, 12,9 px en un Android de 360), contorno `#2b2230`.

| Acción | Sonido | Respuesta visual |
|---|---|---|
| Plantar | `plantar` | estallido verde claro (10) en el bancal; el brote aparece con un rebote (escala 1,4 → 1 en 0,2 s) |
| Regar | `plantar` | estallido azul (10); la tierra se oscurece |
| Abonar | `plantar` | estallido marrón `#8a6a4a` (10); flotante «+2» |
| Planta que crece al pasar la noche | — | al quitar la pantalla de noche, estallido verde pequeño (4) en cada planta que ha cambiado de dibujo |
| Cosecha normal | `acierto` | estallido rojo (8) y flotante blanco «+{n}» por bancal |
| Cosecha buena | `acierto` dos veces (separados 0,12 s) | flotante dorado «+{n} ¡Buena!» y estallido dorado (12) |
| Cosecha floja | — | flotante gris «+{n}» |
| Recoger manzanas | `acierto` | flotante «+{n}» sobre el árbol |
| Vender | `moneda` | estallido dorado (14) sobre el héroe; el número de monedas del marcador da un pulso (escala 1,3 en 0,25 s); flotante «+{n}» |
| Comprar | `moneda` | el icono comprado da un salto en el puesto; el número de monedas parpadea en rojo una vez |
| No llegan las monedas | `fallo` | el botón tiembla (desplazamiento ±3 px, 0,25 s) |
| Merma sube | `malo` | el palito de brillo que se apaga parpadea tres veces |
| Secreto | `fanfarria` | estallido dorado (30) |
| Saltar la noche | `siguiente` | fundido rápido |

## 10. Interfaz

Todo cumple la guía de arte: texto de 11 px o más (diálogo de 18 px), toques de 44 px o más, como mucho dos frases por globo. Las ventanas nuevas usan `interfaz.abrir(tipo, datos)` como las demás.

### 10.1 Ventana «Puesto» (`interfaz.puesto(vecino)`)

- Arriba: botón «Cerrar» (el **primero** en el orden del documento, para que el bot de QA cierre el puesto y no compre nada), nombre del vecino (`EtiquetaNombre`) y su frase en un `Bocadillo`.
- **Comprar:** una fila por objeto: icono (`semillas`, `huerto` para la calabaza, `arbol_1`, `abono`, `regadera_hierro`, `tierras`), nombre, una línea corta (12.1), «tienes {n}» y el botón «Comprar · {p}». Sin monedas, el botón queda desactivado con «Te faltan {n}». Con aviso de Merma, la etiqueta «Mañana sube». El día de la subida, el precio de antes tachado.
- **Vender:** una fila por fruto que haya en la cesta: icono, «{n} × {p}» y «Vender · +{n·p}». Sin nada: «No tienes frutos. ¡A cosechar!»
- Abajo: «{monedas} monedas».
- Devuelve al cerrar; cada compra o venta se aplica al momento (no espera a cerrar).

### 10.2 Ventana «Plantar» (`interfaz.elegir_semilla(opciones)`)

Al tocar un bancal vacío: si solo hay un cultivo posible (en bolsa o cesta), se planta sin preguntar. Si hay dos, ventana con un botón grande por cultivo («Rábano · tienes {n}») y «Ahora no». En un hoyo de árbol solo se planta el manzano.

### 10.3 Ventana «¡Buenos días!» (`interfaz.buenos_dias(resumen)`)

Título «¡Buenos días!»; «Ha pasado una noche.» o «Han pasado dos noches.»; una línea por zona con algo listo («Mercado: 6 rábanos listos», «Valle: 4 manzanas»); el regalo con su icono; la línea de Merma si toca; botón «¡A jugar!». Como mucho 5 líneas.

### 10.4 Aviso flotante (`interfaz.aviso(texto, icono)`)

Una tira de 3 segundos bajo el marcador, que no bloquea ni pide toque. Se usa para «Merma ha subido los precios.» cuando la subida pasa con el juego abierto, para «El huerto ya ha dormido bastante hoy» y para el árbol lleno.

### 10.5 Paneles

- **Huerto:** para cada zona con huerto, «{zona}: {p} plantas, {l} listas»; botón «Dormir una noche (quedan {n} hoy)», o desactivado con «Chispín ya no tiene sueño. Mañana, más noches.» El indicador del botón Huerto de la barra cuenta los frutos listos de todas las zonas.
- **Mochila:** añade «Bolsa» (semillas, plantones y abono), «Cesta» (frutos y pepita), la línea de la hucha (6.2) y «Notas del abuelo ({n})», con un botón para leerlas.
- **Mapa:** viaje durante la historia (8.1), etiqueta «TU MISIÓN», «Secretos {n}/3» en Mercado y Valle, y «{n} listos» si hay frutos esperando en esa zona.
- **Criaturas:** la descripción de Chispín pasa a «Tu primer amigo en Valoria.» (no se promete lo que aún no pasa).

## 11. Guardado

### 11.1 Campos nuevos en `estadoInicial()`

```ts
tiempo: 0,             // noches del reino desde el principio (misión, siesta y vuelta)
merma: 0,              // nivel de Merma, 0..3 (1 desde la misión 1); brillo = 5 - merma
dia: "",               // día real más alto visto, "AAAA-MM-DD"
dias_jugados: 0,       // días reales distintos en que se ha jugado
siestas_dia: 0,        // siestas usadas en `dia`
huerto: [],            // [{ zona, x, y, cultivo: "rabano"|"calabaza"|"manzano", edad, regada, abono, manzanas }]
tierras: [],           // tierras compradas: ["mercado:2,3", ...]
bolsa: { rabano: 0, calabaza: 0, manzano: 0, abono: 0 },
cesta: { rabano: 0, calabaza: 0, manzana: 0, pepita: 0 },
ultimo_trabajo: -1,    // valor de `tiempo` en el último trabajo con Hogaza
ultimo_regalo: -1,     // valor de `tiempo` en el último regalo por no poder jugar
secretos: [],          // ids encontrados (sección 8.4)
huerto_presentado: false,
bancal_semilla: false, // los brotes de la fila 5 del Mercado ya han pasado a la cesta
replanto_alguna_vez: false, // para la frase de la primera vez (y para Chispín en el sprint 4)
total_replantado: 0,   // frutos devueltos a la tierra, en total (lo usará Chispín en el sprint 4)
```

`ultima_estacion_amasar` sale de `estadoInicial()` (lo sustituye `ultimo_trabajo`). `brillo` se queda en el estado, pero lo escribe solo `reino` (`brillo = 5 - merma`). `guardar()` ya escribe todas las claves de `estadoInicial()`, así que los campos nuevos se guardan sin tocar `guardar()`.

### 11.2 Migración de partidas antiguas (en `cargar()`, función `reino.sanear()`)

`cargar()` hace `Object.assign(estadoInicial(), guardado)`, así que lo que falta toma el valor inicial. Después, `reino.sanear()`:
- Si el guardado no traía `merma`: `merma = mision > 1 ? 1 : 0`, `tiempo = 2 * (mision - 1)` y `dias_jugados = 1`. `dia` se queda en `""`, así que la primera vez que se abre tras la actualización hay noche de vuelta y «¡Buenos días!», que es la forma de descubrir lo nuevo.
- `brillo = 5 - merma` (una partida con `brillo: 3` de la hucha pasa a 4).
- Si `mision > 3` y `!bancal_semilla`: conversión de la fila 5 (3.2).
- Si traía `ultima_estacion_amasar` y no `ultimo_trabajo`: `ultimo_trabajo = -1`.
- Sanea lo leído (viene de `localStorage`): números enteros de 0 en adelante; `huerto` solo con celdas que existan en `reino.bancales()` y cultivos válidos, y sin dos plantas en la misma celda; `tierras` y `secretos` solo con valores conocidos; `merma` entre 0 y 3; `dia` con forma `AAAA-MM-DD`, o `""`.

### 11.3 Cuándo se guarda lo del huerto

Las acciones del reino (plantar, regar, cosechar, comprar, vender, trabajar, siesta, secreto, viaje) terminan con `vida.guardar()`:
- **Modo libre** (`estado.paso === "libre"`): `estado.guardar()`, como siempre.
- **Historia, en un punto de control** (el paso actual está en `puntos_control()`): `estado.guardar(estado.paso, celda, mision.campos_punto(), zona_mision)`. Es la misma foto de ese paso con el huerto al día. Si el héroe está en otra zona, se guarda con `zona = zona_mision` y sin `celda`: al volver a abrir, el niño aparece en la zona de su misión con todo lo que hizo en el huerto. `guardar()` recibe para eso un cuarto parámetro opcional, `zona`, que solo cambia el campo `zona` de lo que se escribe.
- **Historia, en un paso sin punto de control:** no se guarda. Si se cierra el juego, se vuelve al último punto de control y lo hecho en el huerto desde entonces se deshace entero, monedas incluidas. Es coherente y pierde como mucho un paso (la regla de `docs/guardado.md`).

Caso que hay que probar: misión 4, paso `plantar`, con alguna semilla de la historia ya plantada. Guardar a mitad de ese paso deja `estado.semillas` y `estado.brotes` como están, y al retomar se plantan las que faltan: funciona igual que hoy.

## 12. Textos nuevos

Las marcas `{o}`, `{el}`, `{un}`, `{Un}` y `{nieto}` se rellenan solas (`docs/textos-genero.md`). Como mucho dos frases por globo.

### 12.1 Huerto y puestos (`juego/src/textos/huerto.ts`)

| Clave | Quién | Texto |
|---|---|---|
| `sin_semillas` | Chispín | No nos quedan semillas. La señora Semilla vende. |
| `regalo_red` | Semilla | ¿Sin nada que plantar? Toma una semilla. ¡Que no pare el huerto! |
| `lista_1` | flotante | Lista tras una noche |
| `lista_n` | flotante | Lista en {n} noches |
| `regada` | flotante | ¡Regada! |
| `sin_regadera` | Chispín | Sin regadera de hierro no podemos regar. Yunque las vende. |
| `abono_titulo` | ventana | ¿Le pones abono? Dará 2 frutos más. |
| `abono_si` / `ahora_no` | botones | Sí, abonar / Ahora no |
| `cosecha_titulo` | ventana | ¡{n} frutos! |
| `op_replantar` | botón | Replantar {b} bancales |
| `op_cesta` | botón | Todo a la cesta |
| `primera_replanta` | Chispín | Un fruto de cada bancal vuelve a la tierra. ¡Bola de nieve! |
| `primera_floja` | Chispín | Sin regar, a veces la cosecha sale floja. |
| `buena` | flotante | +{n} ¡Buena! |
| `tierra_titulo` | ventana | Tierra nueva · {p} monedas |
| `tierra_comprar` | botón | Comprarla |
| `tierra_comprada` | Semilla | ¡Es tuya! Más tierra, más cosecha. |
| `faltan` | botón desactivado | Te faltan {n} |
| `hoyo_vacio` | Chispín | Aquí cabe un manzano. Copo vende plantones. |
| `arbol_crece` | flotante | Dará manzanas en {n} noches |
| `arbol_vacio` | flotante | Mañana, más manzanas |
| `arbol_lleno` | aviso | ¡Un manzano está lleno! Ve a recoger. |
| `parcela_historia` | Chispín | Estos bancales son de Copo. Tus árboles están al sur. |
| `dormir` | botón | Dormir una noche (quedan {n} hoy) |
| `sin_sueno` | panel | Chispín ya no tiene sueño. Mañana, más noches. |
| `noche_siesta` | pantalla de noche | El huerto crece mientras duermes. |
| `bd_titulo` | Buenos días | ¡Buenos días! |
| `bd_una` / `bd_dos` | Buenos días | Ha pasado una noche. / Han pasado dos noches. |
| `bd_listos` | Buenos días | {zona}: {n} {frutos} listos |
| `bd_regalo` | Buenos días | Chispín ha encontrado una semilla de {cultivo}. |
| `bd_merma_aviso` | Buenos días | Merma ronda el reino: mañana todo costará un poco más. |
| `bd_merma_sube` | Buenos días y aviso | Merma ha subido los precios. Tus monedas brillan menos. |
| `bd_boton` | botón | ¡A jugar! |
| `merma_manana` | etiqueta del puesto | Mañana sube |
| `hucha_compra` | Mochila | Con tus monedas compras {n} semillas de rábano. |
| `hucha_antes` | Mochila | (antes, {m}) |
| `nada_que_vender` | puesto | No tienes frutos. ¡A cosechar! |
| Descripciones del puesto | puesto | Rábano: «Crece en 1 noche. Da 2.» · Calabaza: «Crece en 3 noches. Da 3.» · Plantón de manzano: «Crece en 4 noches. Luego, 2 manzanas cada noche.» · Abono: «2 frutos más en un bancal.» · Regadera de hierro: «Lo regado nunca sale flojo.» · Tierra nueva: «Un bancal más, para siempre.» · Pepita de oro: «Merma no puede con ella.» |
| Títulos de puesto | puesto | Puesto de la señora Semilla · Tasador compra · Fragua de Yunque · Puesto de Copo |

### 12.2 Vida del reino (`juego/src/textos/vecinos.ts`)

| Clave | Quién | Texto |
|---|---|---|
| `presenta_1` | Semilla | ¡Ya eres hortelan{o}! Estos cuatro bancales, junto a mi casa, son tuyos. |
| `presenta_2` | Semilla | Te regalo dos semillas de rábano. Crecen en una sola noche. |
| `presenta_3` | Chispín | ¡Toca un bancal para plantar! |
| `trabajo_titulo` | ventana | ¿Amasas conmigo? Pago 3, y 1 más por golpe bueno. |
| `trabajo_hecho` | Hogaza | Ya has amasado esta noche. ¡Vuelve tras dormir! |
| `mision_lejos` | texto de misión | Tu misión sigue en {zona}. Toca el mapa para volver. |
| `mapa_paso` | Mapa | ABIERTO · termina este paso |
| `secreto_fuente` | Chispín | ¡Una moneda antigua en el fondo de la fuente! Vale por diez. |
| `secreto_engranaje` | Chispín | Un engranaje de la máquina vieja… ¡y dos sacos de abono escondidos! |
| `secreto_banco` | Chispín | Una nota de tu abuelo, y una semilla de calabaza. |
| `secreto_cueva` | Chispín | ¡Una pepita de oro! Merma no puede con ella. |
| `secreto_lago` | Escarcha | ¡Ziiim! Bajo el hielo había un plantón de manzano. ¡Para ti! |
| `secreto_pino` | Chispín | Otra nota de tu abuelo, y un saco de abono. |
| `nota_1` | carta | Aquí escondía yo mis monedas de pequeño. Cuando volví a por ellas, ya no compraban casi nada. |
| `nota_2` | carta | Copo y yo plantamos el primer manzano del Valle. Tardó cuatro años en dar fruta, y luego nos la dio cada otoño. |

### 12.3 Frases de los vecinos por progreso (`juego/src/textos/vecinos.ts`)

Formato: `{ npc: [[desde_mision, texto, condición?], ...] }`. La condición es opcional: `"!fuente"` quiere decir «solo si no ha encontrado el secreto `fuente`». Para los que tienen puesto, la frase va en el bocadillo del puesto. `desde 16` = después del final.

| Vecino | Desde | Texto |
|---|---|---|
| Hogaza | 1 | ¡Huele a pan recién hecho! |
| Hogaza | 3 | Dicen que en la fuente hay una moneda muy antigua. (`!fuente`) |
| Hogaza | 4 | Desde que Subeprecios se fue, el pan sale dorado otra vez. |
| Hogaza | 16 | Valoria entera viene a por pan. ¡Gracias a ti! |
| Tasador | 3 | Te compro lo que traigas. Precio justo, ni más ni menos. |
| Tasador | 3 | Tu abuelo se sentaba al sur, entre los pinos. (`!banco`) |
| Tasador | 5 | Merma lo encarece todo. Al menos, tus frutos también valen más. |
| Antojo | 1 | ¡Caramelos brillantes! ¿Un caprichito? |
| Antojo | 4 | Un capricho de vez en cuando alegra. ¡Todos los días, no! |
| Antojo | 16 | Pronto abriré un puesto de adornos. ¡Ya verás! |
| Semilla | 3 | ¿Qué plantamos hoy? |
| Semilla | 5 | Las calabazas tardan, pero dan más. Como todo lo bueno. |
| Semilla | 16 | Tu huerto es el más bonito del Mercado. ¡No se lo digas a nadie! |
| Yunque | 3 | Lo bueno se paga una vez. |
| Yunque | 3 | Junto a la máquina vieja se cayó un engranaje. ¡Y aún está caliente! (`!engranaje`) |
| Yunque | 3 | ¿Qué tal esa regadera? Te durará años. (solo con la de hierro) |
| Copo | 4 | Sin prisa, pequeñ{o}. Lo bueno crece despacio. |
| Copo | 6 | Un manzano tarda en crecer. Luego da fruta cada noche. |
| Copo | 16 | El reloj de arena dice que tu huerto será un bosque. |
| Raíz | 4 | Mi casa la levantó mi bisabuela, piedra a piedra. Todavía me abriga. |
| Raíz | 6 | En la cueva del sur brilla algo. Yo ya soy mayor para entrar. (`!cueva`) |
| Raíz | 16 | Las piedras no dan fruta, pero abrigan cada invierno. |
| Anillos | 4 | Cada anillo de un tronco es un año que el árbol aguantó. |
| Anillos | 6 | Bajo el último pino del camino, tu abuelo escondió algo. (`!pino`) |
| Escarcha | 4 | ¡Ziiim! ¿Me ves patinar? Llevo todo el invierno practicando. |
| Escarcha | 6 | ¡He visto algo brillar bajo el hielo del lago! (`!lago`) |
| Lupa | 7 | Un buen detective nunca se fía de la puerta. Mira dentro. |
| Lupa | 10 | Desde que miras dentro, ningún bazar te engaña. |
| Fiel | 7 | Mis clientes vuelven porque mis zapatos duran. Así de sencillo. |
| Fiel | 10 | Lo que va bien no hace ruido. Mis zapatos siguen vendiéndose. |
| Engranaje | 7 | ¡Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve. |
| Engranaje | 10 | ¡He inventado una regadera que riega sola! Bueno… casi. |
| Cuenta | 7 | Los números no mienten. Las fachadas, a veces sí. |
| Cuenta | 10 | Apunta lo que ganas y lo que gastas. Los números avisan antes que nadie. |
| Revés | 10 | ¡Aloh! Aquí todo va al revés. Así se ven las cosas que los demás no ven. |
| Revés | 13 | Si algo parece demasiado bueno, míralo del revés. |
| Arrepentido | 10 | Si alguien te promete el doble en una noche, acuérdate de mí. |
| Arrepentido | 13 | Ya no persigo dobles. Planto rábanos y me va mejor. |
| Cautela | 10 | Antes de cada paso, me pregunto: ¿qué podría salir mal? |
| Cautela | 13 | Pasaste las cuatro puertas. Ahora cuida tú de los demás. |
| Vaivén | 13 | ¡Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor. |
| Vaivén | 16 | El mercado sube y baja. Tú ya no te asustas. |
| Memoria | 13 | He visto cien tormentas. Todas pasaron. |
| Memoria | 16 | Ninguna tormenta se llevó a quien supo esperar. |
| Péndulo | 13 | No sé adónde va el péndulo. Pero sé dónde está. |
| Péndulo | 16 | La máquina está apagada. Los precios ya no suben más. |

## 13. Casos límite

- **¿Y si no le llegan las monedas?** El botón del puesto queda desactivado con «Te faltan {n}». Puede vender frutos, trabajar con Hogaza o recibir la semilla de la red (6.5). Ninguna misión depende de tener monedas.
- **¿Y si lo gasta todo antes de una misión que pide monedas?** Todas tienen otra opción (ver 3.2). En el sprint 5 se revisa si alguna debería escalar su precio con Merma.
- **¿Y si repite la cosecha o la venta muy rápido?** Mientras dura un flujo, `estado.ocupado = true` y los toques se ignoran (como ya hace `Mundo.tocar`).
- **¿Y si toca un bancal a mitad de un diálogo de misión?** No puede: con `estado.ocupado` el mundo no responde.
- **¿Y si duerme la siesta a mitad de una misión?** Se puede si el jugador está libre. Cambia `estado.estacion` (como cualquier noche) y `tiempo`; ninguna misión depende del valor de la estación, salvo la 2 con el trabajo, que pasa a `ultimo_trabajo`.
- **¿Y si cierra el juego lejos de la zona de su misión?** Al volver aparece en la zona de la misión, en su paso, con el huerto al día (11.3).
- **¿Y si viaja a mitad del paso `ir_valle` de la misión 4?** El Mapa no ofrece el Valle en ese paso (8.1).
- **¿Y si llena la cesta?** No tiene tope.
- **¿Y si tiene semillas de la historia (`estado.semillas`)?** No sirven en el huerto propio. Son de su misión.
- **¿Y si juega de madrugada y pasa la medianoche?** Al volver del segundo plano, o en el siguiente momento libre, se aplica el día nuevo.
- **¿Y si el niño está en el título y es un día nuevo?** La noche de vuelta se aplica después de «Continuar», antes de retomar la misión. En partida nueva no hay noche de vuelta.
- **¿Y si el bot de QA toca a un vecino con puesto?** El primer botón es «Cerrar» y el bot lo pulsa: no compra nada.

## 14. Reparto en tres tareas de programación

Las tres pueden empezar a la vez si respetan el **contrato** (14.1). Cada una puede usar stubs de lo que hacen las otras hasta fusionar. Orden de fusión: A, luego B, luego C. Los archivos nuevos se escriben tipados (sin `// @ts-nocheck`) y `npm run tipos` no debe empeorar.

### 14.1 Contrato entre tareas

`juego/src/reino/reglas.ts` (tarea A):

```ts
export type Cultivo = "rabano" | "calabaza" | "manzano";
export type Fruto = "rabano" | "calabaza" | "manzana" | "pepita";
export type Cosa = Cultivo | "abono" | "regadera";
export interface Bancal { zona: string; x: number; y: number; tipo: "bancal" | "hoyo"; abierto: boolean; precio?: number }
export interface Planta { zona: string; x: number; y: number; cultivo: Cultivo; edad: number; regada: boolean; abono: boolean; manzanas: number }
export interface Cosecha { x: number; y: number; cultivo: Cultivo; frutos: number; suerte: "buena" | "normal" | "floja" }

export function bancales(zona: string): Bancal[];            // abiertos y a la venta, según estado.mision y estado.tierras
export function planta_en(zona: string, x: number, y: number): Planta | null;
export function noches_que_faltan(p: Planta): number;          // 0 = lista (manzano: 0 si tiene manzanas)
export function cultivos_plantables(zona: string, tipo: "bancal" | "hoyo"): Cultivo[];  // con algo en bolsa o cesta
export function plantar(zona: string, x: number, y: number, c: Cultivo): boolean;      // usa bolsa y luego cesta
export function regar(zona: string, x: number, y: number): boolean;
export function abonar(zona: string, x: number, y: number): boolean;
export function cosechar(zona: string, azar?: () => number): Cosecha[];                 // todos los bancales listos
export function replantar(cosechas: Cosecha[]): number;                                 // bancales replantados
export function recoger_manzanas(zona: string, x: number, y: number): number;
export function precio(cosa: Cosa | "tierra", merma?: number): number;
export function precio_venta(f: Fruto, merma?: number): number;
export function catalogo(vecino: "semilla" | "tasador" | "yunque" | "copo"): { compra: (Cosa | "tierra")[]; venta: Fruto[] };
export function comprar(cosa: Cosa | "tierra"): boolean;       // false si no llega o no está abierto
export function vender(f: Fruto, n: number): number;            // monedas ganadas
export function comprar_tierra(zona: string, x: number, y: number): boolean;
export function pago_trabajo(aciertos: number): number;
export function puede_trabajar(): boolean;
export function marcar_trabajo(): void;
export function puede_jugar(): boolean;
export function red_de_seguridad(): boolean;                   // true si ha regalado una semilla
export function sanear(guardado_traia_merma: boolean): void;
export function al_cambiar_mision(): void;                      // fila 5 del Mercado, etc.
```

`juego/src/reino/tiempo.ts` (tarea A):

```ts
export interface ResumenNoche { listos: Record<string, Partial<Record<Fruto, number>>>; cambiaron: { zona: string; x: number; y: number }[]; arbol_lleno: boolean }
export interface ResumenVuelta { dia_nuevo: boolean; noches: number; regalo: Cultivo | null; merma: "nada" | "aviso" | "sube"; listos: ResumenNoche["listos"] }
export function hoy(): string;                                  // fecha local AAAA-MM-DD
export function noche(): ResumenNoche;                          // crece todo, tiempo += 1
export function al_abrir(hoy: string): ResumenVuelta;
export function siestas_quedan(): number;
export function usar_siesta(): boolean;                         // false si no quedan
export function merma_avisa_hoy(): boolean;                     // para la etiqueta «Mañana sube»
export function merma_subio_hoy(): boolean;                     // para el precio tachado
```

`juego/src/reino/vida.ts` (tarea C) exporta `vida.iniciar(mundo, ui)`, `vida.npc(id)`, `vida.parcela(celda)`, `vida.lugar(celda)`, `vida.al_paso(mision)`, `vida.puede_viajar()`, `vida.guardar()`.

La interfaz (tarea B) añade a `interfaz`: `puesto(vecino)`, `elegir_semilla(opciones)`, `buenos_dias(resumen)`, `aviso(texto, icono)`; a `Mundo`: el evento `"huerto"` y `flotante(celda, texto, color)`; y el módulo `juego/src/reino/acciones.ts` con `acciones.tocar_huerto(celda)` (todo el flujo de 4.2 y 4.3).

### 14.2 Tarea A · Reloj y economía (lógica, sin pantalla)

**Archivos:** `juego/src/reino/reglas.ts` (nuevo), `juego/src/reino/tiempo.ts` (nuevo), `juego/src/estado.ts` (campos, `sanear()` desde `cargar()`, cuarto parámetro `zona` de `guardar()`), `juego/src/misiones/m01.ts` (merma en `reto()` y los 4 palitos), `juego/src/misiones/m02.ts` (`ultimo_trabajo`), `qa/reino.py` (nuevo). Una línea en `juego/src/main.ts`: `window.valoria.reino = { ...reglas, ...tiempo }` (C debe conservarla al fusionar).

**Hace:** secciones 3.1 (qué celdas están abiertas), 3.2 (fila 5), 4 (reglas de crecer, cuidar y cosechar), 5.1–5.3 (noches, vuelta, regalo, fecha), 6.2–6.6 (precios, Merma, brillo, trabajo, tierras, red, topes) y 11 (campos y migración). Las tablas de precios y cultivos son **las mismas** que `COMPRA`, `VENTA` y `CULTIVOS` de `qa/sim_economia.py`.

**Criterio de aceptación** (`python3 qa/reino.py`, Playwright sobre `juego/dist/index.html`, usando `window.valoria.reino` y `window.valoria.Estado`):
1. Las tablas de precios, ventas y cultivos de `reglas.ts` coinciden con las de `qa/sim_economia.py` (el script las importa y compara).
2. Rábano regado, azar 0,5: lista en 1 noche, 2 frutos. Azar 0,1 regado: 3. Sin regar, azar 0,1: 1. Calabaza: 3 noches. Manzano: 0 manzanas las 4 primeras noches, luego 2 por noche, con tope de 4.
3. `al_abrir`: mismo día → 0 noches; +1 día → 1 noche y regalo; +5 días → 2 noches; fecha anterior → 0 noches y `dia` sin cambiar; después, `dia` + 1 → 1 noche.
4. `usar_siesta` vale 2 veces por día y la tercera devuelve `false`.
5. Merma: con `dias_jugados` 2 avisa; en 3 sube a 2; en 5 sube a 3; con `maquina_apagada` no sube. `brillo === 5 - merma` siempre.
6. `pago_trabajo(0) === 3`, `(4) === 7`, `(6) === 11`; `puede_trabajar()` es falso tras `marcar_trabajo()` hasta la siguiente noche.
7. Migración: una partida del sprint 2 en la misión 8 con `brillo: 3` carga con `merma 1`, `brillo 4`, `tiempo 14`, `huerto []`. Una en la misión 5 con brotes en el Mercado los pasa a la cesta y deja `estado.brotes` sin brotes del Mercado. Basura en `huerto` (celdas que no existen, cultivos raros, negativos) se descarta sin errores.
8. `red_de_seguridad()` regala solo si `!puede_jugar()`, y una vez por noche.
9. `python3 qa/sim_economia.py`, `npm run qa:partida`, `python3 qa/guardado.py` y `python3 qa/guardado_4_15.py` pasan.

### 14.3 Tarea B · El huerto en pantalla y los puestos

**Archivos:** `juego/src/mundo/mapas.ts` (sin cambios de mapa: solo si hace falta un ayudante), `juego/src/mundo/mundo.ts` (dibujar plantas, árboles, tierras a la venta y regado; evento `"huerto"` antes que `"parcela"`; sólidos de los árboles; `flotante()`; chispas de secretos a partir de una lista que da C), `juego/src/ui/controlador.ts` (`puesto`, `elegir_semilla`, `buenos_dias`, `aviso`, `reino.noche()` dentro de `pasar_noche`, saltar la noche tocando), `juego/src/ui/puesto.tsx` (nuevo: Puesto, Plantar, Buenos días, Aviso), `juego/src/ui/capas.tsx` (registrar las ventanas nuevas), `juego/src/ui/minijuegos.tsx` (**solo** `MinijuegoAmasar` y los paneles Huerto, Mochila y Criaturas), `juego/src/ui/componentes.tsx` (pulso del contador y parpadeo del brillo; indicador del botón Huerto), `juego/src/reino/acciones.ts` (nuevo), `juego/src/textos/huerto.ts` (nuevo), sprites nuevos de 13 × 13 en `juego/src/recursos/sprites/` (`calabaza_lista`, `cartel_venta`) con su entrada en `sprites.ts`, `qa/huerto.py` (nuevo).

**Hace:** secciones 3.1 (dibujo y toque), 4 (flujo de toques), 5.1 (siesta y saltar la noche), 6.3 (pago en `MinijuegoAmasar`), 9, 10 y 12.1.

**Criterio de aceptación** (`python3 qa/huerto.py`, Playwright a 390 × 844 y a 360 × 800; abre los puestos con `valoria.ui.puesto(...)` para no depender de C):
1. Partida sembrada en la misión 3: hay 4 bancales abiertos en la fila 4 y 4 tierras a la venta en la fila 3; la fila 5 sigue siendo de la historia.
2. Comprar 2 semillas de rábano en el puesto de la Semilla resta 4 monedas (Merma 1). Plantar tocando 2 bancales; tocarlos otra vez los riega (con regadera de hierro).
3. «Dormir una noche» en el panel Huerto pasa una noche; un toque durante la noche la acorta (dura menos de 1,5 s); una tercera siesta en el mismo día está desactivada.
4. Cosechar: aparecen flotantes, la ventana ofrece «Replantar 2 bancales»; al elegirlo quedan 2 bancales plantados y la cesta con lo que sobra.
5. Vender en el puesto de Tasador suma `n × precio` a las monedas; el contador da un pulso.
6. Comprar una tierra nueva abre la celda (2,3) y la siguiente cuesta 5 más.
7. Partida sembrada en la misión 6, en el Valle: un hoyo sin plantón da la frase de Copo; con un plantón se planta; tras 4 noches no hay manzanas y tras la 5.ª hay 2; al tocarlo pasan a la cesta.
8. En las capturas, ningún texto nuevo mide menos de 11 px y ningún botón nuevo menos de 44 px (como `qa/small.py`).
9. `npm run qa:partida` pasa (el amasar paga entre 3 y 11).

### 14.4 Tarea C · Vida del reino: vecinos, viajes y secretos

**Archivos:** `juego/src/reino/vida.ts` (nuevo), `juego/src/textos/vecinos.ts` (nuevo), `juego/src/misiones/base.ts` (`charla` → `vida.npc`, `zona_mision`, filtro de eventos lejos de la zona, `interfaz.mision_actual`, `volver()`, `vida.al_paso`), `juego/src/main.ts` (`vida.iniciar`, vuelta y «¡Buenos días!» al cargar y al volver del segundo plano, escucha de `npc` y `parcela` en modo libre, `viaje_pedido` también en la historia), `juego/src/ui/minijuegos.tsx` (**solo** el panel Mapa), `qa/vida.py` (nuevo) y, si hace falta, `qa/bot.py`.

**Hace:** secciones 6.1 (qué abre cada vecino), 6.3 (trabajo con Hogaza fuera del guion), 8, 11.3 (`vida.guardar()`) y 12.2–12.3.

**Criterio de aceptación** (`python3 qa/vida.py`):
1. Partida en modo libre (misión 16): los 19 vecinos de las 5 zonas responden al tocarlos (un diálogo con texto o un puesto abierto); ninguno se queda mudo.
2. Partida en la misión 8, punto `ir_lupa` (Ciudad): el Mapa ofrece el Mercado; se viaja, se planta, se vuelve; el texto de la misión, la flecha y Lupa están como antes, y el bot termina la misión 8. Si se recarga estando en el Mercado, la partida abre en la Ciudad, en `ir_lupa`, con lo plantado.
3. Partida en la misión 4, paso `ir_valle`: el Mapa no ofrece el Valle.
4. Los 6 secretos: cada uno se encuentra una vez, da su premio una vez y el Mapa enseña «Secretos 3/3» en Mercado y Valle; volver a tocar no da nada.
5. Con `dia` de ayer en el guardado, al recargar sale «¡Buenos días!» con el regalo; con `dia` de mañana, no sale nada.
6. La presentación del huerto sale una vez al empezar la misión 3, y nunca más.
7. Hogaza da trabajo una vez por noche fuera del guion.
8. `npm run qa:partida`, `python3 qa/guardado.py` y `python3 qa/guardado_4_15.py` pasan. El bot no gasta monedas en los puestos.

## 15. Cómo comprobar el sprint entero

1. `npm run qa:partida` completa las 15 misiones sin errores.
2. `python3 qa/sim_economia.py`, `qa/reino.py`, `qa/huerto.py` y `qa/vida.py` pasan.
3. Partida a mano en un móvil de 390 px: misiones 1 a 5 con huerto, dos días de juego (cambiando la fecha del sistema para la prueba) y un rato de modo libre. Anotar el tiempo que se pasa en el huerto frente al guion.
4. El crítico evalúa con su método del sprint 2 y además mide toques en el huerto por sesión, monedas al final y uso de los puestos.

## 16. Dudas que debe decidir el fundador

1. **Merma después del final.** Aquí deja de subir tras la misión 15 (la máquina «se ha apagado para siempre»). ¿O preferimos que siga despacio, para que la lección de la hucha no se apague en el modo libre?
2. **Trampas con la fecha.** Adelantar la fecha del móvil da lo mismo que un día de juego, pero se puede repetir. ¿Lo aceptamos (como Animal Crossing) o añadimos un tope de días nuevos por semana?
3. **Siestas.** 2 al día. ¿Encaja con el límite diario que pondrán los padres, o preferís 1?
4. **Cuántas monedas.** Quien invierte bien tiene unas 2.900 el día 10 y llena el huerto hacia el día 4. ¿Os parece bien hasta que lleguen los talleres y los caprichos en el sprint 4, o bajamos ya la venta de calabaza y manzana?
5. **El cambio en la misión 1.** Hoy, guardar en la hucha deja el brillo en 3 y comprar semillas en 4. Con Merma como nivel del reino, los dos caminos quedan en 4. ¿Lo aceptamos (pedagogía debería revisarlo)?
6. **Viajar a mitad de misión.** Solo en los puntos de control. ¿Os parece suficiente libertad?
