const BaseComponent = require('./../common/base.component');

class LoginFormComponent extends BaseComponent {
  constructor() {
    super('.login-box');
  }

  get loginBtn() {
    return this.rootEl.$('input[data-test="login-button"]');
  }

  get errorElement() {
    return this.rootEl.$('h3[data-test="error"]');
  }

  get errorButton() {
    return this.rootEl.$('button[data-test="error-button"]');
  }

  input(name) {
    const selectors = {
      username: 'input[data-test="username"]',
      password: 'input[data-test="password"]',
    };
    return this.rootEl.$(selectors[name.toLowerCase()]);
  }

  async enterCredentials(username, password) {
    await this.input('username').setValue(username);
    await this.input('password').setValue(password);
  }

  async submit() {
    await this.loginBtn.click();
  }
}

module.exports = LoginFormComponent;
