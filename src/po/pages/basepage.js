const Header = require('../components/common/header.component');
const Footer = require('../components/common/footer.component');

class BasePage {
  constructor(path = '') {
    this.path = path;
    this.header = new Header();
    this.footer = new Footer();
  }
  async open(path = '') {
    await browser.url(`/${this.path}`);
  }
}

module.exports = BasePage;
