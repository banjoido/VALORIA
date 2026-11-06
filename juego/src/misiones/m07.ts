// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { MisionBase, ORO, ORO_LUZ, desplazar, objetivo, punto } from './base';

const ka = 6;

const Za = 2;

export const Mision07 = class extends MisionBase {
  objetivo() {
    switch (estado.paso) {
      case "ir_ciudad":
        return objetivo(7, 32, 2);
      case "ir_lupa":
        return objetivo(3, 7, 25);
      case "ir_fiel":
      case "volver_fiel":
        return objetivo(11, 7, 25);
      case "ir_cuenta":
        return objetivo(3, 27, 25);
    }
    return null;
  }
  puntos_control() {
    // «ir_ciudad» es aún en el valle. Prisas huye del bazar antes de «ir_lupa»
    // y queda oculto, como al cargar la ciudad.
    return ["ir_ciudad", "ir_lupa", "ir_fiel", "ir_cuenta", "volver_fiel"];
  }
  async empezar() {
    estado.ocupado = !0, estado.zona === "valle" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_ciudad")) : this.enCiudad();
  }
  async llegada(a) {
    estado.paso === "ir_ciudad" && estado.zona === "valle" && a.y >= 31 && (estado.ocupado = !0, estado.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("ciudad", punto(7, 1))), estado.guardar(), this.enCiudad());
  }
  async enCiudad() {
    estado.ocupado = !0, await this.ui.decir(this.dl("llegada_ciudad")), this.mundo.mostrar("prisas", !0);
    let a = this.mundo.pie(punto(8, 9));
    this.mundo.npcs.prisas.x = a.x, this.mundo.npcs.prisas.y = a.y, this.mundo.huir("prisas", punto(.707, .707)), this.mundo.npcs.prisas.x = a.x, this.mundo.npcs.prisas.y = a.y, this.ui.sonar("malo"), await this.ui.decir(this.dl("prisas_bazar")), this.mundo.mostrar("prisas", !1), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 14)), 0, -20), ORO, 24), await this.ui.decir(this.dl("lupa_llama")), this.paso("ir_lupa");
  }
  async npc(a) {
    let o = estado.paso;
    if (a === "lupa" && o === "ir_lupa") return estado.ocupado = !0, await this.ui.decir(this.dl("lupa_hola")), this.paso("ir_fiel");
    if (a === "fiel" && o === "ir_fiel") return this.fielTurno();
    if (a === "cuenta" && o === "ir_cuenta") return this.cuenta();
    if (a === "fiel" && o === "volver_fiel") return this.fielTrocito();
    await this.charla(a);
  }
  async fielTurno() {
    estado.ocupado = !0, await this.ui.decir(this.dl("fiel_hola"));
    let a = await this.ui.amasar("fiel", this.tx("coser_titulo"), "zapato", this.tx("coser_boton"));
    this.ganar_monedas(a), await this.ui.decir(this.dl("fiel_paga", {
      n: a
    })), this.paso("ir_cuenta");
  }
  async cuenta() {
    estado.ocupado = !0, await this.ui.decir(this.dl("cuenta_hola")), await this.ui.lista("cuenta", this.tx("libro_titulo"), [["moneda", this.tx("libro_entra")], ["zapato", this.tx("libro_cuero")], ["libro", this.tx("libro_alquiler")], ["trocito", this.tx("libro_queda")]], this.tx("libro_frase")), await this.ui.pregunta(this.tx("pregunta_libro"), [["cuatro", this.tx("r_cuatro"), "moneda", 3], ["diez", this.tx("r_diez"), "moneda", 3], ["seis", this.tx("r_seis"), "moneda", 3]], "cuatro", this.tx("r_bien"), this.tx("r_mal")), await this.ui.decir(this.dl("cuenta_manda")), this.paso("volver_fiel");
  }
  async fielTrocito() {
    estado.ocupado = !0, await this.ui.decir(this.dl("fiel_maquina"));
    let o = (await this.ui.elegir("trocito", this.tx("trocito_titulo"), [["comprar", this.tx("comprar_trocito", {
      n: ka
    }), "trocito", estado.monedas < ka], ["no", this.tx("ahora_no"), "mochila"]])) === "comprar";
    o ? (estado.monedas -= ka, estado.trocitos.fiel = 1, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#d9543f", 14), await this.ui.decir(this.dl("comprado"))) : await this.ui.decir(this.dl("no_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_maquina")), this.mundo.estallido(desplazar(this.mundo.pie(punto(12, 5)), 0, -10), ORO, 20), await this.ui.decir(this.dl("maquina_nueva")), o ? (this.ganar_monedas(Za), await this.ui.decir(this.dl("fiel_reparte", {
      n: Za
    }))) : await this.ui.decir(this.dl("cuenta_cobra", {
      n: Za
    })), await this.ui.decir(this.dl("lupa_nombre")), await this.ui.pregunta(this.tx("pregunta"), [["duena", this.tx("resp_duena"), "trocito", 3], ["cliente", this.tx("resp_cliente"), "zapato", 3], ["prestar", this.tx("resp_prestar"), "moneda", 3]], "duena", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(158, 70), ORO, 30), this.mundo.estallido(punto(158, 70), ORO_LUZ, 20), await esperar(1.4), estado.progreso_ciudad = 33, estado.avisar(), await this.ui.decir(this.dl("victoria_fiel")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin();
  }
};
