// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { estado } from './estado';

export const ajustes = {
  velocidad: 1
};

export function esperar(i) {
  return new Promise(a => setTimeout(a, i * 1e3 / ajustes.velocidad));
}

// Marcas de género del héroe o la heroína, para los textos que no se pueden
// escribir de forma neutra (ver docs/textos-genero.md). En un texto se usan
// como cualquier otra clave de plantilla: "pequeñ{o}", "{un} viajer{o}",
// "{El} {nieto} del viejo aprendiz".
const MARCAS_GENERO = {
  chico: { o: "o", el: "el", El: "El", un: "un", Un: "Un", nieto: "nieto" },
  chica: { o: "a", el: "la", El: "La", un: "una", Un: "Una", nieto: "nieta" }
};

export function marcasGenero() {
  return MARCAS_GENERO[estado.heroe] || MARCAS_GENERO.chico;
}

export function rellenar(i, a = {}) {
  let claves = { ...marcasGenero(), ...a };
  return String(i).replace(/\{(\w+)\}/g, (o, t) => t in claves ? String(claves[t]) : o);
}

// Rellena solo las marcas de género (deja intactas {n}, {m}...) en un texto,
// lista u objeto de datos. Lo usa la interfaz con todo lo que enseña o lee.
export function rellenarGenero(i) {
  if (typeof i == "string") return i.includes("{") ? rellenar(i) : i;
  if (Array.isArray(i)) return i.map(rellenarGenero);
  if (i && typeof i == "object" && Object.getPrototypeOf(i) === Object.prototype) {
    let r = {};
    for (let k of Object.keys(i)) r[k] = rellenarGenero(i[k]);
    return r;
  }
  return i;
}
