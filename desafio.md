# Mobile Developer Challenge

## Descrição Geral

O desafio consiste na criação de um simples aplicativo, seguindo os padrões utilizados na empresa ou que serão adotados em projetos futuros.

O aplicativo deve mostrar uma lista de marcas de carro, permitindo acessar uma marca específica e visualizar seus respectivos modelos.

---

## Organização do Projeto

> **Nota:** Este projeto utiliza a **estrutura padrão do Expo Router**, que organiza as rotas e telas por arquivos na pasta `app/`. As responsabilidades são separadas conforme o padrão do Expo:
>
> - `app/`: telas, navegação e contexto global
> - `components/`: componentes reutilizáveis
> - `hooks/`: hooks customizados
> - `services/` ou `api/`: acesso a APIs e storage
> - `constants/`: temas, cores e constantes globais
> - `shared/`: utilitários e tipos globais

A lógica de domínio, dados e apresentação está organizada de forma clara e escalável, aproveitando o roteamento automático e a simplicidade do Expo Router.

---

## Requisitos Obrigatórios

O aplicativo deve apresentar as seguintes telas:

- **SignIn**: Tela de login para acessar as demais telas
- **Home**: Listagem das marcas de carros
- **Model**: Listagem dos modelos de carros ao clicar em uma marca específica

---

## Tecnologias e Padrões Obrigatórios

Utilize obrigatoriamente:

- **Expo**
- **TypeScript**
- **Context API** (para gerenciar dados de login)
- **Async Storage** (para persistência dos dados de login)
- **NativeWind** ou **Styled Components**
- **React Navigation** (livre escolha do tipo de navegação)
- **Fetch API** ou **Axios** (para requisições às APIs)

**Diferencial:**

- Utilizar **React Hook Form** para inputs de login
- Você pode adicionar outras bibliotecas que julgar necessárias
- O estilo do app é livre: seja criativo!

---

## Fluxo do Aplicativo

1. O usuário faz login e é direcionado para a tela **Home**, que lista todas as marcas de carros.
2. Na tela **Home**, exiba também o nome do usuário (do Context) e um botão para sair do app.
3. Ao clicar em uma marca, o usuário é encaminhado para a tela **Model**, que lista todos os modelos de carros da marca escolhida.

---

## APIs

### Login

- **URL:** <https://test-api-y04b.onrender.com/signIn>
- **Método:** POST
- **Body:**
  - `user`: teste
  - `password`: 123
- **Retorno:**
  - Sucesso: Salve os dados retornados do usuário no Async Storage e no Context, e redirecione para a Home.
  - Erro: Mostre a mensagem de erro retornada pela API.

### Listar Marcas

- **URL:** <https://parallelum.com.br/fipe/api/v1/carros/marcas>
- **Método:** GET
- **Retorno:** Lista de marcas (código e nome)

### Listar Modelos da Marca

- **URL:** <https://parallelum.com.br/fipe/api/v1/carros/marcas/{código> da marca}/modelos
  - Exemplo: <https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos>
- **Método:** GET
- **Retorno:** Lista de modelos (código e nome)

---

## Recomendações

- Escreva o código em inglês.

---

## Critérios de Avaliação

- Estrutura, organização e componentização
- Boas práticas de programação

---

## Entrega

- Publique o desafio em um repositório público do GitHub
- Envie o link para o WhatsApp: **49 9 9838-1023**
