import { test, expect } from "@playwright/test";

// Reset storage state for this file to avoid being authenticated

test.beforeEach(async () => {
	console.log(`Running ${test.info().title}`);
});

test.describe("Login functionality", () => {
	test.use({ storageState: { cookies: [], origins: [] } });
	test("Redirected to login page when logged out", async ({
		page,
		baseURL,
	}) => {
		await page.goto(baseURL as string);
		expect(page.url()).toBe(`${baseURL}login`);
	});

	test("Redirected to home page when logging in", async ({ page, baseURL }) => {
		await page.goto(baseURL + "login");

		// await expect(page.getByLabel("Email or Username")).toBeVisible();
		await page.getByLabel("Email or Username").click();
		await page.getByLabel("Email or Username").fill("aaron.staes@gmail.com");

		// await expect(page.getByLabel("Password")).toBeVisible();
		await page.getByLabel("Password").click();
		await page.getByLabel("Password").fill("Sta3s3080z");
		await page.getByLabel("Password").press("Enter");

		await page.getByRole("button", { name: "Sign In" }).click();

		await page.screenshot({ path: "tests/screenshots/debug-timeout.png" }); // Captures the current state of the page

		await page.waitForURL(baseURL as string);
		await expect(page.url()).toBe(baseURL);
	});
});

test.describe("Logout functionality", () => {
	test("Logging out redirect to login page", async ({ page, baseURL }) => {
		await page.goto("/");
		await page.getByRole("button", { name: "Logout" }).click();

		await page.waitForURL(baseURL + "login");
		await expect(page.url()).toBe(baseURL + "login");
	});
});
