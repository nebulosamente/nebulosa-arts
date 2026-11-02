import type { CSSProperties } from 'react'
import type { CeuAsset, ImageFit } from '../../lib/protectedImage'
import { ProtectedImage } from './ProtectedImage'

export type SlotImage = string | CeuAsset

type ImageSlotProps = {
  id: string
  placeholder: string
  src?: SlotImage
  alt?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  /** `cover` preenche a moldura cortando as bordas; `contain` mostra a imagem inteira. */
  fit?: ImageFit
  style?: CSSProperties
  className?: string
}

export function ImageSlot({ id, placeholder, src, alt, loading, fetchPriority, fit = 'cover', style, className }: ImageSlotProps) {
  if (src && typeof src !== 'string') {
    return (
      <ProtectedImage
        asset={src}
        label={alt ?? placeholder}
        fit={fit}
        style={{ width: '100%', height: '100%', ...style }}
      />
    )
  }

  if (src) {
    return (
      <img
        id={id}
        src={src}
        alt={alt ?? placeholder}
        loading={loading}
        fetchPriority={fetchPriority}
        draggable={false}
        className={className}
        style={{ width: '100%', height: '100%', objectFit: fit, display: 'block', ...style }}
      />
    )
  }

  return (
    <div
      id={id}
      role="img"
      aria-label={placeholder}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at 30% 25%, rgba(140,82,255,.45), transparent 55%), radial-gradient(circle at 75% 70%, rgba(61,232,119,.28), transparent 50%), linear-gradient(160deg, #1a1230, #07060A 70%)',
        ...style,
      }}
    >
      <span
        style={{
          maxWidth: '80%',
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          opacity: 0.72,
          padding: '12px 16px',
          border: '1px dashed rgba(244,242,248,.35)',
          borderRadius: 999,
        }}
      >
        {placeholder}
      </span>
    </div>
  )
}
