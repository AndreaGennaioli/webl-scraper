# webl-scraper
A fast and easy-to-use package for manipulating online page content.
## Install
Install our package using `npm`:
```console
npm install webl-scraper
```
## How To Use
Code example:
```js
/* Import */
const { Selector, Scraper } = require("webl-scraper");

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
```
Output:
```js
[
  {
    selector: 'a',
    attr: 'href',
    values: [
      '/wiki/Latium',
      '/wiki/Tiber',
      '/wiki/Vatican_City',
      ...
    ]
  },
  {
    selector: 'h2 > span.mw-headline',
    attr: '__innerHTML',
    values: [
      'Etymology',
      'History',
      'Government',
      ...
    ]
  },
  {
    selector: 'h3 > span.mw-headline',
    attr: '__innerHTML',
    values: [
      'Earliest history',
      'Monarchy and republic',
      'Empire',
      ...
    ]
  }
]
```
