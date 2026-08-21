/*
* Comando utilizado para clicar em botões pelas telas
* onde o ID do botão e o texto são iguais
* @param idBotao - seletor do botão (ex: '#login-button')
* @param nomeBotao - texto esperado dentro do botão
*/
Cypress.Commands.add('clicarBotaoInput', (idBotao: string, valorBotao: string) => {
  cy.get(idBotao)
    .should('have.value', valorBotao)
    .click();
});

/*
* Comando utilizado para preencher campos pegando o ID do campo e passando o texto desejado
* @param idCampo - Seletor do campo (ex: '#email-input')
* @param textoCampo - Texto que será preenchido no campo baseado no e2e
*/
Cypress.Commands.add('preencherCampo', (idCampo: string, textoCampo: string) =>{
    cy.get(idCampo)
        .click()
        .type(textoCampo);
})