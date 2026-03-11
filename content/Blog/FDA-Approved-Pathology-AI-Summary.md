# 盤點：獲得 US FDA 認證的病理影像 AI 演算法（含適用染色與掃描儀）

隨著數位病理學步入臨床診斷的深水區，美國食品藥物管理局（FDA）近年來加速了對人工智慧（AI）病理軟體的審查與放行。然而，一項 AI 演算法要能在臨床上合法使用，通常會受到「封閉系統（Pixel Pathway）」的規範——即必須搭配特定的**染色方法（Stain）**與**玻片掃描儀（WSI Scanner）**。

以下為您整理截至目前獲得 **US FDA 510(k) 許可或 De Novo 授權**的指標性數位病理 AI 演算法，以及其所支援的染色與硬體設備：

---

## 1. Paige Prostate (Paige.AI)
作為FDA史上第一個核准的數位病理 AI 輔助診斷軟體，Paige Prostate 為前列腺癌 AI 奠定了標準。
*   **FDA 狀態**：De Novo 授權 (2021年)。
*   **適用染色項目**：常規 **H&E 染色** (Hematoxylin & Eosin)。
*   **搭配掃描儀**：最初僅核准搭配 **Philips UltraFast Scanner (PIPS)**。隨後透過其 FullFocus™ 影像檢視器的 510(k) 擴充認證，現已合法支援 **Leica Aperio GT 450 DX** 與 **Hamamatsu NanoZoomer S360MD**。

## 2. Ibex Prostate Detect (Ibex Medical Analytics)
Ibex Prostate Detect（前稱為 Galen Prostate）在獲得突破性醫材認證後，順利取得 510(k) 許可。
*   **FDA 狀態**：510(k) 許可 (2025年)。
*   **適用染色項目**：常規 **H&E 染色** 福馬林固定石蠟包埋 (FFPE) 組織。
*   **搭配掃描儀**：Ibex 採開放平台策略，其演算法宣稱與多家主流掃描儀（包含 Philips, Leica, Hamamatsu）掃出的影像相容並整合於各大 LIS 系統與檢視器中。

## 3. ArteraAI Prostate (ArteraAI)
不同於上述軟體著重於「尋找癌細胞」，ArteraAI 是被定位為「風險分層預測」的工具，並首創被寫入 NCCN 臨床指南。
*   **FDA 狀態**：De Novo 授權 (2025年，開創了數位病理風險分層預測軟體的新分類)。
*   **適用染色項目**：常規 **H&E 染色** 前列腺切片影像。
*   **搭配掃描儀**：該軟體主要作為雲端分析服務，醫院將去識別化的標準 H&E 數位切片上傳後即可獲取分析結果，適用於符合標準的高階全幅面掃描儀擷取之影像。

## 4. Roche uPath Image Analysis Algorithms
Roche 採取端到端的封閉生態系策略，其包含影像演算法在內的整個系統獲得了臨床診斷許可。
*   **FDA 狀態**：Roche Digital Pathology Dx 系統獲 510(k) 許可。
*   **適用染色項目**：專注於**免疫組織化學染色 (IHC)**，包含乳癌與非小細胞肺癌的 **HER2, PD-L1, ER, PR, Ki-67** 等標記（部分為診斷許可，部分演算法視地區可能仍為 RUO）。
*   **搭配掃描儀**：FDA 認證綁定其自家的 **VENTANA DP 200** 與最新獲批的 **VENTANA DP 600** 高通量玻片掃描儀，以及 Roche 原廠提供的 IHC 試劑。

## 5. Proscia Colon Polyp Detection
在大腸直腸息肉的初步篩檢與良惡性判斷上，Proscia 取得了重大進展。
*   **FDA 狀態**：510(k) 許可 (2025年) 用於第一線診斷。
*   **適用染色項目**：常規 **H&E 染色**。
*   **搭配掃描儀**：透過其 Concentriq 數位病理平台運行，該平台廣泛支援各大廠牌（如 Leica, Philips, Hamamatsu 等）的 WSI 影像格式。

---

### ⚠️ 其他值得關注但目前為「僅供研究使用 (RUO)」或審核中的項目：
*   **PathAI**：其底層數位病理平台 **AISight Dx** 與檢視器已獲 FDA 510(k) 許可，可用於基層診斷（支援 Leica Aperio GT450 等掃描儀）。但其針對 PD-L1 等染色的 **AIM-PD-L1 分析演算法**目前在美國仍標示為 **RUO (Research Use Only)**。
*   **DeepBio (DeepDx)**：其前列腺癌演算法在韓國獲得 MFDS 認證並取得歐洲 CE-IVD，且常整合於 Indica Labs 的 HALO AP 等平台中，但目前在美國市場仍在爭取 FDA 的全面臨床核准階段。

### 總結
目前獲得 US FDA 用於「臨床第一線診斷 (Primary Diagnosis)」的 AI 演算法，絕大多數**仍以判讀 H&E 染色為主**（如 Paige, Ibex, Proscia）。而在 **IHC (免疫染色) 的 AI 判讀上**，Roche 憑藉其「試劑 + 掃描儀 (VENTANA) + 演算法 (uPath)」的深度整合包袱，在取得 FDA 完整合規認證上佔據了優勢地位。同時，Leica Aperio 的 GT 450 等高通量掃描儀，則成為許多第三方 AI 軟體（如 Paige）在申請 FDA 認證時首選的硬體搭配夥伴。

---

## 參考資料 / 延伸閱讀 (References)
*   **Paige Prostate**: *FDA Grants de novo Marketing Authorization* ([https://info.paige.ai/prostate](https://info.paige.ai/prostate))
*   **Ibex Prostate Detect**: *FDA 510(k) Clearance for Prostate Detect* ([https://ibex-ai.com/fda-510k-clearance/](https://ibex-ai.com/fda-510k-clearance/))
*   **ArteraAI Prostate**: *First-and-Only Predictive Test in 2024 NCCN Guidelines* ([ArteraAI Official News](https://artera.ai/news/arteraai-announced-as-the-first-and-only-predictive-test-for-therapy-personalization-in-the-2024-nccn-guidelines-for-prostate-cancer))
*   **Roche DP 600**: *FDA Clearance on High-Volume Slide Scanner* ([Roche Diagnostics News](https://diagnostics.roche.com/us/en/news-listing/2025/roches-momentum-in-digital-pathology-continues-with-fda-clearance-on-its-high-volume-slide-scanner.html))
*   **Proscia Concentriq AP-Dx**: *FDA Clearance for Primary Diagnosis* ([Proscia Press Release](https://proscia.com/press-releases/proscia-receives-fda-510k-clearance-for-concentriq-ap-dx-2/))
