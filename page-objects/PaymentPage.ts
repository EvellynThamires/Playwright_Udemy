import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectBox: Locator 
    readonly payeeDetailsButton: Locator 
    readonly payeeDetail: Locator 
    readonly accountSelectBox: Locator 
    readonly accAmountInput: Locator 
    readonly dateInput: Locator 
    readonly descriptionInput: Locator 
    readonly submitPaymentButton: Locator 
    readonly message: Locator 

    constructor(page: Page) {
        this.page = page
        this.payeeSelectBox = page.locator("#sp_payee")
        this.payeeDetailsButton = page.locator("#sp_get_payee_details")
        this.payeeDetail = page.locator("#sp_payee_details")
        this.accountSelectBox = page.locator("#sp_account")
        this.accAmountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.submitPaymentButton = page.locator("#pay_saved_payees")
        this.message = page.locator("#alert_content > span")
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption("apple")
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetail).toBeVisible()

        await this.accountSelectBox.selectOption("6")
        await this.accAmountInput.type("5000")
        await this.dateInput.type("2022-06-13")
        await this.descriptionInput.type("Some message")
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText("The payment was successfully submitted")
    }
}