// Panel Mapa (sprint 3, 8.1 y 10.5): viajes también durante la historia, la zona de
// la misión, secretos encontrados, frutos listos y el molino entero.
import React, { type FC } from "react";
import { estado } from "../estado";
import * as C from "./componentes";
import * as reino from "../reino/reglas";
import { listos } from "../reino/tiempo";
import * as vida from "../reino/vida";
import { TX_VIDA, tv } from "../textos/vecinos";

// componentes.tsx aún no está tipado (como en paneles_huerto.tsx).
const Icono: FC<{ n: string; e?: number }> = p => React.createElement(C.Icono as unknown as FC<typeof p>, p);
const Boton: FC<{ texto: string; onClick?: () => void }> = p => React.createElement(C.Boton as unknown as FC<typeof p>, p);

interface Props { c: { libre?: boolean; responder(v?: unknown): void } }
interface EstadoMapa { zona: string; mision: number; paso: string; progreso: number; progreso_valle: number;
  progreso_ciudad: number; progreso_torre: number; progreso_reloj: number }

export function PanelMapa({ c }: Props) {
  const e = estado as unknown as EstadoMapa;
  const historia = e.paso !== "libre";
  const se_puede = vida.puede_viajar(c.libre !== false);
  const de_mision = historia ? vida.zona_mision() : "";
  const progreso: Record<string, number> = {
    mercado: e.progreso, valle: e.progreso_valle, ciudad: e.progreso_ciudad, torre: e.progreso_torre, reloj: e.progreso_reloj,
  };
  const total = Object.values(progreso).reduce((a, b) => a + b, 0);
  const hay_listos = listos();
  return (
    <>
      <div className="fila"><Icono n="mapa" e={3} /><h2>Valoria</h2></div>
      {vida.ZONAS_ABIERTAS.map(([z, desde]) => {
        const nombre = vida.NOMBRES_ZONA[z], aqui = e.zona === z, abierta = e.mision >= desde;
        // Etiquetas: TU MISIÓN, secretos, frutos listos y molino entero.
        const extra: string[] = [];
        if (de_mision === z) extra.push(TX_VIDA.mapa_mision);
        const s = vida.cuenta_secretos(z);
        if (s.total) extra.push(tv("mapa_secretos", s));
        const n = Object.values(hay_listos[z] || {}).reduce((a, b) => a + (b || 0), 0);
        if (n) extra.push(tv("mapa_listos", { n }));
        const molino = z === "mercado" && reino.etapa_molino() >= 4;
        const pie = (extra.length > 0 || molino) && (
          <p className="peq suave fila">
            {molino && <Icono n="rueda" e={2} />}
            {[...(molino ? [TX_VIDA.mapa_molino] : []), ...extra].join(" · ")}
          </p>
        );
        if (abierta && !aqui && se_puede) {
          return (
            <div key={z} className="col">
              <Boton texto={tv("mapa_viajar", { zona: nombre })} onClick={() => c.responder("viajar_" + z)} />
              {pie}
            </div>
          );
        }
        const etiqueta = aqui ? "AQUÍ ESTÁS"
          : !abierta ? "CERRADO" : historia ? TX_VIDA.mapa_paso : progreso[z] >= 100 ? "BRILLA" : "ABIERTO";
        return (
          <div key={z} className="col">
            <div className={`zona-f ${aqui ? "aqui" : ""}`}><span>{nombre}</span><em>{etiqueta}</em></div>
            {pie}
          </div>
        );
      })}
      <p className="peq suave">{`Valoria brilla al ${Math.floor(total / 5)}%.`}</p>
      <Boton texto="Cerrar" onClick={() => c.responder("cerrar")} />
    </>
  );
}
