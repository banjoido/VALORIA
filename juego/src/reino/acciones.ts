// Toques del huerto propio y de la obra del molino (sprint 3, 4.2 y 9).
// Mundo emite "huerto" y "obra" (antes que "parcela"); aquí se decide qué pasa
// y se da la respuesta: sonido, estallido, texto flotante y rebote.
import { estado } from "../estado";
import { interfaz } from "../ui/controlador";
import * as reino from "./reglas";
import type { Cosecha, Mano } from "./reglas";
import type { ResumenNoche } from "./tiempo";
import { TX_HUERTO, th } from "../textos/huerto";

export interface Celda { x: number; y: number }
export interface ToqueHuerto extends Celda { riego?: number; riego_fin?: number }

// Lo que usamos del mundo (mundo.ts aún no está tipado).
export interface MundoHuerto {
  zona: string;
  on(evento: string, f: (c: ToqueHuerto) => void): () => void;
  estallido(p: Celda, color: string, n: number): void;
  flotante(c: Celda, texto: string, color?: string): void;
  rebote(c: Celda): void;
  centro(c: Celda): Celda;
  sobre_heroe(): Celda;
}

// Interfaz del controlador (controlador.ts aún no está tipado).
interface Ui {
  decir(lineas: [string, string][]): Promise<void>;
  sonar(nombre: string, tono?: number): void;
  elegir(icono: string, titulo: string, opciones: (string | boolean)[][]): Promise<string>;
  obra(): Promise<unknown>;
  aviso(texto: string, icono?: string): void;
}
const ui = (): Ui => interfaz as unknown as Ui;

// Estado del reino con los campos que no tipa reglas.ts.
const E = () => estado as unknown as reino.EstadoReino & { paso: string; estacion: number; guardar(...a: unknown[]): void };

const COLOR = { blanco: "#fdf3d8", oro: "#f6c945", gris: "#b8b8c4", azul: "#4ba3d8", verde: "#9ad86f", marron: "#8a6a4a", rojo: "#e0503c" };

let M: MundoHuerto | null = null;

/** Mundo llama a esto al crearse: escucha los toques del huerto y de la obra. */
export function conectar(mundo: MundoHuerto): void {
  M = mundo;
  mundo.on("huerto", c => { void tocar_huerto(c); });
  mundo.on("obra", () => { void tocar_obra(); });
}

// --- Guardado: la vida del reino (tarea C) pone aquí su vida.guardar().
let guardar_fn: () => void = () => { if (E().paso === "libre") E().guardar(); };
export function poner_guardar(f: () => void): void { guardar_fn = f; }
export function guardar(): void { try { guardar_fn(); } catch { /* el guardado nunca rompe el juego */ } }

// --- La herramienta «en la mano» (4.2)
export function mano_actual(): Mano | "" {
  const lista = reino.manos_disponibles(), e = E();
  if (lista.includes(e.mano as Mano)) return e.mano as Mano;
  return lista[0] || "";
}
export function cambiar_mano(): Mano | "" {
  const lista = reino.manos_disponibles();
  if (!lista.length) return "";
  const i = lista.indexOf(mano_actual() as Mano);
  E().mano = lista[(i + 1) % lista.length];
  ui().sonar("siguiente");
  E().avisar();
  return E().mano as Mano;
}

// Un flujo con diálogo o ventana: nadie más toca mientras dura (13, toques muy deprisa).
async function flujo(f: () => Promise<void>): Promise<void> {
  const e = E();
  e.ocupado = true;
  try { await f(); } finally { e.ocupado = false; e.avisar(); guardar(); }
}

let floja_vista = false; // Chispín explica la primera cosecha floja (una vez por sesión)

/** Toque en una celda del huerto (lo emite Mundo). */
export async function tocar_huerto(c: ToqueHuerto): Promise<void> {
  if (c.riego_fin !== undefined) { if (c.riego_fin > 0) guardar(); return; }
  if (c.riego !== undefined) { regar_celda(c, c.riego); return; }
  const z = E().zona, b = reino.bancales(z).find(l => l.x === c.x && l.y === c.y);
  if (!b || !M) return;
  if (!b.abierto) return comprar_tierra(b);
  const p = reino.planta_en(z, c.x, c.y);
  if (b.tipo === "hoyo") {
    if (!p) {
      if (E().bolsa.manzano > 0 && reino.plantar(z, c.x, c.y, "manzano")) { efecto_plantar(c); guardar(); }
      else await flujo(() => ui().decir([["chispin", TX_HUERTO.hoyo_vacio]]));
    } else if (p.manzanas > 0) {
      const n = reino.recoger_manzanas(z, c.x, c.y);
      ui().sonar("acierto"); M.flotante(c, "+" + n, COLOR.blanco); M.estallido(M.centro({ x: c.x, y: c.y - 1 }), COLOR.rojo, 8);
      guardar();
    } else {
      const n = reino.noches_que_faltan(p);
      M.flotante({ x: c.x, y: c.y - 1 }, p.edad > reino.CULTIVOS.manzano.noches ? TX_HUERTO.arbol_vacio : n === 1 ? TX_HUERTO.arbol_crece_1 : th("arbol_crece", { n }));
    }
    return;
  }
  if (!p) return plantar_aqui(c);
  if (reino.noches_que_faltan(p) === 0) { await cosechar_todo(); return; }
  const mano = mano_actual();
  if (mano === "abono" && reino.abonar(z, c.x, c.y)) {
    ui().sonar("plantar"); M.estallido(M.centro(c), COLOR.marron, 10); M.flotante(c, "+2", COLOR.oro);
    guardar(); return;
  }
  if (mano === "regadera" && regar_celda(c, 0)) { guardar(); return; }
  const n = reino.noches_que_faltan(p);
  M.flotante(c, n === 1 ? TX_HUERTO.lista_1 : th("lista_n", { n }));
}

function efecto_plantar(c: Celda): void {
  if (!M) return;
  ui().sonar("plantar"); M.estallido(M.centro(c), COLOR.verde, 10); M.rebote(c);
}

async function plantar_aqui(c: Celda): Promise<void> {
  const z = E().zona, mano = mano_actual();
  const semilla = (mano === "rabano" || mano === "calabaza") && E().bolsa[mano] > 0 ? mano : undefined;
  if (reino.plantar(z, c.x, c.y, semilla)) { efecto_plantar(c); guardar(); return; }
  if (reino.red_de_seguridad()) {
    await flujo(async () => {
      await ui().decir([["semilla", TX_HUERTO.regalo_red]]);
      if (reino.plantar(z, c.x, c.y, "rabano")) efecto_plantar(c);
    });
    return;
  }
  await flujo(() => ui().decir([["chispin", TX_HUERTO.sin_semillas]]));
}

/** Cosecha todos los bancales listos de la zona y los replanta (4.2, 4.3). */
export async function cosechar_todo(): Promise<Cosecha[]> {
  if (!M) return [];
  const m = M, mano = mano_actual();
  const res = reino.cosechar(E().zona, mano || undefined);
  if (!res.length) return res;
  let buena = false, floja = false;
  for (const r of res) {
    const c = { x: r.x, y: r.y };
    if (r.suerte === "buena") { buena = true; m.flotante(c, th("buena", { n: r.frutos }), COLOR.oro); m.estallido(m.centro(c), COLOR.oro, 10); }
    else if (r.suerte === "floja") { floja = true; m.flotante(c, "+" + r.frutos, COLOR.gris); }
    else m.flotante(c, "+" + r.frutos, COLOR.blanco);
  }
  ui().sonar("acierto");
  if (buena) setTimeout(() => ui().sonar("acierto", 1.2), 160);
  // Replantado solo: rebote en cada bancal, un sonido.
  setTimeout(() => {
    ui().sonar("plantar");
    res.forEach(r => r.replantado && m.rebote({ x: r.x, y: r.y }));
  }, 380);
  guardar();
  if (floja && !floja_vista) {
    floja_vista = true;
    await flujo(() => ui().decir([["chispin", TX_HUERTO.primera_floja]]));
  }
  return res;
}

/** Riega una celda dentro del gesto de deslizar. `orden` sube el tono del sonido. */
export function regar_celda(c: Celda, orden: number): boolean {
  if (!M) return false;
  if (!reino.regar(E().zona, c.x, c.y)) return false;
  ui().sonar("plantar", 1 + 0.06 * orden);
  M.estallido(M.centro(c), COLOR.azul, 10);
  if (orden === 0) M.flotante(c, TX_HUERTO.regada, "#bfe6ff"); // uno por gesto: los demás, solo salpicadura
  return true;
}

/** Riega varias celdas como si el dedo pasara por ellas (lo usan las pruebas). */
export function arrastrar_riego(celdas: Celda[]): number {
  let n = 0;
  celdas.forEach((c, i) => { regar_celda(c, i) && n++; });
  if (n) guardar();
  return n;
}

async function comprar_tierra(b: reino.Bancal): Promise<void> {
  const p = b.precio || reino.precio("tierra"), falta = p - E().monedas;
  await flujo(async () => {
    const r = await ui().elegir("cartel_venta", th("tierra_titulo", { p }), [
      ["si", falta > 0 ? th("faltan", { n: falta }) : TX_HUERTO.tierra_comprar, "tierras", falta > 0],
      ["no", TX_HUERTO.ahora_no, "mochila"],
    ]);
    if (r !== "si" || !M) return;
    const primera = !E().bola_de_nieve;
    if (!reino.comprar_tierra(b.zona, b.x, b.y)) { ui().sonar("fallo"); return; }
    ui().sonar("moneda"); M.estallido(M.centro(b), COLOR.oro, 14); M.rebote(b);
    if (primera) await ui().decir([[b.zona === "valle" ? "copo" : "semilla", TX_HUERTO.bola_de_nieve]]);
  });
}

/** Toque en el solar o en el molino: la ventana Obra. */
export async function tocar_obra(): Promise<void> {
  await flujo(async () => { await ui().obra(); });
}

/** Lo que se ve al terminar una noche (la llama interfaz.pasar_noche). */
export function efectos_noche(r: ResumenNoche): void {
  const z = E().zona;
  if (M) for (const c of r.cambiaron) if (c.zona === z) M.estallido(M.centro(c), COLOR.verde, 4);
  if (r.compost > 0) { ui().sonar("plantar"); ui().aviso(TX_HUERTO.compost, "abono"); }
  if (r.merma === "aviso") ui().aviso(TX_HUERTO.merma_manana, "moneda");
  if (r.merma === "sube") {
    ui().sonar("malo");
    ui().aviso(E().maquina_apagada ? TX_HUERTO.merma_final : TX_HUERTO.merma_sube, "merma");
  }
  if (r.arbol_lleno) ui().aviso(TX_HUERTO.arbol_lleno, "manzana");
}

/** Efecto al poner ladrillos (lo usa la ventana Obra): estallido sobre el molino. */
export function efecto_obra(etapa_nueva: number | null): void {
  if (!M) return;
  const sitio = M.centro({ x: 3, y: 18 });
  if (etapa_nueva) { ui().sonar("fanfarria"); M.estallido(sitio, COLOR.oro, 30); }
  else M.estallido(sitio, "#e07a55", 6);
}

/** Efecto al vender o cumplir un encargo: estallido dorado sobre el héroe. */
export function efecto_cobro(n: number): void {
  if (!M || n <= 0) return;
  M.estallido(M.sobre_heroe(), COLOR.oro, 14);
}
