/**
 * Clica em um elemento, validando de forma opcional se tem um texto/valor esperado.
 * Verifica automaticamente se esse texto é: texto interno,
 * atributo value (inputs), aria-label ou title (ícones/botões sem texto).
 * @param seletor - Seleciona o elemento
 * @param valorEsperado - texto esperado (opcional). Se não declarado, só verifica se o elemento existe e está visível.
 */
Cypress.Commands.add('clicar', (seletor: string, valorEsperado?: string) => {
  cy.get(seletor).should('be.visible').then(($el) => {
    if (valorEsperado) {
      const texto = $el.text().trim();
      const value = $el.val();
      const ariaLabel = $el.attr('aria-label');
      const title = $el.attr('title');

      const encontrado = [texto, value, ariaLabel, title].some(
        (atributo) => atributo === valorEsperado
      );

      expect(encontrado, `elemento deveria conter "${valorEsperado}" em texto, value, aria-label ou title`).to.be.true;
    }
  });

  cy.get(seletor).click();

});

/** 
* Comando utilizado para preencher campos pegando o ID do campo e passando o texto desejado
* @param idCampo - Seletor do campo (ex: '#email-input')
* @param textoCampo - Texto que será preenchido no campo baseado no e2e
*/
Cypress.Commands.add('preencherCampo', (idCampo: string, textoCampo: string) =>{
    cy.get(idCampo)
      .click()
      .type(textoCampo);
})

/**
 * Comando utilizado para validar textos, sejam títulos, mensagens de sucesso ou de erro, etc...
 * @param Texto - Texto/título que será validado durante a ação.
 */
Cypress.Commands.add('validaTexto', (texto: string) => {
      cy.contains(texto);
})

/**
 * Comando valida que a URL atual corresponde exatamente ao caminho esperado,
 * a partir do baseUrl configurado no cypress.config.ts.
 * @param caminho - caminho esperado (ex: '/inventory.html'). Se não declarado, valida a raiz do site.
 */
Cypress.Commands.add('validarRota', (caminho: string = '') => {
  const baseUrl = (Cypress.config().baseUrl ?? '').replace(/\/$/, '');
  const caminhoNormalizado = caminho.startsWith('/') ? caminho : `/${caminho}`;

  cy.url().should('eq', `${baseUrl}${caminhoNormalizado}`);
});

/**
 * Comando utilizado para selecionar dropdowns/opções
 * @param seletor - Seletor do campos de opções
 * @param opcao - Define a opção do seletor
 * 
 * @remarks
 * A consulta ao elemento é feita em duas chamadas 'cy.get()' separadas por conta 
 * que o filtro de ordenação da página re-rendereiza o DOM após a seleção por ser feito
 * em react, o elemento original pode ficar 'detached' após  o 'select()'.
 * Por isso se o elemento fosse encadeado na mesma consulta iria estourar erro no console
 */
Cypress.Commands.add('selecionarOpcao', (seletor: string, opcao: string) => {
  cy.get(seletor)
    .should('be.visible')
    .select(opcao)

    cy.get(seletor).should('have.value', opcao);
});

/**
 * Valida a quantidade de itens do carrinho.
 * @param quantidade - quantidade esperada de itens. Se não declarado ou 0
 *  que valida que não existe (carrinho vazio).
 */
Cypress.Commands.add('validarQuantidadeCarrinho', (quantidade?: number) => {
  if (quantidade && quantidade > 0) {
    cy.get('.shopping_cart_badge').should('have.text', String(quantidade));
  } else {
    cy.get('.shopping_cart_badge').should('not.exist');
  }
});