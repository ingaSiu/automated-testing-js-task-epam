const BaseComponent = require('./base.component');

class FooterComponent extends BaseComponent {
  constructor() {
    super('footer.footer');
  }

  get social() {
    return this.rootEl.$('ul.social');
  }

  get footer_info() {
    return this.rootEl.$('div.footer_copy');
  }
}

module.exports = FooterComponent;
