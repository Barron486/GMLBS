# CytoVision® 訂貨與產品規格資訊

> ⚠️ **注意**：以下料號清單僅供業務參考大方向。CytoVision 是高度客製化的系統建置，需根據客戶現有顯微鏡、期望通量 (Manual, DM6 B, GSL-120) 以及應用模組 (Karyotyping / FISH / CGH) 開立專屬 BOM 表。實際報價與最終料號請務必以 **Leica Biosystems 官方最新 Pricing Tool** 或內部報價系統為準。

---

## 📦 CytoVision 主要系統組合平台

CytoVision 依據掃描與上片方式分為不同層級，業務須先確認客戶之預期通量：

### 1. 手動載物台系統 (Manual Scanning)
適用於樣本量少，僅需軟體輔助排盤或拍攝螢光的單位。
*   **CytoVision Manual System**
    *   *內容物簡述*：含 CytoVision 工作站主機、高解析相機、基本軟體授權。**不含**全自動電動載物台。需人工尋找細胞，但享有完整的軟體分析與報告工具。

### 2. 半自動/自動掃描系統 (Automated Scanning - DM6 B)
適合多數中大型醫院與檢驗所。
*   **CytoVision with Leica DM6 B**
    *   *內容物簡述*：整合 Leica DM6 B 全電動智能顯微鏡、電動載物台 (通常為 8 片裝)、高解析明視野/螢光相機、自動對焦模組。
    *   *特色*：支援無人值守的小批次自動尋找分裂相 (Metaphase finding) 與掃描擷取。

### 3. 超高通量全自動系統 (High Throughput - GSL-120)
適合國家級參考實驗室或巨量檢體代檢中心。
*   **CytoVision GSL-120 Slide Loader System**
    *   *內容物簡述*：配備獨家 120 片大容量自動送片機、內建條碼讀取器、整合式油鏡加滴系統。
    *   *特色*：真正的「Walk-away」過夜連續掃描能力。

---

## 🧩 核心軟體分析模組 (Application Modules)

硬體平台選定後，需依照客戶的臨床檢驗項目選購軟體授權 (License)：

1.  **CytoVision Karyotyper (染色體核型分析)**
    *   *訂貨備註*：必選模組之一。包含 G-banding、R-banding 的影像擷取、強化、自動分類切割與排盤產生。
2.  **CytoVision FISH (螢光原位雜交分析)**
    *   *訂貨備註*：必選模組之一。包含多色螢光自動合成、背景雜訊抑制、Z-stack (多焦面融合) 與互動式訊號計數量測。支援組織與細胞 FISH。
3.  **CytoVision CGH (比較基因體雜交分析)**
    *   *訂貨備註*：選購模組，用於螢光強度差異分析。
4.  **CytoVision Automated Metaphase Finding (自動尋找分裂相)**
    *   *訂貨備註*：選配功能，強烈建議自動平台 (DM6 B / GSL-120) 客戶加購。大幅節省人工找細胞時間。
5.  **CytoVision Review Station (覆核工作站 / 離線版)**
    *   *訂貨備註*：選購項目。讓醫師/醫檢師可在辦公室電腦上連入伺服器進行排盤、修改與簽發報告。建議視實驗室醫師人數配置相應數量。

---

## 🧑‍💻 IT 與伺服器設置架構 (IT & Infrastructure)

CytoVision 產生大量高解析影像與病患資料，須確認院方 IT 環境：

*   **系統架構**：Client-Server 架構。主機擷取影像後，資料需存入中央資料庫。
*   **資料庫需求**：依賴於 Microsoft SQL Server 做為後端引擎。
*   **伺服器主機**：客戶可自行依 Leica 硬體規格準備 Server，或向 Leica/代理商採購整包方案。
*   **儲存空間 (Storage)**：NAS 或 SAN。請務必與醫院資訊室 (IT) 溝通足夠的儲存空間規劃（尤其是大量做多色 Z-Stack FISH 影像的單位）。

---

## 📝 報價前必問清單 (Pre-Sales Qualification Checklist)

為確保開出的料號與報價單準確無誤，請在跑系統前與客戶確認以下幾點：

1.  **[] 主要應用是什麼？** (Karyotyping? Tissue FISH? Cell FISH?)
2.  **[] 預估的每日/每月檢體量？** (決定推 8 片裝 DM6B 還是 120 片裝 GSL)
3.  **[] 醫院是否已有相容的 Leica 顯微鏡準備升級？** (部分舊款或現役機型可加裝電動套件升級)
4.  **[] 有幾位人員需要同時在不同電腦上發報告？** (決定 Review Station 授權數量)
5.  **[] 是否需要與醫院 LIS 系統介接？** (可能需要客製化介接軟體 / HL7 模組)
6.  **[] 醫院 IT 是否能提供中央伺服器與足夠的儲存空間 Storage？**
