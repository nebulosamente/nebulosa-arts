import type { CSSProperties, PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { COL_CARDS, COL_STACK_TRANSITION, COLAGEM_COPY, colStackTransform } from '../../data/colagem'
import { ImageSlot } from '../ui/ImageSlot'

type ColagemAberturaProps = {
  col: number
  snapIndex: number | null
  stackRef: RefObject<HTMLDivElement | null>
  onPrev: () => void
  onNext: () => void
  onCardPointerDown: (
    e: ReactPointerEvent<HTMLDivElement>,
    index: number,
    tf: string,
    active: boolean,
  ) => void
}

const arrow: CSSProperties = {
  cursor: 'pointer',
  width: 52,
  height: 52,
  borderRadius: '50%',
  fontSize: 20,
  transition: 'transform .25s',
}

export function ColagemAbertura({
  col,
  snapIndex,
  stackRef,
  onPrev,
  onNext,
  onCardPointerDown,
}: ColagemAberturaProps) {
  const count = COL_CARDS.length
  const current = COL_CARDS[col]
  const preview = new URLSearchParams(window.location.search).get('preview') === '1'

  return (
    <section
      aria-label="Colagem · Abertura"
      className="col-open"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: current.bg,
        color: current.ink,
        transition: 'background .8s, color .6s',
        overflow: 'hidden',
        padding: '110px 4vw 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: 40,
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {COLAGEM_COPY.kicker}
        </div>
        <h1
          style={{
            position: 'relative',
            margin: 0,
            fontWeight: 800,
            fontSize: 'clamp(64px, 9.5vw, 168px)',
            lineHeight: 0.82,
            letterSpacing: '-0.05em',
            fontVariationSettings: "'wdth' 75, 'opsz' 96",
          }}
        >
          <span
            data-trail="3"
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              color: '#F4FF7A',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}
          >
            {COLAGEM_COPY.title}
          </span>
          <span
            data-trail="2"
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              color: '#3DE877',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}
          >
            {COLAGEM_COPY.title}
          </span>
          <span
            data-trail="1"
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              color: '#8C52FF',
              whiteSpace: 'nowrap',
              willChange: 'transform',
            }}
          >
            {COLAGEM_COPY.title}
          </span>
          <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>{COLAGEM_COPY.title}</span>
          <br />
          <span
            style={{
              position: 'relative',
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            {COLAGEM_COPY.titleEm}
          </span>
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 460,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(21px, 1.9vw, 27px)',
            lineHeight: 1.2,
            textWrap: 'pretty',
          }}
        >
          {COLAGEM_COPY.lead}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <span
            style={{
              padding: '12px 22px 12px 18px',
              background: '#E9E2D0',
              color: '#07060A',
              transform: 'rotate(-2deg)',
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 500,
              clipPath: 'polygon(0 6%, 4% 0, 100% 3%, 97% 50%, 100% 96%, 3% 100%, 0 60%)',
              boxShadow: '0 6px 18px rgba(7,6,10,.15)',
            }}
          >
            {current.handle}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.08em',
            }}
          >
            {current.n} / {String(count).padStart(2, '0')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="colagem-arrow"
            aria-label={COLAGEM_COPY.prev}
            onClick={onPrev}
            style={{ ...arrow, border: `1.5px solid ${current.ink}`, background: 'transparent', color: current.ink }}
          >
            ←
          </button>
          <button
            type="button"
            className="colagem-arrow colagem-arrow--next"
            aria-label={COLAGEM_COPY.next}
            onClick={onNext}
            style={{ ...arrow, border: 0, background: current.ink, color: current.bg }}
          >
            →
          </button>
          <span
            style={{
              marginLeft: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            {COLAGEM_COPY.swipeHint}
          </span>
        </div>
      </div>
      <div ref={stackRef} className="col-stack" style={{ position: 'relative', zIndex: 2, height: 'min(80vh, 780px)', minHeight: 420 }}>
        {COL_CARDS.map((card, i) => {
          const k = (i - col + count) % count
          const tf = colStackTransform(k)
          const active = k === 0
          return (
            <div
              key={card.id}
              data-colcard={i}
              onPointerDown={(e) => onCardPointerDown(e, i, tf, active)}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                height: '100%',
                aspectRatio: '1414/2000',
                maxWidth: '100%',
                transform: tf,
                zIndex: 50 - k,
                opacity: k > 3 ? 0 : 1,
                cursor: active ? 'grab' : 'default',
                touchAction: 'none',
                userSelect: 'none',
                boxShadow: '0 30px 60px rgba(7,6,10,.28)',
                background: '#E9E2D0',
                transition: snapIndex === i ? 'none' : COL_STACK_TRANSITION,
              }}
            >
              {!(preview && k > 2) && (
                <ImageSlot
                  id={`col-stack-${card.id}`}
                  src={card.src}
                  alt={card.handle}
                  placeholder={card.handle}
                  loading={k === 0 ? 'eager' : 'lazy'}
                  fetchPriority={k === 0 ? 'high' : 'low'}
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
