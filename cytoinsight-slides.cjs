const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'Leica CytoInsight AI';
pres.author = 'Leica Biosystems Taiwan';

// ── COLOR PALETTE ──────────────────────────────────────
const C = {
  bg:     '080C12',
  bg2:    '0D1420',
  bg3:    '121B2A',
  teal:   '00D4A8',
  teal2:  '00A882',
  gold:   'C9A84C',
  white:  'F0F6FF',
  muted:  '6B7FA3',
  muted2: '3A4D6B',
  red:    'FF4D6D',
};

// ── HELPER: dark slide background ──────────────────────
function darkBg(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: C.bg }, line: { color: C.bg }
  });
}

// ── HELPER: teal accent bar (top) ──────────────────────
function topAccent(slide, opacity = 1) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: C.teal, transparency: opacity < 1 ? Math.round((1-opacity)*100) : 0 },
    line: { color: C.teal }
  });
}

// ── HELPER: section label ──────────────────────────────
function sectionLabel(slide, text, x, y) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 0.25, h: 0.018,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  slide.addText(text, {
    x: x + 0.32, y: y - 0.06, w: 5, h: 0.2,
    fontSize: 8, fontFace: 'Courier New', color: C.teal,
    bold: false, charSpacing: 4
  });
}

// ── HELPER: stat block ────────────────────────────────
function statBlock(slide, num, unit, label, x, y) {
  slide.addText(num, {
    x: x, y: y, w: 1.4, h: 0.65,
    fontSize: 38, fontFace: 'Courier New', color: C.teal,
    bold: true, align: 'left', valign: 'bottom', margin: 0
  });
  if (unit) {
    slide.addText(unit, {
      x: x + 0.72, y: y + 0.15, w: 0.6, h: 0.35,
      fontSize: 16, fontFace: 'Courier New', color: C.gold,
      bold: false, align: 'left', margin: 0
    });
  }
  slide.addText(label, {
    x: x, y: y + 0.65, w: 1.6, h: 0.28,
    fontSize: 8, fontFace: 'Courier New', color: C.muted,
    align: 'left', margin: 0
  });
}

// ── HELPER: card box ──────────────────────────────────
function card(slide, x, y, w, h, options = {}) {
  const { accent = false, tealBorder = false } = options;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.bg2 },
    line: { color: tealBorder ? C.teal : C.muted2, width: 0.8 },
    shadow: { type: 'outer', color: '000000', blur: 8, offset: 2, angle: 135, opacity: 0.3 }
  });
  if (accent) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.03,
      fill: { color: C.teal }, line: { color: C.teal }
    });
  }
}

// ─────────────────────────────────────────────────────
// SLIDE 1: COVER
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);

  // Left teal accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.06, h: 5.625,
    fill: { color: C.teal }, line: { color: C.teal }
  });

  // Brand label
  s.addText('LEICA BIOSYSTEMS / CYTOVISION PLATFORM', {
    x: 0.35, y: 0.3, w: 8, h: 0.22,
    fontSize: 8, fontFace: 'Courier New', color: C.teal,
    charSpacing: 3, margin: 0
  });

  // Main title
  s.addText([
    { text: 'CytoInsight', options: { color: C.white, bold: true } },
    { text: '\nAI', options: { color: C.teal, bold: true } }
  ], {
    x: 0.35, y: 0.7, w: 7, h: 2.0,
    fontSize: 72, fontFace: 'Georgia', align: 'left', margin: 0
  });

  // Subtitle
  s.addText('讓染色體排列不再耗時', {
    x: 0.35, y: 2.7, w: 6.5, h: 0.55,
    fontSize: 26, fontFace: 'Microsoft JhengHei', color: C.white,
    bold: false, margin: 0
  });

  // Description
  s.addText('CytoVision 平台的 AI 智能升級模組，以深度學習自動完成核型製作。', {
    x: 0.35, y: 3.32, w: 5.8, h: 0.4,
    fontSize: 12, fontFace: 'Microsoft JhengHei', color: C.muted,
    margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 3.82, w: 5.5, h: 0.018,
    fill: { color: C.muted2 }, line: { color: C.muted2 }
  });

  // Stats row
  statBlock(s, '4', '×', '效率提升', 0.35, 3.95);
  statBlock(s, '93.6', '%', '手動操作時間縮短', 1.95, 3.95);
  statBlock(s, '3', '分鐘', '每個核型平均耗時', 4.15, 3.95);

  // Right side orb circle decoration
  s.addShape(pres.shapes.OVAL, {
    x: 7.2, y: 0.5, w: 3.2, h: 3.2,
    fill: { color: C.teal, transparency: 92 },
    line: { color: C.teal, width: 0.5, transparency: 75 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.6, y: 0.9, w: 2.4, h: 2.4,
    fill: { color: 'transparent', transparency: 100 },
    line: { color: C.teal, width: 0.5, transparency: 70 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 8.0, y: 1.3, w: 1.6, h: 1.6,
    fill: { color: 'transparent', transparency: 100 },
    line: { color: C.gold, width: 0.5, transparency: 65 }
  });

  // Footer
  s.addText('Leica Biosystems · CytoInsight AI  |  Deep Learning · Cell Genetics', {
    x: 0.35, y: 5.3, w: 9, h: 0.2,
    fontSize: 7, fontFace: 'Courier New', color: C.muted,
    charSpacing: 1, margin: 0
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 2: PRODUCT POSITIONING
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'PRODUCT POSITIONING', 0.5, 0.22);

  s.addText('CytoInsight 在 CytoVision 平台中的位置', {
    x: 0.5, y: 0.5, w: 8.5, h: 0.6,
    fontSize: 24, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  s.addText('CytoInsight 並非獨立硬體，而是 CytoVision 的 AI 軟體升級模組，採用「人機協作」設計哲學。', {
    x: 0.5, y: 1.12, w: 8.5, h: 0.3,
    fontSize: 11, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Base platform card
  card(s, 0.5, 1.55, 4.1, 1.55, { tealBorder: false });
  s.addText('基礎平台', {
    x: 0.65, y: 1.62, w: 3, h: 0.2,
    fontSize: 7, fontFace: 'Courier New', color: C.muted, charSpacing: 2, margin: 0
  });
  s.addText('CytoVision 核心功能', {
    x: 0.65, y: 1.84, w: 3.8, h: 0.3,
    fontSize: 14, fontFace: 'Microsoft JhengHei', color: C.white, bold: true, margin: 0
  });
  const baseFeatures = ['Metaphase Finding', '高解析度影像擷取', '手動排列介面', 'LIMS / LIS 整合'];
  baseFeatures.forEach((f, i) => {
    s.addText('▸ ' + f, {
      x: 0.65, y: 2.2 + i * 0.2, w: 3.8, h: 0.2,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });
  });

  // Arrow
  s.addShape(pres.shapes.RIGHT_ARROW, {
    x: 4.72, y: 2.05, w: 0.5, h: 0.4,
    fill: { color: C.teal, transparency: 30 },
    line: { color: C.teal }
  });

  // AI module card
  card(s, 5.35, 1.55, 4.1, 1.55, { tealBorder: true, accent: true });
  s.addText('AI 升級模組', {
    x: 5.5, y: 1.62, w: 3.5, h: 0.2,
    fontSize: 7, fontFace: 'Courier New', color: C.teal, charSpacing: 2, margin: 0
  });
  s.addText('CytoInsight AI 功能', {
    x: 5.5, y: 1.84, w: 3.8, h: 0.3,
    fontSize: 14, fontFace: 'Microsoft JhengHei', color: C.teal, bold: true, margin: 0
  });
  const aiFeatures = ['AI 自動核型分析', '深度學習染色體分類', 'AI FISH 自動計數', '智能品質篩選'];
  aiFeatures.forEach((f, i) => {
    s.addText('▸ ' + f, {
      x: 5.5, y: 2.2 + i * 0.2, w: 3.8, h: 0.2,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.teal, margin: 0
    });
  });

  // 3 key points below
  const pts = [
    { icon: '↑', title: '現有用戶可軟體升級', desc: '已有 CytoVision 的客戶通常無需更換硬體，透過軟體授權即可導入。' },
    { icon: '◉', title: '單一介面完成全流程', desc: '從影像擷取、AI 分析、人工審查到報告輸出，全在一個介面完成。' },
    { icon: '⟳', title: '模型持續自我優化', desc: '醫檢師的修正記錄可持續回饋優化 AI 模型精準度。' }
  ];
  pts.forEach((p, i) => {
    const x = 0.5 + i * 3.17;
    card(s, x, 3.25, 2.98, 2.0);
    s.addText(p.icon, { x: x+0.18, y: 3.38, w: 0.4, h: 0.35, fontSize: 16, color: C.teal, margin: 0 });
    s.addText(p.title, {
      x: x + 0.6, y: 3.38, w: 2.28, h: 0.35,
      fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.white, bold: true, margin: 0
    });
    s.addText(p.desc, {
      x: x + 0.18, y: 3.78, w: 2.65, h: 1.1,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 3: FOUR AI MODULES (OVERVIEW)
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'CORE AI CAPABILITIES', 0.5, 0.22);
  s.addText('四大 AI 核心模組', {
    x: 0.5, y: 0.5, w: 9, h: 0.6,
    fontSize: 26, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  const modules = [
    {
      num: '01', tag: 'AUTO-KARYOTYPING', title: 'AI 自動核型分析',
      desc: 'AI 在數秒內自動完成染色體分割、條帶辨識、同源配對，並按 ISCN 標準排列核型圖。',
      stat: '93.6%', statLabel: '手動操作時間縮短', icon: '🧬'
    },
    {
      num: '02', tag: 'DEEP LEARNING', title: '深度學習染色體分類',
      desc: 'CNN 模型依長度、著絲點位置及 G-band 條帶模式精準分類，主動標記品質不佳染色體。',
      stat: '>99%', statLabel: '染色體分割定位準確率', icon: '🤖'
    },
    {
      num: '03', tag: 'FISH SIGNAL ANALYSIS', title: 'AI 輔助 FISH 訊號計數',
      desc: '自動偵測紅／綠／橘／金色螢光訊號，批次分析多細胞並產出統計摘要，標記異常細胞。',
      stat: '4+', statLabel: '螢光色彩同步計數', icon: '🔬'
    },
    {
      num: '04', tag: 'QUALITY INTELLIGENCE', title: '智能品質篩選',
      desc: '依染色體分散程度、重疊狀況、條帶清晰度自動評分，將最佳分裂相優先呈現給醫檢師。',
      stat: '自動', statLabel: '品質評分排序', icon: '⭐'
    },
  ];

  modules.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.8;
    const y = 1.35 + row * 2.05;

    card(s, x, y, 4.55, 1.85, { tealBorder: col === 0 && row === 0 });

    // Top-left number
    s.addText(m.num, {
      x: x + 0.18, y: y + 0.1, w: 0.5, h: 0.3,
      fontSize: 9, fontFace: 'Courier New', color: C.muted, charSpacing: 2, margin: 0
    });
    s.addText(m.tag, {
      x: x + 0.65, y: y + 0.1, w: 3.5, h: 0.25,
      fontSize: 7, fontFace: 'Courier New', color: C.teal, charSpacing: 2, margin: 0
    });
    s.addText(m.title, {
      x: x + 0.18, y: y + 0.38, w: 3.5, h: 0.35,
      fontSize: 13, fontFace: 'Microsoft JhengHei', color: C.white, bold: true, margin: 0
    });
    s.addText(m.desc, {
      x: x + 0.18, y: y + 0.76, w: 3.5, h: 0.65,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });
    // Stat
    s.addText(m.stat, {
      x: x + 3.75, y: y + 0.35, w: 0.65, h: 0.4,
      fontSize: 14, fontFace: 'Courier New', color: C.teal, bold: true, align: 'right', margin: 0
    });
    s.addText(m.statLabel, {
      x: x + 3.1, y: y + 0.78, w: 1.3, h: 0.35,
      fontSize: 7, fontFace: 'Microsoft JhengHei', color: C.gold, align: 'right', margin: 0
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 4: AUTO-KARYOTYPING DETAIL
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  // Left teal side accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0.04, w: 0.04, h: 5.585,
    fill: { color: C.teal, transparency: 60 }, line: { color: C.teal, transparency: 60 }
  });

  s.addText('01 / AUTO-KARYOTYPING', {
    x: 0.3, y: 0.2, w: 7, h: 0.22,
    fontSize: 8, fontFace: 'Courier New', color: C.teal, charSpacing: 3, margin: 0
  });
  s.addText('AI 自動核型分析', {
    x: 0.3, y: 0.46, w: 8, h: 0.6,
    fontSize: 28, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  // Left column - description
  s.addText('工作原理', {
    x: 0.3, y: 1.2, w: 4, h: 0.28,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.gold, bold: true, margin: 0
  });

  const steps = [
    '① 染色體分割 — AI 精準識別每條染色體邊界',
    '② 條帶辨識 — 自動分析 G-band / R-band 模式',
    '③ 同源配對 — 依長度與著絲點位置智能配對',
    '④ ISCN 排列 — 按國際標準自動生成完整核型圖',
    '⑤ 異常標記 — 主動標記辨識不確定的染色體',
  ];
  steps.forEach((st, i) => {
    s.addText(st, {
      x: 0.3, y: 1.52 + i * 0.34, w: 4.5, h: 0.3,
      fontSize: 10, fontFace: 'Microsoft JhengHei', color: i === 0 ? C.white : C.muted,
      margin: 0
    });
  });

  s.addText('醫檢師僅需審查並微調少數辨識錯誤，大幅降低重複性作業負擔，讓專業判斷聚焦在真正重要的複雜案例。', {
    x: 0.3, y: 3.3, w: 4.5, h: 0.7,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Right column - stats
  const stats = [
    { num: '93.6%', label: '手動操作時間縮短（官方數據）' },
    { num: '>30yr', label: 'Leica 細胞遺傳學驗證歷史' },
    { num: '數秒', label: '完成一個核型的初步排列' },
  ];
  stats.forEach((st, i) => {
    card(s, 5.2, 1.2 + i * 1.38, 4.5, 1.2, { tealBorder: i === 0, accent: i === 0 });
    s.addText(st.num, {
      x: 5.4, y: 1.42 + i * 1.38, w: 4, h: 0.52,
      fontSize: 36, fontFace: 'Courier New', color: i === 0 ? C.teal : C.gold, bold: true, margin: 0
    });
    s.addText(st.label, {
      x: 5.4, y: 1.96 + i * 1.38, w: 4, h: 0.3,
      fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 5: DEEP LEARNING + FISH (combined)
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  // Left half: Deep Learning
  sectionLabel(s, '02 / DEEP LEARNING CLASSIFICATION', 0.5, 0.22);
  s.addText('深度學習染色體分類', {
    x: 0.5, y: 0.5, w: 4.3, h: 0.55,
    fontSize: 18, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  card(s, 0.5, 1.15, 4.3, 1.5, { tealBorder: true, accent: true });
  s.addText('CNN 深度學習架構', {
    x: 0.7, y: 1.22, w: 3.8, h: 0.28,
    fontSize: 11, fontFace: 'Microsoft JhengHei', color: C.teal, bold: true, margin: 0
  });
  s.addText('卷積神經網路（CNN）訓練自數萬條已標註染色體\n依長度、著絲點位置及 G-band 條帶模式精準分類', {
    x: 0.7, y: 1.53, w: 3.9, h: 0.8,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  const dlStats = [
    ['>99%', '染色體分割定位準確率'],
    ['CNN', '深度學習架構'],
  ];
  dlStats.forEach(([n, l], i) => {
    s.addText(n, { x: 0.5 + i*2.15, y: 2.82, w: 2, h: 0.42, fontSize: 28, fontFace: 'Courier New', color: i===0?C.teal:C.gold, bold: true, margin: 0 });
    s.addText(l, { x: 0.5 + i*2.15, y: 3.26, w: 2, h: 0.28, fontSize: 8, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0 });
  });

  s.addText('遇染色體重疊、扭轉或品質不佳時，AI 主動標記供醫檢師優先審查。', {
    x: 0.5, y: 3.65, w: 4.3, h: 0.5,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4.95, y: 0.1, w: 0.018, h: 5.4,
    fill: { color: C.muted2 }, line: { color: C.muted2 }
  });

  // Right half: FISH
  sectionLabel(s, '03 / FISH SIGNAL ANALYSIS', 5.15, 0.22);
  s.addText('AI 輔助 FISH 訊號計數', {
    x: 5.15, y: 0.5, w: 4.6, h: 0.55,
    fontSize: 18, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  card(s, 5.15, 1.15, 4.6, 1.5, { tealBorder: true, accent: true });
  s.addText('多色螢光自動計數', {
    x: 5.35, y: 1.22, w: 4, h: 0.28,
    fontSize: 11, fontFace: 'Microsoft JhengHei', color: C.teal, bold: true, margin: 0
  });
  s.addText('自動偵測並依顏色（紅/綠/橘/金色）分別計數螢光訊號\n批次分析多個細胞並產出統計摘要報告', {
    x: 5.35, y: 1.53, w: 4.1, h: 0.8,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  const fishColors = [
    { c: 'FF4D6D', label: '紅' },
    { c: '00D4A8', label: '綠' },
    { c: 'FF8C42', label: '橘' },
    { c: 'C9A84C', label: '金' },
  ];
  fishColors.forEach((fc, i) => {
    s.addShape(pres.shapes.OVAL, {
      x: 5.15 + i * 1.14, y: 2.82, w: 0.32, h: 0.32,
      fill: { color: fc.c }, line: { color: fc.c }
    });
    s.addText(fc.label, {
      x: 5.5 + i * 1.14, y: 2.84, w: 0.6, h: 0.25,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.white, margin: 0
    });
  });

  s.addText('自動標記訊號數量異常細胞（基因擴增或缺失），大幅降低視覺疲勞。', {
    x: 5.15, y: 3.3, w: 4.6, h: 0.5,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Slide 5 footer
  const fishStats = [
    ['4+', '螢光色彩同步計數'],
    ['批次', '多細胞自動分析'],
  ];
  fishStats.forEach(([n, l], i) => {
    s.addText(n, { x: 5.15 + i*2.3, y: 3.92, w: 2, h: 0.42, fontSize: 28, fontFace: 'Courier New', color: i===0?C.teal:C.gold, bold: true, margin: 0 });
    s.addText(l, { x: 5.15 + i*2.3, y: 4.36, w: 2, h: 0.28, fontSize: 8, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0 });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 6: WORKFLOW COMPARISON (Before vs After)
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'EFFICIENCY COMPARISON', 0.5, 0.22);
  s.addText('導入前後工作流程比較', {
    x: 0.5, y: 0.5, w: 9, h: 0.55,
    fontSize: 24, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  // BEFORE column
  s.addText('傳統流程（無 AI）', {
    x: 0.5, y: 1.18, w: 4.1, h: 0.3,
    fontSize: 12, fontFace: 'Microsoft JhengHei', color: C.muted, bold: true, margin: 0
  });

  const beforeSteps = [
    { text: '① 掃描分裂相影像', time: '~5 min' },
    { text: '② 顯微鏡確認品質 / 手動翻閱', time: '~3 min' },
    { text: '③ 手動逐一辨識 46 條染色體', time: '~10–15 min  ⚠ 最耗時', highlight: true },
    { text: '④ 拖拉排列、配對（1-22 + XY）', time: '~5–10 min' },
    { text: '⑤ 核型圖完成 → 發報告', time: '~2 min' },
  ];
  beforeSteps.forEach((st, i) => {
    const y = 1.54 + i * 0.42;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 4.1, h: 0.36,
      fill: { color: st.highlight ? C.red : C.bg2, transparency: st.highlight ? 85 : 0 },
      line: { color: st.highlight ? C.red : C.muted2, width: 0.8 }
    });
    s.addText(st.text, {
      x: 0.65, y: y + 0.05, w: 2.5, h: 0.26,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: st.highlight ? C.red : C.muted, margin: 0
    });
    s.addText(st.time, {
      x: 3.2, y: y + 0.05, w: 1.25, h: 0.26,
      fontSize: 8, fontFace: 'Courier New', color: st.highlight ? C.red : C.muted,
      align: 'right', margin: 0
    });
  });

  s.addText('15–30', {
    x: 0.5, y: 3.75, w: 1.5, h: 0.5,
    fontSize: 32, fontFace: 'Courier New', color: C.red, bold: true, margin: 0
  });
  s.addText('分鐘 / 每個核型', {
    x: 2.02, y: 3.85, w: 2.5, h: 0.25,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Center arrow
  s.addShape(pres.shapes.RIGHT_ARROW, {
    x: 4.55, y: 2.45, w: 0.85, h: 0.5,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  s.addText('AI\n導入', {
    x: 4.58, y: 3.08, w: 0.8, h: 0.5,
    fontSize: 9, fontFace: 'Courier New', color: C.teal, align: 'center', margin: 0
  });

  // AFTER column
  s.addText('AI 輔助流程', {
    x: 5.4, y: 1.18, w: 4.3, h: 0.3,
    fontSize: 12, fontFace: 'Microsoft JhengHei', color: C.teal, bold: true, margin: 0
  });

  const afterSteps = [
    { text: '① 掃描分裂相（AI 同步品質評分）', time: '~3 min', ai: false },
    { text: '✦ AI 自動：辨識 → 分類 → 配對 → 排列', time: '數秒內完成', ai: true },
    { text: '② 醫檢師審查 AI 初稿（確認 / 微調）', time: '~1–2 min', ai: false },
    { text: '③ 核型圖完成 → 發報告', time: '~1 min', ai: false },
  ];
  afterSteps.forEach((st, i) => {
    const y = 1.54 + i * 0.46;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.4, y, w: 4.3, h: 0.38,
      fill: { color: st.ai ? C.teal : C.bg2, transparency: st.ai ? 85 : 0 },
      line: { color: st.ai ? C.teal : C.muted2, width: 0.8 }
    });
    s.addText(st.text, {
      x: 5.55, y: y + 0.06, w: 3.0, h: 0.26,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: st.ai ? C.teal : C.muted, margin: 0
    });
    s.addText(st.time, {
      x: 8.15, y: y + 0.06, w: 1.4, h: 0.26,
      fontSize: 8, fontFace: 'Courier New', color: st.ai ? C.teal : C.muted,
      align: 'right', margin: 0
    });
  });

  s.addText('3–5', {
    x: 5.4, y: 3.75, w: 1.2, h: 0.5,
    fontSize: 32, fontFace: 'Courier New', color: C.teal, bold: true, margin: 0
  });
  s.addText('分鐘 / 每個核型\n（效率提升 4–6×）', {
    x: 6.63, y: 3.78, w: 3.0, h: 0.42,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Bottom stats bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.42, w: 10, h: 1.2,
    fill: { color: C.bg2 }, line: { color: C.bg2 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.42, w: 10, h: 0.025,
    fill: { color: C.teal, transparency: 60 }, line: { color: C.teal, transparency: 60 }
  });

  const bottomStats = [
    { n: '5 hr', l: '每日節省的人力工時\n（每日 20 個樣本計算）' },
    { n: '93.6%', l: '手動操作時間縮短\n（官方實測）' },
    { n: '2–3 年', l: '人力成本節省回收\n設備投資期' },
  ];
  bottomStats.forEach((st, i) => {
    s.addText(st.n, {
      x: 0.8 + i * 3.2, y: 4.52, w: 2, h: 0.45,
      fontSize: 22, fontFace: 'Courier New', color: C.teal, bold: true, margin: 0
    });
    s.addText(st.l, {
      x: 0.8 + i * 3.2, y: 4.98, w: 2.5, h: 0.4,
      fontSize: 8, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 7: CONFIGURATION GUIDE
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'CONFIGURATION GUIDE', 0.5, 0.22);
  s.addText('配置選擇指南', {
    x: 0.5, y: 0.5, w: 9, h: 0.55,
    fontSize: 26, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  s.addText('依據實驗室規模與應用需求，快速對應最適配置', {
    x: 0.5, y: 1.08, w: 9, h: 0.28,
    fontSize: 11, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Table header
  const headers = ['實驗室規模', '主要應用', '每日樣本量', '建議配置', '核心效益'];
  const colW = [1.6, 1.8, 1.5, 2.2, 2.55];
  const colX = [0.3, 1.93, 3.76, 5.29, 7.52];

  colX.forEach((x, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.45, w: colW[i], h: 0.3,
      fill: { color: C.teal, transparency: 80 }, line: { color: C.teal, width: 0.5 }
    });
    s.addText(headers[i], {
      x: x + 0.05, y: 1.48, w: colW[i] - 0.1, h: 0.22,
      fontSize: 8, fontFace: 'Courier New', color: C.teal, bold: true, charSpacing: 1, margin: 0
    });
  });

  const rows = [
    ['小型診所 / 區域醫院', '產前診斷為主', '< 10 / 天', 'CytoVision + CytoInsight AI', '單一介面、軟體升級、快速導入'],
    ['中型醫院', '產前 + 血液腫瘤', '10–30 / 天', 'CytoVision + CytoInsight AI + FISH 模組', '雙應用整合、效率全面提升'],
    ['醫學中心', '完整細胞遺傳學', '> 30 / 天', 'CytoVision + CytoInsight AI + GSL-120 自動化', '高通量自動化、TAT 最大化'],
    ['獨立醫檢所', '大量批次樣本', '> 50 / 天', 'CytoVision + CytoInsight AI + 全自動上樣系統', '最大產能、ROI 最優'],
  ];

  rows.forEach((row, ri) => {
    const y = 1.78 + ri * 0.72;
    const isEven = ri % 2 === 0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 9.45, h: 0.68,
      fill: { color: isEven ? C.bg2 : C.bg3 }, line: { color: C.muted2, width: 0.5 }
    });
    row.forEach((cell, ci) => {
      const isLast = ci === 4;
      s.addText(cell, {
        x: colX[ci] + 0.05, y: y + 0.08, w: colW[ci] - 0.1, h: 0.54,
        fontSize: ci === 3 ? 8.5 : 9, fontFace: 'Microsoft JhengHei',
        color: ci === 3 ? C.teal : isLast ? C.gold : C.white,
        bold: ci === 3, margin: 0
      });
    });
  });

  // Key note at bottom
  s.addText('💡  已有 CytoVision 的客戶通常無需更換硬體，透過軟體授權即可升級導入 CytoInsight AI。', {
    x: 0.5, y: 4.7, w: 9, h: 0.35,
    fontSize: 10, fontFace: 'Microsoft JhengHei', color: C.teal, margin: 0
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 8: COMPETITIVE COMPARISON
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'COMPETITIVE COMPARISON', 0.5, 0.22);
  s.addText('Leica CytoInsight vs. 主要競品', {
    x: 0.5, y: 0.5, w: 9, h: 0.55,
    fontSize: 24, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  // Column headers
  const compHeaders = ['比較項目', '👑 Leica CytoInsight', 'Applied Spectral (ASI)', 'Metasystems Ikaros AI'];
  const cW = [2.4, 2.4, 2.3, 2.3];
  const cX = [0.3, 2.78, 5.22, 7.55];

  cX.forEach((x, i) => {
    const isLeica = i === 1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.2, w: cW[i], h: 0.35,
      fill: { color: isLeica ? C.teal : C.bg3, transparency: isLeica ? 85 : 0 },
      line: { color: isLeica ? C.teal : C.muted2, width: isLeica ? 1 : 0.5 }
    });
    s.addText(compHeaders[i], {
      x: x + 0.06, y: 1.24, w: cW[i] - 0.12, h: 0.27,
      fontSize: i === 0 ? 8 : 9, fontFace: 'Microsoft JhengHei',
      color: isLeica ? C.teal : C.white,
      bold: isLeica, charSpacing: i === 0 ? 1 : 0, margin: 0
    });
  });

  const compRows = [
    ['與硬體整合度', '✓ 與 CytoVision 原生整合，單一介面全流程', '△ 需搭配特定相機系統', '△ 需搭配 Metasystems 平台'],
    ['G-band AI 自動核型', '✓ 深度學習 CNN，分割定位準確率 >99%', '✓ 有 AI 功能', '✓ 有 AI 功能'],
    ['FISH AI 多色訊號計數', '✓ 多色螢光自動計數、異常標記', '✓ 支援', '✓ 支援'],
    ['AI 品質智能篩選', '✓ 自動評分、排序、閾值可自訂', '△ 較基本', '△ 較基本'],
    ['現有設備軟體升級', '✓ 以軟體授權導入，無需換硬體', '△ 限定硬體', '△ 限定硬體'],
    ['全球市佔率', '✓ CytoVision 全球市佔率第一', '中高', '中高'],
  ];

  compRows.forEach((row, ri) => {
    const y = 1.6 + ri * 0.62;
    const isEven = ri % 2 === 0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 9.45, h: 0.58,
      fill: { color: isEven ? C.bg2 : C.bg3 }, line: { color: C.muted2, width: 0.5 }
    });
    row.forEach((cell, ci) => {
      const isLeica = ci === 1;
      const isCheck = cell.startsWith('✓');
      const isDelta = cell.startsWith('△');
      s.addText(cell, {
        x: cX[ci] + 0.06, y: y + 0.06, w: cW[ci] - 0.12, h: 0.46,
        fontSize: 8.5, fontFace: 'Microsoft JhengHei',
        color: isLeica && isCheck ? C.teal : isDelta ? C.muted : C.white,
        bold: isLeica && ci > 0, margin: 0
      });
    });
    // Leica column highlight border
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.78, y, w: 2.4, h: 0.58,
      fill: { color: C.teal, transparency: 95 },
      line: { color: C.teal, width: 0.5, transparency: 40 }
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 9: TARGET AUDIENCE (3 personas)
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);
  topAccent(s);

  sectionLabel(s, 'TARGET AUDIENCE', 0.5, 0.22);
  s.addText('不同角色的常見考量與解答', {
    x: 0.5, y: 0.5, w: 9, h: 0.55,
    fontSize: 24, fontFace: 'Georgia', color: C.white, bold: true, margin: 0
  });

  const personas = [
    {
      role: '科主任 / 主任',
      sub: '實驗室管理者',
      icon: '👨‍⚕️',
      concern: '「人力短缺、資深醫檢師難以培育留任，如何維持穩定的診斷產能？」',
      answer: 'CytoInsight AI 可將染色體配對自動化，新人直接擔任審查角色——這不只是效率問題，更是人才培育策略的關鍵轉型。',
      accentColor: C.teal,
    },
    {
      role: '組長 / 資深醫檢師',
      sub: '日常使用者',
      icon: '🔬',
      concern: '「每天手動排列 46 條染色體相當耗時，能否讓我專注在真正需要判斷的案例上？」',
      answer: 'CytoInsight 把最枯燥的動作自動化——AI 先做好初稿，您只需做最後的專業確認。就像有個助理先幫您整理好，您再做最終判斷。',
      accentColor: C.gold,
    },
    {
      role: '院長 / 行政管理層',
      sub: '資源規劃與績效評估',
      icon: '💼',
      concern: '「導入新系統的投資能否帶來可量化的效益，回收週期多長？」',
      answer: '每個核型從 20 分鐘縮短至 5 分鐘，效率提升 4 倍。以每日 20 個樣本計算，一天節省 5 小時人力工時，2–3 年內即可回收設備投資。',
      accentColor: C.teal2,
    },
  ];

  personas.forEach((p, i) => {
    const x = 0.28 + i * 3.24;
    card(s, x, 1.22, 3.05, 4.1, { tealBorder: i === 0 });

    // Top color accent
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.22, w: 3.05, h: 0.04,
      fill: { color: p.accentColor }, line: { color: p.accentColor }
    });

    // Icon + title
    s.addText(p.icon, {
      x: x + 0.18, y: 1.32, w: 0.45, h: 0.4,
      fontSize: 20, margin: 0
    });
    s.addText(p.role, {
      x: x + 0.65, y: 1.35, w: 2.3, h: 0.28,
      fontSize: 11, fontFace: 'Microsoft JhengHei', color: C.white, bold: true, margin: 0
    });
    s.addText(p.sub, {
      x: x + 0.65, y: 1.65, w: 2.3, h: 0.2,
      fontSize: 8, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
    });

    // Divider
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.18, y: 1.92, w: 2.65, h: 0.015,
      fill: { color: C.muted2 }, line: { color: C.muted2 }
    });

    // Concern
    s.addText('常見考量', {
      x: x + 0.18, y: 1.98, w: 2.65, h: 0.22,
      fontSize: 7, fontFace: 'Courier New', color: p.accentColor, charSpacing: 2, margin: 0
    });
    s.addText(p.concern, {
      x: x + 0.18, y: 2.22, w: 2.65, h: 0.9,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.muted, italic: true, margin: 0
    });

    // Answer
    s.addText('CytoInsight AI 的解答', {
      x: x + 0.18, y: 3.18, w: 2.65, h: 0.22,
      fontSize: 7, fontFace: 'Courier New', color: p.accentColor, charSpacing: 2, margin: 0
    });
    s.addText(p.answer, {
      x: x + 0.18, y: 3.42, w: 2.65, h: 1.6,
      fontSize: 9, fontFace: 'Microsoft JhengHei', color: C.white, margin: 0
    });
  });
}

// ─────────────────────────────────────────────────────
// SLIDE 10: CLOSING / CTA
// ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  darkBg(s);

  // Full-width teal bottom bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.2, w: 10, h: 1.43,
    fill: { color: C.teal, transparency: 90 }, line: { color: C.teal, width: 0.5 }
  });

  // Left accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.06, h: 5.625,
    fill: { color: C.teal }, line: { color: C.teal }
  });

  // Orbs
  s.addShape(pres.shapes.OVAL, {
    x: 6.5, y: 0.3, w: 4, h: 4,
    fill: { color: C.teal, transparency: 95 },
    line: { color: C.teal, width: 0.5, transparency: 80 }
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.2, y: 1.0, w: 2.6, h: 2.6,
    fill: { color: 'transparent', transparency: 100 },
    line: { color: C.gold, width: 0.5, transparency: 75 }
  });

  s.addText('LEICA BIOSYSTEMS / CYTOVISION PLATFORM', {
    x: 0.35, y: 0.35, w: 8, h: 0.22,
    fontSize: 8, fontFace: 'Courier New', color: C.teal, charSpacing: 3, margin: 0
  });

  s.addText([
    { text: 'CytoInsight AI', options: { color: C.teal, bold: true } },
    { text: '\n讓專業更專注', options: { color: C.white, bold: false } }
  ], {
    x: 0.35, y: 0.65, w: 7, h: 1.7,
    fontSize: 48, fontFace: 'Georgia', margin: 0
  });

  s.addText('以 AI 承擔重複性工作，讓醫檢師的專業聚焦在真正需要\n判斷的地方——複雜核型、罕見異常、報告品質。', {
    x: 0.35, y: 2.42, w: 5.8, h: 0.85,
    fontSize: 13, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 3.45, w: 4.5, h: 0.018,
    fill: { color: C.muted2 }, line: { color: C.muted2 }
  });

  s.addText('詳細技術規格與採購諮詢\n請聯繫 Leica Biosystems 台灣服務團隊', {
    x: 0.35, y: 3.55, w: 5.5, h: 0.5,
    fontSize: 12, fontFace: 'Microsoft JhengHei', color: C.muted, margin: 0
  });

  // Bottom bar content
  s.addText('Leica Biosystems · CytoInsight AI  |  barron486.github.io/GMLBS/cytoinsight-ai.html', {
    x: 0.35, y: 4.36, w: 9, h: 0.28,
    fontSize: 9, fontFace: 'Courier New', color: C.teal, charSpacing: 1, margin: 0
  });
  s.addText('© Leica Biosystems · CytoVision Platform · AI-Powered Cytogenetics', {
    x: 0.35, y: 4.8, w: 9, h: 0.22,
    fontSize: 8, fontFace: 'Courier New', color: C.muted, charSpacing: 1, margin: 0
  });
}

// ── WRITE FILE ─────────────────────────────────────
pres.writeFile({ fileName: '/Users/Barron/quartz/CytoInsight-AI-Intro.pptx' })
  .then(() => console.log('✅ 投影片已輸出：CytoInsight-AI-Intro.pptx'))
  .catch(e => console.error('❌ 錯誤:', e));
