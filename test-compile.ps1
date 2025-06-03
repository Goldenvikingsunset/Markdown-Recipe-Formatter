# Quick TypeScript Compilation Test
Write-Host "🧪 Testing TypeScript Compilation..." -ForegroundColor Green

# Clean any existing compiled files
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out"
    Write-Host "🧹 Cleaned existing output" -ForegroundColor Blue
}

# Install minimal dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
    npm install
}

# Test TypeScript compilation
Write-Host "🔨 Testing TypeScript compilation..." -ForegroundColor Blue
npx tsc -p ./

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ TypeScript compilation successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Generated files:" -ForegroundColor Cyan
    if (Test-Path "out\extension.js") {
        $fileSize = (Get-Item "out\extension.js").Length
        Write-Host "  • out\extension.js ($fileSize bytes)" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "🍳 Recipe Formatter Extension ready!" -ForegroundColor Yellow
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run .\build.ps1 to create full package" -ForegroundColor White
    Write-Host "  2. Test in VS Code with F5 (Extension Development Host)" -ForegroundColor White
    Write-Host "  3. Try the sample recipe files" -ForegroundColor White
} else {
    Write-Host "❌ TypeScript compilation failed" -ForegroundColor Red
    Write-Host "Check the errors above and run this script again" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")