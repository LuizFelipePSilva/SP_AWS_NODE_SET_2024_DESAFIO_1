# Projeto Compasscar - Sistema de Locação de Carros

## Descrição
O **Compasscar** é uma API backend projetada para gerenciar o sistema de **locação de veículos**, permitindo a criação, leitura, atualização e exclusão (CRUD) de informações sobre carros. O sistema foi construído usando **Node.js** e **Express**, oferecendo uma estrutura **escalável**, **segura** e **fácil de usar**. Este projeto utiliza **SQLite3** como banco de dados e está pronto para ser estendido para outros sistemas de banco de dados.

## Recursos Principais
- Criação, leitura, atualização e exclusão de carros.
- API RESTful com respostas em formato JSON.
- Integração com banco de dados via **Sequelize** (ORM).
- Facilidade de desenvolvimento com **Nodemon** para hot-reloading.


### Pré-requisitos
Antes de começar, você precisa ter instaladas as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/download/) (v20.15.1)
- [NPM](https://www.npmjs.com/get-npm) (v10.8.3)
  
### Dependências
- **SQLite3** (v5.1.7)
- **Express** (v4.21.0)
- **Sequelize** (v6.37.3)
- **Nodemon** (v3.1.7)

### Passo a Passo de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/LuizFelipePSilva/SP_AWS_NODE_SET_2024_DESAFIO_1
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd backend
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install 
   ```

4. Execute o servidor em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

5. O servidor será iniciado em `http://localhost:3333`.

## Como Usar a API

A API oferece os seguintes **endpoints** para gerenciar informações dos carros:

### 1. Criar Carro

- **Endpoint**: `POST /api/v1/cars`
- **Descrição**: Adiciona um novo carro ao sistema.

  
**Exemplo de Requisição (JSON):**
```json
{
  "brand": "Volkswagen",
  "model": "GOL G5",
  "year": 2021,
  "items": ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]
}
```

**Exemplo de Resposta (JSON):**
```json
{ "id": 1 }
```

---

### 2. Listar Todos os Carros

- **Endpoint**: `GET /api/v1/cars`
- **Descrição**: `Retorna a lista de todos os carros cadastrados no sistema.`
- **Pode ser pesquisado por query params:**
- **Query Params**: `page=1&limit=2&brand=vol&model=gol&year=2015`

**Exemplo de Resposta (JSON):**
```json
{
  "count": 8,
  "pages": 4,
  "data": [
    {
      "id": 1,
      "brand": "Volkswagen",
      "model": "GOL",
      "year": 2015,
      "items": ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]
    },
    {
      "id": 2,
      "brand": "Chevrolet",
      "model": "Onix",
      "year": 2025,
      "items": ["Ar-condicionado", "Trava Elétrica"]
    }
  ]
}
```

---

### 3. Consultar Carro por ID

- **Endpoint**: `GET /api/v1/cars/{id}`
- **Descrição**: Retorna os detalhes de um carro específico baseado no ID informado.

**Exemplo de Resposta (JSON):**
```json
{
  "id": 1,
  "brand": "Volkswagen",
  "model": "GOL",
  "year": 2015,
  "items": ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]
}
```

---

### 4. Atualizar Carro

- **Endpoint**: `PATCH /api/v1/cars/{id}`
- **Descrição**: Atualiza as informações de um carro específico.

**Exemplo de Requisição (JSON):**
```json
{
  "brand": "Volkswagen",
  "model": "GOL",
  "year": 2015,
  "items": ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]
}
```

---

### 5. Excluir Carro

- **Endpoint**: `DELETE /api/v1/cars/{id}`
- **Descrição**: Remove um carro do sistema com base no ID informado.


---

## Estrutura do Projeto

```bash
.
├── backend
│   ├── db
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
├── README.md
```

- **db/**: Contém a configuração do banco de dados.
- **models/**: Definição dos modelos de dados (carros).
- **routes/**: Definição dos endpoints da API.
- **server.js**: Arquivo principal que inicializa o servidor.

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript para o backend.
- [Express](https://expressjs.com/) - Framework para a criação de APIs.
- [Sequelize](https://sequelize.org/) - ORM para gerenciamento de banco de dados SQL.
- [SQLite](https://www.sqlite.org/) - Banco de dados SQL leve e embutido.



## Contato
Se você tiver dúvidas ou sugestões, entre em contato através de:

- **LinkedIn**: [Luiz Felipe P. Silva](https://www.linkedin.com/in/luizfelipepsilva/)
- **Email**: [LuizFelipePSilva@outlook.com.br](mailto:LuizFelipePSilva@outlook.com.br)
- **GitHub**: [Luiz Felipe P. Silva] (https://github.com/LuizFelipePSilva)




