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

  async openSideNav() {
    await this.burgerMenuBtn.click();
    await this.sideNav.waitForDisplayed();
  }

  async logout() {
    await this.openSideNav();
    await this.logoutLink.click();
  }
}

module.exports = HeaderComponent;
