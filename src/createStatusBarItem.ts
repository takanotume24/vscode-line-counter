import * as vscode from 'vscode';

/**
 * ステータスバー項目を作成して返す（副作用は最小限）。
 */
export function createStatusBarItem(): vscode.StatusBarItem {
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    item.tooltip = '選択された行数を表示します';
    return item;
}
