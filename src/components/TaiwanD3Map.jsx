import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// Famous peaks always visible at default zoom (五岳三尖 + 一奇)
const FAMOUS_PEAK_IDS = [1, 2, 3, 5, 6, 10, 22, 27];

const TaiwanD3Map = ({ peaks = [], onPeakClick, selectedPeakId }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const countyTooltipRef = useRef(null);
  const zoomRef = useRef(null);
  const transformRef = useRef(d3.zoomIdentity);
  const [topoData, setTopoData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Load TopoJSON
  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    fetch(`${base}taiwan.topo.json`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setTopoData(data))
      .catch(err => console.error('Failed to load Taiwan TopoJSON:', err));
  }, []);

  // Responsive resize — seed with initial size, then observe
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width && rect.height) {
      setDimensions({ width: rect.width, height: rect.height });
    }
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      if (width && height) setDimensions({ width, height });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Draw map
  useEffect(() => {
    if (!topoData || !dimensions.width || !dimensions.height) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    const tooltip = d3.select(tooltipRef.current);
    const d3CountyTooltip = d3.select(countyTooltipRef.current);

    const { width, height } = dimensions;

    const projection = d3.geoMercator()
      .center([121.0, 23.6])
      .scale(Math.min(width, height) * 12)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const counties = topojson.feature(topoData, topoData.objects.counties);
    const nation = topojson.feature(topoData, topoData.objects.nation);

    const g = svg.append('g').attr('class', 'map-group');
    const defs = svg.append('defs');

    // Muted warm-beige gradient
    const gradient = defs.append('linearGradient')
      .attr('id', 'taiwan-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#EDE9E3');
    gradient.append('stop').attr('offset', '50%').attr('stop-color', '#E4DFD8');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#D8D2CA');

    // Drop shadow
    const filter = defs.append('filter')
      .attr('id', 'map-shadow')
      .attr('x', '-10%').attr('y', '-10%')
      .attr('width', '130%').attr('height', '130%');
    filter.append('feDropShadow')
      .attr('dx', 2).attr('dy', 3)
      .attr('stdDeviation', 5)
      .attr('flood-color', 'rgba(0,0,0,0.08)');

    // County boundaries — hover interaction
    g.selectAll('.county')
      .data(counties.features)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('d', path)
      .attr('fill', 'url(#taiwan-gradient)')
      .attr('stroke', '#FDFCFB')
      .attr('stroke-width', 0.3)
      .attr('stroke-opacity', 0.5)
      .on('mouseenter', function () {
        d3.select(this)
          .transition().duration(150)
          .attr('fill', '#DDD8D0')
          .attr('stroke-width', 0.6);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .transition().duration(200)
          .attr('fill', 'url(#taiwan-gradient)')
          .attr('stroke-width', 0.3);
      });

    // Nation outline
    g.append('path')
      .datum(nation.features[0])
      .attr('class', 'nation-outline')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', '#B8B0A8')
      .attr('stroke-width', 0.8)
      .attr('filter', 'url(#map-shadow)');

    const peakLookup = new Map();

    // Peak markers
    const peakGroup = g.selectAll('.peak-marker')
      .data(peaks)
      .enter()
      .append('g')
      .attr('class', d => {
        const isFamous = FAMOUS_PEAK_IDS.includes(d.rank || d.id);
        const isSelected = d.id === selectedPeakId;
        return `peak-marker ${isSelected ? 'selected' : ''} ${isFamous ? 'famous' : 'minor'}`;
      })
      .attr('transform', d => {
        const [x, y] = projection([d.coordinates.longitude, d.coordinates.latitude]);
        peakLookup.set(d.id, { x, y, data: d });
        return `translate(${x}, ${y})`;
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        const point = peakLookup.get(d.id);
        
        // 更新所有點的顏色：選中的變橘色，其他恢復原色
        peakGroup.selectAll('circle')
          .attr('fill', point_d => {
            if (point_d.id === d.id) return '#FF8C42'; // 亮橘色
            const stars = point_d.difficultyStars || 3;
            if (stars <= 2) return '#6B8F71';
            if (stars <= 3) return '#C4A35A';
            return '#B56B5A';
          });
        
        // 執行 FlyTo 動畫...
        const nextTransform = d3.zoomIdentity
          .translate(width / 2 - point.x * transformRef.current.k, height / 2 - point.y * transformRef.current.k)
          .scale(transformRef.current.k);

        svg
          .transition()
          .duration(650)
          .ease(d3.easeCubicOut)
          .call(zoomRef.current.transform, nextTransform);

        onPeakClick?.(d, {
          x: event.clientX,
          y: event.clientY,
        });
      });

    // Peak dot — staggered fade-in
    peakGroup.append('circle')
      .attr('r', 0)
      .attr('fill', d => {
        const stars = d.difficultyStars || 3;
        if (stars <= 2) return '#6B8F71';
        if (stars <= 3) return '#C4A35A';
        return '#B56B5A';
      })
      .attr('stroke', '#FDFCFB')
      .attr('stroke-width', 1)
      .attr('opacity', 0)
      .attr('class', 'peak-dot')
      .transition()
      .delay((d, i) => 800 + i * 25)
      .duration(400)
      .ease(d3.easeCubicOut)
      .attr('r', d => d.id === selectedPeakId ? 5 : 2.5)
      .attr('opacity', 1);

    // Peak name + nearest county on hover (all zoom levels, transform-corrected)
    const peakTooltip = d3.select(tooltipRef.current);
    peakGroup
      .on('mouseenter', function (event, d) {
        const { x: tx, y: ty, k } = transformRef.current;
        const [baseX, baseY] = projection([d.coordinates.longitude, d.coordinates.latitude]);
        const screenX = baseX * k + tx;
        const screenY = baseY * k + ty;

        peakTooltip
          .text(d.name)
          .classed('peak-tooltip-visible', true)
          .style('left', `${screenX}px`)
          .style('top', `${screenY - 14}px`);

        // Nearest county in screen-space
        let nearestCounty = null;
        let minDist = Infinity;
        counties.features.forEach(county => {
          const [cx, cy] = path.centroid(county);
          const dist = Math.sqrt((cx * k + tx - screenX) ** 2 + (cy * k + ty - screenY) ** 2);
          if (dist < minDist) { minDist = dist; nearestCounty = county.properties?.COUNTYNAME || ''; }
        });
        if (nearestCounty) {
          d3CountyTooltip
            .text(nearestCounty)
            .style('opacity', '0.9')
            .style('left', `${screenX}px`)
            .style('top', `${screenY + 18}px`);
        }
      })
      .on('mouseleave', function () {
        peakTooltip.classed('peak-tooltip-visible', false);
        d3CountyTooltip.style('opacity', '0');
      });

    // Tiered visibility
    applyTieredVisibility(svg, 1);

    // Zoom — preserve current transform on re-render
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        const k = event.transform.k;
        transformRef.current = event.transform;
        applyTieredVisibility(svg, k);
        tooltip.classed('peak-tooltip-visible', false);
        d3CountyTooltip.style('opacity', '0');
      });

    zoomRef.current = zoom;
    svg.call(zoom);
    svg.call(zoom.transform, transformRef.current);

    // Click background to deselect — restore all peak colors to original
    svg.on('click', () => {
      // 恢復所有點的顏色
      peakGroup.selectAll('circle')
        .attr('fill', d => {
          const stars = d.difficultyStars || 3;
          if (stars <= 2) return '#6B8F71';
          if (stars <= 3) return '#C4A35A';
          return '#B56B5A';
        });
      onPeakClick?.(null, null);
    });

  }, [topoData, dimensions, peaks, selectedPeakId, onPeakClick]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-[#FDFCFB]"
      style={{ minHeight: '600px' }}
    >
      {!topoData && (
        <div className="map-skeleton">
          <div className="map-skeleton-shape" />
        </div>
      )}
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: 'block' }}
      />
      {/* Peak name tooltip */}
      <div
        ref={tooltipRef}
        className="peak-tooltip absolute pointer-events-none text-[11px] font-sans font-medium tracking-[0.05em] text-[#FDFCFB] bg-[#2D2D2D]/90 backdrop-blur-sm px-3 py-1.5 rounded-md whitespace-nowrap -translate-x-1/2 -translate-y-full transition-opacity duration-150"
        style={{ opacity: 0, zIndex: 20 }}
      />
      {/* County name tooltip */}
      <div
        ref={countyTooltipRef}
        className="absolute pointer-events-none text-[10px] font-sans whitespace-nowrap -translate-x-1/2 transition-opacity duration-150"
        style={{ opacity: 0, zIndex: 19, color: '#8A8580', fontWeight: 500, letterSpacing: '0.06em' }}
      />
    </div>
  );
};

function applyTieredVisibility(svg, zoomLevel) {
  svg.selectAll('.peak-marker.minor')
    .transition()
    .duration(300)
    .style('opacity', zoomLevel >= 2 ? 1 : 0)
    .style('pointer-events', zoomLevel >= 2 ? 'all' : 'none');
}

export default TaiwanD3Map;
