const LoginPage = require('./../po/pages/login.page');

describe('Login page', () => {
  let loginPage;

  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
    loginPage = new LoginPage();
  });

  it('Test Login form with empty credentials', async () => {
    const { loginForm } = loginPage;
    // Type any credentials into "Username" and "Password" fields.
    // Clear the inputs.
    // Hit the "Login" button.
    // Check the error messages: "Username is required".

    await loginForm.input('username').setValue('Username');
    await loginForm.input('password').setValue('Password');

    await loginForm.input('username').clearValue();
    await loginForm.input('password').clearValue();

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement.toHaveText('Epic sadface: Username is required'));
  });

  it('Test Login form with credentials by passing Username', async () => {
    const { loginForm } = loginPage;
    // Type any credentials in username.
    // Enter password.
    // Clear the "Password" input.
    // Hit the "Login" button.
    // Check the error messages: "Password is required".

    await loginForm.input('username').setValue('standard_user');
    await loginForm.input('password').setValue('secret_sauce');

    await loginForm.input('password').clearValue();

    await loginForm.loginBtn.click();

    await expect(loginForm.errorElement.toHaveText('Epic sadface: Password is required'));
  });

  it('Test Login form with credentials by passing Username & Password', async () => {
    const { loginForm } = loginPage;
    // Type credentials in username which are under Accepted username are sections.
    // Enter password as secret sauce.
    // Click on Login and validate the title “Swag Labs” in the dashboard.
    await loginForm.input('username').setValue('standard_user');
    await loginForm.input('password').setValue('secret_sauce');
    await loginForm.loginBtn.click();

    await expect($('.app_logo').toHaveText('Swag Labs'));
  });
});
