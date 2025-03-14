const BaseComponent = require('./../common/base.component');

class LoginFormComponent extends BaseComponent {
  constructor() {
    super('.login-box');
  }

  get loginBtn() {
    return this.rootEl.$('#login-button');
  }

  get errorElement() {
    return this.rootEl.$('h3[data-test="error"]');
  }

  input(name) {
    const selectors = {
      username: '#user-name',
      password: '#password',
    };
    return this.rootEl.$(selectors[name.toLowerCase()]);
  }
}

module.exports = LoginFormComponent;
