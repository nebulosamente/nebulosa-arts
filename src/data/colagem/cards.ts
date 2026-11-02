export type ColCard = {
  id: string
  handle: string
  bg: string
  ink: string
  n: string
  src: string
}

const MEDIA = '/media/colagem'

const rows: Array<[string, string, string, string]> = [
  ['melissa', '@melissa.moreiraa', '#FF9457', '#07060A'],
  ['lari', '@lari_.dsantos', '#F4F2EE', '#07060A'],
  ['ysabelly', '@ysabellyskate', '#F5D94A', '#07060A'],
  ['rita', '@ritatomazcorrea', '#EFEBDD', '#07060A'],
  ['sugger', '@sugger_astral', '#8C5BE0', '#F4F2F8'],
  ['lopesz', '@lopesz.skt', '#CC58A8', '#F4F2F8'],
]

export const COL_CARDS: ColCard[] = rows.map(([id, handle, bg, ink], i) => ({
  id,
  handle,
  bg,
  ink,
  n: String(i + 1).padStart(2, '0'),
  src: `${MEDIA}/${id}.png`,
}))

export const COL_STILLS = {
  parada: `${MEDIA}/a-parada-e-o-amor.jpeg`,
  poster: `${MEDIA}/poster-nova-hera.jpeg`,
  sticker: `${MEDIA}/sticker-mariask8tera.jpg`,
} as const
