import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    browserName: 'chromium',
    channel: 'chrome',
    headless: true,
    viewport: {width: 1440, height: 900},
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm_config_userconfig=/dev/null npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
