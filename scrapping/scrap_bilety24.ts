import {Builder, By, error, Locator, WebDriver, WebElement} from "selenium-webdriver";
import TimeoutError = error.TimeoutError;
import {exportToCsvAndDownloadImages} from "./export_to_csv";
const chrome = require("selenium-webdriver/chrome");
import * as fs from "fs";

const HEADLESS = true;
const ALL_EVENTS = true;

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

const viewport = {
    width: 1920,
    height: 1080
}

export type Event = {
    title: string;
    description: string;
    organizer: string;
    imageURL: string;
    variants: {
        address: string;
        time: string;
        location: string;
        price: string;
    }[];
}

scrap()

async function scrap() {
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
        await (await waitForElement(By.xpath(`//a[text()="${category.toLowerCase()}"]`), driver)).click();


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
    fs.writeFile("exports/events.json", JSON.stringify(scrappedEventsByCategory), (err) => {if (err) throw err});
    //await exportToCsvAndDownloadImages(scrappedEventsByCategory);


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
                    driver
                );
            }
            catch (ex) { break; } // timeout - all events are shown

            await scrollToElement(showMoreButton, driver);
            await showMoreButton.click();
        }
    }

// util functions
    async function scrollToElement(element: WebElement, driver: WebDriver) {
        await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async function waitForElement(locator: Locator, driver: WebDriver, timeout = 5_000) {
        const INTERVAL = 100;
        const maxAttempts = Math.ceil(timeout / INTERVAL);
        let attemptNo = 0;
        while (attemptNo++ !== maxAttempts) {
            const found = await driver.findElements(locator);
            if (found.length > 0) return found[0];
            await driver.sleep(INTERVAL);
        }
        throw new TimeoutError("could not find element by passed locator");
    }
}