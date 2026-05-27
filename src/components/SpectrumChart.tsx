import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import type { SpectrumBand } from '../data/bands'
import { logScale, formatFreqShort, generateTickMarks } from '../utils/scale'
import { CATEGORY_COLORS } from '../data/bands'
import './SpectrumChart.css'

const LANE_HEIGHT = 36
const LANE_GAP = 5
const LEFT_MARGIN = 180
const RIGHT_MARGIN = 36
const TOP_MARGIN = 10
const BOTTOM_MARGIN = 42
const MIN_BAND_WIDTH = 6

interface SpectrumChartProps {
  minFreq: number
  maxFreq: number
  bands: SpectrumBand[]
  selectedBandId?: string
  onBandClick: (band: SpectrumBand) => void
}

function assignLanes(bands: SpectrumBand[]): Map<string, number> {
  const sorted = [...bands].sort((a, b) => a.startFreq - b.startFreq)
  const lanes: { endFreq: number }[] = []
  const assignment = new Map<string, number>()

  for (const band of sorted) {
    let placed = false
    for (let i = 0; i < lanes.length; i++) {
      if (band.startFreq >= lanes[i].endFreq - 1e-9) {
        lanes[i].endFreq = band.endFreq
        assignment.set(band.id, i)
        placed = true
        break
      }
    }
    if (!placed) {
      assignment.set(band.id, lanes.length)
      lanes.push({ endFreq: band.endFreq })
    }
  }

  return assignment
}

export default function SpectrumChart({
  minFreq,
  maxFreq,
  bands,
  selectedBandId,
  onBandClick,
}: SpectrumChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(900)
  const [tooltip, setTooltip] = useState<{
    band: SpectrumBand
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width - LEFT_MARGIN - RIGHT_MARGIN
        setChartWidth(Math.max(w, 600))
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const laneMap = useMemo(() => assignLanes(bands), [bands])
  const numLanes = useMemo(() => {
    let max = 0
    for (const v of laneMap.values()) {
      if (v > max) max = v
    }
    return max + 1
  }, [laneMap])

  const totalHeight =
    TOP_MARGIN + numLanes * (LANE_HEIGHT + LANE_GAP) + BOTTOM_MARGIN

  const ticks = useMemo(
    () => generateTickMarks(minFreq, maxFreq),
    [minFreq, maxFreq]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGRectElement>, band: SpectrumBand) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setTooltip({ band, x, y })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    setTooltip(null)
  }, [])

  const totalWidth = chartWidth + LEFT_MARGIN + RIGHT_MARGIN

  return (
    <div className="spectrum-chart-container" ref={containerRef}>
      {bands.length === 0 ? (
        <div className="no-bands-msg">
          No frequency allocations found in this range.
        </div>
      ) : (
        <svg
          width="100%"
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          style={{ minWidth: `${totalWidth}px` }}
        >
          {/* Grid lines */}
          {ticks.map((tick) => {
            const x =
              LEFT_MARGIN + logScale(tick, minFreq, maxFreq, chartWidth)
            const isMajor =
              tick >= 1
                ? Math.log10(tick) % 1 === 0
                : tick === Math.pow(10, Math.round(Math.log10(tick)))
            return (
              <line
                key={`grid-${tick}`}
                x1={x}
                y1={TOP_MARGIN}
                x2={x}
                y2={TOP_MARGIN + numLanes * (LANE_HEIGHT + LANE_GAP)}
                stroke={isMajor ? '#333' : '#222'}
                strokeWidth={isMajor ? 1 : 0.5}
              />
            )
          })}

          {/* Bands */}
          {bands.map((band) => {
            const lane = laneMap.get(band.id) ?? 0
            const x1 =
              LEFT_MARGIN +
              logScale(band.startFreq, minFreq, maxFreq, chartWidth)
            const x2 =
              LEFT_MARGIN +
              logScale(band.endFreq, minFreq, maxFreq, chartWidth)
            const y = TOP_MARGIN + lane * (LANE_HEIGHT + LANE_GAP)
            const color = band.color || CATEGORY_COLORS[band.category] || '#666'
            const isSelected = band.id === selectedBandId
            const bw = Math.max(x2 - x1, MIN_BAND_WIDTH)

            return (
              <g key={band.id}>
                {/* Band rectangle */}
                <rect
                  x={x1}
                  y={y}
                  width={bw}
                  height={LANE_HEIGHT}
                  rx={3}
                  ry={3}
                  fill={color}
                  fillOpacity={isSelected ? 0.9 : 0.7}
                  className={`band-rect ${isSelected ? 'selected' : ''}`}
                  onClick={() => onBandClick(band)}
                  onMouseMove={(e) => handleMouseMove(e, band)}
                  onMouseLeave={handleMouseLeave}
                />

                {/* Internal label for wide bands */}
                {bw > 60 && (
                  <text
                    x={x1 + 8}
                    y={y + LANE_HEIGHT / 2}
                    className="band-label-internal"
                  >
                    {band.name}
                  </text>
                )}
              </g>
            )
          })}

          {/* X axis */}
          <line
            x1={LEFT_MARGIN}
            y1={TOP_MARGIN + numLanes * (LANE_HEIGHT + LANE_GAP)}
            x2={LEFT_MARGIN + chartWidth}
            y2={TOP_MARGIN + numLanes * (LANE_HEIGHT + LANE_GAP)}
            stroke="#555"
            strokeWidth={1}
          />

          {/* Tick labels */}
          {ticks
            .filter((t) => {
              const l = Math.log10(t)
              return l === Math.floor(l)
            })
            .map((tick) => {
              const x =
                LEFT_MARGIN + logScale(tick, minFreq, maxFreq, chartWidth)
              const y =
                TOP_MARGIN + numLanes * (LANE_HEIGHT + LANE_GAP) + 18
              return (
                <g key={`tick-${tick}`}>
                  <line
                    x1={x}
                    y1={
                      TOP_MARGIN +
                      numLanes * (LANE_HEIGHT + LANE_GAP) -
                      4
                    }
                    x2={x}
                    y2={
                      TOP_MARGIN +
                      numLanes * (LANE_HEIGHT + LANE_GAP) +
                      4
                    }
                    stroke="#555"
                    strokeWidth={1.5}
                  />
                  <text x={x} y={y} className="axis-label">
                    {formatFreqShort(tick)}
                  </text>
                </g>
              )
            })}
        </svg>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="chart-tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <div className="tooltip-name">{tooltip.band.name}</div>
          <div className="tooltip-freq">
            {formatFreqShort(tooltip.band.startFreq)} –{' '}
            {formatFreqShort(tooltip.band.endFreq)}
          </div>
        </div>
      )}
    </div>
  )
}
