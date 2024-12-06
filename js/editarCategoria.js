import {
  obtenerRegistro,
  actualizar,
  listarDatos,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputCategoria = document.querySelector("#nombre");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idCategoria = urlParams.get("id");
const nombresCategorias = [];

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

  if (nombresCategorias.includes(dataActualizar.nombre.toLowerCase())) {
    mensajeEditar.textContent = "Error, ya existe una categoria con ese nombre";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

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

async function agregarCategoria() {
  const { data: categorias, error } = await listarDatos(
    "categoria",
    "idcategoria",
    "*"
  );
  if (error) {
    console.log(error);
    return;
  }
  categorias.forEach((categoria) => {
    nombresCategorias.push(categoria.nombre.trim().toLowerCase());
  });
}

agregarCategoria();
