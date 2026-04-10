import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import PeaksMap from './components/PeaksMap';
import './i18n';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col">
      {/* 頁面標題和語言切換 */}
      <div className="bg-white shadow-md z-20 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">{t('title')}</h1>
            <p className="text-gray-600">{t('subtitle')}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* 地圖容器 */}
      <div className="flex-1 w-full overflow-hidden">
        <PeaksMap />
      </div>
    </div>
  );
}

export default App;
