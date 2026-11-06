// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M03 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 3. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_antojo: "Antojo te llama desde su puesto",
    ir_hogaza: "Hogaza tiene tu paga de la feria",
    ir_semilla: "La se\xF1ora Semilla tiene un truco para la feria",
    feria: "Haz tus compras de la feria con Tasador",
    victoria: "\xA1Todo el Mercado vuelve a brillar!"
  },
  textos: {
    noche_feria: "Ma\xF1ana es la Feria del Pueblo",
    titulo_chuche: "Chuche Gigante Brillante",
    mirar_chuche: "Mirarla con el ojo de tasador",
    comprar_chuche: "Comprarla por 5 monedas",
    ahora_no: "Ahora no",
    botes_titulo: "La regla de los tres botes",
    bote_1: "Primero, lo que necesitas.",
    bote_2: "Despu\xE9s, lo que te hace crecer.",
    bote_3: "Y con lo que sobra, un gusto.",
    botes_frase: "Si lo ordenas as\xED, muchas veces cabe todo.",
    titulo_oferta: "\xA1Oferta de Antojo!",
    seguir_lista: "Seguir con mi lista",
    comprar_oferta: "Comprar la chuche por 4 monedas",
    titulo_cambio: "No te llega para todo",
    cambiar_por: "Cambiar {cosa} por la chuche",
    cosa_abono: "el abono",
    cosa_gorro: "el gorro",
    cosa_comida: "la comida de Chisp\xEDn",
    pregunta: "\xBFQu\xE9 hay que comprar primero?",
    resp_necesito: "Lo que necesito",
    resp_brilla: "Lo que m\xE1s brilla",
    resp_oferta: "Lo que est\xE1 de oferta",
    fb_bien: "\xA1Eso es! Primero lo que necesitas. Luego lo que te hace crecer. Y con lo que sobra, un gusto.",
    fb_mal: "Casi. Primero va lo que necesitas; lo que brilla o est\xE1 de oferta puede esperar.",
    medalla: "Medalla \xABBuen presupuesto\xBB",
    medalla_texto: "Has hecho tu primer presupuesto. \xA1Todo el Mercado del Pueblo vuelve a brillar!",
    icono_medalla: "medalla_presupuesto",
    pagina_numero: "p\xE1gina 3",
    pagina: "Un capricho a tiempo sabe mejor. Pero primero, lo que importa.",
    reto_familia: "Haced juntos la lista de la compra de la semana y separad lo que necesit\xE1is de lo que os apetece."
  },
  lista: [{
    icono: "comida",
    nombre: "Comida para Chisp\xEDn",
    precio: 4,
    tipo: "necesito",
    explica: "La comida de Chisp\xEDn es una necesidad: sin ella, no tiene fuerzas."
  }, {
    icono: "abono",
    nombre: "Abono para el huerto",
    precio: 5,
    tipo: "crecer",
    explica: "El abono te hace crecer: el huerto dar\xE1 m\xE1s frutos."
  }, {
    icono: "gorro",
    nombre: "Gorro de feria",
    precio: 3,
    tipo: "apetece",
    explica: "El gorro es un gusto. \xA1Los gustos tambi\xE9n est\xE1n bien, si caben!"
  }, {
    icono: "caramelo",
    nombre: "Chuche gigante",
    precio: 5,
    tipo: "apetece",
    explica: "La chuche es un capricho: rica, pero dura un momento."
  }],
  tienda: [{
    id: "comida",
    icono: "comida",
    nombre: "Comida para Chisp\xEDn",
    precio: 4
  }, {
    id: "abono",
    icono: "abono",
    nombre: "Abono para el huerto",
    precio: 5
  }, {
    id: "gorro",
    icono: "gorro",
    nombre: "Gorro de feria",
    precio: 3
  }, {
    id: "chuche",
    icono: "caramelo",
    nombre: "Chuche gigante",
    precio: 5
  }],
  dialogos: {
    chispin_feria: [["chispin", "\xA1Ma\xF1ana es la Feria del Pueblo! Antojo nos est\xE1 llamando."]],
    antojo_ofrece: [["antojo", "\xA1Chuche Gigante Brillante! \xA1Solo 5 monedas!"]],
    chuche_mirada: [["chispin", "Con tu ojo de tasador se ve claro: dura un momento y da un rato de alegr\xEDa."]],
    chuche_comprada: [["chispin", "\xA1Mmm, qu\xE9 rica! Y qu\xE9 r\xE1pido se ha acabado."]],
    chuche_no: [["antojo", "\xA1T\xFA te lo pierdes! Ma\xF1ana tendr\xE9 m\xE1s."]],
    hogaza_llama: [["chispin", "Mira, Hogaza nos hace se\xF1as desde la panader\xEDa."]],
    hogaza_paga_feria: [["hogaza", "Toma tu paga de la feria: {n} monedas."], ["hogaza", "Antes de ir, haz tu lista."]],
    lista_hecha: [["chispin", "\xA1Lista hecha! La se\xF1ora Semilla dice que tiene un truco."]],
    semilla_regla: [["semilla", "En la feria todo apetece. Por eso yo uso una regla."]],
    tasador_feria: [["tasador", "\xA1Bienvenido a la feria! Tengo todo lo de tu lista."]],
    antojo_oferta: [["antojo", "\xA1Espera, espera! \xA1Oferta solo hoy! La chuche gigante, a 4 monedas."]],
    oferta_no_cabe: [["chispin", "\xA1Ojo! Con lo que ya has elegido, no te llega para la chuche."]],
    efecto_comida: [["chispin", "\xA1\xD1am! \xA1Qu\xE9 rica! Me siento m\xE1s fuerte que nunca."]],
    efecto_sin_comida: [["chispin", "Uf, tengo un poco de hambre\u2026 La pr\xF3xima vez, \xBFempezamos por lo que se necesita?"]],
    efecto_abono: [["semilla", "\xA1Buen abono! Tu huerto dar\xE1 el doble de frutos en la pr\xF3xima cosecha."]],
    efecto_gorro: [["chispin", "\xA1Qu\xE9 gorro tan bonito! Te queda genial."]],
    efecto_chuche: [["chispin", "\xA1Qu\xE9 rica la chuche! Disfr\xFAtala, que dura poco."]],
    efecto_sobra: [["chispin", "Te han sobrado {n} monedas. \xA1A la mochila!"]],
    victoria_antojo: [["antojo", "\xA1Mi puesto vuelve a brillar!"], ["antojo", "Un capricho a tiempo sabe mejor. Y m\xE1s si cabe en tu presupuesto."]],
    mercado_brilla: [["hogaza", "\xA1Mirad! \xA1Todo el Mercado vuelve a brillar!"], ["hogaza", "Eso que has hecho tiene nombre: presupuesto."]],
    sube_huye: [["subeprecios", "\xA1Grrr! \xA1Me voy al Valle de la Nieve! \xA1All\xED no me pillar\xE1s!"], ["chispin", "\xA1Se ha ido por el camino del Valle! Alg\xFAn d\xEDa iremos tras \xE9l."]],
    charla_hogaza: [["hogaza", "\xA1Qu\xE9 ganas de feria!"]],
    charla_tasador: [["tasador", "En la feria, mira bien antes de comprar."]],
    charla_antojo: [["antojo", "\xA1Caramelos brillantes! \xBFUn caprichito?"]],
    charla_semilla: [["semilla", "Primero lo que necesitas. Luego, lo que te hace crecer."]],
    charla_yunque: [["yunque", "Lo bueno se paga una vez."]],
    charla_subeprecios: [["subeprecios", "\xA1Je, je!"]]
  }
};
