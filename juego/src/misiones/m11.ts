// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { DERECHA, MisionBase, ORO, VERDE_CLARO, desplazar, objetivo, punto } from './base';
import { campo } from '../util/clases';

const k = 12;

const U = [12, 18, 27, 41];

export const Mision11 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "eleccion", "");
  }
  objetivo() {
    return estado.paso === "ir_tienda" ? objetivo(4, 11, 25) : estado.paso === "ir_reves" ? objetivo(9, 6, 25) : null;
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(desplazar(this.mundo.pie(punto(2, 11)), 0, -16), ORO, 20), await this.ui.decir(this.dl("fachada_patines", {
      n: k
    })), this.paso("ir_tienda");
  }
  async npc(o) {
    if (o === "fachada" && estado.paso === "ir_tienda") return this.tienda();
    if (o === "reves" && estado.paso === "ir_reves") return this.reves();
    await this.charla(o);
  }
  async tienda() {
    estado.ocupado = !0, await this.ui.decir(this.dl("patines_oferta", {
      n: k
    })), this.mundo.mostrar("deudon", !0), this.ui.sonar("malo"), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 12)), 0, -12), "#9a8aaa", 18), await this.ui.decir(this.dl("deudon_ofrece")), this.eleccion = await this.ui.elegir("patines", this.tx("titulo"), [["prestamo", this.tx("prestamo", {
      n: k
    }), "cadena"], ["pagar", this.tx("pagar", {
      n: k
    }), "moneda", estado.monedas < k], ["no", this.tx("no"), "mochila"]]), this.eleccion === "prestamo" ? (estado.patines = !0, await this.ui.decir(this.dl("prestado", {
      n: k
    }))) : this.eleccion === "pagar" ? (estado.monedas -= k, estado.patines = !0, this.ui.sonar("moneda"), await this.ui.decir(this.dl("pagado"))) : await this.ui.decir(this.dl("no_compra")), estado.avisar(), estado.patines && (this.mundo.estallido(desplazar(this.sobre_heroe(), 0, 12), "#d9543f", 16), this.ui.sonar("acierto"), await this.ui.decir(this.dl("patines_puestos"))), this.paso("ir_reves");
  }
  async reves() {
    if (estado.ocupado = !0, await this.ui.decir(this.dl("reves_" + this.eleccion)), await this.ui.tabla("reves", this.tx("tabla_titulo"), ["Hoy", "1\xAA", "2\xAA", "3\xAA"], [["bola", this.tx("fila_copo"), [3, 6, 12, 24], VERDE_CLARO], ["cadena", this.tx("fila_deudon"), U, "#e0503c"]], this.tx("tabla_frase")), this.eleccion === "prestamo") {
      await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_cobro")), this.ui.sonar("malo"), await this.ui.decir(this.dl("deudon_cobra", {
        n: U[1],
        p: k
      }));
      let o = Math.min(estado.monedas, U[1]);
      estado.monedas -= o, estado.avisar(), this.ui.sonar("moneda"), o < U[1] ? await this.ui.decir(this.dl("reves_ayuda", {
        n: U[1] - o
      })) : await this.ui.decir(this.dl("deuda_pagada", {
        n: U[1] - k
      }));
    } else await this.ui.decir(this.dl("deudon_se_va"));
    this.mundo.huir("deudon", DERECHA), await esperar(.8), this.mundo.mostrar("deudon", !1), await this.ui.decir(this.dl("reves_nombre")), await this.ui.pregunta(this.tx("pregunta"), [["capricho", this.tx("resp_capricho"), "patines", 3], ["nunca", this.tx("resp_nunca"), "moneda", 3], ["siempre", this.tx("resp_siempre"), "cadena", 3]], "capricho", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(100, 150), ORO, 30), await esperar(1.4), estado.progreso_torre = 66, estado.avisar(), await this.ui.decir(this.dl("victoria_deuda")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
