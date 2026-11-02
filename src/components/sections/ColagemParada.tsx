import type { CSSProperties, RefObject } from 'react'
import { COL_STILLS, COLAGEM_COPY } from '../../data/colagem'
import { ImageSlot } from '../ui/ImageSlot'

type ColagemParadaProps = {
  paradaRef: RefObject<HTMLElement | null>
}

const side: CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

export function ColagemParada({ paradaRef }: ColagemParadaProps) {
  return (
    <section
      ref={paradaRef}
      aria-label="Colagem · A Parada é o Amor"
      className="parada-section"
      style={{ position: 'relative', height: '250vh', background: '#F2EEE8', color: '#07060A' }}
    >
      <div
        className="parada-stage"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <div
          data-parada-sun="1"
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 'min(120vh, 110vw)',
            aspectRatio: '1/1',
            margin: 'calc(min(120vh, 110vw) / -2) 0 0 calc(min(120vh, 110vw) / -2)',
            borderRadius: '50%',
            background: '#F4FF7A',
            willChange: 'transform',
          }}
        />
        <div
          data-parada-l="1"
          className="parada-l"
          style={{
            position: 'absolute',
            left: '4vw',
            top: '50%',
            maxWidth: 'min(30vw, 380px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 3,
          }}
        >
          <span style={side}>{COLAGEM_COPY.paradaKicker}</span>
          <span
            style={{
              fontWeight: 800,
              fontSize: 'clamp(40px, 5.4vw, 92px)',
              lineHeight: 0.84,
              letterSpacing: '-0.05em',
              fontVariationSettings: "'wdth' 75, 'opsz' 96",
            }}
          >
            {COLAGEM_COPY.paradaTitleA}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
              }}
            >
              {COLAGEM_COPY.paradaTitleEm}
            </span>
            {COLAGEM_COPY.paradaTitleB}
          </span>
        </div>
        <div
          data-parada-frame="1"
          className="parada-frame"
          style={{
            position: 'relative',
            zIndex: 2,
            height: '84vh',
            aspectRatio: '3/4',
            maxWidth: '88vw',
            willChange: 'transform, clip-path',
            boxShadow: '0 40px 80px rgba(7,6,10,.25)',
          }}
        >
          <ImageSlot
            id="col-parada"
            src={COL_STILLS.parada}
            alt={COLAGEM_COPY.paradaAlt}
            placeholder={COLAGEM_COPY.paradaAlt}
            loading="lazy"
            fetchPriority="low"
          />
        </div>
        <p
          data-parada-r="1"
          className="parada-r"
          style={{
            position: 'absolute',
            right: '4vw',
            bottom: '12vh',
            margin: 0,
            maxWidth: 'min(28vw, 340px)',
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(20px, 1.8vw, 26px)',
            lineHeight: 1.2,
            zIndex: 3,
            textWrap: 'pretty',
          }}
        >
          {COLAGEM_COPY.paradaBody}
        </p>
      </div>
    </section>
  )
}
