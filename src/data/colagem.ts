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

export const COL_STACK_TRANSITION = 'transform .65s cubic-bezier(.2,.8,.2,1), opacity .4s'

export function colStackTransform(k: number) {
  if (k === 0) return 'translate(-50%,-50%) rotate(0deg)'
  const alt = k % 2 ? 1 : -1
  return `translate(-50%,-50%) translate(${alt * k * 26}px, ${-k * 14}px) rotate(${alt * k * 3.5}deg) scale(${1 - k * 0.05})`
}

export const COLAGEM_COPY = {
  kicker: 'Projeto 02 / Colagem digital · Série',
  title: 'Nova Hera',
  titleEm: 'skategirls',
  lead: 'Hera significa “heroína”, “guerreira”  representando todas nós.',
  swipeHint: 'ou jogue o pôster para o lado',
  prev: 'Pôster anterior',
  next: 'Próximo pôster',
  paradaKicker: 'Peça única · 2024',
  paradaTitleA: 'A Parada ',
  paradaTitleEm: 'é o',
  paradaTitleB: ' Amor',
  paradaBody:
    'Um ambulante no Ibirapuera, um semáforo que pisca um coração. A colagem pede para a cidade desacelerar.',
  paradaAlt: 'A Parada é o Amor',
  heraKicker: 'Identidade · Pôster & sticker',
  posterAlt: 'Pôster Nova Hera Skategirls',
  stickerHandle: '@mariask8tera',
  stickerKind: 'Sticker · ilustração',
  stickerAlt: 'Sticker @mariask8tera',
  ring: 'RESPIRA ✶ RESISTA ✶ RESPEITA ✶ RESPIRA ✶ RESISTA ✶ RESPEITA ✶',
  seriesIndex: '(02) A série completa',
  seriesTitleA: 'A série ',
  seriesTitleB: 'completa.',
} as const
