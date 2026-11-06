// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { DERECHA, MisionBase, ORO, VERDE_CLARO, desplazar, objetivo, punto } from './base';

const Ja = 6;

const R = 3;

const Ci = 8;

const Ri = ["fiel", "engranaje", "horno", "fragua"];

export const Mision14 = class extends MisionBase {
  objetivo() {
    return estado.paso === "ir_memoria" ? objetivo(2, 12, 25) : estado.paso === "ir_pendulo" ? objetivo(12, 12, 25) : null;
  }
  trocitos() {
    return Ri.reduce((a, o) => a + estado.trocitos_de(o), 0);
  }
  puntos_control() {
    // Calmín ya está en estado.criaturas al llegar a «ir_pendulo».
    return ["ir_memoria", "ir_pendulo"];
  }
  preparar_punto() {
    // La tormenta y Pánico empiezan con la misión y duran hasta decidir().
    this.mundo.tormenta(!0), this.mundo.mostrar("panico", !0);
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_tormenta")), estado.pendulo = -.9, estado.avisar(), this.mundo.tormenta(!0), this.mundo.mostrar("panico", !0), this.ui.sonar("malo"), await this.ui.decir(this.dl("panico_grita"));
    let a = this.trocitos();
    await this.ui.decir(this.dl(a > 0 ? "chispin_tormenta" : "chispin_tormenta_sin", {
      n: a,
      v: a * Ja,
      t: a * R
    })), this.paso("ir_memoria");
  }
  async npc(a) {
    if (a === "memoria" && estado.paso === "ir_memoria") return this.memoria();
    if (a === "pendulo" && estado.paso === "ir_pendulo") return this.decidir();
    await this.charla(a);
  }
  async memoria() {
    estado.ocupado = !0, await this.ui.decir(this.dl("memoria_hola")), await this.ui.lista("memoria", this.tx("cuadros_titulo"), [["cuadro", this.tx("cuadro_1")], ["cuadro", this.tx("cuadro_2")], ["cuadro", this.tx("cuadro_3")]], this.tx("cuadros_frase")), this.mundo.estallido(desplazar(this.sobre_heroe(), -8, 0), "#c9a66b", 18), estado.criaturas.push("calmin"), estado.avisar(), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("calmin_aparece")), this.paso("ir_pendulo");
  }
  async decidir() {
    estado.ocupado = !0;
    let a = this.trocitos();
    await this.ui.decir(this.dl("pendulo_tormenta"));
    let o = await this.ui.elegir("panico", this.tx("titulo"), [["vender", this.tx("vender", {
      m: a * R
    }), "moneda", a === 0], ["aguantar", this.tx("aguantar"), "calmin"], ["rebajas", this.tx("rebajas", {
      p: R
    }), "trocito", estado.monedas < R]]);
    if (o === "vender") {
      for (let s of Ri) estado.trocitos[s] = 0;
      this.ganar_monedas(a * R), await this.ui.decir(this.dl("vendido", {
        m: a * R
      }));
    } else if (o === "rebajas") {
      let s = Math.min(3, Math.floor(estado.monedas / R));
      estado.monedas -= s * R, estado.trocitos.fiel = estado.trocitos_de("fiel") + s, estado.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("rebajas", {
        k: s,
        m: s * R
      }));
    } else await this.ui.decir(this.dl("aguanta"));
    await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_calma")), this.mundo.tormenta(!1), estado.pendulo = 0, estado.avisar(), this.mundo.huir("panico", DERECHA), this.ui.sonar("acierto"), await this.ui.decir(this.dl("vuelve_calma")), this.mundo.mostrar("panico", !1), await this.ui.tabla("pendulo", this.tx("tabla_titulo"), ["Antes", "Tormenta", "Despu\xE9s"], [["moneda", this.tx("f_vender"), [Ja, R, R], "#e0503c"], ["calmin", this.tx("f_aguantar"), [Ja, R, Ci], VERDE_CLARO], ["trocito", this.tx("f_rebajas"), [R, R, Ci], ORO]], this.tx("tabla_frase"));
    let t = this.trocitos();
    t > 0 && (this.ganar_monedas(t * 2), await this.ui.decir(this.dl("frutos_dorados", {
      n: t * 2,
      t
    }))), await this.ui.decir(this.dl("pendulo_nombre")), await this.ui.pregunta(this.tx("pregunta"), [["calma", this.tx("resp_calma"), "calmin", 3], ["vender", this.tx("resp_vender"), "panico", 3], ["esconder", this.tx("resp_esconder"), "hucha", 3]], "calma", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 200), ORO, 30), await esperar(1.4), estado.progreso_reloj = 66, estado.avisar(), await this.ui.decir(this.dl("victoria_pendulo")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
