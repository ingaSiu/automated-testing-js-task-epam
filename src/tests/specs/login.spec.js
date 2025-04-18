const LoginPage = require('../../po/pages/login.page');
const InventoryPage = require('../../po/pages/inventory.page');
const { clearInput, addSpace, pressEnter } = require('../utils/helpers');

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

      await loginForm.enterCredentials('standard_user', 'secret_sauce');

      await pressEnter();

      const inventoryPage = new InventoryPage();

      await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));

      await expect(inventoryPage.header.appLogo).toHaveText('Swag Labs');
    });

    it('should login with credentials and navigate to inventory page', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('standard_user', 'secret_sauce');
      await loginForm.submit();

      const inventoryPage = new InventoryPage();

      await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));

      await expect(inventoryPage.header.appLogo).toHaveText('Swag Labs');
    });

    it('should redirect to login page after logout', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('standard_user', 'secret_sauce');
      await loginForm.submit();

      const inventoryPage = new InventoryPage();

      await inventoryPage.header.logout();

      await loginPage.open();

      await expect(browser).toHaveUrl(expect.stringContaining('saucedemo.com'));
      await expect(loginPage.loginForm.input('username')).toBeDisplayed();
    });
  });

  describe('Negative test cases', () => {
    it('should not login with empty inputs', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('Username', 'Password');

      await clearInput(loginForm.input('username'));

      await clearInput(loginForm.input('password'));
      await loginForm.input('username').click();

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText('Epic sadface: Username is required');
    });

    it('should not have any autofilled username or password', async () => {
      const { loginForm } = loginPage;

      await expect(loginForm.input('username')).toHaveValue('');
      await expect(loginForm.input('password')).toHaveValue('');
    });

    it('should not login without password', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('user', 'secret_sauce');

      await clearInput(loginForm.input('password'));

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText('Epic sadface: Password is required');
    });

    it('should not login with incorrect username', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('invalid_user', 'secret_sauce');

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not login with incorrect credentials', async () => {
      const { loginForm } = loginPage;
      await loginForm.enterCredentials('invalid_user', 'wrong_password');

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not accept inputs with spaces only ', async () => {
      const { loginForm } = loginPage;

      await addSpace(loginForm.input('username'));
      await addSpace(loginForm.input('password'));
      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );
    });

    it('should not login with locked_out users credentials', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('locked_out_user', 'secret_sauce');

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    it('should clear error message then clicked', async () => {
      const { loginForm } = loginPage;

      await loginForm.enterCredentials('invalid_user', 'secret_sauce');

      await loginForm.submit();

      await expect(loginForm.errorElement).toHaveText(
        'Epic sadface: Username and password do not match any user in this service',
      );

      await loginForm.errorButton.click();

      await expect(loginForm.errorElement).not.toBeDisplayed();
    });
  });
});
