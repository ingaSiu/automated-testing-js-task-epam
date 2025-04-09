const LoginForm = require('./../components/login/login-form.component');

class LoginPage {
  constructor() {
    this.loginForm = new LoginForm();
  }

  async open() {
    await browser.url('/');
  }
}

module.exports = LoginPage;
