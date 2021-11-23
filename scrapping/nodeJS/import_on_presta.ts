import { Builder, By, WebDriver } from "selenium-webdriver";
const chrome = require("selenium-webdriver/chrome");
import { waitForElement, scrollToElement, viewport } from "./common";

const HEADLESS = false;

const IMPORT_FILE_NAME = "products.csv"; //has to be in "prestashop/<backoffice>/import/" folder
const BACKOFFICE_URL = "https://192.168.123.14/prestashop/prestashop/admin057uc2t3k";
const ADMIN_CREDENTIALS = {
    mail: "rb@example.com",
    pass: "1w3r56U8O0"
};

importOnPresta()

async function importOnPresta() {
    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(HEADLESS
            ? new chrome.Options().windowSize(viewport).headless()
            : new chrome.Options().windowSize(viewport)
        )
        .build()
    await driver.get(BACKOFFICE_URL);

    await login(driver);
    await navigateToProductImport(driver);
    await selectFileToImportAndProceed(driver);
    await executeImport(driver);
    await driver.close();
}

async function login(driver: WebDriver) {
    const mailField = await driver.findElement(By.id("email"));
    const passField = await driver.findElement(By.id("passwd"));
    await mailField.sendKeys(ADMIN_CREDENTIALS.mail);
    await passField.sendKeys(ADMIN_CREDENTIALS.pass);
    await driver.findElement(By.id("submit_login")).click();
}

async function navigateToProductImport(driver: WebDriver) {
    await driver.findElement(By.id("subtab-AdminAdvancedParameters")).click();
    await driver.findElement(By.id("subtab-AdminImport")).click();
}

async function selectFileToImportAndProceed(driver: WebDriver) {
    await driver.findElement(By.id("entity")).click();
    await driver.findElement(By.xpath('//select[@id="entity"]/option[@value="1"]')).click();
    await driver.findElement(By.xpath('//button[@class="btn btn-outline-primary btn-sm js-from-files-history-btn"]')).click();
    await driver.findElement(By.xpath(`//td[text()="${IMPORT_FILE_NAME}"]/..//button[@class="btn btn-sm btn-outline-secondary js-use-file-btn"]`)).click();
    const proceedButton = await driver.findElement(By.xpath('//button[@name="submitImportFile"]'));
    await scrollToElement(proceedButton, driver);
    await proceedButton.click();
}

async function executeImport(driver: WebDriver) {
    await driver.findElement(By.id("import")).click();
    console.log("Validating csv values...");
    await (await waitForElement(By.id("import_continue_button"), driver)).click();
    console.log("Importing...");
    setInterval(async () => {
        console.log(await driver.findElement(By.id("import_progression_details")).getText());
    }, 5_000);
    await (await waitForElement(By.id("import_close_button"), driver)).click();
    console.log("Import complete.")
}