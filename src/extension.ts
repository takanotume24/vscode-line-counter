// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-line-counter" is now active!');

	// ステータスバー項目を作成
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.tooltip = '選択された行数を表示します';
	context.subscriptions.push(statusBarItem);

	// 選択行数を計算してステータスバーを更新する関数
	const updateSelectionCount = (editor?: vscode.TextEditor) => {
		const active = editor ?? vscode.window.activeTextEditor;
		if (!active) {
			statusBarItem.hide();
			return;
		}

		const selections = active.selections;
		let totalLines = 0;
		for (const sel of selections) {
			if (sel.isEmpty) {
				continue;
			}
			const start = sel.start.line;
			const end = sel.end.line;
			// 選択範囲の行数は終端と始端の差 + 1
			totalLines += Math.abs(end - start) + 1;
		}

		if (totalLines > 0) {
			statusBarItem.text = `$(selection) ${totalLines} 行選択`;
			statusBarItem.show();
		} else {
			statusBarItem.hide();
		}
	};

	// 初期更新
	updateSelectionCount();

	// エディタの切替・選択変更を監視
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((e) => updateSelectionCount(e)));
	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((e) => updateSelectionCount(e.textEditor)));
}

// This method is called when your extension is deactivated
export function deactivate() {}
