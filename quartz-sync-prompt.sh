#!/bin/bash
# Quartz sync prompt — triggered by file watcher when content changes

QUARTZ_DIR="/Users/Barron/quartz"
LOG="$HOME/Library/Logs/quartz-sync.log"
COOLDOWN_FILE="/tmp/quartz-sync-last-prompt"
COOLDOWN_SECONDS=1800  # 30 分鐘內不重複詢問

# 冷卻期檢查
if [[ -f "$COOLDOWN_FILE" ]]; then
    last=$(cat "$COOLDOWN_FILE")
    now=$(date +%s)
    if (( now - last < COOLDOWN_SECONDS )); then
        exit 0
    fi
fi

# 檢查是否有未 commit 的實際變更
cd "$QUARTZ_DIR" || exit 0
changes=$(git -C content status --porcelain 2>/dev/null)
if [[ -z "$changes" ]]; then
    exit 0
fi

# 記錄本次詢問時間
date +%s > "$COOLDOWN_FILE"

answer=$(osascript -e 'display dialog "偵測到內容變更，要執行 Quartz sync 嗎？" buttons {"略過", "Sync"} default button "Sync" with title "Quartz Sync"' 2>/dev/null)

if [[ "$answer" == *"Sync"* ]]; then
    echo "[$(date)] 使用者確認，開始 sync..." >> "$LOG"
    /opt/homebrew/bin/npx quartz sync >> "$LOG" 2>&1
    echo "[$(date)] Sync 完成。" >> "$LOG"
else
    echo "[$(date)] 使用者略過 sync。" >> "$LOG"
fi
