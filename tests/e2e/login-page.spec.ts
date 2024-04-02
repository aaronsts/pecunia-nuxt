import { test, expect } from "@nuxt/test-utils/playwright";

test.beforeEach(async () => {
	console.log(`Running ${test.info().title}`);
});

test.describe("Login functionality", () => {
	test("Redirected to login page when logged out", async ({
		page,
		baseURL,
	}) => {
		await page.goto("/");
		expect(page.url()).toBe(`${baseURL}login`);
	});

	test("Redirected to home page when logging in", async ({ page, baseURL }) => {
		await page.goto("/login");
		await page.getByLabel("email").fill("aaron.staes@gmail.com");
		await page.getByLabel("password").fill("Sta3s3080z");
		await page.getByText("Sign In").click();
		await page.waitForURL(baseURL as string);
		await expect(page.url()).toBe(baseURL);
	});
});
