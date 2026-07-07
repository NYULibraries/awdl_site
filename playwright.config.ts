import { defineConfig, devices } from '@playwright/test';

export const TIMEOUT = 30000;
export const EXTENDED_TIMEOUT = 60000;

export default defineConfig({
  timeout: TIMEOUT,
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 5,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://awdl-site.ddev.site',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    navigationTimeout: EXTENDED_TIMEOUT,
    actionTimeout: EXTENDED_TIMEOUT,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
