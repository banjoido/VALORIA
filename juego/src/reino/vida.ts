// La vida del reino (sprint 3, tarea C): qué hace cada vecino, encargos, trabajo
// con Hogaza, viajes durante la historia, presentación del huerto, secretos,
// «¡Buenos días!» y el guardado de las acciones del reino.
// Especificación: docs/especificaciones/sprint-3-bucle.md (6.1, 6.3, 6.5, 8, 11.3, 12.2 y 12.3).
import { estado } from "../estado";
import { interfaz } from "../ui/controlador";
import * as reino from "./reglas";
import * as tiempo from "./tiempo";
import * as acciones from "./acciones";
import type { Fruto } from "./reglas";
import type { ResumenVuelta } from "./tiempo";
import { FRASES_VECINOS, QUIEN_SECRETO, TX_VIDA, tv } from "../textos/vecinos";
import { ICONO_FRUTO, NOTAS_ABUELO, nombre_fruto } from "../textos/huerto";
import { nombreDe } from "../personajes";

export interface Celda { x: number; y: number }
type Linea = [string, string];

// Lo que usamos del mundo, del controlador y de la misión (aún sin tipar).
interface MundoVida {
  zona: string;
  npcs: Record<string, { visible: boolean }>;
  objetivo_fn: (() => { x: number; y: number; z: number } | null) | null;
  on(evento: string, f: (c: Celda) => void): () => void;
  restaurar(mision: number): void;
  irA(destinos: Celda[], alLlegar: (() => void) | null): void;
  alrededor(c: Celda): Celda[];
  estallido(p: Celda, color: string, n: number): void;
  centro(c: Celda): Celda;
  sobre_heroe(): Celda;
  celda_heroe(): Celda;
  flotante(c: Celda, texto: string, color?: string): void;
  marcar_vecino(npc: string, activo: boolean): void;
  poner_secretos(celdas: Celda[]): void;
}
export interface MisionVida {
  numero: number;
  zona_mision?: string;
  datos: { dialogos: Record<string, Linea[]> };
  puntos_control(): string[];
  campos_punto(): Record<string, unknown> | null;
  preparar_punto(punto: string): void;
  paso(punto: string): void;
  dl(clave: string): Linea[];
}
interface Vista { dialogo: unknown; capa: unknown; noche: unknown }
interface UiVida {
  vista: Vista;
  mision_actual: MisionVida | null;
  viaje_pedido: ((zona: string) => void) | null;
  decir(l: Linea[]): Promise<void>;
  sonar(nombre: string, tono?: number): void;
  elegir(icono: string, titulo: string, opciones: (string | boolean)[][]): Promise<string>;
  amasar(): Promise<number>;
  carta(texto: string, primera: boolean): Promise<void>;
  viajar(titulo: string, sub: string, f: () => void): Promise<void>;
  poner_mision(texto: string): void;
  puesto(vecino: string, frase?: string): Promise<void>;
  buenos_dias(r: ResumenVuelta): Promise<void>;
  aviso(texto: string, icono?: string): void;
}
interface EstadoVida extends reino.EstadoReino {
  paso: string;
  guardar(punto?: string, celda?: Celda | null, campos?: Record<string, unknown> | null, zona?: string): void;
}
const E = () => estado as unknown as EstadoVida;
const ui = () => interfaz as unknown as UiVida;

let M: MundoVida | null = null;

export const NOMBRES_ZONA: Record<string, string> = {
  mercado: "Mercado del Pueblo",
  valle: "Valle de la Nieve",
  ciudad: "Ciudad de las Empresas",
  torre: "Torre del Revés",
  reloj: "Gran Reloj",
};
/** Zonas y la misión en la que se abre cada una. */
export const ZONAS_ABIERTAS: [string, number][] = [["mercado", 1], ["valle", 4], ["ciudad", 7], ["torre", 10], ["reloj", 13]];
// Pasos de la historia que ya son un viaje del guion: el Mapa no ofrece viajar.
const PASOS_VIAJE = ["ir_valle", "ir_ciudad", "ir_torre", "ir_reloj"];
const ORO = "#f6c945";

// ---------------------------------------------------------------------------
// Arranque
// ---------------------------------------------------------------------------
export function iniciar(mundo: unknown): void {
  M = mundo as MundoVida;
  acciones.poner_guardar(guardar);
  M.on("lugar", c => { void lugar(c); });
  // Lo que cambia sin aviso (zona, encargo, secretos, presentación): se repasa cada segundo.
  setInterval(refrescar, 1000);
  refrescar();
}

/** La misión en curso, o null en modo libre. */
function mision(): MisionVida | null { return ui().mision_actual || null; }

/** El héroe está fuera de la zona de su misión. */
export function lejos(): boolean {
  const m = mision();
  return !!m && !!m.zona_mision && E().zona !== m.zona_mision;
}

function libre_ahora(): boolean {
  const v = ui().vista;
  return !E().ocupado && !v.dialogo && !v.capa && !v.noche && E().paso !== "titulo";
}

// ---------------------------------------------------------------------------
// Guardado (11.3)
// ---------------------------------------------------------------------------
export function guardar(): void {
  const e = E();
  if (e.paso === "libre") return e.guardar();
  const m = mision();
  if (!m || !m.puntos_control().includes(e.paso)) return; // paso sin punto de control: no se guarda
  const fuera = lejos();
  e.guardar(e.paso, fuera || !M ? null : M.celda_heroe(), m.campos_punto(), fuera ? m.zona_mision : "");
}

// ---------------------------------------------------------------------------
// Viajes (8.1)
// ---------------------------------------------------------------------------
/** ¿Se puede viajar ahora? `libre`: nada hablando ni ventana abierta (el panel lo sabe). */
export function puede_viajar(libre = libre_ahora()): boolean {
  if (!libre) return false;
  const e = E();
  if (e.paso === "libre") return true;
  const m = mision();
  return !!m && m.puntos_control().includes(e.paso) && !PASOS_VIAJE.includes(e.paso);
}

/** Zona donde sigue la misión ("" en modo libre). */
export function zona_mision(): string {
  const m = mision();
  return m ? m.zona_mision || E().zona : "";
}

export async function viajar(zona: string): Promise<void> {
  const e = E(), m = mision();
  if (!M || !NOMBRES_ZONA[zona] || zona === e.zona) return;
  const mundo = M, volver = !!m && zona === m.zona_mision;
  await ui().viajar(NOMBRES_ZONA[zona], "", () => {
    e.zona = zona;
    mundo.restaurar(e.mision);
    if (volver && m) m.preparar_punto(e.paso);
  });
  if (m && volver) m.paso(e.paso); // guarda y pone el texto de la misión
  else {
    e.ocupado = false;
    ui().poner_mision(m ? tv("mision_lejos", { zona: NOMBRES_ZONA[m.zona_mision || "mercado"] }) : tv("libre", { zona: NOMBRES_ZONA[zona] }));
    guardar();
  }
  refrescar();
}

// ---------------------------------------------------------------------------
// Vecinos (6.1, 8.2)
// ---------------------------------------------------------------------------
type Vendedor = "semilla" | "tasador" | "yunque" | "copo";
function vendedor(id: string): Vendedor | null {
  if (!["semilla", "tasador", "yunque", "copo"].includes(id)) return null;
  const c = reino.catalogo(id as Vendedor);
  return c.compra.length || c.venta.length ? (id as Vendedor) : null;
}

function cumple(cond: string | undefined): boolean {
  if (!cond) return true;
  if (cond.startsWith("!")) return !E().secretos.includes(cond.slice(1));
  if (cond === "regadera") return E().regadera === "hierro";
  return false;
}

/** Frases que puede decir hoy un vecino: primero la más nueva. Incluye la charla de la misión. */
export function frases(id: string): Linea[][] {
  const m = mision(), mision_n = E().mision;
  const lista: Linea[][] = (FRASES_VECINOS[id] || [])
    .filter(([desde, , cond]) => desde <= mision_n && cumple(cond))
    .sort((a, b) => b[0] - a[0])
    .map(([, texto]) => [[id, texto] as Linea]);
  const charla = m && m.datos.dialogos["charla_" + id];
  if (charla && !lista.some(l => l[0][1] === charla[0][1])) lista.push(m.dl("charla_" + id));
  return lista;
}
const turnos: Record<string, number> = {};
/** La siguiente frase del vecino, rotando (la primera vez, la más nueva). */
export function siguiente_frase(id: string): Linea[] {
  const l = frases(id);
  if (!l.length) return [];
  const i = turnos[id] || 0;
  turnos[id] = i + 1;
  return l[i % l.length];
}

/** Toque en un vecino que la misión no necesita (o cualquiera, en modo libre). */
export async function npc(id: string): Promise<void> {
  const e = E();
  e.ocupado = true;
  try {
    const enc = reino.encargo_hoy();
    let falta = "";
    if (enc && enc.npc === id) {
      if (reino.cesta_cuenta(enc.fruto) >= enc.n) return await dar_encargo(id, enc);
      falta = tv("encargo_falta", { n: enc.n, frutos: nombre_fruto(enc.fruto, enc.n) });
    }
    const v = vendedor(id);
    if (v) {
      const f = siguiente_frase(id);
      return await ui().puesto(v, falta || (f.length === 1 && f[0][0] === id ? f[0][1] : ""));
    }
    if (id === "hogaza" && e.mision > 2) return await trabajo(falta);
    let lineas = siguiente_frase(id);
    if (!lineas.length) lineas = [["chispin", TX_VIDA.hola]];
    if (falta) lineas = [...lineas, [id, falta]];
    await ui().decir(lineas);
  } finally {
    e.ocupado = false; e.avisar(); guardar(); refrescar();
  }
}

async function dar_encargo(id: string, enc: { fruto: Fruto; n: number; pago: number }): Promise<void> {
  const frutos = nombre_fruto(enc.fruto, enc.n);
  const r = await ui().elegir(ICONO_FRUTO[enc.fruto], tv("encargo_titulo", { n: enc.n, frutos, p: enc.pago }), [
    ["dar", TX_VIDA.encargo_dar, "moneda"],
    ["no", TX_VIDA.encargo_no, "mochila"],
  ]);
  if (r !== "dar") return;
  const pago = reino.cumplir_encargo();
  if (!pago) return;
  ui().sonar("moneda");
  acciones.efecto_cobro(pago);
  M && M.flotante(M.celda_heroe(), "+" + pago, ORO);
  M && M.marcar_vecino(id, false);
  await ui().decir([[id, TX_VIDA.encargo_gracias]]);
}

/** Hogaza da trabajo una vez por día real fuera del guion (6.3). */
async function trabajo(falta: string): Promise<void> {
  const extra: Linea[] = falta ? [["hogaza", falta]] : [];
  if (!reino.puede_trabajar()) {
    await ui().decir([...siguiente_frase("hogaza"), ["hogaza", TX_VIDA.trabajo_hecho], ...extra]);
    return;
  }
  const r = await ui().elegir("pan", tv("trabajo_titulo", { b: reino.pago_trabajo(0) }), [
    ["si", TX_VIDA.trabajo_si, "pan"],
    ["no", TX_VIDA.trabajo_no, "mochila"],
  ]);
  if (r !== "si") { await ui().decir([["hogaza", TX_VIDA.trabajo_otro_dia], ...extra]); return; }
  reino.marcar_trabajo();
  const n = await ui().amasar();
  const e = E();
  e.monedas += n; e.avisar();
  ui().sonar("moneda");
  acciones.efecto_cobro(n);
  await ui().decir([["hogaza", tv("trabajo_paga", { n })], ...extra]);
}

/** Toque en una parcela de la historia fuera de su misión. */
export async function parcela(_c: Celda): Promise<void> {
  const e = E();
  if (e.zona !== "valle") { e.ocupado = false; return; }
  await ui().decir([["chispin", TX_VIDA.parcela_historia]]);
  e.ocupado = false;
}

// ---------------------------------------------------------------------------
// Secretos (8.4)
// ---------------------------------------------------------------------------
interface Secreto { id: string; zona: string; celdas: Celda[]; desde: number; molino?: number }
const area = (x0: number, x1: number, y0: number, y1: number): Celda[] => {
  const r: Celda[] = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) r.push({ x, y });
  return r;
};
export const SECRETOS: Secreto[] = [
  { id: "fuente", zona: "mercado", celdas: area(6, 8, 12, 13), desde: 3 },
  { id: "engranaje", zona: "mercado", celdas: [{ x: 9, y: 2 }], desde: 3 },
  { id: "banco", zona: "mercado", celdas: [{ x: 4, y: 24 }], desde: 3 },
  { id: "desvan", zona: "mercado", celdas: [{ x: 3, y: 20 }], desde: 3, molino: 3 },
  { id: "cueva", zona: "valle", celdas: area(0, 2, 24, 26), desde: 6 },
  { id: "lago", zona: "valle", celdas: area(9, 12, 18, 19), desde: 6 },
  { id: "pino", zona: "valle", celdas: [{ x: 12, y: 27 }], desde: 6 },
];

/** Secretos de la zona que ya se pueden encontrar (encontrados o no). */
export function secretos_zona(zona: string): Secreto[] {
  const e = E();
  return SECRETOS.filter(s => s.zona === zona && e.mision >= s.desde && (!s.molino || reino.etapa_molino() >= s.molino));
}
/** Para el Mapa: encontrados y total de la zona (total 0 si aún no hay secretos). */
export function cuenta_secretos(zona: string): { n: number; total: number } {
  const todos = SECRETOS.filter(s => s.zona === zona);
  if (!secretos_zona(zona).length) return { n: 0, total: 0 };
  return { n: todos.filter(s => E().secretos.includes(s.id)).length, total: todos.length };
}
/** El secreto sin encontrar en esa casilla, si lo hay (Mundo lo consulta antes de la obra). */
export function secreto_en(zona: string, c: Celda): string {
  const s = secretos_zona(zona).find(s => !E().secretos.includes(s.id) && s.celdas.some(k => k.x === c.x && k.y === c.y));
  return s ? s.id : "";
}

async function lugar(c: Celda): Promise<void> {
  const e = E(), mundo = M;
  if (!mundo || e.ocupado) return;
  const id = secreto_en(e.zona, c);
  if (!id) return;
  const s = SECRETOS.find(x => x.id === id)!;
  const destinos: Celda[] = [];
  for (const k of s.celdas) destinos.push(k, ...mundo.alrededor(k));
  mundo.irA(destinos, () => { void encontrar(s); });
}

async function encontrar(s: Secreto): Promise<void> {
  const e = E();
  if (e.secretos.includes(s.id) || e.ocupado || e.zona !== s.zona) return;
  e.ocupado = true;
  try {
    e.secretos.push(s.id);
    switch (s.id) {
      case "fuente": e.monedas += 10; break;
      case "engranaje": e.bolsa.abono += 2; break;
      case "banco": e.bolsa.calabaza += 1; break;
      case "desvan": e.bolsa.abono += 2; break;
      case "cueva": reino.meter_cesta("pepita", 1); break;
      case "lago": e.bolsa.manzano += 1; break;
      case "pino": e.bolsa.abono += 1; break;
    }
    e.avisar();
    ui().sonar("fanfarria");
    M && M.estallido(M.centro(s.celdas[0]), ORO, 30);
    M && M.poner_secretos(celdas_activas());
    await ui().decir([[QUIEN_SECRETO[s.id] || "chispin", TX_VIDA[("secreto_" + s.id) as keyof typeof TX_VIDA]]]);
    const nota = NOTAS_ABUELO.find(n => n.secreto === s.id);
    if (nota) await ui().carta(nota.texto, false);
  } finally {
    e.ocupado = false; e.avisar(); guardar();
  }
}

function celdas_activas(): Celda[] {
  const e = E();
  return secretos_zona(e.zona).filter(s => !e.secretos.includes(s.id)).flatMap(s => s.celdas);
}

// ---------------------------------------------------------------------------
// Presentación del huerto (8.3) y flecha hasta el primer bancal
// ---------------------------------------------------------------------------
let flecha_huerto = false;

async function presentar(): Promise<void> {
  const e = E();
  e.huerto_presentado = true;
  const semillas = e.eleccion_m01 === "semillas";
  e.bolsa.rabano += semillas ? 4 : 2;
  flecha_huerto = true;
  e.avisar(); guardar();
  const l: Linea[] = [["semilla", TX_VIDA.presenta_1], ["semilla", TX_VIDA.presenta_2]];
  if (semillas) l.push(["semilla", TX_VIDA.presenta_m01]);
  l.push(["chispin", TX_VIDA.presenta_3]);
  await ui().decir(l);
  e.ocupado = false; e.avisar();
}

/** Flecha de la vida del reino (tiene prioridad sobre la de la misión). */
export function objetivo(): { x: number; y: number; z: number } | null {
  const e = E();
  if (!flecha_huerto) return null;
  if (e.huerto.some(p => p.zona === "mercado")) { flecha_huerto = false; return null; }
  if (e.zona !== "mercado") return null;
  const b = reino.bancales("mercado").find(b => b.abierto && b.tipo === "bancal");
  return b ? { x: b.x, y: b.y, z: 2 } : null;
}

/** Lo llama MisionBase.paso() en cada paso de la historia. */
export function al_paso(_m: MisionVida): void {
  setTimeout(refrescar, 0);
}

// ---------------------------------------------------------------------------
// Repaso periódico: «!» del encargo, chispas de secretos y presentación pendiente
// ---------------------------------------------------------------------------
let marcado = "";
export function refrescar(): void {
  const e = E();
  if (!M) return;
  const enc = e.dia ? reino.encargo_hoy() : null, quien = enc ? enc.npc : "";
  if (quien !== marcado) { marcado && M.marcar_vecino(marcado, false); quien && M.marcar_vecino(quien, true); marcado = quien; }
  M.poner_secretos(celdas_activas());
  if (!e.huerto_presentado && e.mision >= 3 && libre_ahora()) void presentar();
}

// ---------------------------------------------------------------------------
// La vuelta: noches de vuelta y «¡Buenos días!» (5.2)
// ---------------------------------------------------------------------------
/** Al cargar (antes de que la misión retome) y al volver del segundo plano. */
export async function vuelta(): Promise<boolean> {
  const r = tiempo.al_abrir(tiempo.hoy());
  if (!r.dia_nuevo) return false;
  const e = E(), antes = e.ocupado;
  guardar();
  await ui().buenos_dias(r);
  e.ocupado = antes; e.avisar();
  refrescar();
  return true;
}

/** Nombre de un vecino para los textos (lo usan las pruebas). */
export const nombre = (id: string): string => nombreDe(id);
