git pull --rebase origin main 2>&1 | Out-File -FilePath pull_log.txt -Encoding utf8
git push origin main 2>&1 | Out-File -FilePath push_log.txt -Encoding utf8
