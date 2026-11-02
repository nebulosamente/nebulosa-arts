import { COL_CARDS } from '../../data/colagem/cards'
import { COLAGEM_COPY } from '../../data/colagem/copy'
import { isPlainLeftClick, siteUrl } from '../../lib/links'
import { ImageSlot } from '../ui/ImageSlot'

type ColagemSerieProps = {
  onPick: (index: number) => void
  onBack: () => void
  onNextProject: () => void
}

const footerLink = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
} as const

export function ColagemSerie({ onPick, onBack, onNextProject }: ColagemSerieProps) {
  return (
    <section
      aria-label="Colagem · Série"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 9vw, 140px) 4vw',
        background: '#07060A',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 36,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#3DE877',
              marginBottom: 12,
            }}
          >
            {COLAGEM_COPY.seriesIndex}
          </div>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: 'clamp(48px, 6vw, 100px)',
              lineHeight: 0.86,
              letterSpacing: '-0.05em',
              fontVariationSettings: "'wdth' 75, 'opsz' 96",
            }}
          >
            {COLAGEM_COPY.seriesTitleA}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                color: '#F4FF7A',
              }}
            >
              {COLAGEM_COPY.seriesTitleB}
            </span>
          </h2>
        </div>
      </div>
      <div
        className="colagem-series"
        style={{
          position: 'relative',
          display: 'flex',
          gap: 'clamp(6px, .8vw, 12px)',
          height: 'min(78vh, 760px)',
          minHeight: 420,
        }}
      >
        {COL_CARDS.map((card, i) => (
          <button
            key={card.id}
            type="button"
            className="colagem-pane"
            onClick={() => onPick(i)}
            aria-label={`${card.n} ${card.handle}`}
            style={{ background: card.bg }}
          >
            <ImageSlot
              id={`col-serie-${card.id}`}
              src={card.src}
              alt={card.handle}
              placeholder={card.handle}
              loading="lazy"
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                height: '100%',
                width: 'auto',
                maxWidth: 'none',
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 14,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.06em',
                color: card.ink,
                pointerEvents: 'none',
              }}
            >
              <span>{card.n}</span>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 14,
                bottom: 14,
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                padding: '12px 8px',
                background: '#E9E2D0',
                color: '#07060A',
                fontSize: 15,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {card.handle}
            </div>
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          marginTop: 80,
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          paddingTop: 24,
          borderTop: '1px solid rgba(244,242,248,.25)',
          ...footerLink,
        }}
      >
        <a
          href={siteUrl('home')}
          onClick={(e) => {
            if (!isPlainLeftClick(e)) return
            e.preventDefault()
            onBack()
          }}
        >
          {COLAGEM_COPY.back}
        </a>
        <a
          href={siteUrl('3d')}
          style={footerLink}
          onClick={(e) => {
            if (!isPlainLeftClick(e)) return
            e.preventDefault()
            onNextProject()
          }}
        >
          {COLAGEM_COPY.nextProject}
        </a>
      </div>
    </section>
  )
}
