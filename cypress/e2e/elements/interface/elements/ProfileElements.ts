class ProfileElements {
  get email() {
    return cy.get('[data-cy="email"]');
  }

  get logoutButton() {
    return cy.get('[data-cy="logout-button"]');
  }

  get deleteAccountButton() {
    return cy.get('[data-cy="delete-account-button"]');
  }
}

export default ProfileElements;
