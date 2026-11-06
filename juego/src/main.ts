// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './estilos.css';
import './util/clases';
import './estado';
import './mundo/mapas';
import './recursos/sprites';
import './recursos/sonidos';
import './ajustes';
import './mundo/zonas';
import './mundo/mundo';
import './personajes';
import './audio';
import './ui/controlador';
import './ui/componentes';
import './ui/capas';
import './ui/minijuegos';
import './ui/App';
import './misiones/base';
import './misiones/m01';
import './misiones/m02';
import './misiones/m03';
import './misiones/m04';
import './misiones/m05';
import './misiones/m06';
import './misiones/m07';
import './misiones/m08';
import './misiones/m09';
import './misiones/m10';
import './misiones/m11';
import './misiones/m12';
import './misiones/m13';
import './misiones/m14';
import './misiones/m15';
import './textos/m01';
import './textos/m02';
import './textos/m03';
import './textos/m04';
import './textos/m05';
import './textos/m06';
import './textos/m07';
import './textos/m08';
import './textos/m09';
import './textos/m10';
import './textos/m11';
import './textos/m12';
import './textos/m13';
import './textos/m14';
import './textos/m15';
import { ajustes } from './ajustes';
import { estado } from './estado';
import { Mision01 } from './misiones/m01';
import { Mision02 } from './misiones/m02';
import { Mision03 } from './misiones/m03';
import { Mision04 } from './misiones/m04';
import { Mision05 } from './misiones/m05';
import { Mision06 } from './misiones/m06';
import { Mision07 } from './misiones/m07';
import { Mision08 } from './misiones/m08';
import { Mision09 } from './misiones/m09';
import { Mision10 } from './misiones/m10';
import { Mision11 } from './misiones/m11';
import { Mision12 } from './misiones/m12';
import { Mision13 } from './misiones/m13';
import { Mision14 } from './misiones/m14';
import { Mision15 } from './misiones/m15';
import { Mapa } from './mundo/mapas';
import { Mundo, cargarSprites } from './mundo/mundo';
import { DATOS_M01 } from './textos/m01';
import { DATOS_M02 } from './textos/m02';
import { DATOS_M03 } from './textos/m03';
import { DATOS_M04 } from './textos/m04';
import { DATOS_M05 } from './textos/m05';
import { DATOS_M06 } from './textos/m06';
import { DATOS_M07 } from './textos/m07';
import { DATOS_M08 } from './textos/m08';
import { DATOS_M09 } from './textos/m09';
import { DATOS_M10 } from './textos/m10';
import { DATOS_M11 } from './textos/m11';
import { DATOS_M12 } from './textos/m12';
import { DATOS_M13 } from './textos/m13';
import { DATOS_M14 } from './textos/m14';
import { DATOS_M15 } from './textos/m15';
import { App } from './ui/App';
import { SND_fallo } from './ui/controlador';

const MISIONES = [null, [Mision01, DATOS_M01], [Mision02, DATOS_M02], [Mision03, DATOS_M03], [Mision04, DATOS_M04], [Mision05, DATOS_M05], [Mision06, DATOS_M06], [Mision07, DATOS_M07], [Mision08, DATOS_M08], [Mision09, DATOS_M09], [Mision10, DATOS_M10], [Mision11, DATOS_M11], [Mision12, DATOS_M12], [Mision13, DATOS_M13], [Mision14, DATOS_M14], [Mision15, DATOS_M15]];

const TOTAL_MISIONES = 15;

const NOMBRES_ZONA = {
  mercado: "Mercado del Pueblo",
  valle: "Valle de la Nieve",
  ciudad: "Ciudad de las Empresas",
  torre: "Torre del Rev\xE9s",
  reloj: "Gran Reloj"
};

async function arrancar() {
  await cargarSprites();
  let i = new Mundo(document.getElementById("mundo"));
  i.ui = SND_fallo, window.valoria = {
    Estado: estado,
    mundo: i,
    ui: SND_fallo,
    ajustes: ajustes,
    Mapa: Mapa
  }, ReactDOM.createRoot(document.getElementById("ui")).render(React.createElement(App, null)), addEventListener("keydown", s => {
    let r = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      w: [0, -1],
      s: [0, 1],
      a: [-1, 0],
      d: [1, 0]
    }[s.key];
    if (r && !estado.ocupado) {
      let l = i.celda_heroe();
      i.ir({
        x: l.x + r[0],
        y: l.y + r[1]
      }), s.preventDefault();
    } else (s.key === "Enter" || s.key === " ") && SND_fallo.vista.dialogo && !SND_fallo.vista.capa && (SND_fallo.avanzar(), s.preventDefault());
  });
  // En el móvil, cerrar el juego suele ser mandarlo a segundo plano.
  document.addEventListener("visibilitychange", () => {
    document.visibilityState === "hidden" && estado.guardar_al_salir();
  }), addEventListener("pagehide", () => estado.guardar_al_salir());
  let a = estado.cargar();
  (await SND_fallo.pantalla_titulo(a, estado.mision)) !== "continuar" && (estado.reiniciar(), estado.borrar_partida()), i.restaurar(estado.mision), SND_fallo.textos_carta = DATOS_M01.textos.carta;
  let t = !1;
  for (; estado.mision <= TOTAL_MISIONES;) {
    t = !0, estado.guardar();
    let [s, r] = MISIONES[estado.mision];
    await new s(estado.mision, r).jugar(i, SND_fallo), estado.mision += 1;
  }
  estado.guardar(), estado.maquina_apagada && (SND_fallo.textos_carta = DATOS_M01.textos.carta + `

` + DATOS_M15.textos.carta_final), t || (await SND_fallo.decir([["chispin", "\xA1Hola otra vez! Todo Valoria sigue brillando."]])), estado.paso = "libre", estado.ocupado = !1, SND_fallo.poner_mision(NOMBRES_ZONA[estado.zona] + " \xB7 toca el mapa para viajar"), SND_fallo.viaje_pedido = async s => {
    await SND_fallo.viajar(NOMBRES_ZONA[s], "", () => {
      estado.zona = s, i.restaurar(estado.mision);
    }), estado.guardar(), estado.paso = "libre", estado.ocupado = !1, SND_fallo.poner_mision(NOMBRES_ZONA[s] + " \xB7 toca el mapa para viajar");
  };
}

arrancar();
