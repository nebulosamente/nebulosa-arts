export const COL_STACK_TRANSITION = 'transform .65s cubic-bezier(.2,.8,.2,1), opacity .4s'

export function colStackTransform(k: number) {
  if (k === 0) return 'translate(-50%,-50%) rotate(0deg)'
  const alt = k % 2 ? 1 : -1
  return `translate(-50%,-50%) translate(${alt * k * 26}px, ${-k * 14}px) rotate(${alt * k * 3.5}deg) scale(${1 - k * 0.05})`
}
