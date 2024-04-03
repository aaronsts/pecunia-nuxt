import test, { expect } from "playwright/test";

// Annotate tests as inter-dependent.
test.describe("CRUD actions for payees", () => {
	test.describe.configure({ mode: "default" });
	const randomInt = Math.random();
	test("can create a payee", async ({ page }) => {
		console.log(`Using ${randomInt} as identifier for payees`);
		// Create payee
		await page.goto("/profile");
		await page.getByTestId("add-new-payee").click();
		await page.getByTestId("add-new-payee").fill(`test-payee ${randomInt}`);
		await page.getByRole("button", { name: "Add Payee" }).click();

		// Verify payee has been created
		expect(page.getByText(`test-payee ${randomInt}`)).toBeDefined();
	});

	test("can delete a payee", async ({ page }) => {
		await page.goto("/profile");
		await page
			.locator("li")
			.filter({ hasText: `test-payee ${randomInt}` })
			.getByRole("button")
			.click();

		await expect(
			page
				.locator("li")
				.filter({ hasText: `test-payee ${randomInt}` })
				.getByRole("button")
		).toHaveCount(0);
	});
});
