import { Page, expect } from "@playwright/test";
import { classMyCustProfile } from "../my_profile/plClass";

async function changeLanguageToTH(page:Page) {
    await page.locator('[data-id="header-language-menu-dropdown"]').click();
    await page.waitForLoadState('load');
    await page.locator('[data-id="header-language-menu-language-th-active-text"]').click();
    await page.waitForLoadState('load');
}

async function changeLanguageToEN(page:Page) {
    await page.locator('[data-id="header-language-menu-dropdown"]').click();
    await page.waitForLoadState('load');
    await page.locator('[data-id="header-language-menu-language-en-text"]').click();
    await page.waitForLoadState('load');
}

async function getDataId(page:Page, value:string) {
    let locatorStr = value;
    // console.log('[data-id="${locator}"]');
    //return await page.locator('[data-id=${locator}]').inputValue();
    
    //return await page.locator('[data-id="'+locatorStr+'"]');
    let retData = await page.locator('[data-id="'+locatorStr+'"]').inputValue();
    return retData;

    //return await page.locator('[data-id="welcome-back-page-username-input"]');
    //await page.waitForLoadState('load');
}

async function inputText(page:Page, locator:string, value:string) {
    page.locator('[data-id="'+locator+'"]').fill(value, {'timeout': 60000});
}


async function clickButton(page:Page, locator:string) {
    page.locator('[data-id="'+locator+'"]').click();
}

async function clickButtonByRole(page:Page, locator:string, role:string) {
    page.locator('[data-id="'+locator+'"]').click();
}

async function validateCustomer(page:Page, myCust:classMyCustProfile, custData:classMyCustProfile) {
    await expect(myCust.email).toContain(custData.email);
    await expect(myCust.sex).toContain(custData.sex);
    await expect(myCust.receiveEmailPromote).toContain(custData.receiveEmailPromote);
    await expect(myCust.receiveSmsPromote).toContain(custData.receiveSmsPromote);
}

module.exports = { changeLanguageToEN, changeLanguageToTH,
                   getDataId, inputText, clickButton,
                   validateCustomer
};

// changeLanguageToTH({page).then((data) => {
//     console.log('Data:', data);
// }).catch((error) => {
//     console.error('Failed to open page:', error);
// });
  

