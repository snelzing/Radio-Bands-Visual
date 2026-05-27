import type { SpectrumSection } from '../data/bands'
import './ZoomControls.css'

interface ZoomControlsProps {
  section: SpectrumSection | null
  onZoomOut: () => void
}

export default function ZoomControls({
  section,
  onZoomOut,
}: ZoomControlsProps) {
  return (
    <div className="zoom-controls">
      <span
        className={`zoom-step ${!section ? 'active' : ''}`}
        onClick={onZoomOut}
      >
        Full Spectrum
      </span>
      {section && (
        <>
          <span className="zoom-separator">›</span>
          <span className="zoom-step active">{section.name}</span>
        </>
      )}
    </div>
  )
}
