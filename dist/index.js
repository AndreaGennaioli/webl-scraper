"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scraper = exports.Selector = void 0;
const jsdom_1 = require("jsdom");
const axios_1 = __importDefault(require("axios"));
/** Class representing a new selector */
class Selector {
    /**
     * Create a new selector
     * @param {string} selector - The CSS selector
     * @param {string} attr - The attribute whose value you want
     */
    constructor(selector, attr) {
        this.selector = "";
        this.attr = "";
        this.selector = selector;
        this.attr = attr;
    }
}
exports.Selector = Selector;
/** Class representing a new scraper */
class Scraper {
    /**
     * Create a new web scraper
     * @param {string} url - The URL of the page to scrape
     * @param {Selector[]} selectors - Array of selectors
     */
    constructor(url, selectors) {
        this.url = "";
        this.selectors = [];
        this.url = url;
        this.selectors = selectors;
    }
    /**
     * Starts the scraping. Returns an array of scraped selectors
     * @returns {Promise<SelectorScraped[]>}
     */
    scrape() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                /* Let's put all inside a try/catch block 😎 */
                try {
                    /* Getting the HTML code of the page */
                    const res = yield axios_1.default.get(this.url);
                    const html = res.data;
                    /* Creating a DOM */
                    const dom = new jsdom_1.JSDOM(html);
                    const scrapedSelectors = [];
                    /* Loop each selector */
                    for (const selector of this.selectors) {
                        /* Selecting elements from the DOM */
                        const els = dom.window.document.querySelectorAll(selector.selector);
                        /* Creating the Scraped object */
                        const scraped = {
                            selector: selector.selector,
                            attr: selector.attr,
                            values: [],
                        };
                        if (selector.attr.startsWith("__")) {
                            for (const el of els) {
                                scraped.values.push(el[selector.attr.slice(2)]);
                            }
                        }
                        else {
                            for (const el of els) {
                                scraped.values.push(el.getAttribute(selector.attr));
                            }
                        }
                        scrapedSelectors.push(scraped);
                    }
                    resolve(scrapedSelectors);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.Scraper = Scraper;
//# sourceMappingURL=index.js.map