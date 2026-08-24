import { Login } from '../page/login';
import { Produtos } from '../page/produtos';
import { Carrinho } from '../page/carrinho';
import { faker } from '@faker-js/faker';

describe('Realizando os testes de compras no site soucedemo', () => {
  
    const login = new Login();
    const produto = new Produtos();
    const carrinho = new Carrinho()

  beforeEach(() => {
    cy.visit('/');
    login.fazerLoginValido();
    cy.validarRota('/inventory.html');
  });

   const nome = faker.person.firstName();
   const sobrenome = faker.person.lastName();
   const cep = faker.location.zipCode();


   const produtos = [
    { slug: 'sauce-labs-backpack', nome: 'Sauce Labs Backpack', textoBotao: 'Add to cart' },
    { slug: 'sauce-labs-bike-light', nome: 'Sauce Labs Bike Light', textoBotao: 'Add to cart' },
    { slug: 'sauce-labs-bolt-t-shirt', nome: 'Sauce Labs Bolt T-Shirt', textoBotao: 'Add to cart' },
    ];

  it('Adicionando produtos ao carrinho finalizando a compra', () => {
    produto.adicionarProdutosAoCarrinho(produtos);

    produto.clicarNoCarrinho();
    cy.validarRota('/cart.html');

    carrinho.validarProdutosNoCarrinho(produtos.map(p => p.nome));
    carrinho.clicarCheckout('Checkout')
    cy.validarRota('/checkout-step-one.html')

    carrinho.preencherNome(nome)
    carrinho.preencherSobrenome(sobrenome)
    carrinho.preencherCep(cep)
    carrinho.clicarContinuar('Continue')
    cy.validarRota('/checkout-step-two.html')

    carrinho.validarTexto('Total: $60.45')
    carrinho.clicarFinalizar('Finish')
    cy.validarRota('/checkout-complete.html')

    carrinho.validarTexto('Thank you for your order!')
  
  })
});



