import RegisterPage from "./elements/interface/PageObjects/RegisterPage";
import TeamManagerPage from "./elements/interface/PageObjects/TeamManagerPage";
import { backButton, goToTeamManager } from "./utils";

describe("Tela de Gerenciamento de Times (TeamManager)", () => {
  const registerPage = new RegisterPage();
  const teamManagerPage = new TeamManagerPage();

  const testEmail = "test@email.com";
  const testpassword = "1234";

  beforeEach(() => {
    registerPage.doLogin(testEmail, testpassword);
    goToTeamManager();
  });

  it("Deve exibir a página de gerenciamento de times", () => {
    cy.contains("Gerenciar Times Pokémon").should("exist");
    teamManagerPage.assertNoTeams();
  });

  it("Deve permitir criar um novo time e depois fazer a exclusão", () => {
    teamManagerPage.clickCreateTeam();
    cy.url().should("include", "/team-builder");
    backButton();
    teamManagerPage.clickDeleteTeam(0);
  });
});
