Store Dashboard

Dashboard para gerenciamento de lojas e produtos, desenvolvido com React Native, Expo Router e Zustand, utilizando Mock Service Worker (MSW) para simulação de API.
🚀 Tecnologias Utilizadas

Framework: Expo (~54.0.33)

React: 19.1.0

React Native: 0.81.5

Gerenciamento de Estado: Zustand (^5.0.11) com persistência via AsyncStorage (2.2.0)

Navegação: Expo Router (~6.0.23)

Estilização: Gluestack UI (@gluestack-ui/themed ^1.1.73)

Mock API: Mock Service Worker (^2.12.10)

Qualidade de Código:

    TypeScript: ~5.9.2

    ESLint: ^9.39.4 (com eslint-config-expo ~10.0.0)

    Prettier: ^3.8.1

    Git Hooks: Husky (^8.0.0)

⚙️ Pré-requisitos

    Node.js (v18+)

    Gerenciador de pacotes: npm ou yarn

📦 Instalação

    Clone o repositório:
    Bash

    git clone <url-do-seu-repositorio>
    cd store_dashboard

    Instale as dependências:
    Bash

    npm install

🛠 Comandos Disponíveis

    npm start: Inicia o servidor de desenvolvimento do Expo.

    npm run android: Inicia o app no emulador Android.

    npm run ios: Inicia o app no simulador iOS.

    npm run lint: Verifica erros de sintaxe e padrões de código.

    npm run lint:fix: Corrige automaticamente problemas comuns de linting.

    npm run format: Formata o código utilizando Prettier.

    npm run test: Executa os testes unitários com Jest.

📝 Como funciona o Mock (MSW)

A camada de API é interceptada pelo MSW em ambiente de desenvolvimento. Os dados são manipulados em memória e persistidos localmente via Zustand + AsyncStorage.

    Os arquivos de definição dos endpoints estão em src/mocks/handlers.ts.

    A store global está em src/store/useProductStore.ts.
