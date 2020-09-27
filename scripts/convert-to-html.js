const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const showdownHighlight = require("showdown-highlight");

(async () => {
  try {
    const content = fs.readFileSync(path.resolve(__dirname, '../output/book.md'), 'utf-8');
    const converter = new showdown.Converter({
      backslashEscapesHTMLTags: true,
      completeHTMLDocument: true,
      extensions: [showdownHighlight],
      ghCompatibleHeaderId: true,
      omitExtraWLInCodeBlocks: true,
      tables: true,
    });
  
    const html = converter.makeHtml(content);
    fs.writeFileSync(path.resolve(__dirname, '../output', 'book.html'), html);
    console.log('Done! Markdown successfully converted to HTML in output/book.html');
    process.exit(0);
  } catch (err) {
    console.error(`An error has occured: ${err.message}`);
    process.exit(-1);
  }
})();