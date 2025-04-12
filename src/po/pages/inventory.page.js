const Header = require('../components/common/header.component');
const BasePage = require('./basepage');

class InventoryPage extends BasePage {
  constructor() {
    super('inventory.html');
  }
}

module.exports = InventoryPage;
