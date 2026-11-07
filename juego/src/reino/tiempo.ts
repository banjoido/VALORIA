// El tiempo del reino: noches, vuelta al juego, siestas y Merma.
// Especificación: docs/especificaciones/sprint-3-bucle.md (secciones 5 y 6.2).
// Sin pantalla: `interfaz.pasar_noche()` (tarea B) llama a `noche()`, y main.ts
// (tarea C) llama a `al_abrir(hoy())` al cargar y al volver del segundo plano.
import {
  CADUCA, CULTIVOS, E, NOCHES_POR_NIVEL, NOCHES_POR_NIVEL_FINAL, TOPE_ARBOL,
  cesta_pocha_manana, encargo_hoy, noches_que_faltan,
} from "./reglas";
import type { Cultivo, Fruto, Planta } from "./reglas";

export interface ResumenNoche {
  listos: Record<string, Partial<Record<Fruto, number>>>; cambiaron: { zona: string; x: number; y: number }[];
  compost: number; merma: "nada" | "aviso" | "sube"; arbol_lleno: boolean;
}
export interface ResumenVuelta {
  dia_nuevo: boolean; noches: number; regalo: Cultivo | null; encargo: ReturnType<typeof encargo_hoy>;
  pocho: Partial<Record<Fruto, number>>; merma: "nada" | "aviso" | "sube"; listos: ResumenNoche["listos"];
}

const SIESTAS_POR_DIA = 2;
const DIA = /^\d{4}-\d{2}-\d{2}$/;

/** Fecha local, "AAAA-MM-DD". */
export function hoy(): string {
  const d = new Date(), dos = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`;
}
function dias_entre(a: string, b: string): number {
  const t = (s: string) => { const [y, m, d] = s.split("-").map(Number); return Date.UTC(y, m - 1, d); };
  return Math.round((t(b) - t(a)) / 864e5);
}

// Dibujo de cada planta (4.1): si cambia en una noche, sale en `cambiaron`.
function dibujo(p: Planta): string {
  if (p.cultivo === "rabano") return p.edad >= 1 ? "brote_fruto" : "brote_chico";
  if (p.cultivo === "calabaza") return p.edad >= 3 ? "calabaza_lista" : p.edad >= 1 ? "brote_grande" : "brote_chico";
  if (p.manzanas > 0) return "arbol_4";
  return p.edad === 0 ? "arbol_1" : p.edad <= 2 ? "arbol_2" : "arbol_3";
}

/** Lo que hay listo para cosechar en cada zona (frutos sin contar la suerte; manzanas en el árbol). */
export function listos(): ResumenNoche["listos"] {
  const r: ResumenNoche["listos"] = {};
  for (const p of E().huerto) {
    let f: Fruto, n: number;
    if (p.cultivo === "manzano") { f = "manzana"; n = p.manzanas; } else {
      if (noches_que_faltan(p) > 0) continue;
      f = CULTIVOS[p.cultivo].fruto; n = CULTIVOS[p.cultivo].frutos + (p.abono ? 2 : 0);
    }
    if (n <= 0) continue;
    const z = (r[p.zona] = r[p.zona] || {});
    z[f] = (z[f] || 0) + n;
  }
  return r;
}

// --- Merma
function regla_merma() {
  const final = !!E().maquina_apagada;
  return { limite: final ? NOCHES_POR_NIVEL_FINAL : NOCHES_POR_NIVEL, tope: final ? 4 : 3 };
}
let subio_en = -1; // `tiempo` de la última subida (no se guarda: el tachado dura hasta la noche siguiente)

/** «Mañana, precios nuevos»: la próxima noche Merma sube. */
export function merma_avisa(): boolean {
  const e = E(), { limite, tope } = regla_merma();
  return e.merma >= 1 && e.merma < tope && e.tiempo - e.merma_desde === limite - 1;
}
/** Merma ha subido esta noche (los puestos enseñan el precio de antes tachado). */
export function merma_subio(): boolean {
  return subio_en >= 0 && subio_en === E().tiempo;
}

/** Una noche del reino: crecen las plantas, envejece la cesta y Merma puede subir. */
export function noche(): ResumenNoche {
  const e = E();
  e.tiempo++;
  const cambiaron: ResumenNoche["cambiaron"] = [];
  let arbol_lleno = false;
  for (const p of e.huerto) {
    const antes = dibujo(p);
    p.edad++;
    if (p.cultivo === "manzano" && p.edad > CULTIVOS.manzano.noches) {
      const habia = p.manzanas;
      p.manzanas = Math.min(TOPE_ARBOL, p.manzanas + CULTIVOS.manzano.frutos + (p.abono ? 2 : 0));
      p.abono = false;
      if (habia < TOPE_ARBOL && p.manzanas === TOPE_ARBOL) arbol_lleno = true;
    }
    if (dibujo(p) !== antes) cambiaron.push({ zona: p.zona, x: p.x, y: p.y });
  }
  // La cesta envejece; lo pasado va a la compostera (3 frutos = 1 abono).
  let pasados = 0;
  for (const l of e.cesta) l.noches++;
  e.cesta = e.cesta.filter(l => {
    const lim = CADUCA[l.fruto];
    if (lim !== undefined && l.noches > lim) { pasados += l.n; return false; }
    return true;
  });
  e.compost += pasados;
  const abonos = Math.floor(e.compost / 3);
  e.bolsa.abono += abonos; e.compost %= 3;
  // Merma
  let merma: ResumenNoche["merma"] = "nada";
  const { limite, tope } = regla_merma();
  if (e.merma >= 1 && e.merma < tope && e.tiempo - e.merma_desde >= limite) {
    e.merma++; e.merma_desde = e.tiempo; subio_en = e.tiempo; merma = "sube";
  } else if (merma_avisa()) merma = "aviso";
  e.brillo = 5 - e.merma;
  e.avisar();
  return { listos: listos(), cambiaron, compost: abonos, merma, arbol_lleno };
}

/** Al abrir el juego (o volver del segundo plano) con la fecha local `hoy` (5.2). */
export function al_abrir(hoy: string): ResumenVuelta {
  const e = E();
  if (!DIA.test(hoy) || (e.dia && hoy <= e.dia)) {
    return { dia_nuevo: false, noches: 0, regalo: null, encargo: encargo_hoy(), pocho: cesta_pocha_manana(), merma: "nada", listos: listos() };
  }
  // 1 noche, o 2 si han pasado 2 días o más. Partida migrada (sin día): 1.
  const n_noches = e.dia && dias_entre(e.dia, hoy) >= 2 ? 2 : 1;
  e.dias_jugados++; e.siestas_dia = 0; e.dia = hoy;
  let merma: ResumenVuelta["merma"] = "nada";
  for (let i = 0; i < n_noches; i++) {
    const r = noche();
    if (r.merma === "sube") merma = "sube";
    else if (r.merma === "aviso" && merma === "nada") merma = "aviso";
  }
  let regalo: Cultivo | null = null;
  if (e.mision > 4) { regalo = e.dias_jugados % 2 === 1 ? "rabano" : "calabaza"; e.bolsa[regalo]++; }
  const encargo = encargo_hoy();
  e.avisar();
  return { dia_nuevo: true, noches: n_noches, regalo, encargo, pocho: cesta_pocha_manana(), merma, listos: listos() };
}

export function siestas_quedan(): number {
  return Math.max(0, SIESTAS_POR_DIA - E().siestas_dia);
}
/** Gasta una siesta del día. La noche la pasa `interfaz.pasar_noche()`, que llama a `noche()`. */
export function usar_siesta(): boolean {
  if (siestas_quedan() <= 0) return false;
  E().siestas_dia++; E().avisar();
  return true;
}
