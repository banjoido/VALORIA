// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { COLUMNAS, LOSETA } from './mapas';

export const ANCHO_MAPA = COLUMNAS * LOSETA;

export const VELOCIDAD_HEROE = 62;

export const ALTO_NAVEGACION = 84;

export const RADIO_APAGADO = -60;

export const COLORES_MERMA = ["#7b4fa3", "#9b6ccc", "#5d3a80"];

export const C = {
  x: 10,
  y: 11
};

export const oa = {
  x: 7,
  y: 27
};

export const SECUACES = ["subeprecios", "prisas", "fachada", "donchollo", "deudon", "euforio", "panico", "merma"];

export const VISIBLES_INICIALES = {
  semilla: !1,
  subeprecios: !1,
  yunque: !1,
  escarcha: !1,
  prisas: !1
};

export const celda = (i, a) => ({
  x: i,
  y: a
});

export const RADIOS_APAGADOS = [-1, -1, -1, -1];

export const ZONAS = {
  mercado: {
    textura: "mapa_mercado",
    centros: [celda(2.3, 7.5), celda(1.5, 12), celda(13.5, 12), celda(7, 11)],
    zona_gris: [10, 2, 14, 6],
    npcs: {
      hogaza: celda(2, 9),
      tasador: celda(1, 13),
      antojo: celda(13, 13),
      semilla: celda(6, 4),
      subeprecios: celda(7, 10),
      yunque: celda(11, 20)
    },
    humo: [[celda(150, 30), celda(12, 4)], [celda(158, 80), celda(12.5, 7.5)], [celda(172, 133), celda(13.5, 12)], [celda(14, 133), celda(1.5, 12)], [celda(148, 214), celda(11.5, 18)], [celda(31, 80), celda(2.3, 7.5)]]
  },
  valle: {
    textura: "mapa_valle",
    centros: [celda(6, 7), celda(5, 15), celda(7, 23), celda(7, 16)],
    zona_gris: RADIOS_APAGADOS,
    npcs: {
      copo: celda(11, 8),
      raiz: celda(5, 16),
      anillos: celda(9, 16),
      escarcha: celda(4, 12),
      prisas: celda(9, 12)
    },
    humo: [[celda(155, 20), celda(11.5, 3)], [celda(31, 200), celda(2, 16)], [celda(160, 200), celda(12, 16)], [celda(18, 318), celda(1, 25)], [celda(140, 290), celda(10.5, 23)]]
  },
  ciudad: {
    textura: "mapa_ciudad",
    centros: [celda(12, 6), celda(2.5, 14), celda(3, 25.5), celda(7, 17)],
    zona_gris: RADIOS_APAGADOS,
    zona_viva: [10, 10.6, 15, 15],
    npcs: {
      lupa: celda(3, 7),
      fiel: celda(11, 7),
      engranaje: celda(3, 16),
      fachada: celda(11, 16),
      cuenta: celda(3, 27),
      prisas: celda(11, 26)
    },
    gente: [[celda(13, 7), "gente_1"], [celda(14, 7), "gente_2"], [celda(13, 8), "gente_3"], [celda(14, 8), "gente_1"], [celda(0, 16), "gente_3"], [celda(1, 16), "gente_2"]],
    humo: [[celda(30, 26), celda(2, 3)], [celda(160, 26), celda(12, 3)], [celda(53, 128), celda(4, 11)], [celda(30, 298), celda(2, 23)], [celda(97, 225), celda(7, 17)], [celda(97, 380), celda(7, 29)]]
  },
  torre: {
    textura: "mapa_torre",
    centros: [celda(5, 5.5), celda(8, 11), celda(7, 24), celda(7, 17)],
    zona_gris: RADIOS_APAGADOS,
    npcs: {
      reves: celda(9, 6),
      arrepentido: celda(2, 5),
      donchollo: celda(12, 9),
      fachada: celda(4, 11),
      deudon: celda(12, 12),
      cautela: celda(6, 12),
      puerta_1: celda(7, 17),
      puerta_2: celda(7, 21),
      puerta_3: celda(7, 25),
      puerta_4: celda(7, 29)
    },
    sprites: {
      puerta_1: "puerta",
      puerta_2: "puerta",
      puerta_3: "puerta",
      puerta_4: "puerta"
    },
    ocultos: ["donchollo", "deudon"],
    humo: [[celda(30, 26), celda(2, 3)], [celda(160, 70), celda(12, 5)], [celda(30, 128), celda(2, 10)], [celda(97, 200), celda(7, 15)], [celda(97, 300), celda(7, 23)], [celda(97, 370), celda(7, 28)]]
  },
  reloj: {
    textura: "mapa_reloj",
    centros: [celda(7, 8), celda(7, 16), celda(7, 27), celda(7, 17)],
    zona_gris: RADIOS_APAGADOS,
    npcs: {
      vaiven: celda(7, 8),
      memoria: celda(2, 12),
      pendulo: celda(12, 12),
      euforio: celda(4, 15),
      panico: celda(10, 16),
      merma: celda(7, 28),
      subeprecios: celda(4, 29),
      prisas: celda(10, 29),
      fachada: celda(4, 31),
      donchollo: celda(10, 31)
    },
    ocultos: ["euforio", "panico", "merma", "fachada", "donchollo"],
    humo: [[celda(28, 115), celda(2, 9)], [celda(170, 115), celda(12, 9)], [celda(97, 10), celda(7, 2)], [celda(77, 290), celda(7, 26)], [celda(117, 296), celda(7, 26)], [celda(97, 200), celda(7, 16)]]
  }
};

export const imagenes = {};

export const imagenesGris = {};
