# API Backend OpenRouter - Chef de Cozinha

Esta é uma API backend desenvolvida em TypeScript que integra com a API do OpenRouter.ai para fornecer receitas culinárias baseadas em ingredientes fornecidos pelo usuário.

## Funcionalidades

- **Integração com OpenRouter.ai**: Utiliza o modelo `@preset/assistente-chef-de-cozinha` para gerar receitas
- **Resposta Limpa**: Retorna apenas o conteúdo da mensagem (JSON) sem metadados da API
- **CORS Habilitado**: Permite requisições de qualquer origem para integração com aplicativos frontend
- **TypeScript**: Código totalmente tipado para maior segurança e manutenibilidade
- **Express.js**: Framework web rápido e minimalista

## Estrutura do Projeto

```
openrouter-api/
├── src/
│   ├── routes/
│   │   └── openrouter.ts      # Rotas da API
│   ├── services/
│   │   └── openRouterService.ts # Serviço para chamadas externas
│   ├── types.ts               # Interfaces TypeScript
│   └── index.ts               # Servidor principal
├── dist/                      # Código compilado
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

1. Clone ou baixe o projeto
2. Instale as dependências:

```bash
npm install
```

3. Compile o projeto TypeScript:

```bash
npm run build
```

4. Execute o servidor:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Scripts Disponíveis

- `npm run build`: Compila o código TypeScript
- `npm start`: Executa o servidor em produção
- `npm run dev`: Executa o servidor em modo desenvolvimento (com ts-node)
- `npm run watch`: Compila o TypeScript em modo watch

## Endpoints da API

### 1. Health Check

**GET** `/health`

Verifica se a API está funcionando.

**Resposta:**
```json
{
  "status": "OK",
  "message": "API está funcionando!"
}
```

### 2. Status da API

**GET** `/api/status`

Verifica o status específico da API OpenRouter.

**Resposta:**
```json
{
  "success": true,
  "data": "API OpenRouter está funcionando!"
}
```

### 3. Obter Receitas (Endpoint Principal)

**POST** `/api/recipes`

Envia ingredientes para o assistente chef e recebe receitas.

**Body da Requisição:**
```json
{
  "ingredients": "Olá, eu tenho aqui cerveja, 1kg de fraldinha e arroz."
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": "{\"message\":\"Perfeito, encontrei essas receitas que podemos fazer\",\"ingredients\":[\"cerveja\",\"1kg de fraldinha\",\"arroz\"],\"recipes\":[{\"title\":\"Carne de Panela com Cerveja e Arroz\",\"extra_ingredients\":[\"cebola\",\"alho\",\"tomate\",\"azeite\",\"sal\",\"pimenta\"],\"description\":\"1. Corte a fraldinha em pedaços médios e tempere com sal e pimenta...\"},{\"title\":\"Arroz Cremoso de Cerveja com Fraldinha Grelhada\",\"extra_ingredients\":[\"cebola\",\"alho\",\"creme de leite\",\"queijo ralado\"],\"description\":\"1. Tempere a fraldinha com sal e pimenta...\"}]}"
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

## Exemplos de Uso

### cURL

```bash
# Testar health check
curl -X GET http://localhost:3000/health

# Obter receitas
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"ingredients": "Olá, eu tenho aqui cerveja, 1kg de fraldinha e arroz."}'
```

### JavaScript/Fetch

```javascript
// Obter receitas
const response = await fetch('http://localhost:3000/api/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ingredients: 'Olá, eu tenho aqui cerveja, 1kg de fraldinha e arroz.'
  })
});

const result = await response.json();
console.log(result.data); // Conteúdo da receita em JSON
```

### Flutter/Dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> getRecipes(String ingredients) async {
  final response = await http.post(
    Uri.parse('http://localhost:3000/api/recipes'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'ingredients': ingredients}),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return data['data']; // Retorna apenas o conteúdo da receita
  } else {
    throw Exception('Erro ao obter receitas');
  }
}
```

## Configuração

### Variáveis de Ambiente

- `PORT`: Porta do servidor (padrão: 3000)

### Chave da API OpenRouter

A chave da API está configurada diretamente no código. Para uso em produção, recomenda-se:

1. Mover a chave para uma variável de ambiente
2. Usar um arquivo `.env` com a biblioteca `dotenv`

Exemplo:
```typescript
const API_KEY = process.env.OPENROUTER_API_KEY || 'sua-chave-aqui';
```

## Integração com Flutter

Esta API foi projetada para ser consumida por aplicativos Flutter. O endpoint principal retorna apenas o conteúdo da mensagem (JSON string) que pode ser facilmente parseado no Flutter:

```dart
// No Flutter, você pode parsear o JSON retornado
final recipeData = jsonDecode(apiResponse);
final message = recipeData['message'];
final recipes = recipeData['recipes'];
```

## Tecnologias Utilizadas

- **TypeScript**: Linguagem principal
- **Express.js**: Framework web
- **Axios**: Cliente HTTP para chamadas à API externa
- **CORS**: Middleware para permitir requisições cross-origin

## Estrutura de Resposta da API OpenRouter

A API retorna apenas o campo `message.content` da resposta original do OpenRouter, que contém um JSON com:

- `message`: Mensagem de boas-vindas
- `ingredients`: Lista dos ingredientes identificados
- `recipes`: Array de receitas com título, ingredientes extras e descrição

## Suporte

Para dúvidas ou problemas, verifique:

1. Se todas as dependências estão instaladas
2. Se a porta 3000 está disponível
3. Se há conectividade com a internet para acessar a API do OpenRouter

## Licença

MIT License

