// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M12 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 12. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_cautela: "Cautela vigila la puerta de la torre",
    puerta_1: "Abre la primera puerta",
    puerta_2: "Abre la segunda puerta",
    puerta_3: "Abre la tercera puerta",
    puerta_4: "Abre la \xFAltima puerta",
    ir_reves: "Rev\xE9s te espera al final de la torre",
    victoria: "\xA1La Torre del Rev\xE9s brilla!"
  },
  textos: {
    noche_inicio: "La torre cruje en la noche",
    lista_titulo: "Lo que puede salir mal",
    lista_1: "Que me prometan mucho, r\xE1pido y en secreto.",
    lista_2: "Deber m\xE1s de lo que puedo pagar.",
    lista_3: "Que me metan prisa para decidir.",
    lista_4: "Fiarme de lo que solo brilla por fuera.",
    lista_frase: "Si me acuerdo de todo esto, casi nada me pilla por sorpresa.",
    pregunta: "\xBFQu\xE9 te ha ayudado a cruzar la torre?",
    resp_evitar: "Pensar qu\xE9 pod\xEDa salir mal",
    resp_listo: "Ser {el} m\xE1s list{o}",
    resp_suerte: "Tener suerte",
    fb_bien: "\xA1Eso es! No hace falta ser un genio: basta con evitar los errores grandes.",
    fb_mal: "Casi. Lo que te ha salvado es pensar al rev\xE9s: qu\xE9 pod\xEDa salir mal.",
    medalla: "Medalla de Rev\xE9s",
    medalla_texto: "Piensas al rev\xE9s y evitas las trampas. \xA1Toda la Torre del Rev\xE9s vuelve a brillar!",
    icono_medalla: "medalla_reves",
    pagina_numero: "p\xE1gina 12",
    pagina: "No intentes ser {el} m\xE1s list{o}. Intenta no hacer tonter\xEDas. Gana quien menos se equivoca.",
    reto_familia: "Antes de la pr\xF3xima compra grande en casa, haced juntos la lista de lo que podr\xEDa salir mal."
  },
  puertas: [{
    titulo: "El cofre que duplica",
    icono: "cofre",
    correcta: "oler",
    opciones: [["meter", "Meter 5 monedas", "moneda"], ["oler", "Que Olfat\xEDn lo olfatee primero", "olfatin"]]
  }, {
    titulo: "El puente de una cuerda",
    icono: "cuerda",
    correcta: "repartir",
    opciones: [["una", "Pasar todo por la cuerda gorda", "cuerda"], ["repartir", "Repartir la carga en tres cuerdas", "tierras"]]
  }, {
    titulo: "La sala de las prisas",
    icono: "reloj",
    correcta: "pensar",
    opciones: [["correr", "\xA1Correr sin mirar!", "prisas"], ["pensar", "Pararme y pensar", "calmin"]]
  }, {
    titulo: "Dos puertas",
    icono: "bazar",
    correcta: "madera",
    opciones: [["dorada", "Entrar por la puerta dorada", "bazar"], ["madera", "Mirar dentro y entrar por la de madera", "lupa_icono"]]
  }],
  dialogos: {
    reves_reto: [["reves", "\xDAltima prueba, aprendiz. Tienes que cruzar mi torre."], ["reves", "Cuatro puertas, cuatro trampas. Te espero abajo del todo\u2026 \xA1o arriba, seg\xFAn se mire!"]],
    cautela_hola: [["cautela", "Alto. Soy Cautela, la guardiana de la torre."], ["cautela", "Nadie entra sin leer mi lista."]],
    cautela_abre: [["cautela", "Bien. Ahora ya sabes qu\xE9 buscar. Puedes pasar."]],
    puerta_cerrada: [["chispin", "Esta puerta a\xFAn est\xE1 cerrada. Vamos por orden."]],
    antes_1: [["chispin", "Hay un cofre con un cartel: \xABMete 5 monedas, saca 10\xBB."], ["olfatin", "Snif\u2026 Snif\u2026"]],
    bien_1: [["olfatin", "\xA1Puaj! \xA1Huele a Don Chollo! Dentro no hay nada, solo un agujero."], ["chispin", "\xA1La puerta se abre!"]],
    trampa_1: [["chispin", "\xA1El cofre se ha tragado las monedas\u2026 y ha soltado una nube de humo!"], ["reves", "\xBFQu\xE9 dec\xEDa la lista de Cautela? Vuelve a intentarlo."]],
    antes_2: [["chispin", "Hay que cruzar un foso con nuestra mochila. Una cuerda gorda\u2026 o tres finitas."]],
    bien_2: [["chispin", "\xA1Una de las cuerdas se ha roto! Pero las otras dos aguantan. \xA1Hemos cruzado!"]],
    trampa_2: [["chispin", "\xA1La cuerda gorda se ha roto y la mochila se ha ca\xEDdo al foso!"], ["reves", "Si todo cuelga de una sola cuerda\u2026 Vuelve a intentarlo."]],
    antes_3: [["prisas", "\xA1SAL YA! \xA1SAL YA O TE QUEDAS AQU\xCD DENTRO PARA SIEMPRE!"], ["chispin", "\xA1Es la voz de Prisas! \xBFQu\xE9 hacemos?"]],
    bien_3: [["calmin", "Uuh\u2026 Muy bien. Mira: el suelo de delante era una trampa. Pararse era lo listo."], ["chispin", "\xA1Y la puerta se ha abierto sola!"]],
    trampa_3: [["chispin", "\xA1Hemos corrido y nos hemos ca\xEDdo en un agujero! Menos mal que no era hondo."], ["reves", "Las prisas son las mejores amigas de las trampas. Vuelve a intentarlo."]],
    antes_4: [["chispin", "Dos puertas: una dorada y brillante, y otra de madera, con pisadas en el suelo."]],
    bien_4: [["chispin", "\xA1Detr\xE1s de la dorada solo hab\xEDa una pared pintada! La de madera era la buena."]],
    trampa_4: [["chispin", "\xA1Pum! \xA1La puerta dorada estaba pintada en la pared!"], ["reves", "\xBFY si miras dentro antes? Vuelve a intentarlo."]],
    reves_final: [["reves", "\xA1Has llegado! Has esquivado todas las trampas."], ["reves", "\xBFSabes cu\xE1l es mi secreto? No intento ser el m\xE1s listo. Solo intento no hacer tonter\xEDas."]],
    torre_brilla: [["reves", "\xA1Toda la Torre vuelve a brillar! Al rev\xE9s y al derecho."]],
    villanos_huyen: [["fachada", "\xA1Grrr! \xA1Aqu\xED todos piensan antes de comprar!"], ["fachada", "\xA1Me voy al Gran Reloj, con Merma! \xA1All\xED nos esperan Don Chollo y Deud\xF3n!"], ["reves", "El Gran Reloj\u2026 All\xED est\xE1 la m\xE1quina, aprendiz. Ten cuidado."]],
    charla_reves: [["reves", "\xA1Aloh! Aqu\xED todo va al rev\xE9s. As\xED se ven las cosas que los dem\xE1s no ven."]],
    charla_arrepentido: [["arrepentido", "Si alguien te promete el doble en una noche, acu\xE9rdate de m\xED."]],
    charla_cautela: [["cautela", "Antes de cada paso, me pregunto: \xBFqu\xE9 podr\xEDa salir mal?"]],
    charla_donchollo: [["donchollo", "\xA1Psst! \xA1Solo hoy! \xA1No se lo digas a nadie!"]],
    charla_deudon: [["deudon", "\xBFNecesitas algo? \xA1Yo te presto! Ya me lo devolver\xE1s\u2026 con un poquito m\xE1s."]],
    charla_fachada: [["fachada", "\xA1Mi tienda nueva brilla todav\xEDa m\xE1s que el bazar!"]],
    charla_puerta_1: [["chispin", "La torre est\xE1 cerrada. Cautela la vigila."]],
    charla_puerta_2: [["chispin", "Otra puerta cerrada."]],
    charla_puerta_3: [["chispin", "Otra puerta cerrada."]],
    charla_puerta_4: [["chispin", "Otra puerta cerrada."]]
  }
};
