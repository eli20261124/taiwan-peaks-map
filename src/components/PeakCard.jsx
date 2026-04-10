import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mountain, MapPin, Zap } from 'lucide-react';

const PeakCard = ({ peak, onClose }) => {
  const { t } = useTranslation();

  // 難度顏色映射
  const getDifficultyColor = (difficulty) => {
    const colors = {
      簡單: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      中等: 'bg-amber-100 text-amber-700 border-amber-300',
      困難: 'bg-red-100 text-red-700 border-red-300',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white h-full flex flex-col">
      {/* 標頭 - 3D 風格 */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-6 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Mountain size={32} className="text-emerald-100 drop-shadow-lg" />
              <div className="absolute inset-0 bg-emerald-400 opacity-20 blur-sm rounded-lg"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold drop-shadow-md">{peak.name}</h2>
              <p className="text-emerald-100 text-sm font-medium">{peak.englishName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-500/30 rounded-lg transition-all hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* 排名和高度預覽 */}
        <div className="flex items-center gap-4 text-emerald-100 text-sm">
          <span className="font-bold text-lg">百岳第 {peak.rank} 名</span>
          <span className="border-l border-emerald-300 pl-4 font-semibold">{peak.elevation}m</span>
        </div>
      </div>

      {/* 內容區域 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* 基本資訊 - 3D 卡片效果 */}
        <section className="bg-white rounded-xl p-5 border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-emerald-700 mb-4 text-lg flex items-center gap-2">
            <Mountain size={22} className="text-emerald-600" />
            基本資訊
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* 高度 */}
            <div className="bg-gradient-to-br from-emerald-50 to-transparent p-4 rounded-lg border border-emerald-200">
              <p className="text-xs text-gray-600 mb-1">海拔高度</p>
              <p className="text-xl font-bold text-emerald-700">{peak.elevation}</p>
              <p className="text-xs text-gray-500">公尺</p>
            </div>

            {/* 難度 */}
            <div className="bg-gradient-to-br from-amber-50 to-transparent p-4 rounded-lg border border-amber-200">
              <p className="text-xs text-gray-600 mb-1">難度等級</p>
              <p className={`px-3 py-1 rounded-full font-bold text-sm border ${getDifficultyColor(peak.difficulty)} inline-block`}>
                {peak.difficulty}
              </p>
            </div>
          </div>
        </section>

        {/* 地理位置 */}
        <section className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-blue-700 mb-4 text-lg flex items-center gap-2">
            <MapPin size={22} className="text-blue-600" />
            地理位置
          </h3>
          <div className="space-y-3">
            {/* 所在縣市 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs text-gray-600 mb-1 font-semibold">所在縣市</p>
              <p className="text-base font-bold text-blue-700">{peak.county}</p>
            </div>

            {/* 座標 */}
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">GPS 座標</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gradient-to-br from-cyan-50 to-transparent p-3 rounded-lg border border-cyan-200">
                  <p className="text-xs text-gray-600">緯度</p>
                  <code className="text-sm font-mono font-bold text-blue-700">
                    {peak.coordinates.latitude.toFixed(4)}
                  </code>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-transparent p-3 rounded-lg border border-cyan-200">
                  <p className="text-xs text-gray-600">經度</p>
                  <code className="text-sm font-mono font-bold text-blue-700">
                    {peak.coordinates.longitude.toFixed(4)}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 山峰特性 */}
        <section className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-purple-700 mb-4 text-lg flex items-center gap-2">
            <Zap size={22} className="text-purple-600" />
            山峰特性
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <span className="text-gray-700 font-medium">百岳排名</span>
              <span className="font-bold text-purple-700 text-lg">#{peak.rank}</span>
            </div>
            <div className="text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-transparent p-3 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">💡 提示</p>
              <p>點擊標記可查看山峰詳細資訊，在地圖上方可切換語言和其他選項。</p>
            </div>
          </div>
        </section>

        {/* 底部間距 */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default PeakCard;
