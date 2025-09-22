class RegisterElements {
  nameField = () => { return '[data-cy="register-name"]' }
  emailField = () => { return '[data-cy="register-email"]' }
  passwordField = () => { return '[data-cy="register-password"]' }

  nameError = () => '[data-cy="register-name-error"]'
  emailError = () => '[data-cy="register-email-error"]'
  passwordError = () => '[data-cy="register-password-error"]'

  registerButton = () => { return '[data-cy="register-button"]' }

  successAlert = () => { return '.MuiAlert-root.MuiAlert-standardSuccess' }
  errorAlert = () => { return '.MuiAlert-root.MuiAlert-standardError' }

  loginLink = () => { return 'button:has-text("Entrar")' }

  title = () => { return 'h5:contains("Cadastro")' }
}

export default RegisterElements;
