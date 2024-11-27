# Taxi App

Um aplicativo para calcular trajetos e estimar o valor de corridas para motoristas cadastrados no banco de dados.

## Tecnologias Utilizadas

### Backend

- **Node.js** com **TypeScript**
- **Prisma** para ORM
- Banco de dados **PostgreSQL**
- API com os seguintes endpoints:
  - `POST /ride/estimate`: Estima o valor de uma corrida.
  - `PATCH /ride/confirm`: Confirma uma corrida.
  - `GET /ride/:customer_id`: Retorna informações de corridas de um cliente.
- Servido na porta **8080** do localhost.

### Frontend

- **React** com **React Router DOM** e **TypeScript**
- Criado com **Vite**
- Rotas disponíveis:
  - **Home**: Página inicial do aplicativo.
  - **History**: Histórico de corridas.
  - **New Ride**: Agendamento de novas corridas.
- Servido na porta **80** do localhost.

## Pré-requisitos

- **Docker** instalado na máquina.
- Um arquivo `.env` na raiz do repositório contendo:

  ```env
  GOOGLE_API_KEY=sua_chave_valida
  ```

## Instruções para Rodar o Projeto

1. **Certifique-se de ter o Docker instalado:**

- Se ainda não tiver o Docker, faça o download e instale-o a partir do [site oficial](https://www.docker.com/).

2. **Configure o arquivo `.env`:**

- Na raiz do repositório, crie um arquivo chamado `.env`.
- Adicione a variável de ambiente abaixo, substituindo `sua_chave_valida` por uma chave válida da Google API:
  ```env
  GOOGLE_API_KEY=sua_chave_valida
  ```

3. **Inicie o projeto usando o Docker:**

- Abra o terminal no diretório do projeto.
- Execute o comando:
  ```bash
  docker-compose up
  ```

4. **Acesse a aplicação:**

- **Backend**: [http://localhost:8080](http://localhost:8080)
- **Frontend**: [http://localhost:80](http://localhost:80)
