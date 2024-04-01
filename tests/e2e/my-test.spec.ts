import { test, expect } from "@playwright/test";

test("Testing Index Page", async ({ page }) => {
	await page.goto("/");
	expect(page.url()).toBe("http://localhost:3000/login");
});
