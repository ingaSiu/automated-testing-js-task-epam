const BasePage = require('./base.page');
const Header = require('./../components/common/header.component');

class DashboardPage extends BasePage {
  constructor() {
    super('inventory.html');
    this.header = new Header();
  }
}

module.exports = DashboardPage;
