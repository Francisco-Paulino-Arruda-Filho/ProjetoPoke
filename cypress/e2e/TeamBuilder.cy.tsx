import TeamBuilderPage from "./elements/interface/PageObjects/TeamBuilderPage";
import RegisterPage from "./elements/interface/PageObjects/RegisterPage";

describe("Fluxo do Team Builder", () => {
  const teamBuilder = new TeamBuilderPage();
  const testEmail = "test@email.com";
  const testpassword = "1234";
  const registerPage = new RegisterPage();

  beforeEach(() => {
    registerPage.doLogin(testEmail, testpassword);
    teamBuilder.visit();
    teamBuilder.startTeam();
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
});
