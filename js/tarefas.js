// Lista de tarefas: adicionar, concluir e remover, com localStorage e delegação de eventos.
const CHAVE = "tarefas";

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvar(tarefas) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(tarefas));
  } catch {
    // sem armazenamento: a lista funciona, mas não será lembrada
  }
}

function criarItem(tarefa) {
  const item = document.createElement("li");
  item.className = tarefa.feita ? "tarefa tarefa--feita" : "tarefa";
  item.dataset.id = String(tarefa.id);

  const caixa = document.createElement("input");
  caixa.type = "checkbox";
  caixa.checked = tarefa.feita;
  caixa.id = `tarefa-${tarefa.id}`;
  caixa.dataset.acao = "alternar";

  const texto = document.createElement("label");
  texto.className = "tarefa__texto";
  texto.htmlFor = caixa.id;
  texto.textContent = tarefa.texto; // textContent: nunca interpreta HTML digitado pelo usuário

  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "tarefa__remover";
  remover.dataset.acao = "remover";
  remover.textContent = "Remover";
  remover.setAttribute("aria-label", `Remover a tarefa ${tarefa.texto}`);

  item.append(caixa, texto, remover);
  return item;
}

function ligarFormulario(form, estado, desenhar) {
  const campo = form.elements.tarefa;
  const erro = document.getElementById("erro-tarefa");

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const texto = campo.value.trim();
    if (texto === "") {
      erro.textContent = "Digite o nome da tarefa.";
      erro.hidden = false;
      campo.setAttribute("aria-invalid", "true");
      campo.focus();
      return;
    }
    erro.hidden = true;
    campo.removeAttribute("aria-invalid");
    estado.tarefas = [...estado.tarefas, { id: Date.now(), texto, feita: false }];
    salvar(estado.tarefas);
    desenhar();
    form.reset();
    campo.focus();
  });
}

// Um único ouvinte na lista atende todos os itens (inclusive os criados depois).
function ligarLista(lista, estado, desenhar) {
  lista.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("[data-acao]");
    const item = evento.target.closest("[data-id]");
    if (!alvo || !item) {
      return;
    }
    const id = Number(item.dataset.id);
    if (alvo.dataset.acao === "remover") {
      estado.tarefas = estado.tarefas.filter((t) => t.id !== id);
    } else if (alvo.dataset.acao === "alternar") {
      estado.tarefas = estado.tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t));
    }
    salvar(estado.tarefas);
    desenhar();
  });
}

export function iniciarTarefas() {
  const form = document.querySelector("[data-tarefas-form]");
  const lista = document.querySelector("[data-tarefas-lista]");
  if (!form || !lista) {
    return;
  }
  const vazio = document.querySelector("[data-tarefas-vazio]");
  const estado = { tarefas: carregar() };

  const desenhar = () => {
    lista.replaceChildren(...estado.tarefas.map(criarItem));
    if (vazio) {
      vazio.hidden = estado.tarefas.length > 0;
    }
  };

  ligarFormulario(form, estado, desenhar);
  ligarLista(lista, estado, desenhar);
  desenhar();
}
