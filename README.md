# 專案名稱：product-landing-agent-demo

這是一個由 AI Agent 依照小型 Web 產品團隊專業分工流程建立的「產品 / 作品銷售網站 MVP」。

## 專案說明
本網站旨在展示「天才」品牌（給寵物吃的健康飼料）的產品，並引導使用者前往外部通路購買。設計上著重於專業、清晰且具真實感的銷售頁體驗，並已針對 SEO 基礎與行動版 (RWD) 進行優化。

## 檔案結構
```
.
├── _headers              # Netlify/Cloudflare Pages 部署時的 HTTP 標頭設定 (包含 noindex)
├── index.html            # 網站主結構與內容
├── styles.css            # 網站樣式 (無框架，純 CSS)
├── script.js             # 網站互動邏輯 (FAQ 展開、平滑滾動)
├── README.md             # 專案文件
├── AGENT_TEST_REPORT.md  # AI Agent 執行實測紀錄與 QA 報告
└── assets/
    └── images/
        └── product-01.jpg # 產品圖片 (使用相對路徑引用)
```

## 本機開啟方式
無須安裝任何套件或伺服器。只需在電腦中將本專案資料夾解壓縮，直接使用瀏覽器 (如 Chrome) 雙擊開啟 `index.html` 即可預覽。

## 部署方式 (GitHub Pages 範例)
本專案為純靜態檔案，適合直接部署到 GitHub Pages：
1. 在 GitHub 建立新 Repository，將本資料夾所有檔案 Push 上去。
2. 進入該 Repo 的 `Settings` > `Pages`。
3. Source 選擇 `Deploy from a branch`。
4. Branch 選擇 `main` (或 master)，資料夾選擇 `/ (root)`，點擊 Save。
5. 等待 1~2 分鐘即可上線。
- **Build command**: 無 (留空)
- **Output directory**: `/` (根目錄)

## 替換與維護說明

**1. 替換產品 / 作品連結與圖片的方法**
- **圖片**：請將新的圖片放入 `assets/images/`，並在 `index.html` 約第 55 行的 `<img>` 標籤中更改 `src` 屬性。若無法讀取素材，本次執行已自動產出 `product-01.jpg` 的高品質灰色佔位圖，部署不會破版。
- **導流連結**：開啟 `index.html`，尋找 `<a href="https://shop.tapazo.pet/" ... class="btn btn-buy">`，將 `href` 替換為您的正式賣場連結。

**2. 外部連結與聯盟連結的設定說明**
目前所有的導外購買連結均已加上 `target="_blank" rel="noopener noreferrer"`。
若未來您獲得了聯盟行銷連結，請將屬性改為：
`rel="sponsored nofollow noopener noreferrer"`。

**3. 移除 noindex**
當網站準備好公開時：
1. 刪除 `index.html` 中的 `<meta name="robots" content="noindex">`。
2. 刪除 `_headers` 檔案。
