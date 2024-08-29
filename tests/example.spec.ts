import { test, expect } from '@playwright/test';

//--- 2024-08-23, By Robot for testing auto authentication
test.describe('Using Authentication Status', () => {

//--- Without configuration it will be parallel mode
// test.describe.configure({mode: 'parallel'});
// test.describe.configure({mode: 'serial'});
//test.describe.configure({'mode': 'default'})  //--- It will be serial mode

    test.afterEach(async ({page}) => {
      console.log(`Finished ${test.info().title} with status ${test.info().status}`);
        
      if (test.info().status !== test.info().expectedStatus)
          console.log(`Did not run as expected, ended up at ${page.url()}`);
    });

    test('has title', async ({ page }) => {
      await page.goto('https://playwright.dev/');

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });

    test('get started link', async ({ page }) => {
      await page.goto('https://playwright.dev/');

      // Click the get started link.
      await page.getByRole('link', { name: 'Get started' }).click();

      // Expects page to have a heading with the name of Installation.
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
})