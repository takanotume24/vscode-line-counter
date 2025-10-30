import * as vscode from 'vscode';
import { updateSelectionCount } from './updateSelectionCount';

/**
 * statusBarItem を受け取り、editor 引数を受け取る updater 関数を返す（純関数に近いファクトリ）。
 */
export function makeUpdate(statusBarItem: vscode.StatusBarItem): (editor?: vscode.TextEditor) => void {
    return (editor?: vscode.TextEditor) => updateSelectionCount(statusBarItem, editor);
}
