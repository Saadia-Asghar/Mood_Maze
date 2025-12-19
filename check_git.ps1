git status | Out-File -FilePath git_status.txt -Encoding utf8
git log -n 5 --oneline | Out-File -FilePath git_status.txt -Append -Encoding utf8
git remote -v | Out-File -FilePath git_status.txt -Append -Encoding utf8
