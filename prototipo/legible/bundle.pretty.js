(() => {
  var Zi = Object.defineProperty;
  var Yi = (i, a, o) => a in i ? Zi(i, a, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
  }) : i[a] = o;
  var D = (i, a, o) => Yi(i, typeof a != "symbol" ? a + "" : a, o);
  var Ba = "valoria-partida",
    Wa = ["Oto\xF1o", "Invierno", "Primavera", "Verano"],
    Ua = ["el oto\xF1o", "el invierno", "la primavera", "el verano"],
    La = new Set;

  function na() {
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
    }
  }
  var e = {
    ...na(),
    cambiado(i) {
      return La.add(i), () => La.delete(i)
    },
    avisar() {
      for (let i of La) i()
    },
    reiniciar() {
      let i = this.sonido;
      Object.assign(this, na(), {
        sonido: i
      }), this.avisar()
    },
    brotes_aqui() {
      return this.brotes.filter(i => (i.zona || "mercado") === this.zona)
    },
    brote_en(i) {
      return this.brotes_aqui().find(a => a.celda.x === i.x && a.celda.y === i.y) || null
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
      }), this.avisar()
    },
    frutos_listos() {
      return this.brotes_aqui().filter(i => i.fruto).length
    },
    progreso_actual() {
      return {
        valle: this.progreso_valle,
        ciudad: this.progreso_ciudad,
        torre: this.progreso_torre,
        reloj: this.progreso_reloj
      } [this.zona] ?? this.progreso
    },
    trocitos_de(i) {
      return this.trocitos[i] | 0
    },
    guardar() {
      let i = {};
      for (let a of Object.keys(na())) a !== "ocupado" && a !== "paso" && (i[a] = this[a]);
      try {
        localStorage.setItem(Ba, JSON.stringify(i))
      } catch {}
    },
    cargar() {
      let i = null;
      try {
        i = JSON.parse(localStorage.getItem(Ba) || "null")
      } catch {
        i = null
      }
      if (!i || typeof i != "object" || (i.mision | 0) <= 1) return !1;
      Object.assign(this, na(), i);
      for (let a of this.brotes) a.crece = 1;
      return this.ocupado = !0, this.avisar(), !0
    },
    borrar_partida() {
      try {
        localStorage.removeItem(Ba)
      } catch {}
    }
  };
  var ea = {
    zonas: {
      mercado: {
        filas: ["tttggggpgggtttt", "ttgggggpggggttt", "tggggggpgggggtt", "tgsvsvgpggfgggt", "tgvsvsgpgfggggt", "ggssssgpggggggg", "gggggggpggggggg", "gggggggpggggggg", "gggggggpggggggg", "ppppppppppppppp", "gggcccccccccggg", "gggcccccccccggg", "gggcccwwwcccggg", "gggcccwwwcccggg", "gggcccccccccggg", "gggcccccccccggg", "ppppppppppppppp", "gfgggggpgggggfg", "gggggggpggggggg", "tggggggpggggggt", "ttgggggpgggggtt", "tttggggpggggttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "ttttgggpgggtttt", "tttttggpggttttt", "tttttggpggttttt", "ttttttgpgtttttt", "ttttttttttttttt"],
        solidos: [
          [0, 6, 4, 8],
          [10, 6, 14, 8],
          [10, 2, 13, 5],
          [0, 10, 2, 12],
          [12, 10, 14, 12],
          [9, 17, 13, 19]
        ],
        parcelas: [
          [2, 5],
          [3, 5],
          [4, 5],
          [5, 5]
        ]
      },
      valle: {
        filas: ["tttttttpttttttt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpnnnnnnt", "tnnnnnnpniipiit", "tnnnnnnpppppnnt", "nnnnnnnpnnnnnnn", "nssssnnpnnnnnnn", "nssssnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "ppppppppppppppp", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nnnnnnnpnnnnnnn", "nooooonpniiiinn", "nooooonpniiiinn", "nnnnnnnpnnnnnnn", "ppppppppppppppp", "nnnnnnnpnffffnn", "nnnnnnnpnffffnn", "rrrnnnnpnffffnn", "rrrnnnnpnnnnnnn", "rrrnnnnpnnnnnnt", "tnnnnnnpnnnnntt", "ttnnnnnpnnnnttt", "tttnnnnpnnnnttt", "ttttnnnpnnntttt", "tttttnnpnnttttt", "ttttttnpntttttt", "ttttttttttttttt"],
        solidos: [
          [9, 1, 14, 5],
          [0, 15, 4, 17],
          [10, 15, 14, 17]
        ],
        parcelas: [
          [1, 9],
          [2, 9],
          [3, 9],
          [4, 9],
          [1, 10],
          [2, 10],
          [3, 10],
          [4, 10]
        ]
      },
      ciudad: {
        filas: ["tttttttpttttttt", "tcccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ppppppppppppppp", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "cccccgggggccccc", "ccccggwwwggcccc", "ccccggwwwggcccc", "cccccgggggccccc", "ccccccccccccccc", "ppppppppppppppp", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "tcccccccccccccc", "ttcccccccccccct", "tttgggcpcgggttt", "ttttggcpcggtttt", "tttttgcpcgttttt", "ttttttgpgtttttt", "ttttttttttttttt"],
        solidos: [
          [0, 2, 4, 5],
          [10, 2, 14, 5],
          [0, 11, 4, 14],
          [10, 11, 14, 14],
          [0, 23, 4, 25],
          [11, 23, 13, 24]
        ],
        parcelas: []
      },
      torre: {
        filas: ["uuuuuuucuuuuuuu", "ucccccccccccccu", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccwwwcccccc", "ccccccwwwcccccc", "ccccccccccccccc", "ccccccccccccccc", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxfxxxxxxx", "xxxxxxxxxxxxxxx"],
        solidos: [
          [10, 2, 14, 5],
          [0, 2, 3, 4],
          [11, 7, 13, 8],
          [0, 10, 3, 11],
          [11, 10, 14, 11]
        ],
        parcelas: []
      },
      reloj: {
        filas: ["tttttttcttttttt", "tccccccccccccct", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "ccccccccccccccc", "xxxxxxxcxxxxxxx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xfffffffffffffx", "xxxxxxxxxxxxxxx", "xxxxxxxxxxxxxxx"],
        solidos: [
          [5, 2, 9, 7],
          [0, 9, 3, 11],
          [11, 9, 14, 11],
          [1, 14, 3, 15],
          [4, 23, 10, 27]
        ],
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
  var f = 13,
    la = 15,
    P = {
      zona: "mercado",
      extra_solidos: [],
      filas() {
        return ea.zonas[this.zona].filas.length
      },
      parcelas() {
        return ea.zonas[this.zona].parcelas.map(([i, a]) => ({
          x: i,
          y: a
        }))
      },
      bloqueado(i, a, o) {
        let t = ea.zonas[this.zona];
        if (i < 0 || i >= la || a < 0 || a >= t.filas.length || ea.no_se_pisa[this.zona].includes(t.filas[a][i])) return !0;
        for (let s of t.solidos)
          if (i >= s[0] && i <= s[2] && a >= s[1] && a <= s[3]) return !0;
        return this.extra_solidos.some(s => s.x === i && s.y === a) ? !0 : o.some(s => s.x === i && s.y === a)
      },
      camino(i, a, o) {
        let t = c => c.x + "," + c.y,
          s = new Set(a.map(t));
        if (s.has(t(i))) return [];
        let r = new Map([
            [t(i), null]
          ]),
          l = [i];
        for (; l.length;) {
          let c = l.shift();
          for (let [g, A] of [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1]
            ]) {
            let y = {
              x: c.x + g,
              y: c.y + A
            };
            if (!(r.has(t(y)) || this.bloqueado(y.x, y.y, o))) {
              if (r.set(t(y), c), s.has(t(y))) {
                let N = [],
                  d = y;
                for (; d && t(d) !== t(i);) N.unshift(d), d = r.get(t(d));
                return N
              }
              l.push(y)
            }
          }
        }
        return null
      }
    };
  var ae = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAlElEQVR4XmNgQAM1B6L+EyOGFSBrxmYQXgDSgE8TIzbd2koGKM69eu8ChjoWdI0gTc6KP9GEDf6ja2ZCVoFdEwMDyCB0V8A14tIEA+iawRqRNd15/hHD2zAxZM0oTgUBFUl+DI3YxDACBwTQbSVaIzaF6ADFqTLiQjgTBbocPGIJhSoI7L3PDk8MKCkCPa7QAXIiAACGAEAQvA/OaAAAAABJRU5ErkJggg==";
  var ee = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABRklEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxq07FqCo9/ZIAPPRDUIxAKQZplFEVAys4c3rVxgGIRsCNwCmGZdGZAByDcwQFnR/odtICDChKxB6exqnHmxyKC6AKSDFEAwXgIBl9FQMV2ATAwEUA54/uA8WPL40G8MAmBhMDQxgRCOyZpit6GJYoxEG0FMgOkBPSCiBCNI8r8UaQxMySKph+I9sCDwMQJoNYjsYJt30xWkASA6kBtmV4DCAaSYFXFhcAfYOE0gzLJDev31J0AyYGpAekF64F6Z7PCaoGQaQ1cK9AJKU9yokypCH2/rB6kBeQMmNDhaiRBlw4MRr3LkRBl6++cBw/c5vMFdThZVBXEQAq+EY2RkEYJoR8Q0q3j5gNQTFgPsPniLZwoZi47cvXxnuf/kKFUPIoRjw8AWqJmSASw4A5MqU99Q1zEYAAAAASUVORK5CYII=";
  var oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABOUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmMZ4YzYUqYUMEAPRDUIxFaQZplFOgh9swKMXH1ENOvsLxRC4ATDNuDQiA2RDMLyAbiMhwISuIKMoFacebHIoXji+NJuQhWBgGT0VHg4YLoApQAcgTdgAigHPH9wHq8HmEpgYTA0MYEQjsmaYrehiyGkBI3Whp0B0gJ6QUKIRpHleizWGJmSQVMPwH9kQeBiANPcG8jO8P3sFpwEgOZAaZFeCvQDTTAooXv8R7B0mkGZYIF16hJrusQGYGpAekF64F6xCYoh2ALJauBdAuuONiTNj4VmIOpAXUJKyvgYXUSZcvPENHp0YuREGnrx8x/D2PQeYKyz4g0FGXAir4VgNgGmGxTck2t5hNQTFAJBGfAAhD3EZCKAYAHMyNoBLDgBIh5AneG+hwQAAAABJRU5ErkJggg==";
  var ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABOUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmMYC3WIUqQkMvWAD0Q1CMRWkGaZRXVsDbMDNqzdQDbrci2II3ACYZlwakQGyIRheQLeREGBCVxBe8QOnHmxyKF44vjSbkIVgYBk9FR4OGC6AKUAHIE3YAIoBzx/cB6vB5hKYGEwNDGBEI7JmmK3oYshpASN1oadAdICekFCiEaQ5ZN8UDE0owCnnP7Ih8DAAab7iW8HQ0P8EpwEgOZAaZFeCvQDTTArQ2dwB9g4TSDMskG49fUTQDJgakB6QXrgXPkd8JqgZBpDVwr0AklxnFEWUIUHnloHVgbwAjgUQA+ScRb8liTIApgdEY+RGGHj0+i7DuRcbwFwjiQAGOVFlrIZjNQCmGSm+/zMwYDcExQCQRnwAmzyKATAnYwO45AAb4ZcbaOG8BwAAAABJRU5ErkJggg==";
  var te = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAYAAABBY8kOAAAAp0lEQVR4XmNgGAWjYBSMglEwCkbBKBgFRAJtJYP/RCqFAxZSNMAscJlmxcCQxQC27Oq9C4ykmEEQgCz58v03BibWdyT5qPpgPthBp4/fIugwdMBEjA6Qq8HBhWbJlzffGJg9uYiKM6LDF2QZf6wI3F0gS0Dg7/ZvRMUTUT5CBzBLSAFE+wgEYBEPCi6QT0hJdSRZhGwZKZaAAFlB56/8hZRQI9+iQQ0Ax7ZFdR+iMoAAAAAASUVORK5CYII=";
  var se = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAYAAABBY8kOAAAA6klEQVR4Xu2UPQ7CMAxGw8/EMWBkYe7chYl79BLcggtwCBZmGFhYWBg4QRekqAwIFTlSUGQlthN1YPCTukStX/zFjTGKoiiDsJyv+txCU+kHYfF6VxnTmJ/s9riOuDrsCwBIXHHE5Xx3K899K5KRgMS+3uRTbeuei5PsiOsEQ3U25rJNxZVLlsifSQzbdqQ7KcKxSSST9Sw5+kkRjOyxObldSiTA59Alp4+NTirhYEUpuDPBkCKID0YWE5NQsQFsR1hWIgFEVxAQ/vkwXdCBZ7C7LiQUSgQeNroYm4WNrlMUiUpQUTEa3f/zBf6Njv6BVr4sAAAAAElFTkSuQmCC";
  var re = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAYAAABBY8kOAAABUklEQVR4XmNgGAUMDAzaSgb/SQ0IFmI0oBvsMs2KgSGLAcWyq/cuMOIzC68ksuvBhmMBp4/fYvi4+A1YBp9leC0C+QSXBSAAsgQZgCzEZRlOi2CWtNpPJCZ0Gdw6PMHqcFmG1SJYnOALLlwAVzAy4dJAjiUgwB8rgtVInBbhinhC4Mubb5RZhB7x2AAuS0AAw0fYUhqpljB7cmHkPQyLQMlzT9YxuINBliy7+AOMcQF0n/zd/g0jmeONI1J9gg/gLIKQLYnS58AZJ5ueQtzqJ/0Pr0U4fQTLD8QGFwyAgg0bwGoRoQISOU5APkH3DTb9OH0EUozNV6BEAQsudIAtEcAA3moCZJn2YkjdA8rxEJ9gug0WXGSX3jCAXh+B8gl6XOCzBAQI1kfoANlSQoYjA5LKOhjwV/6C4QBCgCyLyAGjFpENRoOObDAadGQDugUd3QAAcZCkhB/07J0AAAAASUVORK5CYII=";
  var ne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAiCAYAAABBY8kOAAABhElEQVR4Xu2Wv0oDQRCH76KFGMHGLp2WFlqKdRotYi/oA/hAPoABexttUkchTSxsBH2CNEIMNhr5rU7Ym52Z291cmQ8Oktyfb38zm70ti3/2dw/n3etj+ioyenw1z3Omk1nx/TArXt7HZSv2Ti4ZnJbu0IDEJ0qUk4SzXpdIk3Tv5+KtPAnhsmv9aSIJQJ9c6dCswdWwMkJfcvv85Q4LLYk5GZpK4hP0SJKcH2yoYf6Stope50e9BlRmnS+pm75AK5fEQoQ+ffQn5qh8SIIkWhrqD+5Tp7c2fWlS9DrhmJ4u2+7Ho5vP4GSldKmpLPw0QFxD8L/avtgJnhPbEy4JJgMhJVtGoiYikAyf1042zTIBpAAYpHSxvvx6kJCAmB7sV8EaTZRIk2qjl4h6TXDO9qbW4JsT5ZCVKIeVKJtV6bLJKt3d21ayMGoJ4msdts5811S3HJkiEsTsyWkbkLx6x2z6Ad81QSjJxB7lSgDezLzUIBAtIyEkWUXUhESTJU/v1O0y8Quq09LlqH5ZzQAAAABJRU5ErkJggg==";
  var le = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABTElEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmEZ7DzdUqR0MYAPRDUIxFaQZplFBQQFswIMHD1AMOrhjF4ohcANgmnFpRAbIhmB4Ad1GQoAJXUFHrCpOPdjkULxwfGk2IQvBwDJ6KjwcMFwAU4AOQJqwARQDnj+4D1aDzSUwMZgaGMCIRmTNMFvRxZDTAkbqQk+B6AA9IaFEI0jzvBZrDE3IIKmG4T+yIfAwAGnW94himHhEHqcBIDmQGmRXgr0A00wKuLhjGdg7TCDNsED68OEdQTNgakB6QHrhXpgRK0hQMwwgq4V7ASQpb+FBlCEPT+wAqwN5ARwLIAY4YJ69IMoAmB4QjZEbYeDDxw8MHz9CygJ+fgUGAX4BrIZjNQCmGRbf2kqg0gi7ISgGfHm1D2wLRFAIxUaWn+cYvryCCSHkUAx4+wNVEzLAJQcAklqRIvYfIFoAAAAASUVORK5CYII=";
  var ce = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAbklEQVR4XmNgwAG0lQz+gzAueawApOHbSVcwxqWZCV0nSOHp5aJwYRAbm2YUjciaODWSwRgEsGlmhBlNrH+u3rsA1oNiI7oTYQBZHAYw/AgCV85X4NWEYSMM6Bh2wNmmka+xhjxWG4kBZAcO2QAAfZsrzmTyk40AAAAASUVORK5CYII=";
  var ue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAiklEQVR4XmNkQAPaSgb/0cVA4Oq9C4zI4nAOTMPJq6ex6WMw1zbFNACk6cv332AMAjA2NhpmAROy8dwcLAxff/zBaiM6YASZgMt5uADI2Sg2EgOu3n8JVkayRhggSSPMNjhADlVcIXry2hMwxghVDNOQADY5jAQwb8sWrGGU5OODkgBQkhEIEJvkAMOUeyWuGJLUAAAAAElFTkSuQmCC";
  var de = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAT0lEQVR4XmNgIBMwIuvTVjL4j8y/eu8CijwyYEK3cF6LNRgTAhgaiQX018iCz2nIgYUeUDg1ogdQUg3Df2TNGBovXblFVPhgaJyw4jVRGgGLLBU1avGiAgAAAABJRU5ErkJggg==";
  var he = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAUElEQVR4XmNgIBMwIuvTVjL4j8y/eu8CijwyYEK30F/5CxgTAhgaiQX018iCz2nIgYUeUDg1YgaQwX9kzRgaLzz9hsMRPCjiGBof/hAjKmABYCUUpS7iGQcAAAAASUVORK5CYII=";
  var pe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAJElEQVR4XmNgGAVUBjUHov6DjITRRAP/Ln2wRmyAiWhThjkAAEVKBzT4e7OuAAAAAElFTkSuQmCC";
  var me = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAi0lEQVR4XmNgoCWYdSP/P8x8FnwW1RyIgitM05jICFPLBGMgmwQC/l36cA3oAK4bBJBNvnzqKsPGsotg+f+bF/9/OHcmg/elLwxX711ghNuED4A0YACQSQ8CbP5rKxnAnYTsPJA4DIM0gwMCq0lIAOQkZD5YE8itpAAUE0Agz1kTI9Qm7b2OoW4QAwDu3DcID9CkZQAAAABJRU5ErkJggg==";
  var fe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAW0lEQVR4XmNgoCWYdSP/P8x8FnwW1RyIgitM05jICFPLBGMgmwQC/l36cA3oAK4bBJBNvnzqKsPGsoso8hg2UQXgcx7cT6QAsjRheDTPWRMj1CbtvY41QAYpAACJCxiSk1/JhQAAAABJRU5ErkJggg==";
  var _e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAcklEQVR4XmNgQAM1B6L+g4RgNEGASyEjsk5tJQOwqcjg6r0LcDUsMAmQwnkt1hi2JtUw/IdpYALJIitMqjkK1gCjQQbAbAQrRgYw07HZgqL40pVbKBrR+XDH43bzUbgnSQoNFIAedOh8uJvRJZCDFMYGAPm6NKs4e1P+AAAAAElFTkSuQmCC";
  var ge = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAaUlEQVR4XmNgIBMwwvRpKxn8h7Gv3rsAF8cFwApAmvIryuBqJnZ0EdTMhGwiSAOxAEUjsq0gVyA7Hx1g9SMxzobbCAoQ5EAh5GwUpyIDQs7GGuzIfsPlbKw2EuNsnE7F5WwYIJhCcKUoAJHpNhLxUFnJAAAAAElFTkSuQmCC";
  var be = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAi0lEQVR4XmNgYGBg0FYy+A+icQGYPAtMASENIMACUhRvzIbPYDBYyGDwnwmmqnjeIjBGBuhicMUgoKcfgWEDshiK4ksXV4AV55TwwzXBxMBuhon2JsVhmIouxnT13gXGhWd/gRXaB5qC6ct31VD4IHmQOkZYOOMLERTFMA24wg9kKobct5OuKBrQ+QBxOjcCVqeAswAAAABJRU5ErkJggg==";
  var ve = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAZklEQVR4XmNgwAG0lQz+gzAueawApOH6LG0wxqWZCV0nSOGait9wYRAbm2YUjcia5PWl8GrGsJFYANeIbtvDi89QzEB3MlYb0TVhA2CN6AGCCyDbygJTFNLBSqz38AOaJQCcgJCNADMaPQ4LmNiBAAAAAElFTkSuQmCC";
  var xe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAk0lEQVR4XmNkQALaSgb/kfno4Oq9C4wwMTgDpOmKbwVC7YRwCLtgJVxMZ3MHimawpv/5KyAYBnDwYa5iQXEOyBYkG1BsRJND1QgDMGfCALphDAwMTDgDA6QYiwYYQNUIUojNuWiBhAKwBhBaQCFHFzw6QICUeMQJXt458B+EcSnAHTgEAP01Yk8ADAwMTm4FeB0LAD5Oazlx0ThoAAAAAElFTkSuQmCC";
  var ye = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAVUlEQVR4XmPUVjL4z0AGYAHpObi9jCSt9p5dEI0gAOIQA2CWwDWSaivRNsIMfvXsAdhhJNsoJqWAqnFw+BE5wN5WzwQ7Ubg1nXg/wjSBAIzNSG7KAQAEESPZ8K+fVgAAAABJRU5ErkJggg==";
  var qe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAALCAYAAAAeEY8BAAAAh0lEQVR4XmPUVjL4zzCAgAVk96WLKwbECXr6EQxMA2IzEgCHAAjcSUyHC6vMn4mTD5JDVg/jw8RwyaObDwMoIQDSjGwgNj4uh4LE8TkcBJDNxuoAdIBsGboPcfFJBXjTALqLyfEhIYDiAJCPkX2NzicVwKIFWzqDAUZQOTCisyE4BEgNWmoCAFEJUTC8zbJcAAAAAElFTkSuQmCC";
  var Ae = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABPUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxt5pU1DUF2flgPnoBqEYANIM06ihoQLWcOPGHQyDkA2BGwDTjEsjMgC5BmYIC7q/0G0kBJjQFQhem4VTDzY5FBfAFJBiCIYLQCBpyiUMV2ATAwEUA+4/eQMWnJejh2EATAymBgbgBoBCtXnDMxSNIFvRbQapwRqNMICeAtEBwYR0erkohiZkYBr5GsUQuBdANgfoFjO0tsXhNAAkB1KD7EpwSoRpJgVsuNwLdgkTSDMshB+9vkvQDJgakB6QXrgX/Ox3E9QMA8hq4V4ASRpJBBBlyLkXG8DqQF4AJ2UQA+Scv2IfiDKA4QWiXMDIjTDw4cMHhoePLoC58nIGDAICAlgNx2oATDNSovnPwIDdEBQDLl46gNMLINc8fIQpjTU3kgIABiOOzsFEiYoAAAAASUVORK5CYII=";
  var we = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAa0lEQVR4XmNkQALaSgb/kfno4Oq9C4wYgoQ0gQCGGmI0wQBMLSMpmpABC4gzr8Wa4dKVWwx6OmpE0RNWvGZgAmkkRRPIcBBgAoUUyARiQVLNUXDogm0kxVYYAGsk1laYbSA98AglNnRhiQAAsGZXGJZ4nwMAAAAASUVORK5CYII=";
  var ze = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAa0lEQVR4XmNkQALaSgb/kfno4Oq9C4wYgoQ0gQCGGmI0wQBMLSMpmpABC4hz8sQyhpcvXzOIi4sSRfv55zMwgTSSoglkOAgwgUIKZAKxwNwiChy6YBtJsRUGwBqJtRVmG0gPOHBgACRBLAAAgnVQAoZVQrkAAAAASUVORK5CYII=";
  var Ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAiUlEQVR4XmNgwAK0lQz+YxPHACCF3066/ieoAabw/8cVWDUwwYwGKTy9XJSBUyMZbhuIj2wDI0gGphAXMI18zXD13gVGJmSFIEFkAOPDbAA74+HFZ2A1IEFkAOPD5JlAxod0sMIF0AFIIUgepA7sZpi711T8xlAMUwiSgCuGaUBXDTIRa2QQik0ABhJM2hXjWN8AAAAASUVORK5CYII=";
  var De = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAhUlEQVR4XmNgIBMwIuvTVjL4j8+cq/cuwNWzwBSCNMUbs+HTx7CQweA/TDPYBJimhy8/4NUoLy7AsPDsL7DNcBtBAgwMXHCNp5eLgtmmka8Rhj0BqYEAuEZkZ0IMQQBscnCN6AphNuHyN4pGkB9B/gABdA3IciDAhGwTTBM2gC6HFjjEAwCv6C4Kp70EiQAAAABJRU5ErkJggg==";
  var je = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAYAAAA4R3wZAAAAW0lEQVR4XmNgoBb4dtL1P8wsZDY6YEIWACl8dfA7mH7QZQM2AEajA0aYgLaSAdwmXODqvQtw9SzIigxiO3BqurC4AkUO7lSQaeiSMAASR7YNBOBW43MyuiYQAADrCCfh7w5WyAAAAABJRU5ErkJggg==";
  var Ne = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABL0lEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxsMXT6Cot9W3APNxGQQGIM3vPv8AYxiA8WE0usvgAKYZl0Zkg5ANYUH31/svP3EFC1bAhC7KcmUxTgOwyaG4AKaAFEMwXAACltFTMVyBTQwFgAKGWIA3JpABSCG6wTg1wwA+l2DTjDUMyAYgG+YfeIEzKEBy6K4A5wWQoEFsB0kWX1hcAc4XTCDNx5dmgzW/f/uSoCEwNSA9IL3wMJju8ZigZhhAVgv3AkhS3quQKEMebuuHZ21wUgb5BeScT+9YiTIApgdEY+RGGPj09j7D39urwVxm1VAGPmFFrIZjNQCmGVb6aDMw/P/EgN0QFAP4HrSAbeFjYGB4yMCGYqPM56UMDJ8hQu+R5FAMePgCVRMywCUHAPk0KKkxgUMaAAAAAElFTkSuQmCC";
  var Ee = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAYUlEQVR4XmNkgAJtJYP/MDY+cPXeBUaQPAuyonVG/Hg1BZ37CJdH0agyfyZejQz6Edg1goAekiQMXLq4AsNAFBtBAJsibABDI7KN+AyhjY34nE62jUxYfU4EQLERW1TgAgCTixmhPau7RQAAAABJRU5ErkJggg==";
  var Pe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAiUlEQVR4XmPUVjL4z0AGYAHpWVPxmyStIR2sEI0gAOIQA2CWwDWCgL2HG5g+uGMXnA0DIDFkgKIRBmAGIAOE2FawMIrGSx8M4Gr1BC7A2TDx9ye6GHKhSpjQ/ZVc4w8WAimGYRAAiQtalMGVY2ic27IRaxihi6M4FeQUgsABogKukdS4ZCQ35QAA3joqb90vig4AAAAASUVORK5CYII=";
  var Ce = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABM0lEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxt5pU1DUF2flgPnoBqEYANIM0ygnJwXW8OjRMwyDkA2BGwDTjEsjMgC5BmYIC7q/0G0kBJjQFVjxX8epB5scigtgCkgxBMMFIGAZPRXDFdjEQADFgOcP7oMFjy/NxjAAJgZTAwMY0YisGWYruhjWaIQB9BSIDggmpEsXV2BoQgZ6+hEohsDDAGSzSIQUg1N7EU4DQHIgNciuBIcBTDMp4M2KZ2CXMIE0wwLp/YM3BM2AqQHpAemFe2GzbyBBzTCArBbuBZAkswUbUYb8PfELrA7kBZTcKC9nQJQBDx9dwJ0bYeDDxw8MHz8+AHP5+RUYBPgFsBqOkZ1BAKYZlmi0lRj+MzBgNwTFAJDTcAGQaz5+xJTFmhtJAQBOs4jkQ/R22wAAAABJRU5ErkJggg==";
  var Re = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAhUlEQVR4XmNgIBMwaisZ/AfpvXrvAiMxZsDUM4EUz2uxhgvgAyBNILUgwAJTCBJIqmHAajvMFpgmEEBxKszEpJqjKBZDDD0K9g7MELiNMH+CbEU2GQRgmpBNQ9EIAwfXn2ZYePYXQ7wxG4JmMPiPHIBYQxXmHGQA04TVqTBATNSAo4McAACGx0XNoOdf7gAAAABJRU5ErkJggg==";
  var Me = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAjklEQVR4XmNkwAK0lQz+IwtfvXeBEV0ZigBMQ35FGYq6iR1dYD6yAXCNIE0wDfr6OgwXL17BcAvIAJhmsEZkTcgAZhOyC2CaGbFpgml4//kb2BxBXi4wDTMAJM+E7h6QIEgDTBMIwPgwA0EARSNMEwjc2SIPNxPGBhkA04xhIwyo+DzEyoYBsB+xxSUhAAAgOEihrzeubAAAAABJRU5ErkJggg==";
  var He = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA4UlEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgQA/vwKK9MePD3AqZ8IpAwUJkVGElIABQYMWLF9GlEEo/sUVLrgAcnhhBBzIMHsLL7yuOHhiG0ago3gNZoiBgQFeg0AWobse7iJkl5R9OwQ2yPvSF7AmEMAmhuwygoFNLMCajrq47MD67S0QxmATQwZYDQI5+dLFFVgdo6cfAfcuMsCIfliYgAzDBpDlaRL9WBMkeh5DB7A8h+wieKwRkxCRAXpaQklHMIXEuggEcBUrYJdlRVX9x5bv8MlhTZC4YgwEcMkBAGDNZh8yq2hjAAAAAElFTkSuQmCC";
  var Te = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA20lEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgcAXTy0UaZ7t13AqZ8IpAwUNtVWElIABYYOa24gyCMW/uMIFF0AOL4yAAxkmMjcfryveJE/ECHQUr8EMSdA0xWsQyCJ018NdhOyS7VzLwAaZRr4GawIBbGLILiMY2MQCrOnI81sUWL/IXIQx2MSQAVaDQE6+dHEFVsfo6UfAvYsMMKIfFiYgw7ABZHmaRD/WBImex9ABLM8huwgea8QkRGSAnpZQoh9XuGADBNWCXGa/f/5/bPkOnxzWBInPNlxyALVoZIwJW+pwAAAAAElFTkSuQmCC";
  var Be = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABRElEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxq2RnCjqvZd/B/PRDUIxAKQZplFIVRGs4d3t+xgGIRsCNwCmGZdGZAByDcwQFnR/odtICDChKxDyScKpB5sciheOL80mZCEYWEZPhXsBwwUwBegApAkbQDHg+QNIiGNzCUwMpgYGMKIRWTPMVnQxrNEIA+gpEB0QTEi906ZgaEIGxVk5KIbAwwBks6BFGUPLokc4DQDJgdQguxIcBjDNpID3J7rALmECaYYF0qe3qOkeG4CpAekB6YV7YVvuV6IdgKwW7gWQbmbVUKIM+Xt7NVgdyAvgzARigJzDJwzJwoTA+9uIcgEjN8IAyK8wm0Auw2U4VgNgmmGJRpuB4f8nBuyGoBjA96AF7AA+BgaGhwxsKD6R+byUgeEzROg9khyKAQ9foGpCBrjkACDElCQ2QY4WAAAAAElFTkSuQmCC";
  var Le = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABMUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxpItR1HU9/hYg/noBqEYANIM02guxQXWcPLZNwyDkA2BGwDTjEsjMgC5BmYIC7q/0G0kBJjQFQR/XIZTDzY5FBfAFBAypAfJCgwXgIBl9FQMV2ATAwEUA54/uA8WPL40G8MAmBhMDQxgRCOyZpit6GJYoxEG0FMgOsCVIsEApJkQwGkBSKLm0BswxgVg8siGgMMAJBC4YA+Gc/GB9QkuYO8wgTTDAun8wzcEDYGpAekB6YVHYxnreoKaYQBZLdwLIEmFxhVEGfKgPgKsDuQFcFIGMUDOEbjzgCgDYHpANEZuhIGHt98xvD/RBeYKWpQxyKsKYTUcqwEwzbBEo83Q9Z+BAbshKAaANOID2ORRDIA5GRvAJQcA4SLN4Yc8QrcAAAAASUVORK5CYII=";
  var Se = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAZUlEQVR4XmNkQALaSgb/kfkgcPXeBUaYGJwBUnh6uSi6WgbTyNdwDUwgWZhCTo1kDMUgA2A2MiKbCDIFm+kgAJIDmwwDuBTCAFjxw4vPwHxCNNiD2EIBW6iwIAsiBxMMEGMQVgAAC74vpJLHwC0AAAAASUVORK5CYII=";
  var Ge = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA3klEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgcAciygU6ZQTy3AqZ8IpAwUWZaiG4QIEDTrRhdsVyADFv7jCBRdADi+MgAMZdiW3F6dmENCZXIwR6ChegxviqI7XIJBF6K6HG4TiEsUjDAxJr8E2w0HSaxQxdMMIBjaxAHs6micK1o8SVtjEkABWg0BeunRxBVbH6OlHoFoABRjRD3MFSvggAWR5mkQ/itdgUXri9Fms3kIGILXILsIe/UQAvNGPK1ywAYJqQU7+37/3P7Z8h08Oa16DuQC9EEM2HF0OADofaz+2+GHpAAAAAElFTkSuQmCC";
  var Ve = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA2UlEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgUBvyi8U6eI5bDiVM+GUgQL37DpCSsCAoEE7pzYRZRCKf3GFCy6AHF4YAQcy7PRyUbyuMI18jRHoKF6DGcKpkYzXIJBF6K6HuwjZJemF1mCDzr3YANYEAtjEkF1GMLCJBVhdRCxAdhHWBAlScOniCqzm6elHwL2LDDCiHxYmIMOwAWR5mkQ/itdgUXpo71OsrkEANrBaZBfBY42YhIgM0NMSSvTjChdsgKBakMu+nXT9jy3f4ZPDmiDx2YZLDgAqFmqCFmX3lwAAAABJRU5ErkJggg==";
  var Oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABN0lEQVR4XmNkQAPaSgb/0cWQwdV7FxiR+SgckGZhjnf49DO8/SGEYggTTDU2zW8/f8MwDGQBsivhBmADwrxceF0DAigGYLMRHaCrwQgDglYyMKCEAdwAWBh0pzjgNaN0zgGUgETxAkxz0pRLGIbAxNAtQDHg/pM3YI3zcvQwDICJwdTAANwAUAJp3vAMRSPIVnTXgNQgJyaUQAQBUlMiC7KVIM3xxmx4A3Ehg8F/rC5A1xzf3oVi0MLKMjh/4dlfcG+AvYCsGV0jOoAZBDOECaQZFsKENIMATA1ID0gvPBbsLTVQLHtw5xqcj8wGAWS1KF4gxgUgAPIG3AvI1iIHFC6ArgYlGh++/EDQEJAaeXEBuPlwA0ASIACj8QGIGkhZgZIbYYkIOZ5hADmqkeVRvACSwAewyQMALUed7v1vPaoAAAAASUVORK5CYII=";
  var Fe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAOklEQVR4XmPUVjL4z0AAMILkQQpPLxfFUGoa+Zrh6r0LjEwgGRADJIAMYAowdIJM/HbS9T9BJ2BTAADJSxfyBjBOawAAAABJRU5ErkJggg==";
  var Qe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAe0lEQVR4XmNgwAFiZpn/B2Fc8kzYJEAaFNSUcekBA0ZkWW0lA7gNhhXsDOc7fsKlr967gKIWzgFp2qrHg9MW70tfUDSDnQrTJJ+cjlMjyFBkF2H1IzEARePDuTNx6rnx6h2KHGU2gkIM5HlcAGRb8Qs2lMDBGR3oAD06AMzfLq2Ks+LpAAAAAElFTkSuQmCC";
  var $e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABRElEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmEZ9iV9oUhAD0Q1CMRWkGaZRQUwMbMCDV69QDLr4gg3FELgBMM24NCIDZEMwvIBuIyHAhK5gRm8hTj3Y5FC8cHxpNiELwcAyeio8HDBcAFOADkCasAEUA54/uA9Wg80lMDGYGhjAiEZkzTBb0cWQ0wJG6kJPgeiAYELat2sChiZk4ORWgGIIPAxANgfUSDFMOtSF0wCQHEgNsivBXoBpJgVsaHkGdgkTSDMskJ7ceUfQDJgakB6QXrgXyjUDCWqGAWS1cC+AJE0iOIgy5MyKH2B1IC+AMxOIAXLO72sWRBnAwHAAHhMYuREGPnz4wPDw0QUwV17OgEFAQACr4VgNgGlGSjT/GRiwG4JiwJNb65BsEUKx8curfQxf4IUTQg7FgLc/UDUhA1xyAF16k72TLyW4AAAAAElFTkSuQmCC";
  var ke = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABTUlEQVR4XpVTu0pDQRCdXLS3CFEkjWJnEIsg+QYLC0vLELCx8QdSmA9IkyYgKS0lWPgNIaQIQTvR5hJUbmEvGDkLM8zMXTd4mtzZPefMziMVcjjcP175M43n13lFxyaA+L67ldLT+c2XMcmYHRO/LT9LZkigXykGMezt1pKvAYxBLKOH55R6sDYlkemBGIS6vnMaXZ8mPdr9R6LNupiYEljcHixKJnzmE9ge5EUQjq6OSgZ8xhyGGGBBeuOlESKrfw04eplME4H/buKGTgnxbesi2cQO0Sr6Ai8+GZ4Zo+nlg8SdyZ2UEUrQYi/0YCM2ySDmDq8TA8yBBlqZQtZ8MsmKj3eJ9XfYf8XN0BCM6mfWMAbV7R2J9TcALjTQmkXSjfoLnmPG+FLkRKrbMYBzUK3LlRgEMZH8psBcwPwbeYn0nBl61PrelICLFGL3vz24n9MY/344AAAAAElFTkSuQmCC";
  var Ze = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABOklEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEG4xt9PUNWzyoD56AahGADWDNUozMsF1vD28zcMg5ANgRsA04xTIzJglYEbwoLuLwwbCQAmdPl5hV44tWCTQ/HCvBw9QhaCQdKUS3AvYLgApgAdgDRhAygG3H/yBqwGm0tgYjA1MAA3ABQ1zRueoVgCshXdZpAarNEIA+gpEB0QTEinl4tiaEIGppGvUQyBewFk8zojfobH3b9wGgCSA6lBdiU4GmGaSQFB5z6CXcIE0gwP4TcfCJoBUwPSA9IL98IHK3mCmmEAWS3cCyDJXjmUIgAnKH4EScAgL6AkZUGLMqJc8f5EF+7cCAOf3t5n+Ht7NZjLrBrKwCesiNVwjOwMAjDNsESjzcDw/xMDdkNQDAA5DRcAueb9bUxZrLmRFAAAe+iO9w5aTO4AAAAASUVORK5CYII=";
  var Ye = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAYUlEQVR4XmNgwAG0lQz+45LDCUCavp10/Y9PMxMu3Y+7f+G1EEMjyJZ1RvxgTSAal604bZQtZcNrIyOyLLJtyCDo3EeGq/cuoKhlwWYssm24/Ao3BZdtMIBuK4qNIEliAQCEzyJvsbVbGAAAAABJRU5ErkJggg==";
  var Je = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABSUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmEYHmW9oUhAD0Q1CMRWkGaZRXlwAbMDDlx9QDDrwhAvFELgBMM24NCIDZEMwvIBuIyHAhK6gvbMUpx5sciheOL40m5CFYGAZPRUeDhgugClAByBN2ACKAc8f3AerweYSmBhMDQxgRCOyZpit6GLIaQEjdaGnQHSAnpBQohGk+fh8OQxNyMAykeE/siHwMABpXmfEz/B88kecBoDkQGqQXQn2AkwzKSDo3Eewd5jAzobG//U3qOkeG4CpAekB6YV7QbI4hmgHIKuFewGku1UOpQjACaofQSIP5AWUpCxoUUaUK96f6IJHJ0ZuhIFPb+8z/L29GsxlVg1l4BNWxGo4VgNgmmHxrc3A8P8TA3ZDUAzQf9IAt+UAAxeKjbbfFzIwPIEIIcuhGAAqaXABXHIAhfWSHLl8a+oAAAAASUVORK5CYII=";
  var Ke = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABRklEQVR4XmNgwAO0lQz+gzA+NSy4JEEa1xnxg6WDGAz+X713gRGbWiZsgjDNkrn8YAwyCJdL4KaCFDjIfGOQFxcAm/nw5QecLj/whIsB5iIML+DTSJQX2jtLcdqMTQ7FC8eXZuMLcDiwjJ4K9wLWQAQpQAfYxEAAxYDnD+6DBbG5BCYGUwMDKHELiglkzTBb0cWQ0wRG4iCU8tATFEo0gl0wXw5vQFomMqCkSngYwFLf88kfcRoAkkNPlWAvIKd7YkHQuY9g7zAhB9z1N7iTLwzA1IACFqQX7gXJ4hhiLUdRC/cCSHerHN6sDwfVjyCRB/ICSlIWtCgjyhXvT3Thzo0w8OntfYa/t1eDucyqoQx8wopYDcdaIsE0wxKNNgPD/08M2A1BMUD/SQPclgMMXCg22n5fyMDwBCKELIdiAKikwQVwyQEA+heNA4ixDLsAAAAASUVORK5CYII=";
  var Xe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABRklEQVR4XmNgwAO0lQz+gzA+NSy4JEEa1xnxg6WDGAz+X713gRGbWiZsgjDNkrn8YAwyCJdL4KaCFDjIfGOQFxcAm/nw5QecLj/whIsB5iIML+DTSJQX2jtLcdqMTQ7FC8eXZuMLcDiwjJ4K9wLWQAQpQAfYxEAAxYDnD+6DBbG5BCYGUwMDKHELiglkzTBb0cWQ0wRG4iCU8tATFEo0gl0wXw5vQFomMqCkSngYwFLf88kfcRoAkkNPlWAvIKd7YkHQuY9g7zAhB9z1N7iTLwzA1IACFqQX7gXJ4hhiLUdRC/cCSHerHN6sDwfVjyCRB/ICSlIWtCgjyhXvT3Thzo0w8OntfYa/t1eDucyqoQx8wopYDcdaIsE0wxKNNgPD/08M2A1BMUD/SQPclgMMXHA2yCCQIfrfv4HFkOVQDACVNPgANnkABFKQFKD2XukAAAAASUVORK5CYII=";
  var We = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABSklEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmEYHmW9oUhAD0Q1CMRWkGaZRXlwAbMDDlx9QDDrwhAvFELgBMM24NCIDZEMwvIBuIyHAhK6gvbMUpx5sciheOL40m5CFYGAZPRUeDhgugClAByBN2ACKAc8f3AerweYSmBhMDQxgRCOyZpit6GLIaQEjdaGnQHSAnpBQohGk+fh8OQxNyMAykeE/siHwMABpXmfEz/B88kecBoDkQGqQXQn2AkwzKSDo3Eewd5jAzobG//U3qOkeG4CpAekB6YV7QbI4hmgHIKuFewGku1UOpQjACaofQSIP5AWUpCxoUUaUK96f6IJHJ0ZuhIFPb+8z/L29GsxlVg1l4BNWxGo4VgNgmmHxrc3A8P8TA3ZDUAzQf9IAt+UAAxecDTIIZIj+d0gxhyyHYgCopMEHsMkDAJAhlS3ov/YsAAAAAElFTkSuQmCC";
  var Ue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABK0lEQVR4XmNkQAPaSgb/0cWQwdV7FxhxyoM0EwI4LcCm+dGd81jNQzaECadzGBgYZJUN8EmDAYoBj+9eIKgBXQ1KgBAKQBhADki4ASDN8hyvGFbMbcTriojkeoaHP8TghqB4AabZMnoqhiEwMXQLUAx4/uA+WOPxpdkYBsDEYGpgACMMkDXDbEUXwxoGMEAoINFTIoYLtmbw4A1E7xlfcMcCsmb59FkoBj2cmQbnIxsCdgHI2TDN6BrRAcwgmCFMIM2wQCKkGQRgakB6QHrh0ShkG49i2cunt+B8ZDYIIKtF8QIxLgABkDfgXkC2FjmgcAF0NSzICm8+eMXAgBTa2ABIjbqCGFwKbgBYMwMDnMYHIGq5wEpQciMsKtETC3pUI8ujeAEkgQ9gkwcAA3/aWis6WRUAAAAASUVORK5CYII=";
  var ao = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAApElEQVR4XmNgIBMwouvTVjL4j8usq/cuwNXDGTANx+taUfRZNlWD+SBxGBtkAFgjSBO6BnwAZAATTBOIAzMRH3hw7Q5YmgVEgDjLQxIZFLRU8GoCAZgaJpjKyDXz4aYRA8A2ggAxNsKcCQJMoBAC2UaMM0EApBakB+xUEIOYgIFpggcODICcgiwJA6CQB3kFGcADh1SAkXJgTkc2CDkZIic7sgAAmY5KaV24qMcAAAAASUVORK5CYII=";
  var eo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAp0lEQVR4XmNgQALaSgb/QRhZDASwibPAFIEk87fZg7kTvRj+X713gRGmCZs4E7rkoUMnGEAKYbaA2CAxEICJg9gopsIU4APnO34ygFwD1gizFcY2rGBH0QtSDAMwL8A1ogcSTDPMBnRXgP2IDmCmggAyGxlg1UgMYMQWb8QAcDzWeosSoxYOmre+Rjj10t3ncAli2HA/6ilLwjUSw4ZrJMYWZDVkBw4Adpld9mxp0FsAAAAASUVORK5CYII=";
  var oo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAYUlEQVR4XmNgIBMwgvRpKxn8x6b/6r0LjNjkQOJgiUsXV2C1V08/ggGbHEicBaYDxEEGyBqQ5WDicI24bAUBbHJYbURXSHsb0Z0HsxHZJZT50am9CGcywCWHNwHgAqAEAAA4ejXUCr//DgAAAABJRU5ErkJggg==";
  var io = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABKElEQVR4XmNgoBAwouvXVjL4j8/Mq/cuoOhhQVYM0uxvwYVPPwMDg8F/ZENQDICBJy+/YTVERhzTcLBzCDkbFwC5BO4fkCHCHO8YtsytxakBBHySmxne/hCChwUTsmpCmkEAXQ2KATBgGT0VwxXYxEAAxYDnD+6DBY8vzcYwACYGUwMDKHEKCgdkzTBb0cWQo5H6CWmdET/eWAhCS0jwMAA5f16LNcOHIB2cBoDkQGqQ0w08IYEkSAFJNUfBYcGEHnAgcP/he6xmIYuDAhakF54XNBUNGK7fv0CUI0C2MzCAMAN5XvhmN4Xh9LLpDAtnzMKeGwmBHDtDuBJ4LODyNzZQm6oFFgYFIkp5QIohGAAUoieXZYMxtvIBlzxKeYBsKnrZh24oTB4AdPKK2HouRnkAAAAASUVORK5CYII=";
  var to = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAgklEQVR4XmNkQALaSgb/kfkgcPXeBUZ0MRCAC4I0TTl0HkNNjp0hVs1MIJXImhykUfWCDMPmErBGGABpOvAU02HYNKNoxKYJF0DRSAqgTCMoyEGhRwpAiSNsoYcMcMUpTgAysCrK6j+ywSy4lSMAxCaD//4WXAwgGsQnSiMi6SGSJAAQITIJkHDzQAAAAABJRU5ErkJggg==";
  var so = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAiElEQVR4XmPUVjL4z0AGYAHpObi9jCSt9p5dDEwwHUfSO0nSDNdoM7McrBGXAa+ePQBjGIBrhAFCBuDUiGwAsu1iUgpgDLMVbCOyE5AByHZcToc7lVjNIFtBAMOP2AA2m8EaYe7HBd5WzwRrBtEEAwcZCLemgzWBaJI0wjSRZSMIINvISG4iBwA+ETkVh0n8EAAAAABJRU5ErkJggg==";
  var ro = "data:image/png;base64,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";
  var no = "data:image/png;base64,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";
  var lo = "data:image/png;base64,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";
  var co = "data:image/png;base64,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";
  var uo = "data:image/png;base64,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";
  var ho = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAd0lEQVR4XmNgIBMwwvRpKxn8J2TG1XsX4OpZkBWLREjh1PtmxTMUORSNIICuAASwGYihEQSQnYTLC0w43YYFgAyBGUS0RpBzkZ2M1anIAORs7RUM4BDH0AizHhYwxEQN3MZ4YzbC3r39hmEhVBVc48KzvwhrRAIAq8Uh3HKKRuQAAAAASUVORK5CYII=";
  var po = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABCCAYAAAA476rKAAADtElEQVR4Xu2bMY5UMQyGB7QVhwCJColiVxQUXIYOcQAKCkSBtqDgAIiOy1BQrHYLJCokOMRWSCDPYjAZJ7bzHE9mnj9pi3mbSfL+5zh//HY3myQ5Rm5539TD+2e/NH1++XbpPvbsnIyY4L27Z81uv/+4HDHs9NyefoZHRIodSIodSIodyJANcmYktzTSJa1ObKDmlka7pEwjgaTYgaTYgaTYgaTYgaTYgaTYgaTYgezUlKUTVqKnPI2yJ8jTR4/1PSYsVxefd65nGgnkKGojNIpmXpWi2K/evNw++/PXb9UxEHnz5XKFzyME59ICR2tsUWwL3ITwmrcA2O/T5882H99/+DtN+tl7TKk/6YGwbuT0wROLxpurr5+27eFGgfLm6TVr3yU4Fh2Pg85h6ZgAjKsRG8eC9io3srnzUy02PE0UGSk/lw9CmrQ7hvtZTGOsbjcCIkvLpkbvd5eMNwOuOTsCbtVwaYu2o7/fJ12R3RthO/mXMf6t1SAJTfcGCnzPMtYozJHN5WgLpWAQdVIOR6GgrSZia+1G2UItvNjX5mewjMjxRo/V6J9XtbKjaqOay6E10BdL0e1Gwy1IhzFVKmr07x7C5WZULuke4EHULCa3+XFWtJWuNIcxj2BQb5A0b9ao7fq163RDk6IGblYrbElNaGpBa2eFXpvK4R7Zo5FsHlJ7wOVDpSLXBIe+pBSjQR3ZM9C7lGvf46wkh7adBC827KjFD575WwPXfqf5zrZ/Ztydaz3Qfj3onKfJjWjgqnAqlPULjFJY1rj5ylW/m1oPrRRaoUU2TVGKg6/6NV6Lae2fFs2hpgW3sdbm7zV3zZxhrLLqd1A5m6MUtiW0BIiIPxLcQ5YwRzZdjohlAyldQu+mZ0WKao2tpEjR7RbZXgJ59SMhnRGs5wNsb43u/dZGRtcpIjDcQ7cboa7Ayr+I1r8RmhaliwK6cnZJaama7yArTse6JHto7S0ROdtFbKQlWE1kzXc90QquaSdZZN0L30641CKJXGJtL4EBgJXDFhZX1TPPIYWonolEsbTky6UbLft1I5Fcn2zrL3DURsEskUxFvqnj2Cff7UZGMWyjNLgGkc6+Dv64vgRtStC2kxiSs2eG7idYOQRafzMIeOxDqxObUpZrKRjNHiIjqxYb8bCsGlblRiT++2vXDrchMZ0bGUang/Bk1W4kmhQ7EFFs+J8a/L+apI5GJ1HsxA/RjZy/ePdntAN3iYY3Kj1odEo3Esg04ep5UpsVVuxhlbckSY6Q38GBAyLbxjvcAAAAAElFTkSuQmCC";
  var mo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABCCAYAAAA476rKAAADx0lEQVR4Xu2bu4pUQRCGR/EBJjF1wUgwcBNBTDb3DcyNZDMNDTfUbDEy3zcwNxHBZA0EI0FTk3kDpRZKit7qrsuprukz2x9sMLM9fflPneq/68xsNpPJIXIrelEP7x//1fT5/edl+Nijc6fHBI/uHTe7/fX7sseww3N7+BkeEFPsRKbYiUyxE+myQY6M5JZ6uqQbJzZQc0u9XdJMI4lMsROZYicyxU5kip3IFDuRKXYiU+xErtWUpRPWRE95GmVPkCdPnul7nLB8+vLx2vszjSRyELURGkUj35Wi2KdvXlxd+/OzD+oYyFx8ebvC6x6Cc2mBozW2KLYFbkL4XrQA2O+79+ebVy9P/0+Tvo4e8+vF3aYcj5//af6fdSOPHjy1aLz59uPzVXtYKFAunr5n7bsEx6LjcdA5LB0TgHE1YuNY0F7lRrbbrVpsiDAUGSlflxciOuIkLOtZSmsstxsBkbV5rMT72SXjjUBozs6Au2u4tEXb0f/vE1dkeyOMi3AtXLqiewHCCQvCR815CebIri1aSxmZII6Uw1EoaKuJ2Fq7XrZQCyv2brfTfj6EzPF6j9XqnxW7tqNqo5rLoTXQF0vRHUXLLUiHMclHA63+zWlEosyZ5S3tAS5EzWLWcjRFuqCaw1hEMKg3SJo3a9R2/dr7dIOTNjBYrFbYktq+QC1o7azgtakc4ZHdG8nmIbULXF5UKnJNcOhLSjEa1JE9At5bufY5zrNzaNtJqN0InPnhvN8auCwKIZrPQP+9nEJ0v97+TG5EA1eF06CtX2CUwm2Nm6+26kcrhVZokQ2CznOXsVW/Vkda+6dFc6hpwW2stflHzV0zZxirrPqtKmdzlMK2hJYAEfFPgrvIEubIBlo7ukTpEjy3owcpqjW2kiJFd1hkRwkU1Y+EdEawng+wvTW61W6kB95dfSQsa3C7EeoKrGRFdAZaFwW4cnZJaalazyCXbGBLafn9jJwdIjbSymFSNFvznxet4Jp2kkVWPfD1wqUWSeQS6Qm2FSyLYuWwRUvgEuu6gC6FKM9Eslha8uXSjZa9upFMwDVgfQcFs0QyFdlbx3G7kV5onoZ4sLgGCW9fqz+uL0GbErTtJLrk7H2CG2ztDqH7CVYOgdZ3BoGIfWgVYksCeinLtRSM5giRkVWIbcGT8yMsq4ZVuBGPgCWaGgb9tqumvZXh3IgFS3rxOohIbrQbyWbVOTsivWQiRjb8pgZ/VzOpo9FJFHsSh+hGzl6/jRttj/RwFxSNTqt2IxZGcCPDbJCRJ7VRYcXOemoymUwOgX8xOw4I4eHhhgAAAABJRU5ErkJggg==";
  var fo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAoklEQVR4XmNkgIKbIfb/YWz1NQcZYWwQiK7fAZdb2ugBlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5FdA9eIDL7fmMuwhF8LjHEBFmwSIA2HDp2ASNlZMMR8vIahDKuNyAqxacKIDnzg4cVnKNJEhSpIU0gHK0qokh2PABJjQnpFOluwAAAAAElFTkSuQmCC";
  var _o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAoklEQVR4XmNkgILrs7T/w9iaaVcZYWwQ+N+/Fy7HWOgMlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5Fdw4LN+Bsrm1GE5fWlMJTBbUQHIMXYNMAAVhtB4OHFZ1j9ilcjNpsgBrHCNcKdCgpuUMhhAyBNIR2sKKFKdjwCAJpWOqM5mlSyAAAAAElFTkSuQmCC";
  var go = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAoUlEQVR4XmNkgIL5B178h7ETHSQYYWwQ+P//P1yOkZERLMeETTGyIdg0oWgEAXSbkAHMJhhAcRIIaCsZwJ2FDK7eu4CiFoUD0nR6uSiKBhgwjXyNohnuR2RNnBrJGJpBBiK7Bq4RBfCFg7mcZruw2o4RODDw/ZQbXk04NYJsAmnGB7A6FaYJWfPDi89QzIFrBAU3KOSwAZCmkA5WlFAlOx4BFGY+a0c8vlQAAAAASUVORK5CYII=";
  var bo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAArUlEQVR4XmNkgIKqKKv/MHbbsmOMMDYInFyWDZczj5oKlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0QzXCNMEUgAD6IYga2ZBNh4kMeXQeYQtdoYYmmEAHqqkAhQbQU4D2YLLqcgARSMIIPurZeJXhpp8brD4w4vPGBgYWLFHB7ZQBWmOdfjIENLBij1UYYDYeAQACdlG0nhjzEUAAAAASUVORK5CYII=";
  var vo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAqklEQVR4XmNkgIJZs5b9h7HT0qIYYWwQqPZfDJdr3RgLlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5Fdw4LN+Nkr/zEwMCTCpWL052Mog9uIDkCKsWmAAaw2gsCSiwgbsQGsGrHZ9PDiMwYGBla4GXCngoIbFHLYAEhTSAcrSqiSHY8A0SE+KKUU+ysAAAAASUVORK5CYII=";
  var xo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAsUlEQVR4XmNkgIKbIfb/YWz1NQcZYWwQmJ1zBi6XOsUELMeETTGyIdg0oWgEAXSbkAHMJhhAcRIIaCsZwJ2FDK7eu4CiFoUD0nR6uSiKBhgwjXyNohmuEabpcfcvuGLZUjYUQ5A1syDLgDQ9m3AAIVTggKEZBuChSipAsRHstAIHnE5FBigaQQDZXy0TvzLU5HODxR9efMbAwMCKPTqwhSpIc6zDR4aQDlbsoQoDxMYjAIXeQ9dt6w6vAAAAAElFTkSuQmCC";
  var yo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAoklEQVR4XmNkgIKbIfb/YWz1NQcZYWwQiK7fAZdb2ugBlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5FdA9eIDL7fmMuw8vtiMMYFWLBJgDTs2X8BIuW4mCGcMxZDGVYbkRVi04QRHfjAw4vPUKSJClWQppAOVpRQJTseAdIIQuftnwPUAAAAAElFTkSuQmCC";
  var qo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAqklEQVR4XmNkgIKXdw78h7HFVRwYYWwQqPZfDJdr3RgLlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5Fdw4LV+HmiDJwMFXCp71YdGMrgNqIDkGJsGmAAu40MDAycxxA2YgNYNWKz6eHFZwwMDKxwM+BOBQU3KOSwAZCmkA5WlFAlOx4BP+I9u17CefUAAAAASUVORK5CYII=";
  var Ao = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAApklEQVR4XmNkgIKuULP/MHbZ6lOMMDYI2EQtg8sdWRYFlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5Fdw4LN+J1N01GE7cLYMJTBbUQHIMXYNMAAVhtB4NCqX1j9ilcjNpseXnzGwMDACtcIdyoouEEhhw2ANIV0sKKEKtnxCAAtojydNQYrCgAAAABJRU5ErkJggg==";
  var wo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAnklEQVR4XmNkgIKbIfb/YWz1NQcZYWwQiK7fAZdb2ugBlmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5FdA9eIDL7fmMvA+aoLjHEBrBpBGm4t3A3GuDRjt1GsDG4RMhsZYNWIDTy8+AxFmKhQBWkK6WBFCVWy4xEAUkFEHGddcTMAAAAASUVORK5CYII=";
  var zo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAApUlEQVR4XmNkgIJZs5b9h7HT0qIYYWwQ+HbSFS7HZb4bLMeETTGyIdg0oWgEAXSbkAHMJhhAcRIIaCsZwJ2FDK7eu4CiFoUD0nR6uSiKBhgwjXyNohnuR2RNnBrJGJpBBiK7hgWb8d0pHSjCOSWYroDbiA5AirFpgAGsNoLAlJ7XWP2KVyM2mx5efMbAwMAK1wh3Kii4QSGHDYA0hXSwooQq2fEIAJWLO8Z1Z60kAAAAAElFTkSuQmCC";
  var Io = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAqklEQVR4XmNkgIJq/8X/YezWjbGMMDYIzM45A5dLnWIClmPCphjZEGyaUDSCALpNyABmEwygOAkEtJUM4M5CBlfvXUBRi8IBaTq9XBRFAwyYRr5G0Qz3I7ImTo1kDM0gA5Fdw4LN+DjPGwwMDNZwqZn9RzGUwW1EByDF2DTAAFYbQSC9EGEjNoBVIzabHl58xsDAwAo3A+5UUHCDQg4bAGkK6WBFCVWy4xEAGbM/j9I/pYgAAAAASUVORK5CYII=";
  var Do = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAApklEQVR4XmNkgIKbIfb/YWz1NQcZYWwQeHnnAFxOXMUBLMeETTGyIdg0oWgEAXSbkAHMJhhAcRIIaCsZwJ2FDK7eu4CiFoUD0nR6uSiKBhgwjXyNohnuR2RNnBrJGJpBBiK7hgWb8beSp6MIy5ayYSiD24gOQIqxaYABrDaCwOPuX1j9ilcjNpseXnzGwMDACtcIdyoouEEhhw2ANIV0sKKEKtnxCADkJTr5E4HuTQAAAABJRU5ErkJggg==";
  var jo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABK0lEQVR4XqVULQsCQRDdOyyCf0E4bGKxWkSMBpsYrto03E+5YtJqsl0wilgsgha1iC5c8A8IRmUOZp2ZvQ/BBwe3u++92Xm7d44SaNSabzlHcbodHTpmAxCvt5s8veq2O8zERXaaWGttmUEBuktjkAbP83J3A2AGaRUlJMfKoLCkUiwDY4AZlONlrserOmBBshZQ3PKnlgnOyQLM4KHviXC3GFsGOIcchJUBFWNVOUcvEzMA/H0Tg948N8RwNco+BSruB09mFIUVM6YmSQuwbRRLoQQaoYkLYgypSAxADmhAa45x6B9YMX09mzF9B1Aua+GXHQCgDdMCLUuDyoLklChRxxcVhfVMMQA4XvXLMQawgIQiIJcBEp1N9smTdhuz1tnnTB3lz1Oa4voH/CinLZ6fCm0AAAAASUVORK5CYII=";
  var No = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAABCElEQVR4XrWVPQoCQQyFZ8UrWApiJ+JP4zm01HNYeoY9hYWW3sPGH8ROBA+ykpFInMlLFtEHy8Bm5kv2DckWwVC/O66s+OV2KFC8qQUYOBssLW4IoYyJtQRZRoIysNPuRfD9cTUT7M5lBv8AM7QuUCqFv8Gy0m8l4arHtIGFfPb2NAigVbvftOIjASx6x3EpKoIvPoL/IdUKyjxZvOzQrPDiJBWMgOlnW4JgkuZvXTj0mKCn4zZy0GolhmDycTiaRzBarZY3rbAOevpZ56UtrVrhXZpsFKRsCNFGGoPe7OAKudPS0QkHNQnBtTGZCoIlVFbHF1oHnomgq+m6Qr8mLw5FBxGU5e15AgTNmFmrF7wYAAAAAElFTkSuQmCC";
  var Eo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAnUlEQVR4XmNkQAPaSgb/0cVA4Oq9C4zYxMEApAmbRmzicFNw2YQOYDaDNYI09Qby43QJMihe/xGsmQVZUEJcEK/mFy/fw+VRNIJA9IwHWDUvzVBAEcfQCAKnl4uiKDKNfI1hGFaN2BSiAxSNID/gCiRk/4EAisZLjz5i9R8M6MkhQh7DqQvPYtcbb4wqjqERXQEugKIR2SmEANlJDgBxJC/sKytjvQAAAABJRU5ErkJggg==";
  var Po = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAXklEQVR4XmNkgAJtJYP/MDYMXL13gRHEBhMgBVfOV4Dlvt+YC1dkGvkarJARpgBZEgYeXnzGENLBysCErhskgQ7AiggB8hTJ60thGAz33enlomBJZDeBHA32HTHhBAAG4Cn2fKXscgAAAABJRU5ErkJggg==";
  var Co = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAz0lEQVR4XmNkQAPaSgb/0cVA4Oq9C4zI4nAOTMPp5aLY9DGYRr5GMQCsEaQJWQOnRjJY0fcbczEMARkAsp0Jm/EgDTqGHVhthgEmdNtAAGTqlbvn4c5DBiCXgfSwwARhfgABkCYYraNsCNeH7B24U2GCME0wAOPD5B9efAaWQvEjSBLZBhAA8bGFNNbAgWnAB1A0wgIFZguIRg4kmDPBTgXFCSxg0J2KzekhHazgeISHKgyg+wc9UGAAI8mtqfiN1Wsgm0AAlmZREi4IEJvIAS0eZMDCK2oQAAAAAElFTkSuQmCC";
  var Ro = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAZ0lEQVR4XmNgoBRoKxn8B2Fc5qDLMyEr3KrHA1aArhkkBpLDCUAKHgTYoNiMTQwEGHGZ7n3pC1gKZBOIffXeBRS1GBpBANlp2DSBAAtRNjIY/Ee3EQWQ4kc4wBUIMKejBxqKRlLiEQBdvkt6RKsfqAAAAABJRU5ErkJggg==";
  var Mo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAfUlEQVR4XmNgIBVoKxn8B2Fs+lDkQJyXdw6AMboGdDlGkMC+XRNQDHVyK2BAFwMBFpgqkAIQAClCVggTBwEmUvzHCFKM7hSxzX8ZXvkyw80BmX713gVGsMkgBrJ1yAqRAdhkmOm4nAQyDEMOFlQwzaDgRFaE4UFk5yCzQQAA5oZFKN7ssUYAAAAASUVORK5CYII=";
  var Ho = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAWklEQVR4XmNgoDdgRLdQW8ngPzZHXL13AUUtCgek6fRyUayON418jaKZCaYKpolTIxmM0QHIQGTXwG3E5UR0AHMyWCM2J8KchkuOCZcTYU4D0dicDzaRnKgEALY8LQ0Gh3LpAAAAAElFTkSuQmCC";
  var To = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAJCAYAAADtj3ZXAAAAcUlEQVR4XmNgoAAwouvVVjL4j828q/cuYKiFC8A0bW3TwukW76prYDmYQUwgDkgjSBMI3zh9FawAGw1TA7OIEaaRVAByBdhmmC3EAph6sGZiDQBpAuHi9Yxgf4MDDOT03kCsgYwBYBpBEhihTQggRxkABpQ88wBAzVkAAAAASUVORK5CYII=";
  var Bo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA1ElEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgYCgRRmK9PsTXTiVM+GUgYJZXX6ElIABQYPSyjYRZRCKf3GFCy6AHF4YAQcyrGTaCryu6MmKwAh0FK/BDDHXkcFrEMginK4HSczfcQOMYYCQGLJhBAObWIA1HS3YeROuHxQeINDDwAD2Eq7ww+kimAHIAJsYDMANAkUlPoXoAD3mqBb9KGEEi4W5i85huAAdgNQiJ0i414hJiMgAPS2hBDapYYQXwBIhtpSLTw5rYMNsQi/EkA1HlwMAJzaCbgA2HJ4AAAAASUVORK5CYII=";
  var Lo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAfklEQVR4XmNgIBMwwvRpKxn8h7Gv3rsAF8cFWJAl1hnxg7lBDAb/CWlmwmkkAYBiIwyAbAbZiqwX3QVYNYIAzNkwgO58op0KMgg5ALGGKiEAcjaKU08vFyWkh8E08jVYDYpGmCDJAOSH/x9X/Ef2CwjgEocDkAJ0TcgpC1kOABZHMOn3UntZAAAAAElFTkSuQmCC";
  var So = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABLklEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmMZ4YzYUqYUMEAPRDUIxFaQZplFOgh9swKMXH1ENOvsLxRC4ATDNuDQiA2RDMLyAbiMhwISuIKMoFacebHIoXji+NJuQhWBgGT0VHg4YLoApQAcgTdgAigHPH9wHq8HmEpgYTA0MYEQjsmaYrehiyGkBI3Whp0B0QDAhran4jaEJGYR0sKIYAg8DkM29gfwMD2+K4DQAJAdSg+xKsBdgmkkBxes/gl3CBNIMC6RLj1DTPTYAUwPSA9IL94JVSAzRDkBWC/cCSHe8MXFmLDwLUQfyAkpSlpf4RZQJD1+wwWMCIzfCwJef/xjevucAc4UFfzDwsGNN9dgNgGmGJRpwtOEwBMUFIKfhAiDXvMUiid1dJAAAaYyJ2coPSHUAAAAASUVORK5CYII=";
  var Go = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA00lEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgUA87zsU6YWfhXAqZ8IpAwVpiTaElIABQYNmzT9ClEEo/sUVLrgAcnhhBBzIsHVG/HhdEXTuI0ago3gNZoi4jTReg0AWobse7iJkl6jNzQQbpGPYAdYEAtjEkF1GMLCJBVhdRCxAdhHWBAlScOniCqzm6elHwL2LDDCiHxYmIMOwAWR5mkQ/1gSJnsfQASzPIbsIHmvEJERkgJ6WUKIfV7hgAwTVglx2M8T+P7Z8h08Oa4LEZxsuOQCPk2RD4Mu4/QAAAABJRU5ErkJggg==";
  var Vo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAUCAYAAABWMrcvAAAAdUlEQVR4XmPUVjL4z0AiYAGpL/CaQ7S2CdtSIJpAAMQhBGCGwzWBQLwxG059C8/+gssxoat6+PIDihA6HwQwNMmLC6BoQudj1UQMGCTOyynhB2N0gOE8YgBKPKGDKT0fsZoxSAICFxjkzkMJcuTkjw8wkpPdARrDKoAPb2vUAAAAAElFTkSuQmCC";
  var Oo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABMUlEQVR4XmNkQAPaSgb/0cWQwdV7FxiR+SzIHJDmeGM2fPoZFjIY/Ec2hAmmGpvmhy8/YBgGsgDZlXADsAF5cQG8rgEBFAOw2YgO0NWgBAihAIQB5DCAGwDSvHbDDAapr5fxOvsZty5DcEAG3BAUL8A0W0ZPxTAEJoZuAYoBzx/cB2s8vjQbwwCYGEwNDGCEAbJmmK3oYljDADk9UJQS/XO58OlnYJiMmhJRYgFZc75vG4pBEzdXwfkbJ3+DewNsACgKYZrRNaIDmEEwQ5hAmmGBREgzCMDUgPSA9MKjscIiEcWyt68ew/nIbBBAVoviBWJcAAIgb8C9gGwtckDhAuhqUAqUpw+/ETQEpEZaHhHVcANAEiAAo/EBZDVY0wFyPCOnUFhUI8ujeAEkgQ9gkwcAKlidKEfGNsUAAAAASUVORK5CYII=";
  var Fo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAcUlEQVR4XmNkQALaSgb/kflX711gROZjBeiaQACbGAwwETQRBwA7BZ/JIIDsZJhaRhAjMSsNr8Xzp80Ca4apBfHhTtXR0cOrGVkTyBCibIQBmM0gPtGBg6yJaI3omojWiA2AnXru3AWcAYNLjuR4hAEA42c4BujyQagAAAAASUVORK5CYII=";
  var Qo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAcUlEQVR4XmNkQALaSgb/kflX711gROZjBeiaQACbGAwwETQRBwA7BZ/JIIDsZJhaRhDj9HJRvBabRr4Ga4apBfHhTuXUSMarGVkTyBCibIQBmM0gPtGBg6yJaI3omojWiA2Anfrw4jOcAYNLjuR4hAEAoJM3wE/UgMcAAAAASUVORK5CYII=";
  var $o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAlUlEQVR4XmNkQALaSgb/kflX711gROZjBeiaQACbGAbApQiXONgphEzG5mQWkKbVfVJgF5x4ZASmLeTOobgotIjhP0wzSD2IzQRTIazqiqEBHcA0gcThGt/e3o1iG8x2XKEM14iuEN256IAFJoBNIcKwZ7g1YgP4bAU79dK1p3B96E5GlkMGZMcjBvBefAMlvaLzYQAAqutCUxXe85QAAAAASUVORK5CYII=";
  var ko = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAX0lEQVR4XmNkwAO0lQz+w6Sv3rvAiKyUCZc+kKbTy0UZQJhoANL07aQrGCPbihcQqwnF3TDnIQPTyNdwLrI/MTTCVKH7DWQAegBhAGKdiwJorglrPBLlH2QAciax8QYAwVVKfZf+xdQAAAAASUVORK5CYII=";
  var Zo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAi0lEQVR4XmNkgAJtJYP/MDY+cPXeBUaQPAuyonhjNryaFp79BZcH60a29fRyUayaTSNfw20DASZkVSBngBSgA3RNOAHIv99OuoIxsX5HcTZZmkgNbXi0wJwKMgCbzSiBA1IACiCQJpiNIDZIDF0zPDpAEriiAgaQQxclAUzp+Yg7qNEAikbklEEIAADFc0d5+eR5BwAAAABJRU5ErkJggg==";
  var Yo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAfUlEQVR4XmNgYGBg0FYy+A+icQEMeVwakMUZQZyr9y4w4rIBWY4FxEHWUOA1B+6aCdtSwGxkebjA7Jwz//9+voFCYzgDZhSyqTAAMx0EmEDOgLkLBB48vo5CgwBMDROym0CmKMhqghWAaBAf5ieQGEmhAXcbMeEMDwliYhAAmJdfRMTvi5wAAAAASUVORK5CYII=";
  var Jo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABNElEQVR4XmNkgAJtJYP/MDYx4Oq9C4wgdWAC2RAjiQC8+s+92ADXDAJMyKpBpoIUwICdkQ+KYeiaMVyAzyXYNGM1gFBYwPwOA/AwAGncd+gAA+fj1XjD4LtsKIOTnQPcIBZk1SAJGDi+NBvOtoyeiiSOaj5KIJIDUFywrtWLQVJBEcMcZNc8f3AfRR4jHWBzOroYckCiGAACpMYCihdAmgN0iwkERe9/rC5A1+yX6Ypi0Kbpu+H8DZd7UfMCsmZ0jegAZhDMECaQZlggEdIMAjA1ID0gvfB0UF7xA8Wy+w8ewPnIbBBAVguOBZgXiHEBCIC8AfcCsrXIAYULoKtBicZHr+8ybJqOUy8YgNTIiSrDFcENAEnAFBACMLUggJKdYYkIOZ5hADmqkeVRvACSwAewyQMAIF2ffVuWi0QAAAAASUVORK5CYII=";
  var Ko = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAc0lEQVR4XmNkwAK0lQz+IwtfvXeBEZs6MIApBtE7dhxBwchyMAOYYJp6p00BawLR6ABZDmYI3AnomoqzcsD6kQ0CiaE4G915yH7EJceIzSb0wMCmBuxHsgFZToXZRlHgYItDWJzC5NATB8kJAGtSIibJAQCRaauW4Nc2YgAAAABJRU5ErkJggg==";
  var Xo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABMUlEQVR4XmNkQAPaSgb/0cWQwdV7FxiR+SzIHJDm7Yus8eln8Ixj+I9sCBNMNTbNzx89wTAMZAGyK+EGYAOScjJ4XQMCKAZgsxEdoKtBCRBCAQgDyGEANwCkuXdCBYOV6Ge8zj72mpehuKADbgiKF2CaLaOnYhgCE0O3ADUMHtwHazy+NBvDAJgYTA0MYIQBsmaYrehiWMMAOT2QkhIxXKCSwYVPP8OdGd9wxwKy5llBbSgGpa2rgvORDQG7ABSFMM3oGtEBzCCYIUwgzbBAIqQZBGBqQHpAeuHRuNg2EcWyt68ew/nIbBBAVoviBWJcAAIgb8C9gGwtckDhAuhqUAqUd08+EzQEpEZIhhduPtwAkAQIwGh8AKKGGawEJTfCohI9saBHNbI8ihdAEvgANnkAENmfxDtsTuMAAAAASUVORK5CYII=";
  var Wo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAlUlEQVR4XmNgQAM1B6L+EyOGFSBrxmYQXgDSgE8TIzbd2koGKM69eu8ChjoWdI0gTfNarFGEk2oY/qNrZkJWgU0TCIAMQncFXCMuTTCArhmsEVnTpSu3MLwNE0PWjOJUENDTUcPQiE0MI3BAAN1WojViU4gOUJwqIimNM1Ggy8EjllCogkBSzVF4YkBJEehxhQ6QEwEACpJA+EAUgc4AAAAASUVORK5CYII=";
  var Uo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAkElEQVR4XmNgQAPzJtX8J0YMK0DWjM0gvACkAZ8mRmy6tZUMUJx79d4FDHUYAiBNUybmoJiXkz8FQzMTsgpsmkAAZBC6K+AacWmCAXTNYI3Imi5cuoXhbZgYsmYUp4KAgZ4ahkZsYizYQhXdVqI1YlOIDlCcKiIqjjNRoMvB45FQqIIAcnyiJAD0uEIHyCkIAAauQmtVjrrkAAAAAElFTkSuQmCC";
  var ai = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAXElEQVR4XmNgoAfQVjL4D8Igu5iItRCkIXCeFrHKIQCkqeZAFNw2OEB2AjrApQnuVJAzYO6HAZjz1iddY7h67wIjVneim4zTedgAsmKsfsIHSLIJW4DgNZ2BgQEA1604+ng/MPMAAAAASUVORK5CYII=";
  var ei = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAA1klEQVR4XmNkwAG0lQz+Y5O6eu8CIzZxFlwGgYAyrx2K9N3Ph3AqZ8IpAwW62kaElIABQYMuXz1HlEEo/sUVLrgAcnhhBBzIsADdYryu2HC5FyPQUbwGN4T7L16DQBahux7uImSXVFctAhtkGvkarAkEsIkhu4xgYBMLsLqIWIDsIqwJEqTg0sUVWM3T04+AexcZYEQ/LExAhmEDyPI0iX6sCRI9j6EDWJ5DdhE81ohJiMgAPS2hxBpMIbEuAgFcxQrYZdX+i/9jy3f45LAmSFwxBgK45AABcmm+TTlJ9AAAAABJRU5ErkJggg==";
  var oi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABMUlEQVR4XmNkwAG0lQz+I0tdvXeBEZtSDEGYxvyKMhT1Ezu6wHx0g1AMAGmGaZSTkwNrePToEYZByIbADYBpxqURGYBcAzOEBd1f6DYSAkzoCiJ0v+LUg00OxQUwBYQMmYhkBYYLQMAyeiqGK7CJgQCKAc8f3AcLHl+ajWEATAymBgYwohFZM8xWdDGs0QgD6CkQHRBMSKeXi2JoQgamka9RDIGHAchmf+UvDC01kHDABkByIDXIrgSHAUwzKWDjXR6wS5hAmmGB9PTjd4JmwNSA9ID0wr1Q0VROUDMMIKuFewEkaSLymihDzryBBDTICyi5UVhGiigD3j55hjs3wsDbt28YGL7/gnA52RiEhUWwGo41L8A0g5wITjjff0HEsACU3AhyGk4AMgSLPFYXkAIAoWGSiaY/fhcAAAAASUVORK5CYII=";
  var ii = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAUElEQVR4XmNgIBMwaisZ/CdHLwtIU7wFN0l6F574CtH45OU7kjQyMLBDNMqIC5Gm8f5XBiaYjZ/S5ME2gzAhNgiAA4f+ftx7n500PzIwMAAADL0uBUQJ3psAAAAASUVORK5CYII=";
  var ti = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAiklEQVR4XmNkwAK0lQz+IwtfvXeBEV0ZigBMw75dE1DUObkVgPnIBsA1gjSha0AHIANgmplAksRoAgGQwTBXgTWSAxjx2fahoh6rmUHnPhK2UdxGGqtmgk59eeQpdo2gUIIFNzEA5EyQHoI24gJgjcTaCrMNpIcFZiJUMzipoScEkAacKQcZEJNWAScJQtaW/XoVAAAAAElFTkSuQmCC";
  var si = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABP0lEQVR4XmNkwAG0lQz+I0tdvXeBEZtSFnRBmMbj66xRpCyDGMAGohuEYipIM0wjr6It2IDP9w+jGXQUxRC4ATDNuDQiA0skQzC8gG4jIcCEruD6vs849WCTQ3EBTAEphmC4AASSplzCcAU2MRBAMeD+kzdgwXk5ehgGwMRgamAAbgAofps3PEPRCLIV3WaQGuS0gJG60FMgOiCYkC5dXIGhCRno6UegGAL3AshmkQgpBqf2IpwGgORAapBdCfYCTDMp4M0KSFgwgTTDQvj9A0gs4AMwNSA9IL1wL3SJiBDSCwfIauFeAMkyW7ARZcjfE7/A6kBeQMmN+hpcRBlw8cY3eExg5EYYePLyHcPb9xxgrrDgDwYZcSGshmM1AKYZlmgg0fYOqyEoBoCcBgEQm5EByDVv38PkEQBrbiQFAADJzZC7jAqNEwAAAABJRU5ErkJggg==";
  var ri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAaElEQVR4XmNgIBMwouvTVjL4jyx29d4FDDUgABeEadh3aA2KWU52IWA+ugFgjSBN6BrQAcgAZM1MxGgCAZDByN5gIjNsEE4lxgBcAUUSgIfq/GtfMWxN1OJmRBYH8WGmY8QRLgPQnQMACLwpW5ruuF8AAAAASUVORK5CYII=";
  var ni = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABLklEQVR4Xo1UMW4CQQxcTvzgEEV0RRRKCqgQvAJRR7wgDwhVCiruAXkByg/yB1qatNwVK5AQJ6VIT2QkO2PfZpdpwF7P2J5dXccZDJ/GV5tDfB32HYy7GBB5NJ3E+IQrimRcHSJ771ti1ACnFIEQiqJITaMFQh0tbI0yJGUgAz0QE4k8H/y41fo1OvbmrXTOjcVI5QGTZ8/vLRHO2QZK4FRXN+Lu46UlwDmuYbQ8QDJ3tTn0QAkQUkYmX2JePERNHJqXKBNQZyQvH89KaFv3JW78USa5CSDZEi1YiEUyIrNJKTKBa4hDXLnGz3KhmlWnb4nxPwFr1Qr3TECgNWQFbItG/Qdboz4oTXNxW/fndghUk+c9ORIBOiDwbwxYE3wHeM8MvGo81yv4Y7xz4PwXwmCa+hD2vFUAAAAASUVORK5CYII=";
  var li = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAdUlEQVR4XmNgGDKAEeZSbSWD/8iuvnrvAlwOG2BBFow3ZoNzFzIY/MenmQndNDkJfrAQyBB0VyADFBtB4NGLj3B5kGaQzTABZBdgaEQH6M4HyYMMIKgRWxiAXIEzVAkBFBuFOd4RUg8Gh649YkSJK3yhiB7HABsOI1oa4ZpQAAAAAElFTkSuQmCC";
  var ci = "data:audio/wave;base64,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IQEgAR8BHgEdARwBGwEaAef+6P7q/uv+7P7t/u7+7/7w/vH+8v7z/vT+9f72/gkBCAEHAQYBBQEEAQMBAgEBAQAB/wD+AP0A/AAF/wb/Bv8H/wj/Cf8K/wv/DP8N/w7/D/8Q/xH/7gDuAO0A7ADrAOoA6QDoAOcA5gDmAOUA5ADjAB7/H/8g/yD/If8i/yP/JP8l/yX/Jv8n/yj/Kf/WANYA1QDUANMA0gDSANEA0ADPAM4AzgDNAMwANf81/zb/N/84/zj/Of86/zv/O/88/z3/Pv8+/8EAwAC/AL8AvgC9AL0AvAC7ALoAugC5ALgAuABJ/0r/Sv9L/0z/Tf9N/07/T/9P/1D/Uf9R/1L/rQCtAKwAqwCrAKoAqgCpAKgAqACnAKYApgClAFz/XP9d/13/Xv9f/1//YP9g/2H/Yv9i/2P/Y/+cAJsAmwCaAJoAmQCYAJgAlwCXAJYAlgCVAJQAbP9t/23/bv9u/2//b/9w/3H/cf9y/3L/c/9z/4wAjACLAIsAigCKAIkAiQCIAIgAhwCHAIYAhgB7/3v/fP98/33/ff9+/37/f/9//4D/gP+B/4H/fgB+AH0AfQB8AHwAewB7AHoAegB5AHkAeQB4AIj/if+J/4r/iv+L/4v/jP+M/4z/jf+N/47/jv9xAHEAcQBwAHAAbwBvAG4AbgBuAG0AbQBsAGwAbACV/5X/lv+W/5b/l/+X/5j/mP+Y/5n/mf+a/5r/ZgBlAGUAZABkAGQAYwBjAGMAYgBiAGEAYQBhAKD/oP+g/6H/of+h/6L/ov+j/6P/o/+k/6T/pP9bAFsAWwBaAFoAWgBZAFkAWQBYAFgAWABXAFcAqf+q/6r/qv+r/6v/q/+s/6z/rP+t/63/rf+u/1IAUgBRAFEAUQBRAFAAUABQAE8ATwBPAE4ATgCy/7L/s/+z/7P/tP+0/7T/tP+1/7X/tf+2/7b/SgBKAEkASQBJAEgASABIAEgARwBHAEcARwBGALr/uv+7/7v/u/+7/7z/vP+8/7z/vf+9/73/vf9CAEIAQgBCAEEAQQBBAEEAQABAAEAAQAA/AD8Awf/B/8L/wv/C/8L/w//D/8P/w//D/8T/xP/E/zwAOwA7ADsAOwA7ADoAOgA6ADoAOQA5ADkAOQDH/8j/yP/I/8j/yf/J/8n/yf/J/8r/yv/K/8r/NgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  var ui = "data:audio/wave;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  var di = "data:audio/wave;base64,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ZAtgC1wLWAtTC08LSwtHC730wfTF9Mn0zfTR9NX02fTd9OH05fTq9O708vT29Pr0/vT+CvoK9gryCu8K6wrnCuMK3wrbCtcK0wrPCssKxwrDCkH1RfVI9Uz1UPVU9Vj1XPVg9WT1Z/Vr9W/1c/V39Xv1fvV+CnoKdgpyCm8KawpnCmMKYApcClgKVApRCk0KSQpFCkIKwvXG9cr1zfXR9dX12PXc9eD14/Xn9ev17vXy9fb1+fX99f8J/An4CfUJ8QntCeoJ5gnjCd8J2wnYCdQJ0QnNCcoJOvY99kH2RfZI9kz2T/ZT9lb2WvZd9mH2ZPZo9mv2b/Zy9ooJhwmECYAJfQl5CXYJcglvCWwJaAllCWEJXglaCVcJVAmw9rP2tva69r32wfbE9sf2y/bO9tH21fbY9tv23/bi9hsJGAkUCREJDgkKCQcJBAkBCf0I+gj3CPQI8AjtCOoI5wgd9yD3I/cm9yr3Lfcw9zP3Nvc59z33QPdD90b3SfdN91D3rQiqCKcIpAihCJ0ImgiXCJQIkQiOCIsIiAiFCIIIfgh7CIj3i/eO95H3lPeX95r3nfeg96P3pvep96z3r/ey97X3SAhFCEIIPwg8CDkINggzCDAILQgqCCcIJAghCB4IGwgYCOv37vfx9/T39/f59/z3//cC+AX4CPgL+A74EfgT+Bb4GfjkB+EH3gfbB9kH1gfTB9AHzQfKB8cHxQfCB78HvAe5B7cHTPhP+FL4VfhX+Fr4Xfhg+GL4Zfho+Gv4bfhw+HP4dviIB4UHggd/B30Hegd3B3UHcgdvB2wHagdnB2QHYgdfB1wHpvip+Kz4rvix+LT4tvi5+Lz4vvjB+MP4xvjJ+Mv4zvjQ+C0HKgcoByUHIwcgBx0HGwcYBxYHEwcQBw4HCwcJBwYH/Pj/+AH5BPkG+Qn5DPkO+RH5E/kW+Rj5G/kd+SD5Ivkl+dkG1gbUBtIGzwbNBsoGyAbFBsMGwAa+BrsGuQa3BrQGsgZR+VP5VvlY+Vr5Xflf+WL5ZPlm+Wn5a/lu+XD5cvl1+Xf5hgaEBoIGfwZ9BnsGeAZ2BnQGcQZvBm0GagZoBmYGYwaf+aH5pPmm+aj5q/mt+a/5sfm0+bb5uPm7+b35v/nB+cT5OgY4BjYGMwYxBi8GLQYqBigGJgYkBiEGHwYdBhsGGQYWBuz57vnw+fL59fn3+fn5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IAEfAR8BHwHi/uL+4/7j/uT+5P7k/uX+5f7m/ub+5v7n/uf+GAEYARgBFwEXARYBFgEWARUBFQEVARQBFAETAe3+7f7u/u7+7/7v/u/+8P7w/vH+8f7x/vL+8v4OAQ0BDQEMAQwBDAELAQsBCwEKAQoBCQEJAQkB+P74/vn++f75/vr++v76/vv++/77/vz+/P79/gMBAwECAQIBAgEBAQEBAAEAAQAB/wD/AP8A/gAC/wL/A/8D/wP/BP8E/wX/Bf8F/wb/Bv8G/wf/+QD5APgA+AD4APcA9wD2APYA9gD1APUA9QD0AAz/DP8N/w3/Df8O/w7/Dv8P/w//D/8Q/xD/EP/vAO8A7wDuAO4A7gDtAO0A7QDsAOwA7ADrAOsA6wAW/xb/Fv8X/xf/F/8Y/xj/GP8Z/xn/Gf8a/xr/5gDlAOUA5QDkAOQA5ADjAOMA4wDiAOIA4gDhAB//H/8g/yD/IP8h/yH/If8h/yL/Iv8i/yP/I//dANwA3ADcANsA2wDbANoA2gDaANoA2QDZANkAKP8o/yj/Kf8p/yn/Kv8q/yr/Kv8r/yv/K/8s/9QA1ADTANMA0wDTANIA0gDSANEA0QDRANAA0AAw/zD/Mf8x/zH/Mv8y/zL/Mv8z/zP/M/80/zT/zADLAMsAywDLAMoAygDKAMkAyQDJAMkAyADIADj/Of85/zn/Of86/zr/Ov87/zv/O/87/zz/PP/EAMQAwwDDAMMAwgDCAMIAwgDBAMEAwQDBAMAAQP9A/0H/Qf9B/0H/Qv9C/0L/Qv9D/0P/Q/9E/7wAvAC8ALsAuwC7ALsAugC6ALoAugC5ALkAuQBI/0j/SP9I/0n/Sf9J/0n/Sv9K/0r/Sv9L/0v/tQC1ALQAtAC0ALQAswCzALMAswCyALIAsgCyAE//T/9P/0//UP9Q/1D/UP9R/1H/Uf9R/1L/Uv+uAK4ArQCtAK0ArQCsAKwArACsAKsAqwCrAKsAqgBW/1b/Vv9X/1f/V/9X/1j/WP9Y/1j/Wf9Z/1n/pwCnAKYApgCmAKYApQClAKUApQCkAKQApACkAF3/Xf9d/13/Xf9e/17/Xv9e/1//X/9f/1//YP+gAKAAoACgAJ8AnwCfAJ8AngCeAJ4AngCeAJ0AY/9j/2P/ZP9k/2T/ZP9k/2X/Zf9l/2X/Zv9m/5oAmgCaAJkAmQCZAJkAmACYAJgA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owCjAKIAXv9e/17/X/9f/1//X/9g/2D/YP+gAKAAnwCfAJ8AnwCeAJ4AngCeAJ4AY/9j/2P/Y/9k/2T/ZP9k/2T/Zf+bAJsAmwCaAJoAmgCaAJoAmQCZAJkAZ/9o/2j/aP9o/2j/af9p/2n/af9p/5YAlgCWAJYAlQCVAJUAlQCVAJQAbP9s/2z/bP9t/23/bf9t/23/bv9u/5IAkgCRAJEAkQCRAJEAkACQAJAAcP9w/3H/cf9x/3H/cf9y/3L/cv9y/44AjQCNAI0AjQCNAIwAjACMAIwAdP91/3X/df91/3X/dv92/3b/dv92/4kAiQCJAIkAiQCIAIgAiACIAIgAef95/3n/ef95/3n/ev96/3r/ev96/4UAhQCFAIUAhQCEAIQAhACEAIQAfP99/33/ff99/33/fv9+/37/fv9+/4EAgQCBAIEAgQCBAIAAgACAAIAAgP+B/4H/gf+B/4H/gf+C/4L/gv+C/34AfQB9AH0AfQB9AH0AfAB8AHwAhP+E/4T/hf+F/4X/hf+F/4b/hv+G/3oAegB6AHkAeQB5AHkAeQB5AHgAiP+I/4j/iP+I/4n/if+J/4n/if+J/3YAdgB2AHYAdgB2AHUAdQB1AHUAdQCL/4z/jP+M/4z/jP+M/43/jf+N/3MAcwBzAHIAcgByAHIAcgByAHEAcQCP/4//j/+P/5D/kP+Q/5D/kP+Q/28AbwBvAG8AbwBvAG8AbgBuAG4AbgCS/5L/k/+T/5P/k/+T/5P/k/+U/2wAbABsAGwAbABrAGsAawBrAGsAawCV/5b/lv+W/5b/lv+W/5f/l/+X/2kAaQBpAGkAaABoAGgAaABoAGgAaACZ/5n/mf+Z/5n/mf+Z/5r/mv+a/2YAZgBmAGUAZQBlAGUAZQBlAGUAZACc/5z/nP+c/5z/nP+d/53/nf+d/2MAYwBjAGMAYgBiAGIAYgBiAGIAYgCf/5//n/+f/5//n/+f/6D/oP+g/2AAYABgAGAAXwBfAF8AXwBfAF8AXwCh/6L/ov+i/6L/ov+i/6L/o/+j/10AXQBdAF0AXQBdAFwAXABcAFwAXACk/6T/pf+l/6X/pf+l/6X/pf+l/6b/WgBaAFoAWgBaAFoAWgBZAFkAWQCn/6f/p/+n/6f/qP+o/6j/qP+o/6j/WABYAFcAVwBXAFcAVwBXAFcAVwCq/6r/qv+q/6r/qv+q/6r/q/+r/6v/VQBVAFUAVQBVAFQAVABUAFQAVACs/6z/rP+t/63/rf+t/63/rf+t/63/UwBSAFIAUgBSAFIAUgBSAFIAUQCv/6//r/+v/6//r/+v/6//sP+w/7D/UABQAFAAUABQAFAATwBPAE8ATwCx/7H/sf+x/7H/sv+y/7L/sv+y/7L/TgBOAE4ATQBNAE0ATQBNAE0ATQCz/7P/tP+0/7T/tP+0/7T/tP+0/7T/SwBLAEsASwBLAEsASwBLAEsASgC2/7b/tv+2/7b/tv+2/7b/tv+3/7f/SQBJAEkASQBJAEkASQBJAEgASAC4/7j/uP+4/7j/uP+4/7n/uf+5/7n/RwBHAEcARwBHAEcARgBGAEYARgBGALr/uv+6/7r/uv+7/7v/u/+7/7v/RQBFAEUARQBFAEQARABEAEQARABEALz/vP+8/7z/vP+9/73/vf+9/73/QwBDAEMAQwBDAEIAQgBCAEIAQgBCAL7/vv++/77/vv+//7//v/+//7//QQBBAEEAQQBBAEAAQABAAEAAQABAAMD/wP/A/8D/wP/B/8H/wf/B/8H/PwA/AD8APwA/AD8APgA+AD4APgA+AML/wv/C/8L/wv/C/8L/w//D/8P/PQA9AD0APQA9AD0APQA9ADwAPAA8AMT/xP/E/8T/xP/E/8T/xP/E/8X/OwA7ADsAOwA7ADsAOwA7ADsAOwA7AMb/xv/G/8b/xv/G/8b/xv/G/8b/OgA6ADkAOQA5ADkAOQA5ADkAOQA5AMf/x//H/8j/yP/I/8j/yP/I/8j/OAA4ADgAOAA4ADgANwA3ADcANwA3AMn/yf/J/8n/yf/J/8n/yv/K/8r/yv82ADYANgA2ADYANgA2ADYANgA1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  var hi = "data:audio/wave;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  var pi = "data:audio/wave;base64,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cv9y/3L/cv9z/3P/jQCNAI0AjACMAIwAjACLAIsAdf91/3X/dv92/3b/dv93/4kAiQCJAIkAiACIAIgAiAB5/3n/ef95/3n/ev96/3r/ev+FAIUAhQCFAIUAhACEAIQAfP98/33/ff99/33/fv9+/37/ggCCAIEAgQCBAIEAgQCAAID/gP+A/4D/gf+B/4H/gf9+AH4AfgB+AH4AfQB9AH0AfQCD/4T/hP+E/4T/hP+F/4X/ewB7AHsAegB6AHoAegB6AIf/h/+H/4f/h/+I/4j/iP+I/3gAdwB3AHcAdwB3AHcAdgCK/4r/iv+K/4v/i/+L/4v/dQB0AHQAdAB0AHQAcwBzAHMAjf+N/43/jv+O/47/jv+O/3EAcQBxAHEAcQBxAHAAcACQ/5D/kP+R/5H/kf+R/5H/kf9uAG4AbgBuAG4AbQBtAG0Ak/+T/5P/lP+U/5T/lP+U/5X/awBrAGsAawBrAGoAagBqAJb/lv+W/5f/l/+X/5f/l/9pAGgAaABoAGgAaABoAGcAZwCZ/5n/mf+Z/5r/mv+a/5r/ZgBmAGUAZQBlAGUAZQBlAJz/nP+c/5z/nP+c/53/nf+d/2MAYwBjAGIAYgBiAGIAYgCe/5//n/+f/5//n/+f/5//YABgAGAAYABgAGAAXwBfAF8Aof+h/6H/of+i/6L/ov+i/14AXgBdAF0AXQBdAF0AXQCj/6T/pP+k/6T/pP+k/6X/pf9bAFsAWwBbAFsAWgBaAFoApv+m/6b/pv+n/6f/p/+n/6f/WQBZAFgAWABYAFgAWABYAKj/qf+p/6n/qf+p/6n/qf9WAFYAVgBWAFYAVgBWAFUAVQCr/6v/q/+r/6v/rP+s/6z/VABUAFQAVABUAFMAUwBTAK3/rf+t/63/rv+u/67/rv+u/1IAUgBRAFEAUQBRAFEAUQCv/6//sP+w/7D/sP+w/7D/UABQAE8ATwBPAE8ATwBPAE8Asv+y/7L/sv+y/7L/sv+y/00ATQBNAE0ATQBNAE0ATQBMALT/tP+0/7T/tP+0/7T/tf9LAEsASwBLAEsASwBLAEsAtv+2/7b/tv+2/7b/tv+2/7f/SQBJAEkASQBJAEkASQBIALj/uP+4/7j/uP+4/7j/uP9HAEcARwBHAEcARwBHAEcARgC6/7r/uv+6/7r/uv+6/7r/RQBFAEUARQBFAEUARQBFALv/vP+8/7z/vP+8/7z/vP+8/0QAQwBDAEMAQwBDAEMAQwC9/73/vv++/77/vv++/77/QgBCAEIAQgBBAEEAQQBBAEEAv/+//7//v//A/8D/wP/A/0AAQABAAEAAQABAAD8APwA/AMH/wf/B/8H/wf/B/8L/wv8+AD4APgA+AD4APgA+AD4Aw//D/8P/w//D/8P/w//D/8P/PQA8ADwAPAA8ADwAPAA8AMT/xP/E/8X/xf/F/8X/xf87ADsAOwA7ADsAOwA6ADoAOgDG/8b/xv/G/8b/xv/G/8f/OQA5ADkAOQA5ADkAOQA5AMf/x//I/8j/yP/I/8j/yP/I/zgAOAA4ADgANwA3ADcANwDJ/8n/yf/J/8n/yf/J/8r/NgA2ADYANgA2ADYANgA2ADYAyv/L/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  var mi = "data:audio/wave;base64,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R/9I/0j/Sf9J/0r/Sv9L/0v/TP9M/03/Tf9O/07/T/9P/1D/UP9R/1H/Uv+uAK0ArQCsAKwAqwCrAKoAqgCpAKkAqACoAKcApwCnAKYApgClAKUApACkAKMAowCiAKIAoQChAKAAYP9g/2H/Yf9i/2L/Y/9j/2T/ZP9k/2X/Zf9m/2b/Z/9n/2j/aP9o/2n/af9q/2r/a/9r/2v/bP+UAJMAkwCTAJIAkgCRAJEAkACQAJAAjwCPAI4AjgCOAI0AjQCMAIwAjACLAIsAigCKAIoAiQCJAHj/eP94/3n/ef95/3r/ev97/3v/e/98/3z/fP99/33/fv9+/37/f/9//3//gP+A/4H/gf+B/4L/fgB+AH0AfQB9AHwAfAB8AHsAewB6AHoAegB5AHkAeQB4AHgAeAB3AHcAdwB2AHYAdgB1AHUAdQCM/4z/jP+N/43/jf+O/47/jv+P/4//j/+Q/5D/kP+R/5H/kf+R/5L/kv+S/5P/k/+T/5T/lP+U/2sAawBrAGsAagBqAGoAaQBpAGkAaABoAGgAaABnAGcAZwBmAGYAZgBlAGUAZQBlAGQAZABkAGMAnf+d/53/nv+e/57/nv+f/5//n/+g/6D/oP+g/6H/of+h/6H/ov+i/6L/o/+j/6P/o/+k/6T/pP9cAFsAWwBbAFsAWgBaAFoAWgBZAFkAWQBZAFgAWABYAFgAVwBXAFcAVwBWAFYAVgBWAFUAVQBVAFUArP+s/6z/rP+t/63/rf+t/67/rv+u/67/r/+v/6//r/+v/7D/sP+w/7D/sf+x/7H/sf+x/7L/sv9OAE4ATQBNAE0ATQBNAEwATABMAEwASwBLAEsASwBLAEoASgBKAEoASgBJAEkASQBJAEkASABIALj/uP+5/7n/uf+5/7n/uv+6/7r/uv+6/7v/u/+7/7v/u/+8/7z/vP+8/7z/vP+9/73/vf+9/73/QgBCAEIAQgBCAEEAQQBBAEEAQQBAAEAAQABAAEAAQAA/AD8APwA/AD8APgA+AD4APgA+AD4APQDD/8P/w//D/8P/xP/E/8T/xP/E/8T/xf/F/8X/xf/F/8X/xv/G/8b/xv/G/8b/x//H/8f/x//H/zkAOAA4ADgAOAA4ADgANwA3ADcANwA3ADcANgA2ADYANgA2ADYANgBAHzAfIR8SHwMf9B7lHtYexx65Hqoemx6MHn0ebx5gHlEeQx40Htvh6eH44QbiFeIj4jLiQOJO4l3ia+J54ojiluKk4rLiwOLP4t3iFR0HHfkc6xzdHM8cwRyzHKUcmByKHHwcbhxhHFMcRRw3HCocHBzx4//jDOQa5CfkNeRC5FDkXeRr5HjkheSS5KDkreS65Mfk1OTi5BEbBBv3Guoa3RrQGsMathqpGpwakBqDGnYaaRpcGlAaQxo2Gtbl4+Xw5fzlCeYV5iLmLuY75kfmVOZg5m3meeaF5pLmnuaq5rbmPRkxGSUZGRkNGQEZ9BjoGNwY0BjEGLgYrBihGJUYiRh9GHEYZRin57LnvufK59bn4eft5/jnBOgQ6BvoJ+gy6D7oSehV6GDobOh36H4XchdnF1wXUBdFFzoXLxcjFxgXDRcCF/cW7BbhFtYWyha/FrQWV+lh6Wzpd+mC6Y3pmOmj6a7puOnD6c7p2enj6e7p+ekD6g7q5xXdFdIVyBW9FbMVqBWeFZMViRV+FXQVahVfFVUVSxVAFTYVLBXe6unq8+r96gfrEesb6yXrL+s660TrTutY62LrbOt263/rieuT62MUWRRPFEUUPBQyFCgUHhQVFAsUART4E+4T5BPbE9ETxxO+E7QTVexf7Gjscux77IXsjuyX7KHsquyz7L3sxuzP7Nns4uzr7PTsAhP5EvAS5xLeEtUSzBLCErkSsBKnEp4SlRKMEoMSehJxEmkSYBKp7bLtu+3E7c3t1e3e7eft8O347QHuCu4S7hvuJO4s7jXuPu5G7rERqRGgEZgRjxGHEX4RdhFtEWURXBFUEUwRQxE7ETMRKhEiERoR7+737v/uB+8P7xjvIO8o7zDvOO9A70jvUe9Z72Hvae9x73nvge93EG8QZxBgEFgQUBBIEEAQOBAwECgQIRAZEBEQCRACEPoP8g8W8B3wJfAt8DTwPPBE8EvwU/Ba8GLwafBx8HnwgPCI8I/wlvCe8FsPUw9MD0QPPQ82Dy4PJw8gDxgPEQ8KDwMP+w70Du0O5g7eDtcOMPE38T7xRfFN8VTxW/Fi8WnxcPF38X7xhfGM8ZPxmvGh8ajxr/FKDkMOPA42Di8OKA4hDhoOEw4NDgYO/w34DfEN6w3kDd0N1w0w8jfyPfJE8kvyUfJY8l/yZfJs8nLyefJ/8obyjPKT8pnyoPKm8lMNTQ1GDUANOg0zDS0NJg0gDRoNEw0NDQcNAA36DPQM7gznDOEMJfMr8zLzOPM+80TzSvNQ81bzXfNj82nzb/N183vzgfOH843zk/NnDGEMWwxVDE8MSQxDDD0MNwwxDCsMJQwgDBoMFAwODAgMAgz9Cwn0D/QV9Br0IPQm9Cz0MfQ39D30Q/RI9E70VPRZ9F/0ZPRq9JALiwuFC4ALegt1C28LaQtkC14LWQtTC04LSQtDCz4LOAszCy0L2PTd9OP06PTu9PP0+PT+9AP1CPUO9RP1GPUd9SP1KPUt9TL1OPXDCr4KuQq0Cq4KqQqkCp8KmgqVCpAKiwqFCoAKewp2CnEKbApnCp71o/Wo9a31svW39bz1wfXG9cv10PXV9dr13vXj9ej17fXy9ff1BAr/CfsJ9gnxCewJ5wnjCd4J2QnUCdAJywnGCcEJvQm4CbMJUfZW9lv2X/Zk9mn2bfZy9nf2e/aA9oT2ifaO9pL2l/ab9qD2pPZXCVMJTglKCUUJQQk8CTgJMwkvCSoJJgkhCR0JGQkUCRAJCwkHCf32AvcG9wr3D/cT9xf3HPcg9yT3KPct9zH3Nfc59z73QvdG90r3sQitCKkIpQihCJwImAiUCJAIjAiICIQIfwh7CHcIcwhvCGsImfed96H3pfep9633sfe197n3vffB98X3yffN99H31ffZ99334fcbCBcIEwgPCAsICAgECAAI/Af4B/QH8AftB+kH5QfhB90H2QfWBy74Mvg2+Dn4PfhB+EX4SPhM+FD4VPhX+Fv4X/hi+Gb4avht+HH4iweIB4QHgAd9B3kHdQdyB24HawdnB2QHYAdcB1kHVQdSB04HSwe5+Lz4wPjD+Mf4yvjO+NH41fjY+Nz43/jj+Ob46vjt+PD49PgJBwUHAgf/BvsG+Ab0BvEG7gbqBucG5AbgBt0G2gbWBtMG0AbNBjf5Ovk9+UH5RPlH+Ur5TvlR+VT5V/la+V75Yflk+Wf5avlu+XH5jAaJBoYGgwZ/BnwGeQZ2BnMGcAZtBmoGZgZjBmAGXQZaBlcGVAav+bL5tfm4+bv5vvnB+cT5x/nK+c350PnT+db52fnc+d/54vkbBhgGFQYSBg8GDAYJBgYGAwYABv4F+wX4BfUF8gXvBewF6QXnBRz6H/oi+iX6KPor+i36MPoz+jb6Ofo7+j76QfpE+kb6SfpM+k/6rgWsBakFpgWkBaEFngWbBZkFlgWTBZEFjgWLBYgFhgWDBYAFfgWF+of6ivqN+o/6kvqV+pf6mvqd+p/6ovqk+qf6qfqs+q/6sfq0+koFRwVFBUIFPwU9BToFOAU1BTMFMAUuBSsFKQUmBSQFIQUfBeT65vrp+uv67frw+vL69fr3+vr6/Pr/+gH7A/sG+wj7C/sN+w/77gTsBOkE5wTlBOIE4ATeBNsE2QTXBNQE0gTQBM0EywTJBMYExAQ++0H7Q/tF+0f7SvtM+077UftT+1X7V/ta+1z7Xvtg+2P7Zftn+5cElASSBJAEjgSMBIkEhwSFBIMEgQR/BHwEegR4BHYEdARyBG8Ek/uV+5f7mfub+537oPui+6T7pvuo+6r7rPuu+7D7svu0+7f7RwRFBEMEQQQ/BD0EOwQ5BDcENQQzBDEELwQtBCsEKQQnBCUEIwTf++H74/vl++f76fvr++377/vx+/P79fv3+/n7+/v9+//7AfwD/PsD+QP4A/YD9APyA/AD7gPsA+oD6APmA+UD4wPhA98D3QPbA9kDKfwq/Cz8Lvww/DL8NPw1/Df8Ofw7/D38P/xA/EL8RPxG/Ej8twO1A7MDsQOvA64DrAOqA6gDpwOlA6MDoQOfA54DnAOaA5gDlwNr/G38bvxw/HL8dPx1/Hf8efx6/Hz8fvyA/IH8g/yF/Ib8iPyK/HUDcwNxA3ADbgNsA2sDaQNnA2YDZANiA2EDXwNeA1wDWgNZA1cDq/ys/K78r/yx/LP8tPy2/Lf8ufy7/Lz8vvy//MH8wvzE/Mb8x/w3AzYDNAMzAzEDMAMuAywDKwMpAygDJgMlAyMDIgMgAx8DHQPk/Ob85/zp/Or87Pzt/O/88Pzy/PP89fz2/Pj8+fz6/Pz8/fz//AAD/gL9AvsC+gL4AvcC9gL0AvMC8QLwAu4C7QLsAuoC6QLnAuYCG/0d/R79IP0h/SL9JP0l/Sf9KP0p/Sv9LP0t/S/9MP0x/TP9NP3KAskCyALGAsUCxALCAsECwAK+Ar0CvAK6ArkCuAK2ArUCtAJN/U/9UP1R/VP9VP1V/Vf9WP1Z/Vr9XP1d/V79X/1h/WL9Y/1l/ZoCmQKYApYClQKUApMCkQKQAo8CjgKMAosCigKJAogChgKFAoQCff1//YD9gf2C/YP9hf2G/Yf9iP2J/Yv9jP2N/Y79j/2Q/ZL9k/1sAmsCagJoAmcCZgJlAmQCYwJiAmACXwJeAl0CXAJbAloCWAJXAqr9q/2s/a39rv2w/bH9sv2z/bT9tf22/bf9uP26/bv9vP29/UICQQJAAj8CPgI9AjwCOgI5AjgCNwI2AjUCNAIzAjICMQIwAi8C0v3T/dT91f3X/dj92f3a/dv93P3d/d793/3g/eH94v3j/eT95f0aAhkCGAIXAhYCFQIUAhMCEgIRAhACDwIOAg0CDAILAgoCCQIIAvn9+v37/fz9/f3+/f/9AP4B/gL+A/4E/gX+Bv4H/gj+CP4J/vYB9QH0AfMB8gHxAfAB7wHuAe0B7AHrAeoB6QHpAegB5wHmAeUBHP4d/h7+H/4g/iH+Iv4i/iP+JP4l/ib+J/4o/in+Kv4r/iv+LP7TAdIB0QHQAc8BzgHOAc0BzAHLAcoByQHIAcgBxwHGAcUBxAHDAT7+Pv4//kD+Qf5C/kP+RP5E/kX+Rv5H/kj+Sf5J/kr+S/5M/k3+sgGyAbEBsAGvAa4BrgGtAawBqwGqAaoBqQGoAacBpgGmAaUBXP5d/l7+Xv5f/mD+Yf5i/mL+Y/5k/mX+Zv5m/mf+aP5p/mn+av6VAZQBlAGTAZIBkQGRAZABjwGOAY0BjQGMAYsBigGKAYkBiAGIAXn+ev57/nv+fP59/n7+fv5//oD+gf6B/oL+g/6D/oT+hf6G/ob+eQF4AXgBdwF2AXUBdQF0AXMBcwFyAXEBcQFwAW8BbgFuAW0BbAGU/pX+lv6W/pf+mP6Y/pn+mv6a/pv+nP6c/p3+nv6f/p/+oP5fAV8BXgFeAV0BXAFcAVsBWgFaAVkBWAFYAVcBVgFWAVUBVAFUAa3+rv6u/q/+r/6w/rH+sf6y/rP+s/60/rX+tf62/rb+t/64/rj+RwFGAUYBRQFFAUQBQwFDAUIBQgFBAUABQAE/AT8BPgE9AT0BPAHE/sX+xv7G/sf+x/7I/sn+yf7K/sr+y/7M/sz+zf7N/s7+zv4xATABMAEvAS8BLgEuAS0BLAEsASsBKwEqASoBKQEoASgBJwEnAdr+2v7b/tv+3P7d/t3+3v7e/t/+3/7g/uD+4f7h/uL+4/7j/uT+HAEbARsBGgEaARkBGQEYARgBFwEWARYBFQEVARQBFAETARMBEgHu/u/+7/7w/vD+8f7x/vL+8v7z/vP+9P70/vX+9f72/vb+9/73/ggBCAEHAQcBBgEGAQUBBQEEAQQBAwEDAQIBAgEBAQEBAAEAAQH/Af8C/wL/A/8D/wT/BP8F/wX/Bv8G/wb/B/8H/wj/CP8J/wn/9gD2APUA9QD0APQA8wDzAPMA8gDyAPEA8QDwAPAA7wDvAO4A7gAS/xP/E/8U/xT/Ff8V/xb/Fv8W/xf/F/8Y/xj/Gf8Z/xr/Gv8a/+UA5QDkAOQA4wDjAOMA4gDiAOEA4QDgAOAA4ADfAN8A3gDeACP/I/8j/yT/JP8l/yX/Jf8m/yb/J/8n/yj/KP8o/yn/Kf8q/yr/1gDVANUA1ADUANQA0wDTANIA0gDSANEA0QDQANAA0ADPAM8AzgAy/zL/M/8z/zP/NP80/zX/Nf81/zb/Nv83/zf/N/84/zj/OP85/8cAxgDGAMYAxQDFAMUAxADEAMMAwwDDAMIAwgDCAMEAwQDBAMAAQP9B/0H/Qf9C/0L/Qv9D/0P/Q/9E/0T/Rf9F/0X/Rv9G/0b/uQC5ALkAuAC4ALgAtwC3ALcAtgC2ALYAtQC1ALQAtAC0ALMAswBN/07/Tv9O/0//T/9P/1D/UP9Q/1H/Uf9R/1L/Uv9S/1P/U/9T/6wArACsAKsAqwCrAKsAqgCqAKoAqQCpAKkAqACoAKgApwCnAKcAWv9a/1r/W/9b/1v/XP9c/1z/XP9d/13/Xf9e/17/Xv9f/1//X/+gAKAAoACgAJ8AnwCfAJ4AngCeAJ0AnQCdAJ0AnACcAJwAmwBl/2X/Zf9m/2b/Zv9n/2f/Z/9o/2j/aP9o/2n/af9p/2r/av9q/5YAlQCVAJUAlACUAJQAlACTAJMAkwCTAJIAkgCSAJEAkQCRAJEAcP9w/3D/cf9x/3H/cf9y/3L/cv9y/3P/c/9z/3P/dP90/3T/df+LAIsAiwCKAIoAigCKAIkAiQCJAIkAiACIAIgAiACHAIcAhwB5/3r/ev96/3r/e/97/3v/e/98/3z/fP98/33/ff99/33/fv9+/4IAggCBAIEAgQCBAIAAgACAAIAAfwB/AH8AfwB+AH4AfgB+AH0Ag/+D/4P/hP+E/4T/hP+E/4X/hf+F/4X/hv+G/4b/hv+H/4f/h/95AHkAeAB4AHgAeAB3AHcAdwB3AHYAdgB2AHYAdgB1AHUAdQB1AIz/jP+M/4z/jP+N/43/jf+N/43/jv+O/47/jv+P/4//j/+P/3EAcABwAHAAcABvAG8AbwBvAG8AbgBuAG4AbgBuAG0AbQBtAG0Ak/+U/5T/lP+U/5T/lf+V/5X/lf+V/5b/lv+W/5b/lv+X/5f/l/9pAGkAaABoAGgAaABoAGcAZwBnAGcAZwBmAGYAZgBmAGYAZQBlAJv/m/+b/5z/nP+c/5z/nP+d/53/nf+d/53/nf+e/57/nv+e/2IAYQBhAGEAYQBhAGEAYABgAGAAYABgAF8AXwBfAF8AXwBfAF4Aov+i/6L/ov+j/6P/o/+j/6P/o/+k/6T/pP+k/6T/pP+l/6X/pf9bAFsAWgBaAFoAWgBaAFoAWQBZAFkAWQBZAFkAWABYAFgAWABYAKj/qf+p/6n/qf+p/6n/qv+q/6r/qv+q/6r/q/+r/6v/q/+r/6v/VABUAFQAVABUAFQAVABTAFMAUwBTAFMAUwBSAFIAUgBSAFIArv+v/6//r/+v/6//r/+v/7D/sP+w/7D/sP+w/7D/sf+x/7H/sf9PAE8ATgBOAE4ATgBOAE4ATgBNAE0ATQBNAE0ATQBNAEwATABMALT/tP+0/7T/tf+1/7X/tf+1/7X/tf+2/7b/tv+2/7b/tv+2/7f/SQBJAEkASQBJAEkASABIAEgASABIAEgASABHAEcARwBHAEcAuf+5/7n/uv+6/7r/uv+6/7r/uv+7/7v/u/+7/7v/u/+7/7v/vP9EAEQARABEAEQARABEAEMAQwBDAEMAQwBDAEMAQgBCAEIAQgBCAL7/vv++/7//v/+//7//v/+//7//v//A/8D/wP/A/8D/wP/A/8D/QAA/AD8APwA/AD8APwA/AD8APgA+AD4APgA+AD4APgA+AD0APQDD/8P/w//D/8P/w//D/8T/xP/E/8T/xP/E/8T/xP/E/8X/xf87ADsAOwA7ADsAOwA7ADoAOgA6ADoAOgA6ADoAOgA6ADkAOQA5AMf/x//H/8f/x//H/8j/yP/I/8j/yP/I/8j/yP/I/8n/yf/J/8n/NwA3ADcANwA3ADcANgA2ADYANgA2ADYANgA2ADYANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  var fi = "data:audio/wave;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  var ca = {
      abono: ae,
      abuelo: ee,
      anillos: oe,
      antojo: ie,
      arbol_1: te,
      arbol_2: se,
      arbol_3: re,
      arbol_4: ne,
      arrepentido: le,
      bazar: ce,
      bola: ue,
      botas_carton: de,
      botas_cuero: he,
      brote_chico: pe,
      brote_fruto: me,
      brote_grande: fe,
      brotin: _e,
      cadena: ge,
      calmin: be,
      campana: ve,
      caramelo: xe,
      carta: ye,
      cartel_cerrado: qe,
      cautela: Ae,
      cesta_mimbre: we,
      cesta_papel: ze,
      chispin: Ie,
      cofre: De,
      comida: je,
      copo: Ne,
      cuaderno: Ee,
      cuadro: Pe,
      cuenta: Ce,
      cuerda: Re,
      cueva: Me,
      deudon: He,
      donchollo: Te,
      engranaje: Be,
      escarcha: Le,
      escudon: Se,
      euforio: Ge,
      fachada: Ve,
      fiel: Oe,
      flecha: Fe,
      fruto: Qe,
      gente_1: $e,
      gente_2: ke,
      gente_3: Ze,
      gorro: Ye,
      heroe: Je,
      heroe_gorro: Ke,
      heroe_gorro_paso: Xe,
      heroe_paso: We,
      hogaza: Ue,
      hucha: ao,
      huerto: eo,
      libro: oo,
      lupa: io,
      lupa_icono: to,
      mapa: so,
      mapa_ciudad: ro,
      mapa_mercado: no,
      mapa_reloj: lo,
      mapa_torre: co,
      mapa_valle: uo,
      maquina: ho,
      maquina_apagada: po,
      maquina_grande: mo,
      medalla: fo,
      medalla_campana: _o,
      medalla_copo: go,
      medalla_detective: bo,
      medalla_deuda: vo,
      medalla_lupa: xo,
      medalla_ojo: yo,
      medalla_olfato: qo,
      medalla_pendulo: Ao,
      medalla_presupuesto: wo,
      medalla_refugio: zo,
      medalla_reves: Io,
      medalla_socio: Do,
      memoria: jo,
      merma: No,
      mochila: Eo,
      moneda: Po,
      moneda_estrella: Co,
      no: Ro,
      olfatin: Mo,
      oro: Ho,
      pan: To,
      panico: Bo,
      patines: Lo,
      pendulo: So,
      prisas: Go,
      puerta: Vo,
      raiz: Oo,
      regadera_hierro: Fo,
      regadera_reluciente: Qo,
      regadera_rota: $o,
      relampago: ko,
      reloj: Zo,
      repartija: Yo,
      reves: Jo,
      rueda: Ko,
      semilla: Xo,
      semillas: Wo,
      semillas_oferta: Uo,
      si: ai,
      subeprecios: ei,
      tasador: oi,
      tierras: ii,
      trocito: ti,
      vaiven: si,
      viento: ri,
      yunque: ni,
      zapato: li
    },
    _i = {
      acierto: ci,
      fallo: ui,
      fanfarria: di,
      malo: hi,
      moneda: pi,
      plantar: mi,
      siguiente: fi
    };
  var L = {
    velocidad: 1
  };

  function p(i) {
    return new Promise(a => setTimeout(a, i * 1e3 / L.velocidad))
  }

  function Sa(i, a = {}) {
    return String(i).replace(/\{(\w+)\}/g, (o, t) => t in a ? String(a[t]) : o)
  }
  var ua = la * f,
    dr = 62,
    hr = 84,
    M = -60,
    pr = ["#7b4fa3", "#9b6ccc", "#5d3a80"],
    C = {
      x: 10,
      y: 11
    },
    oa = {
      x: 7,
      y: 27
    },
    mr = ["subeprecios", "prisas", "fachada", "donchollo", "deudon", "euforio", "panico", "merma"],
    fr = {
      semilla: !1,
      subeprecios: !1,
      yunque: !1,
      escarcha: !1,
      prisas: !1
    },
    n = (i, a) => ({
      x: i,
      y: a
    }),
    F = [-1, -1, -1, -1],
    J = {
      mercado: {
        textura: "mapa_mercado",
        centros: [n(2.3, 7.5), n(1.5, 12), n(13.5, 12), n(7, 11)],
        zona_gris: [10, 2, 14, 6],
        npcs: {
          hogaza: n(2, 9),
          tasador: n(1, 13),
          antojo: n(13, 13),
          semilla: n(6, 4),
          subeprecios: n(7, 10),
          yunque: n(11, 20)
        },
        humo: [
          [n(150, 30), n(12, 4)],
          [n(158, 80), n(12.5, 7.5)],
          [n(172, 133), n(13.5, 12)],
          [n(14, 133), n(1.5, 12)],
          [n(148, 214), n(11.5, 18)],
          [n(31, 80), n(2.3, 7.5)]
        ]
      },
      valle: {
        textura: "mapa_valle",
        centros: [n(6, 7), n(5, 15), n(7, 23), n(7, 16)],
        zona_gris: F,
        npcs: {
          copo: n(11, 8),
          raiz: n(5, 16),
          anillos: n(9, 16),
          escarcha: n(4, 12),
          prisas: n(9, 12)
        },
        humo: [
          [n(155, 20), n(11.5, 3)],
          [n(31, 200), n(2, 16)],
          [n(160, 200), n(12, 16)],
          [n(18, 318), n(1, 25)],
          [n(140, 290), n(10.5, 23)]
        ]
      },
      ciudad: {
        textura: "mapa_ciudad",
        centros: [n(12, 6), n(2.5, 14), n(3, 25.5), n(7, 17)],
        zona_gris: F,
        zona_viva: [10, 10.6, 15, 15],
        npcs: {
          lupa: n(3, 7),
          fiel: n(11, 7),
          engranaje: n(3, 16),
          fachada: n(11, 16),
          cuenta: n(3, 27),
          prisas: n(11, 26)
        },
        gente: [
          [n(13, 7), "gente_1"],
          [n(14, 7), "gente_2"],
          [n(13, 8), "gente_3"],
          [n(14, 8), "gente_1"],
          [n(0, 16), "gente_3"],
          [n(1, 16), "gente_2"]
        ],
        humo: [
          [n(30, 26), n(2, 3)],
          [n(160, 26), n(12, 3)],
          [n(53, 128), n(4, 11)],
          [n(30, 298), n(2, 23)],
          [n(97, 225), n(7, 17)],
          [n(97, 380), n(7, 29)]
        ]
      },
      torre: {
        textura: "mapa_torre",
        centros: [n(5, 5.5), n(8, 11), n(7, 24), n(7, 17)],
        zona_gris: F,
        npcs: {
          reves: n(9, 6),
          arrepentido: n(2, 5),
          donchollo: n(12, 9),
          fachada: n(4, 11),
          deudon: n(12, 12),
          cautela: n(6, 12),
          puerta_1: n(7, 17),
          puerta_2: n(7, 21),
          puerta_3: n(7, 25),
          puerta_4: n(7, 29)
        },
        sprites: {
          puerta_1: "puerta",
          puerta_2: "puerta",
          puerta_3: "puerta",
          puerta_4: "puerta"
        },
        ocultos: ["donchollo", "deudon"],
        humo: [
          [n(30, 26), n(2, 3)],
          [n(160, 70), n(12, 5)],
          [n(30, 128), n(2, 10)],
          [n(97, 200), n(7, 15)],
          [n(97, 300), n(7, 23)],
          [n(97, 370), n(7, 28)]
        ]
      },
      reloj: {
        textura: "mapa_reloj",
        centros: [n(7, 8), n(7, 16), n(7, 27), n(7, 17)],
        zona_gris: F,
        npcs: {
          vaiven: n(7, 8),
          memoria: n(2, 12),
          pendulo: n(12, 12),
          euforio: n(4, 15),
          panico: n(10, 16),
          merma: n(7, 28),
          subeprecios: n(4, 29),
          prisas: n(10, 29),
          fachada: n(4, 31),
          donchollo: n(10, 31)
        },
        ocultos: ["euforio", "panico", "merma", "fachada", "donchollo"],
        humo: [
          [n(28, 115), n(2, 9)],
          [n(170, 115), n(12, 9)],
          [n(97, 10), n(7, 2)],
          [n(77, 290), n(7, 26)],
          [n(117, 296), n(7, 26)],
          [n(97, 200), n(7, 16)]
        ]
      }
    },
    Z = {},
    Ga = {};

  function bi() {
    return Promise.all(Object.entries(ca).map(([i, a]) => new Promise(o => {
      let t = new Image;
      t.onload = () => {
        Z[i] = t, Ga[i] = _r(t), o()
      }, t.onerror = o, t.src = a
    })))
  }

  function _r(i) {
    let a = document.createElement("canvas");
    a.width = i.width, a.height = i.height;
    let o = a.getContext("2d");
    o.drawImage(i, 0, 0);
    let t = o.getImageData(0, 0, a.width, a.height);
    for (let s = 0; s < t.data.length; s += 4) {
      let r = (t.data[s] * .3 + t.data[s + 1] * .59 + t.data[s + 2] * .11) * .9;
      t.data[s] = t.data[s + 1] = t.data[s + 2] = r
    }
    return o.putImageData(t, 0, 0), a
  }
  var ia = i => Z[i],
    O = class {
      constructor(a, o) {
        this.poner(a), this.conGris = o, this.x = 0, this.y = 0, this.visible = !0, this.fijo = 0, this.dx = 0, this.dy = 0
      }
      poner(a) {
        this.nombre = a;
        let o = Z[a];
        this.ox = -o.width / 2, this.oy = -o.height + 1
      }
    },
    da = class {
      constructor(a) {
        this.canvas = a, this.ctx = a.getContext("2d"), this.escala = 2, this.zona = "mercado", this.oyentes = {
          npc: new Set,
          parcela: new Set,
          lugar: new Set,
          llegada: new Set
        }, this.objetivo_fn = null, this.npcs = {}, this.visibles = {}, this.posiciones = {}, this.gente = [], this.heroe = new O("heroe", !1), this.chispin = new O("chispin", !1), this.chispin.visible = !1, this.seguidores = {};
        for (let s of ["brotin", "escudon", "repartija", "olfatin", "calmin"]) {
          let r = new O(s, !1);
          r.visible = !1, this.seguidores[s] = r
        }
        this.arbol = new O("arbol_1", !1), this.arbol.visible = !1, this.maquina = new O("maquina_grande", !0), this.maquina.visible = !1, this.cartel = !1, this.ruta = [], this.alLlegar = null, this.rastro = [], this.reloj = 0, this.camY = 0, this.radios = [M, M, M, M], this.radiosMeta = [...this.radios], this.humo = [], this.chispas = [], this.lluvia = [], this.tormentaOn = !1, this.toque = null, this.huida = null, this.huye = "", this.moviendo = !1, this.zonaGris = F, this.zonaViva = F, e.cambiado(() => this.alCambiarEstado()), a.addEventListener("pointerdown", s => this.tocar(s)), this.cargar_zona("mercado", n(7, 5));
        let o = performance.now(),
          t = s => {
            let r = Math.min(.05, (s - o) / 1e3) * L.velocidad;
            o = s, this.paso(Math.min(r, .2)), this.pintar(), requestAnimationFrame(t)
          };
        requestAnimationFrame(t)
      }
      on(a, o) {
        return this.oyentes[a].add(o), () => this.oyentes[a].delete(o)
      }
      emitir(a, o) {
        for (let t of [...this.oyentes[a]]) t(o)
      }
      cargar_zona(a, o) {
        this.zona = a, P.zona = a, e.zona = a;
        let t = J[a];
        this.mapa = a, this.zonaGris = a === "mercado" && e.maquina_apagada ? F : t.zona_gris, this.zonaViva = t.zona_viva || F, this.maquina.visible = a === "reloj", this.maquina.poner(e.maquina_apagada ? "maquina_apagada" : "maquina_grande"), this.maquina.x = this.pie(oa).x, this.maquina.y = this.pie(oa).y, this.tormenta(!1), this.cartel = !1, this.gente = (t.gente || []).map(([r, l]) => {
          let c = new O(l, !0),
            g = this.pie(r);
          return c.x = g.x, c.y = g.y, c.celda = r, c
        }), this.npcs = {}, this.visibles = {}, this.posiciones = {};
        for (let [r, l] of Object.entries(t.npcs)) {
          let c = new O((t.sprites || {})[r] || r, !mr.includes(r)),
            g = this.pie(l);
          c.x = g.x, c.y = g.y, this.posiciones[r] = {
            ...l
          }, this.visibles[r] = !(r in fr || (t.ocultos || []).includes(r)), c.visible = this.visibles[r], this.npcs[r] = c
        }
        this.radios = [M, M, M, M], this.radiosMeta = [...this.radios], this.humo = [], this.huida = null, this.ruta = [], this.alLlegar = null;
        let s = this.pie(o);
        this.heroe.x = s.x, this.heroe.y = s.y, this.rastro = [], this.saltar = !0, this.alCambiarEstado(), this.aplicarBrillo()
      }
      restaurar(a) {
        let o = J[e.zona] ? e.zona : "mercado";
        this.cargar_zona(o, o === "mercado" ? n(7, 5) : o === "reloj" ? n(7, 1) : n(7, 2));
        let t = {
            mercado: 1,
            valle: 4,
            ciudad: 7,
            torre: 10,
            reloj: 13
          } [o],
          s = o === "mercado" ? 4 : 5,
          r = [M, M, M, M];
        if (a > t && (r[0] = s), a > t + 1 && (r[1] = s), a > t + 2 && (r[2] = s, r[3] = 22), this.radios = [...r], this.radiosMeta = [...r], o === "mercado") this.mostrar("semilla", a > 1), this.mostrar("yunque", a > 2);
        else if (o === "valle" && a > 4) this.mostrar("escarcha", !0);
        else if (o === "ciudad" && a > 9) this.apagar_bazar(), this.mostrar("fachada", !1);
        else if (o === "torre" && a > 12) {
          for (let l = 1; l <= 4; l++) this.mostrar("puerta_" + l, !1);
          this.mostrar("fachada", !1)
        }
        this.chispin.visible = e.tiene_chispin, this.aplicarBrillo()
      }
      alCambiarEstado() {
        for (let [a, o] of Object.entries(this.seguidores)) o.visible = e.criaturas.includes(a);
        if (this.arbol.visible = this.zona === "valle" && e.arbol > 0, this.arbol.visible) {
          this.arbol.poner("arbol_" + Math.min(4, Math.max(1, e.arbol)));
          let a = this.pie(C);
          this.arbol.x = a.x, this.arbol.y = a.y
        }
        P.extra_solidos = this.arbol.visible ? [C] : [], this.chispin.visible = e.tiene_chispin
      }
      pie(a) {
        return n(a.x * f + 6.5, a.y * f + 12)
      }
      mostrar(a, o) {
        if (this.npcs[a] && (this.visibles[a] = o, this.npcs[a].visible = o, o && a === this.huye && (this.huida = null, this.huye = ""), o)) {
          let t = this.pie(this.posiciones[a]);
          this.npcs[a].x = t.x, this.npcs[a].y = t.y
        }
      }
      mover_npc(a, o) {
        this.posiciones[a] = {
          ...o
        };
        let t = this.pie(o);
        this.npcs[a].x = t.x, this.npcs[a].y = t.y, this.aplicarBrillo()
      }
      mostrar_chispin() {
        this.chispin.visible = !0
      }
      iluminar(a, o) {
        this.radiosMeta[a] = o
      }
      estallido(a, o, t) {
        for (let s = 0; s < t; s++) this.chispas.push({
          p: {
            ...a
          },
          v: n(V(-40, 40), V(-50, -10)),
          t: 0,
          max: V(.6, 1),
          c: o
        })
      }
      huir(a, o = n(1, 0)) {
        this.mostrar(a, !0), this.huye = a, this.huida = o
      }
      huir_subeprecios(a) {
        this.huir("subeprecios", a)
      }
      apagar_bazar() {
        this.zonaViva = F, this.zonaGris = [10, 10.6, 15, 15]
      }
      cerrar_bazar(a) {
        this.cartel = a
      }
      apagar_maquina() {
        this.maquina.poner("maquina_apagada")
      }
      tormenta(a) {
        this.tormentaOn = a, a || (this.lluvia = [])
      }
      celda_heroe() {
        return n(Math.floor(this.heroe.x / f), Math.floor((this.heroe.y - 1) / f))
      }
      sobre_chispin() {
        return n(this.chispin.x, this.chispin.y - 20)
      }
      sobre_heroe() {
        return n(this.heroe.x, this.heroe.y - 14)
      }
      grisEn(a, o) {
        let t = 1,
          s = J[this.zona].centros;
        for (let r = 0; r < 4; r++) {
          let l = Math.hypot(a - s[r].x, o - s[r].y);
          t = Math.min(t, gi((l - this.radios[r]) / 2.5, 0, 1))
        }
        return t * .85
      }
      grisLoseta(a, o) {
        let t = a + .5,
          s = o + .5,
          r = this.grisEn(t, s),
          l = this.zonaGris,
          c = this.zonaViva;
        return t >= l[0] && t <= l[2] && s >= l[1] && s <= l[3] && (r = Math.max(r, .7)), t >= c[0] && t <= c[2] && s >= c[1] && s <= c[3] && (r = 0), r
      }
      aplicarBrillo() {
        for (let [a, o] of Object.entries(this.npcs))
          if (o.conGris) {
            let t = this.posiciones[a];
            o.fijo = this.grisEn(t.x + .5, t.y + .5)
          } for (let a of this.gente) a.fijo = this.grisEn(a.celda.x + .5, a.celda.y + .5);
        this.maquina.fijo = e.maquina_apagada ? 0 : this.grisEn(7.5, 25) * .6
      }
      ocupadas() {
        let a = [];
        for (let o in this.posiciones) this.visibles[o] && !(o === this.huye && this.huida) && a.push(this.posiciones[o]);
        for (let o of this.gente) a.push(o.celda);
        return a
      }
      alrededor(a) {
        return [n(0, 1), n(-1, 0), n(1, 0), n(0, -1)].map(o => n(a.x + o.x, a.y + o.y)).filter(o => !P.bloqueado(o.x, o.y, this.ocupadas()))
      }
      irA(a, o) {
        let t = P.camino(this.celda_heroe(), a, this.ocupadas());
        if (t !== null) {
          if (t.length === 0) {
            o && o();
            return
          }
          this.ruta = t, this.alLlegar = o
        }
      }
      ir(a) {
        this.irA([a], null)
      }
      tocar(a) {
        if (e.ocupado) return;
        let o = this.canvas.getBoundingClientRect(),
          t = (a.clientX - o.left - this.offX) / this.escala,
          s = (a.clientY - o.top) / this.escala + this.camY,
          r = n(Math.floor(t / f), Math.floor(s / f));
        this.toque = {
          celda: r,
          t: this.reloj
        };
        for (let l in this.npcs) {
          if (!this.visibles[l] || l === this.huye && this.huida) continue;
          let c = this.posiciones[l];
          if (r.x === c.x && (r.y === c.y || r.y === c.y - 1)) {
            this.irA(this.alrededor(c), () => this.emitir("npc", l));
            return
          }
        }
        if (P.parcelas().some(l => l.x === r.x && l.y === r.y)) {
          this.irA([r, ...this.alrededor(r)], () => this.emitir("parcela", r));
          return
        }
        if (this.zona === "valle" && r.x === C.x && r.y <= C.y && r.y >= C.y - 2) {
          this.irA(this.alrededor(C), () => this.emitir("lugar", C));
          return
        }
        P.bloqueado(r.x, r.y, this.ocupadas()) || this.irA([r], null), this.emitir("lugar", r)
      }
      paso(a) {
        this.reloj += a;
        let o = !1;
        for (let l = 0; l < 4; l++)
          if (Math.abs(this.radios[l] - this.radiosMeta[l]) > .01) {
            let c = Math.max(this.radios[l], -4);
            this.radios[l] = c + (this.radiosMeta[l] - c) * Math.min(1, a * 1.6), Math.abs(this.radios[l] - this.radiosMeta[l]) < .02 && (this.radios[l] = this.radiosMeta[l]), o = !0
          } if (o && this.aplicarBrillo(), this.moviendo = !1, this.ruta.length) {
          let l = this.pie(this.ruta[0]),
            c = Math.hypot(l.x - this.heroe.x, l.y - this.heroe.y),
            g = dr * (e.patines ? 1.6 : 1) * a;
          if (this.moviendo = !0, c <= g) {
            if (this.heroe.x = l.x, this.heroe.y = l.y, this.ruta.shift(), !this.ruta.length && (this.emitir("llegada", this.celda_heroe()), this.alLlegar)) {
              let A = this.alLlegar;
              this.alLlegar = null, A()
            }
          } else this.heroe.x += (l.x - this.heroe.x) / c * g, this.heroe.y += (l.y - this.heroe.y) / c * g
        }
        let t = e.gorro ? "heroe_gorro" : "heroe";
        this.heroe.poner(this.moviendo && Math.floor(this.reloj * 8) % 2 === 1 ? t + "_paso" : t), this.rastro.push(n(this.heroe.x, this.heroe.y)), this.rastro.length > 70 && this.rastro.shift();
        let s = this.rastro[Math.max(0, this.rastro.length - 16)];
        this.chispin.x = s.x + 11, this.chispin.y = s.y - .5, this.chispin.ox = -5.5, this.chispin.oy = -26 + Math.sin(this.reloj * 3) * 1.6;
        let r = 30;
        for (let l of Object.values(this.seguidores)) {
          if (!l.visible) continue;
          let c = this.rastro[Math.max(0, this.rastro.length - r)];
          l.x = c.x - 4, l.y = c.y - .5, l.ox = -5.5, l.oy = -10 - (this.moviendo ? Math.floor(this.reloj * 8) % 2 : 0), r += 14
        }
        this.huida && this.npcs[this.huye] && (this.npcs[this.huye].x += this.huida.x * 70 * a, this.npcs[this.huye].y += this.huida.y * 70 * a);
        for (let l of e.brotes_aqui()) l.crece < 1 && (l.crece = Math.min(1, l.crece + a * 1.8));
        if (this.pasoHumo(a), this.maquina.visible && !e.maquina_apagada ? (this.maquina.dx = Math.round(Math.sin(this.reloj * 37) * .8), this.maquina.dy = Math.round(Math.sin(this.reloj * 23) * .6), Math.random() < a * 1.5 && this.estallido(n(this.maquina.x + V(-40, 40), this.maquina.y - V(10, 60)), "#d6d6de", 2), Math.random() < a * 2.5 && this.estallido(n(this.maquina.x + V(-6, 6), this.maquina.y - 12), "#f6c945", 3)) : (this.maquina.dx = 0, this.maquina.dy = 0), this.tormentaOn) {
          for (let l = 0; l < 3; l++) this.lluvia.push({
            p: n(Math.random() * ua, this.camY + Math.random() * 40 - 20),
            t: 0
          });
          for (let l = this.lluvia.length - 1; l >= 0; l--) {
            let c = this.lluvia[l];
            c.p.x -= 25 * a, c.p.y += 160 * a, c.t += a, c.t > 2.6 && this.lluvia.splice(l, 1)
          }
        }
        for (let l = this.chispas.length - 1; l >= 0; l--) {
          let c = this.chispas[l];
          c.t += a, c.p.x += c.v.x * a, c.p.y += c.v.y * a, c.v.y += 80 * a, c.t > c.max && this.chispas.splice(l, 1)
        }
        this.camara()
      }
      franjas() {
        let a = this.canvas.getBoundingClientRect(),
          o = document.querySelector(".mision"),
          t = document.querySelector(".dialogo"),
          s = document.querySelector(".hud"),
          r = 8;
        o ? r = o.getBoundingClientRect().bottom - a.top + 6 : s && (r = s.getBoundingClientRect().bottom - a.top + 6);
        let l = t ? a.bottom - t.getBoundingClientRect().top + 6 : hr + 6;
        return {
          arriba: r,
          abajo: l
        }
      }
      camara() {
        let a = this.canvas.clientWidth,
          o = this.canvas.clientHeight;
        this.escala = Math.max(2, Math.floor(a / ua));
        let {
          arriba: t,
          abajo: s
        } = this.franjas(), r = P.filas() * f, l = this.heroe.y - 11, c = this.ui && this.ui.vista.dialogo && this.ui.vista.dialogo.quien, g = c && this.npcs[c];
        g && g.visible && (l = (this.heroe.y + g.y) / 2 - 11);
        let A = t + (o - t - s) / 2,
          y = -t / this.escala,
          N = Math.max(y, r - (o - s) / this.escala),
          d = gi(l - A / this.escala, y, N);
        this.camY = this.saltar ? d : this.camY + (d - this.camY) * .12, this.saltar = !1, this.offX = Math.round((a - ua * this.escala) / 2)
      }
      pasoHumo(a) {
        let o = [];
        for (let [t, s] of J[this.zona].humo) {
          let r = this.grisEn(s.x, s.y);
          this.zona === "mercado" && s.x === 12 && s.y === 4 && !e.maquina_apagada && (r = Math.max(.7, r)), o.push([t, r])
        }
        this.zona === "reloj" && !e.maquina_apagada && o.push([n(this.maquina.x - 21, this.maquina.y - 62), 1], [n(this.maquina.x + 17, this.maquina.y - 56), 1]);
        for (let t of ["subeprecios", "prisas", "merma"]) this.visibles[t] && o.push([n(this.npcs[t].x, this.npcs[t].y - 10), 1]);
        for (let [t, s] of o) s > .35 && Math.random() < a * 9 * s && this.humo.push({
          p: n(t.x + V(-11, 11), t.y),
          vy: -V(6, 12),
          t: 0,
          max: V(1.6, 2.6),
          tam: Math.random() < .5 ? 1 : 2,
          c: pr[Math.random() * 3 | 0],
          a: s
        });
        for (let t = this.humo.length - 1; t >= 0; t--) {
          let s = this.humo[t];
          s.t += a, s.p.x += Math.sin((s.t + s.p.y) * 2) * 3 * a, s.p.y += s.vy * a, s.t > s.max && this.humo.splice(t, 1)
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
        let c = Z[J[this.zona].textura],
          g = Ga[J[this.zona].textura];
        if (!c) return;
        o.drawImage(c, 0, 0);
        let A = Math.max(0, Math.floor(this.camY / f)),
          y = Math.min(P.filas() - 1, Math.ceil((this.camY + r / this.escala) / f));
        for (let d = A; d <= y; d++)
          for (let w = 0; w < la; w++) {
            let ra = this.grisLoseta(w, d);
            ra > .01 && (o.globalAlpha = ra, o.drawImage(g, w * f, d * f, f, f, w * f, d * f, f, f))
          }
        if (o.globalAlpha = 1, this.tormentaOn && (o.fillStyle = "rgba(30,32,80,0.38)", o.fillRect(0, 0, ua, P.filas() * f)), this.cartel) {
          let d = Z.cartel_cerrado;
          o.drawImage(d, Math.round(12 * f + 6.5 - d.width / 2), Math.round(14 * f + 2 - d.height / 2))
        }
        for (let d of e.brotes_aqui()) {
          let w = d.fruto ? "brote_fruto" : d.crece >= .5 ? "brote_grande" : "brote_chico";
          o.drawImage(Z[w], d.celda.x * f, d.celda.y * f)
        }
        let N = [this.heroe, this.chispin, ...Object.values(this.seguidores), this.arbol, this.maquina, ...this.gente, ...Object.values(this.npcs)].filter(d => d.visible);
        N.sort((d, w) => d.y - w.y);
        for (let d of N) this.pintarActor(d);
        for (let d of this.humo) o.globalAlpha = Math.max(0, 1 - d.t / d.max) * (.35 + .45 * d.a), o.fillStyle = d.c, o.fillRect(Math.round(d.p.x), Math.round(d.p.y), d.tam, d.tam);
        o.globalAlpha = .55, o.fillStyle = "#bfd1f2";
        for (let d of this.lluvia) o.fillRect(Math.round(d.p.x), Math.round(d.p.y), 1, 3);
        for (let d of this.chispas) o.globalAlpha = Math.max(0, 1 - d.t / d.max), o.fillStyle = d.c, o.fillRect(Math.round(d.p.x), Math.round(d.p.y), 1, 1);
        if (o.globalAlpha = 1, !e.ocupado && this.objetivo_fn) {
          let d = this.objetivo_fn();
          if (d) {
            let w = Math.round(Math.abs(Math.sin(this.reloj * 4)) * 3);
            o.drawImage(Z.flecha, d.x * f + 2, d.y * f - d.z - 5 - w)
          }
        }
        this.toque && this.reloj - this.toque.t < .4 && (o.strokeStyle = `rgba(253,243,216,${1-(this.reloj-this.toque.t)/.4})`, o.lineWidth = 1, o.strokeRect(this.toque.celda.x * f + 1, this.toque.celda.y * f + 1, f - 2, f - 2))
      }
      pintarActor(a) {
        let o = this.ctx,
          t = Z[a.nombre];
        if (!t) return;
        let s = Math.round(a.x + a.ox + a.dx),
          r = Math.round(a.y + a.oy + a.dy);
        o.drawImage(t, s, r), a.conGris && a.fijo > .01 && (o.globalAlpha = a.fijo, o.drawImage(Ga[a.nombre], s, r), o.globalAlpha = 1)
      }
    };

  function V(i, a) {
    return i + Math.random() * (a - i)
  }

  function gi(i, a, o) {
    return Math.max(a, Math.min(o, i))
  }
  var {
    useState: S,
    useEffect: pa,
    useRef: vi,
    useSyncExternalStore: gr
  } = React, X = {
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
  }, br = i => (X[i] || X.chispin)[0], vr = i => (X[i] || X.chispin)[1], qi = "#f6c945", Ai = "#4a4060", xi = "#8fd16a", xr = {
    mercado: "El Mercado",
    valle: "El Valle",
    ciudad: "La Ciudad",
    torre: "La Torre",
    reloj: "El Gran Reloj"
  }, Y = null, Fa = {};

  function ha() {
    if (!Y) try {
      Y = new(window.AudioContext || window.webkitAudioContext);
      for (let [i, a] of Object.entries(_i)) {
        let o = atob(a.split(",")[1]),
          t = new Uint8Array(o.length);
        for (let s = 0; s < o.length; s++) t[s] = o.charCodeAt(s);
        Y.decodeAudioData(t.buffer).then(s => {
          Fa[i] = s
        }).catch(() => {})
      }
    } catch {
      Y = null
    }
  }
  var ma = null;

  function yi() {
    try {
      let i = speechSynthesis.getVoices();
      ma = i.find(a => a.lang && a.lang.startsWith("es-ES")) || i.find(a => a.lang && a.lang.startsWith("es")) || null
    } catch {
      ma = null
    }
  }
  try {
    speechSynthesis.onvoiceschanged = yi, yi()
  } catch {}
  var Qa = new Set,
    z = {
      mision: "",
      dialogo: null,
      capa: null,
      noche: null,
      version: 0
    };

  function E(i) {
    z = {
      ...z,
      ...i,
      version: z.version + 1
    };
    for (let a of Qa) a()
  }
  var yr = i => (Qa.add(i), () => Qa.delete(i));
  e.cambiado(() => E({}));
  var Va = [],
    Oa = null,
    qr = 0,
    x = {
      get vista() {
        return z
      },
      textos_carta: "",
      viaje_pedido: null,
      poner_mision(i) {
        E({
          mision: i
        })
      },
      decir(i) {
        return !i || !i.length ? Promise.resolve() : (e.ocupado = !0, Va = [...i], new Promise(a => {
          Oa = a, this.siguienteLinea()
        }))
      },
      siguienteLinea() {
        if (!Va.length) {
          this.callar(), E({
            dialogo: null
          });
          let o = Oa;
          Oa = null, o && o();
          return
        }
        let [i, a] = Va.shift();
        E({
          dialogo: {
            quien: i,
            texto: a,
            inicio: performance.now(),
            completo: !1
          }
        }), this.hablar(a, i)
      },
      avanzar() {
        let i = z.dialogo;
        if (!i) return;
        let a = (performance.now() - i.inicio) / 24 * L.velocidad;
        if (!i.completo && a < i.texto.length) {
          E({
            dialogo: {
              ...i,
              completo: !0
            }
          });
          return
        }
        this.sonar("siguiente"), this.siguienteLinea()
      },
      hablar(i, a) {
        if (!(!e.sonido || L.velocidad > 1)) try {
          speechSynthesis.cancel();
          let o = new SpeechSynthesisUtterance(i.replace(/…/g, ".").replace(/[¡¿]/g, ""));
          o.lang = "es-ES", ma && (o.voice = ma);
          let t = X[a] || [0, 0, 1, 1];
          o.pitch = Math.min(2, t[2]), o.rate = t[3], speechSynthesis.speak(o)
        } catch {}
      },
      callar() {
        try {
          speechSynthesis.cancel()
        } catch {}
      },
      sonar(i) {
        if (!(!e.sonido || !Y || !Fa[i])) try {
          let a = Y.createBufferSource();
          a.buffer = Fa[i], a.connect(Y.destination), a.start()
        } catch {}
      },
      alternar_sonido() {
        ha(), e.sonido = !e.sonido, e.sonido || this.callar(), e.avisar()
      },
      async pasar_noche(i, a) {
        e.ocupado = !0, E({
          noche: {
            titulo: "Pasa la noche\u2026",
            sub: "",
            opaco: !0
          }
        }), await p(.9), e.estacion = i, e.avisar(), E({
          noche: {
            titulo: "Llega " + Ua[i],
            sub: a,
            opaco: !0
          }
        }), await p(1.6), E({
          noche: {
            ...z.noche,
            opaco: !1
          }
        }), await p(.5), E({
          noche: null
        })
      },
      async viajar(i, a, o) {
        e.ocupado = !0, E({
          noche: {
            titulo: "",
            sub: "",
            opaco: !0,
            viaje: !0
          }
        }), await p(.6), o(), E({
          noche: {
            titulo: i,
            sub: a,
            opaco: !0,
            viaje: !0
          }
        }), await p(1.8), E({
          noche: {
            ...z.noche,
            opaco: !1
          }
        }), await p(.6), E({
          noche: null
        })
      },
      abrir(i, a = {}) {
        return e.ocupado = !0, new Promise(o => {
          let t = {
            id: ++qr,
            tipo: i,
            ...a,
            responder: s => {
              z.capa === t && E({
                capa: null
              }), this.callar(), o(s)
            }
          };
          E({
            capa: t
          })
        })
      },
      pantalla_titulo(i, a) {
        return this.abrir("titulo", {
          hay: i,
          mision: a
        })
      },
      carta(i, a) {
        return a && this.hablar("Querido nieto o nieta. " + i, "abuelo"), this.abrir("carta", {
          texto: i,
          primera: a
        })
      },
      amasar(i = "hogaza", a = "\xA1A amasar!", o = "pan", t = "\xA1Amasar!") {
        return this.abrir("amasar", {
          quien: i,
          titulo: a,
          icono: o,
          accion: t
        })
      },
      reto(i) {
        return this.abrir("reto", {
          monedas: i
        })
      },
      resultado(i, a, o, t, s, r) {
        return this.hablar(r, "chispin"), this.abrir("resultado", {
          icono: i,
          titulo: a,
          texto: o,
          etiqueta: t,
          colores: s,
          frase: r
        })
      },
      elegir(i, a, o) {
        return this.abrir("elegir", {
          icono: i,
          titulo: a,
          opciones: o
        })
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
        })
      },
      victoria(i, a = "Siguiente misi\xF3n") {
        return this.hablar(i.medalla + ". " + i.medalla_texto, "chispin"), this.abrir("victoria", {
          t: i,
          boton: a
        })
      },
      async ojo_tasador(i) {
        let a = 0;
        for (let o = 0; o < i.length; o++) {
          let t = i[o],
            r = await this.abrir("ojo", {
              r: t,
              i: o,
              n: i.length
            }) === t.buena;
          r ? (a++, this.sonar("acierto")) : this.sonar("fallo"), await this.decir([
            ["tasador", r ? t.bien : t.mal]
          ])
        }
        return a
      },
      async clasificar(i) {
        let a = 0;
        for (let o = 0; o < i.length; o++) {
          let t = i[o],
            r = await this.abrir("clasificar", {
              c: t,
              i: o,
              n: i.length
            }) === t.tipo;
          r ? (a++, this.sonar("acierto")) : this.sonar("fallo"), await this.decir([
            ["chispin", (r ? "\xA1Eso es! " : "Casi. ") + t.explica]
          ])
        }
        return a
      },
      presupuesto(i, a, o = "Tus compras de la feria") {
        return this.abrir("presupuesto", {
          total: i,
          cosas: a,
          titulo: o
        })
      },
      comparar(i, a) {
        return this.hablar(a, "yunque"), this.abrir("comparar", {
          filas: i,
          frase: a
        })
      },
      lista(i, a, o, t) {
        return this.hablar(t, i), this.abrir("lista", {
          quien: i,
          titulo: a,
          filas: o,
          frase: t
        })
      },
      tabla(i, a, o, t, s) {
        return this.hablar(s, i), this.abrir("tabla", {
          quien: i,
          titulo: a,
          columnas: o,
          filas: t,
          frase: s
        })
      },
      repartir(i, a, o, t) {
        return this.abrir("repartir", {
          total: i,
          opciones: a,
          titulo: o,
          nota: t
        })
      },
      pistas(i, a, o, t) {
        return this.abrir("pistas", {
          quien: i,
          titulo: a,
          icono: o,
          lista: t
        })
      },
      cuaderno(i, a, o, t) {
        return this.hablar(t, "chispin"), this.abrir("cuaderno", {
          titulo: i,
          columnas: a,
          filas: o,
          frase: t
        })
      },
      forja(i) {
        return this.hablar(i.forja_texto, "pendulo"), this.abrir("forja", {
          textos: i
        })
      },
      fin_del_juego(i) {
        return this.hablar(i.fin_titulo + ". " + i.fin_texto, "chispin"), this.abrir("fin", {
          textos: i
        })
      },
      async panel(i) {
        if (z.capa || z.dialogo || z.noche || e.paso === "titulo") return;
        let a = e.ocupado,
          o = await this.abrir("panel", {
            panel: i
          });
        e.ocupado = a, o === "leer" && (await this.carta(this.textos_carta, !1), e.ocupado = a), o && o.startsWith("viajar_") && this.viaje_pedido && this.viaje_pedido(o.slice(7))
      }
    };

  function _({
    n: i,
    e: a = 2,
    style: o
  }) {
    let t = ia(i);
    return t ? React.createElement("img", {
      className: "ico",
      src: ca[i],
      alt: "",
      style: {
        width: t.width * a,
        height: t.height * a,
        ...o
      }
    }) : null
  }

  function K({
    n: i,
    e: a = 3
  }) {
    return React.createElement("span", {
      className: "hueco"
    }, React.createElement(_, {
      n: i,
      e: a
    }))
  }

  function b({
    texto: i,
    icono: a,
    dorado: o,
    onClick: t,
    disabled: s,
    escala: r = 3,
    className: l = "",
    pulsado: c,
    ...g
  }) {
    return React.createElement("button", {
      className: `btn ${o?"dorado":""} ${a?"con-icono":""} ${c?"pulsado":""} ${l}`,
      disabled: s,
      onClick: () => {
        x.sonar("siguiente"), t && t()
      },
      ...g
    }, a && React.createElement(K, {
      n: a,
      e: r
    }), React.createElement("span", null, i))
  }
  var $ = ({
    quien: i
  }) => React.createElement("span", {
    className: "etq-nombre",
    style: {
      background: vr(i)
    }
  }, br(i));

  function Q({
    texto: i
  }) {
    return React.createElement("div", {
      className: "bocadillo"
    }, React.createElement(_, {
      n: "chispin",
      e: 2
    }), React.createElement("p", null, i))
  }

  function Ar({
    colores: i
  }) {
    return React.createElement("div", {
      className: "medidor"
    }, i.map((a, o) => React.createElement("span", {
      key: o,
      style: {
        background: a
      }
    })))
  }

  function wr() {
    return React.createElement("div", {
      className: "hud"
    }, React.createElement("div", {
      className: "caja fila"
    }, React.createElement(_, {
      n: "moneda",
      e: 2
    }), React.createElement("b", {
      className: "num"
    }, e.monedas), React.createElement("span", {
      className: "segs"
    }, [0, 1, 2, 3, 4].map(i => React.createElement("i", {
      key: i,
      style: {
        background: i < e.brillo ? qi : Ai
      }
    })))), React.createElement("div", {
      className: "hueco-flex"
    }), React.createElement("div", {
      className: "caja fila"
    }, React.createElement("span", {
      className: "peq"
    }, Wa[e.estacion]), React.createElement("span", {
      className: "chip-calma"
    }, "CALMA")), React.createElement("button", {
      className: "btn voz",
      onClick: () => x.alternar_sonido(),
      "aria-label": "Activar o desactivar la voz y el sonido"
    }, e.sonido ? "Voz" : "Mudo"))
  }

  function zr() {
    if (!z.mision || z.dialogo) return null;
    let i = e.progreso_actual(),
      a = (Math.max(-1, Math.min(1, e.pendulo)) + 1) / 2;
    return React.createElement("div", {
      className: "mision"
    }, React.createElement("div", {
      className: "mision-t"
    }, z.mision), React.createElement("div", {
      className: "barra"
    }, React.createElement("i", {
      style: {
        width: i + "%"
      }
    })), React.createElement("div", {
      className: "mision-p"
    }, (xr[e.zona] || "Valoria") + " brilla al " + i + "%"), e.zona === "reloj" && !e.maquina_apagada && React.createElement("div", {
      className: "pendulo"
    }, React.createElement("span", {
      style: {
        color: "#9fb8d8"
      }
    }, "P\xE1nico"), React.createElement("span", {
      className: "pista"
    }, React.createElement("i", {
      className: "t1"
    }), React.createElement("i", {
      className: "t2"
    }), React.createElement("i", {
      className: "t3"
    }), React.createElement("b", {
      style: {
        left: `calc(${a*100}% - 2px)`
      }
    })), React.createElement("span", {
      style: {
        color: "#ff8fbd"
      }
    }, "Euforia")))
  }

  function Ir() {
    return React.createElement("nav", {
      className: "nav"
    }, [
      ["mochila", "Mochila", "mochila", 2],
      ["huerto", "Huerto", "huerto", 2],
      ["mapa", "Mapa", "mapa", 2],
      ["criaturas", "Criaturas", "chispin", 3]
    ].map(([a, o, t, s]) => React.createElement("button", {
      key: a,
      className: "btn nav-b",
      onClick: () => x.panel(a)
    }, React.createElement(_, {
      n: t,
      e: s
    }), React.createElement("span", null, o), a === "huerto" && e.frutos_listos() > 0 && React.createElement("em", {
      className: "insignia"
    }, "!"))))
  }

  function Dr() {
    let i = z.dialogo,
      [, a] = S(0);
    if (pa(() => {
        if (!i) return;
        let l, c = () => {
          a(g => g + 1), l = requestAnimationFrame(c)
        };
        return l = requestAnimationFrame(c), () => cancelAnimationFrame(l)
      }, [i]), !i) return null;
    let o = i.completo ? i.texto.length : Math.floor((performance.now() - i.inicio) / 24 * L.velocidad),
      t = ia(i.quien === "abuelo" ? "abuelo" : i.quien) || ia("chispin"),
      s = X[i.quien] ? i.quien : "chispin",
      r = Math.max(2, Math.floor(Math.min(66 / t.width, 86 / t.height)));
    return React.createElement("div", {
      className: "dialogo",
      onClick: () => x.avanzar(),
      role: "button",
      tabIndex: 0,
      onKeyDown: l => (l.key === "Enter" || l.key === " ") && x.avanzar()
    }, React.createElement($, {
      quien: s
    }), React.createElement("div", {
      className: "fila arriba"
    }, React.createElement("div", {
      className: "retrato"
    }, React.createElement(_, {
      n: ia(i.quien) ? i.quien : "chispin",
      e: r
    })), React.createElement("div", {
      className: "dialogo-der"
    }, React.createElement("p", null, i.texto.slice(0, o)), React.createElement("small", null, "Toca para seguir"))))
  }

  function jr() {
    let i = z.noche;
    return i ? React.createElement("div", {
      className: `noche ${i.opaco?"visible":""}`
    }, React.createElement("div", {
      className: "noche-c"
    }, !i.viaje && React.createElement("i", {
      className: "luna"
    }), React.createElement("h2", null, i.titulo), React.createElement("p", null, i.sub))) : null
  }

  function Nr() {
    let i = z.capa;
    if (!i) return null;
    let a = Er[i.tipo];
    return React.createElement("div", {
      className: "capa"
    }, React.createElement("div", {
      className: "marco",
      key: i.id
    }, React.createElement(a, {
      c: i
    })))
  }
  var Er = {
    titulo: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("h1", {
      className: "logo"
    }, "VALORIA"), React.createElement("p", {
      className: "centro suave"
    }, i.hay && i.mision > 15 ? "Todo Valoria brilla" : i.hay && i.mision >= 13 ? "El Gran Reloj" : i.hay && i.mision >= 10 ? "La Torre del Rev\xE9s" : i.hay && i.mision >= 7 ? "La Ciudad de las Empresas" : i.hay && i.mision >= 4 ? "El Valle de la Nieve" : "El Mercado del Pueblo"), React.createElement("div", {
      className: "fila centrar"
    }, React.createElement(_, {
      n: "heroe",
      e: 3
    }), React.createElement(_, {
      n: "chispin",
      e: 3
    })), React.createElement("p", {
      className: "centro suave"
    }, "Un reino ha perdido su brillo. T\xFA puedes devolv\xE9rselo."), i.hay ? React.createElement(React.Fragment, null, React.createElement(b, {
      dorado: !0,
      texto: i.mision > 15 ? "Continuar \xB7 explorar Valoria" : `Continuar \xB7 misi\xF3n ${i.mision}`,
      onClick: () => {
        ha(), i.responder("continuar")
      }
    }), React.createElement(b, {
      texto: "Empezar de nuevo",
      onClick: () => {
        ha(), i.responder("nuevo")
      }
    })) : React.createElement(b, {
      dorado: !0,
      texto: "Empezar la aventura",
      onClick: () => {
        ha(), i.responder("empezar")
      }
    }), React.createElement("p", {
      className: "centro peq suave"
    }, "Con voz \xB7 toca el suelo para caminar")),
    carta: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(_, {
      n: "carta",
      e: 3
    }), React.createElement("h2", null, "Legado de Libertad")), React.createElement("div", {
      className: "pergamino"
    }, `Querido nieto o nieta:

` + i.texto + `

Tu abuelo`), React.createElement(b, {
      dorado: !0,
      texto: i.primera ? "Coger la bolsa" : "Guardar la carta",
      onClick: () => i.responder()
    })),
    amasar: Pr,
    reto: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila centrar"
    }, React.createElement(_, {
      n: "subeprecios",
      e: 3
    })), React.createElement($, {
      quien: "subeprecios"
    }), React.createElement("h3", null, "\xA1Je, je! Ma\xF1ana todo costar\xE1 m\xE1s."), React.createElement(Q, {
      texto: `\xBFQu\xE9 hacemos con tus ${i.monedas} monedas?`
    }), React.createElement(b, {
      icono: "hucha",
      texto: "Guardarlas en la hucha",
      onClick: () => i.responder("hucha")
    }), React.createElement(b, {
      icono: "semillas",
      texto: "Plantar semillas (5 monedas)",
      disabled: i.monedas < 5,
      onClick: () => i.responder("semillas")
    }), React.createElement(b, {
      icono: "caramelo",
      texto: "Comprar caramelos",
      onClick: () => i.responder("caramelo")
    }), React.createElement("p", {
      className: "centro peq suave"
    }, "Elige lo que quieras: no hay castigo.")),
    resultado: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(K, {
      n: i.icono
    }), React.createElement("h2", null, i.titulo)), React.createElement("p", {
      className: "suave"
    }, i.texto), React.createElement("div", {
      className: "fila"
    }, React.createElement("span", {
      className: "etq"
    }, i.etiqueta), React.createElement(Ar, {
      colores: i.colores
    })), React.createElement(Q, {
      texto: i.frase
    }), React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    })),
    elegir: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(_, {
      n: i.icono,
      e: 3
    }), React.createElement("h2", null, i.titulo)), i.opciones.map(a => React.createElement(b, {
      key: a[0],
      icono: a[2],
      texto: a[1],
      disabled: !!a[3],
      onClick: () => i.responder(a[0])
    }))),
    pregunta: Cr,
    victoria: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila centrar"
    }, React.createElement(_, {
      n: i.t.icono_medalla || "medalla",
      e: 5
    })), React.createElement("h2", {
      className: "centro"
    }, i.t.medalla), React.createElement("p", {
      className: "centro suave"
    }, i.t.medalla_texto), React.createElement("div", {
      className: "pergamino peq-p"
    }, "Legado de Libertad \xB7 " + (i.t.pagina_numero || "p\xE1gina 1") + `
` + i.t.pagina), React.createElement("div", {
      className: "reto-familia"
    }, React.createElement("small", null, "RETO EN FAMILIA"), React.createElement("p", null, i.t.reto_familia)), React.createElement(b, {
      dorado: !0,
      texto: i.boton,
      onClick: () => i.responder("seguir")
    })),
    ojo: Rr,
    clasificar: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("h2", null, `Tu lista de la feria \xB7 ${i.i+1} de ${i.n}`), React.createElement("div", {
      className: "fila centrar"
    }, React.createElement(_, {
      n: i.c.icono,
      e: 5
    })), React.createElement("h3", {
      className: "centro"
    }, `${i.c.nombre} \xB7 ${i.c.precio} monedas`), React.createElement(Q, {
      texto: "\xBFEsto lo necesitas, te hace crecer o te apetece?"
    }), React.createElement(b, {
      texto: "Lo necesito",
      onClick: () => i.responder("necesito")
    }), React.createElement(b, {
      texto: "Me hace crecer",
      onClick: () => i.responder("crecer")
    }), React.createElement(b, {
      texto: "Me apetece",
      onClick: () => i.responder("apetece")
    })),
    presupuesto: Mr,
    comparar: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement($, {
      quien: "yunque"
    }), React.createElement("h2", null, "Lo bueno se paga una vez"), i.filas.map(a => {
      let o = String(Math.round(a[2] / a[3] * 10) / 10).replace(".", ",");
      return React.createElement("div", {
        className: "fila",
        key: a[0]
      }, React.createElement(K, {
        n: a[0]
      }), React.createElement("div", {
        className: "col"
      }, React.createElement("b", null, `${a[1]} \xB7 ${a[2]} monedas`), React.createElement("div", {
        className: "cuadros"
      }, Array.from({
        length: 10
      }, (t, s) => React.createElement("i", {
        key: s,
        style: {
          background: s < a[3] ? xi : Ai
        }
      }))), React.createElement("small", {
        className: "suave"
      }, `Dura ${a[3]===1?"1 estaci\xF3n":a[3]+" estaciones"}: ${o} monedas por estaci\xF3n`)))
    }), React.createElement(Q, {
      texto: i.frase
    }), React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    })),
    lista: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement($, {
      quien: i.quien
    }), React.createElement("h2", null, i.titulo), i.filas.map((a, o) => React.createElement("div", {
      className: "fila",
      key: o
    }, React.createElement(K, {
      n: a[0]
    }), React.createElement("p", null, a[1]))), React.createElement(Q, {
      texto: i.frase
    }), React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    })),
    tabla: ({
      c: i
    }) => {
      let a = 1;
      for (let o of i.filas)
        for (let t of o[2]) a = Math.max(a, t);
      return React.createElement(React.Fragment, null, React.createElement($, {
        quien: i.quien
      }), React.createElement("h2", null, i.titulo), React.createElement("div", {
        className: "tabla",
        style: {
          gridTemplateColumns: `auto repeat(${i.columnas.length}, 1fr)`
        }
      }, React.createElement("span", null), i.columnas.map(o => React.createElement("small", {
        key: o,
        className: "centro suave"
      }, o)), i.filas.map((o, t) => [React.createElement("div", {
        key: "c" + t,
        className: "cab"
      }, React.createElement(_, {
        n: o[0],
        e: 2
      }), React.createElement("small", null, o[1])), ...o[2].map((s, r) => React.createElement("div", {
        key: t + "-" + r,
        className: "celda"
      }, React.createElement("div", {
        className: "alto"
      }, React.createElement("i", {
        style: {
          height: s / a * 100 + "%",
          background: o[3] || xi
        }
      })), React.createElement("b", null, s)))])), React.createElement(Q, {
        texto: i.frase
      }), React.createElement(b, {
        dorado: !0,
        texto: "Seguir",
        onClick: () => i.responder()
      }))
    },
    repartir: Hr,
    pistas: Tr,
    cuaderno: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(_, {
      n: "cuaderno",
      e: 3
    }), React.createElement("h2", null, i.titulo)), React.createElement("div", {
      className: "tabla",
      style: {
        gridTemplateColumns: `auto repeat(${i.columnas.length}, 1fr)`
      }
    }, React.createElement("span", null), i.columnas.map(a => React.createElement("small", {
      key: a,
      className: "centro suave"
    }, a)), i.filas.map((a, o) => [React.createElement("div", {
      key: "c" + o,
      className: "cab"
    }, React.createElement(_, {
      n: a[0],
      e: 2
    }), React.createElement("small", null, a[1])), ...a[2].map((t, s) => React.createElement("div", {
      key: o + "-" + s,
      className: "celda medio"
    }, React.createElement(_, {
      n: t ? "si" : "no",
      e: 3
    })))])), React.createElement(Q, {
      texto: i.frase
    }), React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    })),
    forja: Br,
    fin: ({
      c: i
    }) => React.createElement(React.Fragment, null, React.createElement("h1", {
      className: "logo"
    }, "VALORIA"), React.createElement("h2", {
      className: "centro"
    }, i.textos.fin_titulo), React.createElement("div", {
      className: "fila centrar"
    }, ["heroe", "chispin", "brotin", "escudon", "repartija", "olfatin", "calmin"].map(a => React.createElement(_, {
      key: a,
      n: a,
      e: 2
    }))), React.createElement("p", {
      className: "centro suave"
    }, i.textos.fin_texto), React.createElement(b, {
      dorado: !0,
      texto: "Seguir explorando",
      onClick: () => i.responder()
    })),
    panel: Lr
  };

  function Pr({
    c: i
  }) {
    let [a, o] = S(0), [t, s] = S(0), [, r] = S(0), l = vi(performance.now()), c = vi(null), g = () => (Math.sin((performance.now() - l.current) / 1e3 * 3.2) + 1) / 2;
    pa(() => {
      let d, w = () => {
        r(ra => ra + 1), d = requestAnimationFrame(w)
      };
      return d = requestAnimationFrame(w), () => cancelAnimationFrame(d)
    }, []);
    let A = t >= 6,
      y = Math.max(3, Math.min(5, a));
    pa(() => {
      if (A) {
        let d = setTimeout(() => i.responder(y), 900 / L.velocidad);
        return () => clearTimeout(d)
      }
    }, [A]);
    let N = () => {
      if (A) return;
      let d = g();
      d > .36 && d < .64 ? (o(w => w + 1), x.sonar("acierto"), c.current && c.current.animate([{
        transform: "scale(1.2,0.8)"
      }, {
        transform: "scale(1,1)"
      }], 250)) : x.sonar("fallo"), s(w => w + 1)
    };
    return React.createElement(React.Fragment, null, React.createElement($, {
      quien: i.quien
    }), React.createElement("h2", null, i.titulo), React.createElement("p", {
      className: "suave"
    }, "Toca cuando la marca pase por la zona dorada."), React.createElement("div", {
      className: "fila centrar"
    }, React.createElement("span", {
      ref: c
    }, React.createElement(_, {
      n: i.icono,
      e: 6
    }))), React.createElement("div", {
      className: "pista-amasar"
    }, React.createElement("i", {
      className: "zona"
    }), React.createElement("b", {
      style: {
        left: `calc(${g()*100}% - 3px)`
      }
    })), React.createElement("p", {
      className: "centro suave"
    }, A ? `\xA1Has ganado ${y} monedas!` : `Golpes buenos: ${a} de ${t||6}`), React.createElement(b, {
      dorado: !0,
      texto: i.accion,
      disabled: A,
      onClick: N
    }))
  }

  function Cr({
    c: i
  }) {
    let [a, o] = S(null), t = a === i.correcta;
    return pa(() => {
      a && (x.sonar(t ? "moneda" : "siguiente"), x.hablar(t ? i.bien : i.mal, "chispin"))
    }, [a]), React.createElement(React.Fragment, null, React.createElement(Q, {
      texto: i.texto
    }), i.opciones.map(s => React.createElement(b, {
      key: s[0],
      icono: s[2],
      escala: s[3] || 3,
      texto: s[1],
      disabled: !!a,
      pulsado: a === s[0],
      onClick: () => o(s[0])
    })), a && React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila centrar"
    }, [1, .75, .45, .2].map(s => React.createElement(_, {
      key: s,
      n: "moneda",
      e: 3,
      style: {
        opacity: s
      }
    }))), React.createElement("p", null, t ? i.bien : i.mal), React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder(t)
    })))
  }

  function Rr({
    c: i
  }) {
    let [a, o] = S({});
    return React.createElement(React.Fragment, null, React.createElement($, {
      quien: "tasador"
    }), React.createElement("h2", null, `Ojo de tasador \xB7 ${i.i+1} de ${i.n}`), React.createElement("p", {
      className: "suave"
    }, "Toca \xABMirar\xBB para ver cu\xE1nto dura cada cosa. Luego elige."), React.createElement("div", {
      className: "dos"
    }, ["a", "b"].map(t => {
      let s = i.r[t];
      return React.createElement("div", {
        className: "carta-o",
        key: t
      }, React.createElement("div", {
        className: "fila centrar"
      }, React.createElement(_, {
        n: s.icono,
        e: 3
      })), React.createElement("b", {
        className: "centro"
      }, s.nombre), React.createElement("span", {
        className: "centro oro"
      }, s.precio, " monedas"), React.createElement("small", {
        className: "centro suave detalle"
      }, a[t] ? s.detalle : ""), React.createElement(b, {
        texto: "Mirar",
        onClick: () => o({
          ...a,
          [t]: !0
        })
      }), React.createElement(b, {
        dorado: !0,
        texto: "Elegir",
        onClick: () => i.responder(t)
      }))
    })))
  }

  function Mr({
    c: i
  }) {
    let [a, o] = S({}), t = i.cosas.reduce((s, r) => s + (a[r.id] ? +r.precio : 0), 0);
    return React.createElement(React.Fragment, null, React.createElement("h2", null, i.titulo), React.createElement("p", {
      className: "suave"
    }, `Tienes ${i.total} monedas. Toca lo que quieras comprar.`), i.cosas.map(s => React.createElement(b, {
      key: s.id,
      icono: s.icono,
      texto: `${s.nombre} \xB7 ${s.precio}`,
      pulsado: !!a[s.id],
      "aria-pressed": !!a[s.id],
      onClick: () => o({
        ...a,
        [s.id]: !a[s.id]
      })
    })), React.createElement("p", {
      className: "centro",
      style: {
        color: t <= i.total ? qi : "#ff8f7a"
      }
    }, `Gastas ${t} de ${i.total} monedas`), React.createElement(b, {
      dorado: !0,
      texto: "Comprar lo elegido",
      disabled: t > i.total,
      onClick: () => i.responder(i.cosas.filter(s => a[s.id]).map(s => s.id))
    }))
  }

  function Hr({
    c: i
  }) {
    let [a, o] = S(Object.fromEntries(i.opciones.map(r => [r[0], 0]))), t = Object.values(a).reduce((r, l) => r + l, 0), s = (r, l) => {
      (l > 0 && t < i.total || l < 0 && a[r] > 0) && o({
        ...a,
        [r]: a[r] + l
      })
    };
    return React.createElement(React.Fragment, null, React.createElement("h2", null, i.titulo), React.createElement("p", {
      className: "suave"
    }, i.nota), i.opciones.map(r => React.createElement("div", {
      className: "fila",
      key: r[0]
    }, React.createElement(K, {
      n: r[2]
    }), React.createElement("b", {
      className: "crece"
    }, r[1]), React.createElement(b, {
      className: "mini",
      texto: "\u2212",
      onClick: () => s(r[0], -1),
      "aria-label": "Quitar de " + r[1]
    }), React.createElement("b", {
      className: "oro num-g"
    }, a[r[0]]), React.createElement(b, {
      className: "mini",
      texto: "+",
      onClick: () => s(r[0], 1),
      "aria-label": "Poner en " + r[1]
    }))), React.createElement("p", {
      className: "centro oro"
    }, t < i.total ? `Te quedan ${i.total-t} por repartir` : "\xA1Todo repartido!"), React.createElement(b, {
      dorado: !0,
      texto: "\xA1Listo!",
      disabled: t < i.total,
      onClick: () => i.responder(a)
    }))
  }

  function Tr({
    c: i
  }) {
    let [a, o] = S({}), t = i.lista.every((s, r) => a[r]);
    return React.createElement(React.Fragment, null, React.createElement($, {
      quien: i.quien
    }), React.createElement("div", {
      className: "fila"
    }, React.createElement(_, {
      n: i.icono,
      e: 3
    }), React.createElement("h2", null, i.titulo)), i.lista.map((s, r) => React.createElement("div", {
      key: r,
      className: "pista-b"
    }, React.createElement("div", {
      className: "fila"
    }, React.createElement(K, {
      n: s[0],
      e: 2
    }), React.createElement("div", {
      className: "col crece"
    }, React.createElement("b", null, s[1]), a[r] && React.createElement("small", {
      className: "suave"
    }, s[2])), a[r] && React.createElement(_, {
      n: s[3] ? "si" : "no",
      e: 2
    })), !a[r] && React.createElement(b, {
      icono: "lupa_icono",
      escala: 2,
      texto: "Mirar con la lupa",
      onClick: () => {
        o({
          ...a,
          [r]: !0
        }), x.hablar(s[2], i.quien)
      }
    }))), React.createElement(b, {
      dorado: !0,
      texto: "Apuntar en el cuaderno",
      disabled: !t,
      onClick: () => i.responder()
    }))
  }

  function Br({
    c: i
  }) {
    let [a, o] = S(!1);
    return React.createElement(React.Fragment, null, React.createElement($, {
      quien: "pendulo"
    }), React.createElement("h2", null, i.textos.forja_titulo), a ? React.createElement("div", {
      className: "fila centrar"
    }, React.createElement("span", {
      className: "aparece"
    }, React.createElement(_, {
      n: "moneda_estrella",
      e: 8
    }))) : React.createElement("div", {
      className: "fila centrar"
    }, ["medalla_copo", "medalla_lupa", "medalla_reves", "medalla_pendulo"].map(t => React.createElement(_, {
      key: t,
      n: t,
      e: 4
    }))), React.createElement("p", {
      className: "suave"
    }, a ? i.textos.forja_hecha : i.textos.forja_texto), a ? React.createElement(b, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    }) : React.createElement(b, {
      dorado: !0,
      texto: i.textos.forja_boton,
      onClick: () => {
        o(!0), x.sonar("fanfarria"), x.hablar(i.textos.forja_hecha, "pendulo")
      }
    }))
  }

  function Lr({
    c: i
  }) {
    let a = i.panel,
      o = React.createElement(b, {
        texto: "Cerrar",
        onClick: () => i.responder("cerrar")
      });
    if (a === "mochila") {
      let s = {
          fiel: "la zapater\xEDa",
          engranaje: "el taller de inventos",
          horno: "el horno",
          fragua: "la fragua",
          relampago: "Rel\xE1mpago",
          bazar: "el bazar"
        },
        r = Object.keys(e.trocitos).filter(l => e.trocitos_de(l) > 0).map(l => s[l] || l);
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "mochila",
        e: 3
      }), React.createElement("h2", null, "Mochila")), React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "moneda",
        e: 3
      }), React.createElement("p", null, `${e.monedas} monedas \xB7 brillo ${e.brillo} de 5`)), React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "semillas",
        e: 2
      }), React.createElement("p", null, e.semillas > 0 ? `${e.semillas} semillas` : "Sin semillas")), React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "fruto",
        e: 2
      }), React.createElement("p", null, `${e.frutos} frutos`)), e.patines && React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "patines",
        e: 2
      }), React.createElement("p", null, "Patines de cohete")), e.maquina_apagada && React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "moneda_estrella",
        e: 2
      }), React.createElement("p", null, "La Moneda Estrella, n\xBA 1 de 21")), r.length > 0 && React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "trocito",
        e: 2
      }), React.createElement("p", null, "Trocitos de " + r.join(", "))), e.tiene_chispin && React.createElement(b, {
        icono: "carta",
        texto: "Leer \xABLegado de Libertad\xBB",
        onClick: () => i.responder("leer")
      }), o)
    }
    if (a === "huerto") {
      let s = e.brotes_aqui().length,
        r = e.frutos_listos();
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "huerto",
        e: 3
      }), React.createElement("h2", null, "Tu huerto")), React.createElement("p", {
        className: "suave"
      }, s > 0 ? `Tienes ${s} brotes` + (r > 0 ? ` y ${r} frutos listos para recoger.` : ".") : "Aqu\xED no has plantado nada."), React.createElement(Q, {
        texto: "Las semillas trabajan mientras duermes."
      }), o)
    }
    if (a === "mapa") {
      let s = e.paso === "libre",
        r = [
          ["mercado", "Mercado del Pueblo", 1, e.progreso],
          ["valle", "Valle de la Nieve", 4, e.progreso_valle],
          ["ciudad", "Ciudad de las Empresas", 7, e.progreso_ciudad],
          ["torre", "Torre del Rev\xE9s", 10, e.progreso_torre],
          ["reloj", "Gran Reloj", 13, e.progreso_reloj]
        ],
        l = r.reduce((c, g) => c + g[3], 0);
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "fila"
      }, React.createElement(_, {
        n: "mapa",
        e: 3
      }), React.createElement("h2", null, "Valoria")), r.map(([c, g, A, y]) => {
        let N = e.zona === c;
        if (s && !N && e.mision >= A) return React.createElement(b, {
          key: c,
          texto: g + " \xB7 viajar",
          onClick: () => i.responder("viajar_" + c)
        });
        let d = N ? "AQU\xCD EST\xC1S" : y >= 100 ? "BRILLA" : e.mision >= A ? "ABIERTO" : "CERRADO";
        return React.createElement("div", {
          key: c,
          className: `zona-f ${N?"aqui":""}`
        }, React.createElement("span", null, g), React.createElement("em", null, d))
      }), React.createElement("p", {
        className: "peq suave"
      }, `Valoria brilla al ${Math.floor(l/5)}%.`), o)
    }
    let t = {
      brotin: ["Brot\xEDn", "Nace donde lo que ganas se vuelve a plantar."],
      escudon: ["Escud\xF3n", "Guarda lo importante cuando llega la helada."],
      repartija: ["Repartija", "Teje hilos entre tus talleres: si uno cae, los otros te sostienen."],
      olfatin: ["Olfat\xEDn", "Huele los timos y las ofertas demasiado buenas."],
      calmin: ["Calm\xEDn", "Te calma cuando todos tienen miedo."]
    };
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(_, {
      n: "chispin",
      e: 3
    }), React.createElement("h2", null, "Criaturas")), e.tiene_chispin && React.createElement("div", {
      className: "criatura fila"
    }, React.createElement(_, {
      n: "chispin",
      e: 4
    }), React.createElement("div", {
      className: "col"
    }, React.createElement("b", null, "Chisp\xEDn"), React.createElement("small", {
      className: "suave"
    }, "Crece y evoluciona con los frutos de lo invertido."))), e.criaturas.map(s => React.createElement("div", {
      key: s,
      className: "criatura fila"
    }, React.createElement(_, {
      n: s,
      e: 4
    }), React.createElement("div", {
      className: "col"
    }, React.createElement("b", null, t[s][0]), React.createElement("small", {
      className: "suave"
    }, t[s][1])))), React.createElement("p", {
      className: "suave"
    }, e.criaturas.length >= 5 ? "\xA1Has encontrado todas las criaturas de Valoria!" : `${5-e.criaturas.length} criaturas m\xE1s por descubrir en Valoria.`), o)
  }

  function wi() {
    return gr(yr, () => z), React.createElement("div", {
      className: "ui"
    }, React.createElement(wr, null), React.createElement(zr, null), React.createElement(Dr, null), React.createElement(Ir, null), React.createElement(Nr, null), React.createElement(jr, null))
  }
  var m = "#f6c945",
    j = "#fff1a8",
    H = "#4a4060",
    fa = "#7cc05a",
    T = "#9b6ccc",
    I = "#9ad86f",
    _a = "#e0503c",
    W = "#9fd6f5",
    u = (i, a) => ({
      x: i,
      y: a
    }),
    h = (i, a, o) => ({
      x: i,
      y: a,
      z: o
    }),
    v = (i, a, o) => ({
      x: i.x + a,
      y: i.y + o
    }),
    zi = u(0, -1),
    G = u(0, 1),
    B = u(1, 0),
    Ii = u(-1, 0),
    q = class {
      constructor(a, o) {
        this.numero = a, this.datos = o
      }
      async jugar(a, o) {
        this.mundo = a, this.ui = o, a.objetivo_fn = () => this.objetivo();
        let t = [a.on("npc", r => this.npc(r)), a.on("parcela", r => this.parcela(r)), a.on("lugar", r => this.lugar(r)), a.on("llegada", r => this.llegada(r))],
          s = new Promise(r => {
            this.terminar = r
          });
        this.empezar(), await s, t.forEach(r => r()), a.objetivo_fn = null
      }
      fin() {
        this.terminar()
      }
      empezar() {}
      async npc(a) {
        await this.charla(a)
      }
      async parcela(a) {
        let o = e.brote_en(a);
        await this.ui.decir([
          ["chispin", o ? "Este brote crece poco a poco." : "Un buen hueco para plantar\u2026 cuando tengamos semillas."]
        ]), e.ocupado = !1
      }
      lugar() {}
      llegada() {}
      objetivo() {
        return null
      }
      dl(a, o = {}) {
        return this.datos.dialogos[a].map(([t, s]) => [t, Sa(s, o)])
      }
      tx(a, o = {}) {
        return Sa(this.datos.textos[a], o)
      }
      paso(a) {
        e.paso = a, e.ocupado = !1, this.ui.poner_mision(this.datos.misiones[a] || {
          valle: "Valle de la Nieve",
          ciudad: "Ciudad de las Empresas",
          torre: "Torre del Rev\xE9s",
          reloj: "Gran Reloj"
        } [e.zona] || "Mercado del Pueblo")
      }
      async charla(a) {
        let o = "charla_" + a;
        await this.ui.decir(this.datos.dialogos[o] ? this.dl(o) : [
          ["chispin", "\xA1Hola!"]
        ]), e.ocupado = !1
      }
      siguiente_estacion() {
        return (e.estacion + 1) % 4
      }
      plantar(a) {
        e.plantar(a), this.mundo.estallido(u(a.x * f + 6.5, a.y * f + 6), I, 10)
      }
      parcela_libre() {
        return P.parcelas().find(a => !e.brote_en(a)) || null
      }
      primer_fruto() {
        let a = e.brotes_aqui().find(o => o.fruto);
        return a ? h(a.celda.x, a.celda.y, 2) : null
      }
      sobre_heroe() {
        return this.mundo.sobre_heroe()
      }
      ganar_monedas(a) {
        e.monedas += a, e.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), m, 10)
      }
      cosechar(a) {
        return a.fruto = !1, e.frutos += a.cuantos | 0, this.ui.sonar("moneda"), this.mundo.estallido(u(a.celda.x * f + 6.5, a.celda.y * f + 4), _a, 8), e.avisar(), e.frutos_listos() === 0
      }
    };
  var ba = class extends q {
      objetivo() {
        switch (e.paso) {
          case "ir_hogaza":
          case "comprar_pan":
            return h(2, 9, 23);
          case "ir_semilla":
            return h(6, 4, 23);
          case "vender":
            return h(1, 13, 23);
          case "plantar": {
            let a = this.parcela_libre();
            return a ? h(a.x, a.y, 2) : null
          }
          case "cosechar":
            return this.primer_fruto()
        }
        return null
      }
      async empezar() {
        this.ui.textos_carta = this.tx("carta"), await this.ui.carta(this.tx("carta"), !0), e.monedas = 10, e.semillas = 1, e.tiene_chispin = !0, e.avisar(), this.mundo.mostrar_chispin(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), m, 14), await this.ui.decir(this.dl("chispin_hola")), this.paso("ir_hogaza")
      }
      async npc(a) {
        a === "hogaza" && e.paso === "ir_hogaza" ? this.hogazaAmasar() : a === "semilla" && e.paso === "ir_semilla" ? this.semilla() : a === "tasador" && e.paso === "vender" ? this.vender() : a === "hogaza" && e.paso === "comprar_pan" ? this.comprarPan() : await this.charla(a)
      }
      async hogazaAmasar() {
        e.ocupado = !0, await this.ui.decir(this.dl("hogaza_pan_sube"));
        let a = await this.ui.amasar();
        this.ganar_monedas(a), await this.ui.decir(this.dl("hogaza_paga", {
          n: a
        })), this.mundo.mostrar("subeprecios", !0), this.ui.sonar("malo"), this.mundo.estallido(u(97.5, 125), T, 22), await this.ui.decir(this.dl("sube_aparece")), this.reto()
      }
      async reto() {
        let a = await this.ui.reto(e.monedas);
        if (a === "hucha") {
          let o = e.monedas;
          await this.ui.pasar_noche(1, this.tx("noche_pan")), e.precio_pan = 4, e.brillo = 3, e.avisar(), await this.ui.resultado("hucha", this.tx("hucha_titulo"), this.tx("hucha_texto", {
            n: o,
            antes: Math.floor(o / 3),
            hoy: Math.floor(o / 4)
          }), "Brillo", [m, m, m, H, H], this.tx("hucha_frase")), this.mundo.mostrar("subeprecios", !1), this.mundo.mostrar("semilla", !0), this.ui.sonar("plantar"), await this.ui.decir(this.dl("chispin_semilla_llama")), this.paso("ir_semilla")
        } else if (a === "semillas") e.monedas -= 5, e.avisar(), this.ui.sonar("plantar"), this.plantar(u(2, 5)), this.plantar(u(3, 5)), await this.ui.pasar_noche(1, this.tx("noche_pan")), e.precio_pan = 4, e.brillo = 4, e.avisar(), await this.ui.resultado("huerto", this.tx("semillas_titulo"), this.tx("semillas_texto"), "Brotes", [fa, fa, H, H, H], this.tx("semillas_frase")), this.mundo.mostrar("subeprecios", !1), this.mundo.mostrar("semilla", !0), await this.ui.decir(this.dl("chispin_semilla_conocer")), this.paso("ir_semilla");
        else {
          e.monedas = 0, e.avisar(), await this.ui.resultado("caramelo", this.tx("caramelo_titulo"), this.tx("caramelo_texto"), "Monedas", [H, H, H, H, H], this.tx("caramelo_frase")), await this.ui.decir(this.dl("hogaza_mas_trabajo"));
          let o = await this.ui.amasar();
          this.ganar_monedas(o), await this.ui.decir(this.dl("caramelo_vuelta", {
            n: o
          })), this.reto()
        }
      }
      async semilla() {
        await this.ui.decir(this.dl("semilla_hola")), e.ocupado = !0, await p(.25), this.plantar(u(5, 5)), this.ui.sonar("plantar"), await p(.9), await this.ui.decir(this.dl("semilla_regalo")), this.paso("plantar")
      }
      async parcela(a) {
        let o = e.brote_en(a);
        if (e.paso === "plantar") {
          if (o) {
            await this.ui.decir(this.dl("parcela_ocupada")), e.ocupado = !1;
            return
          }
          e.ocupado = !0, this.plantar(a), e.semillas = 0, this.ui.sonar("plantar"), await this.ui.decir(this.dl("plantada")), await this.ui.pasar_noche(2, this.tx("noche_frutos"));
          for (let t of e.brotes_aqui()) t.fruto = !0, t.crece = 1;
          e.avisar(), await this.ui.decir(this.dl("hay_frutos")), this.paso("cosechar")
        } else if (e.paso === "cosechar" && o && o.fruto) {
          if (this.cosechar(o)) {
            if (e.ocupado = !0, await this.ui.decir(this.dl("cuantos_frutos", {
                n: e.frutos
              })), await this.ui.elegir("fruto", this.tx("frutos_titulo", {
                n: e.frutos
              }), [
                ["vender", this.tx("vender_todo"), "moneda"],
                ["replantar", this.tx("replantar"), "huerto"]
              ]) === "replantar") {
              e.frutos -= 1;
              let s = this.parcela_libre();
              s && this.plantar(s), this.ui.sonar("plantar"), await this.ui.decir(this.dl(s ? "replantado" : "replantado_junto"))
            }
            this.paso("vender")
          }
        } else await super.parcela(a)
      }
      async vender() {
        let a = e.frutos * 3;
        await this.ui.decir(this.dl("tasador_compra", {
          n: a
        })), e.frutos = 0, this.ganar_monedas(a), this.paso("comprar_pan")
      }
      async comprarPan() {
        await this.ui.decir(this.dl("hogaza_vende", {
          n: e.precio_pan
        })), e.monedas -= e.precio_pan, e.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("hogaza_toma")), await this.ui.pregunta(this.tx("pregunta"), [
          ["bien", this.tx("resp_bien"), "moneda", 4],
          ["avara", this.tx("resp_avara"), "hogaza", 2],
          ["grande", this.tx("resp_grande"), "pan", 3]
        ], "bien", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(u(33, 95), m, 30), this.mundo.estallido(u(33, 95), j, 20), await p(1.4), e.progreso = 35, e.avisar(), await p(1.2), await this.ui.decir(this.dl("victoria_hogaza")), this.mundo.huir_subeprecios(B), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await p(.7), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Di = 3,
    ji = 8,
    va = class extends q {
      objetivo() {
        switch (e.paso) {
          case "ir_hogaza":
            return h(2, 9, 23);
          case "ir_semilla":
            return h(6, 4, 23);
          case "regar": {
            let a = e.brotes_aqui()[0];
            return a ? h(a.celda.x, a.celda.y, 2) : null
          }
          case "cosechar":
            return this.primer_fruto();
          case "ir_yunque":
            return h(11, 20, 23);
          case "ir_tasador":
            return h(1, 13, 23)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, this.mundo.mostrar("semilla", !0), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_pan")), e.precio_pan = 5, e.regadera = "", e.avisar(), await this.ui.decir(this.dl("chispin_buenos_dias")), this.paso("ir_hogaza")
      }
      async npc(a) {
        let o = e.paso;
        if (o === "ir_hogaza" && a === "hogaza") return this.quienHaSido();
        if (o === "ir_semilla" && a === "semilla") return this.huertoSediento();
        if (o === "regadera" && a === "tasador") return this.tienda(a, "regadera_reluciente", "reluciente", Di);
        if (o === "regadera" && a === "yunque") return this.tienda(a, "regadera_hierro", "hierro", ji);
        if (o === "regadera" && a === "hogaza") return this.trabajo();
        if (o === "ir_yunque" && a === "yunque") return this.leccionYunque();
        if (o === "ir_tasador" && a === "tasador") return this.ojoDeTasador();
        await this.charla(a)
      }
      async quienHaSido() {
        e.ocupado = !0, await this.ui.decir(this.dl("hogaza_mas_caro")), await this.ui.pregunta(this.tx("quien"), [
          ["sube", this.tx("resp_sube"), "subeprecios", 2],
          ["antojo", this.tx("resp_antojo"), "antojo", 2],
          ["viento", this.tx("resp_viento"), "viento", 3]
        ], "sube", this.tx("fb_quien_bien"), this.tx("fb_quien_mal")) && this.mundo.estallido(this.mundo.sobre_chispin(), m, 18), await this.ui.decir(this.dl("hogaza_semilla_busca")), this.paso("ir_semilla")
      }
      async huertoSediento() {
        e.ocupado = !0, await this.ui.decir(this.dl("semilla_sed")), this.mundo.mostrar("yunque", !0), this.paso("regadera")
      }
      async tienda(a, o, t, s) {
        e.ocupado = !0, await this.ui.decir(this.dl("tienda_" + a));
        let r = e.monedas < s;
        await this.ui.elegir(o, this.tx("titulo_" + t), [
          ["comprar", this.tx("comprar_" + t), "moneda", r],
          ["no", this.tx("ahora_no"), "mochila"]
        ]) === "comprar" ? (e.monedas -= s, e.regadera = t, e.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("comprada_" + t)), this.paso("regar")) : (r && await this.ui.decir(this.dl("faltan_monedas", {
          n: s
        })), e.ocupado = !1)
      }
      async trabajo() {
        if (e.ocupado = !0, await this.ui.elegir("pan", this.tx("amasar_titulo"), [
            ["si", this.tx("amasar_si"), "pan"],
            ["no", this.tx("ahora_no"), "mochila"]
          ]) === "si") {
          let o = await this.ui.amasar();
          this.ganar_monedas(o), await this.ui.decir(this.dl("hogaza_paga", {
            n: o
          }))
        }
        e.ocupado = !1
      }
      async parcela(a) {
        let o = e.brote_en(a);
        if (e.paso === "regar" && o) {
          e.ocupado = !0;
          for (let l of e.brotes_aqui()) this.mundo.estallido(u(l.celda.x * f + 6.5, l.celda.y * f + 3), W, 10);
          this.ui.sonar("plantar"), await this.ui.decir(this.dl("regado_" + e.regadera)), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_crecen"));
          let t = e.regadera === "hierro" ? 2 : 1;
          for (let l of e.brotes_aqui()) l.fruto = !0, l.crece = 1, l.cuantos = t;
          e.avisar();
          let s = e.brotes_aqui().length * t,
            r = Array(Math.min(s, 8)).fill(fa);
          e.regadera === "hierro" ? await this.ui.resultado("regadera_hierro", this.tx("hierro_titulo"), this.tx("hierro_texto", {
            n: s
          }), "Frutos", r, this.tx("hierro_frase")) : await this.ui.resultado("regadera_rota", this.tx("rota_titulo"), this.tx("rota_texto", {
            n: s
          }), "Frutos", r, this.tx("rota_frase")), await this.ui.decir(this.dl("a_cosechar")), this.paso("cosechar")
        } else if (e.paso === "cosechar" && o && o.fruto) {
          if (this.cosechar(o)) {
            e.ocupado = !0;
            for (let t of e.brotes_aqui()) t.cuantos = 1;
            await this.ui.decir(this.dl("yunque_llama", {
              n: e.frutos
            })), this.paso("ir_yunque")
          }
        } else await super.parcela(a)
      }
      async leccionYunque() {
        e.ocupado = !0, await this.ui.decir(this.dl("yunque_hola")), await this.ui.comparar([
          ["regadera_reluciente", this.tx("nombre_reluciente"), Di, 1],
          ["regadera_hierro", this.tx("nombre_hierro"), ji, 10]
        ], this.tx("yunque_frase")), await this.ui.decir(this.dl("yunque_despide_" + e.regadera)), this.paso("ir_tasador")
      }
      async ojoDeTasador() {
        e.ocupado = !0, await this.ui.decir(this.dl("tasador_ojo"));
        let a = await this.ui.ojo_tasador(this.datos.rondas);
        a > 0 && this.ganar_monedas(a);
        let o = e.frutos * 3;
        await this.ui.decir(this.dl("tasador_paga", {
          a,
          f: e.frutos,
          p: o
        })), e.frutos = 0, this.ganar_monedas(o), await this.ui.pregunta(this.tx("pregunta"), [
          ["dura", this.tx("resp_dura"), "regadera_hierro", 3],
          ["bonita", this.tx("resp_bonita"), "regadera_reluciente", 3],
          ["amiga", this.tx("resp_amiga"), "yunque", 2]
        ], "dura", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", e.ojo_tasador = !0, this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(u(20, 150), m, 30), this.mundo.estallido(u(20, 150), j, 20), await p(1.4), e.progreso = 70, e.avisar(), await p(1.2), await this.ui.decir(this.dl("victoria_tasador")), this.mundo.huir_subeprecios(B), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await p(.7), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    ga = 12,
    xa = class extends q {
      constructor() {
        super(...arguments);
        D(this, "compras", [])
      }
      objetivo() {
        switch (e.paso) {
          case "ir_antojo":
            return h(13, 13, 23);
          case "ir_hogaza":
            return h(2, 9, 23);
          case "ir_semilla":
            return h(6, 4, 23);
          case "feria":
            return h(1, 13, 23)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_feria")), await this.ui.decir(this.dl("chispin_feria")), this.paso("ir_antojo")
      }
      async npc(o) {
        let t = e.paso;
        if (t === "ir_antojo" && o === "antojo") return this.chucheGigante();
        if (t === "ir_hogaza" && o === "hogaza") return this.pagaYLista();
        if (t === "ir_semilla" && o === "semilla") return this.tresBotes();
        if (t === "feria" && o === "tasador") return this.feria();
        await this.charla(o)
      }
      async chucheGigante() {
        e.ocupado = !0, await this.ui.decir(this.dl("antojo_ofrece"));
        let o = [
          ["comprar", this.tx("comprar_chuche"), "caramelo", e.monedas < 5],
          ["no", this.tx("ahora_no"), "mochila"]
        ];
        e.ojo_tasador && o.unshift(["mirar", this.tx("mirar_chuche"), "medalla_ojo"]);
        let t = await this.ui.elegir("caramelo", this.tx("titulo_chuche"), o);
        t === "mirar" && (await this.ui.decir(this.dl("chuche_mirada")), t = await this.ui.elegir("caramelo", this.tx("titulo_chuche"), [
          ["comprar", this.tx("comprar_chuche"), "caramelo", e.monedas < 5],
          ["no", this.tx("ahora_no"), "mochila"]
        ])), t === "comprar" ? (e.monedas -= 5, e.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#ff6fa8", 14), await this.ui.decir(this.dl("chuche_comprada"))) : await this.ui.decir(this.dl("chuche_no")), await this.ui.decir(this.dl("hogaza_llama")), this.paso("ir_hogaza")
      }
      async pagaYLista() {
        e.ocupado = !0, await this.ui.decir(this.dl("hogaza_paga_feria", {
          n: ga
        })), this.ui.sonar("moneda"), await this.ui.clasificar(this.datos.lista), await this.ui.decir(this.dl("lista_hecha")), this.paso("ir_semilla")
      }
      async tresBotes() {
        e.ocupado = !0, await this.ui.decir(this.dl("semilla_regla")), await this.ui.lista("semilla", this.tx("botes_titulo"), [
          ["comida", this.tx("bote_1")],
          ["abono", this.tx("bote_2")],
          ["gorro", this.tx("bote_3")]
        ], this.tx("botes_frase")), this.paso("feria")
      }
      gasto(o) {
        let t = 0;
        for (let s of this.datos.tienda) o.includes(s.id) && (t += +s.precio);
        return o.includes("oferta") && (t += 4), t
      }
      async feria() {
        e.ocupado = !0, await this.ui.decir(this.dl("tasador_feria")), this.compras = await this.ui.presupuesto(ga, this.datos.tienda);
        let o = this.gasto(this.compras);
        this.mundo.mostrar("antojo", !0), this.ui.sonar("malo"), await this.ui.decir(this.dl("antojo_oferta"));
        let t = ga - o >= 4;
        if (await this.ui.elegir("caramelo", this.tx("titulo_oferta"), [
            ["lista", this.tx("seguir_lista"), "mochila"],
            ["oferta", this.tx("comprar_oferta"), "caramelo"]
          ]) === "oferta")
          if (t) this.compras.push("oferta");
          else {
            await this.ui.decir(this.dl("oferta_no_cabe"));
            let r = ["abono", "gorro", "comida"].find(l => this.compras.includes(l)) || "";
            r && await this.ui.elegir("caramelo", this.tx("titulo_cambio"), [
              ["lista", this.tx("seguir_lista"), "mochila"],
              ["cambiar", this.tx("cambiar_por", {
                cosa: this.tx("cosa_" + r)
              }), r]
            ]) === "cambiar" && (this.compras = this.compras.filter(c => c !== r), this.compras.push("oferta"))
          } await this.efectos(), await this.ui.pregunta(this.tx("pregunta"), [
          ["necesito", this.tx("resp_necesito"), "comida", 3],
          ["brilla", this.tx("resp_brilla"), "regadera_reluciente", 3],
          ["oferta", this.tx("resp_oferta"), "caramelo", 3]
        ], "necesito", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async efectos() {
        let o = ga - this.gasto(this.compras);
        if (this.compras.includes("comida") ? (this.mundo.estallido(this.mundo.sobre_chispin(), m, 20), this.ui.sonar("acierto"), await this.ui.decir(this.dl("efecto_comida"))) : await this.ui.decir(this.dl("efecto_sin_comida")), this.compras.includes("abono")) {
          for (let t of e.brotes_aqui()) this.mundo.estallido(u(t.celda.x * f + 6.5, t.celda.y * f + 6), I, 6), t.cuantos = 2;
          await this.ui.decir(this.dl("efecto_abono"))
        }
        this.compras.includes("gorro") && (e.gorro = !0, this.mundo.estallido(this.sobre_heroe(), "#d9543f", 14), await this.ui.decir(this.dl("efecto_gorro"))), (this.compras.includes("chuche") || this.compras.includes("oferta")) && (this.mundo.estallido(this.sobre_heroe(), "#ff6fa8", 14), await this.ui.decir(this.dl("efecto_chuche"))), o > 0 && (this.ganar_monedas(o), await this.ui.decir(this.dl("efecto_sobra", {
          n: o
        })))
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 4), this.ui.sonar("fanfarria"), this.mundo.estallido(u(172, 150), m, 30), await p(1.6), await this.ui.decir(this.dl("victoria_antojo")), this.mundo.iluminar(3, 22), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 140), j, 40), await p(1.6), e.progreso = 100, e.avisar(), await this.ui.decir(this.dl("mercado_brilla")), this.mundo.huir_subeprecios(G), this.ui.sonar("malo"), await this.ui.decir(this.dl("sube_huye")), await p(1.2), this.mundo.mostrar("subeprecios", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin()
      }
    };
  var ya = 2,
    Sr = 2,
    Aa = class extends q {
      constructor() {
        super(...arguments);
        D(this, "cosecha", 0)
      }
      objetivo() {
        switch (e.paso) {
          case "ir_valle":
            return h(7, 32, 2);
          case "ir_copo":
          case "volver_copo":
            return h(11, 8, 25);
          case "plantar": {
            let o = this.parcela_libre();
            return o ? h(o.x, o.y, 2) : null
          }
          case "cosechar":
            return this.primer_fruto()
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, e.frutos = 0, e.zona === "mercado" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_valle")) : this.enValle()
      }
      async llegada(o) {
        e.paso === "ir_valle" && e.zona === "mercado" && o.y >= 30 && (e.ocupado = !0, e.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("valle", u(7, 1))), e.guardar(), this.enValle())
      }
      async enValle() {
        e.ocupado = !0, await this.ui.decir(this.dl("llegada_valle")), this.paso("ir_copo")
      }
      async npc(o) {
        if (o === "copo" && e.paso === "ir_copo") return this.copoHola();
        if (o === "copo" && e.paso === "volver_copo") return this.copoReloj();
        await this.charla(o)
      }
      async copoHola() {
        e.ocupado = !0, await this.ui.decir(this.dl("copo_hola")), e.semillas = 3, e.avisar(), this.ui.sonar("plantar"), this.mundo.estallido(this.sobre_heroe(), I, 12), await this.ui.decir(this.dl("copo_semillas")), this.paso("plantar")
      }
      async parcela(o) {
        let t = e.brote_en(o);
        if (e.paso === "plantar") {
          if (t) {
            await this.ui.decir(this.dl("parcela_ocupada")), e.ocupado = !1;
            return
          }
          if (this.plantar(o), this.ui.sonar("plantar"), e.semillas -= 1, e.avisar(), e.semillas > 0) {
            e.ocupado = !1;
            return
          }
          e.ocupado = !0, await this.ui.decir(this.dl("plantadas")), this.temporada()
        } else if (e.paso === "cosechar" && t && t.fruto) {
          e.ocupado = !0;
          let s = e.frutos;
          for (let l of e.brotes_aqui()) l.fruto && this.cosechar(l);
          let r = e.frutos - s;
          this.cosecha += 1, await this.ui.decir(this.dl("cosecha", {
            n: r,
            p: e.brotes_aqui().length
          })), await this.decidir(r)
        } else await super.parcela(o)
      }
      async temporada() {
        await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_" + (this.cosecha + 1)));
        for (let o of e.brotes_aqui()) o.fruto = !0, o.crece = 1, o.cuantos = 1;
        e.avisar(), await this.ui.decir(this.dl("hay_frutos")), this.paso("cosechar")
      }
      async decidir(o) {
        let t = await this.ui.elegir("fruto", this.tx("decidir_titulo", {
            n: o
          }), [
            ["replantar", this.tx("op_replantar"), "huerto"],
            ["mitad", this.tx("op_mitad"), "semillas"],
            ["vender", this.tx("op_vender", {
              m: o * ya
            }), "moneda"]
          ]),
          s = t === "replantar" ? o : t === "mitad" ? Math.floor(o / 2) : 0,
          r = 0;
        for (let c = 0; c < s; c++) {
          let g = this.parcela_libre();
          if (!g) break;
          this.plantar(g), r++
        }
        e.frutos -= o;
        let l = o - r;
        r > 0 && this.ui.sonar("plantar"), l > 0 && this.ganar_monedas(l * ya), r < s ? await this.ui.decir(this.dl("huerto_lleno", {
          v: l,
          m: l * ya
        })) : r > 0 ? await this.ui.decir(this.dl("replantado", {
          n: r,
          p: e.brotes_aqui().length
        })) : await this.ui.decir(this.dl("vendido", {
          m: l * ya
        })), this.cosecha < Sr ? (e.ocupado = !0, this.temporada()) : (await this.ui.decir(this.dl("copo_llama")), this.paso("volver_copo"))
      }
      async copoReloj() {
        e.ocupado = !0, await this.ui.decir(this.dl("copo_reloj", {
          p: e.brotes_aqui().length
        })), await this.ui.tabla("copo", this.tx("reloj_titulo"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [
          ["moneda", this.tx("fila_vender"), [3, 6, 9, 12], m],
          ["huerto", this.tx("fila_replantar"), [3, 6, 12, 24], I]
        ], this.tx("reloj_frase")), await this.ui.decir(this.dl("copo_bola")), e.criaturas.push("brotin"), e.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), I, 24), await this.ui.decir(this.dl("brotin_nace")), await this.ui.pregunta(this.tx("pregunta"), [
          ["crece", this.tx("resp_crece"), "huerto", 3],
          ["igual", this.tx("resp_igual"), "fruto", 3],
          ["menos", this.tx("resp_menos"), "moneda", 3]
        ], "crece", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(80, 95), m, 30), this.mundo.estallido(u(80, 95), j, 20), await p(1.4), e.progreso_valle = 33, e.avisar(), await this.ui.decir(this.dl("victoria_copo")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    $a = [0, 3, 5, 8, 12],
    Ni = [0, 2, 5, 11, 24],
    wa = class extends q {
      constructor() {
        super(...arguments);
        D(this, "estacionArbol", 0);
        D(this, "vioRaiz", !1);
        D(this, "vioAnillos", !1);
        D(this, "ventas", 0)
      }
      objetivo() {
        switch (e.paso) {
          case "ir_escarcha":
            return h(4, 12, 25);
          case "plantar_arbol":
            return h(10, 11, 2);
          case "cosechar_arbol":
            return h(10, 11, 36);
          case "ir_raiz":
            return h(5, 16, 25);
          case "ir_anillos":
            return h(9, 16, 25);
          case "ir_copo":
            return h(11, 8, 25)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, e.arbol = 0, e.avisar(), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("escarcha", !0), await this.ui.decir(this.dl("llega_escarcha")), this.paso("ir_escarcha")
      }
      async npc(o) {
        let t = e.paso;
        if (o === "escarcha" && t === "ir_escarcha") return this.escarcha();
        if (o === "raiz" && t === "ir_raiz") return this.raiz();
        if (o === "anillos" && t === "ir_anillos") return this.anillos();
        if (o === "copo" && t === "ir_copo") return this.copo();
        await this.charla(o)
      }
      async escarcha() {
        e.ocupado = !0, await this.ui.decir(this.dl("escarcha_hola")), await this.ui.pregunta(this.tx("recuerdo"), [
          ["tres", this.tx("r_tres"), "semillas", 3],
          ["seis", this.tx("r_seis"), "huerto", 3],
          ["cero", this.tx("r_cero"), "moneda", 3]
        ], "seis", this.tx("r_bien"), this.tx("r_mal")), await this.ui.decir(this.dl("escarcha_semilla")), this.paso("plantar_arbol")
      }
      async lugar(o) {
        o.x !== C.x || o.y !== C.y || (e.paso === "plantar_arbol" ? (e.ocupado = !0, e.arbol = 1, e.avisar(), this.ui.sonar("plantar"), this.mundo.estallido(v(this.mundo.pie(C), 0, -6), I, 16), this.estacionArbol = 0, await this.ui.decir(this.dl(this.ventas === 0 ? "arbol_plantado" : "arbol_otra_vez")), this.estacion()) : e.paso === "cosechar_arbol" && this.cosechaGrande())
      }
      async estacion() {
        if (this.estacionArbol += 1, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_arbol_" + this.estacionArbol)), e.arbol = Math.min(4, Math.max(1, this.estacionArbol)), e.avisar(), this.mundo.estallido(v(this.mundo.pie(C), 0, -16), I, 14), this.estacionArbol >= 4) {
          await this.ui.decir(this.dl("arbol_grande")), this.paso("cosechar_arbol");
          return
        }
        if (this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(v(this.mundo.pie(u(9, 12)), 0, -12), "#e0503c", 16), await this.ui.decir(this.dl("prisas_oferta_" + this.estacionArbol, {
            n: $a[this.estacionArbol]
          })), await this.ui.elegir("prisas", this.tx("oferta_titulo"), [
            ["esperar", this.tx("esperar"), "reloj"],
            ["vender", this.tx("vender", {
              n: $a[this.estacionArbol]
            }), "moneda"]
          ]) === "vender") {
          await this.vendido();
          return
        }
        await this.ui.decir(this.dl("prisas_rabia")), this.mundo.huir("prisas", B), await p(1), this.mundo.mostrar("prisas", !1), this.estacionArbol === 1 && !this.vioRaiz ? (await this.ui.decir(this.dl("raiz_llama")), this.paso("ir_raiz")) : this.estacionArbol === 2 && !this.vioAnillos ? (await this.ui.decir(this.dl("anillos_llama")), this.paso("ir_anillos")) : this.estacion()
      }
      async vendido() {
        this.ventas += 1;
        let o = $a[this.estacionArbol];
        this.ganar_monedas(o), e.arbol = 0, e.avisar(), this.mundo.estallido(v(this.mundo.pie(C), 0, -8), "#8a6a4a", 18), await this.ui.decir(this.dl("prisas_corta", {
          n: o
        })), this.mundo.huir("prisas", B), await p(1), this.mundo.mostrar("prisas", !1), await this.ui.tabla("escarcha", this.tx("si_esperas"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [
          ["prisas", this.tx("fila_prisas"), [3, 5, 8, 12], "#e0503c"],
          ["arbol_4", this.tx("fila_arbol"), [2, 5, 11, 24], I]
        ], this.tx("si_esperas_frase")), await this.ui.decir(this.dl("escarcha_otra")), this.paso("plantar_arbol")
      }
      async raiz() {
        e.ocupado = !0, this.vioRaiz = !0, await this.ui.decir(this.dl("raiz_hola")), await this.estacion()
      }
      async anillos() {
        e.ocupado = !0, this.vioAnillos = !0, await this.ui.decir(this.dl("anillos_hola")), await this.ui.lista("anillos", this.tx("anillos_titulo"), [
          ["arbol_1", this.tx("anillo_1")],
          ["arbol_2", this.tx("anillo_2")],
          ["arbol_3", this.tx("anillo_3")],
          ["arbol_4", this.tx("anillo_4")]
        ], this.tx("anillos_frase")), await this.estacion()
      }
      async cosechaGrande() {
        e.ocupado = !0, e.frutos += Ni[4], e.avisar(), this.ui.sonar("fanfarria");
        for (let o = 0; o < 3; o++) this.mundo.estallido(v(this.mundo.pie(C), Math.random() * 16 - 8, -22), _a, 14);
        await this.ui.decir(this.dl("cosecha_grande", {
          n: Ni[4]
        })), await this.ui.tabla("copo", this.tx("comparar_titulo"), ["1\xAA", "2\xAA", "3\xAA", "4\xAA"], [
          ["prisas", this.tx("fila_prisas"), [3, 5, 8, 12], "#e0503c"],
          ["arbol_4", this.tx("fila_arbol"), [2, 5, 11, 24], I]
        ], this.tx("comparar_frase")), await this.ui.decir(this.dl("copo_llama")), this.paso("ir_copo")
      }
      async copo() {
        e.ocupado = !0, await this.ui.decir(this.dl("copo_medalla")), await this.ui.pregunta(this.tx("pregunta"), [
          ["tiempo", this.tx("resp_tiempo"), "reloj", 3],
          ["rapido", this.tx("resp_rapido"), "moneda", 3],
          ["suerte", this.tx("resp_suerte"), "fruto", 3]
        ], "tiempo", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(65, 200), m, 30), this.mundo.estallido(u(130, 150), j, 20), await p(1.4), e.progreso_valle = 66, e.avisar(), await this.ui.decir(this.dl("victoria_valle")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    qa = 12,
    za = class extends q {
      objetivo() {
        return e.paso === "ir_copo" ? h(11, 8, 25) : null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(v(this.mundo.pie(u(9, 12)), 0, -12), "#e0503c", 18), await this.ui.decir(this.dl("prisas_helada")), this.mundo.huir("prisas", B), await p(.9), this.mundo.mostrar("prisas", !1), await this.ui.decir(this.dl("chispin_copo")), this.paso("ir_copo")
      }
      async npc(a) {
        if (a === "copo" && e.paso === "ir_copo") return this.copo();
        await this.charla(a)
      }
      async copo() {
        e.ocupado = !0, await this.ui.decir(this.dl("copo_sacos", {
          n: qa
        })), e.frutos = Math.max(0, e.frutos - 24), e.avisar(), await this.ui.lista("copo", this.tx("lugares_titulo"), [
          ["huerto", this.tx("l_huerto")],
          ["tierras", this.tx("l_tierras")],
          ["cueva", this.tx("l_cueva")]
        ], this.tx("lugares_frase"));
        let a = await this.ui.repartir(qa, [
          ["huerto", this.tx("o_huerto"), "huerto"],
          ["tierras", this.tx("o_tierras"), "tierras"],
          ["cueva", this.tx("o_cueva"), "cueva"]
        ], this.tx("repartir_titulo", {
          n: qa
        }), this.tx("repartir_nota"));
        await this.ui.decir(this.dl("repartido", {
          h: a.huerto,
          t: a.tierras,
          c: a.cueva
        })), await this.helada(a)
      }
      async helada(a) {
        let o = a.huerto,
          t = a.tierras,
          s = a.cueva,
          r = Math.round(o * .5),
          l = o + t + s,
          c = r + t + s,
          g = r * 2,
          A = Math.round(t * 1.25),
          y = g + A + s;
        await this.ui.pasar_noche(1, this.tx("noche_helada")), this.ui.sonar("malo");
        for (let d = 0; d < 4; d++) this.mundo.estallido(v(this.mundo.pie(u(2 + d, 9)), 0, -8), W, 10);
        await this.ui.decir(this.dl("helada", {
          h: o,
          h1: r,
          t,
          c: s,
          n: c
        })), await this.ui.pasar_noche(2, this.tx("noche_primavera")), this.ui.sonar("acierto"), this.mundo.estallido(this.sobre_heroe(), I, 20), await this.ui.decir(this.dl("primavera", {
          h2: g,
          t2: A,
          c: s,
          n: y
        }));
        let N = o < qa && t + s > 0 && y > 12 ? this.tx("tabla_frase_reparto") : this.tx("tabla_frase_todo");
        await this.ui.tabla("copo", this.tx("tabla_titulo"), ["Antes", "Helada", "Primavera"], [
          ["mochila", this.tx("fila_tuyo"), [l, c, y], m],
          ["huerto", this.tx("fila_huerto"), [12, 6, 12], _a],
          ["cueva", this.tx("fila_cueva"), [12, 12, 12], W]
        ], N), this.ganar_monedas(y), await this.ui.decir(this.dl("cobras", {
          n: y
        })), e.criaturas.push("escudon"), e.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), W, 24), await this.ui.decir(this.dl("escudon_nace")), await this.ui.pregunta(this.tx("pregunta"), [
          ["repartir", this.tx("resp_repartir"), "escudon", 3],
          ["todo", this.tx("resp_todo"), "huerto", 3],
          ["nada", this.tx("resp_nada"), "cueva", 3]
        ], "repartir", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(91, 300), m, 30), await p(1.4), await this.ui.decir(this.dl("victoria_tierras")), this.mundo.iluminar(3, 22), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 210), j, 40), await p(1.6), e.progreso_valle = 100, e.avisar(), await this.ui.decir(this.dl("valle_brilla")), this.mundo.huir("prisas", G), this.ui.sonar("malo"), await this.ui.decir(this.dl("prisas_huye")), await p(1.2), this.mundo.mostrar("prisas", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin()
      }
    };
  var ka = 6,
    Za = 2,
    Ia = class extends q {
      objetivo() {
        switch (e.paso) {
          case "ir_ciudad":
            return h(7, 32, 2);
          case "ir_lupa":
            return h(3, 7, 25);
          case "ir_fiel":
          case "volver_fiel":
            return h(11, 7, 25);
          case "ir_cuenta":
            return h(3, 27, 25)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, e.zona === "valle" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_ciudad")) : this.enCiudad()
      }
      async llegada(a) {
        e.paso === "ir_ciudad" && e.zona === "valle" && a.y >= 31 && (e.ocupado = !0, e.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("ciudad", u(7, 1))), e.guardar(), this.enCiudad())
      }
      async enCiudad() {
        e.ocupado = !0, await this.ui.decir(this.dl("llegada_ciudad")), this.mundo.mostrar("prisas", !0);
        let a = this.mundo.pie(u(8, 9));
        this.mundo.npcs.prisas.x = a.x, this.mundo.npcs.prisas.y = a.y, this.mundo.huir("prisas", u(.707, .707)), this.mundo.npcs.prisas.x = a.x, this.mundo.npcs.prisas.y = a.y, this.ui.sonar("malo"), await this.ui.decir(this.dl("prisas_bazar")), this.mundo.mostrar("prisas", !1), this.mundo.estallido(v(this.mundo.pie(u(12, 14)), 0, -20), m, 24), await this.ui.decir(this.dl("lupa_llama")), this.paso("ir_lupa")
      }
      async npc(a) {
        let o = e.paso;
        if (a === "lupa" && o === "ir_lupa") return e.ocupado = !0, await this.ui.decir(this.dl("lupa_hola")), this.paso("ir_fiel");
        if (a === "fiel" && o === "ir_fiel") return this.fielTurno();
        if (a === "cuenta" && o === "ir_cuenta") return this.cuenta();
        if (a === "fiel" && o === "volver_fiel") return this.fielTrocito();
        await this.charla(a)
      }
      async fielTurno() {
        e.ocupado = !0, await this.ui.decir(this.dl("fiel_hola"));
        let a = await this.ui.amasar("fiel", this.tx("coser_titulo"), "zapato", this.tx("coser_boton"));
        this.ganar_monedas(a), await this.ui.decir(this.dl("fiel_paga", {
          n: a
        })), this.paso("ir_cuenta")
      }
      async cuenta() {
        e.ocupado = !0, await this.ui.decir(this.dl("cuenta_hola")), await this.ui.lista("cuenta", this.tx("libro_titulo"), [
          ["moneda", this.tx("libro_entra")],
          ["zapato", this.tx("libro_cuero")],
          ["libro", this.tx("libro_alquiler")],
          ["trocito", this.tx("libro_queda")]
        ], this.tx("libro_frase")), await this.ui.pregunta(this.tx("pregunta_libro"), [
          ["cuatro", this.tx("r_cuatro"), "moneda", 3],
          ["diez", this.tx("r_diez"), "moneda", 3],
          ["seis", this.tx("r_seis"), "moneda", 3]
        ], "cuatro", this.tx("r_bien"), this.tx("r_mal")), await this.ui.decir(this.dl("cuenta_manda")), this.paso("volver_fiel")
      }
      async fielTrocito() {
        e.ocupado = !0, await this.ui.decir(this.dl("fiel_maquina"));
        let o = await this.ui.elegir("trocito", this.tx("trocito_titulo"), [
          ["comprar", this.tx("comprar_trocito", {
            n: ka
          }), "trocito", e.monedas < ka],
          ["no", this.tx("ahora_no"), "mochila"]
        ]) === "comprar";
        o ? (e.monedas -= ka, e.trocitos.fiel = 1, e.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#d9543f", 14), await this.ui.decir(this.dl("comprado"))) : await this.ui.decir(this.dl("no_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_maquina")), this.mundo.estallido(v(this.mundo.pie(u(12, 5)), 0, -10), m, 20), await this.ui.decir(this.dl("maquina_nueva")), o ? (this.ganar_monedas(Za), await this.ui.decir(this.dl("fiel_reparte", {
          n: Za
        }))) : await this.ui.decir(this.dl("cuenta_cobra", {
          n: Za
        })), await this.ui.decir(this.dl("lupa_nombre")), await this.ui.pregunta(this.tx("pregunta"), [
          ["duena", this.tx("resp_duena"), "trocito", 3],
          ["cliente", this.tx("resp_cliente"), "zapato", 3],
          ["prestar", this.tx("resp_prestar"), "moneda", 3]
        ], "duena", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(158, 70), m, 30), this.mundo.estallido(u(158, 70), j, 20), await p(1.4), e.progreso_ciudad = 33, e.avisar(), await this.ui.decir(this.dl("victoria_fiel")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Ya = 6,
    ta = 4,
    sa = ["fiel", "engranaje", "fachada"],
    Da = class extends q {
      constructor() {
        super(...arguments);
        D(this, "investigados", new Set);
        D(this, "bazarCerrado", !1)
      }
      objetivo() {
        switch (e.paso) {
          case "ir_cuenta":
            return h(3, 27, 25);
          case "investigar": {
            let o = sa.find(s => !this.investigados.has(s));
            if (!o) return null;
            let t = this.mundo.posiciones[o];
            return h(t.x, t.y, 25)
          }
          case "ir_lupa":
            return h(3, 7, 25)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(v(this.mundo.pie(u(12, 14)), 0, -24), m, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("fachada_presume", {
          n: ta
        })), await this.ui.decir(this.dl("lupa_caso")), this.paso("ir_cuenta")
      }
      async npc(o) {
        if (o === "cuenta" && e.paso === "ir_cuenta") return e.ocupado = !0, await this.ui.decir(this.dl("cuenta_libros")), this.paso("investigar");
        if (e.paso === "investigar" && sa.includes(o) && !this.investigados.has(o)) return this.investigar(o);
        if (o === "lupa" && e.paso === "ir_lupa") return this.elegir();
        await this.charla(o)
      }
      async investigar(o) {
        e.ocupado = !0, await this.ui.decir(this.dl("antes_" + o));
        let t = this.datos.pistas[o];
        if (await this.ui.pistas(o, t.titulo, t.icono, t.lista), this.investigados.add(o), this.investigados.size < sa.length) return await this.ui.decir(this.dl("faltan", {
          n: sa.length - this.investigados.size
        })), this.paso("investigar");
        let s = sa.map(r => {
          let l = this.datos.pistas[r];
          return [l.icono, l.corto, l.lista.map(c => !!c[3])]
        });
        await this.ui.cuaderno(this.tx("cuaderno_titulo"), [this.tx("col_clientes"), this.tx("col_producto"), this.tx("col_cuentas")], s, this.tx("cuaderno_frase")), await this.ui.decir(this.dl("a_lupa")), this.paso("ir_lupa")
      }
      async elegir() {
        e.ocupado = !0, await this.ui.decir(this.dl(this.bazarCerrado ? "lupa_otra_vez" : "lupa_eliges"));
        let o = [
          ["engranaje", this.tx("op_engranaje", {
            n: Ya
          }), "rueda", e.monedas < Ya]
        ];
        this.bazarCerrado || o.push(["bazar", this.tx("op_bazar", {
          n: ta
        }), "bazar", e.monedas < ta]), o.push(["nada", this.tx("op_nada"), "mochila"]);
        let t = await this.ui.elegir("cuaderno", this.tx("elegir_titulo"), o);
        if (t === "bazar") return e.monedas -= ta, e.trocitos.bazar = 1, e.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), m, 16), await this.ui.decir(this.dl("bazar_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_bazar")), this.mundo.cerrar_bazar(!0), e.trocitos.bazar = 0, e.avisar(), this.ui.sonar("malo"), await this.ui.decir(this.dl("bazar_cierra", {
          n: ta
        })), this.bazarCerrado = !0, this.elegir();
        t === "engranaje" ? (e.monedas -= Ya, e.trocitos.engranaje = 1, e.avisar(), this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), "#e07b39", 16), await this.ui.decir(this.dl("engranaje_comprado")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_engranaje")), this.mundo.estallido(v(this.mundo.pie(u(2, 13)), 0, -10), m, 20), await this.ui.decir(this.dl("engranaje_mejora"))) : await this.ui.decir(this.dl("nada")), await this.ui.pregunta(this.tx("pregunta"), [
          ["dentro", this.tx("resp_dentro"), "lupa_icono", 3],
          ["bonito", this.tx("resp_bonito"), "bazar", 3],
          ["barato", this.tx("resp_barato"), "moneda", 3]
        ], "dentro", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(33, 180), m, 30), await p(1.4), e.progreso_ciudad = 66, e.avisar(), this.bazarCerrado && (this.mundo.cerrar_bazar(!1), await this.ui.decir(this.dl("bazar_repintado"))), await this.ui.decir(this.dl("victoria_lupa")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Ei = {
      fiel: [6, 7, 8, 9, 10],
      engranaje: [6, 6, 8, 11, 14],
      horno: [6, 6, 7, 8, 9],
      fragua: [6, 7, 7, 8, 9],
      relampago: [6, 9, 12, 3, 0]
    },
    Gr = {
      fiel: 8,
      engranaje: 6,
      horno: 4,
      fragua: 4,
      relampago: 0
    },
    Pi = {
      fiel: "zapato",
      engranaje: "rueda",
      horno: "pan",
      fragua: "yunque",
      relampago: "relampago"
    },
    ja = class extends q {
      objetivo() {
        switch (e.paso) {
          case "ir_lupa":
          case "volver_lupa":
            return h(3, 7, 25);
          case "ir_plaza":
            return h(7, 15, 2)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.mostrar("prisas", !0), this.ui.sonar("malo"), this.mundo.estallido(v(this.mundo.pie(u(12, 24)), 0, -12), m, 20), await this.ui.decir(this.dl("prisas_relampago")), await this.ui.decir(this.dl("chispin_lupa")), this.paso("ir_lupa")
      }
      async npc(a) {
        if (a === "lupa" && e.paso === "ir_lupa") return e.ocupado = !0, await this.ui.decir(this.dl("lupa_colas")), this.paso("ir_plaza");
        if (a === "lupa" && e.paso === "volver_lupa") return this.loQueConoces();
        await this.charla(a)
      }
      async llegada(a) {
        e.paso === "ir_plaza" && a.y >= 14 && a.y <= 20 && a.x >= 3 && a.x <= 11 && (e.ocupado = !0, e.paso = "plaza", await this.ui.decir(this.dl("plaza_colas")), this.paso("volver_lupa"))
      }
      async loQueConoces() {
        e.ocupado = !0, await this.ui.decir(this.dl("lupa_conoces"));
        for (let o of ["horno", "fragua", "relampago"]) {
          let t = this.datos.explicar[o];
          await this.ui.pregunta(t.pregunta, t.opciones.map(s => [s[0], s[1], Pi[o], 3]), t.correcta, t.bien, t.mal)
        }
        await this.ui.decir(this.dl("lupa_regla"));
        let a = await this.ui.presupuesto(e.monedas, this.datos.tienda, this.tx("tienda_titulo"));
        for (let o of this.datos.tienda) a.includes(o.id) && (e.monedas -= +o.precio, e.trocitos[o.id] = e.trocitos_de(o.id) + 1);
        e.avisar(), a.length && (this.ui.sonar("moneda"), this.mundo.estallido(this.sobre_heroe(), m, 14)), await this.ui.decir(this.dl(a.length ? a.includes("relampago") ? "compras_relampago" : "compras_buenas" : "compras_ninguna")), await this.estaciones()
      }
      mios() {
        return ["fiel", "engranaje", "horno", "fragua", "relampago"].filter(a => e.trocitos_de(a) > 0)
      }
      async estaciones() {
        for (let r = 1; r <= 4; r++) await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_" + r)), r === 2 ? (this.mundo.mostrar("prisas", !0), await this.ui.decir(this.dl("relampago_sube"))) : r === 3 ? (this.ui.sonar("malo"), await this.ui.decir(this.dl("relampago_cae"))) : r === 4 && (await this.ui.decir(this.dl("relampago_cierra")), this.mundo.huir("prisas", G), await p(1), this.mundo.mostrar("prisas", !1));
        let a = this.datos.nombres,
          o = this.mios(),
          t = o.map(r => [Pi[r], a[r], Ei[r], r === "relampago" ? "#e0503c" : I]);
        o.includes("relampago") || t.push(["relampago", a.relampago, Ei.relampago, "#e0503c"]), await this.ui.tabla("lupa", this.tx("tabla_titulo"), ["Hoy", "1\xAA", "2\xAA", "3\xAA", "4\xAA"], t, this.tx("tabla_frase"));
        let s = o.reduce((r, l) => r + Gr[l], 0);
        s > 0 && (this.ganar_monedas(s), await this.ui.decir(this.dl("reparto", {
          n: s
        }))), e.criaturas.push("repartija"), e.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), T, 24), await this.ui.decir(this.dl(o.length >= 2 ? "repartija_varios" : "repartija_uno")), await this.ui.pregunta(this.tx("pregunta"), [
          ["conozco", this.tx("resp_conozco"), "lupa_icono", 3],
          ["sube", this.tx("resp_sube"), "relampago", 3],
          ["brilla", this.tx("resp_brilla"), "bazar", 3]
        ], "conozco", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(33, 320), m, 30), await p(1.4), await this.ui.decir(this.dl("victoria_cuenta")), this.mundo.iluminar(3, 22), this.mundo.apagar_bazar(), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 220), j, 40), await p(1.6), e.progreso_ciudad = 100, e.avisar(), await this.ui.decir(this.dl("ciudad_brilla")), this.mundo.huir("fachada", G), this.ui.sonar("malo"), await this.ui.decir(this.dl("fachada_huye")), await p(1.2), this.mundo.mostrar("fachada", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin()
      }
    };
  var Vr = 10,
    Na = class extends q {
      constructor() {
        super(...arguments);
        D(this, "olido", !1)
      }
      objetivo() {
        switch (e.paso) {
          case "ir_torre":
            return h(7, 32, 2);
          case "ir_arrepentido":
            return h(2, 5, 25);
          case "ir_reves":
            return h(9, 6, 25);
          case "ir_chollo":
            return h(12, 9, 25)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, e.zona === "ciudad" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_torre")) : this.enTorre()
      }
      async llegada(o) {
        e.paso === "ir_torre" && e.zona === "ciudad" && o.y >= 31 && (e.ocupado = !0, e.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("torre", u(7, 1))), e.guardar(), this.enTorre())
      }
      async enTorre() {
        e.ocupado = !0, await this.ui.decir(this.dl("llegada_torre")), this.paso("ir_arrepentido")
      }
      async npc(o) {
        let t = e.paso;
        if (o === "arrepentido" && t === "ir_arrepentido") return e.ocupado = !0, await this.ui.decir(this.dl("arrepentido_historia")), this.paso("ir_reves");
        if (o === "reves" && t === "ir_reves") return e.ocupado = !0, await this.ui.decir(this.dl("reves_hola")), this.mundo.mostrar("donchollo", !0), this.ui.sonar("malo"), this.mundo.estallido(v(this.mundo.pie(u(12, 9)), 0, -12), "#3fbf9f", 20), await this.ui.decir(this.dl("chollo_aparece")), this.paso("ir_chollo");
        if (o === "donchollo" && t === "ir_chollo") return this.oferta();
        await this.charla(o)
      }
      async oferta() {
        e.ocupado = !0;
        let o = Math.min(Vr, e.monedas);
        await this.ui.decir(this.dl(this.olido ? "chollo_insiste" : "chollo_oferta", {
          n: o,
          d: o * 2
        }));
        let t = [
          ["dar", this.tx("dar", {
            n: o
          }), "moneda", o <= 0]
        ];
        this.olido || t.push(["pensar", this.tx("pensar"), "reves"]), t.push(["irme", this.tx("irme"), "mochila"]);
        let s = await this.ui.elegir("donchollo", this.tx("oferta_titulo"), t);
        if (s === "pensar") return await this.ui.decir(this.dl("reves_piensa")), await this.olfatear(), this.oferta();
        s === "dar" ? (e.monedas -= o, e.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("chollo_gracias")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_chollo")), this.mundo.mostrar("donchollo", !1), this.ui.sonar("malo"), await this.ui.decir(this.dl("chollo_desaparece", {
          n: o
        }))) : await this.ui.decir(this.dl("irme")), this.olido || (await this.ui.decir(this.dl("olfatin_despues")), await this.olfatear()), await this.ui.decir(this.dl("reves_nombre")), e.criaturas.push("olfatin"), e.avisar(), this.ui.sonar("fanfarria"), this.mundo.estallido(this.sobre_heroe(), "#e9dcc0", 20), await this.ui.decir(this.dl("olfatin_se_une")), await this.ui.pregunta(this.tx("pregunta"), [
          ["timo", this.tx("resp_timo"), "olfatin", 3],
          ["suerte", this.tx("resp_suerte"), "moneda", 3],
          ["amigo", this.tx("resp_amigo"), "donchollo", 3]
        ], "timo", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async olfatear() {
        this.olido || (this.mundo.estallido(v(this.sobre_heroe(), 10, 6), "#e9dcc0", 14), await this.ui.decir(this.dl("olfatin_aparece"))), this.olido = !0, await this.ui.pistas("olfatin", this.tx("pistas_titulo"), "donchollo", this.datos.pistas), await this.ui.decir(this.dl("tras_oler"))
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.visibles.donchollo && (this.mundo.huir("donchollo", G), await this.ui.decir(this.dl("chollo_huye")), this.mundo.mostrar("donchollo", !1)), this.mundo.iluminar(0, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(60, 70), m, 30), await p(1.4), e.progreso_torre = 33, e.avisar(), await this.ui.decir(this.dl("victoria_reves")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    k = 12,
    U = [12, 18, 27, 41],
    Ea = class extends q {
      constructor() {
        super(...arguments);
        D(this, "eleccion", "")
      }
      objetivo() {
        return e.paso === "ir_tienda" ? h(4, 11, 25) : e.paso === "ir_reves" ? h(9, 6, 25) : null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(v(this.mundo.pie(u(2, 11)), 0, -16), m, 20), await this.ui.decir(this.dl("fachada_patines", {
          n: k
        })), this.paso("ir_tienda")
      }
      async npc(o) {
        if (o === "fachada" && e.paso === "ir_tienda") return this.tienda();
        if (o === "reves" && e.paso === "ir_reves") return this.reves();
        await this.charla(o)
      }
      async tienda() {
        e.ocupado = !0, await this.ui.decir(this.dl("patines_oferta", {
          n: k
        })), this.mundo.mostrar("deudon", !0), this.ui.sonar("malo"), this.mundo.estallido(v(this.mundo.pie(u(12, 12)), 0, -12), "#9a8aaa", 18), await this.ui.decir(this.dl("deudon_ofrece")), this.eleccion = await this.ui.elegir("patines", this.tx("titulo"), [
          ["prestamo", this.tx("prestamo", {
            n: k
          }), "cadena"],
          ["pagar", this.tx("pagar", {
            n: k
          }), "moneda", e.monedas < k],
          ["no", this.tx("no"), "mochila"]
        ]), this.eleccion === "prestamo" ? (e.patines = !0, await this.ui.decir(this.dl("prestado", {
          n: k
        }))) : this.eleccion === "pagar" ? (e.monedas -= k, e.patines = !0, this.ui.sonar("moneda"), await this.ui.decir(this.dl("pagado"))) : await this.ui.decir(this.dl("no_compra")), e.avisar(), e.patines && (this.mundo.estallido(v(this.sobre_heroe(), 0, 12), "#d9543f", 16), this.ui.sonar("acierto"), await this.ui.decir(this.dl("patines_puestos"))), this.paso("ir_reves")
      }
      async reves() {
        if (e.ocupado = !0, await this.ui.decir(this.dl("reves_" + this.eleccion)), await this.ui.tabla("reves", this.tx("tabla_titulo"), ["Hoy", "1\xAA", "2\xAA", "3\xAA"], [
            ["bola", this.tx("fila_copo"), [3, 6, 12, 24], I],
            ["cadena", this.tx("fila_deudon"), U, "#e0503c"]
          ], this.tx("tabla_frase")), this.eleccion === "prestamo") {
          await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_cobro")), this.ui.sonar("malo"), await this.ui.decir(this.dl("deudon_cobra", {
            n: U[1],
            p: k
          }));
          let o = Math.min(e.monedas, U[1]);
          e.monedas -= o, e.avisar(), this.ui.sonar("moneda"), o < U[1] ? await this.ui.decir(this.dl("reves_ayuda", {
            n: U[1] - o
          })) : await this.ui.decir(this.dl("deuda_pagada", {
            n: U[1] - k
          }))
        } else await this.ui.decir(this.dl("deudon_se_va"));
        this.mundo.huir("deudon", B), await p(.8), this.mundo.mostrar("deudon", !1), await this.ui.decir(this.dl("reves_nombre")), await this.ui.pregunta(this.tx("pregunta"), [
          ["capricho", this.tx("resp_capricho"), "patines", 3],
          ["nunca", this.tx("resp_nunca"), "moneda", 3],
          ["siempre", this.tx("resp_siempre"), "cadena", 3]
        ], "capricho", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 5), this.ui.sonar("fanfarria"), this.mundo.estallido(u(100, 150), m, 30), await p(1.4), e.progreso_torre = 66, e.avisar(), await this.ui.decir(this.dl("victoria_deuda")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Pa = class extends q {
      constructor() {
        super(...arguments);
        D(this, "puerta", 1)
      }
      objetivo() {
        return e.paso === "ir_cautela" ? h(6, 12, 25) : e.paso.startsWith("puerta_") ? h(7, 13 + this.puerta * 4, 22) : e.paso === "ir_reves" ? h(9, 31, 25) : null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), await this.ui.decir(this.dl("reves_reto")), this.mundo.estallido(v(this.mundo.pie(u(9, 6)), 0, -12), T, 16), this.mundo.mover_npc("reves", u(9, 31)), this.paso("ir_cautela")
      }
      async npc(o) {
        if (o === "cautela" && e.paso === "ir_cautela") return e.ocupado = !0, await this.ui.decir(this.dl("cautela_hola")), await this.ui.lista("cautela", this.tx("lista_titulo"), [
          ["donchollo", this.tx("lista_1")],
          ["cadena", this.tx("lista_2")],
          ["prisas", this.tx("lista_3")],
          ["bazar", this.tx("lista_4")]
        ], this.tx("lista_frase")), await this.ui.decir(this.dl("cautela_abre")), this.paso("puerta_1");
        if (o === "puerta_" + this.puerta && e.paso === o) return this.abrirPuerta();
        if (o === "reves" && e.paso === "ir_reves") return this.final();
        if (o.startsWith("puerta_")) {
          e.ocupado = !0, await this.ui.decir(this.dl("puerta_cerrada")), e.ocupado = !1;
          return
        }
        await this.charla(o)
      }
      async abrirPuerta() {
        e.ocupado = !0;
        let o = this.datos.puertas[this.puerta - 1];
        await this.ui.decir(this.dl("antes_" + this.puerta));
        let t = await this.ui.elegir(o.icono, o.titulo, o.opciones),
          s = u(7, 13 + this.puerta * 4);
        t === o.correcta ? (this.ui.sonar("acierto"), this.mundo.estallido(v(this.mundo.pie(s), 0, -10), j, 24), this.mundo.mostrar("puerta_" + this.puerta, !1), await this.ui.decir(this.dl("bien_" + this.puerta)), this.puerta += 1, this.paso(this.puerta <= 4 ? "puerta_" + this.puerta : "ir_reves")) : (this.ui.sonar("malo"), this.mundo.estallido(this.sobre_heroe(), "#e0503c", 18), await this.ui.decir(this.dl("trampa_" + this.puerta)), e.ocupado = !1)
      }
      async final() {
        e.ocupado = !0, await this.ui.decir(this.dl("reves_final")), await this.ui.pregunta(this.tx("pregunta"), [
          ["evitar", this.tx("resp_evitar"), "reves", 3],
          ["listo", this.tx("resp_listo"), "moneda", 3],
          ["suerte", this.tx("resp_suerte"), "trocito", 3]
        ], "evitar", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 340), m, 30), await p(1.4), this.mundo.iluminar(3, 22), this.mundo.estallido(u(97, 150), j, 40), await p(1.4), e.progreso_torre = 100, e.avisar(), await this.ui.decir(this.dl("torre_brilla")), this.mundo.huir("fachada", G), this.ui.sonar("malo"), await this.ui.decir(this.dl("villanos_huyen")), await p(1), this.mundo.mostrar("fachada", !1), await this.ui.victoria(this.datos.textos, "Seguir explorando"), this.fin()
      }
    };
  var Ca = 6,
    aa = 18,
    Ra = class extends q {
      constructor() {
        super(...arguments);
        D(this, "compro", !1)
      }
      objetivo() {
        switch (e.paso) {
          case "ir_reloj":
            return h(7, 32, 2);
          case "ir_pendulo":
            return h(12, 12, 25);
          case "ir_vaiven":
            return h(7, 8, 25);
          case "ir_euforio":
            return h(4, 15, 25)
        }
        return null
      }
      async empezar() {
        e.ocupado = !0, e.zona === "torre" ? (await this.ui.decir(this.dl("chispin_sur")), this.paso("ir_reloj")) : this.enReloj()
      }
      async llegada(o) {
        e.paso === "ir_reloj" && e.zona === "torre" && o.y >= 32 && (e.ocupado = !0, e.paso = "viaje", await this.ui.viajar(this.tx("viaje_titulo"), this.tx("viaje_sub"), () => this.mundo.cargar_zona("reloj", u(7, 1))), e.guardar(), this.enReloj())
      }
      async enReloj() {
        e.ocupado = !0, e.pendulo = .85, e.avisar(), this.mundo.mostrar("euforio", !0), ["#ff8fbd", m, "#9fd6f5"].forEach(o => this.mundo.estallido(u(30 + Math.random() * 130, 170 + Math.random() * 70), o, 16)), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("llegada_reloj")), this.paso("ir_pendulo")
      }
      async npc(o) {
        let t = e.paso;
        if (o === "pendulo" && t === "ir_pendulo") return e.ocupado = !0, await this.ui.decir(this.dl("pendulo_hola")), await this.ui.lista("pendulo", this.tx("medidor_titulo"), [
          ["panico", this.tx("m_panico")],
          ["reloj", this.tx("m_calma")],
          ["euforio", this.tx("m_euforia")]
        ], this.tx("medidor_frase")), this.paso("ir_vaiven");
        if (o === "vaiven" && t === "ir_vaiven") return e.ocupado = !0, this.ui.sonar("acierto"), this.mundo.estallido(v(this.mundo.pie(u(7, 2)), 0, -10), m, 16), await this.ui.decir(this.dl("vaiven_campana")), await this.ui.pregunta(this.tx("donde"), [
          ["euforia", this.tx("r_euforia"), "euforio", 3],
          ["calma", this.tx("r_calma"), "reloj", 3],
          ["panico", this.tx("r_panico"), "panico", 3]
        ], "euforia", this.tx("donde_bien"), this.tx("donde_mal")), this.paso("ir_euforio");
        if (o === "euforio" && t === "ir_euforio") return this.fiesta();
        await this.charla(o)
      }
      async fiesta() {
        e.ocupado = !0, await this.ui.decir(this.dl("euforio_oferta", {
          n: aa,
          c: Ca
        })), await this.ui.elegir("euforio", this.tx("titulo"), [
          ["comprar", this.tx("comprar", {
            n: aa
          }), "trocito", e.monedas < aa],
          ["esperar", this.tx("esperar"), "reloj"]
        ]) === "comprar" ? (e.monedas -= aa, e.trocitos.horno = e.trocitos_de("horno") + 1, this.compro = !0, this.ui.sonar("moneda"), e.avisar(), await this.ui.decir(this.dl("comprado"))) : await this.ui.decir(this.dl("espera")), await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_fin")), e.pendulo = 0, e.avisar(), this.mundo.huir("euforio", Ii), this.ui.sonar("acierto"), await this.ui.decir(this.dl("vaiven_calma")), this.mundo.mostrar("euforio", !1), await this.ui.tabla("pendulo", this.tx("tabla_titulo"), ["Antes", "Fiesta", "Despu\xE9s"], [
          ["trocito", this.tx("fila_precio"), [Ca, aa, Ca], m]
        ], this.tx(this.compro ? "tabla_compro" : "tabla_espera")), this.compro && await this.ui.decir(this.dl("perdio", {
          n: aa - Ca
        })), await this.ui.decir(this.dl("pendulo_nombre")), await this.ui.pregunta(this.tx("pregunta"), [
          ["todos", this.tx("resp_todos"), "euforio", 3],
          ["nadie", this.tx("resp_nadie"), "panico", 3],
          ["lunes", this.tx("resp_lunes"), "reloj", 3]
        ], "todos", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(0, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 90), m, 30), await p(1.4), e.progreso_reloj = 33, e.avisar(), await this.ui.decir(this.dl("victoria_campana")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Ja = 6,
    R = 3,
    Ci = 8,
    Ri = ["fiel", "engranaje", "horno", "fragua"],
    Ma = class extends q {
      objetivo() {
        return e.paso === "ir_memoria" ? h(2, 12, 25) : e.paso === "ir_pendulo" ? h(12, 12, 25) : null
      }
      trocitos() {
        return Ri.reduce((a, o) => a + e.trocitos_de(o), 0)
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_tormenta")), e.pendulo = -.9, e.avisar(), this.mundo.tormenta(!0), this.mundo.mostrar("panico", !0), this.ui.sonar("malo"), await this.ui.decir(this.dl("panico_grita"));
        let a = this.trocitos();
        await this.ui.decir(this.dl(a > 0 ? "chispin_tormenta" : "chispin_tormenta_sin", {
          n: a,
          v: a * Ja,
          t: a * R
        })), this.paso("ir_memoria")
      }
      async npc(a) {
        if (a === "memoria" && e.paso === "ir_memoria") return this.memoria();
        if (a === "pendulo" && e.paso === "ir_pendulo") return this.decidir();
        await this.charla(a)
      }
      async memoria() {
        e.ocupado = !0, await this.ui.decir(this.dl("memoria_hola")), await this.ui.lista("memoria", this.tx("cuadros_titulo"), [
          ["cuadro", this.tx("cuadro_1")],
          ["cuadro", this.tx("cuadro_2")],
          ["cuadro", this.tx("cuadro_3")]
        ], this.tx("cuadros_frase")), this.mundo.estallido(v(this.sobre_heroe(), -8, 0), "#c9a66b", 18), e.criaturas.push("calmin"), e.avisar(), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("calmin_aparece")), this.paso("ir_pendulo")
      }
      async decidir() {
        e.ocupado = !0;
        let a = this.trocitos();
        await this.ui.decir(this.dl("pendulo_tormenta"));
        let o = await this.ui.elegir("panico", this.tx("titulo"), [
          ["vender", this.tx("vender", {
            m: a * R
          }), "moneda", a === 0],
          ["aguantar", this.tx("aguantar"), "calmin"],
          ["rebajas", this.tx("rebajas", {
            p: R
          }), "trocito", e.monedas < R]
        ]);
        if (o === "vender") {
          for (let s of Ri) e.trocitos[s] = 0;
          this.ganar_monedas(a * R), await this.ui.decir(this.dl("vendido", {
            m: a * R
          }))
        } else if (o === "rebajas") {
          let s = Math.min(3, Math.floor(e.monedas / R));
          e.monedas -= s * R, e.trocitos.fiel = e.trocitos_de("fiel") + s, e.avisar(), this.ui.sonar("moneda"), await this.ui.decir(this.dl("rebajas", {
            k: s,
            m: s * R
          }))
        } else await this.ui.decir(this.dl("aguanta"));
        await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_calma")), this.mundo.tormenta(!1), e.pendulo = 0, e.avisar(), this.mundo.huir("panico", B), this.ui.sonar("acierto"), await this.ui.decir(this.dl("vuelve_calma")), this.mundo.mostrar("panico", !1), await this.ui.tabla("pendulo", this.tx("tabla_titulo"), ["Antes", "Tormenta", "Despu\xE9s"], [
          ["moneda", this.tx("f_vender"), [Ja, R, R], "#e0503c"],
          ["calmin", this.tx("f_aguantar"), [Ja, R, Ci], I],
          ["trocito", this.tx("f_rebajas"), [R, R, Ci], m]
        ], this.tx("tabla_frase"));
        let t = this.trocitos();
        t > 0 && (this.ganar_monedas(t * 2), await this.ui.decir(this.dl("frutos_dorados", {
          n: t * 2,
          t
        }))), await this.ui.decir(this.dl("pendulo_nombre")), await this.ui.pregunta(this.tx("pregunta"), [
          ["calma", this.tx("resp_calma"), "calmin", 3],
          ["vender", this.tx("resp_vender"), "panico", 3],
          ["esconder", this.tx("resp_esconder"), "hucha", 3]
        ], "calma", this.tx("fb_bien"), this.tx("fb_mal")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(1, 6), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 200), m, 30), await p(1.4), e.progreso_reloj = 66, e.avisar(), await this.ui.decir(this.dl("victoria_pendulo")), await this.ui.victoria(this.datos.textos, "Siguiente misi\xF3n"), this.fin()
      }
    },
    Ha = class extends q {
      objetivo() {
        return e.paso === "ir_maquina" ? h(7, 30, 2) : null
      }
      async empezar() {
        e.ocupado = !0, await this.ui.pasar_noche(this.siguiente_estacion(), this.tx("noche_inicio")), this.mundo.estallido(v(this.mundo.pie(oa), 0, -40), T, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("pendulo_maquina")), this.paso("ir_maquina")
      }
      llegada(a) {
        e.paso === "ir_maquina" && a.y >= 28 && this.final()
      }
      async npc(a) {
        if (e.paso === "ir_maquina" && a === "merma") return this.final();
        await this.charla(a)
      }
      async final() {
        e.ocupado = !0, e.paso = "final", this.ui.poner_mision(this.datos.misiones.final), this.mundo.mostrar("merma", !0), this.mundo.estallido(v(this.mundo.pie(u(7, 28)), 0, -14), T, 30), this.ui.sonar("malo"), await this.ui.decir(this.dl("merma_habla"));
        for (let o of this.datos.trampas) {
          let t = o.villano;
          o.celda && this.mundo.mover_npc(t, u(o.celda[0], o.celda[1])), this.mundo.mostrar(t, !0), this.mundo.estallido(u(this.mundo.npcs[t].x, this.mundo.npcs[t].y - 12), T, 14), this.ui.sonar("malo"), await this.ui.decir(this.dl(o.dialogo));
          let s = o.opciones.map(l => [l[0], l[1], l[2], 3]),
            r = !1;
          for (; !r;) r = await this.ui.pregunta(o.pregunta, s, o.correcta, o.bien, o.mal);
          this.mundo.estallido(u(this.mundo.npcs[t].x, this.mundo.npcs[t].y - 12), j, 20), this.ui.sonar("acierto"), await this.ui.decir(this.dl(o.ayuda)), this.mundo.huir(t, zi), await p(.7), this.mundo.mostrar(t, !1)
        }
        await this.ui.decir(this.dl("merma_furiosa")), await this.ui.decir(this.dl("pendulo_forja")), await this.ui.forja(this.datos.textos), await this.ui.decir(this.dl("merma_copia"));
        for (let o = 0; o < 4; o++) this.mundo.estallido(v(this.mundo.pie(oa), Math.random() * 80 - 40, -10 - Math.random() * 50), "#d6d6de", 12), this.ui.sonar("fallo"), await p(.35);
        let a = !1;
        for (; !a;) a = await this.ui.pregunta(this.tx("pregunta"), [
          ["unica", this.tx("resp_unica"), "moneda_estrella", 3],
          ["dorada", this.tx("resp_dorada"), "oro", 3],
          ["grande", this.tx("resp_grande"), "moneda", 3]
        ], "unica", this.tx("fb_bien"), this.tx("fb_mal"));
        e.maquina_apagada = !0, this.mundo.apagar_maquina(), e.avisar(), this.mundo.aplicarBrillo(), this.mundo.estallido(v(this.mundo.pie(u(7, 28)), 0, -14), T, 50), this.mundo.mostrar("merma", !1), this.ui.sonar("fanfarria"), await this.ui.decir(this.dl("maquina_apagada")), this.victoria()
      }
      async victoria() {
        e.ocupado = !0, e.paso = "victoria", this.ui.poner_mision(this.datos.misiones.victoria), this.mundo.iluminar(2, 7), this.mundo.estallido(u(97, 340), m, 40), await p(1.2), this.mundo.iluminar(3, 30), this.ui.sonar("fanfarria"), this.mundo.estallido(u(97, 150), j, 50), await p(1.6), e.progreso_reloj = 100, e.pendulo = 0, e.avisar(), await this.ui.decir(this.dl("todo_brilla")), await this.ui.carta(this.tx("carta_final"), !1), await this.ui.victoria(this.datos.textos, "Ver el final"), await this.ui.fin_del_juego(this.datos.textos), this.fin()
      }
    };
  var Ta = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 1. Se pueden editar sin tocar el c\xF3digo. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves, como {n}, lo rellena el juego.",
    misiones: {
      ir_hogaza: "Habla con Hogaza en la panader\xEDa",
      ir_semilla: "Ve al huerto con la se\xF1ora Semilla",
      plantar: "Planta la semilla del abuelo en tu huerto",
      cosechar: "Recoge los frutos de tu huerto",
      vender: "Vende tus frutos a Tasador",
      comprar_pan: "Compra el pan a Hogaza",
      victoria: "\xA1La panader\xEDa vuelve a brillar!",
      libre: "Explora el Mercado del Pueblo"
    },
    textos: {
      carta: "Valoria perdi\xF3 su brillo cuando un rey impaciente construy\xF3 una m\xE1quina de hacer dinero. Te dejo diez monedas, una semilla y a Chisp\xEDn. No guardes las monedas quietas: Merma les roba el brillo. Ponlas a trabajar.",
      noche_pan: "Subeprecios ha subido el pan a 4 monedas",
      noche_frutos: "Los frutos han crecido mientras dorm\xEDas",
      hucha_titulo: "Tus monedas siguen ah\xED\u2026",
      hucha_texto: "\u2026pero brillan menos. Ayer, tus {n} monedas compraban {antes} panes. Hoy, solo {hoy}.",
      hucha_frase: "Lo que se guarda quieto pierde brillo.",
      semillas_titulo: "\xA1Tu huerto ha brotado!",
      semillas_texto: "Dar\xE1 frutos cada estaci\xF3n. Y los frutos dan m\xE1s semillas.",
      semillas_frase: "\xA1Has puesto tus monedas a trabajar!",
      caramelo_titulo: "\xA1Riqu\xEDsimo!",
      caramelo_texto: "Lo has disfrutado mucho. Pero ya no te quedan monedas.",
      caramelo_frase: "Los caprichos se disfrutan\u2026 y se acaban.",
      frutos_titulo: "Tienes {n} frutos",
      vender_todo: "Venderlos todos a Tasador",
      replantar: "Replantar uno y vender el resto",
      pregunta: "\xBFPor qu\xE9 crees que el pan cuesta cada vez m\xE1s?",
      resp_bien: "Merma quita brillo a las monedas",
      resp_avara: "Hogaza es una avara",
      resp_grande: "Ahora el pan es m\xE1s grande",
      fb_bien: "\xA1Exacto! Cuando hay monedas de m\xE1s, cada una vale menos.",
      fb_mal: "Casi. Hogaza no tiene la culpa: es Merma. Cuando hay monedas de m\xE1s, cada una vale menos y todo cuesta m\xE1s.",
      medalla: "Medalla \xABPrimer brote\xBB",
      medalla_texto: "Has devuelto el brillo a la panader\xEDa de Hogaza. El Mercado brilla ya al 35%.",
      pagina: "Merma solo roba el brillo de lo que est\xE1 quieto. Lo que trabaja, crece.",
      reto_familia: "Pregunta en casa cu\xE1nto costaba una barra de pan cuando tus padres eran peque\xF1os.",
      pagina_numero: "p\xE1gina 1",
      icono_medalla: "medalla"
    },
    dialogos: {
      chispin_hola: [
        ["chispin", "\xA1Hola! Soy Chisp\xEDn. Ir\xE9 contigo a todas partes."],
        ["chispin", "Toca el suelo para caminar. \xA1Vamos a ver a Hogaza!"]
      ],
      hogaza_pan_sube: [
        ["hogaza", "\xA1El pan sube otra vez! Ayer costaba 2 monedas. Hoy, 3."],
        ["hogaza", "Merma anda cerca\u2026 \xBFMe ayudas a amasar? Te pagar\xE9."]
      ],
      hogaza_paga: [
        ["hogaza", "\xA1Qu\xE9 manos! Aqu\xED tienes {n} monedas."]
      ],
      sube_aparece: [
        ["subeprecios", "\xA1Je, je! Ma\xF1ana todo costar\xE1 m\xE1s."]
      ],
      chispin_semilla_llama: [
        ["chispin", "\xA1Mira! La se\xF1ora Semilla nos llama desde el huerto."],
        ["chispin", "\xBFProbamos otra cosa?"]
      ],
      chispin_semilla_conocer: [
        ["chispin", "La se\xF1ora Semilla quiere conocerte. \xA1Vamos al huerto!"]
      ],
      hogaza_mas_trabajo: [
        ["hogaza", "\xBFSin monedas? \xA1En la panader\xEDa siempre hace falta amasar!"]
      ],
      caramelo_vuelta: [
        ["hogaza", "Aqu\xED tienes {n} monedas."],
        ["subeprecios", "\xA1Je, je! Y ma\xF1ana, m\xE1s caro."]
      ],
      semilla_hola: [
        ["semilla", "\xA1Hola! Soy la se\xF1ora Semilla."],
        ["semilla", "Las semillas trabajan mientras duermes. Mira\u2026"]
      ],
      semilla_regalo: [
        ["semilla", "Esta te la regalo. Ahora t\xFA: planta la semilla de tu abuelo."]
      ],
      parcela_ocupada: [
        ["chispin", "Aqu\xED ya hay un brote. Prueba en otro hueco."]
      ],
      plantada: [
        ["chispin", "\xA1Plantada! Ahora toca esperar."]
      ],
      hay_frutos: [
        ["chispin", "\xA1Tu huerto ha dado frutos! T\xF3calos para recogerlos."]
      ],
      cuantos_frutos: [
        ["chispin", "\xA1{n} frutos! \xBFQu\xE9 hacemos con ellos?"]
      ],
      replantado: [
        ["chispin", "\xA1Un brote m\xE1s! As\xED es como crece un huerto."]
      ],
      replantado_junto: [
        ["chispin", "Lo plantamos junto a los dem\xE1s: tu huerto crece."]
      ],
      brote_crece: [
        ["chispin", "Este brote crece poco a poco."]
      ],
      hueco_vacio: [
        ["chispin", "Un buen hueco para plantar\u2026 cuando tengamos semillas."]
      ],
      tasador_compra: [
        ["tasador", "\xA1Frutos frescos! Te pago 3 monedas por cada uno."],
        ["tasador", "Son {n} monedas. Merma sube los precios\u2026 y lo que t\xFA produces tambi\xE9n vale m\xE1s."]
      ],
      hogaza_vende: [
        ["hogaza", "El pan cuesta ya {n} monedas. \xBFLo quieres?"]
      ],
      hogaza_toma: [
        ["hogaza", "\xA1Aqu\xED tienes! Reci\xE9n hecho y calentito."]
      ],
      victoria_hogaza: [
        ["hogaza", "\xA1Mira! \xA1Mi panader\xEDa vuelve a brillar!"],
        ["hogaza", "Eso que hace Merma tiene nombre: inflaci\xF3n. \xA1Hoy la has vencido!"]
      ],
      sube_huye: [
        ["subeprecios", "\xA1Grrr! \xA1Ya nos veremos en los puestos!"]
      ],
      charla_hogaza: [
        ["hogaza", "\xA1Huele a pan reci\xE9n hecho!"]
      ],
      charla_tasador: [
        ["tasador", "Compro y vendo de todo. Mira bien antes de comprar: no todo lo que brilla vale."]
      ],
      charla_antojo: [
        ["antojo", "\xA1Caramelos brillantes! \xBFUn caprichito?"]
      ],
      charla_semilla: [
        ["semilla", "Cuida tu huerto y \xE9l cuidar\xE1 de ti."]
      ],
      charla_subeprecios: [
        ["subeprecios", "\xA1Je, je! Todo, m\xE1s caro."]
      ]
    }
  };
  var Mi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 2. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_hogaza: "Habla con Hogaza: algo ha pasado",
      ir_semilla: "La se\xF1ora Semilla te busca en el huerto",
      regadera: "Compra una regadera a Tasador o a Yunque",
      regar: "Riega tu huerto",
      cosechar: "Recoge los frutos de tu huerto",
      ir_yunque: "Yunque quiere ense\xF1arte algo en su forja",
      ir_tasador: "Tasador te espera en su puesto",
      victoria: "\xA1El puesto de Tasador vuelve a brillar!"
    },
    textos: {
      noche_pan: "Subeprecios ha vuelto a subir el pan",
      noche_crecen: "El huerto ha bebido y ha crecido",
      quien: "\xBFQui\xE9n habr\xE1 subido el pan otra vez?",
      resp_sube: "Subeprecios",
      resp_antojo: "Antojo",
      resp_viento: "El viento",
      fb_quien_bien: "\xA1Lo has pillado! Subeprecios es el secuaz de Merma que sube los precios.",
      fb_quien_mal: "Casi. Ha sido Subeprecios, el secuaz de Merma que sube los precios.",
      titulo_reluciente: "Regadera Reluciente",
      titulo_hierro: "Regadera de hierro",
      nombre_reluciente: "Regadera Reluciente",
      nombre_hierro: "Regadera de hierro",
      comprar_reluciente: "Comprarla por 3 monedas",
      comprar_hierro: "Comprarla por 8 monedas",
      ahora_no: "Ahora no",
      amasar_titulo: "\xBFAmasar con Hogaza?",
      amasar_si: "\xA1A amasar!",
      hierro_titulo: "\xA1Qu\xE9 cosecha!",
      hierro_texto: "La regadera de hierro ha regado bien cada brote. Tu huerto ha dado {n} frutos, el doble de lo normal.",
      hierro_frase: "Lo que dura y funciona, rinde.",
      rota_titulo: "Uy\u2026 la Reluciente se ha roto",
      rota_texto: "Se le ha ca\xEDdo la pintura y goteaba por todas partes. Tu huerto ha dado {n} frutos, los de siempre.",
      rota_frase: "Lo barato a veces sale caro.",
      yunque_frase: "Lo bueno se paga una vez. Lo malo, muchas.",
      pregunta: "\xBFPor qu\xE9 la regadera m\xE1s cara sali\xF3 m\xE1s barata?",
      resp_dura: "Porque dura mucho m\xE1s",
      resp_bonita: "Porque es m\xE1s bonita",
      resp_amiga: "Porque Yunque es mi amiga",
      fb_bien: "\xA1Exacto! Cuesta m\xE1s, pero dura diez estaciones y da m\xE1s frutos. Por cada vez que la usas, sale m\xE1s barata.",
      fb_mal: "Casi. Lo que cuenta es que dura diez estaciones y da m\xE1s frutos. Por cada vez que la usas, sale m\xE1s barata.",
      medalla: "Medalla \xABOjo de tasador\xBB",
      medalla_texto: "Has aprendido a mirar el valor y no solo el precio. El Mercado brilla ya al 70%.",
      icono_medalla: "medalla_ojo",
      pagina_numero: "p\xE1gina 2",
      pagina: "Lo que brilla no siempre vale. Preg\xFAntate cu\xE1nto dura y qu\xE9 te da.",
      reto_familia: "Elegid en casa dos cosas parecidas con distinto precio, como dos mochilas, y adivinad cu\xE1l durar\xE1 m\xE1s."
    },
    rondas: [{
      a: {
        icono: "botas_carton",
        nombre: "Botas de cart\xF3n",
        precio: 2,
        detalle: "Dura 1 estaci\xF3n. Se deshace con la lluvia."
      },
      b: {
        icono: "botas_cuero",
        nombre: "Botas de cuero",
        precio: 6,
        detalle: "Duran 12 estaciones."
      },
      buena: "b",
      bien: "\xA1Buen ojo! Las de cuero cuestan m\xE1s, pero duran doce veces m\xE1s.",
      mal: "Mira bien: las de cart\xF3n se deshacen con la primera lluvia. Las de cuero duran doce estaciones."
    }, {
      a: {
        icono: "cesta_mimbre",
        nombre: "Cesta de mimbre",
        precio: 4,
        detalle: "Dura a\xF1os. Aguanta mucho peso."
      },
      b: {
        icono: "cesta_papel",
        nombre: "Cesta de papel",
        precio: 1,
        detalle: "Se rompe al primer uso."
      },
      buena: "a",
      bien: "\xA1Eso es! La de papel sale barata\u2026 una sola vez.",
      mal: "Uy: la de papel se rompe al primer uso. La de mimbre dura a\xF1os."
    }, {
      a: {
        icono: "semillas_oferta",
        nombre: "Semillas de oferta",
        precio: 2,
        detalle: "La mitad no brotan."
      },
      b: {
        icono: "semillas",
        nombre: "Semillas buenas",
        precio: 5,
        detalle: "Brotan todas y dan frutos."
      },
      buena: "b",
      bien: "\xA1Tienes ojo de tasador! Una oferta no vale nada si no funciona.",
      mal: "Casi: la mitad de las semillas de oferta no brotan. Una oferta no vale nada si no funciona."
    }],
    dialogos: {
      chispin_buenos_dias: [
        ["chispin", "\xA1Buenos d\xEDas! \xBFHueles eso? Hogaza parece preocupada."]
      ],
      hogaza_mas_caro: [
        ["hogaza", "\xA1Otra vez m\xE1s caro! El pan ya cuesta 5 monedas."]
      ],
      hogaza_semilla_busca: [
        ["hogaza", "Por cierto, la se\xF1ora Semilla te busca. Algo le pasa a tu huerto."]
      ],
      semilla_sed: [
        ["semilla", "Tu huerto tiene sed. Sin agua, dar\xE1 pocos frutos."],
        ["semilla", "Tasador y Yunque venden regaderas. T\xFA decides cu\xE1l."]
      ],
      tienda_tasador: [
        ["tasador", "\xA1Mira qu\xE9 Regadera Reluciente! Dorada y barat\xEDsima: 3 monedas."],
        ["tasador", "Yo vendo de todo. T\xFA decides qu\xE9 te llevas."]
      ],
      tienda_yunque: [
        ["yunque", "Mi regadera es de hierro: 8 monedas."],
        ["yunque", "No brilla, pero la hice para durar."]
      ],
      comprada_reluciente: [
        ["chispin", "\xA1Qu\xE9 brillo! Vamos a regar el huerto."]
      ],
      comprada_hierro: [
        ["chispin", "\xA1Qu\xE9 fuerte es! Vamos a regar el huerto."]
      ],
      faltan_monedas: [
        ["chispin", "Nos faltan monedas: cuesta {n}. Hogaza siempre necesita ayuda para amasar."]
      ],
      hogaza_paga: [
        ["hogaza", "\xA1Gracias! Aqu\xED tienes {n} monedas."]
      ],
      regado_reluciente: [
        ["chispin", "Gotea un poco\u2026 pero el huerto est\xE1 regado."]
      ],
      regado_hierro: [
        ["chispin", "\xA1Riega de maravilla! El huerto est\xE1 contento."]
      ],
      a_cosechar: [
        ["chispin", "\xA1A recoger los frutos!"]
      ],
      yunque_llama: [
        ["chispin", "\xA1{n} frutos! Yunque nos llama desde la forja."]
      ],
      yunque_hola: [
        ["yunque", "Ven, que te ense\xF1o una cosa."]
      ],
      yunque_despide_reluciente: [
        ["yunque", "La pr\xF3xima vez ya sabr\xE1s elegir. Ahora, Tasador te espera."]
      ],
      yunque_despide_hierro: [
        ["yunque", "Elegiste bien. Ahora, Tasador quiere ense\xF1arte su truco."]
      ],
      tasador_ojo: [
        ["tasador", "Antes de comprar, hay que mirar bien. Te ense\xF1o mi truco."],
        ["tasador", "Se llama ojo de tasador."]
      ],
      tasador_paga: [
        ["tasador", "\xA1Lo tienes! Y te compro tus {f} frutos: son {p} monedas."]
      ],
      victoria_tasador: [
        ["tasador", "\xA1Mi puesto vuelve a brillar!"],
        ["tasador", "El precio es lo que pagas. El valor, lo que te llevas."]
      ],
      sube_huye: [
        ["subeprecios", "\xA1Grrr! \xA1Me voy con Antojo! \xA1All\xED s\xED me hacen caso!"]
      ],
      charla_hogaza: [
        ["hogaza", "Si necesitas monedas, siempre hay masa que amasar."]
      ],
      charla_tasador: [
        ["tasador", "No todo lo que brilla vale."]
      ],
      charla_antojo: [
        ["antojo", "\xA1Caramelos brillantes! \xBFUn caprichito?"]
      ],
      charla_semilla: [
        ["semilla", "Un huerto bien regado es un huerto feliz."]
      ],
      charla_yunque: [
        ["yunque", "Lo bueno se paga una vez."]
      ],
      charla_subeprecios: [
        ["subeprecios", "\xA1Je, je! Todo, m\xE1s caro."]
      ]
    }
  };
  var Hi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 3. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_antojo: "Antojo te llama desde su puesto",
      ir_hogaza: "Hogaza tiene tu paga de la feria",
      ir_semilla: "La se\xF1ora Semilla tiene un truco para la feria",
      feria: "Haz tus compras de la feria con Tasador",
      victoria: "\xA1Todo el Mercado vuelve a brillar!"
    },
    textos: {
      noche_feria: "Ma\xF1ana es la Feria del Pueblo",
      titulo_chuche: "Chuche Gigante Brillante",
      mirar_chuche: "Mirarla con el ojo de tasador",
      comprar_chuche: "Comprarla por 5 monedas",
      ahora_no: "Ahora no",
      botes_titulo: "La regla de los tres botes",
      bote_1: "Primero, lo que necesitas.",
      bote_2: "Despu\xE9s, lo que te hace crecer.",
      bote_3: "Y con lo que sobra, un gusto.",
      botes_frase: "Si lo ordenas as\xED, muchas veces cabe todo.",
      titulo_oferta: "\xA1Oferta de Antojo!",
      seguir_lista: "Seguir con mi lista",
      comprar_oferta: "Comprar la chuche por 4 monedas",
      titulo_cambio: "No te llega para todo",
      cambiar_por: "Cambiar {cosa} por la chuche",
      cosa_abono: "el abono",
      cosa_gorro: "el gorro",
      cosa_comida: "la comida de Chisp\xEDn",
      pregunta: "\xBFQu\xE9 hay que comprar primero?",
      resp_necesito: "Lo que necesito",
      resp_brilla: "Lo que m\xE1s brilla",
      resp_oferta: "Lo que est\xE1 de oferta",
      fb_bien: "\xA1Eso es! Primero lo que necesitas. Luego lo que te hace crecer. Y con lo que sobra, un gusto.",
      fb_mal: "Casi. Primero va lo que necesitas; lo que brilla o est\xE1 de oferta puede esperar.",
      medalla: "Medalla \xABBuen presupuesto\xBB",
      medalla_texto: "Has hecho tu primer presupuesto. \xA1Todo el Mercado del Pueblo vuelve a brillar!",
      icono_medalla: "medalla_presupuesto",
      pagina_numero: "p\xE1gina 3",
      pagina: "Un capricho a tiempo sabe mejor. Pero primero, lo que importa.",
      reto_familia: "Haced juntos la lista de la compra de la semana y separad lo que necesit\xE1is de lo que os apetece."
    },
    lista: [{
      icono: "comida",
      nombre: "Comida para Chisp\xEDn",
      precio: 4,
      tipo: "necesito",
      explica: "La comida de Chisp\xEDn es una necesidad: sin ella, no tiene fuerzas."
    }, {
      icono: "abono",
      nombre: "Abono para el huerto",
      precio: 5,
      tipo: "crecer",
      explica: "El abono te hace crecer: el huerto dar\xE1 m\xE1s frutos."
    }, {
      icono: "gorro",
      nombre: "Gorro de feria",
      precio: 3,
      tipo: "apetece",
      explica: "El gorro es un gusto. \xA1Los gustos tambi\xE9n est\xE1n bien, si caben!"
    }, {
      icono: "caramelo",
      nombre: "Chuche gigante",
      precio: 5,
      tipo: "apetece",
      explica: "La chuche es un capricho: rica, pero dura un momento."
    }],
    tienda: [{
      id: "comida",
      icono: "comida",
      nombre: "Comida para Chisp\xEDn",
      precio: 4
    }, {
      id: "abono",
      icono: "abono",
      nombre: "Abono para el huerto",
      precio: 5
    }, {
      id: "gorro",
      icono: "gorro",
      nombre: "Gorro de feria",
      precio: 3
    }, {
      id: "chuche",
      icono: "caramelo",
      nombre: "Chuche gigante",
      precio: 5
    }],
    dialogos: {
      chispin_feria: [
        ["chispin", "\xA1Ma\xF1ana es la Feria del Pueblo! Antojo nos est\xE1 llamando."]
      ],
      antojo_ofrece: [
        ["antojo", "\xA1Chuche Gigante Brillante! \xA1Solo 5 monedas!"]
      ],
      chuche_mirada: [
        ["chispin", "Con tu ojo de tasador se ve claro: dura un momento y da un rato de alegr\xEDa."]
      ],
      chuche_comprada: [
        ["chispin", "\xA1Mmm, qu\xE9 rica! Y qu\xE9 r\xE1pido se ha acabado."]
      ],
      chuche_no: [
        ["antojo", "\xA1T\xFA te lo pierdes! Ma\xF1ana tendr\xE9 m\xE1s."]
      ],
      hogaza_llama: [
        ["chispin", "Mira, Hogaza nos hace se\xF1as desde la panader\xEDa."]
      ],
      hogaza_paga_feria: [
        ["hogaza", "Toma tu paga de la feria: {n} monedas."],
        ["hogaza", "Antes de ir, haz tu lista."]
      ],
      lista_hecha: [
        ["chispin", "\xA1Lista hecha! La se\xF1ora Semilla dice que tiene un truco."]
      ],
      semilla_regla: [
        ["semilla", "En la feria todo apetece. Por eso yo uso una regla."]
      ],
      tasador_feria: [
        ["tasador", "\xA1Bienvenido a la feria! Tengo todo lo de tu lista."]
      ],
      antojo_oferta: [
        ["antojo", "\xA1Espera, espera! \xA1Oferta solo hoy! La chuche gigante, a 4 monedas."]
      ],
      oferta_no_cabe: [
        ["chispin", "\xA1Ojo! Con lo que ya has elegido, no te llega para la chuche."]
      ],
      efecto_comida: [
        ["chispin", "\xA1\xD1am! \xA1Qu\xE9 rica! Me siento m\xE1s fuerte que nunca."]
      ],
      efecto_sin_comida: [
        ["chispin", "Uf, tengo un poco de hambre\u2026 La pr\xF3xima vez, \xBFempezamos por lo que se necesita?"]
      ],
      efecto_abono: [
        ["semilla", "\xA1Buen abono! Tu huerto dar\xE1 el doble de frutos en la pr\xF3xima cosecha."]
      ],
      efecto_gorro: [
        ["chispin", "\xA1Qu\xE9 gorro tan bonito! Te queda genial."]
      ],
      efecto_chuche: [
        ["chispin", "\xA1Qu\xE9 rica la chuche! Disfr\xFAtala, que dura poco."]
      ],
      efecto_sobra: [
        ["chispin", "Te han sobrado {n} monedas. \xA1A la mochila!"]
      ],
      victoria_antojo: [
        ["antojo", "\xA1Mi puesto vuelve a brillar!"],
        ["antojo", "Un capricho a tiempo sabe mejor. Y m\xE1s si cabe en tu presupuesto."]
      ],
      mercado_brilla: [
        ["hogaza", "\xA1Mirad! \xA1Todo el Mercado vuelve a brillar!"],
        ["hogaza", "Eso que has hecho tiene nombre: presupuesto."]
      ],
      sube_huye: [
        ["subeprecios", "\xA1Grrr! \xA1Me voy al Valle de la Nieve! \xA1All\xED no me pillar\xE1s!"],
        ["chispin", "\xA1Se ha ido por el camino del Valle! Alg\xFAn d\xEDa iremos tras \xE9l."]
      ],
      charla_hogaza: [
        ["hogaza", "\xA1Qu\xE9 ganas de feria!"]
      ],
      charla_tasador: [
        ["tasador", "En la feria, mira bien antes de comprar."]
      ],
      charla_antojo: [
        ["antojo", "\xA1Caramelos brillantes! \xBFUn caprichito?"]
      ],
      charla_semilla: [
        ["semilla", "Primero lo que necesitas. Luego, lo que te hace crecer."]
      ],
      charla_yunque: [
        ["yunque", "Lo bueno se paga una vez."]
      ],
      charla_subeprecios: [
        ["subeprecios", "\xA1Je, je!"]
      ]
    }
  };
  var Ti = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 4. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_valle: "Sigue el camino del sur hasta el Valle",
      ir_copo: "Busca a Copo en su castillo de hielo",
      plantar: "Planta las 3 semillas de invierno en el huerto",
      cosechar: "\xA1El huerto del Valle tiene frutos!",
      volver_copo: "Copo quiere ense\xF1arte su reloj de arena",
      victoria: "\xA1El huerto del Valle brilla!"
    },
    textos: {
      viaje_titulo: "Valle de la Nieve",
      viaje_sub: "Donde las cosas crecen despacio",
      noche_1: "La nieve cubre el huerto",
      noche_2: "Las semillas siguen trabajando bajo la nieve",
      decidir_titulo: "Tienes {n} frutos de invierno",
      op_replantar: "Replantarlos todos",
      op_mitad: "Replantar la mitad y vender el resto",
      op_vender: "Venderlos todos ({m} monedas)",
      reloj_titulo: "El reloj de arena de Copo",
      fila_vender: "Vender",
      fila_replantar: "Replantar",
      reloj_frase: "Si vendes, cada estaci\xF3n tienes lo mismo. Si replantas, lo nuevo tambi\xE9n da fruto.",
      pregunta: "Si replantas lo que da tu huerto, \xBFqu\xE9 pasa?",
      resp_crece: "Cada vez da m\xE1s",
      resp_igual: "Da siempre lo mismo",
      resp_menos: "Da menos",
      fb_bien: "\xA1Eso es! Lo que plantas da frutos, y esos frutos plantados dan m\xE1s frutos. Como una bola de nieve.",
      fb_mal: "Casi. Mira el reloj de Copo: lo que replantas tambi\xE9n da fruto, as\xED que cada vez hay m\xE1s.",
      medalla: "Medalla \xABBola de nieve\xBB",
      medalla_texto: "Tu huerto del Valle crece solo. \xA1Ha nacido Brot\xEDn!",
      icono_medalla: "bola",
      pagina_numero: "p\xE1gina 4",
      pagina: "Una bola de nieve empieza siendo un pu\xF1ado. Lo que importa es empujarla mucho tiempo.",
      reto_familia: "Haced una bola de nieve (o de plastilina) y a\xF1adidle un poquito cada d\xEDa. \xBFCu\xE1nto crece en una semana?"
    },
    dialogos: {
      chispin_sur: [
        ["chispin", "\xA1Subeprecios huy\xF3 por el camino del sur!"],
        ["chispin", "All\xED est\xE1 el Valle de la Nieve. Dicen que lleva a\xF1os congelado."],
        ["chispin", "Baja hasta el final del camino. \xA1Vamos!"]
      ],
      llegada_valle: [
        ["chispin", "Brrr\u2026 \xA1Qu\xE9 fr\xEDo! Todo est\xE1 gris y helado."],
        ["chispin", "Mira esas huellas rojas en la nieve. Son peque\xF1as y van muy deprisa."],
        ["chispin", "En el castillo de hielo vive Copo, el m\xE1s sabio del Valle. \xA1Vamos a verle!"]
      ],
      copo_hola: [
        ["copo", "Vaya, vaya. Un viajero del Mercado. Y con una chispa de luz al lado."],
        ["copo", "Yo soy Copo. Llevo en este valle m\xE1s inviernos de los que puedo contar."],
        ["copo", "Un tal Prisas lo ha congelado todo. Aqu\xED nadie quiere esperar a que nada crezca."],
        ["copo", "Te ense\xF1ar\xE9 un truco muy viejo. Toma: tres semillas de invierno."]
      ],
      copo_semillas: [
        ["copo", "Pl\xE1ntalas en el huerto de la izquierda. Crecen bajo la nieve."],
        ["chispin", "\xA1Tres semillas! \xA1Vamos al huerto!"]
      ],
      parcela_ocupada: [
        ["chispin", "Aqu\xED ya hay un brote. Busca un hueco libre."]
      ],
      plantadas: [
        ["chispin", "\xA1Las tres plantadas! Ahora toca esperar."]
      ],
      hay_frutos: [
        ["chispin", "\xA1Mira! Cada brote tiene un fruto de invierno. \xA1Toca uno para cosechar!"]
      ],
      cosecha: [
        ["chispin", "\xA1{n} frutos! Y tus {p} brotes siguen ah\xED, listos para dar m\xE1s."]
      ],
      replantado: [
        ["chispin", "\xA1Plantados {n} brotes nuevos! Ahora tienes {p} brotes en el huerto."]
      ],
      vendido: [
        ["chispin", "Hemos ganado {m} monedas. El huerto sigue igual que antes."]
      ],
      huerto_lleno: [
        ["chispin", "\xA1El huerto est\xE1 lleno! Los {v} frutos que no caben los vendemos por {m} monedas."]
      ],
      copo_llama: [
        ["copo", "\xA1Eh, peque\xF1o! Ven al castillo. Quiero ense\xF1arte algo."]
      ],
      copo_reloj: [
        ["copo", "Empezaste con tres semillas y ahora tienes {p} brotes."],
        ["copo", "Mira mi reloj de arena. Te ense\xF1a lo que pasa con el tiempo."]
      ],
      copo_bola: [
        ["copo", "Eso tiene nombre: inter\xE9s compuesto. Lo que ganas tambi\xE9n gana."],
        ["copo", "Al principio parece poco. Pero si le das tiempo, crece como una bola de nieve rodando cuesta abajo."]
      ],
      brotin_nace: [
        ["chispin", "\xA1Mira! \xA1Algo se mueve entre los brotes!"],
        ["chispin", "\xA1Es una criatura! Se llama Brot\xEDn y quiere venir con nosotros."]
      ],
      victoria_copo: [
        ["copo", "Mira el huerto. Ya no est\xE1 helado."],
        ["copo", "Prisas no soporta las cosas que crecen despacio. Volver\xE1, ya lo ver\xE1s."]
      ],
      charla_hogaza: [
        ["hogaza", "\xA1Suerte en el Valle! Abr\xEDgate."]
      ],
      charla_tasador: [
        ["tasador", "En el Valle dicen que el tiempo vale m\xE1s que el oro."]
      ],
      charla_antojo: [
        ["antojo", "\xBFAl Valle? All\xED no hay chuches\u2026 creo."]
      ],
      charla_semilla: [
        ["semilla", "Copo era amigo de tu abuelo. Sal\xFAdale de mi parte."]
      ],
      charla_yunque: [
        ["yunque", "Lleva tu regadera. En el Valle tambi\xE9n se riega."]
      ],
      charla_copo: [
        ["copo", "Sin prisa, peque\xF1o. Lo bueno crece despacio."]
      ],
      charla_raiz: [
        ["raiz", "Mi casa la levant\xF3 mi bisabuela, piedra a piedra. Todav\xEDa me abriga."]
      ],
      charla_anillos: [
        ["anillos", "Cada anillo de un tronco es un a\xF1o que el \xE1rbol aguant\xF3."]
      ],
      charla_escarcha: [
        ["escarcha", "\xA1Ziiim! \xBFMe ves patinar? Llevo todo el invierno practicando."]
      ],
      charla_prisas: [
        ["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1Lo quiero todo YA!"]
      ]
    }
  };
  var Bi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 5. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_escarcha: "Alguien patina en el lago helado",
      plantar_arbol: "Planta la semilla del \xE1rbol en el claro",
      ir_raiz: "Ra\xEDz quiere ense\xF1arte su casa",
      ir_anillos: "Anillos sabe leer los troncos",
      cosechar_arbol: "\xA1El \xE1rbol del tiempo est\xE1 cargado!",
      ir_copo: "Cu\xE9ntaselo a Copo",
      victoria: "\xA1El centro del Valle brilla!"
    },
    textos: {
      noche_inicio: "El hielo del lago cruje",
      recuerdo: "Si replantas 3 semillas y cada una da otra, \xBFcu\xE1ntas tienes?",
      r_tres: "3",
      r_seis: "6",
      r_cero: "Ninguna",
      r_bien: "\xA1Eso es! Las 3 de antes y las 3 nuevas: 6.",
      r_mal: "Casi. Las 3 de antes siguen ah\xED y adem\xE1s salen 3 nuevas: 6.",
      noche_arbol_1: "El \xE1rbol echa sus primeras hojas",
      noche_arbol_2: "El tronco se hace m\xE1s fuerte",
      noche_arbol_3: "Las ramas llegan muy alto",
      noche_arbol_4: "El \xE1rbol del tiempo se llena de frutos",
      oferta_titulo: "\xA1Prisas quiere tu \xE1rbol!",
      esperar: "Esperar a que crezca",
      vender: "Vend\xE9rselo por {n} monedas",
      si_esperas: "Si hubieras esperado\u2026",
      fila_prisas: "Prisas",
      fila_arbol: "\xC1rbol",
      si_esperas_frase: "Prisas paga r\xE1pido, pero poco. El \xE1rbol tarda, pero da much\xEDsimo m\xE1s.",
      anillos_titulo: "Los anillos del \xE1rbol",
      anillo_1: "Un anillo: una ramita.",
      anillo_2: "Dos anillos: un tronco fino.",
      anillo_3: "Tres anillos: un \xE1rbol que da sombra.",
      anillo_4: "Cuatro anillos: un \xE1rbol lleno de frutos.",
      anillos_frase: "Ning\xFAn \xE1rbol se salta un anillo. Por eso los grandes son tan valiosos.",
      comparar_titulo: "Prisas o el tiempo",
      comparar_frase: "Al principio Prisas parec\xEDa pagar m\xE1s. Pero el \xE1rbol, con tiempo, dio el doble.",
      pregunta: "\xBFQu\xE9 hizo que el \xE1rbol diera tantos frutos?",
      resp_tiempo: "Darle tiempo",
      resp_rapido: "Venderlo r\xE1pido",
      resp_suerte: "La suerte",
      fb_bien: "\xA1Eso es! El \xE1rbol necesitaba estaciones. Quien espera, recoge m\xE1s.",
      fb_mal: "Casi. Lo que lo hizo crecer fue esperar estaci\xF3n tras estaci\xF3n.",
      medalla: "Medalla de Copo",
      medalla_texto: "No le vendiste tu tiempo a Prisas. \xA1El centro del Valle vuelve a brillar!",
      icono_medalla: "medalla_copo",
      pagina_numero: "p\xE1gina 5",
      pagina: "Los \xE1rboles que dan sombra los plant\xF3 alguien que supo esperar.",
      reto_familia: "Plantad juntos una semilla en un vaso y apuntad cada semana cu\xE1nto mide."
    },
    dialogos: {
      llega_escarcha: [
        ["chispin", "\xA1Ziiim! \xBFHas o\xEDdo eso? Alguien patina en el lago."]
      ],
      escarcha_hola: [
        ["escarcha", "\xA1Hola! Soy Escarcha. Copo me ha contado lo de tu huerto."],
        ["escarcha", "A ver si te acuerdas\u2026"]
      ],
      escarcha_semilla: [
        ["escarcha", "Toma esta semilla. Es de un \xE1rbol del tiempo."],
        ["escarcha", "Pl\xE1ntala en el claro, junto al camino. Tarda mucho\u2026 pero merece la pena."]
      ],
      arbol_plantado: [
        ["chispin", "\xA1Plantado! Es una ramita chiquitita."]
      ],
      arbol_otra_vez: [
        ["chispin", "Otra ramita. Esta vez la cuidaremos hasta el final."]
      ],
      mirar_arbol: [
        ["chispin", "Crece despacio, pero no para."]
      ],
      prisas_oferta_1: [
        ["prisas", "\xA1Ja! \xA1Qu\xE9 ramita m\xE1s rid\xEDcula! Tardar\xE1 siglos."],
        ["prisas", "Te la compro YA por {n} monedas. \xA1R\xE1pido, que me voy!"]
      ],
      prisas_oferta_2: [
        ["prisas", "\xBFTodav\xEDa esperando? \xA1Qu\xE9 aburrido!"],
        ["prisas", "Venga, {n} monedas. \xA1Es mi \xFAltima oferta! Bueno\u2026 casi."]
      ],
      prisas_oferta_3: [
        ["prisas", "\xA1Grrr! \xA1Est\xE1 creciendo!"],
        ["prisas", "\xA1{n} monedas! \xA1Ahora mismo! \xA1Ma\xF1ana ya no!"]
      ],
      prisas_rabia: [
        ["prisas", "\xA1Bah! \xA1Esperar es de tortugas!"]
      ],
      prisas_corta: [
        ["prisas", "\xA1Trato hecho! Toma tus {n} monedas."],
        ["prisas", "\xA1Je! Me llevo el \xE1rbol. \xA1Zas!"],
        ["chispin", "\xA1Se lo ha llevado de cuajo! Ya no crecer\xE1 m\xE1s\u2026"]
      ],
      escarcha_otra: [
        ["escarcha", "No pasa nada. Yo tambi\xE9n me ca\xED mil veces patinando."],
        ["escarcha", "Toma otra semilla. \xBFLo intentamos otra vez?"]
      ],
      raiz_llama: [
        ["raiz", "\xA1Eh, t\xFA! El del arbolito. Ven a mi casa un momento."]
      ],
      raiz_hola: [
        ["raiz", "Soy Ra\xEDz. Esta casa la construy\xF3 mi bisabuela."],
        ["raiz", "Tard\xF3 a\xF1os. Todos le dec\xEDan que se diera prisa."],
        ["raiz", "Y aqu\xED sigue, cien inviernos despu\xE9s, abrigando a mi familia."],
        ["chispin", "Lo que se hace despacio puede durar much\xEDsimo."]
      ],
      anillos_llama: [
        ["anillos", "\xA1Psst! Ven a mi taller. Te ense\xF1o un secreto de los troncos."]
      ],
      anillos_hola: [
        ["anillos", "Soy Anillos, el carpintero. Mira este tronco."],
        ["anillos", "Cada anillo es una estaci\xF3n que el \xE1rbol aguant\xF3."]
      ],
      arbol_grande: [
        ["chispin", "\xA1Mira el \xE1rbol! \xA1Est\xE1 enorme y lleno de frutos!"],
        ["chispin", "\xA1Toca el \xE1rbol para cosechar!"]
      ],
      cosecha_grande: [
        ["chispin", "\xA1{n} frutos! \xA1Es la cosecha m\xE1s grande que hemos visto!"]
      ],
      copo_llama: [
        ["copo", "Peque\xF1o, ven al castillo. Esto hay que celebrarlo."]
      ],
      copo_medalla: [
        ["copo", "Prisas te ofreci\xF3 monedas r\xE1pidas. Y t\xFA elegiste el tiempo."],
        ["copo", "Eso es muy dif\xEDcil. Muchos mayores no lo consiguen."]
      ],
      victoria_valle: [
        ["copo", "\xBFLo ves? El centro del Valle ya no est\xE1 helado."],
        ["chispin", "Pero Prisas sigue por aqu\xED\u2026 Seguro que trama algo."]
      ],
      charla_copo: [
        ["copo", "Sin prisa, peque\xF1o. Lo bueno crece despacio."]
      ],
      charla_raiz: [
        ["raiz", "Mi casa la levant\xF3 mi bisabuela, piedra a piedra. Todav\xEDa me abriga."]
      ],
      charla_anillos: [
        ["anillos", "Cada anillo de un tronco es un a\xF1o que el \xE1rbol aguant\xF3."]
      ],
      charla_escarcha: [
        ["escarcha", "\xA1Ziiim! \xBFMe ves patinar? Llevo todo el invierno practicando."]
      ],
      charla_prisas: [
        ["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1Lo quiero todo YA!"]
      ]
    }
  };
  var Li = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 6. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_copo: "Pregunta a Copo qu\xE9 hacer con la cosecha",
      victoria: "\xA1Todo el Valle vuelve a brillar!"
    },
    textos: {
      noche_inicio: "El cielo se pone muy oscuro",
      lugares_titulo: "Tres sitios para guardar",
      l_huerto: "El huerto: crece mucho, pero las heladas lo queman.",
      l_tierras: "Las tierras de labor: crecen despacio, pero aguantan.",
      l_cueva: "La cueva: no crece nada, pero all\xED nada se estropea.",
      lugares_frase: "No s\xE9 si vendr\xE1 la helada ni cu\xE1ndo. Por eso no lo pongo todo en el mismo sitio.",
      repartir_titulo: "Reparte tus {n} sacos",
      repartir_nota: "Usa + y \u2212 para decidir cu\xE1ntos van a cada sitio.",
      o_huerto: "Huerto",
      o_tierras: "Tierras",
      o_cueva: "Cueva",
      noche_helada: "\xA1Llega la Gran Helada!",
      noche_primavera: "Por fin se derrite la nieve",
      tabla_titulo: "Despu\xE9s de la helada",
      fila_tuyo: "Lo tuyo",
      fila_huerto: "Todo huerto",
      fila_cueva: "Todo cueva",
      tabla_frase_reparto: "Como lo repartiste, la helada no pudo contigo. Y en primavera, lo tuyo volvi\xF3 a crecer.",
      tabla_frase_todo: "Con todo en un sitio, una sola helada te lo puede quitar. Repartido, siempre algo aguanta.",
      pregunta: "\xBFPor qu\xE9 Copo no lo pone todo en el huerto?",
      resp_repartir: "Si algo va mal, no lo pierde todo",
      resp_todo: "Porque el huerto es aburrido",
      resp_nada: "Para que no crezca nada",
      fb_bien: "\xA1Eso es! Si lo repartes, una helada no se lo lleva todo.",
      fb_mal: "Casi. Copo reparte porque nadie sabe cu\xE1ndo llega la helada: as\xED, algo siempre aguanta.",
      medalla: "Medalla del Refugio",
      medalla_texto: "Repartiste tu cosecha y la helada no pudo contigo. \xA1Todo el Valle de la Nieve vuelve a brillar!",
      icono_medalla: "medalla_refugio",
      pagina_numero: "p\xE1gina 6",
      pagina: "No pongas todos los huevos en la misma cesta. Si una se cae, te quedan las otras.",
      reto_familia: "Jugad a esconder 10 garbanzos en 3 tazas. Uno \xABroba\xBB una taza al azar: \xBFcu\xE1ntos os quedan si estaban todos juntos? \xBFY repartidos?"
    },
    dialogos: {
      prisas_helada: [
        ["prisas", "\xA1Je, je! \xBFSabes qu\xE9 viene? \xA1La GRAN HELADA!"],
        ["prisas", "Hazme caso: mete toda tu cosecha en el huerto. \xA1Crece el doble! \xA1R\xE1pido!"],
        ["prisas", "\xA1Ya ver\xE1s qu\xE9 risa cuando se congele todo!"]
      ],
      chispin_copo: [
        ["chispin", "Hmm\u2026 No me f\xEDo de Prisas. Vamos a preguntarle a Copo."]
      ],
      copo_sacos: [
        ["copo", "Con los frutos de tu \xE1rbol he llenado {n} sacos de semilla."],
        ["copo", "Y s\xED, viene una helada. Lo que no sabe nadie es cu\xE1ndo, ni c\xF3mo de fuerte."],
        ["copo", "Mira d\xF3nde guardo yo las cosas."]
      ],
      repartido: [
        ["chispin", "Hecho: {h} al huerto, {t} a las tierras y {c} a la cueva."]
      ],
      helada: [
        ["chispin", "\xA1Brrr! La helada ha quemado la mitad del huerto: de {h} sacos quedan {h1}."],
        ["chispin", "Las tierras aguantan sus {t} y la cueva guarda sus {c}. Nos quedan {n} sacos."]
      ],
      primavera: [
        ["chispin", "\xA1La primavera despierta todo! El huerto crece hasta {h2} y las tierras dan {t2}."],
        ["chispin", "Con los {c} de la cueva, \xA1tenemos {n} sacos!"]
      ],
      cobras: [
        ["copo", "Te cambio tus sacos por {n} monedas. Has hecho un buen trabajo."]
      ],
      escudon_nace: [
        ["chispin", "\xA1Algo sale de la cueva! Tiene un caparaz\xF3n duro como una piedra."],
        ["chispin", "\xA1Es Escud\xF3n! Le gusta proteger las cosas. \xA1Viene con nosotros!"]
      ],
      victoria_tierras: [
        ["copo", "Las tierras de labor brillan otra vez."]
      ],
      valle_brilla: [
        ["copo", "El Valle entero se ha descongelado."],
        ["copo", "Tu abuelo estar\xEDa orgulloso. \xC9l tambi\xE9n sab\xEDa esperar y repartir."]
      ],
      prisas_huye: [
        ["prisas", "\xA1Grrr! \xA1Aqu\xED ya nadie tiene prisa!"],
        ["prisas", "\xA1Me voy a la Ciudad de las Empresas! \xA1All\xED todos corren!"],
        ["chispin", "\xA1Ha escapado por el camino del sur! Alg\xFAn d\xEDa iremos tras \xE9l."]
      ],
      charla_copo: [
        ["copo", "Sin prisa, peque\xF1o. Lo bueno crece despacio."]
      ],
      charla_raiz: [
        ["raiz", "Mi casa la levant\xF3 mi bisabuela, piedra a piedra. Todav\xEDa me abriga."]
      ],
      charla_anillos: [
        ["anillos", "Cada anillo de un tronco es un a\xF1o que el \xE1rbol aguant\xF3."]
      ],
      charla_escarcha: [
        ["escarcha", "\xA1Ziiim! \xBFMe ves patinar? Llevo todo el invierno practicando."]
      ],
      charla_prisas: [
        ["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1Lo quiero todo YA!"]
      ]
    }
  };
  var Si = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 7. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_ciudad: "Sigue el camino del sur hasta la Ciudad",
      ir_lupa: "Lupa te espera en su agencia de detectives",
      ir_fiel: "Ve a la zapater\xEDa de Fiel, la de la cola",
      ir_cuenta: "Cuenta guarda el libro de la zapater\xEDa",
      volver_fiel: "Fiel quiere proponerte algo",
      victoria: "\xA1La zapater\xEDa vuelve a brillar!"
    },
    textos: {
      viaje_titulo: "Ciudad de las Empresas",
      viaje_sub: "Donde cada taller guarda un secreto",
      coser_titulo: "\xA1A coser!",
      coser_boton: "\xA1Coser!",
      libro_titulo: "El libro de un d\xEDa de Fiel",
      libro_entra: "Entran 10 monedas: los zapatos que vende.",
      libro_cuero: "Salen 4 monedas: el cuero.",
      libro_alquiler: "Salen 2 monedas: el alquiler del local.",
      libro_queda: "Quedan 4 monedas: lo que gana Fiel.",
      libro_frase: "Un taller bueno gana m\xE1s de lo que gasta. Lo que sobra es su ganancia.",
      pregunta_libro: "\xBFCu\xE1nto gana Fiel en un d\xEDa?",
      r_cuatro: "4 monedas",
      r_diez: "10 monedas",
      r_seis: "6 monedas",
      r_bien: "\xA1Eso es! Entran 10, salen 6: quedan 4.",
      r_mal: "Casi. Entran 10 y salen 6 (cuero y alquiler): quedan 4.",
      trocito_titulo: "Un trocito de la zapater\xEDa",
      comprar_trocito: "Comprar un trocito ({n} monedas)",
      ahora_no: "Ahora no",
      noche_maquina: "La m\xE1quina nueva cose sin parar",
      pregunta: "\xBFQu\xE9 significa tener un trocito de la zapater\xEDa?",
      resp_duena: "Ser due\xF1o de una parte",
      resp_cliente: "Tener zapatos gratis",
      resp_prestar: "Prestarle monedas a Fiel",
      fb_bien: "\xA1Eso es! Eres due\xF1o de una parte del taller: si le va bien, te toca tu parte.",
      fb_mal: "Casi. Un trocito te hace due\xF1o de una parte del taller, y te toca una parte de lo que gana.",
      medalla: "Medalla \xABSocio\xBB",
      medalla_texto: "Ya eres due\xF1o de un trocito de un taller. \xA1La zapater\xEDa vuelve a brillar!",
      icono_medalla: "medalla_socio",
      pagina_numero: "p\xE1gina 7",
      pagina: "Detr\xE1s de cada cosa que usas hay alguien que la hace. Puedes ser due\xF1o de un trocito de ese trabajo.",
      reto_familia: "Elegid tres cosas que us\xE9is cada d\xEDa (unas zapatillas, unos cereales, un juego) y averiguad juntos qu\xE9 empresa las hace."
    },
    dialogos: {
      chispin_sur: [
        ["chispin", "\xA1Prisas se ha ido por el camino del sur, hacia la Ciudad de las Empresas!"],
        ["chispin", "Dicen que all\xED todo el mundo corre. Baja hasta el final del camino."]
      ],
      llegada_ciudad: [
        ["chispin", "\xA1Cu\xE1ntos talleres! Pero todo est\xE1 gris\u2026"],
        ["chispin", "Menos ese edificio dorado de ah\xED. \xBFC\xF3mo puede brillar tanto?"]
      ],
      prisas_bazar: [
        ["prisas", "\xA1Fachada, Fachada! \xA1Esc\xF3ndeme en tu bazar!"]
      ],
      lupa_llama: [
        ["lupa", "\xA1Psst! \xA1T\xFA, el de la chispa! Ven a mi agencia."]
      ],
      lupa_hola: [
        ["lupa", "Soy Lupa, detective. Llevo tiempo vigilando ese bazar dorado."],
        ["lupa", "Necesito una ayudante\u2026 o un ayudante. \xBFTe apuntas?"],
        ["lupa", "Primer caso: averiguar qu\xE9 es de verdad un taller."],
        ["lupa", "Empieza por la zapater\xEDa de Fiel. Siempre hay cola en su puerta: algo har\xE1 bien."]
      ],
      fiel_hola: [
        ["fiel", "\xA1Hola! \xBFVienes a ayudar? Hoy tengo much\xEDsimos encargos."],
        ["fiel", "Te pago por cada zapato que cosas. \xA1Cuidado con los puntos!"]
      ],
      fiel_paga: [
        ["fiel", "\xA1Buen trabajo! Toma tus {n} monedas."],
        ["fiel", "Si quieres saber c\xF3mo va mi taller, preg\xFAntale a Cuenta. \xC9l lleva mis n\xFAmeros."]
      ],
      cuenta_hola: [
        ["cuenta", "Buenas. Soy Cuenta. Apunto todo lo que entra y todo lo que sale."],
        ["cuenta", "Mira el libro de un d\xEDa de Fiel."]
      ],
      cuenta_manda: [
        ["cuenta", "Por cierto, Fiel quer\xEDa hablar contigo. Creo que tiene una idea."]
      ],
      fiel_maquina: [
        ["fiel", "Quiero comprar una m\xE1quina de coser nueva. Con ella har\xEDa el doble de zapatos."],
        ["fiel", "Pero no tengo todas las monedas. As\xED que he partido mi zapater\xEDa en 4 trocitos."],
        ["fiel", "Si me compras uno, ser\xE1s due\xF1o de un trocito. Y cuando el taller gane, te tocar\xE1 tu parte."]
      ],
      comprado: [
        ["fiel", "\xA1Trato hecho, socio! Ahora una cuarta parte de lo que gane es tuya."]
      ],
      no_comprado: [
        ["fiel", "No pasa nada. Cuenta me ha comprado ese trocito."]
      ],
      maquina_nueva: [
        ["chispin", "\xA1Mira la cola! Con la m\xE1quina nueva, Fiel cose el doble de zapatos."],
        ["fiel", "\xA1Esta estaci\xF3n he ganado 8 monedas!"]
      ],
      fiel_reparte: [
        ["fiel", "Y t\xFA tienes un trocito de cuatro\u2026 as\xED que te tocan {n} monedas. \xA1Toma!"],
        ["chispin", "\xA1Hemos ganado monedas sin coser nada!"]
      ],
      cuenta_cobra: [
        ["cuenta", "Mi trocito me ha dado {n} monedas esta estaci\xF3n. Y yo sin coser un zapato."],
        ["chispin", "Vaya\u2026 la pr\xF3xima vez nos lo pensamos."]
      ],
      lupa_nombre: [
        ["lupa", "\xBFLo has visto, ayudante? Un taller es algo que la gente quiere, y que gana m\xE1s de lo que gasta."],
        ["lupa", "Y eso que compraste tiene nombre: una acci\xF3n. Eres due\xF1o de un trocito del taller."]
      ],
      victoria_fiel: [
        ["fiel", "\xA1La zapater\xEDa vuelve a tener color!"],
        ["lupa", "Primer caso resuelto. Pero ese bazar dorado\u2026 me huele raro."]
      ],
      charla_lupa: [
        ["lupa", "Un buen detective nunca se f\xEDa de la puerta. Mira dentro."]
      ],
      charla_fiel: [
        ["fiel", "Mis clientes vuelven porque mis zapatos duran. As\xED de sencillo."]
      ],
      charla_engranaje: [
        ["engranaje", "\xA1Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve."]
      ],
      charla_cuenta: [
        ["cuenta", "Los n\xFAmeros no mienten. Las fachadas, a veces s\xED."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mira c\xF3mo brilla mi bazar! \xBFPara qu\xE9 quieres ver dentro?"]
      ],
      charla_prisas: [
        ["prisas", "\xA1Corre, corre! \xA1Aqu\xED todo va deprisa!"]
      ]
    }
  };
  var Gi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 8. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_cuenta: "Cuenta te presta los libros de los talleres",
      investigar: "Investiga los tres talleres con la lupa",
      ir_lupa: "Cu\xE9ntale a Lupa lo que has descubierto",
      victoria: "\xA1El taller de Engranaje brilla!"
    },
    textos: {
      noche_inicio: "Fachada pinta su bazar todav\xEDa m\xE1s dorado",
      cuaderno_titulo: "Tu cuaderno de detective",
      col_clientes: "Clientes",
      col_producto: "Producto",
      col_cuentas: "Cuentas",
      cuaderno_frase: "El bazar brilla mucho por fuera\u2026 pero dentro no aguanta ni una pista.",
      elegir_titulo: "\xBFD\xF3nde compras un trocito?",
      op_engranaje: "Taller de Engranaje ({n} monedas)",
      op_bazar: "Gran Bazar Brillante ({n} monedas)",
      op_nada: "No comprar ninguno",
      noche_bazar: "Una noche en la Ciudad\u2026",
      noche_engranaje: "Engranaje trabaja toda la noche",
      pregunta: "\xBFQu\xE9 miras antes de comprar un trocito de un taller?",
      resp_dentro: "Sus clientes, lo que hace y sus cuentas",
      resp_bonito: "Lo bonito que es por fuera",
      resp_barato: "Lo barato que es",
      fb_bien: "\xA1Eso es! Clientes que vuelven, un producto que mejora y cuentas que ganan. Lo de fuera da igual.",
      fb_mal: "Casi. Lo de fuera puede enga\xF1ar: hay que mirar los clientes, el producto y las cuentas.",
      medalla: "Medalla \xABOjo de detective\xBB",
      medalla_texto: "Miraste dentro antes de invertir. \xA1El taller de Engranaje vuelve a brillar!",
      icono_medalla: "medalla_detective",
      pagina_numero: "p\xE1gina 8",
      pagina: "No todo lo que brilla es oro. Antes de confiar tu dinero, mira dentro.",
      reto_familia: "Mirad juntos dos anuncios. \xBFQu\xE9 os ense\xF1an de verdad del producto y qu\xE9 es solo brillo?"
    },
    pistas: {
      fiel: {
        titulo: "La zapater\xEDa de Fiel",
        corto: "Zapater\xEDa",
        icono: "zapato",
        lista: [
          ["gente_2", "\xBFVuelven los clientes?", "S\xED: la se\xF1ora de la cola viene cada a\xF1o a por sus botas.", !0],
          ["zapato", "\xBFEs bueno lo que hace?", "S\xED: unas botas de Fiel duran cinco inviernos.", !0],
          ["libro", "\xBFGana m\xE1s de lo que gasta?", "S\xED: entran 20 monedas, salen 12. Quedan 8.", !0]
        ]
      },
      engranaje: {
        titulo: "El taller de Engranaje",
        corto: "Inventos",
        icono: "rueda",
        lista: [
          ["gente_3", "\xBFVuelven los clientes?", "S\xED: cada vez tiene m\xE1s, y vuelven a por el invento nuevo.", !0],
          ["maquina", "\xBFEs bueno lo que hace?", "S\xED: cada temporada mejora sus m\xE1quinas.", !0],
          ["libro", "\xBFGana m\xE1s de lo que gasta?", "S\xED, aunque poco: casi todo lo gasta en inventar cosas mejores.", !0]
        ]
      },
      fachada: {
        titulo: "El Gran Bazar Brillante",
        corto: "Bazar",
        icono: "bazar",
        lista: [
          ["gente_1", "\xBFVuelven los clientes?", "No: en la puerta no hay nadie. Quien compra una vez, no repite.", !1],
          ["bazar", "\xBFEs bueno lo que hace?", "No: sus juguetes son de cart\xF3n pintado y se rompen enseguida.", !1],
          ["libro", "\xBFGana m\xE1s de lo que gasta?", "No: entran 5 monedas y salen 15. \xA1Todo se va en pintura dorada!", !1]
        ]
      }
    },
    dialogos: {
      fachada_presume: [
        ["fachada", "\xA1Bienvenidos al Gran Bazar Brillante! \xA1El taller m\xE1s dorado de Valoria!"],
        ["fachada", "\xA1Vendo trocitos de mi bazar por solo {n} monedas! \xA1Y te regalo una pegatina dorada!"]
      ],
      lupa_caso: [
        ["lupa", "Segundo caso, ayudante: antes de comprar un trocito, se investiga."],
        ["lupa", "Ve a ver a Cuenta. \xC9l tiene los libros de todos los talleres."]
      ],
      cuenta_libros: [
        ["cuenta", "\xBFInvestigando? Toma los libros de la zapater\xEDa, del taller de Engranaje y del bazar."],
        ["cuenta", "Haz tres preguntas en cada taller: \xBFvuelven los clientes?, \xBFes bueno lo que hace? y \xBFgana m\xE1s de lo que gasta?"]
      ],
      antes_fiel: [
        ["fiel", "\xBFInvestigando mi taller? \xA1Adelante, no tengo nada que esconder!"]
      ],
      antes_engranaje: [
        ["engranaje", "\xA1Hola! Pasa, pasa, pero no toques esa palanca. Bueno, t\xF3cala: \xA1es un invento nuevo!"]
      ],
      antes_fachada: [
        ["fachada", "\xBFMirar dentro? \xA1Pero si lo bonito est\xE1 fuera!"],
        ["fachada", "Bueno\u2026 mira r\xE1pido, que tengo prisa."]
      ],
      faltan: [
        ["chispin", "Nos faltan {n} por investigar."]
      ],
      a_lupa: [
        ["chispin", "\xA1Ya lo tenemos todo apuntado! Vamos a cont\xE1rselo a Lupa."]
      ],
      lupa_eliges: [
        ["lupa", "Buen trabajo, ayudante. Ahora decides t\xFA: \xBFd\xF3nde compras un trocito?"]
      ],
      lupa_otra_vez: [
        ["lupa", "Por fuera brillaba mucho, \xBFverdad? Mira otra vez tu cuaderno."],
        ["lupa", "Todos los detectives se equivocan alguna vez. Lo importante es aprender."]
      ],
      bazar_comprado: [
        ["fachada", "\xA1Trato hecho! Toma tu pegatina dorada. \xA1Je, je!"]
      ],
      bazar_cierra: [
        ["chispin", "\xA1El bazar ha cerrado! Hay un cartel en la puerta."],
        ["fachada", "\xA1Cosas que pasan! Tu trocito ya no vale nada. \xA1Pero qu\xE9 bonita la pegatina!"],
        ["chispin", "Hemos perdido {n} monedas\u2026"]
      ],
      engranaje_comprado: [
        ["engranaje", "\xA1Socio nuevo! Con tus monedas termino mi mejor invento."]
      ],
      engranaje_mejora: [
        ["engranaje", "\xA1Mira! Una regadera que se pliega y cabe en el bolsillo."],
        ["chispin", "\xA1Hay cola en el taller de Engranaje! Cada vez viene m\xE1s gente."]
      ],
      nada: [
        ["lupa", "No comprar tambi\xE9n es una decisi\xF3n. Lo importante es que ya sabes mirar dentro."]
      ],
      bazar_repintado: [
        ["chispin", "Fachada ya ha vuelto a abrir\u2026 y ha pintado su bazar todav\xEDa m\xE1s dorado."],
        ["lupa", "Por fuera, siempre igual de bonito. Por dentro, siempre igual de vac\xEDo."]
      ],
      victoria_lupa: [
        ["lupa", "Segundo caso resuelto. Ahora sabes mirar detr\xE1s de una fachada."]
      ],
      charla_lupa: [
        ["lupa", "Un buen detective nunca se f\xEDa de la puerta. Mira dentro."]
      ],
      charla_fiel: [
        ["fiel", "Mis clientes vuelven porque mis zapatos duran. As\xED de sencillo."]
      ],
      charla_engranaje: [
        ["engranaje", "\xA1Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve."]
      ],
      charla_cuenta: [
        ["cuenta", "Los n\xFAmeros no mienten. Las fachadas, a veces s\xED."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mira c\xF3mo brilla mi bazar! \xBFPara qu\xE9 quieres ver dentro?"]
      ],
      charla_prisas: [
        ["prisas", "\xA1Corre, corre! \xA1Aqu\xED todo va deprisa!"]
      ]
    }
  };
  var Vi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 9. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_lupa: "Lupa tiene un \xFAltimo caso para ti",
      ir_plaza: "Ve a la plaza de la fuente y mira a la gente",
      volver_lupa: "Cu\xE9ntale a Lupa d\xF3nde hace cola la gente",
      victoria: "\xA1Toda la Ciudad vuelve a brillar!"
    },
    textos: {
      noche_inicio: "Aparece un quiosco nuevo en la Ciudad",
      tienda_titulo: "Compra tus trocitos",
      noche_1: "Pasa la primera estaci\xF3n",
      noche_2: "Pasa la segunda estaci\xF3n",
      noche_3: "Pasa la tercera estaci\xF3n",
      noche_4: "Pasa la cuarta estaci\xF3n",
      tabla_titulo: "Lo que vale cada trocito",
      tabla_frase: "Los talleres que conoces crecen poco a poco. Rel\xE1mpago subi\xF3 muy deprisa\u2026 y se hundi\xF3.",
      pregunta: "\xBFEn qu\xE9 trocitos conviene invertir?",
      resp_conozco: "En talleres que conozco y s\xE9 explicar",
      resp_sube: "En lo que m\xE1s sube esta semana",
      resp_brilla: "En lo que m\xE1s brilla",
      fb_bien: "\xA1Eso es! Si sabes explicar qu\xE9 hace y por qu\xE9 la gente lo quiere, sabes lo que tienes.",
      fb_mal: "Casi. Lo que sube deprisa o brilla mucho puede caer. Mejor lo que conoces y sabes explicar.",
      medalla: "Medalla de Lupa",
      medalla_texto: "Inviertes en lo que conoces. \xA1Toda la Ciudad de las Empresas vuelve a brillar!",
      icono_medalla: "medalla_lupa",
      pagina_numero: "p\xE1gina 9",
      pagina: "Invierte en lo que conoces. Si no puedes explicarlo con tus palabras, todav\xEDa no es para ti.",
      reto_familia: "Elegid juntos una empresa que conozc\xE1is y explicad en dos frases qu\xE9 hace y por qu\xE9 la gente le compra."
    },
    nombres: {
      fiel: "Zapater\xEDa",
      engranaje: "Inventos",
      horno: "Horno",
      fragua: "Fragua",
      relampago: "Rel\xE1mpago"
    },
    explicar: {
      horno: {
        pregunta: "\xBFQu\xE9 hace el horno de Hogaza?",
        opciones: [
          ["pan", "Pan que la gente compra cada d\xEDa"],
          ["chuches", "Chuches gigantes"],
          ["nose", "No lo s\xE9"]
        ],
        correcta: "pan",
        bien: "\xA1Eso es! Lo conoces del Mercado: siempre hay alguien comprando pan.",
        mal: "Casi. Hogaza hace pan, y la gente lo compra cada d\xEDa."
      },
      fragua: {
        pregunta: "\xBFQu\xE9 hace la fragua de Yunque?",
        opciones: [
          ["herramientas", "Herramientas que duran a\xF1os"],
          ["pintura", "Pintura dorada"],
          ["nose", "No lo s\xE9"]
        ],
        correcta: "herramientas",
        bien: "\xA1Eso es! Tu regadera de hierro lo demuestra.",
        mal: "Casi. Yunque hace herramientas fuertes, como las regaderas de hierro."
      },
      relampago: {
        pregunta: "\xBFQu\xE9 hace la Compa\xF1\xEDa Rel\xE1mpago?",
        opciones: [
          ["rayos", "Fabrica rayos de verdad"],
          ["pan", "Hace pan"],
          ["nose", "No s\xE9 explicarlo"]
        ],
        correcta: "nose",
        bien: "Exacto: nadie sabe qu\xE9 hace. Solo que \xABsube\xBB.",
        mal: "Pi\xE9nsalo bien: \xBFalguien sabe qu\xE9 hace? Nadie. Solo que \xABsube\xBB."
      }
    },
    tienda: [{
      id: "horno",
      nombre: "Trocito del horno",
      precio: 6,
      icono: "pan"
    }, {
      id: "fragua",
      nombre: "Trocito de la fragua",
      precio: 6,
      icono: "yunque"
    }, {
      id: "relampago",
      nombre: "Trocito de Rel\xE1mpago",
      precio: 6,
      icono: "relampago"
    }],
    dialogos: {
      prisas_relampago: [
        ["prisas", "\xA1Compa\xF1\xEDa Rel\xE1mpago! \xA1La que m\xE1s sube de toda Valoria!"],
        ["prisas", "\xBFQue qu\xE9 hace? \xA1Qu\xE9 m\xE1s da! \xA1Sube sin parar! \xA1Compra ya, ya, ya!"]
      ],
      chispin_lupa: [
        ["chispin", "Hmm\u2026 Vamos a preguntarle a Lupa."]
      ],
      lupa_colas: [
        ["lupa", "\xDAltimo caso, ayudante. Los mejores detectives miran lo que tienen delante."],
        ["lupa", "Ve a la plaza de la fuente y f\xEDjate: \xBFd\xF3nde hace cola la gente?"]
      ],
      plaza_colas: [
        ["chispin", "Desde aqu\xED se ve todo. Hay cola en la zapater\xEDa de Fiel y en el taller de Engranaje."],
        ["chispin", "En el bazar de Fachada no hay nadie. Y en el quiosco de Rel\xE1mpago\u2026 solo est\xE1 Prisas gritando."]
      ],
      lupa_conoces: [
        ["lupa", "La gente hace cola donde compra cosas buenas. Eso un detective lo apunta."],
        ["lupa", "Te propongo tres trocitos: el horno de Hogaza, la fragua de Yunque y la Compa\xF1\xEDa Rel\xE1mpago."],
        ["lupa", "Pero antes, una regla: expl\xEDcame qu\xE9 hace cada uno."]
      ],
      lupa_regla: [
        ["lupa", "\xBFTe das cuenta? Los del Mercado los conoces. Rel\xE1mpago no hay quien lo explique."],
        ["lupa", "Invierte en lo que conoces. Si no sabes explicarlo, no lo compres."]
      ],
      compras_ninguna: [
        ["chispin", "Esta vez no hemos comprado nada. Veamos qu\xE9 pasa con los trocitos que ya tenemos."]
      ],
      compras_buenas: [
        ["chispin", "\xA1Trocitos nuevos! Ahora tenemos una parte de varios talleres."]
      ],
      compras_relampago: [
        ["prisas", "\xA1Ja! \xA1Has comprado Rel\xE1mpago! \xA1Ya ver\xE1s c\xF3mo sube!"]
      ],
      relampago_sube: [
        ["prisas", "\xA1Rel\xE1mpago vale ya el doble! \xA1Ja, ja! \xA1Todo el mundo quiere!"]
      ],
      relampago_cae: [
        ["chispin", "\xA1Rel\xE1mpago se ha desplomado! Nadie sab\xEDa qu\xE9 hac\xEDa\u2026 y la gente se ha ido."]
      ],
      relampago_cierra: [
        ["prisas", "\xA1Grrr! \xA1Rel\xE1mpago ha cerrado! \xA1Me largo!"]
      ],
      reparto: [
        ["lupa", "Adem\xE1s, tus talleres buenos te han dado tu parte de lo que han ganado: {n} monedas."]
      ],
      repartija_varios: [
        ["chispin", "\xA1Mira! Una ara\xF1ita teje hilos entre tus talleres."],
        ["chispin", "Se llama Repartija. Si un taller cae, los otros te sostienen. \xA1Viene con nosotros!"]
      ],
      repartija_uno: [
        ["chispin", "\xA1Mira! Una ara\xF1ita teje un hilo hasta tu taller."],
        ["chispin", "Se llama Repartija. Dice que con trocitos de varios talleres, si uno cae, duele menos. \xA1Viene con nosotros!"]
      ],
      victoria_cuenta: [
        ["cuenta", "Los n\xFAmeros de la Ciudad vuelven a cuadrar."]
      ],
      ciudad_brilla: [
        ["lupa", "\xA1Mira la Ciudad! Todos los talleres de verdad brillan."],
        ["lupa", "Y el bazar de Fachada\u2026 se ha quedado gris. Sin la pintura, no hab\xEDa nada."]
      ],
      fachada_huye: [
        ["fachada", "\xA1Grrr! \xA1Aqu\xED todos miran dentro!"],
        ["fachada", "\xA1Me voy a la Torre del Rev\xE9s! All\xED nadie hace preguntas."],
        ["chispin", "\xA1Ha escapado por el camino del sur! Alg\xFAn d\xEDa iremos tras \xE9l."]
      ],
      charla_lupa: [
        ["lupa", "Un buen detective nunca se f\xEDa de la puerta. Mira dentro."]
      ],
      charla_fiel: [
        ["fiel", "Mis clientes vuelven porque mis zapatos duran. As\xED de sencillo."]
      ],
      charla_engranaje: [
        ["engranaje", "\xA1Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve."]
      ],
      charla_cuenta: [
        ["cuenta", "Los n\xFAmeros no mienten. Las fachadas, a veces s\xED."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mira c\xF3mo brilla mi bazar! \xBFPara qu\xE9 quieres ver dentro?"]
      ],
      charla_prisas: [
        ["prisas", "\xA1Corre, corre! \xA1Aqu\xED todo va deprisa!"]
      ]
    }
  };
  var Oi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 10. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_torre: "Sigue el camino del sur hasta la Torre del Rev\xE9s",
      ir_arrepentido: "Alguien llora junto a su caseta",
      ir_reves: "Busca a Rev\xE9s en su casa al rev\xE9s",
      ir_chollo: "Don Chollo te llama desde su puesto",
      victoria: "\xA1La plaza de la Torre brilla!"
    },
    textos: {
      viaje_titulo: "Torre del Rev\xE9s",
      viaje_sub: "Donde todo est\xE1 patas arriba",
      oferta_titulo: "La oferta de Don Chollo",
      dar: "Darle {n} monedas",
      pensar: "Pensar al rev\xE9s primero",
      irme: "Irme sin darle nada",
      noche_chollo: "Don Chollo promete volver por la ma\xF1ana",
      pistas_titulo: "\xBFHuele a timo?",
      pregunta: "Alguien te promete el doble de monedas en una noche, solo hoy y en secreto. \xBFQu\xE9 es?",
      resp_timo: "Un timo",
      resp_suerte: "Un golpe de suerte",
      resp_amigo: "Un favor de un amigo",
      fb_bien: "\xA1Eso es! Mucho, muy r\xE1pido, en secreto y sin explicar c\xF3mo: huele a timo.",
      fb_mal: "Casi. Si promete mucho, muy r\xE1pido y en secreto, es un timo.",
      medalla: "Medalla \xABOlfato\xBB",
      medalla_texto: "Hueles un timo a la legua. \xA1La plaza de la Torre vuelve a brillar!",
      icono_medalla: "medalla_olfato",
      pagina_numero: "p\xE1gina 10",
      pagina: "Si algo parece demasiado bueno para ser verdad, casi nunca es verdad. Desconf\xEDa de quien te mete prisa.",
      reto_familia: "Buscad juntos un anuncio o un mensaje que prometa algo demasiado bueno. \xBFQu\xE9 se\xF1ales de timo encontr\xE1is?"
    },
    pistas: [
      ["moneda", "\xBFPromete mucho?", "\xA1El doble en una noche! Nadie hace eso con algo de verdad.", !1],
      ["reloj", "\xBFTiene prisa?", "\xAB\xA1Solo hoy!\xBB. As\xED no te da tiempo a pensar.", !1],
      ["carta", "\xBFPide secreto?", "\xABNo se lo digas a nadie\xBB. Para que nadie te avise.", !1],
      ["lupa_icono", "\xBFExplica c\xF3mo lo hace?", "No. Si nadie sabe explicar de d\xF3nde sale el dinero\u2026", !1]
    ],
    dialogos: {
      chispin_sur: [
        ["chispin", "\xA1Fachada se ha ido por el camino del sur, a la Torre del Rev\xE9s!"],
        ["chispin", "Dicen que all\xED todo est\xE1 patas arriba. Baja hasta el final del camino."]
      ],
      llegada_torre: [
        ["chispin", "\xA1Mira eso! Los \xE1rboles tienen las ra\xEDces arriba\u2026 \xA1y la fuente echa el agua hacia el cielo!"],
        ["chispin", "Todo est\xE1 apagado y morado. Y alguien est\xE1 llorando junto a esa caseta."]
      ],
      arrepentido_historia: [
        ["arrepentido", "Snif\u2026 Soy Arrepentido. Ten\xEDa 30 monedas ahorradas."],
        ["arrepentido", "Un tal Don Chollo me dijo: \xABD\xE1melas y ma\xF1ana tendr\xE1s 60\xBB. \xA1Solo ese d\xEDa! \xA1Y en secreto!"],
        ["arrepentido", "Por la ma\xF1ana su puesto estaba vac\xEDo. Ni monedas ni Don Chollo."],
        ["arrepentido", "Cu\xE9ntaselo a Rev\xE9s. Ella entiende estas cosas\u2026 al rev\xE9s."]
      ],
      reves_hola: [
        ["reves", "\xA1Aloh! As\xED se dice \xABhola\xBB al rev\xE9s."],
        ["reves", "Soy Rev\xE9s. Todo el mundo piensa en c\xF3mo ganar. Yo pienso en c\xF3mo podr\xEDa perder."],
        ["reves", "Dime d\xF3nde voy a perder\u2026 y no ir\xE9 nunca all\xED."],
        ["reves", "Uy. Mira qui\xE9n acaba de montar su puesto."]
      ],
      chollo_aparece: [
        ["donchollo", "\xA1Pasen, pasen! \xA1Don Chollo duplica monedas! \xA1Ofert\xF3n!"]
      ],
      chollo_oferta: [
        ["donchollo", "\xA1T\xFA! S\xED, t\xFA. Dame {n} monedas y ma\xF1ana tendr\xE1s {d}."],
        ["donchollo", "\xA1Solo hoy! \xA1Y no se lo digas a nadie, que se acaba!"]
      ],
      chollo_insiste: [
        ["donchollo", "\xBFQu\xE9, te lo has pensado? \xA1{n} monedas hoy, {d} ma\xF1ana! \xA1Corre!"]
      ],
      reves_piensa: [
        ["reves", "Buena idea. Pensemos al rev\xE9s: \xBFc\xF3mo podr\xEDas perder tus monedas aqu\xED?"]
      ],
      olfatin_aparece: [
        ["chispin", "\xA1Eh! Algo se mueve detr\xE1s de la fuente\u2026"],
        ["olfatin", "\xA1Snif, snif! Soy Olfat\xEDn. Huelo las trampas desde lejos. \xBFMe dejas olfatear?"]
      ],
      olfatin_despues: [
        ["olfatin", "\xA1Snif, snif! Hola, soy Olfat\xEDn. D\xE9jame olfatear lo que te ofrec\xEDa ese se\xF1or."]
      ],
      tras_oler: [
        ["olfatin", "\xA1Puaj! Cuatro se\xF1ales. Esto huele a timo de lejos."]
      ],
      chollo_gracias: [
        ["donchollo", "\xA1Ja, ja! \xA1Gracias! Vuelve ma\xF1ana a por tus monedas\u2026 \xA1je!"]
      ],
      chollo_desaparece: [
        ["chispin", "\xA1El puesto de Don Chollo est\xE1 vac\xEDo! Se ha ido con nuestras {n} monedas."],
        ["arrepentido", "Ya ves\u2026 A m\xED me pas\xF3 lo mismo."],
        ["reves", "No te preocupes. Mejor aprenderlo con {n} monedas que con mil."]
      ],
      irme: [
        ["donchollo", "\xA1Bah! \xA1T\xFA te lo pierdes!"],
        ["reves", "Irse tambi\xE9n es una decisi\xF3n. Y muchas veces, la mejor."]
      ],
      reves_nombre: [
        ["reves", "Eso tiene nombre: un timo."],
        ["reves", "Si suena demasiado bueno para ser verdad\u2026 es que no es verdad."]
      ],
      olfatin_se_une: [
        ["olfatin", "\xA1Me caes bien! \xBFPuedo ir contigo? Te avisar\xE9 cuando algo huela raro."],
        ["chispin", "\xA1Olfat\xEDn viene con nosotros!"]
      ],
      chollo_huye: [
        ["donchollo", "\xA1Aqu\xED ya nadie pica! \xA1Me largo!"]
      ],
      victoria_reves: [
        ["reves", "\xA1La plaza brilla otra vez! O deber\xEDa decir\u2026 \xA1zalp al alla birb!"]
      ],
      charla_reves: [
        ["reves", "\xA1Aloh! Aqu\xED todo va al rev\xE9s. As\xED se ven las cosas que los dem\xE1s no ven."]
      ],
      charla_arrepentido: [
        ["arrepentido", "Si alguien te promete el doble en una noche, acu\xE9rdate de m\xED."]
      ],
      charla_cautela: [
        ["cautela", "Antes de cada paso, me pregunto: \xBFqu\xE9 podr\xEDa salir mal?"]
      ],
      charla_donchollo: [
        ["donchollo", "\xA1Psst! \xA1Solo hoy! \xA1No se lo digas a nadie!"]
      ],
      charla_deudon: [
        ["deudon", "\xBFNecesitas algo? \xA1Yo te presto! Ya me lo devolver\xE1s\u2026 con un poquito m\xE1s."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mi tienda nueva brilla todav\xEDa m\xE1s que el bazar!"]
      ],
      charla_puerta_1: [
        ["chispin", "La torre est\xE1 cerrada. Cautela la vigila."]
      ],
      charla_puerta_2: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_3: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_4: [
        ["chispin", "Otra puerta cerrada."]
      ]
    }
  };
  var Fi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 11. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_tienda: "Fachada ha abierto una tienda nueva",
      ir_reves: "Rev\xE9s quiere ense\xF1arte algo",
      victoria: "\xA1La parte baja de la plaza brilla!"
    },
    textos: {
      noche_inicio: "Fachada pinta un cartel nuevo",
      titulo: "Patines de cohete",
      prestamo: "Pedirle {n} monedas a Deud\xF3n",
      pagar: "Pagarlos con mis ahorros ({n})",
      no: "No los necesito ahora",
      noche_cobro: "Pasa una estaci\xF3n\u2026",
      tabla_titulo: "La bola de nieve al rev\xE9s",
      fila_copo: "Bola de Copo",
      fila_deudon: "Bola de Deud\xF3n",
      tabla_frase: "La bola de Copo crece a tu favor. La de Deud\xF3n tambi\xE9n crece\u2026 pero en tu contra.",
      pregunta: "\xBFPara qu\xE9 es mala idea pedir dinero prestado?",
      resp_capricho: "Para un capricho",
      resp_nunca: "Para nada: siempre es buena idea",
      resp_siempre: "Para cualquier cosa, siempre es mala",
      fb_bien: "\xA1Eso es! Un capricho pasa, pero la deuda se queda y crece cada estaci\xF3n.",
      fb_mal: "Casi. Lo peor es pedir prestado para un capricho: el capricho pasa y la deuda crece.",
      medalla: "Medalla \xABSin deudas\xBB",
      medalla_texto: "Sabes que lo que debes tambi\xE9n crece. \xA1La Torre brilla un poco m\xE1s!",
      icono_medalla: "medalla_deuda",
      pagina_numero: "p\xE1gina 11",
      pagina: "Lo que ganas tambi\xE9n gana. Pero lo que debes tambi\xE9n crece. No pidas prestado para lo que no necesitas.",
      reto_familia: "Imaginad que ped\xEDs 10 \u20AC y cada mes deb\xE9is un poquito m\xE1s. Haced juntos la cuenta de cu\xE1nto deber\xEDais en un a\xF1o."
    },
    dialogos: {
      fachada_patines: [
        ["fachada", "\xA1Tienda nueva! \xA1Patines de cohete! \xA1Corres el doble!"],
        ["fachada", "Solo {n} monedas. \xA1Los quiere todo el mundo!"]
      ],
      patines_oferta: [
        ["fachada", "\xBFTe gustan? \xA1Son los m\xE1s r\xE1pidos de Valoria! {n} monedas y son tuyos."]
      ],
      deudon_ofrece: [
        ["deudon", "\xBFNo te llega? \xBFO no quieres gastar tus ahorros? \xA1Yo te presto!"],
        ["deudon", "Soy Deud\xF3n. Solo me devuelves un poquito m\xE1s\u2026 cada estaci\xF3n."]
      ],
      prestado: [
        ["deudon", "\xA1Trato hecho! Te presto {n}. Ya hablaremos\u2026 \xA1je, je!"]
      ],
      pagado: [
        ["fachada", "\xA1Vendidos! Con monedas de verdad, me gusta."]
      ],
      no_compra: [
        ["fachada", "\xA1Bah! T\xFA te lo pierdes."]
      ],
      patines_puestos: [
        ["chispin", "\xA1Zas! \xA1Con los patines corres much\xEDsimo m\xE1s!"],
        ["reves", "\xA1Eh, t\xFA! Antes de salir disparado, ven a mi casa."]
      ],
      reves_prestamo: [
        ["reves", "Has pedido prestado a Deud\xF3n. D\xE9jame ense\xF1arte una cosa."],
        ["reves", "\xBFRecuerdas la bola de nieve de Copo? Pues hay otra que rueda al rev\xE9s."]
      ],
      reves_pagar: [
        ["reves", "Los has pagado con tus ahorros. Bien. Pero mira lo que habr\xEDa pasado con Deud\xF3n."]
      ],
      reves_no: [
        ["reves", "Has esperado. Me gusta. Mira lo que habr\xEDa pasado con Deud\xF3n."]
      ],
      deudon_cobra: [
        ["deudon", "\xA1Hola, hola! Ha pasado una estaci\xF3n. Me pediste {p}\u2026"],
        ["deudon", "\u2026as\xED que ahora me debes {n}. \xA1A pagar!"]
      ],
      reves_ayuda: [
        ["reves", "No te llega. Esta vez te dejo yo las {n} que faltan, sin cobrarte nada m\xE1s."],
        ["reves", "Pero acu\xE9rdate: con Deud\xF3n, cada estaci\xF3n que pasa debes m\xE1s."]
      ],
      deuda_pagada: [
        ["chispin", "Pagado. Pero los patines nos han costado {n} monedas m\xE1s de lo que val\xEDan."]
      ],
      deudon_se_va: [
        ["deudon", "\xA1Bah! \xA1Nadie quiere deberme nada! \xA1Me voy!"]
      ],
      reves_nombre: [
        ["reves", "Lo que ganas tambi\xE9n gana. Y lo que debes tambi\xE9n crece."],
        ["reves", "No hace falta ser muy listo. Basta con no meterse en l\xEDos."]
      ],
      victoria_deuda: [
        ["reves", "\xA1Mira c\xF3mo brilla la plaza! Ya solo queda la torre."]
      ],
      charla_reves: [
        ["reves", "\xA1Aloh! Aqu\xED todo va al rev\xE9s. As\xED se ven las cosas que los dem\xE1s no ven."]
      ],
      charla_arrepentido: [
        ["arrepentido", "Si alguien te promete el doble en una noche, acu\xE9rdate de m\xED."]
      ],
      charla_cautela: [
        ["cautela", "Antes de cada paso, me pregunto: \xBFqu\xE9 podr\xEDa salir mal?"]
      ],
      charla_donchollo: [
        ["donchollo", "\xA1Psst! \xA1Solo hoy! \xA1No se lo digas a nadie!"]
      ],
      charla_deudon: [
        ["deudon", "\xBFNecesitas algo? \xA1Yo te presto! Ya me lo devolver\xE1s\u2026 con un poquito m\xE1s."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mi tienda nueva brilla todav\xEDa m\xE1s que el bazar!"]
      ],
      charla_puerta_1: [
        ["chispin", "La torre est\xE1 cerrada. Cautela la vigila."]
      ],
      charla_puerta_2: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_3: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_4: [
        ["chispin", "Otra puerta cerrada."]
      ]
    }
  };
  var Qi = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 12. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_cautela: "Cautela vigila la puerta de la torre",
      puerta_1: "Abre la primera puerta",
      puerta_2: "Abre la segunda puerta",
      puerta_3: "Abre la tercera puerta",
      puerta_4: "Abre la \xFAltima puerta",
      ir_reves: "Rev\xE9s te espera al final de la torre",
      victoria: "\xA1La Torre del Rev\xE9s brilla!"
    },
    textos: {
      noche_inicio: "La torre cruje en la noche",
      lista_titulo: "Lo que puede salir mal",
      lista_1: "Que me prometan mucho, r\xE1pido y en secreto.",
      lista_2: "Deber m\xE1s de lo que puedo pagar.",
      lista_3: "Que me metan prisa para decidir.",
      lista_4: "Fiarme de lo que solo brilla por fuera.",
      lista_frase: "Si me acuerdo de todo esto, casi nada me pilla por sorpresa.",
      pregunta: "\xBFQu\xE9 te ha ayudado a cruzar la torre?",
      resp_evitar: "Pensar qu\xE9 pod\xEDa salir mal",
      resp_listo: "Ser el m\xE1s listo",
      resp_suerte: "Tener suerte",
      fb_bien: "\xA1Eso es! No hace falta ser un genio: basta con evitar los errores grandes.",
      fb_mal: "Casi. Lo que te ha salvado es pensar al rev\xE9s: qu\xE9 pod\xEDa salir mal.",
      medalla: "Medalla de Rev\xE9s",
      medalla_texto: "Piensas al rev\xE9s y evitas las trampas. \xA1Toda la Torre del Rev\xE9s vuelve a brillar!",
      icono_medalla: "medalla_reves",
      pagina_numero: "p\xE1gina 12",
      pagina: "No intentes ser el m\xE1s listo. Intenta no hacer tonter\xEDas. Gana el que menos se equivoca.",
      reto_familia: "Antes de la pr\xF3xima compra grande en casa, haced juntos la lista de lo que podr\xEDa salir mal."
    },
    puertas: [{
      titulo: "El cofre que duplica",
      icono: "cofre",
      correcta: "oler",
      opciones: [
        ["meter", "Meter 5 monedas", "moneda"],
        ["oler", "Que Olfat\xEDn lo olfatee primero", "olfatin"]
      ]
    }, {
      titulo: "El puente de una cuerda",
      icono: "cuerda",
      correcta: "repartir",
      opciones: [
        ["una", "Pasar todo por la cuerda gorda", "cuerda"],
        ["repartir", "Repartir la carga en tres cuerdas", "tierras"]
      ]
    }, {
      titulo: "La sala de las prisas",
      icono: "reloj",
      correcta: "pensar",
      opciones: [
        ["correr", "\xA1Correr sin mirar!", "prisas"],
        ["pensar", "Pararme y pensar", "calmin"]
      ]
    }, {
      titulo: "Dos puertas",
      icono: "bazar",
      correcta: "madera",
      opciones: [
        ["dorada", "Entrar por la puerta dorada", "bazar"],
        ["madera", "Mirar dentro y entrar por la de madera", "lupa_icono"]
      ]
    }],
    dialogos: {
      reves_reto: [
        ["reves", "\xDAltima prueba, aprendiz. Tienes que cruzar mi torre."],
        ["reves", "Cuatro puertas, cuatro trampas. Te espero abajo del todo\u2026 \xA1o arriba, seg\xFAn se mire!"]
      ],
      cautela_hola: [
        ["cautela", "Alto. Soy Cautela, la guardiana de la torre."],
        ["cautela", "Nadie entra sin leer mi lista."]
      ],
      cautela_abre: [
        ["cautela", "Bien. Ahora ya sabes qu\xE9 buscar. Puedes pasar."]
      ],
      puerta_cerrada: [
        ["chispin", "Esta puerta a\xFAn est\xE1 cerrada. Vamos por orden."]
      ],
      antes_1: [
        ["chispin", "Hay un cofre con un cartel: \xABMete 5 monedas, saca 10\xBB."],
        ["olfatin", "Snif\u2026 Snif\u2026"]
      ],
      bien_1: [
        ["olfatin", "\xA1Puaj! \xA1Huele a Don Chollo! Dentro no hay nada, solo un agujero."],
        ["chispin", "\xA1La puerta se abre!"]
      ],
      trampa_1: [
        ["chispin", "\xA1El cofre se ha tragado las monedas\u2026 y ha soltado una nube de humo!"],
        ["reves", "\xBFQu\xE9 dec\xEDa la lista de Cautela? Vuelve a intentarlo."]
      ],
      antes_2: [
        ["chispin", "Hay que cruzar un foso con nuestra mochila. Una cuerda gorda\u2026 o tres finitas."]
      ],
      bien_2: [
        ["chispin", "\xA1Una de las cuerdas se ha roto! Pero las otras dos aguantan. \xA1Hemos cruzado!"]
      ],
      trampa_2: [
        ["chispin", "\xA1La cuerda gorda se ha roto y la mochila se ha ca\xEDdo al foso!"],
        ["reves", "Si todo cuelga de una sola cuerda\u2026 Vuelve a intentarlo."]
      ],
      antes_3: [
        ["prisas", "\xA1SAL YA! \xA1SAL YA O TE QUEDAS ENCERRADO PARA SIEMPRE!"],
        ["chispin", "\xA1Es la voz de Prisas! \xBFQu\xE9 hacemos?"]
      ],
      bien_3: [
        ["calmin", "Uuh\u2026 Muy bien. Mira: el suelo de delante era una trampa. Pararse era lo listo."],
        ["chispin", "\xA1Y la puerta se ha abierto sola!"]
      ],
      trampa_3: [
        ["chispin", "\xA1Hemos corrido y nos hemos ca\xEDdo en un agujero! Menos mal que no era hondo."],
        ["reves", "Las prisas son las mejores amigas de las trampas. Vuelve a intentarlo."]
      ],
      antes_4: [
        ["chispin", "Dos puertas: una dorada y brillante, y otra de madera, con pisadas en el suelo."]
      ],
      bien_4: [
        ["chispin", "\xA1Detr\xE1s de la dorada solo hab\xEDa una pared pintada! La de madera era la buena."]
      ],
      trampa_4: [
        ["chispin", "\xA1Pum! \xA1La puerta dorada estaba pintada en la pared!"],
        ["reves", "\xBFY si miras dentro antes? Vuelve a intentarlo."]
      ],
      reves_final: [
        ["reves", "\xA1Has llegado! Has esquivado todas las trampas."],
        ["reves", "\xBFSabes cu\xE1l es mi secreto? No intento ser el m\xE1s listo. Solo intento no hacer tonter\xEDas."]
      ],
      torre_brilla: [
        ["reves", "\xA1Toda la Torre vuelve a brillar! Al rev\xE9s y al derecho."]
      ],
      villanos_huyen: [
        ["fachada", "\xA1Grrr! \xA1Aqu\xED todos piensan antes de comprar!"],
        ["fachada", "\xA1Me voy al Gran Reloj, con Merma! \xA1All\xED nos esperan Don Chollo y Deud\xF3n!"],
        ["reves", "El Gran Reloj\u2026 All\xED est\xE1 la m\xE1quina, aprendiz. Ten cuidado."]
      ],
      charla_reves: [
        ["reves", "\xA1Aloh! Aqu\xED todo va al rev\xE9s. As\xED se ven las cosas que los dem\xE1s no ven."]
      ],
      charla_arrepentido: [
        ["arrepentido", "Si alguien te promete el doble en una noche, acu\xE9rdate de m\xED."]
      ],
      charla_cautela: [
        ["cautela", "Antes de cada paso, me pregunto: \xBFqu\xE9 podr\xEDa salir mal?"]
      ],
      charla_donchollo: [
        ["donchollo", "\xA1Psst! \xA1Solo hoy! \xA1No se lo digas a nadie!"]
      ],
      charla_deudon: [
        ["deudon", "\xBFNecesitas algo? \xA1Yo te presto! Ya me lo devolver\xE1s\u2026 con un poquito m\xE1s."]
      ],
      charla_fachada: [
        ["fachada", "\xA1Mi tienda nueva brilla todav\xEDa m\xE1s que el bazar!"]
      ],
      charla_puerta_1: [
        ["chispin", "La torre est\xE1 cerrada. Cautela la vigila."]
      ],
      charla_puerta_2: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_3: [
        ["chispin", "Otra puerta cerrada."]
      ],
      charla_puerta_4: [
        ["chispin", "Otra puerta cerrada."]
      ]
    }
  };
  var $i = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 13. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_reloj: "Sigue el camino del sur hasta el Gran Reloj",
      ir_pendulo: "Busca a P\xE9ndulo, el relojero",
      ir_vaiven: "Vaiv\xE9n va a tocar la campana",
      ir_euforio: "Euforio vende trocitos en la fiesta",
      victoria: "\xA1La torre del reloj brilla!"
    },
    textos: {
      viaje_titulo: "El Gran Reloj",
      viaje_sub: "Donde el mercado va y viene",
      medidor_titulo: "El p\xE9ndulo del mercado",
      m_panico: "P\xE1nico: todos tienen miedo y quieren vender. Todo est\xE1 barato.",
      m_calma: "Calma: las cosas valen lo que valen.",
      m_euforia: "Euforia: todos quieren comprar. Todo est\xE1 caro.",
      medidor_frase: "Mira arriba: el p\xE9ndulo te dice siempre d\xF3nde estamos.",
      donde: "Hay fiesta y todo el mundo compra. \xBFD\xF3nde est\xE1 el p\xE9ndulo?",
      r_euforia: "En la euforia",
      r_calma: "En la calma",
      r_panico: "En el p\xE1nico",
      donde_bien: "\xA1Eso es! Cuando todos quieren comprar, el p\xE9ndulo est\xE1 en la euforia.",
      donde_mal: "Casi. Con fiesta y todos comprando, el p\xE9ndulo est\xE1 en la euforia.",
      titulo: "\xA1Trocitos de fiesta!",
      comprar: "Comprar un trocito por {n}",
      esperar: "Esperar a que pase la fiesta",
      noche_fin: "Se acaba la fiesta",
      tabla_titulo: "Lo que vale un trocito del horno",
      fila_precio: "Precio",
      tabla_compro: "En la fiesta lo pagaste a 18. Al volver la calma, vale 6, como siempre.",
      tabla_espera: "En la fiesta costaba 18. Al volver la calma, vale 6, como siempre. \xA1Bien esperado!",
      pregunta: "\xBFCu\xE1ndo est\xE1n las cosas m\xE1s caras?",
      resp_todos: "Cuando todo el mundo quiere comprar",
      resp_nadie: "Cuando nadie quiere comprar",
      resp_lunes: "Los lunes",
      fb_bien: "\xA1Eso es! Cuando todos est\xE1n euf\xF3ricos, todo se encarece.",
      fb_mal: "Casi. Cuando todo el mundo quiere comprar, los precios suben.",
      medalla: "Medalla \xABCampana\xBB",
      medalla_texto: "Sabes leer el p\xE9ndulo. \xA1La torre del reloj vuelve a brillar!",
      icono_medalla: "medalla_campana",
      pagina_numero: "p\xE1gina 13",
      pagina: "Cuando todos corren a comprar, camina. Lo que hoy est\xE1 de moda, ma\xF1ana vuelve a su precio.",
      reto_familia: "Pensad en algo que estuvo muy de moda y car\xEDsimo. \xBFCu\xE1nto cuesta ahora?"
    },
    dialogos: {
      chispin_sur: [
        ["chispin", "Fachada, Don Chollo y Deud\xF3n se han ido al Gran Reloj, con Merma."],
        ["chispin", "Es el \xFAltimo lugar de Valoria. Baja por la torre hasta el final."]
      ],
      llegada_reloj: [
        ["chispin", "\xA1Tic, tac! \xA1Qu\xE9 reloj tan enorme!"],
        ["chispin", "\xA1Y hay una fiesta! Todo el mundo canta, baila\u2026 y compra."],
        ["chispin", "Pero se oye algo abajo, muy abajo. Como una m\xE1quina que tiembla."]
      ],
      pendulo_hola: [
        ["pendulo", "Hola, viajero. Soy P\xE9ndulo, el relojero. Te esperaba."],
        ["pendulo", "Tu abuelo ven\xEDa mucho por aqu\xED. \xC9l sab\xEDa mirar el p\xE9ndulo."],
        ["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1. Mira."]
      ],
      vaiven_campana: [
        ["vaiven", "\xA1Ding, dong! \xA1Ding, dong! \xA1Soy Vaiv\xE9n y anuncio FIESTA!"]
      ],
      euforio_oferta: [
        ["euforio", "\xA1Fiesta, fiesta! \xA1Trocitos del horno de Hogaza! \xA1Solo {n} monedas!"],
        ["chispin", "Pero\u2026 en la Ciudad val\xEDan {c}."],
        ["euforio", "\xA1Eso era ayer! \xA1Todo el mundo compra! \xA1Ma\xF1ana valdr\xE1n todav\xEDa m\xE1s!"]
      ],
      comprado: [
        ["euforio", "\xA1Bravo! \xA1Fiesta! \xA1Un trocito m\xE1s para la colecci\xF3n!"]
      ],
      espera: [
        ["euforio", "\xA1Aguafiestas! \xA1T\xFA ver\xE1s!"]
      ],
      vaiven_calma: [
        ["vaiven", "\xA1Ding\u2026 dong! La fiesta ha terminado. \xA1Calma!"],
        ["chispin", "El p\xE9ndulo ha vuelto al centro."]
      ],
      perdio: [
        ["chispin", "Pagamos {n} monedas de m\xE1s por la fiesta\u2026 Bueno, el trocito sigue siendo bueno."]
      ],
      pendulo_nombre: [
        ["pendulo", "\xBFLo ves? Cuando todos est\xE1n euf\xF3ricos, todo est\xE1 caro."],
        ["pendulo", "No hace falta adivinar el futuro. Basta con saber d\xF3nde est\xE1 el p\xE9ndulo."]
      ],
      victoria_campana: [
        ["pendulo", "La torre del reloj vuelve a brillar. Pero cuidado: el p\xE9ndulo siempre vuelve\u2026"]
      ],
      charla_pendulo: [
        ["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1."]
      ],
      charla_vaiven: [
        ["vaiven", "\xA1Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."]
      ],
      charla_memoria: [
        ["memoria", "He visto cien tormentas. Todas pasaron."]
      ],
      charla_euforio: [
        ["euforio", "\xA1Fiesta, fiesta! \xA1Todo sube! \xA1Compra, compra!"]
      ],
      charla_panico: [
        ["panico", "\xA1Aaah! \xA1Se acaba el mundo! \xA1Vende todo!"]
      ],
      charla_merma: [
        ["merma", "Todo lo quieto es m\xEDo."]
      ]
    }
  };
  var ki = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 14. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_memoria: "Memoria guarda cuadros de tormentas pasadas",
      ir_pendulo: "P\xE9ndulo te espera en su taller",
      victoria: "\xA1La plaza de la fiesta brilla!"
    },
    textos: {
      noche_tormenta: "Se acerca una tormenta",
      cuadros_titulo: "Las tormentas de Valoria",
      cuadro_1: "La gran helada: dur\xF3 tres estaciones. Despu\xE9s lleg\xF3 la primavera m\xE1s grande.",
      cuadro_2: "La tormenta de las monedas: todos vend\xEDan. Quien aguant\xF3, recuper\xF3 todo.",
      cuadro_3: "El a\xF1o del viento: los talleres buenos volvieron a abrir, m\xE1s fuertes.",
      cuadros_frase: "Todas las tormentas pasaron. Todas.",
      titulo: "La tormenta de P\xE1nico",
      vender: "Venderlo todo ya ({m} monedas)",
      aguantar: "Aguantar con calma",
      rebajas: "Aguantar y comprar trocitos rebajados ({p} cada uno)",
      noche_calma: "La tormenta se aleja",
      tabla_titulo: "Tres caminos en la tormenta",
      f_vender: "Vender",
      f_aguantar: "Aguantar",
      f_rebajas: "Rebajas",
      tabla_frase: "Quien vendi\xF3 con miedo se qued\xF3 con 3. Quien aguant\xF3 volvi\xF3 a 8. Quien compr\xF3 en rebajas, \xA1pag\xF3 3 por algo que vale 8!",
      pregunta: "\xBFQu\xE9 conviene hacer cuando todos tienen miedo?",
      resp_calma: "Mantener la calma: las tormentas pasan",
      resp_vender: "Vender todo, como los dem\xE1s",
      resp_esconder: "Esconder las monedas en la hucha",
      fb_bien: "\xA1Eso es! Las tormentas pasan. Con calma, hasta pueden ser una oportunidad.",
      fb_mal: "Casi. Vender con miedo es perder. Las tormentas pasan: calma.",
      medalla: "Medalla de P\xE9ndulo",
      medalla_texto: "Aguantaste la tormenta con calma. \xA1La plaza de la fiesta vuelve a brillar!",
      icono_medalla: "medalla_pendulo",
      pagina_numero: "p\xE1gina 14",
      pagina: "Cuando todos tienen miedo, respira. Las tormentas pasan, y lo que es bueno sigue siendo bueno.",
      reto_familia: "Preguntad a los abuelos por una \xE9poca dif\xEDcil que recuerden. \xBFC\xF3mo termin\xF3?"
    },
    dialogos: {
      panico_grita: [
        ["panico", "\xA1AAAH! \xA1TORMENTA! \xA1Esto no se acaba nunca!"],
        ["panico", "\xA1Vende todo! \xA1Vende ya, antes de que no valga nada!"]
      ],
      chispin_tormenta: [
        ["chispin", "Tus {n} trocitos val\xEDan {v} monedas\u2026 y con la tormenta ahora valen {t}."],
        ["chispin", "Todo el mundo est\xE1 vendiendo. \xBFQu\xE9 hacemos?"]
      ],
      chispin_tormenta_sin: [
        ["chispin", "Todo el mundo est\xE1 vendiendo sus trocitos a mitad de precio. \xA1Qu\xE9 miedo!"]
      ],
      memoria_hola: [
        ["memoria", "Ven, peque\xF1o, resgu\xE1rdate. Soy Memoria."],
        ["memoria", "Llevo muchos a\xF1os en el Gran Reloj. Mira mis cuadros."]
      ],
      calmin_aparece: [
        ["chispin", "\xA1Un b\xFAho ha entrado por la ventana!"],
        ["calmin", "Uuuh\u2026 Soy Calm\xEDn. Cuando todos corren, yo me quedo quieto y pienso."],
        ["calmin", "\xBFPuedo ir contigo? Te ayudar\xE9 a no asustarte."],
        ["chispin", "\xA1Calm\xEDn viene con nosotros!"]
      ],
      pendulo_tormenta: [
        ["pendulo", "El p\xE9ndulo est\xE1 en el p\xE1nico. Todos venden a mitad de precio."],
        ["pendulo", "Los talleres siguen siendo los mismos. Fiel sigue cosiendo, Hogaza sigue horneando."],
        ["pendulo", "T\xFA decides."]
      ],
      vendido: [
        ["panico", "\xA1Bien hecho! \xA1S\xE1lvate! \xA1Je\u2026!"],
        ["chispin", "Hemos vendido todo por {m} monedas."]
      ],
      rebajas: [
        ["chispin", "\xA1Hemos comprado {k} trocitos de la zapater\xEDa por solo {m} monedas!"],
        ["calmin", "Uuuh\u2026 Bien pensado."]
      ],
      aguanta: [
        ["calmin", "Uuuh\u2026 Quietos. Esperemos a que pase."]
      ],
      vuelve_calma: [
        ["chispin", "\xA1Ha salido el sol! El p\xE9ndulo vuelve al centro."],
        ["panico", "\xBFYa? \xBFYa est\xE1? Bueno\u2026 \xA1pues me voy a asustar a otra parte!"]
      ],
      frutos_dorados: [
        ["calmin", "Uuuh\u2026 Mira: tus {t} trocitos han dado frutos dorados. {n} monedas."]
      ],
      pendulo_nombre: [
        ["pendulo", "Las tormentas pasan. Lo bueno sigue siendo bueno."],
        ["pendulo", "Cuando todos tienen miedo, las cosas buenas se venden baratas. Quien tiene calma, lo aprovecha."]
      ],
      victoria_pendulo: [
        ["pendulo", "Tienes mi medalla. Ya solo queda una cosa\u2026 la que est\xE1 debajo del reloj."]
      ],
      charla_pendulo: [
        ["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1."]
      ],
      charla_vaiven: [
        ["vaiven", "\xA1Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."]
      ],
      charla_memoria: [
        ["memoria", "He visto cien tormentas. Todas pasaron."]
      ],
      charla_euforio: [
        ["euforio", "\xA1Fiesta, fiesta! \xA1Todo sube! \xA1Compra, compra!"]
      ],
      charla_panico: [
        ["panico", "\xA1Aaah! \xA1Se acaba el mundo! \xA1Vende todo!"]
      ],
      charla_merma: [
        ["merma", "Todo lo quieto es m\xEDo."]
      ]
    }
  };
  var Ka = {
    _nota: "Di\xE1logos y textos de la misi\xF3n 15. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
    misiones: {
      ir_maquina: "Baja a la sala de la m\xE1quina",
      final: "\xA1Det\xE9n a Merma!",
      victoria: "\xA1Todo Valoria brilla!"
    },
    textos: {
      noche_inicio: "El suelo tiembla bajo el Gran Reloj",
      forja_titulo: "La Moneda Estrella",
      forja_texto: "Con las medallas de Copo, Lupa, Rev\xE9s y P\xE9ndulo se forja una moneda que nadie puede copiar. Solo existir\xE1n 21 en todo el reino.",
      forja_boton: "Forjar",
      forja_hecha: "\xA1La Moneda Estrella! N\xFAmero 1 de 21. Nadie, nunca, podr\xE1 fabricar ni una m\xE1s.",
      pregunta: "\xBFPor qu\xE9 la m\xE1quina no puede con la Moneda Estrella?",
      resp_unica: "Porque nadie puede fabricar m\xE1s",
      resp_dorada: "Porque es muy dorada",
      resp_grande: "Porque es muy grande",
      fb_bien: "\xA1Eso es! Lo que no se puede multiplicar no pierde su valor.",
      fb_mal: "Casi. La m\xE1quina copia monedas. Esta no se puede copiar: solo hay 21.",
      medalla: "El Legado de Libertad, completo",
      medalla_texto: "Has apagado la m\xE1quina de hacer dinero. \xA1Todo Valoria vuelve a brillar!",
      icono_medalla: "moneda_estrella",
      pagina_numero: "p\xE1gina 15",
      pagina: "Ahora ya sabes lo que yo sab\xEDa. El tiempo, la paciencia y la cabeza fr\xEDa son tu libertad.",
      reto_familia: "Leed juntos la carta completa del abuelo y escribid vuestra propia p\xE1gina: \xBFqu\xE9 os gustar\xEDa dejar a alguien dentro de muchos a\xF1os?",
      carta_final: `Si lees esto, es que has llegado al Gran Reloj y la m\xE1quina ya no echa humo.

Por el camino has aprendido lo mismo que aprend\xED yo: que el dinero quieto pierde brillo, que lo que plantas crece si le das tiempo, que antes de comprar un trocito hay que mirar dentro, que quien promete mucho y deprisa suele mentir, y que las tormentas pasan.

Nada de esto te har\xE1 rico de golpe. Te har\xE1 libre poco a poco. Y eso vale m\xE1s.

Cuida tus monedas, cuida a los tuyos y, alg\xFAn d\xEDa, escribe t\xFA una carta como esta.`,
      fin_titulo: "Todo el reino vuelve a brillar",
      fin_texto: "La m\xE1quina se ha apagado para siempre y Merma se ha deshecho en humo. Puedes seguir explorando y viajar por todo Valoria desde el mapa."
    },
    trampas: [{
      villano: "subeprecios",
      dialogo: "t_sube",
      ayuda: "a_sube",
      pregunta: "\xBFQu\xE9 le pasa al dinero que se queda quieto en la hucha?",
      correcta: "pierde",
      opciones: [
        ["pierde", "Pierde brillo: compra cada vez menos", "chispin"],
        ["crece", "Crece solo", "hucha"],
        ["igual", "Se queda igual para siempre", "moneda"]
      ],
      bien: "\xA1Eso es! Por eso hay que ponerlo a trabajar.",
      mal: "Casi. Acu\xE9rdate del pan de Hogaza: cada vez costaba m\xE1s."
    }, {
      villano: "prisas",
      dialogo: "t_prisas",
      ayuda: "a_prisas",
      pregunta: "Prisas quiere tu \xE1rbol del tiempo. \xBFQu\xE9 haces?",
      correcta: "esperar",
      opciones: [
        ["esperar", "Esperar: con tiempo da mucho m\xE1s", "brotin"],
        ["vender", "Vend\xE9rselo ya", "moneda"],
        ["cortar", "Cortarlo para que no crezca", "fruto"]
      ],
      bien: "\xA1Eso es! El tiempo multiplica.",
      mal: "Casi. Acu\xE9rdate del \xE1rbol: con cuatro estaciones dio 24 frutos."
    }, {
      villano: "fachada",
      dialogo: "t_fachada",
      ayuda: "a_fachada",
      pregunta: "Fachada ofrece trocitos de su bazar dorado. \xBFQu\xE9 miras primero?",
      correcta: "dentro",
      opciones: [
        ["dentro", "Clientes, producto y cuentas", "lupa_icono"],
        ["brillo", "Cu\xE1nto brilla", "bazar"],
        ["precio", "Que sea barato", "moneda"]
      ],
      bien: "\xA1Eso es! Por fuera se puede pintar cualquier cosa.",
      mal: "Casi. Acu\xE9rdate del cuaderno de detective."
    }, {
      villano: "donchollo",
      dialogo: "t_chollo",
      ayuda: "a_chollo",
      pregunta: "Don Chollo promete triplicar tus monedas esta noche. \xBFQu\xE9 es?",
      correcta: "timo",
      opciones: [
        ["timo", "Un timo", "olfatin"],
        ["suerte", "Una suerte", "moneda"],
        ["regalo", "Un regalo", "cofre"]
      ],
      bien: "\xA1Eso es! Mucho, r\xE1pido y en secreto: timo.",
      mal: "Casi. Olfat\xEDn ya lo ha olido: es un timo."
    }, {
      villano: "panico",
      celda: [10, 30],
      dialogo: "t_panico",
      ayuda: "a_panico",
      pregunta: "P\xE1nico grita que el mundo se acaba y que lo vendas todo. \xBFQu\xE9 haces?",
      correcta: "calma",
      opciones: [
        ["calma", "Calma: las tormentas pasan", "calmin"],
        ["vender", "Vender todo", "panico"],
        ["llorar", "Esconderme", "hucha"]
      ],
      bien: "\xA1Eso es! Calm\xEDn est\xE1 contigo.",
      mal: "Casi. Acu\xE9rdate de los cuadros de Memoria."
    }],
    dialogos: {
      pendulo_maquina: [
        ["pendulo", "\xBFLo notas? Merma ha encendido la m\xE1quina de hacer dinero, aqu\xED abajo."],
        ["pendulo", "Cada moneda que escupe hace que todas las dem\xE1s valgan un poco menos."],
        ["pendulo", "Baja a la sala de la m\xE1quina. Tus amigos van contigo."]
      ],
      merma_habla: [
        ["merma", "Vaya, vaya\u2026 El nieto del viejo aprendiz."],
        ["merma", "Soy Merma. Mientras esta m\xE1quina haga monedas, yo me comer\xE9 su brillo."],
        ["merma", "\xA1Secuaces! \xA1Que no llegue a la m\xE1quina!"]
      ],
      t_sube: [
        ["subeprecios", "\xA1Je, je! \xA1Guarda todas tus monedas en la hucha, que ah\xED est\xE1n seguras!"]
      ],
      a_sube: [
        ["chispin", "\xA1Chisp\xEDn brilla con fuerza! \xA1Subeprecios no soporta la luz!"]
      ],
      t_prisas: [
        ["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1V\xE9ndeme tu \xE1rbol del tiempo! \xA1YA!"]
      ],
      a_prisas: [
        ["brotin", "\xA1Brot\xEDn echa ra\xEDces y no se mueve! \xA1Prisas tropieza y sale rodando!"]
      ],
      t_fachada: [
        ["fachada", "\xA1Compra trocitos de mi bazar! \xA1Mira c\xF3mo brilla!"]
      ],
      a_fachada: [
        ["repartija", "\xA1Repartija teje un hilo y le quita la pintura dorada! \xA1Detr\xE1s no hay nada!"]
      ],
      t_chollo: [
        ["donchollo", "\xA1Dame tus monedas y esta noche te las triplico! \xA1En secreto!"]
      ],
      a_chollo: [
        ["olfatin", "\xA1Snif! \xA1Huele a timo! \xA1Olfat\xEDn le persigue hasta la salida!"]
      ],
      t_panico: [
        ["panico", "\xA1AAAH! \xA1Se acaba el mundo! \xA1Vende todo, VENDE!"]
      ],
      a_panico: [
        ["calmin", "Uuuh\u2026 Calm\xEDn abre las alas y todo se queda en silencio. P\xE1nico se calma\u2026 y se va."]
      ],
      merma_furiosa: [
        ["merma", "\xA1Grrr! \xA1Da igual! \xA1Mi m\xE1quina hace m\xE1s monedas que nadie! \xA1Infinitas!"]
      ],
      pendulo_forja: [
        ["pendulo", "Infinitas\u2026 Ese es su punto d\xE9bil."],
        ["pendulo", "Tus cuatro medallas. D\xE1melas. Vamos a forjar algo que la m\xE1quina no pueda copiar."]
      ],
      merma_copia: [
        ["merma", "\xBFUna moneda? \xA1JA! \xA1M\xE1quina, c\xF3piala! \xA1Haz mil iguales!"],
        ["chispin", "\xA1La m\xE1quina tiembla! \xA1Le salen tornillos por todas partes!"]
      ],
      maquina_apagada: [
        ["chispin", "\xA1CRAC! \xA1La m\xE1quina se ha atascado\u2026 y se ha apagado!"],
        ["merma", "\xA1Nooo! Sin monedas nuevas\u2026 no puedo\u2026 robar\u2026 brillo\u2026"],
        ["chispin", "\xA1Merma se ha deshecho en humo!"]
      ],
      todo_brilla: [
        ["pendulo", "Mira arriba. Mira a tu alrededor."],
        ["pendulo", "El Mercado, el Valle, la Ciudad, la Torre y el Gran Reloj. Todo Valoria brilla otra vez."],
        ["chispin", "\xA1Lo hemos conseguido! \xA1Y hay algo m\xE1s en la bolsa del abuelo\u2026 la \xFAltima p\xE1gina!"]
      ],
      charla_pendulo: [
        ["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1."]
      ],
      charla_vaiven: [
        ["vaiven", "\xA1Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."]
      ],
      charla_memoria: [
        ["memoria", "He visto cien tormentas. Todas pasaron."]
      ],
      charla_euforio: [
        ["euforio", "\xA1Fiesta, fiesta! \xA1Todo sube! \xA1Compra, compra!"]
      ],
      charla_panico: [
        ["panico", "\xA1Aaah! \xA1Se acaba el mundo! \xA1Vende todo!"]
      ],
      charla_merma: [
        ["merma", "Todo lo quieto es m\xEDo."]
      ]
    }
  };
  var tn = [null, [ba, Ta],
      [va, Mi],
      [xa, Hi],
      [Aa, Ti],
      [wa, Bi],
      [za, Li],
      [Ia, Si],
      [Da, Gi],
      [ja, Vi],
      [Na, Oi],
      [Ea, Fi],
      [Pa, Qi],
      [Ra, $i],
      [Ma, ki],
      [Ha, Ka]
    ],
    sn = 15,
    Xa = {
      mercado: "Mercado del Pueblo",
      valle: "Valle de la Nieve",
      ciudad: "Ciudad de las Empresas",
      torre: "Torre del Rev\xE9s",
      reloj: "Gran Reloj"
    };
  async function rn() {
    await bi();
    let i = new da(document.getElementById("mundo"));
    i.ui = x, window.valoria = {
      Estado: e,
      mundo: i,
      ui: x,
      ajustes: L,
      Mapa: P
    }, ReactDOM.createRoot(document.getElementById("ui")).render(React.createElement(wi, null)), addEventListener("keydown", s => {
      let r = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0]
      } [s.key];
      if (r && !e.ocupado) {
        let l = i.celda_heroe();
        i.ir({
          x: l.x + r[0],
          y: l.y + r[1]
        }), s.preventDefault()
      } else(s.key === "Enter" || s.key === " ") && x.vista.dialogo && !x.vista.capa && (x.avanzar(), s.preventDefault())
    });
    let a = e.cargar();
    await x.pantalla_titulo(a, e.mision) !== "continuar" && (e.reiniciar(), e.borrar_partida()), i.restaurar(e.mision), x.textos_carta = Ta.textos.carta;
    let t = !1;
    for (; e.mision <= sn;) {
      t = !0, e.guardar();
      let [s, r] = tn[e.mision];
      await new s(e.mision, r).jugar(i, x), e.mision += 1
    }
    e.guardar(), e.maquina_apagada && (x.textos_carta = Ta.textos.carta + `

` + Ka.textos.carta_final), t || await x.decir([
      ["chispin", "\xA1Hola otra vez! Todo Valoria sigue brillando."]
    ]), e.paso = "libre", e.ocupado = !1, x.poner_mision(Xa[e.zona] + " \xB7 toca el mapa para viajar"), x.viaje_pedido = async s => {
      await x.viajar(Xa[s], "", () => {
        e.zona = s, i.restaurar(e.mision)
      }), e.guardar(), e.paso = "libre", e.ocupado = !1, x.poner_mision(Xa[s] + " \xB7 toca el mapa para viajar")
    }
  }
  rn();
})();