// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { MisionBase, ORO, desplazar, objetivo, punto } from './base';
import { campo } from '../util/clases';

const Ya = 6;

const ta = 4;

const sa = ["fiel", "engranaje", "fachada"];

export const Mision08 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "investigados", new Set());
    campo(this, "bazarCerrado", !1);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_cuenta":
        return objetivo(3, 27, 25);
      case "investigar":
        {
          let o = sa.find(s => !this.investigados.has(s));
          if (!o) return null;
          let t = this.mundo.posiciones[o];
          return objetivo(t.x, t.y, 25);
        }
      case "ir_lupa":
        return objetivo(3, 7, 25);
    }
    return null;
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 14)), 0, -24), ORO, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("fachada_presume", {
      n: ta
    })), await this.ui.decir(this.dl("lupa_caso")), this.paso("ir_cuenta");
  }
  async npc(o) {
    if (o === "cuenta" && estado.paso === "ir_cuenta") return estado.ocupado = !0, await this.ui.decir(this.dl("cuenta_libros")), this.paso("investigar");
    if (estado.paso === "investigar" && sa.includes(o) && !this.investigados.has(o)) return this.investigar(o);
    if (o === "lupa" && estado.paso === "ir_lupa") return this.elegir();
    await this.charla(o);
  }
  async investigar(o) {
    estado.ocupado = !0, await this.ui.decir(this.dl("antes_" + o));
    let t = this.datos.pistas[o];
    if (await this.ui.pistas(o, t.titulo, t.icono, t.lista), this.investigados.add(o), this.investigados.size < sa.length) return await this.ui.decir(this.dl("faltan", {
      n: sa.length - this.investigados.size
    })), this.paso("investigar");
    let s = sa.map(r => {
      let l = this.datos.pistas[r];
      return [l.icono, l.corto, l.lista.map(c => !!c[3])];
    });
    await this.ui.cuaderno(this.tx("cuaderno_titulo"), [this.tx("col_clientes"), this.tx("col_producto"), this.tx("col_cuentas")], s, this.tx("cuaderno_frase")), await this.ui.decir(this.dl("a_lupa")), this.paso("ir_lupa");
  }
  async elegir() {
    estado.ocupado = !0, await this.ui.decir(this.dl(this.bazarCerrado ? "lupa_otra_vez" : "lupa_eliges"));
    let o = [["engranaje", this.tx("op_engranaje", {
      n: Ya
    }), "rueda", estado.monedas < Ya]];
    this.bazarCerrado || o.push(["bazar", this.tx("op_bazar", {
      n: ta
    }), "bazar", estado.monedas < ta]), o.push(["nada", this.tx("op_nada"), "mochila"]);
    let t = await this.ui.elegir("cuaderno", this.tx("elegir_titulo"), o);
    if (t === "bazar") return estado.monedas -= ta, estado.trocitos.bazar = 1, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), ORO, 16), await this.ui.decir(this.dl("bazar_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_bazar")), this.mundo.cerrar_bazar(!0), estado.trocitos.bazar = 0, estado.avisar(), this.ui.sonar("malo"), await this.ui.decir(this.dl("bazar_cierra", {
      n: ta
    })), this.bazarCerrado = !0, this.elegir();
    t === "engranaje" ? (estado.monedas -= Ya, estado.trocitos.engranaje = 1, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#e07b39", 16), await this.ui.decir(this.dl("engranaje_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_engranaje")), this.mundo.estallido(desplazar(this.mundo.pie(punto(2, 13)), 0, -10), ORO, 20), await this.ui.decir(this.dl("engranaje_mejora"))) : await this.ui.decir(this.dl("nada")), await this.ui.pregunta(this.tx("pregunta"), [["dentro", this.tx("resp_dentro"), "lupa_icono", 3], ["bonito", this.tx("resp_bonito"), "bazar", 3], ["barato", this.tx("resp_barato"), "moneda", 3]], "dentro", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(33, 180), ORO, 30), await esperar(1.4), estado.progreso_ciudad = 66, estado.avisar(), this.bazarCerrado && (this.mundo.cerrar_bazar(!1), await this.ui.decir(this.dl("bazar_repintado"))), await this.ui.decir(this.dl("victoria_lupa")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
