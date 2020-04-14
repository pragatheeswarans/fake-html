const faker = require('faker');
const Blob = require('node-blob');
const htmlTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'div',
  'span',
  'p',
  'strong'
];
const textOptions = [
  'sentences',
  'paragraphs',
  'lines'
];

module.exports = function(obj) {
  let html = createFakeHTML();
  console.log(`Created HTML content of size ${new Blob([html]).size / (1024 * 1024)} MB`);
  return html;
};

function createFakeHTML(config) {
  return `${createHTMLHeader()} ${createHTMLBody()} ${createHTMLFooter()}`;
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
  return `<${htmlTags[faker.random.number({ min: 0, max: htmlTags.length - 1 })]}>`;
}

function getEndTag(tag) {
  return `</${tag.slice(1, tag.length)}`;
}

function getRandomContent() {
  let option = textOptions[faker.random.number({ min: 0, max: textOptions.length - 1 })];
  return faker.lorem[option]();
}