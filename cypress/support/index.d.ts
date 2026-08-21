declare namespace Cypress {
  interface Chainable {

    clicarBotaoInput(idBotao: string, nomeBotao: string): Chainable<void>;

    preencherCampo(idBotao: string, textoCampo: string): Chainable<void>;


    }
}

