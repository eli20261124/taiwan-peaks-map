import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, MapPin } from 'lucide-react';

const DIFFICULTY_LABELS = ['全部', '⭐ 入門', '⭐⭐ 初級', '⭐⭐⭐ 中等', '⭐⭐⭐⭐ 進階', '⭐⭐⭐⭐⭐ 挑戰'];
const COUNTY_OPTIONS = [
  '全部', '南投縣', '花蓮縣', '台中市', '台東縣', '高雄市', '嘉義縣',
  '苗栗縣', '新竹縣', '屏東縣'
];

const SearchFilter = ({ peaks, onFilterChange, onPeakSelect }) => {
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState(0); // 0 = all
  const [county, setCounty] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = peaks;

    // Text search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.englishName.toLowerCase().includes(q) ||
        p.county.includes(q) ||
        (p.tags && p.tags.some(t => t.includes(q)))
      );
    }

    // Difficulty
    if (difficultyFilter > 0) {
      result = result.filter(p => p.difficultyStars === difficultyFilter);
    }

    // County
    if (county !== '全部') {
      result = result.filter(p => p.county.includes(county));
    }

    return result;
  }, [peaks, search, difficultyFilter, county]);

  // Sync filtered results to parent
  useEffect(() => {
    onFilterChange(filtered);
  }, [filtered, onFilterChange]);

  const activeFilterCount = [
    difficultyFilter > 0,
    county !== '全部'
  ].filter(Boolean).length;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Layer 1: Search Bar (icon-only trigger) */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 rounded-full border border-[#E8E4E0] bg-white/60 p-2.5 backdrop-blur-md transition-colors ${
            showFilters || activeFilterCount > 0
              ? 'text-[#1A1A1A]'
              : 'text-[#8A8580] hover:text-[#1A1A1A]'
          }`}
          title="搜尋與篩選"
        >
          <Search size={18} />
          {activeFilterCount > 0 && (
            <span className="ml-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel (only if opened) */}
      {showFilters && (
        <div className="mt-3 p-5 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-sm space-y-5">
          {/* Difficulty stars */}
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Star size={13} /> 攀登難度
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTY_LABELS.map((label, i) => (
                <button
                  key={i}
                  onClick={() => setDifficultyFilter(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficultyFilter === i
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* County */}
          <div>
            <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <MapPin size={13} /> 縣市
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COUNTY_OPTIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setCounty(c)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    county === c
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setDifficultyFilter(0);
                setCounty('全部');
              }}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              清除所有篩選
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchFilter;
