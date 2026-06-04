// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Define as rotas e associa aos métodos do Controller
router.post('/tickets', ticketController.createTicket); // Criar chamado
router.get('/tickets', ticketController.getAllTickets);   // Listar chamados
router.put('/tickets/:id/status', ticketController.updateTicketStatus); // Nova rota de transição
router.delete('/tickets/:id', ticketController.deleteTicket); // Deletar chamado

module.exports = router;