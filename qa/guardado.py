"""Prueba del guardado por pasos (docs/guardado.md).

Juega con el bot hasta mitad de una misión, recarga la página, pulsa
"Continuar" y comprueba que se retoma en el mismo punto de control, con las
mismas monedas y el mismo huerto. Encadena las misiones 1, 2, 3 y el primer
paso de la 4 (aún en el mercado, antes del viaje al valle). Las misiones 4 a 15
se prueban a fondo en qa/guardado_4_15.py.

Uso: python3 qa/guardado.py
"""
import asyncio, json, sys, time
sys.path.insert(0, 'qa')
from lib import *
from bot import STEP_JS

# (misión, paso en el que se recarga, pasos extra del bot antes de recargar)
CASOS = [
    (1, 'cosechar', 2),   # con el huerto a medio cosechar
    (2, 'regar', 4),      # tras comprar la regadera
    (3, 'feria', 3),      # a punto de ir a la feria
    (4, 'ir_valle', 3),   # camino del valle, aún en el mercado
]
CLAVE = 'valoria-partida'

ESTADO_JS = """() => { const e = window.valoria && window.valoria.Estado, m = window.valoria && window.valoria.mundo;
  if (!e || !m) return null;
  return {mision: e.mision, paso: e.paso, ocupado: e.ocupado, monedas: e.monedas, frutos: e.frutos,
          brotes: e.brotes.map(b => [b.celda.x, b.celda.y, b.fruto, b.cuantos]), celda: m.celda_heroe(),
          semilla: !!m.visibles.semilla, yunque: !!m.visibles.yunque}; }"""


async def estado(p):
    return await p.evaluate(ESTADO_JS)


async def guardado(p):
    return await p.evaluate("(k) => JSON.parse(localStorage.getItem(k) || 'null')", CLAVE)


async def jugar_hasta(p, cond, max_pasos=6000):
    # Igual que bot.py: si se queda mucho en el mismo paso, prueba botones al azar.
    same = 0; last = None; stay = 0; lastkey = None
    for _ in range(max_pasos):
        e = await estado(p)
        if e and cond(e):
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
    boton = p.locator('#ui button', has_text='Continuar')
    await boton.first.click()
    # Espera a que la misión suelte al jugador. Al retomar un punto de control
    # es inmediato; una misión que empieza de cero antes pasa sus diálogos.
    await p.wait_for_timeout(300)
    return await jugar_hasta(p, lambda e: e['paso'] != 'titulo' and not e['ocupado'], max_pasos=400)


async def main():
    fallos = []
    async with async_playwright() as pw:
        b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1, has_touch=True, is_mobile=True)
        p = await ctx.new_page(); logs = []
        p.on('console', lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in ('error', 'warning') else None)
        p.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await p.route('**/*', route)
        await p.goto('file://' + str(ROOT / 'juego/dist/index.html')); await p.wait_for_timeout(1200)
        t0 = time.time()

        def comprobar(ok, msg):
            print(('  ok    ' if ok else '  FALLO ') + msg)
            ok or fallos.append(msg)

        for mision, paso, extra in CASOS:
            if paso:
                llegada = await jugar_hasta(p, lambda e: e['mision'] == mision and e['paso'] == paso and not e['ocupado'])
            else:
                llegada = await jugar_hasta(p, lambda e: e['mision'] == mision and e['paso'] != 'titulo' and not e['ocupado'])
            print(f'[{round(time.time()-t0)}s] misión {mision}, paso {llegada["paso"]}: {llegada["monedas"]} monedas, {len(llegada["brotes"])} brotes')
            # Unos pasos más del bot sin salir del paso: queda a medias.
            same = 0
            for _ in range(extra * 10):
                e = await estado(p)
                if e['paso'] != llegada['paso'] or e['mision'] != mision:
                    break
                await p.evaluate(STEP_JS, ['first', same]); same += 1
                await p.wait_for_timeout(90)
            antes = await estado(p)
            g = await guardado(p)
            if mision == 2:
                # Pasar a segundo plano reescribe la última partida coherente.
                await p.evaluate("""(k) => { localStorage.removeItem(k);
                  Object.defineProperty(document, 'visibilityState', {value: 'hidden', configurable: true});
                  document.dispatchEvent(new Event('visibilitychange'));
                  delete document.visibilityState; }""", CLAVE)
                comprobar(await guardado(p) == g, 'visibilitychange vuelve a escribir la partida')
            print(f'  recargo en paso {antes["paso"]} con {antes["monedas"]} monedas; guardado: punto={g.get("punto")!r}, {g["monedas"]} monedas')
            await p.reload(); await p.wait_for_timeout(800)
            despues = await continuar(p)
            print(f'  tras Continuar: misión {despues["mision"]}, paso {despues["paso"]}, {despues["monedas"]} monedas, héroe en {despues["celda"]}')
            comprobar(despues['mision'] == mision, f'misión {mision} conservada')
            if paso:
                # Si los pasos extra del bot llegaron al siguiente punto de control, ese es el de referencia.
                ref = llegada if antes['paso'] == llegada['paso'] else None
                comprobar(g.get('punto') == antes['paso'], f'se guardó el punto de control {antes["paso"]!r}')
                comprobar(despues['paso'] == antes['paso'], f'se retoma en el paso {antes["paso"]!r}')
                comprobar(despues['monedas'] == g['monedas'], f'mismas monedas que al llegar al paso ({g["monedas"]})')
                brotes_g = [[b['celda']['x'], b['celda']['y'], b['fruto'], b['cuantos']] for b in g['brotes']]
                comprobar(despues['brotes'] == brotes_g, 'mismo huerto que al llegar al paso')
                if ref:
                    comprobar(despues['monedas'] == ref['monedas'] and despues['brotes'] == ref['brotes'],
                              f'igual que al llegar en directo ({ref["monedas"]} monedas, {len(ref["brotes"])} brotes)')
                    comprobar(despues['semilla'] == ref['semilla'] and despues['yunque'] == ref['yunque'], 'mismos personajes visibles')
                comprobar(despues['celda'] == g.get('celda'), f'héroe donde estaba al llegar al paso {g.get("celda")}')
            else:
                comprobar(not g.get('punto'), 'sin punto de control: se guardó al empezar la misión')
                comprobar(despues['monedas'] == g['monedas'], f'mismas monedas que al empezar la misión ({g["monedas"]})')
        await b.close()
    errores = [l for l in logs if 'pageerror' in l]
    for l in errores: print(l)
    comprobar_final = not fallos and not errores
    print('RESULTADO', 'OK' if comprobar_final else f'FALLOS: {len(fallos)} comprobaciones, {len(errores)} errores de página')
    sys.exit(0 if comprobar_final else 1)


if __name__ == '__main__':
    asyncio.run(main())
