// Tema claro/escuro: respeita o sistema e lembra a escolha do usuário.
const CHAVE = "tema-escolhido";

function lerSalvo() {
  try {
    return localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}

function salvar(valor) {
  try {
    localStorage.setItem(CHAVE, valor);
  } catch {
    // modo privado ou armazenamento bloqueado: o tema só vale nesta visita
  }
}

function temaAtual() {
  const salvo = lerSalvo();
  if (salvo === "claro" || salvo === "escuro") {
    return salvo;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

function aplicar(tema, botao) {
  document.documentElement.dataset.tema = tema;
  if (botao) {
    botao.setAttribute("aria-pressed", String(tema === "escuro"));
    botao.textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
  }
}

export function iniciarTema() {
  const botao = document.querySelector("[data-tema-botao]");
  aplicar(temaAtual(), botao);
  if (!botao) {
    return;
  }
  botao.addEventListener("click", () => {
    const novo = document.documentElement.dataset.tema === "escuro" ? "claro" : "escuro";
    aplicar(novo, botao);
    salvar(novo);
  });
}
