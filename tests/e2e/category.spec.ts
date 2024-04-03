import test, { expect } from "playwright/test";

// Annotate tests as inter-dependent.
test.describe("CRUD actions for categories", () => {
	test.describe.configure({ mode: "default" });
	const randomInt = Math.random();
	test("can create a category", async ({ page }) => {
		console.log(`Using ${randomInt} as identifier for categories`);
		// Create category
		await page.goto("/profile");
		await page.getByTestId("add-new-category").click();
		await page.getByTestId("add-new-category").fill(`test-gas ${randomInt}`);
		await page.getByRole("button", { name: "Add Category" }).click();

		// Verify category has been created
		expect(page.getByText(`test-gas ${randomInt}`)).toBeDefined();
	});

	test("can delete a category", async ({ page }) => {
		await page.goto("/profile");
		await page
			.locator("li")
			.filter({ hasText: `test-gas ${randomInt}` })
			.getByRole("button")
			.click();

		await expect(
			page
				.locator("li")
				.filter({ hasText: `test-gas ${randomInt}` })
				.getByRole("button")
		).toHaveCount(0);
	});
});
