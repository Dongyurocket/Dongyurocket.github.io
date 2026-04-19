$ErrorActionPreference = 'Stop'

$Root = Resolve-Path (Join-Path $PSScriptRoot '..')
$HostName = '127.0.0.1'
$Port = '4321'
$Url = "http://${HostName}:${Port}/"
$StdOutLog = Join-Path $Root '.local-dev.out.log'
$StdErrLog = Join-Path $Root '.local-dev.err.log'

function Test-LocalSite {
  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    return [int]$response.StatusCode -ge 200
  } catch {
    return $false
  }
}

function Show-LogTail {
  param(
    [string]$Path,
    [string]$Title
  )

  if (Test-Path -LiteralPath $Path) {
    Write-Host ""
    Write-Host $Title
    Get-Content -LiteralPath $Path -Tail 40
  }
}

Write-Host "Personal Web local preview"
Write-Host "URL: $Url"
Write-Host ""

if (Test-LocalSite) {
  Write-Host "Local site is already running. Opening browser..."
  Start-Process $Url
  exit 0
}

$npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npm) {
  Write-Host "[ERROR] npm was not found. Please install Node.js and ensure npm is on PATH."
  exit 1
}

Remove-Item -LiteralPath $StdOutLog, $StdErrLog -Force -ErrorAction SilentlyContinue

Write-Host "Starting local site in background..."
Start-Process `
  -FilePath $npm.Source `
  -ArgumentList @('run', 'dev', '--', '--host', $HostName, '--port', $Port) `
  -WorkingDirectory $Root `
  -RedirectStandardOutput $StdOutLog `
  -RedirectStandardError $StdErrLog `
  -WindowStyle Minimized

Write-Host "Waiting for server..."
$deadline = (Get-Date).AddSeconds(45)
while ((Get-Date) -lt $deadline) {
  if (Test-LocalSite) {
    Write-Host "Server is ready. Opening browser..."
    Start-Process $Url
    exit 0
  }
  Start-Sleep -Milliseconds 700
}

Write-Host "[ERROR] Local site did not start within 45 seconds."
Write-Host "Please share the logs below so I can keep debugging."
Show-LogTail -Path $StdOutLog -Title "--- .local-dev.out.log ---"
Show-LogTail -Path $StdErrLog -Title "--- .local-dev.err.log ---"
exit 1
