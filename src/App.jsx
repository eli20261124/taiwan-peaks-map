import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TaiwanD3Map from './components/TaiwanD3Map';
import PeakOverlay from './components/PeakOverlay';
import SearchFilter from './components/SearchFilter';
import LanguageSwitcher from './components/LanguageSwitcher';
import peaksData from './peaks.json';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [selectedPeak, setSelectedPeak] = useState(null);
  const [selectedPeakPosition, setSelectedPeakPosition] = useState(null);
  const [filteredPeaks, setFilteredPeaks] = useState(peaksData.peaks);

  const handlePeakClick = useCallback((peak, position = null) => {
    setSelectedPeak(peak);
    setSelectedPeakPosition(position);
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setSelectedPeak(null);
    setSelectedPeakPosition(null);
  }, []);

  const handleFilterChange = useCallback((filtered) => {
    setFilteredPeaks(filtered);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#FDFCFB]">

      {/* HEADER: flex-col — search on top, title below */}
      <AnimatePresence>
        {!selectedPeak && (
          <motion.header
            className="w-full bg-white/95 z-20 border-b border-[#E8E4E0]/30 flex flex-col items-center px-4 pt-2 pb-1.5 gap-1 shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Row 1: Search + Language */}
            <div className="w-full flex items-center justify-between">
              <SearchFilter
                peaks={peaksData.peaks}
                onFilterChange={handleFilterChange}
                onPeakSelect={handlePeakClick}
              />
              <LanguageSwitcher />
            </div>

            {/* Row 2: Chinese title */}
            <h1 className="text-base font-serif font-semibold text-[#1A1A1A] leading-none tracking-wide">
              台灣百岳手冊
            </h1>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ===== MAP (flex-1, fills remaining space) ===== */}
      <div className="flex-1 relative w-full z-10">
        <TaiwanD3Map
          peaks={filteredPeaks}
          onPeakClick={handlePeakClick}
          selectedPeakId={selectedPeak?.id}
        />
      </div>

      {/* ===== PEAK INFO OVERLAY (on map) ===== */}
      <PeakOverlay
        peak={selectedPeak}
        anchorPosition={selectedPeakPosition}
        open={!!selectedPeak}
        onClose={handleCloseOverlay}
      />

      {/* ===== LEGEND ===== */}
      <AnimatePresence>
        {!selectedPeak && (
          <motion.div
            className="absolute bottom-4 left-6 z-10 flex items-center gap-2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#6B8F71]" title="入門" />
            <span className="w-2 h-2 rounded-full bg-[#C4A35A]" title="中等" />
            <span className="w-2 h-2 rounded-full bg-[#B56B5A]" title="挑戰" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== COORDINATES ===== */}
      <div className="absolute bottom-3 left-4 z-10 text-[9px] font-mono text-muted-foreground/30 tracking-wider pointer-events-none">
        23.4711°N 120.9572°E
      </div>
    </div>
  );
}

export default App;
