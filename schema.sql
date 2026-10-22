-- Banco SQLite gerado pelo Tutor Front
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS mensagens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    mensagem TEXT,
    criado_em TEXT
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    senha_hash TEXT,
    criado_em TEXT
);

CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tarefa TEXT,
    criado_em TEXT,
    concluida INTEGER CHECK (concluida IN (0, 1)),
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS tabela2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tarefa_id INTEGER,
    descricao TEXT,
    FOREIGN KEY (tarefa_id) REFERENCES tarefas (id)
);
