declare namespace Cypress {
  interface Chainable {

    clicar(seletor: string, valorEsperado?: string): Chainable<void>;

    preencherCampo(idBotao: string, textoCampo: string): Chainable<void>;

    validaTexto(texto: string): Chainable<void>

    validarRota(caminho?: string): Chainable<void>
    }
}

