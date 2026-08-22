import { Login } from '../page/login';
import { Produtos } from '../page/produtos';
import { Menu } from '../page/components/menu';

describe('Realizando os testes de compras no site soucedemo', () => {
  
    const login = new Login();
    const produto = new Produtos();
    const menu = new Menu();

  beforeEach(() => {
    cy.visit('/');
    login.fazerLoginValido();
    cy.validarRota('/inventory.html');
  });

  it ('Visualizando o produto e retornando para a tela de compras.', () => {
    produto.verDetalhesDoProduto('Sauce Labs Backpack');
    cy.validarRota('/inventory-item.html?id=4');
    produto.voltarParaProdutos();
    cy.validarRota('/inventory.html');
  });
    
  it ('Adicionando e removendo os produtos do carrinho.', () => {
    produto.adicionarProdutoAoCarrinho('sauce-labs-backpack', 'Add to cart');
    cy.validarQuantidadeCarrinho(1);
    produto.clicarNoCarrinho();
    cy.validarRota('/cart.html');
    produto.removerProdutoDoCarrinho('sauce-labs-backpack', 'Remove');
    cy.validarQuantidadeCarrinho();
    menu.abrirMenu();
    menu.clicarEmTodosOsItens('All Items');
    cy.validarRota('/inventory.html');
  });

  it('Ordenando os produtos de Z a A e conferindo se funcionou', () => {
    produto.selecionarFiltro('za');
    produto.obterNomesProdutos().then((nomes) => {
        expect(nomes).to.deep.equal([...nomes].sort().reverse());
    });
  });

  it('Ordenando os produtos por preço, do menor para o maior e conferindo se funcionou', () => {
    produto.selecionarFiltro('lohi');
    produto.obterPrecosProdutos().then((precos) => {
        expect(precos).to.deep.equal([...precos].sort((a, b) => a - b));
    });
  });

  it('Ordenando os produtos por preço, do maior para o menor e conferindo se funcionou', () => {
    produto.selecionarFiltro('hilo');
    produto.obterPrecosProdutos().then((precos) => {
        expect(precos).to.deep.equal([...precos].sort((a, b) => b - a));
    });
  });
});