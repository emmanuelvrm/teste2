// Validação do formulário de contato (sem enviar nada: o site é estático).
const REGRAS = {
  nome: (v) => (v.trim().length >= 3 ? "" : "Digite pelo menos 3 letras."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Digite um e-mail válido, como nome@site.com."),
  mensagem: (v) => (v.trim().length >= 10 ? "" : "Escreva pelo menos 10 caracteres."),
};

function mostrarErro(campo, texto) {
  const aviso = document.getElementById(`erro-${campo.name}`);
  if (!aviso) {
    return;
  }
  aviso.textContent = texto;
  aviso.hidden = texto === "";
  campo.setAttribute("aria-invalid", String(texto !== ""));
  if (texto) {
    campo.setAttribute("aria-describedby", aviso.id);
  } else {
    campo.removeAttribute("aria-describedby");
  }
}

function validar(campo) {
  const regra = REGRAS[campo.name];
  const texto = regra ? regra(campo.value) : "";
  mostrarErro(campo, texto);
  return texto === "";
}

export function iniciarContato() {
  const form = document.querySelector("[data-contato-form]");
  if (!form) {
    return;
  }
  const status = document.querySelector("[data-contato-status]");
  const campos = [...form.querySelectorAll("input, textarea")];

  campos.forEach((campo) => campo.addEventListener("blur", () => validar(campo)));

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const invalidos = campos.filter((campo) => !validar(campo));
    if (invalidos.length > 0) {
      invalidos[0].focus();
      return;
    }
    form.reset();
    if (status) {
      status.textContent = "Mensagem validada! (Este exemplo não envia dados.)";
      status.hidden = false;
    }
  });
}
