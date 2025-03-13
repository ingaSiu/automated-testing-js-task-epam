const LoginForm = require('./../components/login/login-form.component');
const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor() {
    super();
    this.loginForm = new LoginForm();
  }
}

module.exports = LoginPage;
