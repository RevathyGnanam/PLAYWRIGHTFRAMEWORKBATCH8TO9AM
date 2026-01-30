/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { RegistrationPage } from '../pages/RegistrationPage';
import { Homepage } from '../pages/HomePage';
import { RandomDataUtil } from '../utils/randamDataGenerator';

let config: TestConfig;
let registrationPage: RegistrationPage;
let homepage:Homepage;

test.beforeEach(async ({ page }) => {

config = new TestConfig();
await page.goto(config.appUrl); //navigate to the application url
registrationPage = new RegistrationPage(page);
homepage = new Homepage(page);

})

test.afterEach(async ({ page }) => {

    await page.waitForTimeout(3000);
    await page.close();

})


test('Account Registration @master @sanity @regression',async({page})=>{

 //Go to 'My Account' and click 'Register'
 await homepage.clickMyAccount();
 await homepage.clickRegister();

//Fill in registration details with random data
await registrationPage.setFirstName(RandomDataUtil.getFirstName());
 await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
     await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

      //Validate the confirmation message
          const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!')








})