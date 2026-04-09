# 🚀 部署到 GitHub Pages - 完整指南

## ✅ 白名單檢查（已完成）

```
✅ .gitignore 已配置        - 敏感文件會被排除
✅ API Key 已清理            - 無硬编碼敏感信息
✅ Git 倉庫已初始化          - 已創建首次提交
✅ 部署配置已備好            - vite.config.js 已配置 base: '/taiwan-peaks-map/'
```

---

## 🎯 快速部署步驟 (5 分鐘)

### 步驟 1: 在 GitHub 創建新倉庫 

1. 訪問 https://github.com/new
2. 填寫信息：
   - **Repository name**: `taiwan-peaks-map`
   - **Description**: `Interactive Taiwan Peaks (Baiyue) Map with 4 Language Support`
   - **Visibility**: **Public** ✅ (這樣人們可以訪問)
   - 不勾選任何其他選項
   
3. 點擊 "Create repository"

---

### 步驟 2: 推送代碼到 GitHub

在終端執行（替換 `<YOUR_USERNAME>` 為你的 GitHub 用戶名）:

```bash
cd "/Users/emmawang/Claude Code/20260409 molly01/taiwan-peaks-map"

# 添加 GitHub 遠端倉庫
git remote add origin https://github.com/<YOUR_USERNAME>/taiwan-peaks-map.git

# 更改分支名稱為 main（如果需要）
git branch -M main

# 推送代碼
git push -u origin main
```

**例如：** 如果你的 GitHub 用戶名是 `emmawang`，執行：
```bash
git remote add origin https://github.com/emmawang/taiwan-peaks-map.git
git branch -M main
git push -u origin main
```

---

### 步驟 3: 啟用 GitHub Pages

1. 去到你的倉庫：`https://github.com/<YOUR_USERNAME>/taiwan-peaks-map`
2. 點擊 **Settings** (右上角齒輪圖標)
3. 左側菜單 → **Pages**
4. 在 "Build and deployment" 下：
   - **Source**: 選擇 "Deploy from a branch"
   - **Branch**: 選擇 `main` / `root`
5. 點擊 **Save**

等待 1-2 分鐘，GitHub 會自動構建和部署。

---

### 步驟 4: 獲取你的公開 URL

部署完成後，你會看到一個綠色的勾和網址：

```
✅ Your site is published at https://<YOUR_USERNAME>.github.io/taiwan-peaks-map/
```

**例如：**
```
https://emmawang.github.io/taiwan-peaks-map/
```

---

## 🔐 訪問權限說明

你的網頁現在是：

| 權限 | 未登陸訪客 | 登陸訪客 | 所有者 |
|------|----------|--------|--------|
| 查看頁面 | ✅ 可以 | ✅ 可以 | ✅ 可以 |
| 互動點擊 | ✅ 可以 | ✅ 可以 | ✅ 可以 |
| 編輯內容 | ❌ 不能 | ❌ 不能 | ✅ 可以 |
| Fork 項目 | ✅ 可以 | ✅ 可以 | ✅ 可以 |

**結論**: 人們可以查看和互動，但無法編輯源代碼。只有你可以修改。

---

## 📋 安全清單

```
✅ API Key               已排除 (.gitignore)
✅ 環境變數              未提交
✅ 敏感信息              已清理
✅ 測試密碼              公開可見 (taiwan2026)
✅ 訪問控制              GitHub 自動管理
✅ Git 歷史              私有代碼已過濾
```

---

## 🎯 自動化部署

一旦設置完成，每當你推送新代碼時，GitHub Actions 會自動：

```
git push origin main
  ↓
GitHub Actions 執行 (自動化)
  ↓
npm install & bun run build
  ↓
構建 dist/ 文件夾
  ↓
部署到 GitHub Pages
  ↓
✅ 網站自動更新！
```

---

## 🔄 如何更新網站

以後要更新網站，只需：

```bash
cd "/Users/emmawang/Claude Code/20260409 molly01/taiwan-peaks-map"

# 做出更改...

# 提交並推送
git add .
git commit -m "描述你的更改"
git push origin main

# 等待 1-2 分鐘，GitHub Pages 自動更新 ✨
```

---

## 📱 分享你的網站

部署後，可以分享這個公開 URL：

```
https://<YOUR_USERNAME>.github.io/taiwan-peaks-map/
```

**存取方式:**
- 任何人都可以訪問（不需要 GitHub 帳戶）
- 只能查看和互動
- 無法修改你的代碼
- 可以 Fork 到他們自己的倉庫

---

## 🧪 驗證部署

推送後，驗證一切正常：

```bash
# 在 GitHub 上檢查
1. 進入 https://github.com/<YOUR_USERNAME>/taiwan-peaks-map
2. 點擊 "Actions" 查看構建狀態
3. 等到構建完成（綠色勾✅）
4. 訪問你的網站 URL
```

---

## 💡 常見問題

### Q: 部署需要信用卡嗎？
**A:** 不需要。GitHub Pages 對公開倉庫完全免費。

### Q: 我的數據會被看到嗎？
**A:** 不會。你的 API Key 和敏感信息已被 .gitignore 排除。
代碼是公開的，但私密數據會被過濾。

### Q: 網站會被索引到搜索引擎嗎？
**A:** 是的。GitHub Pages 是公開網站。
如果不想，可以在 `public/robots.txt` 中添加 `Disallow: /`

### Q: 如何回滾到之前的版本？
**A:** 使用 Git 提交歷史：
```bash
git log                    # 查看歷史
git revert <commit-id>     # 恢復到某個版本
git push origin main       # 推送
```

### Q: 密碼 "taiwan2026" 安全嗎？
**A:** 這只是演示密碼。如果正式用途，可以：
- 修改為強密碼
- 或者移除密碼保護

---

## 📞 快速參考命令

```bash
# 設置遠端
git remote add origin https://github.com/<USERNAME>/taiwan-peaks-map.git

# 推送代碼
git push -u origin main

# 查看遠端
git remote -v

# 查看部署狀態
git log --oneline

# 更新網站
git add .
git commit -m "Update message"
git push origin main
```

---

## ✨ 最終結果

完成後，你將擁有：

```
📍 公開網址
   https://<YOUR_USERNAME>.github.io/taiwan-peaks-map/

✅ 完整功能
   • 互動式地圖
   • 4 種語言（中日韓英）
   • 密碼保護
   • 響應式設計

🔒 安全保障
   • 敏感信息已排除
   • 訪客只能瀏覽和點擊
   • 無編輯權限

♾️ 永久託管
   • GitHub Pages 免費
   • 自動 SSL 加密
   • 自動部署
```

---

**立即開始部署！** 

按照上面的步驟，5 分鐘內你的網站就會上線！ 🚀

有任何問題，參考上面的常見問題或聯絡 GitHub 支援。
