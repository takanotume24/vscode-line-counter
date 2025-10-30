import * as path from 'path';
import Mocha from 'mocha';
import { sync as globSync } from 'glob';

export function run(): Promise<void> {
  const mocha = new Mocha({ ui: 'tdd', color: true });

  const testsRoot: string = path.resolve(__dirname, '..');

  const files: string[] = globSync('**/*.test.js', { cwd: testsRoot });

  files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

  return new Promise((resolve, reject) => {
    try {
      mocha.run((failures: number) => (failures ? reject(new Error(`${failures} tests failed.`)) : resolve()));
    } catch (e) {
      reject(e);
    }
  });
}
