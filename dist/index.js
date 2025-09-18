"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openrouter_1 = require("./routes/openrouter");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api', openrouter_1.openRouterRouter);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API está funcionando!' });
});
// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map