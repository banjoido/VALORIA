// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { DERECHA, MisionBase, ORO, ORO_LUZ, ROJO, VERDE_CLARO, desplazar, objetivo, punto } from './base';
import { C } from '../mundo/zonas';
import { campo } from '../util/clases';

const $a = [0, 3, 5, 8, 12];

const Ni = [0, 2, 5, 11, 24];

export const Mision05 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "estacionArbol", 0);
    campo(this, "vioRaiz", !1);
    campo(this, "vioAnillos", !1);
    campo(this, "ventas", 0);
  }
  objetivo() {
    switch (estado.paso) {
      case "ir_escarcha":
        return objetivo(4, 12, 25);
      case "plantar_arbol":
        return objetivo(10, 11, 2);
      case "cosechar_arbol":
        return objetivo(10, 11, 36);
      case "ir_raiz":
        return objetivo(5, 16, 25);
      case "ir_anillos":
        return objetivo(9, 16, 25);
      case "ir_copo":
        return objetivo(11, 8, 25);
    }
    return null;
  }
  puntos_control() {
    // La Escarcha ya la muestra Mundo.restaurar(5). Prisas está oculto en
    // todos estos pasos (huye antes de cada uno).
    return ["ir_escarcha", "plantar_arbol", "ir_raiz", "ir_anillos", "cosechar_arbol", "ir_copo"];
  }
  campos_punto() {
    return {
      estacionArbol: this.estacionArbol,
      vioRaiz: this.vioRaiz,
      vioAnillos: this.vioAnillos,
      ventas: this.ventas
    };
  }
  cargar_campos(o) {
    this.estacionArbol = Math.max(0, Math.min(4, o.estacionArbol | 0)), this.vioRaiz = !!o.vioRaiz, this.vioAnillos = !!o.vioAnillos, this.ventas = Math.max(0, o.ventas | 0);
  }
  async empezar() {
    estado.ocupado = !0, estado.arbol = 0, estado.avisar(), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("escarcha", !0), await this.ui.decir(this.dl("llega_escarcha")), this.paso("ir_escarcha");
  }
  async npc(o) {
    let t = estado.paso;
    if (o === "escarcha" && t === "ir_escarcha") return this.escarcha();
    if (o === "raiz" && t === "ir_raiz") return this.raiz();
    if (o === "anillos" && t === "ir_anillos") return this.anillos();
    if (o === "copo" && t === "ir_copo") return this.copo();
    await this.charla(o);
  }
  async escarcha() {
    estado.ocupado = !0, await this.ui.decir(this.dl("escarcha_hola")), await this.ui.pregunta(this.tx("recuerdo"), [["tres", this.tx("r_tres"), "semillas", 3], ["seis", this.tx("r_seis"), "huerto", 3], ["cero", this.tx("r_cero"), "moneda", 3]], "seis", this.tx("r_bien"), this.tx("r_mal")), await this.ui.decir(this.dl("escarcha_semilla")), this.paso("plantar_arbol");
  }
  async lugar(o) {
    o.x !== C.x || o.y !== C.y || (estado.paso === "plantar_arbol" ? (estado.ocupado = !0, estado.arbol = 1, estado.avisar(), this.ui.sonar("plantar"), this.mundo.estallido(desplazar(this.mundo.pie(C), 0, -6), VERDE_CLARO, 16), this.estacionArbol = 0, await this.ui.decir(this.dl(this.ventas === 0 ? "arbol_plantado" : "arbol_otra_vez")), this.estacion()) : estado.paso === "cosechar_arbol" && this.cosechaGrande());
  }
  async estacion() {
    if (this.estacionArbol += 1, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_arbol_" + this.estacionArbol)), estado.arbol = Math.min(4, Math.max(1, this.estacionArbol)), estado.avisar(), this.mundo.estallido(desplazar(this.mundo.pie(C), 0, -16), VERDE_CLARO, 14), this.estacionArbol >= 4) {
      await this.ui.decir(this.dl("arbol_grande")), this.paso("cosechar_arbol");
      return;
    }
    // Prisas solo hace su oferta en el primer árbol: si el niño ya le vendió uno,
    // el segundo intento es para ver crecer el árbol, y vender no puede dar monedas sin fin.
    if (this.ventas > 0) {
      this.estacionArbol === 1 && !this.vioRaiz ? (await this.ui.decir(this.dl("raiz_llama")), this.paso("ir_raiz")) : this.estacionArbol === 2 && !this.vioAnillos ? (await this.ui.decir(this.dl("anillos_llama")), this.paso("ir_anillos")) : await this.estacion();
      return;
    }
    if (this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(desplazar(this.mundo.pie(punto(9, 12)), 0, -12), "#e0503c", 16), await this.ui.decir(this.dl("prisas_oferta_" + this.estacionArbol, {
      n: $a[this.estacionArbol]
    })), (await this.ui.elegir("prisas", this.tx("oferta_titulo"), [["esperar", this.tx("esperar"), "reloj"], ["vender", this.tx("vender", {
      n: $a[this.estacionArbol]
    }), "moneda"]])) === "vender") {
      await this.vendido();
      return;
    }
    await this.ui.decir(this.dl("prisas_rabia")), this.mundo.huir("prisas", DERECHA), await esperar(1), this.mundo.mostrar("prisas", !1), this.estacionArbol === 1 && !this.vioRaiz ? (await this.ui.decir(this.dl("raiz_llama")), this.paso("ir_raiz")) : this.estacionArbol === 2 && !this.vioAnillos ? (await this.ui.decir(this.dl("anillos_llama")), this.paso("ir_anillos")) : this.estacion();
  }
  async vendido() {
    this.ventas += 1;
    let o = $a[this.estacionArbol];
    this.ganar_monedas(o), estado.arbol = 0, estado.avisar(), this.mundo.estallido(desplazar(this.mundo.pie(C), 0, -8), "#8a6a4a", 18), await this.ui.decir(this.dl("prisas_corta", {
      n: o
    })), this.mundo.huir("prisas", DERECHA), await esperar(1), this.mundo.mostrar("prisas", !1), await this.ui.tabla("escarcha", this.tx("si_esperas"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [["prisas", this.tx("fila_prisas"), [3, 5, 8, 12], "#e0503c"], ["arbol_4", this.tx("fila_arbol"), [2, 5, 11, 24], VERDE_CLARO]], this.tx("si_esperas_frase")), await this.ui.decir(this.dl("escarcha_otra")), this.paso("plantar_arbol");
  }
  async raiz() {
    estado.ocupado = !0, this.vioRaiz = !0, await this.ui.decir(this.dl("raiz_hola")), await this.estacion();
  }
  async anillos() {
    estado.ocupado = !0, this.vioAnillos = !0, await this.ui.decir(this.dl("anillos_hola")), await this.ui.lista("anillos", this.tx("anillos_titulo"), [["arbol_1", this.tx("anillo_1")], ["arbol_2", this.tx("anillo_2")], ["arbol_3", this.tx("anillo_3")], ["arbol_4", this.tx("anillo_4")]], this.tx("anillos_frase")), await this.estacion();
  }
  async cosechaGrande() {
    estado.ocupado = !0, estado.frutos += Ni[4], estado.avisar(), this.ui.sonar("fanfarria");
    for (let o = 0; o < 3; o++) this.mundo.estallido(desplazar(this.mundo.pie(C), Math.random() * 16 - 8, -22), ROJO, 14);
    await this.ui.decir(this.dl("cosecha_grande", {
      n: Ni[4]
    })), await this.ui.tabla("copo", this.tx("comparar_titulo"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [["prisas", this.tx("fila_prisas"), [3, 5, 8, 12], "#e0503c"], ["arbol_4", this.tx("fila_arbol"), [2, 5, 11, 24], VERDE_CLARO]], this.tx("comparar_frase")), await this.ui.decir(this.dl("copo_llama")), this.paso("ir_copo");
  }
  async copo() {
    estado.ocupado = !0, await this.ui.decir(this.dl("copo_medalla")), await this.ui.pregunta(this.tx("pregunta"), [["tiempo", this.tx("resp_tiempo"), "reloj", 3], ["rapido", this.tx("resp_rapido"), "moneda", 3], ["suerte", this.tx("resp_suerte"), "fruto", 3]], "tiempo", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(65, 200), ORO, 30), this.mundo.estallido(punto(130, 150), ORO_LUZ, 20), await esperar(1.4), estado.progreso_valle = 66, estado.avisar(), await this.ui.decir(this.dl("victoria_valle")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
