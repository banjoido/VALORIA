// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

const definirPropiedad = Object.defineProperty;

const asignarCampo = (i, a, o) => a in i ? definirPropiedad(i, a, {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: o
}) : i[a] = o;

export const campo = (i, a, o) => asignarCampo(i, typeof a != "symbol" ? a + "" : a, o);
