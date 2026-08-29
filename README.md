# 🧪 SwagLabs Cypress E2E Automation
[![Cypress Tests](https://github.com/Guilherme-Buasquevicz/swaglabs-cypress-e2e/actions/workflows/cypress.yml/badge.svg)](https://github.com/Guilherme-Buasquevicz/swaglabs-cypress-e2e/actions/workflows/cypress.yml)

[![Cypress](https://img.shields.io/badge/Cypress-15.x-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

O projeto consiste na criação de testes automatizados da [SauceDemo (SwagLabs)](https://www.saucedemo.com/), construída com **Cypress + TypeScript**, seguindo o padrão **Page Object Model (POM)**.

Esse projeto tem o intuito de demonstrar a construção da automação de testes com o foco em boas práticas de arquitetura de testes, organização do código e segurança do processo.

---

## 🎯 Objetivo

Além de validar os principais fluxos da aplicação SwagLabs, este repositório foi construído para demonstrar:

- Estruturação de um projeto Cypress do zero, com TypeScript tipado
- Aplicação do padrão **Page Object Model** para separar seletores, ações e testes
- Criação de **comandos customizados reutilizáveis** (`Cypress.Commands.add`)
- Boas práticas de **segurança**: nenhuma credencial fica exposta no código-fonte
- Organização de projeto pensada para escalar (novos fluxos, novas páginas)

---

## 🛠️ Stack

| Ferramenta | Uso |
|---|---|
| [Cypress](https://www.cypress.io/) | Framework de testes E2E |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática do código de automação |
| Node.js / npm | Gerenciamento de dependências |

---

## 📁 Estrutura do projeto

```
cypress/
├── e2e/
│   └── login/
│       └── login.cy.ts          # Especificações (testes) de login
├── page/
│   └── login/
│       └── login.ts             # Page Object da tela de login
├── support/
│   ├── commands.ts               # Comandos customizados reutilizáveis
│   ├── e2e.ts                    # Arquivo de suporte global do Cypress
│   └── index.d.ts                # Tipagem dos comandos customizados
├── fixtures/                     # Massas de dados estáticas (quando necessário)
cypress.config.ts                 # Configuração do Cypress (baseUrl, plugins)
cypress.env.json                  # Credenciais e dados sensíveis (NÃO versionado)
tsconfig.json                     # Configuração do compilador TypeScript
```

---

## 🧩 Arquitetura dos testes

O projeto segue uma separação em três camadas, para manter os testes legíveis e de fácil manutenção:

```
┌─────────────────────┐
│   login.cy.ts        │  → Onde fica o roteiro de testes
│   (spec / teste)     │
└──────────┬───────────┘
           │ chama métodos de
           ▼
┌─────────────────────┐
│   login.ts            │  → Sabe QUAIS são os seletores da tela
│   (Page Object)       │     e traduz ações em comandos na tela
└──────────┬───────────┘
           │ usa
           ▼
┌─────────────────────┐
│   commands.ts          │  → Comandos comandos reutilizáveis
│  (Custom Commands)     │     (preencher campo, clicar botão, etc.)
└─────────────────────┘
```

**Por que essa separação importa:** se um seletor sofrer alguma alteração na aplicação, a correção acontece em um único lugar (na Page Object correspondente), nenhum arquivo de teste precisa ser refatorado.

### Exemplo de uso no teste

```typescript
import { Login } from '../../page/login/login';

describe('Login', () => {
  const login = new Login();

  it('Realizando o login com os dados válidos', () => {
    login.preencherCampoEmail(Cypress.env('SWAG_USERNAME'));
    login.preencherCampoSenha(Cypress.env('SWAG_PASSWORD'));
    login.clicarBotaoLogin('Login');

    cy.url().should('include', '/inventory.html');
  });
});
```

Repare que o teste **não conhece nenhum seletor CSS** — apenas descreve o comportamento esperado, em linguagem próxima da regra de negócio.

---

## 🔒 Segurança de dados sensíveis

Nenhuma credencial de login é exposta no código-fonte ou versionada no Git. Os dados de acesso ficam isolados em `cypress.env.json`, arquivo listado no `.gitignore` e lido em tempo de execução via `Cypress.env()`.

### Como configurar localmente

1. Crie um arquivo `cypress.env.json` na raiz do projeto:

```json
{
  "SWAG_USERNAME": "standard_user",
  "SWAG_PASSWORD": "secret_sauce"
}
```

> 💡 As credenciais acima são as credenciais **públicas de demonstração** do próprio SauceDemo, disponíveis na página inicial da aplicação — não são segredos reais. **Nunca utilize dados sensíveis em projetos reais**.

2. Esse arquivo é ignorado automaticamente pelo Git (veja `.gitignore`) e nunca deve ser commitado.

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18+)

### Instalação

```bash
git clone https://github.com/<seu-usuario>/swaglabs-cypress-e2e.git
cd swaglabs-cypress-e2e
npm install
```

### Configurar credenciais
Crie o arquivo `cypress.env.json` conforme a seção [Segurança de dados sensíveis](#-segurança-de-dados-sensíveis) acima.

### Executar os testes

Modo interativo (interface gráfica do Cypress):
```bash
npx cypress open
```

Modo headless (linha de comando, ideal para CI):
```bash
npx cypress run
```

---

## 🗺️ Roadmap

- [x] Configuração inicial do projeto com TypeScript
- [x] Page Object Model
- [x] Comandos customizados genéricos (preencher campo, clicar botão, etc...)
- [x] Gerenciamento seguro de credenciais via `cypress.env.json`
- [ ] Cobertura de cenários negativos
- [ ] Fluxo de carrinho de compras (adicionar/remover produtos)
- [ ] Fluxo de checkout completo
- [ ] Integração com GitHub Actions (CI)
- [ ] Relatório de execução com Mochawesome

---

## 👤 Autor

Desenvolvido por **Guilherme** — QA Pleno.
