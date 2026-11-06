// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { esperar } from '../ajustes';
import { estado } from '../estado';
import { ARRIBA, MORADO, MisionBase, ORO, ORO_LUZ, desplazar, objetivo, punto } from './base';
import { oa } from '../mundo/zonas';

export const Mision15 = class extends MisionBase {
  objetivo() {
    return estado.paso === "ir_maquina" ? objetivo(7, 30, 2) : null;
  }
  puntos_control() {
    // Solo antes de ir a la máquina. final() y victoria() van seguidos (trampas,
    // forja, máquina apagada, carta y fin): si se cierra ahí, se vuelve aquí,
    // con la máquina aún encendida. Tras el final se guarda sin punto
    // (main.ts) y el modo libre carga como siempre.
    return ["ir_maquina"];
  }
  async empezar() {
    estado.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(desplazar(this.mundo.pie(oa), 0, -40), MORADO, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("pendulo_maquina")), this.paso("ir_maquina");
  }
  llegada(a) {
    estado.paso === "ir_maquina" && a.y >= 28 && this.final();
  }
  async npc(a) {
    if (estado.paso === "ir_maquina" && a === "merma") return this.final();
    await this.charla(a);
  }
  async final() {
    estado.ocupado = !0, estado.paso = "final", this.ui.poner_mision(this.datos.misiones.final), this.mundo.mostrar("merma", !0), this.mundo.estallido(desplazar(this.mundo.pie(punto(7, 28)), 0, -14), MORADO, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("merma_habla"));
    for (let o of this.datos.trampas) {
      let t = o.villano;
      o.celda && this.mundo.mover_npc(t, punto(o.celda[0], o.celda[1])), this.mundo.mostrar(t, !0), this.mundo.estallido(punto(this.mundo.npcs[t].x, this.mundo.npcs[t].y - 12), MORADO, 14), this.ui.sonar("malo"), await this.ui.decir(this.dl(o.dialogo));
      let s = o.opciones.map(l => [l[0], l[1], l[2], 3]),
        r = !1;
      for (; !r;) r = await this.ui.pregunta(o.pregunta, s, o.correcta, o.bien, o.mal);
      this.mundo.estallido(punto(this.mundo.npcs[t].x, this.mundo.npcs[t].y - 12), ORO_LUZ, 20), this.ui.sonar("acierto"), await this.ui.decir(this.dl(o.ayuda)), this.mundo.huir(t, ARRIBA), await esperar(.7), this.mundo.mostrar(t, !1);
    }
    await this.ui.decir(this.dl("merma_furiosa")), await this.ui.decir(this.dl("pendulo_forja")), await this.ui.forja(this.datos.textos), await this.ui.decir(this.dl("merma_copia"));
    for (let o = 0; o < 4; o++) this.mundo.estallido(desplazar(this.mundo.pie(oa), Math.random() * 80 - 40, -10 - Math.random() * 50), "#d6d6de", 12), this.ui.sonar("fallo"), await esperar(.35);
    let a = !1;
    for (; !a;) a = await this.ui.pregunta(this.tx("pregunta"), [["unica", this.tx("resp_unica"), "moneda_estrella", 3], ["dorada", this.tx("resp_dorada"), "oro", 3], ["grande", this.tx("resp_grande"), "moneda", 3]], "unica", this.tx("fb_bien"), this.tx("fb_mal"));
    estado.maquina_apagada = !0, this.mundo.apagar_maquina(), estado.avisar(), this.mundo.aplicarBrillo(), this.mundo.estallido(desplazar(this.mundo.pie(punto(7, 28)), 0, -14), MORADO, 50), this.mundo.mostrar("merma", !1), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("maquina_apagada")), this.victoria();
  }
  async victoria() {
    estado.ocupado = !0, estado.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 7), this.mundo.estallido(punto(97, 340), ORO, 40), await esperar(1.2), this.mundo.iluminar(3, 30), this.ui.sonar("fanfarria"), this.mundo.estallido(punto(97, 150), ORO_LUZ, 50), await esperar(1.6), estado.progreso_reloj = 100, estado.pendulo = 0, estado.avisar(), await this.ui.decir(this.dl("todo_brilla")), await this.ui.carta(this.tx("carta_final"), !1), await this.ui.victoria(this.datos.textos, "Ver el final"), await this.ui.fin_del_juego(this.datos.textos), this.fin();
  }
};
