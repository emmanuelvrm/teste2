# meu-site — back-end

Este projeto virou um **web app**: o site (HTML/CSS/JS) é entregue pelo **Flask** e guarda dados num banco.

## Tabelas
- `mensagens`: id, nome, email, mensagem, criado_em
- `tarefas`: id, tarefa, criado_em, concluida, usuario_id
- `tabela2`: id, tarefa_id, descricao
- `usuarios`: id, nome, email, senha_hash, criado_em

## Rodar no seu computador
```
python -m venv .venv
.venv/bin/pip install -r requirements.txt      # Windows: .venv\Scripts\pip install -r requirements.txt
.venv/bin/python app.py                        # Windows: .venv\Scripts\python app.py
```
Abra http://127.0.0.1:5000 (site) e http://127.0.0.1:5000/painel/ (painel CRUD).

## Arquivos
- `app.py` — rotas do Flask (site + API em `/api/<tabela>`)
- `db.py` — acesso ao banco (CRUD)
- `schema.sql` — criação das tabelas (SQLite); `schema_postgres.sql` — versão PostgreSQL (Supabase)
- `exemplo_crud.py` — seu primeiro CRUD, passo a passo
- `js/api.js` — liga formulários com `data-api="tabela"` à API
- `painel/` — painel para ver e editar os dados
- `render.yaml` / `requirements.txt` — publicação no Render

## Segurança básica
- Senhas nunca são guardadas em texto: use a coluna `senha_hash`.
- `ADMIN_TOKEN` protege o painel e as operações de editar/apagar. Nunca coloque senhas no GitHub.
