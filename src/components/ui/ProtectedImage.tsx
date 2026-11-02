import { useEffect, useRef, type CSSProperties } from 'react'
import { loadProtectedBitmap, paintBitmap, type CeuAsset, type ImageAnchor, type ImageFit } from '../../lib/protectedImage'

type ProtectedImageProps = {
  asset: CeuAsset
  label: string
  fit?: ImageFit
  anchor?: ImageAnchor
  hd?: boolean
  style?: CSSProperties
}

export function ProtectedImage({ asset, label, fit = 'cover', anchor = 'center', hd = false, style }: ProtectedImageProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { WebkitMaskImage, maskImage, ...boxStyle } = style ?? {}

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    if (!box || !canvas) return
    let bitmap: ImageBitmap | null = null
    let alive = true

    const draw = () => {
      if (!bitmap) return
      const cssW = box.clientWidth
      const cssH = box.clientHeight
      if (cssW < 2 || cssH < 2) return
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, hd ? 2 : 1), 3)
      const width = Math.max(1, Math.round(cssW * dpr))
      const height = Math.max(1, Math.round(cssH * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      paintBitmap(ctx, bitmap, width, height, fit, anchor)
    }

    const observer = new ResizeObserver(draw)
    observer.observe(box)
    void loadProtectedBitmap(asset).then((next) => {
      if (!alive) return
      bitmap = next
      draw()
    })
    return () => {
      alive = false
      observer.disconnect()
    }
  }, [anchor, asset, fit, hd])

  return (
    <div
      ref={boxRef}
      data-protect
      role="img"
      aria-label={label}
      style={{ ...boxStyle, overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          WebkitMaskImage,
          maskImage,
        }}
      />
    </div>
  )
}
