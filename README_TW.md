# 台灣百岳互動式標記地圖 (Taiwan Peaks Interactive Map)

一個精美的互動式地圖應用，展示台灣百岳的地理位置、氣候資訊、生態資料等完整資訊。

**四種語言支持**: 繁體中文 | English | 日本語 | 한국어

## 📋 功能特色

### 1. 資料研究 (Data Research)
- ✅ 包含台灣五座高山的完整資料
  - 玉山 (3952m)
  - 雪山 (3886m)
  - 南湖大山 (3742m)
  - 大霸尖山 (3492m)
  - 奇萊北峰 (3607m)

- 每座山峰包含資訊：
  - **基本資料**: 山名、精確經緯度、海拔高度
  - **氣候資料**: 推薦攀登月份、平均濕度、溫度範圍
  - **生態資料**: 台灣特有植物與動物
  - **難度評級**: 攀登難度與預計天數

### 2. 視覺設計 (Visual Design)
- 🎨 **深綠色系極簡風格** - 符合山區自然元素
- 🏔️ **立體地圖展示** - 使用 Leaflet 呈現互動式地圖
- 🎯 **Notion 極簡風格 Icons**
  - 山峰 (Mountain) - 高度資訊
  - 日曆 (Calendar) - 推薦月份
  - 水滴 (Droplet) - 濕度資訊
  - 溫度計 (Thermometer) - 溫度範圍
  - 葉片 (Leaf) - 特有植物
  - 心形 (Heart) - 特有動物

- ✨ **Hover 動畫效果** - 滑鼠懸停時圖標微小縮放

### 3. 互動功能 (Interactive Features)
- 🗺️ **地圖標記**: 點擊山峰標記查看詳細資訊
- 📌 **側邊卡片**: 右側滑出質感卡片，展示資料視覺化
- 🔐 **密碼驗證**: 簡單的進入頁面保護機制
  - 預設密碼: `taiwan2026`
- 🌐 **多語言切換**: 支援繁體中文、英文、日文、韓文

### 4. 技術堆棧 (Tech Stack)
- **前端框架**: React 19
- **地圖庫**: Leaflet + React-Leaflet
- **樣式框架**: Tailwind CSS v4
- **圖標庫**: Lucide React
- **多語言**: i18next + react-i18next
- **構建工具**: Vite 8
- **包管理器**: Bun

## 🚀 快速開始

### 安裝依賴
```bash
cd taiwan-peaks-map
bun install
```

### 開發模式
```bash
bun run dev
```
應用將在 `http://localhost:5173/` 啟動

### 生產構建
```bash
bun run build
```
構建文件將輸出到 `dist/` 目錄

## 📦 部署到 GitHub Pages

### 自動部署（推薦）

此專案已配置 GitHub Actions 自動化部署。當你推送代碼到 `main` 分支時，將自動部署到 GitHub Pages。

### 手動部署

1. **準備 GitHub 倉庫**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```

2. **配置 GitHub Pages**
   - 在 GitHub 倉庫設定中，找到 "Pages" 設定
   - 選擇 "Deploy from a branch"
   - 選擇 `gh-pages` 分支

3. **運行部署腳本**
   ```bash
   # 修改 deploy.sh 中的 <YOUR_USERNAME> 和 <YOUR_REPO_NAME>
   bash deploy.sh
   ```

4. **訪問應用**
   ```
   https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/
   ```

## 🔒 密碼保護

應用包含簡單的密碼驗證機制：

- **預設密碼**: `taiwan2026`
- 修改密碼：編輯 `src/components/PasswordModal.jsx` 中的 `correctPassword` 變數
- 密碼存儲在本地 localStorage (建議生產環境改進安全性)

## 🌍 多語言支持

支援四種語言，自動保存語言偏好設定：

- 繁體中文 (zh-TW) - 預設
- English (en)
- 日本語 (ja)
- 한국어 (ko)

翻譯文件位於 `src/locales/` 目錄

## 📝 擴充山峰資料

要添加更多山峰，編輯 `src/peaks.json`：

```json
{
  "id": 6,
  "name": "新山峰名稱",
  "englishName": "English Peak Name",
  "elevation": 3500,
  "coordinates": {
    "latitude": 23.5,
    "longitude": 121.0
  },
  "climate": {
    "recommendedMonths": ["月份1", "月份2"],
    "averageHumidity": "濕度範圍%",
    "temperatureRange": "溫度範圍"
  },
  "ecology": {
    "endemicPlants": [...],
    "endemicAnimals": [...]
  },
  "difficulty": "難度等級",
  "estimatedDays": 天數
}
```

## 📱 響應式設計

應用完全響應式，可在以下設備上正常使用：
- 💻 桌面電腦
- 📱 平板電腦
- 📲 手機

## 🎨 自訂樣式

主要顏色使用深綠色系列 (emerald-600, emerald-700 等)，可在以下位置修改：

- `src/index.css` - Tailwind CSS 變數
- `src/components/*.jsx` - 個別組件的 className

## 🔧 開發指南

### 項目結構
```
taiwan-peaks-map/
├── src/
│   ├── components/          # React 組件
│   │   ├── LanguageSwitcher.jsx
│   │   ├── PasswordModal.jsx
│   │   ├── PeaksMap.jsx
│   │   └── PeakCard.jsx
│   ├── locales/             # 翻譯文件
│   │   ├── zh-TW.json
│   │   ├── en.json
│   │   ├── ja.json
│   │   └── ko.json
│   ├── peaks.json           # 山峰資料
│   ├── i18n.js              # i18n 配置
│   ├── App.jsx              # 主應用組件
│   └── main.jsx             # 入口文件
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 配置
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🐛 已知限制

- 密碼驗證僅使用本地存儲 (localStorage)，生產環境建議使用後端驗證
- 初期數據僅包含 5 座山峰，可根據需要擴充
- 地圖瓷磚使用 OpenStreetMap，涉及網絡請求

## 🔐 安全建議

1. **生產環境密碼驗證**
   - 改用後端驗證而非前端密碼
   - 考慮加入 authentication token

2. **敏感資料**
   - 避免在代碼中硬編碼密鑰
   - 使用環境變數存儲敏感信息

## 📄 授權

MIT License - 歡迎自由使用和修改

## 👤 作者

Created with 💚 for Taiwan Peak explorers

---

## 使用提示

### 第一次使用
1. 訪問網站
2. 輸入密碼: `taiwan2026`
3. 瀏覽台灣百岳地圖
4. 點擊標記查看山峰詳細資訊
5. 使用右上角語言切換器改變語言

### 功能探索
- 🗺️ 拖動地圖移動視圖
- 🔍 使用滑鼠滾輪縮放
- 📍 點擊任何山峰標記
- 📋 在右側卡片查看完整資訊
- 🌐 實時切換語言，設定會自動保存

---

**享受探索台灣百岳的旅程！** 🏔️✨
