export class Menu {

    private menuHambuguer = '#react-burger-menu-btn';
    private todosOsItens = '#inventory_sidebar_link';
    private botaoSobre = '#about_sidebar_link'
    private botaoLogof = '#logout_sidebar_link';
    

    
    public abrirMenu () {
        cy.clicar(this.menuHambuguer)
    }

    public clicarEmTodosOsItens (texto: string) {
        cy.clicar(this.todosOsItens, texto)
    }

    public clicarNoSobre (texto: string) {
        cy.clicar(this.botaoSobre, texto)
    }

    public clicarBotaoLogof (texto: string) {
        cy.clicar(this.botaoLogof, texto)
    }

    

}