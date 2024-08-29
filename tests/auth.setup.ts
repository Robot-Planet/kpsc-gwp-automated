import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
let validUser = 'qa.test02@gmail.com';
let validPassword = 'Test1234!';

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('/profile');
    
    await page.locator('[data-id="login-page-username-input"]').fill(validUser);
    await page.locator('[data-id="login-page-continue-button"]').click();
    //await page.getByRole('button', {name: 'ดำเนินการต่อ'}).click();
    await page.locator('[data-id="welcome-back-page-password-input"]').fill(validPassword);
    await page.locator('[data-id="welcome-back-page-login-button"]').click();
    //await page.getByRole('button', {name: 'เข้าสู่ระบบ'}).click();

    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    
    //await page.waitForURL('/profile');
    await page.waitForURL('https://dev-web-frontend.firster.kpc-dev.com/');
    
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    //await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});
