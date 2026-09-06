# 黃明祈 · Ming-Chi Huang — 個人履歷網站 / Personal Resume Site

一頁式雙語（中文 / English）個人履歷網站。純 HTML / CSS / JavaScript，無框架、無建置流程，可直接部署到 GitHub Pages。

A single-page bilingual (Chinese / English) résumé site. Plain HTML, CSS, and JavaScript — no framework, no build step — ready to deploy on GitHub Pages as-is.

## 結構 / Structure

```
.
├── index.html              主頁面 / main page
├── assets/
│   ├── css/style.css       樣式（CSS variables 管理設計 token）
│   ├── js/main.js          語言切換 + 滾動顯示效果
│   └── img/
│       └── profile-duotone.jpg   已處理過的雙色調人像照
└── README.md
```

## 語言切換 / Language toggle

所有需要翻譯的文字都包在成對的 `<span class="zh">…</span>` / `<span class="en">…</span>` 裡，由 `<html data-lang="zh|en">` 屬性決定顯示哪一組，切換邏輯在 `assets/js/main.js`（並用 `localStorage` 記住上次選擇的語言，供同一瀏覽器下次造訪使用）。要新增或修改文案時，記得中英兩個 `span` 都要一起改。

Every translatable string is wrapped in a paired `<span class="zh">…</span>` / `<span class="en">…</span>`, toggled via the `data-lang` attribute on `<html>` (logic lives in `assets/js/main.js`, with the last-chosen language remembered via `localStorage` for repeat visits on the same browser). When editing copy, update both spans together.

## 部署到 GitHub Pages / Deploy to GitHub Pages

1. 在 GitHub 建立一個新的 repository（例如 `mingchi-resume` 或 `<你的帳號>.github.io`）。
   Create a new GitHub repository (e.g. `mingchi-resume`, or `<username>.github.io` for a root-level personal site).
2. 把這個資料夾推上去：
   Push this folder:
   ```bash
   git remote add origin git@github.com:<你的帳號>/<repo名稱>.git
   git branch -M main
   git push -u origin main
   ```
3. 到 repository 的 **Settings → Pages**，Source 選擇 `main` branch、`/ (root)`，儲存後等一兩分鐘即可上線。
   In the repo's **Settings → Pages**, set the source to the `main` branch, root folder, save, and the site will be live within a minute or two.

## 待你確認的項目 / To update before publishing

- `index.html` 裡有兩處 `REPLACE_GITHUB_USERNAME` 佔位字串（Hero 區塊與頁尾各一個），請換成你實際的 GitHub 帳號網址。
  Two `REPLACE_GITHUB_USERNAME` placeholders in `index.html` (hero section and footer) need your real GitHub username.
- 網站刻意不放電話、地址、年齡、健康狀況、期望薪資等資訊，只保留 Email 與 GitHub 連結。若要調整聯繫方式，直接修改 `index.html` 中 `#contact` 區塊與 Hero 區塊的 CTA 按鈕。
  The site intentionally omits phone, address, age, health status, and salary expectations — only email and GitHub are exposed. To change contact info, edit the CTA buttons in the hero section and the `#contact` footer block.
- 英文文案（公司/專案的英譯）已盡量核對過官方英文名稱（統一資訊 → President Information Corporation；統一證券 → President Securities；亞東石化 → Oriental Petrochemical (Taiwan)）。「大智通」與「樂清」非上市公司，英文為音譯，非官方正式英文名稱，如有正式名稱請自行替換。
  Company names have been cross-checked against official English names where verifiable (President Information Corporation, President Securities, Oriental Petrochemical (Taiwan)). "Dazhitong" and "Le-Ching" are phonetic renderings, not confirmed official English names — replace them if the companies have a registered English name.

## 設計理念 / Design notes

視覺概念是「系統運行紀錄」：像在讀一份規格文件或維運日誌，而不是行銷落地頁。冷調的圖紙灰綠背景（`--paper`）搭配深墨色文字（`--ink`）與訊號青色強調色（`--accent`），刻意避開了「暖米白＋襯線標題＋赭紅強調色」這種近來很常見、容易被認出是 AI 生成的編輯風配色。

中文標題使用 Noto Sans TC 粗黑體，英文與所有「資料型」內容（日期、技術標籤、章節編號、導覽列、按鈕）則使用 IBM Plex Mono 等寬字體──讓兩種文字系統本身就呈現出不同的語域：中文是內容，英文/等寬是結構與資料。章節標題前的「§01」編號、技術標籤的中括號寫法 `[Vue.js]`，都是刻意向工程文件／設定檔語彙靠攏的細節。

The visual concept is a "system log" — read more like a spec sheet or an ops runbook than a marketing landing page. A cool schematic-paper grey-green background (`--paper`) pairs with ink-black text (`--ink`) and a signal-teal accent (`--accent`), deliberately avoiding the warm-cream + serif-headline + rust-accent combination that has become a common, easily-recognized "AI editorial" look.

Chinese headings use a heavy Noto Sans TC; English text and anything data-shaped (dates, tech tags, section numbers, nav, buttons) uses IBM Plex Mono — so the two writing systems carry different registers by design: Chinese is content, monospace is structure and data. The "§01" section numbering and the bracketed `[Vue.js]` tech tags are deliberate nods to the vernacular of specs and config files.
