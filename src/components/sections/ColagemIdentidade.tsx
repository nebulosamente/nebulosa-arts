import type { RefObject } from 'react'
import { COL_STILLS } from '../../data/colagem/cards'
import { COLAGEM_COPY } from '../../data/colagem/copy'
import { ImageSlot } from '../ui/ImageSlot'

type ColagemIdentidadeProps = {
  heraRef: RefObject<HTMLElement | null>
}

export function ColagemIdentidade({ heraRef }: ColagemIdentidadeProps) {
  return (
    <section
      ref={heraRef}
      aria-label="Colagem · Identidade"
      className="hera-section"
      style={{ position: 'relative', height: '340vh' }}
    >
      <div
        data-hera-bg="1"
        className="hera-stage"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundImage: 'repeating-conic-gradient(#C3A6EE 0 25%, #2B8FD6 0 50%)',
          backgroundSize: '132px 132px',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(7,6,10,.45) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '4vw',
            top: 96,
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            color: '#07060A',
          }}
        >
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '7px 12px',
              background: '#F4F2F8',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {COLAGEM_COPY.heraKicker}
          </span>
        </div>
        <div
          data-hera-ring="1"
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 'min(104vh, 96vw)',
            aspectRatio: '1/1',
            zIndex: 1,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <defs>
              <path id="heraRing" d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0" />
            </defs>
            <text
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 30,
                letterSpacing: 2,
                fill: '#F4FF7A',
                stroke: '#4B1580',
                strokeWidth: 5,
                paintOrder: 'stroke',
                strokeLinejoin: 'round',
              }}
            >
              <textPath href="#heraRing">{COLAGEM_COPY.ring}</textPath>
            </text>
          </svg>
        </div>
        <div
          data-hera-poster="1"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            height: 'min(74vh, 120vw)',
            aspectRatio: '1660/2213',
            zIndex: 2,
            boxShadow: '0 40px 90px rgba(7,6,10,.45)',
            willChange: 'transform',
          }}
        >
          <ImageSlot
            id="col-poster"
            src={COL_STILLS.poster}
            alt={COLAGEM_COPY.posterAlt}
            placeholder={COLAGEM_COPY.posterAlt}
            loading="lazy"
            fetchPriority="low"
          />
        </div>
        <div
          data-hera-sticker="1"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 'min(86vh, 92vw)',
            aspectRatio: '1/1',
            zIndex: 6,
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 40px 60px rgba(7,6,10,.45))',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '10px solid #F4F2F8',
              borderRadius: 28,
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <ImageSlot
              id="col-sticker"
              src={COL_STILLS.sticker}
              alt={COLAGEM_COPY.stickerAlt}
              placeholder={COLAGEM_COPY.stickerAlt}
              loading="lazy"
              fetchPriority="low"
            />
          </div>
          <div
            data-hera-peel="1"
            aria-hidden
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '22%',
              aspectRatio: '1/1',
              borderBottomRightRadius: 28,
              background: 'linear-gradient(135deg, transparent 50%, #E9E2D0 50%, #FFFFFF 75%, #CFC8B8)',
              boxShadow: '-6px -6px 16px rgba(7,6,10,.25)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              willChange: 'transform',
            }}
          />
        </div>
        <div
          data-hera-caption="1"
          style={{
            position: 'absolute',
            left: '4vw',
            bottom: '6vh',
            zIndex: 7,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '8px 14px',
              background: '#E9E2D0',
              color: '#07060A',
              fontSize: 22,
              fontWeight: 500,
              transform: 'rotate(-2deg)',
            }}
          >
            {COLAGEM_COPY.stickerHandle}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F4F2F8',
            }}
          >
            {COLAGEM_COPY.stickerKind}
          </span>
        </div>
      </div>
    </section>
  )
}
