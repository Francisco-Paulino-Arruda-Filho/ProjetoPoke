import TeamBuilderPage from "./elements/interface/PageObjects/TeamBuilderPage";
import RegisterPage from "./elements/interface/PageObjects/RegisterPage";
import { goToTeamManager } from "./utils";
import TeamManagerPage from "./elements/interface/PageObjects/TeamManagerPage";

describe("Fluxo do Team Builder", () => {
  const teamBuilder = new TeamBuilderPage();
  const testEmail = "test@email.com";
  const testpassword = "1234";
  const registerPage = new RegisterPage();
  const teamManager = new TeamManagerPage();

  beforeEach(() => {
    registerPage.doLogin(testEmail, testpassword);
    teamBuilder.visit();
    teamBuilder.startTeam();
  });

  afterEach(() => {
    goToTeamManager();
    teamManager.deleteTeamAndConfirm(0);
  });

  it("Checa se está funcionando adicionando Pokémon ao time", () => {
    teamBuilder.addPokemon(0, 6); 
    teamBuilder.pageHavePokemonText(); 
  });

  it("Checa se está funcionando removendo Pokémon do time", () => {
    teamBuilder.addPokemon(0, 6); 
    teamBuilder.clickRemove(6);
  });

  it("Checa se o botão de editar Pokémon funciona", () => {
    teamBuilder.addPokemon(0, 6); 
    teamBuilder.clickEdit(6);
    teamBuilder.clickAddPokemonButton(3);
    teamBuilder.pageHavePokemonText();
  });

  it("Monta um time completo", () => {
    teamBuilder.addPokemon(0, 1); 
    teamBuilder.addPokemon(1, 2); 
    teamBuilder.addPokemon(2, 3); 
    teamBuilder.addPokemon(3, 4); 
    teamBuilder.addPokemon(4, 5); 
    teamBuilder.addPokemon(5, 6); 
    teamBuilder.pageHavePokemonText();
  });
});
