import RegisterPage from '../e2e/elements/interface/PageObjects/RegisterPage';
import HomePage from '../e2e/elements/interface/PageObjects/HomePage';
import { backButton } from './utils';

describe('Home tests', () => {
  const testEmail = "test@email.com";
  const testpassword = "1234";
  const registerPage = new RegisterPage();
  const homePage = new HomePage();

  beforeEach(() => {
    registerPage.doLogin(testEmail, testpassword);
    homePage.visit();
  });

  it("Checa se o botão de logout funciona", () => {
    homePage.logout();
  });

  it("Checa se redireciona para a página de Team Builder", () => {
    homePage.goToTeamBuilderPage();
  });

  it("Checa se redireciona para a página de detalhes do Pokémon", () => {
    homePage.clickPokemonDetails(1);
    cy.url().should("include", "/pokemon/1");
  });

  it("Checa se o card do Pokémon existe", () => {
    homePage.checkPokemonExists();
  });

  it("Checa se o botão de voltar funciona", () => {
    homePage.clickPokemonDetails(1);
    cy.url().should("include", "/pokemon/1");
    backButton();
    cy.url().should("include", "/home");
  });

  /*it("Monta um time completo", () => {
    homePage.goToTeamBuilderPage();
    createTeam();
    for (let i = 1; i <= 6; i++) {
      addPokemonToSlot(i - 1, i);
    }
    homePage.checkNumberOfPokemonCards(6);
  });*/
});
