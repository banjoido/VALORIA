"""Prueba del huerto en pantalla, los puestos y la obra (sprint 3, tarea B).

Comprueba con Playwright, sobre juego/dist/index.html y con toques de verdad (ratón), las
10 condiciones del criterio de aceptación (docs/especificaciones/sprint-3-bucle.md, 14.3).
Los puestos y la obra se abren con valoria.ui.* para no depender de la tarea C.

Uso: python3 qa/huerto.py              (la 10 comprueba el pago de amasar en la ventana)
     python3 qa/huerto.py --completo   (la 10 juega además la partida completa del bot)
Capturas: qa/.build/capturas/huerto_*.png
"""
import asyncio, json, subprocess, sys, time
sys.path.insert(0, 'qa')
from lib import *

SHOTS = ROOT / 'qa/.build/capturas'; SHOTS.mkdir(parents=True, exist_ok=True)
CLAVE = 'valoria-partida'
fallos = []


def comprobar(ok, msg):
    print(('  ok    ' if ok else '  FALLO ') + msg)
    ok or fallos.append(msg)


def hoy():
    return time.strftime('%Y-%m-%d')


def partida(**o):
    base = dict(mision=16, zona='mercado', monedas=60, brillo=3, merma=2, merma_desde=10, tiempo=12, precio_pan=5,
                dia=hoy(), dias_jugados=1, criaturas=['brotin'], tiene_chispin=True, regadera='hierro', heroe='chica',
                eleccion_m01='semillas', huerto_presentado=True, brotes_pasados=['mercado', 'valle'],
                tierras=['mercado:2,3', 'mercado:3,3', 'mercado:4,3', 'mercado:5,3'], bola_de_nieve=True,
                bolsa={'rabano': 0, 'calabaza': 0, 'manzano': 0, 'abono': 0}, cesta=[], huerto=[])
    base.update(o)
    return base


def doce(cultivo='rabano', edad=1):
    return [dict(zona='mercado', x=x, y=y, cultivo=cultivo, edad=edad, regada=False, abono=False, manzanas=0)
            for y in (3, 4, 5) for x in (2, 3, 4, 5)]


# Toques y clics de verdad (en fase de captura, antes que nadie).
CONTAR_JS = """() => { if (window.__toques) return; window.__toques = {pointerdown: 0, click: 0};
  for (const t of ['pointerdown', 'click']) document.addEventListener(t, () => window.__toques[t]++, true); }"""


async def abrir(pw, guardado, w=390, h=844, continuar=True):
    b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
    ctx = await b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=1, has_touch=True, is_mobile=True)
    p = await ctx.new_page(); logs = []
    p.on('console', lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in ('error', 'warning') else None)
    p.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
    await p.route('**/*', route)
    await p.add_init_script("localStorage.setItem(%s, %s)" % (json.dumps(CLAVE), json.dumps(json.dumps(guardado))))
    await p.goto('file://' + str(ROOT / 'juego/dist/index.html')); await p.wait_for_timeout(1200)
    if continuar:
        await p.locator('#ui button', has_text='Continuar').first.click()
        await libre(p)
    await p.evaluate(CONTAR_JS)
    return b, p, logs


async def libre(p, max_ms=30000):
    """Avanza los diálogos hasta que el héroe está libre (sin ventana ni noche)."""
    t0 = time.time()
    while (time.time() - t0) * 1000 < max_ms:
        s = await p.evaluate("""() => { const v = window.valoria; if (!v) return 'cargando'; const u = v.ui.vista;
          if (u.dialogo) { v.ui.avanzar(); return 'dialogo'; } if (u.capa || u.noche || v.Estado.ocupado) return 'espera'; return 'libre'; }""")
        if s == 'libre': return True
        await p.wait_for_timeout(120)
    return False


async def pantalla(p, x, y):
    """Coordenadas de pantalla del centro de la celda (x, y) del mapa."""
    return await p.evaluate("""([x, y]) => { const m = window.valoria.mundo, r = m.canvas.getBoundingClientRect();
      return [r.left + m.offX + (x + .5) * 13 * m.escala, r.top + ((y + .5) * 13 - m.camY) * m.escala]; }""", [x, y])


async def tocar(p, x, y):
    px, py = await pantalla(p, x, y)
    await p.mouse.click(px, py)


async def deslizar(p, celdas):
    px, py = await pantalla(p, *celdas[0])
    await p.mouse.move(px, py); await p.mouse.down()
    for c in celdas[1:]:
        qx, qy = await pantalla(p, *c)
        await p.mouse.move(qx, qy, steps=6)
    await p.mouse.up()


async def clic_boton(p, texto, dentro='#ui'):
    loc = p.locator(f'{dentro} button', has_text=texto).first
    await loc.click()


async def toques(p):
    return await p.evaluate('() => ({...window.__toques})')


async def estado(p, js):
    return await p.evaluate('() => { const E = window.valoria.Estado, r = window.valoria.reino; return ' + js + '; }')


async def esperar_sin_noche(p, max_ms=6000):
    t0 = time.time()
    while (time.time() - t0) * 1000 < max_ms:
        if not await p.evaluate('() => !!window.valoria.ui.vista.noche'): return time.time() - t0
        await p.wait_for_timeout(40)
    return None


MEDIR_JS = """(sel) => { const malos = [];
  for (const raiz of document.querySelectorAll(sel)) for (const el of [raiz, ...raiz.querySelectorAll('*')]) {
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const propio = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (propio && fs < 11) malos.push('texto ' + fs + 'px: ' + el.textContent.trim().slice(0, 30));
    if (el.tagName === 'BUTTON' && (r.height < 44 || r.width < 44)) malos.push('botón ' + Math.round(r.width) + '×' + Math.round(r.height) + ': ' + el.textContent.trim().slice(0, 30));
    if (r.right > innerWidth + 1 || r.left < -1) malos.push('se sale: ' + el.className);
  } return malos; }"""


async def medir(p, nombre, sel='.marco, .avisos, .ficha-mano, .nav'):
    malos = await p.evaluate(MEDIR_JS, sel)
    return [f'{nombre}: {m}' for m in malos]


async def main():
    completo = '--completo' in sys.argv
    t0 = time.time()
    async with async_playwright() as pw:
        # 1. Misión 3 (y misión 4, con el solar)
        print('1. Partida sembrada en la misión 3')
        b, p, logs = await abrir(pw, partida(mision=3, merma=1, brillo=4, tierras=[], bola_de_nieve=False, huerto_presentado=False,
                                              brotes_pasados=[], regadera='hierro', brotes=[{'celda': {'x': 2, 'y': 5}, 'zona': 'mercado', 'fruto': False, 'cuantos': 1}]))
        r = await estado(p, """({b: r.bancales('mercado').map(c => [c.x, c.y, c.abierto, c.precio || 0]), parcelas: window.valoria.Mapa.parcelas(),
          obra: r.obra('mercado'), mision: E.mision})""")
        abiertos = sorted((x, y) for x, y, a, _ in r['b'] if a)
        venta = sorted((x, y) for x, y, a, _ in r['b'] if not a)
        comprobar(abiertos == [(x, 4) for x in range(2, 6)], f'4 bancales abiertos en la fila 4 {abiertos}')
        comprobar(venta == [(x, 3) for x in range(2, 6)] and all(pr == 10 for _, _, a, pr in r['b'] if not a), f'4 tierras a la venta en la fila 3, a 10 {venta}')
        comprobar(sorted((c['x'], c['y']) for c in r['parcelas']) == [(x, 5) for x in range(2, 6)], 'la fila 5 sigue siendo de la historia')
        await p.screenshot(path=str(SHOTS / 'huerto_m03.png'))
        # Tocar una tierra a la venta abre «Tierra nueva · 10 monedas».
        await tocar(p, 3, 3); await p.wait_for_timeout(300)
        t = await p.evaluate("() => document.querySelector('.marco h2')?.textContent || ''")
        comprobar('Tierra nueva' in t and '10' in t, f'tocar una tierra a la venta abre su ventana ({t!r})')
        await clic_boton(p, 'Ahora no'); await b.close()
        b, p, logs4 = await abrir(pw, partida(mision=4, merma=1, brillo=4, tierras=[], bola_de_nieve=False))
        r = await estado(p, "({obra: r.obra('mercado'), fila5: r.bancales('mercado').filter(c => c.y === 5 && c.abierto).length, molino: window.valoria.mundo.sprite_molino()})")
        comprobar(r['obra'] is not None and r['obra']['etapa'] == 0 and r['molino'] == 'molino_0', f'al ganar la 3, el solar del molino (molino_0) y la fila 5 abierta ({r["fila5"]})')
        await p.evaluate("() => window.valoria.mundo.colocar_heroe({x: 5, y: 21})"); await p.wait_for_timeout(400)
        await p.screenshot(path=str(SHOTS / 'huerto_solar.png'))
        logs += logs4; await b.close()

        # 2 a 7. Modo libre con 12 bancales listos
        print('2. Toques por noche (12 bancales listos)')
        b, p, logs2 = await abrir(pw, partida(huerto=doce(), monedas=40))
        logs += logs2
        await p.screenshot(path=str(SHOTS / 'huerto_listo.png'))
        t_inicio = await toques(p)
        await tocar(p, 2, 4); await p.wait_for_timeout(500)
        r = await estado(p, "({cesta: r.cesta_cuenta('rabano'), plantas: E.huerto.filter(p => p.edad === 0).length})")
        comprobar(r['plantas'] == 12 and r['cesta'] >= 12, f'un toque cosecha los 12 y los replanta ({r})')
        await p.screenshot(path=str(SHOTS / 'huerto_cosecha.png'))
        # 3. Regar deslizando
        for y in (3, 4, 5):
            await deslizar(p, [(x, y) for x in (2, 3, 4, 5)]); await p.wait_for_timeout(250)
        r = await estado(p, "E.huerto.map(p => p.y + ':' + p.regada)")
        fila3 = [s for s in r if s.startswith('3:')]
        comprobar(fila3 == ['3:true'] * 4, f'3. un solo gesto riega los 4 de una fila {fila3}')
        comprobar(all(s.endswith('true') for s in r), 'tres gestos riegan las 3 filas')
        await p.screenshot(path=str(SHOTS / 'huerto_regado.png'))
        # Vender todo en el puesto de Tasador (el toque en Tasador cuenta; el puesto se abre con ui.puesto)
        await tocar(p, 1, 13); await p.wait_for_timeout(200)
        await p.evaluate("() => { window.__p = window.valoria.ui.puesto('tasador'); }"); await p.wait_for_timeout(300)
        monedas0 = await estado(p, 'E.monedas')
        await p.screenshot(path=str(SHOTS / 'huerto_puesto_tasador.png'))
        await clic_boton(p, 'Vender todo'); await p.wait_for_timeout(200)
        monedas1 = await estado(p, 'E.monedas')
        await clic_boton(p, 'Cerrar'); await p.wait_for_timeout(200)
        comprobar(monedas1 > monedas0 and await estado(p, "r.cesta_cuenta('rabano')") == 0, f'«Vender todo» vende la cesta ({monedas0} → {monedas1})')
        # Siesta: panel Huerto → Dormir → un toque para saltar la noche
        await libre(p)
        tiempo0 = await estado(p, 'E.tiempo')
        await clic_boton(p, 'Huerto', '.nav'); await p.wait_for_timeout(200)
        await p.screenshot(path=str(SHOTS / 'huerto_panel.png'))
        t_dormir = time.time()
        await clic_boton(p, 'Dormir una noche'); await p.wait_for_timeout(250)
        await p.mouse.click(195, 400)
        dur = await esperar_sin_noche(p)
        dur = time.time() - t_dormir if dur is not None else 99
        t_fin = await toques(p)
        n_toques = t_fin['pointerdown'] - t_inicio['pointerdown']; n_clics = t_fin['click'] - t_inicio['click']
        r = await estado(p, "({t: E.tiempo, listos: E.huerto.filter(p => r.noches_que_faltan(p) === 0).length, siestas: r.siestas_quedan()})")
        comprobar(r['t'] == tiempo0 + 1 and r['listos'] == 12, f'5. la siesta pasa una noche del reino ({tiempo0} → {r["t"]}, {r["listos"]} listos)')
        comprobar(dur < 1.5, f'5. un toque acorta la noche: {dur:.2f} s')
        print(f'  · toques en una noche completa: {n_toques} (pointerdown), {n_clics} clics')
        comprobar(n_toques <= 12, f'2. una noche completa con {n_toques} toques o gestos (≤ 12)')
        TOQUES = n_toques
        # Segunda siesta y la tercera desactivada
        await libre(p)
        await clic_boton(p, 'Huerto', '.nav'); await clic_boton(p, 'Dormir una noche'); await esperar_sin_noche(p, 8000)
        await libre(p)
        await clic_boton(p, 'Huerto', '.nav'); await p.wait_for_timeout(200)
        r = await p.evaluate("""() => ({dormir: [...document.querySelectorAll('.marco button')].some(b => b.textContent.includes('Dormir') && !b.disabled),
          texto: document.querySelector('.marco').textContent})""")
        comprobar(not r['dormir'] and 'ya no tiene sueño' in r['texto'], '5. la tercera siesta del día no se puede dormir')
        await clic_boton(p, 'Cerrar'); await libre(p)

        # 4. Ficha de herramienta: abono y calabaza
        print('4. Ficha de herramienta')
        await p.evaluate("""() => { const E = window.valoria.Estado; E.bolsa.abono = 2; E.bolsa.calabaza = 4; E.mano = '';
          E.huerto.forEach(p => { p.edad = 0; p.abono = false; }); E.avisar(); }""")
        await p.wait_for_timeout(200)
        await p.screenshot(path=str(SHOTS / 'huerto_ficha.png'))
        for _ in range(5):
            txt = await p.locator('.ficha-mano').inner_text()
            if 'Abono' in txt: break
            await p.locator('.ficha-mano').click(); await p.wait_for_timeout(120)
        await tocar(p, 3, 4); await p.wait_for_timeout(300)
        r = await estado(p, "({abono: r.planta_en('mercado', 3, 4).abono, bolsa: E.bolsa.abono, capa: !!window.valoria.ui.vista.capa})")
        comprobar(txt.startswith('Abono') and r['abono'] and r['bolsa'] == 1 and not r['capa'], f'con «Abono», un toque abona sin ventana ({txt!r}, {r})')
        for _ in range(5):
            txt = await p.locator('.ficha-mano').inner_text()
            if 'Calabaza' in txt: break
            await p.locator('.ficha-mano').click(); await p.wait_for_timeout(120)
        await p.evaluate("() => { const E = window.valoria.Estado; E.huerto.forEach(p => p.edad = 1); E.avisar(); }")
        await tocar(p, 2, 3); await p.wait_for_timeout(400)
        r = await estado(p, "({cal: E.huerto.filter(p => p.cultivo === 'calabaza').length, bolsa: E.bolsa.calabaza})")
        comprobar('Calabaza' in txt and r['cal'] == 4 and r['bolsa'] == 0, f'con «Calabaza», cosechar rábanos replanta calabazas ({r})')
        await libre(p)

        # 6. Pocho mañana y compostera
        print('6. Fechas de la cesta y compostera')
        await p.evaluate("""() => { const E = window.valoria.Estado; E.cesta = [{fruto: 'rabano', n: 3, noches: 2}, {fruto: 'calabaza', n: 2, noches: 0}]; E.compost = 0; E.avisar(); }""")
        await p.evaluate("() => { window.valoria.ui.puesto('tasador'); }"); await p.wait_for_timeout(300)
        r = await p.evaluate("() => [...document.querySelectorAll('.marco .etiqueta-pocho')].map(e => e.closest('.fila-puesto').textContent)")
        comprobar(len(r) == 1 and 'rábano' in r[0], f'«pocho mañana» en el puesto, solo en los rábanos ({r})')
        await clic_boton(p, 'Cerrar'); await libre(p)
        await clic_boton(p, 'Mochila', '.nav'); await p.wait_for_timeout(200)
        r = await p.evaluate("() => document.querySelectorAll('.marco .etiqueta-pocho').length")
        await p.screenshot(path=str(SHOTS / 'huerto_mochila.png'))
        comprobar(r == 1, f'«pocho mañana» en la Mochila ({r})')
        await clic_boton(p, 'Cerrar'); await libre(p)
        await p.evaluate("() => { window.valoria.ui.pasar_noche(1, ''); }")
        await esperar_sin_noche(p, 6000); await p.wait_for_timeout(150)
        r = await p.evaluate("() => [...document.querySelectorAll('.aviso')].map(a => a.textContent)")
        a = await estado(p, '({abono: E.bolsa.abono, rab: r.cesta_cuenta("rabano")})')
        await p.screenshot(path=str(SHOTS / 'huerto_compost.png'))
        comprobar(any('compostera' in x for x in r) and a['rab'] == 0, f'al pasar la noche, aviso de la compostera {r} {a}')
        await p.evaluate("() => { window.valoria.Estado.ocupado = false; }")

        # 7. Obra del molino
        print('7. Obra del molino')
        await p.evaluate("() => { const E = window.valoria.Estado; E.monedas = 100; E.ladrillos = 0; E.avisar(); window.valoria.ui.obra(); }")
        await p.wait_for_timeout(300)
        antes = await p.evaluate("() => window.valoria.mundo.sprite_molino()")
        await clic_boton(p, 'Poner 5'); await p.wait_for_timeout(150); await clic_boton(p, 'Poner 5'); await p.wait_for_timeout(500)
        r = await p.evaluate("""() => ({h2: document.querySelector('.marco h2').textContent, barra: document.querySelector('.marco').textContent,
          lad: window.valoria.Estado.ladrillos, molino: window.valoria.mundo.sprite_molino()})""")
        await p.screenshot(path=str(SHOTS / 'huerto_obra.png'))
        comprobar(r['lad'] == 10 and 'Etapa 2' in r['h2'] and '0/20' in r['barra'], f'la ventana pone ladrillos y enseña la etapa ({r["lad"]}, {r["h2"]!r})')
        comprobar(antes == 'molino_0' and r['molino'] == 'molino_1', f'el dibujo del molino cambia en el mapa ({antes} → {r["molino"]})')
        await clic_boton(p, 'Cerrar'); await libre(p)
        await p.evaluate("() => window.valoria.mundo.colocar_heroe({x: 5, y: 21})"); await p.wait_for_timeout(500)
        await p.screenshot(path=str(SHOTS / 'huerto_molino_1.png'))
        await p.evaluate("() => { const E = window.valoria.Estado; E.ladrillos = 150; E.avisar(); }"); await p.wait_for_timeout(300)
        await p.screenshot(path=str(SHOTS / 'huerto_molino_4.png'))
        comprobar((await p.evaluate("() => window.valoria.Mapa.bloqueado(3, 20, [])")), 'el molino es sólido desde la etapa 1')
        await b.close()

        # 8. Manzano en el Valle (misión 6)
        print('8. Manzano (misión 6, en el Valle)')
        b, p, logs3 = await abrir(pw, partida(mision=6, zona='valle', merma=1, brillo=4, tierras=[], huerto=[], bolsa={'rabano': 0, 'calabaza': 0, 'manzano': 1, 'abono': 0}))
        logs += logs3
        await p.evaluate("() => window.valoria.mundo.colocar_heroe({x: 10, y: 22})"); await p.wait_for_timeout(500)
        await p.evaluate(CONTAR_JS)
        await tocar(p, 9, 24); await p.wait_for_timeout(400)
        m = []
        for i in range(5):
            await p.evaluate("() => { window.valoria.ui.pasar_noche(1, ''); }"); await p.wait_for_timeout(300)
            await p.mouse.click(195, 400); await esperar_sin_noche(p)
            m.append(await estado(p, "(r.planta_en('valle', 9, 24) || {manzanas: -1}).manzanas"))
            await p.evaluate("() => { window.valoria.Estado.ocupado = false; }")
        await p.screenshot(path=str(SHOTS / 'huerto_manzano.png'))
        comprobar(m[:4] == [0, 0, 0, 0] and m[4] == 2, f'plantón → 4 noches sin manzanas → la 5.ª con 2 {m}')
        await tocar(p, 9, 23); await p.wait_for_timeout(400)
        r = await estado(p, "({cesta: r.cesta_cuenta('manzana'), arbol: r.planta_en('valle', 9, 24).manzanas, solido: window.valoria.Mapa.bloqueado(9, 24, [])})")
        comprobar(r['cesta'] == 2 and r['arbol'] == 0, f'tocar el manzano recoge las manzanas ({r})')
        comprobar(r['solido'], 'el pie del manzano es sólido')
        await b.close()

        # 9. Tamaños a 390 y 360
        print('9. Textos ≥ 11 px y botones ≥ 44 px (390 × 844 y 360 × 800)')
        malos = []
        for (w, h) in ((390, 844), (360, 800)):
            b, p, logs5 = await abrir(pw, partida(huerto=doce(edad=0)[:8], monedas=30, ladrillos=20, mision=16,
                                                  tierras=['mercado:2,3', 'mercado:3,3', 'valle:1,9'], secretos=['banco'],
                                                  bolsa={'rabano': 3, 'calabaza': 2, 'manzano': 1, 'abono': 1},
                                                  cesta=[{'fruto': 'rabano', 'n': 4, 'noches': 2}, {'fruto': 'manzana', 'n': 2, 'noches': 0}, {'fruto': 'pepita', 'n': 1, 'noches': 0}]), w, h)
            logs += logs5
            malos += await medir(p, f'{w} mapa')
            for v in ('semilla', 'tasador', 'yunque', 'copo'):
                await p.evaluate("(v) => { window.valoria.ui.puesto(v); }", v); await p.wait_for_timeout(250)
                malos += await medir(p, f'{w} puesto {v}')
                if w == 360: await p.screenshot(path=str(SHOTS / f'huerto_puesto_{v}_360.png'))
                await clic_boton(p, 'Cerrar'); await libre(p)
            await p.evaluate("() => { window.valoria.ui.obra(); }"); await p.wait_for_timeout(250)
            malos += await medir(p, f'{w} obra'); await clic_boton(p, 'Cerrar'); await libre(p)
            resumen = {'dia_nuevo': True, 'noches': 2, 'regalo': 'calabaza', 'encargo': {'npc': 'hogaza', 'fruto': 'rabano', 'n': 4, 'pago': 6},
                       'pocho': {'rabano': 4}, 'merma': 'aviso', 'listos': {'mercado': {'rabano': 8, 'calabaza': 3}, 'valle': {'manzana': 2}}}
            await p.evaluate("(r) => { window.valoria.ui.buenos_dias(r); }", resumen); await p.wait_for_timeout(250)
            malos += await medir(p, f'{w} buenos días')
            if w == 390:
                await p.screenshot(path=str(SHOTS / 'huerto_buenos_dias.png'))
                n = await p.evaluate("() => document.querySelectorAll('.marco .fila').length")
                comprobar(n <= 6, f'«¡Buenos días!» con 5 líneas como mucho ({n - 1})')
            await clic_boton(p, '¡A jugar!'); await libre(p)
            for panel in ('Huerto', 'Mochila', 'Criaturas'):
                await clic_boton(p, panel, '.nav'); await p.wait_for_timeout(200)
                malos += await medir(p, f'{w} panel {panel}')
                await clic_boton(p, 'Cerrar'); await libre(p)
            await p.evaluate("() => window.valoria.ui.aviso('La compostera te da 1 abono.', 'abono')"); await p.wait_for_timeout(200)
            malos += await medir(p, f'{w} aviso')
            await b.close()
        for m_ in malos[:12]: print('   ', m_)
        comprobar(not malos, f'ningún texto nuevo por debajo de 11 px ni botón por debajo de 44 px ({len(malos)} fallos)')

        # 10. Amasar paga de 3 a 11
        print('10. Amasar con Hogaza')
        b, p, logs6 = await abrir(pw, partida(merma=1))
        logs += logs6
        pagos = []
        for golpes in ('ninguno', 'todos'):
            await p.evaluate("() => { window.__pago = null; window.valoria.ui.amasar().then(v => window.__pago = v); }"); await p.wait_for_timeout(200)
            for _ in range(6):
                if golpes == 'todos':
                    # Espera a que la marca pase por la zona dorada.
                    for _ in range(80):
                        l = await p.evaluate("() => { const b = document.querySelector('.pista-amasar b'), z = document.querySelector('.pista-amasar .zona'); const rb = b.getBoundingClientRect(), rz = z.getBoundingClientRect(); return rb.left + 3 > rz.left + 6 && rb.left + 3 < rz.right - 6; }")
                        if l: break
                        await p.wait_for_timeout(8)
                await clic_boton(p, 'Amasar'); await p.wait_for_timeout(60 if golpes == 'ninguno' else 120)
            for _ in range(40):
                v = await p.evaluate('() => window.__pago')
                if v is not None: break
                await p.wait_for_timeout(100)
            esperado = await p.evaluate("(a) => window.valoria.reino.pago_trabajo(a)", 6 if golpes == 'todos' else 0)
            pagos.append((v, esperado))
        comprobar(all(3 <= v <= 11 for v, _ in pagos), f'amasar paga entre 3 y 11 con Merma 1 {pagos}')
        comprobar(all(v == e for v, e in pagos), f'el pago es reino.pago_trabajo(aciertos) {pagos}')
        await b.close()
        if completo:
            print('   partida completa del bot (unos 10 minutos)…')
            out = subprocess.run([sys.executable, 'qa/bot.py', 'first', '60000', 'huerto'], capture_output=True, text=True).stdout
            comprobar("('FINAL',)" in out and '[pageerror]' not in out, 'npm run qa:partida: el bot completa las 15 misiones')

        errores = [l for l in logs if 'pageerror' in l or ('[error]' in l and 'ERR_FAILED' not in l)]
        for l in errores[:10]: print('   ', l)
        comprobar(not errores, 'sin errores en la consola')
    print(f'\nToques por noche: {TOQUES}. Tiempo: {time.time() - t0:.0f} s')
    print('TODO BIEN' if not fallos else f'{len(fallos)} FALLOS:\n- ' + '\n- '.join(fallos))
    sys.exit(1 if fallos else 0)


asyncio.run(main())
