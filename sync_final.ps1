git add . 2>&1 | Out-File -FilePath sync_log.txt -Encoding utf8
git commit -m "fix(ui): synchronize all reel animations with 200ms audio duration" 2>&1 | Out-File -FilePath sync_log.txt -Append -Encoding utf8
git pull --rebase origin main 2>&1 | Out-File -FilePath sync_log.txt -Append -Encoding utf8
git push origin main 2>&1 | Out-File -FilePath sync_log.txt -Append -Encoding utf8
