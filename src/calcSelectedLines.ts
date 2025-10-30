import * as vscode from 'vscode';

/**
 * 与えられた選択範囲配列から選択されている合計行数を計算して返す（純関数）。
 */
export function calcSelectedLines(selections: readonly vscode.Selection[]): number {
    let total = 0;
    for (const sel of selections) {
        if (sel.isEmpty) {
            continue;
        }
        const start = sel.start.line;
        const end = sel.end.line;
        total += Math.abs(end - start) + 1;
    }
    return total;
}
