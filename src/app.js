// src/app.js (Dentro da pasta src)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Mesma pasta (src)
const ticketRoutes = require('./routes/ticketRoutes'); // Mesma pasta (src/routes)

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração de Assets do Swagger via CDN para a Vercel
const swaggerOptions = {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
    ]
};

// Rota da Documentação
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
        console.log(`Servidor rodando localmente na porta ${PORT} 🚀`);
    });
}

module.exports = app;