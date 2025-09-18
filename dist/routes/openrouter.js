"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openRouterRouter = void 0;
const express_1 = require("express");
const openRouterService_1 = require("../services/openRouterService");
const router = (0, express_1.Router)();
exports.openRouterRouter = router;
// POST /api/recipes - Endpoint para obter receitas baseadas em ingredientes
router.post('/recipes', async (req, res) => {
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
        const recipeContent = await openRouterService_1.OpenRouterService.getRecipes(ingredients);
        // Retornar apenas o conteúdo da mensagem
        res.json({
            success: true,
            data: recipeContent
        });
    }
    catch (error) {
        console.error('Erro no endpoint /recipes:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Erro interno do servidor'
        });
    }
});
// GET /api/status - Endpoint para verificar status da API
router.get('/status', (req, res) => {
    res.json({
        success: true,
        data: 'API OpenRouter está funcionando!'
    });
});
//# sourceMappingURL=openrouter.js.map