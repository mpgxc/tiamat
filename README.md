### Tecnologias

- Typescript
- Express
- Babel
- Prisma
- Husky
- Helmet
- Morgan
- Eslint
- Prettier
- Commitizen
- Lint Staged
- Outros ...

---

## Trabalhando parcialmente sem Docker

### Criando um database de Desenvolvimento

```sh
docker run --restart=always --name postgres -e POSTGRES_DB=NOME_DO_DB -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres
```

### Configurando a conexão com o Databse criado

```sh
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=NOME_DO_DB
POSTGRES_PORT=5432


DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

```

### Rodando a aplicação

```sh
yarn dev
```

### Gerabdo build da aplicação

```sh
yarn build && yarn start
```

---

## Trabalhando com Docker

### Iniciando em Desenvolvimento

```sh
make dev #docker-compose up -d --build
```

### Iniciando em Produção

```sh
make prod #docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```

### Parando Containers

```sh
make down #docker-compose down
```

---

## Como contribuir ?

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ❤️ by **mpgxc**
