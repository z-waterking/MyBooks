param(
  [switch]$InstallTask,
  [string]$Time = "07:30"
)

$ScriptPath = $MyInvocation.MyCommand.Path
$SiteRoot = Split-Path -Parent (Split-Path -Parent $ScriptPath)
$PythonScript = Join-Path $SiteRoot "scripts\update_news_sentences.py"

if ($InstallTask) {
  $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$ScriptPath`""
  $trigger = New-ScheduledTaskTrigger -Daily -At $Time
  Register-ScheduledTask -TaskName "SentenceStudioDailyNews" -Action $action -Trigger $trigger -Description "Update Sentence Studio daily news sentence breakdowns" -Force | Out-Null
  Write-Host "Installed daily task: SentenceStudioDailyNews at $Time"
  exit 0
}

Push-Location $SiteRoot
try {
  python $PythonScript
}
finally {
  Pop-Location
}