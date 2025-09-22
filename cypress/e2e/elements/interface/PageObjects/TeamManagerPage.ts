import TeamManagerElements from "../elements/TeamManagerElements";

class TeamManagerPage {
  elements = new TeamManagerElements();

  clickCreateTeam() {
    cy.get(this.elements.createTeamButton()).click();
  }

  getTeamCard(id: number) {
    return cy.get(this.elements.teamCard(id));
  }

  getAllTeams() {
    return cy.get(this.elements.allTeamCards());
  }

  clickEditTeam(index: number) {
    cy.get(this.elements.editTeamButton(index)).click();
  }

  clickDeleteTeam(index: number) {
    cy.get(this.elements.deleteTeamButton(index)).click();
  }

  assertNoTeams() {
    cy.get(this.elements.allTeamCards()).should("not.exist");
  }

  assertTeamCount(count: number) {
    cy.get(this.elements.allTeamCards()).should("have.length", count);
  }

  deleteTeamAndConfirm(index: number) {
    this.clickDeleteTeam(index);
  }

  editTeam(index: number) {
    this.clickEditTeam(index);
  }
}

export default TeamManagerPage;
