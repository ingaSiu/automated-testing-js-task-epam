describe('Login page', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
  });

  it('Test Login form with empty credentials', async () => {
    // Type any credentials into "Username" and "Password" fields.
    // Clear the inputs.
    // Hit the "Login" button.
    // Check the error messages: "Username is required".

    await $('#user-name').setValue('Username');
    await $('#password').setValue('Password');

    await $('#user-name').setValue('');
    await $('#password').setValue('');

    await $('#login-button').click();

    await expect($('h3[data-test="error"]').toHaveText('Epic sadface: Username is required'));
  });

  it('Test Login form with credentials by passing Username', async () => {
    // Type any credentials in username.
    // Enter password.
    // Clear the "Password" input.
    // Hit the "Login" button.
    // Check the error messages: "Password is required".

    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');

    await $('#password').setValue('');

    await $('#login-button').click();

    await expect($('h3[data-test="error"]').toHaveText('Epic sadface: Password is required'));
  });

  it('Test Login form with credentials by passing Username & Password', async () => {
    // Type credentials in username which are under Accepted username are sections.
    // Enter password as secret sauce.
    // Click on Login and validate the title “Swag Labs” in the dashboard.
    await $('#user-name').setValue('standard_user');
    await $('#password').setValue('secret_sauce');
    await $('#login-button').click();

    await expect($('.app_logo').toHaveText('Swag Labs'));
  });
});
