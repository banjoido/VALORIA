// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { rellenar } from '../ajustes';
import { estado } from '../estado';
import { LOSETA, Mapa } from '../mundo/mapas';

export const ORO = "#f6c945";

export const ORO_LUZ = "#fff1a8";

export const APAGADO = "#4a4060";

export const VERDE = "#7cc05a";

export const MORADO = "#9b6ccc";

export const VERDE_CLARO = "#9ad86f";

export const ROJO = "#e0503c";

export const AZUL = "#9fd6f5";

export const punto = (i, a) => ({
  x: i,
  y: a
});

export const objetivo = (i, a, o) => ({
  x: i,
  y: a,
  z: o
});

export const desplazar = (i, a, o) => ({
  x: i.x + a,
  y: i.y + o
});

export const ARRIBA = punto(0, -1);

export const ABAJO = punto(0, 1);

export const DERECHA = punto(1, 0);

export const IZQUIERDA = punto(-1, 0);

export const MisionBase = class {
  constructor(a, o) {
    this.numero = a, this.datos = o;
  }
  async jugar(a, o) {
    this.mundo = a, this.ui = o, a.objetivo_fn = () => this.objetivo();
    let t = [a.on("npc", r => this.npc(r)), a.on("parcela", r => this.parcela(r)), a.on("lugar", r => this.lugar(r)), a.on("llegada", r => this.llegada(r))],
      s = new Promise(r => {
        this.terminar = r;
      });
    this.empezar(), await s, t.forEach(r => r()), a.objetivo_fn = null;
  }
  fin() {
    this.terminar();
  }
  empezar() {}
  async npc(a) {
    await this.charla(a);
  }
  async parcela(a) {
    let o = estado.brote_en(a);
    await this.ui.decir([["chispin", o ? "Este brote crece poco a poco." : "Un buen hueco para plantar\u2026 cuando tengamos semillas."]]), estado.ocupado = !1;
  }
  lugar() {}
  llegada() {}
  objetivo() {
    return null;
  }
  dl(a, o = {}) {
    return this.datos.dialogos[a].map(([t, s]) => [t, rellenar(s, o)]);
  }
  tx(a, o = {}) {
    return rellenar(this.datos.textos[a], o);
  }
  paso(a) {
    estado.paso = a, estado.ocupado = !1, this.ui.poner_mision(this.datos.misiones[a] || {
      valle: "Valle de la Nieve",
      ciudad: "Ciudad de las Empresas",
      torre: "Torre del Rev\xE9s",
      reloj: "Gran Reloj"
    }[estado.zona] || "Mercado del Pueblo");
  }
  async charla(a) {
    let o = "charla_" + a;
    await this.ui.decir(this.datos.dialogos[o] ? this.dl(o) : [["chispin", "\xA1Hola!"]]), estado.ocupado = !1;
  }
  siguiente_estacion() {
    return (estado.estacion + 1) % 4;
  }
  plantar(a) {
    estado.plantar(a), this.mundo.estallido(punto(a.x * LOSETA + 6.5, a.y * LOSETA + 6), VERDE_CLARO, 10);
  }
  parcela_libre() {
    return Mapa.parcelas().find(a => !estado.brote_en(a)) || null;
  }
  primer_fruto() {
    let a = estado.brotes_aqui().find(o => o.fruto);
    return a ? objetivo(a.celda.x, a.celda.y, 2) : null;
  }
  sobre_heroe() {
    return this.mundo.sobre_heroe();
  }
  ganar_monedas(a) {
    estado.monedas += a, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), ORO, 10);
  }
  cosechar(a) {
    return a.fruto = !1, estado.frutos += a.cuantos | 0, this.ui.sonar("moneda"), this.mundo.estallido(punto(a.celda.x * LOSETA + 6.5, a.celda.y * LOSETA + 4), ROJO, 8), estado.avisar(), estado.frutos_listos() === 0;
  }
};
