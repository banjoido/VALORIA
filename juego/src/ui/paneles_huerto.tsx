// Paneles Huerto y Mochila (sprint 3, 10.5). El panel Mapa sigue en minijuegos.tsx.
import React from "react";
import { estado } from "../estado";
import * as reglas from "../reino/reglas";
import * as tiempo from "../reino/tiempo";
import type { Fruto } from "../reino/reglas";
import { ICONO_FRUTO, NOMBRE_ZONA_HUERTO, NOTAS_ABUELO, TX_HUERTO, nombre_fruto, th } from "../textos/huerto";
import { nombreDe } from "../personajes";
import * as C from "./componentes";
import { interfaz, meta_actual } from "./controlador";

type FC<P> = React.FC<P>;
const Icono: FC<{ n: string; e?: number; style?: React.CSSProperties }> = p => React.createElement(C.Icono as unknown as FC<typeof p>, p);
const Boton: FC<{ texto: string; icono?: string; dorado?: boolean; disabled?: boolean; onClick?: () => void }> = p =>
  React.createElement(C.Boton as unknown as FC<typeof p>, p);
const Bocadillo: FC<{ texto: string }> = p => React.createElement(C.Bocadillo as unknown as FC<typeof p>, p);

type EstadoUi = reglas.EstadoReino & {
  paso: string; semillas: number; frutos: number; patines: boolean; tiene_chispin: boolean; precio_pan: number;
  trocitos: Record<string, number>; trocitos_de(k: string): number; brotes_aqui(): { fruto?: boolean }[]; frutos_listos(): number;
};
const E = () => estado as unknown as EstadoUi;
const ui = interfaz as unknown as { sonar(n: string): void };
interface Props { c: { panel: string; libre?: boolean; responder(v?: unknown): void } }

const Cerrar = ({ c }: Props) => <Boton texto={TX_HUERTO.cerrar} onClick={() => c.responder("cerrar")} />;

// ---------------------------------------------------------------------------
// Huerto
// ---------------------------------------------------------------------------
export function PanelHuerto({ c }: Props) {
  const e = E(), libre = c.libre !== false;
  const zonas = ["mercado", "valle"].filter(z => reglas.bancales(z).length);
  const quedan = tiempo.siestas_quedan();
  const brotes = e.brotes_aqui().length, frutos = e.frutos_listos();
  return (
    <>
      <div className="fila"><Icono n="huerto" e={3} /><h2>Tu huerto</h2></div>
      {zonas.map(z => {
        const plantas = e.huerto.filter(p => p.zona === z);
        const listas = plantas.filter(p => reglas.noches_que_faltan(p) === 0 && (p.cultivo !== "manzano" || p.manzanas > 0)).length;
        const abiertos = reglas.bancales(z).filter(b => b.abierto).length;
        return (
          <div className="fila zona-huerto" key={z}>
            <b className="crece">{NOMBRE_ZONA_HUERTO[z]}</b>
            <span>{plantas.length}/{abiertos} plantadas</span>
            <em className={listas ? "listo" : ""}>{listas} {listas === 1 ? "lista" : "listas"}</em>
          </div>
        );
      })}
      {brotes > 0 && <p className="suave">{`Brotes de la historia: ${brotes}` + (frutos > 0 ? `, ${frutos} con fruto.` : ".")}</p>}
      {!zonas.length && !brotes && <p className="suave">Aquí no has plantado nada.</p>}
      <Bocadillo texto="Las semillas trabajan mientras duermes." />
      {quedan > 0
        ? <Boton dorado icono="reloj" texto={th("dormir", { n: quedan })} disabled={!libre} onClick={() => c.responder("dormir")} />
        : <p className="centro suave">{TX_HUERTO.sin_sueno}</p>}
      {quedan > 0 && !libre && <p className="centro peq suave">{TX_HUERTO.dormir_ocupado}</p>}
      <Cerrar c={c} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Mochila
// ---------------------------------------------------------------------------
const TALLERES: Record<string, string> = { fiel: "la zapatería", engranaje: "el taller de inventos", horno: "el horno", fragua: "la fragua", relampago: "Relámpago", bazar: "el bazar" };

function LineaHucha() {
  const e = E();
  if (e.mision <= 1 && e.eleccion_m01 !== "hucha") return null;
  if (e.eleccion_m01 === "hucha" && e.mision <= 2) {
    return <p>{th("hucha_pan", { antes: Math.floor(e.monedas / 3), hoy: Math.floor(e.monedas / Math.max(1, e.precio_pan)) })}</p>;
  }
  const subio = e.merma > 1 || e.merma_final;
  if (!subio && e.eleccion_m01 !== "hucha") return null;
  const hoy = Math.floor(e.monedas / reglas.precio("rabano"));
  const antes = Math.floor(e.monedas / reglas.precio("rabano", Math.max(1, e.merma - 1)));
  return <p>{th("hucha_compra", { n: hoy })}{subio && antes !== hoy ? " " + th("hucha_antes", { m: antes }) : ""}</p>;
}

function Meta() {
  const m = meta_actual(), e = E();
  if (!m) return null;
  const falta = Math.max(0, m.precio - e.monedas);
  const cambiar = () => {
    const lista = reglas.metas();
    if (lista.length < 2) return;
    const i = lista.findIndex(l => l.id === m.id);
    e.meta = lista[(i + 1) % lista.length].id;
    ui.sonar("siguiente"); e.avisar();
  };
  return (
    <button className="btn meta" onClick={cambiar} aria-label={TX_HUERTO.meta_cambiar}>
      <span className="col">
        <span>{falta > 0 ? th("meta", { meta: m.nombre, n: falta }) : th("meta_lista", { meta: m.nombre })}</span>
        <span className="barra"><i style={{ width: Math.min(100, (e.monedas / Math.max(1, m.precio)) * 100) + "%" }} /></span>
        {reglas.metas().length > 1 && <small className="suave">{TX_HUERTO.meta_cambiar}</small>}
      </span>
    </button>
  );
}

function Chips({ cosas }: { cosas: { icono: string; n: number; titulo: string; pocho?: boolean }[] }) {
  return (
    <div className="chips">
      {cosas.map(x => (
        <span className="chip" key={x.titulo} title={x.titulo} aria-label={`${x.n} ${x.titulo}`}>
          <Icono n={x.icono} e={2} /><b>{x.n}</b>{x.pocho && <em className="etiqueta-pocho">{TX_HUERTO.pocho}</em>}
        </span>
      ))}
    </div>
  );
}

export function PanelMochila({ c }: Props) {
  const e = E();
  const trocitos = Object.keys(e.trocitos).filter(k => e.trocitos_de(k) > 0).map(k => TALLERES[k] || k);
  const reino = e.mision > 2;
  const bolsa = [
    { icono: "semillas", n: e.bolsa.rabano, titulo: "semillas de rábano" },
    { icono: "calabaza_lista", n: e.bolsa.calabaza, titulo: "semillas de calabaza" },
    { icono: "planton", n: e.bolsa.manzano, titulo: "plantones" },
    { icono: "abono", n: e.bolsa.abono, titulo: "abono" },
  ].filter(x => x.n > 0);
  const pocho = reglas.cesta_pocha_manana();
  const cesta = (["rabano", "calabaza", "manzana", "pepita"] as Fruto[]).map(f => ({
    icono: ICONO_FRUTO[f], n: reglas.cesta_cuenta(f), titulo: nombre_fruto(f), pocho: !!pocho[f],
  })).filter(x => x.n > 0);
  const enc = e.dia ? reglas.encargo_hoy() : null;
  const enc_hecho = !!(e.encargo && e.encargo.dia === e.dia && e.encargo.hecho);
  const o = reglas.obra("mercado");
  const notas = NOTAS_ABUELO.filter(n => e.secretos.includes(n.secreto));
  return (
    <>
      <div className="fila"><Icono n="mochila" e={3} /><h2>Mochila</h2></div>
      <div className="fila"><Icono n="moneda" e={3} /><p>{`${e.monedas} monedas · brillo ${e.brillo} de 5`}</p></div>
      <LineaHucha />
      {reino && <Meta />}
      {(e.semillas > 0 || e.frutos > 0 || !reino) && (
        <div className="fila"><Icono n="semillas" e={2} /><p>{`${e.semillas > 0 ? e.semillas + " semillas" : "Sin semillas"} · ${e.frutos} frutos`}</p></div>
      )}
      {reino && (
        <>
          <p className="etq-seccion">Bolsa</p>
          {bolsa.length ? <Chips cosas={bolsa} /> : <p className="suave peq">Vacía</p>}
          <p className="etq-seccion">Cesta</p>
          {cesta.length ? <Chips cosas={cesta} /> : <p className="suave peq">Vacía</p>}
          <div className="fila"><Icono n="abono" e={2} /><p>{th("compostera", { c: e.compost })}</p></div>
        </>
      )}
      {enc && <div className="fila"><Icono n={ICONO_FRUTO[enc.fruto]} e={2} /><p>{th("encargo_hoy", { vecino: nombreDe(enc.npc), n: enc.n, frutos: nombre_fruto(enc.fruto, enc.n) })}</p></div>}
      {!enc && enc_hecho && <div className="fila"><Icono n="si" e={2} /><p>{TX_HUERTO.encargo_hecho}</p></div>}
      {o && (o.etapa >= 4
        ? <div className="fila"><Icono n="medalla" e={2} /><p>{TX_HUERTO.medalla_molino}</p></div>
        : <div className="fila"><Icono n="ladrillo" e={2} /><p>{`Molino: etapa ${o.etapa} de 4 · ${o.puestos}/${o.necesarios} ladrillos`}</p></div>)}
      {e.patines && <div className="fila"><Icono n="patines" e={2} /><p>Patines de cohete</p></div>}
      {e.maquina_apagada && <div className="fila"><Icono n="moneda_estrella" e={2} /><p>La Moneda Estrella, nº 1 de 21</p></div>}
      {trocitos.length > 0 && <div className="fila"><Icono n="trocito" e={2} /><p>{"Trocitos de " + trocitos.join(", ")}</p></div>}
      {e.tiene_chispin && <Boton icono="carta" texto="Leer «Legado de Libertad»" onClick={() => c.responder("leer")} />}
      {notas.map(n => <Boton key={n.n} icono="carta" texto={th("nota_leer", { n: n.n })} onClick={() => c.responder("nota_" + n.texto)} />)}
      <Cerrar c={c} />
    </>
  );
}
