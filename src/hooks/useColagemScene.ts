import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { COL_STACK_TRANSITION } from '../lib/cardStack'
import { applyHera } from '../lib/colagemScene/hera'
import { applyParada } from '../lib/colagemScene/parada'
import { applyTrail } from '../lib/colagemScene/trail'
import type { SceneRuntime } from '../lib/colagemScene/types'

type ColagemSceneRefs = {
  rootRef: RefObject<HTMLElement | null>
  paradaRef: RefObject<HTMLElement | null>
  heraRef: RefObject<HTMLElement | null>
  onStep: (delta: number) => void
  onThrown: (index: number) => void
}

export function useColagemScene({ rootRef, paradaRef, heraRef, onStep, onThrown }: ColagemSceneRefs) {
  const onStepRef = useRef(onStep)
  const onThrownRef = useRef(onThrown)
  onStepRef.current = onStep
  onThrownRef.current = onThrown

  const runtime = useRef<SceneRuntime>({
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
        applyTrail(root, rt, sec)

        const hera = heraRef.current
        if (hera) applyHera(hera, rt, sec)

        const parada = paradaRef.current
        if (parada) applyParada(parada, rt)
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
