import { obtenerRegistro, actualizar } from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputTalla = document.querySelector("#numero");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idtalla = urlParams.get("id");

async function cargarTallas() {
  const { data: talla, error } = await obtenerRegistro(
    "talla",
    "idcatalla",
    idtalla
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = talla[0].idtalla;
  inputTalla.value = talla[0].numero.trim();
}

cargarTallas();

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    nombre: inputTalla.value.trim(),
  };
  console.log(dataActualizar);
  console.log(idt);
  const { error } = await actualizar(
    "talla",
    dataActualizar,
    "idtalla",
    idtalla
  );
  if (error) {
    console.log(error);
    if (error.code === "23505") {
      mensajeEditar.textContent = "Error al actualizar, ya existe esa talla.";
    }
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    mensajeEditar.textContent = "Error al actualizar el registro";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Registro actualizado correctamente";
  setTimeout(() => {
    window.location.href = "talla.html";
  }, 4000);
});
