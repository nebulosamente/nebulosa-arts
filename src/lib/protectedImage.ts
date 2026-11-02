import { useEffect, useState } from 'react'
import { CEU_IMAGE_KEY } from './ceuImageKey'

export type CeuAsset = {
  url: string
  mime: 'image/png' | 'image/jpeg'
  /** Export estático (file://): imagem normal, sem embaralhar. `fetch` não funciona fora de http. */
  raw?: boolean
}

function loadRawBitmap(url: string) {
  return new Promise<ImageBitmap>((resolve, reject) => {
    const img = new Image()
    img.onload = () => createImageBitmap(img).then(resolve, reject)
    img.onerror = () => reject(new Error('imagem'))
    img.src = url
  })
}

export type ImageFit = 'cover' | 'contain'
export type ImageAnchor = 'center' | 'bottom'

const cache = new Map<string, Promise<ImageBitmap>>()

export function loadProtectedBitmap(asset: CeuAsset): Promise<ImageBitmap> {
  const hit = cache.get(asset.url)
  if (hit) return hit
  const job = (async () => {
    if (asset.raw) return loadRawBitmap(asset.url)
    const response = await fetch(asset.url)
    if (!response.ok) throw new Error('imagem')
    const bytes = new Uint8Array(await response.arrayBuffer())
    const key = CEU_IMAGE_KEY
    for (let i = 0; i < bytes.length; i++) bytes[i] ^= key[i % key.length]
    return createImageBitmap(new Blob([bytes], { type: asset.mime }))
  })().catch((error: unknown) => {
    cache.delete(asset.url)
    throw error
  })
  cache.set(asset.url, job)
  return job
}

export function useProtectedBitmap(asset: CeuAsset | undefined) {
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null)

  useEffect(() => {
    if (!asset) return
    let alive = true
    void loadProtectedBitmap(asset).then((next) => {
      if (alive) setBitmap(next)
    })
    return () => {
      alive = false
    }
  }, [asset])

  return bitmap
}

function downsample(bitmap: ImageBitmap, dw: number, dh: number): CanvasImageSource {
  const tw = Math.max(1, Math.round(dw))
  const th = Math.max(1, Math.round(dh))
  if (bitmap.width <= tw * 2 && bitmap.height <= th * 2) return bitmap
  let current: CanvasImageSource = bitmap
  let cw = bitmap.width
  let ch = bitmap.height
  while (cw > tw * 2 || ch > th * 2) {
    cw = Math.max(tw, Math.round(cw / 2))
    ch = Math.max(th, Math.round(ch / 2))
    const next = document.createElement('canvas')
    next.width = cw
    next.height = ch
    const ctx = next.getContext('2d')
    if (!ctx) return current
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(current, 0, 0, cw, ch)
    current = next
  }
  return current
}

export function paintBitmap(
  ctx: CanvasRenderingContext2D,
  bitmap: ImageBitmap,
  boxW: number,
  boxH: number,
  fit: ImageFit,
  anchor: ImageAnchor,
) {
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.clearRect(0, 0, boxW, boxH)
  const placed = imageFit(bitmap.width, bitmap.height, boxW, boxH, fit, anchor)
  const source = downsample(bitmap, placed.dw, placed.dh)
  ctx.drawImage(source, placed.dx, placed.dy, placed.dw, placed.dh)
}

export function imageFit(
  srcW: number,
  srcH: number,
  boxW: number,
  boxH: number,
  fit: ImageFit,
  anchor: ImageAnchor,
) {
  const scale =
    fit === 'cover' ? Math.max(boxW / srcW, boxH / srcH) : Math.min(boxW / srcW, boxH / srcH)
  const dw = srcW * scale
  const dh = srcH * scale
  return {
    dx: (boxW - dw) / 2,
    dy: anchor === 'bottom' ? boxH - dh : (boxH - dh) / 2,
    dw,
    dh,
    scale,
  }
}
