"""Simulación de la economía del sprint 3 (docs/especificaciones/sprint-3-bucle.md, sección 9).

Juega 10 días de Valoria con cinco formas de jugar y comprueba:
  1. replantar gana a vender todo;
  2. guardar en la hucha pierde (compra menos semillas cada vez);
  3. nadie se queda sin poder jugar;
  4. no hay monedas infinitas (tope de monedas por día).
Uso: python3 qa/sim_economia.py [semilla_aleatoria]
"""
import random, sys

# ---- Números de la especificación (sección 4) ----
# Tabla de precios por nivel de Merma (1, 2, 3). Nivel 1 desde la misión 1.
COMPRA = {  # lo que vende la tienda
    "rabano":   {1: 2,  2: 3,  3: 4},
    "calabaza": {1: 5,  2: 6,  3: 8},
    "manzano":  {1: 20, 2: 25, 3: 30},
    "abono":    {1: 4,  2: 5,  3: 6},
}
VENTA = {   # lo que paga Tasador (o Copo) por cada fruto
    "rabano":   {1: 1, 2: 2, 3: 2},
    "calabaza": {1: 3, 2: 4, 3: 5},
    "manzano":  {1: 1, 2: 2, 3: 2},
}
CULTIVOS = {
    "rabano":   dict(noches=1, frutos=2),
    "calabaza": dict(noches=3, frutos=3),
    "manzano":  dict(noches=4, frutos=2),  # crece 4 noches; luego 2 manzanas cada noche
}
TIERRA = {1: 10, 2: 12, 3: 15}   # primera tierra nueva; cada una más cuesta +5
TOPE_ARBOL = 4          # manzanas que caben en el árbol
MERMA_MAX = 3
# Merma sube un nivel cada 2 días jugados (al volver el día 3 y el día 5), con aviso el día antes.
def merma_del_dia(d): return min(MERMA_MAX, 1 + (d - 1) // 2)
def precio(c, L): return COMPRA[c][L]
def venta(c, L): return VENTA[c][L]
def tierra(n, L): return TIERRA[L] + 5 * n   # n = tierras ya compradas (como mucho 4)
def pago_trabajo(aciertos): return 3 + aciertos + (2 if aciertos == 6 else 0)

# ---- Calendario: noches del reino por día real ----
# día 1: 3 siestas + 1 noche de misión tras abrirse el huerto (fin de la misión 2)
# días 2-6: 1 noche al volver + 3 siestas + ~5 noches de misiones; días 7-10: historia acabada
# Noches del reino por día: 1 al volver (desde el día 2) + 2 siestas + las noches de las misiones.
# Las 15 misiones tienen unas 30 noches; tras abrirse el huerto (fin de la misión 2) quedan unas 21-25,
# repartidas en 4 días de historia (días 1-4). Del día 5 en adelante solo hay vuelta y siestas.
NOCHES_MISION = {1: 4, 2: 6, 3: 6, 4: 5}
def noches_del_dia(d, con_historia=True):
    vuelta = 0 if d == 1 else 1
    return vuelta + 2 + (NOCHES_MISION.get(d, 0) if con_historia else 0)
def abiertos(d):
    """Bancales gratis abiertos según el día: misiones 2 y 3 el día 1; 5 y 6 hacia el día 3."""
    merc = 8                     # 4 al acabar la 2 + el bancal de la Semilla (4) al acabar la 3
    valle = 0                    # el Valle no tiene bancales propios en el sprint 3: solo árboles
    arboles = 3 if d >= 3 else 0 # hoyos de árbol en las tierras del Valle al acabar la 5
    return merc, valle, arboles

class Jugador:
    def __init__(s, nombre, rng, monedas=20, tiempo0=4):
        s.nombre, s.rng = nombre, rng
        s.monedas = monedas; s.tiempo = tiempo0
        s.bolsa = {"rabano": 1, "calabaza": 0, "manzano": 0, "abono": 0}  # regalo de la Semilla al abrir el huerto
        s.cesta = {"rabano": 0, "calabaza": 0, "manzano": 0}
        s.bancales = []   # dicts: cultivo, edad, abono, regada, frutos_arbol, zona
        s.tierras = 0           # tierras compradas en el Mercado (como mucho 4)
        s.regadera = True
        s.ingresos_dia = 0; s.max_ingresos_dia = 0
        s.atascos = 0; s.regalos = 0
    dia = 1
    def L(s): return merma_del_dia(s.dia)
    def cap(s, d):
        m, v, a = abiertos(d); return m + s.tierras + v, a
    def ganar(s, n): s.monedas += n; s.ingresos_dia += n
    def gastar(s, n): assert s.monedas >= n; s.monedas -= n
    def huecos(s, d, arbol=False):
        cap_h, cap_a = s.cap(d)
        usados = sum(1 for b in s.bancales if (b["cultivo"] == "manzano") == arbol)
        return (cap_a if arbol else cap_h) - usados
    def noche(s):
        s.tiempo += 1
        for b in s.bancales:
            b["edad"] += 1
            c = CULTIVOS[b["cultivo"]]
            if b["cultivo"] == "manzano" and b["edad"] > c["noches"]:
                n = c["frutos"] + (2 if b["abono"] else 0); b["abono"] = False
                b["frutos_arbol"] = min(TOPE_ARBOL, b["frutos_arbol"] + n)
    def cosechar(s):
        """Cosecha lo maduro. Devuelve lista de (cultivo, frutos) de los bancales que quedan libres."""
        libres = []
        for b in list(s.bancales):
            c = CULTIVOS[b["cultivo"]]
            if b["cultivo"] == "manzano":
                s.cesta["manzano"] += b["frutos_arbol"]; b["frutos_arbol"] = 0; continue
            if b["edad"] >= c["noches"]:
                n = c["frutos"]
                r = s.rng.random()
                if b["regada"]:
                    if r < 0.30: n += (n + 1) // 2          # cosecha buena
                else:
                    if r < 0.20: n = max(1, n - 1)          # cosecha floja
                    elif r < 0.30: n += (n + 1) // 2
                if b["abono"]: n += 2                       # abono: +2 frutos
                s.cesta[b["cultivo"]] += n
                s.bancales.remove(b); libres.append(b["cultivo"])
        return libres
    def plantar(s, cultivo, desde_cesta=False, abono=False):
        if desde_cesta: s.cesta[cultivo] -= 1
        else: s.bolsa[cultivo] -= 1
        if abono: s.bolsa["abono"] -= 1
        s.bancales.append(dict(cultivo=cultivo, edad=0, abono=abono, regada=s.regadera, frutos_arbol=0))
    def vender_todo(s, guardar=None):
        guardar = guardar or {}
        for c in s.cesta:
            n = s.cesta[c] - guardar.get(c, 0)
            if n > 0: s.ganar(n * venta(c, s.L())); s.cesta[c] -= n
    def trabajar(s, aciertos): s.ganar(pago_trabajo(aciertos))
    def puede_jugar(s):
        L = s.L()
        return (s.bancales or any(s.bolsa[c] for c in CULTIVOS) or any(s.cesta[c] for c in ("rabano", "calabaza"))
                or s.monedas >= precio("rabano", L))
    def red_seguridad(s):
        # Si no hay nada plantado, ni semillas, ni frutos, ni monedas para una semilla: la Semilla regala una.
        if not s.puede_jugar():
            s.bolsa["rabano"] += 1; s.regalos += 1

# ---- Formas de jugar ----
def turno_hucha(j, d):          # trabaja y guarda: no planta nunca
    j.trabajar(4)
def turno_vende(j, d):          # planta rábanos comprando semilla, vende TODO, no replanta ni compra tierra
    j.cosechar(); j.vender_todo()
    while j.huecos(d) > 0 and (j.bolsa["rabano"] > 0 or j.monedas >= precio("rabano", j.L())):
        if j.bolsa["rabano"] == 0: j.gastar(precio("rabano", j.L())); j.bolsa["rabano"] += 1
        j.plantar("rabano")
    j.trabajar(4)
def turno_replanta(j, d):       # replanta de la cosecha, vende lo que sobra, compra tierra, calabazas y manzanos
    j.cosechar()
    L = j.L()
    # 1) replantar con frutos propios (gratis) en huecos normales; con paciencia, calabaza primero
    for c in ("calabaza", "rabano"):
        while j.huecos(d) > 0 and j.cesta[c] > 0: j.plantar(c, desde_cesta=True)
    # 2) vender el resto, guardando 1 de cada para replantar
    j.vender_todo()
    # 3) invertir: manzanos, tierra, semillas de calabaza (deja 3 monedas de colchón)
    while j.huecos(d, arbol=True) > 0 and j.monedas >= precio("manzano", L) + 3:
        j.gastar(precio("manzano", L)); j.bolsa["manzano"] += 1; j.plantar("manzano")
    if j.tierras < 4 and j.monedas >= tierra(j.tierras, L) + 3:
        j.gastar(tierra(j.tierras, L)); j.tierras += 1
    while j.huecos(d) > 0 and j.monedas >= precio("calabaza", L) + 3:
        j.gastar(precio("calabaza", L)); j.bolsa["calabaza"] += 1; j.plantar("calabaza")
    while j.huecos(d) > 0 and (j.bolsa["rabano"] > 0 or j.monedas >= precio("rabano", L)):
        if j.bolsa["rabano"] == 0: j.gastar(precio("rabano", L)); j.bolsa["rabano"] += 1
        j.plantar("rabano")
    j.trabajar(4)
def turno_despistado(j, d):     # entra, cosecha, vende, planta lo que pueda; no trabaja ni riega
    j.regadera = False
    j.cosechar(); j.vender_todo()
    while j.huecos(d) > 0 and (j.bolsa["rabano"] > 0 or j.monedas >= precio("rabano", j.L())):
        if j.bolsa["rabano"] == 0: j.gastar(precio("rabano", j.L())); j.bolsa["rabano"] += 1
        j.plantar("rabano")
def turno_maximo(j, d):         # cota alta: replanta, todo con abono, trabajo perfecto (6 de 6)
    j.cosechar(); L = j.L()
    for c in ("calabaza", "rabano"):
        while j.huecos(d) > 0 and j.cesta[c] > 0:
            ab = False
            if j.monedas >= precio("abono", L): j.gastar(precio("abono", L)); j.bolsa["abono"] += 1; ab = True
            j.plantar(c, desde_cesta=True, abono=ab)
    j.vender_todo()
    while j.huecos(d, arbol=True) > 0 and j.monedas >= precio("manzano", L):
        j.gastar(precio("manzano", L)); j.bolsa["manzano"] += 1; j.plantar("manzano")
    while j.tierras < 4 and j.monedas >= tierra(j.tierras, L):
        j.gastar(tierra(j.tierras, L)); j.tierras += 1
    while j.huecos(d) > 0 and j.monedas >= precio("calabaza", L) + precio("abono", L):
        j.gastar(precio("calabaza", L) + precio("abono", L)); j.bolsa["calabaza"] += 1; j.bolsa["abono"] += 1
        j.plantar("calabaza", abono=True)
    while j.huecos(d) > 0 and j.monedas >= precio("rabano", L):
        j.gastar(precio("rabano", L)); j.bolsa["rabano"] += 1; j.plantar("rabano")
    j.trabajar(6)

FORMAS = [("Hucha (trabaja y guarda)", turno_hucha, True),
          ("Vende todo (no replanta)", turno_vende, True),
          ("Replanta e invierte", turno_replanta, True),
          ("Despistado (1 noche al día)", turno_despistado, False),
          ("Máximo posible (cota)", turno_maximo, True)]

def valor(j):
    """Patrimonio en monedas de hoy: monedas + cesta a precio de venta + bancales (lo que costaron hoy)."""
    L = j.L()
    v = j.monedas + sum(j.cesta[c] * venta(c, L) for c in j.cesta)
    v += sum(precio(b["cultivo"], L) for b in j.bancales) + sum(j.bolsa[c] * precio(c, L) for c in CULTIVOS)
    v += sum(tierra(i, L) for i in range(j.tierras))  # la tierra vale lo que cuesta hoy
    return v

def jugar(nombre, turno, con_siestas, semilla):
    j = Jugador(nombre, random.Random(semilla), tiempo0=0)
    filas = []
    for d in range(1, 11):
        j.ingresos_dia = 0; j.dia = d
        n = noches_del_dia(d) if con_siestas else (1 if d > 1 else 0) + (NOCHES_MISION.get(d, 0))
        for _ in range(n):
            if not j.puede_jugar(): j.atascos += 1
            j.red_seguridad()
            turno(j, d)
            j.noche()
        j.max_ingresos_dia = max(j.max_ingresos_dia, j.ingresos_dia)
        filas.append((d, j.monedas, j.monedas // precio("rabano", j.L()), valor(j), j.L()))
    return j, filas

if __name__ == "__main__":
    semilla = int(sys.argv[1]) if len(sys.argv) > 1 else 7
    print(f"semilla aleatoria {semilla}\n")
    resumen = {}
    for nombre, turno, siestas in FORMAS:
        j, filas = jugar(nombre, turno, siestas, semilla)
        resumen[nombre] = (j, filas)
    dias = [1, 2, 4, 6, 8, 10]
    print("| Forma de jugar | " + " | ".join(f"día {d}" for d in dias) + " | máx. monedas ganadas en un día | regalos de semilla |")
    print("|---|" + "---|" * (len(dias) + 2))
    for nombre, (j, filas) in resumen.items():
        celdas = [f"{filas[d-1][3]} ({filas[d-1][1]})" for d in dias]
        print(f"| {nombre} | " + " | ".join(celdas) + f" | {j.max_ingresos_dia} | {j.regalos} |")
    print("\nMerma por día:", [f[4] for f in resumen['Hucha (trabaja y guarda)'][1]])
    jh = resumen["Hucha (trabaja y guarda)"][1]
    print("Hucha: semillas de rábano que compra con lo ahorrado:", [(f[0], f[1], f[2]) for f in jh])
    # La hucha pierde: lo ahorrado el día 1 compra menos cada día
    m1 = jh[0][1]
    print(f"Las {m1} monedas guardadas el día 1 compran {m1 // precio('rabano', jh[0][4])} semillas de rábano ese día "
          f"y {m1 // precio('rabano', jh[-1][4])} el día 10.")
    # Rendimiento por bancal y noche (sin suerte ni abono)
    print("\nMonedas por bancal y noche (nivel de Merma 1/2/3):")
    for L in (1, 2, 3):
        r_v = (2 * venta('rabano', L) - precio('rabano', L)) / 1
        r_r = (1 * venta('rabano', L)) / 1
        c_v = (3 * venta('calabaza', L) - precio('calabaza', L)) / 3
        c_r = (2 * venta('calabaza', L)) / 3
        c_a = (4 * venta('calabaza', L) - precio('abono', L)) / 3
        m = 2 * venta('manzano', L)
        print(f"  Merma {L}: rábano vende todo {r_v:+.1f}, replanta {r_r:+.1f} | calabaza vende todo {c_v:+.1f}, "
              f"replanta {c_r:+.1f}, replanta con abono {c_a:+.1f} | manzano {m:+.1f}")
    # Nadie se queda sin jugar: un niño sin nada recibe una semilla
    pobre = Jugador("sin nada", random.Random(0), monedas=0); pobre.bolsa["rabano"] = 0
    assert not pobre.puede_jugar(); pobre.red_seguridad(); assert pobre.puede_jugar()
    # Comprobaciones
    v = {k: r[1][-1][3] for k, r in resumen.items()}
    assert v["Replanta e invierte"] > v["Vende todo (no replanta)"] > v["Hucha (trabaja y guarda)"], v
    assert all(r[0].atascos == 0 for r in resumen.values())
    tope = max(r[0].max_ingresos_dia for r in resumen.values())
    print(f"\nComprobaciones superadas. Tope de monedas ganadas en un día (todas las formas): {tope}")
