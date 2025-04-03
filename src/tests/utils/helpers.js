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

async function pressEnter() {
  await browser.keys([Key.Enter]);
}

module.exports = { clearInput, addSpace, pressEnter };
