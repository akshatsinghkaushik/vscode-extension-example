const vscode = require('vscode');
const fs = require('fs');
var path = require('path');

// this method is called when vs code is activated
function activate(context) {
  console.log('decorator sample is activated');

  let timeout = undefined;

  let workSpacePath = `${path.resolve(
    vscode.workspace.workspaceFolders[0].uri.path.slice(3, path.length)
  )}/`;

  // It only runs if a icfg.dot (analysis) file in the currently opened workspace
  if (fs.existsSync(`${workSpacePath}analysis.txt`)) {
    //Get the analysis file and store it in a variable called text
    const text = fs.readFileSync(`${workSpacePath}analysis.txt`);

    // create a decorator type
    const matchDecorationType = vscode.window.createTextEditorDecorationType({
      cursor: 'crosshair',
      // use a themable color. See package.json for the declaration and default values.
      backgroundColor: { id: 'myextension.largeNumberBackground' },
    });

    // create a decorator type
    const match1DecorationType = vscode.window.createTextEditorDecorationType({
      cursor: 'crosshair',
      // use a themable color. See package.json for the declaration and default values.
      backgroundColor: { id: 'myextension.largeNumberBackground' },
    });

    // create a decorator type
    const match2DecorationType = vscode.window.createTextEditorDecorationType({
      cursor: 'crosshair',
      // use a themable color. See package.json for the declaration and default values.
      backgroundColor: { id: 'myextension.largeNumberBackground' },
    });

    let activeEditor = vscode.window.activeTextEditor;

    function updateDecorations() {
      if (!activeEditor) {
        return;
      }

      const regEx = /\{[\s]+ln\:[\s]+[0-9]+[\s]+fl\:[\s]+[a-z]+\.c[\s]+\}/g;
      const lnfl = [];
      let match;
      let matchArr = [];
      let matchIndex = 0;
      while ((match = regEx.exec(text))) {
        matchArr[matchIndex++] = match;
        const startPos = activeEditor.document.positionAt(match.index);
        const endPos = activeEditor.document.positionAt(
          match.index + match[0].length
        );
        const decoration = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage: 'Hovering **' + match[0] + '**',
        };
        lnfl.push(decoration);
      }
      console.log('match');
      console.log(matchArr);
      activeEditor.setDecorations(matchDecorationType, lnfl);

      const regExlnclfl = /\{[\s]+ln\:[\s]+[0-9]+[\s]+cl\:[\s]+[0-9]+[\s]+fl\:[\s]+[a-z]+\.c[\s]+\}/g;

      const lnclfl = [];
      let match1;
      let match1Arr = [];
      let match1Index = 0;
      while ((match1 = regExlnclfl.exec(text))) {
        match1Arr[match1Index++] = match1;
        const startPos = activeEditor.document.positionAt(match1.index);
        const endPos = activeEditor.document.positionAt(
          match1.index + match1[0].length
        );
        const decoration = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage: 'Hovering **' + match1[0] + '**',
        };
        lnclfl.push(decoration);
      }
      console.log('match1');
      console.log(match1Arr);
      activeEditor.setDecorations(match1DecorationType, lnclfl);

      const regExlinefile = /\{[\s]+in[\s]+line\:[\s]+[0-9]+[\s]+file\:[\s]+[a-z]+\.c[\s]+\}/g;

      const linefile = [];
      let match2;
      let match2Arr = [];
      let match2Index = 0;
      while ((match2 = regExlinefile.exec(text))) {
        match2Arr[match2Index++] = match2;
        const startPos = activeEditor.document.positionAt(match2.index);
        const endPos = activeEditor.document.positionAt(
          match2.index + match2[0].length
        );
        const decoration = {
          range: new vscode.Range(startPos, endPos),
          hoverMessage: 'Hovering **' + match2[0] + '**',
        };
        linefile.push(decoration);
      }
      console.log('match2');
      console.log(match2Arr);
      activeEditor.setDecorations(match2DecorationType, linefile);
    }

    function triggerUpdateDecorations() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined;
      }
      timeout = setTimeout(updateDecorations, 500);
    }

    if (activeEditor) {
      triggerUpdateDecorations();
    }

    vscode.window.onDidChangeActiveTextEditor(
      (editor) => {
        activeEditor = editor;
        if (editor) {
          triggerUpdateDecorations();
        }
      },
      null,
      context.subscriptions
    );

    vscode.workspace.onDidChangeTextDocument(
      (event) => {
        if (activeEditor && event.document === activeEditor.document) {
          triggerUpdateDecorations();
        }
      },
      null,
      context.subscriptions
    );
  }
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
