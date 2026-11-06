"""Genera los sprites de la heroína a partir de los del héroe (píxel a píxel).

Uso: python3 herramientas/heroina.py   (desde la raíz del repositorio)
Mismo tamaño (16x22), mismo contorno #2b2230, mismos 4 fotogramas que el héroe:
heroina, heroina_paso, heroina_gorro, heroina_gorro_paso.
"""
import pathlib, sys
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
SPR = RAIZ / "juego/src/recursos/sprites"

# Colores del héroe -> colores de la heroína
CAMBIOS = {
    (0x6b, 0x3e, 0x26): (0x7a, 0x34, 0x24),  # pelo (base)    -> castaño rojizo
    (0x8a, 0x55, 0x36): (0xa8, 0x50, 0x2f),  # pelo (luz)
    (0xd9, 0x54, 0x3f): (0x2f, 0x9e, 0x9a),  # túnica roja    -> túnica turquesa
    (0xb0, 0x40, 0x2f): (0x23, 0x74, 0x6f),  # túnica (sombra)
}
# Botas: el héroe las pinta con el mismo marrón que el pelo; se conservan.
BOTAS = (0x6b, 0x3e, 0x26)

PAL = {
    "A": (0x2b, 0x22, 0x30), "B": (0x7a, 0x34, 0x24), "C": (0xa8, 0x50, 0x2f),
    "D": (0xf2, 0xc7, 0x9b), "E": (0xd9, 0xa7, 0x7a), "K": (0xf2, 0xc1, 0x4e),
}
# Cabeza (filas 0-11): flequillo de lado y dos coletas con lazo dorado.
CABEZA = [
    "......AAAA......",
    "....AABBBBAA....",
    "...ABBCCBBBBA...",
    "..ABCCBBBBBBBA..",
    "..ABBBBBBBBBBA..",
    ".AABDDBBBBBBBAA.",
    "AKKBDDDDDDDDBKKA",
    "ABCDDADDDDADDCBA",
    "ACBEDDDDDDDDEBCA",
    "ABBADDDAADDDABBA",
    "ACBAAAAAAAAAABCA",
    ".AAAKKKKKKKKAAA.",
]


def heroina(origen, gorro):
    im = Image.open(SPR / origen).convert("RGBA")
    px = im.load()
    out = Image.new("RGBA", im.size, (0, 0, 0, 0))
    po = out.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            c = (r, g, b)
            if y >= 11:
                if c in CAMBIOS and not (c == BOTAS and y >= 19):
                    c = CAMBIOS[c]
            po[x, y] = (*c, 255)
    for y, fila in enumerate(CABEZA):
        # Con gorro, las tres primeras filas son las del gorro del héroe.
        if gorro and y < 3:
            continue
        for x, k in enumerate(fila):
            po[x, y] = (*PAL[k], 255) if k != "." else (0, 0, 0, 0)
    return out


for origen, destino, gorro in [
    ("heroe.png", "heroina.png", False),
    ("heroe_paso.png", "heroina_paso.png", False),
    ("heroe_gorro.png", "heroina_gorro.png", True),
    ("heroe_gorro_paso.png", "heroina_gorro_paso.png", True),
]:
    heroina(origen, gorro).save(SPR / destino)
    print("ok", destino)
