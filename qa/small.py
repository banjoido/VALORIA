import asyncio,sys; sys.path.insert(0,'qa'); import bot
from bot import *
async def main():
    for (w,h,tag) in [(320,568,'se'),(768,1024,'tab')]:
        async with async_playwright() as pw:
            b=await pw.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
            ctx=await b.new_context(viewport={'width':w,'height':h},has_touch=True,is_mobile=True)
            p=await ctx.new_page(); await p.route('**/*',route)
            await p.goto('file://'+str(lib_path)); await p.wait_for_timeout(1000)
            for i in range(200):
                info=await p.evaluate(STEP_JS,['first',0])
                if info['paso']=='ir_semilla': break
                await p.wait_for_timeout(90)
            await p.wait_for_timeout(300)
            # find overflow
            ov=await p.evaluate("()=>[...document.querySelectorAll('#ui *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left<-1)}).length")
            print(tag,'elementos desbordados',ov)
            await p.screenshot(path=str(SHOTS)+f'/{tag}.png')
            await b.close()
asyncio.run(main())
