param(
    [string]$Workspace = (Split-Path -Parent $PSScriptRoot),
    [int]$ThrottleLimit = 3
)

$ErrorActionPreference = 'Stop'
$endpoint = 'https://carina-aih-eastus2.openai.azure.com/openai/deployments/gpt-image-2/images/generations?api-version=2025-04-01-preview'
$originalDir = Join-Path $Workspace 'assets/covers/original'
$webDir = Join-Path $Workspace 'assets/covers/web'
$nodePath = 'C:\Users\sifanzhang\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$pythonPath = 'C:\Users\sifanzhang\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'

New-Item -ItemType Directory -Force -Path $originalDir, $webDir | Out-Null

$metadataScript = @'
global.window = {};
require('./assets/library-data.js');
process.stdout.write(JSON.stringify(window.MYBOOKS_DATA.books));
'@
Push-Location $Workspace
try {
    $books = (& $nodePath -e $metadataScript | Out-String) | ConvertFrom-Json
} finally {
    Pop-Location
}

$token = az account get-access-token --resource https://cognitiveservices.azure.com --query accessToken -o tsv
if (-not $token) { throw 'Unable to obtain an Azure OpenAI access token.' }

$palette = @{
    '历史人文' = 'aged parchment, oxidized bronze, muted cinnabar, ink black'
    '投资理财' = 'deep forest green, warm ivory, restrained copper, charcoal'
    '文学小说' = 'midnight teal, faded vermilion, warm cream, smoky black'
    '日语学习' = 'indigo, rice-paper white, persimmon orange, pale sage'
    '机器学习' = 'ultramarine, graphite, electric cyan, soft silver'
    '计算广告' = 'deep violet, signal orange, inky navy, pale sand'
    '饮食烹饪' = 'tomato red, olive green, warm cream, earthen brown'
}

$indexedBooks = for ($i = 0; $i -lt $books.Count; $i++) {
    [PSCustomObject]@{
        Index = $i + 1
        Total = $books.Count
        Title = [string]$books[$i].title
        Author = [string]$books[$i].author
        Category = [string]$books[$i].category
        Summary = [string]$books[$i].summary
        Palette = [string]$palette[[string]$books[$i].category]
    }
}

$indexedBooks | ForEach-Object -Parallel {
    $book = $_
    $number = '{0:D3}' -f $book.Index
    $originalPath = Join-Path $using:originalDir "cover-$number.png"
    $webPath = Join-Path $using:webDir "cover-$number.webp"

    if ((Test-Path -LiteralPath $originalPath) -and (Test-Path -LiteralPath $webPath)) {
        $sizeMb = [Math]::Round((Get-Item -LiteralPath $originalPath).Length / 1MB, 2)
        Write-Output ("[{0:D2}/{1}] SKIP 1024x1536 {2}MB cover-{3}.png" -f $book.Index, $book.Total, $sizeMb, $number)
        return
    }

    $prompt = @"
Create an original vertical editorial book-cover illustration inspired by the following catalog entry.
Title for conceptual reference only: $($book.Title). Author/context: $($book.Author).
Theme: $($book.Summary)
Composition: one strong symbolic focal image, centered or slightly asymmetrical, generous quiet negative space, sophisticated geometric framing, designed for a 2:3 book cover. Make the visual metaphor specific to the theme rather than generic.
Style: refined contemporary editorial illustration, subtle Chinese printmaking influence, tactile paper grain, crisp silhouettes, restrained detail, timeless private-library collection identity.
Lighting and color: dramatic soft light, palette of $($book.Palette), elegant contrast, print-quality color separation.
Important: artwork only. Absolutely no words, letters, numbers, typography, captions, logos, watermarks, publisher marks, borders containing text, or identifiable real people. Do not imitate any existing published cover. Avoid photorealistic mockups, 3D books, clutter, gradients that look synthetic, and distorted objects.
"@

    try {
        $body = @{
            prompt = $prompt
            size = '1024x1536'
            quality = 'high'
            output_format = 'png'
            n = 1
        } | ConvertTo-Json -Compress

        $response = $null
        for ($attempt = 1; $attempt -le 6; $attempt++) {
            try {
                $response = Invoke-RestMethod -Method Post -Uri $using:endpoint -Headers @{
                    Authorization = "Bearer $using:token"
                    'Content-Type' = 'application/json'
                } -Body $body -TimeoutSec 420
                break
            } catch {
                $statusCode = [int]$_.Exception.Response.StatusCode
                if ($statusCode -ne 429 -or $attempt -eq 6) { throw }
                $waitSeconds = [Math]::Min(90, 12 * $attempt)
                Write-Output ("[{0:D2}/{1}] WAIT rate-limit {2}s (attempt {3}/6)" -f $book.Index, $book.Total, $waitSeconds, $attempt)
                Start-Sleep -Seconds $waitSeconds
            }
        }
        if (-not $response) { throw 'Azure Image returned no response.' }

        [IO.File]::WriteAllBytes($originalPath, [Convert]::FromBase64String($response.data[0].b64_json))
        $resizeScript = 'from PIL import Image; import sys; im=Image.open(sys.argv[1]).convert("RGB"); im.thumbnail((480,720), Image.Resampling.LANCZOS); im.save(sys.argv[2], "WEBP", quality=84, method=6)'
        & $using:pythonPath -c $resizeScript $originalPath $webPath
        if ($LASTEXITCODE -ne 0) { throw 'Web cover conversion failed.' }

        $sizeMb = [Math]::Round((Get-Item -LiteralPath $originalPath).Length / 1MB, 2)
        Write-Output ("[{0:D2}/{1}] OK 1024x1536 {2}MB cover-{3}.png" -f $book.Index, $book.Total, $sizeMb, $number)
    } catch {
        if (Test-Path -LiteralPath $originalPath) { Remove-Item -LiteralPath $originalPath -Force }
        if (Test-Path -LiteralPath $webPath) { Remove-Item -LiteralPath $webPath -Force }
        $message = $_.Exception.Message -replace '[\r\n]+', ' '
        Write-Output ("[{0:D2}/{1}] ERROR {2}: {3}" -f $book.Index, $book.Total, $book.Title, $message)
    }
} -ThrottleLimit $ThrottleLimit
