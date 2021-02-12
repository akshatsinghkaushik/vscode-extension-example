# VSCode Extension Minimal Sample

The extension looks for `{ ln: number fl: number }` or `{ ln: number cl: number fl: String }` or `{ in line: number file: String }` in a file called `icfg.dot` in the currently opened workspace and highlights them in the open text editor.

TODO:

- Analyse the matched (ln/line) line numbers and the (fl/file) filenames and highlight those lines in those specific files

## Running the Sample

- Run `npm install` in terminal to install dependencies
- Run the `Run Extension` target in the Debug View or press `F5` on your keyboard and select the VSCode Extension Development.
