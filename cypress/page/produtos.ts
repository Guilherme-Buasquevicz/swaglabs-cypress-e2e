export class Produtos {

    private detalhesDoProduto = '#item_4_title_link'
    private voltarParaTelaDeProdutos = '#back-to-products'
    private entrarNoCarrinho = '#shopping_cart_container'
    private filtroOrdenacao = '[data-test="product-sort-container"]';
    private nomeProduto = '[data-test="inventory-item-name"]';
    private precoProduto = '[data-test="inventory-item-price"]';
    
    
    public verDetalhesDoProduto(texto: string) {
        cy.clicar(this.detalhesDoProduto, texto)
    }

    public voltarParaProdutos(){
        cy.clicar(this.voltarParaTelaDeProdutos)
    }

    public clicarNoCarrinho(){
        cy.clicar(this.entrarNoCarrinho)
    }

    public adicionarProdutoAoCarrinho(slugProduto: string, texto: string) {
        cy.clicar(`#add-to-cart-${slugProduto}`, texto);
    }

    public adicionarProdutosAoCarrinho(produtos: { slug: string; textoBotao: string }[]) {
        produtos.forEach((produto) => {
            this.adicionarProdutoAoCarrinho(produto.slug, produto.textoBotao);
        });
    }

    public removerProdutoDoCarrinho(slugProduto: string, texto: string) {
        cy.clicar(`#remove-${slugProduto}`, texto);
    }

    public selecionarFiltro(opcao: string){
        cy.selecionarOpcao(this.filtroOrdenacao, opcao)
    }

      public obterNomesProdutos() {
        return cy.get(this.nomeProduto).then(($elementos) => {
            return Cypress._.map($elementos, 'innerText');
        });
    }

    public obterPrecosProdutos() {
        return cy.get(this.precoProduto).then(($elementos) => {
            return Cypress._.map($elementos, (el) =>
                parseFloat(el.innerText.replace('$', ''))
            );
        });
    }

}