# Textos con el género del héroe o la heroína

Desde el sprint 2, al empezar una partida nueva el jugador elige su personaje (`estado.heroe`: `"chico"` o `"chica"`). Las partidas guardadas antes de este cambio no traen el campo y se cargan como `"chico"`.

## Cómo funciona

- Si una frase se puede decir de forma neutra sin que suene forzada, se reescribe.
- Si no, se usa una marca de plantilla. `rellenar` (en `juego/src/ajustes.ts`) añade siempre estas claves a las que ya recibe:

| Marca     | Chico   | Chica   |
|-----------|---------|---------|
| `{o}`     | o       | a       |
| `{el}`    | el      | la      |
| `{El}`    | El      | La      |
| `{un}`    | un      | una     |
| `{Un}`    | Un      | Una     |
| `{nieto}` | nieto   | nieta   |

- El relleno está en un solo sitio: `rellenarGenero` se aplica en el controlador de la interfaz a todo lo que se enseña o se lee en voz alta: globos de diálogo (`decir`), voz (`hablar`) y datos de cualquier capa (`abrir`: medallas, páginas del Legado, preguntas, carta, forja...). Las misiones lo reciben también a través de `dl()` y `tx()`. Las marcas que no son de género (`{n}`, `{m}`...) se dejan como están.
- Para escribir un texto nuevo: `"¡Eh, pequeñ{o}!"`, `"{Un} viajer{o} del Mercado"`, `"{El} {nieto} del viejo aprendiz"`.

## Cambios (antes → después)

### Reescritos de forma neutra

| Dónde | Antes | Después |
|---|---|---|
| m05 `raiz_llama` (Raíz) | ¡Eh, tú! El del arbolito. Ven a mi casa un momento. | ¡Eh, tú, que cuidas el arbolito! Ven a mi casa un momento. |
| m07 `lupa_llama` (Lupa) | ¡Psst! ¡Tú, el de la chispa! Ven a mi agencia. | ¡Psst! ¡Eh, tú, que llevas una chispa! Ven a mi agencia. |
| m11 `reves_nombre` (Revés) | No hace falta ser muy listo. Basta con no meterse en líos. | No hace falta ser un genio. Basta con no meterse en líos. |
| m12 `antes_3` (Prisas) | ¡SAL YA! ¡SAL YA O TE QUEDAS ENCERRADO PARA SIEMPRE! | ¡SAL YA! ¡SAL YA O TE QUEDAS AQUÍ DENTRO PARA SIEMPRE! |
| m12 `pagina` (abuelo) | … Gana el que menos se equivoca. | … Gana quien menos se equivoca. (va junto a la frase con `{el} más list{o}`, ver abajo) |

### Con marca de género

| Dónde | Antes | Después (chica) |
|---|---|---|
| Carta del abuelo (`capas.tsx` y su voz en `controlador.ts`) | Querido nieto o nieta: | Querid{o} {nieto}: → Querida nieta: |
| m03 `tasador_feria` (Tasador) | ¡Bienvenido a la feria! | ¡Bienvenid{o} a la feria! → ¡Bienvenida a la feria! |
| m04 `copo_hola` (Copo) | Un viajero del Mercado. | {Un} viajer{o} del Mercado. → Una viajera del Mercado. |
| m04 `copo_llama` (Copo) | ¡Eh, pequeño! | ¡Eh, pequeñ{o}! → ¡Eh, pequeña! |
| m04, m05, m06 `charla_copo` (Copo) | Sin prisa, pequeño. | Sin prisa, pequeñ{o}. → Sin prisa, pequeña. |
| m05 `copo_llama` (Copo) | Pequeño, ven al castillo. | Pequeñ{o}, ven al castillo. → Pequeña, ven al castillo. |
| m07 `resp_duena` (respuesta) | Ser dueño de una parte | Ser dueñ{o} de una parte |
| m07 `fb_bien` | Eres dueño de una parte del taller… | Eres dueñ{o} de una parte del taller… |
| m07 `fb_mal` | Un trocito te hace dueño de una parte… | …te hace dueñ{o} de una parte… |
| m07 `medalla` | Medalla «Socio» | Medalla «Soci{o}» → Medalla «Socia» |
| m07 `medalla_texto` | Ya eres dueño de un trocito de un taller. | Ya eres dueñ{o} de un trocito de un taller. |
| m07 `pagina` (abuelo) | Puedes ser dueño de un trocito de ese trabajo. | Puedes ser dueñ{o} de un trocito de ese trabajo. |
| m07 `fiel_maquina` (Fiel) | Si me compras uno, serás dueño de un trocito. | …serás dueñ{o} de un trocito. |
| m07 `comprado` (Fiel) | ¡Trato hecho, socio! | ¡Trato hecho, soci{o}! → ¡Trato hecho, socia! |
| m07 `lupa_nombre` (Lupa) | Eres dueño de un trocito del taller. | Eres dueñ{o} de un trocito del taller. |
| m08 `engranaje_comprado` (Engranaje) | ¡Socio nuevo! | ¡Soci{o} nuev{o}! → ¡Socia nueva! |
| m11 `patines_puestos` (Revés) | Antes de salir disparado, ven a mi casa. | Antes de salir disparad{o}, ven a mi casa. |
| m12 `resp_listo` (respuesta) | Ser el más listo | Ser {el} más list{o} → Ser la más lista |
| m12 `pagina` (abuelo) | No intentes ser el más listo. | No intentes ser {el} más list{o}. |
| m13 `pendulo_hola` (Péndulo) | Hola, viajero. | Hola, viajer{o}. → Hola, viajera. |
| m14 `memoria_hola` (Memoria) | Ven, pequeño, resguárdate. | Ven, pequeñ{o}, resguárdate. → Ven, pequeña, resguárdate. |
| m15 `merma_habla` (Merma) | Vaya, vaya… El nieto del viejo aprendiz. | Vaya, vaya… {El} {nieto} del viejo aprendiz. → La nieta del viejo aprendiz. |
| m15 `carta_final` (abuelo) | Nada de esto te hará rico de golpe. | Nada de esto te hará ric{o} de golpe. |

### Revisados y sin cambios

- m07 `lupa_hola`: «Necesito una ayudante… o un ayudante.» Ya incluye a los dos; «ayudante» y «aprendiz» valen igual para chico y chica.
- m08 `fachada_presume`: «¡Bienvenidos al Gran Bazar Brillante!» Fachada se dirige a todo el público, no solo al héroe.
- m14 `aguanta`: «Quietos.» Calmín habla a todo el grupo (héroe y criaturas).
- m12 `reves_final`: «No intento ser el más listo.» Habla Revés de sí misma, no del héroe (ver dudas).
- Pantalla de título, capas e interfaz: no hay más textos con el género del héroe.

## Decisiones del jefe de equipo (revisión)

- Misión 7, Lupa: «Necesito una ayudante… o un ayudante» → «Necesito {un} ayudante.» (se adapta al personaje elegido).
- Misión 12, Revés (personaje femenino): «No intento ser el más listo» → «No intento ser la más lista». No habla del héroe; es una errata de concordancia.
- La carta personalizada («Querida nieta» / «Querido nieto») se mantiene.
