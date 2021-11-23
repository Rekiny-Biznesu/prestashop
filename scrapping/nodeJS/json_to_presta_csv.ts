import * as fs from "fs";
const Downloader = require("nodejs-file-downloader");
import { Event } from "./common";

const AMOUNT_TO_SKIP_FROM_EACH_CATEGORY = 0;
const MAX_EVENTS_FROM_CATEGORY = 100;
const JSON_FILE_NAME = "events.json";
const PRESTA_CSV_FILE_NAME = "events.csv";

const DOWNLOAD_IMAGES = false;
function imagePath(id: number) {
    return `/img/products/${id}.jpg`;
}

const INVALID_CHARS = /\/|\\|\$|&|%|<|>|\*|\#|\'|\"|\`|\~|\(|\)|\[|\]|\{|\}|\||\=|„|”/g;
const MAX_NAME_LENGTH = 128;
const MAX_DESCRIPTION_LENGTH = 21844;
const MAX_SUMMARY_LENGTH = 800;
const MAX_MANUFACTURER_LENGTH = 64;

jsonToPrestaCsv()

async function jsonToPrestaCsv() {

    fs.readFile(`../exports/json/${JSON_FILE_NAME}`, (async (err, data) => {
        let eventsByCategory: { [id: string]: Event[] };
        if (err) throw err;
        eventsByCategory = JSON.parse(data.toString());
        await exportToCsvAndDownloadImages(eventsByCategory);
    }));

}

async function exportToCsvAndDownloadImages(eventsByCategory: { [id: string]: Event[] }) {
    let csv = PRESTASHOP_PRODUCTS_HEADER + "\n";

    for (const [category, events] of Object.entries(eventsByCategory)) {
        for (let i = AMOUNT_TO_SKIP_FROM_EACH_CATEGORY;
             i < Math.min(events.length, MAX_EVENTS_FROM_CATEGORY + AMOUNT_TO_SKIP_FROM_EACH_CATEGORY);
             i++
        ) {
            const event = events[i];
            const id = i + 1;
            try{
                const prestashopProduct = prestashopProductFromEvent(event, category, id);
                const productCsv = Object.values(prestashopProduct)
                    .reduce((field1, field2) => `${field1};${field2}`);
                csv += productCsv + "\n";

                if(DOWNLOAD_IMAGES) {
                    await new Downloader({
                        url: event.imageURL,
                        directory: "exports",
                        fileName: imagePath(id)
                    }).download();
                }
            }
            catch (e: any) {console.log("## ERROR ## - ", e.message)}
        }
    }

    fs.writeFile(`../exports/presta-csv/${PRESTA_CSV_FILE_NAME}`, csv, (err => {
        if (err) throw err
    }));
}

function prestashopProductFromEvent(event: Event, category: string, id: number) {
    return { // DO NOT CHANGE THE ORDER OF KEYS
        id: id,
        active: 1,
        name: event.title.replaceAll(INVALID_CHARS, "").replaceAll(INVALID_CHARS, "") .slice(0, MAX_NAME_LENGTH),
        categories: category,
        priceTaxExcluded: event.variants[0].price.replace(",", "."), // netto
        taxRulesID: 5,
        wholesalePrice: Number.parseFloat(event.variants[0].price.replace(",", ".")) * 0.5, // brutto
        onSale: 0,
        discountAmount: null,
        discountPercent: null,
        discountFrom: null,
        discountTo: null,
        referenceHash: `event-${id}`,
        supplierReferenceHash:  null,
        supplier: null,
        manufacturer: event.organizer.replaceAll(INVALID_CHARS, "").slice(0, MAX_MANUFACTURER_LENGTH),
        ean13Code: id.toString().padStart(13, "0"),
        upcCode: id.toString().padStart(11, "0"),
        mpn: null,
        ecoTax: null,
        width: category === "Online" ? 0 : 0.3,
        height: category === "Online" ? 0 : 0.1,
        depth: category === "Online" ? 0 : 0.005,
        weight: category === "Online" ? 0 : 0.03,
        deliveryTimeIfInStock: null,
        deliveryTimeIfOutOFStock: null,
        quantity: 100,
        minimalQuantity: 0,
        lowStockLevel: 0,
        sendMailIfStockLow: 0,
        visibility: "both", // none | search | catalog | both
        additionalShippingCost: 0,
        unity: null,
        unitPrice: null,
        summary: ('"' + (`<b>Organizator:</b> ${event.organizer}<br/>`
            + `<b>Miasto</b>: ${event.variants[0].address}<br/>`
            + `<b>Lokacja</b>: ${event.variants[0].location}<br/>`
            + `<b>Czas</b>: ${event.variants[0].time}`)
                .replaceAll('""', "") + '"')
                .slice(0, MAX_SUMMARY_LENGTH),
        description: `"${event.description.replaceAll('"', "")}"`
            .replaceAll("\n", "<br/>")
            .slice(0, MAX_DESCRIPTION_LENGTH),
        tags: category.toLowerCase().replaceAll(" ", "_"),
        metaTitle: event.title.replaceAll('"', ""),
        metaKeywords: null,
        metaDescription: null,
        urlRewrite: id,
        textWhenInStock: "Bilety dostępne",
        textWhenBackorderAllowed: "Bilety niedostępne",
        availableForOrder: 1,
        productAvailableDate: "2022-01-01",
        productCreationDate: "2021-11-01",
        showPrice: 1,
        imageUrls: event.imageURL,
        imageAltTexts: event.title.replaceAll(INVALID_CHARS, ""),
        deleteExistingImages: 1,
        feature: null,
        availableOnlineOnly: category === "Online" ? 1 : 0,
        condition: "new", // new | used | refurbished
        customizable: 0,
        uploadableFiles: 1,
        textFields: 1,
        outOfStockAction: 0,
        virtualProduct: 0,
        fileUrl: null,
        numberOfAllowedDownloads: null,
        expirationDate: null,
        daysOfAvailability: null,
        multishopId: null,
        advancedStockManagement: 0,
        dependsOnStock: 0,
        warehouseId: null,
        accessories: null
    }
}

const PRESTASHOP_PRODUCTS_HEADER = "Product ID;Active (0/1);Name *;Categories (x,y,z...);Price tax excluded;"
    + "Tax rules ID;Wholesale price;On sale (0/1);Discount amount;Discount percent;Discount from (yyyy-mm-dd);"
    + "Discount to (yyyy-mm-dd);Reference #;Supplier reference #;Supplier;Manufacturer;EAN13;UPC;MPN;Ecotax;Width;Height;"
    + "Depth;Weight;Delivery time of in-stock products;Delivery time of out-of-stock products with allowed orders;"
    + "Quantity;Minimal quantity;Low stock level;Send me an email when the quantity is under this level;Visibility;"
    + "Additional shipping cost;Unity;Unit price;Summary;Description;Tags (x,y,z...);Meta title;Meta keywords;"
    + "Meta description;URL rewritten;Text when in stock;Text when backorder allowed;"
    + "Available for order (0 = No, 1 = Yes);Product available date;Product creation date;"
    + "Show price (0 = No, 1 = Yes);Image URLs (x,y,z...);Image alt texts (x,y,z...);"
    + "Delete existing images (0 = No, 1 = Yes);Feature(Name:Value:Position);Available online only (0 = No, 1 = Yes);"
    + "Condition;Customizable (0 = No, 1 = Yes);Uploadable files (0 = No, 1 = Yes);Text fields (0 = No, 1 = Yes);"
    + "Out of stock action;Virtual product;File URL;Number of allowed downloads;Expiration date;Number of days;"
    + "ID / Name of shop;Advanced stock management;Depends On Stock;Warehouse;Acessories  (x,y,z...)";
