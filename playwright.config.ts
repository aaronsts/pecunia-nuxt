import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";
// import type { ConfigOptions } from "@nuxt/test-utils/playwright";

// const devicesToTest = [
// 	"Desktop Chrome",
// 	"Desktop Firefox",
// 	// "Desktop Safari",
// 	// Test against mobile viewports.
// 	// 'Pixel 5',
// 	// 'iPhone 12',
// 	// Test against branded browsers.
// 	// { ...devices['Desktop Edge'], channel: 'msedge' },
// 	// { ...devices['Desktop Chrome'], channel: 'chrome' },
// ] satisfies Array<string | (typeof devices)[string]>;

/* See https://playwright.dev/docs/test-configuration */
export default defineConfig({
	testDir: "./tests",
	/* Maximum time one test can run for. */
	timeout: 30 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "line",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		testIdAttribute: "id",
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 3000,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: "http://localhost:3000/",
	},
	projects: [
		// Setup Project
		{ name: "setup", testMatch: /.*\.setup.ts/ },
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
				// Use prepared auth state.
				storageState: "playwright/.auth/user.json",
			},
			dependencies: ["setup"],
		},
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
				// Use prepared auth state.
				storageState: "playwright/.auth/user.json",
			},
			dependencies: ["setup"],
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
				// Use prepared auth state.
				storageState: "playwright/.auth/user.json",
			},
			dependencies: ["setup"],
		},
	],
	/* Run your local dev server before starting the tests */
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: true,
	},
});
