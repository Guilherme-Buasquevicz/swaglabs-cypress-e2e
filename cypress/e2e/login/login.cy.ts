import { Login } from '../../page/login/login';

describe('Realizando os testes de login', () => {
  
    const login = new Login();

  beforeEach(() => {
    cy.visit('/');
  });

  it('Realizando o login com os dados válidos', () => {
    login.fazerLoginValido()
    login.textoEsperado('Swag Labs')
    
    cy.validarRota('/inventory.html');
  });

  it('Login com dados invalidos', () => {
    login.preencherCampoEmail('usuarioErrado')
    login.preencherCampoSenha('senhaErrada')
    login.clicarBotaoLogin('Login');
    login.textoEsperado('Epic sadface: Username and password do not match any user in this service')
    
    cy.validarRota();
  })

  it('Login e logof com sucesso', () => {
    login.fazerLoginValido()
    login.textoEsperado('Swag Labs')
    
    cy.validarRota('/inventory.html');

    login.clicarBotaoMenu()
    login.clicarBotaoLogof('Logout')
    login.textoEsperado('Password for all users')
    
    cy.validarRota();
  })
});