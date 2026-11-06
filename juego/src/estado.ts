// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

const CLAVE_GUARDADO = "valoria-partida";

export const ESTACIONES = ["Oto\xF1o", "Invierno", "Primavera", "Verano"];

export const ESTACIONES_CON_ARTICULO = ["el oto\xF1o", "el invierno", "la primavera", "el verano"];

const oyentesEstado = new Set();

function estadoInicial() {
  return {
    mision: 1,
    zona: "mercado",
    monedas: 0,
    brillo: 5,
    precio_pan: 3,
    estacion: 0,
    semillas: 0,
    frutos: 0,
    brotes: [],
    progreso: 0,
    progreso_valle: 0,
    progreso_ciudad: 0,
    progreso_torre: 0,
    progreso_reloj: 0,
    criaturas: [],
    arbol: 0,
    trocitos: {},
    patines: !1,
    pendulo: 0,
    maquina_apagada: !1,
    sonido: !0,
    tiene_chispin: !1,
    regadera: "",
    ojo_tasador: !1,
    gorro: !1,
    ocupado: !0,
    paso: "titulo"
  };
}

export const estado = {
  ...estadoInicial(),
  cambiado(i) {
    return oyentesEstado.add(i), () => oyentesEstado.delete(i);
  },
  avisar() {
    for (let i of oyentesEstado) i();
  },
  reiniciar() {
    let i = this.sonido;
    Object.assign(this, estadoInicial(), {
      sonido: i
    }), this.avisar();
  },
  brotes_aqui() {
    return this.brotes.filter(i => (i.zona || "mercado") === this.zona);
  },
  brote_en(i) {
    return this.brotes_aqui().find(a => a.celda.x === i.x && a.celda.y === i.y) || null;
  },
  plantar(i) {
    this.brotes.push({
      celda: {
        x: i.x,
        y: i.y
      },
      crece: 0,
      fruto: !1,
      cuantos: 1,
      zona: this.zona
    }), this.avisar();
  },
  frutos_listos() {
    return this.brotes_aqui().filter(i => i.fruto).length;
  },
  progreso_actual() {
    return {
      valle: this.progreso_valle,
      ciudad: this.progreso_ciudad,
      torre: this.progreso_torre,
      reloj: this.progreso_reloj
    }[this.zona] ?? this.progreso;
  },
  trocitos_de(i) {
    return this.trocitos[i] | 0;
  },
  guardar() {
    let i = {};
    for (let a of Object.keys(estadoInicial())) a !== "ocupado" && a !== "paso" && (i[a] = this[a]);
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify(i));
    } catch {}
  },
  cargar() {
    let i = null;
    try {
      i = JSON.parse(localStorage.getItem(CLAVE_GUARDADO) || "null");
    } catch {
      i = null;
    }
    if (!i || typeof i != "object" || (i.mision | 0) <= 1) return !1;
    Object.assign(this, estadoInicial(), i);
    for (let a of this.brotes) a.crece = 1;
    return this.ocupado = !0, this.avisar(), !0;
  },
  borrar_partida() {
    try {
      localStorage.removeItem(CLAVE_GUARDADO);
    } catch {}
  }
};
