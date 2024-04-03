import test from "playwright/test";

test("can create transaction", async ({ page }) => {
	await page.goto("/");
	await page.pause();
});
