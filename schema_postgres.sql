-- Banco PostgreSQL (Supabase) gerado pelo Tutor Front

CREATE TABLE IF NOT EXISTS mensagens (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT,
    mensagem TEXT,
    criado_em TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT,
    senha_hash TEXT,
    criado_em TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    tarefa TEXT,
    criado_em TIMESTAMP,
    concluida BOOLEAN,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS tabela2 (
    id SERIAL PRIMARY KEY,
    tarefa_id INTEGER,
    descricao TEXT,
    FOREIGN KEY (tarefa_id) REFERENCES tarefas (id)
);

-- Segurança: o Supabase também expõe as tabelas por uma API pública (Data API).
-- Com RLS ligado e SEM políticas, essa API pública não enxerga nada.
-- O seu Flask acessa pela conexão direta do banco (usuário postgres), que continua funcionando.
ALTER TABLE mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tabela2 ENABLE ROW LEVEL SECURITY;
