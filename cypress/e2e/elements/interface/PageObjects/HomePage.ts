import HomeElements from "../elements/HomeElements";
import { logoutUser, goToTeamBuilder } from "../../../utils";

class HomePage {
  elements = new HomeElements();

  visit() {
    cy.visit("/home");
    cy.url().should("include", "/home");
  }

  logout() {
    logoutUser();
    cy.url().should("include", "/login");
  }

  goToTeamBuilderPage() {
    goToTeamBuilder();
    cy.url().should("include", "/add-pokemon-team");
  }

  getPokemonCard() {
    return cy.get(this.elements.pokemonCard());
  }

  getAllPokemonCards() {
    return cy.get(this.elements.allPokemonCards());
  }

  getPokemonTitle(id: number, name: string) {
    return this.elements.pokemonTitle(id, name);
  }

  getPokemonType(type: string) {
    return cy.get(this.elements.pokemonType(type));
  }

  clickPokemonDetails(id: number) {
    cy.get(this.elements.pokemonButtonDetails(id)).click();
  }

  checkPokemonExists() {
    this.getPokemonCard().should("exist");
  }

  checkPokemonNotExists(id: number, name: string) {
    this.getPokemonCard().should("not.contain", `#${id} - ${name}`);
  }

  checkNumberOfPokemonCards(count: number) {
    this.getAllPokemonCards().should("have.length", count);
  }
}

export default HomePage;
