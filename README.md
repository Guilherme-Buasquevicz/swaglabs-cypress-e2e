# 🧪 SwagLabs Cypress E2E Automation

[![Cypress Tests](https://github.com/Guilherme-Buasquevicz/swaglabs-cypress-e2e/actions/workflows/cypress.yml/badge.svg)](https://github.com/Guilherme-Buasquevicz/swaglabs-cypress-e2e/actions/workflows/cypress.yml)
[![Cypress](https://img.shields.io/badge/Cypress-15.x-17202C?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Suíte de testes automatizados End-to-End (E2E) para a aplicação [SauceDemo (SwagLabs)](https://www.saucedemo.com/), construída com **Cypress + TypeScript**, seguindo o padrão **Page Object Model (POM)**, com pipeline de **integração contínua** via GitHub Actions.

Este projeto faz parte do meu portfólio de QA / automação de testes, com foco em demonstrar boas práticas de arquitetura de testes, organização de código, segurança no manuseio de dados sensíveis e um fluxo de CI real.

---

## 🎯 Objetivo

Além de validar os principais fluxos da aplicação SwagLabs, este repositório foi construído para demonstrar:

- Estruturação de um projeto Cypress do zero, com TypeScript tipado
- Aplicação do padrão **Page Object Model** para separar seletores, ações e testes
- **Component Objects** para elementos compartilhados entre telas (ex: menu lateral)
- Criação de **comandos customizados reutilizáveis e genéricos** (`Cypress.Commands.add`)
- Boas práticas de **segurança**: nenhuma credencial fica exposta no código-fonte
- **Massa de dados dinâmica** com Faker, evitando hardcode de valores artificiais
- **Pipeline de CI** com GitHub Actions, rodando a suíte a cada push/PR
- **Relatórios de execução** navegáveis com Mochawesome
- Organização de projeto pensada para escalar (novos fluxos, novas páginas)

---

## 🛠️ Stack

| Ferramenta | Uso |
|---|---|
| [Cypress](https://www.cypress.io/) | Framework de testes E2E |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática do código de automação |
| [Faker.js](https://fakerjs.dev/) | Geração de massa de dados dinâmica (checkout) |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | Relatórios de execução em HTML |
| [GitHub Actions](https://github.com/features/actions) | Integração contínua (CI) |
| Node.js / npm | Gerenciamento de dependências |

---

## 📁 Estrutura do projeto

```
.github/
└── workflows/
    └── cypress.yml            # Pipeline de CI (roda a suíte a cada push/PR)
cypress/
├── e2e/
│   ├── login.cy.ts            # Testes de login (válido, inválido, logout)
│   ├── produtos.cy.ts         # Testes de listagem, filtros e ordenação
│   └── carrinho.cy.ts         # Fluxo completo: carrinho → checkout → confirmação
├── page/
│   ├── login.ts                # Page Object da tela de login
│   ├── produtos.ts             # Page Object da tela de produtos/inventário
│   ├── carrinho.ts             # Page Object do carrinho e checkout
│   └── components/
│       └── menu.ts             # Component Object do menu lateral (reutilizado entre telas)
├── support/
│   ├── commands.ts             # Comandos customizados reutilizáveis
│   ├── e2e.ts                  # Arquivo de suporte global do Cypress
│   └── index.d.ts              # Tipagem dos comandos customizados
├── fixtures/                   # Massas de dados estáticas (quando necessário)
├── reports/                    # Relatórios Mochawesome gerados (NÃO versionado)
cypress.config.ts               # Configuração do Cypress (baseUrl, reporter, plugins)
cypress.env.json                # Credenciais e dados sensíveis (NÃO versionado)
tsconfig.json                   # Configuração do compilador TypeScript
```

---

## 🧩 Arquitetura dos testes

O projeto segue uma separação em três camadas, para manter os testes legíveis e de fácil manutenção:

```
┌─────────────────────┐
│   *.cy.ts             │  → Orquestra o fluxo do teste (o "roteiro")
│   (spec / teste)     │
└──────────┬───────────┘
           │ chama métodos de
           ▼
┌─────────────────────┐
│   Page / Component     │  → Sabe QUAIS são os seletores da tela
│   Object               │     e traduz ações de negócio em comandos
└──────────┬───────────┘
           │ usa
           ▼
┌─────────────────────┐
│   commands.ts          │  → Comandos genéricos e reutilizáveis
│  (Custom Commands)     │     (preencher campo, clicar, validar rota, etc.)
└─────────────────────┘
```

**Por que essa separação importa:** se um seletor mudar na aplicação, a correção acontece em um único lugar (a Page Object correspondente) — nenhum arquivo de teste precisa ser tocado.

Elementos compartilhados entre telas (como o menu lateral) ficam em **Component Objects** separados, evitando duplicar seletores em várias Page Objects.

### Comandos customizados criados

| Comando | O que faz |
|---|---|
| `cy.preencherCampo(seletor, texto)` | Preenche um campo de input |
| `cy.clicar(seletor, valorEsperado?)` | Clica em um elemento, validando opcionalmente texto/value/aria-label/title antes |
| `cy.selecionarOpcao(seletor, opcao)` | Seleciona uma opção em um `<select>`, com tratamento de re-render assíncrono (React) |
| `cy.validarRota(caminho?)` | Valida a URL atual contra o `baseUrl` configurado |
| `cy.validaTexto(texto)` | Valida que um texto está presente na tela |
| `cy.validarQuantidadeCarrinho(quantidade?)` | Valida o badge de quantidade de itens no carrinho |

### Exemplo de uso no teste

```typescript
import { Login } from '../page/login';

describe('Login', () => {
  const login = new Login();

  it('deve realizar login com sucesso usando credenciais válidas', () => {
    login.fazerLoginValido();
    cy.validarRota('/inventory.html');
  });
});
```

Repare que o teste **não conhece nenhum seletor CSS** — apenas descreve o comportamento esperado, em linguagem próxima da de negócio.

---

## 🔒 Segurança de dados sensíveis

Nenhuma credencial de login é exposta no código-fonte ou versionada no Git.

- **Localmente**: os dados de acesso ficam isolados em `cypress.env.json`, arquivo listado no `.gitignore` e lido em tempo de execução via `Cypress.env()`.
- **No CI**: as credenciais são injetadas via **GitHub Secrets** (`CYPRESS_SWAG_USERNAME` / `CYPRESS_SWAG_PASSWORD`), aproveitando o carregamento automático de variáveis de ambiente prefixadas com `CYPRESS_` — o mesmo código de teste funciona nos dois ambientes, sem nenhuma credencial em texto plano em lugar nenhum.

### Como configurar localmente

1. Crie um arquivo `cypress.env.json` na raiz do projeto:

```json
{
  "SWAG_USERNAME": "standard_user",
  "SWAG_PASSWORD": "secret_sauce"
}
```

> 💡 As credenciais acima são as credenciais **públicas de demonstração** do próprio SauceDemo, disponíveis na página inicial da aplicação — não são segredos reais. A prática de mantê-las fora do versionamento é o que se replicaria em um projeto com credenciais de fato sensíveis.

2. Esse arquivo é ignorado automaticamente pelo Git e nunca deve ser commitado.

---

## 🔄 Integração Contínua (CI)

A cada `push` ou Pull Request na branch `main`, o GitHub Actions:

1. Faz o checkout do código
2. Instala as dependências
3. Roda toda a suíte de testes em modo headless
4. Gera um relatório de execução com **Mochawesome**
5. Publica esse relatório como *artifact* da execução (disponível para download na aba **Actions**, mesmo quando os testes falham)

O badge no topo deste README reflete o status da última execução em tempo real.

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18+)

### Instalação

```bash
git clone https://github.com/Guilherme-Buasquevicz/swaglabs-cypress-e2e.git
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

Modo headless, com geração de relatório Mochawesome (`cypress/reports/report.html`):
```bash
npm run test
```

---

## 🗺️ Roadmap

- [x] Configuração inicial do projeto com TypeScript
- [x] Page Object Model + Component Objects
- [x] Comandos customizados genéricos e documentados
- [x] Gerenciamento seguro de credenciais via `cypress.env.json` / GitHub Secrets
- [x] Cobertura de cenários negativos (login inválido)
- [x] Fluxo de carrinho de compras (adicionar/remover produtos, múltiplos itens)
- [x] Fluxo de checkout completo, com massa de dados via Faker
- [x] Filtros e ordenação de produtos, validados contra o estado real da tela
- [x] Integração com GitHub Actions (CI)
- [x] Relatório de execução com Mochawesome


---

## 👤 Autor

Desenvolvido por **Guilherme buasquevicz** — QA Pleno.