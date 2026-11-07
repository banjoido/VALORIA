import asyncio, pathlib, sys, os, shutil
CHROME=os.environ.get('CHROME') or shutil.which('google-chrome') or shutil.which('chromium')
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
LOCAL={'react.production.min.js':ROOT/'node_modules/react/umd/react.production.min.js',
 'react-dom.production.min.js':ROOT/'node_modules/react-dom/umd/react-dom.production.min.js'}
# El juego se sirve en un origen http de mentira, interceptado aquí: Chromium trata las páginas
# file:// con un origen opaco y, al recargar, a veces les da un localStorage y un sessionStorage
# vacíos (unas 12 de cada 70 recargas en una prueba con una página en blanco; 0 de 70 con http).
# Era el fallo intermitente de qa/guardado_4_15.py: tras recargar, la partida volvía a la semilla.
URL_JUEGO='http://valoria.local/index.html'
async def route(r):
    u=r.request.url
    if u.startswith('http://valoria.local/'):
        f=ROOT/'juego/dist'/(u.split('?')[0][len('http://valoria.local/'):] or 'index.html')
        if f.is_file(): return await r.fulfill(path=str(f))
        return await r.abort()
    for k,p in LOCAL.items():
        if u.endswith(k): return await r.fulfill(path=str(p),content_type='application/javascript')
    if u.startswith('file://'): return await r.continue_()
    return await r.abort()
async def open_game(pw, w=390,h=844):
    b=await pw.chromium.launch(executable_path=CHROME,args=['--no-sandbox','--autoplay-policy=no-user-gesture-required'])
    ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=2,has_touch=True,is_mobile=True)
    p=await ctx.new_page()
    logs=[]
    p.on('console',lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in('error','warning') else None)
    p.on('pageerror',lambda e: logs.append(f'[pageerror] {e}'))
    await p.route('**/*',route)
    await p.goto('file://'+str(ROOT/'juego/dist/index.html'))
    await p.wait_for_timeout(1500)
    return b,p,logs
