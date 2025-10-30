import * as assert from 'assert';
import * as vscode from 'vscode';
import { calcSelectedLines } from '../calcSelectedLines';

suite('calcSelectedLines', () => {
    test('returns 0 for empty selections', () => {
        // 入力値: 単一の空選択
        const pos: vscode.Position = new vscode.Position(0, 0);
        const selections: readonly vscode.Selection[] = [new vscode.Selection(pos, pos)];

        // 期待値: 0 行
        const actual: number = calcSelectedLines(selections);
        assert.strictEqual(actual, 0);
    });

    test('counts single-line selection as 1', () => {
        // 入力値: 同一行内の選択
        const sel: vscode.Selection = new vscode.Selection(new vscode.Position(2, 0), new vscode.Position(2, 5));
        const actual: number = calcSelectedLines([sel]);

        // 期待値: 1 行
        assert.strictEqual(actual, 1);
    });

    test('counts multi-line selection', () => {
        // 入力値: 2 行から4 行目までの選択 (inclusive)
        const sel: vscode.Selection = new vscode.Selection(new vscode.Position(1, 0), new vscode.Position(3, 0));
        const actual: number = calcSelectedLines([sel]);

        // 期待値: 3 行
        assert.strictEqual(actual, 3);
    });

    test('handles reversed selection (end before start)', () => {
        // 入力値: 開始位置が end より下にある（逆向き選択）
        const sel: vscode.Selection = new vscode.Selection(new vscode.Position(4, 0), new vscode.Position(2, 0));
        const actual: number = calcSelectedLines([sel]);

        // 期待値: abs(4-2)+1 = 3 行
        assert.strictEqual(actual, 3);
    });

    test('mixed selections: empty + multi + single', () => {
        // 入力値: 空選択、単一行、複数行の混在
        const emptyPos: vscode.Position = new vscode.Position(0, 0);
        const s1: vscode.Selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 5)); // 1 行
        const s2: vscode.Selection = new vscode.Selection(new vscode.Position(2, 0), new vscode.Position(4, 0)); // 3 行
        const s3: vscode.Selection = new vscode.Selection(emptyPos, emptyPos); // 空選択

        const selections: readonly vscode.Selection[] = [s1, s2, s3];
        const actual: number = calcSelectedLines(selections);

        // 期待値: 1 + 3 + 0 = 4
        assert.strictEqual(actual, 4);
    });
});
