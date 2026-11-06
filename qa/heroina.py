"""Prueba de la elección de personaje (heroína) con capturas.

Uso (desde la raíz, con juego/dist construido):  python3 qa/heroina.py
Capturas en qa/.build/heroina/.
"""
import asyncio, json, sys
sys.path.insert(0, 'qa')
from lib import *
from bot import STEP_JS

OUT = ROOT / 'qa/.build/heroina'; OUT.mkdir(parents=True, exist_ok=True)
DIST = 'file://' + str(ROOT / 'juego/dist/index.html')

TEXTO_DIALOGO = "() => { const d=document.querySelector('#ui .dialogo'); return d ? d.innerText : ''; }"
SPRITE = "() => window.valoria.mundo.heroe && window.valoria.mundo.heroe.nombre"


async def nueva_partida(pw, errores):
    b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
    ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, has_touch=True, is_mobile=True)
    p = await ctx.new_page()
    p.on('pageerror', lambda e: errores.append(f'[pageerror] {e}'))
    await p.route('**/*', route)
    return b, p


async def hasta(p, cond, pasos=3000, pref='first'):
    """Juega con el bot hasta que `cond(texto_dialogo)` sea cierto."""
    same = 0
    for i in range(pasos):
        t = await p.evaluate(TEXTO_DIALOGO)
        if cond(t):
            return t
        await p.evaluate(STEP_JS, [pref, same])
        same += 1
        await p.wait_for_timeout(90)
    return None


async def principal():
    errores = []
    async with async_playwright() as pw:
        # 1. Partida nueva: título, elección, carta, mapa del Mercado.
        b, p = await nueva_partida(pw, errores)
        await p.goto(DIST); await p.wait_for_timeout(1500)
        await p.screenshot(path=str(OUT / '1_titulo.png'))
        await p.get_by_text('Empezar la aventura').click(); await p.wait_for_timeout(500)
        await p.screenshot(path=str(OUT / '2_eleccion.png'))
        tam = await p.evaluate("() => [...document.querySelectorAll('.btn.eleccion')].map(b => {const r=b.getBoundingClientRect(); return [b.getAttribute('aria-label'), Math.round(r.width), Math.round(r.height)]})")
        print('botones de elección:', tam)
        await p.get_by_label('Elegir a la heroína').click(); await p.wait_for_timeout(800)
        print('estado.heroe =', await p.evaluate('() => window.valoria.Estado.heroe'))
        await p.screenshot(path=str(OUT / '3_carta.png'))
        t = await hasta(p, lambda t: 'Toca el suelo' in t)
        await p.wait_for_timeout(1500)
        await p.screenshot(path=str(OUT / '4_dialogo_mercado.png'))
        await hasta(p, lambda t: 'Hogaza' in t or 'pan sube' in t)
        await p.wait_for_timeout(1200)
        await p.screenshot(path=str(OUT / '5_mercado_hogaza.png'))
        print('sprite en el mapa:', await p.evaluate(SPRITE))
        # Guardado: al recargar sigue siendo la heroína.
        await p.evaluate('() => window.valoria.Estado.guardar()')
        print('guardado:', json.loads(await p.evaluate("() => localStorage.getItem('valoria-partida')")).get('heroe'))
        await b.close()

        # 2. Partidas sembradas con la heroína: misión 4/5 (Copo) y 15 (Merma).
        for n, zona, busca, nombre in [(4, 'valle', 'viajera', '6_m04_copo'), (5, 'valle', 'Pequeña', '7_m05_copo'),
                                       (15, 'reloj', 'nieta', '8_m15_merma')]:
            b, p = await nueva_partida(pw, errores)
            semilla = dict(mision=n, zona=zona, monedas=20, brillo=5, precio_pan=5, heroe='chica',
                           criaturas=['chispin', 'brotin', 'escudon', 'repartija', 'olfatin', 'calmin'],
                           tiene_chispin=True, ojo_tasador=True)
            await p.add_init_script("localStorage.setItem('valoria-partida', %s)" % json.dumps(json.dumps(semilla)))
            await p.goto(DIST); await p.wait_for_timeout(1500)
            if n == 15:
                await p.screenshot(path=str(OUT / '9_titulo_partida_guardada.png'))
            t = await hasta(p, lambda t: busca in t, pasos=6000)
            await p.wait_for_timeout(1500)
            await p.screenshot(path=str(OUT / f'{nombre}.png'))
            print(f'misión {n}:', repr(t), '| sprite:', await p.evaluate(SPRITE))
            await b.close()

        # 3. Partida antigua sin campo `heroe`: se carga como chico.
        b, p = await nueva_partida(pw, errores)
        await p.add_init_script("localStorage.setItem('valoria-partida', JSON.stringify({mision:15, zona:'reloj', monedas:5, tiene_chispin:true}))")
        await p.goto(DIST); await p.wait_for_timeout(1500)
        t = await hasta(p, lambda t: 'nieto' in t or 'nieta' in t, pasos=6000)
        print('partida antigua:', await p.evaluate('() => window.valoria.Estado.heroe'), repr(t))
        await b.close()
    print('\n'.join(errores) or 'sin errores de página')


asyncio.run(principal())
