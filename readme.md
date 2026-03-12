Store Dashboard

Dashboard para gerenciamento de lojas e produtos, desenvolvido com React Native, Expo Router e Zustand, utilizando Mock Service Worker (MSW) para simulação de API.
🚀 Tecnologias Utilizadas

    Framework: Expo (React Native)

    Gerenciamento de Estado: Zustand (com persistência via AsyncStorage)

    Navegação: Expo Router (File-based routing)

    Mock API: Mock Service Worker (MSW)

    Estilização: Gluestack UI

    Qualidade de Código: ESLint + Prettier + Husky (lint-staged)

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