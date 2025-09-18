# Exemplos de Uso da API

## 1. Testando com cURL

### Health Check
```bash
curl -X GET http://localhost:3000/health
```

### Status da API
```bash
curl -X GET http://localhost:3000/api/status
```

### Obter Receitas - Exemplo 1
```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"ingredients": "Olá, eu tenho aqui cerveja, 1kg de fraldinha e arroz."}'
```

### Obter Receitas - Exemplo 2
```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"ingredients": "Tenho frango, batata, cebola e tomate. O que posso fazer?"}'
```

### Obter Receitas - Exemplo 3
```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Content-Type: application/json" \
  -d '{"ingredients": "Ingredientes disponíveis: ovos, leite, farinha de trigo e açúcar."}'
```

## 2. Testando com JavaScript (Frontend)

```javascript
// Função para obter receitas
async function getRecipes(ingredients) {
  try {
    const response = await fetch('http://localhost:3000/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients })
    });

    const result = await response.json();
    
    if (result.success) {
      // Parse do JSON retornado
      const recipeData = JSON.parse(result.data);
      console.log('Mensagem:', recipeData.message);
      console.log('Ingredientes:', recipeData.ingredients);
      console.log('Receitas:', recipeData.recipes);
      return recipeData;
    } else {
      console.error('Erro:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Exemplo de uso
getRecipes('Tenho frango, arroz e legumes. Que receita posso fazer?');
```

## 3. Testando com Flutter/Dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class RecipeService {
  static const String baseUrl = 'http://localhost:3000';

  static Future<Map<String, dynamic>?> getRecipes(String ingredients) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/api/recipes'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'ingredients': ingredients}),
      );

      if (response.statusCode == 200) {
        final result = jsonDecode(response.body);
        
        if (result['success']) {
          // Parse do JSON retornado
          final recipeData = jsonDecode(result['data']);
          return recipeData;
        } else {
          print('Erro: ${result['error']}');
          return null;
        }
      } else {
        print('Erro HTTP: ${response.statusCode}');
        return null;
      }
    } catch (error) {
      print('Erro na requisição: $error');
      return null;
    }
  }
}

// Exemplo de uso em um Widget Flutter
class RecipeWidget extends StatefulWidget {
  @override
  _RecipeWidgetState createState() => _RecipeWidgetState();
}

class _RecipeWidgetState extends State<RecipeWidget> {
  Map<String, dynamic>? recipeData;
  bool isLoading = false;

  Future<void> fetchRecipes(String ingredients) async {
    setState(() {
      isLoading = true;
    });

    final data = await RecipeService.getRecipes(ingredients);
    
    setState(() {
      recipeData = data;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () => fetchRecipes('Frango, arroz e legumes'),
          child: Text('Buscar Receitas'),
        ),
        if (isLoading) CircularProgressIndicator(),
        if (recipeData != null) ...[
          Text('Mensagem: ${recipeData!['message']}'),
          Text('Ingredientes: ${recipeData!['ingredients'].join(', ')}'),
          ...recipeData!['recipes'].map<Widget>((recipe) => 
            Card(
              child: ListTile(
                title: Text(recipe['title']),
                subtitle: Text(recipe['description']),
              ),
            ),
          ).toList(),
        ],
      ],
    );
  }
}
```

## 4. Testando com Python

```python
import requests
import json

def get_recipes(ingredients):
    url = 'http://localhost:3000/api/recipes'
    headers = {'Content-Type': 'application/json'}
    data = {'ingredients': ingredients}
    
    try:
        response = requests.post(url, headers=headers, json=data)
        result = response.json()
        
        if result['success']:
            recipe_data = json.loads(result['data'])
            print(f"Mensagem: {recipe_data['message']}")
            print(f"Ingredientes: {recipe_data['ingredients']}")
            print("Receitas:")
            for recipe in recipe_data['recipes']:
                print(f"- {recipe['title']}")
                print(f"  Ingredientes extras: {recipe['extra_ingredients']}")
                print(f"  Descrição: {recipe['description']}")
                print()
            return recipe_data
        else:
            print(f"Erro: {result['error']}")
            return None
    except Exception as error:
        print(f"Erro na requisição: {error}")
        return None

# Exemplo de uso
get_recipes('Tenho carne, batata e cebola. O que posso cozinhar?')
```

## 5. Respostas Esperadas

### Resposta de Sucesso
```json
{
  "success": true,
  "data": "{\"message\":\"Perfeito, encontrei essas receitas que podemos fazer\",\"ingredients\":[\"cerveja\",\"1kg de fraldinha\",\"arroz\"],\"recipes\":[{\"title\":\"Carne de Panela com Cerveja e Arroz\",\"extra_ingredients\":[\"cebola\",\"alho\",\"tomate\",\"azeite\",\"sal\",\"pimenta\"],\"description\":\"1. Corte a fraldinha em pedaços médios e tempere com sal e pimenta...\"},{\"title\":\"Arroz Cremoso de Cerveja com Fraldinha Grelhada\",\"extra_ingredients\":[\"cebola\",\"alho\",\"creme de leite\",\"queijo ralado\"],\"description\":\"1. Tempere a fraldinha com sal e pimenta...\"}]}"
}
```

### Resposta de Erro (Campo obrigatório)
```json
{
  "success": false,
  "error": "O campo \"ingredients\" é obrigatório e deve ser uma string não vazia"
}
```

### Resposta de Erro (API Externa)
```json
{
  "success": false,
  "error": "Erro na API: 401 - Unauthorized"
}
```

## 6. Estrutura do JSON de Receitas

O campo `data` contém um JSON string que, quando parseado, tem a seguinte estrutura:

```json
{
  "message": "Mensagem de boas-vindas do chef",
  "ingredients": ["ingrediente1", "ingrediente2", "ingrediente3"],
  "recipes": [
    {
      "title": "Nome da Receita",
      "extra_ingredients": ["ingrediente_extra1", "ingrediente_extra2"],
      "description": "Passo a passo da receita..."
    }
  ]
}
```

