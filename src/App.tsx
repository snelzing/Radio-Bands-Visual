import { useState, useMemo, useCallback } from 'react'
import type { SpectrumBand } from './data/bands'
import { sections, findSectionByBand } from './data/bands'
import { FULL_MIN_FREQ, FULL_MAX_FREQ } from './utils/scale'
import SpectrumChart from './components/SpectrumChart'
import BandDetail from './components/BandDetail'
import ZoomControls from './components/ZoomControls'
import SearchBar from './components/SearchBar'
import './App.css'

const SECTION_COLORS: Record<string, string> = {
  vlf: '#4d9de0',
  lf: '#51cf66',
  mf: '#ff6b35',
  hf: '#e84855',
  vhf: '#b07dff',
  uhf: '#f0a030',
  shf: '#00d4aa',
  ehf: '#f06595',
}

function getSectionBand(section: (typeof sections)[0]): SpectrumBand {
  return {
    id: `section-${section.id}`,
    name: section.shortName,
    startFreq: section.startFreq,
    endFreq: section.endFreq,
    category: 'other',
    description: section.description,
    uses: [],
    color: SECTION_COLORS[section.id] || '#666',
  }
}

export default function App() {
  const [zoomedSectionId, setZoomedSectionId] = useState<string | null>(null)
  const [selectedBandId, setSelectedBandId] = useState<string | null>(null)

  const zoomedSection = useMemo(
    () => sections.find((s) => s.id === zoomedSectionId) ?? null,
    [zoomedSectionId]
  )

  const minFreq = zoomedSection ? zoomedSection.startFreq : FULL_MIN_FREQ
  const maxFreq = zoomedSection ? zoomedSection.endFreq : FULL_MAX_FREQ

  const bands = useMemo(() => {
    if (zoomedSection) {
      return zoomedSection.bands
    }
    return sections.map(getSectionBand)
  }, [zoomedSection])

  const selectedBand = useMemo(() => {
    if (!selectedBandId) return null
    for (const s of sections) {
      const found = s.bands.find((b) => b.id === selectedBandId)
      if (found) return found
    }
    return null
  }, [selectedBandId])

  const handleBandClick = useCallback(
    (band: SpectrumBand) => {
      if (band.id.startsWith('section-')) {
        const sectionId = band.id.replace('section-', '')
        setZoomedSectionId(sectionId)
        setSelectedBandId(null)
      } else {
        setSelectedBandId((prev) => (prev === band.id ? null : band.id))
      }
    },
    []
  )

  const handleZoomOut = useCallback(() => {
    setZoomedSectionId(null)
    setSelectedBandId(null)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setSelectedBandId(null)
  }, [])

  const handleSearchSelect = useCallback((band: SpectrumBand) => {
    const section = findSectionByBand(band.id)
    if (section) {
      setZoomedSectionId(section.id)
      setSelectedBandId(band.id)
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <h1 className="app-title">Radio Waves</h1>
          <p className="app-subtitle">Spectrum Allocation Explorer</p>
        </div>
        <SearchBar onSelectBand={handleSearchSelect} />
      </header>

      <main className="app-main">
        <ZoomControls
          section={zoomedSection}
          onZoomOut={handleZoomOut}
        />

        <div className="chart-section">
          <SpectrumChart
            minFreq={minFreq}
            maxFreq={maxFreq}
            bands={bands}
            selectedBandId={selectedBandId ?? undefined}
            onBandClick={handleBandClick}
          />
        </div>

        {selectedBand && (
          <BandDetail band={selectedBand} onClose={handleCloseDetail} />
        )}
      </main>

      <footer className="app-footer">
        <span>Radio spectrum reference tool</span>
        <span className="footer-hint">
          Click a section to zoom in · Click a band for details
        </span>
      </footer>
    </div>
  )
}
