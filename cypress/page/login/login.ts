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
        cy.clicarBotaoInput(this.botaoLogin, valorBotao);
    }
}
