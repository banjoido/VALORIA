// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

const MAPAS = {
  zonas: {
    mercado: {
      filas: ["tttggggpgggtttt", "ttgggggpggggttt", "tggggggpgggggtt", "tgsvsvgpggfgggt", "tgvsvsgpgfggggt", "ggssssgpggggggg", "gggggggpggggggg", "gggggggpggggggg", "gggggggpggggggg", "ppppppppppppppp", "gggcccccccccggg", "gggcccccccccggg", "gggcccwwwcccggg", "gggcccwwwcccggg", "gggcccccccccggg", "gggcccccccccggg", "ppppppppppppppp", "gfgggggpgggggfg", "gggggggpggggggg", "tggggggpggggggt", "ttgggggpgggggtt", "tttggggpggggttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "tttttggpggttttt", "tttttggpggttttt", "ttttttgpgtttttt", "ttttttttttttttt"],
      solidos: [[0, 6, 4, 8], [10, 6, 14, 8], [10, 2, 13, 5], [0, 10, 2, 12], [12, 10, 14, 12], [9, 17, 13, 19]],
      parcelas: [[2, 5], [3, 5], [4, 5], [5, 5]]
    },
    valle: {
      filas: ["tttttttpttttttt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpniipiit", "tnnnnnnpppppnnt", "nnnnnnnpnnnnnnn", "nssssnnpnnnnnnn", "nssssnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "ppppppppppppppp", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nooooonpniiiinn", "nooooonpniiiinn", "nnnnnnnpnnnnnnn", "ppppppppppppppp", "nnnnnnnpnffffnn", "nnnnnnnpnffffnn", "rrrnnnnpnffffnn", "rrrnnnnpnnnnnnn", "rrrnnnnpnnnnnnt", "tnnnnnnpnnnnntt", "ttnnnnnpnnnnttt", "tttnnnnpnnnnttt", "ttttnnnpnnntttt", "tttttnnpnnttttt", "ttttttnpntttttt", "ttttttttttttttt"],
      solidos: [[9, 1, 14, 5], [0, 15, 4, 17], [10, 15, 14, 17]],
      parcelas: [[1, 9], [2, 9], [3, 9], [4, 9], [1, 10], [2, 10], [3, 10], [4, 10]]
    },
    ciudad: {
      filas: ["tttttttpttttttt", "tcccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ppppppppppppppp", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "cccccgggggccccc", "ccccggwwwggcccc", "ccccggwwwggcccc", "cccccgggggccccc", "ccccccccccccccc", "ppppppppppppppp", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "tcccccccccccccc", "ttcccccccccccct", "tttgggcpcgggttt", "ttttggcpcggtttt", "tttttgcpcgttttt", "ttttttgpgtttttt", "ttttttttttttttt"],
      solidos: [[0, 2, 4, 5], [10, 2, 14, 5], [0, 11, 4, 14], [10, 11, 14, 14], [0, 23, 4, 25], [11, 23, 13, 24]],
      parcelas: []
    },
    torre: {
      filas: ["uuuuuuucuuuuuuu", "ucccccccccccccu", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccwwwcccccc", "ccccccwwwcccccc", "ccccccccccccccc", "ccccccccccccccc", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xxxxxxxxxxxxxxx"],
      solidos: [[10, 2, 14, 5], [0, 2, 3, 4], [11, 7, 13, 8], [0, 10, 3, 11], [11, 10, 14, 11]],
      parcelas: []
    },
    reloj: {
      filas: ["tttttttcttttttt", "tccccccccccccct", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "xxxxxxxcxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxxxxxxxxx", "xxxxxxxxxxxxxxx"],
      solidos: [[5, 2, 9, 7], [0, 9, 3, 11], [11, 9, 14, 11], [1, 14, 3, 15], [4, 23, 10, 27]],
      parcelas: []
    }
  },
  no_se_pisa: {
    mercado: "tw",
    valle: "tiro",
    ciudad: "tw",
    torre: "uwx",
    reloj: "twx"
  }
};

export const LOSETA = 13;

export const COLUMNAS = 15;

export const Mapa = {
  zona: "mercado",
  extra_solidos: [],
  filas() {
    return MAPAS.zonas[this.zona].filas.length;
  },
  parcelas() {
    return MAPAS.zonas[this.zona].parcelas.map(([i, a]) => ({
      x: i,
      y: a
    }));
  },
  bloqueado(i, a, o) {
    let t = MAPAS.zonas[this.zona];
    if (i < 0 || i >= COLUMNAS || a < 0 || a >= t.filas.length || MAPAS.no_se_pisa[this.zona].includes(t.filas[a][i])) return !0;
    for (let s of t.solidos) if (i >= s[0] && i <= s[2] && a >= s[1] && a <= s[3]) return !0;
    return this.extra_solidos.some(s => s.x === i && s.y === a) ? !0 : o.some(s => s.x === i && s.y === a);
  },
  camino(i, a, o) {
    let t = c => c.x + "," + c.y,
      s = new Set(a.map(t));
    if (s.has(t(i))) return [];
    let r = new Map([[t(i), null]]),
      l = [i];
    for (; l.length;) {
      let c = l.shift();
      for (let [g, A] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        let y = {
          x: c.x + g,
          y: c.y + A
        };
        if (!(r.has(t(y)) || this.bloqueado(y.x, y.y, o))) {
          if (r.set(t(y), c), s.has(t(y))) {
            let N = [],
              d = y;
            for (; d && t(d) !== t(i);) N.unshift(d), d = r.get(t(d));
            return N;
          }
          l.push(y);
        }
      }
    }
    return null;
  }
};
