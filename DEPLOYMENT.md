# 公開部署紀錄

日期：2026-11-20（Asia/Taipei）。依使用者明確授權公開 GitHub Repository 並部署 Firebase Hosting。

- 公開網站：https://palau-journey-2027-fortune.web.app
- 公開原始碼：https://github.com/fortune-ai-ux/palau-sustainable-journey
- 行程資料修訂證據：https://github.com/fortune-ai-ux/palau-sustainable-journey/commit/1f00ccb
- Firebase 專案：`palau-journey-2027-fortune`（獨立新專案，未覆蓋其他網站）
- Firebase Hosting version：`0a46ac363dbc3f99`
- 應用程式建置來源：`7108d5b2b3f52852e567def28847a9e38626f276`；本次另新增 `.firebaserc` 與更新部署文件，不更動應用程式內容。
- 原先 Sites 私人版本權限保持不變；老師請使用以上 Firebase 公開網址。

## 驗證結果

- `npm run build` 成功。
- GitHub API 回報 `PUBLIC`，預設分支為 `main`，所有原始開發提交均已推送。
- 未登入 HTTP 請求檢查 GitHub Repository 及網站首頁、`/budget`、`/itinerary`、`/attractions/rock`，皆回傳 HTTP 200。
- 對 Firebase 正式網址執行 9 項 Edge Playwright 測試，全數通過（20.5 秒）。包含 375、768、1024、1440px 下七條路由版面檢查、清單保存、收支 CRUD 與換算、CSV、行程 CRUD 與還原、手機選單、篩選與異常儲存提示。
- 測試使用隔離瀏覽器 context，本機互動資料未上傳至伺服器。
- GitHub 未上傳 node_modules、dist、登入權杖、Firebase debug log 或瀏覽器個人資料。

## 後續更新

```powershell
npm run build
firebase deploy --only hosting
git add .
git commit -m "Describe your change"
git push github main
```

`.firebaserc` 已綁定本專案。尚未設定 GitHub 自動部署工作流程，推送程式碼不會自動更新 Firebase；修改網站後需另外執行部署指令。

網站不需登入即可瀏覽。localStorage 資料只存在該瀏覽器的同一網址來源；私人 Sites、本機與 Firebase 網址不共用資料。

## 海況調整部署

- 來源 Commit：`7b3d105`。
- Firebase Hosting version：`6da818b172aad281`，部署成功。
- 對調 8/06 與 8/10，更新洛克群島日期與 Maps 活動連結、8/06 頁首通知與雨衣／防水袋清單。
- 9 項核心測試、本機 11 項瀏覽器測試通過；正式網址再執行 2 項針對性瀏覽器測試全部通過，實際確認通知、兩日活動、地圖、景點日期、清單保存與舊資料遷移。
