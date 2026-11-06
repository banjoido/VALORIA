// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { APAGADO, DERECHA, MORADO, MisionBase, ORO, ORO_LUZ, VERDE, objetivo, punto } from './base';

export const Mision01 = class extends MisionBase {
  objetivo() {
    switch (estado.paso) {
      case "ir_hogaza":
      case "comprar_pan":
        return objetivo(2, 9, 23);
      case "ir_semilla":
        return objetivo(6, 4, 23);
      case "vender":
        return objetivo(1, 13, 23);
      case "plantar":
        {
          let a = this.parcela_libre();
          return a ? objetivo(a.x, a.y, 2) : null;
        }
      case "cosechar":
        return this.primer_fruto();
    }
    return null;
  }
  puntos_control() {
    return ["ir_hogaza", "ir_semilla", "plantar", "cosechar", "vender", "comprar_pan"];
  }
  preparar_punto(a) {
    // La Semilla aparece en el mercado tras el reto de la hucha.
    this.ui.textos_carta = this.tx("carta"), a !== "ir_hogaza" && this.mundo.mostrar("semilla", !0);
  }
  async empezar() {
    this.ui.textos_carta = this.tx("carta"), await this.ui.carta(this.tx("carta"), !0), estado.monedas = 10, estado.semillas = 1, estado.tiene_chispin = !0, estado.avisar(), this.mundo.mostrar_chispin(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), ORO, 14), await this.ui.decir(this.dl("chispin_hola")), this.paso("ir_hogaza");
  }
  async npc(a) {
    a === "hogaza" && estado.paso === "ir_hogaza" ? this.hogazaAmasar() : a === "semilla" && estado.paso === "ir_semilla" ? this.semilla() : a === "tasador" && estado.paso === "vender" ? this.vender() : a === "hogaza" && estado.paso === "comprar_pan" ? this.comprarPan() : await this.charla(a);
  }
  async hogazaAmasar() {
    estado.ocupado = !0, await this.ui.decir(this.dl("hogaza_pan_sube"));
    let a = await this.ui.amasar();
    this.ganar_monedas(a), await this.ui.decir(this.dl("hogaza_paga", {
      n: a
    })), this.mundo.mostrar("subeprecios", !0), this.ui.sonar("malo"), this.mundo.estallido(punto(97.5, 125), MORADO, 22), await this.ui.decir(this.dl("sube_aparece")), this.reto();
  }
  async reto() {
    let a = await this.ui.reto(estado.monedas);
    if (a === "hucha") {
      let o = estado.monedas;
      await this.ui.pasar_noche(1, this.tx("noche_pan")), estado.precio_pan = 4, estado.brillo = 3, estado.avisar(), await this.ui.resultado("hucha", this.tx("hucha_titulo"), this.tx("hucha_texto", {
        n: o,
        antes: Math.floor(o / 3),
        hoy: Math.floor(o / 4)
      }), "Brillo", [ORO, ORO, ORO, APAGADO, APAGADO], this.tx("hucha_frase")), this.mundo.mostrar("subeprecios", !1), this.mundo.mostrar("semilla", !0), this.ui.sonar("plantar"), await this.ui.decir(this.dl("chispin_semilla_llama")), this.paso("ir_semilla");
    } else if (a === "semillas") estado.monedas -= 5, estado.avisar(), this.ui.sonar("plantar"), this.plantar(punto(2, 5)), this.plantar(punto(3, 5)), await this.ui.pasar_noche(1, this.tx("noche_pan")), estado.precio_pan = 4, estado.brillo = 4, estado.avisar(), await this.ui.resultado("huerto", this.tx("semillas_titulo"), this.tx("semillas_texto"), "Brotes", [VERDE, VERDE, APAGADO, APAGADO, APAGADO], this.tx("semillas_frase")), this.mundo.mostrar("subeprecios", !1), this.mundo.mostrar("semilla", !0), await this.ui.decir(this.dl("chispin_semilla_conocer")), this.paso("ir_semilla");else {
      estado.monedas = 0, estado.avisar(), await this.ui.resultado("caramelo", this.tx("caramelo_titulo"), this.tx("caramelo_texto"), "Monedas", [APAGADO, APAGADO, APAGADO, APAGADO, APAGADO], this.tx("caramelo_frase")), await this.ui.decir(this.dl("hogaza_mas_trabajo"));
      let o = await this.ui.amasar();
      this.ganar_monedas(o), await this.ui.decir(this.dl("caramelo_vuelta", {
        n: o
      })), this.reto();
    }
  }
  async semilla() {
    await this.ui.decir(this.dl("semilla_hola")), estado.ocupado = !0, await esperar(.25), this.plantar(punto(5, 5)), this.ui.sonar("plantar"), await esperar(.9), await this.ui.decir(this.dl("semilla_regalo")), this.paso("plantar");
  }
  async parcela(a) {
    let o = estado.brote_en(a);
    if (estado.paso === "plantar") {
      if (o) {
        await this.ui.decir(this.dl("parcela_ocupada")), estado.ocupado = !1;
        return;
      }
      estado.ocupado = !0, this.plantar(a), estado.semillas = 0, this.ui.sonar("plantar"), await this.ui.decir(this.dl("plantada")), await this.ui.pasar_noche(2, this.tx("noche_frutos"));
      for (let t of estado.brotes_aqui()) t.fruto = !0, t.crece = 1;
      estado.avisar(), await this.ui.decir(this.dl("hay_frutos")), this.paso("cosechar");
    } else if (estado.paso === "cosechar" && o && o.fruto) {
      if (this.cosechar(o)) {
        if (estado.ocupado = !0, await this.ui.decir(this.dl("cuantos_frutos", {
          n: estado.frutos
        })), (await this.ui.elegir("fruto", this.tx("frutos_titulo", {
          n: estado.frutos
        }), [["vender", this.tx("vender_todo"), "moneda"], ["replantar", this.tx("replantar"), "huerto"]])) === "replantar") {
          estado.frutos -= 1;
          let s = this.parcela_libre();
          s && this.plantar(s), this.ui.sonar("plantar"), await this.ui.decir(this.dl(s ? "replantado" : "replantado_junto"));
        }
        this.paso("vender");
      }
    } else await super.parcela(a);
  }
  async vender() {
    let a = estado.frutos * 3;
    await this.ui.decir(this.dl("tasador_compra", {
      n: a
    })), estado.frutos = 0, this.ganar_monedas(a), this.paso("comprar_pan");
  }
  async comprarPan() {
    await this.ui.decir(this.dl("hogaza_vende", {
      n: estado.precio_pan
    })), estado.monedas -= estado.precio_pan, estado.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("hogaza_toma")), await this.ui.pregunta(this.tx("pregunta"), [["bien", this.tx("resp_bien"), "moneda", 4], ["avara", this.tx("resp_avara"), "hogaza", 2], ["grande", this.tx("resp_grande"), "pan", 3]], "bien", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(33, 95), ORO, 30), this.mundo.estallido(punto(33, 95), ORO_LUZ, 20), await esperar(1.4), estado.progreso = 35, estado.avisar(), await esperar(1.2), await this.ui.decir(this.dl("victoria_hogaza")), this.mundo.huir_subeprecios(DERECHA), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await esperar(.7), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
