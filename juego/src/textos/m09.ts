// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M09 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 9. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_lupa: "Lupa tiene un \xFAltimo caso para ti",
    ir_plaza: "Ve a la plaza de la fuente y mira a la gente",
    volver_lupa: "Cu\xE9ntale a Lupa d\xF3nde hace cola la gente",
    victoria: "\xA1Toda la Ciudad vuelve a brillar!"
  },
  textos: {
    noche_inicio: "Aparece un quiosco nuevo en la Ciudad",
    tienda_titulo: "Compra tus trocitos",
    noche_1: "Pasa la primera estaci\xF3n",
    noche_2: "Pasa la segunda estaci\xF3n",
    noche_3: "Pasa la tercera estaci\xF3n",
    noche_4: "Pasa la cuarta estaci\xF3n",
    tabla_titulo: "Lo que vale cada trocito",
    tabla_frase: "Los talleres que conoces crecen poco a poco. Rel\xE1mpago subi\xF3 muy deprisa\u2026 y se hundi\xF3.",
    pregunta: "\xBFEn qu\xE9 trocitos conviene invertir?",
    resp_conozco: "En talleres que conozco y s\xE9 explicar",
    resp_sube: "En lo que m\xE1s sube esta semana",
    resp_brilla: "En lo que m\xE1s brilla",
    fb_bien: "\xA1Eso es! Si sabes explicar qu\xE9 hace y por qu\xE9 la gente lo quiere, sabes lo que tienes.",
    fb_mal: "Casi. Lo que sube deprisa o brilla mucho puede caer. Mejor lo que conoces y sabes explicar.",
    medalla: "Medalla de Lupa",
    medalla_texto: "Inviertes en lo que conoces. \xA1Toda la Ciudad de las Empresas vuelve a brillar!",
    icono_medalla: "medalla_lupa",
    pagina_numero: "p\xE1gina 9",
    pagina: "Invierte en lo que conoces. Si no puedes explicarlo con tus palabras, todav\xEDa no es para ti.",
    reto_familia: "Elegid juntos una empresa que conozc\xE1is y explicad en dos frases qu\xE9 hace y por qu\xE9 la gente le compra."
  },
  nombres: {
    fiel: "Zapater\xEDa",
    engranaje: "Inventos",
    horno: "Horno",
    fragua: "Fragua",
    relampago: "Rel\xE1mpago"
  },
  explicar: {
    horno: {
      pregunta: "\xBFQu\xE9 hace el horno de Hogaza?",
      opciones: [["pan", "Pan que la gente compra cada d\xEDa"], ["chuches", "Chuches gigantes"], ["nose", "No lo s\xE9"]],
      correcta: "pan",
      bien: "\xA1Eso es! Lo conoces del Mercado: siempre hay alguien comprando pan.",
      mal: "Casi. Hogaza hace pan, y la gente lo compra cada d\xEDa."
    },
    fragua: {
      pregunta: "\xBFQu\xE9 hace la fragua de Yunque?",
      opciones: [["herramientas", "Herramientas que duran a\xF1os"], ["pintura", "Pintura dorada"], ["nose", "No lo s\xE9"]],
      correcta: "herramientas",
      bien: "\xA1Eso es! Tu regadera de hierro lo demuestra.",
      mal: "Casi. Yunque hace herramientas fuertes, como las regaderas de hierro."
    },
    relampago: {
      pregunta: "\xBFQu\xE9 hace la Compa\xF1\xEDa Rel\xE1mpago?",
      opciones: [["rayos", "Fabrica rayos de verdad"], ["pan", "Hace pan"], ["nose", "No s\xE9 explicarlo"]],
      correcta: "nose",
      bien: "Exacto: nadie sabe qu\xE9 hace. Solo que \xABsube\xBB.",
      mal: "Pi\xE9nsalo bien: \xBFalguien sabe qu\xE9 hace? Nadie. Solo que \xABsube\xBB."
    }
  },
  tienda: [{
    id: "horno",
    nombre: "Trocito del horno",
    precio: 6,
    icono: "pan"
  }, {
    id: "fragua",
    nombre: "Trocito de la fragua",
    precio: 6,
    icono: "yunque"
  }, {
    id: "relampago",
    nombre: "Trocito de Rel\xE1mpago",
    precio: 6,
    icono: "relampago"
  }],
  dialogos: {
    prisas_relampago: [["prisas", "\xA1Compa\xF1\xEDa Rel\xE1mpago! \xA1La que m\xE1s sube de toda Valoria!"], ["prisas", "\xBFQue qu\xE9 hace? \xA1Qu\xE9 m\xE1s da! \xA1Sube sin parar! \xA1Compra ya, ya, ya!"]],
    chispin_lupa: [["chispin", "Hmm\u2026 Vamos a preguntarle a Lupa."]],
    lupa_colas: [["lupa", "\xDAltimo caso, ayudante. Los mejores detectives miran lo que tienen delante."], ["lupa", "Ve a la plaza de la fuente y f\xEDjate: \xBFd\xF3nde hace cola la gente?"]],
    plaza_colas: [["chispin", "Desde aqu\xED se ve todo. Hay cola en la zapater\xEDa de Fiel y en el taller de Engranaje."], ["chispin", "En el bazar de Fachada no hay nadie. Y en el quiosco de Rel\xE1mpago\u2026 solo est\xE1 Prisas gritando."]],
    lupa_conoces: [["lupa", "La gente hace cola donde compra cosas buenas. Eso un detective lo apunta."], ["lupa", "Te propongo tres trocitos: el horno de Hogaza, la fragua de Yunque y la Compa\xF1\xEDa Rel\xE1mpago."], ["lupa", "Pero antes, una regla: expl\xEDcame qu\xE9 hace cada uno."]],
    lupa_regla: [["lupa", "\xBFTe das cuenta? Los del Mercado los conoces. Rel\xE1mpago no hay quien lo explique."], ["lupa", "Invierte en lo que conoces. Si no sabes explicarlo, no lo compres."]],
    compras_ninguna: [["chispin", "Esta vez no hemos comprado nada. Veamos qu\xE9 pasa con los trocitos que ya tenemos."]],
    compras_buenas: [["chispin", "\xA1Trocitos nuevos! Ahora tenemos una parte de varios talleres."]],
    compras_relampago: [["prisas", "\xA1Ja! \xA1Has comprado Rel\xE1mpago! \xA1Ya ver\xE1s c\xF3mo sube!"]],
    relampago_sube: [["prisas", "\xA1Rel\xE1mpago vale ya el doble! \xA1Ja, ja! \xA1Todo el mundo quiere!"]],
    relampago_cae: [["chispin", "\xA1Rel\xE1mpago se ha desplomado! Nadie sab\xEDa qu\xE9 hac\xEDa\u2026 y la gente se ha ido."]],
    relampago_cierra: [["prisas", "\xA1Grrr! \xA1Rel\xE1mpago ha cerrado! \xA1Me largo!"]],
    reparto: [["lupa", "Adem\xE1s, tus talleres buenos te han dado tu parte de lo que han ganado: {n} monedas."]],
    repartija_varios: [["chispin", "\xA1Mira! Una ara\xF1ita teje hilos entre tus talleres."], ["chispin", "Se llama Repartija. Si un taller cae, los otros te sostienen. \xA1Viene con nosotros!"]],
    repartija_uno: [["chispin", "\xA1Mira! Una ara\xF1ita teje un hilo hasta tu taller."], ["chispin", "Se llama Repartija. Dice que con trocitos de varios talleres, si uno cae, duele menos. \xA1Viene con nosotros!"]],
    victoria_cuenta: [["cuenta", "Los n\xFAmeros de la Ciudad vuelven a cuadrar."]],
    ciudad_brilla: [["lupa", "\xA1Mira la Ciudad! Todos los talleres de verdad brillan."], ["lupa", "Y el bazar de Fachada\u2026 se ha quedado gris. Sin la pintura, no hab\xEDa nada."]],
    fachada_huye: [["fachada", "\xA1Grrr! \xA1Aqu\xED todos miran dentro!"], ["fachada", "\xA1Me voy a la Torre del Rev\xE9s! All\xED nadie hace preguntas."], ["chispin", "\xA1Ha escapado por el camino del sur! Alg\xFAn d\xEDa iremos tras \xE9l."]],
    charla_lupa: [["lupa", "Un buen detective nunca se f\xEDa de la puerta. Mira dentro."]],
    charla_fiel: [["fiel", "Mis clientes vuelven porque mis zapatos duran. As\xED de sencillo."]],
    charla_engranaje: [["engranaje", "\xA1Cada temporada mejoro algo! Esta vez, unas botas que no resbalan en la nieve."]],
    charla_cuenta: [["cuenta", "Los n\xFAmeros no mienten. Las fachadas, a veces s\xED."]],
    charla_fachada: [["fachada", "\xA1Mira c\xF3mo brilla mi bazar! \xBFPara qu\xE9 quieres ver dentro?"]],
    charla_prisas: [["prisas", "\xA1Corre, corre! \xA1Aqu\xED todo va deprisa!"]]
  }
};
