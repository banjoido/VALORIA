// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M02 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 2. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_hogaza: "Habla con Hogaza: algo ha pasado",
    ir_semilla: "La se\xF1ora Semilla te busca en el huerto",
    regadera: "Compra una regadera a Tasador o a Yunque",
    regar: "Riega tu huerto",
    cosechar: "Recoge los frutos de tu huerto",
    ir_yunque: "Yunque quiere ense\xF1arte algo en su forja",
    ir_tasador: "Tasador te espera en su puesto",
    victoria: "\xA1El puesto de Tasador vuelve a brillar!"
  },
  textos: {
    noche_pan: "Subeprecios ha vuelto a subir el pan",
    noche_crecen: "El huerto ha bebido y ha crecido",
    quien: "\xBFQui\xE9n habr\xE1 subido el pan otra vez?",
    resp_sube: "Subeprecios",
    resp_antojo: "Antojo",
    resp_viento: "El viento",
    fb_quien_bien: "\xA1Lo has pillado! Subeprecios es el secuaz de Merma que sube los precios.",
    fb_quien_mal: "Casi. Ha sido Subeprecios, el secuaz de Merma que sube los precios.",
    titulo_reluciente: "Regadera Reluciente",
    titulo_hierro: "Regadera de hierro",
    nombre_reluciente: "Regadera Reluciente",
    nombre_hierro: "Regadera de hierro",
    comprar_reluciente: "Comprarla por 3 monedas",
    comprar_hierro: "Comprarla por 8 monedas",
    ahora_no: "Ahora no",
    amasar_titulo: "\xBFAmasar con Hogaza?",
    amasar_si: "\xA1A amasar!",
    hierro_titulo: "\xA1Qu\xE9 cosecha!",
    hierro_texto: "La regadera de hierro ha regado bien cada brote. Tu huerto ha dado {n} frutos, el doble de lo normal.",
    hierro_frase: "Lo que dura y funciona, rinde.",
    rota_titulo: "Uy\u2026 la Reluciente se ha roto",
    rota_texto: "Se le ha ca\xEDdo la pintura y goteaba por todas partes. Tu huerto ha dado {n} frutos, los de siempre.",
    rota_frase: "Lo barato a veces sale caro.",
    yunque_frase: "Lo bueno se paga una vez. Lo malo, muchas.",
    pregunta: "\xBFPor qu\xE9 la regadera m\xE1s cara sali\xF3 m\xE1s barata?",
    resp_dura: "Porque dura mucho m\xE1s",
    resp_bonita: "Porque es m\xE1s bonita",
    resp_amiga: "Porque Yunque es mi amiga",
    fb_bien: "\xA1Exacto! Cuesta m\xE1s, pero dura diez estaciones y da m\xE1s frutos. Por cada vez que la usas, sale m\xE1s barata.",
    fb_mal: "Casi. Lo que cuenta es que dura diez estaciones y da m\xE1s frutos. Por cada vez que la usas, sale m\xE1s barata.",
    medalla: "Medalla \xABOjo de tasador\xBB",
    medalla_texto: "Has aprendido a mirar el valor y no solo el precio. El Mercado brilla ya al 70%.",
    icono_medalla: "medalla_ojo",
    pagina_numero: "p\xE1gina 2",
    pagina: "Lo que brilla no siempre vale. Preg\xFAntate cu\xE1nto dura y qu\xE9 te da.",
    reto_familia: "Elegid en casa dos cosas parecidas con distinto precio, como dos mochilas, y adivinad cu\xE1l durar\xE1 m\xE1s."
  },
  rondas: [{
    a: {
      icono: "botas_carton",
      nombre: "Botas de cart\xF3n",
      precio: 2,
      detalle: "Dura 1 estaci\xF3n. Se deshace con la lluvia."
    },
    b: {
      icono: "botas_cuero",
      nombre: "Botas de cuero",
      precio: 6,
      detalle: "Duran 12 estaciones."
    },
    buena: "b",
    bien: "\xA1Buen ojo! Las de cuero cuestan m\xE1s, pero duran doce veces m\xE1s.",
    mal: "Mira bien: las de cart\xF3n se deshacen con la primera lluvia. Las de cuero duran doce estaciones."
  }, {
    a: {
      icono: "cesta_mimbre",
      nombre: "Cesta de mimbre",
      precio: 4,
      detalle: "Dura a\xF1os. Aguanta mucho peso."
    },
    b: {
      icono: "cesta_papel",
      nombre: "Cesta de papel",
      precio: 1,
      detalle: "Se rompe al primer uso."
    },
    buena: "a",
    bien: "\xA1Eso es! La de papel sale barata\u2026 una sola vez.",
    mal: "Uy: la de papel se rompe al primer uso. La de mimbre dura a\xF1os."
  }, {
    a: {
      icono: "semillas_oferta",
      nombre: "Semillas de oferta",
      precio: 2,
      detalle: "La mitad no brotan."
    },
    b: {
      icono: "semillas",
      nombre: "Semillas buenas",
      precio: 5,
      detalle: "Brotan todas y dan frutos."
    },
    buena: "b",
    bien: "\xA1Tienes ojo de tasador! Una oferta no vale nada si no funciona.",
    mal: "Casi: la mitad de las semillas de oferta no brotan. Una oferta no vale nada si no funciona."
  }],
  dialogos: {
    chispin_buenos_dias: [["chispin", "\xA1Buenos d\xEDas! \xBFHueles eso? Hogaza parece preocupada."]],
    hogaza_mas_caro: [["hogaza", "\xA1Otra vez m\xE1s caro! El pan ya cuesta 5 monedas."]],
    hogaza_semilla_busca: [["hogaza", "Por cierto, la se\xF1ora Semilla te busca. Algo le pasa a tu huerto."]],
    semilla_sed: [["semilla", "Tu huerto tiene sed. Sin agua, dar\xE1 pocos frutos."], ["semilla", "Tasador y Yunque venden regaderas. T\xFA decides cu\xE1l."]],
    tienda_tasador: [["tasador", "\xA1Mira qu\xE9 Regadera Reluciente! Dorada y barat\xEDsima: 3 monedas."], ["tasador", "Yo vendo de todo. T\xFA decides qu\xE9 te llevas."]],
    tienda_yunque: [["yunque", "Mi regadera es de hierro: 8 monedas."], ["yunque", "No brilla, pero la hice para durar."]],
    comprada_reluciente: [["chispin", "\xA1Qu\xE9 brillo! Vamos a regar el huerto."]],
    comprada_hierro: [["chispin", "\xA1Qu\xE9 fuerte es! Vamos a regar el huerto."]],
    faltan_monedas: [["chispin", "Nos faltan monedas: cuesta {n}. Hogaza paga por amasar una vez cada estaci\xF3n."]],
    hogaza_paga: [["hogaza", "\xA1Gracias! Aqu\xED tienes {n} monedas."]],
    hogaza_ya_amasado: [["hogaza", "Hoy ya has amasado. \xA1Gracias por la ayuda!"]],
    chispin_vender_frutos: [["chispin", "Con lo que tenemos, elijamos bien."]],
    regado_reluciente: [["chispin", "Gotea un poco\u2026 pero el huerto est\xE1 regado."]],
    regado_hierro: [["chispin", "\xA1Riega de maravilla! El huerto est\xE1 contento."]],
    a_cosechar: [["chispin", "\xA1A recoger los frutos!"]],
    yunque_llama: [["chispin", "\xA1{n} frutos! Yunque nos llama desde la forja."]],
    yunque_hola: [["yunque", "Ven, que te ense\xF1o una cosa."]],
    yunque_despide_reluciente: [["yunque", "La pr\xF3xima vez ya sabr\xE1s elegir. Ahora, Tasador te espera."]],
    yunque_despide_hierro: [["yunque", "Elegiste bien. Ahora, Tasador quiere ense\xF1arte su truco."]],
    tasador_ojo: [["tasador", "Antes de comprar, hay que mirar bien. Te ense\xF1o mi truco."], ["tasador", "Se llama ojo de tasador."]],
    tasador_paga: [["tasador", "\xA1Lo tienes! Y te compro tus {f} frutos: son {p} monedas."]],
    victoria_tasador: [["tasador", "\xA1Mi puesto vuelve a brillar!"], ["tasador", "El precio es lo que pagas. El valor, lo que te llevas."]],
    sube_huye: [["subeprecios", "\xA1Grrr! \xA1Me voy con Antojo! \xA1All\xED s\xED me hacen caso!"]],
    charla_hogaza: [["hogaza", "Cada estaci\xF3n tengo masa para amasar. \xA1Te espero!"]],
    charla_tasador: [["tasador", "No todo lo que brilla vale."]],
    charla_antojo: [["antojo", "\xA1Caramelos brillantes! \xBFUn caprichito?"]],
    charla_semilla: [["semilla", "Un huerto bien regado es un huerto feliz."]],
    charla_yunque: [["yunque", "Lo bueno se paga una vez."]],
    charla_subeprecios: [["subeprecios", "\xA1Je, je! Todo, m\xE1s caro."]]
  }
};
