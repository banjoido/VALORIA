import asyncio, pathlib, sys, os, shutil
CHROME=os.environ.get('CHROME') or shutil.which('google-chrome') or shutil.which('chromium')
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parent.parent
LOCAL={'react.production.min.js':ROOT/'node_modules/react/umd/react.production.min.js',
 'react-dom.production.min.js':ROOT/'node_modules/react-dom/umd/react-dom.production.min.js'}
async def route(r):
    u=r.request.url
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
    await p.goto('file://'+str(ROOT/'prototipo/index.html'))
    await p.wait_for_timeout(1500)
    return b,p,logs
