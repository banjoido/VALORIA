import asyncio,sys,json,time,random; sys.path.insert(0,'qa'); from lib import *
lib_path=ROOT/'qa/.build/qa.html'
SHOTS=ROOT/'qa/.build/capturas'; SHOTS.mkdir(parents=True, exist_ok=True)
STEP_JS = r"""
(args) => { const [pref, same] = args;
  const e = window.__e, m = window.__mundo;
  const ui = document.querySelector('#ui');
  const vis = el => { const r = el.getBoundingClientRect(); const cs=getComputedStyle(el); return r.width>0 && r.height>0 && cs.visibility!=='hidden' && cs.pointerEvents!=='none'; };
  const btns = [...ui.querySelectorAll('button')].filter(b => !b.disabled && vis(b));
  const hud = new Set(['Voz','Mochila','Huerto','Mapa','Criaturas']);
  const nav = btns.filter(b => !hud.has(b.innerText.trim()) && !b.closest('.nav') && !b.closest('.hud'));
  const info = {paso: e.paso, mision: e.mision, zona: e.zona, monedas: e.monedas, ocupado: e.ocupado, botones: nav.map(b=>b.innerText.trim().replace(/\s+/g,' ').slice(0,40))};
  if (nav.length) {
    let b = nav[Math.floor(same/3) % nav.length];
    if (pref === 'random') b = nav[Math.floor(Math.random()*nav.length)];
    if (pref === 'last') b = nav[nav.length-1];
    info.accion = 'boton:' + b.innerText.trim().replace(/\s+/g,' ').slice(0,40);
    b.click(); return info;
  }
  const dlg = ui.querySelector('.dialogo');
  if (dlg && vis(dlg)) { dlg.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})); dlg.click(); info.accion='dialogo'; return info; }
  if (!e.ocupado && m.objetivo_fn) {
    const o = m.objetivo_fn();
    if (o) {
      const r = m.canvas.getBoundingClientRect(); const F = 13;
      // find tile size: try m.escala
      const x = r.left + m.offX + (o.x + 0.5) * F * m.escala;
      const y = r.top + ((o.y + 0.5) * F - m.camY) * m.escala;
      if (!m.ruta.length) m.tocar({clientX:x, clientY:y});
      info.accion = 'ir:' + o.x + ',' + o.y; return info;
    }
  }
  if (!e.ocupado && !m.ruta.length && e.paso.startsWith('ir_')) {
    const k = e.paso.slice(3); const c = m.posiciones[k];
    if (c && m.visibles[k]) { const r = m.canvas.getBoundingClientRect();
      m.tocar({clientX: r.left + m.offX + (c.x+0.5)*13*m.escala, clientY: r.top + ((c.y+0.5)*13 - m.camY)*m.escala}); info.accion='irnpc:'+k; return info; }
  }
  if (!e.ocupado && !m.ruta.length) {
    const names = Object.keys(m.posiciones).filter(k => m.visibles[k] && !(k===m.huye && m.huida));
    if (names.length) {
      window.__k = ((window.__k||0) + 1);
      if (window.__k % 25 === 1) {
        const k = names[Math.floor(window.__k/25) % names.length]; const c = m.posiciones[k];
        const r = m.canvas.getBoundingClientRect();
        m.tocar({clientX: r.left + m.offX + (c.x+0.5)*13*m.escala, clientY: r.top + ((c.y+0.5)*13 - m.camY)*m.escala});
        info.accion = 'npc:'+k; return info;
      }
      info.accion='espera'; return info;
    }
  }
  // fallback: click any clickable element in ui that's not hud
  const otros = [...ui.querySelectorAll('[class]')].filter(el => vis(el) && getComputedStyle(el).cursor==='pointer' && !el.closest('.nav') && !el.closest('.hud'));
  if (otros.length) { otros[0].click(); otros[0].dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})); info.accion='clic:'+otros[0].className; return info;}
  info.accion='nada:ruta='+JSON.stringify(m.ruta.slice(0,3))+' heroe='+[m.heroe.x|0,m.heroe.y|0]+' mov='+m.moviendo+' cap='+(window.valoria&&window.valoria.ui.vista? Object.keys(window.valoria.ui.vista).filter(k=>window.valoria.ui.vista[k]).join('|'):''); return info;
}
"""
async def run(pref='first', max_steps=2500, tag='a', w=390, h=844, start=None):
    async with async_playwright() as pw:
        b=await pw.chromium.launch(executable_path=CHROME,args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':w,'height':h},device_scale_factor=1,has_touch=True,is_mobile=True)
        p=await ctx.new_page(); logs=[]
        p.on('console',lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in('error','warning') else None)
        p.on('pageerror',lambda e: logs.append(f'[pageerror] {e}'))
        await p.route('**/*',route)
        if start:
            await p.add_init_script("if(!sessionStorage.getItem('s')){sessionStorage.setItem('s',1);localStorage.setItem('valoria-partida', JSON.stringify({mision:%d, zona:'%s', monedas:20, brillo:5, precio_pan:5, criaturas:['chispin','brotin','escudon','repartija','olfatin'], tiene_chispin:true, ojo_tasador:true}))}" % start)
        await p.goto('file://'+str(lib_path)); await p.wait_for_timeout(1200)
        hist=[]; last=None; same=0; seen=set(); t0=time.time(); stay=0; lastkey=None; trail=[]
        for i in range(max_steps):
            try: info=await p.evaluate(STEP_JS, ['random' if stay>250 else pref, same])
            except Exception as ex: logs.append(f'[bot] {ex}'); break
            key=(info['mision'],info['paso'])
            stay = stay+1 if key==lastkey else 0; lastkey=key
            trail.append(info.get('accion')); trail=trail[-30:]
            if stay>2500:
                await p.screenshot(path=str(SHOTS)+f'/{tag}_ATASCO.png'); logs.append(f'[bot] atasco largo en {info} trail={trail}'); break
            if key not in seen:
                seen.add(key); hist.append((i,round(time.time()-t0),info['mision'],info['zona'],info['paso'],info['monedas']))
                await p.screenshot(path=str(SHOTS)+f'/{tag}_m{info["mision"]:02d}_{info["paso"]}.png')
            sig=json.dumps(info,sort_keys=True)
            same = same+1 if sig==last else 0; last=sig
            if same>80:
                await p.screenshot(path=str(SHOTS)+f'/{tag}_ATASCO.png'); logs.append(f'[bot] atasco en {info}'); break
            if info['paso']=='libre' and i>20: 
                await p.wait_for_timeout(1500); await p.screenshot(path=str(SHOTS)+f'/{tag}_final.png'); hist.append(('FINAL',)); break
            await p.wait_for_timeout(90)
        for hh in hist: print(hh)
        print('ULTIMO', info)
        print('\n'.join(l for l in logs if 'ERR_FAILED' not in l))
        await b.close()
if __name__=='__main__':
    st=None
    if len(sys.argv)>4: n=int(sys.argv[4]); st=(n, {7:'ciudad',10:'torre',13:'reloj',15:'reloj'}.get(n,'mercado'))
    asyncio.run(run(sys.argv[1], int(sys.argv[2]), sys.argv[3], start=st))
