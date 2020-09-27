const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
require('dotenv').config();


const header = `<span style="font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important; width: 100%; padding: 0 75px;">
  <span style="color: #96a4b9 !important;display: flex;border-bottom: 1px solid #eee; font-size: 10px; padding: 20px 0 10px;">
    <span style="width: 50%;">${process.env.BOOK_NAME}</span>
    <span class="pageNumber" style="width: 50%; text-align: right;">Right</span>
  </span>
</span>`;
const footer = '<div></div>';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Headless is required for PDF generation
    });

    const page = await browser.newPage();
  
    // Set your HTML as the pages content
    const html = fs.readFileSync(path.resolve(__dirname, '../output/book.html'), 'utf8')
    await page.setContent(html, {
      waitUntil: 'domcontentloaded'
    });
    
    // Add styles
    await page.addStyleTag({path: path.resolve(__dirname, '../styles/normalize.css')});
    await page.addStyleTag({path: path.resolve(__dirname, '../styles/highlight.css')});
    await page.addStyleTag({path: path.resolve(__dirname, '../styles/styles.css')});

    // Give time to load images, etc
    await page.waitForTimeout(3000);
  
    // Generate PDF file
    await page.pdf({
      format: 'Letter',
      path: path.resolve(__dirname, '../output/book.pdf'),
      margin: {
        top: '100px',
        bottom: '100px',
        left: '100px',
        right: '100px',
      },
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
      preferCSSPageSize: true,
      printBackground: true,
    });
  
    // Close the browser
    await browser.close();
    console.log('Done! PDF successfully generated in output/book.pdf');
  } catch (err) {
    console.error(`An error has occured: ${err.message}`);
    process.exit(-1);
  }
})()