// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M11 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 11. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_tienda: "Fachada ha abierto una tienda nueva",
    ir_reves: "Rev\xE9s quiere ense\xF1arte algo",
    victoria: "\xA1La parte baja de la plaza brilla!"
  },
  textos: {
    noche_inicio: "Fachada pinta un cartel nuevo",
    titulo: "Patines de cohete",
    prestamo: "Pedirle {n} monedas a Deud\xF3n",
    pagar: "Pagarlos con mis ahorros ({n})",
    no: "No los necesito ahora",
    noche_cobro: "Pasa una estaci\xF3n\u2026",
    tabla_titulo: "La bola de nieve al rev\xE9s",
    fila_copo: "Bola de Copo",
    fila_deudon: "Bola de Deud\xF3n",
    tabla_frase: "La bola de Copo crece a tu favor. La de Deud\xF3n tambi\xE9n crece\u2026 pero en tu contra.",
    pregunta: "\xBFPara qu\xE9 es mala idea pedir dinero prestado?",
    resp_capricho: "Para un capricho",
    resp_nunca: "Para nada: siempre es buena idea",
    resp_siempre: "Para cualquier cosa, siempre es mala",
    fb_bien: "\xA1Eso es! Un capricho pasa, pero la deuda se queda y crece cada estaci\xF3n.",
    fb_mal: "Casi. Lo peor es pedir prestado para un capricho: el capricho pasa y la deuda crece.",
    medalla: "Medalla \xABSin deudas\xBB",
    medalla_texto: "Sabes que lo que debes tambi\xE9n crece. \xA1La Torre brilla un poco m\xE1s!",
    icono_medalla: "medalla_deuda",
    pagina_numero: "p\xE1gina 11",
    pagina: "Lo que ganas tambi\xE9n gana. Pero lo que debes tambi\xE9n crece. No pidas prestado para lo que no necesitas.",
    reto_familia: "Imaginad que ped\xEDs 10 \u20AC y cada mes deb\xE9is un poquito m\xE1s. Haced juntos la cuenta de cu\xE1nto deber\xEDais en un a\xF1o."
  },
  dialogos: {
    fachada_patines: [["fachada", "\xA1Tienda nueva! \xA1Patines de cohete! \xA1Corres el doble!"], ["fachada", "Solo {n} monedas. \xA1Los quiere todo el mundo!"]],
    patines_oferta: [["fachada", "\xBFTe gustan? \xA1Son los m\xE1s r\xE1pidos de Valoria! {n} monedas y son tuyos."]],
    deudon_ofrece: [["deudon", "\xBFNo te llega? \xBFO no quieres gastar tus ahorros? \xA1Yo te presto!"], ["deudon", "Soy Deud\xF3n. Solo me devuelves un poquito m\xE1s\u2026 cada estaci\xF3n."]],
    prestado: [["deudon", "\xA1Trato hecho! Te presto {n}. Ya hablaremos\u2026 \xA1je, je!"]],
    pagado: [["fachada", "\xA1Vendidos! Con monedas de verdad, me gusta."]],
    no_compra: [["fachada", "\xA1Bah! T\xFA te lo pierdes."]],
    patines_puestos: [["chispin", "\xA1Zas! \xA1Con los patines corres much\xEDsimo m\xE1s!"], ["reves", "\xA1Eh, t\xFA! Antes de salir disparad{o}, ven a mi casa."]],
    reves_prestamo: [["reves", "Has pedido prestado a Deud\xF3n. D\xE9jame ense\xF1arte una cosa."], ["reves", "\xBFRecuerdas la bola de nieve de Copo? Pues hay otra que rueda al rev\xE9s."]],
    reves_pagar: [["reves", "Los has pagado con tus ahorros. Bien. Pero mira lo que habr\xEDa pasado con Deud\xF3n."]],
    reves_no: [["reves", "Has esperado. Me gusta. Mira lo que habr\xEDa pasado con Deud\xF3n."]],
    deudon_cobra: [["deudon", "\xA1Hola, hola! Ha pasado una estaci\xF3n. Me pediste {p}\u2026"], ["deudon", "\u2026as\xED que ahora me debes {n}. \xA1A pagar!"]],
    reves_ayuda: [["reves", "No te llega. Esta vez te dejo yo las {n} que faltan, sin cobrarte nada m\xE1s."], ["reves", "Pero acu\xE9rdate: con Deud\xF3n, cada estaci\xF3n que pasa debes m\xE1s."]],
    deuda_pagada: [["chispin", "Pagado. Pero los patines nos han costado {n} monedas m\xE1s de lo que val\xEDan."]],
    deudon_se_va: [["deudon", "\xA1Bah! \xA1Nadie quiere deberme nada! \xA1Me voy!"]],
    reves_nombre: [["reves", "Lo que ganas tambi\xE9n gana. Y lo que debes tambi\xE9n crece."], ["reves", "No hace falta ser un genio. Basta con no meterse en l\xEDos."]],
    victoria_deuda: [["reves", "\xA1Mira c\xF3mo brilla la plaza! Ya solo queda la torre."]],
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
