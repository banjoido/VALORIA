# Revisión de pedagogía · Sprint 3 (antes de programar)

Fecha: 6 de noviembre de 2026 · Revisa: pedagogía · Documentos: `docs/plan-juego-v2.md`, `docs/especificaciones/sprint-3-bucle.md`, `qa/sim_economia.py` (ejecutada con la semilla 7: los mismos números que la especificación).

## Veredicto

1. El bucle enseña bien casi todo: la inflación, que los frutos suban con ella, la renta del manzano, que cuidar compensa y que la tierra cuesta. Para el bienestar está muy bien pensado.
2. Hay tres mensajes falsos que conviene arreglar antes de programar: invertir no tiene ningún riesgo, ahorrar siempre pierde, y la pepita de oro «que Merma no toca» en realidad pierde valor.
3. Con estos cambios, que son pequeños y casi todos de números o de textos, doy el visto bueno.

## 1. ¿Las reglas enseñan lo correcto?

| Regla | Qué enseña | Juicio |
|---|---|---|
| Hucha con brillo = 5 − Merma y línea «compras {n} semillas» | La inflación quita poder de compra sin quitar monedas | **Bien.** Es concreto y no castiga. |
| Tasador paga más con Merma | Los bienes reales siguen a los precios; el dinero quieto, no | **Bien.** La frase de Tasador al nivel 5 lo dice sin dar clase. |
| Replantar frente a vender | Que no conviene vender tu semilla para comprarla después más cara | **Correcto, pero no es interés compuesto.** Replantar un fruto mantiene el capital. La bola de nieve llega al usar lo ganado para *ampliar* (tierras, calabazas, manzanos). |
| Manzano | Un activo que da renta y tarda en pagarse (unas 10 noches) | **Bien.** Que el fruto no se pudra con el árbol lleno es una buena decisión. |
| Abono y regar | Invertir en productividad | **Bien, y es sutil:** en el rábano el abono pierde dinero (cuesta 4 y da 2 frutos de 1). Eso es una lección real: no toda mejora compensa. |
| Tierras que suben (+5 cada una y con Merma) | Escasez y bienes que guardan su valor | **Bien.** |
| Hogaza paga por habilidad | Esforzarse rinde | **Bien**, pero su sueldo no sube con Merma. Sin querer, el juego enseña que trabajar vale cada vez menos. |
| Pepita de oro a 15 «que Merma no toca» | Una forma de protegerse de la inflación | **Falso con estos números.** Si las semillas pasan de 2 a 4 y la pepita sigue a 15, la pepita pierde la mitad de su valor, igual que las monedas. |

**Mensajes peligrosos que veo:**

- **«Invertir no tiene riesgo».** Con la regadera, ninguna cosecha baja de lo normal. Replantar y ampliar gana *siempre*, y el patrimonio se multiplica por 140 en diez días. Un niño sacará esta conclusión: «lo que se planta siempre crece, y mucho».
- **«Siempre conviene reinvertirlo todo».** En el sprint 3 no hay ningún motivo para guardar algo de dinero: ni imprevistos ni oportunidades. La estrategia ganadora es quedarse a 3 monedas.
- **«Ahorrar es de tontos».** La tabla de la simulación («Hucha pierde») y la nota 1 del abuelo («ya no compraban casi nada») empujan a pensar que guardar es malo. Para un niño de 8 a 12 años, ahorrar *para algo* es el hábito básico. La lección correcta es «el dinero quieto *sin un fin* se encoge». Fíjate que el jugador de la hucha compra más semillas cada día (31 el primer día, 92 el décimo), porque sigue ahorrando.
- **«Hacerse rico es fácil».** Pasar de 20 monedas a 2.865 en 10 días, con un huerto lleno el día 4, quita peso a las decisiones de las misiones 10 y 11: ¿para qué pedir un préstamo a Deudón si tienes 2.000 monedas?

## 2. El riesgo: qué meter ya y qué puede esperar

**Ya, en el sprint 3 (poco y barato):**
- **Más rendimiento, más incertidumbre.** La calabaza regada puede salir floja de vez en cuando (por ejemplo, un 15 %). El rábano sigue siendo seguro. Así el niño descubre la escalera riesgo-rendimiento jugando, y tener dos cultivos ya amortigua algo.
- **Ahorrar para algo.** En la Mochila: «Te faltan {n} para un manzano» (o para la siguiente tierra). La hucha pasa a ser el camino hacia una meta, no un error.
- Quitar el «¡Bola de nieve!» de la primera vez que replanta y llevarlo al primer bancal comprado con lo cosechado, que es cuando de verdad crece la bola.

**En los sprints 4 y 5 (encaja con la historia, porque diversificar es la misión 6):**
- Una helada con aviso que afecta a *un* cultivo, para que diversificar se note (Escudón).
- Talleres que suben y bajan, con pérdidas suaves y recuperables.
- Un sitio seguro con un interés pequeño (una «hucha que crece» de un vecino). Así queda completa la escalera: hucha (sin riesgo, pierde contra Merma) → ahorro con interés → huerto → talleres.
- Un imprevisto con aviso que pida tener algo guardado: da sentido a no reinvertirlo todo.

## 3. Hábito sano

La especificación respeta la regla «premia la paciencia, no estar pegado»:
- Merma cuenta los *días jugados*, no los del calendario. No abrir el juego no castiga.
- Hay tope de noches (2 siestas y 1 o 2 de vuelta), el regalo es siempre el mismo (no es una tómbola), no hay rachas y nada se pudre.
- Volver después de 5 días no da menos que volver mañana. Eso es lo correcto.

Ajustes:
- **«Mañana sube»** puede sonar a «compra ya». Mejor en tono informativo: «Mañana, precios nuevos».
- **«¡Un manzano está lleno! Ve a recoger.»** debe quedarse dentro del juego. Nunca como notificación al móvil, en ningún sprint. Propongo: «Un manzano está lleno de manzanas».
- El regalo no debe acumularse ni enseñar nunca «te perdiste X días».

Evidencia: el estudio de Radesky y su equipo (2022) encontró diseños manipuladores, como la presión para seguir jugando, en la mayoría de las apps que usan niños pequeños ([resumen de Michigan Medicine](https://www.michiganmedicine.org/health-lab/design-tricks-commonly-used-monetize-young-childrens-app-use)). He leído solo el resumen, no el artículo. La idea de que los hábitos con el dinero se forman hacia los 7 años (Whitebread y Bingham, 2013, para el Money Advice Service) la conozco por la prensa ([Yahoo Finance](https://ca.finance.yahoo.com/blogs/pay-day-/kids-develop-money-habits-age-seven-study-200000613.html)). No he comprobado el informe original.

## 4. Textos

La voz está bien en general: Tasador, Arrepentido y Raíz suenan a ellos mismos. Cambios necesarios:

| Clave | Problema | Propuesta |
|---|---|---|
| `regalo_red` | 3 frases | ¿Sin nada que plantar? Toma, ¡que no pare el huerto! |
| `secreto_lago` | 3 frases | ¡Ziiim! ¡Un plantón de manzano bajo el hielo! |
| `nota_1` | Largo y exagerado | Aquí escondía mis monedas. Al volver, compraban mucho menos. |
| `nota_2` | 12 palabras | Copo y yo plantamos este manzano. Tardó años, y luego dio cada otoño. |
| `presenta_1` | 2.ª frase larga | ¡Ya eres hortelan{o}! Estos cuatro bancales son tuyos. |
| `primera_replanta` | Explica, y el concepto no es exacto | Un fruto vuelve a la tierra. (el «¡Bola de nieve!» va al ampliar) |
| Péndulo 16 | Falso: «Los precios ya no suben más» | La máquina está apagada. Ya no hay sustos de precios. |
| Lupa 10 | Exceso de confianza ante los timos | Desde que miras dentro, te cuesta más caer. |
| Memoria 16 | Promesa absoluta | Las tormentas pasan. Con calma, se ven pasar. |
| Antojo 4 / Cuenta 10 | Suenan a moraleja | Antojo: ¡Hoy, caramelos de fresa! · Cuenta: Mis números avisan antes que nadie. |
| Cautela 13 | «Pasaste»: en España se dice «has pasado» | Has pasado las cuatro puertas. Ahora cuida de otros. |
| Engranaje 7, Yunque 3 | 2.ª frase de 9–10 palabras | Recortar: «Esta vez, botas para la nieve.» · «¡Aún está caliente!» |
| `parcela_historia` | Promete árboles que el niño aún no tiene | Estos bancales son de Copo. |
| Descripción de la pepita | Falso con el precio fijo | Que su precio suba con Merma (15, 20, 25), y entonces la frase es verdad. |

El género está bien resuelto: `{o}` en `presenta_1` y Copo, y el resto es neutro.

## 5. Dudas del fundador

- **5 (misión 1: los dos caminos acaban con brillo 4). Aceptar.** El brillo mide el valor de una moneda, y la inflación afecta a todas por igual: dar 3 a quien guarda era conceptualmente falso. La diferencia entre los caminos tiene que verse en *lo que tienes*, no en el brillo. El camino de la hucha ya lo enseña («Ayer… {antes} panes. Hoy, solo {hoy}»). El de las semillas debe cobrar de verdad: cuando sus brotes pasen a la cesta en la misión 4, una línea lo dice («Tus brotes de la misión 1: +{n} rábanos»). Además, conviene cambiar la página de la misión 1 («Merma solo roba el brillo de lo que está quieto») por «Merma roba brillo a las monedas. Lo plantado crece.».
- **1 (Merma tras el final). Que no se congele del todo, pero sin villano.** «Apagada para siempre» enseña que la inflación es culpa de un malo y se puede eliminar, y eso es falso. Propongo que, tras el final, no haya más saltos bruscos, pero sí una subida lenta y anunciada (un nivel cada muchos días jugados), presentada como «los precios suben despacito, como en todas partes». Esto encaja con las «temporadas» del sprint 5. Hay que cambiar el texto de Péndulo. Aparte: hoy Merma llega a su tope el día 5, así que la lección de la hucha se apaga *antes* del final para quien juega despacio. Conviene repartir las subidas a lo largo de la historia.
- **4 (cuántas monedas).** No basta con bajar precios: con la venta de calabaza y manzana más baja, quien replanta sigue en unas 2.300 monedas el día 10 (lo he probado con la simulación). Lo que importa para enseñar es que el niño tenga *en qué decidir*. Que lleguen ya en el sprint 4 los talleres, los caprichos y el ahorro con interés, y que el sprint 5 escale los precios de las misiones. Ojo también: la especificación dice «gana el doble» y la simulación da casi 4 veces más.
- **3 (siestas). Mantener 2.** Las sesiones quedan cortas y acotadas; el límite de los padres es otra capa.
- **2 (adelantar la fecha). Aceptarlo.** Solo se lo salta quien lo hace, y no hay competición entre niños.
- **6 (viajar solo en puntos de control). Suficiente.** No afecta a lo que se enseña.

## Cambios imprescindibles antes de programar

1. Pepita de oro: precio que suba con Merma (o quitar «Merma no puede con ella»).
2. Un poco de incertidumbre en la calabaza regada; el rábano sigue siendo seguro.
3. «Te faltan {n} para…» en la Mochila: ahorrar para una meta.
4. Llevar «¡Bola de nieve!» al primer bancal ampliado con lo cosechado.
5. Que el sueldo de Hogaza suba con Merma (por ejemplo, base 3, 4 y 5).
6. Textos de la sección 4, sobre todo Péndulo 16, Lupa 10 y los globos de 3 frases.
7. Ninguna notificación fuera del juego, y «Mañana sube» en tono informativo.
