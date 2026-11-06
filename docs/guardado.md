# Guardado por pasos

Objetivo: si el niño cierra el juego a mitad de una misión, al volver pierde como mucho el paso en curso, no la misión entera.

## Cómo funciona

- **Foto coherente.** La partida (`localStorage["valoria-partida"]`) solo se escribe en momentos en que el estado es coherente:
  - al empezar cada misión (`estado.guardar()` en el bucle de `arrancar()`, `juego/src/main.ts`), como antes;
  - al llegar a un **punto de control** de la misión: `MisionBase.paso(p)` llama a `estado.guardar(p, celda_del_héroe)` si `p` está en `puntos_control()`;
  - en modo libre (después de la misión 15), al viajar, como antes.
- **Segundo plano.** En `visibilitychange` (oculta) y `pagehide` se llama a `estado.guardar_al_salir()`. A mitad de un paso el estado puede estar a medias (monedas cobradas, frutos a medio cosechar…), así que no se guarda el estado actual: se reescribe la última foto coherente. En modo libre sí se guarda el estado actual.
- **Formato.** Lo de siempre (todo `estado` salvo `ocupado` y `paso`) más, si se guardó en un punto de control, `punto` (nombre del paso) y `celda` (casilla del héroe). Partidas antiguas sin `punto` se cargan como antes: empiezan la misión.
- **Carga.** `estado.cargar()` deja el punto pendiente; `MisionBase.jugar()` lo recoge con `estado.tomar_reanudacion(numero)` (solo vale para esa misión y una vez). Si la misión declara ese punto, llama a `reanudar()` en vez de `empezar()`:
  1. `preparar_punto(punto)`: deja el mundo como estaba en ese paso;
  2. `mundo.colocar_heroe(celda)`: pone al héroe donde estaba (si la casilla se puede pisar);
  3. `paso(punto)`: pone el texto de misión, suelta al jugador y vuelve a guardar.
- Con `punto`, la pantalla de título ofrece «Continuar» también en la misión 1.

## Qué se restaura solo y qué no

Viene en `estado` y se restaura solo: monedas, semillas, frutos, brotes (con fruto y `cuantos`), estación, precio del pan, brillo, progreso, criaturas, regadera, ojo de tasador, gorro, patines, árbol, péndulo, zona…

`Mundo.restaurar(mision)` ya deja como al empezar la misión: zona, luces de misiones anteriores, personajes de misiones anteriores, Chispín.

**No** viene en `estado` y lo tiene que hacer `preparar_punto()`:

- personajes que la misión muestra u oculta (`this.mundo.mostrar(...)`), o mueve (`mover_npc`);
- luces encendidas dentro de la misión (`iluminar`), bazar apagado, cartel, tormenta, sprite de la máquina…;
- campos propios de la misión (`this.cosecha`, `this.puerta`, `this.compras`, `this.estacionArbol`…) que se usan en pasos posteriores;
- `this.ui.textos_carta` si la misión lo cambia.

## Cómo añadir puntos de control a una misión

1. Lee la misión de arriba abajo y apunta cada `this.paso("...")`.
2. Para cada paso, pregúntate: si el niño llega aquí, cierra y vuelve, ¿qué hay que tener para que el resto de la misión funcione igual? Si todo está en `estado`, el paso vale tal cual. Si depende de algo del mundo, añádelo a `preparar_punto`. Si depende de un campo de la misión difícil de reconstruir, **no lo declares** (se retomará desde el punto anterior).
3. El estado al llamar a `paso()` debe ser el de «principio de ese paso»: no lo declares si justo después de `paso()` se cambia algo que no se repetirá al rehacer el paso.
4. No declares pasos que solo existen dentro de un `await` (como `"victoria"`, que se pone a mano sin `paso()`).
5. Declara los puntos en la clase:

```ts
puntos_control() {
  return ["ir_hogaza", "ir_semilla", "regadera", "regar"];
}
preparar_punto(a) {
  a !== "ir_hogaza" && a !== "ir_semilla" && this.mundo.mostrar("yunque", !0);
}
```

6. Añade un caso a `qa/guardado.py` (misión, paso, pasos extra del bot) y pásalo; después, `python3 qa/bot.py first 60000 <etiqueta>`.

Cuidado con las misiones que cambian de zona dentro de la misión (4, 7, 10, 13: «ir_valle», «ir_ciudad»…): el paso de viaje vale porque `estado.zona` aún es la de origen, pero comprueba que los pasos ya en la zona nueva restauran bien con `Mundo.restaurar()` (que mira `estado.zona`).

## Estado por misión

| Misión | Retoma a mitad | Puntos de control |
|---|---|---|
| 1 | sí | ir_hogaza, ir_semilla, plantar, cosechar, vender, comprar_pan |
| 2 | sí | ir_hogaza, ir_semilla, regadera, regar, cosechar, ir_yunque, ir_tasador |
| 3 | sí | ir_antojo, ir_hogaza, ir_semilla, feria |
| 4–15 | no (empiezan la misión, como antes) | pendientes |

Notas para las pendientes:

- **4** (valle): `this.cosecha` cuenta temporadas; «cosechar»/«volver_copo» necesitan reconstruirla o quedarse fuera.
- **5**: `this.estacionArbol`, `this.vioRaiz`, `this.vioAnillos`; aparece «escarcha».
- **6, 9**: «prisas» aparece y huye en `empezar()`; tras huir queda oculto.
- **7, 8**: «prisas» huye del bazar; «trocitos» ya está en `estado`.
- **10**: «donchollo» aparece en «ir_chollo».
- **11**: `this.eleccion`.
- **12**: `this.puerta` y las puertas ya abiertas (`mostrar("puerta_n", false)`); el Revés se mueve con `mover_npc`.
- **13**: «euforio» visible; `estado.pendulo` ya está en `estado`.
- **14**: «calmin» se añade a `estado.criaturas` (ya se guarda).
- **15**: máquina; última misión.
