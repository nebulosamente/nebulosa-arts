import { clamp01 } from './clamp01'
import type { SceneRuntime } from './types'

/** Seção "Identidade": anel, pôster, sticker, peel e legenda, guiados pelo progresso de rolagem da seção. */
export function applyHera(hera: HTMLElement, rt: SceneRuntime, sec: number) {
  const box = hera.getBoundingClientRect()
  const p = clamp01(-box.top / Math.max(1, hera.offsetHeight - window.innerHeight))
  const q = clamp01((p - 0.42) / 0.36)
  const qe = 1 - Math.pow(1 - q, 3)
  const pp = Math.min(1, p / 0.42)
  const pe = 1 - Math.pow(1 - pp, 2)
  const ring = hera.querySelector<HTMLElement>('[data-hera-ring]')
  const poster = hera.querySelector<HTMLElement>('[data-hera-poster]')
  const bg = hera.querySelector<HTMLElement>('[data-hera-bg]')
  const sticker = hera.querySelector<HTMLElement>('[data-hera-sticker]')
  const peel = hera.querySelector<HTMLElement>('[data-hera-peel]')
  const caption = hera.querySelector<HTMLElement>('[data-hera-caption]')
  if (ring) {
    ring.style.transform = `translate(-50%,-50%) rotate(${(p * 260 + sec * 6).toFixed(2)}deg) scale(${(1 - qe * 0.25).toFixed(4)})`
    ring.style.opacity = String(1 - qe)
  }
  if (poster) {
    poster.style.transform = `translate(-50%,-50%) translate(${rt.mx * -12}px, ${rt.my * -8}px) rotate(${((1 - pe) * 4 - qe * 8).toFixed(2)}deg) scale(${(0.86 + 0.14 * pe - qe * 0.18).toFixed(4)})`
    poster.style.filter = `brightness(${(1 - qe * 0.45).toFixed(3)})`
  }
  if (sticker) {
    sticker.style.opacity = q > 0 ? '1' : '0'
    sticker.style.transform = `translate(-50%,-50%) translate(${((1 - qe) * 70).toFixed(2)}vw, ${((1 - qe) * 60).toFixed(2)}vh) perspective(1600px) rotateY(${(rt.mx * 8 * qe).toFixed(2)}deg) rotateX(${(-rt.my * 6 * qe).toFixed(2)}deg) rotate(${((1 - qe) * 34 - 3 * qe).toFixed(2)}deg) scale(${(0.35 + 0.65 * qe).toFixed(4)})`
  }
  if (peel) peel.style.transform = `scale(${(1 - qe * 0.85).toFixed(3)})`
  if (caption) {
    caption.style.opacity = String(Math.max(0, (q - 0.7) / 0.3))
    caption.style.transform = `translateY(${((1 - q) * 20).toFixed(1)}px)`
  }
  if (bg) bg.style.backgroundPosition = `${(rt.mx * 30 + sec * 8).toFixed(1)}px ${(p * -264).toFixed(1)}px`
}
