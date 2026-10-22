// Ponto de entrada: liga cada módulo ao seu pedaço da página.
import { iniciarMenu } from "./menu.js";
import { iniciarTema } from "./tema.js";
import { iniciarContato } from "./formulario.js";
import { iniciarTarefas } from "./tarefas.js";

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarTema();
  iniciarContato();
  iniciarTarefas();

  const ano = document.querySelector("[data-ano]");
  if (ano) {
    ano.textContent = String(new Date().getFullYear());
  }
});
