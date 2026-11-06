// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M06 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 6. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_copo: "Pregunta a Copo qu\xE9 hacer con la cosecha",
    victoria: "\xA1Todo el Valle vuelve a brillar!"
  },
  textos: {
    noche_inicio: "El cielo se pone muy oscuro",
    lugares_titulo: "Tres sitios para guardar",
    l_huerto: "El huerto: crece mucho, pero las heladas lo queman.",
    l_tierras: "Las tierras de labor: crecen despacio, pero aguantan.",
    l_cueva: "La cueva: no crece nada, pero all\xED nada se estropea.",
    lugares_frase: "No s\xE9 si vendr\xE1 la helada ni cu\xE1ndo. Por eso no lo pongo todo en el mismo sitio.",
    repartir_titulo: "Reparte tus {n} sacos",
    repartir_nota: "Usa + y \u2212 para decidir cu\xE1ntos van a cada sitio.",
    o_huerto: "Huerto",
    o_tierras: "Tierras",
    o_cueva: "Cueva",
    noche_helada: "\xA1Llega la Gran Helada!",
    noche_primavera: "Por fin se derrite la nieve",
    tabla_titulo: "Despu\xE9s de la helada",
    fila_tuyo: "Lo tuyo",
    fila_huerto: "Todo huerto",
    fila_cueva: "Todo cueva",
    tabla_frase_reparto: "Como lo repartiste, la helada no pudo contigo. Y en primavera, lo tuyo volvi\xF3 a crecer.",
    tabla_frase_todo: "Con todo en un sitio, una sola helada te lo puede quitar. Repartido, siempre algo aguanta.",
    pregunta: "\xBFPor qu\xE9 Copo no lo pone todo en el huerto?",
    resp_repartir: "Si algo va mal, no lo pierde todo",
    resp_todo: "Porque el huerto es aburrido",
    resp_nada: "Para que no crezca nada",
    fb_bien: "\xA1Eso es! Si lo repartes, una helada no se lo lleva todo.",
    fb_mal: "Casi. Copo reparte porque nadie sabe cu\xE1ndo llega la helada: as\xED, algo siempre aguanta.",
    medalla: "Medalla del Refugio",
    medalla_texto: "Repartiste tu cosecha y la helada no pudo contigo. \xA1Todo el Valle de la Nieve vuelve a brillar!",
    icono_medalla: "medalla_refugio",
    pagina_numero: "p\xE1gina 6",
    pagina: "No pongas todos los huevos en la misma cesta. Si una se cae, te quedan las otras.",
    reto_familia: "Jugad a esconder 10 garbanzos en 3 tazas. Uno \xABroba\xBB una taza al azar: \xBFcu\xE1ntos os quedan si estaban todos juntos? \xBFY repartidos?"
  },
  dialogos: {
    prisas_helada: [["prisas", "\xA1Je, je! \xBFSabes qu\xE9 viene? \xA1La GRAN HELADA!"], ["prisas", "Hazme caso: mete toda tu cosecha en el huerto. \xA1Crece el doble! \xA1R\xE1pido!"], ["prisas", "\xA1Ya ver\xE1s qu\xE9 risa cuando se congele todo!"]],
    chispin_copo: [["chispin", "Hmm\u2026 No me f\xEDo de Prisas. Vamos a preguntarle a Copo."]],
    copo_sacos: [["copo", "Con los frutos de tu \xE1rbol he llenado {n} sacos de semilla."], ["copo", "Y s\xED, viene una helada. Lo que no sabe nadie es cu\xE1ndo, ni c\xF3mo de fuerte."], ["copo", "Mira d\xF3nde guardo yo las cosas."]],
    repartido: [["chispin", "Hecho: {h} al huerto, {t} a las tierras y {c} a la cueva."]],
    helada: [["chispin", "\xA1Brrr! La helada ha quemado la mitad del huerto: de {h} sacos quedan {h1}."], ["chispin", "Las tierras aguantan sus {t} y la cueva guarda sus {c}. Nos quedan {n} sacos."]],
    primavera: [["chispin", "\xA1La primavera despierta todo! El huerto crece hasta {h2} y las tierras dan {t2}."], ["chispin", "Con los {c} de la cueva, \xA1tenemos {n} sacos!"]],
    cobras: [["copo", "Te cambio tus sacos por {n} monedas. Has hecho un buen trabajo."]],
    escudon_nace: [["chispin", "\xA1Algo sale de la cueva! Tiene un caparaz\xF3n duro como una piedra."], ["chispin", "\xA1Es Escud\xF3n! Le gusta proteger las cosas. \xA1Viene con nosotros!"]],
    victoria_tierras: [["copo", "Las tierras de labor brillan otra vez."]],
    valle_brilla: [["copo", "El Valle entero se ha descongelado."], ["copo", "Tu abuelo estar\xEDa orgulloso. \xC9l tambi\xE9n sab\xEDa esperar y repartir."]],
    prisas_huye: [["prisas", "\xA1Grrr! \xA1Aqu\xED ya nadie tiene prisa!"], ["prisas", "\xA1Me voy a la Ciudad de las Empresas! \xA1All\xED todos corren!"], ["chispin", "\xA1Ha escapado por el camino del sur! Alg\xFAn d\xEDa iremos tras \xE9l."]],
    charla_copo: [["copo", "Sin prisa, peque\xF1o. Lo bueno crece despacio."]],
    charla_raiz: [["raiz", "Mi casa la levant\xF3 mi bisabuela, piedra a piedra. Todav\xEDa me abriga."]],
    charla_anillos: [["anillos", "Cada anillo de un tronco es un a\xF1o que el \xE1rbol aguant\xF3."]],
    charla_escarcha: [["escarcha", "\xA1Ziiim! \xBFMe ves patinar? Llevo todo el invierno practicando."]],
    charla_prisas: [["prisas", "\xA1R\xE1pido, r\xE1pido! \xA1Lo quiero todo YA!"]]
  }
};
