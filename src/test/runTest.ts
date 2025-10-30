import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main(): Promise<void> {
  const extensionDevelopmentPath: string = path.resolve(__dirname, '../../');
  const extensionTestsPath: string = path.resolve(__dirname, './suite/index');

  // short user-data-dir to avoid long IPC socket paths on some CI/containers
  const userDataDir: string = path.resolve(__dirname, '../../.vscode-test-user-data');

  // Default launch args include a short user-data-dir.
  const launchArgs: string[] = [`--user-data-dir=${userDataDir}`];

  // In CI/HEADLESS environments add non-sandbox flags useful for headless/container runs.
  // NOTE: --no-sandbox weakens security. Add it only when explicitly requested or when running as root.
  if (process.env.CI === 'true' || process.env.CI === '1' || process.env.HEADLESS === '1') {
    // disable gpu which can cause issues in headless environments
    launchArgs.push('--disable-gpu');
    // disable shared memory usage (helps in containers with small /dev/shm)
    launchArgs.push('--disable-dev-shm-usage');
  }

  // Add --no-sandbox only when forced or when running as root (safe fallback for container/root CI)
  const forceNoSandbox: boolean = process.env.FORCE_NO_SANDBOX === '1' || process.env.FORCE_NO_SANDBOX === 'true';
  let runningAsRoot = false;
  try {
    // process.geteuid exists on POSIX; if unavailable, assume not root
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geteuid: any = (process as any).geteuid;
    if (typeof geteuid === 'function') {
      runningAsRoot = geteuid() === 0;
    }
  } catch (e) {
    runningAsRoot = false;
  }

  if (forceNoSandbox || runningAsRoot) {
    launchArgs.push('--no-sandbox');
  }

  try {
    await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs });
  } catch (err) {
    console.error('Failed to run tests:', err);
    process.exit(1);
  }
}

void main();
