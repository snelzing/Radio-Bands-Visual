export const FULL_MIN_FREQ = 0.003
export const FULL_MAX_FREQ = 300000

export function logScale(freq: number, minFreq: number, maxFreq: number, width: number): number {
  const lmin = Math.log10(minFreq)
  const lmax = Math.log10(maxFreq)
  const lfreq = Math.log10(Math.max(freq, minFreq))
  return ((lfreq - lmin) / (lmax - lmin)) * width
}

export function freqFromPos(x: number, minFreq: number, maxFreq: number, width: number): number {
  const lmin = Math.log10(minFreq)
  const lmax = Math.log10(maxFreq)
  return Math.pow(10, lmin + (x / width) * (lmax - lmin))
}

export function formatFreq(freq: number): string {
  if (freq >= 1000) return `${(freq / 1000).toFixed(1)} GHz`
  if (freq >= 1) return `${freq.toFixed(2)} MHz`
  return `${(freq * 1000).toFixed(1)} kHz`
}

export function formatFreqShort(freq: number): string {
  if (freq >= 1000) return `${(freq / 1000).toFixed(1)} GHz`
  if (freq >= 1) return `${freq.toFixed(2)} MHz`
  return `${(freq * 1000).toFixed(0)} kHz`
}

export function generateTickMarks(minFreq: number, maxFreq: number): number[] {
  const ticks: number[] = []
  const lmin = Math.floor(Math.log10(minFreq))
  const lmax = Math.ceil(Math.log10(maxFreq))

  for (let exp = lmin; exp <= lmax; exp++) {
    const base = Math.pow(10, exp)
    if (base >= minFreq && base <= maxFreq) ticks.push(base)
    for (let m = 2; m <= 9; m++) {
      const tick = m * base
      if (tick >= minFreq && tick <= maxFreq) ticks.push(tick)
    }
  }
  return ticks
}
