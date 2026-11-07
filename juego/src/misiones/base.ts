// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { rellenar } from '../ajustes';
import { estado } from '../estado';
import { LOSETA, Mapa } from '../mundo/mapas';
import * as vida from '../reino/vida';

export const ORO = "#f6c945";

export const ORO_LUZ = "#fff1a8";

export const APAGADO = "#4a4060";

export const VERDE = "#7cc05a";

export const MORADO = "#9b6ccc";

export const VERDE_CLARO = "#9ad86f";

export const ROJO = "#e0503c";

export const AZUL = "#9fd6f5";

export const punto = (i, a) => ({
  x: i,
  y: a
});

export const objetivo = (i, a, o) => ({
  x: i,
  y: a,
  z: o
});

export const desplazar = (i, a, o) => ({
  x: i.x + a,
  y: i.y + o
});

export const ARRIBA = punto(0, -1);

export const ABAJO = punto(0, 1);

export const DERECHA = punto(1, 0);

export const IZQUIERDA = punto(-1, 0);

export const MisionBase = class {
  constructor(a, o) {
    this.numero = a, this.datos = o;
  }
  async jugar(a, o) {
    // Sprint 3 (8.1): la misión se expone en interfaz.mision_actual y, si el héroe
    // está de viaje fuera de su zona, no recibe eventos ni pone flecha.
    this.mundo = a, this.ui = o, o.mision_actual = this, this.zona_mision = estado.zona, a.objetivo_fn = () => vida.objetivo() || (vida.lejos() ? null : this.objetivo());
    let aqui = () => !this.zona_mision || estado.zona === this.zona_mision,
      t = [a.on("npc", r => aqui() ? this.npc(r) : vida.npc(r)), a.on("parcela", r => aqui() ? this.parcela(r) : vida.parcela(r)), a.on("lugar", r => aqui() && this.lugar(r)), a.on("llegada", r => aqui() && this.llegada(r))],
      s = new Promise(r => {
        this.terminar = r;
      }),
      reanudar = estado.tomar_reanudacion(this.numero);
    reanudar && this.puntos_control().includes(reanudar.punto) ? this.reanudar(reanudar) : this.empezar(), await s, t.forEach(r => r()), a.objetivo_fn = null, o.mision_actual === this && (o.mision_actual = null);
  }
  // Pasos desde los que la misión puede retomarse tras cerrar el juego (ver
  // docs/guardado.md). Al llegar a uno se guarda la partida. Una misión que no
  // declara ninguno empieza desde el principio, como siempre.
  puntos_control(): string[] {
    return [];
  }
  // Deja el mundo como estaba al llegar al punto de control `punto`: lo que
  // está en `estado` ya viene cargado; aquí va lo que solo vive en el mundo
  // (personajes que aparecen o desaparecen, luces...).
  preparar_punto(punto: string) {}
  // Campos propios de la misión (this.cosecha, this.ventas...) que hacen falta
  // para seguir desde un punto de control. Se guardan con él y, al retomar,
  // cargar_campos() los recibe tal cual se leyeron (hay que comprobarlos).
  campos_punto(): Record<string, unknown> | null {
    return null;
  }
  cargar_campos(campos: Record<string, any>) {}
  reanudar({
    punto,
    celda,
    campos
  }) {
    campos && this.cargar_campos(campos), this.preparar_punto(punto), this.mundo.colocar_heroe(celda), this.paso(punto);
  }
  fin() {
    this.terminar();
  }
  empezar() {}
  async npc(a) {
    await this.charla(a);
  }
  async parcela(a) {
    let o = estado.brote_en(a);
    await this.ui.decir([["chispin", o ? "Este brote crece poco a poco." : "Un buen hueco para plantar\u2026 cuando tengamos semillas."]]), estado.ocupado = !1;
  }
  lugar() {}
  llegada() {}
  objetivo() {
    return null;
  }
  dl(a, o = {}) {
    return this.datos.dialogos[a].map(([t, s]) => [t, rellenar(s, o)]);
  }
  tx(a, o = {}) {
    return rellenar(this.datos.textos[a], o);
  }
  paso(a) {
    this.zona_mision = estado.zona, this.puntos_control().includes(a) && estado.guardar(a, this.mundo.celda_heroe(), this.campos_punto()), estado.paso = a, estado.ocupado = !1, this.ui.poner_mision(this.datos.misiones[a] || {
      valle: "Valle de la Nieve",
      ciudad: "Ciudad de las Empresas",
      torre: "Torre del Rev\xE9s",
      reloj: "Gran Reloj"
    }[estado.zona] || "Mercado del Pueblo"), vida.al_paso(this);
  }
  // Vecinos que la misión no necesita: encargo, puesto, trabajo o una frase según
  // el progreso (reino/vida.ts, 8.2). La charla de la misión entra en la rotación.
  async charla(a) {
    await vida.npc(a), estado.ocupado = !1;
  }
  siguiente_estacion() {
    return (estado.estacion + 1) % 4;
  }
  plantar(a) {
    estado.plantar(a), this.mundo.estallido(punto(a.x * LOSETA + 6.5, a.y * LOSETA + 6), VERDE_CLARO, 10);
  }
  parcela_libre() {
    return Mapa.parcelas().find(a => !estado.brote_en(a)) || null;
  }
  primer_fruto() {
    let a = estado.brotes_aqui().find(o => o.fruto);
    return a ? objetivo(a.celda.x, a.celda.y, 2) : null;
  }
  sobre_heroe() {
    return this.mundo.sobre_heroe();
  }
  ganar_monedas(a) {
    estado.monedas += a, estado.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), ORO, 10);
  }
  cosechar(a) {
    return a.fruto = !1, estado.frutos += a.cuantos | 0, this.ui.sonar("moneda"), this.mundo.estallido(punto(a.celda.x * LOSETA + 6.5, a.celda.y * LOSETA + 4), ROJO, 8), estado.avisar(), estado.frutos_listos() === 0;
  }
};
