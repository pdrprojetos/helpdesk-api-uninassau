// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'); // Importa o Swagger UI
const swaggerDocument = require('./swagger.json'); // Importa o nosso JSON do passo anterior
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ROTA DA DOCUMENTAÇÃO SWAGGER (Ficará visível para a banca)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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