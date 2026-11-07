"""Simulación de la economía del sprint 3 (docs/especificaciones/sprint-3-bucle.md, sección 7).

Versión 2, tras las revisiones del crítico y de pedagogía (docs/revisiones/sprint-3-*.md).
Juega 10 días de Valoria con seis formas de jugar y comprueba:
  1. replantar e invertir > vender todo > guardar en la hucha;
  2. las monedas en mano se quedan por debajo de 350 los 10 días;
  3. quien invierte bien tiene algo útil que comprar al menos hasta el día 8;
  4. guardar frutos esperando a Merma no gana (los frutos caducan);
  5. nadie se queda sin poder jugar y ninguna fuente de monedas es infinita.
Uso: python3 qa/sim_economia.py [semilla]   (sin semilla: media de las semillas 1 a 7)
"""
import math, random, sys

# ---------------------------------------------------------------------------
# Números de la especificación (secciones 4 y 6). Niveles de Merma 1..4
# (el 4 solo puede llegar después del final, muy despacio).
# ---------------------------------------------------------------------------
COMPRA = {  # lo que vende la tienda
    "rabano":   {1: 2,  2: 3,  3: 4,  4: 5},
    "calabaza": {1: 5,  2: 6,  3: 8,  4: 9},
    "manzano":  {1: 20, 2: 25, 3: 30, 4: 35},
    "abono":    {1: 4,  2: 5,  3: 6,  4: 7},
    "regadera": {1: 8,  2: 10, 3: 12, 4: 14},
    "ladrillo": {1: 5,  2: 6,  3: 7,  4: 8},
}
VENTA = {   # lo que paga Tasador (o Copo) por cada fruto
    "rabano":   {1: 1, 2: 2, 3: 2, 4: 3},
    "calabaza": {1: 2, 2: 2, 3: 3, 4: 3},
    "manzana":  {1: 1, 2: 1, 3: 1, 4: 2},
    "pepita":   {1: 15, 2: 20, 3: 25, 4: 30},
}
CULTIVOS = {
    "rabano":   dict(noches=1, frutos=2, fruto="rabano"),
    "calabaza": dict(noches=3, frutos=3, fruto="calabaza"),
    "manzano":  dict(noches=4, frutos=2, fruto="manzana"),  # desde la 5.ª noche, 2 manzanas cada noche
}
CADUCA = {"rabano": 2, "manzana": 4, "calabaza": 10}   # noches que aguanta en la cesta
TOPE_ARBOL = 3
TIERRAS = [10, 16, 26, 40, 65, 100, 160, 250]           # 4 en el Mercado y luego 4 en el Valle
FACTOR_TIERRA = {1: 1.0, 2: 1.2, 3: 1.4, 4: 1.6}
LADRILLOS_ETAPA = [10, 20, 40, 80]                      # obra del molino: 50/100/200/400 monedas con Merma 1
BASE_TRABAJO = {0: 3, 1: 3, 2: 4, 3: 5, 4: 6}
NOCHES_POR_NIVEL = 10           # durante la historia
NOCHES_POR_NIVEL_FINAL = 30     # después de la misión 15

def precio(c, L): return COMPRA[c][L]
def venta(f, L): return VENTA[f][L]
def tierra(n, L): return int(round(TIERRAS[n] * FACTOR_TIERRA[L]))
def pago_trabajo(aciertos, L, molino_etapa=0):
    return BASE_TRABAJO[L] + aciertos + (2 if aciertos == 6 else 0) + (1 if molino_etapa >= 2 else 0)

def suerte(cultivo, regada, r):
    """Frutos de una cosecha. El rábano es seguro; la calabaza rinde más pero puede salir floja."""
    if cultivo == "rabano":
        return 3 if (regada and r < 0.30) else 2
    if regada:   # calabaza regada: 15 % floja, 25 % buena
        return 2 if r < 0.15 else (5 if r < 0.40 else 3)
    return 2 if r < 0.35 else (5 if r < 0.40 else 3)   # sin regar: 35 % floja, 5 % buena

# ---------------------------------------------------------------------------
# Calendario. La historia tiene unas 30 noches; tras abrirse el huerto (fin de la
# misión 2, con tiempo = 5) quedan unas 25, repartidas en 4 días. Cada día hay
# 2 siestas y, desde el día 2, la noche de vuelta. La misión 15 se gana al final del día 4.
# ---------------------------------------------------------------------------
NOCHES_MISION = {1: 4, 2: 7, 3: 7, 4: 7}
DIA_FINAL = 4
def noches_del_dia(d, siestas=True, historia=True):
    return (0 if d == 1 else 1) + (2 if siestas else 0) + (NOCHES_MISION.get(d, 0) if historia else 0)
def bancales_gratis(d): return 8                 # 4 al ganar la 2 + 4 al ganar la 3 (día 1)
def tierras_abiertas(d): return 8 if d >= 2 else 4   # las 4 del Valle al ganar la 5 (día 2)
def hoyos(d): return 3 if d >= 2 else 0

class Jugador:
    def __init__(s, nombre, rng, monedas=20):
        s.nombre, s.rng = nombre, rng
        s.monedas = monedas
        s.tiempo = 5; s.merma = 1; s.merma_desde = 1; s.final = False
        s.bolsa = {"rabano": 2, "calabaza": 0, "manzano": 0, "abono": 0}  # regalo de la presentación
        s.cesta = []            # lotes: [fruto, n, noches_en_cesta]
        s.compost = 0
        s.plantas = []          # dicts: cultivo, edad, abono, regada, manzanas
        s.tierras = 0; s.ladrillos = 0; s.etapa = 0
        s.regadera = True
        s.dia = 1; s.dia_trabajo = 0
        s.ingresos_dia = 0; s.max_ingresos_dia = 0
        s.atascos = 0; s.regalos = 0; s.caducados = 0
        s.ultima_compra_util = 0   # último día en que compró tierra, plantón o ladrillos
        s.toques = 0
    # --- utilidades
    def L(s): return s.merma
    def n_cesta(s, f): return sum(l[1] for l in s.cesta if l[0] == f)
    def sacar_cesta(s, f, n):   # saca primero lo más viejo
        for l in sorted([l for l in s.cesta if l[0] == f], key=lambda l: -l[2]):
            k = min(n, l[1]); l[1] -= k; n -= k
            if n == 0: break
        s.cesta = [l for l in s.cesta if l[1] > 0]
    def a_cesta(s, f, n):
        if n > 0: s.cesta.append([f, n, 0])
    def ganar(s, n): s.monedas += n; s.ingresos_dia += n
    def gastar(s, n): assert s.monedas >= n, (s.monedas, n); s.monedas -= n
    def huecos(s, d, arbol=False):
        cap = hoyos(d) if arbol else bancales_gratis(d) + s.tierras
        return cap - sum(1 for p in s.plantas if (p["cultivo"] == "manzano") == arbol)
    # --- el tiempo
    def noche(s, de_mision=False):
        s.tiempo += 1
        for p in s.plantas:
            p["edad"] += 1
            if p["cultivo"] == "manzano" and p["edad"] > CULTIVOS["manzano"]["noches"]:
                n = 2 + (2 if p["abono"] else 0); p["abono"] = False
                p["manzanas"] = min(TOPE_ARBOL, p["manzanas"] + n)
        for l in s.cesta: l[2] += 1
        pasados = sum(l[1] for l in s.cesta if l[0] in CADUCA and l[2] > CADUCA[l[0]])
        s.cesta = [l for l in s.cesta if not (l[0] in CADUCA and l[2] > CADUCA[l[0]])]
        s.caducados += pasados; s.compost += pasados
        s.bolsa["abono"] += s.compost // 3; s.compost %= 3
        limite = NOCHES_POR_NIVEL_FINAL if s.final else NOCHES_POR_NIVEL
        tope = 4 if s.final else 3
        if s.merma < tope and s.tiempo - s.merma_desde >= limite:
            s.merma += 1; s.merma_desde = s.tiempo
    def ganar_final(s):   # misión 15: la máquina se apaga, los precios bajan un nivel
        s.final = True; s.merma = max(1, s.merma - 1); s.merma_desde = s.tiempo
    # --- acciones
    def cosechar(s):
        """Cosecha todo lo listo y replanta solo (mismo cultivo, 1 fruto de su cosecha)."""
        s.toques += 1
        for p in list(s.plantas):
            if p["cultivo"] == "manzano":
                s.a_cesta("manzana", p["manzanas"]); p["manzanas"] = 0; continue
            if p["edad"] >= CULTIVOS[p["cultivo"]]["noches"]:
                n = suerte(p["cultivo"], p["regada"], s.rng.random()) + (2 if p["abono"] else 0)
                p.update(edad=0, abono=False, regada=False)   # replantado con 1 fruto
                s.a_cesta(p["cultivo"], n - 1)
    def plantar(s, cultivo, abono=False):
        if s.bolsa[cultivo] > 0: s.bolsa[cultivo] -= 1
        else: s.sacar_cesta(CULTIVOS[cultivo]["fruto"], 1)
        if abono: s.bolsa["abono"] -= 1
        s.plantas.append(dict(cultivo=cultivo, edad=0, abono=abono, regada=False, manzanas=0))
        s.toques += 1
    def regar(s):
        if s.regadera:
            for p in s.plantas: p["regada"] = True
            s.toques += 2     # dos filas, un gesto por fila
    def vender(s, f, n):
        n = min(n, s.n_cesta(f))
        if n > 0: s.sacar_cesta(f, n); s.ganar(n * venta(f, s.L()))
    def vender_todo(s, guardar=None):
        guardar = guardar or {}
        for f in ("rabano", "calabaza", "manzana"):
            s.vender(f, s.n_cesta(f) - guardar.get(f, 0))
        s.toques += 3          # ir a Tasador, «Vender todo», cerrar
    def encargo(s):
        """Encargo del día (uno al día): 3 frutos de lo que haya, a 1,5 veces el precio."""
        if getattr(s, "_encargo", 0) == s.dia: return
        for f in ("calabaza", "rabano", "manzana"):
            if s.n_cesta(f) >= 3:
                s.sacar_cesta(f, 3); s.ganar(math.ceil(1.5 * 3 * venta(f, s.L()))); s._encargo = s.dia; return
    def trabajar(s, aciertos):
        if s.dia_trabajo == s.dia: return     # una vez por día real fuera del guion
        s.dia_trabajo = s.dia; s.ganar(pago_trabajo(aciertos, s.L(), s.etapa))
    def aportar_molino(s, reserva):
        L = s.L()
        while s.etapa < 4 and s.monedas >= precio("ladrillo", L) + reserva:
            s.gastar(precio("ladrillo", L)); s.ladrillos += 1; s.ultima_compra_util = s.dia
            if s.ladrillos >= sum(LADRILLOS_ETAPA[:s.etapa + 1]): s.etapa += 1
    def puede_jugar(s):
        return (bool(s.plantas) or any(s.bolsa[c] for c in CULTIVOS) or s.n_cesta("rabano") or s.n_cesta("calabaza")
                or s.monedas >= precio("rabano", s.L()))
    def red_seguridad(s):
        if not s.puede_jugar(): s.bolsa["rabano"] += 1; s.regalos += 1

# ---------------------------------------------------------------------------
# Formas de jugar
# ---------------------------------------------------------------------------
def rellenar_rabanos(j, d):
    while j.huecos(d) > 0 and (j.bolsa["rabano"] > 0 or j.n_cesta("rabano") > 0 or j.monedas >= precio("rabano", j.L())):
        if j.bolsa["rabano"] == 0 and j.n_cesta("rabano") == 0:
            j.gastar(precio("rabano", j.L())); j.bolsa["rabano"] += 1
        j.plantar("rabano")

def turno_hucha(j, d):          # trabaja cada día y lo guarda todo
    j.trabajar(4)
def turno_vende(j, d):          # rábanos; vende todo lo cosechado (también la semilla del replantado) y recompra
    j.cosechar()
    for p in list(j.plantas):   # no replanta: arranca lo replantado y lo vende
        if p["edad"] == 0: j.plantas.remove(p); j.a_cesta("rabano", 1)
    j.vender_todo(); rellenar_rabanos(j, d); j.trabajar(4)
def turno_replanta(j, d, molino=True, abono=False, aciertos=4):
    L = j.L()
    j.cosechar(); j.regar()
    j.encargo(); j.vender_todo()
    while j.huecos(d, arbol=True) > 0 and (j.bolsa["manzano"] > 0 or j.monedas >= precio("manzano", L) + 5):
        if j.bolsa["manzano"] == 0: j.gastar(precio("manzano", L)); j.bolsa["manzano"] += 1; j.ultima_compra_util = d
        j.plantar("manzano")
    while j.tierras < tierras_abiertas(d) and j.monedas >= tierra(j.tierras, L) + 5:
        j.gastar(tierra(j.tierras, L)); j.tierras += 1; j.ultima_compra_util = d
    while j.huecos(d) > 0 and j.monedas >= precio("calabaza", L) + 5:
        ab = abono and j.monedas >= precio("calabaza", L) + precio("abono", L) + 5
        j.gastar(precio("calabaza", L)); j.bolsa["calabaza"] += 1
        if ab: j.gastar(precio("abono", L)); j.bolsa["abono"] += 1
        j.plantar("calabaza", abono=ab)
    rellenar_rabanos(j, d)
    if molino and j.tierras >= tierras_abiertas(d) and j.huecos(d, arbol=True) == 0:
        j.aportar_molino(reserva=20)
    j.trabajar(aciertos)
def turno_despistado(j, d):     # no trabaja ni riega ni duerme siestas; vende y planta lo que puede
    j.regadera = False
    j.cosechar(); j.vender_todo(); rellenar_rabanos(j, d)
def turno_acapara(j, d):        # replanta e invierte, pero guarda los frutos esperando a que Merma suba
    j.cosechar(); j.regar()
    if j.L() < 3 and not j.final and j.monedas > 10: pass
    else: j.vender_todo()
    rellenar_rabanos(j, d); j.trabajar(4)
def turno_maximo(j, d):
    turno_replanta(j, d, molino=True, abono=True, aciertos=6)

FORMAS = [("Hucha (trabaja y guarda)", turno_hucha, True),
          ("Vende todo (no replanta)", turno_vende, True),
          ("Replanta e invierte", turno_replanta, True),
          ("Acapara frutos para Merma", turno_acapara, True),
          ("Despistado (sin siestas)", turno_despistado, False),
          ("Máximo posible (cota)", turno_maximo, True)]

def patrimonio(j):
    """Monedas + cesta, bolsa y plantas a precio de hoy + tierras + ladrillos puestos (no pierden valor)."""
    L = j.L()
    v = j.monedas + sum(n * venta(f, L) for f, n, _ in j.cesta)
    v += sum(precio(p["cultivo"], L) for p in j.plantas) + sum(j.bolsa[c] * precio(c, L) for c in j.bolsa)
    v += sum(tierra(i, L) for i in range(j.tierras)) + j.ladrillos * precio("ladrillo", L)
    return v

def jugar(nombre, turno, siestas, semilla):
    j = Jugador(nombre, random.Random(semilla))
    filas = []
    for d in range(1, 11):
        j.dia = d; j.ingresos_dia = 0; j.toques = 0
        n = noches_del_dia(d, siestas=siestas)
        for _ in range(n):
            if not j.puede_jugar(): j.atascos += 1
            j.red_seguridad()
            turno(j, d)
            j.noche()
        if d == DIA_FINAL: j.ganar_final()
        j.max_ingresos_dia = max(j.max_ingresos_dia, j.ingresos_dia)
        filas.append(dict(dia=d, monedas=j.monedas, valor=patrimonio(j), merma=j.L(), etapa=j.etapa,
                          toques=j.toques / max(1, n)))
    return j, filas

if __name__ == "__main__":
    semillas = [int(sys.argv[1])] if len(sys.argv) > 1 else list(range(1, 8))
    dias = [1, 2, 4, 6, 8, 10]
    res = {}
    for nombre, turno, siestas in FORMAS:
        res[nombre] = [jugar(nombre, turno, siestas, s) for s in semillas]
    def media(nombre, d, k):
        return sum(f[d - 1][k] for _, f in res[nombre]) / len(semillas)
    print(f"Semillas: {semillas}. Patrimonio y, entre paréntesis, monedas en mano (media).\n")
    print("| Forma de jugar | " + " | ".join(f"día {d}" for d in dias) + " | máx. monedas en mano | máx. ganadas en un día |")
    print("|---|" + "---|" * (len(dias) + 2))
    for nombre in res:
        celdas = [f"{media(nombre, d, 'valor'):.0f} ({media(nombre, d, 'monedas'):.0f})" for d in dias]
        mx_mano = max(max(f["monedas"] for f in fs) for _, fs in res[nombre])
        mx_dia = max(j.max_ingresos_dia for j, _ in res[nombre])
        print(f"| {nombre} | " + " | ".join(celdas) + f" | {mx_mano} | {mx_dia} |")
    j0, f0 = res["Replanta e invierte"][0]
    print("\nMerma al final de cada día:", [f["merma"] for f in f0])
    print("Etapa del molino al final de cada día (replanta e invierte, 1.ª semilla):", [f["etapa"] for f in f0])
    ult = [j.ultima_compra_util for j, _ in res["Replanta e invierte"]]
    print("Último día con una compra útil (tierra, plantón o ladrillos):", ult)
    print("Toques por noche con el huerto lleno (días 6-10, replanta e invierte):",
          round(sum(f["toques"] for f in f0[5:]) / 5, 1))
    jh, fh = res["Hucha (trabaja y guarda)"][0]
    m = fh[0]["monedas"]
    print(f"Hucha: las {m} monedas guardadas el día 1 compran {m // precio('rabano', 1)} semillas de rábano con Merma 1, "
          f"{m // precio('rabano', 2)} con Merma 2 y {m // precio('rabano', 3)} con Merma 3.")
    print("Frutos que acabaron en la compostera (acapara, media):",
          round(sum(j.caducados for j, _ in res["Acapara frutos para Merma"]) / len(semillas)))

    # ---- Comprobaciones
    v10 = {n: media(n, 10, "valor") for n in res}
    assert v10["Replanta e invierte"] > v10["Vende todo (no replanta)"] > v10["Hucha (trabaja y guarda)"], v10
    assert v10["Replanta e invierte"] > v10["Acapara frutos para Merma"], v10
    # Quien invierte nunca tiene más de 350 monedas en la mano: siempre hay en qué usarlas.
    # (Quien no invierte acumula monedas quietas: es su decisión, y Merma les quita brillo.)
    for n in ("Replanta e invierte", "Máximo posible (cota)", "Vende todo (no replanta)", "Hucha (trabaja y guarda)"):
        assert max(max(f["monedas"] for f in fs) for _, fs in res[n]) < 350, n
    assert min(ult) >= 8, ult
    assert all(j.atascos == 0 for rs in res.values() for j, _ in rs)
    pobre = Jugador("sin nada", random.Random(0), monedas=0); pobre.bolsa["rabano"] = 0
    assert not pobre.puede_jugar(); pobre.red_seguridad(); assert pobre.puede_jugar()
    tope = max(j.max_ingresos_dia for rs in res.values() for j, _ in rs)
    print(f"\nComprobaciones superadas. Tope de monedas ganadas en un día (todas las formas): {tope}")
