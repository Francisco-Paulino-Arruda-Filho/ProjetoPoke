import {
  goToTeamBuilder,
  createTeam,
  addPokemonToSlot,
} from "../../../utils";
import TeamBuilderElements from "../elements/TeamBuilderElements";

class TeamBuilderPage {
  elements = new TeamBuilderElements();

  visit() {
    goToTeamBuilder();
    cy.url().should("include", "/add-pokemon-team");
  }

  startTeam() {
    createTeam();
  }

  addPokemon(slotIndex: number, pokemonId: number) {
    addPokemonToSlot(slotIndex, pokemonId);
    cy.get(this.elements.pokemonCard(slotIndex)).should(
      "exist"
    );
  }

  clickEdit(number: number) {
    cy.get(this.elements.editButton(number)).click();
  }

  clickRemove(number: number) {
    cy.get(this.elements.removeButton(number)).click();
  }

  clickDetails(id: number) {
    cy.get(this.elements.detailsButton(id)).click();
  }

  pageHavePokemon(pokemonName: string) {
    cy.get(this.elements.pageHavePokemonText()).contains(pokemonName);
  }

  pageHavePokemonText() {
    cy.get(this.elements.pageHavePokemonText())
      .should("exist");
  }

  pageNotHavePokemon(pokemonName: string) {
    cy.get(this.elements.pageHavePokemonText())
      .filter(`:contains(${pokemonName})`)
  }

  fillCompleteTeam() {
    for (let i = 0; i < 6; i++) {
      addPokemonToSlot(i, i + 1);
      cy.get(this.elements.pokemonCard(i)).should("exist");
    }
  }

  clickAddPokemonButton(index: number) {
    cy.get(this.elements.addPokemonButton(index)).click();
  }
}

export default TeamBuilderPage;
