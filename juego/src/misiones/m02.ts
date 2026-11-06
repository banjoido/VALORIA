// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import * as reino from '../reino/reglas';
import { AZUL, DERECHA, MisionBase, ORO, ORO_LUZ, VERDE, objetivo, punto } from './base';
import { LOSETA } from '../mundo/mapas';

const Di = 3;

const ji = 8;

export const Mision02 = class extends MisionBase {
  objetivo() {
    switch (estado.paso) {
      case "ir_hogaza":
        return objetivo(2, 9, 23);
      case "ir_semilla":
        return objetivo(6, 4, 23);
      case "regar":
        {
          let a = estado.brotes_aqui()[0];
          return a ? objetivo(a.celda.x, a.celda.y, 2) : null;
        }
      case "cosechar":
        return this.primer_fruto();
      case "ir_yunque":
        return objetivo(11, 20, 23);
      case "ir_tasador":
        return objetivo(1, 13, 23);
    }
    return null;
  }
  puntos_control() {
    return ["ir_hogaza", "ir_semilla", "regadera", "regar", "cosechar", "ir_yunque", "ir_tasador"];
  }
  preparar_punto(a) {
    // El Yunque abre su tienda cuando la Semilla cuenta que el huerto tiene sed.
    a !== "ir_hogaza" && a !== "ir_semilla" && this.mundo.mostrar("yunque", !0);
  }
  async empezar() {
    estado.ocupado = !0, this.mundo.mostrar("semilla", !0), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_pan")), estado.precio_pan = 5, estado.regadera = "", estado.avisar(), await this.ui.decir(this.dl("chispin_buenos_dias")), this.paso("ir_hogaza");
  }
  async npc(a) {
    let o = estado.paso;
    if (o === "ir_hogaza" && a === "hogaza") return this.quienHaSido();
    if (o === "ir_semilla" && a === "semilla") return this.huertoSediento();
    if (o === "regadera" && a === "tasador") return this.tienda(a, "regadera_reluciente", "reluciente", Di);
    if (o === "regadera" && a === "yunque") return this.tienda(a, "regadera_hierro", "hierro", ji);
    if (o === "regadera" && a === "hogaza") return this.trabajo();
    if (o === "ir_yunque" && a === "yunque") return this.leccionYunque();
    if (o === "ir_tasador" && a === "tasador") return this.ojoDeTasador();
    await this.charla(a);
  }
  async quienHaSido() {
    estado.ocupado = !0, await this.ui.decir(this.dl("hogaza_mas_caro")), (await this.ui.pregunta(this.tx("quien"), [["sube", this.tx("resp_sube"), "subeprecios", 2], ["antojo", this.tx("resp_antojo"), "antojo", 2], ["viento", this.tx("resp_viento"), "viento", 3]], "sube", this.tx("fb_quien_bien"), this.tx("fb_quien_mal"))) && this.mundo.estallido(this.mundo.sobre_chispin(), ORO, 18), await this.ui.decir(this.dl("hogaza_semilla_busca")), this.paso("ir_semilla");
  }
  async huertoSediento() {
    estado.ocupado = !0, await this.ui.decir(this.dl("semilla_sed")), this.mundo.mostrar("yunque", !0), this.paso("regadera");
  }
  async tienda(a, o, t, s) {
    estado.ocupado = !0, await this.ui.decir(this.dl("tienda_" + a));
    let r = estado.monedas < s;
    (await this.ui.elegir(o, this.tx("titulo_" + t), [["comprar", this.tx("comprar_" + t), "moneda", r], ["no", this.tx("ahora_no"), "mochila"]])) === "comprar" ? (estado.monedas -= s, estado.regadera = t, estado.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("comprada_" + t)), this.paso("regar")) : (r && (await this.ui.decir(this.dl("faltan_monedas", {
      n: s
    }))), estado.ocupado = !1);
  }
  async trabajo() {
    estado.ocupado = !0;
    // Hogaza solo da trabajo una vez por día real: si no, las monedas serían infinitas.
    if (!reino.puede_trabajar()) {
      let dialogo = this.dl("hogaza_ya_amasado");
      estado.monedas < ji && (dialogo = dialogo.concat(this.dl("chispin_vender_frutos")));
      await this.ui.decir(dialogo), estado.ocupado = !1;
      return;
    }
    if ((await this.ui.elegir("pan", this.tx("amasar_titulo"), [["si", this.tx("amasar_si"), "pan"], ["no", this.tx("ahora_no"), "mochila"]])) === "si") {
      reino.marcar_trabajo();
      let monedasGanadas = await this.ui.amasar();
      this.ganar_monedas(monedasGanadas), await this.ui.decir(this.dl("hogaza_paga", {
        n: monedasGanadas
      }));
    }
    estado.ocupado = !1;
  }
  async parcela(a) {
    let o = estado.brote_en(a);
    if (estado.paso === "regar" && o) {
      estado.ocupado = !0;
      for (let l of estado.brotes_aqui()) this.mundo.estallido(punto(l.celda.x * LOSETA + 6.5, l.celda.y * LOSETA + 3), AZUL, 10);
      this.ui.sonar("plantar"), await this.ui.decir(this.dl("regado_" + estado.regadera)), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_crecen"));
      let t = estado.regadera === "hierro" ? 2 : 1;
      for (let l of estado.brotes_aqui()) l.fruto = !0, l.crece = 1, l.cuantos = t;
      estado.avisar();
      let s = estado.brotes_aqui().length * t,
        r = Array(Math.min(s, 8)).fill(VERDE);
      estado.regadera === "hierro" ? await this.ui.resultado("regadera_hierro", this.tx("hierro_titulo"), this.tx("hierro_texto", {
        n: s
      }), "Frutos", r, this.tx("hierro_frase")) : await this.ui.resultado("regadera_rota", this.tx("rota_titulo"), this.tx("rota_texto", {
        n: s
      }), "Frutos", r, this.tx("rota_frase")), await this.ui.decir(this.dl("a_cosechar")), this.paso("cosechar");
    } else if (estado.paso === "cosechar" && o && o.fruto) {
      if (this.cosechar(o)) {
        estado.ocupado = !0;
        for (let t of estado.brotes_aqui()) t.cuantos = 1;
        await this.ui.decir(this.dl("yunque_llama", {
          n: estado.frutos
        })), this.paso("ir_yunque");
      }
    } else await super.parcela(a);
  }
  async leccionYunque() {
    estado.ocupado = !0, await this.ui.decir(this.dl("yunque_hola")), await this.ui.comparar([["regadera_reluciente", this.tx("nombre_reluciente"), Di, 1], ["regadera_hierro", this.tx("nombre_hierro"), ji, 10]], this.tx("yunque_frase")), await this.ui.decir(this.dl("yunque_despide_" + estado.regadera)), this.paso("ir_tasador");
  }
  async ojoDeTasador() {
    estado.ocupado = !0, await this.ui.decir(this.dl("tasador_ojo"));
    let a = await this.ui.ojo_tasador(this.datos.rondas);
    a > 0 && this.ganar_monedas(a);
    let o = estado.frutos * 3;
    await this.ui.decir(this.dl("tasador_paga", {
      a,
      f: estado.frutos,
      p: o
    })), estado.frutos = 0, this.ganar_monedas(o), await this.ui.pregunta(this.tx("pregunta"), [["dura", this.tx("resp_dura"), "regadera_hierro", 3], ["bonita", this.tx("resp_bonita"), "regadera_reluciente", 3], ["amiga", this.tx("resp_amiga"), "yunque", 2]], "dura", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", estado.ojo_tasador = !0, this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(20, 150), ORO, 30), this.mundo.estallido(punto(20, 150), ORO_LUZ, 20), await esperar(1.4), estado.progreso = 70, estado.avisar(), await esperar(1.2), await this.ui.decir(this.dl("victoria_tasador")), this.mundo.huir_subeprecios(DERECHA), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await esperar(.7), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
