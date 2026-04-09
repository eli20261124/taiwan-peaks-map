import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import PeaksMap from './components/PeaksMap';
import PasswordModal from './components/PasswordModal';
import './i18n';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('authenticated', 'true');
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen bg-gray-100">
      {/* 密碼驗證模態 */}
      <PasswordModal isOpen={!isAuthenticated} onSubmit={() => setIsAuthenticated(true)} />

      {isAuthenticated && (
        <>
          {/* 頁面標題和語言切換 */}
          <div className="fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-emerald-700">{t('title')}</h1>
                <p className="text-gray-600">{t('subtitle')}</p>
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          {/* 地圖容器 */}
          <div className="pt-24 w-full h-full">
            <PeaksMap />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
