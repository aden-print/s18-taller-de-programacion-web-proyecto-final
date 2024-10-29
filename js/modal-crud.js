const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");

mostrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal-show");
});

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal-show");
});

btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal-show");
});
