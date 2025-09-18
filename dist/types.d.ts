export interface OpenRouterMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export interface OpenRouterRequest {
    model: string;
    messages: OpenRouterMessage[];
    response_format: {
        type: 'json_object';
    };
}
export interface OpenRouterChoice {
    logprobs: null;
    finish_reason: string;
    native_finish_reason: string;
    index: number;
    message: {
        role: string;
        content: string;
        refusal: null;
        reasoning: null;
    };
}
export interface OpenRouterUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: null;
}
export interface OpenRouterResponse {
    id: string;
    provider: string;
    model: string;
    object: string;
    created: number;
    choices: OpenRouterChoice[];
    usage: OpenRouterUsage;
}
export interface IngredientsRequest {
    ingredients: string;
}
export interface ApiResponse {
    success: boolean;
    data?: string;
    error?: string;
}
//# sourceMappingURL=types.d.ts.map