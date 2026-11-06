// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import React, { useState, useEffect, useRef } from 'react';
import { ajustes } from '../ajustes';
import { estado } from '../estado';
import { qi } from '../personajes';
import { Bocadillo, Boton, EtiquetaNombre, Hueco, Icono } from './componentes';
import { interfaz } from './controlador';

export function MinijuegoAmasar({
  c: i
}) {
  let [a, o] = useState(0),
    [t, s] = useState(0),
    [, r] = useState(0),
    l = useRef(performance.now()),
    c = useRef(null),
    g = () => (Math.sin((performance.now() - l.current) / 1e3 * 3.2) + 1) / 2;
  useEffect(() => {
    let d,
      w = () => {
        r(ra => ra + 1), d = requestAnimationFrame(w);
      };
    return d = requestAnimationFrame(w), () => cancelAnimationFrame(d);
  }, []);
  let A = t >= 6,
    y = Math.max(3, Math.min(5, a));
  useEffect(() => {
    if (A) {
      let d = setTimeout(() => i.responder(y), 900 / ajustes.velocidad);
      return () => clearTimeout(d);
    }
  }, [A]);
  let N = () => {
    if (A) return;
    let d = g();
    d > .36 && d < .64 ? (o(w => w + 1), interfaz.sonar("acierto"), c.current && c.current.animate([{
      transform: "scale(1.2,0.8)"
    }, {
      transform: "scale(1,1)"
    }], 250)) : interfaz.sonar("fallo"), s(w => w + 1);
  };
  return React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: i.quien
  }), React.createElement("h2", null, i.titulo), React.createElement("p", {
    className: "suave"
  }, "Toca cuando la marca pase por la zona dorada."), React.createElement("div", {
    className: "fila centrar"
  }, React.createElement("span", {
    ref: c
  }, React.createElement(Icono, {
    n: i.icono,
    e: 6
  }))), React.createElement("div", {
    className: "pista-amasar"
  }, React.createElement("i", {
    className: "zona"
  }), React.createElement("b", {
    style: {
      left: `calc(${g() * 100}% - 3px)`
    }
  })), React.createElement("p", {
    className: "centro suave"
  }, A ? `\xA1Has ganado ${y} monedas!` : `Golpes buenos: ${a} de ${t || 6}`), React.createElement(Boton, {
    dorado: !0,
    texto: i.accion,
    disabled: A,
    onClick: N
  }));
}

export function Pregunta({
  c: i
}) {
  let [a, o] = useState(null),
    t = a === i.correcta;
  return useEffect(() => {
    a && (interfaz.sonar(t ? "moneda" : "siguiente"), interfaz.hablar(t ? i.bien : i.mal, "chispin"));
  }, [a]), React.createElement(React.Fragment, null, React.createElement(Bocadillo, {
    texto: i.texto
  }), i.opciones.map(s => React.createElement(Boton, {
    key: s[0],
    icono: s[2],
    escala: s[3] || 3,
    texto: s[1],
    disabled: !!a,
    pulsado: a === s[0],
    onClick: () => o(s[0])
  })), a && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "fila centrar"
  }, [1, .75, .45, .2].map(s => React.createElement(Icono, {
    key: s,
    n: "moneda",
    e: 3,
    style: {
      opacity: s
    }
  }))), React.createElement("p", null, t ? i.bien : i.mal), React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder(t)
  })));
}

export function OjoTasador({
  c: i
}) {
  let [a, o] = useState({});
  return React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: "tasador"
  }), React.createElement("h2", null, `Ojo de tasador \xB7 ${i.i + 1} de ${i.n}`), React.createElement("p", {
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
    }, React.createElement(Icono, {
      n: s.icono,
      e: 3
    })), React.createElement("b", {
      className: "centro"
    }, s.nombre), React.createElement("span", {
      className: "centro oro"
    }, s.precio, " monedas"), React.createElement("small", {
      className: "centro suave detalle"
    }, a[t] ? s.detalle : ""), React.createElement(Boton, {
      texto: "Mirar",
      onClick: () => o({
        ...a,
        [t]: !0
      })
    }), React.createElement(Boton, {
      dorado: !0,
      texto: "Elegir",
      onClick: () => i.responder(t)
    }));
  })));
}

export function ListaCompra({
  c: i
}) {
  let [a, o] = useState({}),
    t = i.cosas.reduce((s, r) => s + (a[r.id] ? +r.precio : 0), 0);
  return React.createElement(React.Fragment, null, React.createElement("h2", null, i.titulo), React.createElement("p", {
    className: "suave"
  }, `Tienes ${i.total} monedas. Toca lo que quieras comprar.`), i.cosas.map(s => React.createElement(Boton, {
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
  }, `Gastas ${t} de ${i.total} monedas`), React.createElement(Boton, {
    dorado: !0,
    texto: "Comprar lo elegido",
    disabled: t > i.total,
    onClick: () => i.responder(i.cosas.filter(s => a[s.id]).map(s => s.id))
  }));
}

export function Reparto({
  c: i
}) {
  let [a, o] = useState(Object.fromEntries(i.opciones.map(r => [r[0], 0]))),
    t = Object.values(a).reduce((r, l) => r + l, 0),
    s = (r, l) => {
      (l > 0 && t < i.total || l < 0 && a[r] > 0) && o({
        ...a,
        [r]: a[r] + l
      });
    };
  return React.createElement(React.Fragment, null, React.createElement("h2", null, i.titulo), React.createElement("p", {
    className: "suave"
  }, i.nota), i.opciones.map(r => React.createElement("div", {
    className: "fila",
    key: r[0]
  }, React.createElement(Hueco, {
    n: r[2]
  }), React.createElement("b", {
    className: "crece"
  }, r[1]), React.createElement(Boton, {
    className: "mini",
    texto: "\u2212",
    onClick: () => s(r[0], -1),
    "aria-label": "Quitar de " + r[1]
  }), React.createElement("b", {
    className: "oro num-g"
  }, a[r[0]]), React.createElement(Boton, {
    className: "mini",
    texto: "+",
    onClick: () => s(r[0], 1),
    "aria-label": "Poner en " + r[1]
  }))), React.createElement("p", {
    className: "centro oro"
  }, t < i.total ? `Te quedan ${i.total - t} por repartir` : "\xA1Todo repartido!"), React.createElement(Boton, {
    dorado: !0,
    texto: "\xA1Listo!",
    disabled: t < i.total,
    onClick: () => i.responder(a)
  }));
}

export function ListaComprobacion({
  c: i
}) {
  let [a, o] = useState({}),
    t = i.lista.every((s, r) => a[r]);
  return React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: i.quien
  }), React.createElement("div", {
    className: "fila"
  }, React.createElement(Icono, {
    n: i.icono,
    e: 3
  }), React.createElement("h2", null, i.titulo)), i.lista.map((s, r) => React.createElement("div", {
    key: r,
    className: "pista-b"
  }, React.createElement("div", {
    className: "fila"
  }, React.createElement(Hueco, {
    n: s[0],
    e: 2
  }), React.createElement("div", {
    className: "col crece"
  }, React.createElement("b", null, s[1]), a[r] && React.createElement("small", {
    className: "suave"
  }, s[2])), a[r] && React.createElement(Icono, {
    n: s[3] ? "si" : "no",
    e: 2
  })), !a[r] && React.createElement(Boton, {
    icono: "lupa_icono",
    escala: 2,
    texto: "Mirar con la lupa",
    onClick: () => {
      o({
        ...a,
        [r]: !0
      }), interfaz.hablar(s[2], i.quien);
    }
  }))), React.createElement(Boton, {
    dorado: !0,
    texto: "Apuntar en el cuaderno",
    disabled: !t,
    onClick: () => i.responder()
  }));
}

export function Forja({
  c: i
}) {
  let [a, o] = useState(!1);
  return React.createElement(React.Fragment, null, React.createElement(EtiquetaNombre, {
    quien: "pendulo"
  }), React.createElement("h2", null, i.textos.forja_titulo), a ? React.createElement("div", {
    className: "fila centrar"
  }, React.createElement("span", {
    className: "aparece"
  }, React.createElement(Icono, {
    n: "moneda_estrella",
    e: 8
  }))) : React.createElement("div", {
    className: "fila centrar"
  }, ["medalla_copo", "medalla_lupa", "medalla_reves", "medalla_pendulo"].map(t => React.createElement(Icono, {
    key: t,
    n: t,
    e: 4
  }))), React.createElement("p", {
    className: "suave"
  }, a ? i.textos.forja_hecha : i.textos.forja_texto), a ? React.createElement(Boton, {
    dorado: !0,
    texto: "Seguir",
    onClick: () => i.responder()
  }) : React.createElement(Boton, {
    dorado: !0,
    texto: i.textos.forja_boton,
    onClick: () => {
      o(!0), interfaz.sonar("fanfarria"), interfaz.hablar(i.textos.forja_hecha, "pendulo");
    }
  }));
}

export function Panel({
  c: i
}) {
  let a = i.panel,
    o = React.createElement(Boton, {
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
      r = Object.keys(estado.trocitos).filter(l => estado.trocitos_de(l) > 0).map(l => s[l] || l);
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "mochila",
      e: 3
    }), React.createElement("h2", null, "Mochila")), React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "moneda",
      e: 3
    }), React.createElement("p", null, `${estado.monedas} monedas \xB7 brillo ${estado.brillo} de 5`)), React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "semillas",
      e: 2
    }), React.createElement("p", null, estado.semillas > 0 ? `${estado.semillas} semillas` : "Sin semillas")), React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "fruto",
      e: 2
    }), React.createElement("p", null, `${estado.frutos} frutos`)), estado.patines && React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "patines",
      e: 2
    }), React.createElement("p", null, "Patines de cohete")), estado.maquina_apagada && React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "moneda_estrella",
      e: 2
    }), React.createElement("p", null, "La Moneda Estrella, n\xBA 1 de 21")), r.length > 0 && React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "trocito",
      e: 2
    }), React.createElement("p", null, "Trocitos de " + r.join(", "))), estado.tiene_chispin && React.createElement(Boton, {
      icono: "carta",
      texto: "Leer \xABLegado de Libertad\xBB",
      onClick: () => i.responder("leer")
    }), o);
  }
  if (a === "huerto") {
    let s = estado.brotes_aqui().length,
      r = estado.frutos_listos();
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "huerto",
      e: 3
    }), React.createElement("h2", null, "Tu huerto")), React.createElement("p", {
      className: "suave"
    }, s > 0 ? `Tienes ${s} brotes` + (r > 0 ? ` y ${r} frutos listos para recoger.` : ".") : "Aqu\xED no has plantado nada."), React.createElement(Bocadillo, {
      texto: "Las semillas trabajan mientras duermes."
    }), o);
  }
  if (a === "mapa") {
    let s = estado.paso === "libre",
      r = [["mercado", "Mercado del Pueblo", 1, estado.progreso], ["valle", "Valle de la Nieve", 4, estado.progreso_valle], ["ciudad", "Ciudad de las Empresas", 7, estado.progreso_ciudad], ["torre", "Torre del Rev\xE9s", 10, estado.progreso_torre], ["reloj", "Gran Reloj", 13, estado.progreso_reloj]],
      l = r.reduce((c, g) => c + g[3], 0);
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "fila"
    }, React.createElement(Icono, {
      n: "mapa",
      e: 3
    }), React.createElement("h2", null, "Valoria")), r.map(([c, g, A, y]) => {
      let N = estado.zona === c;
      if (s && !N && estado.mision >= A) return React.createElement(Boton, {
        key: c,
        texto: g + " \xB7 viajar",
        onClick: () => i.responder("viajar_" + c)
      });
      let d = N ? "AQU\xCD EST\xC1S" : y >= 100 ? "BRILLA" : estado.mision >= A ? "ABIERTO" : "CERRADO";
      return React.createElement("div", {
        key: c,
        className: `zona-f ${N ? "aqui" : ""}`
      }, React.createElement("span", null, g), React.createElement("em", null, d));
    }), React.createElement("p", {
      className: "peq suave"
    }, `Valoria brilla al ${Math.floor(l / 5)}%.`), o);
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
  }, React.createElement(Icono, {
    n: "chispin",
    e: 3
  }), React.createElement("h2", null, "Criaturas")), estado.tiene_chispin && React.createElement("div", {
    className: "criatura fila"
  }, React.createElement(Icono, {
    n: "chispin",
    e: 4
  }), React.createElement("div", {
    className: "col"
  }, React.createElement("b", null, "Chisp\xEDn"), React.createElement("small", {
    className: "suave"
  }, "Crece y evoluciona con los frutos de lo invertido."))), estado.criaturas.map(s => React.createElement("div", {
    key: s,
    className: "criatura fila"
  }, React.createElement(Icono, {
    n: s,
    e: 4
  }), React.createElement("div", {
    className: "col"
  }, React.createElement("b", null, t[s][0]), React.createElement("small", {
    className: "suave"
  }, t[s][1])))), React.createElement("p", {
    className: "suave"
  }, estado.criaturas.length >= 5 ? "\xA1Has encontrado todas las criaturas de Valoria!" : `${5 - estado.criaturas.length} criaturas m\xE1s por descubrir en Valoria.`), o);
}
