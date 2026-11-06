// @ts-nocheck
// Reconstruido del prototipo publicado. Se irá tipando poco a poco.
import { SONIDOS } from './recursos/sonidos';

export let contextoAudio = null;

export const buffersAudio = {};

export function iniciarAudio() {
  if (!contextoAudio) try {
    contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    for (let [i, a] of Object.entries(SONIDOS)) {
      let o = atob(a.split(",")[1]),
        t = new Uint8Array(o.length);
      for (let s = 0; s < o.length; s++) t[s] = o.charCodeAt(s);
      contextoAudio.decodeAudioData(t.buffer).then(s => {
        buffersAudio[i] = s;
      }).catch(() => {});
    }
  } catch {
    contextoAudio = null;
  }
}

export let vozEspanol = null;

function elegirVoz() {
  try {
    let i = speechSynthesis.getVoices();
    vozEspanol = i.find(a => a.lang && a.lang.startsWith("es-ES")) || i.find(a => a.lang && a.lang.startsWith("es")) || null;
  } catch {
    vozEspanol = null;
  }
}

try {
  speechSynthesis.onvoiceschanged = elegirVoz, elegirVoz();
} catch {}
