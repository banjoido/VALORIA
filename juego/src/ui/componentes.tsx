// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import React, { useState, useEffect, useRef } from 'react';
import { ajustes } from '../ajustes';
import { ESTACIONES, estado } from '../estado';
import { imagen } from '../mundo/mundo';
import { Ai, NOMBRES_ZONA_CORTOS, PERSONAJES, colorDe, nombreDe, qi } from '../personajes';
import { SPRITES } from '../recursos/sprites';
import { CAPAS } from './capas';
import { interfaz, vista } from './controlador';
import { Avisos, FichaMano } from './puesto';
import { listos } from '../reino/tiempo';

export function Icono({
  n: i,
  e: a = 2,
  style: o
}) {
  let t = imagen(i);
  return t ? React.createElement("img", {
    className: "ico",
    src: SPRITES[i],
    alt: "",
    style: {
      width: t.width * a,
      height: t.height * a,
      ...o
    }
  }) : null;
}

export function Hueco({
  n: i,
  e: a = 3
}) {
  return React.createElement("span", {
    className: "hueco"
  }, React.createElement(Icono, {
    n: i,
    e: a
  }));
}

export function Boton({
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
    className: `btn ${o ? "dorado" : ""} ${a ? "con-icono" : ""} ${c ? "pulsado" : ""} ${l}`,
    disabled: s,
    onClick: () => {
      interfaz.sonar("siguiente"), t && t();
    },
    ...g
  }, a && React.createElement(Hueco, {
    n: a,
    e: r
  }), React.createElement("span", null, i));
}

export const EtiquetaNombre = ({
  quien: i
}) => React.createElement("span", {
  className: "etq-nombre",
  style: {
    background: colorDe(i)
  }
}, nombreDe(i));

export function Bocadillo({
  texto: i
}) {
  return React.createElement("div", {
    className: "bocadillo"
  }, React.createElement(Icono, {
    n: "chispin",
    e: 2
  }), React.createElement("p", null, i));
}

export function Medidor({
  colores: i
}) {
  return React.createElement("div", {
    className: "medidor"
  }, i.map((a, o) => React.createElement("span", {
    key: o,
    style: {
      background: a
    }
  })));
}

export function Marcador() {
  // Pulso del contador al cobrar, parpadeo rojo al pagar (sección 9) y parpadeo
  // del palito de brillo que se apaga cuando Merma sube.
  let num = useRef(null),
    segs = useRef(null),
    antes = useRef([estado.monedas, estado.brillo]);
  useEffect(() => {
    let [m, b] = antes.current,
      d = estado.monedas - m;
    d > 0 && num.current && num.current.animate([{
      transform: "scale(1.3)"
    }, {
      transform: "scale(1)"
    }], 250), d < 0 && num.current && num.current.animate([{
      color: "#ff8f7a"
    }, {
      color: "#fdf3d8"
    }], 450), estado.brillo < b && segs.current && segs.current.children[estado.brillo] && segs.current.children[estado.brillo].animate([{
      background: qi
    }, {
      background: Ai
    }], {
      duration: 300,
      iterations: 3
    }), antes.current = [estado.monedas, estado.brillo];
  });
  return React.createElement("div", {
    className: "hud"
  }, React.createElement("div", {
    className: "caja fila"
  }, React.createElement(Icono, {
    n: "moneda",
    e: 2
  }), React.createElement("b", {
    className: "num",
    ref: num
  }, estado.monedas), React.createElement("span", {
    className: "segs",
    ref: segs
  }, [0, 1, 2, 3, 4].map(i => React.createElement("i", {
    key: i,
    style: {
      background: i < estado.brillo ? qi : Ai
    }
  })))), React.createElement("div", {
    className: "hueco-flex"
  }), React.createElement("div", {
    className: "caja fila"
  }, React.createElement("span", {
    className: "peq"
  }, ESTACIONES[estado.estacion]), React.createElement("span", {
    className: "chip-calma"
  }, "CALMA")), React.createElement("button", {
    className: "btn voz",
    onClick: () => interfaz.alternar_sonido(),
    "aria-label": "Activar o desactivar la voz y el sonido"
  }, estado.sonido ? "Voz" : "Mudo"), React.createElement(Avisos, null));
}

// Lo que hay listo para recoger: el huerto propio de todas las zonas y los frutos de la historia.
function cuantosListos() {
  let n = estado.frutos_listos();
  for (let z of Object.values(listos())) for (let k of Object.values(z)) n += k;
  return n;
}

export function PanelMision() {
  if (!vista.mision || vista.dialogo) return null;
  let i = estado.progreso_actual(),
    a = (Math.max(-1, Math.min(1, estado.pendulo)) + 1) / 2;
  return React.createElement("div", {
    className: "mision"
  }, React.createElement("div", {
    className: "mision-t"
  }, vista.mision), React.createElement("div", {
    className: "barra"
  }, React.createElement("i", {
    style: {
      width: i + "%"
    }
  })), React.createElement("div", {
    className: "mision-p"
  }, (NOMBRES_ZONA_CORTOS[estado.zona] || "Valoria") + " brilla al " + i + "%"), estado.zona === "reloj" && !estado.maquina_apagada && React.createElement("div", {
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
      left: `calc(${a * 100}% - 2px)`
    }
  })), React.createElement("span", {
    style: {
      color: "#ff8fbd"
    }
  }, "Euforia")));
}

export function Navegacion() {
  let listosN = cuantosListos();
  return React.createElement("nav", {
    className: "nav"
  }, React.createElement(FichaMano, null), [["mochila", "Mochila", "mochila", 2], ["huerto", "Huerto", "huerto", 2], ["mapa", "Mapa", "mapa", 2], ["criaturas", "Criaturas", "chispin", 3]].map(([a, o, t, s]) => React.createElement("button", {
    key: a,
    className: "btn nav-b",
    onClick: () => interfaz.panel(a)
  }, React.createElement(Icono, {
    n: t,
    e: s
  }), React.createElement("span", null, o), a === "huerto" && listosN > 0 && React.createElement("em", {
    className: "insignia"
  }, listosN > 99 ? "99+" : listosN))));
}

export function Dialogo() {
  let i = vista.dialogo,
    [, a] = useState(0);
  if (useEffect(() => {
    if (!i) return;
    let l,
      c = () => {
        a(g => g + 1), l = requestAnimationFrame(c);
      };
    return l = requestAnimationFrame(c), () => cancelAnimationFrame(l);
  }, [i]), !i) return null;
  let o = i.completo ? i.texto.length : Math.floor((performance.now() - i.inicio) / 24 * ajustes.velocidad),
    t = imagen(i.quien === "abuelo" ? "abuelo" : i.quien) || imagen("chispin"),
    s = PERSONAJES[i.quien] ? i.quien : "chispin",
    r = Math.max(2, Math.floor(Math.min(66 / t.width, 86 / t.height)));
  return React.createElement("div", {
    className: "dialogo",
    onClick: () => interfaz.avanzar(),
    role: "button",
    tabIndex: 0,
    onKeyDown: l => (l.key === "Enter" || l.key === " ") && interfaz.avanzar()
  }, React.createElement(EtiquetaNombre, {
    quien: s
  }), React.createElement("div", {
    className: "fila arriba"
  }, React.createElement("div", {
    className: "retrato"
  }, React.createElement(Icono, {
    n: imagen(i.quien) ? i.quien : "chispin",
    e: r
  })), React.createElement("div", {
    className: "dialogo-der"
  }, React.createElement("p", null, i.texto.slice(0, o)), React.createElement("small", null, "Toca para seguir"))));
}

export function Noche() {
  let i = vista.noche;
  return i ? React.createElement("div", {
    className: `noche ${i.opaco ? "visible" : ""} ${i.rapido ? "rapido" : ""}`,
    onPointerDown: () => interfaz.saltar_noche()
  }, React.createElement("div", {
    className: "noche-c"
  }, !i.viaje && React.createElement("i", {
    className: "luna"
  }), React.createElement("h2", null, i.titulo), React.createElement("p", null, i.sub))) : null;
}

export function Capa() {
  let i = vista.capa;
  if (!i) return null;
  let a = CAPAS[i.tipo];
  return React.createElement("div", {
    className: "capa"
  }, React.createElement("div", {
    className: "marco",
    key: i.id
  }, React.createElement(a, {
    c: i
  })));
}
