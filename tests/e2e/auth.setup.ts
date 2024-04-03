import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page, baseURL }) => {
	// Perform authentication steps. Replace these actions with your own.
	console.log("baseURL", baseURL);
	await page.goto(baseURL + "login");

	// await expect(page.getByLabel("Email or Username")).toBeVisible();
	await page.getByLabel("Email or Username").click();
	await page.getByLabel("Email or Username").fill("aaron.staes@gmail.com");

	// await expect(page.getByLabel("Password")).toBeVisible();
	await page.getByLabel("Password").click();
	await page.getByLabel("Password").fill("Sta3s3080z");
	await page.getByLabel("Password").press("Enter");

	await page.getByRole("button", { name: "Sign In" }).click();

	// Wait until the page receives the cookies.
	//
	// Sometimes login flow sets cookies in the process of several redirects.
	// Wait for the final URL to ensure that the cookies are actually set.
	await page.waitForURL(baseURL as string);

	// End of authentication steps.
	await page.context().storageState({ path: authFile });
});
