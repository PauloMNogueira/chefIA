import { Router, Request, Response } from 'express';
import { OpenRouterService } from '../services/openRouterService';
import { IngredientsRequest, ApiResponse } from '../types';

const router = Router();

// POST /api/recipes - Endpoint para obter receitas baseadas em ingredientes
router.post('/recipes', async (req: Request<{}, ApiResponse, IngredientsRequest>, res: Response<ApiResponse>) => {
  try {
    const { ingredients } = req.body;

    // Validação básica
    if (!ingredients || typeof ingredients !== 'string' || ingredients.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'O campo "ingredients" é obrigatório e deve ser uma string não vazia'
      });
    }

    // Chamar o serviço OpenRouter
    const recipeContent = await OpenRouterService.getRecipes(ingredients);

    // Retornar apenas o conteúdo da mensagem
    res.json({
      success: true,
      data: JSON.parse(recipeContent)
    });

  } catch (error) {
    console.error('Erro no endpoint /recipes:', error);
    
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    });
  }
});

// GET /api/status - Endpoint para verificar status da API
router.get('/status', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: 'API OpenRouter está funcionando!'
  });
});

export { router as openRouterRouter };

