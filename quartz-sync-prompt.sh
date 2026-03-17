#!/bin/bash
# Quartz sync prompt — triggered by file watcher when content changes

QUARTZ_DIR="/Users/Barron/quartz"
LOG="$HOME/Library/Logs/quartz-sync.log"

answer=$(osascript -e 'display dialog "偵測到內容變更，要執行 Quartz sync 嗎？" buttons {"略過", "Sync"} default button "Sync" with title "Quartz Sync"' 2>/dev/null)

if [[ "$answer" == *"Sync"* ]]; then
    echo "[$(date)] 使用者確認，開始 sync..." >> "$LOG"
    cd "$QUARTZ_DIR" && /opt/homebrew/bin/npx quartz sync >> "$LOG" 2>&1
    echo "[$(date)] Sync 完成。" >> "$LOG"
else
    echo "[$(date)] 使用者略過 sync。" >> "$LOG"
fi
