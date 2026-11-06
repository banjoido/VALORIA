// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import React, { useSyncExternalStore } from 'react';
import { Capa, Dialogo, Marcador, Navegacion, Noche, PanelMision } from './componentes';
import { suscribirVista, vista } from './controlador';

export function App() {
  return useSyncExternalStore(suscribirVista, () => vista), React.createElement("div", {
    className: "ui"
  }, React.createElement(Marcador, null), React.createElement(PanelMision, null), React.createElement(Dialogo, null), React.createElement(Navegacion, null), React.createElement(Capa, null), React.createElement(Noche, null));
}
