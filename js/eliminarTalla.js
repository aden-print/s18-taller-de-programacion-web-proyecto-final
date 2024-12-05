import { obtenerRegistro, eliminar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const modal = document.querySelector(".modal-agregar");
const inputId = document.querySelector("#id");
const inputTalla = document.querySelector("#talla");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");
const btnSi = document.querySelector(".btn-agregar");
const btnNo = document.querySelector(".btn-no");

const urlParams = new URLSearchParams(queryParams);
const idTalla = urlParams.get("id");

async function cargarTalla() {
  const { data: talla, error } = await obtenerRegistro(
    "talla",
    "idtalla",
    idTalla
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = talla[0].idTalla;
  inputTalla.value = talla[0].numero.trim();
}

cargarTalla();

btnSi.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await eliminar("talla", "idtalla", idTalla);
  btnDelete.value = "Eliminando...";
  if (error) {
    mensajeEliminar.textContent = "Error al eliminar el registro";

    if (error.code === "23503") {
      mensajeEliminar.textContent =
        "Error al eliminar el registro, tiene registros asociados";
    }

    console.log(error);
    btnDelete.value = "Eliminar";
    btnDelete.disabled = false;
    return;
  }
  mensajeEliminar.classList.remove("red");
  mensajeEliminar.textContent = "Registro eliminado correctamente";
  setTimeout(() => {
    window.location.href = "talla.html";
  }, 4000);
  modal.classList.remove("modal-show");
});

btnNo.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal-show");
});

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal-show");
});
