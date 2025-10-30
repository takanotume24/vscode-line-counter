# vscode-line-counter

Lightweight Visual Studio Code extension that shows the number of selected lines in the status bar.

## Overview

This extension displays the total number of lines selected in the active editor (supports multiple selections) in the status bar along with an icon. When there is no selection, the status bar item is hidden. The extension is lightweight and designed to run continuously with minimal overhead.

Key features:

- Sums line counts across multiple selections
- Hides the status bar item when nothing is selected
- Activates on startup for immediate availability (`activationEvents`: `onStartupFinished`)

## Requirements

- Visual Studio Code 1.105.0 or newer (see `engines.vscode` in `package.json`)

## Usage

1. Install the extension or run it from the development host.
2. Select text in an editor — the selected line count appears on the left side of the status bar.

Note: The extension activates on `onStartupFinished`, so the status may take a short moment to appear right after window startup.

## For developers

Build and development scripts are defined in `package.json`.

Typical workflow:

1. Install dependencies:

```bash
npm install
```

1. Start development watch mode (rebuilds on source changes):

```bash
npm run watch
```

1. Open this repository in VS Code and use the Debug view to run "Launch Extension" (F5).

Build & packaging:

- Development build: `npm run compile`
- Production package: `npm run package` (create `.vsix` with `npm run vsix`)

Tests:

This repository includes tests. Build first (`npm run compile` or `npm run watch`), then run the test runner or use the test task defined in `package.json`.

## Notes

- The README content has been translated from Japanese to English and checked against `package.json` for activation and engine compatibility. If you update activation or engine settings in `package.json`, please update this README accordingly.
