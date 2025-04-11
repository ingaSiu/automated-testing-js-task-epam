const LoginForm = require('./../components/login/login-form.component');
const LoginLogo = require('./../components/login/login-logo.component');

class LoginPage {
  constructor() {
    this.loginForm = new LoginForm();
    this.loginLogo = new LoginLogo();
  }

  async open() {
    await browser.url('/');
  }
}

module.exports = LoginPage;
