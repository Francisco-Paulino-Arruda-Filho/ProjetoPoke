import RegisterPage from "./elements/interface/PageObjects/RegisterPage";

describe("Fluxo de cadastro e login", () => {
  const registerPage = new RegisterPage();
  const randomString = Math.random().toString(36).substring(2, 10);
  const testEmail = `${randomString}@gmail.com`;  
  const testUser = `TestUser${randomString}`;
  const password = "teste";

  it("Cadastro de usuário", () => {
    registerPage.doRegister(testUser, testEmail, password);
    cy.visit("/login");
    registerPage.doLogin(testEmail, password);
    cy.url().should("include", "/home");
    registerPage.removeAccount();
  });

  it("Cadastro e login do usuário", () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const testEmail = `${randomString}@gmail.com`;
    const testUser = `TestUser${randomString}`;
    const password = "teste";
    registerPage.doRegisterAndLogin(testUser, testEmail, password);
    registerPage.removeAccount();
  });

  it("Remove conta do usuário", () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    const testEmail = `${randomString}@gmail.com`;
    const testUser = `TestUser${randomString}`;
    const password = "teste";
    registerPage.doRegisterAndLogin(testUser, testEmail, password);
    registerPage.removeAccount();
  });

  it("Tenta cadastrar com email já existente", () => {
    const testUser = "ExistingUser";
    const testEmail = "test@email.com";
    const password = "1234";
    registerPage.doRegisterFail(testUser, testEmail, password);
    registerPage.visit();
    registerPage.fillForm(testUser, testEmail, password);
    registerPage.submit();
    cy.contains("Usuário já existe.").should("exist");
    cy.url().should("include", "/cadastro");
  });
});
