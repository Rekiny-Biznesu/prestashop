import { Builder, By, WebDriver } from "selenium-webdriver";
const chrome = require("selenium-webdriver/chrome");
import * as fs from "fs";
import { waitForElement, scrollToElement, viewport, Event } from "./common";

const HEADLESS = true;
const ALL_EVENTS = false;
const EXPORT_FILE_NAME = "events.json";

const categories = [
    //"Koncerty",
    //"Teatr",
    //"Filharmonia",
    //"Opera i balet",
    //"Kabaret",
    //"Dla dzieci",
    //"Online",
    //"Karnety",
    "Inne"
];

scrapBilety24()

async function scrapBilety24() {
    const scrappedEventsByCategory: { [id: string]: Event[] } = {}

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(HEADLESS
            ? new chrome.Options().windowSize(viewport).headless()
            : new chrome.Options().windowSize(viewport)
        )
        .build()
    await driver.get("https://www.bilety24.pl/");

    for (const category of categories) {
        scrappedEventsByCategory[category] = [];

        // enter category
        await (await waitForElement(By.xpath(`//a[text()="${category.toLowerCase()}"]`), driver, 5_000)).click();

        if(ALL_EVENTS) await showAllEvents(category, driver);

        const events = await driver.findElements(
            By.xpath(`//h1[text()="${category}"]/..//a[text()="kup bilet"]/../a[@class="full-info"]`)
        );
        for (let i = 0; i < events.length; i++){
            const link = await events[i].getAttribute("href");
            await driver.executeScript(`window.open("${link}", "_blank");`);
            const windows = await driver.getAllWindowHandles();
            await driver.switchTo().window(windows[1]);
            try {
                scrappedEventsByCategory[category].push(await scrappedEvent(driver));
            }
            catch (e: any) {console.log("## ERROR ## - ", e.message)}
            await driver.close();
            await driver.switchTo().window(windows[0]);
            console.log(`Processed ${i+1} out of ${events.length} events...`);
        }
    }

    await driver.close();
    fs.writeFile(`../exports/json/${EXPORT_FILE_NAME}`, JSON.stringify(scrappedEventsByCategory), (err) => {if (err) throw err});
}

async function scrappedEvent(driver: WebDriver) {
    const event: Event = {
        title:          await driver.findElement(By.xpath('//section[@class="box-content repertoire-view"]//h2')).getText(),
        description:    await driver.findElement(By.className('description')).getText(),
        organizer:      await driver.findElement(By.xpath('//div[@class="dealer hide-xs"]/a')).getText(),
        imageURL:       await (await driver.findElement(By.xpath('//section[@class="box-content repertoire-view"]//img'))).getAttribute("src"),
        variants:       await Promise.all((await driver.findElements(By.xpath('//div[@class="hide-xs-or-smaller"]//a[text()="bilety"]/../..')))
            .map(async variant => ({
                    address:    await variant.findElement(By.className('city')).getText(),
                    time:       await variant.findElement(By.className('date')).getText(),
                    location:   await variant.findElement(By.className('place')).getText(),
                    price:      (await variant.findElement(By.className('price')).getText())
                        .split(' ')[1]
                }
            )))
    }
    return event;
}

async function showAllEvents(category: string, driver: WebDriver) {
    while (true) {
        let showMoreButton;
        try {
            showMoreButton = await waitForElement(
                By.xpath(`//h1[text()="${category}"]/..//a[text()="więcej"]`),
                driver,
                5_000
            );
        }
        catch (ex) { break; } // timeout - all events are shown

        await scrollToElement(showMoreButton, driver);
        await showMoreButton.click();
    }
}
