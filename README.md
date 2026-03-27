# Quiz System -- NestJS + React + PostgreSQL

Sistema simples de **Quiz de Geografia** construído com:

-   **Backend:** NestJS
-   **Frontend:** React (Vite)
-   **Database:** PostgreSQL
-   **ORM:** Prisma
-   **Containerização:** Docker

O sistema apresenta perguntas como:

> Em qual continente fica o país X?

O utilizador responde e o backend valida a resposta.

------------------------------------------------------------------------

Este README inclui:

* Estrutura atual do projecto
* Explicação do funcionamento completo
* Como instalar e executar
* Execução com Docker
* Explicação de cada ficheiro referenciado na pasta .changed
* Descrição das mudanças importantes do código (controller, service, prisma, frontend, etc.)
* Portas do sistema e fluxo da aplicação

# Estrutura do Projecto

    quiz-system
    │
    ├── backend
    │   ├── src
    │   │   ├── quiz
    │   │   │   ├── quiz.controller.ts
    │   │   │   └── quiz.service.ts
    │   │   │
    │   │   ├── infrastructure/database
    │   │   │   └── prisma.service.ts
    │   │   │
    │   │   └── main.ts
    │   │
    │   ├── prisma
    │   │   └── seed.js
    │   │
    │   ├── Dockerfile
    │   ├── package.json
    │   └── .env
    │
    ├── frontend
    │   ├── src
    │   │   ├── pages
    │   │   │   └── QuizGame.tsx
    │   │   │
    │   │   ├── services
    │   │   │   └── api.ts
    │   │   │
    │   │   └── App.tsx
    │   │
    │   └── Dockerfile
    │
    ├── docker-compose.yml
    │
    └── .changed
        (atalhos para ficheiros modificados)

------------------------------------------------------------------------

# Como Executar o Sistema

## 1 Clonar o projecto

    git clone <repo>
    cd quiz-system

------------------------------------------------------------------------

# Instalar Dependências

## Backend

    cd backend
    npm install

## Frontend

    cd ../frontend
    npm install

------------------------------------------------------------------------

# Configuração da Base de Dados

Arquivo `.env` do backend contém:

    DATABASE_URL="postgresql://quiz:quiz@localhost:5433/quizdb"

------------------------------------------------------------------------

# Criar Base de Dados

Rodar migração:

    npx prisma migrate dev

------------------------------------------------------------------------

# Popular Base de Dados

    npm run seed

Arquivo usado:

`backend/prisma/seed.js`

Exemplo:

``` ts
const quizzes = [
 { countryName: 'Japão', correctContinent: 'Ásia' },
 { countryName: 'Brasil', correctContinent: 'América do Sul' },
 { countryName: 'Alemanha', correctContinent: 'Europa' },
 { countryName: 'Egito', correctContinent: 'África' }
]
```

------------------------------------------------------------------------

# Executar Backend

    cd backend
    npm run start:dev

Servidor inicia:

    http://localhost:3000

------------------------------------------------------------------------

# Executar Frontend

    cd frontend
    npm run dev

Frontend abre:

    http://localhost:5173

------------------------------------------------------------------------

# Executar com Docker

Na raiz:

    docker compose up --build

Serviços:

  Serviço      Porta
  ------------ -------
  PostgreSQL   5433
  Backend      3000
  Frontend     5173

------------------------------------------------------------------------

# Fluxo de Funcionamento

    Frontend (React)
          ↓
    API REST (NestJS)
          ↓
    Prisma ORM
          ↓
    PostgreSQL

Fluxo:

1 Frontend pede quizzes\
2 Backend consulta base de dados\
3 Backend retorna lista de perguntas\
4 Utilizador responde\
5 Backend valida resposta

------------------------------------------------------------------------

# Explicação dos Ficheiros Modificados (.changed)

A pasta `.changed` contém **atalhos (.lnk)** para ficheiros principais
modificados.

Lista de ficheiros importantes:

    .changed/
       .env.lnk
       api.ts.lnk
       App.tsx.lnk
       docker-compose.yml.lnk
       Dockerfile.lnk
       main.ts.lnk
       package.json.lnk
       prisma.service.ts.lnk
       quiz.controller.ts.lnk
       quiz.service.ts.lnk
       QuizGame.tsx.lnk
       seed.js.lnk
       tsconfig.build.json.lnk
       PORTAS.txt.lnk

Esses atalhos apontam para os ficheiros reais dentro do projecto.

------------------------------------------------------------------------

# Backend

## main.ts

Inicializa aplicação NestJS e ativa CORS para o frontend.

``` ts
const app = await NestFactory.create(AppModule);

app.enableCors({
 origin: 'http://localhost:5173'
});

await app.listen(3000);
```

------------------------------------------------------------------------

## quiz.controller.ts

Define os endpoints da API.

Endpoints:

    GET /quizzes
    POST /quizzes/:id/answer

Função principal:

``` ts
@Get()
async getQuizzes() {
 return this.quizService.getAllQuizzes();
}
```

------------------------------------------------------------------------

## quiz.service.ts

Responsável pela lógica de negócio.

Consulta quizzes diretamente na base de dados usando Prisma.

``` ts
async getAllQuizzes() {
 return this.prisma.quiz.findMany();
}
```

------------------------------------------------------------------------

## prisma.service.ts

Gerencia conexão com o banco.

``` ts
export class PrismaService extends PrismaClient implements OnModuleInit {
 async onModuleInit() {
   await this.$connect();
 }
}
```

------------------------------------------------------------------------

# Frontend

## api.ts

Cliente HTTP usando Axios.

``` ts
export const api = axios.create({
 baseURL: "http://localhost:3000"
});
```

------------------------------------------------------------------------

## App.tsx

Componente raiz da aplicação.

Função principal:

-   Criar ou recuperar **userId único**
-   Guardar no `localStorage`

``` ts
const id = crypto.randomUUID();
localStorage.setItem('quiz-system-user-id', id);
```

------------------------------------------------------------------------

## QuizGame.tsx

Página principal do jogo.

Busca quizzes do backend:

``` ts
api.get("/quizzes")
```

Estrutura de dados recebida:

``` ts
interface Quiz {
 id: string
 countryName: string
 correctContinent: string
}
```

------------------------------------------------------------------------

# Docker

## backend/Dockerfile

Cria container da API NestJS.

Passos:

1 Instala dependências\
2 Compila TypeScript\
3 Gera cliente Prisma\
4 Expõe porta 3000

------------------------------------------------------------------------

## frontend/Dockerfile

Compila aplicação React.

Executa:

    npm run build
    npm run preview

Expõe porta:

    5173

------------------------------------------------------------------------

# docker-compose.yml

Cria container PostgreSQL.

Configuração:

    POSTGRES_USER=quiz
    POSTGRES_PASSWORD=quiz
    POSTGRES_DB=quizdb

------------------------------------------------------------------------

# Portas do Sistema

  Serviço      Porta
  ------------ -------
  Frontend     5173
  Backend      3000
  PostgreSQL   5433

------------------------------------------------------------------------

# Possíveis Melhorias

-   Sistema de pontuação XP
-   Ranking de jogadores
-   Timer por pergunta
-   UI melhorada
-   Multiplayer

------------------------------------------------------------------------

# Autor
Josemar Benvindo Pedro
Email: josemarbemvindo@hotmail.com

Projeto demonstrando integração:
-   React
-   NestJS
-   PostgreSQL
-   Prisma
-   Docker
