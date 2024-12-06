import { obtenerRegistro, eliminar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const modal = document.querySelector(".modal-agregar");
const inputId = document.querySelector("#id");
const inputColor = document.querySelector("#nombre");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");
const btnSi = document.querySelector(".btn-agregar");
const btnNo = document.querySelector(".btn-no");

const urlParams = new URLSearchParams(queryParams);
const idColor = urlParams.get("id");

async function cargarColor() {
  const { data: color, error } = await obtenerRegistro(
    "color",
    "idcolor",
    idColor
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = color[0].idcolor;
  inputColor.value = color[0].nombre.trim();
}

cargarColor();

btnSi.addEventListener("click", async (e) => {
  e.preventDefault();
  btnDelete.value = "Eliminando...";
  const { error } = await eliminar("color", "idcolor", idColor);
  if (error) {
    btnDelete.value = "Eliminar";
    mensajeEliminar.textContent = "Error al eliminar el registro";
    btnDelete.disabled = false;
    if (error.code === "23503") {
      mensajeEliminar.textContent =
        "Error al eliminar el registro, tiene registros asociados";
    }
    console.log(error);
    return;
  }
  mensajeEliminar.classList.remove("red");
  mensajeEliminar.textContent = "Color eliminado correctamente";
  setTimeout(() => {
    window.location.href = "color.html";
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
