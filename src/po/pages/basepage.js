class BasePage {
  constructor(path = '') {
    this.path = path;
  }
  async open(path = '') {
    await browser.url(`/${this.path}`);
  }
}

module.exports = BasePage;
