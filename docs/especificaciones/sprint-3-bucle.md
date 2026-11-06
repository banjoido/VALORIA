# Sprint 3 · El bucle: huerto vivo y economía, y modo libre con vida

Fecha: 6 de noviembre de 2026 · Autor: diseñador · Rama: `sprint-3/bucle` · Versión 2 (tras las revisiones)
Plan general: `docs/plan-juego-v2.md`. Evaluación de partida: `docs/evaluacion-rpg.md` (G1, G2, G3, I1, I2, I4).
Revisiones: `docs/revisiones/sprint-3-critico.md` y `docs/revisiones/sprint-3-pedagogia.md`.
Simulación de la economía: `qa/sim_economia.py` (sección 7).

## Cambios tras la revisión

| Cambio | Por qué |
|---|---|
| **Merma sube con las noches del reino**: un nivel cada 10 noches, con aviso la noche anterior. Antes subía con los días jugados. | Quien jugaba la historia de un tirón llegaba a la misión 15 sin haber visto el truco de Merma. Además, cambiar la fecha ya no influye en Merma (crítico, 1). |
| **Después del final, inflación baja y lenta.** Al apagar la máquina, los precios bajan un nivel y la hucha recupera un palito, pero no el brillo entero. Después, un nivel cada 30 noches, con aviso, hasta el nivel 4. Cambian la frase de Péndulo, el texto del final, la página 15 del Legado y la última frase de Merma. | Decisión del fundador. Pedagogía: la inflación no es culpa de un malo ni desaparece; el héroe apaga la máquina que la disparaba. |
| **Números de la variante C del crítico.** Calabaza 2/2/3, manzana 1 (2 con Merma 4); tope de 3 manzanas por árbol; 8 tierras con precios crecientes (10 → 250), 4 en el Mercado y 4 en el Valle. | Con los números de antes, las monedas dejaban de importar hacia el día 4. Ahora quien invierte bien nunca tiene más de 200 en la mano. |
| **Hogaza: una vez por día real fuera de las misiones**, pagando por aciertos, con una base que sube con Merma (3, 4, 5, 6). | Antes trabajar era una fuente más por noche. Pedagogía: con un sueldo fijo, el juego enseñaba que trabajar vale cada vez menos. |
| **Obra del molino** como meta de ahorro: 4 etapas en ladrillos (50, 100, 200 y 400 monedas con Merma 1). **Los ladrillos puestos no pierden valor con Merma.** | Da algo útil que comprar hasta el día 10 y una meta de ahorro que cambia el mundo. Una obra no es dinero quieto. |
| **Gestos en lugar de tareas.** Se replanta solo al cosechar; se riega deslizando el dedo por la fila; el abono va «en la mano»; se vende todo con un botón. Objetivo: 12 toques por noche o menos con 12 bancales. | El crítico contó entre 30 y 40 toques por noche, casi ninguno con decisión. |
| **La cesta tiene fechas.** Rábanos 2 noches, manzanas 4, calabazas 10. Lo pasado va a la **compostera** (3 frutos pasados = 1 abono), con aviso «pocho mañana». | Rompe la estrategia de guardar frutos hasta que suba Merma. Crea la decisión entre vender ya lo que caduca o guardar lo que aguanta. Nada se pierde de golpe. |
| **Riesgo suave:** la calabaza regada sale floja un 15 % de las veces; el rábano es seguro. | Pedagogía: «invertir no tiene riesgo» era un mensaje falso. Ahora hay una escalera: más rendimiento, más incertidumbre. |
| **Meta de ahorro visible** en la Mochila («Ahorras para…, te faltan {n}»). | Pedagogía: ahorrar *para algo* es el hábito básico; la hucha deja de parecer un error. |
| **Pepita de oro** que sube con Merma (15, 20, 25, 30). | Con un precio fijo, la frase «Merma no puede con ella» era falsa. |
| **«¡Bola de nieve!»** sale al comprar la primera tierra, no al replantar. | Replantar mantiene el capital; la bola crece al *ampliar* con lo cosechado. |
| **Encargo del día** (recomendable del crítico): un vecino pide unos frutos y paga 1,5 veces su precio. | La sorpresa del día que faltaba, sin tómbola: se elige por el número de día. |
| **La decisión de la misión 1 tiene efecto**: con las semillas, 2 semillas de rábano de más al abrir el huerto; con la hucha, la Mochila enseña desde el principio lo que compran sus monedas. | Los dos caminos acaban con brillo 4 (duda 5, aceptada) y no debía perderse la decisión. |
| **Textos** de pedagogía (sección 4 de su revisión), «Mañana, precios nuevos» en tono informativo y nunca notificaciones fuera del juego. | Globos de 3 frases, promesas absolutas, moralejas y frases falsas. |
| Se quedan para el **sprint 6**: secretos sin chispa hasta oír la pista, siesta con reloj de arena sobre el mapa, el efecto personal de Merma en «¡Buenos días!» y la frase «¡Necesitas más tierra!». | Mejoran la sensación, pero agrandan el sprint (decisión del jefe de equipo). |

## 0. Resumen

Después de la misión 2, el niño tiene **su propio huerto** junto a la casa de la señora Semilla. Planta con un toque, riega deslizando el dedo y cosecha todo de una vez: lo cosechado se replanta solo y lo que sobra va a la cesta, donde aguanta unas noches. Vende a Tasador, compra semillas, abono y tierras, cumple el **encargo del día** y ahorra para la **obra del molino**. El tiempo avanza con **las noches del reino**: las de las misiones, **dos siestas al día** y **la noche de vuelta** cuando vuelve otro día. **Merma** sube los precios cada 10 noches, con aviso, y la hucha pierde brillo. Puede **viajar a las zonas ya abiertas** también durante la historia; los vecinos tienen frases nuevas según lo que ha pasado, y hay secretos en el Mercado y en el Valle.

Fuera de este sprint: efectos de las criaturas, Chispín que evoluciona, niveles, talleres de la Ciudad, caprichos, eventos (helada, fiesta, tormenta) y quitar las preguntas finales. Ver `docs/plan-juego-v2.md`.

## 1. Qué descubre el niño (sin que nadie se lo explique)

1. **Lo que se planta da fruto, y ampliar hace crecer la bola.** Replantar mantiene el huerto; comprar tierra con lo cosechado lo hace más grande.
2. **Más rendimiento, más incertidumbre.** El rábano es seguro y da poco. La calabaza da más, pero a veces sale floja. El manzano tarda en crecer y luego da fruta cada noche.
3. **El dinero quieto, sin un fin, se encoge.** Cada 10 noches, Merma sube los precios. Lo guardado compra menos semillas. Los frutos, en cambio, se venden más caros, y los ladrillos puestos en el molino se quedan puestos.
4. **Ahorrar para algo tiene premio.** La meta de la Mochila y las etapas del molino cambian el mundo.
5. **Cuidar compensa, y no toda mejora vale.** Regar evita algunas cosechas flojas. El abono rinde en la calabaza, no en el rábano.
6. **Lo que se guarda demasiado se estropea.** Los frutos caducan: vender a tiempo es una decisión. Lo pasado no se pierde del todo: se convierte en abono.
7. **Volver tiene premio.** Mientras no está, el huerto crece y hay un encargo nuevo.

## 2. Una sesión de ejemplo (día 2, misión 5 en curso)

1. Abre el juego. **«¡Buenos días!»**: «Ha pasado una noche. Mercado: 8 rábanos listos. Encargo de hoy: Hogaza quiere 4 rábanos.»
2. La misión 5 está en el Valle. Abre el **Mapa** y viaja al Mercado.
3. Toca un bancal con fruto: se cosechan todos a la vez («+2», «+3 ¡Buena!»…) y se replantan solos. En la cesta quedan 9 rábanos.
4. Desliza el dedo por las dos filas con la regadera: salpicaduras en cadena y un sonido que sube de tono.
5. Toca a Hogaza: le da 4 rábanos y cobra 6 (en lugar de 4). Toca a Tasador: «Vender todo» (+10). Toca a la señora Semilla y compra la segunda tierra (16). «¡Bola de nieve! Lo cosechado ya planta más tierra.»
6. Panel **Huerto** → «Dormir una noche (quedan 2 hoy)». Toca la pantalla para saltar la noche. Vuelve a cosechar.
7. Vuelve al Valle desde el Mapa y sigue la misión 5 donde la dejó.

Unos 12 toques por noche, la mitad con una decisión: qué plantar, cuándo vender, en qué invertir.

## 3. Los bancales: dónde, cuándo y cómo conviven con las misiones

### 3.1 Celdas

Todas las celdas ya son de tierra en el dibujo del mapa. Solo hay sprites nuevos para el molino, la calabaza y el cartel de venta.

| Zona | Celdas (x, y) | Tipo | Se abre | Cómo |
|---|---|---|---|---|
| Mercado | (2,4) (3,4) (4,4) (5,4) | bancal | al ganar la misión 2 (`estado.mision > 2`) | gratis |
| Mercado | (2,5) (3,5) (4,5) (5,5) | bancal | al ganar la misión 3 (`estado.mision > 3`) | gratis: «el bancal de la señora Semilla». Son las parcelas de la historia |
| Mercado | (2,3) (3,3) (4,3) (5,3) | bancal | desde que se abre el huerto | **tierra nueva** a la venta (6.4) |
| Valle | (1,9) (2,9) (3,9) (4,9) | bancal | al ganar la misión 5 | **tierra nueva** a la venta: «las tierras de Copo». Son la fila de arriba de las parcelas de la misión 4 |
| Valle | (9,24) (11,24) (13,24) | hoyo de árbol | al ganar la misión 5 | gratis (el plantón se compra a Copo) |
| Mercado | (2..4, 18..20) | solar del molino | al ganar la misión 3 | obra por etapas (6.6) |

- Ciudad, Torre y Reloj no tienen huerto en este sprint (los talleres llegan en el sprint 4).
- La fila de abajo de las parcelas del Valle (`(1..4, 10)`) sigue siendo de la historia. Tocarla fuera de la misión 4 da la frase `parcela_historia` (12.1).
- Los árboles miden 2 losetas de ancho (`arbol_1`…`arbol_4`, 26 × 34 px): por eso los hoyos van separados por una columna. La casilla del pie de un árbol plantado es sólida (se suma a `Mapa.extra_solidos`, sin quitar el árbol de la misión 5). Se toca en su casilla y en la de encima.
- El molino ocupa 3 × 3 losetas (sprites `molino_0`…`molino_4`, 39 × 39 px; el 0 es el solar con un cartel). Sus casillas (2..4, 19..20) son sólidas desde la etapa 1.

### 3.2 Convivencia con las misiones

- **Un evento nuevo.** `Mundo.tocar` comprueba primero las celdas de huerto y del molino de la zona (`reino.bancales(zona)` y `reino.obra(zona)`) y emite **`"huerto"`** u **`"obra"`**, no `"parcela"`. Las misiones no escuchan esos eventos.
- **Inventario aparte.** El huerto propio usa `estado.huerto`, `estado.bolsa` y `estado.cesta` (sección 11). `estado.brotes`, `estado.semillas` y `estado.frutos` siguen siendo solo de la historia.
- **Las monedas sí se comparten.** Ninguna misión se bloquea por falta de monedas: todas las compras de la historia tienen otra opción, la regadera de la misión 2 se compra antes de que exista el huerto y Hogaza paga como mínimo 3.
- **Brotes de la historia.** Al empezar la misión 4 (o al cargar con `estado.mision > 3`), los brotes del Mercado se quitan de `estado.brotes` y pasan a la **bolsa** como semillas de rábano (1 por brote). Van a la bolsa y no a la cesta para que no caduquen. Aviso: «Los brotes de tu primer huerto: +{n} semillas». Al ganar la misión 5, igual con los brotes del Valle, con un máximo de 4. Se hace una sola vez (`estado.brotes_pasados`: `"mercado"` y `"valle"`).

## 4. Semillas, cuidados y cosecha

### 4.1 Lo que se planta

| Cultivo | Dónde | Desde (al ganar) | Noches hasta estar listo | Da | Riesgo |
|---|---|---|---|---|---|
| **Rábano** | bancales | misión 2 | 1 | 2 rábanos (3 si sale buena) | **seguro**: nunca sale flojo |
| **Calabaza** | bancales | misión 4 | 3 | 3 calabazas (5 si sale buena, 2 si sale floja) | algo de riesgo |
| **Manzano** | hoyos del Valle | misión 5 | 4 para crecer | desde la 5.ª noche, 2 manzanas **cada noche**, hasta **3** en el árbol | seguro, pero caro y lento |

- Un fruto de rábano o calabaza **también es semilla** (como en la misión 4).
- Dibujo de la planta:
  - rábano: `brote_chico` → `brote_fruto` (listo);
  - calabaza: `brote_chico` (3 noches), `brote_grande` (2 y 1 noches), `calabaza_lista` (sprite nuevo, 13 × 13);
  - manzano: `arbol_1` (recién plantado), `arbol_2` (noches 1–2), `arbol_3` (noches 3–4 o sin manzanas), `arbol_4` (con manzanas).
- Un bancal regado se pinta con la tierra más oscura (`rgba(43,34,48,0.25)`) hasta que se cosecha.
- Las tierras a la venta llevan un cartel (sprite nuevo `cartel_venta`, 13 × 13, con una moneda).

### 4.2 Gestos: la herramienta «en la mano»

En las zonas con huerto, encima de la barra de abajo hay una **ficha de herramienta** (`FichaMano`, 44 × 44 px o más) con el icono de lo que lleva en la mano. Un toque pasa a la siguiente herramienta disponible: **Regadera** (si tiene la de hierro) → **Abono ×n** → **Rábano ×n** → **Calabaza ×n** → **Plantón ×n**. Las que no tiene se saltan. Empieza en la regadera, o en la primera semilla si no tiene regadera.

| Toca… | Qué pasa |
|---|---|
| un bancal vacío | planta lo que lleva en la mano si es una semilla; si no, la más barata que tenga (rábano, luego calabaza; primero bolsa, luego cesta). Si no tiene ninguna, ver 6.7 |
| un bancal listo | **cosecha todos los bancales listos de la zona** y los **replanta solos** con el mismo cultivo (1 fruto de cada cosecha). Si lleva en la mano otra semilla con existencias, replanta con esa, sacándola de la bolsa: así se cambia de cultivo. El resto va a la cesta |
| un bancal que crece, con la regadera, y **desliza el dedo** | riega ese bancal y todos los que toque el dedo sin levantarlo: salpicadura en cadena y sonido `plantar` que sube de tono (`playbackRate` 1 + 0,06 × orden). Es un solo gesto. El héroe va al primer bancal; los demás se riegan a distancia |
| un bancal que crece, con el abono | lo abona sin preguntar (+2 frutos en su próxima cosecha) |
| un bancal que crece, con otra cosa | texto flotante: «Lista tras una noche» o «Lista en {n} noches» |
| un hoyo vacío | planta un plantón si tiene; si no, frase `hoyo_vacio` |
| un manzano con manzanas | las recoge todas |
| una tierra a la venta | ventana «Tierra nueva · {p} monedas» → «Comprarla» / «Ahora no» |

Regar basta una vez por siembra. Con la regadera reluciente o sin regadera no se riega: la regadera no sale en la ficha, y Yunque vende la de hierro.

### 4.3 Cosechar: riesgo suave, nunca cero

| Cultivo | Regado | Sin regar |
|---|---|---|
| Rábano | 30 % buena (3); si no, 2 | siempre 2 |
| Calabaza | 15 % floja (2), 25 % buena (5), 60 % normal (3) | 35 % floja (2), 5 % buena (5), 60 % normal (3) |
| Con abono | +2 frutos después de la suerte | +2 |

La suerte usa `Math.random()`, pero la función recibe el azar como parámetro para poder probarla. La primera cosecha floja, Chispín dice `primera_floja`.

### 4.4 La cesta, las fechas y la compostera

- La cesta guarda **lotes** con las noches que llevan dentro. Un fruto aguanta: **rábano 2 noches, manzana 4, calabaza 10**. La pepita de oro no caduca.
- Al pasar la noche, lo que se pasa de su límite sale de la cesta y va a la **compostera**: cada 3 frutos pasados dan **1 abono** en la bolsa (lo que sobra se queda para la siguiente). Aviso no bloqueante: «La compostera te da 1 abono.»
- **Aviso antes (pérdida suave y anunciada):** cuando un lote está en su última noche, la cesta (Mochila y puesto) lo marca con la etiqueta **«pocho mañana»** y «¡Buenos días!» lo dice («4 rábanos se pondrán pochos mañana»).
- Vender, cumplir encargos y plantar desde la cesta usan primero lo más viejo.

## 5. El tiempo del reino

### 5.1 Las noches

`estado.tiempo` cuenta **todas las noches del reino** y solo sube. En cada noche, cada planta suma una noche, los manzanos crecidos dan manzanas, los lotes de la cesta envejecen y Merma puede subir.

| Noche | Cuándo | Tope |
|---|---|---|
| **De misión** | cada `interfaz.pasar_noche()` de una misión (unas 30 en la historia) | sin tope: la historia es finita |
| **Siesta** | botón «Dormir una noche» del panel Huerto, si `!estado.ocupado` y no hay ventana abierta | **2 por día real** |
| **De vuelta** | al abrir el juego en un día real nuevo | **1**, o **2** si han pasado 2 días o más |

`interfaz.pasar_noche()` llama a `reino.noche()` justo después de cambiar la estación, en todos los casos. La siesta usa `pasar_noche(siguiente_estacion, "El huerto crece mientras duermes.")`. La noche de vuelta no enseña pantalla de noche: la enseña «¡Buenos días!».

**La noche se salta tocando:** un toque durante la pantalla de noche o de viaje salta a la mitad que falta (fundido de 0,2 s).

### 5.2 La vuelta, el regalo y el encargo del día

Al cargar la partida (antes de que la misión retome) y al volver del segundo plano (si `!estado.ocupado`), se llama a `reino.al_abrir(hoy)`, con la fecha local `"AAAA-MM-DD"`:

1. Si `hoy <= estado.dia`: no pasa nada (mismo día, o el reloj ha ido hacia atrás).
2. Si `hoy > estado.dia`: día nuevo. `dias_jugados += 1`, `siestas_dia = 0`, `dia = hoy`; noches de vuelta (1 o 2); **regalo del día** (1 semilla de rábano los días impares y 1 de calabaza los pares, si `mision > 4`); **encargo del día** (6.5); pantalla **«¡Buenos días!»** (10.3).

El regalo y el encargo no se acumulan: faltar varios días no da más ni enseña nunca «te perdiste…». La partida nueva empieza con `dia = hoy` y `dias_jugados = 1`, sin pantalla.

### 5.3 Fecha del móvil

`estado.dia` guarda el día más alto visto: atrasar la fecha no da nada. Adelantarla da lo mismo que un día de juego (2 noches, 2 siestas, regalo y encargo). Como **Merma va por noches**, cambiar la fecha no la sube ni la baja. Se acepta (decisión del fundador).

## 6. Economía con uso

### 6.1 Puestos y vecinos con oficio

«Desde» quiere decir al ganar esa misión (`estado.mision > N`).

| Vecino | Zona | Desde | Vende | Compra |
|---|---|---|---|---|
| **Señora Semilla** | Mercado | 2 | semilla de rábano; calabaza (desde la 4); abono (desde la 3); tierras nuevas | — |
| **Tasador** | Mercado | 2 | — | rábanos, calabazas, manzanas, pepita |
| **Yunque** | Mercado | 2 | regadera de hierro (si no la tiene); **ladrillos para el molino** (desde la 3) | — |
| **Copo** | Valle | 5 | plantón de manzano; semillas de rábano y calabaza; tierras de Copo | rábanos, calabazas, manzanas |
| **Hogaza** | Mercado | 2 | trabajo: amasar (6.3) | — |

### 6.2 Precios y Merma

`estado.merma` vale 0 antes de la misión 1, **1** desde la misión 1 (la misión 1 lo pone en sus dos caminos) y **3** como mucho durante la historia; después del final puede llegar a **4**.

| Nivel de Merma | 1 | 2 | 3 | 4 (solo tras el final) |
|---|---|---|---|---|
| Semilla de rábano | 2 | 3 | 4 | 5 |
| Semilla de calabaza | 5 | 6 | 8 | 9 |
| Plantón de manzano | 20 | 25 | 30 | 35 |
| Abono | 4 | 5 | 6 | 7 |
| Regadera de hierro | 8 | 10 | 12 | 14 |
| Ladrillo del molino | 5 | 6 | 7 | 8 |
| Tierras nuevas (por 1 / 1,2 / 1,4 / 1,6) | 10, 16, 26, 40, 65, 100, 160, 250 | ×1,2 | ×1,4 | ×1,6 |
| **Tasador paga** por rábano / calabaza / manzana | 1 / 2 / 1 | 2 / 2 / 1 | 2 / 3 / 1 | 3 / 3 / 2 |
| Pepita de oro (secreto) | 15 | 20 | 25 | 30 |
| Hogaza: base del trabajo | 3 | 4 | 5 | 6 |

El precio de cada tierra depende de cuántas se han comprado ya (la n-ésima cuesta el n-ésimo número de la lista), sea del Mercado o del Valle. Se redondea al entero más cercano.

**Cuándo sube (durante la historia).** `estado.merma_desde` guarda el `tiempo` de la última subida (o de la misión 1). En cada noche, si no se ha ganado la misión 15, `merma < 3` y `tiempo - merma_desde >= 10`, Merma sube un nivel. Con unas 30 noches de historia, **todo niño ve las dos subidas antes de la misión 15**, juegue deprisa o despacio.

**Aviso la noche anterior** (`tiempo - merma_desde === 9`): aviso no bloqueante después de la noche y etiqueta en los puestos: **«Mañana, precios nuevos»**.

**Al subir:** aviso «Merma ha subido los precios. Tus monedas brillan menos.», sonido `malo` y el palito de brillo que se apaga parpadea tres veces. Durante esa noche, en los puestos, los precios que han subido enseñan el de antes tachado.

**Al ganar la misión 15** (cuando se pone `estado.maquina_apagada`): `merma = max(1, merma - 1)` y `merma_desde = tiempo`. Los precios bajan un nivel: las monedas de más que escupía la máquina se van con ella. La hucha recupera un palito, pero no el brillo entero. **Después**, Merma sube un nivel cada **30 noches**, con el mismo aviso, hasta el nivel 4: «los precios suben despacito, como en todas partes». En el modo libre son unos 10 días de juego por nivel. Las temporadas del sprint 5 seguirán desde aquí.

**La hucha y su brillo.** `estado.brillo` vale siempre `5 − estado.merma` (4, 3, 2 y, tras el final, 3, 2 o 1). Solo lo escribe `reino`. La Mochila enseña «Con tus monedas compras {n} semillas de rábano (antes, {m})» si Merma ha subido alguna vez. `m` se calcula con el precio del nivel anterior.

**Cambio en la misión 1.** En `reto()`, los dos caminos ponen `estado.merma = 1` en lugar de `brillo = 3` o `4`, y guardan `estado.eleccion_m01` (`"hucha"`, `"semillas"` o `"caramelo"`). El resultado de la hucha enseña 4 palitos dorados, para que coincida con el marcador. La página 1 del Legado pasa a «Merma roba brillo a las monedas. Lo plantado crece.» (pedagogía).

**Efecto de la decisión de la misión 1:**
- `"semillas"`: en la presentación del huerto (8.3), la señora Semilla da 2 semillas de rábano más (`presenta_m01`).
- `"hucha"`: la línea de la hucha de la Mochila sale desde la misión 1, comparando con el precio del pan («Tus monedas compraban {antes} panes; hoy, {hoy}»). Desde la misión 3 pasa a contar semillas.

### 6.3 Trabajo con Hogaza

- El minijuego de amasar paga **base + 1 por golpe bueno + 2 si son 6 de 6**, y **+1 si el molino tiene la etapa 2**. La base sube con Merma (3, 4, 5, 6; 3 con Merma 0). Cambia `MinijuegoAmasar` (`y = Math.max(3, Math.min(5, a))`) por `reino.pago_trabajo(aciertos)`. Vale para las misiones 1, 2 y 7.
- Fuera del guion, Hogaza da trabajo **una vez por día real** (`estado.ultimo_trabajo === estado.dia` → ya ha trabajado). La misión 2 usa el mismo campo en lugar de `ultima_estacion_amasar` (la misión 1 no lo marca, así que en la 2 siempre se puede trabajar).

### 6.4 Tierras nuevas

8 tierras: las 4 de la fila 3 del Mercado (desde que se abre el huerto) y las 4 de la fila 9 del Valle (desde la misión 5). Se compran donde se quiera, en el puesto de la Semilla (Mercado) o de Copo (Valle), o tocándolas. Precio: 6.2. Quedan en `estado.tierras` para siempre.

La primera vez que compra una tierra: «¡Bola de nieve! Lo cosechado ya planta más tierra.» (la señora Semilla o Copo). Se marca `estado.bola_de_nieve = true`.

### 6.5 Encargo del día

Cada día nuevo, un vecino pide unos frutos. Se elige por `dias_jugados` en esta lista, saltando los que aún no están abiertos (zona o cultivo):

| Orden | Vecino | Pide | Desde (al ganar) |
|---|---|---|---|
| 1 | Hogaza | 4 rábanos | 2 |
| 2 | Tasador | 6 rábanos | 2 |
| 3 | Semilla | 3 calabazas | 4 |
| 4 | Copo | 3 manzanas | 5 |
| 5 | Antojo | 2 calabazas | 4 |
| 6 | Raíz | 2 manzanas | 5 |

- **Pago:** 1,5 veces lo que pagaría Tasador, redondeando hacia arriba (por ejemplo, 4 rábanos con Merma 1 = 6).
- Se anuncia en «¡Buenos días!», en la Mochila («Encargo de hoy: …») y con un «!» flotante sobre el vecino cada 3 segundos.
- Al tocar al vecino con los frutos en la cesta: ventana «¿Le das {n} {frutos}? · +{p}» → «Dárselos» / «Ahora no». Sin los frutos, su frase normal y «Te espero con {n} {frutos}».
- Uno al día. Caduca con el día; no se acumula.

### 6.6 La obra del molino: ahorrar para algo

Al ganar la misión 3 aparece en el Mercado un **solar con un cartel** (`molino_0`). Yunque es el maestro de obras. Tocar el solar o pedírselo a Yunque abre la ventana **Obra** (10.6).

| Etapa | Ladrillos (acumulados) | Monedas con Merma 1 | Qué cambia en el mundo |
|---|---|---|---|
| 1 · Rueda | 10 (10) | 50 | Aparece la rueda (`molino_1`), que gira en 2 fotogramas. El Mercado brilla un poco más (radio de luz nuevo sobre el molino). |
| 2 · Muros | 20 (30) | 100 | `molino_2`. Hay harina: **Hogaza paga 1 más** por trabajo. |
| 3 · Tejado | 40 (70) | 200 | `molino_3`. Se abre una puerta: el **secreto del desván** (8.4). |
| 4 · Aspas | 80 (150) | 400 | `molino_4`: el molino entero, con aspas que giran. Se ve en el panel Mapa (icono `rueda`) y la Mochila enseña «Medalla del molino». |

- Se aporta **en ladrillos**: «Poner 1 ladrillo · {p}» o «Poner 5 · {5p}». Cada ladrillo puesto cuenta para siempre.
- **Línea de diseño para pedagogía: lo aportado al molino no pierde valor con Merma. Se aporta en ladrillos, y un ladrillo puesto se queda puesto: Merma encarece los ladrillos que faltan, no los que ya están en la pared. Una obra que se construye no es dinero quieto; es algo real que crece y sirve.**
- No se puede deshacer ni vender. Al terminar cada etapa suena `fanfarria`, hay un estallido dorado de 30 y Yunque dice una frase (12.2).

### 6.7 Nadie se queda sin jugar

`reino.puede_jugar()` es verdadero si hay algo plantado, semillas en la bolsa, rábanos o calabazas en la cesta o monedas para una semilla de rábano. Si es falso al tocar un bancal vacío, **la señora Semilla regala una semilla de rábano**, como mucho una por noche (`estado.ultimo_regalo`). Hogaza da trabajo una vez al día.

### 6.8 No hay monedas infinitas

Toda fuente depende de una noche o de un día: cosechas y manzanas (una vez por noche y bancal; 16 bancales y 3 árboles como mucho), Hogaza (una vez al día), encargo (uno al día), regalos (uno al día, y uno por noche solo si no puede jugar) y secretos (una vez cada uno). Las noches tienen tope fuera de la historia (5.1). No se pueden vender semillas, abono, tierras ni ladrillos. Cota de la simulación: el mejor jugador gana como mucho unas 490 monedas en un día de historia, y casi todas se van en tierras y ladrillos.

### 6.9 Meta de ahorro

La Mochila tiene una línea **«Ahorras para: {meta}. Te faltan {n}.»** con una barra de progreso. Tocándola se cambia de meta entre las disponibles: la siguiente tierra, un plantón (si hay un hoyo libre), la regadera de hierro (si no la tiene) y la etapa del molino que falta. Empieza en la más barata. Cuando las monedas llegan, aviso «¡Ya tienes para {meta}!». Se guarda en `estado.meta`.

## 7. Simulación de 10 días

`python3 qa/sim_economia.py` (media de las semillas 1 a 7; con cada semilla por separado, las comprobaciones también pasan). Suposiciones:
- El huerto se abre el día 1, tras la misión 2 (`tiempo` = 5).
- Los días 1 a 4 hay 25 noches de misión (4, 7, 7 y 7); la misión 15 se gana al final del día 4.
- Las tierras y los hoyos del Valle se abren el día 2.
- Cada día hay 2 siestas y, desde el día 2, la noche de vuelta.
- Se empieza con 20 monedas y 2 semillas de rábano.
- El modelo cuenta 6 toques por noche con el huerto lleno: cosechar, 2 gestos de riego y 3 para vender.

Formas de jugar:
- **Hucha**: trabaja cada día (4 golpes buenos) y lo guarda todo.
- **Vende todo**: rábanos; no replanta (vende también el fruto que se replantaría) y recompra la semilla.
- **Replanta e invierte**: replanta solo, riega, cumple el encargo, vende y compra manzanos, tierras, calabazas y ladrillos para el molino.
- **Acapara**: replanta, pero no vende hasta Merma 3.
- **Despistado**: no trabaja, no riega y no duerme siestas.
- **Máximo**: como «replanta e invierte», con abono en todas las calabazas y trabajo perfecto. Sirve de cota.

Patrimonio al final de cada día (monedas + cesta, bolsa y plantas a precio de hoy + tierras + ladrillos puestos); entre paréntesis, las monedas en la mano:

| Forma de jugar | día 1 | día 2 | día 4 | día 6 | día 8 | día 10 | máx. monedas en mano | máx. ganadas en un día |
|---|---|---|---|---|---|---|---|---|
| Hucha (trabaja y guarda) | 33 (27) | 43 (35) | 59 (53) | 75 (69) | 91 (85) | 107 (101) | 101 | 9 |
| Vende todo (no replanta) | 39 (15) | 135 (103) | 145 (121) | 209 (185) | 273 (249) | 337 (313) | 313 | 329 |
| **Replanta e invierte** | 104 (17) | 468 (90) | 1139 (23) | 1409 (23) | 1679 (22) | 1948 (106) | **179** | 459 |
| Acapara frutos para Merma | 129 (15) | 359 (23) | 744 (502) | 883 (640) | 1027 (784) | 1168 (925) | 947 | 275 |
| Despistado (sin siestas) | 48 (32) | 168 (144) | 424 (400) | 456 (432) | 488 (464) | 520 (496) | 496 | 128 |
| Máximo posible (cota) | 110 (7) | 473 (93) | 1147 (23) | 1418 (23) | 1690 (22) | 1967 (122) | 185 | 487 |

Más datos de la misma ejecución:
- Merma al final de cada día: 2, 3, 3, 2 (misión 15 ganada), 2, 2, 2, 2, 2, 2.
- Etapas del molino de «replanta e invierte»: la 1.ª el día 4, la 2.ª el 5, la 3.ª el 6 y la 4.ª el 10.
- Último día con una compra útil (tierra, plantón o ladrillos): el 9 o el 10 en las 7 semillas.
- 27 monedas guardadas compran 13 semillas de rábano con Merma 1, 9 con Merma 2 y 6 con Merma 3.
- Quien acapara manda de media 132 frutos a la compostera.

Conclusiones:
- **Replantar e invertir > vender todo > guardar:** 1.948 > 337 > 107 el día 10. Replantar e invertir da casi 6 veces más que vender todo. Esto corrige el «gana el doble» de la versión 1.
- **Las monedas en la mano siguen importando:** quien invierte nunca pasa de 179 (el máximo pasa de 185), y siempre tiene algo útil que comprar hasta el día 9 o 10 (comprobado: `>= 8`).
- **Acaparar ya no gana:** 1.168 frente a 1.948, porque los frutos caducan.
- **Quien no invierte acumula monedas quietas:** el despistado llega a 496 y el acaparador a 947. Es su decisión: esas monedas pierden brillo y la Mochila les propone una meta. La comprobación de «menos de 350» se aplica a quien usa los sumideros (replanta, máximo, vende todo y hucha).
- **Nadie se queda sin jugar** (comprobado en cada noche, y con un niño sin nada que recibe una semilla), y **no hay fuentes infinitas** (como mucho unas 490 monedas en un día).

## 8. Modo libre con vida y vuelta a zonas

### 8.1 Viajar durante la historia

- El panel **Mapa** enseña «{zona} · viajar» para cada zona abierta (`estado.mision >=` primera misión de la zona) que no sea la actual, **también durante la historia**, si `vida.puede_viajar()`:
  - no hay nada hablando ni ventana abierta;
  - el paso actual es un punto de control (`mision.puntos_control().includes(estado.paso)`);
  - el paso no es un viaje del guion (`ir_valle`, `ir_ciudad`, `ir_torre`, `ir_reloj`).
  Si no se puede, la fila dice «ABIERTO · termina este paso».
- La zona de la misión lleva la etiqueta **«TU MISIÓN»**. La misión guarda su zona al llamar a `paso()` (`this.zona_mision = estado.zona`).
- **Fuera de la zona de la misión:**
  - el texto de misión dice «Tu misión sigue en {zona}. Toca el mapa para volver.»;
  - no hay flecha (`objetivo_fn` devuelve `null`);
  - los eventos `npc`, `parcela`, `lugar` y `llegada` no van a la misión: `npc` va a `vida.npc()`, y los demás a la vida del reino o a ninguna parte.
- **Al volver:** `Mundo.restaurar(estado.mision)`, `mision.preparar_punto(estado.paso)`, el héroe en la entrada de la zona y `mision.paso(estado.paso)`.
- La misión expone su instancia en `interfaz.mision_actual` (en `MisionBase.jugar`; `null` en modo libre).

### 8.2 Vecinos que hablan según el progreso

`MisionBase.charla(a)` (lo que pasa al tocar a un vecino que la misión no necesita) llama a `vida.npc(a)`:
1. Si el vecino tiene un **encargo** hoy y la cesta lo cubre: la ventana del encargo (6.5).
2. Si tiene oficio y su puesto está abierto (6.1): abre el puesto, con su frase arriba. Hogaza ofrece trabajo si no ha trabajado hoy; si no, su frase y `trabajo_hecho`.
3. Si no: una frase de `textos/vecinos.ts` (12.3) cuyo `desde <= estado.mision` y cuya condición se cumpla. Primero la más nueva; después, rotando.
4. Si no hay ninguna: la `charla_{npc}` de la misión, como hasta ahora; y si no, «¡Hola!».

En modo libre, `main.ts` escucha `npc` y `parcela` y llama a `vida.npc()` y `vida.parcela()`. Los villanos ocultos no aparecen.

### 8.3 Presentación del huerto (una vez)

En el primer `paso()` de la misión 3 (o al cargar con `mision >= 3` y `huerto_presentado === false`), la vida del reino lanza el diálogo de la señora Semilla (`presenta_1`…`presenta_3`; además `presenta_m01` si `eleccion_m01 === "semillas"`). Da 2 semillas de rábano (4 si eligió semillas en la misión 1), pone la flecha en el primer bancal hasta que planta y marca `huerto_presentado = true`. La misión no se entera.

### 8.4 Secretos

Activos en el Mercado desde la misión 3 y en el Valle desde la 6. Mientras un secreto no se ha encontrado, su casilla suelta una chispa dorada pequeña cada 4 segundos, y un vecino da una pista (12.3). Al tocar la casilla (evento `lugar`), el héroe va a su lado y, al llegar, suena `fanfarria`, hay un estallido dorado de 30, un diálogo corto y el premio. Una sola vez (`estado.secretos`). El Mapa enseña «Secretos {n}/{total}» (Mercado 4, contando el del molino; Valle 3).

| id | Zona | Casillas | Premio | Pista |
|---|---|---|---|---|
| `fuente` | Mercado | el agua de la fuente (6..8, 12..13) | 10 monedas | Hogaza |
| `engranaje` | Mercado | (9,2), junto a la máquina vieja | 2 abonos | Yunque |
| `banco` | Mercado | (4,24), entre los pinos del sur | **Nota del abuelo 1** + 1 semilla de calabaza | Tasador |
| `desvan` | Mercado | la puerta del molino, (3,20), desde la etapa 3 | **Nota del abuelo 3** + 2 abonos | Yunque, al terminar la etapa 3 |
| `cueva` | Valle | la roca de la cueva (0..2, 24..26) | **pepita de oro** (a la cesta; no caduca; vale 15–30 según Merma) | Raíz |
| `lago` | Valle | el hielo del lago (9..12, 18..19) | 1 plantón de manzano | Escarcha |
| `pino` | Valle | (12,27), junto al último pino | **Nota del abuelo 2** + 1 abono | Anillos |

Las notas se leen con la ventana `carta` y quedan en la Mochila. El programador comprueba con `Mapa.bloqueado` que se llega al lado de cada casilla.

## 9. Sensación mínima

Con los 7 sonidos que ya hay y `mundo.estallido`, más un **texto flotante** nuevo: `mundo.flotante(celda, texto, color)`. Sube 10 px, se desvanece en 0,8 s y se dibuja en el lienzo con Pixelify Sans a 7 px de mapa (14 px en pantalla a escala 2; 12,9 px en un Android de 360) con contorno `#2b2230`. `interfaz.sonar(nombre, tono = 1)` acepta un `playbackRate`.

| Acción | Sonido | Respuesta visual |
|---|---|---|
| Plantar | `plantar` | estallido verde claro (10); el brote aparece con un rebote (escala 1,4 → 1 en 0,2 s) |
| Regar deslizando | `plantar`, subiendo de tono en cada bancal | estallido azul (10) en cadena; la tierra se oscurece |
| Abonar | `plantar` | estallido marrón `#8a6a4a` (10); flotante «+2» |
| La noche hace crecer | — | estallido verde pequeño (4) en cada planta que cambia de dibujo |
| Cosecha normal / buena / floja | `acierto` / `acierto` ×2 / — | flotante blanco «+{n}» / dorado «+{n} ¡Buena!» y estallido dorado / gris «+{n}» |
| Replantado solo | `plantar` (una vez) | rebote del brote en cada bancal replantado |
| Recoger manzanas | `acierto` | flotante «+{n}» |
| Vender, encargo | `moneda` | estallido dorado (14) sobre el héroe; pulso del contador (escala 1,3 en 0,25 s); flotante «+{n}» |
| Comprar, ladrillo | `moneda` | el icono da un salto; el contador parpadea en rojo; el ladrillo vuela a la barra de la obra |
| No llegan las monedas | `fallo` | el botón tiembla (±3 px, 0,25 s) |
| Compostera | `plantar` | aviso con el icono `abono` |
| Merma sube | `malo` | parpadeo del palito de brillo que se apaga |
| Etapa del molino, secreto | `fanfarria` | estallido dorado (30) |
| Saltar la noche | `siguiente` | fundido rápido |

## 10. Interfaz

Texto de 11 px o más (diálogo de 18 px), toques de 44 px o más, como mucho dos frases por globo. Las ventanas nuevas usan `interfaz.abrir(tipo, datos)`. **Nunca hay notificaciones fuera del juego**, en ningún sprint: todos los avisos viven dentro.

### 10.1 Puesto (`interfaz.puesto(vecino)`)

- Arriba: «Cerrar» (el **primero** en el orden del documento, para que el bot de QA cierre y no compre), el nombre del vecino y su frase en un `Bocadillo`.
- **Comprar:** una fila por objeto (icono, nombre, línea corta, «tienes {n}», «Comprar · {p}»). Sin monedas, el botón queda desactivado con «Te faltan {n}». Las etiquetas «Mañana, precios nuevos» y el precio de antes tachado, según 6.2.
- **Vender:** «Vender todo · +{total}» arriba, y una fila por fruto con «{n} × {p}», la etiqueta «pocho mañana» si toca y «Vender · +{n·p}». Sin nada: «No tienes frutos. ¡A cosechar!»
- Abajo, las monedas. Cada compra o venta se aplica al momento.

### 10.2 Ficha de herramienta (`FichaMano`)

Se ve en las zonas con huerto, encima de la barra de abajo y a la izquierda: el icono de la herramienta y el número que queda. Un toque cambia de herramienta (4.2).

### 10.3 «¡Buenos días!» (`interfaz.buenos_dias(resumen)`)

Como mucho 5 líneas: noches pasadas, lo que está listo por zona, lo que se pone pocho mañana, el encargo de hoy y el regalo (con icono), y la línea de Merma si toca. Botón «¡A jugar!».

### 10.4 Aviso (`interfaz.aviso(texto, icono)`)

Una tira de 3 s bajo el marcador, que ni bloquea ni pide toque.

### 10.5 Paneles

- **Huerto:** por zona, plantas y listas; botón «Dormir una noche (quedan {n} hoy)» o el texto `sin_sueno`. El indicador del botón Huerto cuenta lo listo en todas las zonas.
- **Mochila:**
  - bolsa y cesta (con «pocho mañana»);
  - compostera {c}/3;
  - meta de ahorro (6.9);
  - línea de la hucha (6.2);
  - encargo de hoy;
  - etapa del molino;
  - notas del abuelo.
- **Mapa:** viaje en la historia (8.1), «TU MISIÓN», «Secretos {n}/{total}», «{n} listos» y el molino si está entero.
- **Criaturas:** la descripción de Chispín pasa a «Tu primer amigo en Valoria.».

### 10.6 Obra del molino (`interfaz.obra()`)

Dibujo de la etapa actual, «Etapa {e}: {nombre}», barra «{puestos}/{necesarios} ladrillos», «Un ladrillo cuesta {p}», botones «Poner 1 ladrillo · {p}» y «Poner 5 · {5p}» (desactivados si no llegan), la línea `obra_merma` y «Cerrar» (primero).

## 11. Guardado

### 11.1 Campos nuevos en `estadoInicial()`

```ts
tiempo: 0,              // noches del reino (misión, siesta y vuelta)
merma: 0,               // nivel de Merma 0..4 (1 desde la misión 1); brillo = 5 - merma
merma_desde: 0,         // `tiempo` de la última subida o bajada
dia: "",                // día real más alto visto, "AAAA-MM-DD"
dias_jugados: 0,
siestas_dia: 0,
huerto: [],             // [{ zona, x, y, cultivo, edad, regada, abono, manzanas }]
tierras: [],            // ["mercado:2,3", "valle:1,9", ...]
bolsa: { rabano: 0, calabaza: 0, manzano: 0, abono: 0 },
cesta: [],              // lotes: [{ fruto: "rabano"|"calabaza"|"manzana"|"pepita", n, noches }]
compost: 0,             // frutos pasados, 0..2
mano: "",               // herramienta en la mano
ultimo_trabajo: "",     // `dia` del último trabajo con Hogaza
ultimo_regalo: -1,      // `tiempo` del último regalo por no poder jugar
encargo: null,          // { dia, npc, fruto, n } o null
ladrillos: 0,           // ladrillos puestos en el molino (la etapa se calcula)
meta: "",               // "tierra" | "planton" | "regadera" | "molino"
secretos: [],
eleccion_m01: "",       // "hucha" | "semillas" | "caramelo"
huerto_presentado: false,
brotes_pasados: [],     // "mercado", "valle"
bola_de_nieve: false,
total_replantado: 0,    // frutos devueltos a la tierra (lo usará Chispín en el sprint 4)
```

Sale `ultima_estacion_amasar`. `brillo` se queda, pero solo lo escribe `reino`. `guardar()` ya escribe todas las claves de `estadoInicial()`.

### 11.2 Migración (en `cargar()`, `reino.sanear()`)

- Si el guardado no traía `merma`: `merma = mision > 1 ? 1 : 0`, `tiempo = 2 * (mision - 1)`, `merma_desde = tiempo`, `dias_jugados = 1`, `dia = ""` (la primera vez tras la actualización hay noche de vuelta y «¡Buenos días!»). Si `maquina_apagada`: `merma = 1`.
- `eleccion_m01`: `"semillas"` si el guardado traía `brillo === 4`, `"hucha"` si traía `3` y `""` si no se sabe.
- `brillo = 5 - merma`; brotes de la historia según 3.2; `ultimo_trabajo = ""`.
- Sanear lo leído de `localStorage`: enteros de 0 en adelante; `huerto` solo con celdas de `reino.bancales()`, cultivos válidos y sin repetir celda; `cesta` solo con frutos válidos y `n > 0`; `tierras`, `secretos` y `brotes_pasados` solo con valores conocidos; `merma` entre 0 y 4; `dia` con forma `AAAA-MM-DD` o `""`; `ladrillos` entre 0 y 150.

### 11.3 Cuándo se guarda

Cada acción del reino (plantar, regar, cosechar, comprar, vender, encargo, trabajar, ladrillo, siesta, secreto, viaje) termina con `vida.guardar()`:
- **Modo libre:** `estado.guardar()`.
- **Historia, en un punto de control:** `estado.guardar(estado.paso, celda, mision.campos_punto(), zona_mision)`. Si el héroe está en otra zona, se guarda con la zona de la misión y sin `celda`. `guardar()` recibe un cuarto parámetro opcional, `zona`.
- **Historia, en un paso sin punto de control:** no se guarda. Al volver a abrir, se vuelve al último punto y lo hecho en el huerto desde entonces se deshace entero. Es coherente y pierde como mucho un paso.

Caso que hay que probar: misión 4, paso `plantar`, con alguna semilla de la historia ya plantada (funciona igual que hoy).

## 12. Textos nuevos y cambiados

Marcas `{o}`, `{el}`, `{un}`, `{Un}` y `{nieto}`: `docs/textos-genero.md`. Como mucho dos frases por globo.

### 12.1 Huerto, puestos y obra (`juego/src/textos/huerto.ts`)

| Clave | Quién | Texto |
|---|---|---|
| `sin_semillas` | Chispín | No nos quedan semillas. La señora Semilla vende. |
| `regalo_red` | Semilla | ¿Sin nada que plantar? Toma, ¡que no pare el huerto! |
| `lista_1` / `lista_n` | flotante | Lista tras una noche / Lista en {n} noches |
| `regada` | flotante | ¡Regada! |
| `primera_floja` | Chispín | Sin regar, a veces la cosecha sale floja. |
| `buena` | flotante | +{n} ¡Buena! |
| `tierra_titulo` / `tierra_comprar` | ventana | Tierra nueva · {p} monedas / Comprarla |
| `bola_de_nieve` | Semilla o Copo | ¡Bola de nieve! Lo cosechado ya planta más tierra. |
| `faltan` | botón | Te faltan {n} |
| `hoyo_vacio` | Chispín | Aquí cabe un manzano. Copo vende plantones. |
| `arbol_crece` / `arbol_vacio` | flotante | Dará manzanas en {n} noches / Mañana, más manzanas |
| `arbol_lleno` | aviso | Un manzano está lleno de manzanas. |
| `parcela_historia` | Chispín | Estos bancales son de Copo. |
| `pocho` | etiqueta | pocho mañana |
| `compost` | aviso | La compostera te da 1 abono. |
| `brotes_pasados` | aviso | Los brotes de tu primer huerto: +{n} semillas. |
| `dormir` / `sin_sueno` | panel | Dormir una noche (quedan {n} hoy) / Chispín ya no tiene sueño. Mañana, más noches. |
| `noche_siesta` | noche | El huerto crece mientras duermes. |
| `bd_titulo`, `bd_una`, `bd_dos` | Buenos días | ¡Buenos días! · Ha pasado una noche. · Han pasado dos noches. |
| `bd_listos` | Buenos días | {zona}: {n} {frutos} listos |
| `bd_pocho` | Buenos días | {n} {frutos} se pondrán pochos mañana. |
| `bd_regalo` | Buenos días | Chispín ha encontrado una semilla de {cultivo}. |
| `bd_encargo` | Buenos días | Encargo de hoy: {vecino} quiere {n} {frutos}. |
| `bd_boton` | botón | ¡A jugar! |
| `merma_manana` | aviso y etiqueta | Mañana, precios nuevos. |
| `merma_sube` | aviso | Merma ha subido los precios. Tus monedas brillan menos. |
| `merma_final` | aviso (subidas tras el final) | Los precios suben despacito, como en todas partes. |
| `hucha_compra` / `hucha_antes` | Mochila | Con tus monedas compras {n} semillas de rábano. / (antes, {m}) |
| `hucha_pan` | Mochila (camino de la hucha, misiones 1–2) | Tus monedas compraban {antes} panes; hoy, {hoy}. |
| `meta` / `meta_lista` | Mochila / aviso | Ahorras para: {meta}. Te faltan {n}. / ¡Ya tienes para {meta}! |
| `nada_que_vender` | puesto | No tienes frutos. ¡A cosechar! |
| `vender_todo` | puesto | Vender todo · +{n} |
| Descripciones | puesto | Rábano: «Crece en 1 noche. Seguro.» · Calabaza: «Crece en 3 noches. Da más, a veces menos.» · Plantón: «Tarda 4 noches. Luego, manzanas cada noche.» · Abono: «2 frutos más en un bancal.» · Regadera de hierro: «Menos cosechas flojas.» · Tierra nueva: «Un bancal más, para siempre.» · Pepita de oro: «Merma no puede con ella.» (es verdad: su precio sube con Merma) |
| Títulos | puesto | Puesto de la señora Semilla · Tasador compra · Fragua de Yunque · Puesto de Copo |
| `obra_titulo` | obra | Obra del molino · Etapa {e}: {nombre} (Rueda, Muros, Tejado, Aspas) |
| `obra_merma` | obra | Los ladrillos puestos se quedan puestos. |
| `obra_poner` | botones | Poner 1 ladrillo · {p} / Poner 5 · {p} |

### 12.2 Vida del reino (`juego/src/textos/vecinos.ts`)

| Clave | Quién | Texto |
|---|---|---|
| `presenta_1` | Semilla | ¡Ya eres hortelan{o}! Estos cuatro bancales son tuyos. |
| `presenta_2` | Semilla | Te regalo dos semillas de rábano. Crecen en una sola noche. |
| `presenta_m01` | Semilla | Y tus brotes del primer día dieron semilla: ¡dos más! |
| `presenta_3` | Chispín | ¡Toca un bancal para plantar! |
| `trabajo_titulo` | ventana | ¿Amasas conmigo? Pago {b}, y 1 más por golpe bueno. |
| `trabajo_hecho` | Hogaza | Hoy ya has amasado. ¡Vuelve mañana! |
| `encargo_titulo` / `encargo_dar` | ventana | ¿Le das {n} {frutos}? · +{p} / Dárselos |
| `encargo_falta` | vecino | Te espero con {n} {frutos}. |
| `encargo_gracias` | vecino | ¡Justo lo que necesitaba! |
| `mision_lejos` | texto de misión | Tu misión sigue en {zona}. Toca el mapa para volver. |
| `mapa_paso` | Mapa | ABIERTO · termina este paso |
| `obra_presenta` | Yunque | Aquí irá el molino del pueblo. Cada ladrillo cuenta. |
| `obra_1` | Yunque | ¡La rueda ya gira! |
| `obra_2` | Yunque | Muros en pie. Hogaza ya tiene harina. |
| `obra_3` | Yunque | ¡Tejado puesto! Arriba hay un desván. |
| `obra_4` | Yunque | ¡El molino está entero! Se ve desde todo Valoria. |
| `secreto_fuente` | Chispín | ¡Una moneda antigua en la fuente! Vale por diez. |
| `secreto_engranaje` | Chispín | Un engranaje de la máquina… ¡y dos sacos de abono! |
| `secreto_banco` | Chispín | Una nota de tu abuelo, y una semilla de calabaza. |
| `secreto_desvan` | Chispín | Otra nota de tu abuelo, entre la harina. |
| `secreto_cueva` | Chispín | ¡Una pepita de oro! Su precio sube con Merma. |
| `secreto_lago` | Escarcha | ¡Ziiim! ¡Un plantón de manzano bajo el hielo! |
| `secreto_pino` | Chispín | Otra nota de tu abuelo, y un saco de abono. |
| `nota_1` | carta | Aquí escondía mis monedas. Al volver, compraban mucho menos. |
| `nota_2` | carta | Copo y yo plantamos este manzano. Tardó años, y luego dio cada otoño. |
| `nota_3` | carta | Este molino lo empezamos tus abuelos. Ladrillo a ladrillo, sin prisa. |

### 12.3 Frases de los vecinos por progreso (`juego/src/textos/vecinos.ts`)

Formato: `{ npc: [[desde_mision, texto, condición?], ...] }`. `"!fuente"` quiere decir «si no ha encontrado ese secreto». `desde 16` = después del final.

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
| Antojo | 4 | ¡Hoy, caramelos de fresa! |
| Antojo | 16 | Pronto abriré un puesto de adornos. ¡Ya verás! |
| Semilla | 3 | ¿Qué plantamos hoy? |
| Semilla | 5 | Las calabazas tardan y a veces fallan. Pero suelen dar más. |
| Semilla | 16 | Tu huerto es el más bonito del Mercado. ¡No se lo digas a nadie! |
| Yunque | 3 | Lo bueno se paga una vez. |
| Yunque | 3 | Junto a la máquina vieja se cayó un engranaje. ¡Aún está caliente! (`!engranaje`) |
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
| Lupa | 10 | Desde que miras dentro, te cuesta más caer. |
| Fiel | 7 | Mis clientes vuelven porque mis zapatos duran. Así de sencillo. |
| Fiel | 10 | Lo que va bien no hace ruido. Mis zapatos siguen vendiéndose. |
| Engranaje | 7 | ¡Cada temporada mejoro algo! Esta vez, botas para la nieve. |
| Engranaje | 10 | ¡He inventado una regadera que riega sola! Bueno… casi. |
| Cuenta | 7 | Los números no mienten. Las fachadas, a veces sí. |
| Cuenta | 10 | Mis números avisan antes que nadie. |
| Revés | 10 | ¡Aloh! Aquí todo va al revés. Así se ven las cosas que los demás no ven. |
| Revés | 13 | Si algo parece demasiado bueno, míralo del revés. |
| Arrepentido | 10 | Si alguien te promete el doble en una noche, acuérdate de mí. |
| Arrepentido | 13 | Ya no persigo dobles. Planto rábanos y me va mejor. |
| Cautela | 10 | Antes de cada paso, me pregunto: ¿qué podría salir mal? |
| Cautela | 13 | Has pasado las cuatro puertas. Ahora cuida de otros. |
| Vaivén | 13 | ¡Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor. |
| Vaivén | 16 | El mercado sube y baja. Tú ya no te asustas. |
| Memoria | 13 | He visto cien tormentas. Todas pasaron. |
| Memoria | 16 | Las tormentas pasan. Con calma, se ven pasar. |
| Péndulo | 13 | No sé adónde va el péndulo. Pero sé dónde está. |
| Péndulo | 16 | La máquina está apagada. Ahora los precios suben despacito, como en todas partes. |

### 12.4 Textos de misiones que cambian

| Archivo · clave | Antes | Después |
|---|---|---|
| `textos/m01.ts` · `pagina` | Merma solo roba el brillo de lo que está quieto. Lo que trabaja, crece. | Merma roba brillo a las monedas. Lo plantado crece. |
| `textos/m15.ts` · `fin_texto` | La máquina se ha apagado para siempre y Merma se ha deshecho en humo. Puedes seguir explorando… | La máquina se ha apagado para siempre. Sin ella, los precios solo suben despacito, como en todas partes. Puedes seguir explorando y viajar por todo Valoria desde el mapa. |
| `textos/m15.ts` · `pagina` (Legado, página 15) | Ahora ya sabes lo que yo sabía. El tiempo, la paciencia y la cabeza fría son tu libertad. | Los precios siempre suben un poco: es normal. El tiempo, la paciencia y la cabeza fría son tu libertad. |
| `textos/m15.ts` · `maquina_apagada`, 2.ª línea (Merma) | ¡Nooo! Sin monedas nuevas… no puedo… robar… brillo… | ¡Nooo! Sin mi máquina… solo podré… robar… un poquito… |

## 13. Casos límite

- **¿Y si no le llegan las monedas?** El botón queda desactivado con «Te faltan {n}». Puede vender, cumplir el encargo, trabajar con Hogaza o recibir la semilla de la red (6.7). Ninguna misión depende de tener monedas.
- **¿Y si guarda frutos muchos días?** Caducan con aviso y van a la compostera: nunca de golpe y nunca sin nada a cambio.
- **¿Y si se le pasan frutos mientras está fuera varios días?** Como mucho pasan 2 noches de vuelta: un rábano cosechado ayer puede ponerse pocho, pero lo que está en la planta no se estropea (la planta espera), y los manzanos se paran en 3.
- **¿Y si repite toques muy deprisa?** Mientras dura un flujo, `estado.ocupado = true`.
- **¿Y si duerme la siesta a mitad de una misión?** Se puede si está libre. Ninguna misión depende del valor de la estación, salvo la 2 con el trabajo, que pasa a `ultimo_trabajo`.
- **¿Y si Merma sube a mitad de una misión?** Solo cambian los precios del reino y el brillo; los precios de las misiones no cambian en este sprint (se revisan en el sprint 5).
- **¿Y si cierra el juego lejos de la zona de su misión?** Aparece en la zona de la misión, en su paso, con el huerto al día (11.3).
- **¿Y si viaja en el paso `ir_valle` de la misión 4?** El Mapa no ofrece el Valle.
- **¿Y si gana la misión 15 con Merma en 1?** No puede bajar de 1.
- **¿Y si lleva calabaza en la mano y cosecha rábanos sin tener calabazas en la bolsa?** Se replantan rábanos (el mismo cultivo).
- **¿Y si el bot de QA toca a un vecino con puesto u obra?** El primer botón es «Cerrar». Los encargos se abren con «Dárselos» primero: el bot puede cumplirlos, y eso solo suma monedas.

## 14. Reparto en tres tareas de programación

Las tres pueden empezar a la vez si respetan el **contrato** (14.1), con stubs hasta fusionar. Orden de fusión: A, luego B, luego C. Los archivos nuevos van tipados (sin `// @ts-nocheck`) y `npm run tipos` no debe empeorar. Archivos compartidos y su parte: `main.ts` (A añade una línea, `window.valoria.reino`; el resto es de C) y `ui/minijuegos.tsx` (B: amasar y los paneles Huerto, Mochila y Criaturas; C: el panel Mapa).

### 14.1 Contrato

`juego/src/reino/reglas.ts` (A):

```ts
export type Cultivo = "rabano" | "calabaza" | "manzano";
export type Fruto = "rabano" | "calabaza" | "manzana" | "pepita";
export type Cosa = Cultivo | "abono" | "regadera" | "ladrillo";
export type Mano = "regadera" | "abono" | Cultivo;
export interface Bancal { zona: string; x: number; y: number; tipo: "bancal" | "hoyo"; abierto: boolean; precio?: number }
export interface Planta { zona: string; x: number; y: number; cultivo: Cultivo; edad: number; regada: boolean; abono: boolean; manzanas: number }
export interface Cosecha { x: number; y: number; cultivo: Cultivo; frutos: number; suerte: "buena" | "normal" | "floja"; replantado: Cultivo | null }

export function bancales(zona: string): Bancal[];
export function obra(zona: string): { celdas: { x: number; y: number }[]; etapa: number; puestos: number; necesarios: number } | null;
export function planta_en(zona: string, x: number, y: number): Planta | null;
export function noches_que_faltan(p: Planta): number;
export function manos_disponibles(): Mano[];
export function plantar(zona: string, x: number, y: number, c?: Cultivo): boolean;    // sin c: la más barata disponible
export function regar(zona: string, x: number, y: number): boolean;
export function abonar(zona: string, x: number, y: number): boolean;
export function cosechar(zona: string, mano?: Mano, azar?: () => number): Cosecha[]; // cosecha y replanta
export function recoger_manzanas(zona: string, x: number, y: number): number;
export function precio(cosa: Cosa | "tierra", merma?: number): number;
export function precio_venta(f: Fruto, merma?: number): number;
export function catalogo(vecino: "semilla" | "tasador" | "yunque" | "copo"): { compra: (Cosa | "tierra")[]; venta: Fruto[] };
export function comprar(cosa: Cosa | "tierra"): boolean;
export function vender(f: Fruto, n: number): number;
export function vender_todo(vecino: "tasador" | "copo"): number;
export function cesta_cuenta(f: Fruto): number;
export function cesta_pocha_manana(): Partial<Record<Fruto, number>>;
export function comprar_tierra(zona: string, x: number, y: number): boolean;
export function poner_ladrillos(n: number): { puestos: number; etapa_nueva: number | null };
export function encargo_hoy(): { npc: string; fruto: Fruto; n: number; pago: number } | null;
export function cumplir_encargo(): number;                       // monedas, o 0
export function metas(): { id: string; precio: number }[];
export function pago_trabajo(aciertos: number): number;
export function puede_trabajar(): boolean;
export function marcar_trabajo(): void;
export function puede_jugar(): boolean;
export function red_de_seguridad(): boolean;
export function sanear(guardado: Record<string, unknown>): void;
export function al_cambiar_mision(): void;                        // brotes de la historia; bajada de Merma en la 15
```

`juego/src/reino/tiempo.ts` (A):

```ts
export interface ResumenNoche { listos: Record<string, Partial<Record<Fruto, number>>>; cambiaron: { zona: string; x: number; y: number }[];
  compost: number; merma: "nada" | "aviso" | "sube"; arbol_lleno: boolean }
export interface ResumenVuelta { dia_nuevo: boolean; noches: number; regalo: Cultivo | null; encargo: ReturnType<typeof encargo_hoy>;
  pocho: Partial<Record<Fruto, number>>; merma: "nada" | "aviso" | "sube"; listos: ResumenNoche["listos"] }
export function hoy(): string;
export function noche(): ResumenNoche;
export function al_abrir(hoy: string): ResumenVuelta;
export function siestas_quedan(): number;
export function usar_siesta(): boolean;
export function merma_avisa(): boolean;      // «Mañana, precios nuevos»
export function merma_subio(): boolean;      // precio de antes tachado (hasta la siguiente noche)
```

`juego/src/reino/vida.ts` (C): `iniciar(mundo, ui)`, `npc(id)`, `parcela(celda)`, `lugar(celda)`, `al_paso(mision)`, `puede_viajar()`, `guardar()`.

Interfaz (B): `interfaz.puesto(vecino)`, `interfaz.obra()`, `interfaz.buenos_dias(resumen)`, `interfaz.aviso(texto, icono)`, `interfaz.sonar(nombre, tono?)`; en `Mundo`: eventos `"huerto"` y `"obra"`, gesto de arrastre sobre bancales, `flotante()` y `marcar_vecino(npc, activo)` (el «!» del encargo); y `juego/src/reino/acciones.ts` con `acciones.tocar_huerto(celda)`, `acciones.arrastrar_riego(celdas)` y `acciones.tocar_obra()`.

### 14.2 Tarea A · Reloj y economía (lógica, sin pantalla)

**Archivos:** `reino/reglas.ts` y `reino/tiempo.ts` (nuevos), `estado.ts` (campos, `sanear()`, cuarto parámetro de `guardar()`), `misiones/m01.ts` (merma, `eleccion_m01`, 4 palitos), `misiones/m02.ts` (`ultimo_trabajo`), `misiones/m15.ts` (llamar a `reino.al_cambiar_mision()` al poner `maquina_apagada`), `textos/m01.ts` y `textos/m15.ts` (12.4), una línea en `main.ts` y `qa/reino.py` (nuevo).

**Hace:** 3.1 (celdas abiertas), 3.2 (brotes), 4.1, 4.3, 4.4, 5 (reglas), 6.2–6.9 (lógica) y 11.

**Criterio de aceptación** (`python3 qa/reino.py`, Playwright sobre `juego/dist/index.html` con `window.valoria.reino` y `window.valoria.Estado`):
1. Las tablas de `reglas.ts` coinciden con `COMPRA`, `VENTA`, `CULTIVOS`, `CADUCA`, `TOPE_ARBOL`, `TIERRAS`, `FACTOR_TIERRA`, `LADRILLOS_ETAPA` y `BASE_TRABAJO` de `qa/sim_economia.py` (el script los importa y compara).
2. Rábano: con cualquier azar, sin regar da 2; regado y azar 0,1 da 3. Calabaza regada: azar 0,1 da 2; 0,3 da 5; 0,9 da 3. Con abono, +2. `cosechar` replanta el mismo cultivo, y con `mano = "calabaza"` y calabaza en la bolsa replanta calabaza.
3. Manzano: 0 manzanas en las 4 primeras noches, 2 en la 5.ª y tope de 3.
4. Cesta: un rábano cosechado sigue tras 2 noches y no tras 3; `cesta_pocha_manana()` lo marca en la 2.ª. 3 frutos pasados dan 1 abono.
5. Merma: con `merma_desde = 0`, sube en `tiempo` 10 y 20, y avisa en 9 y 19. No pasa de 3 sin el final. Al ganar la 15 baja 1 y luego sube cada 30 noches hasta 4. `brillo === 5 - merma` siempre.
6. `al_abrir`: mismo día → 0 noches; +1 día → 1 noche, regalo y encargo; +5 días → 2 noches; fecha anterior → nada; después, `dia + 1` → 1 noche. Merma no cambia por la fecha si no pasan noches.
7. `pago_trabajo`: con Merma 1, `(0)` da 3, `(4)` da 7 y `(6)` da 11; con Merma 3, `(4)` da 9; con el molino en la etapa 2, +1. `puede_trabajar()` es falso tras `marcar_trabajo()` hasta el día siguiente.
8. Tierras: la 1.ª cuesta 10 y la 2.ª 16 con Merma 1; con Merma 3, la 1.ª cuesta 14. Las del Valle no se venden antes de ganar la 5.
9. Molino: 10 ladrillos → etapa 1; 30 → 2; 70 → 3; 150 → 4. Los ladrillos puestos no cambian al subir Merma.
10. Encargo: el día 1 es de Hogaza (4 rábanos, pago 6 con Merma 1); cumplirlo dos veces el mismo día da 0 la segunda.
11. Migración: una partida del sprint 2 en la misión 8 con `brillo: 3` carga con `merma 1`, `brillo 4`, `tiempo 14` y `eleccion_m01 "hucha"`. Una en la misión 5 con brotes en el Mercado los pasa a la bolsa. La basura en `huerto` y `cesta` se descarta sin errores.
12. `python3 qa/sim_economia.py`, `npm run qa:partida`, `python3 qa/guardado.py` y `python3 qa/guardado_4_15.py` pasan.

### 14.3 Tarea B · El huerto en pantalla, los puestos y la obra

**Archivos:**
- Mundo: `mundo/mundo.ts` (dibujo de plantas, árboles, tierras a la venta, regado y molino; eventos `"huerto"` y `"obra"` antes que `"parcela"`; arrastre; sólidos; `flotante`; `marcar_vecino`; chispas de secretos según la lista que da C).
- Interfaz: `ui/controlador.ts` (`puesto`, `obra`, `buenos_dias`, `aviso`, `sonar` con tono, `reino.noche()` en `pasar_noche` y saltar la noche tocando); `ui/puesto.tsx` (nuevo: Puesto, Obra, Buenos días, Aviso y FichaMano); `ui/capas.tsx` (registrar las ventanas); `ui/minijuegos.tsx` (solo `MinijuegoAmasar` y los paneles Huerto, Mochila y Criaturas); `ui/componentes.tsx` (pulso del contador, parpadeo del brillo e indicador del Huerto).
- Lógica de toques y textos: `reino/acciones.ts` (nuevo) y `textos/huerto.ts` (nuevo).
- Sprites nuevos con su entrada en `sprites.ts`: `calabaza_lista` y `cartel_venta` (13 × 13) y `molino_0`…`molino_4` más `molino_rueda_b` (39 × 39).
- Prueba: `qa/huerto.py` (nuevo).

**Hace:** 3.1 (dibujo y toque), 4.2, 5.1 (siesta y saltar la noche), 6.3 (pago en amasar), 6.6 (pantalla de la obra), 9, 10 y 12.1.

**Criterio de aceptación** (`python3 qa/huerto.py`, Playwright a 390 × 844 y a 360 × 800; abre puestos y obra con `valoria.ui.*` para no depender de C):
1. Partida sembrada en la misión 3: 4 bancales abiertos en la fila 4, 4 tierras a la venta en la fila 3, la fila 5 de la historia y el solar del molino.
2. **Toques por noche:** con 12 bancales plantados y listos, una noche completa (cosechar, regar las filas deslizando, vender todo en el puesto de Tasador y dormir una siesta) se hace con **12 toques o gestos como mucho**. La prueba los cuenta (`pointerdown` y `click`).
3. Regar deslizando por una fila de 4 deja los 4 regados con un solo gesto.
4. Con la ficha en «Abono», un toque abona sin ventana; con «Calabaza», cosechar rábanos replanta calabazas.
5. La siesta pasa una noche; un toque la acorta (dura menos de 1,5 s); la tercera del día está desactivada.
6. Los frutos que caducan llevan «pocho mañana» en el puesto y en la Mochila; al pasar la noche, el aviso de la compostera.
7. La ventana Obra pone ladrillos, enseña la etapa y cambia el dibujo del molino en el mapa.
8. Partida sembrada en la misión 6, en el Valle: plantón → 4 noches sin manzanas → la 5.ª con 2 → recoger.
9. Capturas: ningún texto nuevo mide menos de 11 px y ningún botón nuevo menos de 44 px (como `qa/small.py`).
10. `npm run qa:partida` pasa (amasar paga de 3 a 11 en la misión 1).

### 14.4 Tarea C · Vida del reino: vecinos, encargos, viajes y secretos

**Archivos:** `reino/vida.ts` (nuevo); `textos/vecinos.ts` (nuevo); `misiones/base.ts` (`charla` → `vida.npc`, `zona_mision`, filtro de eventos, `interfaz.mision_actual`, `volver()`, `vida.al_paso`); `main.ts` (`vida.iniciar`, vuelta y «¡Buenos días!» al cargar y al volver del segundo plano, `npc` y `parcela` en modo libre, `viaje_pedido` en la historia); `ui/minijuegos.tsx` (solo el panel Mapa); `qa/vida.py` (nuevo); y `qa/bot.py` si hace falta.

**Hace:** 6.1 (qué abre cada vecino), 6.3 (trabajo fuera del guion), 6.5 (encargo con su vecino), 8, 11.3 (`vida.guardar()`) y 12.2–12.3.

**Criterio de aceptación** (`python3 qa/vida.py`):
1. Modo libre (misión 16): los 19 vecinos de las 5 zonas responden (un diálogo con texto, un puesto o un encargo); ninguno se queda mudo.
2. Misión 8, punto `ir_lupa`: se viaja al Mercado, se planta y se vuelve. La misión sigue como antes y el bot la termina. Si se recarga estando en el Mercado, abre en la Ciudad, en `ir_lupa`, con lo plantado.
3. Misión 4, paso `ir_valle`: el Mapa no ofrece el Valle.
4. Los 7 secretos se encuentran una vez cada uno. El del desván solo aparece con el molino en la etapa 3. Los contadores del Mapa llegan a 4/4 y 3/3.
5. Con `dia` de ayer en el guardado, al recargar sale «¡Buenos días!» con regalo y encargo; el «!» está sobre el vecino del encargo, y cumplirlo paga 1,5 veces. Con `dia` de mañana no sale nada.
6. La presentación sale una vez al empezar la misión 3: con `eleccion_m01 = "semillas"` da 4 semillas, y si no, 2.
7. Hogaza da trabajo una vez al día fuera del guion.
8. `npm run qa:partida`, `python3 qa/guardado.py` y `python3 qa/guardado_4_15.py` pasan. El bot no compra en puestos ni pone ladrillos.

## 15. Cómo comprobar el sprint entero

1. `npm run qa:partida` completa las 15 misiones sin errores.
2. `python3 qa/sim_economia.py`, `qa/reino.py`, `qa/huerto.py` y `qa/vida.py` pasan.
3. Partida a mano en un móvil de 390 px: misiones 1 a 5 con huerto, dos días de juego (cambiando la fecha para la prueba) y un rato de modo libre. Anotar el tiempo en el huerto frente al guion, los toques por noche y si se entiende la obra del molino.
4. El crítico evalúa con su método y mide además los toques por noche, las monedas al final, el uso de puestos, encargos y obra, y cuántos frutos van a la compostera.

## 16. Decisiones tomadas y dudas que quedan

Decididas por el fundador y el jefe de equipo:
- Merma tras el final: baja un nivel al apagar la máquina y luego sube muy despacio, con aviso.
- Fecha del móvil: se acepta.
- Siestas: 2 al día.
- Misión 1: brillo 4 en los dos caminos, con efecto en lo que se tiene.
- Viajes: solo en los puntos de control.

Quedan para el fundador:
1. **Monedas de quien no invierte.** El despistado acaba con unas 500 monedas quietas y quien acapara con unas 900. Pierden brillo y la Mochila les propone una meta. ¿Basta así, o queremos un tope suave (por ejemplo, que el juego anime a llevarlas al molino)?
2. **El nivel 4 de Merma después del final** deja el brillo en 1 de 5 tras unos 20 días de modo libre. ¿Tope en 3 hasta que el sprint 5 traiga las temporadas?
