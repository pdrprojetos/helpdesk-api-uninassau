// src/models/ticketModel.js
const TicketModel = {
    definicao: {
        id: "integer",
        titulo: "string",
        descricao: "string",
        setor: "string",
        prioridade: "string",
        status: "string",
        data_criacao: "timestamp"
    },
    validarEstrutura: (ticketData) => {
        const { titulo, descricao, setor } = ticketData;
        if (!titulo || !descricao || !setor) {
            return false;
        }
        return true;
    }
};

module.exports = TicketModel;