import { Login } from '../../page/login/login';

describe('Login', () => {
  
    const login = new Login();

  beforeEach(() => {
    cy.visit('/');
  });

  it('Realizando o login com os dados válidos', () => {
    login.preencherCampoEmail(Cypress.env('SWAG_USERNAME'));
    login.preencherCampoSenha(Cypress.env('SWAG_PASSWORD'));
    login.clicarBotaoLogin('Login');

    cy.url().should('include', '/inventory.html');
  });
});