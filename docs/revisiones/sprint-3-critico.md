# Revisión del crítico RPG · Sprint 3 (antes de programar)

Fecha: 6 de noviembre de 2026 · Revisa: `docs/plan-juego-v2.md`, `docs/especificaciones/sprint-3-bucle.md` y `qa/sim_economia.py`.
Método: lectura de los tres documentos, la simulación original con 7 semillas y variantes en `/tmp/simv/` (`variantes.py`, `v2.py`). No hay nada programado: todo lo que digo sobre la sensación al jugar es una estimación.

## Veredicto

El plan acierta en lo principal: el huerto es el bucle que faltaba y la lección vive en sus reglas. Pero la especificación, tal como está, tiene tres problemas. Merma no se nota si el niño juega la historia de un tirón. Las monedas pierden sentido hacia el día 4. Y cada noche pide unos 35 toques, la mayoría tareas sin ninguna decisión. **Nota esperada si se programa tal cual: 5 (entre 4,5 y 5,5).** Con los cambios imprescindibles, 6.

## 1. ¿Apetece repetir el bucle?

- **Qué hace el dedo.** Con 12 bancales, una noche son 1 toque para cosechar, la ventana de replantar, unos 4 toques para vender, 1–3 para comprar, 12 para regar, hasta 12 ventanas de «¿Le pones abono?» y la siesta. Son entre 30 y 40 toques por noche. Solo uno de cada cinco es una decisión. Cosechar todo de un toque es muy buena idea. Regar casilla a casilla es una tarea que se repite sin decidir nada: regar siempre compensa (un 20 % más de media) y es gratis.
- **Decisiones falsas.** «Replantar o todo a la cesta» siempre se responde igual, porque replantar sale gratis y lo que sobra se vende igual. Comprar tierra también es siempre lo correcto mientras quede. La única decisión fina es dónde poner el abono: en la calabaza da +4, en el rábano da −2. Esa sí está bien.
- **Una estrategia dominante.** Calabaza con abono en todos los bancales y 3 manzanos. Rinde más que el rábano con cualquier nivel de Merma. Además, como en la cesta nada se pudre y Merma sube el precio de venta, **guardar frutos sin vender hasta Merma 3** gana a la estrategia «replanta e invierte»: 3.126 frente a 2.807 el día 10 (media de 7 semillas), con un día de 1.731 monedas de golpe. A partir del día 5 no queda nada que decidir, y la sesión se reduce a repetir la misma ronda.
- **Lo que falta frente al listón.** Stardew y Animal Crossing tienen un pedido o una sorpresa del día que cambia lo que conviene plantar. Aquí el regalo del día es siempre el mismo y los 6 secretos se señalan con chispas y con pistas que dicen dónde están. Funcionan más como objetos para recoger que como secretos.

## 2. Economía

- **La cifra.** 2.865 monedas con precios de 2 a 30 hacen que, desde el día 4, una moneda no valga nada: con 1.254 monedas ya no queda nada que comprar. Eso rompe la regla «las monedas siempre tienen un uso que importa».
- **El interés compuesto no se nota.** La curva se dispara al principio (de 124 a 438 en el día 2, unas 3,5 veces) y luego se vuelve una recta de unas 210 al día en cuanto se llenan los 12 bancales. El niño ve la bola de nieve pararse justo cuando debería acelerar. La capacidad (la tierra) es la que hace crecer la bola, y se agota con 4 compras.
- **La distancia entre jugadores es enorme.** El día 10, el despistado tiene 97 y el que invierte tiene 2.807, unas 29 veces más. No hay números que sirvan a la vez para los dos.

**Números propuestos (variante C, comprobada en `/tmp/simv/v2.py`, media de 7 semillas):**

| Cambio | Antes | Propuesta |
|---|---|---|
| Tasador paga calabaza / manzana (Merma 1/2/3) | 3/4/5 · 1/2/2 | **2/2/3 · 1/1/1** |
| Tope de manzanas en el árbol | 4 | **3** |
| Trabajo con Hogaza fuera del guion | 1 por noche | **1 por día real** (en las misiones, igual que ahora) |
| Tierras nuevas | 4 en el Mercado, 10 +5 cada una | **8**: 4 en el Mercado y 4 en las parcelas de Copo del Valle (ya existen en `mapas.ts`) tras la misión 5. Precios 10, 16, 26, 40, 65, 100, 160 y 250, por 1,2 con Merma 2 y por 1,4 con Merma 3 |
| Meta de ahorro | ninguna | **Obra del molino**: aportaciones de 50, 100, 200 y 400 |

Resultado de la variante C para «replanta e invierte»: patrimonio de 254, 818, 1.203 y 1.481 los días 2, 4, 6 y 10, con las monedas siempre **por debajo de 350**. La última tierra se compra hacia el día 6 y las etapas del molino caen los días 6, 7 y 8. El orden de lecciones se mantiene: replantar (1.831 sin molino) gana a vender todo (449), y vender todo gana a la hucha (94). Cada etapa del molino cambia el mundo: la rueda gira y suena; luego Hogaza paga 1 moneda más; luego se abre un rincón con un secreto; y al final el molino se ve entero desde el mapa. Merma no toca lo aportado, que es la lección de que lo invertido en algo real aguanta. Pedagogía debería validarlo.

## 3. Tiempo real

- **Bien:** la fecha más alta vista, la noche de vuelta con tope de 2, sin servidores y sin castigo por faltar días. En modo libre salen como mucho 3–4 noches al día, unos 5 minutos. Es un hábito sano.
- **Fallo grave: Merma va con los días jugados.** Quien juega la historia en una o dos tardes (una hora u hora y media, según mi medida del sprint 2) llega a la misión 15 con Merma en 1. Vence a un villano cuyo truco no ha visto nunca. Y quien adelanta la fecha del móvil sube Merma antes.
- **Las siestas a demanda** se gastan en los primeros 2 minutos: después, «Chispín ya no tiene sueño» y no queda nada que hacer. Para un hábito sano está bien, pero la sesión necesita algo más que hacer sin pasar noches (ver el encargo del día).
- **Brillo después del final:** con `brillo = 5 − merma`, el niño vence a Merma y su hucha se queda para siempre en 2 de 5. La recompensa dice lo contrario de la historia.

## 4. Qué fallos resuelve de verdad

| Fallo | Estado tras el sprint 3 |
|---|---|
| G1 (bucle) | **A medias.** Ya hay un bucle, pero son tareas sin decisiones. Las preguntas finales siguen (sprint 5). |
| G2 (final vacío) | **Resuelto** en lo básico: vecinos con frases nuevas, huerto, puestos y secretos. |
| G3 (monedas sin uso) | **Resuelto hasta el día 4**; después vuelve a pasar. |
| I1 (mundo y secretos) | **A medias**: se puede viajar durante la historia, pero los secretos se ven demasiado. |
| I2 (pago de amasar) e I4 (noches lentas) | **Resueltos.** |
| G4 (criaturas) | Solo se quita la frase falsa del panel, que es lo correcto. |
| G5, I3, I5 e I6 | **Sin tocar** (sprints 4–6). |
| M1 (desfase del banner en la misión 1) | Resuelto, pero los dos caminos de la misión 1 quedan iguales: **se pierde una decisión** que antes tenía efecto. |

Por áreas: bucle 3 → 5, rejugabilidad 1 → 4,5, recompensas 5 → 6, exploración 3 → 4,5, *juice* 4 → 5, ritmo 4 → 4,5, autonomía 4 → 4,5, interfaz 7 → 6,5 (más ventanas que tapan el mundo), y personaje y criaturas sin cambios. **En total, unos 5.**

## 5. Cambios antes de programar

### Imprescindibles

1. **Merma sube con las noches del reino, no con los días reales.** Un nivel cada 10 noches (en `estado.tiempo`), con aviso en la pantalla de la noche anterior. Así la historia sube Merma de 1 a 3 sea cual sea el ritmo, y cambiar la fecha deja de influir. **Al vencerla en la misión 15, el brillo vuelve a 5**: los precios se quedan donde están, pero las monedas ya no pierden valor.
2. **Números de la variante C** (tabla de la sección 2) y **la obra del molino** como meta de ahorro. Hay que pasarlos a `qa/sim_economia.py` con dos comprobaciones nuevas: las monedas, por debajo de 500 hasta el día 10, y quien invierte bien con algo que comprar al menos hasta el día 8.
3. **Gestos en lugar de tareas.** Replantar sin preguntar (la ventana solo deja cambiar de cultivo: «Igual» o «Calabaza»). Regar deslizando el dedo por la fila, con una salpicadura en cadena y un sonido que sube de tono. Abonar con el abono «en la mano» (un botón en la barra) y un toque por bancal, sin ventana de confirmar. Objetivo: 12 toques o menos por noche con 12 bancales, y medirlo en `qa/huerto.py`.
4. **Una cesta con fechas: liquidez frente a reserva.** Los rábanos aguantan 2 noches en la cesta, las manzanas 4 y las calabazas 10. Lo que se pasa va a la **compostera**: cada 3 frutos pasados dan 1 abono. Avisa la etiqueta «pocho mañana», así que no se pierde nada de golpe y la pérdida se convierte en abono. Esto rompe la estrategia de guardar frutos y crea la decisión real del juego: vender ya lo que caduca o guardar lo que aguanta.

### Recomendables

5. **Encargo del día.** Un vecino distinto cada día pide, por ejemplo, «5 calabazas antes de dormir» a cambio de 1,5 veces el precio de Tasador o de un plantón. Se elige según la fecha (sin azar a la vista ni tómbola) y se anuncia en «¡Buenos días!». Es la recompensa variable que falta y da un motivo para pensar qué plantar.
6. **Que la misión 1 siga teniendo una consecuencia.** Por ejemplo: con la hucha, la Mochila enseña desde el primer día «compras {n} semillas (antes, {m})»; comprando semillas, se llevan 2 semillas de rábano al huerto de la misión 3.
7. **Secretos sin chispa hasta oír la pista.** La chispa aparece solo después de que el vecino la cuenta. Así, quien explora por su cuenta encuentra el secreto antes que nadie.
8. **Siestas como un reloj de arena en el panel Huerto,** con el huerto creciendo sobre el mapa en lugar de una pantalla negra. Adelanta un poco del sprint 6 justo donde más se repite.

### Opcionales

9. Al subir Merma, que «¡Buenos días!» enseñe el efecto personal: «Tus frutos valen +{x}. Tus monedas compran {y} semillas menos.» Así el niño ve que invertir le ha protegido.
10. Una frase de Semilla o Copo la primera vez que llenas todos los bancales («¡Necesitas más tierra!»), para orientar la siguiente meta.
