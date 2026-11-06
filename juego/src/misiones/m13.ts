// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { IZQUIERDA, MisionBase, ORO, desplazar, objetivo, punto } from './base';
import { campo } from '../util/clases';

const Ca = 6;

const aa = 18;

export const Mision13 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "compro", !1);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_reloj":
        return objetivo(7, 32, 2);
      case "ir_pendulo":
        return objetivo(12, 12, 25);
      case "ir_vaiven":
        return objetivo(7, 8, 25);
      case "ir_euforio":
        return objetivo(4, 15, 25);
    }
    return null;
  }
  async empezar() {
    estado.ocupado = !0, estado.zona === "torre" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_reloj")) : this.enReloj();
  }
  async llegada(o) {
    estado.paso === "ir_reloj" && estado.zona === "torre" && o.y >= 32 && (estado.ocupado = !0, estado.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("reloj", punto(7, 1))), estado.guardar(), this.enReloj());
  }
  async enReloj() {
    estado.ocupado = !0, estado.pendulo = .85, estado.avisar(), this.mundo.mostrar("euforio", !0), ["#ff8fbd", ORO, "#9fd6f5"].forEach(o => this.mundo.estallido(punto(30 + Math.random() * 130, 170 + Math.random() * 70), o, 16)), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("llegada_reloj")), this.paso("ir_pendulo");
  }
  async npc(o) {
    let t = estado.paso;
    if (o === "pendulo" && t === "ir_pendulo") return estado.ocupado = !0, await this.ui.decir(this.dl("pendulo_hola")), await this.ui.lista("pendulo", this.tx("medidor_titulo"), [["panico", this.tx("m_panico")], ["reloj", this.tx("m_calma")], ["euforio", this.tx("m_euforia")]], this.tx("medidor_frase")), this.paso("ir_vaiven");
    if (o === "vaiven" && t === "ir_vaiven") return estado.ocupado = !0, this.ui.sonar("acierto"), this.mundo.estallido(desplazar(this.mundo.pie(punto(7, 2)), 0, -10), ORO, 16), await this.ui.decir(this.dl("vaiven_campana")), await this.ui.pregunta(this.tx("donde"), [["euforia", this.tx("r_euforia"), "euforio", 3], ["calma", this.tx("r_calma"), "reloj", 3], ["panico", this.tx("r_panico"), "panico", 3]], "euforia", this.tx("donde_bien"), this.tx("donde_mal")), this.paso("ir_euforio");
    if (o === "euforio" && t === "ir_euforio") return this.fiesta();
    await this.charla(o);
  }
  async fiesta() {
    estado.ocupado = !0, await this.ui.decir(this.dl("euforio_oferta", {
      n: aa,
      c: Ca
    })), (await this.ui.elegir("euforio", this.tx("titulo"), [["comprar", this.tx("comprar", {
      n: aa
    }), "trocito", estado.monedas < aa], ["esperar", this.tx("esperar"), "reloj"]])) === "comprar" ? (estado.monedas -= aa, estado.trocitos.horno = estado.trocitos_de("horno") + 1, this.compro = !0, this.ui.sonar("moneda"), estado.avisar(), await this.ui.decir(this.dl("comprado"))) : await this.ui.decir(this.dl("espera")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_fin")), estado.pendulo = 0, estado.avisar(), this.mundo.huir("euforio", IZQUIERDA), this.ui.sonar("acierto"), await this.ui.decir(this.dl("vaiven_calma")), this.mundo.mostrar("euforio", !1), await this.ui.tabla("pendulo", this.tx("tabla_titulo"), ["Antes", "Fiesta", "Despu\xE9s"], [["trocito", this.tx("fila_precio"), [Ca, aa, Ca], ORO]], this.tx(this.compro ? "tabla_compro" : "tabla_espera")), this.compro && (await this.ui.decir(this.dl("perdio", {
      n: aa - Ca
    }))), await this.ui.decir(this.dl("pendulo_nombre")), await this.ui.pregunta(this.tx("pregunta"), [["todos", this.tx("resp_todos"), "euforio", 3], ["nadie", this.tx("resp_nadie"), "panico", 3], ["lunes", this.tx("resp_lunes"), "reloj", 3]], "todos", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 90), ORO, 30), await esperar(1.4), estado.progreso_reloj = 33, estado.avisar(), await this.ui.decir(this.dl("victoria_campana")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
