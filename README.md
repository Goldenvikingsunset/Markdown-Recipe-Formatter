# Markdown Recipe Formatter & Previewer

🍳 **The ultimate VS Code extension for creating, formatting, and previewing beautiful recipes in Markdown!**

Perfect for home cooks, food bloggers, cookbook authors, and anyone who loves to document their culinary creations with professional formatting and beautiful previews.

## ✨ Features

### 🍳 **Recipe Creation & Templates**
- **One-click recipe creation** with smart templates
- **Multiple recipe types**: Baking, cooking, salads, beverages, one-pot meals
- **Auto-generated metadata**: Servings, prep time, cook time, difficulty
- **Smart ingredient formatting** with proper fractions and units
- **Numbered instruction steps** with cooking timers

### 📝 **Professional Formatting**
- **Automatic fraction conversion** (1/2 → ½, 3/4 → ¾, etc.)
- **Unit standardization** (tsp → teaspoon, tbsp → tablespoon)
- **Smart ingredient lists** with proper bullet formatting
- **Numbered instructions** with automatic sequencing
- **Timer integration** (⏱️ 15 min) for cooking steps
- **Temperature formatting** with F° and C° conversion

### 👁️ **Beautiful Previews**
- **Recipe-themed HTML preview** with cooking-inspired styling
- **Print-friendly formatting** optimized for kitchen use
- **Professional typography** using serif fonts for readability
- **Color-coded sections** (ingredients, instructions, notes)
- **Mobile-responsive design** for tablets and phones

### 📄 **Export & Sharing**
- **HTML export** for web publishing
- **Print-friendly HTML** without backgrounds
- **Plain text export** for sharing
- **One-click printing** with optimized layout

### 🔧 **Smart Tools**
- **Recipe validation** checks for proper structure
- **Nutrition information formatting** with templates
- **Cooking timer insertion** with one command
- **Recipe snippets** for quick insertion
- **Auto-suggestions** based on content context

## ☕ Like This Extension?

**Support its development** and keep it free for everyone:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/gingerturtle)

---

## 🚀 Quick Start

### Installation

1. **From VS Code Marketplace** (when published):
   ```
   ext install renni-dev.markdown-recipe-formatter
   ```

2. **From VSIX file**:
   - Download the `.vsix` file
   - Open VS Code
   - Press `Ctrl+Shift+P` → "Extensions: Install from VSIX"
   - Select the downloaded `.vsix` file

### First Recipe

1. **Create a new Markdown file** (`.md` extension)
2. **Press `Ctrl+Shift+P`** and type "New Recipe"
3. **Enter recipe details** when prompted
4. **Start adding ingredients and instructions**
5. **Preview with `Ctrl+Shift+R P`**

## 📖 Usage Guide

### 🍳 Creating Recipes

#### **Method 1: Command Palette**
```
Ctrl+Shift+P → "Recipe Formatter: New Recipe"
```

#### **Method 2: Snippet**
Type `recipe` in any Markdown file and press Tab

#### **Method 3: Template Insertion**
Right-click in Markdown file → "🍳 Recipe Formatter" → "📋 Insert Recipe Template"

### 📝 Formatting Tools

#### **Format Ingredients**
1. Select ingredient text
2. Press `Ctrl+Shift+R I` or use Command Palette
3. Extension will:
   - Add proper bullet points
   - Convert fractions (1/2 → ½)
   - Standardize units (tsp → teaspoon)

#### **Format Instructions**
1. Select instruction text  
2. Press `Ctrl+Shift+R S` or use Command Palette
3. Extension will:
   - Add sequential numbering
   - Suggest cooking timers
   - Format temperatures

#### **Validate Recipe**
```
Ctrl+Shift+P → "Recipe Formatter: Validate Recipe"
```
Checks for:
- Recipe title
- Ingredients section
- Instructions section
- Proper formatting

### 👁️ Preview & Export

#### **Preview Recipe**
```
Ctrl+Shift+R P
```
Opens beautiful, print-ready preview in side panel

#### **Export Recipe**
```
Ctrl+Shift+P → "Recipe Formatter: Export Recipe"
```
Choose from:
- HTML file for web
- Print-friendly HTML  
- Plain text format

## 🎯 Keyboard Shortcuts

| Action | Windows/Linux | Mac | Description |
|--------|---------------|-----|-------------|
| New Recipe | `Ctrl+Shift+R N` | `Cmd+Shift+R N` | Create new recipe |
| Preview Recipe | `Ctrl+Shift+R P` | `Cmd+Shift+R P` | Open preview panel |
| Format Ingredients | `Ctrl+Shift+R I` | `Cmd+Shift+R I` | Format selected ingredients |
| Format Instructions | `Ctrl+Shift+R S` | `Cmd+Shift+R S` | Format selected steps |

## 📋 Recipe Snippets

Type these shortcuts in Markdown files and press Tab:

| Snippet | Description |
|---------|-------------|
| `recipe` | Complete recipe template |
| `ingredients` | Ingredients section |
| `instructions` | Instructions section |
| `nutrition` | Nutrition information |
| `baking` | Baking recipe template |
| `cooking` | Cooking recipe template |
| `timer` | Cooking timer (⏱️) |
| `temp` | Temperature format |
| `1/2`, `1/4`, `3/4` | Fraction symbols |

## ⚙️ Configuration

Access settings via `File > Preferences > Settings` and search for "Recipe Formatter":

### Recipe Creation
- **Default Servings**: Set default serving size for new recipes
- **Include Nutrition**: Auto-include nutrition section in templates
- **Use Metric Units**: Prefer metric over imperial units

### Formatting
- **Auto Format Ingredients**: Automatically format ingredients with fractions
- **Include Timers**: Add timer suggestions in cooking steps
- **Show Tips**: Display helpful formatting tips while typing

### Preview & Export
- **Print Friendly Preview**: Optimize preview for printing
- **Remove Backgrounds**: Clean printing without colored backgrounds

## 🍳 Recipe Examples

### Simple Cookie Recipe
```markdown
# Chocolate Chip Cookies

*Classic homemade cookies that are crispy on the outside and chewy inside*

## Recipe Information
- **Servings:** 24 cookies
- **Prep Time:** 15 minutes
- **Bake Time:** 12 minutes
- **Total Time:** 27 minutes
- **Difficulty:** Easy

## Ingredients

- 2¼ cups all-purpose flour
- 1 teaspoon baking soda
- 1 teaspoon salt
- 1 cup butter, softened
- ¾ cup granulated sugar
- ¾ cup brown sugar, packed
- 2 large eggs
- 2 teaspoons vanilla extract
- 2 cups chocolate chips

## Instructions

1. Preheat oven to 375°F (190°C) ⏱️ 15 min
2. Mix flour, baking soda, and salt in bowl
3. Cream butter and sugars until fluffy ⏱️ 3 min
4. Beat in eggs and vanilla
5. Gradually mix in flour mixture
6. Stir in chocolate chips
7. Drop rounded tablespoons onto ungreased cookie sheets
8. Bake for 9-11 minutes ⏱️ 10 min
9. Cool on baking sheet for 2 minutes ⏱️ 2 min
10. Transfer to wire rack

## Notes

- Store in airtight container up to 1 week
- Freeze dough balls for up to 3 months
- For chewier cookies, slightly underbake
```

### Advanced Recipe with Nutrition
```markdown
# Healthy Quinoa Buddha Bowl

## Recipe Information
- **Servings:** 4
- **Prep Time:** 20 minutes
- **Cook Time:** 15 minutes
- **Total Time:** 35 minutes
- **Difficulty:** Medium
- **Cuisine:** Mediterranean
- **Course:** Main Dish

## Ingredients

### For the Bowl
- 1 cup quinoa
- 2 cups vegetable broth
- 1 can chickpeas, drained and rinsed
- 2 cups kale, massaged
- 1 large carrot, julienned
- 1 cucumber, diced
- ½ avocado, sliced

### For the Dressing
- ¼ cup tahini
- 2 tablespoons lemon juice
- 1 tablespoon olive oil
- 1 clove garlic, minced
- Salt and pepper to taste

## Instructions

1. Rinse quinoa and cook in vegetable broth ⏱️ 15 min
2. While quinoa cooks, prepare vegetables
3. Massage kale with a pinch of salt ⏱️ 2 min
4. Whisk together dressing ingredients
5. Roast chickpeas at 400°F for 20 minutes ⏱️ 20 min
6. Assemble bowls with quinoa as base
7. Top with vegetables and chickpeas
8. Drizzle with dressing

## Nutrition Information

*Per serving (approximate):*

- **Calories:** 420
- **Protein:** 16g
- **Carbs:** 52g
- **Fat:** 18g
- **Fiber:** 12g
- **Sugar:** 8g

## Storage

- **Refrigerator:** Components keep separately up to 4 days
- **Assembly:** Best when assembled fresh
```

## 🆘 Troubleshooting

### **Extension Not Loading**
- Ensure you're in a Markdown file (`.md` extension)
- Check VS Code developer console for errors
- Try restarting VS Code

### **Formatting Not Working**
- Select text before using format commands
- Ensure proper Markdown syntax
- Check extension configuration settings

### **Preview Not Showing**
- Verify the file contains recipe content
- Check if webview is blocked by security settings
- Try refreshing the preview panel

### **Snippets Not Working**
- Type snippet prefix and press Tab
- Ensure you're in a Markdown file
- Check if other snippet extensions are conflicting

## 🤝 Contributing

We welcome contributions! Areas where you can help:

- **Recipe Templates**: Add templates for different cuisines
- **Formatting Rules**: Improve ingredient/instruction parsing
- **Export Formats**: Add PDF, Word, or other export options
- **Nutrition Database**: Integration with nutrition APIs
- **Localization**: Support for different languages and units

## 📝 Changelog

### Version 1.0.0
- Initial release
- Complete recipe template system
- Professional formatting tools
- Beautiful HTML preview
- Export functionality
- Recipe validation
- Comprehensive snippet library
- Timer and temperature integration
- Nutrition information support

---

**Made with ❤️ for home cooks and food enthusiasts everywhere!**

## ☕ Support This Extension

If this extension has made your recipe documentation easier and more beautiful, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-orange?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/gingerturtle)

Your support helps:
- ✨ Keep the extension **free** for everyone
- 🚀 Fund new **features** like nutrition database integration  
- 🐛 Fix **bugs** and maintain compatibility
- 📚 Create better **documentation** and tutorials
- 🍳 Add more **recipe templates** and cuisines

**Thank you for using Markdown Recipe Formatter!** 🙏