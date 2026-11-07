// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M15 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 15. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_maquina: "Baja a la sala de la m\xE1quina",
    final: "\xA1Det\xE9n a Merma!",
    victoria: "\xA1Todo Valoria brilla!"
  },
  textos: {
    noche_inicio: "El suelo tiembla bajo el Gran Reloj",
    forja_titulo: "La Moneda Estrella",
    forja_texto: "Con las medallas de Copo, Lupa, Rev\xE9s y P\xE9ndulo se forja una moneda que nadie puede copiar. Solo existir\xE1n 21 en todo el reino.",
    forja_boton: "Forjar",
    forja_hecha: "\xA1La Moneda Estrella! N\xFAmero 1 de 21. Nadie, nunca, podr\xE1 fabricar ni una m\xE1s.",
    pregunta: "\xBFPor qu\xE9 la m\xE1quina no puede con la Moneda Estrella?",
    resp_unica: "Porque nadie puede fabricar m\xE1s",
    resp_dorada: "Porque es muy dorada",
    resp_grande: "Porque es muy grande",
    fb_bien: "\xA1Eso es! Lo que no se puede multiplicar no pierde su valor.",
    fb_mal: "Casi. La m\xE1quina copia monedas. Esta no se puede copiar: solo hay 21.",
    medalla: "El Legado de Libertad, completo",
    medalla_texto: "Has apagado la m\xE1quina de hacer dinero. \xA1Todo Valoria vuelve a brillar!",
    icono_medalla: "moneda_estrella",
    pagina_numero: "p\xE1gina 15",
    pagina: "Los precios siempre suben un poco: es normal. El tiempo, la paciencia y la cabeza fr\xEDa son tu libertad.",
    reto_familia: "Leed juntos la carta completa del abuelo y escribid vuestra propia p\xE1gina: \xBFqu\xE9 os gustar\xEDa dejar a alguien dentro de muchos a\xF1os?",
    carta_final: `Si lees esto, es que has llegado al Gran Reloj y la m\xE1quina ya no echa humo.

Por el camino has aprendido lo mismo que aprend\xED yo: que el dinero quieto pierde brillo, que lo que plantas crece si le das tiempo, que antes de comprar un trocito hay que mirar dentro, que quien promete mucho y deprisa suele mentir, y que las tormentas pasan.

Nada de esto te har\xE1 ric{o} de golpe. Te har\xE1 libre poco a poco. Y eso vale m\xE1s.

Cuida tus monedas, cuida a los tuyos y, alg\xFAn d\xEDa, escribe t\xFA una carta como esta.`,
    fin_titulo: "Todo el reino vuelve a brillar",
    fin_texto: "La m\xE1quina se ha apagado para siempre. Sin ella, los precios solo suben despacito, como en todas partes. Puedes seguir explorando y viajar por todo Valoria desde el mapa."
  },
  trampas: [{
    villano: "subeprecios",
    dialogo: "t_sube",
    ayuda: "a_sube",
    pregunta: "\xBFQu\xE9 le pasa al dinero que se queda quieto en la hucha?",
    correcta: "pierde",
    opciones: [["pierde", "Pierde brillo: compra cada vez menos", "chispin"], ["crece", "Crece solo", "hucha"], ["igual", "Se queda igual para siempre", "moneda"]],
    bien: "\xA1Eso es! Por eso hay que ponerlo a trabajar.",
    mal: "Casi. Acu\xE9rdate del pan de Hogaza: cada vez costaba m\xE1s."
  }, {
    villano: "prisas",
    dialogo: "t_prisas",
    ayuda: "a_prisas",
    pregunta: "Prisas quiere tu \xE1rbol del tiempo. \xBFQu\xE9 haces?",
    correcta: "esperar",
    opciones: [["esperar", "Esperar: con tiempo da mucho m\xE1s", "brotin"], ["vender", "Vend\xE9rselo ya", "moneda"], ["cortar", "Cortarlo para que no crezca", "fruto"]],
    bien: "\xA1Eso es! El tiempo multiplica.",
    mal: "Casi. Acu\xE9rdate del \xE1rbol: con cuatro estaciones dio 24 frutos."
  }, {
    villano: "fachada",
    dialogo: "t_fachada",
    ayuda: "a_fachada",
    pregunta: "Fachada ofrece trocitos de su bazar dorado. \xBFQu\xE9 miras primero?",
    correcta: "dentro",
    opciones: [["dentro", "Clientes, producto y cuentas", "lupa_icono"], ["brillo", "Cu\xE1nto brilla", "bazar"], ["precio", "Que sea barato", "moneda"]],
    bien: "\xA1Eso es! Por fuera se puede pintar cualquier cosa.",
    mal: "Casi. Acu\xE9rdate del cuaderno de detective."
  }, {
    villano: "donchollo",
    dialogo: "t_chollo",
    ayuda: "a_chollo",
    pregunta: "Don Chollo promete triplicar tus monedas esta noche. \xBFQu\xE9 es?",
    correcta: "timo",
    opciones: [["timo", "Un timo", "olfatin"], ["suerte", "Una suerte", "moneda"], ["regalo", "Un regalo", "cofre"]],
    bien: "\xA1Eso es! Mucho, r\xE1pido y en secreto: timo.",
    mal: "Casi. Olfat\xEDn ya lo ha olido: es un timo."
  }, {
    villano: "panico",
    celda: [10, 30],
    dialogo: "t_panico",
    ayuda: "a_panico",
    pregunta: "P\xE1nico grita que el mundo se acaba y que lo vendas todo. \xBFQu\xE9 haces?",
    correcta: "calma",
    opciones: [["calma", "Calma: las tormentas pasan", "calmin"], ["vender", "Vender todo", "panico"], ["llorar", "Esconderme", "hucha"]],
    bien: "\xA1Eso es! Calm\xEDn est\xE1 contigo.",
    mal: "Casi. Acu\xE9rdate de los cuadros de Memoria."
  }],
  dialogos: {
    pendulo_maquina: [["pendulo", "\xBFLo notas? Merma ha encendido la m\xE1quina de hacer dinero, aqu\xED abajo."], ["pendulo", "Cada moneda que escupe hace que todas las dem\xE1s valgan un poco menos."], ["pendulo", "Baja a la sala de la m\xE1quina. Tus amigos van contigo."]],
    merma_habla: [["merma", "Vaya, vaya\u2026 {El} {nieto} del viejo aprendiz."], ["merma", "Soy Merma. Mientras esta m\xE1quina haga monedas, yo me comer\xE9 su brillo."], ["merma", "\xA1Secuaces! \xA1Que no llegue a la m\xE1quina!"]],
    t_sube: [["subeprecios", "\xA1Je, je! \xA1Guarda todas tus monedas en la hucha, que ah\xED est\xE1n seguras!"]],
    a_sube: [["chispin", "\xA1Chisp\xEDn brilla con fuerza! \xA1Subeprecios no soporta la luz!"]],
    t_prisas: [["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1V\xE9ndeme tu \xE1rbol del tiempo! \xA1YA!"]],
    a_prisas: [["brotin", "\xA1Brot\xEDn echa ra\xEDces y no se mueve! \xA1Prisas tropieza y sale rodando!"]],
    t_fachada: [["fachada", "\xA1Compra trocitos de mi bazar! \xA1Mira c\xF3mo brilla!"]],
    a_fachada: [["repartija", "\xA1Repartija teje un hilo y le quita la pintura dorada! \xA1Detr\xE1s no hay nada!"]],
    t_chollo: [["donchollo", "\xA1Dame tus monedas y esta noche te las triplico! \xA1En secreto!"]],
    a_chollo: [["olfatin", "\xA1Snif! \xA1Huele a timo! \xA1Olfat\xEDn le persigue hasta la salida!"]],
    t_panico: [["panico", "\xA1AAAH! \xA1Se acaba el mundo! \xA1Vende todo, VENDE!"]],
    a_panico: [["calmin", "Uuuh\u2026 Calm\xEDn abre las alas y todo se queda en silencio. P\xE1nico se calma\u2026 y se va."]],
    merma_furiosa: [["merma", "\xA1Grrr! \xA1Da igual! \xA1Mi m\xE1quina hace m\xE1s monedas que nadie! \xA1Infinitas!"]],
    pendulo_forja: [["pendulo", "Infinitas\u2026 Ese es su punto d\xE9bil."], ["pendulo", "Tus cuatro medallas. D\xE1melas. Vamos a forjar algo que la m\xE1quina no pueda copiar."]],
    merma_copia: [["merma", "\xBFUna moneda? \xA1JA! \xA1M\xE1quina, c\xF3piala! \xA1Haz mil iguales!"], ["chispin", "\xA1La m\xE1quina tiembla! \xA1Le salen tornillos por todas partes!"]],
    maquina_apagada: [["chispin", "\xA1CRAC! \xA1La m\xE1quina se ha atascado\u2026 y se ha apagado!"], ["merma", "\xA1Nooo! Sin mi m\xE1quina\u2026 solo podr\xE9\u2026 robar\u2026 un poquito\u2026"], ["chispin", "\xA1Merma se ha deshecho en humo!"]],
    todo_brilla: [["pendulo", "Mira arriba. Mira a tu alrededor."], ["pendulo", "El Mercado, el Valle, la Ciudad, la Torre y el Gran Reloj. Todo Valoria brilla otra vez."], ["chispin", "\xA1Lo hemos conseguido! \xA1Y hay algo m\xE1s en la bolsa del abuelo\u2026 la \xFAltima p\xE1gina!"]],
    charla_pendulo: [["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1."]],
    charla_vaiven: [["vaiven", "\xA1Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."]],
    charla_memoria: [["memoria", "He visto cien tormentas. Todas pasaron."]],
    charla_euforio: [["euforio", "\xA1Fiesta, fiesta! \xA1Todo sube! \xA1Compra, compra!"]],
    charla_panico: [["panico", "\xA1Aaah! \xA1Se acaba el mundo! \xA1Vende todo!"]],
    charla_merma: [["merma", "Todo lo quieto es m\xEDo."]]
  }
};
