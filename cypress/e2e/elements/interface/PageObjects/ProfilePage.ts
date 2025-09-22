import ProfileElements from "../elements/ProfileElements";

class ProfilePage {
  elements = new ProfileElements();

  visit() {
    cy.visit("/perfil");
  }

  getEmail() {
    return this.elements.email;
  }

  checkEmail(expectedEmail: string) {
    this.elements.email.should('have.text', `Email: ${expectedEmail}`);
  }

  checkLogoutButtonVisible() {
    this.elements.logoutButton.should('be.visible');
  }

  checkDeleteAccountButtonVisible() {
    this.elements.deleteAccountButton.should('be.visible');
  }
}

export default ProfilePage;
