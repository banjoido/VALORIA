// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const PERSONAJES = {
  hogaza: ["Hogaza", "#e08a3c", 1.25, 1],
  subeprecios: ["Subeprecios", "#9b6ccc", 1.6, 1.1],
  chispin: ["Chisp\xEDn", "#f6c945", 1.8, 1.05],
  semilla: ["Se\xF1ora Semilla", "#8fd16a", .95, .92],
  tasador: ["Tasador", "#d6bf86", .8, .98],
  antojo: ["Antojo", "#ff8fbd", 1.4, 1.1],
  abuelo: ["Abuelo", "#9fc0e8", .7, .9],
  yunque: ["Yunque", "#b8b8c4", .85, .95],
  copo: ["Copo", "#cfe8ff", .75, .85],
  raiz: ["Ra\xEDz", "#b08a5a", 1, .9],
  escarcha: ["Escarcha", "#9fe0f0", 1.5, 1.05],
  anillos: ["Anillos", "#c9a26b", .9, .95],
  prisas: ["Prisas", "#e0503c", 1.7, 1.25],
  lupa: ["Lupa", "#c9a66b", 1.3, 1.1],
  fiel: ["Fiel", "#c46a48", 1.1, .95],
  engranaje: ["Engranaje", "#e07b39", 1.35, 1.15],
  cuenta: ["Cuenta", "#7cc05a", .8, .9],
  fachada: ["Fachada", "#f6c945", 1.5, 1.05],
  reves: ["Rev\xE9s", "#9b6ccc", 1.15, .95],
  arrepentido: ["Arrepentido", "#8a8a96", .85, .85],
  cautela: ["Cautela", "#b8b8c4", 1, .95],
  donchollo: ["Don Chollo", "#3fbf9f", 1.45, 1.2],
  deudon: ["Deud\xF3n", "#9a8aaa", .7, .9],
  olfatin: ["Olfat\xEDn", "#e9dcc0", 1.9, 1.15],
  pendulo: ["P\xE9ndulo", "#d79a2b", .9, .85],
  vaiven: ["Vaiv\xE9n", "#f2d06b", 1.3, 1.05],
  memoria: ["Memoria", "#c9b8e8", .95, .8],
  euforio: ["Euforio", "#ff8fbd", 1.7, 1.3],
  panico: ["P\xE1nico", "#9fb8d8", 1.8, 1.35],
  merma: ["Merma", "#9b6ccc", .6, .8],
  calmin: ["Calm\xEDn", "#c9a66b", 1.1, .8],
  brotin: ["Brot\xEDn", "#c9a66b", 1.6, 1.1],
  repartija: ["Repartija", "#9b6ccc", 1.5, 1.1]
};

export const nombreDe = i => (PERSONAJES[i] || PERSONAJES.chispin)[0];

export const colorDe = i => (PERSONAJES[i] || PERSONAJES.chispin)[1];

export const qi = "#f6c945";

export const Ai = "#4a4060";

export const xi = "#8fd16a";

export const NOMBRES_ZONA_CORTOS = {
  mercado: "El Mercado",
  valle: "El Valle",
  ciudad: "La Ciudad",
  torre: "La Torre",
  reloj: "El Gran Reloj"
};
