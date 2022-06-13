import { test, expect } from '@playwright/test'
import { LoginPage } from "../../page-objects/LoginPage"
import { HomePage } from "../../page-objects/HomePage"

test.describe.parallel("Login / Logout Flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test("Negative Scenario for login", async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login("invalid username", "invalid password")
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })

    test("Positive Scenario for login + logout", async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")

        const accountSumaryTab = await page.locator("#account_summary_tab")
        await expect(accountSumaryTab).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})