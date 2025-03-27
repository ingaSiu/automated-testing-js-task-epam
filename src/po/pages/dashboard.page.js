const Header = require('./../components/common/header.component');
const BasePage = require('./basepage');

class DashboardPage extends BasePage {
  constructor() {
    super('inventory.html');
    this.header = new Header();
  }
}

module.exports = DashboardPage;
