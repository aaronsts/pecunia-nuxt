import test, { expect } from "playwright/test";

test("can create transaction", async ({ page }) => {
	const amount = Math.round(Math.random() * 10000000);
	await page.goto("/");
	await page.pause();
	await page.getByTestId("description").click();
	await page.getByTestId("description").fill("Test Transaction");
	await page.getByTestId("amount").click();
	await page.getByTestId("amount").fill(`${amount}`);
	await page
		.getByTestId("account")
		.selectOption("f55a80bf-239d-48fd-b5c7-aff3596fec68");
	await page.getByTestId("payee").selectOption("14");
	await page.getByTestId("category").selectOption("31");
	await page.getByTestId("date").fill("2024-04-04");
	await page.getByRole("button", { name: "Add Transaction" }).click();

	await expect(page.getByText(`Test transaction - ${amount}`)).toBeDefined();
});
