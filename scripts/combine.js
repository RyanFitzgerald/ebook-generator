const fs = require('fs');
const path = require('path');

(() => {
  try {
    let mergedContent = '';

    // Read the files in /content
    const files = fs.readdirSync(path.resolve(__dirname, '../content'));
    files.forEach((fileName, index) => {
      if (fileName.indexOf('.DS_Store') === -1) {
        const pageBreak = index + 1 === files.length ? '' : '<div style="page-break-after: always;"></div>';
        // Add page break after each new file
        mergedContent += fs.readFileSync(path.resolve(__dirname, '../content', fileName), 'utf-8') + pageBreak + '\n';
      }
    });
  
    // Write a new file in /output
    fs.writeFileSync(path.resolve(__dirname, '../output', 'book.md'), mergedContent);
    console.log('Done! All .md files in /content successfully merged to output/book.md');
    process.exit(0);
  } catch (err) {
    console.error(`An error has occured: ${err.message}`);
    process.exit(-1);
  }
})();
