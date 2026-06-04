// src/controllers/ticketController.js
const supabase = require('../config/supabaseClient');
const TicketModel = require('../models/ticketModel');

// 1. Criar um novo Ticket (POST)
exports.createTicket = async (req, res) => {
    try {
        const { titulo, descricao, setor, prioridade } = req.body;

        // Validação utilizando o Model (Padrão MVC)
        const estruturaValida = TicketModel.validarEstrutura({ titulo, descricao, setor });
        
        if (!estruturaValida) {
            return res.status(400).json({ 
                erro: "Campos obrigatórios ausentes. Título, descrição e setor devem ser preenchidos." 
            });
        }

        const { data, error } = await supabase
            .from('tickets')
            .insert([{ titulo, descricao, setor, prioridade, status: 'Aberto' }])
            .select();

        if (error) throw error;

        return res.status(201).json({
            mensagem: "Chamado aberto com sucesso! 🛠️",
            ticket: data[0]
        });

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro interno ao criar o chamado.", 
            detalhes: error.message 
        });
    }
};

// 2. Listar todos os Tickets (GET)
exports.getAllTickets = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('tickets')
            .select('*')
            .order('id', { ascending: true });

        if (error) throw error;

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao buscar chamados.", 
            detalhes: error.message 
        });
    }
};

// 3. Atualizar Status do Ticket (PUT) - Regra de Negócio Rigorosa
exports.updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status: novoStatus } = req.body;

        // Buscar o ticket atual no banco para validar a regra de transição
        const { data: ticketAtual, error: fetchError } = await supabase
            .from('tickets')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !ticketAtual) {
            return res.status(404).json({ erro: "Chamado não encontrado." });
        }

        const statusAtual = ticketAtual.status;

        // Impedir alterações se já estiver resolvido
        if (statusAtual === 'Resolvido') {
            return res.status(400).json({ erro: "Chamados resolvidos não podem ser alterados." });
        }

        // Validação do fluxo: Aberto -> Em Análise
        if (statusAtual === 'Aberto' && novoStatus !== 'Em Análise') {
            return res.status(400).json({ erro: "Um chamado em 'Aberto' só pode avançar para 'Em Análise'." });
        }

        // Validação do fluxo: Em Análise -> Resolvido
        if (statusAtual === 'Em Análise' && novoStatus !== 'Resolvido') {
            return res.status(400).json({ erro: "Um chamado 'Em Análise' só pode avançar para 'Resolvido'." });
        }

        // Atualizar no banco caso passe nas validações
        const { data: ticketAtualizado, error: updateError } = await supabase
            .from('tickets')
            .update({ status: novoStatus })
            .eq('id', id)
            .select();

        if (updateError) throw updateError;

        return res.status(200).json({
            mensagem: "Status atualizado com sucesso! 🎉",
            ticket: ticketAtualizado[0]
        });

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao atualizar o status do chamado.", 
            detalhes: error.message 
        });
    }
};

// 4. Deletar um Ticket por ID (DELETE)
exports.deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('tickets')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;

        if (!data || data.length === 0) {
            return res.status(404).json({ erro: "Chamado não encontrado para exclusão." });
        }

        return res.status(200).json({
            mensagem: "Chamado deletado com sucesso! ❌",
            ticketDeletado: data[0]
        });

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao deletar o chamado.", 
            detalhes: error.message 
        });
    }
};