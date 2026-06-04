# Helpdesk API — UNINASSAU

API RESTful completa desenvolvida para a avaliação AV2 da disciplina de **Back-end Frameworks (2026.1)** no Centro Universitário Maurício de Nassau (UNINASSAU — Graças). O projeto simula um produto real de mercado voltado para a gestão e rastreabilidade de chamados de suporte de TI.

## Sobre o Projeto

O objetivo principal desta API é resolver uma dor crítica em ambientes corporativos: a centralização e o controle de incidentes de TI. A solução elimina a perda de informações decorrente de chamados abertos por canais informais (como WhatsApp ou e-mail), garantindo auditoria e governança através de regras rígidas de transição de status.

---

## Tecnologias Utilizadas

O ecossistema do projeto foi selecionado com foco em alta disponibilidade, performance e baixo custo de infraestrutura:

* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Banco de Dados:** Supabase (PostgreSQL)
* **Documentação:** Swagger UI
* **Cloud/Deploy:** Vercel

---

## Arquitetura do Sistema (Padrão MVC)

A API foi rigorosamente estruturada seguindo o padrão de arquitetura **MVC (Model-View-Controller)** para garantir separação de responsabilidades, manutenibilidade e código limpo:


helpdesk-api/
├── src/
│   ├── config/        # Conexão com o Supabase Client
│   ├── controllers/   # Regras de negócio e inteligência dos endpoints
│   ├── models/        # Estrutura e contrato de dados (tabela do banco)
│   ├── routes/        # Mapeamento de rotas e métodos HTTP
│   ├── swagger.json   # Configuração da documentação interativa
│   └── app.js         # Inicialização do servidor e middlewares
├── vercel.json        # Configurações de deploy Serverless
└── README.md          # Documentação do repositório

---

Nota: No contexto desta API RESTful isolada, a camada View é representada pelas respostas estruturadas em formato JSON e pela interface do Swagger.

⚙️ Regras de Negócio Implementadas
Para garantir a integridade dos dados e o fluxo correto do atendimento, a API conta com validações mandatórias:

Validação de Campos: Não é permitido abrir chamados com titulo, descricao ou setor vazios (Retorna HTTP 400 Bad Request).

Transição Rigorosa de Status: O fluxo de vida de um ticket foi blindado para evitar saltos de etapas ou fechamentos indevidos:

Todo ticket nasce obrigatoriamente com o status Aberto.

Um ticket em status Aberto só pode avançar para Em Análise.

Um ticket em status Em Análise só pode avançar para Resolvido.

Tickets com status Resolvido tornam-se imutáveis e não podem sofrer novas alterações.

Qualquer tentativa de violação desse fluxo dispara uma exceção tratada com try/catch e retorna erro descritivo ao cliente.

🔧 Como Rodar o Projeto Localmente
Pré-requisitos
Node.js instalado (v18 ou superior)

Conta configurada no Supabase

Passo a Passo
Clone o repositório:

Bash
git clone [https://github.com/pdrprojetos/helpdesk-api-uninassau.git](https://github.com/pdrprojetos/helpdesk-api-uninassau.git)
cd helpdesk-api-uninassau
Instale as dependências:

Bash
npm install
Configure as variables de ambiente criando um arquivo .env na raiz do projeto:

Plaintext
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_anon_public_do_supabase
Inicie o servidor em modo de desenvolvimento:

Bash
npm run dev
O servidor iniciará localmente na porta 3000.

🌐 Links do Projeto (Apresentação Oficial)
Documentação Swagger (Produção): https://helpdesk-api-uninassau.vercel.app/api-docs

Endpoint Base da API: https://helpdesk-api-uninassau.vercel.app/api

👥 Desenvolvedores (3º Período — ADS)
Pedro Augusto Nogueira Firmino de Oliveira
Antão Rodrigues da Silva Neto
Victor Eduardo Silva dos Santos
Matheus Silva dos Santos