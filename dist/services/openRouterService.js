"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRouterService = void 0;
const axios_1 = __importDefault(require("axios"));
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = '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';
class OpenRouterService {
    static async getRecipes(ingredients) {
        try {
            const requestData = {
                model: '@preset/assistente-chef-de-cozinha',
                messages: [
                    {
                        role: 'user',
                        content: ingredients
                    }
                ],
                response_format: {
                    type: 'json_object'
                }
            };
            const response = await axios_1.default.post(OPENROUTER_API_URL, requestData, {
                headers: {
                    'authorization': `Bearer ${API_KEY}`,
                    'content-type': 'application/json'
                }
            });
            // Extrair apenas o conteúdo da mensagem
            if (response.data.choices && response.data.choices.length > 0) {
                return response.data.choices[0].message.content;
            }
            else {
                throw new Error('Nenhuma resposta encontrada');
            }
        }
        catch (error) {
            console.error('Erro ao chamar OpenRouter API:', error);
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Erro na API: ${error.response?.status} - ${error.response?.statusText}`);
            }
            throw new Error('Erro interno do servidor');
        }
    }
}
exports.OpenRouterService = OpenRouterService;
//# sourceMappingURL=openRouterService.js.map