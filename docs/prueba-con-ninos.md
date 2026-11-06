# Kit para probar Valoria con niños de 8 a 12 años

Fase 1 del plan de negocio: probar el prototipo con 15–20 niños, observar sin ayudar y medir si vuelven solos al día siguiente y a la semana. La primera sesión cubre las misiones 1 a 3 (el Mercado del Pueblo): unos 20–25 minutos de juego y unos 40 minutos en total.

Este kit está pensado para que lo use cualquiera, sin formación de investigador. Imprime las páginas marcadas con [imprimir] (hoja para familias, hoja de observación, preguntas y tabla).

Antes de leer lo demás, tres avisos:

- **Usa la versión de `juego/`, no `prototipo/index.html`.** El prototipo publicado carga React desde `cdnjs.cloudflare.com` y la fuente desde Google Fonts. Eso rompe la regla de CLAUDE.md y lo que prometemos a las familias en la hoja de consentimiento. La versión de `juego/` lleva todo dentro: React, la fuente Pixelify Sans, sprites y sonidos.
- **El juego solo guarda al empezar cada misión** (tarea P0 pendiente). Si el niño cierra a mitad de misión, al volver la repite entera. Tenlo en cuenta al leer la vuelta al día siguiente.
- **Con 15–20 niños se encuentran problemas de diseño, no se demuestra que aprendan.** Ver el apartado 4.

---

## 1. Antes

### 1.1 Dónde y con qué dispositivo

- **Mejor en el dispositivo de la familia** (su móvil o tableta). Si no, no se puede medir la vuelta: el niño tiene que poder abrir el juego en casa sin ti.
- Pon el juego en la pantalla de inicio ("Añadir a pantalla de inicio") para que el niño lo encuentre solo.
- La dirección desde la que se descarga el juego la decide Fernan (ver "Decisiones" al final). Ese servidor, como cualquier web, ve la dirección de internet del dispositivo al descargarlo. El juego no envía nada más.
- **En un colegio:** pide permiso a la dirección, que normalmente querrá repartir y recoger ella las hojas de las familias. Puede que te pidan el certificado negativo del Registro Central de Delincuentes Sexuales; la [LOPIVI (Ley Orgánica 8/2021)](https://www.boe.es/buscar/act.php?id=BOE-A-2021-9347) lo exige a quien tiene contacto *habitual* con menores, también a voluntarios. No he comprobado si una sesión puntual entra; sácalo de todas formas: se pide al Ministerio de Justicia. En el colegio la vuelta solo se puede medir si la familia instala el juego en casa: trátalo como un grupo aparte en la tabla.

### 1.2 Códigos

Cada niño es un código: **N01, N02…** El nombre no aparece nunca en las hojas de observación.

Guarda una única lista "código → familia y teléfono" en un papel aparte (o en tu móvil, no en la nube compartida). Sirve solo para preguntar a la semana. **Destrúyela en cuanto cierres la tabla de resultados**, como mucho un mes después de la última sesión. Desde ese momento las notas ya no se pueden asociar a ningún niño.

### 1.3 Material

- Dispositivo cargado, con el volumen a media altura y sin auriculares (así oyes lo mismo que él).
- Comprobado el día antes: el juego abre, se oye la voz en español (depende de la voz del sistema) y la pantalla de título dice **"Empezar la aventura"** (sin partida previa).
- Modo silencio de notificaciones activado.
- Hojas impresas: consentimiento firmado, una hoja de observación por niño, preguntas finales.
- Bolígrafo, tablilla o carpeta rígida, reloj a la vista (el del móvil, boca abajo, vale).
- Un pequeño agradecimiento sin relación con dinero (pegatinas, un lápiz). No se lo prometas antes como premio por jugar bien.
- **Nada de cámara.** Ni fotos, ni vídeo, ni audio. Las frases se apuntan a mano.

### 1.4 [imprimir] Hoja para las familias (una página)

> **Prueba del juego Valoria**
>
> **Qué es.** Valoria es un juego para móvil que estamos haciendo para niños de 8 a 12 años. Aún no está terminado. Queremos ver si se entiende y si es divertido. No es una prueba para su hijo o hija: lo que probamos es el juego.
>
> **Qué hará.** Jugará unos 25 minutos mientras una persona adulta mira y toma notas a mano. Después le haremos 5 preguntas cortas sobre el juego. En total, unos 40 minutos. Ustedes pueden estar presentes.
>
> **Después.** El juego se quedará en su dispositivo. Si quiere, puede seguir jugando. Al día siguiente y a la semana les preguntaremos si lo ha abierto por su cuenta. Les pedimos que no se lo recuerden.
>
> **Qué apuntamos.** Un código (por ejemplo, N07) en lugar del nombre. Su edad. Dónde se atasca, qué elige en el juego, frases que diga, y si vuelve a jugar.
>
> **Qué no hacemos.** No grabamos vídeo, audio ni fotos. No apuntamos su nombre en las notas. El juego no tiene publicidad ni compras y no envía datos a nadie: lo que guarda se queda en su dispositivo.
>
> **Cuánto lo guardamos.** La lista que une el código con su teléfono se destruye al terminar la prueba, como mucho el [fecha]. Las notas sin nombre se usan solo para mejorar el juego.
>
> **Es voluntario.** Su hijo o hija puede parar cuando quiera, sin dar explicaciones. Ustedes pueden retirarse y pedir que borremos sus notas mientras exista la lista de códigos. Para cualquier duda o para ejercer sus derechos sobre los datos: [nombre y teléfono o correo de Fernan].
>
> ☐ Autorizo a mi hijo/a a participar y a que se tomen las notas descritas.
> ☐ Acepto que me pregunten al día siguiente y a la semana si ha vuelto a jugar.
>
> Edad del niño/a: ____  Nombre de quien firma: ______________  Firma: ________  Fecha: ______
>
> *(Esta parte la rellena quien observa: código asignado ____ )*

Antes de empezar, pregunta también al niño si quiere jugar ("¿Te apetece probarlo?"). Si dice que no, no se hace.

**Sobre la norma.** En España, por debajo de 14 años el consentimiento para tratar datos de un menor lo dan quienes tienen la patria potestad o la tutela ([artículo 7 de la LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673); lo explica también la [AEPD](https://www.aepd.es/es/preguntas-frecuentes/10-menores-y-educacion/FAQ-1001-cual-es-la-edad-para-que-los-menores-puedan-prestar-consentimiento-para-tratar-sus-datos-personales)). Lo he comprobado. Mientras exista la lista código → familia, las notas son datos personales seudonimizados y se aplica el [RGPD](https://www.boe.es/doue/2016/119/L00001-00088.pdf). **No he revisado con un experto si esta hoja cumple todo el deber de informar del RGPD.** Para un colegio, conviene que la revise alguien de protección de datos (el colegio suele tener delegado).

---

## 2. Durante

### 2.1 Guion minuto a minuto

| Min. | Qué haces |
| --- | --- |
| 0–3 | Saluda, siéntate a su lado y un poco detrás (ves la pantalla, no le tapas). La familia, si se queda, fuera de su vista y en silencio. Hoja firmada en la carpeta. |
| 3–5 | Dile la frase de inicio (abajo). Apunta la hora de inicio. Dale el dispositivo con la pantalla de título. |
| 5–14 | **Misión 1** (Hogaza y el pan). Observa y anota. |
| 14–22 | **Misión 2** (las regaderas). |
| 22–30 | **Misión 3** (la feria). Termina al salir la pantalla de medalla de la misión 3 ("Seguir explorando"). Apunta la hora. |
| 30–35 | Preguntas al niño (apartado 3.1). |
| 35–40 | Preguntas a la familia (apartado 3.2), agradecimiento, recordatorio: "no se lo recordéis". |

Los tiempos son orientativos. **Si a los 35 minutos de juego no ha terminado, para al acabar la misión en curso.** No le metas prisa. Si quiere seguir jugando después de la misión 3, déjale: es una buena señal; apúntalo.

### 2.2 Qué decirle al empezar

> "Esto es un juego que todavía se está haciendo. Necesito a alguien que lo pruebe. Juega como si estuvieras solo en casa. Yo voy a mirar y a apuntar cosas, pero no te voy a ayudar, porque quiero ver si el juego se entiende solo. Si algo no se entiende, es culpa del juego, no tuya, y eso me ayuda mucho. Si te aburres o quieres parar, me lo dices y paramos. Y si quieres, puedes ir contándome lo que piensas."

No digas "aprender", "dinero", "educativo", "prueba" en el sentido de examen ni "a ver qué tal lo haces". Si pregunta "¿de qué va?", responde: "Descúbrelo tú".

### 2.3 Reglas para quien observa

1. **No ayudes, no señales la pantalla, no asientas.** Cara neutra, también cuando acierta o falla una pregunta del juego.
2. Si pregunta "¿Está bien?" o "¿Qué elijo?": "Tú decides. Aquí no hay respuestas buenas ni malas".
3. Si pide ayuda: "¿Qué crees tú que hay que hacer?". Apunta **P** (pide ayuda).
4. **Atasco de verdad** = más de 1 minuto sin avanzar y con señales de frustración (toca al azar, suspira, dice "no sé", mira hacia ti). Entonces sube por escalones, uno cada 30–60 segundos, y apunta el escalón:
   - **Y1**: "¿Qué estás buscando?" o "¿Qué pone arriba?" (sin decir dónde).
   - **Y2**: pista mínima: "¿Has probado a hablar con alguien?" / "¿Has mirado el huerto?".
   - **Y3**: se lo enseñas. Ese paso cuenta como **no resuelto solo**.
5. **Fallo del juego** (se cuelga, no responde): arréglalo tú, apunta **F** y la hora. No es ayuda.
6. Si quiere parar, se para. Sin "un poquito más". Apunta en qué paso.
7. **Lo que dice se apunta tal cual, entre comillas, sin interpretarlo.** Interpretar, después.
8. Si un hermano o la familia ayuda, apúntalo como **Y** con quién.

### 2.4 [imprimir] Hoja de observación

Código: ____  Edad: ____  Dispositivo: móvil / tableta  Hora inicio: ____  Hora fin: ____

**Marcas** (escribe la letra en la casilla, puedes poner varias):
**A** se atasca · **P** pide ayuda · **Y1/Y2/Y3** ayuda que diste · **R** se ríe o sonríe · **Z** se aburre (mira a otro sitio, bosteza, pregunta cuánto queda) · **S** se salta el texto (toca antes de que acabe la voz) · **F** fallo del juego.

Entre paréntesis, el nombre del paso dentro del juego (el mismo que usará el registro automático del apartado 5).

#### Misión 1 · El pan sube (hora: ____)

| Paso | Marcas | Notas |
| --- | --- | --- |
| Carta del abuelo, "Coger la bolsa" | | ¿La lee? |
| Chispín: aprender a caminar tocando el suelo | | ¿Cuánto tarda en moverse? |
| Llegar a Hogaza (`ir_hogaza`) | | |
| Minijuego de amasar (tocar en la zona dorada) | | ¿Lo entiende a la primera? |
| **Reto de Subeprecios** | | |
| Ir con la señora Semilla (`ir_semilla`) | | |
| Plantar la semilla del abuelo (`plantar`) | | |
| Recoger los frutos (`cosechar`) | | |
| Elegir qué hacer con los frutos | | |
| Vender a Tasador (`vender`) | | |
| Comprar el pan (`comprar_pan`) | | |
| Pregunta: ¿por qué el pan cuesta cada vez más? | | |
| Medalla, página del diario y reto para casa | | ¿Lee el reto? |

**Reto de Subeprecios**, ¿qué elige? Numera el orden si repite (si elige caramelos, vuelve a amasar y a elegir):
☐ Guardarlas en la hucha  ☐ Plantar semillas (5 monedas)  ☐ Comprar caramelos   Orden: ____________
¿Dudó antes de elegir? ☐ sí ☐ no   ¿Dijo algo? "____________________"

**Frutos:** ☐ vender todos ☐ replantar uno y vender el resto
**Pregunta del pan**, primera respuesta: ☐ Merma quita brillo ☐ Hogaza es una avara ☐ el pan es más grande

#### Misión 2 · Las regaderas (hora: ____)

| Paso | Marcas | Notas |
| --- | --- | --- |
| Hogaza: ¿quién ha subido el pan? (`ir_hogaza`) | | |
| Semilla: el huerto tiene sed (`ir_semilla`) | | |
| **Comprar una regadera** (`regadera`) | | |
| Regar el huerto (`regar`) | | |
| Resultado de la regadera | | ¿Reacciona? |
| Recoger frutos (`cosechar`) | | |
| Yunque compara las regaderas (`ir_yunque`) | | |
| Ojo de tasador, 3 rondas (`ir_tasador`) | | ¿Usa "Mirar"? |
| Pregunta: ¿por qué la más cara salió más barata? | | |
| Medalla y página | | |

**¿Quién ha subido el pan?** ☐ Subeprecios ☐ Antojo ☐ el viento
**Regadera.** ¿A quién va primero? ☐ Tasador ☐ Yunque   ¿Visita a los dos antes de comprar? ☐ sí ☐ no
Compra: ☐ Reluciente (3) ☐ de hierro (8)   Veces que pulsa "Ahora no": ____
¿Le faltaron monedas? ☐ sí ☐ no → ¿fue a amasar con Hogaza? ☐ sí ☐ no (solo se puede una vez por estación)
Frase al ver el resultado: "____________________"
**Ojo de tasador**, aciertos: ☐0 ☐1 ☐2 ☐3
**Pregunta final:** ☐ dura más ☐ es más bonita ☐ Yunque es mi amiga

#### Misión 3 · La feria (hora: ____)

| Paso | Marcas | Notas |
| --- | --- | --- |
| Antojo ofrece la Chuche Gigante (`ir_antojo`) | | |
| Hogaza da la paga y la lista: clasificar (`ir_hogaza`) | | ¿Fallos al clasificar? |
| Semilla: la regla de los tres botes (`ir_semilla`) | | ¿La lee? |
| Compras de la feria con 12 monedas (`feria`) | | |
| Oferta de Antojo | | |
| Efectos de las compras | | |
| Pregunta: ¿qué hay que comprar primero? | | |
| Victoria del Mercado, Subeprecios huye | | |

**Chuche Gigante:** ☐ mirar con el ojo de tasador ☐ comprar ☐ ahora no
**Compras de la feria:** ☐ comida (4) ☐ abono (5) ☐ gorro (3) ☐ chuche (5)   ¿En qué orden? ________
**Oferta:** ☐ seguir con mi lista ☐ comprar la chuche → si no cabe: ☐ seguir ☐ cambiar ________ por la chuche
**Pregunta final:** ☐ lo que necesito ☐ lo que más brilla ☐ lo que está de oferta

#### Frases literales y momentos

| Hora | Paso | Lo que dijo o hizo, tal cual |
| --- | --- | --- |
| | | |
| | | |
| | | |
| | | |

¿Pidió seguir jugando al terminar? ☐ sí ☐ no   ¿Paró antes? ☐ sí, en el paso ______

---

## 3. Después

### 3.1 [imprimir] Preguntas al niño (5 minutos)

Tono de charla, no de examen. Si no sabe o no quiere, pasa a la siguiente sin insistir. Apunta la respuesta tal cual.

1. "¿Qué le pasaba al pan?" → ____________________
2. "¿Quién era Subeprecios? ¿Qué hacía?" → ____________________
3. "Si mañana tuvieras otra vez las diez monedas del principio, ¿qué harías con ellas?" (después, solo: "¿Y eso por qué?") → ____________________
4. "¿Qué es lo que más te ha gustado? ¿Y algo que fuera un rollo o que no entendieras?" → ____________________
5. "Si se lo contaras a un amigo, ¿qué le dirías?" → ____________________

No corrijas ninguna respuesta, aunque sea "equivocada". Una respuesta en sus palabras ("si guardas el dinero quieto vale menos") vale mucho más que repetir la frase del juego.

### 3.2 [imprimir] Preguntas a la familia

Al terminar la sesión:

1. "¿Suele jugar a juegos en el móvil o la tableta? ¿Cuánto, más o menos?" (sirve para leer bien la vuelta).

A la semana:

2. "¿Ha comentado algo del juego en casa? ¿Qué dijo, tal cual? ¿Os preguntó cuánto costaba el pan cuando erais pequeños?" (es el reto para casa de la misión 1).
3. "¿Hay algo que os haya molestado o preocupado del juego?"

### 3.3 Cómo medir la vuelta

Sin herramientas de terceros: preguntando a la familia y mirando la partida guardada en el dispositivo.

**"Vuelve solo"** = abre el juego por su cuenta o lo pide. Si la familia se lo recordó o se lo propuso, no cuenta.

| Cuándo | Qué haces | Qué apuntas |
| --- | --- | --- |
| Día siguiente, por la tarde | Mensaje o llamada: "¿Ha abierto hoy Valoria por su cuenta? Sí / No / No lo sé". | V1: sí / no / no sabe |
| A los 7 días | "¿Cuántos días de esta semana lo ha abierto por su cuenta, más o menos?" + preguntas 2 y 3. | V7: nº de días (0–7) |
| A los 7 días | Pide a la familia que, sin el niño delante, abra el juego, **lea lo que pone en el botón de la pantalla de título sin tocar nada** y lo cierre. | Texto del botón |

Cómo leer la pantalla de título (al terminar la sesión pone **"Continuar · misión 4"**):

- **"Continuar · misión 4"**: no ha terminado ninguna misión más. Puede que haya jugado (el juego solo guarda al empezar misión).
- **"misión 5" o más**: ha terminado al menos una misión más (la 4 es la primera del Valle de la Nieve).
- **"Empezar la aventura"** o un número menor de 4: ha pulsado "Empezar de nuevo" (o se ha borrado la partida). Pregunta a la familia.

No le digas al niño que vas a preguntar si ha vuelto.

---

## 4. Cómo leer los resultados

### 4.1 [imprimir] Tabla de todos los niños

Una fila por niño. Rellénala el mismo día de cada sesión, con la hoja delante.

| Cód. | Edad | M1 / M2 / M3 terminadas | Min. de juego | Pasos con A | Pasos con Y3 | Reto Subeprecios (orden) | Regadera | Ojo tasador (0–3) | Compras feria | Oferta | "¿Qué le pasaba al pan?" (literal, corto) | Pidió seguir | V1 | V7 (días) | Botón a los 7 días | Notas |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N01 | | | | | | | | | | | | | | | | |

Al final, haz un recuento por paso: **¿en qué pasos se atascaron 3 o más niños?** Esa lista es el resultado más útil de toda la prueba.

### 4.2 Señales para seguir, cambiar o parar

Los umbrales son una propuesta. **Fíjalos antes de la primera sesión y no los muevas al ver los datos**: así no te engañas.

**Seguir** (el diseño funciona; pasar a la siguiente fase):
- Al menos 4 de cada 5 niños terminan las tres misiones sin ayuda Y3.
- La mayoría tiene alguna **R** y pocas **Z**; varios piden seguir jugando.
- En el día siguiente o en la semana vuelve solo al menos la mitad.
- Explican lo del pan con sus palabras, aunque sea a medias.

**Cambiar** (arreglar y volver a probar con 5–8 niños nuevos):
- Un mismo paso con **A** en 3 o más niños: rediseñar ese paso.
- Una elección casi unánime (todos la regadera de hierro, nadie la hucha): el dilema es demasiado obvio y no enseña nada; hay que equilibrarlo.
- Muchas **S** en los mismos diálogos: sobran palabras; acortar.
- Aciertan las preguntas del juego pero no saben explicar el pan: las preguntas se aciertan por descarte.
- Los de 8 años se atascan y los de 12 se aburren: ajustar por edad.

**Parar y replantear** (el problema no es un paso, es la idea):
- La mayoría no termina la misión 1 o se aburre antes del minuto 10.
- Casi nadie (2 o menos) vuelve solo en la semana y nadie pidió seguir.
- Varias familias se incomodan con el tema o con cómo se trata el dinero.

### 4.3 Lo que esta prueba puede y no puede decir

- **Puede**: encontrar dónde el juego confunde, aburre o hace gracia. Un problema que le pase a 1 de cada 10 niños aparecerá al menos una vez con 15–20 niños con una probabilidad de entre el 79% y el 88% (cálculo propio, 1 − 0,9ⁿ). Es la lógica de las pruebas cualitativas que explica [Nielsen Norman Group](https://www.nngroup.com/articles/5-test-users-qual-quant/): con pocos participantes se detectan problemas, pero no se miden porcentajes fiables (para eso recomiendan más de 30–40).
- **No puede**: demostrar que aprenden. No hay grupo de comparación, ni medida antes y después, y las preguntas del juego se contestan justo después de vivir la situación.
- **Los porcentajes son muy imprecisos.** Si vuelven 10 de 20, la cifra real podría estar entre un 30% y un 70% (intervalo de Wilson al 95%, cálculo propio). Lee la vuelta como "casi nadie / algunos / la mayoría", no como un dato exacto.
- **Sesgos**: son hijos de amigos (querrán agradar, y suelen tener más dispositivos y familias interesadas en el tema); el juego es nuevo (efecto novedad); y tu presencia cambia cómo juegan. Si puedes, que observe otra persona en algunas sesiones.

Consejos de [Nielsen Norman Group para probar con menores](https://www.nngroup.com/articles/usability-testing-minors/) que coinciden con este guion: consentimiento firmado de la familia antes de la sesión, familia fuera de la vista del niño y en silencio, recordar que no se le evalúa a él, y reclutar algunos niños de más porque siempre hay quien falla.

---

## 5. Especificación para el programador: registro anónimo de atascos

Objetivo: que la hoja de observación no dependa solo de la memoria y el reloj de quien mira, y que la vuelta se mida con fechas reales en el propio dispositivo.

**Reglas (CLAUDE.md):** nada sale del dispositivo. Ninguna librería ni servicio de terceros. Ninguna petición de red nueva.

**Activación**
- Desactivado por defecto. Se activa con un parámetro en la dirección (`?prueba=1`) en la primera sesión. Queda activo en ese dispositivo hasta que se borre.
- Al activarlo, quien observa escribe el código del niño (N01…). Nada más: ni nombre, ni edad.
- Nada visible para el niño mientras juega.

**Qué se registra** (en `localStorage`, clave `valoria-prueba`, separada de `valoria-partida`)
- Cada evento: `{ t, mision, paso, tipo, valor }`, con `t` en segundos desde el inicio de esa sesión.
- `sesion`: fecha local `AAAA-MM-DD`, sin hora. Una entrada por día en que se abre el juego: así se ve la vuelta al día siguiente y a la semana.
- `paso`: cada cambio de `estado.paso` (engancharlo en `MisionBase.paso()`). Con eso sale el tiempo en cada paso.
- `eleccion`: opción elegida en `ui.reto`, `ui.elegir`, `ui.pregunta` (primera respuesta), `ui.presupuesto` (lista de compras), `ui.clasificar` (fallos) y `ui.ojo_tasador` (aciertos); resultado de `ui.amasar` y cuántas veces se amasa.
- `dialogo`: por cada globo, si se pasa antes de que acabe la voz (marca **S**).
- `toques_sin_efecto`: toques en el mapa que no llevan a nada, agrupados por paso (señal de estar perdido).
- `inactivo`: más de 20 segundos sin tocar la pantalla.
- `oculto` / `visible`: si se sale del juego (evento `visibilitychange`).
- Versión del juego y ancho de pantalla en px CSS (para el problema de los 320 px). Nada más del dispositivo: ni identificador, ni modelo, ni `userAgent`.
- Límite de tamaño (por ejemplo, 5.000 eventos); al llegar, se deja de registrar y se avisa en la pantalla del observador.

**Pantalla del observador**
- Se abre manteniendo pulsado el logo de la pantalla de título 3 segundos y escribiendo un PIN de 4 cifras fijado en la versión de prueba.
- Muestra un resumen por misión y paso: tiempo, toques sin efecto, elecciones, días con sesión.
- **Exportar**: descarga un archivo `valoria-prueba-N07.json` y otro `.csv` (una fila por paso) generados en el propio dispositivo (`Blob` y enlace de descarga). Botón "Copiar" como alternativa.
- **Borrar registro**: elimina `valoria-prueba` y desactiva el modo. No toca la partida.

**Pruebas**
- `npm run qa:partida` completa las 15 misiones con el modo activo y sin él.
- Una prueba comprueba que, con el modo activo, el juego no hace ninguna petición de red tras cargar.
- El CSV exportado tiene los nombres de paso de la hoja de observación.

---

## Decisiones discutibles (para Fernan)

1. **Probar en el dispositivo de la familia**, no en el tuyo. Es la única forma de medir la vuelta, pero el juego debe servirse desde una dirección (una web propia o similar). Decide dónde, y que ese servidor guarde los mínimos registros de acceso.
2. **No usar `prototipo/index.html`** hasta que no haga peticiones a terceros.
3. **Hay que hacer antes la tarea P0 de guardar en cada paso**, o aceptar que la pantalla de título solo dice qué misiones se han terminado.
4. **Umbrales de seguir, cambiar y parar**: son míos; ajústalos antes de empezar.
5. **Las preguntas de opción múltiple al final de cada misión** se parecen a un examen. Esta prueba dirá si a los niños se lo parece; si muchos marcan Z o S justo ahí, conviene repensarlas.
6. **Hoja de consentimiento**: la base legal de menores de 14 está comprobada, pero la hoja no la ha revisado nadie de protección de datos. Para un colegio, sí hace falta.
