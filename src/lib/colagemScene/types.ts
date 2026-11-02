export type Drag = {
  el: HTMLDivElement
  index: number
  x: number
  y: number
  dx: number
  dy: number
  tf: string
}

/** Estado mutável da cena, lido e escrito a cada quadro (fora do React de propósito). */
export type SceneRuntime = {
  mx: number
  my: number
  tmx: number
  tmy: number
  rawX?: number
  rawY?: number
  lrX?: number
  lrY?: number
  lastSy?: number
  tvx: number
  tvy: number
  drag: Drag | null
}
