# Auditoría del prototipo (6 de noviembre de 2026)

El documento completo y editable está aquí: https://claude.ai/artifact/Y4nte2orFhxswDYRTPpuaK

## Resumen

Las 15 misiones del diseño se juegan de principio a fin sin errores. El arte cumple la guía de arte. Falta todo lo que convierte el prototipo en producto: tiempo real, repasos espaciados, panel de padres, cuentas y pago.

## Sprint 1: tareas P0 (antes de probar con niños)

- [ ] Reconstruir el código fuente legible, en módulos
- [ ] Guardar en cada paso de la misión, no solo al empezarla
- [ ] Incluir React y la fuente dentro del juego: cero peticiones a terceros
- [ ] Limitar el trabajo con Hogaza a una vez por estación (misión 2)
- [ ] Declarar el idioma español (`<html lang="es">`) y subir los textos de menos de 11 px
- [ ] Prueba automática que juegue las 15 misiones en cada versión (base: `qa/bot.py`)
- [ ] Kit de prueba con niños: guion de observación y registro anónimo de atascos

## Otros hallazgos

- En móviles de 320 px de ancho se cortan unas tres columnas del mapa.
- El héroe es siempre un chico: Merma le llama "nieto" en la misión 15.
- La voz depende de la voz del sistema del dispositivo.
- Sin música; 7 efectos de sonido sintetizados.

## Decisión pendiente

Motor: web con envoltorio nativo (recomendado para un equipo de agentes) o Godot 4 (lo que dice el plan). Ver la sección 8 de la auditoría.
