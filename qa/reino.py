"""Prueba de las reglas del reino (sprint 3, tarea A): reloj y economía, sin pantalla.

Comprueba, con window.valoria.reino y window.valoria.Estado sobre juego/dist/index.html,
las 12 condiciones del criterio de aceptación (docs/especificaciones/sprint-3-bucle.md, 14.2).
Las tablas se comparan con las de qa/sim_economia.py, que se importa.

Uso: python3 qa/reino.py             (la 12 solo ejecuta qa/sim_economia.py)
     python3 qa/reino.py --completo  (la 12 ejecuta también guardado.py, guardado_4_15.py
                                      y la partida completa del bot: unos 15 minutos)
"""
import asyncio, json, subprocess, sys, time
sys.path.insert(0, 'qa')
from lib import *
import sim_economia as sim

CLAVE = 'valoria-partida'
fallos = []


def comprobar(ok, msg):
    print(('  ok    ' if ok else '  FALLO ') + msg)
    ok or fallos.append(msg)


# Deja el estado como una partida limpia en la misión `m`, sin tocar la pantalla de título.
PREPARAR_JS = """(o) => { const E = window.valoria.Estado;
  E.reiniciar();
  Object.assign(E, {mision: 3, merma: 1, merma_desde: 0, tiempo: 0, brillo: 4, monedas: 0, dia: '2026-11-06', dias_jugados: 1}, o || {});
  return true; }"""


async def ev(p, js, arg=None):
    return await p.evaluate(js, arg)


async def preparar(p, **o):
    await ev(p, PREPARAR_JS, o)


async def main():
    t0 = time.time()
    async with async_playwright() as pw:
        b = await pw.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1, has_touch=True, is_mobile=True)
        p = await ctx.new_page(); logs = []
        p.on('console', lambda m: logs.append(f'[{m.type}] {m.text}') if m.type in ('error', 'warning') else None)
        p.on('pageerror', lambda e: logs.append(f'[pageerror] {e}'))
        await p.route('**/*', route)
        await p.goto('file://' + str(ROOT / 'juego/dist/index.html')); await p.wait_for_timeout(1200)
        R = 'window.valoria.reino'
        comprobar(await ev(p, f'() => !!({R} && {R}.noche && {R}.cosechar && {R}.sanear)'), 'window.valoria.reino expone el contrato')

        # 1. Tablas
        print('1. Tablas iguales que qa/sim_economia.py')
        t = await ev(p, f"""() => {{ const r = {R}; return {{COMPRA: r.COMPRA, VENTA: r.VENTA, CULTIVOS: r.CULTIVOS, CADUCA: r.CADUCA,
          TOPE_ARBOL: r.TOPE_ARBOL, TIERRAS: r.TIERRAS, FACTOR_TIERRA: r.FACTOR_TIERRA, LADRILLOS_ETAPA: r.LADRILLOS_ETAPA,
          BASE_TRABAJO: r.BASE_TRABAJO}}; }}""")
        norm = lambda d: {k: ({int(a) if str(a).isdigit() else a: v for a, v in w.items()} if isinstance(w, dict) else w) for k, w in d.items()} if isinstance(d, dict) else d
        for nombre in ['COMPRA', 'VENTA', 'CULTIVOS', 'CADUCA', 'TOPE_ARBOL', 'TIERRAS', 'FACTOR_TIERRA', 'LADRILLOS_ETAPA', 'BASE_TRABAJO']:
            py = getattr(sim, nombre); js = t[nombre]
            if nombre in ('FACTOR_TIERRA', 'BASE_TRABAJO'):
                js = {int(k): v for k, v in js.items()}
            elif isinstance(py, dict):
                js = norm(js)
            comprobar(js == py, f'{nombre} coincide')
        # Las funciones dan lo mismo que las de la simulación, en todos los niveles.
        await preparar(p)
        precios = await ev(p, f"""() => {{ const r = {R}, o = {{}};
          for (const L of [1,2,3,4]) {{ o[L] = {{compra: {{}}, venta: {{}}, tierra: [], trabajo: []}};
            for (const c of ['rabano','calabaza','manzano','abono','regadera','ladrillo']) o[L].compra[c] = r.precio(c, L);
            for (const f of ['rabano','calabaza','manzana','pepita']) o[L].venta[f] = r.precio_venta(f, L);
            for (let n = 0; n < 8; n++) o[L].tierra.push(r.precio_tierra(n, L)); }}
          const s = []; for (let i = 0; i < 100; i++) {{ const x = i / 100;
            s.push([r.suerte('rabano', true, x).frutos, r.suerte('rabano', false, x).frutos, r.suerte('calabaza', true, x).frutos, r.suerte('calabaza', false, x).frutos]); }}
          o.suerte = s; return o; }}""")
        ok = all(precios[str(L)]['compra'][c] == sim.precio(c, L) for L in range(1, 5) for c in sim.COMPRA)
        ok &= all(precios[str(L)]['venta'][f] == sim.venta(f, L) for L in range(1, 5) for f in sim.VENTA)
        comprobar(ok, 'precio() y precio_venta() = simulación en los niveles 1 a 4')
        comprobar(all(precios[str(L)]['tierra'] == [sim.tierra(n, L) for n in range(8)] for L in range(1, 5)), 'precio de las 8 tierras = simulación')
        comprobar(all(precios['suerte'][i] == [sim.suerte('rabano', True, i / 100), sim.suerte('rabano', False, i / 100),
                                                 sim.suerte('calabaza', True, i / 100), sim.suerte('calabaza', False, i / 100)] for i in range(100)),
                  'suerte de la cosecha = simulación (100 valores del azar)')

        # 2. Cosechas
        print('2. Cosechas')
        await preparar(p, regadera='hierro', mision=5)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          const una = (cultivo, regar, azar, abono) => {{ E.huerto = []; E.cesta = []; E.bolsa = {{rabano: 0, calabaza: 0, manzano: 0, abono: abono ? 1 : 0}};
            E.bolsa[cultivo] = 1; r.plantar('mercado', 2, 4, cultivo); if (regar) r.regar('mercado', 2, 4); if (abono) r.abonar('mercado', 2, 4);
            for (let i = 0; i < r.CULTIVOS[cultivo].noches; i++) E.huerto[0].edad++;
            const c = r.cosechar('mercado', undefined, () => azar); return c.length ? c[0].frutos : -1; }};
          o.rab_seco = [0, 0.1, 0.29, 0.5, 0.99].map(a => una('rabano', false, a));
          o.rab_reg = una('rabano', true, 0.1);
          o.cal = [0.1, 0.3, 0.9].map(a => una('calabaza', true, a));
          o.rab_abono = una('rabano', false, 0.5); o.rab_abono2 = una('rabano', false, 0.5, true);
          o.cal_abono = una('calabaza', true, 0.9, true);
          // Replanta el mismo cultivo; con mano = calabaza y calabaza en la bolsa, calabaza.
          E.huerto = []; E.cesta = []; E.bolsa = {{rabano: 2, calabaza: 0, manzano: 0, abono: 0}};
          r.plantar('mercado', 2, 4, 'rabano'); r.plantar('mercado', 3, 4, 'rabano'); E.huerto.forEach(p => p.edad = 1);
          const c1 = r.cosechar('mercado', 'calabaza', () => 0.5);
          o.mismo = c1.map(c => c.replantado).concat(E.huerto.map(p => p.cultivo + p.edad));
          o.cesta1 = r.cesta_cuenta('rabano');
          E.bolsa.calabaza = 1; E.huerto.forEach(p => p.edad = 1);
          const c2 = r.cosechar('mercado', 'calabaza', () => 0.5);
          o.cambio = c2.map(c => c.replantado); o.bolsa_cal = E.bolsa.calabaza; o.cesta2 = r.cesta_cuenta('rabano');
          return o; }}""")
        comprobar(r['rab_seco'] == [2] * 5, f'rábano sin regar da 2 con cualquier azar {r["rab_seco"]}')
        comprobar(r['rab_reg'] == 3, f'rábano regado con azar 0,1 da 3 ({r["rab_reg"]})')
        comprobar(r['cal'] == [2, 5, 3], f'calabaza regada: 0,1 → 2, 0,3 → 5, 0,9 → 3 ({r["cal"]})')
        comprobar(r['rab_abono2'] == r['rab_abono'] + 2 and r['cal_abono'] == 5, f'con abono, +2 ({r["rab_abono2"]}, {r["cal_abono"]})')
        comprobar(r['mismo'] == ['rabano', 'rabano', 'rabano0', 'rabano0'] and r['cesta1'] == 2,
                  f'cosechar replanta el mismo cultivo sin calabaza en la bolsa {r["mismo"]}, cesta {r["cesta1"]}')
        comprobar(r['cambio'] == ['calabaza', 'rabano'] and r['bolsa_cal'] == 0 and r['cesta2'] == 2 + 2 + 1,
                  f'con mano = calabaza y 1 calabaza en la bolsa: {r["cambio"]}, cesta {r["cesta2"]}')

        # 3. Manzano
        print('3. Manzano')
        await preparar(p, mision=6)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado;
          E.bolsa.manzano = 1; const ok = r.plantar('valle', 9, 24); const m = [];
          for (let i = 0; i < 7; i++) {{ r.noche(); m.push(E.huerto[0].manzanas); }}
          const recogidas = r.recoger_manzanas('valle', 9, 24);
          return {{ok, m, recogidas, despues: E.huerto[0].manzanas, cesta: r.cesta_cuenta('manzana')}}; }}""")
        comprobar(r['ok'] and r['m'][:4] == [0, 0, 0, 0], f'0 manzanas en las 4 primeras noches {r["m"][:4]}')
        comprobar(r['m'][4] == 2, f'2 manzanas en la 5.ª noche ({r["m"][4]})')
        comprobar(max(r['m']) == 3 and r['m'][5:] == [3, 3], f'tope de 3 manzanas {r["m"]}')
        comprobar(r['recogidas'] == 3 and r['despues'] == 0 and r['cesta'] == 3, 'recoger_manzanas las pasa a la cesta')

        # 4. Cesta, fechas y compostera
        print('4. Cesta y compostera')
        await preparar(p)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          r.meter_cesta('rabano', 1); r.noche(); o.n1 = r.cesta_cuenta('rabano'); o.p1 = r.cesta_pocha_manana().rabano || 0;
          r.noche(); o.n2 = r.cesta_cuenta('rabano'); o.p2 = r.cesta_pocha_manana().rabano || 0;
          const s = r.noche(); o.n3 = r.cesta_cuenta('rabano'); o.compost = E.compost;
          r.meter_cesta('rabano', 2); r.noche(); r.noche(); const s2 = r.noche();
          o.abono = E.bolsa.abono; o.compost2 = E.compost; o.aviso = s2.compost;
          E.cesta = []; r.meter_cesta('pepita', 1); for (let i = 0; i < 20; i++) r.noche(); o.pepita = r.cesta_cuenta('pepita');
          return o; }}""")
        comprobar(r['n1'] == 1 and r['n2'] == 1 and r['n3'] == 0, f'el rábano sigue tras 2 noches y no tras 3 ({r["n1"]}, {r["n2"]}, {r["n3"]})')
        comprobar(r['p1'] == 0 and r['p2'] == 1, 'cesta_pocha_manana() lo marca en la 2.ª noche')
        comprobar(r['abono'] == 1 and r['compost2'] == 0 and r['aviso'] == 1, f'3 frutos pasados dan 1 abono (abono {r["abono"]}, compost {r["compost2"]})')
        comprobar(r['pepita'] == 1, 'la pepita no caduca')

        # 5. Merma
        print('5. Merma')
        await preparar(p, mision=8)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{sube: [], avisa: [], brillo: true}};
          for (let i = 0; i < 45; i++) {{ const s = r.noche(); if (s.merma === 'sube') o.sube.push(E.tiempo);
            if (s.merma === 'aviso') o.avisa.push(E.tiempo); o.brillo = o.brillo && E.brillo === 5 - E.merma;
            if (E.tiempo === 9) o.avisa9 = r.merma_avisa(); if (E.tiempo === 10) o.subio10 = r.merma_subio(); if (E.tiempo === 11) o.subio11 = r.merma_subio(); }}
          o.merma_hist = E.merma;
          // Final: baja 1 y sube cada 30 noches hasta 4.
          E.maquina_apagada = true; r.al_cambiar_mision(); o.tras_final = E.merma; o.desde = E.merma_desde === E.tiempo;
          r.al_cambiar_mision(); o.tras_final2 = E.merma;
          const t0 = E.tiempo; o.sube_final = []; o.avisa_final = [];
          for (let i = 0; i < 100; i++) {{ const s = r.noche(); if (s.merma === 'sube') o.sube_final.push(E.tiempo - t0);
            if (s.merma === 'aviso') o.avisa_final.push(E.tiempo - t0); o.brillo = o.brillo && E.brillo === 5 - E.merma; }}
          o.merma_fin = E.merma;
          // Con Merma en 1, el final no la baja de 1.
          E.maquina_apagada = false; E.merma_final = false; r.poner_merma(1); E.maquina_apagada = true; r.al_cambiar_mision(); o.min1 = E.merma;
          return o; }}""")
        comprobar(r['sube'] == [10, 20], f'sube en tiempo 10 y 20 {r["sube"]}')
        comprobar(r['avisa'] == [9, 19] and r['avisa9'], f'avisa en 9 y 19 {r["avisa"]}')
        comprobar(r['subio10'] and not r['subio11'], 'merma_subio() solo la noche de la subida')
        comprobar(r['merma_hist'] == 3, f'no pasa de 3 sin el final ({r["merma_hist"]})')
        comprobar(r['tras_final'] == 2 and r['desde'] and r['tras_final2'] == 2, f'al ganar la 15 baja 1, una sola vez ({r["tras_final"]}, {r["tras_final2"]})')
        comprobar(r['sube_final'] == [30, 60] and r['avisa_final'] == [29, 59] and r['merma_fin'] == 4,
                  f'tras el final sube cada 30 noches hasta 4 {r["sube_final"]}, avisos {r["avisa_final"]}')
        comprobar(r['min1'] == 1, 'con Merma 1, el final no la baja de 1')
        comprobar(r['brillo'], 'brillo === 5 - merma siempre')

        # 6. al_abrir
        print('6. Vuelta al juego')
        await preparar(p, mision=6, dia='2026-11-06', dias_jugados=1)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          const v = (d) => {{ const t = E.tiempo, m = E.merma, s = r.al_abrir(d); return {{noches: s.noches, dt: E.tiempo - t, dm: E.merma - m, nuevo: s.dia_nuevo,
            regalo: s.regalo, encargo: !!s.encargo, dia: E.dia, siestas: r.siestas_quedan()}}; }};
          r.usar_siesta(); r.usar_siesta(); o.sin_siestas = r.siestas_quedan(); o.tercera = r.usar_siesta();
          o.mismo = v('2026-11-06'); o.mas1 = v('2026-11-07'); o.mas5 = v('2026-11-12'); o.antes = v('2026-11-08'); o.luego = v('2026-11-13');
          o.mal = v('basura');
          return o; }}""")
        comprobar(r['sin_siestas'] == 0 and r['tercera'] is False, 'dos siestas al día; la tercera no')
        comprobar(r['mismo']['noches'] == 0 and r['mismo']['dt'] == 0 and not r['mismo']['nuevo'], 'mismo día → 0 noches')
        comprobar(r['mas1']['noches'] == 1 and r['mas1']['dt'] == 1 and r['mas1']['regalo'] and r['mas1']['encargo'] and r['mas1']['siestas'] == 2,
                  f'+1 día → 1 noche, regalo y encargo {r["mas1"]}')
        comprobar(r['mas5']['noches'] == 2 and r['mas5']['dt'] == 2, f'+5 días → 2 noches {r["mas5"]}')
        comprobar(r['antes']['noches'] == 0 and r['antes']['dt'] == 0 and r['antes']['dia'] == '2026-11-12', f'fecha anterior → nada {r["antes"]}')
        comprobar(r['luego']['noches'] == 1 and r['luego']['dt'] == 1, f'después, día + 1 → 1 noche {r["luego"]}')
        comprobar(all(r[k]['dm'] == 0 for k in ('mismo', 'antes', 'mal')), 'Merma no cambia por la fecha si no pasan noches')
        comprobar(r['mal']['noches'] == 0, 'una fecha mal formada no hace nada')

        # 7. Trabajo
        print('7. Trabajo con Hogaza')
        await preparar(p)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          o.m1 = [0, 4, 6].map(a => r.pago_trabajo(a)); r.poner_merma(3); o.m3 = r.pago_trabajo(4); r.poner_merma(1);
          E.mision = 4; E.ladrillos = 30; o.molino = r.pago_trabajo(4); E.ladrillos = 0;
          o.antes = r.puede_trabajar(); r.marcar_trabajo(); o.despues = r.puede_trabajar();
          r.al_abrir('2026-11-06'); o.mismo_dia = r.puede_trabajar(); r.al_abrir('2026-11-07'); o.manana = r.puede_trabajar();
          return o; }}""")
        comprobar(r['m1'] == [3, 7, 11], f'Merma 1: (0) 3, (4) 7, (6) 11 {r["m1"]}')
        comprobar(r['m3'] == 9, f'Merma 3: (4) da 9 ({r["m3"]})')
        comprobar(r['molino'] == 8, f'con el molino en la etapa 2, +1 ({r["molino"]})')
        comprobar(r['antes'] and not r['despues'] and not r['mismo_dia'] and r['manana'], 'puede_trabajar() falso tras marcar_trabajo() hasta el día siguiente')

        # 8. Tierras
        print('8. Tierras')
        await preparar(p, mision=4, monedas=100)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          o.venta = r.bancales('mercado').filter(b => !b.abierto).map(b => b.precio);
          o.p1 = r.precio('tierra'); o.c1 = r.comprar_tierra('mercado', 2, 3); o.p2 = r.precio('tierra'); o.bola = E.bola_de_nieve;
          o.abierta = r.bancales('mercado').find(b => b.x === 2 && b.y === 3).abierto; o.planta = r.plantar('mercado', 2, 3, 'rabano') || (E.bolsa.rabano = 1, r.plantar('mercado', 2, 3));
          E.tierras = []; r.poner_merma(3); o.p1m3 = r.precio('tierra'); r.poner_merma(1);
          o.valle5 = r.comprar_tierra('valle', 1, 9); o.valle_bancales5 = r.bancales('valle').length;
          E.mision = 6; o.valle_bancales6 = r.bancales('valle').filter(b => b.tipo === 'bancal' && !b.abierto).length;
          o.valle6 = r.comprar_tierra('valle', 1, 9);
          E.monedas = 0; o.sin_monedas = r.comprar_tierra('valle', 2, 9);
          o.no_tierra = r.comprar_tierra('mercado', 2, 4);
          return o; }}""")
        comprobar(r['p1'] == 10 and r['c1'] and r['p2'] == 16, f'Merma 1: la 1.ª cuesta 10 y la 2.ª 16 ({r["p1"]}, {r["p2"]})')
        comprobar(r['venta'] == [10] * 4 and r['abierta'] and r['planta'] and r['bola'], '4 tierras a la venta en la fila 3; comprada, se planta; bola de nieve')
        comprobar(r['p1m3'] == 14, f'Merma 3: la 1.ª cuesta 14 ({r["p1m3"]})')
        comprobar(not r['valle5'] and r['valle_bancales5'] == 0, 'las del Valle no se venden antes de ganar la 5')
        comprobar(r['valle_bancales6'] == 4 and r['valle6'], 'tras ganar la 5, 4 tierras de Copo a la venta')
        comprobar(not r['sin_monedas'] and not r['no_tierra'], 'sin monedas, o en un bancal gratis, no se compra')

        # 9. Molino
        print('9. Molino')
        await preparar(p, mision=4, monedas=10000)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{etapas: [], nuevas: []}};
          for (const n of [10, 20, 40, 80]) {{ const s = r.poner_ladrillos(n); o.nuevas.push(s.etapa_nueva); o.etapas.push([E.ladrillos, r.obra('mercado').etapa]); }}
          o.mas = r.poner_ladrillos(5).puestos;
          E.ladrillos = 25; const antes = E.ladrillos; r.noche(); r.poner_merma(3); o.igual = E.ladrillos === antes;
          o.obra = r.obra('mercado'); o.precio3 = r.precio('ladrillo'); o.valle = r.obra('valle');
          E.mision = 3; o.antes_m3 = r.obra('mercado');
          return o; }}""")
        comprobar(r['etapas'] == [[10, 1], [30, 2], [70, 3], [150, 4]] and r['nuevas'] == [1, 2, 3, 4], f'10 → 1, 30 → 2, 70 → 3, 150 → 4 {r["etapas"]}')
        comprobar(r['mas'] == 0, 'con el molino entero no se ponen más')
        comprobar(r['igual'] and r['obra']['puestos'] == 15 and r['obra']['necesarios'] == 20 and r['precio3'] == 7,
                  f'los ladrillos puestos no cambian al subir Merma {r["obra"]}')
        comprobar(r['valle'] is None and r['antes_m3'] is None, 'el solar solo está en el Mercado y tras ganar la 3')

        # 10. Encargo
        print('10. Encargo del día')
        await preparar(p, mision=3, dia='2026-11-05', dias_jugados=0)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          r.al_abrir('2026-11-06'); o.dias = E.dias_jugados; o.enc = r.encargo_hoy();
          o.sin = r.cumplir_encargo(); r.meter_cesta('rabano', 10); const m = E.monedas;
          o.primera = r.cumplir_encargo(); o.cobradas = E.monedas - m; o.segunda = r.cumplir_encargo(); o.cesta = r.cesta_cuenta('rabano');
          r.al_abrir('2026-11-07'); o.dia2 = r.encargo_hoy();
          E.mision = 3; E.dias_jugados = 2; r.al_abrir('2026-11-08'); o.salta = r.encargo_hoy();
          return o; }}""")
        comprobar(r['dias'] == 1 and r['enc'] == {'npc': 'hogaza', 'fruto': 'rabano', 'n': 4, 'pago': 6}, f'día 1: Hogaza, 4 rábanos, pago 6 {r["enc"]}')
        comprobar(r['sin'] == 0, 'sin los frutos no se cumple')
        comprobar(r['primera'] == 6 and r['cobradas'] == 6 and r['segunda'] == 0 and r['cesta'] == 6, 'cumplirlo dos veces el mismo día da 0 la segunda')
        comprobar(r['dia2'] and r['dia2']['npc'] == 'tasador' and r['dia2']['pago'] == 9, f'día 2: Tasador, 6 rábanos, pago 9 {r["dia2"]}')
        comprobar(r['salta'] and r['salta']['npc'] == 'hogaza', f'día 3 en la misión 3: salta los que no están abiertos {r["salta"]}')

        # 11. Migración y saneado
        print('11. Migración')
        async def cargar(g):
            await p.evaluate("([k, g]) => localStorage.setItem(k, JSON.stringify(g))", [CLAVE, g])
            await p.reload(); await p.wait_for_timeout(1000)
            return await p.evaluate("""() => { const E = window.valoria.Estado; return {mision: E.mision, merma: E.merma, brillo: E.brillo,
              tiempo: E.tiempo, merma_desde: E.merma_desde, eleccion_m01: E.eleccion_m01, dia: E.dia, dias_jugados: E.dias_jugados,
              brotes: E.brotes.length, bolsa: E.bolsa, huerto: E.huerto, cesta: E.cesta, ladrillos: E.ladrillos, tierras: E.tierras,
              secretos: E.secretos, encargo: E.encargo, brotes_pasados: E.brotes_pasados, ultimo_trabajo: E.ultimo_trabajo}; }""")
        base = {'zona': 'mercado', 'monedas': 20, 'precio_pan': 5, 'tiene_chispin': True, 'criaturas': ['chispin']}
        e = await cargar({**base, 'mision': 8, 'zona': 'ciudad', 'brillo': 3, 'ultima_estacion_amasar': 2})
        comprobar(e['merma'] == 1 and e['brillo'] == 4 and e['tiempo'] == 14 and e['eleccion_m01'] == 'hucha' and e['merma_desde'] == 14,
                  f'misión 8 con brillo 3 → merma 1, brillo 4, tiempo 14, "hucha" ({e["merma"]}, {e["brillo"]}, {e["tiempo"]}, {e["eleccion_m01"]!r})')
        comprobar(e['dia'] == '' and e['dias_jugados'] == 1 and e['ultimo_trabajo'] == '', 'sin día: habrá noche de vuelta')
        e = await cargar({**base, 'mision': 3, 'brillo': 4})
        comprobar(e['eleccion_m01'] == 'semillas' and e['merma'] == 1, 'brillo 4 → "semillas"')
        e = await cargar({**base, 'mision': 16, 'brillo': 4, 'maquina_apagada': True})
        comprobar(e['merma'] == 1 and e['brillo'] == 4, 'tras el final: merma 1')
        brotes = [{'celda': {'x': x, 'y': 5}, 'crece': 1, 'fruto': True, 'cuantos': 2, 'zona': 'mercado'} for x in (2, 3, 4)]
        brotes += [{'celda': {'x': x, 'y': 10}, 'crece': 1, 'fruto': False, 'cuantos': 1, 'zona': 'valle'} for x in (1, 2)]
        e = await cargar({**base, 'mision': 5, 'zona': 'valle', 'brillo': 3, 'brotes': brotes})
        comprobar(e['bolsa']['rabano'] == 3 and e['brotes'] == 2 and e['brotes_pasados'] == ['mercado'],
                  f'misión 5: los brotes del Mercado pasan a la bolsa ({e["bolsa"]}, quedan {e["brotes"]} del Valle)')
        brotes_valle = [{'celda': {'x': x, 'y': y}, 'zona': 'valle'} for x in (1, 2, 3, 4) for y in (9, 10)]
        e = await cargar({**base, 'mision': 6, 'zona': 'valle', 'brillo': 3, 'brotes': brotes + brotes_valle})
        comprobar(e['bolsa']['rabano'] == 3 + 4 and e['brotes'] == 0, f'misión 6: los del Valle también, como mucho 4 ({e["bolsa"]})')
        basura = {**base, 'mision': 9, 'zona': 'ciudad', 'merma': 9, 'tiempo': -3, 'dia': 'ayer', 'ladrillos': 999, 'monedas': 'mucho',
                  'huerto': [None, 5, 'x', {'zona': 'mercado', 'x': 2, 'y': 4, 'cultivo': 'rabano', 'edad': 1},
                             {'zona': 'mercado', 'x': 2, 'y': 4, 'cultivo': 'calabaza'}, {'zona': 'luna', 'x': 1, 'y': 1, 'cultivo': 'rabano'},
                             {'zona': 'mercado', 'x': 'a', 'y': 4, 'cultivo': 'rabano'}, {'zona': 'mercado', 'x': 3, 'y': 4, 'cultivo': 'oro'},
                             {'zona': 'mercado', 'x': 3, 'y': 3, 'cultivo': 'rabano'}, {'zona': 'valle', 'x': 9, 'y': 24, 'cultivo': 'rabano'},
                             {'zona': 'valle', 'x': 11, 'y': 24, 'cultivo': 'manzano', 'edad': 9, 'manzanas': 50}],
                  'cesta': ['x', None, {'fruto': 'oro', 'n': 3}, {'fruto': 'rabano', 'n': -2}, {'fruto': 'rabano', 'n': 0},
                            {'fruto': 'calabaza', 'n': 3, 'noches': 1}],
                  'bolsa': {'rabano': -1, 'calabaza': 'x', 'abono': 2.7}, 'tierras': ['mercado:9,9', 'valle:1,9', 'valle:1,9', 7],
                  'secretos': ['fuente', 'nada', 'fuente'], 'encargo': {'dia': 'x'}, 'brotes_pasados': 'mercado', 'brotes': [None, 3]}
        e = await cargar(basura)
        comprobar([(h['zona'], h['x'], h['y'], h['cultivo']) for h in e['huerto']] == [('mercado', 2, 4, 'rabano'), ('valle', 11, 24, 'manzano')]
                  and e['huerto'][1]['manzanas'] == 3, f'basura en huerto descartada {e["huerto"]}')
        comprobar(e['cesta'] == [{'fruto': 'calabaza', 'n': 3, 'noches': 1}], f'basura en cesta descartada {e["cesta"]}')
        comprobar(e['merma'] == 4 and e['tiempo'] == 0 and e['dia'] == '' and e['ladrillos'] == 150, 'merma, tiempo, día y ladrillos dentro de sus límites')
        comprobar(e['bolsa'] == {'rabano': 0, 'calabaza': 0, 'manzano': 0, 'abono': 2} and e['tierras'] == ['valle:1,9'] and e['secretos'] == ['fuente']
                  and e['encargo'] is None, 'bolsa, tierras, secretos y encargo saneados')
        try:
            await p.locator('#ui button', has_text='Continuar').first.wait_for(timeout=5000); titulo = True
        except Exception:
            titulo = False
        comprobar(titulo, 'la pantalla de título ofrece «Continuar» tras cargar basura')
        await p.evaluate("(k) => localStorage.removeItem(k)", CLAVE)

        # Otras reglas del contrato
        print('Otras reglas')
        await preparar(p, mision=3, monedas=0)
        r = await ev(p, f"""() => {{ const r = {R}, E = window.valoria.Estado, o = {{}};
          o.bancales3 = r.bancales('mercado').map(b => b.y + (b.abierto ? 'a' : 'v')).join('');
          o.no_puede = r.puede_jugar(); o.red = r.red_de_seguridad(); o.red2 = r.red_de_seguridad(); o.puede = r.puede_jugar();
          r.noche(); E.bolsa.rabano = 0; o.red3 = r.red_de_seguridad();
          o.planta_barata = (E.bolsa.rabano = 0, E.bolsa.calabaza = 1, r.plantar('mercado', 3, 4)) && r.planta_en('mercado', 3, 4).cultivo;
          o.faltan = r.noches_que_faltan(r.planta_en('mercado', 3, 4));
          o.regar_sin = r.regar('mercado', 3, 4); E.regadera = 'hierro'; o.regar = r.regar('mercado', 3, 4); o.regar2 = r.regar('mercado', 3, 4);
          o.manos = (E.bolsa.abono = 1, r.manos_disponibles());
          E.monedas = 100; o.cat = r.catalogo('semilla').compra; o.cat_yunque = r.catalogo('yunque').compra;
          o.compra = r.comprar('rabano') && E.bolsa.rabano === 1 && E.monedas === 98;
          r.meter_cesta('rabano', 3); r.meter_cesta('pepita', 1); o.todo = r.vender_todo('tasador'); o.tras_vender = E.cesta.length;
          o.metas = r.metas().map(m => m.id + m.precio);
          return o; }}""")
        comprobar(r['bancales3'] == '4a4a4a4a3v3v3v3v', f'misión 3: 4 bancales abiertos en la fila 4 y 4 tierras a la venta ({r["bancales3"]})')
        comprobar(not r['no_puede'] and r['red'] and not r['red2'] and r['puede'] and r['red3'],
                  'sin nada, la red de seguridad da una semilla, como mucho una por noche')
        comprobar(r['planta_barata'] == 'calabaza' and r['faltan'] == 3, 'plantar sin cultivo usa lo que haya; la calabaza tarda 3 noches')
        comprobar(not r['regar_sin'] and r['regar'] and not r['regar2'], 'solo se riega con la regadera de hierro, una vez por siembra')
        comprobar(r['manos'] == ['regadera', 'abono'], f'manos disponibles {r["manos"]}')
        comprobar(r['cat'] == ['rabano', 'tierra'] and r['cat_yunque'] == [], f'catálogos en la misión 3 {r["cat"]} {r["cat_yunque"]}')
        comprobar(r['compra'] and r['todo'] == 3 + 15 and r['tras_vender'] == 0, f'comprar y vender todo ({r["todo"]})')
        comprobar(r['metas'] == ['tierra10'], f'metas {r["metas"]}')

        await b.close()
    errores = [l for l in logs if 'pageerror' in l]
    for l in errores: print(l)
    comprobar(not errores, 'sin errores de página')

    # 12. El resto de pruebas
    print('12. Otras pruebas')
    cmds = [['python3', 'qa/sim_economia.py']]
    if '--completo' in sys.argv:
        cmds += [['python3', 'qa/guardado.py'], ['python3', 'qa/guardado_4_15.py'], ['python3', 'qa/bot.py', 'first', '60000', 'reino']]
    else:
        print('  (guardado.py, guardado_4_15.py y la partida completa: con --completo)')
    for c in cmds:
        out = subprocess.run(c, cwd=ROOT, capture_output=True, text=True)
        texto = out.stdout + out.stderr
        if c[1] == 'qa/bot.py':
            ok = "('FINAL',)" in texto and '[pageerror]' not in texto
        else:
            ok = out.returncode == 0
        comprobar(ok, ' '.join(c[1:]) + ' pasa')
        ok or print(texto[-2000:])
    print(f'[{round(time.time() - t0)}s] RESULTADO', 'OK' if not fallos else f'FALLOS: {len(fallos)}')
    for f in fallos: print('  -', f)
    sys.exit(0 if not fallos else 1)


if __name__ == '__main__':
    asyncio.run(main())
