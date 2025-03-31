const { Key } = require('webdriverio');

async function clearInput(element) {
  await element.click();
  await browser.keys([Key.Control, 'a']);
  await browser.keys([Key.Backspace]);
}

module.exports = { clearInput };
