# Fórum API

API de uma plataforma de Q&A que demonstra a aplicação prática de **Domain-Driven Design (DDD)** com NestJS.

## Tecnologias

![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## Setup e Execução

**Pré-requisitos:** Node.js (v18+), Docker.

1.  **Clone e instale:**

    ```bash
    git clone https://github.com/lucasbarbosaalves/forum-api.git && cd forum-api &&
    npm install
    ```

2.  **Ambiente:**

    ```bash
    cp .env.example .env # Preencha as variáveis
    ```

3.  **Banco de Dados e Migrações:**

    ```bash
    docker-compose up -d
    npx prisma migrate dev
    ```

4.  **Executar:**
    ```bash
    npm run start:dev
    ```
    A API estará disponível em `http://localhost:3333`.

## Testes

```bash
# Rodar testes E2E
npm run test:e2e
```

## API

Importe o arquivo `postman_collection.json` no Postman para testar as rotas da API.
