import React from 'react';
import { X, Mountain, MapPin, Calendar, Thermometer, TreePine, Bird } from 'lucide-react';

const PeakDrawer = ({ peak, open, onClose }) => {
  if (!peak) return null;

  const getDifficultyLabel = (stars) => {
    const labels = ['', '⭐ 入門', '⭐⭐ 初級', '⭐⭐⭐ 中等', '⭐⭐⭐⭐ 進階', '⭐⭐⭐⭐⭐ 挑戰'];
    return labels[stars] || '⭐⭐⭐ 中等';
  };

  const getDifficultyColor = (stars) => {
    if (stars <= 2) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (stars <= 3) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const stars = peak.difficultyStars || 3;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full backdrop-blur-xl bg-white/80 border-l border-white/30 shadow-2xl overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-white/30 px-6 py-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary">{peak.name}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{peak.englishName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-black/5 transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-5">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/60 border border-white/40 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Mountain size={14} />
                  海拔高度
                </div>
                <p className="text-xl font-bold text-primary">{peak.elevation}<span className="text-sm font-normal text-muted-foreground ml-1">m</span></p>
              </div>

              <div className="rounded-xl bg-white/60 border border-white/40 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Thermometer size={14} />
                  難度等級
                </div>
                <p className={`text-sm font-semibold px-2 py-1 rounded-lg border inline-block ${getDifficultyColor(stars)}`}>
                  {getDifficultyLabel(stars)}
                </p>
              </div>

              <div className="rounded-xl bg-white/60 border border-white/40 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <MapPin size={14} />
                  所在縣市
                </div>
                <p className="text-sm font-medium text-foreground">{peak.county}</p>
              </div>

              <div className="rounded-xl bg-white/60 border border-white/40 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Calendar size={14} />
                  建議天數
                </div>
                <p className="text-sm font-medium text-foreground">{peak.suggestedDays || '—'} 天</p>
              </div>
            </div>

            {/* Description */}
            {peak.description && (
              <div className="rounded-xl bg-white/60 border border-white/40 p-4 shadow-sm">
                <p className="text-sm leading-relaxed text-foreground/80">{peak.description}</p>
              </div>
            )}

            {/* Tags */}
            {peak.tags && peak.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {peak.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Wildlife */}
            {peak.wildlife && peak.wildlife.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TreePine size={16} className="text-primary" />
                  可見原生動植物
                </h3>
                <div className="space-y-2">
                  {peak.wildlife.map((w, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg bg-white/60 border border-white/40 p-3 shadow-sm">
                      <span className="text-xl flex-shrink-0">{w.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{w.name}</p>
                        <p className="text-xs text-muted-foreground">{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PeakDrawer;
