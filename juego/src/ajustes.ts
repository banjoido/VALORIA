// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const ajustes = {
  velocidad: 1
};

export function esperar(i) {
  return new Promise(a => setTimeout(a, i * 1e3 / ajustes.velocidad));
}

export function rellenar(i, a = {}) {
  return String(i).replace(/\{(\w+)\}/g, (o, t) => t in a ? String(a[t]) : o);
}
