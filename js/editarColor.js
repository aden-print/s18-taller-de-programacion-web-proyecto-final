import {
  obtenerRegistro,
  actualizar,
  listarDatos,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputColor = document.querySelector("#nombre");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idColor = urlParams.get("id");
const nombresColores = [];

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

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    nombre: inputColor.value.trim(),
  };

  if (nombresColores.includes(dataActualizar.nombre.toLowerCase())) {
    mensajeEditar.textContent = "Error, ya existe un color con ese nombre";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const { error } = await actualizar(
    "categoria",
    dataActualizar,
    "idcolor",
    idColor
  );
  if (error) {
    console.log(error);
    if (error.code === "23505") {
      mensajeEditar.textContent = "Error al actualizar, ya existe esa color.";
    }
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    mensajeEditar.textContent = "Error al actualizar el registro";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Color actualizado correctamente";
  setTimeout(() => {
    window.location.href = "color.html";
  }, 4000);
});

async function agregarColor() {
  const { data: colores, error } = await listarDatos("color", "idcolor", "*");
  if (error) {
    console.log(error);
    return;
  }
  colores.forEach((color) => {
    nombresColores.push(color.nombre.trim().toLowerCase());
  });
}

agregarColor();
