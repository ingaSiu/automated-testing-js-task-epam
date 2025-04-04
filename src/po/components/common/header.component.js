const BaseComponent = require('./base.component');

class HeaderComponent extends BaseComponent {
  constructor() {
    super('.primary_header');
  }

  get appLogo() {
    return this.rootEl.$('.app_logo');
  }

  get burgerMenuBtn() {
    return this.rootEl.$('#react-burger-menu-btn');
  }

  get sideNav() {
    return $('nav.bm-item-list');
  }

  get logoutLink() {
    return $('a#logout_sidebar_link');
  }
}

module.exports = HeaderComponent;
