export interface ProdutoDoCarrinho {
    slug: string;
    nome: string;
}

export class Carrinho {

    private abrirCarrinho = '#shopping_cart_container'
    private fecharConta = '#checkout'
    private prencherNome = '#first-name'
    private prencherSobrenome = '#last-name'
    private prencherCEP = '#postal-code'
    private continuarParaPagamento = '[data-test="continue"]'
    private finalizandoCompra = '#finish'

    public clicarNoCarrinho() {
        cy.clicar(this.abrirCarrinho);
    }

    public clicarCheckout(texto: string) {
        cy.clicar(this.fecharConta, texto);
    }

    public preencherNome(texto: string) {
        cy.preencherCampo(this.prencherNome, texto);
    }

    public preencherSobrenome(texto: string) {
        cy.preencherCampo(this.prencherSobrenome, texto);
    }

    public preencherCep(texto: string) {
        cy.preencherCampo(this.prencherCEP, texto);
    }

    public clicarContinuar(texto: string) {
        cy.clicar(this.continuarParaPagamento, texto);
    }

    public clicarFinalizar(texto: string) {
        cy.clicar(this.finalizandoCompra, texto);
    }

    public validarTexto (texto: string) {
        cy.validaTexto(texto)
    }

    public validarProdutosNoCarrinho(nomes: string[]) {
        nomes.forEach((nome) => {
            cy.validaTexto(nome);
        });
    }
}
