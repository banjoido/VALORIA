# VALORIA

Juego de rol en pixel art para niños de 8 a 12 años. El reino de Valoria ha perdido su brillo por culpa de Merma (la inflación), y el héroe lo recupera aprendiendo, sin darse cuenta, a ahorrar, presupuestar e invertir.

## Qué hay en este repositorio

| Carpeta | Qué contiene |
| --- | --- |
| `prototipo/index.html` | El prototipo jugable tal como está publicado en el artifact (versión del 5 de noviembre de 2026). Las 15 misiones, de principio a fin. |
| `prototipo/legible/bundle.pretty.js` | El código del prototipo desempaquetado para poder leerlo. Es solo de consulta: el original se perdió y este archivo sale de la versión compilada. |
| `qa/` | Bot que juega el prototipo solo en un navegador y hace capturas de cada paso, más pruebas de rendimiento y de pantallas pequeñas. |
| `docs/` | Auditoría del prototipo y enlaces al documento de diseño. |

## Cómo probarlo

Abrir `prototipo/index.html` en un navegador.

## Cómo pasar el bot de pruebas

Necesita Python 3 con Playwright y Google Chrome o Chromium.

```
npm install
npm run qa:partida
```

Las capturas quedan en `qa/.build/capturas/`.

## Documentos

- Diseño del juego: sección 3 del *Plan de negocio: app de educación financiera para niños*.
- [Auditoría del prototipo, noviembre de 2026](docs/auditoria-2026-11.md)
