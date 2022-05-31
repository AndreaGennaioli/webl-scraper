import { JSDOM } from "jsdom";
import axios from "axios";

interface ISelectorScraped {
	selector: string;
	attr: string;
	values: string[];
}

class Selector {
	selector: string = "";
	attr: string = "";
	constructor(selector: string, attr: string) {
		this.selector = selector;
		if (attr) this.attr = attr;
	}
}

class Scraper {
	url: string = "";
	selectors: Selector[] = [];
	constructor(url: string, selectors: Selector[]) {
		this.url = url;
		this.selectors = selectors;
	}

	async scrape(): Promise<ISelectorScraped[]> {
		return new Promise<ISelectorScraped[]>(async (resolve, reject) => {
			const res = await axios.get(this.url);
			const html = res.data;

			const dom = new JSDOM(html);

			const scrapedSelectors: ISelectorScraped[] = [];

			for (const selector of this.selectors) {
				const els = dom.window.document.querySelectorAll(selector.selector);
				const scraped: ISelectorScraped = {
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
		});
	}
}

export { Selector, Scraper };
