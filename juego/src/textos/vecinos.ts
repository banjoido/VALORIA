// Textos de la vida del reino (sprint 3, 12.2 y 12.3): presentación del huerto,
// trabajo con Hogaza, encargos, viajes, secretos y frases de los vecinos por progreso.
// Las notas del abuelo y las frases de la obra están en textos/huerto.ts (tarea B).
// Marcas de género: docs/textos-genero.md. Como mucho dos frases por globo.

export const TX_VIDA = {
  presenta_1: "¡Ya eres hortelan{o}! Estos cuatro bancales son tuyos.",
  presenta_2: "Te regalo dos semillas de rábano. Crecen en una sola noche.",
  presenta_m01: "Y tus brotes del primer día dieron semilla: ¡dos más!",
  presenta_3: "¡Toca un bancal para plantar!",
  trabajo_titulo: "¿Amasas conmigo? Pago {b}, y 1 más por golpe bueno.",
  trabajo_si: "¡A amasar!",
  trabajo_no: "Ahora no",
  trabajo_paga: "¡Qué pan más rico! Toma tus {n} monedas.",
  trabajo_otro_dia: "¡Otro día amasamos!",
  trabajo_hecho: "Hoy ya has amasado. ¡Vuelve mañana!",
  encargo_titulo: "¿Le das {n} {frutos}? · +{p}",
  encargo_dar: "Dárselos",
  encargo_no: "Ahora no",
  encargo_falta: "Te espero con {n} {frutos}.",
  encargo_gracias: "¡Justo lo que necesitaba!",
  mision_lejos: "Tu misión sigue en {zona}. Toca el mapa para volver.",
  mapa_paso: "ABIERTO · termina este paso",
  mapa_mision: "TU MISIÓN",
  mapa_viajar: "{zona} · viajar",
  mapa_secretos: "Secretos {n}/{total}",
  mapa_listos: "{n} listos",
  mapa_molino: "Molino entero",
  libre: "{zona} · toca el mapa para viajar",
  parcela_historia: "Estos bancales son de Copo.",
  hola: "¡Hola!",
  secreto_fuente: "¡Una moneda antigua en la fuente! Vale por diez.",
  secreto_engranaje: "Un engranaje de la máquina… ¡y dos sacos de abono!",
  secreto_banco: "Una nota de tu abuelo, y una semilla de calabaza.",
  secreto_desvan: "Otra nota de tu abuelo, entre la harina.",
  secreto_cueva: "¡Una pepita de oro! Su precio sube con Merma.",
  secreto_lago: "¡Ziiim! ¡Un plantón de manzano bajo el hielo!",
  secreto_pino: "Otra nota de tu abuelo, y un saco de abono.",
} as const;

export type ClaveVida = keyof typeof TX_VIDA;

/** Texto con sus huecos ({n}, {zona}…) rellenos. Las marcas de género las rellena la interfaz. */
export function tv(clave: ClaveVida, v: Record<string, string | number> = {}): string {
  return TX_VIDA[clave].replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));
}

/** Quién dice el hallazgo de cada secreto. */
export const QUIEN_SECRETO: Record<string, string> = { lago: "escarcha" };

/**
 * Frases por progreso (12.3): [desde_mision, texto, condición?]. `desde` se compara con
 * `estado.mision` (16 = después del final). "!fuente": si no ha encontrado ese secreto;
 * "regadera": si tiene la regadera de hierro.
 */
export type Frase = [number, string, string?];
export const FRASES_VECINOS: Record<string, Frase[]> = {
  hogaza: [
    [1, "¡Huele a pan recién hecho!"],
    [3, "Dicen que en la fuente hay una moneda muy antigua.", "!fuente"],
    [4, "Desde que Subeprecios se fue, el pan sale dorado otra vez."],
    [16, "Valoria entera viene a por pan. ¡Gracias a ti!"],
  ],
  tasador: [
    [3, "Te compro lo que traigas. Precio justo, ni más ni menos."],
    [3, "Tu abuelo se sentaba al sur, entre los pinos.", "!banco"],
    [5, "Merma lo encarece todo. Al menos, tus frutos también valen más."],
  ],
  antojo: [
    [1, "¡Caramelos brillantes! ¿Un caprichito?"],
    [4, "¡Hoy, caramelos de fresa!"],
    [16, "Pronto abriré un puesto de adornos. ¡Ya verás!"],
  ],
  semilla: [
    [3, "¿Qué plantamos hoy?"],
    [5, "Las calabazas tardan y a veces fallan. Pero suelen dar más."],
    [16, "Tu huerto es el más bonito del Mercado. ¡No se lo digas a nadie!"],
  ],
  yunque: [
    [3, "Lo bueno se paga una vez."],
    [3, "Junto a la máquina vieja se cayó un engranaje. ¡Aún está caliente!", "!engranaje"],
    [3, "¿Qué tal esa regadera? Te durará años.", "regadera"],
  ],
  copo: [
    [4, "Sin prisa, pequeñ{o}. Lo bueno crece despacio."],
    [6, "Un manzano tarda en crecer. Luego da fruta cada noche."],
    [16, "El reloj de arena dice que tu huerto será un bosque."],
  ],
  raiz: [
    [4, "Mi casa la levantó mi bisabuela, piedra a piedra. Todavía me abriga."],
    [6, "En la cueva del sur brilla algo. Yo ya soy mayor para entrar.", "!cueva"],
    [16, "Las piedras no dan fruta, pero abrigan cada invierno."],
  ],
  anillos: [
    [4, "Cada anillo de un tronco es un año que el árbol aguantó."],
    [6, "Bajo el último pino del camino, tu abuelo escondió algo.", "!pino"],
  ],
  escarcha: [
    [4, "¡Ziiim! ¿Me ves patinar? Llevo todo el invierno practicando."],
    [6, "¡He visto algo brillar bajo el hielo del lago!", "!lago"],
  ],
  lupa: [
    [7, "Un buen detective nunca se fía de la puerta. Mira dentro."],
    [10, "Desde que miras dentro, te cuesta más caer."],
  ],
  fiel: [
    [7, "Mis clientes vuelven porque mis zapatos duran. Así de sencillo."],
    [10, "Lo que va bien no hace ruido. Mis zapatos siguen vendiéndose."],
  ],
  engranaje: [
    [7, "¡Cada temporada mejoro algo! Esta vez, botas para la nieve."],
    [10, "¡He inventado una regadera que riega sola! Bueno… casi."],
  ],
  cuenta: [
    [7, "Los números no mienten. Las fachadas, a veces sí."],
    [10, "Mis números avisan antes que nadie."],
  ],
  reves: [
    [10, "¡Aloh! Aquí todo va al revés. Así se ven las cosas que los demás no ven."],
    [13, "Si algo parece demasiado bueno, míralo del revés."],
  ],
  arrepentido: [
    [10, "Si alguien te promete el doble en una noche, acuérdate de mí."],
    [13, "Ya no persigo dobles. Planto rábanos y me va mejor."],
  ],
  cautela: [
    [10, "Antes de cada paso, me pregunto: ¿qué podría salir mal?"],
    [13, "Has pasado las cuatro puertas. Ahora cuida de otros."],
  ],
  vaiven: [
    [13, "¡Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."],
    [16, "El mercado sube y baja. Tú ya no te asustas."],
  ],
  memoria: [
    [13, "He visto cien tormentas. Todas pasaron."],
    [16, "Las tormentas pasan. Con calma, se ven pasar."],
  ],
  pendulo: [
    [13, "No sé adónde va el péndulo. Pero sé dónde está."],
    [16, "La máquina está apagada. Ahora los precios suben despacito, como en todas partes."],
  ],
};

/** Nombre del vecino en los textos («Encargo de hoy: Hogaza quiere…»). */
export const NOMBRE_VECINO: Record<string, string> = {
  hogaza: "Hogaza", tasador: "Tasador", semilla: "la señora Semilla", copo: "Copo", antojo: "Antojo", raiz: "Raíz",
};
