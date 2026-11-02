import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { COL_STACK_TRANSITION } from '../data/colagem'
import { isMobileViewport } from './mobile'

type ColagemSceneRefs = {
  rootRef: RefObject<HTMLElement | null>
  paradaRef: RefObject<HTMLElement | null>
  heraRef: RefObject<HTMLElement | null>
  onStep: (delta: number) => void
  onThrown: (index: number) => void
}

type Drag = {
  el: HTMLDivElement
  index: number
  x: number
  y: number
  dx: number
  dy: number
  tf: string
}

type Runtime = {
  mx: number
  my: number
  tmx: number
  tmy: number
  rawX?: number
  rawY?: number
  lrX?: number
  lrY?: number
  lastSy?: number
  tvx: number
  tvy: number
  drag: Drag | null
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

export function useColagemScene({ rootRef, paradaRef, heraRef, onStep, onThrown }: ColagemSceneRefs) {
  const onStepRef = useRef(onStep)
  const onThrownRef = useRef(onThrown)
  onStepRef.current = onStep
  onThrownRef.current = onThrown

  const runtime = useRef<Runtime>({
    mx: 0,
    my: 0,
    tmx: 0,
    tmy: 0,
    tvx: 0,
    tvy: 0,
    drag: null,
  })

  const onCardPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, index: number, tf: string, active: boolean) => {
      if (!active) return
      e.preventDefault()
      runtime.current.drag = {
        el: e.currentTarget,
        index,
        x: e.clientX,
        y: e.clientY,
        dx: 0,
        dy: 0,
        tf,
      }
    },
    [],
  )

  useEffect(() => {
    const rt = runtime.current
    let raf = 0
    let flyTimer = 0

    const release = () => {
      const drag = rt.drag
      if (!drag) return
      rt.drag = null
      if (Math.abs(drag.dx) > 110) {
        const dir = drag.dx > 0 ? 1 : -1
        drag.el.style.transition = 'transform .45s cubic-bezier(.3,0,.6,1), opacity .45s'
        drag.el.style.transform = `translate(-50%,-50%) translate(${dir * 120}vw, ${drag.dy * 0.4 - 60}px) rotate(${dir * 40}deg)`
        drag.el.style.opacity = '0'
        window.clearTimeout(flyTimer)
        flyTimer = window.setTimeout(() => {
          drag.el.style.transition = 'none'
          onThrownRef.current(drag.index)
        }, 380)
      } else {
        drag.el.style.transition = COL_STACK_TRANSITION
        drag.el.style.transform = drag.tf
      }
    }

    // Toque: sem cursor, o "rastro" do título reage à velocidade da rolagem e a cena balança sozinha.
    const touchOnly = !window.matchMedia('(hover: hover)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastMove = -1e9

    const onMove = (e: PointerEvent) => {
      lastMove = performance.now()
      rt.rawX = e.clientX
      rt.rawY = e.clientY
      const drag = rt.drag
      if (drag) {
        drag.dx = e.clientX - drag.x
        drag.dy = e.clientY - drag.y
        drag.el.style.transition = 'none'
        drag.el.style.transform = `translate(-50%,-50%) translate(${drag.dx}px,${drag.dy * 0.4}px) rotate(${drag.dx * 0.05}deg)`
      }
      rt.tmx = (e.clientX / window.innerWidth) * 2 - 1
      rt.tmy = (e.clientY / window.innerHeight) * 2 - 1
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onStepRef.current(1)
      if (e.key === 'ArrowLeft') onStepRef.current(-1)
    }

    const loop = (t: number) => {
      const root = rootRef.current
      const sec = t / 1000
      if (root) {
        let dx = (rt.rawX ?? 0) - (rt.lrX ?? rt.rawX ?? 0)
        let dy = (rt.rawY ?? 0) - (rt.lrY ?? rt.rawY ?? 0)
        rt.lrX = rt.rawX
        rt.lrY = rt.rawY
        if (touchOnly && !reduce) {
          const sy = window.scrollY
          const sdy = sy - (rt.lastSy ?? sy)
          rt.lastSy = sy
          if (t - lastMove > 400) {
            dy = -sdy * 1.2
            dx = Math.sin(sec * 1.1) * 6 * Math.min(1, Math.abs(sdy) / 8)
          }
          if (t - lastMove > 1400) {
            rt.tmx = Math.sin(sec * 0.5) * 0.6
            rt.tmy = Math.cos(sec * 0.35) * 0.4
          }
        }
        rt.tvx += (Math.max(-60, Math.min(60, dx)) - rt.tvx) * 0.12
        rt.tvy += (Math.max(-60, Math.min(60, dy)) - rt.tvy) * 0.12
        root.querySelectorAll<HTMLElement>('[data-trail]').forEach((el) => {
          const k = Number(el.dataset.trail)
          const x = -rt.tvx * k * 1.3 + k * 5 + Math.sin(sec * 1.5 + k) * 2
          const y = -rt.tvy * k * 1.3 + k * 3
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
        })

        const hera = heraRef.current
        if (hera) {
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

        const parada = paradaRef.current
        if (parada) {
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
      }
      rt.mx += (rt.tmx - rt.mx) * 0.06
      rt.my += (rt.tmy - rt.my) * 0.06
      raf = requestAnimationFrame(loop)
    }

    addEventListener('pointermove', onMove)
    addEventListener('pointerup', release)
    // O navegador cancela o gesto ao assumir a rolagem; sem isso o pôster ficaria preso ao dedo.
    addEventListener('pointercancel', release)
    addEventListener('keydown', onKey)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(flyTimer)
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', release)
      removeEventListener('pointercancel', release)
      removeEventListener('keydown', onKey)
    }
  }, [heraRef, paradaRef, rootRef])

  return { onCardPointerDown }
}
