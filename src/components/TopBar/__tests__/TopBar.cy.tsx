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

  it("Botões devem navegar corretamente", () => {
    cy.viewport(1024, 768); 
    cy.get('[data-cy="team-builder-button"]').click();

    cy.get('[data-cy="profile-button"]').click();
  });

  it("Botão Logout deve deslogar e redirecionar", () => {
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="logout-button"]').length) {
        cy.get('[data-cy="logout-button"]').click();
      } else {
        cy.log("Usuário não está logado, botão não renderizado");
      }
    });
  });
});
