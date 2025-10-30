import * as vscode from 'vscode';

/**
 * エディタ関連イベントの購読を行う（副作用をここに集中させる）。
 */
export function registerListeners(
    context: vscode.ExtensionContext,
    update: (editor?: vscode.TextEditor) => void,
): void {
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((e) => update(e)));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection((e) => update(e.textEditor)));
}
