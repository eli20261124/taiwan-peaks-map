import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mountain, Calendar, Droplet, Thermometer, Leaf, Heart } from 'lucide-react';

const PeakCard = ({ peak, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white h-full flex flex-col">
      {/* 標頭 */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Mountain size={28} className="text-emerald-100" />
            <h2 className="text-2xl font-bold">{peak.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-500 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-emerald-100 text-sm">{peak.englishName}</p>
      </div>

      {/* 內容區域 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 基本資訊 */}
        <section className="bg-white rounded-lg p-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-700 mb-4 text-lg">基本資訊</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Mountain size={20} className="text-emerald-600" />
                <span className="text-gray-700 font-medium">{t('elevation')}</span>
              </div>
              <span className="font-bold text-emerald-700">{peak.elevation} {t('meters')}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">難度</span>
              </div>
              <span className="font-bold text-orange-600">{peak.difficulty}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-emerald-600" />
                <span className="text-gray-700 font-medium">預計天數</span>
              </div>
              <span className="font-bold text-emerald-700">{peak.estimatedDays} {t('days')}</span>
            </div>
          </div>
        </section>

        {/* 座標資訊 */}
        <section className="bg-white rounded-lg p-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-700 mb-4 text-lg">{t('coordinates')}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('latitude')}</span>
              <code className="bg-emerald-50 px-3 py-1 rounded font-mono text-emerald-700">
                {peak.coordinates.latitude.toFixed(4)}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t('longitude')}</span>
              <code className="bg-emerald-50 px-3 py-1 rounded font-mono text-emerald-700">
                {peak.coordinates.longitude.toFixed(4)}
              </code>
            </div>
          </div>
        </section>

        {/* 氣候資訊 */}
        <section className="bg-white rounded-lg p-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-700 mb-4 text-lg flex items-center gap-2">
            <Thermometer size={20} />
            {t('climate')}
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} className="text-emerald-600" />
                <span className="text-gray-700 font-medium">{t('recommendedMonths')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {peak.climate.recommendedMonths.map((month, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {month}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Droplet size={18} className="text-blue-500" />
                <span className="text-gray-700 font-medium">{t('averageHumidity')}</span>
              </div>
              <span className="font-bold text-gray-800">{peak.climate.averageHumidity}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer size={18} className="text-red-500" />
                <span className="text-gray-700 font-medium">{t('temperatureRange')}</span>
              </div>
              <span className="font-bold text-gray-800">{peak.climate.temperatureRange}</span>
            </div>
          </div>
        </section>

        {/* 生態資訊 */}
        <section className="bg-white rounded-lg p-4 border border-emerald-200">
          <h3 className="font-bold text-emerald-700 mb-4 text-lg flex items-center gap-2">
            <Leaf size={20} />
            {t('ecology')}
          </h3>

          {/* 特有植物 */}
          <div className="mb-5">
            <h4 className="font-semibold text-emerald-600 mb-3 flex items-center gap-2">
              <Leaf size={18} />
              {t('endemicPlants')}
            </h4>
            <div className="space-y-2">
              {peak.ecology.endemicPlants.map((plant, idx) => (
                <div key={idx} className="bg-gradient-to-r from-emerald-50 to-transparent p-3 rounded-lg border-l-4 border-emerald-500">
                  <p className="font-semibold text-emerald-700">{plant.name}</p>
                  <p className="text-xs text-gray-600 italic">{plant.scientificName}</p>
                  <p className="text-sm text-gray-700 mt-1">{plant.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 特有動物 */}
          <div>
            <h4 className="font-semibold text-emerald-600 mb-3 flex items-center gap-2">
              <Heart size={18} className="text-red-500" />
              {t('endemicAnimals')}
            </h4>
            <div className="space-y-2">
              {peak.ecology.endemicAnimals.map((animal, idx) => (
                <div key={idx} className="bg-gradient-to-r from-amber-50 to-transparent p-3 rounded-lg border-l-4 border-amber-500">
                  <p className="font-semibold text-amber-700">{animal.name}</p>
                  <p className="text-xs text-gray-600 italic">{animal.scientificName}</p>
                  <p className="text-sm text-gray-700 mt-1">{animal.description}</p>
                </div>
              ))}
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
