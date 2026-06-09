```markdown
# HelpDesk API Core - UNINASSAU

API RESTful para gestão de incidentes de TI, desenvolvida como avaliação da disciplina de Back-end Frameworks do curso de Análise e Desenvolvimento de Sistemas (ADS) da UNINASSAU.

Live Demo (Swagger): https://helpdesk-api-uninassau.vercel.app/api-docs

## Arquitetura e Tecnologias

* Padrão MVC (Model-View-Controller)
* Node.js com Express.js
* Supabase (PostgreSQL)
* Vercel (Serverless Deploy)
* Swagger UI (Documentação)

## Regras de Negócio e Segurança

* Máquina de Estados: O fluxo de status é unidirecional e obrigatório (Aberto -> Em Análise -> Resolvido).
* Imutabilidade: Tickets com status "Resolvido" são bloqueados para edição, garantindo histórico para auditoria.
* Validação de Payload: Middlewares interceptam requisições inválidas antes da persistência no banco de dados.
* Tratamento de Erros: Implementação global de blocos try/catch para prevenção de falhas no servidor.

## Endpoints

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/api/tickets` | Lista os chamados registrados. |
| POST | `/api/tickets` | Cria um novo chamado (Status inicial automático: Aberto). |
| PUT | `/api/tickets/:id/status` | Atualiza o status do chamado, respeitando as regras de transição. |
| DELETE | `/api/tickets/:id` | Remove permanentemente um chamado. |

## Como Executar Localmente

1. Clone o repositório:
```bash
git clone [https://github.com/pdrprojetos/helpdesk-api-uninassau.git](https://github.com/pdrprojetos/helpdesk-api-uninassau.git)
cd helpdesk-api-uninassau

```

2. Instale as dependências:

```bash
npm install

```

3. Crie um arquivo `.env` na raiz do projeto com as credenciais do Supabase:

```env
PORT=3000
SUPABASE_URL=sua_url_do_supabase
SUPABASE_KEY=sua_chave_anon_do_supabase

```

4. Inicie o servidor em ambiente de desenvolvimento:

```bash
npm run dev

```

A API estará disponível em `http://localhost:3000`. Acesse `http://localhost:3000/api-docs` para visualizar o Swagger.

## Squad de Desenvolvimento

* Victor Eduardo Silva dos Santos
* Antão Rodrigues da Silva Neto
* José Matheus Silva dos Santos
* Pedro Augusto N. Firmino de Oliveira
* Paulo Sergio

```

```
