import * as vscode from 'vscode';
import { createStatusBarItem } from './createStatusBarItem';
import { makeUpdate } from './makeUpdate';
import { registerListeners } from './registerListeners';

/**
 * 拡張機能の activate 実装（副作用を最小化し、関数は分割済み）。
 */
export function activate(context: vscode.ExtensionContext): void {
    // 一度だけ出力される診断ログ
    console.log('Congratulations, your extension "vscode-line-counter" is now active!');

    const statusBarItem = createStatusBarItem();
    context.subscriptions.push(statusBarItem);

    // 純粋な updater 関数をファクトリから取得
    const update = makeUpdate(statusBarItem);

    // 初期更新
    update();

    // イベント登録（副作用を集中させる）
    registerListeners(context, update);
}
