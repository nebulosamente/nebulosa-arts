import { PROJECT_NAV, PROJECT_NAV_COPY } from '../../data/projectNav'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { isPlainLeftClick, siteUrl, type Navigate, type SiteId } from '../../lib/links'

type ProjectNavProps = {
  current: SiteId
  onNavigate: Navigate
  /** `botanical`: vidro claro da direção de arte do 3D. Sem isso, a barra escura original das outras páginas. */
  tone?: 'default' | 'botanical'
}

export function ProjectNav({ current, onNavigate, tone = 'default' }: ProjectNavProps) {
  const hidden = useHideOnScroll()
  const botanical = tone === 'botanical'
  return (
    <nav
      aria-label="Projetos"
      className={botanical ? 'pnav pnav--bt' : 'pnav'}
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
        style={
          botanical
            ? { pointerEvents: 'auto' }
            : {
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 999,
                background: 'rgba(7,6,10,.7)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(244,242,248,.35)',
                fontWeight: 700,
                fontSize: 15,
              }
        }
      >
        {PROJECT_NAV_COPY.back}
      </a>
      <div
        className="pnav-group"
        style={
          botanical
            ? { pointerEvents: 'auto' }
            : {
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
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
        }
      >
        <span className="pnav-label" style={botanical ? undefined : { opacity: 0.7 }}>
          {PROJECT_NAV_COPY.group}
        </span>
        {PROJECT_NAV.map((item) => {
          const active = item.id === current
          const [num, ...rest] = item.t.split(/\s+/)
          return (
            <a
              key={item.id}
              className="pill"
              href={siteUrl(item.id)}
              aria-current={active ? 'page' : undefined}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return
                e.preventDefault()
                if (!item.ready) return
                onNavigate(item.id)
              }}
              style={
                botanical
                  ? undefined
                  : {
                      padding: '6px 12px',
                      borderRadius: 999,
                      background: active ? '#3DE877' : 'transparent',
                      color: active ? '#07060A' : '#F4F2F8',
                    }
              }
            >
              {botanical ? (
                <>
                  <span className="n">{num}</span>
                  {rest.join(' ')}
                </>
              ) : (
                item.t
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
