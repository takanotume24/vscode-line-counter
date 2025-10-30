import * as vscode from 'vscode';
import { calcSelectedLines } from './calcSelectedLines';

/**
 * ステータスバーを更新する関数（副作用を持つが単一の責務）。
 */
export function updateSelectionCount(statusBarItem: vscode.StatusBarItem, editor?: vscode.TextEditor): void {
    const active = editor ?? vscode.window.activeTextEditor;
    if (!active) {
        statusBarItem.hide();
        return;
    }

    const total = calcSelectedLines(active.selections);
    if (total > 0) {
        statusBarItem.text = `$(selection) ${total} ${total === 1 ? 'line' : 'lines'} selected`;
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
}
