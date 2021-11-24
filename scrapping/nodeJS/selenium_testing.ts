import { Builder, By, Key, WebDriver } from 'selenium-webdriver';
import { scrollToElement, waitForElement } from './common';

let driver: WebDriver;

(async function test() {
    driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get("https://192.168.123.14/prestashop/prestashop/");
    }
    catch(ex) {
        await driver.findElement(By.id("advancedButton")).click();
        const acceptButton = await driver.findElement(By.id("exceptionDialogButton"));
        await scrollToElement(acceptButton, driver)
        await acceptButton.click();
    }

    try {
        await addToCartFromCategory();
        await goToCart();
        await deleteItemFromCart();
        await createAccount();
        await placeOrder();
        await chooseShippingMethod();
        await choosePaymentMethod();
        await checkOrderStatus();
    }
    finally{
        await driver.quit();
    }
})();

async function addToCartFromCategory() {
    await goToCategory("category-19");
    const category1_list = await driver.findElements(By.className("product-thumbnail"));

    const category1 = [
        [category1_list[0], 3],
        [category1_list[1], 1],
        [category1_list[2], 2],
        [category1_list[3], 2],
        [category1_list[4], 1]
    ];

    for(let i = 0; i < 5; i++) {
        //@ts-ignore
        await driver.executeScript(`window.open("${await category1[i][0].getAttribute("href")}", "_blank");`);
        const windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[1]);

        await addToCart(category1[i][1]);

        await driver.close();
        await driver.switchTo().window(windows[0]);
    }

    await goToCategory("category-20");
    const category2_list = await driver.findElements(By.className("product-thumbnail"));

    const category2 = [
        [category2_list[0], 1],
        [category2_list[1], 1],
        [category2_list[2], 3],
        [category2_list[3], 2],
        [category2_list[4], 3]
    ];

    for(let i = 0; i < 5; i++) {
        //@ts-ignore
        await driver.executeScript(`window.open("${await category2[i][0].getAttribute("href")}", "_blank");`);
        const windows = await driver.getAllWindowHandles();
        await driver.switchTo().window(windows[1]);

        await addToCart(category2[i][1]);

        await driver.close();
        await driver.switchTo().window(windows[0]);
    }
}

async function addToCart(amount) {
    await driver.sleep(500);
    await driver.findElement(By.id("quantity_wanted")).sendKeys(Key.DELETE + amount);
    await driver.findElement(By.className("add-to-cart")).click();
    await driver.sleep(1000);
}

async function goToCategory(category: string) {
    await driver.findElement(By.xpath(`//li[@id="${category}"]/a`)).click();
}

async function deleteItemFromCart() {
    await driver.sleep(3000);
    await driver.findElement(By.className("remove-from-cart")).click();
    await driver.sleep(3000);
}

async function goToCart() {
    await driver.findElement(By.className("shopping-cart")).click();
}

async function createAccount() {
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    await driver.findElement(By.className("btn-primary")).click();
    await driver.findElement(By.css("input[name=\"firstname\"]")).sendKeys("Jan");
    await driver.findElement(By.css("input[name=\"lastname\"]")).sendKeys("Kowalski");
    await driver.findElement(By.css("input[name=\"email\"]")).sendKeys("jan_kowalski" + uniqueId + "@example.com");
    await driver.findElement(By.css("input[name=\"password\"]")).sendKeys("%3xtr4_5tr0ng_p455w0rd_00^1");
    await driver.findElement(By.css("input[name=\"birthday\"]")).sendKeys("1976-04-12");
    await driver.findElement(By.css("input[name=\"customer_privacy\"]")).click();
    await driver.findElement(By.css("input[name=\"psgdpr\"]")).click();
    await driver.findElement(By.css("button[name=\"continue\"]")).click();
}

async function placeOrder() {
    await driver.findElement(By.css("input[name=\"address1\"]")).sendKeys("ulica 99");
    await driver.findElement(By.css("input[name=\"postcode\"]")).sendKeys("12-345");
    await driver.findElement(By.css("input[name=\"city\"]")).sendKeys("Nowe Miasto");
    await driver.findElement(By.css("button[name=\"confirm-addresses\"]")).click();
}

async function chooseShippingMethod() {
    await driver.findElement(By.id("delivery_option_7")).click();
    await driver.sleep(1000);
    await driver.findElement(By.css("button[name=\"confirmDeliveryOption\"]")).click();
}

async function choosePaymentMethod() {
    await driver.findElement(By.xpath(`//*[@id="payment-option-1"]/..`)).click();
    await driver.findElement(By.css("input[name=\"conditions_to_approve[terms-and-conditions]\"]")).click();
    await driver.findElement(By.xpath('//*[@id="payment-confirmation"]/div/button')).click();
}

async function checkOrderStatus() {
    await waitForElement(By.id("order-reference-value"), driver);
    await driver.findElement(By.className("account")).click();
    await driver.findElement(By.id("history-link")).click();
    await driver.findElement(By.css("a[data-link-action=\"view-order-details\"]")).click();
    await driver.sleep(3000);
}