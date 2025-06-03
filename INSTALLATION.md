# 🍳 Installation & Setup Guide

Complete guide to install and set up the Markdown Recipe Formatter & Previewer extension.

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Visual Studio Code** - [Download here](https://code.visualstudio.com/)

## 🛠️ Installation Methods

### **Method 1: From VS Code Marketplace** (When Published)
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Markdown Recipe Formatter"
4. Click "Install"

### **Method 2: Build from Source** (Current)
1. Navigate to the extension directory:
   ```powershell
   cd "C:\Users\Renni\Desktop\Markdown Recipe Formatter"
   ```

2. Build the extension:
   ```powershell
   .\build.ps1
   ```

3. Install the generated `.vsix` file:
   - Open VS Code
   - Press `Ctrl+Shift+P`
   - Type "Extensions: Install from VSIX"
   - Select the `.vsix` file

## ✅ Verify Installation

1. **Open VS Code**
2. **Create a new file** with `.md` extension
3. **Type `recipe`** and press **Tab**
4. **You should see** a complete recipe template appear

If the snippet works, your extension is properly installed! 🎉

## 🍳 First Recipe Test

### **Quick Test**
1. Create `test-recipe.md`
2. Type `recipe` + Tab
3. Fill in "Chocolate Chip Cookies" as title
4. Press `Ctrl+Shift+R P` to preview
5. You should see a beautiful, styled recipe preview

### **Features to Test**
- ✅ **Templates**: Try different snippet types (`baking`, `cooking`)
- ✅ **Formatting**: Select ingredient text → `Ctrl+Shift+R I`
- ✅ **Preview**: Use `Ctrl+Shift+R P` for styled preview
- ✅ **Export**: Command Palette → "Export Recipe"
- ✅ **Validation**: Command Palette → "Validate Recipe"

## 🎯 Configuration

### **Access Settings**
1. File → Preferences → Settings
2. Search for "Recipe Formatter"
3. Customize your preferences

### **Key Settings**
- **Default Servings**: Set preferred default (4, 6, 8, etc.)
- **Include Nutrition**: Auto-add nutrition sections
- **Use Metric Units**: Prefer metric over imperial
- **Print Friendly**: Optimize previews for kitchen printing
- **Show Tips**: Display helpful formatting suggestions

## 📱 Usage Overview

### **Creating Recipes**
| Method | Action |
|--------|--------|
| **Command** | `Ctrl+Shift+P` → "New Recipe" |
| **Snippet** | Type `recipe` + Tab |
| **Template** | Right-click → Insert Recipe Template |

### **Formatting Tools**
| Tool | Shortcut | Purpose |
|------|----------|---------|
| **Format Ingredients** | `Ctrl+Shift+R I` | Fix fractions, units, bullets |
| **Format Instructions** | `Ctrl+Shift+R S` | Number steps, add timers |
| **Add Timer** | Command Palette | Insert ⏱️ cooking timers |

### **Preview & Export**
| Feature | Shortcut | Result |
|---------|----------|--------|
| **Preview** | `Ctrl+Shift+R P` | Beautiful HTML preview |
| **Export HTML** | Command Palette | Web-ready HTML file |
| **Export Print** | Command Palette | Print-optimized HTML |
| **Export Text** | Command Palette | Plain text format |

## 🔧 Troubleshooting

### **Extension Not Loading**
```powershell
# Check VS Code developer console
Help → Toggle Developer Tools → Console
```

### **Snippets Not Working**
- Ensure you're in a `.md` file
- Check file language mode (bottom-right of VS Code)
- Restart VS Code if needed

### **Preview Not Showing**
- Save your file first
- Check if file contains recipe content
- Try closing and reopening VS Code

### **Commands Not Found**
- Press `Ctrl+Shift+P` and search "Recipe"
- Verify extension is enabled in Extensions panel
- Check for conflicting extensions

### **Build Issues**
```powershell
# Clean build
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force out
npm install
npm run compile
```

## 📁 File Structure

After installation, your extension includes:

```
markdown-recipe-formatter/
├── src/extension.ts          # Main extension logic
├── snippets/recipes.json     # Recipe snippets
├── images/icon.svg          # Extension icon
├── sample-*.md              # Example recipes
├── package.json             # Extension manifest
└── README.md               # Documentation
```

## 🎯 Sample Files

The extension includes sample recipes:
- **`sample-chocolate-chip-cookies.md`** - Classic baking recipe
- **`sample-quinoa-bowl.md`** - Healthy meal with nutrition info

Open these files to see:
- Professional recipe formatting
- Proper use of timers and fractions
- Nutrition information layout
- Recipe metadata structure

## 🚀 Advanced Usage

### **Custom Templates**
Create your own templates by:
1. Making a recipe in your preferred format
2. Saving as `.md` file
3. Using as starting point for future recipes

### **Export Workflow**
1. Write recipe in Markdown
2. Use formatting tools to polish
3. Preview for quality check
4. Export to desired format
5. Share or print for kitchen use

### **Collaboration**
- Store recipes in Git repositories
- Share `.md` files with other recipe formatter users
- Export HTML for blog publishing
- Print for physical recipe collections

## 📞 Support

### **Getting Help**
1. Check this installation guide
2. Review the README.md for features
3. Try the sample recipes for examples
4. Check VS Code's extension panel for updates

### **Feature Requests**
If you'd like additional features:
- Recipe scaling calculator
- PDF export
- Nutrition database integration
- More cuisine templates

Consider supporting development:
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/gingerturtle)

## 🎉 Success!

Your Markdown Recipe Formatter is now ready to help you create beautiful, professional recipes with ease!

**Happy cooking and happy coding! 🍳✨**