#!/usr/bin/env python3
"""
病理學期刊 AI Agent
每日自動搜尋最新病理學相關期刊，整理後發布到 Quartz 網站
"""

import asyncio
import os
import subprocess
from datetime import datetime
from pathlib import Path

from claude_agent_sdk import query, ClaudeAgentError

# 設定路徑
QUARTZ_DIR = Path("/Users/Barron/quartz")
CONTENT_DIR = QUARTZ_DIR / "content" / "Blog" / "病理學期刊"
LOG_FILE = Path.home() / "Library" / "Logs" / "pathology-agent.log"

def log(msg: str):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {msg}"
    print(line)
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def build_prompt() -> str:
    today = datetime.now().strftime("%Y年%m月%d日")
    return f"""
今天是 {today}。

請搜尋最新的病理學相關期刊或研究，特別關注以下主題：
1. 數位病理學（Digital Pathology）
2. AI 輔助診斷（AI-assisted diagnosis）
3. 細胞遺傳學（Cytogenetics / FISH）
4. 組織病理學（Histopathology）
5. 掃描器技術、全切片影像（Whole Slide Imaging）

請搜尋並整理 3-5 篇近期（2024-2025年）重要文獻，針對每篇：
- 提供標題（中英文）
- 期刊名稱與發表年份
- 核心摘要（100-150字，繁體中文）
- 臨床或實驗室的實際意義

最後，請將整理好的內容輸出為 Markdown 格式，包含：
- YAML frontmatter（tags, date, description）
- 每篇文獻的結構化介紹
- 結語：本週病理學趨勢觀察

輸出時直接給完整的 Markdown 內容，不要加任何說明。
"""


async def run_agent() -> str | None:
    log("Agent 啟動，開始搜尋病理學期刊...")

    prompt = build_prompt()
    result_text = None

    try:
        async for message in query(
            prompt=prompt,
            options={
                "allowedTools": ["WebSearch", "WebFetch"],
                "maxTurns": 10,
            },
        ):
            if hasattr(message, "result"):
                result_text = message.result
                log("Agent 完成，已取得搜尋結果。")

    except ClaudeAgentError as e:
        log(f"Agent 錯誤：{e}")
        return None

    return result_text


def save_article(content: str) -> Path:
    today = datetime.now().strftime("%Y-%m-%d")
    filename = f"{today}-病理學期刊摘要.md"
    output_path = CONTENT_DIR / filename

    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")
    log(f"文章已儲存：{output_path}")
    return output_path


def quartz_sync():
    log("開始執行 Quartz sync...")
    result = subprocess.run(
        ["/opt/homebrew/bin/npx", "quartz", "sync"],
        cwd=str(QUARTZ_DIR),
        capture_output=True,
        text=True,
        timeout=120,
    )
    if result.returncode == 0:
        log("Quartz sync 完成 ✅")
    else:
        log(f"Quartz sync 失敗：{result.stderr[:300]}")


async def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        log("❌ 錯誤：未設定 ANTHROPIC_API_KEY 環境變數")
        return

    content = await run_agent()
    if not content:
        log("❌ 未取得內容，中止。")
        return

    save_article(content)
    quartz_sync()
    log("🎉 全部完成！")


if __name__ == "__main__":
    asyncio.run(main())
