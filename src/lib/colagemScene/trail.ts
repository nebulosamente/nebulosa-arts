import type { SceneRuntime } from './types'

/** Posiciona as três cópias coloridas do título (`[data-trail]`) conforme a velocidade suavizada do ponteiro. */
export function applyTrail(root: HTMLElement, rt: SceneRuntime, sec: number) {
  root.querySelectorAll<HTMLElement>('[data-trail]').forEach((el) => {
    const k = Number(el.dataset.trail)
    const x = -rt.tvx * k * 1.3 + k * 5 + Math.sin(sec * 1.5 + k) * 2
    const y = -rt.tvy * k * 1.3 + k * 3
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  })
}
