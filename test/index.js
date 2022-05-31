const { Selector, Scraper } = require("../dist");

const scraper = new Scraper("https://www.codingperstudenti.tk/", [
	new Selector(
		"p.mt-2.text-black.text-4xl.font-semibold",
		"__innerHTML"
	),
	new Selector(
		"link",
		"href"
	),
	new Selector(
		"p.mt-2.text-black.text-4xl.font-semibold",
		"class"
	),
]);

scraper.scrape().then(r => {
	console.log(r)
})
