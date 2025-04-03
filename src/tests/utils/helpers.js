const { Key } = require('webdriverio');

async function clearInput(element) {
  await element.click();
  await browser.keys([Key.Control, 'a']);
  await browser.keys([Key.Backspace]);
}

async function addSpace(element) {
  await element.click();
  await browser.keys([Key.Space]);
}

module.exports = { clearInput, addSpace };
