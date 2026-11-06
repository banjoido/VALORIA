"""Genera qa/.build/qa.html: una copia del prototipo con dos "ganchos" para que el bot
pueda leer el estado de la partida (window.__e) y el mundo (window.__mundo).
No modifica prototipo/index.html."""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
src = (ROOT / 'prototipo/index.html').read_text(encoding='utf-8')

PARCHES = [
    ('a.objetivo_fn=()=>this.objetivo()',
     'a.objetivo_fn=()=>this.objetivo(),window.__mision=this,window.__mundo=a'),
    ('this.cargar_zona("mercado",n(7,5))',
     'window.__e=e,this.cargar_zona("mercado",n(7,5))'),
]
for viejo, nuevo in PARCHES:
    if viejo not in src:
        sys.exit(f'No encuentro el punto de enganche: {viejo!r}. ¿Ha cambiado el código del juego?')
    src = src.replace(viejo, nuevo, 1)

out = ROOT / 'qa/.build/qa.html'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(src, encoding='utf-8')
print('Listo:', out)
