// src/models/ticketModel.js

// Contrato de dados do Ticket para documentação e validação estrutural
const TicketModel = {
    definicao: {
        id: "integer (Gerado automaticamente pelo Supabase)",
        titulo: "string (Obrigatório)",
        descricao: "string (Obrigatório)",
        setor: "string (Obrigatório)",
        prioridade: "string (Opcional - Padrão: 'Baixa')",
        status: "string (Aberto -> Em Análise -> Resolvido)",
        data_criacao: "timestamp (Gerada automaticamente)"
    },
    
    // Método auxiliar para garantir que o objeto de requisição possui a estrutura correta
    validarEstrutura: (ticketData) => {
        const { titulo, descricao, setor } = ticketData;
        if (!titulo || !descricao || !setor) {
            return false;
        }
        return true;
    }
};

module.exports = TicketModel;