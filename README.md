# 帛琉南島永續實踐計畫

Palau Sustainable Journey：React、Vite、TypeScript、Tailwind CSS、React Router、Lucide React 製作的繁體中文互動旅遊網站。無後端、無登入即可在本機與 Firebase 瀏覽。Sites 私人發佈版本則由平台控制擁有者存取權。

## 公開交付狀態（2026-11-20）

- GitHub Public Repository：https://github.com/fortune-ai-ux/palau-sustainable-journey
- Firebase 專案：`palau-journey-2027-fortune`，已登入授權；部署結果見 DEPLOYMENT.md。
- `.firebaserc` 已設定 default 專案。後續可使用 `npm run build` 與 `firebase deploy --only hosting` 更新。
- 真實預設行程修訂：https://github.com/fortune-ai-ux/palau-sustainable-journey/commit/1f00ccb

## 已完成功能

- 六個頁面：首頁、每日行程、景點介紹、行前準備、旅行記帳、計畫介紹。
- 15 天、45 項原始活動完整保留；原始活動時間皆為 `null`，顯示「時間未定」。行前培訓另有完整 12 段時間軸。
- 日期切換、景點詳情、分類篩選、Google Maps 官方搜尋連結、新分頁開啟、SDGs 與日期交叉連結。
- 行程活動新增、編輯、刪除；每日主題編輯；還原全部原始行程。首頁行程預覽同步反映本機修改。
- 33 項建議準備清單，支援勾選、完成率、自訂項目、刪除與重設。
- 收支新增、修改、刪除、搜尋、日期排序、分類篩選、分類長條圖、CSV 匯出。
- 可設定總預算與手動 USD/TWD 匯率；保留原始金額與幣別。預設匯率 32 僅為示範值，不是即時匯率。
- `decimal.js` 十進位換算，逐筆四捨五入至 TWD 分，再以整數分加總。剩餘預算＝總預算＋收入－支出。
- localStorage 版本封套、資料形狀驗證、損壞資料回退、儲存失敗提示。異常原始資料不自動覆寫，可匯出後重設。
- 頁尾可匯出全部資料 JSON 與重設全部資料；JSON 為備份檔，目前不提供 UI 匯入。CSV 使用 UTF-8 BOM、引號跳脫與公式注入防護。
- 響應式導覽、375px 手機單欄、平板與桌機布局、原生 dialog 焦點限制、Esc 關閉、表單標籤、刪除確認與成功提示。

## 執行

建議 Node.js 22.12+ 或 24 LTS。本次使用 Node 24.14.0、npm 11.9.0。

```powershell
cd "C:\Users\h1263\Documents\Codex\2026-11-20\files-pasted-by-the-user-codex\outputs\palau-journey"
npm ci
npm run dev
```

開啟終端機顯示的網址，預設為 http://127.0.0.1:5173/。

```powershell
npm run build
npm run preview
```

正式檔案在 `dist/`。請使用 HTTP 伺服器，不能直接雙擊 `dist/index.html`。

## 測試

```powershell
npm test
# 另一個終端機先執行 npm run dev -- --port 5173
npm run test:e2e
```

瀏覽器測試使用本機 Microsoft Edge（Playwright `channel: msedge`）。其他系統可安裝 Edge，或改用已安裝的 Playwright Chromium。測試用乾淨瀏覽器 context，不會清除你的日常瀏覽資料。`PLAYWRIGHT_BASE_URL` 可指定 Production Preview 網址。

```powershell
# 測試 production build：先 npm run preview -- --port 4173
$env:PLAYWRIGHT_BASE_URL = 'http://127.0.0.1:4173'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

完整結果與評分對照見 [ACCEPTANCE.md](ACCEPTANCE.md)。

## 檔案結構

```text
palau-journey/
├─ src/
│  ├─ main.tsx / App.tsx       React 啟動、路由、導覽與頁尾
│  ├─ types.ts                行程、景點、清單、交易型別
│  ├─ styles.css              Tailwind 與響應式設計系統
│  ├─ components/UI.tsx       卡片、Modal、SDGs、地圖連結
│  ├─ data/
│  │  ├─ itinerary.json       15 天原始行程
│  │  ├─ checklist.json       33 項建議清單
│  │  ├─ training.json        行前培訓
│  │  ├─ places.ts            16 個地點、來源與位置確認狀態
│  │  └─ index.ts             行程與景點對應
│  ├─ lib/
│  │  ├─ store.tsx            跨頁共享狀態、匯出與重設
│  │  ├─ storage.ts           版本與異常處理
│  │  ├─ money.ts             金額與 CSV 處理
│  │  └─ core.test.ts         核心測試
│  └─ pages/                 Home / Itinerary / Attractions / Checklist / Budget / About
├─ public/images/            三張合法授權的真實帛琉照片
├─ public/images-sources.json 作者、來源、授權與圖說
├─ tests/journey.spec.ts      瀏覽器驗收測試
├─ playwright.config.ts
├─ firebase.json             Firebase SPA fallback
├─ .openai/hosting.json       Sites 私人部署設定
├─ .gitignore
├─ package.json / package-lock.json
├─ README.md / ACCEPTANCE.md
└─ dist/                     npm run build 產物（不進 Git）
```

## 資料與內容限制

localStorage key 為 `palau:v1:days`、`palau:v1:checklist`、`palau:v1:transactions`、`palau:v1:settings`，內容封套 `{version:1,data:...}`。資料僅保存在單一瀏覽器與同一來源網址。換裝置、換瀏覽器、換網址、清除網站資料或無痕模式結束，都可能看不到原資料；不提供雲端同步。請定期使用頁尾 JSON 與記帳 CSV 匯出。

原始計畫由使用者提供，網站非官方公告。`SEG` 依 Day 15 原文保留，未擅自改為 `ESG`。Day 3 補充說明只釐清確認責任，不變更原始活動。預設資料修訂不會覆寫已儲存的個人行程；可先備份，再點還原原始行程取得新版預設值。

洛克群島與部分設施已查閱官方來源，其他地點標示「位置待確認」。地名核實不代表已預約、已確認開放或確認實際參訪路線。地圖皆為官方搜尋格式，不使用虛構座標；無法保證搜尋一定有結果。行前入境、航班、價格及參訪許可需另行確認。

三張實景照片皆為 Luka Peternel 拍攝帛琉景觀，CC BY-SA 4.0；圖片裁切與縮放仍遵守原授權。無設施實景的卡片明確標示「帛琉風景示意，非該設施照片」，不冒充特定設施。照片來源與官方景點連結見網站計畫介紹及各景點詳情。

## Git 真實開發紀錄

專案開始時檢查無現有 Git repo，於本資料夾初始化 `main`。提交由實際完成階段產生，未修改時間或偽造歷史。作者使用 `Codex <codex@local.invalid>` 表示協作產出。

| Commit    | 實際內容                                        |
| --------- | ----------------------------------------------- |
| `e23f234` | React/Vite 架構與設計基礎                       |
| `9c35e3f` | 完整 15 天行程、16 地點、首頁與景點頁           |
| `9e40a7f` | 清單保存與十進位記帳                            |
| `9733916` | 行程編輯、還原、完整六頁導覽                    |
| `a62ef75` | 響應式與 SPA Hosting 設定                       |
| `1f00ccb` | 真實預設資料修訂：補充 Day 3 復育參與與位置確認 |

後續測試修正與交付文件另有實際提交。使用 `git log --oneline` 查看完整紀錄。評分證據可執行：

```powershell
git show 1f00ccb -- src/data/itinerary.json
```

**網站內編輯是 localStorage 修改，不是 Git Commit。** 若要修改全站初始資料，需編輯 `src/data/itinerary.json`、測試、提交再部署。

## GitHub 公開 Repository（需要你操作／授權）

GitHub Repository 已依使用者授權建立為 Public 並推送全部歷史。以下保留另建儲存庫的操作指引。Sites 的私人來源儲存庫不等於公開 GitHub 課程證據。請在 GitHub 登入後新增空白 Repository，名稱例如 `palau-sustainable-journey`，選 **Public**，不要勾選自動產生 README、.gitignore 或 License。

將 `YOUR_ACCOUNT` 替換成你的 GitHub 帳號：

```powershell
git remote -v
git remote add github https://github.com/YOUR_ACCOUNT/palau-sustainable-journey.git
git push -u github main
```

若已存在 `github` 遠端：

```powershell
git remote set-url github https://github.com/YOUR_ACCOUNT/palau-sustainable-journey.git
git push -u github main
```

GitHub 驗證使用 Git Credential Manager／瀏覽器登入，勿把 token 寫入網址或檔案。保留 Sites 使用的 `origin`（若存在），新增 `github` 不會覆蓋它。公開前檢查 `git status`、`git ls-files`，確認沒有敏感資料。`.env*`、Firebase 本機狀態、node_modules 與 dist 已忽略。最後以未登入／無痕視窗確認 Repository 可見，再提供老師 Repository URL 與 Commit URL。

## Firebase Hosting 部署（優先支援）

已使用本機 Firebase 登入授權，建立獨立專案 `palau-journey-2027-fortune` 並設定部署。以下保留重新登入或另選專案的操作指引。請先於 Firebase Console 建立／選擇自己的專案、啟用 Hosting，再執行：

```powershell
npm ci
npm run build
npm install -g firebase-tools
firebase login
firebase use --add
# 選擇你的 Firebase 專案並設定 default alias
firebase deploy --only hosting
```

亦可直接指定專案：

```powershell
firebase deploy --only hosting --project YOUR_FIREBASE_PROJECT_ID
```

現成 `firebase.json` 以 `dist` 為 public，`**` rewrite 到 `/index.html`，因此 `/itinerary`、`/budget`、`/attractions/rock` 直接開啟與重新整理均回傳 SPA。已有設定，無需重新執行 `firebase init` 覆蓋檔案。網站無需 API 金鑰或前端環境變數。

部署後檢查首頁、直接輸入 `/budget` 並重新整理、圖片、收支保存及手機排版。Firebase 重新部署不會清除同一來源下的 localStorage。不同部署網址與本機開發網址的資料互不共用。

## 評分交付前仍需確認

1. GitHub Public Repository 已建立並推送；交付時提供上方連結。
2. Firebase 已授權，公開部署網址與驗證結果見 DEPLOYMENT.md。Sites 私人網址仍保留原權限。
3. 主辦單位確認未指名設施、集合地點、行程時間、機票、入境與參訪安排。
4. 若課程要求每個設施皆有其實景照片，需補齊獲授權的對應照片；目前以明確標示的帛琉風景示意呈現。

## 海況行程調整

依使用者提供的海況與停航資訊，8/06（Day 9）與 8/10（Day 13）的主題、活動、SDGs 已對調，8/06 頁首顯示「因海況不佳，行程已調整」。洛克群島日期與 Maps 活動連結移至 8/10；8/06 鳥類調查未提供確切地點，維持不臆造地圖位置。個人用品新增「雨衣／防水袋」，共 33 項。

資料封套新增 `contentRevision: 2`。既有版本 1 儲存資料會一次性對調兩日內容、保留個人修改與自訂活動，清單只補新增項目且保留勾選；不影響記帳與匯率。完成遷移後會持久儲存 revision，避免每次重新整理再次對調。還原行程會回到調整後的預設安排。
