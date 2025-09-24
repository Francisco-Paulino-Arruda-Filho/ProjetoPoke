import { MemoryRouter } from "react-router-dom";
import TopBar from "../TopBar";
import { AuthProvider } from "../../../context/AuthProvider";

describe("TopBar Component", () => {
  beforeEach(() => {
    cy.mount(
      <AuthProvider>
        <MemoryRouter>
          <TopBar />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  context("Desktop view", () => {
    beforeEach(() => {
      cy.viewport(1024, 768); // Desktop
    });

    it("Deve renderizar os botões principais da TopBar", () => {
      cy.get('[data-cy="team-builder-button"]').should("be.visible");
      cy.get('[data-cy="profile-button"]').should("be.visible");

      cy.get("body").then(($body) => {
        if ($body.find('[data-cy="logout-button"]').length) {
          cy.get('[data-cy="logout-button"]').should("be.visible");
        }
      });
    });
  });
});
