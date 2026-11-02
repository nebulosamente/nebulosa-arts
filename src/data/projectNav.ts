import type { SiteId } from '../lib/links'

export const PROJECT_NAV_COPY = {
  back: '← Nebulosa',
  group: 'Projetos',
} as const

export const PROJECT_NAV: readonly { id: SiteId; t: string }[] = [
  { id: '3d', t: '01  3D' },
  { id: 'colagem', t: '02  Colagem' },
  { id: 'micanga', t: '03  Editorial' },
]
