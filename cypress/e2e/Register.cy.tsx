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

  it("Exibe mensagens obrigatórias quando o formulário está vazio", () => {
    registerPage.checkRequiredMessages();
  });

  it("Exibe mensagem de email inválido", () => {
    registerPage.checkInvalidEmailMessage("Nome Teste", "email_invalido", "123456");
  });

  it("Exibe mensagem de nome muito curto", () => {
    registerPage.checkShortNameMessage("A", "teste@email.com", "123456");
  });

  it("Checa se todas as mensagens de erro aparecem corretamente", () => {
    registerPage.visit();
    registerPage.submit();
    registerPage.fillForm("A", "email_invalido", "123456");
    registerPage.submit();
    registerPage.checkInvalidEmailMessage("A", "email_invalido", "123456");
    registerPage.checkShortNameMessage("A", "email_invalido", "123456");
    registerPage.checkRequiredMessages();
  });
});
