// Ventanas y piezas de la interfaz del huerto (sprint 3, sección 10):
// Puesto, Obra del molino, «¡Buenos días!», Aviso y la ficha de herramienta.
import React, { useRef, useState } from "react";
import { estado } from "../estado";
import * as reglas from "../reino/reglas";
import * as tiempo from "../reino/tiempo";
import type { Cosa, Fruto, Mano } from "../reino/reglas";
import type { ResumenVuelta } from "../reino/tiempo";
import { cambiar_mano, efecto_cobro, efecto_obra, mano_actual } from "../reino/acciones";
import {
  FRASE_PUESTO, ICONO_COSA, ICONO_FRUTO, LINEA_COSA, LINEA_FRUTO, NOMBRE_COSA, NOMBRE_CULTIVO, NOMBRE_ETAPA,
  NOMBRE_ZONA_HUERTO, TITULO_PUESTO, TX_HUERTO, nombre_fruto, th,
} from "../textos/huerto";
import type { Vecino } from "../textos/huerto";
import { nombreDe } from "../personajes";
import { rellenar } from "../ajustes";
import * as C from "./componentes";
import { interfaz } from "./controlador";

// Componentes de componentes.tsx (sin tipar todavía).
// Se leen al pintar (no al cargar el módulo): componentes.tsx también importa este archivo.
type FC<P> = React.FC<P>;
const Icono: FC<{ n: string; e?: number; style?: React.CSSProperties }> = p => React.createElement(C.Icono as unknown as FC<typeof p>, p);
const Hueco: FC<{ n: string; e?: number }> = p => React.createElement(C.Hueco as unknown as FC<typeof p>, p);
const EtiquetaNombre: FC<{ quien: string }> = p => React.createElement(C.EtiquetaNombre as unknown as FC<typeof p>, p);

interface Ui {
  sonar(n: string, tono?: number): void;
  hablar(t: string, quien: string): void;
  vista: { avisos: { id: number; texto: string; icono: string }[]; dialogo: unknown; capa: unknown; noche: unknown };
}
const ui = interfaz as unknown as Ui;
const E = () => estado as unknown as reglas.EstadoReino & { paso: string; zona: string };

interface Capa<T> { c: T & { responder(v?: unknown): void } }

// Respuesta visual (sección 9).
function temblar(el: HTMLElement | null): void {
  ui.sonar("fallo");
  el?.animate([{ transform: "translateX(0)" }, { transform: "translateX(-3px)" }, { transform: "translateX(3px)" },
    { transform: "translateX(-3px)" }, { transform: "translateX(0)" }], 250);
}
function saltar(el: Element | null | undefined): void {
  (el as HTMLElement | null)?.animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], 250);
}

/** Botón que, si no llega, no hace nada salvo temblar con el sonido `fallo`. */
function BotonPrecio(p: { texto: string; puede: boolean; onClick: (el: HTMLButtonElement) => void; dorado?: boolean; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button ref={ref} className={`btn ${p.dorado ? "dorado" : ""} ${p.puede ? "" : "apagado"} ${p.className || ""}`}
      aria-disabled={!p.puede}
      onClick={() => (p.puede ? p.onClick(ref.current!) : temblar(ref.current))}>
      <span>{p.texto}</span>
    </button>
  );
}

function Cerrar({ onClick }: { onClick: () => void }) {
  return <button className="btn" onClick={() => { ui.sonar("siguiente"); onClick(); }}><span>{TX_HUERTO.cerrar}</span></button>;
}

function Frase({ quien, texto }: { quien: string; texto: string }) {
  return (
    <div className="bocadillo">
      <Icono n={quien} e={1} style={{ maxHeight: 44, width: "auto" }} />
      <p>{rellenar(texto)}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Puesto (10.1)
// ---------------------------------------------------------------------------
function antes(precio_hoy: number, precio_antes: number) {
  return tiempo.merma_subio() && precio_antes !== precio_hoy ? <s className="antes">{precio_antes}</s> : null;
}

export function Puesto({ c }: Capa<{ vecino: Vecino; frase?: string }>) {
  const v = c.vecino;
  const [frase, setFrase] = useState(c.frase || FRASE_PUESTO[v]);
  const filas = useRef<Record<string, HTMLDivElement | null>>({});
  const cat = reglas.catalogo(v), e = E(), m = e.merma;
  const pocho = reglas.cesta_pocha_manana();
  const venta = cat.venta.filter(f => reglas.cesta_cuenta(f) > 0);
  const total = venta.reduce((s, f) => s + reglas.cesta_cuenta(f) * reglas.precio_venta(f), 0);

  const comprar = (cosa: Cosa | "tierra") => {
    const primera_tierra = cosa === "tierra" && !e.bola_de_nieve;
    let ok: boolean;
    if (cosa === "ladrillo") {
      const r = reglas.poner_ladrillos(1);
      ok = r.puestos > 0;
      if (ok) efecto_obra(r.etapa_nueva);
      if (r.etapa_nueva) setFrase(TX_HUERTO[`obra_${r.etapa_nueva}` as "obra_1"]);
    } else ok = reglas.comprar(cosa);
    if (!ok) return temblar(null);
    ui.sonar("moneda");
    saltar(filas.current[cosa]?.querySelector(".hueco"));
    if (primera_tierra) { setFrase(TX_HUERTO.bola_de_nieve); ui.sonar("acierto"); ui.hablar(TX_HUERTO.bola_de_nieve, v); }
  };
  const cobrar = (n: number) => { if (n > 0) { ui.sonar("moneda"); efecto_cobro(n); } };

  return (
    <>
      <Cerrar onClick={() => c.responder()} />
      <div className="fila"><EtiquetaNombre quien={v} /><h2 className="crece">{TITULO_PUESTO[v]}</h2></div>
      <Frase quien={v} texto={frase} />
      {tiempo.merma_avisa() && <span className="etiqueta-aviso">{TX_HUERTO.merma_manana}</span>}
      {cat.compra.map(cosa => {
        const p = reglas.precio(cosa), falta = p - e.monedas;
        const tienes = cosa === "tierra" ? e.tierras.length : cosa === "ladrillo" ? e.ladrillos
          : cosa === "regadera" ? (e.regadera === "hierro" ? 1 : 0) : e.bolsa[cosa];
        return (
          <div className="fila-puesto" key={cosa} ref={el => { filas.current[cosa] = el; }}>
            <Hueco n={ICONO_COSA[cosa]} e={2} />
            <div className="col">
              <b>{NOMBRE_COSA[cosa]}</b>
              <small className="suave">{LINEA_COSA[cosa]}</small>
              <small className="suave">{th("tienes", { n: tienes })}</small>
            </div>
            <div className="col-boton">
              {antes(p, reglas.precio(cosa, Math.max(1, m - 1)))}
              <BotonPrecio puede={falta <= 0} texto={falta <= 0 ? th("comprar", { p }) : th("faltan", { n: falta })}
                onClick={() => comprar(cosa)} />
            </div>
          </div>
        );
      })}
      {cat.venta.length > 0 && (venta.length === 0 ? <p className="suave centro">{TX_HUERTO.nada_que_vender}</p> : (
        <>
          <BotonPrecio dorado puede texto={th("vender_todo", { n: total })}
            onClick={() => cobrar(reglas.vender_todo(v === "copo" ? "copo" : "tasador"))} />
          {venta.map(f => {
            const n = reglas.cesta_cuenta(f), p = reglas.precio_venta(f);
            return (
              <div className="fila-puesto" key={f}>
                <Hueco n={ICONO_FRUTO[f]} e={2} />
                <div className="col">
                  <b>{n} {nombre_fruto(f, n)}</b>
                  <small className="suave">{n} × {p}{antes(p, reglas.precio_venta(f, Math.max(1, m - 1)))}</small>
                  {LINEA_FRUTO[f] && <small className="suave">{LINEA_FRUTO[f]}</small>}
                  {pocho[f] ? <span className="etiqueta-pocho">{TX_HUERTO.pocho}</span> : null}
                </div>
                <div className="col-boton">
                  <BotonPrecio puede texto={th("vender", { n: n * p })} onClick={() => cobrar(reglas.vender(f, n))} />
                </div>
              </div>
            );
          })}
        </>
      ))}
      <div className="fila monedas-puesto"><Icono n="moneda" e={2} /><b className="num">{e.monedas}</b></div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Obra del molino (10.6)
// ---------------------------------------------------------------------------
export function Obra({ c }: Capa<object>) {
  const o = reglas.obra("mercado"), e = E();
  const [frase, setFrase] = useState<string>(e.ladrillos === 0 ? TX_HUERTO.obra_presenta : TX_HUERTO.obra_sigue);
  const [vuela, setVuela] = useState(0);
  if (!o) return <><Cerrar onClick={() => c.responder()} /></>;
  const p = reglas.precio("ladrillo");
  const poner = (n: number) => {
    const r = reglas.poner_ladrillos(n);
    if (!r.puestos) return temblar(null);
    ui.sonar("moneda"); setVuela(v => v + 1); efecto_obra(r.etapa_nueva);
    if (r.etapa_nueva) {
      const t = TX_HUERTO[`obra_${r.etapa_nueva}` as "obra_1"];
      setFrase(t); ui.hablar(t, "yunque");
    }
  };
  const entera = o.etapa >= 4;
  return (
    <>
      <Cerrar onClick={() => c.responder()} />
      <EtiquetaNombre quien="yunque" />
      <h2>{entera ? TX_HUERTO.obra_entera : th("obra_titulo", { e: o.etapa + 1, nombre: NOMBRE_ETAPA[o.etapa] })}</h2>
      <div className="fila centrar"><span className="aparece" key={o.etapa}><Icono n={"molino_" + o.etapa} e={3} /></span></div>
      <Frase quien="yunque" texto={frase} />
      {entera ? <div className="fila"><Icono n="medalla" e={2} /><b>{TX_HUERTO.medalla_molino}</b></div> : (
        <>
          <div className="obra-barra">
            <div className="barra"><i style={{ width: (o.puestos / o.necesarios) * 100 + "%" }} /></div>
            {vuela > 0 && <span className="ladrillo-vuela" key={vuela}><Icono n="ladrillo" e={2} /></span>}
          </div>
          <p className="centro">{th("obra_barra", { puestos: o.puestos, necesarios: o.necesarios })}</p>
          <p className="suave centro">{th("obra_precio", { p })}</p>
          <BotonPrecio dorado puede={e.monedas >= p} texto={e.monedas >= p ? th("obra_poner_1", { p }) : th("faltan", { n: p - e.monedas })}
            onClick={() => poner(1)} />
          <BotonPrecio puede={e.monedas >= 5 * p} texto={th("obra_poner_5", { p: 5 * p })} onClick={() => poner(5)} />
        </>
      )}
      <p className="suave centro">{TX_HUERTO.obra_merma}</p>
      <div className="fila monedas-puesto"><Icono n="moneda" e={2} /><b className="num">{e.monedas}</b></div>
    </>
  );
}

// ---------------------------------------------------------------------------
// «¡Buenos días!» (10.3)
// ---------------------------------------------------------------------------
const FEMENINO: Partial<Record<Fruto, boolean>> = { calabaza: true, manzana: true, pepita: true };
function lista_frutos(cuantos: Partial<Record<Fruto, number>>): { texto: string; fem: boolean } | null {
  const partes = (Object.entries(cuantos) as [Fruto, number][]).filter(([, n]) => n > 0);
  if (!partes.length) return null;
  const t = partes.map(([f, n]) => `${n} ${nombre_fruto(f, n)}`);
  return { texto: t.length > 1 ? t.slice(0, -1).join(", ") + " y " + t[t.length - 1] : t[0], fem: partes.every(([f]) => FEMENINO[f]) };
}

export function lineas_buenos_dias(r: ResumenVuelta): { icono: string; texto: string }[] {
  const l: { icono: string; texto: string }[] = [];
  if (r.noches) l.push({ icono: "reloj", texto: r.noches > 1 ? TX_HUERTO.bd_dos : TX_HUERTO.bd_una });
  const zonas = Object.entries(r.listos).map(([z, c]) => {
    const lf = lista_frutos(c);
    return lf ? `${NOMBRE_ZONA_HUERTO[z] || z}: ${lf.texto} ${lf.fem ? "listas" : "listos"}` : "";
  }).filter(Boolean);
  if (zonas.length) l.push({ icono: "huerto", texto: zonas.join(". ") + "." });
  const pocho = lista_frutos(r.pocho);
  if (pocho) l.push({ icono: "abono", texto: `${pocho.texto} se pondrán ${pocho.fem ? "pochas" : "pochos"} mañana.` });
  if (r.encargo) l.push({ icono: ICONO_FRUTO[r.encargo.fruto], texto: th("bd_encargo", { vecino: nombreDe(r.encargo.npc), n: r.encargo.n, frutos: nombre_fruto(r.encargo.fruto, r.encargo.n) }) });
  if (r.regalo) l.push({ icono: r.regalo === "calabaza" ? "calabaza_lista" : "semillas", texto: th("bd_regalo", { cultivo: NOMBRE_CULTIVO[r.regalo] }) });
  if (r.merma === "sube") l.push({ icono: "merma", texto: E().maquina_apagada ? TX_HUERTO.merma_final : TX_HUERTO.merma_sube });
  else if (r.merma === "aviso") l.push({ icono: "moneda", texto: TX_HUERTO.merma_manana });
  // Como mucho 5 líneas: si sobra una, se calla el regalo (ya está en la bolsa).
  return (l.length > 5 ? l.filter(x => !x.texto.startsWith("Chispín ha encontrado")) : l).slice(0, 5);
}

export function BuenosDias({ c }: Capa<{ resumen: ResumenVuelta }>) {
  const l = lineas_buenos_dias(c.resumen);
  return (
    <>
      <div className="fila centrar"><i className="sol" /><h2>{TX_HUERTO.bd_titulo}</h2></div>
      {l.map((x, i) => <div className="fila" key={i}><Hueco n={x.icono} e={2} /><p>{x.texto}</p></div>)}
      <button className="btn dorado" onClick={() => { ui.sonar("siguiente"); c.responder(); }}><span>{TX_HUERTO.bd_boton}</span></button>
    </>
  );
}

// ---------------------------------------------------------------------------
// Aviso (10.4): tiras de 3 s bajo el marcador
// ---------------------------------------------------------------------------
export function Avisos() {
  const a = ui.vista.avisos || [];
  if (!a.length) return null;
  return (
    <div className="avisos" role="status">
      {a.map(x => <div className="aviso" key={x.id}>{x.icono && <Icono n={x.icono} e={1} style={{ maxHeight: 22, width: "auto" }} />}<span>{x.texto}</span></div>)}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ficha de herramienta (10.2): encima de la barra de abajo, a la izquierda
// ---------------------------------------------------------------------------
const ICONO_MANO: Record<Mano, string> = { regadera: "regadera_hierro", abono: "abono", rabano: "semillas", calabaza: "calabaza_lista", manzano: "planton" };
const NOMBRE_MANO: Record<Mano, string> = { regadera: "Regadera", abono: "Abono", rabano: "Rábano", calabaza: "Calabaza", manzano: "Plantón" };

export function FichaMano() {
  const e = E();
  if (e.paso === "titulo" || ui.vista.dialogo || ui.vista.capa || ui.vista.noche) return null;
  if (!reglas.bancales(e.zona).length) return null;
  const m = mano_actual();
  if (!m) return null;
  const n = m === "regadera" ? 0 : e.bolsa[m];
  return (
    <button className="btn ficha-mano" aria-label={`En la mano: ${NOMBRE_MANO[m]}. Toca para cambiar`}
      onClick={ev => { cambiar_mano(); saltar(ev.currentTarget.querySelector(".ico")); }}>
      <Icono n={ICONO_MANO[m]} e={2} />
      <span className="ficha-n">{m === "regadera" ? NOMBRE_MANO[m] : `${NOMBRE_MANO[m]} ×${n}`}</span>
    </button>
  );
}
