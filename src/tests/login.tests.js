const LoginPage = require('./../po/pages/login.page');
const DashboardPage = require('./../po/pages/dashboard.page');

describe('Login page', () => {
  let loginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  it('Test Login form with empty credentials', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('Username');
    await loginForm.input('password').setValue('Password');

    await loginForm.input('username').clearValue();
    await loginForm.input('password').clearValue();

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement.toHaveText('Epic sadface: Username is required'));
  });

  it('Test Login form with credentials by passing Username', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('standard_user');
    await loginForm.input('password').setValue('secret_sauce');

    await loginForm.input('password').clearValue();

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement.toHaveText('Epic sadface: Password is required'));
  });

  it('Test Login form with credentials by passing Username & Password', async () => {
    const { loginForm } = loginPage;

    await loginForm.input('username').setValue('standard_user');
    await loginForm.input('password').setValue('secret_sauce');
    await loginForm.loginBtn.click();

    const dashboardPage = new DashboardPage();

    await expect(dashboardPage.header.appLogo.toHaveText('Swag Labs'));
  });
});
