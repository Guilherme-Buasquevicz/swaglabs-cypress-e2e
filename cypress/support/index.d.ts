declare namespace Cypress {
  interface Chainable {

    clicar(seletor: string, valorEsperado?: string): Chainable<void>;

    preencherCampo(idBotao: string, textoCampo: string): Chainable<void>;

    validaTexto(texto: string): Chainable<void>

    validarRota(caminho?: string): Chainable<void>

    selecionarOpcao(seletor: string, opcao: string): Chainable<void>

    validarQuantidadeCarrinho (quantidade?: number): Chainable<void>
    }
}

