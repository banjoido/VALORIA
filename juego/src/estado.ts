// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

const CLAVE_GUARDADO = "valoria-partida";

export const ESTACIONES = ["Oto\xF1o", "Invierno", "Primavera", "Verano"];

export const ESTACIONES_CON_ARTICULO = ["el oto\xF1o", "el invierno", "la primavera", "el verano"];

const oyentesEstado = new Set();

// Guardado por pasos (ver docs/guardado.md).
// `ultimoGuardado` es la última partida escrita: siempre es una foto coherente
// (al empezar una misión o al llegar a uno de sus puntos de control).
let ultimoGuardado: string | null = null;

// Punto de control leído al cargar, pendiente de que la misión lo recoja.
let reanudacion: { mision: number; punto: string; celda: { x: number; y: number } | null; campos: Record<string, any> | null } | null = null;

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
    ultima_estacion_amasar: -1,
    ojo_tasador: !1,
    gorro: !1,
    // "chico" o "chica": el personaje elegido al empezar. Las partidas
    // guardadas antes de poder elegir no lo traen y se cargan como "chico".
    heroe: "chico",
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
    reanudacion = null;
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
  // Guarda la partida. Sin argumentos, al empezar una misión (o en modo libre):
  // al cargar se empieza la misión. Con `punto`, la misión ha llegado a uno de
  // sus puntos de control y al cargar se retoma desde ahí, con el héroe en `celda`
  // y los campos propios de la misión `campos` (si los necesita).
  guardar(punto = "", celda = null, campos = null) {
    let i = {};
    for (let a of Object.keys(estadoInicial())) a !== "ocupado" && a !== "paso" && (i[a] = this[a]);
    punto && (i.punto = punto, celda && (i.celda = {
      x: celda.x,
      y: celda.y
    }), campos && (i.campos = campos));
    ultimoGuardado = JSON.stringify(i);
    try {
      localStorage.setItem(CLAVE_GUARDADO, ultimoGuardado);
    } catch {}
  },
  // Al pasar a segundo plano (en el móvil, cerrar suele ser eso). A mitad de un
  // paso el estado puede estar a medias, así que se reescribe la última foto
  // coherente; en modo libre no hay misión en curso y se guarda tal cual.
  guardar_al_salir() {
    if (this.paso === "libre") return this.guardar();
    if (ultimoGuardado) try {
      localStorage.setItem(CLAVE_GUARDADO, ultimoGuardado);
    } catch {}
  },
  // Devuelve el punto de control cargado si es de la misión `n`, una sola vez.
  tomar_reanudacion(n) {
    let r = reanudacion;
    return reanudacion = null, r && r.mision === n ? r : null;
  },
  cargar() {
    let i = null;
    try {
      i = JSON.parse(localStorage.getItem(CLAVE_GUARDADO) || "null");
    } catch {
      i = null;
    }
    if (!i || typeof i != "object") return !1;
    let punto = typeof i.punto == "string" ? i.punto : "",
      celda = i.celda && typeof i.celda == "object" ? {
        x: i.celda.x | 0,
        y: i.celda.y | 0
      } : null,
      campos = punto && i.campos && typeof i.campos == "object" && !Array.isArray(i.campos) ? i.campos : null;
    if (delete i.punto, delete i.celda, delete i.campos, (i.mision | 0) <= 1 && !punto) return !1;
    Object.assign(this, estadoInicial(), i);
    for (let a of this.brotes) a.crece = 1;
    return reanudacion = punto ? {
      mision: this.mision,
      punto,
      celda,
      campos
    } : null, this.ocupado = !0, this.avisar(), !0;
  },
  borrar_partida() {
    ultimoGuardado = null;
    try {
      localStorage.removeItem(CLAVE_GUARDADO);
    } catch {}
  }
};
