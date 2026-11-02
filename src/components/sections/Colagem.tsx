import { useCallback, useEffect, useRef, useState } from 'react'
import { COL_CARDS } from '../../data/colagem'
import { useColagemScene } from '../../hooks/useColagemScene'
import { ColagemAbertura } from './ColagemAbertura'
import { ColagemIdentidade } from './ColagemIdentidade'
import { ColagemParada } from './ColagemParada'
import { ColagemSerie } from './ColagemSerie'

export function Colagem() {
  const rootRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const paradaRef = useRef<HTMLElement>(null)
  const heraRef = useRef<HTMLElement>(null)
  const [col, setCol] = useState(0)
  const [snapIndex, setSnapIndex] = useState<number | null>(null)
  const count = COL_CARDS.length

  const step = useCallback(
    (delta: number) => {
      setCol((current) => (current + delta + count) % count)
    },
    [count],
  )

  const thrown = useCallback(
    (index: number) => {
      setSnapIndex(index)
      setCol((current) => (current + 1) % count)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSnapIndex(null))
      })
    },
    [count],
  )

  const { onCardPointerDown } = useColagemScene({
    rootRef,
    paradaRef,
    heraRef,
    onStep: step,
    onThrown: thrown,
  })

  const pick = useCallback((index: number) => {
    setCol(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    // Na moldura da home a rolagem é nossa; o smooth da página brigaria com ela.
    if (new URLSearchParams(window.location.search).get('preview') === '1') return
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'smooth'
    return () => {
      html.style.scrollBehavior = prev
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="colagem-page"
      style={{
        position: 'relative',
        overflowX: 'clip',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        background: '#07060A',
        color: '#F4F2F8',
      }}
    >
      <main>
        <ColagemAbertura
          col={col}
          snapIndex={snapIndex}
          stackRef={stackRef}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onCardPointerDown={onCardPointerDown}
        />
        <ColagemParada paradaRef={paradaRef} />
        <ColagemIdentidade heraRef={heraRef} />
        <ColagemSerie onPick={pick} />
      </main>
    </div>
  )
}
