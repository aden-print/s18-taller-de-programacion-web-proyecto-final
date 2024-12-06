import {
  obtenerRegistro,
  actualizar,
  listarDatos,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputTalla = document.querySelector("#numero");
const inputDescripcion = document.querySelector("#descripcion");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idtalla = urlParams.get("id");
let datosTallas = [];

async function cargarTallas() {
  const { data: talla, error } = await obtenerRegistro(
    "talla",
    "idtalla",
    idtalla
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = talla[0].idtalla;
  inputTalla.value = talla[0].numero;
  inputDescripcion.value = talla[0].descripcion
    ? talla[0].descripcion.trim()
    : "";
}

cargarTallas();

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    numero: parseInt(inputTalla.value.trim()),
    descripcion: inputDescripcion.value.trim(),
  };

  // Verificar si la talla ya existe
  const tallaDuplicada = datosTallas.some(
    (talla) =>
      talla.numero === dataActualizar.numero &&
      parseInt(talla.idtalla) !== parseInt(idtalla)
  );

  if (tallaDuplicada) {
    mensajeEditar.textContent = "Error, ya existe esa talla.";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  if (dataActualizar.numero < 15 || dataActualizar.numero > 48) {
    mensajeEditar.textContent =
      "Error, el número de talla debe estar entre 15 y 48.";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const { error } = await actualizar(
    "talla",
    dataActualizar,
    "idtalla",
    idtalla
  );
  if (error) {
    console.log(error);
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    if (error.code === "23505") {
      mensajeEditar.textContent = "Error, ya existe esa talla.";
      return;
    }
    mensajeEditar.textContent = "Error al actualizar el registro";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Registro actualizado correctamente";
  setTimeout(() => {
    window.location.href = "talla.html";
  }, 4000);
});

async function obtenerTallas() {
  const { data: tallas, error } = await listarDatos("talla", "idtalla", "*");
  if (error) {
    console.log("Error al cargar las tallas");
    return;
  }
  datosTallas = tallas.map((talla) => ({
    idtalla: talla.idtalla,
    numero: talla.numero,
  }));
}

obtenerTallas();
