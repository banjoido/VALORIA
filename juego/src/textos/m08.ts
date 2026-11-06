// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M08 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 8. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_cuenta: "Cuenta te presta los libros de los talleres",
    investigar: "Investiga los tres talleres con la lupa",
    ir_lupa: "Cu\xE9ntale a Lupa lo que has descubierto",
    victoria: "\xA1El taller de Engranaje brilla!"
  },
  textos: {
    noche_inicio: "Fachada pinta su bazar todav\xEDa m\xE1s dorado",
    cuaderno_titulo: "Tu cuaderno de detective",
    col_clientes: "Clientes",
    col_producto: "Producto",
    col_cuentas: "Cuentas",
    cuaderno_frase: "El bazar brilla mucho por fuera\u2026 pero dentro no aguanta ni una pista.",
    elegir_titulo: "\xBFD\xF3nde compras un trocito?",
    op_engranaje: "Taller de Engranaje ({n} monedas)",
    op_bazar: "Gran Bazar Brillante ({n} monedas)",
    op_nada: "No comprar ninguno",
    noche_bazar: "Una noche en la Ciudad\u2026",
    noche_engranaje: "Engranaje trabaja toda la noche",
    pregunta: "\xBFQu\xE9 miras antes de comprar un trocito de un taller?",
    resp_dentro: "Sus clientes, lo que hace y sus cuentas",
    resp_bonito: "Lo bonito que es por fuera",
    resp_barato: "Lo barato que es",
    fb_bien: "\xA1Eso es! Clientes que vuelven, un producto que mejora y cuentas que ganan. Lo de fuera da igual.",
    fb_mal: "Casi. Lo de fuera puede enga\xF1ar: hay que mirar los clientes, el producto y las cuentas.",
    medalla: "Medalla \xABOjo de detective\xBB",
    medalla_texto: "Miraste dentro antes de invertir. \xA1El taller de Engranaje vuelve a brillar!",
    icono_medalla: "medalla_detective",
    pagina_numero: "p\xE1gina 8",
    pagina: "No todo lo que brilla es oro. Antes de confiar tu dinero, mira dentro.",
    reto_familia: "Mirad juntos dos anuncios. \xBFQu\xE9 os ense\xF1an de verdad del producto y qu\xE9 es solo brillo?"
  },
  pistas: {
    fiel: {
      titulo: "La zapater\xEDa de Fiel",
      corto: "Zapater\xEDa",
      icono: "zapato",
      lista: [["gente_2", "\xBFVuelven los clientes?", "S\xED: la se\xF1ora de la cola viene cada a\xF1o a por sus botas.", !0], ["zapato", "\xBFEs bueno lo que hace?", "S\xED: unas botas de Fiel duran cinco inviernos.", !0], ["libro", "\xBFGana m\xE1s de lo que gasta?", "S\xED: entran 20 monedas, salen 12. Quedan 8.", !0]]
    },
    engranaje: {
      titulo: "El taller de Engranaje",
      corto: "Inventos",
      icono: "rueda",
      lista: [["gente_3", "\xBFVuelven los clientes?", "S\xED: cada vez tiene m\xE1s, y vuelven a por el invento nuevo.", !0], ["maquina", "\xBFEs bueno lo que hace?", "S\xED: cada temporada mejora sus m\xE1quinas.", !0], ["libro", "\xBFGana m\xE1s de lo que gasta?", "S\xED, aunque poco: casi todo lo gasta en inventar cosas mejores.", !0]]
    },
    fachada: {
      titulo: "El Gran Bazar Brillante",
      corto: "Bazar",
      icono: "bazar",
      lista: [["gente_1", "\xBFVuelven los clientes?", "No: en la puerta no hay nadie. Quien compra una vez, no repite.", !1], ["bazar", "\xBFEs bueno lo que hace?", "No: sus juguetes son de cart\xF3n pintado y se rompen enseguida.", !1], ["libro", "\xBFGana m\xE1s de lo que gasta?", "No: entran 5 monedas y salen 15. \xA1Todo se va en pintura dorada!", !1]]
    }
  },
  dialogos: {
    fachada_presume: [["fachada", "\xA1Bienvenidos al Gran Bazar Brillante! \xA1El taller m\xE1s dorado de Valoria!"], ["fachada", "\xA1Vendo trocitos de mi bazar por solo {n} monedas! \xA1Y te regalo una pegatina dorada!"]],
    lupa_caso: [["lupa", "Segundo caso, ayudante: antes de comprar un trocito, se investiga."], ["lupa", "Ve a ver a Cuenta. \xC9l tiene los libros de todos los talleres."]],
    cuenta_libros: [["cuenta", "\xBFInvestigando? Toma los libros de la zapater\xEDa, del taller de Engranaje y del bazar."], ["cuenta", "Haz tres preguntas en cada taller: \xBFvuelven los clientes?, \xBFes bueno lo que hace? y \xBFgana m\xE1s de lo que gasta?"]],
    antes_fiel: [["fiel", "\xBFInvestigando mi taller? \xA1Adelante, no tengo nada que esconder!"]],
    antes_engranaje: [["engranaje", "\xA1Hola! Pasa, pasa, pero no toques esa palanca. Bueno, t\xF3cala: \xA1es un invento nuevo!"]],
    antes_fachada: [["fachada", "\xBFMirar dentro? \xA1Pero si lo bonito est\xE1 fuera!"], ["fachada", "Bueno\u2026 mira r\xE1pido, que tengo prisa."]],
    faltan: [["chispin", "Nos faltan {n} por investigar."]],
    a_lupa: [["chispin", "\xA1Ya lo tenemos todo apuntado! Vamos a cont\xE1rselo a Lupa."]],
    lupa_eliges: [["lupa", "Buen trabajo, ayudante. Ahora decides t\xFA: \xBFd\xF3nde compras un trocito?"]],
    lupa_otra_vez: [["lupa", "Por fuera brillaba mucho, \xBFverdad? Mira otra vez tu cuaderno."], ["lupa", "Todos los detectives se equivocan alguna vez. Lo importante es aprender."]],
    bazar_comprado: [["fachada", "\xA1Trato hecho! Toma tu pegatina dorada. \xA1Je, je!"]],
    bazar_cierra: [["chispin", "\xA1El bazar ha cerrado! Hay un cartel en la puerta."], ["fachada", "\xA1Cosas que pasan! Tu trocito ya no vale nada. \xA1Pero qu\xE9 bonita la pegatina!"], ["chispin", "Hemos perdido {n} monedas\u2026"]],
    engranaje_comprado: [["engranaje", "\xA1Soci{o} nuev{o}! Con tus monedas termino mi mejor invento."]],
    engranaje_mejora: [["engranaje", "\xA1Mira! Una regadera que se pliega y cabe en el bolsillo."], ["chispin", "\xA1Hay cola en el taller de Engranaje! Cada vez viene m\xE1s gente."]],
    nada: [["lupa", "No comprar tambi\xE9n es una decisi\xF3n. Lo importante es que ya sabes mirar dentro."]],
    bazar_repintado: [["chispin", "Fachada ya ha vuelto a abrir\u2026 y ha pintado su bazar todav\xEDa m\xE1s dorado."], ["lupa", "Por fuera, siempre igual de bonito. Por dentro, siempre igual de vac\xEDo."]],
    victoria_lupa: [["lupa", "Segundo caso resuelto. Ahora sabes mirar detr\xE1s de una fachada."]],
    charla_lupa: [["lupa", "Un buen detective nunca se f\xEDa de la puerta. Mira dentro."]],
    charla_fiel: [["fiel", "Mis clientes vuelven porque mis zapatos duran. As\xED de sencillo."]],
    charla_engranaje: [["engranaje", "\xA1Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve."]],
    charla_cuenta: [["cuenta", "Los n\xFAmeros no mienten. Las fachadas, a veces s\xED."]],
    charla_fachada: [["fachada", "\xA1Mira c\xF3mo brilla mi bazar! \xBFPara qu\xE9 quieres ver dentro?"]],
    charla_prisas: [["prisas", "\xA1Corre, corre! \xA1Aqu\xED todo va deprisa!"]]
  }
};
