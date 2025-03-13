const BaseComponent = require('./base.component');

class HeaderComponent extends BaseComponent {
  constructor() {
    super('.primary_header');
  }

  get appLogo() {
    return this.rootEl.$('.app_logo');
  }
}

module.exports = HeaderComponent;
