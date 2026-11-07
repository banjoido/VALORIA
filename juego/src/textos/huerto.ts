// Textos del huerto, los puestos y la obra del molino (sprint 3, 12.1).
// Marcas de género: docs/textos-genero.md. Como mucho dos frases por globo.
import type { Cosa, Cultivo, Fruto } from "../reino/reglas";

export const TX_HUERTO = {
  sin_semillas: "No nos quedan semillas. La señora Semilla vende.",
  regalo_red: "¿Sin nada que plantar? Toma, ¡que no pare el huerto!",
  lista_1: "Lista tras una noche",
  lista_n: "Lista en {n} noches",
  regada: "¡Regada!",
  primera_floja: "Sin regar, a veces la cosecha sale floja.",
  buena: "+{n} ¡Buena!",
  tierra_titulo: "Tierra nueva · {p} monedas",
  tierra_comprar: "Comprarla",
  ahora_no: "Ahora no",
  bola_de_nieve: "¡Bola de nieve! Lo cosechado ya planta más tierra.",
  faltan: "Te faltan {n}",
  hoyo_vacio: "Aquí cabe un manzano. Copo vende plantones.",
  arbol_crece: "Dará manzanas en {n} noches",
  arbol_crece_1: "Dará manzanas mañana",
  arbol_vacio: "Mañana, más manzanas",
  arbol_lleno: "Un manzano está lleno de manzanas.",
  parcela_historia: "Estos bancales son de Copo.",
  pocho: "pocho mañana",
  compost: "La compostera te da 1 abono.",
  brotes_pasados: "Los brotes de tu primer huerto: +{n} semillas.",
  dormir: "Dormir una noche (quedan {n} hoy)",
  sin_sueno: "Chispín ya no tiene sueño. Mañana, más noches.",
  dormir_ocupado: "Termina lo que estás haciendo para dormir.",
  noche_siesta: "El huerto crece mientras duermes.",
  bd_titulo: "¡Buenos días!",
  bd_una: "Ha pasado una noche.",
  bd_dos: "Han pasado dos noches.",
  bd_listos: "{zona}: {lista} listos",
  bd_pocho: "{n} {frutos} se pondrán pochos mañana.",
  bd_regalo: "Chispín ha encontrado una semilla de {cultivo}.",
  bd_encargo: "Encargo de hoy: {vecino} quiere {n} {frutos}.",
  bd_boton: "¡A jugar!",
  merma_manana: "Mañana, precios nuevos.",
  merma_sube: "Merma ha subido los precios. Tus monedas brillan menos.",
  merma_final: "Los precios suben despacito, como en todas partes.",
  hucha_compra: "Con tus monedas compras {n} semillas de rábano.",
  hucha_antes: "(antes, {m})",
  hucha_pan: "Tus monedas compraban {antes} panes; hoy, {hoy}.",
  meta: "Ahorras para: {meta}. Te faltan {n}.",
  meta_lista: "¡Ya tienes para {meta}!",
  meta_cambiar: "Toca para cambiar de meta",
  nada_que_vender: "No tienes frutos. ¡A cosechar!",
  vender_todo: "Vender todo · +{n}",
  vender: "Vender · +{n}",
  comprar: "Comprar · {p}",
  tienes: "tienes {n}",
  encargo_hoy: "Encargo de hoy: {vecino} quiere {n} {frutos}.",
  encargo_hecho: "Encargo de hoy: ¡cumplido!",
  compostera: "Compostera {c}/3",
  obra_titulo: "Obra del molino · Etapa {e}: {nombre}",
  obra_entera: "Obra del molino · ¡Terminada!",
  obra_merma: "Los ladrillos puestos se quedan puestos.",
  obra_poner_1: "Poner 1 ladrillo · {p}",
  obra_poner_5: "Poner 5 · {p}",
  obra_precio: "Un ladrillo cuesta {p}",
  obra_barra: "{puestos}/{necesarios} ladrillos",
  obra_presenta: "Aquí irá el molino del pueblo. Cada ladrillo cuenta.",
  obra_1: "¡La rueda ya gira!",
  obra_2: "Muros en pie. Hogaza ya tiene harina.",
  obra_3: "¡Tejado puesto! Arriba hay un desván.",
  obra_4: "¡El molino está entero! Se ve desde todo Valoria.",
  obra_sigue: "Cada ladrillo cuenta.",
  medalla_molino: "Medalla del molino",
  nota_leer: "Leer la nota {n} del abuelo",
  cerrar: "Cerrar",
} as const;

export type ClaveHuerto = keyof typeof TX_HUERTO;

/** Texto con sus huecos ({n}, {p}…) rellenos. Las marcas de género las rellena la interfaz. */
export function th(clave: ClaveHuerto, v: Record<string, string | number> = {}): string {
  return TX_HUERTO[clave].replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));
}

export const NOMBRE_ETAPA = ["Rueda", "Muros", "Tejado", "Aspas"];

const FRUTOS_NOMBRE: Record<Fruto, [string, string]> = {
  rabano: ["rábano", "rábanos"],
  calabaza: ["calabaza", "calabazas"],
  manzana: ["manzana", "manzanas"],
  pepita: ["pepita de oro", "pepitas de oro"],
};
export function nombre_fruto(f: Fruto, n = 2): string {
  return FRUTOS_NOMBRE[f][n === 1 ? 0 : 1];
}
export const NOMBRE_CULTIVO: Record<Cultivo, string> = { rabano: "rábano", calabaza: "calabaza", manzano: "manzano" };

// Iconos (sprites) de cada cosa.
export const ICONO_FRUTO: Record<Fruto, string> = { rabano: "fruto", calabaza: "calabaza_lista", manzana: "manzana", pepita: "oro" };
export const ICONO_COSA: Record<Cosa | "tierra", string> = {
  rabano: "semillas", calabaza: "calabaza_lista", manzano: "planton", abono: "abono",
  regadera: "regadera_hierro", ladrillo: "ladrillo", tierra: "cartel_venta",
};

// Puesto: nombres y líneas cortas.
export const NOMBRE_COSA: Record<Cosa | "tierra", string> = {
  rabano: "Semilla de rábano", calabaza: "Semilla de calabaza", manzano: "Plantón de manzano", abono: "Abono",
  regadera: "Regadera de hierro", ladrillo: "Ladrillo del molino", tierra: "Tierra nueva",
};
export const LINEA_COSA: Record<Cosa | "tierra", string> = {
  rabano: "Crece en 1 noche. Seguro.",
  calabaza: "Crece en 3 noches. Da más, a veces menos.",
  manzano: "Tarda 4 noches. Luego, manzanas cada noche.",
  abono: "2 frutos más en un bancal.",
  regadera: "Menos cosechas flojas.",
  ladrillo: "Cada ladrillo cuenta para siempre.",
  tierra: "Un bancal más, para siempre.",
};
export const LINEA_FRUTO: Partial<Record<Fruto, string>> = { pepita: "Merma no puede con ella." };

export type Vecino = "semilla" | "tasador" | "yunque" | "copo";
export const TITULO_PUESTO: Record<Vecino, string> = {
  semilla: "Puesto de la señora Semilla",
  tasador: "Tasador compra",
  yunque: "Fragua de Yunque",
  copo: "Puesto de Copo",
};
// Frase de arriba si quien abre el puesto no da otra.
export const FRASE_PUESTO: Record<Vecino, string> = {
  semilla: "¿Qué plantamos hoy?",
  tasador: "Te compro lo que traigas. Precio justo, ni más ni menos.",
  yunque: "Lo bueno se paga una vez.",
  copo: "Sin prisa, pequeñ{o}. Lo bueno crece despacio.",
};

export const NOMBRE_META: Record<string, string> = {
  tierra: "una tierra nueva",
  planton: "un plantón",
  regadera: "la regadera de hierro",
  molino: "la etapa {e} del molino",
};

export const NOMBRE_ZONA_HUERTO: Record<string, string> = { mercado: "Mercado", valle: "Valle" };

// Notas del abuelo de los secretos (12.2): se leen desde la Mochila.
export const NOTAS_ABUELO: { n: number; secreto: string; texto: string }[] = [
  { n: 1, secreto: "banco", texto: "Aquí escondía mis monedas. Al volver, compraban mucho menos." },
  { n: 2, secreto: "pino", texto: "Copo y yo plantamos este manzano. Tardó años, y luego dio cada otoño." },
  { n: 3, secreto: "desvan", texto: "Este molino lo empezamos tus abuelos. Ladrillo a ladrillo, sin prisa." },
];
