const { Selector, Scraper } = require("../dist");

const scraper = new Scraper("https://en.wikipedia.org/wiki/Rome", [
	new Selector(
		"h2 > span.mw-headline",
		"__innerHTML" // Using HTML element's properties
	),
	new Selector(
		"h3 > span.mw-headline",
		"__innerHTML"
	),
	new Selector(
		"a",
		"href"
	),
]);

scraper.scrape().then(r => {
	console.log(r)
})
