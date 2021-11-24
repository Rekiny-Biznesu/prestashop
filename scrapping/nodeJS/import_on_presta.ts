import { Builder, By, WebDriver } from "selenium-webdriver";
const firefox = require("selenium-webdriver/firefox");
import { waitForElement, scrollToElement, viewport } from "./common";

const IMPORT_FILE_NAME = "events.csv"; //has to be in "prestashop/<backoffice>/import/" folder
const BACKOFFICE_URL = "https://192.168.123.14/prestashop/prestashop/admin057uc2t3k";
const ADMIN_CREDENTIALS = {
    mail: "rb@example.com",
    pass: "1w3r56U8O0"
};

importOnPresta()

async function importOnPresta() {
    const driver = await new Builder()
        .forBrowser("firefox")
        .build();
    try {
       await driver.get(BACKOFFICE_URL);
    }
    catch(ex) {
        await driver.findElement(By.id("advancedButton")).click();
        const acceptButton = await driver.findElement(By.id("exceptionDialogButton"));
        await scrollToElement(acceptButton, driver)
        await acceptButton.click();
    }


    await login(driver);
    await navigateToProductImport(driver);
    await selectFileToImportAndProceed(driver);
    await executeImport(driver);
    await driver.close();
    return;
}

async function login(driver: WebDriver) {
    const mailField = await driver.findElement(By.id("email"));
    const passField = await driver.findElement(By.id("passwd"));
    await mailField.sendKeys(ADMIN_CREDENTIALS.mail);
    await passField.sendKeys(ADMIN_CREDENTIALS.pass);
    await driver.findElement(By.id("submit_login")).click();
}

async function navigateToProductImport(driver: WebDriver) {
    await (await waitForElement(By.id("subtab-AdminAdvancedParameters"), driver)).click();
    const importButton = await driver.findElement(By.id("subtab-AdminImport"));
    await scrollToElement(importButton, driver);
    await importButton.click();
}

async function selectFileToImportAndProceed(driver: WebDriver) {
    await driver.findElement(By.id("entity")).click();
    await driver.findElement(By.xpath('//select[@id="entity"]/option[@value="1"]')).click();
    await driver.findElement(By.xpath('//button[@class="btn btn-outline-primary btn-sm js-from-files-history-btn"]')).click();
    await driver.findElement(By.xpath(`//td[text()="${IMPORT_FILE_NAME}"]/..//button[@class="btn btn-sm btn-outline-secondary js-use-file-btn"]`)).click();
    const proceedButton = await driver.findElement(By.xpath('//button[@name="submitImportFile"]'));
    await proceedButton.click();
}

async function executeImport(driver: WebDriver) {
    await driver.findElement(By.id("import")).click();
    console.log("Validating csv values...");
    const continueButton = await waitForElement(By.id("import_continue_button"), driver);
    console.log("Importing...");
    await waitForElement(By.id("import_details_finished"), driver);
    console.log("Import complete.")
}
