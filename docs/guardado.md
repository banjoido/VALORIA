# Guardado por pasos

Objetivo: si el niño cierra el juego a mitad de una misión, al volver pierde como mucho el paso en curso, no la misión entera.

## Cómo funciona

- **Foto coherente.** La partida (`localStorage["valoria-partida"]`) solo se escribe en momentos en que el estado es coherente:
  - al empezar cada misión (`estado.guardar()` en el bucle de `arrancar()`, `juego/src/main.ts`), como antes;
  - al llegar a un **punto de control** de la misión: `MisionBase.paso(p)` llama a `estado.guardar(p, celda_del_héroe)` si `p` está en `puntos_control()`;
  - en modo libre (después de la misión 15), al viajar, como antes.
- **Segundo plano.** En `visibilitychange` (oculta) y `pagehide` se llama a `estado.guardar_al_salir()`. A mitad de un paso el estado puede estar a medias (monedas cobradas, frutos a medio cosechar…), así que no se guarda el estado actual: se reescribe la última foto coherente. En modo libre sí se guarda el estado actual.
- **Formato.** Lo de siempre (todo `estado` salvo `ocupado` y `paso`) más, si se guardó en un punto de control, `punto` (nombre del paso), `celda` (casilla del héroe) y, si la misión los necesita, `campos` (sus campos propios, ver abajo). Partidas antiguas sin `punto` se cargan como antes: empiezan la misión.
- **Carga.** `estado.cargar()` deja el punto pendiente; `MisionBase.jugar()` lo recoge con `estado.tomar_reanudacion(numero)` (solo vale para esa misión y una vez). Si la misión declara ese punto, llama a `reanudar()` en vez de `empezar()`:
  1. `cargar_campos(campos)` (si se guardaron) y `preparar_punto(punto)`: dejan la misión y el mundo como estaban en ese paso;
  2. `mundo.colocar_heroe(celda)`: pone al héroe donde estaba (si la casilla se puede pisar);
  3. `paso(punto)`: pone el texto de misión, suelta al jugador y vuelve a guardar.
- Con `punto`, la pantalla de título ofrece «Continuar» también en la misión 1.

## Qué se restaura solo y qué no

Viene en `estado` y se restaura solo: monedas, semillas, frutos, brotes (con fruto y `cuantos`), estación, precio del pan, brillo, progreso, criaturas, regadera, ojo de tasador, gorro, patines, árbol, péndulo, zona…

`Mundo.restaurar(mision)` ya deja como al empezar la misión: zona, luces de misiones anteriores, personajes de misiones anteriores, Chispín.

**No** viene en `estado` y lo tiene que hacer `preparar_punto()`:

- personajes que la misión muestra u oculta (`this.mundo.mostrar(...)`), o mueve (`mover_npc`);
- luces encendidas dentro de la misión (`iluminar`), bazar apagado, cartel, tormenta, sprite de la máquina…;
- campos propios de la misión (`this.cosecha`, `this.puerta`, `this.compras`, `this.estacionArbol`…) que se usan en pasos posteriores: o se reconstruyen en `preparar_punto` (como `this.puerta` en la 12, que sale del nombre del paso) o se guardan con `campos_punto()` / `cargar_campos()`;
- `this.ui.textos_carta` si la misión lo cambia.

## Cómo añadir puntos de control a una misión

1. Lee la misión de arriba abajo y apunta cada `this.paso("...")`.
2. Para cada paso, pregúntate: si el niño llega aquí, cierra y vuelve, ¿qué hay que tener para que el resto de la misión funcione igual? Si todo está en `estado`, el paso vale tal cual. Si depende de algo del mundo, añádelo a `preparar_punto`. Si depende de un campo de la misión, devuélvelo en `campos_punto()` (un objeto que se pueda pasar a JSON; un `Set` va como lista) y recupéralo en `cargar_campos()`, comprobando lo leído (viene de `localStorage`). Si no se puede guardar ni reconstruir, **no lo declares** (se retomará desde el punto anterior).
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
// Solo si hacen falta campos propios (m04):
campos_punto() {
  return { cosecha: this.cosecha };
}
cargar_campos(o) {
  this.cosecha = Math.max(0, Math.min(2, o.cosecha | 0));
}
```

6. Añade un caso a `qa/guardado.py` (misiones 1–4) o a `qa/guardado_4_15.py` (misiones 4–15: siembra la partida en esa misión, recarga a mitad, compara el estado y juega hasta acabar la misión) y pásalo; después, `python3 qa/bot.py first 60000 <etiqueta>`.

Cuidado con las misiones que cambian de zona dentro de la misión (4, 7, 10, 13: «ir_valle», «ir_ciudad»…): el paso de viaje vale porque `estado.zona` aún es la de origen, pero comprueba que los pasos ya en la zona nueva restauran bien con `Mundo.restaurar()` (que mira `estado.zona`).

## Estado por misión

Todas las misiones retoman a mitad. Lo que pasa después del último punto de control de cada una (minijuegos, tablas, preguntas y la victoria, que van seguidos en un mismo `await`) no se retoma: se vuelve a ese último punto.

| Misión | Puntos de control | Qué prepara `preparar_punto` | Campos guardados (`campos_punto`) |
|---|---|---|---|
| 1 | ir_hogaza, ir_semilla, plantar, cosechar, vender, comprar_pan | carta; la Semilla (salvo en ir_hogaza) | — |
| 2 | ir_hogaza, ir_semilla, regadera, regar, cosechar, ir_yunque, ir_tasador | el Yunque (desde regadera) | — |
| 3 | ir_antojo, ir_hogaza, ir_semilla, feria | — | — |
| 4 | ir_valle (mercado), ir_copo, plantar, cosechar, volver_copo | — | `cosecha` (cosechas hechas) |
| 5 | ir_escarcha, plantar_arbol, ir_raiz, ir_anillos, cosechar_arbol, ir_copo | — (la Escarcha la muestra `restaurar`; Prisas está oculto en todos) | `estacionArbol`, `vioRaiz`, `vioAnillos`, `ventas` |
| 6 | ir_copo | — (Prisas ya ha huido) | — |
| 7 | ir_ciudad (valle), ir_lupa, ir_fiel, ir_cuenta, volver_fiel | — (Prisas ya ha huido del bazar) | — |
| 8 | ir_cuenta, investigar, ir_lupa | — | `investigados` (lista) |
| 9 | ir_lupa, ir_plaza, volver_lupa | Prisas visible | — |
| 10 | ir_torre (ciudad), ir_arrepentido, ir_reves, ir_chollo | Don Chollo (en ir_chollo) | — |
| 11 | ir_tienda, ir_reves | Deudón (en ir_reves) | `eleccion` |
| 12 | ir_cautela, puerta_1…puerta_4, ir_reves | el Revés al fondo (`mover_npc`); `this.puerta` sale del paso y se abren las anteriores | — |
| 13 | ir_reloj (torre), ir_pendulo, ir_vaiven, ir_euforio | Euforio (salvo en ir_reloj) | — |
| 14 | ir_memoria, ir_pendulo | tormenta y Pánico | — |
| 15 | ir_maquina | — | — |

Notas:

- **4, 7, 10, 13**: el primer punto es aún en la zona de origen; el viaje guarda sin punto (empieza la misión ya en la zona nueva, como antes) y los demás puntos son en la zona nueva, que `Mundo.restaurar()` carga porque `estado.zona` ya ha cambiado.
- **5**: tras vender el árbol a Prisas, «plantar_arbol» se guarda con `ventas = 1` y la oferta ya no se repite al retomar.
- **6**: después de «ir_copo» todo (sacos, reparto, helada, primavera, tabla) va seguido en `copo()`.
- **8**: `this.bazarCerrado` y el cartel solo cambian dentro de `elegir()`, después de «ir_lupa»: si se cierra ahí, se vuelve a «ir_lupa» con el bazar abierto y sin el trocito del bazar.
- **10, 13**: `this.olido` y `this.compro` solo cambian después del último punto, no hace falta guardarlos.
- **15**: `final()` y `victoria()` van seguidos (trampas, forja, máquina apagada, carta y fin). Si se cierra a mitad, se vuelve a «ir_maquina» con la máquina encendida. Al acabar, `main.ts` guarda sin punto (misión 16) y el modo libre carga y funciona como siempre.
