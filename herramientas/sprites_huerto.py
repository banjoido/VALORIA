"""Sprites del huerto del sprint 3 (tarea B): calabaza, cartel de venta, molino por etapas
y dos iconos (manzana y ladrillo). Pixel art píxel a píxel con Pillow.

Guía de arte: contorno #2b2230 (se añade al final alrededor de cada forma), luz desde
arriba a la izquierda, dos o tres tonos planos, sin degradados.

Uso: python3 herramientas/sprites_huerto.py   (escribe en juego/src/recursos/sprites/)
"""
import math, pathlib
from PIL import Image

DEST = pathlib.Path(__file__).resolve().parent.parent / 'juego/src/recursos/sprites'
K = (0x2b, 0x22, 0x30, 255)
def c(h): return (int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16), 255)

# Paleta
CAL, CAL_O, CAL_L = c('#e07b39'), c('#b8562a'), c('#f2a65a')
HOJA, HOJA_O, HOJA_L = c('#7cc05a'), c('#4f8a2f'), c('#9ad86f')
TIERRA, TIERRA_O = c('#8a5a3b'), c('#6e4329')
MAD, MAD_O, MAD_L = c('#a86d45'), c('#7a4524'), c('#c98a55')
ORO, ORO_O, ORO_L = c('#f6c945'), c('#d79a2b'), c('#fff1a8')
PIEDRA, PIEDRA_O, PIEDRA_L = c('#c9bda7'), c('#a89c88'), c('#e9dcc0')
LAD, LAD_O, LAD_L = c('#c4553a'), c('#93402c'), c('#e07a55')
TEJA, TEJA_O, TEJA_L = c('#d9543f'), c('#a63a2a'), c('#ef7a5f')
TELA, TELA_O = c('#fdf3d8'), c('#e9dcc0')
AGUA = c('#4ba3d8')
MANZ, MANZ_O, MANZ_L = c('#e0503c'), c('#b83a2a'), c('#ffb3a3')


class Lienzo:
    def __init__(self, w, h):
        self.im = Image.new('RGBA', (w, h), (0, 0, 0, 0)); self.w, self.h = w, h
    def p(self, x, y, col):
        if 0 <= x < self.w and 0 <= y < self.h: self.im.putpixel((x, y), col)
    def rect(self, x0, y0, x1, y1, col):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1): self.p(x, y, col)
    def elipse(self, cx, cy, rx, ry, col, luz=None, sombra=None):
        for y in range(int(cy - ry) - 1, int(cy + ry) + 2):
            for x in range(int(cx - rx) - 1, int(cx + rx) + 2):
                dx, dy = (x + .5 - cx) / rx, (y + .5 - cy) / ry
                if dx * dx + dy * dy <= 1:
                    col2 = col
                    if sombra and dx + dy > .55: col2 = sombra
                    if luz and dx < -.25 and dy < -.2 and dx * dx + dy * dy > .25: col2 = luz
                    self.p(x, y, col2)
    def contorno(self):
        src = self.im.copy(); px = src.load()
        for y in range(self.h):
            for x in range(self.w):
                if px[x, y][3]: continue
                if any(0 <= x + a < self.w and 0 <= y + b < self.h and px[x + a, y + b][3] and px[x + a, y + b] != K
                       for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    self.im.putpixel((x, y), K)
        return self
    def guardar(self, nombre):
        self.im.save(DEST / f'{nombre}.png'); return self


def calabaza_lista():
    L = Lienzo(13, 13)
    L.rect(2, 10, 10, 10, TIERRA_O)                     # tierra, como los brotes
    L.elipse(6.5, 7.5, 4.6, 2.9, CAL, CAL_L, CAL_O)      # la calabaza
    for x in (4, 6, 8): L.rect(x, 6, x, 9, CAL_O)        # gajos
    L.p(4, 6, CAL); L.p(8, 6, CAL)
    L.rect(6, 3, 6, 4, MAD_O); L.p(7, 3, MAD_O)           # rabito
    L.rect(8, 2, 10, 3, HOJA); L.p(10, 2, HOJA_L); L.p(9, 3, HOJA_O)  # hoja
    L.contorno()
    for x in range(2, 11): L.p(x, 10, TIERRA_O)          # la tierra sin contorno debajo
    return L.guardar('calabaza_lista')


def moneda(L, cx, cy):
    L.rect(cx - 1, cy - 2, cx + 1, cy + 2, ORO); L.rect(cx - 2, cy - 1, cx + 2, cy + 1, ORO)
    L.p(cx - 1, cy - 1, ORO_L); L.p(cx + 1, cy + 1, ORO_O); L.p(cx + 2, cy, ORO_O); L.p(cx, cy + 2, ORO_O)


def cartel_venta():
    L = Lienzo(13, 13)
    L.rect(6, 7, 6, 11, MAD_O)                         # palo
    L.rect(2, 1, 10, 7, MAD); L.rect(2, 1, 10, 1, MAD_L); L.rect(2, 7, 10, 7, MAD_O)  # tabla
    moneda(L, 6, 4)
    return L.contorno().guardar('cartel_venta')


def manzana():
    L = Lienzo(11, 11)
    L.elipse(5.5, 6.5, 4, 3.6, MANZ, MANZ_L, MANZ_O)
    L.p(5, 2, MAD_O); L.p(5, 1, MAD_O); L.rect(6, 1, 7, 2, HOJA); L.p(7, 1, HOJA_L)
    return L.contorno().guardar('manzana')


def ladrillo_icono():
    L = Lienzo(12, 8)
    L.rect(1, 2, 10, 6, LAD); L.rect(1, 2, 10, 2, LAD_L); L.rect(1, 6, 10, 6, LAD_O); L.rect(10, 2, 10, 6, LAD_O)
    return L.contorno().guardar('ladrillo')


# --- Molino (39 × 39, el pie abajo; ocupa 3 × 3 losetas)
CX = 19   # centro de la torre

def solar(L):
    # tierra removida y piedras
    L.rect(6, 32, 32, 37, TIERRA); L.rect(5, 33, 33, 36, TIERRA)
    for (x, y) in ((11, 33), (16, 35), (24, 34), (30, 36), (7, 36)): L.rect(x, y, x + 1, y, TIERRA_O)
    for (x, y) in ((8, 34), (27, 33), (21, 36)):
        L.rect(x, y, x + 2, y + 1, PIEDRA); L.p(x, y, PIEDRA_L)

def cartel_obra(L, x0=3, y0=18):
    L.rect(x0 + 5, y0 + 8, x0 + 5, y0 + 16, MAD_O)
    L.rect(x0, y0, x0 + 10, y0 + 8, MAD); L.rect(x0, y0, x0 + 10, y0, MAD_L); L.rect(x0, y0 + 8, x0 + 10, y0 + 8, MAD_O)
    # un ladrillo dibujado en el cartel
    L.rect(x0 + 2, y0 + 3, x0 + 8, y0 + 5, LAD); L.rect(x0 + 2, y0 + 3, x0 + 8, y0 + 3, LAD_L)

def cimientos(L, alto):
    # hiladas de piedra desde abajo (y = 37) hacia arriba, `alto` filas
    top = 37 - alto
    L.rect(8, top, 30, 37, PIEDRA)
    for y in range(top, 38):
        fila = (37 - y) // 3
        if (37 - y) % 3 == 2: L.rect(8, y, 30, y, PIEDRA_O)
        for x in range(8 + (fila % 2) * 3, 31, 6): L.p(x, y, PIEDRA_O)
    L.rect(8, top, 30, top, PIEDRA_L)

def muros(L):
    # torre de ladrillo, más estrecha arriba
    for y in range(12, 31):
        m = (30 - y) // 6
        x0, x1 = 9 + m, 29 - m
        L.rect(x0, y, x1, y, LAD)
        if (y - 12) % 3 == 2: L.rect(x0, y, x1, y, LAD_O)
        else:
            for x in range(x0 + ((y - 12) // 3 % 2) * 2, x1 + 1, 5): L.p(x, y, LAD_O)
        L.p(x0, y, LAD_L); L.p(x0 + 1, y, LAD_L)
    cimientos(L, 7)
    # puerta
    L.rect(16, 28, 22, 37, MAD_O); L.rect(17, 29, 21, 37, MAD); L.p(20, 33, ORO)
    L.rect(16, 27, 22, 27, PIEDRA_L)

def tejado(L):
    for y in range(1, 13):
        half = 2 + y
        L.rect(CX - half, y, CX + half, y, TEJA)
        L.p(CX - half, y, TEJA_L)
        if y % 3 == 0: L.rect(CX - half + 1, y, CX + half, y, TEJA_O)
        L.p(CX + half, y, TEJA_O)
    # ventana del desván
    L.rect(17, 6, 21, 10, MAD_O); L.rect(18, 7, 20, 10, ORO_L); L.p(19, 7, ORO)

def rueda(L, girada=False):
    cx, cy, r = 32, 27, 6.4
    for y in range(20, 35):
        for x in range(25, 39):
            d = math.hypot(x + .5 - cx, y + .5 - cy)
            if d <= r: L.p(x, y, MAD_O if d > r - 1.3 else MAD)
    L.p(cx - 3, cy - 4, MAD_L); L.p(cx - 4, cy - 3, MAD_L)
    for t in range(-5, 6):
        if girada: L.p(cx + t * 7 // 10, cy + t * 7 // 10, MAD_L); L.p(cx + t * 7 // 10, cy - t * 7 // 10, MAD_L)
        else: L.p(cx + t, cy, MAD_L); L.p(cx, cy + t, MAD_L)
    L.p(cx, cy, ORO)

def agua(L):
    L.rect(26, 35, 38, 37, AGUA); L.rect(27, 35, 29, 35, TELA)

def aspas(L, girada=False):
    cx, cy = CX, 9
    ang = [45, 135, 225, 315] if not girada else [0, 90, 180, 270]
    for a in ang:
        dx, dy = math.cos(math.radians(a)), math.sin(math.radians(a))
        px_, py_ = -dy, dx
        for s in range(2, 15):
            x, y = cx + dx * s, cy + dy * s
            L.p(round(x), round(y), MAD_O)
            if s > 4:
                for w in (1, 2, 3):
                    L.p(round(x + px_ * w), round(y + py_ * w), TELA if w < 3 else TELA_O)
    L.rect(cx - 1, cy - 1, cx + 1, cy + 1, MAD_O); L.p(cx, cy, ORO)


def molino(etapa, girada=False, nombre=None):
    L = Lienzo(39, 39)
    if etapa == 0:
        solar(L); cartel_obra(L)
    else:
        if etapa == 1: cimientos(L, 6); L.rect(16, 33, 22, 37, MAD_O)
        else: muros(L)
        if etapa >= 3: tejado(L)
        rueda(L, girada)
        if etapa >= 4: aspas(L, girada)
    L.contorno()
    if etapa >= 1: agua(L)
    return L.guardar(nombre or f'molino_{etapa}')


def rueda_b():
    # Segundo fotograma de la rueda: solo la rueda girada, para dibujar encima del molino.
    L = Lienzo(39, 39); rueda(L, True); return L.contorno().guardar('molino_rueda_b')


def planton():
    # Icono del plantón: el arbolito de arbol_1, recortado.
    Image.open(DEST / 'arbol_1.png').convert('RGBA').crop((9, 22, 18, 34)).save(DEST / 'planton.png')


if __name__ == '__main__':
    planton(); calabaza_lista(); cartel_venta(); manzana(); ladrillo_icono()
    for e in range(5): molino(e)
    rueda_b(); molino(4, True, 'molino_aspas_b')
    print('Sprites escritos en', DEST)
