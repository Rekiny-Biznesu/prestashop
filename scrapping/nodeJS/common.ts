import { WebDriver, WebElement, Locator, error } from "selenium-webdriver";
import TimeoutError = error.TimeoutError;

export const viewport = {
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

export async function scrollToElement(element: WebElement, driver: WebDriver) {
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
}

export async function waitForElement(locator: Locator, driver: WebDriver, timeout = null) {
    const INTERVAL = 100;
    const maxAttempts = timeout !== null ? Math.ceil(timeout / INTERVAL) : null;
    let attemptNo = 0;
    while (attemptNo++ !== maxAttempts) {
        const found = await driver.findElements(locator);
        if (found.length > 0) return found[0];
        await driver.sleep(INTERVAL);
    }
    throw new TimeoutError("could not find element by passed locator");
}