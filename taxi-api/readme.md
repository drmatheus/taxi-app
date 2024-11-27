# TAXI API

Esta é uma API desenvolvida em **Node.js** com **Express**. Para rodar o projeto, siga as instruções abaixo:

### Variáveis de Ambiente

Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis de ambiente:

```env
DATABASE_URL=YOUR_DATABASE_URL
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
PORT=8080  # Opcional, se não informado, a API rodará na porta 8080
```

## Requisitos

- Node.js instalado.
- Banco de dados PostgreSQL (psql) em funcionamento.

## Passos para Rodar o Projeto

1. Instalar as dependências:

```bash
npm install
```

2. Rodar as migrações do Prisma:

```bash
npx prisma migrate dev

```

3. Popular o banco de dados com dados iniciais:

```bash
npm run seed
```

4. Rodar o servidor:

```bash
npm run dev
```

A API estará disponível em http://localhost:8080 (ou na porta definida por você).

## Testes unitários

Para executar uma bateria de testes initários utilize o comando:

```bash
npm run test
```

# **POST /ride/estimate**

## **Descrição**

Endpoint responsável por calcular os valores de uma viagem com base na origem e destino fornecidos.

---

## **Validações**

- **Origem e destino**: Não podem estar vazios.
- **ID do usuário**: Não pode estar vazio.
- **Origem e destino**: Não podem ser o mesmo endereço.

---

## **Processo**

1. Calcula a rota entre origem e destino utilizando a API Routes do Google Maps.
2. Lista motoristas disponíveis de acordo com a quilometragem mínima que aceitam, com base na tabela de motoristas.

### **Tabela de Motoristas**

| ID  | Nome            | Descrição                                                  | Carro                  | Avaliação | Taxa (R$/km) | Distância Mínima (km) |
| --- | --------------- | ---------------------------------------------------------- | ---------------------- | --------- | ------------ | --------------------- |
| 1   | Homer Simpson   | Motorista amigável com direito a risadas e rosquinhas.     | Plymouth Valiant 1973  | 2/5       | 2.50         | 1                     |
| 2   | Dominic Toretto | Viagem rápida e segura, mas sem tocar na playlist.         | Dodge Charger R/T 1970 | 4/5       | 5.00         | 5                     |
| 3   | James Bond      | Passeio de classe e discrição dignos de um agente secreto. | Aston Martin DB5       | 5/5       | 10.00        | 10                    |

---

## **Retorno**

- **Coordenadas de origem e destino** (latitude e longitude).
- **Distância e duração** do percurso.
- **Lista de motoristas disponíveis**, ordenada do mais barato ao mais caro, contendo:
  - ID e nome do motorista.
  - Descrição do motorista.
  - Carro utilizado.
  - Avaliação (nota e comentário).
  - Valor total da corrida.
- Resposta original da rota retornada pela API do Google Maps.

---

## **Exemplo de Request**

### **Body**

```json
{
  "customer_id": "123",
  "origin": "Rua A, 123",
  "destination": "Rua B, 456"
}
```

## **Exemplo de Response**

### Resposta com sucesso (Status Code 200)

```json
{
  "origin": { "latitude": -23.5505, "longitude": -46.6333 },
  "destination": { "latitude": -23.5629, "longitude": -46.6544 },
  "distance": 5.2,
  "duration": "15 min",
  "options": [
    {
      "id": 1,
      "name": "Homer Simpson",
      "description": "Motorista amigável com direito a risadas e rosquinhas.",
      "vehicle": "Plymouth Valiant 1973",
      "review": { "rating": 2, "comment": "Errou o caminho 3 vezes." },
      "value": 13.0
    },
    {
      "id": 2,
      "name": "Dominic Toretto",
      "description": "Viagem rápida e segura, mas sem tocar na playlist.",
      "vehicle": "Dodge Charger R/T 1970",
      "review": {
        "rating": 4,
        "comment": "Carro incrível, motorista atencioso."
      },
      "value": 26.0
    }
  ],
  "routeResponse": Object
}
```

### Erro - Dados fornecidos são inválidos (Status Code 400)

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "Origem e destino não podem estar vazios."
}
```

---

# **PATCH /ride/confirm**

## **Descrição**

Endpoint responsável por confirmar uma viagem e gravá-la no histórico do usuário.

---

## **Validações**

- **Origem e destino**: Não podem estar vazios.
- **ID do usuário**: Não pode estar vazio.
- **Origem e destino**: Não podem ser o mesmo endereço.
- **Opção de motorista**: Deve ser informada e válida.
- **Quilometragem**: Deve ser válida para o motorista selecionado.

---

## **Processo**

1. Salva os dados da viagem no banco de dados.
2. **Não recalcula** a rota utilizando a API do Google Maps.

---

## **Retorno**

- **Status Code 200**: Operação realizada com sucesso.
- **Status Code 400**: Dados fornecidos são inválidos.
- **Status Code 404**: Motorista não encontrado.
- **Status Code 406**: Quilometragem inválida para o motorista.

---

## **Exemplo de Request**

### **Body**

```json
{
  "customer_id": "123",
  "origin": "Rua A, 123",
  "destination": "Rua B, 456",
  "distance": 5.2,
  "duration": "15 minutos",
  "driver": {
    "id": 1,
    "name": "Homer Simpson"
  },
  "value": 13.0
}
```

## **Exemplo de Response**

### Resposta com sucesso (Status Code 200)

```json
{
  "success": true
}
```

### Erro - Dados fornecidos são inválidos (Status Code 400)

```json
{
  "error_code": "INVALID_DATA",
  "error_description": "Descrição do erro"
}
```

### Erro - Motorista não encontrado (Status Code 404)

```json
{
  "error_code": "DRIVER_NOT_FOUND",
  "error_description": "Motorista não encontrado"
}
```

### Erro - Quilometragem inválida para o motorista (Status Code 406)

```json
{
  "error_code": "INVALID_DISTANCE",
  "error_description": "A quilometragem informada não é válida para o motorista selecionado"
}
```

## GET /ride/{customer_id}?driver_id={id do motorista}

Responsável por listar as viagens realizadas por um determinado usuário.

#### Validações

- **O id do usuário** não pode estar em branco.
- **Se um id de motorista** for informado, ele precisa ser um id válido.

#### Funcionalidade

- Buscará as viagens realizadas pelo usuário, ordenadas da mais recente para a mais antiga.
- Pode receber um query parameter `driver_id` que, se informado, irá filtrar apenas as viagens realizadas pelo usuário com este motorista.

## Exemplo de Request

```http
GET /ride/12345?driver_id=2
```

## **Exemplo de Response**

### Resposta com sucesso (Status Code 200)

```json
{
  "customer_id": "12345",
  "rides": [
    {
      "id": 1,
      "date": "2024-11-25T15:30:00Z",
      "origin": "Rua A, 123",
      "destination": "Rua B, 456",
      "distance": 15.2,
      "duration": "00:25:00",
      "driver": {
        "id": 2,
        "name": "Dominic Toretto"
      },
      "value": 76.0
    },
    {
      "id": 2,
      "date": "2024-11-24T10:15:00Z",
      "origin": "Avenida X, 789",
      "destination": "Avenida Y, 1011",
      "distance": 20.5,
      "duration": "00:30:00",
      "driver": {
        "id": 3,
        "name": "James Bond"
      },
      "value": 105.0
    }
  ]
}
```

### Erro - Motorista inválido (Status Code 400)

```json
{
  "error_code": "INVALID_DRIVER",
  "error_description": "O id do motorista informado é inválido"
}
```

### Erro - Nenhum registro encontrado (Status Code 404)

```json
{
  "error_code": "NO_RIDES_FOUND",
  "error_description": "Nenhuma viagem encontrada para o usuário"
}
```
