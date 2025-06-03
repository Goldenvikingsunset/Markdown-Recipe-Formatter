# Test Recipe Formatter Extension
Write-Host "🧪 Testing Recipe Formatter Extension..." -ForegroundColor Green

# Test npm lint command
Write-Host "1. Testing lint command..." -ForegroundColor Blue
npm run lint

# Test TypeScript compilation
Write-Host "2. Testing TypeScript compilation..." -ForegroundColor Blue
npm run compile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ All tests passed! Extension ready to use." -ForegroundColor Green
    Write-Host ""
    Write-Host "🍳 Recipe Formatter Extension Test Summary:" -ForegroundColor Yellow
    Write-Host ""
    
    # Check if sample files exist
    $sampleFiles = @("sample-chocolate-chip-cookies.md", "sample-quinoa-bowl.md")
    Write-Host "📁 Sample Recipe Files:" -ForegroundColor Cyan
    foreach ($file in $sampleFiles) {
        if (Test-Path $file) {
            Write-Host "  ✅ $file" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $file (missing)" -ForegroundColor Red
        }
    }
    
    # Check if snippets file exists
    Write-Host ""
    Write-Host "📝 Recipe Snippets:" -ForegroundColor Cyan
    if (Test-Path "snippets\recipes.json") {
        $snippetsContent = Get-Content "snippets\recipes.json" -Raw | ConvertFrom-Json
        $snippetCount = ($snippetsContent | Get-Member -MemberType NoteProperty).Count
        Write-Host "  ✅ $snippetCount recipe snippets available" -ForegroundColor Green
    } else {
        Write-Host "  ❌ snippets/recipes.json (missing)" -ForegroundColor Red
    }
    
    # Check if icon exists
    Write-Host ""
    Write-Host "🎨 Extension Icon:" -ForegroundColor Cyan
    if (Test-Path "images\icon.svg") {
        Write-Host "  ✅ Extension icon ready" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Extension icon missing" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "🚀 To test the extension:" -ForegroundColor Yellow
    Write-Host "1. Press F5 in VS Code to launch Extension Development Host" -ForegroundColor White
    Write-Host "2. Open one of the sample recipe files" -ForegroundColor White
    Write-Host "3. Try these commands:" -ForegroundColor White
    Write-Host "   • Ctrl+Shift+P → 'Recipe Formatter: Preview Recipe'" -ForegroundColor Gray
    Write-Host "   • Right-click → '🍳 Recipe Formatter' menu" -ForegroundColor Gray
    Write-Host "   • Type 'recipe' and press Tab for snippet" -ForegroundColor Gray
    Write-Host "4. Test formatting tools on ingredient lists" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 Key Features to Test:" -ForegroundColor Yellow
    Write-Host "  • Recipe template creation (Ctrl+Shift+R N)" -ForegroundColor White
    Write-Host "  • Ingredient formatting (select text, Ctrl+Shift+R I)" -ForegroundColor White
    Write-Host "  • Instruction formatting (select text, Ctrl+Shift+R S)" -ForegroundColor White
    Write-Host "  • Recipe preview (Ctrl+Shift+R P)" -ForegroundColor White
    Write-Host "  • Recipe validation (Command Palette)" -ForegroundColor White
    Write-Host "  • Export functionality (Command Palette)" -ForegroundColor White
    Write-Host ""
    Write-Host "🎯 To build extension: .\build.ps1" -ForegroundColor Cyan
} else {
    Write-Host "❌ Tests failed. Check the errors above." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")