// Menu do celular: abre e fecha, com aria-expanded e tecla Esc.
export function iniciarMenu() {
  const botao = document.querySelector("[data-menu-botao]");
  const menu = document.querySelector("[data-menu]");
  if (!botao || !menu) {
    return;
  }

  const definir = (aberto) => {
    menu.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
  };

  botao.addEventListener("click", () => {
    definir(botao.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
      definir(false);
      botao.focus();
    }
  });
}
