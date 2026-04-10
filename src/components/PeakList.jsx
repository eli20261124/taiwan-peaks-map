import React from 'react';
import { Mountain, Star, Sun, Home, Calendar, MapPin, ChevronRight } from 'lucide-react';

const difficultyColors = [
  '',
  'bg-emerald-100 text-emerald-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-orange-100 text-orange-700',
  'bg-red-100 text-red-700',
];

const PeakListItem = ({ peak, index, onClick }) => {
  const stars = peak.difficultyStars || 3;

  return (
    <button
      onClick={() => onClick(peak)}
      className="peak-list-item group w-full text-left p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:shadow-md transition-all duration-200 cursor-pointer"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Rank number */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">#{peak.rank}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-base font-semibold text-foreground truncate">{peak.name}</h3>
            <span className="text-xs text-muted-foreground flex-shrink-0">{peak.elevation}m</span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">{peak.englishName}</p>

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${difficultyColors[stars]}`}>
              {'★'.repeat(stars)} 
            </span>

            {peak.hasSunrise && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-600">
                <Sun size={10} /> 日出
              </span>
            )}

            {peak.hasCabin && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-600">
                <Home size={10} /> 山屋
              </span>
            )}

            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground">
              <Calendar size={10} /> {peak.suggestedDays || '—'}天
            </span>

            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] bg-muted text-muted-foreground">
              <MapPin size={10} /> {peak.county.split('、')[0]}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight size={16} className="flex-shrink-0 text-muted-foreground/40 group-hover:text-primary transition-colors mt-1" />
      </div>
    </button>
  );
};

const PeakList = ({ peaks, onPeakSelect }) => {
  if (!peaks || peaks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Mountain size={32} className="mx-auto mb-3 opacity-40" />
        <p className="text-sm">沒有符合條件的百岳</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {peaks.map((peak, i) => (
        <PeakListItem
          key={peak.id}
          peak={peak}
          index={i}
          onClick={onPeakSelect}
        />
      ))}
    </div>
  );
};

export default PeakList;
