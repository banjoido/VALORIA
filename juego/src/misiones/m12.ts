// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ABAJO, MORADO, MisionBase, ORO, ORO_LUZ, desplazar, objetivo, punto } from './base';
import { campo } from '../util/clases';

export const Mision12 = class extends MisionBase {
  constructor() {
    super(...arguments);
    campo(this, "puerta", 1);
  }
  objetivo() {
    return estado.paso === "ir_cautela" ? objetivo(6, 12, 25) : estado.paso.startsWith("puerta_") ? objetivo(7, 13 + this.puerta * 4, 22) : estado.paso === "ir_reves" ? objetivo(9, 31, 25) : null;
  }
  puntos_control() {
    return ["ir_cautela", "puerta_1", "puerta_2", "puerta_3", "puerta_4", "ir_reves"];
  }
  preparar_punto(o) {
    // El Revés espera al fondo de la torre desde el principio. La puerta en
    // curso sale del nombre del paso («puerta_3» → 3; «ir_reves» → todas
    // abiertas) y las anteriores ya están abiertas.
    this.mundo.mover_npc("reves", punto(9, 31)), this.puerta = o === "ir_reves" ? 5 : o.startsWith("puerta_") ? +o.slice(7) : 1;
    for (let t = 1; t < this.puerta; t++) this.mundo.mostrar("puerta_" + t, !1);
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), await this.ui.decir(this.dl("reves_reto")), this.mundo.estallido(desplazar(this.mundo.pie(punto(9, 6)), 0, -12), MORADO, 16), this.mundo.mover_npc("reves", punto(9, 31)), this.paso("ir_cautela");
  }
  async npc(o) {
    if (o === "cautela" && estado.paso === "ir_cautela") return estado.ocupado = !0, await this.ui.decir(this.dl("cautela_hola")), await this.ui.lista("cautela", this.tx("lista_titulo"), [["donchollo", this.tx("lista_1")], ["cadena", this.tx("lista_2")], ["prisas", this.tx("lista_3")], ["bazar", this.tx("lista_4")]], this.tx("lista_frase")), await this.ui.decir(this.dl("cautela_abre")), this.paso("puerta_1");
    if (o === "puerta_" + this.puerta && estado.paso === o) return this.abrirPuerta();
    if (o === "reves" && estado.paso === "ir_reves") return this.final();
    if (o.startsWith("puerta_")) {
      estado.ocupado = !0, await this.ui.decir(this.dl("puerta_cerrada")), estado.ocupado = !1;
      return;
    }
    await this.charla(o);
  }
  async abrirPuerta() {
    estado.ocupado = !0;
    let o = this.datos.puertas[this.puerta - 1];
    await this.ui.decir(this.dl("antes_" + this.puerta));
    let t = await this.ui.elegir(o.icono, o.titulo, o.opciones),
      s = punto(7, 13 + this.puerta * 4);
    t === o.correcta ? (this.ui.sonar("acierto"), this.mundo.estallido(desplazar(this.mundo.pie(s), 0, -10), ORO_LUZ, 24), this.mundo.mostrar("puerta_" + this.puerta, !1), await this.ui.decir(this.dl("bien_" + this.puerta)), this.puerta += 1, this.paso(this.puerta <= 4 ? "puerta_" + this.puerta : "ir_reves")) : (this.ui.sonar("malo"), this.mundo.estallido(this.sobre_heroe(), "#e0503c", 18), await this.ui.decir(this.dl("trampa_" + this.puerta)), estado.ocupado = !1);
  }
  async final() {
    estado.ocupado = !0, await this.ui.decir(this.dl("reves_final")), await this.ui.pregunta(this.tx("pregunta"), [["evitar", this.tx("resp_evitar"), "reves", 3], ["listo", this.tx("resp_listo"), "moneda", 3], ["suerte", this.tx("resp_suerte"), "trocito", 3]], "evitar", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 340), ORO, 30), await esperar(1.4), this.mundo.iluminar(3, 22), this.mundo.estallido(punto(97, 150), ORO_LUZ, 40), await esperar(1.4), estado.progreso_torre = 100, estado.avisar(), await this.ui.decir(this.dl("torre_brilla")), this.mundo.huir("fachada", ABAJO), this.ui.sonar("malo"), await this.ui.decir(this.dl("villanos_huyen")), await esperar(1), this.mundo.mostrar("fachada", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin();
  }
};
