# Publishing Setup Script for Recipe Formatter
Write-Host "🍳 Recipe Formatter Publishing Setup" -ForegroundColor Green
Write-Host ""

# Check if extension is built
if (-not (Test-Path "out\extension.js")) {
    Write-Host "❌ Extension not built yet. Building first..." -ForegroundColor Red
    .\build.ps1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed. Cannot proceed with publishing." -ForegroundColor Red
        exit 1
    }
}

Write-Host "📋 Publishing Checklist:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. ✅ Do you have a Microsoft account?" -ForegroundColor White
Write-Host "2. ✅ Have you created a Visual Studio Marketplace publisher?" -ForegroundColor White
Write-Host "   → Visit: https://marketplace.visualstudio.com/manage" -ForegroundColor Gray
Write-Host "3. ✅ Do you have an Azure DevOps Personal Access Token?" -ForegroundColor White
Write-Host "   → Visit: https://dev.azure.com/ → User Settings → Personal Access Tokens" -ForegroundColor Gray
Write-Host "   → Scope: Marketplace (Manage)" -ForegroundColor Gray
Write-Host ""

$publisherID = Read-Host "Enter your Publisher ID from Visual Studio Marketplace"

if ([string]::IsNullOrWhiteSpace($publisherID)) {
    Write-Host "❌ Publisher ID is required. Please create one at:" -ForegroundColor Red
    Write-Host "   https://marketplace.visualstudio.com/manage" -ForegroundColor Yellow
    exit 1
}

# Update package.json with publisher
Write-Host "📝 Updating package.json with publisher information..." -ForegroundColor Blue

$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$packageJson.publisher = $publisherID

# Add repository if not exists
if (-not $packageJson.repository) {
    $repoUrl = Read-Host "Enter your GitHub repository URL (optional, press Enter to skip)"
    if (-not [string]::IsNullOrWhiteSpace($repoUrl)) {
        $packageJson | Add-Member -Type NoteProperty -Name "repository" -Value @{
            type = "git"
            url = $repoUrl
        } -Force
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
Write-Host "✅ Updated package.json with publisher: $publisherID" -ForegroundColor Green

# Check if VSCE is installed
try {
    $vsceVersion = vsce --version
    Write-Host "✅ VSCE found: $vsceVersion" -ForegroundColor Green
} catch {
    Write-Host "📥 Installing VSCE..." -ForegroundColor Blue
    npm install -g vsce
}

Write-Host ""
Write-Host "🔑 Now login with your Publisher ID:" -ForegroundColor Yellow
Write-Host "   When prompted, paste your Personal Access Token" -ForegroundColor Gray
Write-Host ""

try {
    vsce login $publisherID
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Login successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🍳 Ready to publish your Recipe Formatter! Choose an option:" -ForegroundColor Yellow
        Write-Host "1. Package only (create .vsix file)" -ForegroundColor White
        Write-Host "2. Publish to marketplace immediately" -ForegroundColor White
        Write-Host ""
        
        $choice = Read-Host "Enter choice (1 or 2)"
        
        if ($choice -eq "1") {
            Write-Host "📦 Creating VSIX package..." -ForegroundColor Blue
            vsce package
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ VSIX package created successfully!" -ForegroundColor Green
                Get-ChildItem -Name "*.vsix" | ForEach-Object { 
                    Write-Host "📁 Generated: $_" -ForegroundColor Cyan 
                }
                Write-Host ""
                Write-Host "To publish later, run: vsce publish" -ForegroundColor Yellow
            }
        } elseif ($choice -eq "2") {
            Write-Host ""
            Write-Host "🌐 Publishing Recipe Formatter to VS Code Marketplace..." -ForegroundColor Blue
            Write-Host "⚠️  This will make your extension publicly available!" -ForegroundColor Yellow
            $confirm = Read-Host "Are you sure? (y/N)"
            
            if ($confirm -eq "y" -or $confirm -eq "Y") {
                vsce publish
                if ($LASTEXITCODE -eq 0) {
                    Write-Host ""
                    Write-Host "🎉 Recipe Formatter published successfully!" -ForegroundColor Green
                    Write-Host "🔗 Your extension will be available at:" -ForegroundColor Cyan
                    Write-Host "   https://marketplace.visualstudio.com/items?itemName=$publisherID.markdown-recipe-formatter" -ForegroundColor White
                    Write-Host ""
                    Write-Host "📈 It may take a few minutes to appear in search results." -ForegroundColor Gray
                    Write-Host ""
                    Write-Host "🍳 Features your users will love:" -ForegroundColor Yellow
                    Write-Host "  • Professional recipe templates with one-click creation" -ForegroundColor White
                    Write-Host "  • Smart formatting for ingredients and instructions" -ForegroundColor White
                    Write-Host "  • Beautiful HTML preview optimized for printing" -ForegroundColor White
                    Write-Host "  • Export to multiple formats (HTML, print, text)" -ForegroundColor White
                    Write-Host "  • Recipe validation and nutrition information" -ForegroundColor White
                    Write-Host "  • Comprehensive snippet library with cooking shortcuts" -ForegroundColor White
                } else {
                    Write-Host "❌ Publishing failed. Check the errors above." -ForegroundColor Red
                }
            } else {
                Write-Host "Publishing cancelled." -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "❌ Login failed. Please check your Publisher ID and Personal Access Token." -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error during login process." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")