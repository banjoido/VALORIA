// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.

export const DATOS_M14 = {
  _nota: "Di\xE1logos y textos de la misi\xF3n 14. Cada l\xEDnea es [personaje, texto]. Lo que va entre llaves lo rellena el juego.",
  misiones: {
    ir_memoria: "Memoria guarda cuadros de tormentas pasadas",
    ir_pendulo: "P\xE9ndulo te espera en su taller",
    victoria: "\xA1La plaza de la fiesta brilla!"
  },
  textos: {
    noche_tormenta: "Se acerca una tormenta",
    cuadros_titulo: "Las tormentas de Valoria",
    cuadro_1: "La gran helada: dur\xF3 tres estaciones. Despu\xE9s lleg\xF3 la primavera m\xE1s grande.",
    cuadro_2: "La tormenta de las monedas: todos vend\xEDan. Quien aguant\xF3, recuper\xF3 todo.",
    cuadro_3: "El a\xF1o del viento: los talleres buenos volvieron a abrir, m\xE1s fuertes.",
    cuadros_frase: "Todas las tormentas pasaron. Todas.",
    titulo: "La tormenta de P\xE1nico",
    vender: "Venderlo todo ya ({m} monedas)",
    aguantar: "Aguantar con calma",
    rebajas: "Aguantar y comprar trocitos rebajados ({p} cada uno)",
    noche_calma: "La tormenta se aleja",
    tabla_titulo: "Tres caminos en la tormenta",
    f_vender: "Vender",
    f_aguantar: "Aguantar",
    f_rebajas: "Rebajas",
    tabla_frase: "Quien vendi\xF3 con miedo se qued\xF3 con 3. Quien aguant\xF3 volvi\xF3 a 8. Quien compr\xF3 en rebajas, \xA1pag\xF3 3 por algo que vale 8!",
    pregunta: "\xBFQu\xE9 conviene hacer cuando todos tienen miedo?",
    resp_calma: "Mantener la calma: las tormentas pasan",
    resp_vender: "Vender todo, como los dem\xE1s",
    resp_esconder: "Esconder las monedas en la hucha",
    fb_bien: "\xA1Eso es! Las tormentas pasan. Con calma, hasta pueden ser una oportunidad.",
    fb_mal: "Casi. Vender con miedo es perder. Las tormentas pasan: calma.",
    medalla: "Medalla de P\xE9ndulo",
    medalla_texto: "Aguantaste la tormenta con calma. \xA1La plaza de la fiesta vuelve a brillar!",
    icono_medalla: "medalla_pendulo",
    pagina_numero: "p\xE1gina 14",
    pagina: "Cuando todos tienen miedo, respira. Las tormentas pasan, y lo que es bueno sigue siendo bueno.",
    reto_familia: "Preguntad a los abuelos por una \xE9poca dif\xEDcil que recuerden. \xBFC\xF3mo termin\xF3?"
  },
  dialogos: {
    panico_grita: [["panico", "\xA1AAAH! \xA1TORMENTA! \xA1Esto no se acaba nunca!"], ["panico", "\xA1Vende todo! \xA1Vende ya, antes de que no valga nada!"]],
    chispin_tormenta: [["chispin", "Tus {n} trocitos val\xEDan {v} monedas\u2026 y con la tormenta ahora valen {t}."], ["chispin", "Todo el mundo est\xE1 vendiendo. \xBFQu\xE9 hacemos?"]],
    chispin_tormenta_sin: [["chispin", "Todo el mundo est\xE1 vendiendo sus trocitos a mitad de precio. \xA1Qu\xE9 miedo!"]],
    memoria_hola: [["memoria", "Ven, peque\xF1o, resgu\xE1rdate. Soy Memoria."], ["memoria", "Llevo muchos a\xF1os en el Gran Reloj. Mira mis cuadros."]],
    calmin_aparece: [["chispin", "\xA1Un b\xFAho ha entrado por la ventana!"], ["calmin", "Uuuh\u2026 Soy Calm\xEDn. Cuando todos corren, yo me quedo quieto y pienso."], ["calmin", "\xBFPuedo ir contigo? Te ayudar\xE9 a no asustarte."], ["chispin", "\xA1Calm\xEDn viene con nosotros!"]],
    pendulo_tormenta: [["pendulo", "El p\xE9ndulo est\xE1 en el p\xE1nico. Todos venden a mitad de precio."], ["pendulo", "Los talleres siguen siendo los mismos. Fiel sigue cosiendo, Hogaza sigue horneando."], ["pendulo", "T\xFA decides."]],
    vendido: [["panico", "\xA1Bien hecho! \xA1S\xE1lvate! \xA1Je\u2026!"], ["chispin", "Hemos vendido todo por {m} monedas."]],
    rebajas: [["chispin", "\xA1Hemos comprado {k} trocitos de la zapater\xEDa por solo {m} monedas!"], ["calmin", "Uuuh\u2026 Bien pensado."]],
    aguanta: [["calmin", "Uuuh\u2026 Quietos. Esperemos a que pase."]],
    vuelve_calma: [["chispin", "\xA1Ha salido el sol! El p\xE9ndulo vuelve al centro."], ["panico", "\xBFYa? \xBFYa est\xE1? Bueno\u2026 \xA1pues me voy a asustar a otra parte!"]],
    frutos_dorados: [["calmin", "Uuuh\u2026 Mira: tus {t} trocitos han dado frutos dorados. {n} monedas."]],
    pendulo_nombre: [["pendulo", "Las tormentas pasan. Lo bueno sigue siendo bueno."], ["pendulo", "Cuando todos tienen miedo, las cosas buenas se venden baratas. Quien tiene calma, lo aprovecha."]],
    victoria_pendulo: [["pendulo", "Tienes mi medalla. Ya solo queda una cosa\u2026 la que est\xE1 debajo del reloj."]],
    charla_pendulo: [["pendulo", "No s\xE9 ad\xF3nde va el p\xE9ndulo. Pero s\xE9 d\xF3nde est\xE1."]],
    charla_vaiven: [["vaiven", "\xA1Ding, dong! Yo toco la campana cada vez que el mercado cambia de humor."]],
    charla_memoria: [["memoria", "He visto cien tormentas. Todas pasaron."]],
    charla_euforio: [["euforio", "\xA1Fiesta, fiesta! \xA1Todo sube! \xA1Compra, compra!"]],
    charla_panico: [["panico", "\xA1Aaah! \xA1Se acaba el mundo! \xA1Vende todo!"]],
    charla_merma: [["merma", "Todo lo quieto es m\xEDo."]]
  }
};
