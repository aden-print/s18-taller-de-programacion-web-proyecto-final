import { obtenerRegistro, actualizar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputCategoria = document.querySelector("#nombre");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idCategoria = urlParams.get("id");

async function cargarCategoria() {
  const { data: categoria, error } = await obtenerRegistro(
    "categoria",
    "idcategoria",
    idCategoria
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = categoria[0].idcategoria;
  inputCategoria.value = categoria[0].nombre.trim();
}

cargarCategoria();

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    nombre: inputCategoria.value.trim(),
  };
  console.log(dataActualizar);
  console.log(idCategoria);
  const { error } = await actualizar(
    "categoria",
    dataActualizar,
    "idcategoria",
    idCategoria
  );
  if (error) {
    console.log(error);
    if (error.code === "23505") {
      mensajeEditar.textContent =
        "Error al actualizar, ya existe esa categoria.";
    }
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    mensajeEditar.textContent = "Error al actualizar el registro";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Registro actualizado correctamente";
  setTimeout(() => {
    window.location.href = "categoria.html";
  }, 4000);
});
