# 🚗 MotorsHub App: Gerenciamento de Marcas e Modelos de Carros

## ✨ Visão Geral do Projeto

O **MotorsHub App** é um aplicativo mobile simples e intuitivo desenvolvido como parte de um desafio técnico, focado em demonstrar a aderência a padrões de desenvolvimento modernos e boas práticas de arquitetura. Ele permite aos usuários explorar o mundo dos carros de forma organizada, oferecendo funcionalidades de autenticação e navegação por marcas e seus respectivos modelos.

Construído com tecnologias robustas e amplamente utilizadas no ecossistema React Native, o MotorsHub é um exemplo de aplicação escalável e de fácil manutenção.

## 🚀 Principais Funcionalidades

*   **Autenticação Segura (SignIn)**:
    *   Tela de login para acesso restrito.
    *   Gerenciamento de estado de autenticação com **Context API**.
    *   Persistência de dados de login utilizando **Async Storage**.
    *   Formulário de login otimizado com **React Hook Form**.
*   **Listagem de Marcas (Home)**:
    *   Exibição do nome do usuário logado.
    *   Lista dinâmica de marcas de carros, obtidas de uma API externa.
    *   Botão de `Sair` para deslogar e retornar à tela de login.
*   **Listagem de Modelos (Model)**:
    *   Ao selecionar uma marca na tela Home, o usuário é direcionado para a tela Model.
    *   Exibe uma lista detalhada dos modelos de carros associados à marca escolhida.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias e padrões:

*   **Expo**: Ambiente de desenvolvimento para React Native, otimizando o desenvolvimento cross-platform.
*   **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática, garantindo maior segurança e manutenibilidade do código.
*   **React Navigation (Expo Router)**: Sistema de navegação robusto e flexível para gerenciar as rotas e telas do aplicativo.
*   **Context API**: Para um gerenciamento de estado de autenticação global e eficiente.
*   **Async Storage**: Para persistir dados do usuário localmente no dispositivo.
*   **React Hook Form**: Biblioteca para gerenciar formulários de forma performática e simples.
*   **Fetch API**: Para realizar requisições HTTP às APIs externas.
*   **React Native Reanimated**: Para animações fluidas e de alta performance.

## 🏗️ Estrutura do Projeto

A organização do projeto segue a estrutura padrão do Expo Router, promovendo a separação clara de responsabilidades:

```
.
├── app/                  # Telas e navegação (Expo Router)
│   ├── _layout.tsx       # Layout principal e AuthGuard
│   ├── home/             # Tela de listagem de marcas
│   ├── model/            # Tela de listagem de modelos por marca
│   └── signin/           # Tela de autenticação
├── components/           # Componentes UI reutilizáveis
├── hooks/                # Hooks customizados
├── providers/            # Provedores de contexto (ex: AuthProvider)
├── services/             # Lógica de acesso a APIs
├── constants/            # Constantes globais (cores, temas, etc.)
└── shared/               # Utilitários e tipos globais (não há arquivos explícitos nesta demo)
```

## 🌐 APIs Consumidas

O aplicativo interage com as seguintes APIs públicas:

*   **API de Login**: Para autenticar usuários com credenciais de teste.
*   **API FIPE (parallelum.com.br)**: Para obter dados atualizados de marcas e modelos de veículos.

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

*   Node.js (versão LTS recomendada)
*   npm ou Yarn
*   Expo CLI (`npm install -g expo-cli`)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/igorbrandao18/motorshub-app.git
    cd motorshub-app
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```

### Executando o Aplicativo

1.  Inicie o servidor de desenvolvimento do Expo:
    ```bash
    npx expo start
    ```
2.  Use o aplicativo Expo Go no seu smartphone (Android ou iOS) para escanear o QR Code exibido no terminal, ou execute em um simulador/emulador.

### Credenciais de Login (Teste)

Para acessar o aplicativo, utilize as seguintes credenciais:

*   **Usuário**: `teste`
*   **Senha**: `123`

## 👨‍💻 Contato

Para dúvidas ou sugestões, entre em contato.
