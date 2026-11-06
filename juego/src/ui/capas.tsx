// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import React from 'react';
import { rellenar } from '../ajustes';
import { iniciarAudio } from '../audio';
import { spriteHeroe } from '../mundo/mundo';
import { Ai, xi } from '../personajes';
import { Bocadillo, Boton, EtiquetaNombre, Hueco, Icono, Medidor } from './componentes';
import { interfaz } from './controlador';
import { Forja, ListaCompra, ListaComprobacion, MinijuegoAmasar, OjoTasador, Panel, Pregunta, Reparto } from './minijuegos';

export const CAPAS = {
  titulo: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("h1", {
    className: "logo"
  }, "VALORIA"), React.createElement("p", {
    className: "centro suave"
  }, i.hay && i.mision > 15 ? "Todo Valoria brilla" : i.hay && i.mision >= 13 ? "El Gran Reloj" : i.hay && i.mision >= 10 ? "La Torre del Rev\xE9s" : i.hay && i.mision >= 7 ? "La Ciudad de las Empresas" : i.hay && i.mision >= 4 ? "El Valle de la Nieve" : "El Mercado del Pueblo"), React.createElement("div", {
    className: "fila centrar"
  }, (i.hay ? [spriteHeroe()] : ["heroina", "heroe"]).map(a => React.createElement(Icono, {
    key: a,
    n: a,
    e: 3
  })), React.createElement(Icono, {
    n: "chispin",
    e: 3
  })), React.createElement("p", {
    className: "centro suave"
  }, "Un reino ha perdido su brillo. T\xFA puedes devolv\xE9rselo."), i.hay ? React.createElement(React.Fragment, null, React.createElement(Boton, {
    dorado: !0,
    texto: i.mision > 15 ? "Continuar \xB7 explorar Valoria" : `Continuar \xB7 misi\xF3n ${i.mision}`,
    onClick: () => {
      iniciarAudio(), i.responder("continuar");
    }
  }), React.createElement(Boton, {
    texto: "Empezar de nuevo",
    onClick: () => {
      iniciarAudio(), i.responder("nuevo");
    }
  })) : React.createElement(Boton, {
    dorado: !0,
    texto: "Empezar la aventura",
    onClick: () => {
      iniciarAudio(), i.responder("empezar");
    }
  }), React.createElement("p", {
    className: "centro peq suave"
  }, "Con voz \xB7 toca el suelo para caminar")),
  // Partida nueva: dos personajes grandes, sin texto de género.
  elegir_heroe: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("h2", {
    className: "centro"
  }, "\xBFQui\xE9n eres?"), React.createElement("div", {
    className: "eleccion-heroe"
  }, [["chica", "heroina", "Elegir a la hero\xEDna"], ["chico", "heroe", "Elegir al h\xE9roe"]].map(([a, o, t]) => React.createElement("button", {
    key: a,
    className: "btn eleccion",
    "aria-label": t,
    onClick: () => {
      interfaz.sonar("siguiente"), i.responder(a);
    }
  }, React.createElement(Icono, {
    n: o,
    e: 5
  }))))),
  carta: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila"
  }, React.createElement(Icono, {
    n: "carta",
    e: 3
  }), React.createElement("h2", null, "Legado de Libertad")), React.createElement("div", {
    className: "pergamino"
  }, rellenar(`Querid{o} {nieto}:

`) + i.texto + `

Tu abuelo`), React.createElement(Boton, {
    dorado: !0,
    texto: i.primera ? "Coger la bolsa" : "Guardar la carta",
    onClick: () => i.responder()
  })),
  amasar: MinijuegoAmasar,
  reto: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila centrar"
  }, React.createElement(Icono, {
    n: "subeprecios",
    e: 3
  })), React.createElement(EtiquetaNombre, {
    quien: "subeprecios"
  }), React.createElement("h3", null, "\xA1Je, je! Ma\xF1ana todo costar\xE1 m\xE1s."), React.createElement(Bocadillo, {
    texto: `\xBFQu\xE9 hacemos con tus ${i.monedas} monedas?`
  }), React.createElement(Boton, {
    icono: "hucha",
    texto: "Guardarlas en la hucha",
    onClick: () => i.responder("hucha")
  }), React.createElement(Boton, {
    icono: "semillas",
    texto: "Plantar semillas (5 monedas)",
    disabled: i.monedas < 5,
    onClick: () => i.responder("semillas")
  }), React.createElement(Boton, {
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
  }, React.createElement(Hueco, {
    n: i.icono
  }), React.createElement("h2", null, i.titulo)), React.createElement("p", {
    className: "suave"
  }, i.texto), React.createElement("div", {
    className: "fila"
  }, React.createElement("span", {
    className: "etq"
  }, i.etiqueta), React.createElement(Medidor, {
    colores: i.colores
  })), React.createElement(Bocadillo, {
    texto: i.frase
  }), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder()
  })),
  elegir: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila"
  }, React.createElement(Icono, {
    n: i.icono,
    e: 3
  }), React.createElement("h2", null, i.titulo)), i.opciones.map(a => React.createElement(Boton, {
    key: a[0],
    icono: a[2],
    texto: a[1],
    disabled: !!a[3],
    onClick: () => i.responder(a[0])
  }))),
  pregunta: Pregunta,
  victoria: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila centrar"
  }, React.createElement(Icono, {
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
  }, React.createElement("small", null, "RETO EN FAMILIA"), React.createElement("p", null, i.t.reto_familia)), React.createElement(Boton, {
    dorado: !0,
    texto: i.boton,
    onClick: () => i.responder("seguir")
  })),
  ojo: OjoTasador,
  clasificar: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("h2", null, `Tu lista de la feria \xB7 ${i.i + 1} de ${i.n}`), React.createElement("div", {
    className: "fila centrar"
  }, React.createElement(Icono, {
    n: i.c.icono,
    e: 5
  })), React.createElement("h3", {
    className: "centro"
  }, `${i.c.nombre} \xB7 ${i.c.precio} monedas`), React.createElement(Bocadillo, {
    texto: "\xBFEsto lo necesitas, te hace crecer o te apetece?"
  }), React.createElement(Boton, {
    texto: "Lo necesito",
    onClick: () => i.responder("necesito")
  }), React.createElement(Boton, {
    texto: "Me hace crecer",
    onClick: () => i.responder("crecer")
  }), React.createElement(Boton, {
    texto: "Me apetece",
    onClick: () => i.responder("apetece")
  })),
  presupuesto: ListaCompra,
  comparar: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: "yunque"
  }), React.createElement("h2", null, "Lo bueno se paga una vez"), i.filas.map(a => {
    let o = String(Math.round(a[2] / a[3] * 10) / 10).replace(".", ",");
    return React.createElement("div", {
      className: "fila",
      key: a[0]
    }, React.createElement(Hueco, {
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
    }, `Dura ${a[3] === 1 ? "1 estaci\xF3n" : a[3] + " estaciones"}: ${o} monedas por estaci\xF3n`)));
  }), React.createElement(Bocadillo, {
    texto: i.frase
  }), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder()
  })),
  lista: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: i.quien
  }), React.createElement("h2", null, i.titulo), i.filas.map((a, o) => React.createElement("div", {
    className: "fila",
    key: o
  }, React.createElement(Hueco, {
    n: a[0]
  }), React.createElement("p", null, a[1]))), React.createElement(Bocadillo, {
    texto: i.frase
  }), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder()
  })),
  tabla: ({
    c: i
  }) => {
    let a = 1;
    for (let o of i.filas) for (let t of o[2]) a = Math.max(a, t);
    return React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
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
    }, React.createElement(Icono, {
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
    })), React.createElement("b", null, s)))])), React.createElement(Bocadillo, {
      texto: i.frase
    }), React.createElement(Boton, {
      dorado: !0,
      texto: "Seguir",
      onClick: () => i.responder()
    }));
  },
  repartir: Reparto,
  pistas: ListaComprobacion,
  cuaderno: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila"
  }, React.createElement(Icono, {
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
  }, React.createElement(Icono, {
    n: a[0],
    e: 2
  }), React.createElement("small", null, a[1])), ...a[2].map((t, s) => React.createElement("div", {
    key: o + "-" + s,
    className: "celda medio"
  }, React.createElement(Icono, {
    n: t ? "si" : "no",
    e: 3
  })))])), React.createElement(Bocadillo, {
    texto: i.frase
  }), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder()
  })),
  forja: Forja,
  fin: ({
    c: i
  }) => React.createElement(React.Fragment, null, React.createElement("h1", {
    className: "logo"
  }, "VALORIA"), React.createElement("h2", {
    className: "centro"
  }, i.textos.fin_titulo), React.createElement("div", {
    className: "fila centrar"
  }, [spriteHeroe(), "chispin", "brotin", "escudon", "repartija", "olfatin", "calmin"].map(a => React.createElement(Icono, {
    key: a,
    n: a,
    e: 2
  }))), React.createElement("p", {
    className: "centro suave"
  }, i.textos.fin_texto), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir explorando",
    onClick: () => i.responder()
  })),
  panel: Panel
};
