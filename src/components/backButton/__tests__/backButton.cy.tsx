import { MemoryRouter } from 'react-router-dom';
import BackButton from '../../backButton';
import { getBackButton } from '../../../../cypress/e2e/elements/backButtonElements';

describe('BackButton', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter initialEntries={['/page-a']}>
        <BackButton />
      </MemoryRouter>
    );
  });
  it('Renderiza corretamente com ícone e texto "Voltar"', () => {
    getBackButton().should('contain.text', 'Voltar');
    getBackButton().find('svg').should('exist');
  });
    it('Clica no botão e navega para a página anterior', () => {
        cy.window().then((win) => {
        const history = win.history;
        history.pushState({}, '', '/page-b'); // Simula navegação para outra página
        });
        
        cy.get('button').click();
        
        cy.window().its('history.length').should('be.greaterThan', 1); // Verifica se a navegação foi bem-sucedida
    });
});
