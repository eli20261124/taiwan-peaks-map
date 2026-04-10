import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import peaksData from '../peaks.json';
import PeakCard from './PeakCard';

// 創建 3D 風格的山峰標記
const create3DPeakIcon = (difficulty) => {
  const colors = {
    簡單: '#10B981', // 綠色
    中等: '#F59E0B', // 橙色
    困難: '#EF4444', // 紅色
  };
  
  const color = colors[difficulty] || '#3B82F6';
  
  // SVG 創建 3D 山峰效果
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48" width="40" height="48">
    <!-- 山峰陰影（底部） -->
    <polygon points="8,32 20,8 32,32 20,38" fill="${color}" opacity="0.4" />
    
    <!-- 主山峰 -->
    <polygon points="8,30 20,6 32,30" fill="${color}" />
    
    <!-- 左側陰影（3D 立體感） -->
    <polygon points="8,30 20,6 14,16" fill="${color}" opacity="0.7" />
    
    <!-- 高亮（右側，表現立體感） -->
    <polygon points="20,6 32,30 26,20" fill="white" opacity="0.3" />
    
    <!-- 山峰頂端高亮 -->
    <circle cx="20" cy="8" r="2.5" fill="white" opacity="0.8" />
  </svg>`;
  
  return L.divIcon({
    html: svg,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
    className: 'peak-marker'
  });
};

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
    <div className="w-full h-full relative">
      {/* 地圖容器 */}
      <MapContainer
        center={[23.8, 120.9]}
        zoom={7}
        className="w-full h-full"
        maxBounds={[
          [21.87, 120.15], // 西南角
          [25.30, 121.90], // 東北角
        ]}
        maxBoundsViscosity={1.0}
        minZoom={6}
        maxZoom={15}
      >
        {/* 極簡風格地圖層 (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={19}
        />
        
        {/* 地名標籤層 */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          attribution=''
          pane="labels"
          maxZoom={19}
        />

        {/* 標記點 */}
        {peaksData.peaks.map((peak) => (
          <Marker
            key={peak.id}
            position={[peak.coordinates.latitude, peak.coordinates.longitude]}
            icon={create3DPeakIcon(peak.difficulty)}
            eventHandlers={{
              click: () => handleMarkerClick(peak),
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-bold text-lg">{peak.name}</h3>
                <p className="text-sm text-gray-600">{peak.elevation}m</p>
                <p className="text-xs text-gray-500">{peak.county}</p>
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
