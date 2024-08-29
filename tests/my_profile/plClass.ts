//import { Page, expect } from "@playwright/test";
import { expect, type Locator, type Page } from '@playwright/test';

//import { classMyCustProfile } from "../my_profile/plClass";
const { changeLanguageToEN, changeLanguageToTH,
        getDataId, inputText,
        clickButton, validateCustomer } = require('../Utils/commonUtils');

// ----- Using class
export class classMyCustProfile {
    sex: string;
    email: string;
    telno: string;
    password: string;
    subscriptionPromote: boolean;
    receiveEmailPromote: boolean;
    receiveSmsPromote: boolean;
    page: Page;

    constructor(
        sex: string,
        email: string,
        telno: string,
        password: string,
        subscriptionPromote: boolean,
        receiveEmailPromote: boolean,
        receiveSmsPromote: boolean,
        page: Page,
    ) {
        this.sex = sex
        this.email = email
        this.telno = telno
        this.password = password
        this.subscriptionPromote = subscriptionPromote
        this.receiveEmailPromote = receiveEmailPromote
        this.receiveSmsPromote = receiveSmsPromote
        this.page = page
    }

    // By Robot, 2024-07-09
    async Goto(url: string = '/profile') {
        //await this.page.goto('https://playwright.dev');
        await this.page.goto(url, {'timeout': 60000}); // Add timeout by Robot, 2024-07-09
        // await Promise.all([
        //   this.page.waitForLoadState('networkidle'),
        //   this.page.goto(url)
        // ]);
        // await this.page.waitForTimeout(5000);
    }
    
    async LanguageToTH() {
        await changeLanguageToTH(this.page);
    }

    async LanguageToEN() {
        await changeLanguageToEN(this.page);
    }

    GetDataId(locator: String) {
        return getDataId(this.page, locator);
    }

    InputText(locator: string, value: string) {
        inputText(this.page, locator, value);
    }

    ClickButton(locator: String) {
        return clickButton(this.page, locator);
    }

    // ValidateCustomer(MyCust:classMyCustProfile, DataCust:classMyCustProfile) {
    async ValidateCustomer(DataCust:classMyCustProfile) {
        //validateCustomer(this.page, MyCust, DataCust);
        await expect(DataCust.email).toContain(this.email);
        await expect(DataCust.receiveEmailPromote).toBe(this.receiveEmailPromote);
        await expect(DataCust.receiveSmsPromote).toBe(this.receiveSmsPromote);
        await expect(DataCust.sex).toContain(this.sex);
        await expect(DataCust.telno).toContain(this.telno);
        await expect(DataCust.subscriptionPromote).toEqual(this.subscriptionPromote);
    }
    
    // CheckProfileDetail(
    //     custProfile: classMyCustProfile,
    //     custElement: classCustElement) {

    //     CheckMyCusProfileDetail(custProfile, custElement)

    // }
    
}//class classMyCustProfile

export class classMyCustAddress {
    custaddrHName: string;
    custaddrDetail: string;
    custaddrTelno: string;
    custaddrIsDefault: boolean;
    page: Page;

    constructor(
        custaddrHName: string,
        custaddrDetail: string,
        custaddrTelno: string,
        custaddrIsDefault: boolean,
        page: Page,
    ) {
        this.custaddrHName = custaddrHName
        this.custaddrDetail = custaddrDetail
        this.custaddrTelno = custaddrTelno
        this.custaddrIsDefault = custaddrIsDefault
        this.page = page
    }

    async ValidateCustAddr(DataCust:classMyCustAddress) {
        await expect(DataCust.custaddrHName).toContain(this.custaddrHName);
        await expect(DataCust.custaddrDetail).toContain(this.custaddrDetail);
        await expect(DataCust.custaddrTelno).toContain(this.custaddrTelno);
        await expect(DataCust.custaddrIsDefault).toBe(this.custaddrIsDefault);
    }
}// class classMyCustAddress

// export const objMyCustProfDetail = new classMyCustProfile(
//     'Female',
//     'qa.test02@gmail.com',
//     '-',
//     'Test1234!',
//     true,
//     true,
//     fals,
//     Page,
// )

// --- This's for test new customer on integration test ENV.
// export const objMyCust02ProfDetail = new classMyCustProfile(
//     'Male',
//     'qa.cust007@gmail.com',
//     '-',
//     'Test007!',
//     true,
//     true,
//     false,
// )

export class classCustElement {
    sexId: string
    emailId: string
    telnoId: string
    passwordId: string
    subscriptionPromoteId: string
    receiveEmailPromoteId: string
    receiveSmsPromoteId: string

    constructor(
        sexId: string,
        emailId: string,
        telnoId: string,
        passwordId: string,
        subscriptionPromoteId: string,
        receiveEmailPromoteId: string,
        receiveSmsPromoteId: string,
    ) {
        this.sexId = sexId
        this.emailId = emailId
        this.telnoId = telnoId
        this.passwordId = passwordId
        this.subscriptionPromoteId = subscriptionPromoteId
        this.receiveEmailPromoteId = receiveEmailPromoteId
        this.receiveSmsPromoteId = receiveSmsPromoteId
    }
}
export const objCustElement = new classCustElement(
    'css-c7idpd-Select-selectItemLabelText',
    'profile-page-contact-info-email-text',
    'profile-page-contact-info-phone-number-text',
    'profile-page-your-password-change-password-input',
    'profile-page-subscription-promotion-marketing-consent-switch',
    'profile-page-subscription-promotion-receive-promotion-via-email-checkbox',
    'profile-page-subscription-promotion-receive-promotion-via-sms-checkbox',
)

// export class classMemberProfile extends classMyCustProfile {
//     firstName: string;
//     lastName: string;
//     birthDay: string;

//     constructor(
//         firstName: string,
//         lastName: string,
//         birthDay: string,
//     ) {
//         super(
//             'Male',
//             'qa.member02@gmail.com',
//             '(+66)87 597 6277',
//             'Tmem1234!',
//             true,
//             true,
//             true,
//         )
//         this.firstName = firstName
//         this.lastName = lastName
//         this.birthDay = birthDay
//     }

    // CheckMemProfile(
    //     memProfile: classMemberProfile,
    //     memProfileElement: classMemberProfileElement
    // ) {
    //     //CheckMyMemProfileDetail(memProfile.receiveEmailPromote, memProfile.receiveSmsPromote, memProfile, memProfileElement)
    //     CheckMyMemProfileDetail(memProfile, memProfileElement)
    // }
//}

export class classMemberProfileElement extends classCustElement {
    firstNameId: string;
    lastNameId: string;
    birthDayId: string;

    constructor(
        firstNameId: string,
        lastNameId: string,
        birthDayId: string,
    ) {
        super(
            'css-c7idpd-Select-selectItemLabelText',
            'profile-page-contact-info-email-text',
            'profile-page-contact-info-phone-number-text',
            'profile-page-your-password-change-password-input',
            'profile-page-subscription-promotion-marketing-consent-switch',
            'profile-page-subscription-promotion-receive-promotion-via-email-checkbox',
            'profile-page-subscription-promotion-receive-promotion-via-sms-checkbox',
        )
        this.firstNameId = firstNameId
        this.lastNameId = lastNameId
        this.birthDayId = birthDayId
    }

}
export const objMemberProfileElement = new classMemberProfileElement(
    'profile-page-personal-info-first-name-text',
    'profile-page-personal-info-last-name-text',
    'profile-page-personal-info-date-of-birth-text',
)

