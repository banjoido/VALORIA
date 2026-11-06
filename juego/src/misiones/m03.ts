// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ABAJO, MisionBase, ORO, ORO_LUZ, VERDE_CLARO, objetivo, punto } from './base';
import { LOSETA } from '../mundo/mapas';
import { campo } from '../util/clases';

const ga = 12;

export const Mision03 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "compras", []);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_antojo":
        return objetivo(13, 13, 23);
      case "ir_hogaza":
        return objetivo(2, 9, 23);
      case "ir_semilla":
        return objetivo(6, 4, 23);
      case "feria":
        return objetivo(1, 13, 23);
    }
    return null;
  }
  puntos_control() {
    // En esta misión nada aparece ni desaparece entre pasos: basta con lo que
    // ya restaura Mundo.restaurar(3).
    return ["ir_antojo", "ir_hogaza", "ir_semilla", "feria"];
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_feria")), await this.ui.decir(this.dl("chispin_feria")), this.paso("ir_antojo");
  }
  async npc(o) {
    let t = estado.paso;
    if (t === "ir_antojo" && o === "antojo") return this.chucheGigante();
    if (t === "ir_hogaza" && o === "hogaza") return this.pagaYLista();
    if (t === "ir_semilla" && o === "semilla") return this.tresBotes();
    if (t === "feria" && o === "tasador") return this.feria();
    await this.charla(o);
  }
  async chucheGigante() {
    estado.ocupado = !0, await this.ui.decir(this.dl("antojo_ofrece"));
    let o = [["comprar", this.tx("comprar_chuche"), "caramelo", estado.monedas < 5], ["no", this.tx("ahora_no"), "mochila"]];
    estado.ojo_tasador && o.unshift(["mirar", this.tx("mirar_chuche"), "medalla_ojo"]);
    let t = await this.ui.elegir("caramelo", this.tx("titulo_chuche"), o);
    t === "mirar" && (await this.ui.decir(this.dl("chuche_mirada")), t = await this.ui.elegir("caramelo", this.tx("titulo_chuche"), [["comprar", this.tx("comprar_chuche"), "caramelo", estado.monedas < 5], ["no", this.tx("ahora_no"), "mochila"]])), t === "comprar" ? (estado.monedas -= 5, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#ff6fa8", 14), await this.ui.decir(this.dl("chuche_comprada"))) : await this.ui.decir(this.dl("chuche_no")), await this.ui.decir(this.dl("hogaza_llama")), this.paso("ir_hogaza");
  }
  async pagaYLista() {
    estado.ocupado = !0, await this.ui.decir(this.dl("hogaza_paga_feria", {
      n: ga
    })), this.ui.sonar("moneda"), await this.ui.clasificar(this.datos.lista), await this.ui.decir(this.dl("lista_hecha")), this.paso("ir_semilla");
  }
  async tresBotes() {
    estado.ocupado = !0, await this.ui.decir(this.dl("semilla_regla")), await this.ui.lista("semilla", this.tx("botes_titulo"), [["comida", this.tx("bote_1")], ["abono", this.tx("bote_2")], ["gorro", this.tx("bote_3")]], this.tx("botes_frase")), this.paso("feria");
  }
  gasto(o) {
    let t = 0;
    for (let s of this.datos.tienda) o.includes(s.id) && (t += +s.precio);
    return o.includes("oferta") && (t += 4), t;
  }
  async feria() {
    estado.ocupado = !0, await this.ui.decir(this.dl("tasador_feria")), this.compras = await this.ui.presupuesto(ga, this.datos.tienda);
    let o = this.gasto(this.compras);
    this.mundo.mostrar("antojo", !0), this.ui.sonar("malo"), await this.ui.decir(this.dl("antojo_oferta"));
    let t = ga - o >= 4;
    if ((await this.ui.elegir("caramelo", this.tx("titulo_oferta"), [["lista", this.tx("seguir_lista"), "mochila"], ["oferta", this.tx("comprar_oferta"), "caramelo"]])) === "oferta") if (t) this.compras.push("oferta");else {
      await this.ui.decir(this.dl("oferta_no_cabe"));
      let r = ["abono", "gorro", "comida"].find(l => this.compras.includes(l)) || "";
      r && (await this.ui.elegir("caramelo", this.tx("titulo_cambio"), [["lista", this.tx("seguir_lista"), "mochila"], ["cambiar", this.tx("cambiar_por", {
        cosa: this.tx("cosa_" + r)
      }), r]])) === "cambiar" && (this.compras = this.compras.filter(c => c !== r), this.compras.push("oferta"));
    }
    await this.efectos(), await this.ui.pregunta(this.tx("pregunta"), [["necesito", this.tx("resp_necesito"), "comida", 3], ["brilla", this.tx("resp_brilla"), "regadera_reluciente", 3], ["oferta", this.tx("resp_oferta"), "caramelo", 3]], "necesito", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async efectos() {
    let o = ga - this.gasto(this.compras);
    if (this.compras.includes("comida") ? (this.mundo.estallido(this.mundo.sobre_chispin(), ORO, 20), this.ui.sonar("acierto"), await this.ui.decir(this.dl("efecto_comida"))) : await this.ui.decir(this.dl("efecto_sin_comida")), this.compras.includes("abono")) {
      for (let t of estado.brotes_aqui()) this.mundo.estallido(punto(t.celda.x * LOSETA + 6.5, t.celda.y * LOSETA + 6), VERDE_CLARO, 6), t.cuantos = 2;
      await this.ui.decir(this.dl("efecto_abono"));
    }
    this.compras.includes("gorro") && (estado.gorro = !0, this.mundo.estallido(this.sobre_heroe(), "#d9543f", 14), await this.ui.decir(this.dl("efecto_gorro"))), (this.compras.includes("chuche") || this.compras.includes("oferta")) && (this.mundo.estallido(this.sobre_heroe(), "#ff6fa8", 14), await this.ui.decir(this.dl("efecto_chuche"))), o > 0 && (this.ganar_monedas(o), await this.ui.decir(this.dl("efecto_sobra", {
      n: o
    })));
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(172, 150), ORO, 30), await esperar(1.6), await this.ui.decir(this.dl("victoria_antojo")), this.mundo.iluminar(3, 22), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 140), ORO_LUZ, 40), await esperar(1.6), estado.progreso = 100, estado.avisar(), await this.ui.decir(this.dl("mercado_brilla")), this.mundo.huir_subeprecios(ABAJO), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await esperar(1.2), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin();
  }
};
