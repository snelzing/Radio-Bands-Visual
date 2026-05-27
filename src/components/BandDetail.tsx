import type { SpectrumBand } from '../data/bands'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../data/bands'
import { formatFreq } from '../utils/scale'
import './BandDetail.css'

interface BandDetailProps {
  band: SpectrumBand
  onClose: () => void
}

export default function BandDetail({ band, onClose }: BandDetailProps) {
  const color = CATEGORY_COLORS[band.category]

  return (
    <div className="band-detail">
      <div className="band-detail-header">
        <h2 className="band-detail-title">{band.name}</h2>
        <button className="band-detail-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="band-detail-freq">
        {formatFreq(band.startFreq)} – {formatFreq(band.endFreq)}
      </div>
      <div
        className="band-detail-category"
        style={{
          background: `${color}22`,
          color: color,
          border: `1px solid ${color}44`,
        }}
      >
        {CATEGORY_LABELS[band.category] || band.category}
      </div>
      <div className="band-detail-desc">{band.description}</div>
      <div className="band-detail-uses-title">Common Uses</div>
      <ul className="band-detail-uses">
        {band.uses.map((use, i) => (
          <li key={i}>{use}</li>
        ))}
      </ul>
    </div>
  )
}
