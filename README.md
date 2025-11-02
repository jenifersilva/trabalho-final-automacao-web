# Automação de Testes na Camada de Interface (Web) - PGATS

[![Cypress Tests and Report](https://github.com/jenifersilva/trabalho-final-automacao-web/actions/workflows/main.yml/badge.svg)](https://github.com/jenifersilva/trabalho-final-automacao-web/actions/workflows/main.yml)

## Visão Geral

Este repositório contém a suíte de testes automatizados de ponta a ponta (E2E) para o site [Automation Exercise](https://www.automationexercise.com/), desenvolvida com Cypress.

## Estrutura do Projeto

O projeto adota as melhores práticas da comunidade Cypress, incluindo o padrão **Page Object Model (POM)**, para garantir que os testes sejam legíveis, reutilizáveis e fáceis de manter.

```
trabalho-final-automacao-web/
├── cypress/
│   ├── e2e/
│   │   └── specs/                  # Arquivos de teste (.cy.js) organizados por funcionalidade
│   ├── fixtures/                   # Massa de dados estática (ex: JSON com usuários)
│   ├── modules/                    # Módulos que representam as ações da aplicação (POM)
│   └── support/                    # Comandos customizados (commands.js) e configurações
│
├── cypress.config.js               # Arquivo de configuração principal do Cypress
├── package.json                    # Dependências e scripts do projeto
└── README.md                       # Esta documentação
```

### Descrição das Pastas

- **`e2e`**: Contém os arquivos de teste, também conhecidos como "specs". Cada arquivo deve testar uma funcionalidade ou jornada de usuário específica
- **`modules`**: O coração da nossa arquitetura. Cada arquivo `.js` centraliza os seletores de elementos e as ações que podem ser executadas. **Se a UI mudar, as alterações são feitas aqui.**
- **`fixtures`**: Usado para armazenar dados de teste estáticos (massa de dados), como `user-data.json`. Estes dados podem ser carregados nos testes usando `cy.fixture()`.

## Pré-requisitos

- npm (geralmente instalado com o Node.js)

## Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/jenifersilva/trabalho-final-automacao-web.git
    cd trabalho-final-automacao-web
    ```

2.  **Instale as dependências:**
    Este comando irá baixar o Cypress e todas as outras dependências listadas no `package.json`.

    ```bash
    npm install # ou npm i
    ```

## Como Executar os Testes

### Modo Interativo (Recomendado para desenvolvimento)

Este comando abre a interface gráfica do Cypress, onde você pode ver os testes rodando em tempo real, depurar e selecionar testes específicos para executar.

```bash
npm run cy:open
```

### Modo Headless (Para CI/CD e regressão completa)

Este comando executa todos os testes em segundo plano (sem interface gráfica), no navegador Electron por padrão. É ideal para integração contínua ou para rodar a suíte de testes completa.

```bash
npm run cy:run
```

Para executar em um navegador específico (ex: Chrome):

```bash
npm run cy:run:chrome
```

## Relatório de Testes

Após cada alteração na branch `main`, um relatório de teste detalhado em HTML é gerado e publicado automaticamente via GitHub Pages.

- **Acesse o último relatório de testes [aqui](https://jenifersilva.github.io/trabalho-final-automacao-web/)**

O relatório contém o resumo da execução, detalhes de cada teste e, em caso de falhas, screenshots e vídeos para facilitar a depuração.
