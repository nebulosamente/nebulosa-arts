import type { CSSProperties } from 'react'
import { PROJECT_NAV, PROJECT_NAV_COPY } from '../../data/projectNav'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { isPlainLeftClick, siteUrl, type Navigate, type SiteId } from '../../lib/links'

type ProjectNavProps = {
  current: SiteId
  onNavigate: Navigate
}

/** Vidro escuro compartilhado pelo botão de voltar e pelo grupo de projetos. */
const GLASS: CSSProperties = {
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

const BACK_STYLE: CSSProperties = {
  ...GLASS,
  padding: '10px 16px',
  borderRadius: 999,
  background: 'rgba(7,6,10,.7)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(244,242,248,.35)',
  fontWeight: 700,
  fontSize: 15,
}

const GROUP_STYLE: CSSProperties = {
  ...GLASS,
  padding: '8px 8px 8px 16px',
  borderRadius: 999,
  background: 'rgba(7,6,10,.7)',
  backdropFilter: 'blur(14px)',
  border: '1px solid rgba(244,242,248,.35)',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 11,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

const LABEL_STYLE: CSSProperties = { opacity: 0.7 }

/** Barra fixa no topo: volta para a home e alterna entre os três projetos. */
export function ProjectNav({ current, onNavigate }: ProjectNavProps) {
  const hidden = useHideOnScroll()
  return (
    <nav
      aria-label="Projetos"
      className="pnav"
      data-hidden={hidden ? 'true' : undefined}
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        pointerEvents: 'none',
      }}
    >
      <a
        href={siteUrl('home')}
        className="pnav-back"
        onClick={(e) => {
          if (!isPlainLeftClick(e)) return
          e.preventDefault()
          onNavigate('home')
        }}
        style={BACK_STYLE}
      >
        {PROJECT_NAV_COPY.back}
      </a>
      <div className="pnav-group" style={GROUP_STYLE}>
        <span className="pnav-label" style={LABEL_STYLE}>
          {PROJECT_NAV_COPY.group}
        </span>
        {PROJECT_NAV.map((item) => {
          const active = item.id === current
          return (
            <a
              key={item.id}
              className="pill"
              href={siteUrl(item.id)}
              aria-current={active ? 'page' : undefined}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return
                e.preventDefault()
                onNavigate(item.id)
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                background: active ? '#3DE877' : 'transparent',
                color: active ? '#07060A' : '#F4F2F8',
              }}
            >
              {item.t}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
