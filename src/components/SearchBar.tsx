import { useState, useRef, useEffect, useMemo } from 'react'
import type { SpectrumBand } from '../data/bands'
import { getAllBands, findSectionByBand } from '../data/bands'
import { formatFreqShort } from '../utils/scale'
import { CATEGORY_LABELS } from '../data/bands'
import './SearchBar.css'

interface SearchBarProps {
  onSelectBand: (band: SpectrumBand) => void
}

export default function SearchBar({ onSelectBand }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const all = getAllBands()
    return all
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      )
      .slice(0, 15)
  }, [query])

  function handleSelect(band: SpectrumBand) {
    setQuery('')
    setFocused(false)
    onSelectBand(band)
  }

  const showResults = focused && query.trim().length > 0

  return (
    <div className="search-bar-wrapper" ref={wrapperRef}>
      <span className="search-icon">⌕</span>
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search bands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
      />
      {showResults && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="no-results">No bands found</div>
          ) : (
            results.map((band) => {
              const section = findSectionByBand(band.id)
              return (
                <div
                  key={band.id}
                  className="search-result-item"
                  onClick={() => handleSelect(band)}
                >
                  <div className="search-result-name">{band.name}</div>
                  <div className="search-result-freq">
                    {formatFreqShort(band.startFreq)} –{' '}
                    {formatFreqShort(band.endFreq)}
                  </div>
                  {section && (
                    <div className="search-result-section">
                      {section.name} · {CATEGORY_LABELS[band.category]}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
