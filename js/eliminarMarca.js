import { obtenerRegistro, eliminar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const modal = document.querySelector(".modal-agregar");
const inputId = document.querySelector("#id");
const inputMarca = document.querySelector("#nombre");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");
const btnSi = document.querySelector(".btn-agregar");
const btnNo = document.querySelector(".btn-no");

const urlParams = new URLSearchParams(queryParams);
const idmarca = urlParams.get("id");

async function cargarMarca() {
  const { data: marca, error } = await obtenerRegistro(
    "marca",
    "idmarca",
    idmarca
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = marca[0].idmarca;
  inputMarca.value = marca[0].nombre.trim();
}

cargarMarca();

btnSi.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await eliminar("marca", "idmarca", idmarca);
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
    window.location.href = "marca.html";
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
