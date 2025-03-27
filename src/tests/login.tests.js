const LoginPage = require('./../po/pages/login.page');
const DashboardPage = require('./../po/pages/dashboard.page');
const { Key } = require('webdriverio');

async function clearInput(element) {
  await element.click();
  await browser.keys([Key.Control, 'a']);
  await browser.keys([Key.Backspace]);
}

describe('Login page', () => {
  let loginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  it('should not login with empty inputs', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('Username');
    await loginForm.input('password').setValue('Password');

    await clearInput(loginForm.input('username'));

    await clearInput(loginForm.input('password'));
    await loginForm.input('username').click();

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement).toHaveText('Epic sadface: Username is required');
  });

  it('should not login without password', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('user');
    await loginForm.input('password').setValue('secret_sauce');

    await clearInput(loginForm.input('password'));

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement).toHaveText('Epic sadface: Password is required');
  });

  it('should login with credentials and navigate to dashboard page', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('standard_user');
    await loginForm.input('password').setValue('secret_sauce');
    await loginForm.loginBtn.click();

    const dashboardPage = new DashboardPage();

    await expect(dashboardPage.header.appLogo).toHaveText('Swag Labs');
  });
});
