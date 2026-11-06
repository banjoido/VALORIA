// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ABAJO, AZUL, DERECHA, MisionBase, ORO, ORO_LUZ, ROJO, VERDE_CLARO, desplazar, objetivo, punto } from './base';

const qa = 12;

export const Mision06 = class extends MisionBase {
  objetivo() {
    return estado.paso === "ir_copo" ? objetivo(11, 8, 25) : null;
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(desplazar(this.mundo.pie(punto(9, 12)), 0, -12), "#e0503c", 18), await this.ui.decir(this.dl("prisas_helada")), this.mundo.huir("prisas", DERECHA), await esperar(.9), this.mundo.mostrar("prisas", !1), await this.ui.decir(this.dl("chispin_copo")), this.paso("ir_copo");
  }
  async npc(a) {
    if (a === "copo" && estado.paso === "ir_copo") return this.copo();
    await this.charla(a);
  }
  async copo() {
    estado.ocupado = !0, await this.ui.decir(this.dl("copo_sacos", {
      n: qa
    })), estado.frutos = Math.max(0, estado.frutos - 24), estado.avisar(), await this.ui.lista("copo", this.tx("lugares_titulo"), [["huerto", this.tx("l_huerto")], ["tierras", this.tx("l_tierras")], ["cueva", this.tx("l_cueva")]], this.tx("lugares_frase"));
    let a = await this.ui.repartir(qa, [["huerto", this.tx("o_huerto"), "huerto"], ["tierras", this.tx("o_tierras"), "tierras"], ["cueva", this.tx("o_cueva"), "cueva"]], this.tx("repartir_titulo", {
      n: qa
    }), this.tx("repartir_nota"));
    await this.ui.decir(this.dl("repartido", {
      h: a.huerto,
      t: a.tierras,
      c: a.cueva
    })), await this.helada(a);
  }
  async helada(a) {
    let o = a.huerto,
      t = a.tierras,
      s = a.cueva,
      r = Math.round(o * .5),
      l = o + t + s,
      c = r + t + s,
      g = r * 2,
      A = Math.round(t * 1.25),
      y = g + A + s;
    await this.ui.pasar_noche(1, this.tx("noche_helada")), this.ui.sonar("malo");
    for (let d = 0; d < 4; d++) this.mundo.estallido(desplazar(this.mundo.pie(punto(2 + d, 9)), 0, -8), AZUL, 10);
    await this.ui.decir(this.dl("helada", {
      h: o,
      h1: r,
      t,
      c: s,
      n: c
    })), await this.ui.pasar_noche(2, this.tx("noche_primavera")), this.ui.sonar("acierto"), this.mundo.estallido(this.sobre_heroe(), VERDE_CLARO, 20), await this.ui.decir(this.dl("primavera", {
      h2: g,
      t2: A,
      c: s,
      n: y
    }));
    let N = o < qa && t + s > 0 && y > 12 ? this.tx("tabla_frase_reparto") : this.tx("tabla_frase_todo");
    await this.ui.tabla("copo", this.tx("tabla_titulo"), ["Antes", "Helada", "Primavera"], [["mochila", this.tx("fila_tuyo"), [l, c, y], ORO], ["huerto", this.tx("fila_huerto"), [12, 6, 12], ROJO], ["cueva", this.tx("fila_cueva"), [12, 12, 12], AZUL]], N), this.ganar_monedas(y), await this.ui.decir(this.dl("cobras", {
      n: y
    })), estado.criaturas.push("escudon"), estado.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), AZUL, 24), await this.ui.decir(this.dl("escudon_nace")), await this.ui.pregunta(this.tx("pregunta"), [["repartir", this.tx("resp_repartir"), "escudon", 3], ["todo", this.tx("resp_todo"), "huerto", 3], ["nada", this.tx("resp_nada"), "cueva", 3]], "repartir", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(91, 300), ORO, 30), await esperar(1.4), await this.ui.decir(this.dl("victoria_tierras")), this.mundo.iluminar(3, 22), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 210), ORO_LUZ, 40), await esperar(1.6), estado.progreso_valle = 100, estado.avisar(), await this.ui.decir(this.dl("valle_brilla")), this.mundo.huir("prisas", ABAJO), this.ui.sonar("malo"), await this.ui.decir(this.dl("prisas_huye")), await esperar(1.2), this.mundo.mostrar("prisas", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin();
  }
};
