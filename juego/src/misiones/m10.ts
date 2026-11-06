// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ABAJO, MisionBase, ORO, desplazar, objetivo, punto } from './base';
import { campo } from '../util/clases';

const Vr = 10;

export const Mision10 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "olido", !1);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_torre":
        return objetivo(7, 32, 2);
      case "ir_arrepentido":
        return objetivo(2, 5, 25);
      case "ir_reves":
        return objetivo(9, 6, 25);
      case "ir_chollo":
        return objetivo(12, 9, 25);
    }
    return null;
  }
  puntos_control() {
    // «ir_torre» es aún en la ciudad. this.olido solo cambia dentro de oferta(),
    // después de «ir_chollo».
    return ["ir_torre", "ir_arrepentido", "ir_reves", "ir_chollo"];
  }
  preparar_punto(o) {
    // Don Chollo aparece cuando el Revés lo avisa.
    o === "ir_chollo" && this.mundo.mostrar("donchollo", !0);
  }
  async empezar() {
    estado.ocupado = !0, estado.zona === "ciudad" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_torre")) : this.enTorre();
  }
  async llegada(o) {
    estado.paso === "ir_torre" && estado.zona === "ciudad" && o.y >= 31 && (estado.ocupado = !0, estado.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("torre", punto(7, 1))), estado.guardar(), this.enTorre());
  }
  async enTorre() {
    estado.ocupado = !0, await this.ui.decir(this.dl("llegada_torre")), this.paso("ir_arrepentido");
  }
  async npc(o) {
    let t = estado.paso;
    if (o === "arrepentido" && t === "ir_arrepentido") return estado.ocupado = !0, await this.ui.decir(this.dl("arrepentido_historia")), this.paso("ir_reves");
    if (o === "reves" && t === "ir_reves") return estado.ocupado = !0, await this.ui.decir(this.dl("reves_hola")), this.mundo.mostrar("donchollo", !0), this.ui.sonar("malo"), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 9)), 0, -12), "#3fbf9f", 20), await this.ui.decir(this.dl("chollo_aparece")), this.paso("ir_chollo");
    if (o === "donchollo" && t === "ir_chollo") return this.oferta();
    await this.charla(o);
  }
  async oferta() {
    estado.ocupado = !0;
    let o = Math.min(Vr, estado.monedas);
    await this.ui.decir(this.dl(this.olido ? "chollo_insiste" : "chollo_oferta", {
      n: o,
      d: o * 2
    }));
    let t = [["dar", this.tx("dar", {
      n: o
    }), "moneda", o <= 0]];
    this.olido || t.push(["pensar", this.tx("pensar"), "reves"]), t.push(["irme", this.tx("irme"), "mochila"]);
    let s = await this.ui.elegir("donchollo", this.tx("oferta_titulo"), t);
    if (s === "pensar") return await this.ui.decir(this.dl("reves_piensa")), await this.olfatear(), this.oferta();
    s === "dar" ? (estado.monedas -= o, estado.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("chollo_gracias")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_chollo")), this.mundo.mostrar("donchollo", !1), this.ui.sonar("malo"), await this.ui.decir(this.dl("chollo_desaparece", {
      n: o
    }))) : await this.ui.decir(this.dl("irme")), this.olido || (await this.ui.decir(this.dl("olfatin_despues")), await this.olfatear()), await this.ui.decir(this.dl("reves_nombre")), estado.criaturas.push("olfatin"), estado.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), "#e9dcc0", 20), await this.ui.decir(this.dl("olfatin_se_une")), await this.ui.pregunta(this.tx("pregunta"), [["timo", this.tx("resp_timo"), "olfatin", 3], ["suerte", this.tx("resp_suerte"), "moneda", 3], ["amigo", this.tx("resp_amigo"), "donchollo", 3]], "timo", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async olfatear() {
    this.olido || (this.mundo.estallido(desplazar(this.sobre_heroe(), 10, 6), "#e9dcc0", 14), await this.ui.decir(this.dl("olfatin_aparece"))), this.olido = !0, await this.ui.pistas("olfatin", this.tx("pistas_titulo"), "donchollo", this.datos.pistas), await this.ui.decir(this.dl("tras_oler"));
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.visibles.donchollo && (this.mundo.huir("donchollo", ABAJO), await this.ui.decir(this.dl("chollo_huye")), this.mundo.mostrar("donchollo", !1)), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(60, 70), ORO, 30), await esperar(1.4), estado.progreso_torre = 33, estado.avisar(), await this.ui.decir(this.dl("victoria_reves")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
