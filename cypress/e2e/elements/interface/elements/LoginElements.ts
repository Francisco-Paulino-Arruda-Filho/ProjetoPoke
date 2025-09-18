class LoginElements {
  emailField = () => { return '[data-cy="login-email"]' }
  passwordField = () => { return '[data-cy="login-password"]' }
  loginButton = () => { return '[data-cy="login-button"]' }

  serverErrorAlert = () => { return '.MuiAlert-root' }

  noAccountText = () => { return 'text=Não tem uma conta?' }

  registerButton = () => { return 'button:has-text("Cadastre-se")' }

  title = () => { return 'h5:contains("Login")' }
}

export default LoginElements
