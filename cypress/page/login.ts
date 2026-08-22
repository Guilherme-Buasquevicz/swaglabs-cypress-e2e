export class Login {
  
    private emailInput = '#user-name';
    private senhaInput = '#password';
    private botaoLogin = '#login-button';
    
    public preencherCampoEmail(texto: string) {
        cy.preencherCampo(this.emailInput, texto);
    }

    public preencherCampoSenha(texto: string) {
        cy.preencherCampo(this.senhaInput, texto);
    }

    public clicarBotaoLogin(valorBotao: string) {
        cy.clicar(this.botaoLogin, valorBotao);
    }

    public fazerLoginValido() {
        this.preencherCampoEmail(Cypress.env('SWAG_USERNAME'));
        this.preencherCampoSenha(Cypress.env('SWAG_PASSWORD'));
        this.clicarBotaoLogin('Login');
    }

    public textoEsperado(texto: string) {
        cy.validaTexto(texto)
    }
}
