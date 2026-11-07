// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { ajustes, esperar, rellenarGenero } from '../ajustes';
import { buffersAudio, contextoAudio, iniciarAudio, vozEspanol } from '../audio';
import { ESTACIONES_CON_ARTICULO, estado } from '../estado';
import { PERSONAJES } from '../personajes';
import * as reglas from '../reino/reglas';
import * as tiempo from '../reino/tiempo';
import { efectos_noche } from '../reino/acciones';
import { TX_HUERTO, NOMBRE_META, th } from '../textos/huerto';

const oyentesVista = new Set();

export let vista = {
  mision: "",
  dialogo: null,
  capa: null,
  noche: null,
  avisos: [],
  version: 0
};

function actualizarVista(i) {
  vista = {
    ...vista,
    ...i,
    version: vista.version + 1
  };
  for (let a of oyentesVista) a();
}

export const suscribirVista = i => (oyentesVista.add(i), () => oyentesVista.delete(i));

estado.cambiado(() => actualizarVista({}));

// Avisos del reino (los brotes de la historia) y meta de ahorro alcanzada.
let metaAntes = "";
estado.cambiado(() => {
  if (estado.paso === "titulo") return;
  for (let a of reglas.tomar_avisos()) interfaz.aviso(a.texto, a.icono);
  let m = meta_actual(),
    clave = m && estado.monedas >= m.precio ? m.id + ":" + m.precio : "";
  clave && clave !== metaAntes && metaAntes !== "" && interfaz.aviso(th("meta_lista", { meta: m.nombre }), "hucha");
  metaAntes = clave || "-";
});

// Meta de ahorro de la Mochila (6.9): la elegida, o la más barata.
export function meta_actual() {
  let lista = reglas.metas();
  if (!lista.length) return null;
  let m = lista.find(l => l.id === estado.meta) || lista[0],
    o = reglas.obra("mercado");
  return { ...m, nombre: rellenarGenero(NOMBRE_META[m.id] || m.id).replace("{e}", o ? String(o.etapa + 1) : "") };
}

// Una espera que un toque puede acortar (la noche y los viajes se saltan tocando).
let despertar = null,
  saltada = !1;
function esperarSaltable(s) {
  return saltada ? Promise.resolve() : new Promise(a => {
    let o = setTimeout(a, s * 1e3 / ajustes.velocidad);
    despertar = () => (clearTimeout(o), a());
  });
}

let idAviso = 0;

let Va = [];

let Oa = null;

let qr = 0;

export let interfaz = {
  get vista() {
    return vista;
  },
  textos_carta: "",
  viaje_pedido: null,
  poner_mision(i) {
    actualizarVista({
      mision: i
    });
  },
  decir(i) {
    return !i || !i.length ? Promise.resolve() : (estado.ocupado = !0, Va = rellenarGenero(i), new Promise(a => {
      Oa = a, this.siguienteLinea();
    }));
  },
  siguienteLinea() {
    if (!Va.length) {
      this.callar(), actualizarVista({
        dialogo: null
      });
      let o = Oa;
      Oa = null, o && o();
      return;
    }
    let [i, a] = Va.shift();
    actualizarVista({
      dialogo: {
        quien: i,
        texto: a,
        inicio: performance.now(),
        completo: !1
      }
    }), this.hablar(a, i);
  },
  avanzar() {
    let i = vista.dialogo;
    if (!i) return;
    let a = (performance.now() - i.inicio) / 24 * ajustes.velocidad;
    if (!i.completo && a < i.texto.length) {
      actualizarVista({
        dialogo: {
          ...i,
          completo: !0
        }
      });
      return;
    }
    this.sonar("siguiente"), this.siguienteLinea();
  },
  hablar(i, a) {
    if (!(!estado.sonido || ajustes.velocidad > 1)) try {
      speechSynthesis.cancel();
      let o = new SpeechSynthesisUtterance(rellenarGenero(i).replace(/…/g, ".").replace(/[¡¿]/g, ""));
      o.lang = "es-ES", vozEspanol && (o.voice = vozEspanol);
      let t = PERSONAJES[a] || [0, 0, 1, 1];
      o.pitch = Math.min(2, t[2]), o.rate = t[3], speechSynthesis.speak(o);
    } catch {}
  },
  callar() {
    try {
      speechSynthesis.cancel();
    } catch {}
  },
  sonar(i, tono = 1) {
    if (!(!estado.sonido || !contextoAudio || !buffersAudio[i])) try {
      let a = contextoAudio.createBufferSource();
      a.buffer = buffersAudio[i], a.playbackRate.value = tono, a.connect(contextoAudio.destination), a.start();
    } catch {}
  },
  // Un toque en la pantalla de noche o de viaje la acorta (fundido de 0,2 s).
  saltar_noche() {
    !vista.noche || saltada || (saltada = !0, this.sonar("siguiente"), actualizarVista({
      noche: {
        ...vista.noche,
        rapido: !0
      }
    }), despertar && despertar());
  },
  // Tira de 3 s bajo el marcador: ni bloquea ni pide toque (10.4).
  aviso(texto, icono = "") {
    let a = {
      id: ++idAviso,
      texto: rellenarGenero(texto),
      icono
    };
    actualizarVista({
      avisos: [...vista.avisos, a].slice(-3)
    }), setTimeout(() => actualizarVista({
      avisos: vista.avisos.filter(o => o.id !== a.id)
    }), 3e3);
  },
  // Puesto de un vecino (10.1). Devuelve al cerrar; deja `ocupado` como estaba.
  async puesto(vecino, frase = "") {
    let a = estado.ocupado;
    await this.abrir("puesto", {
      vecino,
      frase
    }), estado.ocupado = a, estado.avisar();
  },
  async obra() {
    let a = estado.ocupado;
    await this.abrir("obra", {}), estado.ocupado = a, estado.avisar();
  },
  // «¡Buenos días!» (10.3) con el resumen de reino.al_abrir().
  async buenos_dias(resumen) {
    let a = estado.ocupado;
    await this.abrir("buenos_dias", {
      resumen
    }), estado.ocupado = a, estado.avisar();
  },
  // Siesta (5.1): una noche del reino, 2 por día real.
  async siesta() {
    if (!tiempo.usar_siesta()) return !1;
    return await this.pasar_noche((estado.estacion + 1) % 4, TX_HUERTO.noche_siesta), !0;
  },
  alternar_sonido() {
    iniciarAudio(), estado.sonido = !estado.sonido, estado.sonido || this.callar(), estado.avisar();
  },
  // Una noche del reino en todos los casos (5.1): justo después de cambiar la
  // estación, reino.noche(). Lo que trae la noche se enseña al acabar.
  async pasar_noche(i, a) {
    saltada = !1, estado.ocupado = !0, actualizarVista({
      noche: {
        titulo: "Pasa la noche\u2026",
        sub: "",
        opaco: !0
      }
    }), await esperarSaltable(.9), estado.estacion = i;
    let r = tiempo.noche();
    estado.avisar(), actualizarVista({
      noche: {
        titulo: "Llega " + ESTACIONES_CON_ARTICULO[i],
        sub: a,
        opaco: !0,
        rapido: saltada
      }
    }), await esperarSaltable(1.6), actualizarVista({
      noche: {
        ...vista.noche,
        opaco: !1
      }
    }), await esperar(saltada ? .2 : .5), actualizarVista({
      noche: null
    }), saltada = !1, despertar = null, efectos_noche(r);
  },
  async viajar(i, a, o) {
    saltada = !1, estado.ocupado = !0, actualizarVista({
      noche: {
        titulo: "",
        sub: "",
        opaco: !0,
        viaje: !0
      }
    }), await esperarSaltable(.6), o(), actualizarVista({
      noche: {
        titulo: i,
        sub: a,
        opaco: !0,
        viaje: !0,
        rapido: saltada
      }
    }), await esperarSaltable(1.8), actualizarVista({
      noche: {
        ...vista.noche,
        opaco: !1
      }
    }), await esperar(saltada ? .2 : .6), actualizarVista({
      noche: null
    }), saltada = !1, despertar = null;
  },
  abrir(i, a = {}) {
    return estado.ocupado = !0, new Promise(o => {
      let t = {
        id: ++qr,
        tipo: i,
        ...rellenarGenero(a),
        responder: s => {
          vista.capa === t && actualizarVista({
            capa: null
          }), this.callar(), o(s);
        }
      };
      actualizarVista({
        capa: t
      });
    });
  },
  pantalla_titulo(i, a) {
    return this.abrir("titulo", {
      hay: i,
      mision: a
    });
  },
  // Partida nueva: el jugador elige su personaje. Devuelve "chico" o "chica".
  elegir_heroe() {
    return this.abrir("elegir_heroe");
  },
  carta(i, a) {
    return a && this.hablar("Querid{o} {nieto}. " + i, "abuelo"), this.abrir("carta", {
      texto: i,
      primera: a
    });
  },
  amasar(i = "hogaza", a = "\xA1A amasar!", o = "pan", t = "\xA1Amasar!") {
    return this.abrir("amasar", {
      quien: i,
      titulo: a,
      icono: o,
      accion: t
    });
  },
  reto(i) {
    return this.abrir("reto", {
      monedas: i
    });
  },
  resultado(i, a, o, t, s, r) {
    return this.hablar(r, "chispin"), this.abrir("resultado", {
      icono: i,
      titulo: a,
      texto: o,
      etiqueta: t,
      colores: s,
      frase: r
    });
  },
  elegir(i, a, o) {
    return this.abrir("elegir", {
      icono: i,
      titulo: a,
      opciones: o
    });
  },
  pregunta(i, a, o, t, s) {
    this.hablar(i, "chispin");
    let r = [...a].sort(() => Math.random() - .5);
    return this.abrir("pregunta", {
      texto: i,
      opciones: r,
      correcta: o,
      bien: t,
      mal: s
    });
  },
  victoria(i, a = "Siguiente misi\xF3n") {
    return this.hablar(i.medalla + ". " + i.medalla_texto, "chispin"), this.abrir("victoria", {
      t: i,
      boton: a
    });
  },
  async ojo_tasador(i) {
    let a = 0;
    for (let o = 0; o < i.length; o++) {
      let t = i[o],
        r = (await this.abrir("ojo", {
          r: t,
          i: o,
          n: i.length
        })) === t.buena;
      r ? (a++, this.sonar("acierto")) : this.sonar("fallo"), await this.decir([["tasador", r ? t.bien : t.mal]]);
    }
    return a;
  },
  async clasificar(i) {
    let a = 0;
    for (let o = 0; o < i.length; o++) {
      let t = i[o],
        r = (await this.abrir("clasificar", {
          c: t,
          i: o,
          n: i.length
        })) === t.tipo;
      r ? (a++, this.sonar("acierto")) : this.sonar("fallo"), await this.decir([["chispin", (r ? "\xA1Eso es! " : "Casi. ") + t.explica]]);
    }
    return a;
  },
  presupuesto(i, a, o = "Tus compras de la feria") {
    return this.abrir("presupuesto", {
      total: i,
      cosas: a,
      titulo: o
    });
  },
  comparar(i, a) {
    return this.hablar(a, "yunque"), this.abrir("comparar", {
      filas: i,
      frase: a
    });
  },
  lista(i, a, o, t) {
    return this.hablar(t, i), this.abrir("lista", {
      quien: i,
      titulo: a,
      filas: o,
      frase: t
    });
  },
  tabla(i, a, o, t, s) {
    return this.hablar(s, i), this.abrir("tabla", {
      quien: i,
      titulo: a,
      columnas: o,
      filas: t,
      frase: s
    });
  },
  repartir(i, a, o, t) {
    return this.abrir("repartir", {
      total: i,
      opciones: a,
      titulo: o,
      nota: t
    });
  },
  pistas(i, a, o, t) {
    return this.abrir("pistas", {
      quien: i,
      titulo: a,
      icono: o,
      lista: t
    });
  },
  cuaderno(i, a, o, t) {
    return this.hablar(t, "chispin"), this.abrir("cuaderno", {
      titulo: i,
      columnas: a,
      filas: o,
      frase: t
    });
  },
  forja(i) {
    return this.hablar(i.forja_texto, "pendulo"), this.abrir("forja", {
      textos: i
    });
  },
  fin_del_juego(i) {
    return this.hablar(i.fin_titulo + ". " + i.fin_texto, "chispin"), this.abrir("fin", {
      textos: i
    });
  },
  async panel(i) {
    if (vista.capa || vista.dialogo || vista.noche || estado.paso === "titulo") return;
    let a = estado.ocupado,
      o = await this.abrir("panel", {
        panel: i,
        libre: !a
      });
    estado.ocupado = a, o === "leer" && (await this.carta(this.textos_carta, !1), estado.ocupado = a), o && o.startsWith("nota_") && (await this.carta(o.slice(5), !1), estado.ocupado = a), o === "dormir" && !a && (await this.siesta(), estado.ocupado = a, estado.avisar()), o && o.startsWith("viajar_") && this.viaje_pedido && this.viaje_pedido(o.slice(7));
  }
};
