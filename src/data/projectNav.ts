import type { SiteId } from '../lib/links'

export const PROJECT_NAV_COPY = {
  back: '← Nebulosa',
  group: 'Projetos',
} as const

export const PROJECT_NAV: readonly { id: SiteId; t: string; ready: boolean }[] = [
  { id: '3d', t: '01  3D', ready: true },
  { id: 'colagem', t: '02  Colagem', ready: true },
  { id: 'micanga', t: '03  Editorial', ready: true },
]
