"""Prueba de la vida del reino (sprint 3, tarea C).

Comprueba con Playwright, sobre juego/dist/index.html, las 8 condiciones del criterio de
aceptación (docs/especificaciones/sprint-3-bucle.md, 14.4): vecinos que responden en el
modo libre, viajar y volver durante la historia, el Mapa en un viaje del guion, los 7
secretos, «¡Buenos días!» con regalo y encargo, la presentación del huerto, el trabajo
con Hogaza una vez al día y que las otras pruebas pasan sin que el bot compre.

Uso: python3 qa/vida.py [n ...]      (solo esas comprobaciones; la 8 ejecuta qa/guardado.py y qa/guardado_4_15.py)
     python3 qa/vida.py --rapido     (la 8 solo comprueba que el bot no compra)
     python3 qa/vida.py --completo   (la 8 juega además la partida completa del bot)
Capturas: qa/.build/capturas/vida_*.png
"""
import asyncio, datetime, json, subprocess, sys, time
sys.path.insert(0, 'qa')
from lib import *
from bot import STEP_JS

SHOTS = ROOT / 'qa/.build/capturas'; SHOTS.mkdir(parents=True, exist_ok=True)
CLAVE = 'valoria-partida'
fallos = []


def comprobar(ok, msg):
    print(('  ok    ' if ok else '  FALLO ') + msg)
    ok or fallos.append(msg)


def dia(delta=0):
    return (datetime.date.today() + datetime.timedelta(days=delta)).isoformat()


TODAS = ['chispin', 'brotin', 'escudon', 'repartija', 'olfatin', 'calmin']


def partida(**o):
    base = dict(mision=16, zona='mercado', monedas=60, brillo=4, merma=1, merma_desde=30, tiempo=31, precio_pan=5,
                dia=dia(), dias_jugados=1, criaturas=TODAS[1:], tiene_chispin=True, ojo_tasador=True, heroe='chica',
                maquina_apagada=True, merma_final=True, eleccion_m01='hucha', huerto_presentado=True,
                brotes_pasados=['mercado', 'valle'], bolsa={'rabano': 3, 'calabaza': 0, 'manzano': 0, 'abono': 0},
                cesta=[], huerto=[], ultimo_trabajo='', regadera='hierro')
    base.update(o)
    return base


async def abrir(pw, guardado, continuar=True, w=390, h=844):
    b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
    ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=True)
    p = await ctx.new_page(); logs = []
    p.on('console', lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in ('error', 'warning') else None)
    p.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
    await p.route('**/*', route)
    # Solo en la primera carga: al recargar se lee lo que guardó el juego (ver URL_JUEGO en qa/lib.py).
    await p.add_init_script("if(!localStorage.getItem('qa-sembrado')){localStorage.setItem('qa-sembrado',1);localStorage.setItem(%s, %s)}"
                            % (json.dumps(CLAVE), json.dumps(json.dumps(guardado))))
    await p.goto(URL_JUEGO); await p.wait_for_timeout(1200)
    if continuar: await seguir(p)
    return b, p, logs


async def seguir(p):
    await p.locator('#ui button', has_text='Continuar').first.click()
    await p.wait_for_timeout(300)


async def estado(p, expr):
    return await p.evaluate('() => { const v = window.valoria, e = v.Estado, m = v.mundo; return (%s); }' % expr)


async def libre(p, max_ms=30000, cerrar_capas=False):
    """Avanza los diálogos (y, si se pide, cierra ventanas) hasta que el héroe está libre."""
    t0 = time.time()
    while (time.time() - t0) * 1000 < max_ms:
        s = await p.evaluate("""(cerrar) => { const v = window.valoria; if (!v) return 'cargando'; const u = v.ui.vista;
          if (u.dialogo) { v.ui.avanzar(); return 'dialogo'; }
          if (u.capa && cerrar) { u.capa.responder(u.capa.tipo === 'elegir' ? 'no' : undefined); return 'capa'; }
          if (u.capa || u.noche || v.Estado.ocupado) return 'espera'; return 'libre'; }""", cerrar_capas)
        if s == 'libre': return True
        await p.wait_for_timeout(120)
    return False


async def capa(p, max_ms=3000):
    """Tipo de la ventana abierta (espera un poco a que se abra)."""
    t0 = time.time()
    while (time.time() - t0) * 1000 < max_ms:
        t = await estado(p, "v.ui.vista.capa && v.ui.vista.capa.tipo")
        if t: return t
        await p.wait_for_timeout(100)
    return None


async def tocar(p, x, y):
    """Toca la celda (x, y) del mapa como lo haría un dedo (aunque esté fuera de la cámara)."""
    await p.evaluate("""([x, y]) => { const m = window.valoria.mundo, r = m.canvas.getBoundingClientRect();
      m.tocar({clientX: r.left + m.offX + (x + .5) * 13 * m.escala, clientY: r.top + ((y + .5) * 13 - m.camY) * m.escala}); }""", [x, y])


async def viajar(p, zona):
    await p.evaluate("(z) => window.valoria.vida.viajar(z)", zona)
    await p.wait_for_timeout(300)
    return await libre(p)


async def bot_hasta(p, condicion, max_pasos=2500):
    """Juega con el bot (qa/bot.py) hasta que se cumple `condicion` (expresión JS)."""
    same = 0; last = None
    for _ in range(max_pasos):
        if await estado(p, condicion): return True
        info = await p.evaluate(STEP_JS, ['first', same])
        sig = json.dumps(info, sort_keys=True); same = same + 1 if sig == last else 0; last = sig
        await p.wait_for_timeout(90)
    return False


def errores(logs):
    return [l for l in logs if 'pageerror' in l or ('[error]' in l and 'ERR_FAILED' not in l)]


# ---------------------------------------------------------------------------
async def prueba_1(pw):
    print('1. Modo libre: los 19 vecinos de las 5 zonas responden')
    b, p, logs = await abrir(pw, partida())
    comprobar(await libre(p), 'el modo libre arranca')
    total, mudos = 0, []
    for zona in ['mercado', 'valle', 'ciudad', 'torre', 'reloj']:
        if zona != 'mercado': await viajar(p, zona)
        vecinos = await estado(p, "Object.keys(m.npcs).filter(k => m.visibles[k])")
        for n in vecinos:
            await libre(p, cerrar_capas=True)
            # El evento que emite Mundo al llegar junto al vecino (main.ts lo escucha en el modo libre).
            await p.evaluate("(n) => window.valoria.mundo.emitir('npc', n)", n)
            ok = False
            for _ in range(20):
                r = await estado(p, "(v.ui.vista.dialogo && v.ui.vista.dialogo.texto) || (v.ui.vista.capa && v.ui.vista.capa.tipo) || ''")
                if r and r not in ('panel',): ok = True; break
                await p.wait_for_timeout(100)
            total += 1
            ok or mudos.append(f'{zona}:{n}')
        await p.screenshot(path=str(SHOTS / f'vida_1_{zona}.png'))
    await libre(p, cerrar_capas=True)
    comprobar(total == 19, f'hay 19 vecinos visibles (hay {total})')
    comprobar(not mudos, 'ninguno se queda mudo' + (f' (mudos: {mudos})' if mudos else ''))
    comprobar(not errores(logs), 'sin errores en la consola ' + str(errores(logs)[:3]))
    await b.close()


async def prueba_2(pw):
    print('2. Misión 8, «ir_lupa»: viajar al Mercado, plantar, volver y terminar la misión')
    g = partida(mision=8, zona='ciudad', punto='ir_lupa', maquina_apagada=False, merma_final=False,
                criaturas=['chispin', 'brotin', 'escudon'], monedas=20, ladrillos=0)
    b, p, logs = await abrir(pw, g)
    await libre(p)
    comprobar(await estado(p, "e.paso === 'ir_lupa' && e.zona === 'ciudad'"), 'se retoma en la Ciudad, en «ir_lupa»')
    await p.evaluate("() => { window.valoria.ui.panel('mapa'); }")
    await p.wait_for_timeout(300)
    await p.screenshot(path=str(SHOTS / 'vida_2_mapa.png'))
    texto = await p.locator('#ui').inner_text()
    comprobar('TU MISIÓN' in texto, 'el Mapa marca «TU MISIÓN»')
    await p.locator('#ui button', has_text='Mercado del Pueblo · viajar').click()
    await p.wait_for_timeout(300); await libre(p)
    mision_txt = await estado(p, "v.ui.vista.mision")
    comprobar(await estado(p, "e.zona === 'mercado' && e.paso === 'ir_lupa'"), 'está en el Mercado y la misión sigue en «ir_lupa»')
    comprobar('Tu misión sigue en Ciudad de las Empresas' in mision_txt, f'texto de misión: «{mision_txt}»')
    comprobar(await estado(p, "m.objetivo_fn() === null"), 'no hay flecha fuera de la zona de la misión')
    # Toque de verdad en el bancal (2,4): lo planta la tarea B y guarda con vida.guardar().
    await tocar(p, 2, 4); await p.wait_for_timeout(1500); await libre(p)
    comprobar(await estado(p, "e.huerto.some(h => h.zona === 'mercado' && h.x === 2 && h.y === 4)"), 'se planta en el Mercado')
    guardado = json.loads(await estado(p, "localStorage.getItem('valoria-partida')"))
    comprobar(guardado.get('zona') == 'ciudad' and guardado.get('punto') == 'ir_lupa' and 'celda' not in guardado
              and any(h['x'] == 2 and h['y'] == 4 for h in guardado.get('huerto', [])),
              'el guardado es de la Ciudad, en «ir_lupa», sin celda y con lo plantado')
    # Recargar estando en el Mercado (en otra página, con el guardado de esta).
    b2, p2, logs2 = await abrir(pw, guardado)
    await libre(p2)
    comprobar(await estado(p2, "e.zona === 'ciudad' && e.paso === 'ir_lupa' && e.huerto.some(h => h.x === 2 && h.y === 4)"),
              'al recargar abre en la Ciudad, en «ir_lupa», con lo plantado')
    await b2.close()
    # Volver a la Ciudad y que el bot termine la misión.
    await viajar(p, 'ciudad')
    comprobar(await estado(p, "e.zona === 'ciudad' && e.paso === 'ir_lupa' && !!m.objetivo_fn()"), 'de vuelta en la Ciudad, con la flecha de la misión')
    comprobar(await bot_hasta(p, "e.mision >= 9"), 'el bot termina la misión 8')
    comprobar(await estado(p, "e.ladrillos === 0 && e.tierras.length === 0"), 'el bot no ha puesto ladrillos ni comprado tierras')
    comprobar(not errores(logs), 'sin errores en la consola ' + str(errores(logs)[:3]))
    await b.close()


async def prueba_3(pw):
    print('3. Misión 4, «ir_valle»: el Mapa no ofrece el Valle')
    g = partida(mision=4, zona='mercado', punto='ir_valle', maquina_apagada=False, merma_final=False, criaturas=[])
    b, p, logs = await abrir(pw, g)
    await libre(p)
    comprobar(await estado(p, "e.paso === 'ir_valle'"), 'está en «ir_valle»')
    await p.evaluate("() => { window.valoria.ui.panel('mapa'); }"); await p.wait_for_timeout(300)
    await p.screenshot(path=str(SHOTS / 'vida_3_mapa.png'))
    botones = await p.locator('#ui button').all_inner_texts()
    texto = await p.locator('#ui').inner_text()
    comprobar(not any('viajar' in t for t in botones), 'ningún botón de viajar')
    comprobar('termina este paso' in texto, 'el Valle dice «ABIERTO · termina este paso»')
    await b.close()


SECRETOS = {'fuente': ('mercado', 7, 12), 'engranaje': ('mercado', 9, 2), 'banco': ('mercado', 4, 24),
            'desvan': ('mercado', 3, 20), 'cueva': ('valle', 1, 25), 'lago': ('valle', 10, 18), 'pino': ('valle', 12, 27)}


async def prueba_4(pw):
    print('4. Los 7 secretos, una vez cada uno; el desván solo con el molino en la etapa 3')
    b, p, logs = await abrir(pw, partida(ladrillos=30, monedas=0))
    await libre(p)
    comprobar(await estado(p, "v.vida.secreto_en('mercado', {x: 3, y: 20}) === ''"), 'con el molino en la etapa 2, no hay desván')
    chispas = await estado(p, "m.celdas_secreto.length")
    comprobar(chispas == 6 + 1 + 1, f'chispas en las casillas de 3 secretos del Mercado ({chispas} casillas)')
    for sid, (zona, x, y) in SECRETOS.items():
        if sid == 'desvan':
            await p.evaluate("() => { window.valoria.Estado.ladrillos = 70; window.valoria.vida.refrescar(); }")
        if zona != await estado(p, "e.zona"): await viajar(p, zona)
        antes = await estado(p, "JSON.stringify([e.monedas, e.bolsa, e.cesta])")
        await tocar(p, x, y)
        for _ in range(150):
            if await estado(p, f"e.secretos.includes('{sid}')"): break
            await p.wait_for_timeout(100)
        comprobar(await estado(p, f"e.secretos.includes('{sid}')"), f'se encuentra «{sid}» (el héroe llega a su lado)')
        await libre(p, cerrar_capas=True)
        await p.wait_for_timeout(200)
        despues = await estado(p, "JSON.stringify([e.monedas, e.bolsa, e.cesta])")
        await tocar(p, x, y); await p.wait_for_timeout(2500); await libre(p, cerrar_capas=True)
        otra = await estado(p, "JSON.stringify([e.monedas, e.bolsa, e.cesta])")
        comprobar(antes != despues and despues == otra, f'«{sid}» da su premio una sola vez')
    comprobar(await estado(p, "e.monedas === 10 && e.bolsa.abono === 5 && e.bolsa.calabaza === 1 && e.bolsa.manzano === 1 && e.cesta.some(l => l.fruto === 'pepita')"),
              'premios: 10 monedas, 5 abonos, 1 calabaza, 1 plantón y la pepita')
    await p.evaluate("() => { window.valoria.ui.panel('mapa'); }"); await p.wait_for_timeout(300)
    texto = await p.locator('#ui').inner_text()
    await p.screenshot(path=str(SHOTS / 'vida_4_mapa.png'))
    comprobar('Secretos 4/4' in texto and 'Secretos 3/3' in texto, 'el Mapa cuenta 4/4 y 3/3')
    comprobar(not errores(logs), 'sin errores en la consola ' + str(errores(logs)[:3]))
    await b.close()


async def prueba_5(pw):
    print('5. Día nuevo: «¡Buenos días!» con regalo y encargo; el «!»; el encargo paga 1,5 veces')
    g = partida(dia=dia(-1), dias_jugados=0, cesta=[{'fruto': 'rabano', 'n': 5, 'noches': 0}], monedas=0)
    b, p, logs = await abrir(pw, g)
    tipo = await capa(p)
    comprobar(tipo == 'buenos_dias', f'sale «¡Buenos días!» (ventana: {tipo})')
    r = await estado(p, "v.ui.vista.capa && v.ui.vista.capa.resumen")
    comprobar(bool(r) and r.get('regalo') in ('rabano', 'calabaza') and (r.get('encargo') or {}).get('npc') == 'hogaza',
              f"con regalo ({r and r.get('regalo')}) y encargo ({r and r.get('encargo')})")
    await p.screenshot(path=str(SHOTS / 'vida_5_buenos_dias.png'))
    await libre(p, cerrar_capas=True)
    comprobar(await estado(p, "m.marcados.has('hogaza')"), 'el «!» está sobre Hogaza')
    await p.evaluate("() => window.valoria.mundo.emitir('npc', 'hogaza')")
    comprobar(await capa(p) == 'elegir', 'Hogaza abre la ventana del encargo')
    await p.screenshot(path=str(SHOTS / 'vida_5_encargo.png'))
    primero = await estado(p, "v.ui.vista.capa.opciones.map(o => o[1])")
    comprobar(primero[0] == 'Dárselos', f'el primer botón es «Dárselos» ({primero})')
    await p.locator('#ui button', has_text='Dárselos').click()
    await libre(p)
    comprobar(await estado(p, "e.monedas === 6 && v.reino.cesta_cuenta('rabano') === 1"), 'cumplirlo paga 6 (1,5 × 4 rábanos con Merma 1)')
    comprobar(await estado(p, "!m.marcados.has('hogaza')"), 'el «!» se quita')
    await b.close()
    g = partida(dia=dia(1))
    b, p, logs = await abrir(pw, g)
    await p.wait_for_timeout(1500)
    comprobar(await capa(p, 500) is None and await estado(p, "e.dias_jugados === 1"), 'con el día de mañana en el guardado no sale nada')
    await b.close()


async def prueba_6(pw):
    print('6. La presentación del huerto sale una vez al empezar la misión 3')
    for eleccion, esperado in (('semillas', 4), ('hucha', 2)):
        g = partida(mision=3, zona='mercado', maquina_apagada=False, merma_final=False, criaturas=[], huerto_presentado=False,
                    eleccion_m01=eleccion, bolsa={'rabano': 0, 'calabaza': 0, 'manzano': 0, 'abono': 0}, brotes_pasados=[])
        b, p, logs = await abrir(pw, g)
        ok = False
        for _ in range(200):
            await libre(p, 300)
            if await estado(p, "e.huerto_presentado && e.paso === 'ir_antojo'"): ok = True; break
        await libre(p)
        comprobar(ok, f'con «{eleccion}»: sale la presentación en «ir_antojo»')
        n = await estado(p, "e.bolsa.rabano")
        comprobar(n == esperado, f'con «{eleccion}»: da {esperado} semillas (da {n})')
        comprobar(await estado(p, "(() => { const o = m.objetivo_fn(); return !!o && o.y === 4; })()"), 'la flecha apunta a un bancal')
        await p.wait_for_timeout(2200)
        comprobar(await estado(p, "e.bolsa.rabano") == esperado, 'no se repite')
        await b.close()


async def prueba_7(pw):
    print('7. Hogaza da trabajo una vez al día fuera del guion')
    b, p, logs = await abrir(pw, partida(monedas=0))
    await libre(p)
    # Encargo de otro vecino para que Hogaza solo ofrezca trabajo.
    await p.evaluate("""() => { const v = window.valoria; v.Estado.encargo = {dia: v.Estado.dia, npc: 'tasador', fruto: 'rabano', n: 6};
      v.ui.amasar = async () => 7; }""")
    await p.evaluate("() => window.valoria.mundo.emitir('npc', 'hogaza')")
    comprobar(await capa(p) == 'elegir', 'Hogaza ofrece trabajo')
    await p.locator('#ui button', has_text='¡A amasar!').click()
    await libre(p)
    comprobar(await estado(p, "e.monedas === 7 && e.ultimo_trabajo === e.dia"), 'paga lo amasado y lo apunta')
    await p.evaluate("() => window.valoria.mundo.emitir('npc', 'hogaza')")
    await p.wait_for_timeout(400)
    texto = await estado(p, "(v.ui.vista.dialogo && v.ui.vista.dialogo.texto) || ''")
    tipo = await capa(p, 300)
    await libre(p)
    comprobar(tipo is None and texto, f'la segunda vez no hay trabajo («{texto}»)')
    # Al día siguiente vuelve a haber trabajo.
    await p.evaluate("() => { window.valoria.Estado.dia = '%s'; window.valoria.Estado.ultimo_trabajo = '%s'; window.valoria.vida.vuelta(); }" % (dia(-1), dia(-1)))
    await p.wait_for_timeout(300); await libre(p, cerrar_capas=True)
    await p.evaluate("() => window.valoria.mundo.emitir('npc', 'hogaza')")
    comprobar(await capa(p) == 'elegir', 'al día siguiente vuelve a ofrecer trabajo')
    await b.close()


async def prueba_8(pw, modo):
    print('8. Las otras pruebas pasan y el bot no compra en puestos ni pone ladrillos')
    b, p, logs = await abrir(pw, partida(ladrillos=10))
    await libre(p)
    for abrir_js, nombre in (("v.ui.puesto('semilla')", 'el puesto'), ("v.ui.obra()", 'la obra')):
        await p.evaluate("() => { const v = window.valoria; %s; }" % abrir_js)
        await capa(p)
        antes = await estado(p, "JSON.stringify([e.monedas, e.ladrillos, e.bolsa])")
        info = await p.evaluate(STEP_JS, ['first', 0])
        await p.wait_for_timeout(300)
        comprobar(info.get('accion') == 'boton:Cerrar' and await capa(p, 300) is None
                  and antes == await estado(p, "JSON.stringify([e.monedas, e.ladrillos, e.bolsa])"),
                  f'el bot cierra {nombre} sin comprar ({info.get("accion")})')
    await b.close()
    if modo == 'rapido': return
    for script in (['qa/guardado.py'], ['qa/guardado_4_15.py']):
        r = subprocess.run([sys.executable] + script, cwd=ROOT, capture_output=True, text=True)
        cola = (r.stdout + r.stderr).strip().splitlines()[-3:]
        comprobar(r.returncode == 0, f'{script[0]} pasa ({" | ".join(cola)})')
    if modo == 'completo':
        r = subprocess.run([sys.executable, 'qa/bot.py', 'first', '60000', 'vida'], cwd=ROOT, capture_output=True, text=True)
        comprobar("('FINAL',)" in r.stdout and '[pageerror]' not in r.stdout, 'el bot completa las 15 misiones')
        ultimo = [l for l in r.stdout.splitlines() if l.startswith('ULTIMO')]
        comprobar(bool(ultimo) and "'ladrillos': 0" in ultimo[0] and "'tierras': 0" in ultimo[0], 'el bot no pone ladrillos ni compra tierras')


async def main():
    modo = 'completo' if '--completo' in sys.argv else 'rapido' if '--rapido' in sys.argv else 'normal'
    async with async_playwright() as pw:
        elegidas = {int(a) for a in sys.argv[1:] if a.isdigit()}
        for i, f in enumerate((prueba_1, prueba_2, prueba_3, prueba_4, prueba_5, prueba_6, prueba_7), 1):
            if not elegidas or i in elegidas: await f(pw)
        if not elegidas or 8 in elegidas: await prueba_8(pw, modo)
    print('\nTODO BIEN' if not fallos else f'\n{len(fallos)} FALLOS:\n- ' + '\n- '.join(fallos))
    sys.exit(1 if fallos else 0)

asyncio.run(main())
