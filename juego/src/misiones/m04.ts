// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { MisionBase, ORO, ORO_LUZ, VERDE_CLARO, objetivo, punto } from './base';
import { campo } from '../util/clases';

const ya = 2;

const Sr = 2;

export const Mision04 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "cosecha", 0);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_valle":
        return objetivo(7, 32, 2);
      case "ir_copo":
      case "volver_copo":
        return objetivo(11, 8, 25);
      case "plantar":
        {
          let o = this.parcela_libre();
          return o ? objetivo(o.x, o.y, 2) : null;
        }
      case "cosechar":
        return this.primer_fruto();
    }
    return null;
  }
  async empezar() {
    estado.ocupado = !0, estado.frutos = 0, estado.zona === "mercado" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_valle")) : this.enValle();
  }
  async llegada(o) {
    estado.paso === "ir_valle" && estado.zona === "mercado" && o.y >= 30 && (estado.ocupado = !0, estado.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("valle", punto(7, 1))), estado.guardar(), this.enValle());
  }
  async enValle() {
    estado.ocupado = !0, await this.ui.decir(this.dl("llegada_valle")), this.paso("ir_copo");
  }
  async npc(o) {
    if (o === "copo" && estado.paso === "ir_copo") return this.copoHola();
    if (o === "copo" && estado.paso === "volver_copo") return this.copoReloj();
    await this.charla(o);
  }
  async copoHola() {
    estado.ocupado = !0, await this.ui.decir(this.dl("copo_hola")), estado.semillas = 3, estado.avisar(), this.ui.sonar("plantar"), this.mundo.estallido(this.sobre_heroe(), VERDE_CLARO, 12), await this.ui.decir(this.dl("copo_semillas")), this.paso("plantar");
  }
  async parcela(o) {
    let t = estado.brote_en(o);
    if (estado.paso === "plantar") {
      if (t) {
        await this.ui.decir(this.dl("parcela_ocupada")), estado.ocupado = !1;
        return;
      }
      if (this.plantar(o), this.ui.sonar("plantar"), estado.semillas -= 1, estado.avisar(), estado.semillas > 0) {
        estado.ocupado = !1;
        return;
      }
      estado.ocupado = !0, await this.ui.decir(this.dl("plantadas")), this.temporada();
    } else if (estado.paso === "cosechar" && t && t.fruto) {
      estado.ocupado = !0;
      let s = estado.frutos;
      for (let l of estado.brotes_aqui()) l.fruto && this.cosechar(l);
      let r = estado.frutos - s;
      this.cosecha += 1, await this.ui.decir(this.dl("cosecha", {
        n: r,
        p: estado.brotes_aqui().length
      })), await this.decidir(r);
    } else await super.parcela(o);
  }
  async temporada() {
    await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_" + (this.cosecha + 1)));
    for (let o of estado.brotes_aqui()) o.fruto = !0, o.crece = 1, o.cuantos = 1;
    estado.avisar(), await this.ui.decir(this.dl("hay_frutos")), this.paso("cosechar");
  }
  async decidir(o) {
    let t = await this.ui.elegir("fruto", this.tx("decidir_titulo", {
        n: o
      }), [["replantar", this.tx("op_replantar"), "huerto"], ["mitad", this.tx("op_mitad"), "semillas"], ["vender", this.tx("op_vender", {
        m: o * ya
      }), "moneda"]]),
      s = t === "replantar" ? o : t === "mitad" ? Math.floor(o / 2) : 0,
      r = 0;
    for (let c = 0; c < s; c++) {
      let g = this.parcela_libre();
      if (!g) break;
      this.plantar(g), r++;
    }
    estado.frutos -= o;
    let l = o - r;
    r > 0 && this.ui.sonar("plantar"), l > 0 && this.ganar_monedas(l * ya), r < s ? await this.ui.decir(this.dl("huerto_lleno", {
      v: l,
      m: l * ya
    })) : r > 0 ? await this.ui.decir(this.dl("replantado", {
      n: r,
      p: estado.brotes_aqui().length
    })) : await this.ui.decir(this.dl("vendido", {
      m: l * ya
    })), this.cosecha < Sr ? (estado.ocupado = !0, this.temporada()) : (await this.ui.decir(this.dl("copo_llama")), this.paso("volver_copo"));
  }
  async copoReloj() {
    estado.ocupado = !0, await this.ui.decir(this.dl("copo_reloj", {
      p: estado.brotes_aqui().length
    })), await this.ui.tabla("copo", this.tx("reloj_titulo"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [["moneda", this.tx("fila_vender"), [3, 6, 9, 12], ORO], ["huerto", this.tx("fila_replantar"), [3, 6, 12, 24], VERDE_CLARO]], this.tx("reloj_frase")), await this.ui.decir(this.dl("copo_bola")), estado.criaturas.push("brotin"), estado.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), VERDE_CLARO, 24), await this.ui.decir(this.dl("brotin_nace")), await this.ui.pregunta(this.tx("pregunta"), [["crece", this.tx("resp_crece"), "huerto", 3], ["igual", this.tx("resp_igual"), "fruto", 3], ["menos", this.tx("resp_menos"), "moneda", 3]], "crece", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(80, 95), ORO, 30), this.mundo.estallido(punto(80, 95), ORO_LUZ, 20), await esperar(1.4), estado.progreso_valle = 33, estado.avisar(), await this.ui.decir(this.dl("victoria_copo")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
