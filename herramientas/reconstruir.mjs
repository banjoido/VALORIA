// Herramienta de un solo uso: generó juego/src a partir de prototipo/legible/bundle.pretty.js.
// Uso: npm i @babel/parser @babel/traverse @babel/generator @babel/types && node herramientas/reconstruir.mjs prototipo/legible/bundle.pretty.js salida/
// Convierte el bundle desempaquetado de Valoria en módulos ES con nombres legibles.
import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import _t from '@babel/traverse';
import _g from '@babel/generator';
import * as t from '@babel/types';
const traverse = _t.default?.default ?? _t.default ?? _t, generate = _g.default?.default ?? _g.default ?? _g;

const [, , SRC, OUT] = process.argv;
const code = fs.readFileSync(SRC, 'utf8');
const ast = parse(code, { sourceType: 'script' });

// ---------- nombres ----------
const RENOMBRAR = {
  Zi: 'definirPropiedad', Yi: 'asignarCampo', D: 'campo',
  Ba: 'CLAVE_GUARDADO', Wa: 'ESTACIONES', Ua: 'ESTACIONES_CON_ARTICULO', La: 'oyentesEstado', na: 'estadoInicial', e: 'estado',
  ea: 'MAPAS', f: 'LOSETA', la: 'COLUMNAS', P: 'Mapa',
  ca: 'SPRITES', _i: 'SONIDOS',
  L: 'ajustes', p: 'esperar', Sa: 'rellenar',
  ua: 'ANCHO_MAPA', dr: 'VELOCIDAD_HEROE', hr: 'ALTO_NAVEGACION', M: 'RADIO_APAGADO', pr: 'COLORES_MERMA',
  mr: 'SECUACES', fr: 'VISIBLES_INICIALES', n: 'celda', F: 'RADIOS_APAGADOS', J: 'ZONAS', Z: 'imagenes', Ga: 'imagenesGris',
  bi: 'cargarSprites', _r: 'versionGris', ia: 'imagen', O: 'Sprite', da: 'Mundo', V: 'aleatorio', gi: 'limitar',
  X: 'PERSONAJES', br: 'nombreDe', vr: 'colorDe', xr: 'NOMBRES_ZONA_CORTOS',
  Y: 'contextoAudio', Fa: 'buffersAudio', ha: 'iniciarAudio', ma: 'vozEspanol', yi: 'elegirVoz',
  Qa: 'oyentesVista', z: 'vista', E: 'actualizarVista', yr: 'suscribirVista', x: 'ui',
  _: 'Icono', K: 'Hueco', b: 'Boton', $: 'EtiquetaNombre', Q: 'Bocadillo', Ar: 'Medidor', wr: 'Marcador',
  zr: 'PanelMision', Ir: 'Navegacion', Dr: 'Dialogo', jr: 'Noche', Nr: 'Capa', Er: 'CAPAS',
  Pr: 'MinijuegoAmasar', Cr: 'Pregunta', Rr: 'OjoTasador', Mr: 'ListaCompra', Hr: 'Reparto', Tr: 'ListaComprobacion',
  Br: 'Forja', Lr: 'Panel', wi: 'App',
  m: 'ORO', j: 'ORO_LUZ', H: 'APAGADO', fa: 'VERDE', T: 'MORADO', I: 'VERDE_CLARO', _a: 'ROJO', W: 'AZUL',
  u: 'punto', h: 'objetivo', v: 'desplazar', zi: 'ARRIBA', G: 'ABAJO', B: 'DERECHA', Ii: 'IZQUIERDA', q: 'MisionBase',
  tn: 'MISIONES', sn: 'TOTAL_MISIONES', Xa: 'NOMBRES_ZONA', rn: 'arrancar',
  S: 'useState', pa: 'useEffect', vi: 'useRef', gr: 'useSyncExternalStore',
};
const CLASES_MISION = ['ba', 'va', 'xa', 'Aa', 'wa', 'za', 'Ia', 'Da', 'ja', 'Na', 'Ea', 'Pa', 'Ra', 'Ma', 'Ha'];
const DATOS_MISION = ['Ta', 'Mi', 'Hi', 'Ti', 'Bi', 'Li', 'Si', 'Gi', 'Vi', 'Oi', 'Fi', 'Qi', '$i', 'ki', 'Ka'];
const dd = n => String(n).padStart(2, '0');
CLASES_MISION.forEach((c, i) => RENOMBRAR[c] = `Mision${dd(i + 1)}`);
DATOS_MISION.forEach((c, i) => RENOMBRAR[c] = `DATOS_M${dd(i + 1)}`);

// ---------- localizar la IIFE ----------
let fnPath;
traverse(ast, { Program(p) { fnPath = p.get('body.0.expression.callee'); p.stop(); } });
const scope = fnPath.scope;
const body = fnPath.get('body');

// Separar "var a=1, b=2" en una declaración por variable.
for (const st of body.get('body')) {
  if (st.isVariableDeclaration() && st.node.declarations.length > 1) {
    st.replaceWithMultiple(st.node.declarations.map(d => t.variableDeclaration(st.node.kind, [d])));
  }
}
scope.crawl();

// Recursos: sprites y sonidos (cadenas data:) -> archivos
const recursos = {}; // nombreVar -> {tipo, clave, archivo}
const spritesObj = body.get('body').find(s => s.isVariableDeclaration() && s.node.declarations[0].id.name === 'ca');
const sonidosObj = body.get('body').find(s => s.isVariableDeclaration() && s.node.declarations[0].id.name === '_i');
for (const [obj, tipo, ext] of [[spritesObj, 'sprite', 'png'], [sonidosObj, 'sonido', 'wav']]) {
  for (const prop of obj.node.declarations[0].init.properties) {
    const clave = prop.key.name || prop.key.value; const v = prop.value.name;
    recursos[v] = { tipo, clave, ext };
    RENOMBRAR[v] = (tipo === 'sprite' ? 'SPR_' : 'SND_') + clave.replace(/[^A-Za-z0-9_]/g, '_');
  }
}

// ---------- módulos por rango de línea ----------
const lineaDe = s => { const n = s.node; const loc = n.loc || (n.declarations && n.declarations[0].loc); return loc ? loc.start.line : null; };
const tramos = [
  [2, 9, 'util/clases.ts'],
  [10, 116, 'estado.ts'],
  [117, 251, 'mundo/mapas.ts'],
  [252, 367, 'recursos/sprites.ts'],
  [368, 374, 'recursos/sonidos.ts'],
  [375, 492, 'recursos/sprites.ts'],
  [493, 501, 'recursos/sonidos.ts'],
  [502, 512, 'ajustes.ts'],
  [513, 671, 'mundo/zonas.ts'],
  [672, 1070, 'mundo/mundo.ts'],
  [1071, 1115, 'personajes.ts'],
  [1116, 1145, 'audio.ts'],
  [1146, 1466, 'ui/controlador.ts'],
  [1467, 1703, 'ui/componentes.tsx'],
  [1704, 2013, 'ui/capas.tsx'],
  [2014, 2428, 'ui/minijuegos.tsx'],
  [2429, 2433, 'ui/App.tsx'],
  [2434, 2531, 'misiones/base.ts'],
];
const inicioClases = CLASES_MISION.map(c => {
  const s = body.get('body').find(x => x.isVariableDeclaration() && x.node.declarations[0].id.name === c);
  return lineaDe(s);
});
// constantes entre clases van con la clase siguiente; la última clase llega hasta DATOS_M01
const inicioDatos = DATOS_MISION.map(c => lineaDe(body.get('body').find(x => x.isVariableDeclaration() && x.node.declarations[0].id.name === c)));
let prev = 2532;
inicioClases.forEach((ini, i) => {
  const fin = i + 1 < inicioClases.length ? null : inicioDatos[0] - 1;
  tramos.push([prev, fin ?? 0, `misiones/m${dd(i + 1)}.ts`, ini]);
});
// resolver fines: cada misión acaba justo antes de las constantes de la siguiente
const st = body.get('body');
function moduloDe(path) {
  const l = lineaDe(path);
  const nombre = path.isVariableDeclaration() ? path.node.declarations[0].id.name : (path.node.id && path.node.id.name);
  if (nombre && recursos[nombre]) return recursos[nombre].tipo === 'sprite' ? 'recursos/sprites.ts' : 'recursos/sonidos.ts';
  if (l >= inicioDatos[0] && l < 5873) {
    let k = 0; for (let i = 0; i < inicioDatos.length; i++) if (l >= inicioDatos[i]) k = i;
    return `textos/m${dd(k + 1)}.ts`;
  }
  if (l >= 5873) return 'main.ts';
  if (l >= 2532) {
    // la primera clase cuyo inicio es >= l
    for (let i = 0; i < inicioClases.length; i++) if (l <= inicioClases[i]) return `misiones/m${dd(i + 1)}.ts`;
    return `misiones/m15.ts`;
  }
  for (const [a, b, m] of tramos) if (l >= a && l <= b) return m;
  throw new Error('sin módulo para línea ' + l);
}

// ---------- quitar la desestructuración de React; renombrar ----------
for (const [a, b] of Object.entries(RENOMBRAR)) if (scope.hasOwnBinding(a)) scope.rename(a, b);
for (const s of body.get('body')) {
  if (s.isVariableDeclaration() && t.isObjectPattern(s.node.declarations[0].id) && t.isIdentifier(s.node.declarations[0].init, { name: 'React' })) {
    s.remove();
  }
}
for (const h of ['useState', 'useEffect', 'useRef', 'useSyncExternalStore']) { /* ahora son referencias globales */ }
scope.crawl();

// ---------- asignar sentencias a módulos ----------
const sentencias = body.get('body').map(p => ({ p, mod: moduloDe(p), nombres: Object.keys(p.getBindingIdentifiers ? t.getBindingIdentifiers(p.node, false, true) || {} : {}) }));
const duenyo = {};
for (const s of sentencias) {
  if (s.p.isVariableDeclaration() || s.p.isFunctionDeclaration() || s.p.isClassDeclaration()) {
    for (const n of Object.keys(t.getBindingIdentifiers(s.p.node, false, true))) duenyo[n] = s.mod;
  }
}
function sentenciaDe(path) { let p = path; while (p && p.parentPath !== body) p = p.parentPath; return p; }
const modDeSent = new Map(sentencias.map(s => [s.p.node, s.mod]));
const importa = {}; // mod -> Map(nombre -> modOrigen)
const exporta = {}; // mod -> Set
const reasignaFuera = [];
for (const [nombre, binding] of Object.entries(scope.bindings)) {
  const origen = duenyo[nombre]; if (!origen) continue;
  for (const ref of binding.referencePaths) {
    const s = sentenciaDe(ref); const m = modDeSent.get(s.node);
    if (m && m !== origen) { (importa[m] ??= new Map()).set(nombre, origen); (exporta[origen] ??= new Set()).add(nombre); }
  }
  for (const cv of binding.constantViolations) {
    const s = sentenciaDe(cv); const m = modDeSent.get(s.node);
    if (m && m !== origen) reasignaFuera.push(`${nombre} (de ${origen}) reasignado en ${m}`);
  }
}
if (reasignaFuera.length) { console.error('REASIGNACIONES ENTRE MÓDULOS:\n' + reasignaFuera.join('\n')); }

// ---------- generar ----------
const porModulo = {}; const ordenModulos = [];
for (const s of sentencias) if (!ordenModulos.includes(s.mod)) ordenModulos.push(s.mod);
for (const s of sentencias) (porModulo[s.mod] ??= []).push(s);
const usaGlobal = (nodos, nombre) => nodos.some(n => generate(n).code.match(new RegExp('\\b' + nombre + '\\b')));
fs.rmSync(OUT, { recursive: true, force: true });
const relativo = (de, a) => { let r = path.relative(path.dirname(de), a).replace(/\.tsx?$/, ''); if (!r.startsWith('.')) r = './' + r; return r; };
for (const [mod, lista] of Object.entries(porModulo)) {
  const lineas = ['// @ts-nocheck', '// Reconstruido del prototipo publicado. Se irá tipando poco a poco.'];
  const nodos = lista.map(s => s.p.node);
  const textoTodo = nodos.map(n => generate(n).code).join('\n');
  const hooks = ['useState', 'useEffect', 'useRef', 'useSyncExternalStore'].filter(h => new RegExp('\\b' + h + '\\b').test(textoTodo));
  if (/\bReact\b/.test(textoTodo) || hooks.length) lineas.push(`import React${hooks.length ? ', { ' + hooks.join(', ') + ' }' : ''} from 'react';`);
  if (/\bReactDOM\b/.test(textoTodo)) lineas.push(`import * as ReactDOM from 'react-dom/client';`);
  if (mod === 'main.ts') { lineas.push(`import './estilos.css';`); for (const m of ordenModulos) if (m !== 'main.ts') lineas.push(`import '${relativo(mod, m)}';`); }
  const imp = importa[mod] || new Map();
  const porOrigen = {};
  for (const [n, o] of imp) (porOrigen[o] ??= []).push(n);
  for (const [o, ns] of Object.entries(porOrigen).sort()) lineas.push(`import { ${ns.sort().join(', ')} } from '${relativo(mod, o)}';`);
  // recursos
  if (mod === 'recursos/sprites.ts' || mod === 'recursos/sonidos.ts') {
    for (const s of lista) {
      const d = s.p.isVariableDeclaration() && s.p.node.declarations[0];
      const orig = Object.entries(recursos).find(([v, r]) => RENOMBRAR[v] === (d && d.id.name));
      if (orig) {
        const r = orig[1]; const dir = r.tipo === 'sprite' ? 'sprites' : 'sonidos';
        const b64 = d.init.value.split(',')[1];
        const archivo = path.join(OUT, 'recursos', dir, `${r.clave}.${r.ext}`);
        fs.mkdirSync(path.dirname(archivo), { recursive: true });
        fs.writeFileSync(archivo, Buffer.from(b64, 'base64'));
        lineas.push(`import ${d.id.name} from './${dir}/${r.clave}.${r.ext}?inline';`);
        s.omitir = true;
      }
    }
  }
  lineas.push('');
  const ex = exporta[mod] || new Set();
  const reasignadas = new Set(Object.entries(scope.bindings).filter(([, b]) => b.constantViolations.length).map(([n]) => n));
  for (const s of lista) {
    if (s.omitir) continue;
    let n = s.p.node;
    if (t.isVariableDeclaration(n)) {
      const nombre = n.declarations[0].id.name;
      n = t.variableDeclaration(reasignadas.has(nombre) ? 'let' : 'const', n.declarations);
      let c = generate(n, { retainLines: false }).code;
      if (ex.has(nombre) || (mod.startsWith('recursos/') && false)) c = 'export ' + c;
      lineas.push(c);
    } else if (t.isFunctionDeclaration(n) || t.isClassDeclaration(n)) {
      let c = generate(n).code; if (ex.has(n.id.name)) c = 'export ' + c; lineas.push(c);
    } else lineas.push(generate(n).code);
    lineas.push('');
  }
  // exportar recursos importados que se usan fuera
  if (mod.startsWith('recursos/')) for (const nme of ex) if (nme.startsWith('SPR_') || nme.startsWith('SND_')) lineas.push(`export { ${nme} };`);
  const destino = path.join(OUT, mod);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, lineas.join('\n'));
}
console.log('módulos:', Object.keys(porModulo).length);
console.log(Object.entries(porModulo).map(([m, l]) => `${m}: ${l.length}`).join('\n'));
