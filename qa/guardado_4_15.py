"""Prueba del guardado por pasos en las misiones 4 a 15 (docs/guardado.md).

Para cada caso empieza una partida sembrada en esa misión (como el quinto
argumento de qa/bot.py), juega con el bot hasta un punto de control, da unos
pasos más sin salir de él, recarga la página, pulsa "Continuar" y comprueba que
se retoma en el mismo paso con el mismo estado (monedas, huerto, árbol,
trocitos, criaturas, péndulo, personajes visibles, tormenta, héroe...) y los
mismos campos propios de la misión. Después sigue jugando hasta terminar la
misión, para ver que el resto funciona igual. En la 15 juega hasta el final y
comprueba que, tras recargar, el modo libre sigue funcionando.

Uso: python3 qa/guardado_4_15.py [misión ...]   (sin argumentos, todos los casos)
"""
import asyncio, json, sys, time
sys.path.insert(0, 'qa')
from lib import *
from bot import STEP_JS

CLAVE = 'valoria-partida'
CRIATURAS = {4: ['chispin'], 5: ['chispin', 'brotin'], 8: ['chispin', 'brotin', 'escudon'],
             11: ['chispin', 'brotin', 'escudon', 'repartija', 'olfatin'],
             12: ['chispin', 'brotin', 'escudon', 'repartija', 'olfatin'],
             14: ['chispin', 'brotin', 'escudon', 'repartija', 'olfatin'],
             15: ['chispin', 'brotin', 'escudon', 'repartija', 'olfatin', 'calmin']}

# (misión, zona inicial, paso, condición extra sobre (estado, guardado), pasos extra, campos esperados, comprobaciones)
CASOS = [
    # Valle: segunda cosecha (this.cosecha = 1), tras replantar: 6 brotes.
    (4, 'mercado', 'cosechar', lambda e, g: len([b for b in e['brotes'] if b[4] == 'valle']) >= 6, 0,
     {'cosecha': 1}, []),
    # Valle: el árbol en su segunda estación, ya visto el Viejo Raíz.
    (5, 'valle', 'ir_anillos', None, 3,
     # El bot a veces vende el primer árbol a Prisas: ventas puede ser 0 o 1.
     lambda c, e: {k: v for k, v in (c or {}).items() if k != 'ventas'} == {'estacionArbol': 2, 'vioRaiz': True, 'vioAnillos': False}
     and (c or {}).get('ventas') in (0, 1),
     [('arbol', 2), ('vis:escarcha', True), ('vis:prisas', False)]),
    # Ciudad: investigando, con una de las tres pistas ya vista.
    (8, 'ciudad', 'investigar', lambda e, g: len((g.get('campos') or {}).get('investigados', [])) == 1, 3,
     None, []),
    # Torre: tras pedir el préstamo; Deudón sigue ahí.
    (11, 'torre', 'ir_reves', None, 3,
     lambda c, e: (c or {}).get('eleccion') == {20: 'prestamo', 8: 'pagar'}.get(e['monedas'], 'no'),
     [('vis:deudon', True)]),
    # Torre: dos puertas abiertas; el Revés espera al fondo.
    (12, 'torre', 'puerta_3', None, 0, None,
     [('vis:puerta_1', False), ('vis:puerta_2', False), ('vis:puerta_3', True), ('reves', [9, 31])]),
    # Gran Reloj: en plena tormenta, con Calmín recién llegado.
    (14, 'reloj', 'ir_pendulo', None, 3, None,
     [('tormenta', True), ('vis:panico', True), ('pendulo', -0.9), ('calmin', True)]),
    # Gran Reloj: antes de la máquina; después, hasta el final y el modo libre.
    (15, 'reloj', 'ir_maquina', None, 3, None, [('maquina_apagada', False)]),
]

ESTADO_JS = """() => { const e = window.valoria && window.valoria.Estado, m = window.valoria && window.valoria.mundo;
  if (!e || !m) return null;
  return {mision: e.mision, paso: e.paso, ocupado: e.ocupado, zona: e.zona, monedas: e.monedas, frutos: e.frutos,
          semillas: e.semillas, estacion: e.estacion, arbol: e.arbol, pendulo: e.pendulo, patines: e.patines,
          maquina_apagada: e.maquina_apagada, trocitos: e.trocitos, criaturas: [...e.criaturas],
          calmin: e.criaturas.includes('calmin'),
          brotes: e.brotes.map(b => [b.celda.x, b.celda.y, b.fruto, b.cuantos, b.zona || 'mercado']),
          celda: m.celda_heroe(), visibles: {...m.visibles}, tormenta: m.tormentaOn,
          reves: m.posiciones.reves ? [m.posiciones.reves.x, m.posiciones.reves.y] : null}; }"""

# Lo que debe ser igual al retomar que al llegar al paso.
IGUALES = ['zona', 'monedas', 'frutos', 'semillas', 'estacion', 'arbol', 'pendulo', 'patines', 'maquina_apagada',
           'trocitos', 'criaturas', 'brotes', 'visibles', 'tormenta', 'reves']


async def estado(p):
    return await p.evaluate(ESTADO_JS)


async def guardado(p):
    return await p.evaluate("(k) => JSON.parse(localStorage.getItem(k) || 'null')", CLAVE)


async def jugar_hasta(p, cond, max_pasos=6000):
    # Igual que bot.py: si se queda mucho en el mismo paso, prueba botones al azar.
    same = 0; last = None; stay = 0; lastkey = None
    for _ in range(max_pasos):
        e = await estado(p)
        if e and await cond(e):
            return e
        info = await p.evaluate(STEP_JS, ['random' if stay > 250 else 'first', same])
        key = (info['mision'], info['paso'])
        stay = stay + 1 if key == lastkey else 0; lastkey = key
        sig = json.dumps(info, sort_keys=True)
        same = same + 1 if sig == last else 0; last = sig
        await p.wait_for_timeout(90)
    raise RuntimeError(f'no se llegó a la condición; último estado {await estado(p)}')


async def continuar(p):
    await p.wait_for_timeout(1200)
    await p.locator('#ui button', has_text='Continuar').first.click()
    await p.wait_for_timeout(300)

    async def suelto(e):
        return e['paso'] != 'titulo' and not e['ocupado']
    return await jugar_hasta(p, suelto, max_pasos=400)


async def caso(pw, mision, zona, paso, extra_cond, extra, campos, checks, comprobar, t0):
    b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
    ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1, has_touch=True, is_mobile=True)
    p = await ctx.new_page(); logs = []
    p.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
    await p.route('**/*', route)
    semilla = {'mision': mision, 'zona': zona, 'monedas': 20, 'brillo': 5, 'precio_pan': 5,
               'criaturas': CRIATURAS[mision], 'tiene_chispin': True, 'ojo_tasador': True}
    if mision >= 13:
        semilla['trocitos'] = {'fiel': 1, 'engranaje': 1}
    await p.add_init_script("if(!sessionStorage.getItem('s')){sessionStorage.setItem('s',1);localStorage.setItem('%s', %s)}"
                            % (CLAVE, json.dumps(json.dumps(semilla))))
    await p.goto('file://' + str(ROOT / 'juego/dist/index.html')); await p.wait_for_timeout(1200)
    await p.locator('#ui button', has_text='Continuar').first.click()

    async def llega(e):
        if e['mision'] != mision or e['paso'] != paso or e['ocupado']:
            return False
        return not extra_cond or extra_cond(e, await guardado(p) or {})
    llegada = await jugar_hasta(p, llega)
    print(f'[{round(time.time()-t0)}s] misión {mision}, paso {paso}: {llegada["monedas"]} monedas, zona {llegada["zona"]}')
    same = 0
    for _ in range(extra * 10):
        e = await estado(p)
        if e['paso'] != paso or e['mision'] != mision or (await guardado(p)).get('punto') != paso:
            break
        await p.evaluate(STEP_JS, ['first', same]); same += 1
        await p.wait_for_timeout(90)
    antes = await estado(p)
    g = await guardado(p)
    if mision == 8:
        # Pasar a segundo plano reescribe la última partida coherente.
        await p.evaluate("""(k) => { localStorage.removeItem(k);
          Object.defineProperty(document, 'visibilityState', {value: 'hidden', configurable: true});
          document.dispatchEvent(new Event('visibilitychange'));
          delete document.visibilityState; }""", CLAVE)
        comprobar(await guardado(p) == g, 'visibilitychange vuelve a escribir la partida')
    print(f'  recargo en paso {antes["paso"]}; guardado: punto={g.get("punto")!r}, campos={g.get("campos")}')
    await p.reload(); await p.wait_for_timeout(800)
    despues = await continuar(p)
    print(f'  tras Continuar: misión {despues["mision"]}, paso {despues["paso"]}, {despues["monedas"]} monedas, héroe en {despues["celda"]}')
    comprobar(despues['mision'] == mision, f'm{mision}: misión conservada')
    # Si los pasos extra llevaron a un momento sin punto de control (victoria...),
    # se retoma en el último punto guardado, que sigue siendo `paso`. Si llegaron
    # al siguiente punto de control, se retoma en ese y no se compara con `paso`.
    punto_g = g.get('punto')
    comprobar(punto_g in (paso, antes['paso']), f'm{mision}: se guardó el punto de control {punto_g!r} (en {antes["paso"]!r})')
    comprobar(despues['paso'] == punto_g, f'm{mision}: se retoma en el paso {punto_g!r}')
    if punto_g != paso:
        print(f'  aviso: los pasos extra llegaron a {punto_g!r}; no se compara el estado de {paso!r}')
        campos, checks = None, []
    else:
        distintos = [k for k in IGUALES if despues[k] != llegada[k]]
        comprobar(not distintos, f'm{mision}: mismo estado que al llegar al paso'
                  + (f' (distinto: {[(k, llegada[k], despues[k]) for k in distintos]})' if distintos else ''))
    comprobar(despues['celda'] == g.get('celda'), f'm{mision}: héroe donde estaba al llegar al paso {g.get("celda")}')
    if callable(campos):
        comprobar(campos(g.get('campos'), despues), f'm{mision}: campos de la misión guardados coherentes ({g.get("campos")})')
    elif campos is not None:
        comprobar(g.get('campos') == campos, f'm{mision}: campos de la misión guardados {campos} (hay {g.get("campos")})')
    for k, v in checks:
        real = despues['visibles'].get(k[4:]) if k.startswith('vis:') else despues[k]
        comprobar(real == v, f'm{mision}: {k} = {v} (hay {real})')
    # El resto de la misión debe seguir funcionando.
    if mision < 15:
        async def acaba(e):
            return e['mision'] > mision
        fin = await jugar_hasta(p, acaba)
        comprobar(True, f'm{mision}: la misión termina tras retomar (pasa a la {fin["mision"]})')
    else:
        async def libre(e):
            return e['paso'] == 'libre' and not e['ocupado']
        fin = await jugar_hasta(p, libre)
        comprobar(fin['maquina_apagada'] and fin['mision'] == 16, 'm15: final con la máquina apagada, misión 16')
        gf = await guardado(p)
        comprobar(not gf.get('punto'), 'm15: tras el final se guarda sin punto de control')
        await p.reload(); await p.wait_for_timeout(800)
        tras = await continuar(p)
        comprobar(tras['paso'] == 'libre' and tras['mision'] == 16 and tras['maquina_apagada'],
                  f'm15: al recargar sigue en modo libre (paso {tras["paso"]}, misión {tras["mision"]})')
        r = await p.evaluate("""async () => { const ui = window.valoria.ui, e = window.valoria.Estado;
            await ui.viaje_pedido('valle'); return [e.zona, e.paso, e.ocupado]; }""")
        comprobar(r == ['valle', 'libre', False], f'm15: en modo libre se puede viajar ({r})')
    errores = [l for l in logs if 'pageerror' in l]
    for l in errores: print(l)
    comprobar(not errores, f'm{mision}: sin errores de página')
    await b.close()


async def main():
    elegidas = {int(a) for a in sys.argv[1:]}
    fallos = []

    def comprobar(ok, msg):
        print(('  ok    ' if ok else '  FALLO ') + msg)
        ok or fallos.append(msg)
    t0 = time.time()
    async with async_playwright() as pw:
        for c in CASOS:
            if elegidas and c[0] not in elegidas:
                continue
            try:
                await caso(pw, *c, comprobar, t0)
            except Exception as ex:
                comprobar(False, f'm{c[0]}: {ex}')
    print('RESULTADO', 'OK' if not fallos else f'FALLOS: {len(fallos)}')
    sys.exit(0 if not fallos else 1)


if __name__ == '__main__':
    asyncio.run(main())
