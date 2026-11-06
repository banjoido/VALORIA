// Reglas del reino: huerto propio, cesta, precios, Merma, molino, encargos y trabajo.
// Especificación: docs/especificaciones/sprint-3-bucle.md (secciones 3, 4, 6 y 11).
// Los números coinciden con qa/sim_economia.py (qa/reino.py lo comprueba).
// Sin pantalla: la interfaz (tarea B) y la vida del reino (tarea C) usan estas funciones.
import { estado } from "../estado";
import { hoy } from "./tiempo";

export type Cultivo = "rabano" | "calabaza" | "manzano";
export type Fruto = "rabano" | "calabaza" | "manzana" | "pepita";
export type Cosa = Cultivo | "abono" | "regadera" | "ladrillo";
export type Mano = "regadera" | "abono" | Cultivo;
export interface Bancal { zona: string; x: number; y: number; tipo: "bancal" | "hoyo"; abierto: boolean; precio?: number }
export interface Planta { zona: string; x: number; y: number; cultivo: Cultivo; edad: number; regada: boolean; abono: boolean; manzanas: number }
export interface Cosecha { x: number; y: number; cultivo: Cultivo; frutos: number; suerte: "buena" | "normal" | "floja"; replantado: Cultivo | null }
export interface Lote { fruto: Fruto; n: number; noches: number }
export interface Encargo { dia: string; npc: string; fruto: Fruto; n: number; hecho?: boolean }
export type Bolsa = Record<Cultivo | "abono", number>;

// Campos de `estado` que usa el reino (estado.ts aún no está tipado).
export interface EstadoReino {
  mision: number; zona: string; monedas: number; brillo: number; regadera: string; maquina_apagada: boolean;
  ocupado: boolean; brotes: { celda: { x: number; y: number }; zona?: string; fruto?: boolean; cuantos?: number }[];
  tiempo: number; merma: number; merma_desde: number; merma_final: boolean; dia: string; dias_jugados: number; siestas_dia: number;
  huerto: Planta[]; tierras: string[]; bolsa: Bolsa; cesta: Lote[]; compost: number; mano: string;
  ultimo_trabajo: string; ultimo_regalo: number; encargo: Encargo | null; ladrillos: number; meta: string;
  secretos: string[]; eleccion_m01: string; huerto_presentado: boolean; brotes_pasados: string[];
  bola_de_nieve: boolean; total_replantado: number;
  avisar(): void;
}
// Función y no constante: estado.ts importa este módulo (import circular).
export function E(): EstadoReino { return estado as unknown as EstadoReino; }

// ---------------------------------------------------------------------------
// Tablas (iguales que qa/sim_economia.py). Niveles de Merma 1..4.
// ---------------------------------------------------------------------------
type PorNivel = Record<1 | 2 | 3 | 4, number>;
export const COMPRA: Record<Cosa, PorNivel> = {
  rabano: { 1: 2, 2: 3, 3: 4, 4: 5 },
  calabaza: { 1: 5, 2: 6, 3: 8, 4: 9 },
  manzano: { 1: 20, 2: 25, 3: 30, 4: 35 },
  abono: { 1: 4, 2: 5, 3: 6, 4: 7 },
  regadera: { 1: 8, 2: 10, 3: 12, 4: 14 },
  ladrillo: { 1: 5, 2: 6, 3: 7, 4: 8 },
};
export const VENTA: Record<Fruto, PorNivel> = {
  rabano: { 1: 1, 2: 2, 3: 2, 4: 3 },
  calabaza: { 1: 2, 2: 2, 3: 3, 4: 3 },
  manzana: { 1: 1, 2: 1, 3: 1, 4: 2 },
  pepita: { 1: 15, 2: 20, 3: 25, 4: 30 },
};
export const CULTIVOS: Record<Cultivo, { noches: number; frutos: number; fruto: Fruto }> = {
  rabano: { noches: 1, frutos: 2, fruto: "rabano" },
  calabaza: { noches: 3, frutos: 3, fruto: "calabaza" },
  manzano: { noches: 4, frutos: 2, fruto: "manzana" }, // desde la 5.ª noche, 2 manzanas cada noche
};
export const CADUCA: Partial<Record<Fruto, number>> = { rabano: 2, manzana: 4, calabaza: 10 };
export const TOPE_ARBOL = 3;
export const TIERRAS = [10, 16, 26, 40, 65, 100, 160, 250];
export const FACTOR_TIERRA: PorNivel = { 1: 1.0, 2: 1.2, 3: 1.4, 4: 1.6 };
export const LADRILLOS_ETAPA = [10, 20, 40, 80];
export const BASE_TRABAJO: Record<number, number> = { 0: 3, 1: 3, 2: 4, 3: 5, 4: 6 };
export const NOCHES_POR_NIVEL = 10;
export const NOCHES_POR_NIVEL_FINAL = 30;
export const TOTAL_LADRILLOS = LADRILLOS_ETAPA.reduce((a, b) => a + b, 0); // 150

const FRUTOS: Fruto[] = ["rabano", "calabaza", "manzana", "pepita"];
const CULTIVOS_LISTA: Cultivo[] = ["rabano", "calabaza", "manzano"];
export const SECRETOS = ["fuente", "engranaje", "banco", "desvan", "cueva", "lago", "pino"];

// ---------------------------------------------------------------------------
// Celdas (3.1)
// ---------------------------------------------------------------------------
interface Celda { zona: string; x: number; y: number; tipo: "bancal" | "hoyo"; desde: number; tierra: boolean }
const fila = (zona: string, y: number, desde: number, tierra: boolean): Celda[] =>
  [1, 2, 3, 4].map(i => ({ zona, x: zona === "mercado" ? i + 1 : i, y, tipo: "bancal" as const, desde, tierra }));
// `desde`: se abre al ganar esa misión (estado.mision > desde).
const CELDAS: Celda[] = [
  ...fila("mercado", 4, 2, false),
  ...fila("mercado", 5, 3, false),
  ...fila("mercado", 3, 2, true),
  ...fila("valle", 9, 5, true),
  ...[9, 11, 13].map(x => ({ zona: "valle", x, y: 24, tipo: "hoyo" as const, desde: 5, tierra: false })),
];
const clave = (zona: string, x: number, y: number) => `${zona}:${x},${y}`;
export const CLAVES_TIERRA = CELDAS.filter(c => c.tierra).map(c => clave(c.zona, c.x, c.y));

function celda(zona: string, x: number, y: number): Celda | undefined {
  return CELDAS.find(c => c.zona === zona && c.x === x && c.y === y);
}
function celda_abierta(c: Celda): boolean {
  const e = E();
  return e.mision > c.desde && (!c.tierra || e.tierras.includes(clave(c.zona, c.x, c.y)));
}

/** Celdas del huerto de la zona: las abiertas y las tierras a la venta (con `precio`). */
export function bancales(zona: string): Bancal[] {
  const e = E();
  return CELDAS.filter(c => c.zona === zona && e.mision > c.desde).map(c => {
    const abierto = celda_abierta(c);
    const b: Bancal = { zona: c.zona, x: c.x, y: c.y, tipo: c.tipo, abierto };
    if (!abierto) b.precio = precio("tierra");
    return b;
  });
}

export function etapa_molino(ladrillos = E().ladrillos): number {
  let etapa = 0, acumulado = 0;
  for (const n of LADRILLOS_ETAPA) { acumulado += n; if (ladrillos >= acumulado) etapa++; }
  return etapa;
}

/** El solar del molino (Mercado, desde la misión 3). `puestos/necesarios` son de la etapa en obras. */
export function obra(zona: string) {
  const e = E();
  if (zona !== "mercado" || e.mision <= 3) return null;
  const celdas: { x: number; y: number }[] = [];
  for (let y = 18; y <= 20; y++) for (let x = 2; x <= 4; x++) celdas.push({ x, y });
  const etapa = etapa_molino();
  if (etapa >= 4) return { celdas, etapa, puestos: LADRILLOS_ETAPA[3], necesarios: LADRILLOS_ETAPA[3] };
  const antes = LADRILLOS_ETAPA.slice(0, etapa).reduce((a, b) => a + b, 0);
  return { celdas, etapa, puestos: e.ladrillos - antes, necesarios: LADRILLOS_ETAPA[etapa] };
}

// ---------------------------------------------------------------------------
// Plantas (4.1–4.3)
// ---------------------------------------------------------------------------
export function planta_en(zona: string, x: number, y: number): Planta | null {
  return E().huerto.find(p => p.zona === zona && p.x === x && p.y === y) || null;
}

/** Noches hasta estar lista (o, en un manzano, hasta tener manzanas). 0 = lista. */
export function noches_que_faltan(p: Planta): number {
  if (p.cultivo === "manzano") {
    if (p.edad <= CULTIVOS.manzano.noches) return CULTIVOS.manzano.noches + 1 - p.edad;
    return p.manzanas > 0 ? 0 : 1;
  }
  return Math.max(0, CULTIVOS[p.cultivo].noches - p.edad);
}

/** Herramientas de la ficha «en la mano», en orden (4.2). */
export function manos_disponibles(): Mano[] {
  const e = E(), m: Mano[] = [];
  if (e.regadera === "hierro") m.push("regadera");
  if (e.bolsa.abono > 0) m.push("abono");
  if (e.bolsa.rabano > 0) m.push("rabano");
  if (e.bolsa.calabaza > 0) m.push("calabaza");
  if (e.bolsa.manzano > 0) m.push("manzano");
  return m;
}

function fruto_de(c: Cultivo): Fruto { return CULTIVOS[c].fruto; }

/** Saca una semilla de `c`: primero de la bolsa y luego (rábano y calabaza) de la cesta. */
function sacar_semilla(c: Cultivo, solo_bolsa = false): "bolsa" | "cesta" | null {
  const e = E();
  if (e.bolsa[c] > 0) { e.bolsa[c]--; return "bolsa"; }
  if (!solo_bolsa && c !== "manzano" && cesta_cuenta(fruto_de(c)) > 0) { sacar_cesta(fruto_de(c), 1); return "cesta"; }
  return null;
}
function hay_semilla(c: Cultivo): boolean {
  return E().bolsa[c] > 0 || (c !== "manzano" && cesta_cuenta(fruto_de(c)) > 0);
}

/** Planta en una celda abierta y vacía. Sin `c`: la más barata que tenga (rábano, luego calabaza). */
export function plantar(zona: string, x: number, y: number, c?: Cultivo): boolean {
  const e = E(), cel = celda(zona, x, y);
  if (!cel || !celda_abierta(cel) || planta_en(zona, x, y)) return false;
  if (!c) c = cel.tipo === "hoyo" ? "manzano" : (["rabano", "calabaza"] as Cultivo[]).find(hay_semilla);
  if (!c || (c === "manzano") !== (cel.tipo === "hoyo")) return false;
  const de = sacar_semilla(c);
  if (!de) return false;
  if (de === "cesta") e.total_replantado++;
  e.huerto.push({ zona, x, y, cultivo: c, edad: 0, regada: false, abono: false, manzanas: 0 });
  e.avisar();
  return true;
}

/** Riega un bancal que crece (solo con la regadera de hierro; una vez por siembra). */
export function regar(zona: string, x: number, y: number): boolean {
  const e = E(), p = planta_en(zona, x, y);
  if (e.regadera !== "hierro" || !p || p.cultivo === "manzano" || p.regada || noches_que_faltan(p) === 0) return false;
  p.regada = true; e.avisar();
  return true;
}

/** Abona un bancal que crece: +2 frutos en su próxima cosecha. Gasta un abono de la bolsa. */
export function abonar(zona: string, x: number, y: number): boolean {
  const e = E(), p = planta_en(zona, x, y);
  if (e.bolsa.abono <= 0 || !p || p.cultivo === "manzano" || p.abono || noches_que_faltan(p) === 0) return false;
  e.bolsa.abono--; p.abono = true; e.avisar();
  return true;
}

/** Frutos de una cosecha según la suerte (4.3). `r` en [0, 1). */
export function suerte(cultivo: Cultivo, regada: boolean, r: number): { frutos: number; suerte: Cosecha["suerte"] } {
  if (cultivo === "rabano") return regada && r < 0.30 ? { frutos: 3, suerte: "buena" } : { frutos: 2, suerte: "normal" };
  // Regada: 15 % floja y 25 % buena. Sin regar: 35 % floja y 5 % buena.
  if (r < (regada ? 0.15 : 0.35)) return { frutos: 2, suerte: "floja" };
  if (r < 0.40) return { frutos: 5, suerte: "buena" };
  return { frutos: 3, suerte: "normal" };
}

/** Cosecha todos los bancales listos de la zona y los replanta solos (4.2). */
export function cosechar(zona: string, mano?: Mano, azar: () => number = Math.random): Cosecha[] {
  const e = E(), res: Cosecha[] = [];
  for (const p of e.huerto) {
    if (p.zona !== zona || p.cultivo === "manzano" || noches_que_faltan(p) > 0) continue;
    const s = suerte(p.cultivo, p.regada, azar());
    const frutos = s.frutos + (p.abono ? 2 : 0);
    let replantado: Cultivo = p.cultivo, a_cesta = frutos - 1;
    if ((mano === "rabano" || mano === "calabaza") && mano !== p.cultivo && e.bolsa[mano] > 0) {
      e.bolsa[mano]--; replantado = mano; a_cesta = frutos;
    } else e.total_replantado++;
    meter_cesta(fruto_de(p.cultivo), a_cesta);
    res.push({ x: p.x, y: p.y, cultivo: p.cultivo, frutos, suerte: s.suerte, replantado });
    Object.assign(p, { cultivo: replantado, edad: 0, regada: false, abono: false, manzanas: 0 });
  }
  if (res.length) e.avisar();
  return res;
}

export function recoger_manzanas(zona: string, x: number, y: number): number {
  const e = E(), p = planta_en(zona, x, y);
  if (!p || p.cultivo !== "manzano" || p.manzanas <= 0) return 0;
  const n = p.manzanas;
  p.manzanas = 0; meter_cesta("manzana", n); e.avisar();
  return n;
}

// ---------------------------------------------------------------------------
// Cesta (4.4)
// ---------------------------------------------------------------------------
export function meter_cesta(f: Fruto, n: number): void {
  if (n <= 0) return;
  const c = E().cesta, nuevo = c.find(l => l.fruto === f && l.noches === 0);
  nuevo ? (nuevo.n += n) : c.push({ fruto: f, n, noches: 0 });
}
/** Saca `n` frutos, primero lo más viejo. Devuelve cuántos ha sacado. */
export function sacar_cesta(f: Fruto, n: number): number {
  const e = E();
  let sacados = 0;
  for (const l of e.cesta.filter(l => l.fruto === f).sort((a, b) => b.noches - a.noches)) {
    const k = Math.min(n - sacados, l.n);
    l.n -= k; sacados += k;
    if (sacados >= n) break;
  }
  e.cesta = e.cesta.filter(l => l.n > 0);
  return sacados;
}
export function cesta_cuenta(f: Fruto): number {
  return E().cesta.reduce((s, l) => s + (l.fruto === f ? l.n : 0), 0);
}
/** Frutos en su última noche: mañana se ponen pochos. */
export function cesta_pocha_manana(): Partial<Record<Fruto, number>> {
  const r: Partial<Record<Fruto, number>> = {};
  for (const l of E().cesta) {
    const lim = CADUCA[l.fruto];
    if (lim !== undefined && l.noches >= lim) r[l.fruto] = (r[l.fruto] || 0) + l.n;
  }
  return r;
}

// ---------------------------------------------------------------------------
// Precios (6.2)
// ---------------------------------------------------------------------------
function nivel(merma?: number): 1 | 2 | 3 | 4 {
  const m = Math.round(merma ?? E().merma);
  return (m <= 1 ? 1 : m >= 4 ? 4 : m) as 1 | 2 | 3 | 4;
}
/** Precio de la n-ésima tierra (0 = la primera). */
export function precio_tierra(n: number, merma?: number): number {
  return n < TIERRAS.length ? Math.round(TIERRAS[n] * FACTOR_TIERRA[nivel(merma)]) : 0;
}
/** Precio de compra. "tierra": la siguiente (0 si ya no quedan). */
export function precio(cosa: Cosa | "tierra", merma?: number): number {
  if (cosa === "tierra") return precio_tierra(E().tierras.length, merma);
  return COMPRA[cosa][nivel(merma)];
}
export function precio_venta(f: Fruto, merma?: number): number {
  return VENTA[f][nivel(merma)];
}

/** Tierras que se pueden comprar ahora; primero las de la zona actual. */
function tierras_a_la_venta(): Celda[] {
  const e = E();
  const t = CELDAS.filter(c => c.tierra && e.mision > c.desde && !e.tierras.includes(clave(c.zona, c.x, c.y)));
  return [...t.filter(c => c.zona === e.zona), ...t.filter(c => c.zona !== e.zona)];
}

export function catalogo(vecino: "semilla" | "tasador" | "yunque" | "copo"): { compra: (Cosa | "tierra")[]; venta: Fruto[] } {
  const e = E(), m = e.mision, tierra = tierras_a_la_venta().length > 0;
  switch (vecino) {
    case "semilla": {
      const compra: (Cosa | "tierra")[] = [];
      if (m > 2) compra.push("rabano");
      if (m > 4) compra.push("calabaza");
      if (m > 3) compra.push("abono");
      if (m > 2 && tierra) compra.push("tierra");
      return { compra, venta: [] };
    }
    case "tasador":
      return { compra: [], venta: m > 2 ? FRUTOS.slice() : [] };
    case "yunque": {
      const compra: (Cosa | "tierra")[] = [];
      if (m > 2 && e.regadera !== "hierro") compra.push("regadera");
      if (m > 3 && etapa_molino() < 4) compra.push("ladrillo");
      return { compra, venta: [] };
    }
    case "copo":
      if (m <= 5) return { compra: [], venta: [] };
      return { compra: ["manzano", "rabano", "calabaza", ...(tierra ? ["tierra" as const] : [])], venta: ["rabano", "calabaza", "manzana"] };
  }
  return { compra: [], venta: [] };
}

/** Compra una cosa (a la bolsa). "tierra": la siguiente a la venta; "ladrillo": lo pone en el molino. */
export function comprar(cosa: Cosa | "tierra"): boolean {
  const e = E();
  if (cosa === "tierra") {
    const t = tierras_a_la_venta()[0];
    return !!t && comprar_tierra(t.zona, t.x, t.y);
  }
  if (cosa === "ladrillo") return poner_ladrillos(1).puestos > 0;
  if (cosa === "regadera" && e.regadera === "hierro") return false;
  const p = precio(cosa);
  if (e.monedas < p) return false;
  e.monedas -= p;
  cosa === "regadera" ? (e.regadera = "hierro") : e.bolsa[cosa]++;
  e.avisar();
  return true;
}

export function vender(f: Fruto, n: number): number {
  const e = E(), k = sacar_cesta(f, Math.max(0, Math.floor(n)));
  const pago = k * precio_venta(f);
  if (pago) { e.monedas += pago; e.avisar(); }
  return pago;
}
export function vender_todo(vecino: "tasador" | "copo"): number {
  const frutos: Fruto[] = vecino === "copo" ? ["rabano", "calabaza", "manzana"] : FRUTOS;
  return frutos.reduce((s, f) => s + vender(f, cesta_cuenta(f)), 0);
}

export function comprar_tierra(zona: string, x: number, y: number): boolean {
  const e = E(), c = celda(zona, x, y);
  if (!c || !c.tierra || e.mision <= c.desde || e.tierras.includes(clave(zona, x, y))) return false;
  const p = precio("tierra");
  if (!p || e.monedas < p) return false;
  e.monedas -= p; e.tierras.push(clave(zona, x, y)); e.bola_de_nieve = true; e.avisar();
  return true;
}

/** Pone hasta `n` ladrillos en el molino (los que se puedan pagar y falten). */
export function poner_ladrillos(n: number): { puestos: number; etapa_nueva: number | null } {
  const e = E(), antes = etapa_molino();
  let puestos = 0;
  if (e.mision > 3) {
    while (puestos < n && e.ladrillos < TOTAL_LADRILLOS && e.monedas >= precio("ladrillo")) {
      e.monedas -= precio("ladrillo"); e.ladrillos++; puestos++;
    }
  }
  const despues = etapa_molino();
  if (puestos) e.avisar();
  return { puestos, etapa_nueva: despues > antes ? despues : null };
}

// ---------------------------------------------------------------------------
// Encargo del día (6.5)
// ---------------------------------------------------------------------------
const ENCARGOS: { npc: string; fruto: Fruto; n: number; desde: number }[] = [
  { npc: "hogaza", fruto: "rabano", n: 4, desde: 2 },
  { npc: "tasador", fruto: "rabano", n: 6, desde: 2 },
  { npc: "semilla", fruto: "calabaza", n: 3, desde: 4 },
  { npc: "copo", fruto: "manzana", n: 3, desde: 5 },
  { npc: "antojo", fruto: "calabaza", n: 2, desde: 4 },
  { npc: "raiz", fruto: "manzana", n: 2, desde: 5 },
];
export function pago_encargo(fruto: Fruto, n: number, merma?: number): number {
  return Math.ceil(1.5 * n * precio_venta(fruto, merma));
}
/** El encargo de hoy (se elige por `dias_jugados`, saltando lo que aún no está abierto). */
export function encargo_hoy(): { npc: string; fruto: Fruto; n: number; pago: number } | null {
  const e = E();
  if (!e.dia) return null;
  if (!e.encargo || e.encargo.dia !== e.dia) {
    e.encargo = null;
    const inicio = Math.max(0, e.dias_jugados - 1);
    for (let i = 0; i < ENCARGOS.length; i++) {
      const c = ENCARGOS[(inicio + i) % ENCARGOS.length];
      if (e.mision > c.desde) { e.encargo = { dia: e.dia, npc: c.npc, fruto: c.fruto, n: c.n }; break; }
    }
  }
  const c = e.encargo;
  return c && !c.hecho ? { npc: c.npc, fruto: c.fruto, n: c.n, pago: pago_encargo(c.fruto, c.n) } : null;
}
export function cumplir_encargo(): number {
  const e = E(), c = encargo_hoy();
  if (!c || cesta_cuenta(c.fruto) < c.n) return 0;
  sacar_cesta(c.fruto, c.n);
  e.encargo!.hecho = true; e.monedas += c.pago; e.avisar();
  return c.pago;
}

// ---------------------------------------------------------------------------
// Meta de ahorro (6.9)
// ---------------------------------------------------------------------------
export function metas(): { id: string; precio: number }[] {
  const e = E(), r: { id: string; precio: number }[] = [];
  if (e.mision > 2 && tierras_a_la_venta().length) r.push({ id: "tierra", precio: precio("tierra") });
  const hoyo_libre = CELDAS.some(c => c.tipo === "hoyo" && celda_abierta(c) && !planta_en(c.zona, c.x, c.y));
  if (hoyo_libre && e.bolsa.manzano === 0) r.push({ id: "planton", precio: precio("manzano") });
  if (e.mision > 2 && e.regadera !== "hierro") r.push({ id: "regadera", precio: precio("regadera") });
  const o = obra("mercado");
  if (o && o.etapa < 4) r.push({ id: "molino", precio: (o.necesarios - o.puestos) * precio("ladrillo") });
  return r.sort((a, b) => a.precio - b.precio);
}

// ---------------------------------------------------------------------------
// Trabajo con Hogaza (6.3)
// ---------------------------------------------------------------------------
export function pago_trabajo(aciertos: number): number {
  const a = Math.max(0, Math.min(6, Math.floor(aciertos)));
  const m = Math.max(0, Math.min(4, E().merma));
  return BASE_TRABAJO[m] + a + (a === 6 ? 2 : 0) + (etapa_molino() >= 2 ? 1 : 0);
}
function dia_actual(): string { return E().dia || hoy(); }
export function puede_trabajar(): boolean { return E().ultimo_trabajo !== dia_actual(); }
export function marcar_trabajo(): void { E().ultimo_trabajo = dia_actual(); }

// ---------------------------------------------------------------------------
// Nadie se queda sin jugar (6.7)
// ---------------------------------------------------------------------------
export function puede_jugar(): boolean {
  const e = E();
  return e.huerto.length > 0 || CULTIVOS_LISTA.some(c => e.bolsa[c] > 0) || cesta_cuenta("rabano") > 0 ||
    cesta_cuenta("calabaza") > 0 || e.monedas >= precio("rabano");
}
/** Si no puede jugar, la señora Semilla regala una semilla de rábano (una por noche). */
export function red_de_seguridad(): boolean {
  const e = E();
  if (puede_jugar() || e.ultimo_regalo === e.tiempo) return false;
  e.bolsa.rabano++; e.ultimo_regalo = e.tiempo; e.avisar();
  return true;
}

// ---------------------------------------------------------------------------
// Merma y brillo
// ---------------------------------------------------------------------------
/** Pone Merma en `nivel` (la misión 1 la pone en 1) y apunta desde cuándo. Solo el reino escribe `brillo`. */
export function poner_merma(n: number): void {
  const e = E();
  e.merma = Math.max(0, Math.min(4, n)); e.merma_desde = e.tiempo; e.brillo = 5 - e.merma; e.avisar();
}

// Avisos que la interfaz puede enseñar con interfaz.aviso() (los brotes de la historia).
let avisos: { texto: string; icono: string }[] = [];
export function tomar_avisos(): { texto: string; icono: string }[] { const a = avisos; avisos = []; return a; }

/** Brotes de la historia a la bolsa (3.2), una vez por zona. */
function pasar_brotes(): void {
  const e = E();
  const pasar = (zona: string, tope: number) => {
    if (e.brotes_pasados.includes(zona)) return;
    const suyos = e.brotes.filter(b => (b.zona || "mercado") === zona);
    e.brotes = e.brotes.filter(b => (b.zona || "mercado") !== zona);
    const n = Math.min(tope, suyos.length);
    e.bolsa.rabano += n; e.brotes_pasados.push(zona);
    if (n) avisos.push({ texto: `Los brotes de tu primer huerto: +${n} semillas.`, icono: "semilla" });
  };
  if (e.mision > 3) pasar("mercado", Infinity);
  if (e.mision > 5) pasar("valle", 4);
}

/** Al empezar cada misión (y al ganar la 15): brotes de la historia y bajada de Merma. */
export function al_cambiar_mision(): void {
  const e = E();
  pasar_brotes();
  if (e.maquina_apagada && !e.merma_final) {
    e.merma_final = true;
    poner_merma(Math.max(1, e.merma - 1));
  }
  e.brillo = 5 - e.merma;
  e.avisar();
}

// ---------------------------------------------------------------------------
// Guardado (11.2): migración y saneado de lo leído de localStorage
// ---------------------------------------------------------------------------
const entero = (v: unknown, min = 0, max = Number.MAX_SAFE_INTEGER, def = min): number => {
  const n = typeof v === "number" && isFinite(v) ? Math.floor(v) : def;
  return Math.max(min, Math.min(max, n));
};
const lista = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const objeto = (v: unknown): Record<string, unknown> | null =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
const DIA = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Se llama en estado.cargar(), con `guardado` tal como venía de localStorage y
 * `estado` ya con estadoInicial() + guardado. Migra partidas antiguas y sanea.
 */
export function sanear(guardado: Record<string, unknown>): void {
  const e = E();
  e.mision = entero(e.mision, 1, 16, 1);
  e.monedas = entero(e.monedas);
  if (!("merma" in guardado)) {
    // Partida de antes del sprint 3.
    const brillo = guardado.brillo;
    e.merma = e.mision > 1 || (typeof brillo === "number" && brillo < 5) ? 1 : 0;
    e.tiempo = 2 * (e.mision - 1);
    e.merma_desde = e.tiempo;
    e.dias_jugados = 1;
    e.dia = "";
    e.ultimo_trabajo = "";
    e.eleccion_m01 = brillo === 4 ? "semillas" : brillo === 3 ? "hucha" : "";
    if (e.maquina_apagada) { e.merma = 1; e.merma_final = true; }
  }
  e.maquina_apagada = !!e.maquina_apagada;
  e.tiempo = entero(e.tiempo);
  e.merma = entero(e.merma, 0, 4);
  e.merma_desde = entero(e.merma_desde, 0, e.tiempo);
  e.merma_final = !!e.merma_final;
  e.dia = typeof e.dia === "string" && DIA.test(e.dia) ? e.dia : "";
  e.dias_jugados = entero(e.dias_jugados);
  e.siestas_dia = entero(e.siestas_dia, 0, 2);
  e.compost = entero(e.compost, 0, 2);
  e.ultimo_trabajo = typeof e.ultimo_trabajo === "string" && DIA.test(e.ultimo_trabajo) ? e.ultimo_trabajo : "";
  e.ultimo_regalo = entero(e.ultimo_regalo, -1, Number.MAX_SAFE_INTEGER, -1);
  e.ladrillos = entero(e.ladrillos, 0, TOTAL_LADRILLOS);
  e.total_replantado = entero(e.total_replantado);
  const b = objeto(e.bolsa) || {};
  e.bolsa = { rabano: entero(b.rabano), calabaza: entero(b.calabaza), manzano: entero(b.manzano), abono: entero(b.abono) };
  const conocidos = (v: unknown, validos: string[]) => [...new Set(lista(v).filter((s): s is string => typeof s === "string" && validos.includes(s)))];
  e.tierras = conocidos(e.tierras, CLAVES_TIERRA);
  e.secretos = conocidos(e.secretos, SECRETOS);
  e.brotes_pasados = conocidos(e.brotes_pasados, ["mercado", "valle"]);
  e.brotes = lista(e.brotes).filter(x => objeto(x) && objeto((x as { celda: unknown }).celda)) as EstadoReino["brotes"];
  // Huerto: solo celdas abiertas, cultivos válidos y sin repetir celda.
  const huerto: Planta[] = [];
  for (const x of lista(e.huerto)) {
    const p = objeto(x);
    if (!p || typeof p.zona !== "string") continue;
    const px = entero(p.x, -1, 99, -1), py = entero(p.y, -1, 99, -1), c = celda(p.zona, px, py);
    const cultivo = p.cultivo as Cultivo;
    if (!c || !celda_abierta(c) || !CULTIVOS_LISTA.includes(cultivo) || (cultivo === "manzano") !== (c.tipo === "hoyo")) continue;
    if (huerto.some(h => h.zona === c.zona && h.x === px && h.y === py)) continue;
    huerto.push({ zona: c.zona, x: px, y: py, cultivo, edad: entero(p.edad, 0, 999), regada: !!p.regada, abono: !!p.abono,
      manzanas: cultivo === "manzano" ? entero(p.manzanas, 0, TOPE_ARBOL) : 0 });
  }
  e.huerto = huerto;
  const cesta: Lote[] = [];
  for (const x of lista(e.cesta)) {
    const l = objeto(x);
    if (!l || !FRUTOS.includes(l.fruto as Fruto)) continue;
    const n = entero(l.n);
    if (n > 0) cesta.push({ fruto: l.fruto as Fruto, n, noches: entero(l.noches, 0, 999) });
  }
  e.cesta = cesta;
  const enc = objeto(e.encargo);
  e.encargo = enc && typeof enc.dia === "string" && DIA.test(enc.dia) && typeof enc.npc === "string" &&
    ENCARGOS.some(c => c.npc === enc.npc && c.fruto === enc.fruto) ?
    { dia: enc.dia, npc: enc.npc, fruto: enc.fruto as Fruto, n: entero(enc.n, 1, 99, 1), ...(enc.hecho ? { hecho: true } : {}) } : null;
  e.mano = ["regadera", "abono", ...CULTIVOS_LISTA].includes(e.mano) ? e.mano : "";
  e.meta = ["tierra", "planton", "regadera", "molino"].includes(e.meta) ? e.meta : "";
  e.eleccion_m01 = ["hucha", "semillas", "caramelo"].includes(e.eleccion_m01) ? e.eleccion_m01 : "";
  e.huerto_presentado = !!e.huerto_presentado;
  e.bola_de_nieve = !!e.bola_de_nieve;
  e.brillo = 5 - e.merma;
  pasar_brotes();
}
