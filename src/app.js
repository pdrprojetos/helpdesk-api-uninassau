// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO ADICIONAL PARA FUNCIONAR NA VERCEL (SERVERLESS)
// Força o Swagger a buscar os arquivos de interface de um CDN público
const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
    ]
};

// ROTA DA DOCUMENTAÇÃO SWAGGER (Atualizada com as opções)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Rota base de teste
app.get('/', (req, res) => {
    res.status(200).json({ 
        mensagem: "Helpdesk API rodando perfeitamente!",
        documentacao: "/api-docs" 
    });
});

// Vinculando as rotas do projeto
app.use('/api', ticketRoutes);

// Inicialização do Servidor Local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT} 🚀`);
        console.log(`Documentação da API disponível em: http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app;