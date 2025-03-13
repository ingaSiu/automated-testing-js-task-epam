class BasePage {
  async open(path = '') {
    await browser.url(`https://www.saucedemo.com/${path}`);
  }
}

module.exports = BasePage;
