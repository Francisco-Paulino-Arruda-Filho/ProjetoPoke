import RegisterElements from "../elements/RegisterElements";
import { deleteAccount } from "../../../utils";
import LoginElements from "../elements/LoginElements";

class RegisterPage {
  elements = new RegisterElements();
    loginElements = new LoginElements();

  visit() {
    cy.visit("/cadastro");
    cy.get(this.elements.title()).should("exist");
  }

  fillForm(name: string, email: string, password = "teste") {
    cy.get(this.elements.nameField()).type(name);
    cy.get(this.elements.emailField()).type(email);
    cy.get(this.elements.passwordField()).type(password);
  }

  submit() {
    cy.get(this.elements.registerButton()).click();
  }

  doRegister(name: string, email: string, password = "teste") {
    this.visit();
    this.fillForm(name, email, password);
    this.submit();
    cy.get(this.elements.successAlert()).should("exist");
    cy.url().should("include", "/login");
  }

  doRegisterFail(name: string, email: string, password = "teste") {
    this.visit();
    this.fillForm(name, email, password);
    this.submit();
    cy.get(this.elements.errorAlert()).should("exist");
    cy.url().should("include", "/cadastro");
  }

  doLogin(email: string, password = "teste") {
    cy.visit("/login");
    cy.get(this.loginElements.emailField()).type(email);
    cy.get(this.loginElements.passwordField()).type(password);
    cy.get(this.loginElements.loginButton()).click();
    cy.url().should("include", "/home");
  }

  doRegisterAndLogin(name: string, email: string, password = "teste") {
    this.doRegister(name, email, password);
    cy.get('[data-cy="login-email"]').type(email);
    cy.get('[data-cy="login-password"]').type(password);
    cy.get('[data-cy="login-button"]').click();
    cy.url().should("include", "/home");
  }

  removeAccount() {
    deleteAccount();
    cy.url().should("include", "/login");
  }

  checkRequiredMessages() {
    this.visit();
    this.submit();

    cy.get(this.elements.nameError())
      .should("exist")
      .and("contain.text", "Nome é obrigatório.");
    cy.get(this.elements.emailError())
      .should("exist")
      .and("contain.text", "Email é obrigatório.");
    cy.get(this.elements.passwordError())
      .should("exist")
      .and("contain.text", "Senha é obrigatória.");
  }

  checkInvalidEmailMessage(name: string, invalidEmail: string, password = "teste") {
    this.visit();
    this.fillForm(name, invalidEmail, password);
    this.submit();

    cy.get(this.elements.emailError())
      .should("exist")
      .and("contain.text", "Email inválido.");
  }

  checkShortNameMessage(shortName: string, email: string, password = "teste") {
    this.visit();
    this.fillForm(shortName, email, password);
    this.submit();

    cy.get(this.elements.nameError())
      .should("exist")
      .and("contain.text", "Nome muito curto.");
  }

}

export default RegisterPage;
