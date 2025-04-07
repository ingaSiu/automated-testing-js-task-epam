const LoginForm = require('./../components/login/login-form.component');
const BasePage = require('./basepage');

class LoginPage extends BasePage {
  constructor() {
    super();
    this.loginForm = new LoginForm();
  }
}

module.exports = LoginPage;
