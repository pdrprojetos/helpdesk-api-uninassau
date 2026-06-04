// src/controllers/ticketController.js
const supabase = require('../config/supabaseClient');

// 1. Criar um novo Ticket (POST)
exports.createTicket = async (req, res) => {
    try {
        const { titulo, descricao, setor, prioridade } = req.body;

        // VALIDAÇÃO (Regra de negócio obrigatória da AV2)
        if (!titulo || !descricao || !setor) {
            return res.status(400).json({ 
                erro: "Campos obrigatórios ausentes. Título, descrição e setor devem ser preenchidos." 
            });
        }

        // Inserindo no banco de dados Supabase
        const { data, error } = await supabase
            .from('tickets')
            .insert([{ titulo, descricao, setor, prioridade }])
            .select(); // O .select() faz retornar o ticket criado

        if (error) throw error;

        // Resposta de sucesso (HTTP 201: Created)
        return res.status(201).json({
            mensagem: "Chamado aberto com sucesso! 🛠️",
            ticket: data[0]
        });

    } catch (error) {
        // TRATAMENTO DE ERRO (Critério do professor)
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
            .order('data_criacao', { ascending: false });

        if (error) throw error;

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao buscar os chamados.", 
            detalhes: error.message 
        });
    }
};

// 3. Atualizar Status do Ticket com Regra de Transição (PUT)
exports.updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { novoStatus } = req.body;

        const statusPermitidos = ['Aberto', 'Em Análise', 'Resolvido'];

        if (!statusPermitidos.includes(novoStatus)) {
            return res.status(400).json({ erro: "Status inválido." });
        }

        // 1. Buscar o status atual do ticket no banco
        const { data: ticket, error: fetchError } = await supabase
            .from('tickets')
            .select('status')
            .eq('id', id)
            .single();

        if (fetchError || !ticket) {
            return res.status(404).json({ erro: "Chamado não encontrado." });
        }

        const statusAtual = ticket.status;

        // 2. Aplicar a Regra de Negócio de transição rigorosa
        if (statusAtual === 'Aberto' && novoStatus !== 'Em Análise') {
            return res.status(400).json({ 
                erro: `Transição inválida. Um chamado 'Aberto' só pode ir para 'Em Análise'. Status atual: ${statusAtual}` 
            });
        }

        if (statusAtual === 'Em Análise' && novoStatus !== 'Resolvido') {
            return res.status(400).json({ 
                erro: `Transição inválida. Um chamado 'Em Análise' só pode ir para 'Resolvido'. Status atual: ${statusAtual}` 
            });
        }

        if (statusAtual === 'Resolvido') {
            return res.status(400).json({ erro: "Este chamado já foi Resolvido e não pode mais ser alterado." });
        }

        // 3. Se passou pelas validações, atualiza no banco
        const { data, error: updateError } = await supabase
            .from('tickets')
            .update({ status: novoStatus })
            .eq('id', id)
            .select();

        if (updateError) throw updateError;

        return res.status(200).json({
            mensagem: "Status atualizado com sucesso! 🔄",
            ticket: data[0]
        });

    } catch (error) {
        return res.status(500).json({ 
            erro: "Erro ao atualizar o status.", 
            detalhes: error.message 
        });
    }
};