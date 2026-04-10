import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mountain, MapPin, Calendar } from 'lucide-react';
import { Leaf, PawPrint, Bird, Bug, Tree } from '@phosphor-icons/react';

const typeIcon = {
  plant:    <Leaf size={13} weight="fill" className="text-[#6B8F71]" />,
  bird:     <Bird size={13} weight="fill" className="text-[#7BA3C4]" />,
  mammal:   <PawPrint size={13} weight="fill" className="text-[#C4A35A]" />,
  reptile:  <Bug size={13} weight="fill" className="text-[#8A8580]" />,
  insect:   <Bug size={13} weight="fill" className="text-[#9B7EC4]" />,
  amphibian:<Bug size={13} weight="fill" className="text-[#5A9E8F]" />,
  animal:   <PawPrint size={13} weight="fill" className="text-[#C4A35A]" />,
};

const difficultyStars = (stars) => {
  const count = Math.min(Math.ceil(stars / 2), 3);
  const color = count <= 1 ? '#6B8F71' : count <= 2 ? '#C4A35A' : '#B56B5A';
  return { count, color };
};

const PeakOverlay = ({ peak, open, onClose, anchorPosition }) => {
  const isRightSide = (anchorPosition?.x ?? 0) < (typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const top = anchorPosition?.y ? Math.min(Math.max(anchorPosition.y - 120, 16), window.innerHeight - 420) : 32;

  return (
    <AnimatePresence>
      {open && peak && (
        <>
          {/* Backdrop — very subtle */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ background: 'rgba(0,0,0,0.05)' }}
          />

          {/* Side Panel — no borders, color-block layout */}
          <motion.aside
            className="fixed z-50 w-80 max-h-[420px] flex flex-col rounded-3xl bg-black/50 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              top,
              left: isRightSide ? Math.min((anchorPosition?.x ?? 40) + 28, window.innerWidth - 340) : 'auto',
              right: isRightSide ? 'auto' : Math.max(window.innerWidth - (anchorPosition?.x ?? window.innerWidth - 40) + 28, 16),
            }}
            initial={{ x: isRightSide ? 32 : -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRightSide ? 24 : -24, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Title block — no separate bg, glass base shows through */}
            <div className="px-5 py-4">
              <h2
                className="text-2xl font-serif font-black text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              >
                {peak.name}
              </h2>
              <p className="text-[11px] text-white/60 mt-1 tracking-widest uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{peak.englishName}</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-3 space-y-0">

              {/* Stats — single dark block */}
              <div className="mx-3 rounded-xl overflow-hidden bg-black/30">
                <StatRow icon={<Mountain size={14} />} label="海拔高度">
                  <span className="text-base font-bold text-white tabular-nums">{peak.elevation}</span>
                  <span className="text-[10px] text-white/50 ml-0.5">m</span>
                </StatRow>

                <div className="h-px bg-white/5" />
                <StatRow label="難度等級">
                  {(() => {
                    const d = difficultyStars(peak.difficultyStars || 3);
                    return (
                      <span className="flex items-center gap-0.5">
                        {Array.from({ length: d.count }).map((_, i) => (
                          <span key={i} className="text-sm leading-none" style={{ color: d.color }}>★</span>
                        ))}
                      </span>
                    );
                  })()}
                </StatRow>

                <div className="h-px bg-white/5" />
                <StatRow icon={<MapPin size={14} />} label="所在縣市">
                  <span className="text-sm text-white">{peak.county}</span>
                </StatRow>

                <div className="h-px bg-white/5" />
                <StatRow icon={<Calendar size={14} />} label="建議天數">
                  <span className="text-sm text-white">{peak.suggestedDays || '—'} 天</span>
                </StatRow>
              </div>

              {/* Description */}
              {peak.description && (
                <motion.p
                  className="text-xs leading-[1.8] text-white/70 pt-4 px-5"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {String(peak.description).replace(/[。.!！?？]+$/u, '').slice(0, 50)}
                </motion.p>
              )}

              {/* Tags */}
              {peak.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-3 px-5">
                  {peak.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Wildlife */}
              {peak.wildlife?.length > 0 && (
                <motion.div
                  className="pt-3 px-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-[10px] font-semibold text-white/40 tracking-[0.1em] uppercase flex items-center gap-1.5 mb-2">
                    <Tree size={13} weight="light" className="text-[#6B8F71]" />
                    台灣原生種
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {peak.wildlife.map((w, i) => (
                      <motion.span
                        key={w.name}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md bg-white/10 text-white/90"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.04 }}
                        title={w.desc}
                      >
                        {typeIcon[w.type] || typeIcon.animal}
                        {w.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// Reusable stat row
const StatRow = ({ icon, label, children }) => (
  <div className="flex items-center justify-between px-4 py-2.5">
    <span className="flex items-center gap-1.5 text-[11px] text-white/50">
      {icon ? <>{icon} </> : null}{label}
    </span>
    <span>{children}</span>
  </div>
);

export default PeakOverlay;
