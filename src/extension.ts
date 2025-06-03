import * as vscode from 'vscode';
import * as path from 'path';

interface RecipeMetadata {
  title: string;
  description?: string;
  servings: number;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  difficulty?: string;
  cuisine?: string;
  course?: string;
}

interface Ingredient {
  amount?: string;
  unit?: string;
  name: string;
  notes?: string;
}

interface RecipeStep {
  step: number;
  instruction: string;
  timer?: string;
  temperature?: string;
}

class RecipeFormatter {
  constructor(private context: vscode.ExtensionContext) {}

  formatIngredients(text: string): string {
    const lines = text.split('\n');
    const formattedLines = lines.map(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return line;
      
      // Convert common fractions
      line = this.convertFractions(line);
      
      // Standardize units
      line = this.standardizeUnits(line);
      
      // Ensure proper bullet format
      if (!line.startsWith('-') && !line.startsWith('*') && line.length > 0) {
        line = `- ${line}`;
      }
      
      return line;
    });
    
    return formattedLines.join('\n');
  }

  formatSteps(text: string): string {
    const lines = text.split('\n');
    let stepNumber = 1;
    
    const formattedLines = lines.map(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return line;
      
      // Add timer suggestions
      line = this.addTimerSuggestions(line);
      
      // Ensure proper numbering
      if (!line.match(/^\d+\./) && line.length > 0) {
        line = `${stepNumber}. ${line}`;
        stepNumber++;
      }
      
      return line;
    });
    
    return formattedLines.join('\n');
  }

  private convertFractions(text: string): string {
    const fractionMap: { [key: string]: string } = {
      '1/2': '½',
      '1/3': '⅓',
      '2/3': '⅔',
      '1/4': '¼',
      '3/4': '¾',
      '1/8': '⅛',
      '3/8': '⅜',
      '5/8': '⅝',
      '7/8': '⅞',
      '1/5': '⅕',
      '2/5': '⅖',
      '3/5': '⅗',
      '4/5': '⅘',
      '1/6': '⅙',
      '5/6': '⅚'
    };

    Object.keys(fractionMap).forEach(fraction => {
      const regex = new RegExp(fraction.replace('/', '\\/'), 'g');
      text = text.replace(regex, fractionMap[fraction]);
    });

    return text;
  }

  private standardizeUnits(text: string): string {
    const unitMap: { [key: string]: string } = {
      'tsp': 'teaspoon',
      'tbsp': 'tablespoon',
      'oz': 'ounce',
      'lb': 'pound',
      'lbs': 'pounds',
      'fl oz': 'fluid ounce',
      'qt': 'quart',
      'pt': 'pint',
      'gal': 'gallon',
      'deg': '°',
      'degrees': '°'
    };

    Object.keys(unitMap).forEach(abbrev => {
      const regex = new RegExp(`\\b${abbrev}\\b`, 'gi');
      text = text.replace(regex, unitMap[abbrev]);
    });

    return text;
  }

  private addTimerSuggestions(text: string): string {
    const config = vscode.workspace.getConfiguration('recipeFormatter');
    if (!config.get<boolean>('includeTimers', true)) {
      return text;
    }

    // Look for time-related keywords and suggest timers
    const timePatterns = [
      { pattern: /bake.*?(\d+)\s*(?:min|minute|minutes)/i, template: '⏱️ $1 min' },
      { pattern: /cook.*?(\d+)\s*(?:min|minute|minutes)/i, template: '⏱️ $1 min' },
      { pattern: /simmer.*?(\d+)\s*(?:min|minute|minutes)/i, template: '⏱️ $1 min' },
      { pattern: /boil.*?(\d+)\s*(?:min|minute|minutes)/i, template: '⏱️ $1 min' },
      { pattern: /rest.*?(\d+)\s*(?:min|minute|minutes)/i, template: '⏱️ $1 min' }
    ];

    timePatterns.forEach(({ pattern, template }) => {
      const match = text.match(pattern);
      if (match && !text.includes('⏱️')) {
        const timerText = template.replace('$1', match[1]);
        text = `${text} ${timerText}`;
      }
    });

    return text;
  }

  generateRecipeTemplate(metadata: RecipeMetadata): string {
    const config = vscode.workspace.getConfiguration('recipeFormatter');
    const includeNutrition = config.get<boolean>('includeNutrition', false);
    
    return `# ${metadata.title}

${metadata.description ? `*${metadata.description}*` : ''}

## Recipe Information
- **Servings:** ${metadata.servings}
- **Prep Time:** ${metadata.prepTime || '15 minutes'}
- **Cook Time:** ${metadata.cookTime || '30 minutes'}
- **Total Time:** ${metadata.totalTime || '45 minutes'}
- **Difficulty:** ${metadata.difficulty || 'Easy'}
${metadata.cuisine ? `- **Cuisine:** ${metadata.cuisine}` : ''}
${metadata.course ? `- **Course:** ${metadata.course}` : ''}

## Ingredients

- 
- 
- 

## Instructions

1. 
2. 
3. 

## Notes

- 
- 

${includeNutrition ? `## Nutrition Information

*Per serving (approximate):*

- **Calories:** 
- **Protein:** 
- **Carbs:** 
- **Fat:** 
- **Fiber:** 
- **Sugar:** 

` : ''}---

*Recipe created with [Markdown Recipe Formatter](https://buymeacoffee.com/gingerturtle) 🍳*
`;
  }

  generatePreviewHTML(markdownContent: string): string {
    const config = vscode.workspace.getConfiguration('recipeFormatter');
    const printFriendly = config.get<boolean>('printFriendlyPreview', true);
    
    // Simple markdown to HTML conversion for recipes
    let htmlContent = markdownContent
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.)/gm, '<p>$1')
      .replace(/(.*$)/gm, '$1</p>');

    // Wrap lists properly
    htmlContent = htmlContent
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/<\/ul>\s*<ul>/g, '');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Preview</title>
    <style>
        ${this.getRecipeCSS(printFriendly)}
    </style>
</head>
<body>
    <div class="recipe-container">
        ${htmlContent}
        <div class="recipe-footer">
            <p><em>Generated with Markdown Recipe Formatter</em></p>
            <button onclick="window.print()" class="print-button no-print">🖨️ Print Recipe</button>
        </div>
    </div>
</body>
</html>`;
  }

  private getRecipeCSS(printFriendly: boolean): string {
    return `
        body {
            font-family: Georgia, 'Times New Roman', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            ${printFriendly ? 'background: white;' : 'background: #fafafa;'}
        }
        
        .recipe-container {
            ${printFriendly ? '' : 'background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);'}
        }
        
        h1 {
            color: #8B4513;
            border-bottom: 3px solid #D2691E;
            padding-bottom: 10px;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        
        h2 {
            color: #A0522D;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.5em;
            border-left: 4px solid #D2691E;
            padding-left: 15px;
        }
        
        h3 {
            color: #8B4513;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        
        ul {
            background: #F5F5DC;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #D2691E;
        }
        
        ol {
            background: #F0F8FF;
            padding: 20px;
            border-radius: 5px;
            border-left: 4px solid #4682B4;
        }
        
        li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        strong {
            color: #8B4513;
        }
        
        em {
            color: #666;
            font-style: italic;
        }
        
        .print-button {
            background: #D2691E;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        
        .print-button:hover {
            background: #8B4513;
        }
        
        .recipe-footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #D2691E;
            text-align: center;
            color: #666;
        }
        
        @media print {
            .no-print {
                display: none !important;
            }
            
            body {
                background: white !important;
                color: black !important;
            }
            
            .recipe-container {
                box-shadow: none !important;
                padding: 0 !important;
            }
            
            h1, h2, h3 {
                color: black !important;
                break-after: avoid;
            }
            
            ul, ol {
                background: none !important;
                break-inside: avoid;
            }
            
            li {
                break-inside: avoid;
            }
        }
        
        .nutrition-info {
            background: #E6F3FF;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #B3D9FF;
        }
        
        .recipe-meta {
            background: #FFF8DC;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #F0E68C;
            margin-bottom: 25px;
        }
    `;
  }

  validateRecipe(content: string): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    const lines = content.split('\n');
    
    let hasTitle = false;
    let hasIngredients = false;
    let hasInstructions = false;
    
    // Check for basic recipe structure
    lines.forEach(line => {
      if (line.match(/^#\s+.+/)) hasTitle = true;
      if (line.toLowerCase().includes('ingredient')) hasIngredients = true;
      if (line.toLowerCase().includes('instruction') || line.toLowerCase().includes('steps') || line.toLowerCase().includes('method')) hasInstructions = true;
    });
    
    if (!hasTitle) issues.push('Recipe should have a title (# Title)');
    if (!hasIngredients) issues.push('Recipe should have an ingredients section');
    if (!hasInstructions) issues.push('Recipe should have instructions/steps section');
    
    // Check for common formatting issues
    const ingredientSection = this.extractSection(content, 'ingredient');
    if (ingredientSection) {
      const ingredientLines = ingredientSection.split('\n').filter(line => line.trim() && !line.startsWith('#'));
      if (ingredientLines.some(line => !line.match(/^[-*]\s+/))) {
        issues.push('Some ingredients are not properly formatted as list items');
      }
    }
    
    const instructionSection = this.extractSection(content, 'instruction');
    if (instructionSection) {
      const instructionLines = instructionSection.split('\n').filter(line => line.trim() && !line.startsWith('#'));
      if (instructionLines.some(line => line.trim() && !line.match(/^\d+\.\s+/))) {
        issues.push('Some instructions are not properly numbered');
      }
    }
    
    return {
      isValid: issues.length === 0,
      issues
    };
  }

  private extractSection(content: string, sectionName: string): string | null {
    const regex = new RegExp(`##\\s+.*${sectionName}.*\\n([\\s\\S]*?)(?=##|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  }

  formatNutritionInfo(text: string): string {
    const lines = text.split('\n');
    const formattedLines = lines.map(line => {
      line = line.trim();
      if (!line) return line;
      
      // Format nutrition entries
      if (line.match(/\b(calorie|protein|carb|fat|fiber|sugar|sodium|cholesterol)s?\b/i)) {
        if (!line.startsWith('-') && !line.startsWith('*')) {
          line = `- **${this.capitalizeFirst(line)}**`;
        }
      }
      
      return line;
    });
    
    return formattedLines.join('\n');
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Markdown Recipe Formatter extension is now active!');

  const formatter = new RecipeFormatter(context);

  // Register commands
  const commands = [
    vscode.commands.registerCommand('recipeFormatter.sponsor', async () => {
      const sponsorUrl = 'https://buymeacoffee.com/gingerturtle';
      const choice = await vscode.window.showInformationMessage(
        '🍳 Enjoying the Recipe Formatter?',
        {
          modal: false,
          detail: 'Your support helps keep this extension free and cooking-focused!'
        },
        'Buy Me a Coffee ☕',
        'Maybe Later'
      );
      
      if (choice === 'Buy Me a Coffee ☕') {
        vscode.env.openExternal(vscode.Uri.parse(sponsorUrl));
      }
    }),

    vscode.commands.registerCommand('recipeFormatter.newRecipe', async () => {
      const title = await vscode.window.showInputBox({
        prompt: 'Enter recipe title',
        placeHolder: 'Delicious Chocolate Chip Cookies'
      });

      if (!title) return;

      const servings = await vscode.window.showInputBox({
        prompt: 'Number of servings',
        placeHolder: '4',
        value: '4'
      });

      const metadata: RecipeMetadata = {
        title,
        servings: parseInt(servings || '4'),
        prepTime: '15 minutes',
        cookTime: '30 minutes',
        totalTime: '45 minutes',
        difficulty: 'Easy'
      };

      const template = formatter.generateRecipeTemplate(metadata);
      
      // Create new document
      const doc = await vscode.workspace.openTextDocument({
        content: template,
        language: 'markdown'
      });
      
      await vscode.window.showTextDocument(doc);
      vscode.window.showInformationMessage('🍳 New recipe created! Start adding your ingredients and instructions.');
    }),

    vscode.commands.registerCommand('recipeFormatter.formatIngredients', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to format ingredients.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText) {
        vscode.window.showInformationMessage('Please select the ingredient text to format.');
        return;
      }

      const formattedText = formatter.formatIngredients(selectedText);
      
      await editor.edit(editBuilder => {
        editBuilder.replace(selection, formattedText);
      });

      vscode.window.showInformationMessage('✨ Ingredients formatted successfully!');
    }),

    vscode.commands.registerCommand('recipeFormatter.formatSteps', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to format steps.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText) {
        vscode.window.showInformationMessage('Please select the instruction text to format.');
        return;
      }

      const formattedText = formatter.formatSteps(selectedText);
      
      await editor.edit(editBuilder => {
        editBuilder.replace(selection, formattedText);
      });

      vscode.window.showInformationMessage('✨ Instructions formatted successfully!');
    }),

    vscode.commands.registerCommand('recipeFormatter.insertTemplate', async () => {
      const templateOptions = [
        { label: '🍪 Basic Recipe', value: 'basic' },
        { label: '🍰 Baking Recipe', value: 'baking' },
        { label: '🍲 Cooking Recipe', value: 'cooking' },
        { label: '🥗 Salad Recipe', value: 'salad' },
        { label: '🍹 Beverage Recipe', value: 'beverage' },
        { label: '🥘 One-Pot Recipe', value: 'onepot' }
      ];

      const selected = await vscode.window.showQuickPick(templateOptions, {
        placeHolder: 'Choose a recipe template'
      });

      if (!selected) return;

      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      let template = '';
      
      switch (selected.value) {
        case 'baking':
          template = `## Ingredients

- 2 cups all-purpose flour
- 1 cup sugar
- ½ cup butter, softened
- 2 large eggs
- 1 teaspoon vanilla extract
- 1 teaspoon baking powder
- ½ teaspoon salt

## Instructions

1. Preheat oven to 350°F (175°C) ⏱️ 15 min
2. Cream butter and sugar until light and fluffy
3. Beat in eggs and vanilla
4. Combine dry ingredients and gradually mix in
5. Bake for 25-30 minutes ⏱️ 30 min
6. Cool on wire rack before serving ⏱️ 10 min`;
          break;
        case 'cooking':
          template = `## Ingredients

- 1 lb main protein
- 2 tablespoons cooking oil
- 1 medium onion, diced
- 2 cloves garlic, minced
- Salt and pepper to taste
- Fresh herbs for garnish

## Instructions

1. Heat oil in large skillet over medium-high heat
2. Season protein with salt and pepper
3. Cook protein until browned, about 5 minutes per side ⏱️ 10 min
4. Add onion and garlic, cook until fragrant ⏱️ 3 min
5. Continue cooking until done ⏱️ 15 min
6. Garnish with fresh herbs and serve`;
          break;
        default:
          template = `## Ingredients

- 
- 
- 

## Instructions

1. 
2. 
3. `;
      }

      await editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, template);
      });

      vscode.window.showInformationMessage(`📋 ${selected.label} template inserted!`);
    }),

    vscode.commands.registerCommand('recipeFormatter.previewRecipe', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to preview the recipe.');
        return;
      }

      const content = editor.document.getText();
      const htmlContent = formatter.generatePreviewHTML(content);
      
      // Create webview panel
      const panel = vscode.window.createWebviewPanel(
        'recipePreview',
        '🍳 Recipe Preview',
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );

      panel.webview.html = htmlContent;
      
      vscode.window.showInformationMessage('👁️ Recipe preview opened!');
    }),

    vscode.commands.registerCommand('recipeFormatter.exportRecipe', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to export the recipe.');
        return;
      }

      const exportOptions = [
        { label: '📄 HTML File', value: 'html' },
        { label: '🖨️ Print-Friendly HTML', value: 'print' },
        { label: '📝 Plain Text', value: 'text' }
      ];

      const selected = await vscode.window.showQuickPick(exportOptions, {
        placeHolder: 'Choose export format'
      });

      if (!selected) return;

      const content = editor.document.getText();
      let exportContent = '';
      let fileExtension = '';

      switch (selected.value) {
        case 'html':
        case 'print':
          exportContent = formatter.generatePreviewHTML(content);
          fileExtension = '.html';
          break;
        case 'text':
          exportContent = content;
          fileExtension = '.txt';
          break;
      }

      const fileName = path.basename(editor.document.fileName, '.md') + '_recipe' + fileExtension;
      
      const saveUri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file(fileName),
        filters: {
          'HTML Files': ['html'],
          'Text Files': ['txt'],
          'All Files': ['*']
        }
      });

      if (saveUri) {
        await vscode.workspace.fs.writeFile(saveUri, Buffer.from(exportContent, 'utf8'));
        vscode.window.showInformationMessage(`📄 Recipe exported to ${saveUri.fsPath}`);
      }
    }),

    vscode.commands.registerCommand('recipeFormatter.validateRecipe', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to validate the recipe.');
        return;
      }

      const content = editor.document.getText();
      const validation = formatter.validateRecipe(content);

      if (validation.isValid) {
        vscode.window.showInformationMessage('✅ Recipe structure looks great!');
      } else {
        const issues = validation.issues.join('\n• ');
        vscode.window.showWarningMessage(`Recipe has some issues:\n• ${issues}`, 
          { modal: true });
      }
    }),

    vscode.commands.registerCommand('recipeFormatter.formatNutrition', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Please open a Markdown file to format nutrition info.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText) {
        // Insert nutrition template
        const nutritionTemplate = `## Nutrition Information

*Per serving (approximate):*

- **Calories:** 
- **Protein:** 
- **Carbs:** 
- **Fat:** 
- **Fiber:** 
- **Sugar:** 
- **Sodium:** `;

        await editor.edit(editBuilder => {
          editBuilder.insert(editor.selection.active, nutritionTemplate);
        });

        vscode.window.showInformationMessage('🥗 Nutrition template inserted!');
      } else {
        const formattedText = formatter.formatNutritionInfo(selectedText);
        
        await editor.edit(editBuilder => {
          editBuilder.replace(selection, formattedText);
        });

        vscode.window.showInformationMessage('✨ Nutrition info formatted!');
      }
    }),

    vscode.commands.registerCommand('recipeFormatter.addTimer', async () => {
      const timeInput = await vscode.window.showInputBox({
        prompt: 'Enter time (e.g., "15 min", "2 hours", "30 seconds")',
        placeHolder: '15 min'
      });

      if (!timeInput) return;

      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const timerText = `⏱️ ${timeInput}`;
      
      await editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, timerText);
      });

      vscode.window.showInformationMessage('⏱️ Timer added!');
    })
  ];

  context.subscriptions.push(...commands);

  // Watch for markdown file changes to provide suggestions
  vscode.workspace.onDidChangeTextDocument(event => {
    if (event.document.languageId !== 'markdown') return;
    
    const config = vscode.workspace.getConfiguration('recipeFormatter');
    if (!config.get<boolean>('showTips', true)) return;

    // Show helpful tips based on content
    const content = event.document.getText();
    
    if (content.includes('ingredients') && !content.includes('- ') && event.contentChanges.length > 0) {
      vscode.window.showInformationMessage(
        '💡 Tip: Use "Format Ingredients" command to auto-format your ingredient list!',
        'Format Now'
      ).then(choice => {
        if (choice === 'Format Now') {
          vscode.commands.executeCommand('recipeFormatter.formatIngredients');
        }
      });
    }
  });
}

export function deactivate() {}