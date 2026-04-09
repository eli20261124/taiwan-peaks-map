import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import peaksData from '../peaks.json';
import PeakCard from './PeakCard';

// 修復 Leaflet 圖標問題
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const PeaksMap = () => {
  const { t } = useTranslation();
  const [selectedPeak, setSelectedPeak] = useState(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const handleMarkerClick = (peak) => {
    setSelectedPeak(peak);
    setIsCardVisible(true);
  };

  const handleCloseCard = () => {
    setIsCardVisible(false);
    setTimeout(() => setSelectedPeak(null), 300);
  };

  return (
    <div className="relative w-full h-full">
      {/* 地圖容器 */}
      <MapContainer
        center={[23.969, 120.960]}
        zoom={7}
        className="w-full h-full"
        style={{ minHeight: '100vh' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
          maxZoom={19}
        />

        {/* 標記點 */}
        {peaksData.peaks.map((peak) => (
          <Marker
            key={peak.id}
            position={[peak.coordinates.latitude, peak.coordinates.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(peak),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-green-700">{peak.name}</h3>
                <p className="text-sm text-gray-600">{peak.elevation}m</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 側邊卡片 */}
      {selectedPeak && (
        <div
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transition-transform duration-300 z-40 overflow-y-auto ${
            isCardVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isCardVisible && (
            <PeakCard peak={selectedPeak} onClose={handleCloseCard} />
          )}
        </div>
      )}
    </div>
  );
};

export default PeaksMap;
