import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  deleteAccount 
} from "../../../utils";

class LoginPage {
  beforeRegister(testUser: string, testEmail: string, senha = "teste") {
    registerUser(testUser, testEmail, senha);
    cy.contains("Cadastro realizado com sucesso!").should("exist");
    cy.url().should("include", "/login");
  }

  doLogin(email: string, senha = "teste") {
    loginUser(email, senha);
    cy.url().should("include", "/home");
  }

  doLogout() {
    logoutUser();
    cy.url().should("include", "/login");
  }

  removeAccount() {
    deleteAccount();
    cy.url().should("include", "/login");
  }
}

export default LoginPage;
