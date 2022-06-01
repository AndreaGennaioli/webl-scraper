/* Import */
const { Selector, Scraper } = require("../dist");

/* Create the scraper */
const scraper = new Scraper("https://en.wikipedia.org/wiki/Rome",
  /* List of selectors */
  [
    /* This selector get all the 'a' tags and reads the href attribute value */
    new Selector(
      "a",
      "href"
    ),
    /* This selector gets the 'innerHTML' propriety of the selected elements */
    new Selector(
      "h2 > span.mw-headline",
      "__innerHTML" // Using HTML element properties
    ),
    new Selector(
      "h3 > span.mw-headline",
      "__innerHTML"
    ),
  ]
);

/* Start the scraper. Returns a Promise */
scraper.scrape().then(r => {
	console.log(r)
})