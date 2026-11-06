// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ABAJO, MORADO, MisionBase, ORO, ORO_LUZ, VERDE_CLARO, desplazar, objetivo, punto } from './base';

const Ei = {
  fiel: [6, 7, 8, 9, 10],
  engranaje: [6, 6, 8, 11, 14],
  horno: [6, 6, 7, 8, 9],
  fragua: [6, 7, 7, 8, 9],
  relampago: [6, 9, 12, 3, 0]
};

const Gr = {
  fiel: 8,
  engranaje: 6,
  horno: 4,
  fragua: 4,
  relampago: 0
};

const Pi = {
  fiel: "zapato",
  engranaje: "rueda",
  horno: "pan",
  fragua: "yunque",
  relampago: "relampago"
};

export const Mision09 = class extends MisionBase {
  objetivo() {
    switch (estado.paso) {
      case "ir_lupa":
      case "volver_lupa":
        return objetivo(3, 7, 25);
      case "ir_plaza":
        return objetivo(7, 15, 2);
    }
    return null;
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 24)), 0, -12), ORO, 20), await this.ui.decir(this.dl("prisas_relampago")), await this.ui.decir(this.dl("chispin_lupa")), this.paso("ir_lupa");
  }
  async npc(a) {
    if (a === "lupa" && estado.paso === "ir_lupa") return estado.ocupado = !0, await this.ui.decir(this.dl("lupa_colas")), this.paso("ir_plaza");
    if (a === "lupa" && estado.paso === "volver_lupa") return this.loQueConoces();
    await this.charla(a);
  }
  async llegada(a) {
    estado.paso === "ir_plaza" && a.y >= 14 && a.y <= 20 && a.x >= 3 && a.x <= 11 && (estado.ocupado = !0, estado.paso = "plaza", await this.ui.decir(this.dl("plaza_colas")), this.paso("volver_lupa"));
  }
  async loQueConoces() {
    estado.ocupado = !0, await this.ui.decir(this.dl("lupa_conoces"));
    for (let o of ["horno", "fragua", "relampago"]) {
      let t = this.datos.explicar[o];
      await this.ui.pregunta(t.pregunta, t.opciones.map(s => [s[0], s[1], Pi[o], 3]), t.correcta, t.bien, t.mal);
    }
    await this.ui.decir(this.dl("lupa_regla"));
    let a = await this.ui.presupuesto(estado.monedas, this.datos.tienda, this.tx("tienda_titulo"));
    for (let o of this.datos.tienda) a.includes(o.id) && (estado.monedas -= +o.precio, estado.trocitos[o.id] = estado.trocitos_de(o.id) + 1);
    estado.avisar(), a.length && (this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), ORO, 14)), await this.ui.decir(this.dl(a.length ? a.includes("relampago") ? "compras_relampago" : "compras_buenas" : "compras_ninguna")), await this.estaciones();
  }
  mios() {
    return ["fiel", "engranaje", "horno", "fragua", "relampago"].filter(a => estado.trocitos_de(a) > 0);
  }
  async estaciones() {
    for (let r = 1; r <= 4; r++) await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_" + r)), r === 2 ? (this.mundo.mostrar("prisas", !0), await this.ui.decir(this.dl("relampago_sube"))) : r === 3 ? (this.ui.sonar("malo"), await this.ui.decir(this.dl("relampago_cae"))) : r === 4 && (await this.ui.decir(this.dl("relampago_cierra")), this.mundo.huir("prisas", ABAJO), await esperar(1), this.mundo.mostrar("prisas", !1));
    let a = this.datos.nombres,
      o = this.mios(),
      t = o.map(r => [Pi[r], a[r], Ei[r], r === "relampago" ? "#e0503c" : VERDE_CLARO]);
    o.includes("relampago") || t.push(["relampago", a.relampago, Ei.relampago, "#e0503c"]), await this.ui.tabla("lupa", this.tx("tabla_titulo"), ["Hoy", "1\xAA", "2\xAA", "3\xAA", "4\xAA"], t, this.tx("tabla_frase"));
    let s = o.reduce((r, l) => r + Gr[l], 0);
    s > 0 && (this.ganar_monedas(s), await this.ui.decir(this.dl("reparto", {
      n: s
    }))), estado.criaturas.push("repartija"), estado.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), MORADO, 24), await this.ui.decir(this.dl(o.length >= 2 ? "repartija_varios" : "repartija_uno")), await this.ui.pregunta(this.tx("pregunta"), [["conozco", this.tx("resp_conozco"), "lupa_icono", 3], ["sube", this.tx("resp_sube"), "relampago", 3], ["brilla", this.tx("resp_brilla"), "bazar", 3]], "conozco", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(33, 320), ORO, 30), await esperar(1.4), await this.ui.decir(this.dl("victoria_cuenta")), this.mundo.iluminar(3, 22), this.mundo.apagar_bazar(), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 220), ORO_LUZ, 40), await esperar(1.6), estado.progreso_ciudad = 100, estado.avisar(), await this.ui.decir(this.dl("ciudad_brilla")), this.mundo.huir("fachada", ABAJO), this.ui.sonar("malo"), await this.ui.decir(this.dl("fachada_huye")), await esperar(1.2), this.mundo.mostrar("fachada", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin();
  }
};
