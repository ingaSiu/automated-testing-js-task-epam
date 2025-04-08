const LoginPage = require('./../po/pages/login.page');
const DashboardPage = require('./../po/pages/dashboard.page');
const { clearInput, addSpace, pressEnter } = require('./utils/helpers');

describe('Login tests', () => {
  let loginPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  afterEach(async () => {
    await browser.deleteCookies();
    await browser.execute(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  describe('Positive test cases', () => {
    it('should login with credentials then "enter" is pressed', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('standard_user');
      await loginForm.input('password').setValue('secret_sauce');
      await pressEnter();

      const dashboardPage = new DashboardPage();

      await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));

      await expect(dashboardPage.header.appLogo).toHaveText('Swag Labs');
    });

    it('should login with credentials and navigate to dashboard page', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('standard_user');
      await loginForm.input('password').setValue('secret_sauce');
      await loginForm.loginBtn.click();

      await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
        timeout: 5000, // Adjust timeout as needed
        timeoutMsg: 'Expected URL to include "inventory.html"',
      });

      const dashboardPage = new DashboardPage();

      await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));

      await expect(dashboardPage.header.appLogo).toHaveText('Swag Labs');
    });

    it('should redirect to login page after logout', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('standard_user');
      await loginForm.input('password').setValue('secret_sauce');
      await loginForm.loginBtn.click();

      const dashboardPage = new DashboardPage();

      await dashboardPage.header.logout();

      await loginPage.open('/');

      await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'));
      await expect(loginPage.loginForm.input('username')).toBeDisplayed();
    });
  });

  describe('Negative test cases', () => {
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

    it('should not have any autofilled username or password', async () => {
      const { loginForm } = loginPage;

      await expect(loginForm.input('username')).toHaveValue('');
      await expect(loginForm.input('password')).toHaveValue('');
    });

    it('should not login without password', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('user');
      await loginForm.input('password').setValue('secret_sauce');

      await clearInput(loginForm.input('password'));

      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText('Epic sadface: Password is required');
    });

    it('should not login with incorrect username', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('invalid_user');
      await loginForm.input('password').setValue('secret_sauce');

      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not login with incorrect credentials', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('invalid_user');
      await loginForm.input('password').setValue('wrong_password');
      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not accept inputs with spaces only ', async () => {
      const { loginForm } = loginPage;

      await addSpace(loginForm.input('username'));
      await addSpace(loginForm.input('password'));
      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not login with locked_out users credentials', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('locked_out_user');
      await loginForm.input('password').setValue('secret_sauce');
      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    it('should clear error message then clicked', async () => {
      const { loginForm } = loginPage;

      await loginForm.input('username').setValue('invalid_user');
      await loginForm.input('password').setValue('secret_sauce');

      await loginForm.loginBtn.click();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );

      await loginForm.errorButton.click();

      await expect(loginForm.errorElement).not.toBeDisplayed();
    });
  });
});
