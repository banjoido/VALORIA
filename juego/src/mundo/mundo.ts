// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { ajustes } from '../ajustes';
import { estado } from '../estado';
import { COLUMNAS, LOSETA, Mapa } from './mapas';
import { ALTO_NAVEGACION, ANCHO_MAPA, C, COLORES_MERMA, RADIOS_APAGADOS, RADIO_APAGADO, SECUACES, VELOCIDAD_HEROE, VISIBLES_INICIALES, ZONAS, celda, imagenes, imagenesGris, oa } from './zonas';
import { SPRITES } from '../recursos/sprites';

export function cargarSprites() {
  return Promise.all(Object.entries(SPRITES).map(([i, a]) => new Promise(o => {
    let t = new Image();
    t.onload = () => {
      imagenes[i] = t, imagenesGris[i] = versionGris(t), o();
    }, t.onerror = o, t.src = a;
  })));
}

function versionGris(i) {
  let a = document.createElement("canvas");
  a.width = i.width, a.height = i.height;
  let o = a.getContext("2d");
  o.drawImage(i, 0, 0);
  let t = o.getImageData(0, 0, a.width, a.height);
  for (let s = 0; s < t.data.length; s += 4) {
    let r = (t.data[s] * .3 + t.data[s + 1] * .59 + t.data[s + 2] * .11) * .9;
    t.data[s] = t.data[s + 1] = t.data[s + 2] = r;
  }
  return o.putImageData(t, 0, 0), a;
}

export const imagen = i => imagenes[i];

const Sprite = class {
  constructor(a, o) {
    this.poner(a), this.conGris = o, this.x = 0, this.y = 0, this.visible = !0, this.fijo = 0, this.dx = 0, this.dy = 0;
  }
  poner(a) {
    this.nombre = a;
    let o = imagenes[a];
    this.ox = -o.width / 2, this.oy = -o.height + 1;
  }
};

export const Mundo = class {
  constructor(a) {
    this.canvas = a, this.ctx = a.getContext("2d"), this.escala = 2, this.zona = "mercado", this.oyentes = {
      npc: new Set(),
      parcela: new Set(),
      lugar: new Set(),
      llegada: new Set()
    }, this.objetivo_fn = null, this.npcs = {}, this.visibles = {}, this.posiciones = {}, this.gente = [], this.heroe = new Sprite("heroe", !1), this.chispin = new Sprite("chispin", !1), this.chispin.visible = !1, this.seguidores = {};
    for (let s of ["brotin", "escudon", "repartija", "olfatin", "calmin"]) {
      let r = new Sprite(s, !1);
      r.visible = !1, this.seguidores[s] = r;
    }
    this.arbol = new Sprite("arbol_1", !1), this.arbol.visible = !1, this.maquina = new Sprite("maquina_grande", !0), this.maquina.visible = !1, this.cartel = !1, this.ruta = [], this.alLlegar = null, this.rastro = [], this.reloj = 0, this.camY = 0, this.radios = [RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO], this.radiosMeta = [...this.radios], this.humo = [], this.chispas = [], this.lluvia = [], this.tormentaOn = !1, this.toque = null, this.huida = null, this.huye = "", this.moviendo = !1, this.zonaGris = RADIOS_APAGADOS, this.zonaViva = RADIOS_APAGADOS, estado.cambiado(() => this.alCambiarEstado()), a.addEventListener("pointerdown", s => this.tocar(s)), this.cargar_zona("mercado", celda(7, 5));
    let o = performance.now(),
      t = s => {
        let r = Math.min(.05, (s - o) / 1e3) * ajustes.velocidad;
        o = s, this.paso(Math.min(r, .2)), this.pintar(), requestAnimationFrame(t);
      };
    requestAnimationFrame(t);
  }
  on(a, o) {
    return this.oyentes[a].add(o), () => this.oyentes[a].delete(o);
  }
  emitir(a, o) {
    for (let t of [...this.oyentes[a]]) t(o);
  }
  cargar_zona(a, o) {
    this.zona = a, Mapa.zona = a, estado.zona = a;
    let t = ZONAS[a];
    this.mapa = a, this.zonaGris = a === "mercado" && estado.maquina_apagada ? RADIOS_APAGADOS : t.zona_gris, this.zonaViva = t.zona_viva || RADIOS_APAGADOS, this.maquina.visible = a === "reloj", this.maquina.poner(estado.maquina_apagada ? "maquina_apagada" : "maquina_grande"), this.maquina.x = this.pie(oa).x, this.maquina.y = this.pie(oa).y, this.tormenta(!1), this.cartel = !1, this.gente = (t.gente || []).map(([r, l]) => {
      let c = new Sprite(l, !0),
        g = this.pie(r);
      return c.x = g.x, c.y = g.y, c.celda = r, c;
    }), this.npcs = {}, this.visibles = {}, this.posiciones = {};
    for (let [r, l] of Object.entries(t.npcs)) {
      let c = new Sprite((t.sprites || {})[r] || r, !SECUACES.includes(r)),
        g = this.pie(l);
      c.x = g.x, c.y = g.y, this.posiciones[r] = {
        ...l
      }, this.visibles[r] = !(r in VISIBLES_INICIALES || (t.ocultos || []).includes(r)), c.visible = this.visibles[r], this.npcs[r] = c;
    }
    this.radios = [RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO], this.radiosMeta = [...this.radios], this.humo = [], this.huida = null, this.ruta = [], this.alLlegar = null;
    let s = this.pie(o);
    this.heroe.x = s.x, this.heroe.y = s.y, this.rastro = [], this.saltar = !0, this.alCambiarEstado(), this.aplicarBrillo();
  }
  restaurar(a) {
    let o = ZONAS[estado.zona] ? estado.zona : "mercado";
    this.cargar_zona(o, o === "mercado" ? celda(7, 5) : o === "reloj" ? celda(7, 1) : celda(7, 2));
    let t = {
        mercado: 1,
        valle: 4,
        ciudad: 7,
        torre: 10,
        reloj: 13
      }[o],
      s = o === "mercado" ? 4 : 5,
      r = [RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO, RADIO_APAGADO];
    if (a > t && (r[0] = s), a > t + 1 && (r[1] = s), a > t + 2 && (r[2] = s, r[3] = 22), this.radios = [...r], this.radiosMeta = [...r], o === "mercado") this.mostrar("semilla", a > 1), this.mostrar("yunque", a > 2);else if (o === "valle" && a > 4) this.mostrar("escarcha", !0);else if (o === "ciudad" && a > 9) this.apagar_bazar(), this.mostrar("fachada", !1);else if (o === "torre" && a > 12) {
      for (let l = 1; l <= 4; l++) this.mostrar("puerta_" + l, !1);
      this.mostrar("fachada", !1);
    }
    this.chispin.visible = estado.tiene_chispin, this.aplicarBrillo();
  }
  alCambiarEstado() {
    for (let [a, o] of Object.entries(this.seguidores)) o.visible = estado.criaturas.includes(a);
    if (this.arbol.visible = this.zona === "valle" && estado.arbol > 0, this.arbol.visible) {
      this.arbol.poner("arbol_" + Math.min(4, Math.max(1, estado.arbol)));
      let a = this.pie(C);
      this.arbol.x = a.x, this.arbol.y = a.y;
    }
    Mapa.extra_solidos = this.arbol.visible ? [C] : [], this.chispin.visible = estado.tiene_chispin;
  }
  pie(a) {
    return celda(a.x * LOSETA + 6.5, a.y * LOSETA + 12);
  }
  mostrar(a, o) {
    if (this.npcs[a] && (this.visibles[a] = o, this.npcs[a].visible = o, o && a === this.huye && (this.huida = null, this.huye = ""), o)) {
      let t = this.pie(this.posiciones[a]);
      this.npcs[a].x = t.x, this.npcs[a].y = t.y;
    }
  }
  mover_npc(a, o) {
    this.posiciones[a] = {
      ...o
    };
    let t = this.pie(o);
    this.npcs[a].x = t.x, this.npcs[a].y = t.y, this.aplicarBrillo();
  }
  mostrar_chispin() {
    this.chispin.visible = !0;
  }
  iluminar(a, o) {
    this.radiosMeta[a] = o;
  }
  estallido(a, o, t) {
    for (let s = 0; s < t; s++) this.chispas.push({
      p: {
        ...a
      },
      v: celda(aleatorio(-40, 40), aleatorio(-50, -10)),
      t: 0,
      max: aleatorio(.6, 1),
      c: o
    });
  }
  huir(a, o = celda(1, 0)) {
    this.mostrar(a, !0), this.huye = a, this.huida = o;
  }
  huir_subeprecios(a) {
    this.huir("subeprecios", a);
  }
  apagar_bazar() {
    this.zonaViva = RADIOS_APAGADOS, this.zonaGris = [10, 10.6, 15, 15];
  }
  cerrar_bazar(a) {
    this.cartel = a;
  }
  apagar_maquina() {
    this.maquina.poner("maquina_apagada");
  }
  tormenta(a) {
    this.tormentaOn = a, a || (this.lluvia = []);
  }
  celda_heroe() {
    return celda(Math.floor(this.heroe.x / LOSETA), Math.floor((this.heroe.y - 1) / LOSETA));
  }
  sobre_chispin() {
    return celda(this.chispin.x, this.chispin.y - 20);
  }
  sobre_heroe() {
    return celda(this.heroe.x, this.heroe.y - 14);
  }
  grisEn(a, o) {
    let t = 1,
      s = ZONAS[this.zona].centros;
    for (let r = 0; r < 4; r++) {
      let l = Math.hypot(a - s[r].x, o - s[r].y);
      t = Math.min(t, limitar((l - this.radios[r]) / 2.5, 0, 1));
    }
    return t * .85;
  }
  grisLoseta(a, o) {
    let t = a + .5,
      s = o + .5,
      r = this.grisEn(t, s),
      l = this.zonaGris,
      c = this.zonaViva;
    return t >= l[0] && t <= l[2] && s >= l[1] && s <= l[3] && (r = Math.max(r, .7)), t >= c[0] && t <= c[2] && s >= c[1] && s <= c[3] && (r = 0), r;
  }
  aplicarBrillo() {
    for (let [a, o] of Object.entries(this.npcs)) if (o.conGris) {
      let t = this.posiciones[a];
      o.fijo = this.grisEn(t.x + .5, t.y + .5);
    }
    for (let a of this.gente) a.fijo = this.grisEn(a.celda.x + .5, a.celda.y + .5);
    this.maquina.fijo = estado.maquina_apagada ? 0 : this.grisEn(7.5, 25) * .6;
  }
  ocupadas() {
    let a = [];
    for (let o in this.posiciones) this.visibles[o] && !(o === this.huye && this.huida) && a.push(this.posiciones[o]);
    for (let o of this.gente) a.push(o.celda);
    return a;
  }
  alrededor(a) {
    return [celda(0, 1), celda(-1, 0), celda(1, 0), celda(0, -1)].map(o => celda(a.x + o.x, a.y + o.y)).filter(o => !Mapa.bloqueado(o.x, o.y, this.ocupadas()));
  }
  irA(a, o) {
    let t = Mapa.camino(this.celda_heroe(), a, this.ocupadas());
    if (t !== null) {
      if (t.length === 0) {
        o && o();
        return;
      }
      this.ruta = t, this.alLlegar = o;
    }
  }
  ir(a) {
    this.irA([a], null);
  }
  tocar(a) {
    if (estado.ocupado) return;
    let o = this.canvas.getBoundingClientRect(),
      t = (a.clientX - o.left - this.offX) / this.escala,
      s = (a.clientY - o.top) / this.escala + this.camY,
      r = celda(Math.floor(t / LOSETA), Math.floor(s / LOSETA));
    this.toque = {
      celda: r,
      t: this.reloj
    };
    for (let l in this.npcs) {
      if (!this.visibles[l] || l === this.huye && this.huida) continue;
      let c = this.posiciones[l];
      if (r.x === c.x && (r.y === c.y || r.y === c.y - 1)) {
        this.irA(this.alrededor(c), () => this.emitir("npc", l));
        return;
      }
    }
    if (Mapa.parcelas().some(l => l.x === r.x && l.y === r.y)) {
      this.irA([r, ...this.alrededor(r)], () => this.emitir("parcela", r));
      return;
    }
    if (this.zona === "valle" && r.x === C.x && r.y <= C.y && r.y >= C.y - 2) {
      this.irA(this.alrededor(C), () => this.emitir("lugar", C));
      return;
    }
    Mapa.bloqueado(r.x, r.y, this.ocupadas()) || this.irA([r], null), this.emitir("lugar", r);
  }
  paso(a) {
    this.reloj += a;
    let o = !1;
    for (let l = 0; l < 4; l++) if (Math.abs(this.radios[l] - this.radiosMeta[l]) > .01) {
      let c = Math.max(this.radios[l], -4);
      this.radios[l] = c + (this.radiosMeta[l] - c) * Math.min(1, a * 1.6), Math.abs(this.radios[l] - this.radiosMeta[l]) < .02 && (this.radios[l] = this.radiosMeta[l]), o = !0;
    }
    if (o && this.aplicarBrillo(), this.moviendo = !1, this.ruta.length) {
      let l = this.pie(this.ruta[0]),
        c = Math.hypot(l.x - this.heroe.x, l.y - this.heroe.y),
        g = VELOCIDAD_HEROE * (estado.patines ? 1.6 : 1) * a;
      if (this.moviendo = !0, c <= g) {
        if (this.heroe.x = l.x, this.heroe.y = l.y, this.ruta.shift(), !this.ruta.length && (this.emitir("llegada", this.celda_heroe()), this.alLlegar)) {
          let A = this.alLlegar;
          this.alLlegar = null, A();
        }
      } else this.heroe.x += (l.x - this.heroe.x) / c * g, this.heroe.y += (l.y - this.heroe.y) / c * g;
    }
    let t = estado.gorro ? "heroe_gorro" : "heroe";
    this.heroe.poner(this.moviendo && Math.floor(this.reloj * 8) % 2 === 1 ? t + "_paso" : t), this.rastro.push(celda(this.heroe.x, this.heroe.y)), this.rastro.length > 70 && this.rastro.shift();
    let s = this.rastro[Math.max(0, this.rastro.length - 16)];
    this.chispin.x = s.x + 11, this.chispin.y = s.y - .5, this.chispin.ox = -5.5, this.chispin.oy = -26 + Math.sin(this.reloj * 3) * 1.6;
    let r = 30;
    for (let l of Object.values(this.seguidores)) {
      if (!l.visible) continue;
      let c = this.rastro[Math.max(0, this.rastro.length - r)];
      l.x = c.x - 4, l.y = c.y - .5, l.ox = -5.5, l.oy = -10 - (this.moviendo ? Math.floor(this.reloj * 8) % 2 : 0), r += 14;
    }
    this.huida && this.npcs[this.huye] && (this.npcs[this.huye].x += this.huida.x * 70 * a, this.npcs[this.huye].y += this.huida.y * 70 * a);
    for (let l of estado.brotes_aqui()) l.crece < 1 && (l.crece = Math.min(1, l.crece + a * 1.8));
    if (this.pasoHumo(a), this.maquina.visible && !estado.maquina_apagada ? (this.maquina.dx = Math.round(Math.sin(this.reloj * 37) * .8), this.maquina.dy = Math.round(Math.sin(this.reloj * 23) * .6), Math.random() < a * 1.5 && this.estallido(celda(this.maquina.x + aleatorio(-40, 40), this.maquina.y - aleatorio(10, 60)), "#d6d6de", 2), Math.random() < a * 2.5 && this.estallido(celda(this.maquina.x + aleatorio(-6, 6), this.maquina.y - 12), "#f6c945", 3)) : (this.maquina.dx = 0, this.maquina.dy = 0), this.tormentaOn) {
      for (let l = 0; l < 3; l++) this.lluvia.push({
        p: celda(Math.random() * ANCHO_MAPA, this.camY + Math.random() * 40 - 20),
        t: 0
      });
      for (let l = this.lluvia.length - 1; l >= 0; l--) {
        let c = this.lluvia[l];
        c.p.x -= 25 * a, c.p.y += 160 * a, c.t += a, c.t > 2.6 && this.lluvia.splice(l, 1);
      }
    }
    for (let l = this.chispas.length - 1; l >= 0; l--) {
      let c = this.chispas[l];
      c.t += a, c.p.x += c.v.x * a, c.p.y += c.v.y * a, c.v.y += 80 * a, c.t > c.max && this.chispas.splice(l, 1);
    }
    this.camara();
  }
  franjas() {
    let a = this.canvas.getBoundingClientRect(),
      o = document.querySelector(".mision"),
      t = document.querySelector(".dialogo"),
      s = document.querySelector(".hud"),
      r = 8;
    o ? r = o.getBoundingClientRect().bottom - a.top + 6 : s && (r = s.getBoundingClientRect().bottom - a.top + 6);
    let l = t ? a.bottom - t.getBoundingClientRect().top + 6 : ALTO_NAVEGACION + 6;
    return {
      arriba: r,
      abajo: l
    };
  }
  camara() {
    let a = this.canvas.clientWidth,
      o = this.canvas.clientHeight;
    this.escala = Math.max(2, Math.floor(a / ANCHO_MAPA));
    let {
        arriba: t,
        abajo: s
      } = this.franjas(),
      r = Mapa.filas() * LOSETA,
      l = this.heroe.y - 11,
      c = this.ui && this.ui.vista.dialogo && this.ui.vista.dialogo.quien,
      g = c && this.npcs[c];
    g && g.visible && (l = (this.heroe.y + g.y) / 2 - 11);
    let A = t + (o - t - s) / 2,
      y = -t / this.escala,
      N = Math.max(y, r - (o - s) / this.escala),
      d = limitar(l - A / this.escala, y, N);
    this.camY = this.saltar ? d : this.camY + (d - this.camY) * .12, this.saltar = !1, this.offX = Math.round((a - ANCHO_MAPA * this.escala) / 2);
  }
  pasoHumo(a) {
    let o = [];
    for (let [t, s] of ZONAS[this.zona].humo) {
      let r = this.grisEn(s.x, s.y);
      this.zona === "mercado" && s.x === 12 && s.y === 4 && !estado.maquina_apagada && (r = Math.max(.7, r)), o.push([t, r]);
    }
    this.zona === "reloj" && !estado.maquina_apagada && o.push([celda(this.maquina.x - 21, this.maquina.y - 62), 1], [celda(this.maquina.x + 17, this.maquina.y - 56), 1]);
    for (let t of ["subeprecios", "prisas", "merma"]) this.visibles[t] && o.push([celda(this.npcs[t].x, this.npcs[t].y - 10), 1]);
    for (let [t, s] of o) s > .35 && Math.random() < a * 9 * s && this.humo.push({
      p: celda(t.x + aleatorio(-11, 11), t.y),
      vy: -aleatorio(6, 12),
      t: 0,
      max: aleatorio(1.6, 2.6),
      tam: Math.random() < .5 ? 1 : 2,
      c: COLORES_MERMA[Math.random() * 3 | 0],
      a: s
    });
    for (let t = this.humo.length - 1; t >= 0; t--) {
      let s = this.humo[t];
      s.t += a, s.p.x += Math.sin((s.t + s.p.y) * 2) * 3 * a, s.p.y += s.vy * a, s.t > s.max && this.humo.splice(t, 1);
    }
  }
  pintar() {
    let a = this.canvas,
      o = this.ctx,
      t = window.devicePixelRatio || 1,
      s = a.clientWidth,
      r = a.clientHeight;
    (a.width !== Math.round(s * t) || a.height !== Math.round(r * t)) && (a.width = Math.round(s * t), a.height = Math.round(r * t)), o.setTransform(1, 0, 0, 1, 0, 0), o.fillStyle = "#1a1526", o.fillRect(0, 0, a.width, a.height), o.imageSmoothingEnabled = !1;
    let l = this.escala * t;
    o.setTransform(l, 0, 0, l, (this.offX || 0) * t, -Math.round(this.camY * this.escala) * t);
    let c = imagenes[ZONAS[this.zona].textura],
      g = imagenesGris[ZONAS[this.zona].textura];
    if (!c) return;
    o.drawImage(c, 0, 0);
    let A = Math.max(0, Math.floor(this.camY / LOSETA)),
      y = Math.min(Mapa.filas() - 1, Math.ceil((this.camY + r / this.escala) / LOSETA));
    for (let d = A; d <= y; d++) for (let w = 0; w < COLUMNAS; w++) {
      let ra = this.grisLoseta(w, d);
      ra > .01 && (o.globalAlpha = ra, o.drawImage(g, w * LOSETA, d * LOSETA, LOSETA, LOSETA, w * LOSETA, d * LOSETA, LOSETA, LOSETA));
    }
    if (o.globalAlpha = 1, this.tormentaOn && (o.fillStyle = "rgba(30,32,80,0.38)", o.fillRect(0, 0, ANCHO_MAPA, Mapa.filas() * LOSETA)), this.cartel) {
      let d = imagenes.cartel_cerrado;
      o.drawImage(d, Math.round(12 * LOSETA + 6.5 - d.width / 2), Math.round(14 * LOSETA + 2 - d.height / 2));
    }
    for (let d of estado.brotes_aqui()) {
      let w = d.fruto ? "brote_fruto" : d.crece >= .5 ? "brote_grande" : "brote_chico";
      o.drawImage(imagenes[w], d.celda.x * LOSETA, d.celda.y * LOSETA);
    }
    let N = [this.heroe, this.chispin, ...Object.values(this.seguidores), this.arbol, this.maquina, ...this.gente, ...Object.values(this.npcs)].filter(d => d.visible);
    N.sort((d, w) => d.y - w.y);
    for (let d of N) this.pintarActor(d);
    for (let d of this.humo) o.globalAlpha = Math.max(0, 1 - d.t / d.max) * (.35 + .45 * d.a), o.fillStyle = d.c, o.fillRect(Math.round(d.p.x), Math.round(d.p.y), d.tam, d.tam);
    o.globalAlpha = .55, o.fillStyle = "#bfd1f2";
    for (let d of this.lluvia) o.fillRect(Math.round(d.p.x), Math.round(d.p.y), 1, 3);
    for (let d of this.chispas) o.globalAlpha = Math.max(0, 1 - d.t / d.max), o.fillStyle = d.c, o.fillRect(Math.round(d.p.x), Math.round(d.p.y), 1, 1);
    if (o.globalAlpha = 1, !estado.ocupado && this.objetivo_fn) {
      let d = this.objetivo_fn();
      if (d) {
        let w = Math.round(Math.abs(Math.sin(this.reloj * 4)) * 3);
        o.drawImage(imagenes.flecha, d.x * LOSETA + 2, d.y * LOSETA - d.z - 5 - w);
      }
    }
    this.toque && this.reloj - this.toque.t < .4 && (o.strokeStyle = `rgba(253,243,216,${1 - (this.reloj - this.toque.t) / .4})`, o.lineWidth = 1, o.strokeRect(this.toque.celda.x * LOSETA + 1, this.toque.celda.y * LOSETA + 1, LOSETA - 2, LOSETA - 2));
  }
  pintarActor(a) {
    let o = this.ctx,
      t = imagenes[a.nombre];
    if (!t) return;
    let s = Math.round(a.x + a.ox + a.dx),
      r = Math.round(a.y + a.oy + a.dy);
    o.drawImage(t, s, r), a.conGris && a.fijo > .01 && (o.globalAlpha = a.fijo, o.drawImage(imagenesGris[a.nombre], s, r), o.globalAlpha = 1);
  }
};

function aleatorio(i, a) {
  return i + Math.random() * (a - i);
}

function limitar(i, a, o) {
  return Math.max(a, Math.min(o, i));
}
