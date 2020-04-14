const faker = require('faker');
const Blob = require('node-blob');
const fs = require('fs');
const htmlTagsForTextContent = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'div',
  'span',
  'p',
  'b',
  'strong'
];
const textGenerators = [
  'word',
  'words',
  'sentence',
  'sentences',
  'paragraph',
  'paragraphs',
  'text',
  'lines'
];

module.exports = function(config) {
  this.includeHeader = config.includeHeader || false;
  this.includeFooter = config.includeFooter || false;
  this.createFile = config.createFile || false;
  this.outputFilePath = config.filePath || 'fake-html.html';

  let html = createFakeHTML();
  printOutputFileSize(html);
  if (this.createFile) {
    return writeOutputToFile(html);
  }
  return html;
};

function createFakeHTML() {
  return `${this.includeHeader ? createHTMLHeader() : ''} ${createHTMLBody()} ${this.includeFooter ? createHTMLFooter() : ''}`;
}

function createHTMLHeader() {
  let headerContent =
  `<html>
    <head>
      <title>${faker.lorem.words()}</title>
    </head>
  </html>
  `;
  return headerContent;
}

function createHTMLBody() {
  let bodyContent = '<body>';
  for (let i = 0; i < 5000; i++) {
    let startTag = getRandomTag();
    bodyContent =
    `${bodyContent}${startTag}${getRandomContent()}${getEndTag(startTag)}`
  }
  bodyContent = `${bodyContent}</body>`;
  return bodyContent;
}

function createHTMLFooter() {
  return '</html>';
}

function getRandomTag() {
  return `<${htmlTagsForTextContent[faker.random.number({ min: 0, max: htmlTagsForTextContent.length - 1 })]}>`;
}

function getEndTag(tag) {
  return `</${tag.slice(1, tag.length)}`;
}

function getRandomContent() {
  let textGenerator = textGenerators[faker.random.number({ min: 0, max: textGenerators.length - 1 })];
  return faker.lorem[textGenerator]();
}

function printOutputFileSize(htmlContent) {
  const fileSizeInMB = (new Blob([htmlContent]).size / (1024 * 1024)).toFixed(2);
  console.log(`Created HTML content of size ${fileSizeInMB} MB`);
}

function writeOutputToFile(htmlContent) {
  fs.writeFile(this.outputFilePath, htmlContent, 'utf8', (err) => {
    if (err)
      return console.log(`Unable to write the output to the file due to ${err}`);
    console.log(`HTML output written successfully to ${this.outputFilePath}`);
  });
}