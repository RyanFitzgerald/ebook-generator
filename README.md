# Ebook Generator

Ebook generator is a build pipeline made with Node.js that takes in a series of Markdown files and generates one final PDF output. In order to make it all work, it uses a combination of `showdownjs` (convert MD to HTML), `puppeteer` (HTML to PDF), and `highlight.js` (code highlighting).

The build pipeline consists of 3 steps:

1. Combining all Markdown files found in `/content` into one `output/book.md` (handled in `scripts/combine.js`)
2. Converting the combined Markdown file to HTML in `output/book.html` (handled in `scripts/convert-to-html.js`)
3. Converting the generated HTML file into a final PDF in `output/book.pdf` (handled in `scripts/generate-pdf.js`)

## Available Scripts

- `combine`: combines all Markdown files into a single file
- `convert`: converts the combined Markdown file into a HTML output
- `generate`: takes the generated HTML output and generates a PDF
- `build`: runs the above commands in the correct order

## Demo

You can download the example output PDF by [clicking here](https://github.com/RyanFitzgerald/ebook-generator/raw/master/output/book.pdf).

## Getting Started

Example outputs can be found in the `/output` directory. More specifically, `output/book.pdf` represents the final generated PDF.

In order to get started, clone the repo and install dependencies by running `npm install`.

Next, add your content (in the form of .md files) in the `/content` directory. The order of files in this directory represents the order in which the files get merged together, so it may require you to prefix them with numbers to force an order.

Finally, once you have your content (or if you just want to test), run a `npm run build` to generate the PDF. This process should take a couple of seconds.

## Configuration

The project's `.env` file contains overall configuration, which is currently just your book's name.

If you wish to configure settings related to the combining of Markdown files, check out the file in `scripts/combine.js`. Examples of configuration may be adding additional content between each file merge such as the page breaks currently included.

Markdown to HTML conversion is done via the `showdownjs` library and can be found in `scripts/convert-to-html.js`. If you wish to alter configuration for the conversion, that can be found in this file.

Finally, HTML to PDF conversion is done via `puppeteer` and can be found in `scripts/generate-pdf.js`. If you want to configure the puppeteer settings, it can be found in this file (such as Page Headers and Footers, hiding backgrounds, etc).

## Styles

Since the PDF generation works by first converting to HTML and then to PDF, you can customize the styles of the PDF (to a degree). The current styles can be found in the `/styles` directory. The styles that currently exist are `normalize.css` (to normalize styles), `highlight.css` (styles for the code blocks), and finally `styles.css` (the general styles). Fonts are also added locally to fix render and text selection problems in preview and browsers after generation.

It's also important to note that the Page Header and Footer styles are added inline within `scripts/generate-pdf.js` as they are added on generation by puppeteer and don't technically exist in the HTML when being generated.

## License 

The scripts are all licensed under MIT. Use them however you want!

Inter Font is licensed under SIL OPEN FONT LICENSE. See `OFL.txt` for more.