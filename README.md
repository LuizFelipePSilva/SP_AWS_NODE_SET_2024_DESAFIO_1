
# Projeto Compasscar - Sistema de Locação de Carros

## Descrição
Este projeto é uma API backend para um sistema de gerenciamento de **locação de carros**, permitindo a criação, leitura, atualização e exclusão de informações sobre veículos. Ele foi construído usando **Node.js** e **Express**, e é projetado para ser **escalável**, **fácil de usar** e **seguro**.

## Instalação

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- **Node.js** v20.15.1
- **NPM** v10.8.3
- **Express** v4.21.0
- **Sequelize** v6.37.3
- **SQLite3** v5.1.7
- **Nodemon** v3.1.7

### Passo a Passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/LuizFelipePSilva/SP_AWS_NODE_SET_2024_DESAFIO_1
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd backend
   ```

3. Instale as dependências:
   ```bash
   npm install 
   ```

4. Rode o projeto:
   ```bash
   npm run dev
   ```

## Como Usar

A API possui os seguintes endpoints para gerenciar os **carros**:

### 1. Criar Carro
```http
POST /api/v1/cars
```
**Corpo da requisição (JSON):**
```json
{
 "brand": "Volkswagen",
 "model": "GOL G5",
 "year": 2021,
 "items": ["Ar-condicionado", "Direção Hidráulica", "Trava Elétrica"]
}
```
**Corpo da resposta (JSON):**
```json
{ "id": 1 }
```

### 2. Ler Carros
```http
GET /api/v1/cars
```
**Corpo da resposta (JSON):**
```json
{
 "count": 8,
 "pages": 4,
 "data": [
  {
   "id": 1,
   "brand": "Volkswagen",
   "model": "GOL",
   "year": 2015
  },
  {
   "id": 2,
   "brand": "Chevrolet",
   "model": "Onix",
   "year": 2025
  }
 ]
}
```

### 3. Ler Carro por ID
```http
GET /api/v1/cars/{id}
```
**Corpo da resposta (JSON):**
```json
{
 "id": 1,
 "brand": "Volkswagen",
 "model": "GOL",
 "year": 2015,
 "items": [
  "Ar-condicionado",
  "Direção Hidráulica",
  "Trava Elétrica"
 ]
}
```

### 4. Atualizar Carro
```http
PATCH /api/v1/cars/{id}
```
**Corpo da requisição (JSON):**
```json
{
 "brand": "Volkswagen",
 "model": "GOL",
 "year": 2015,
 "items": [
  "Ar-condicionado",
  "Direção Hidráulica",
  "Trava Elétrica"
 ]
}
```
**Corpo da resposta (JSON):**
```json
{
 "message": "Carro atualizado com sucesso."
}
```

### 5. Excluir Carro
```http
DELETE /api/v1/cars/{id}
```
**Corpo da resposta (JSON):**
```json
{
 "message": "Carro excluído com sucesso."
}
```

## Tecnologias Usadas
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [Express](https://expressjs.com/) - Framework para APIs
- [Sequelize](https://sequelize.org/) - ORM para Node.js
- [SQLite](https://www.sqlite.org/) - Banco de dados SQL leve

## Contribuição
Se você deseja contribuir para este projeto, fique à vontade para abrir uma **issue** ou enviar um **pull request**.

## Contato
Você pode me encontrar em [LinkedIn](https://www.linkedin.com/in/luizfelipepsilva/) ou enviar um email para [LuizFelipePSilva@outlook.com.br](mailto:LuizFelipePSilva@outlook.com.br).
