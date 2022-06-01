import { JSDOM } from "jsdom";
import axios from "axios";

/** Interface representing a selector that has been scraped */
interface SelectorScraped {
	selector: string;
	attr: string;
	values: string[];
}

/** Class representing a new selector */
class Selector {
	selector: string = "";
	attr: string = "";
	/**
	 * Create a new selector
	 * @param {string} selector - The CSS selector
	 * @param {string} attr - The attribute whose value you want
	 */
	constructor(selector: string, attr: string) {
		this.selector = selector;
		this.attr = attr;
	}
}

/** Class representing a new scraper */
class Scraper {
	url: string = "";
	selectors: Selector[] = [];
	/**
	 * Create a new web scraper
	 * @param {string} url - The URL of the page to scrape
	 * @param {Selector[]} selectors - Array of selectors
	 */
	constructor(url: string, selectors: Selector[]) {
		this.url = url;
		this.selectors = selectors;
	}

	/**
	 * Starts the scraping. Returns an array of scraped selectors
	 * @returns {Promise<SelectorScraped[]>}
	 */
	async scrape(): Promise<SelectorScraped[]> {
		return new Promise<SelectorScraped[]>(async (resolve, reject) => {
			/* Let's put all inside a try/catch block 😎 */
			try {
				/* Getting the HTML code of the page */
				const res = await axios.get(this.url);
				const html = res.data;

				/* Creating a DOM */
				const dom = new JSDOM(html);

				const scrapedSelectors: SelectorScraped[] = [];

				/* Loop each selector */
				for (const selector of this.selectors) {
					/* Selecting elements from the DOM */
					const els = dom.window.document.querySelectorAll(selector.selector);
					/* Creating the Scraped object */
					const scraped: SelectorScraped = {
						selector: selector.selector,
						attr: selector.attr,
						values: [],
					};
					if (selector.attr.startsWith("__")) {
						for (const el of els) {
							scraped.values.push(el[selector.attr.slice(2)]);
						}
					} else {
						for (const el of els) {
							scraped.values.push(el.getAttribute(selector.attr));
						}
					}
					scrapedSelectors.push(scraped);
				}

				resolve(scrapedSelectors);
			} catch (e) {
				reject(e);
			}
		});
	}
}

export { Selector, Scraper };
