# Popular Movies - Teste Frontend

Projeto criando para listar os filmes mais populares do dia, consultando a api [themoviedb](https://developer.themoviedb.org/docs) usando diversas ferramentas e bibliotecas.

- [NextJs](https://nextjs.org/)
- [RadixUI](https://www.radix-ui.com/) / [Chadcn-UI](https://ui.shadcn.com/)
- [Redux](https://redux.js.org/)
- [Cypress](https://www.cypress.io/)

## Instalação

Clone o projeto para sua maquina e instale as dependências com npm, yarn ou pnpm.

```bash
  git clone https://github.com/joaocruz123/the-movie-popular.git

  cd the-movie-popular

  npm install
```

## Variáveis de Ambiente

O projeto possui um .env de exemplo que pode ser usado para facilitar. Basta renomear o arquivo .env.example para .env.

```bash
  cp .env.example .env
```

Para a ultilização da api themoviedb é necessario adicionar ao projeto as chaves de acessos disponibilizadas pelo serviço. As chaves são obtidas em https://www.themoviedb.org/settings/api após realização de cadastro.

Em seguida basta adicionar as suas chaves de acesso para acessar a api nas variaveis `NEXT_PUBLIC_TMDB_API_KEY` e `NEXT_PUBLIC_TMDB_READ_KEY` no arquivo .env como no exemplo:

```bash
NEXT_PUBLIC_TMDB_API_KEY="chave de acesso de api"
NEXT_PUBLIC_TMDB_READ_KEY="token para acesso aos endpoints"
NEXT_PUBLIC_API_URL="https://api.themoviedb.org/3/"
```

## Iniciando Projeto

Para iniciar o projeto basta um dos seguintes comandos:

```bash
  npm run dev

  npm run start
```

## Testes e2e

O projeto possui alguns testes e2e criados com auxilio da ferramenta [cypress](https://www.cypress.io/). Com o projeto rodando localmente basta execultar o comando para ter acesso aos testes:

```bash
  npm run cypress:open
```

Em seguida basta selecionar a modalidade e2e, o navegador que deseja rodar e o teste que pretende execultar.
