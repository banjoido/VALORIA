import asyncio,sys; sys.path.insert(0,'qa'); from lib import *
SHOTS=ROOT/'qa/.build/capturas'; SHOTS.mkdir(parents=True, exist_ok=True)
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
        p=await ctx.new_page(); await p.route('**/*',route)
        t=await p.evaluate("()=>0")
        await p.goto('file://'+str(ROOT/'juego/dist/index.html'),wait_until='load')
        nav=await p.evaluate("()=>JSON.stringify(performance.getEntriesByType('navigation')[0].toJSON())")
        import json; n=json.loads(nav); print('load ms',round(n['loadEventEnd']))
        await p.wait_for_timeout(1000)
        fps=await p.evaluate("()=>new Promise(r=>{let c=0,t0=performance.now();function f(){c++; if(performance.now()-t0<3000) requestAnimationFrame(f); else r(c/3)} requestAnimationFrame(f)})")
        print('fps',fps)
        print('heap MB', await p.evaluate("()=>performance.memory? (performance.memory.usedJSHeapSize/1e6).toFixed(1):'n/a'"))
        await b.close()
asyncio.run(main())
