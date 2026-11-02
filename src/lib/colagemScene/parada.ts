import { isMobileViewport } from '../../hooks/mobile'
import { clamp01 } from './clamp01'
import type { SceneRuntime } from './types'

/** Seção "A Parada é o Amor": moldura, sol e textos guiados pelo progresso de rolagem da seção. */
export function applyParada(parada: HTMLElement, rt: SceneRuntime) {
  const box = parada.getBoundingClientRect()
  const p = clamp01(-box.top / Math.max(1, parada.offsetHeight - window.innerHeight))
  const e = 1 - Math.pow(1 - p, 3)
  const frame = parada.querySelector<HTMLElement>('[data-parada-frame]')
  const sun = parada.querySelector<HTMLElement>('[data-parada-sun]')
  const left = parada.querySelector<HTMLElement>('[data-parada-l]')
  const right = parada.querySelector<HTMLElement>('[data-parada-r]')
  if (frame) {
    frame.style.transform = `rotate(${((1 - e) * -9).toFixed(2)}deg) scale(${(0.5 + 0.5 * e).toFixed(4)})`
    frame.style.clipPath = `polygon(${(1 - e) * 6}% ${(1 - e) * 3}%, 100% 0, ${100 - (1 - e) * 4}% 100%, 0 ${100 - (1 - e) * 5}%)`
  }
  if (sun) sun.style.transform = `scale(${(0.2 + 0.8 * e).toFixed(4)}) translate(${rt.mx * 20}px, ${rt.my * 20}px)`
  // No mobile os textos entram no fluxo da grade (acima e abaixo da foto), sem o -50% da posição absoluta.
  const stacked = isMobileViewport()
  if (left) {
    left.style.opacity = String(Math.min(1, e * 1.6))
    left.style.transform = `${stacked ? '' : 'translateY(-50%) '}translateX(${(1 - e) * -40}px)`
  }
  if (right) {
    right.style.opacity = String(Math.max(0, (e - 0.4) * 1.7))
    right.style.transform = `translateY(${(1 - e) * 40}px)`
  }
}
