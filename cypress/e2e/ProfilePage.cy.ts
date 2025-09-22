import ProfilePage from "./elements/interface/PageObjects/ProfilePage";
import RegisterPage from "./elements/interface/PageObjects/RegisterPage";

describe("Profile Page", () => {
  const profilePage = new ProfilePage();
  const testEmail = "test@email.com";
  const testpassword = "1234";
  const registerPage = new RegisterPage();

  beforeEach(() => {
    registerPage.doLogin(testEmail, testpassword);
  });

  beforeEach(() => {
    profilePage.visit();
    cy.visit("/perfil");
  });

  it("Deve exibir o email do usuário", () => {
    profilePage.checkEmail("test@email.com");
  });

  it("Deve exibir o botão de logout", () => {
    profilePage.checkLogoutButtonVisible();
  });

  it("Deve exibir o botão de excluir conta", () => {
    profilePage.checkDeleteAccountButtonVisible();
  });
});
