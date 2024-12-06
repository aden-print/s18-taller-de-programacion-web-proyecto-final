import {
  obtenerRegistro,
  actualizar,
  listarDatos,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputMarca = document.querySelector("#nombre");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");
let nombresMarcas = [];

const urlParams = new URLSearchParams(queryParams);
const idmarca = urlParams.get("id");

async function agregarMarcas() {
  const { data: marcas, error } = await listarDatos("marca", "idmarca", "*");
  if (error) {
    console.log(error);
    return;
  }
  marcas.forEach((marca) => {
    nombresMarcas.push(marca.nombre.trim().toLowerCase());
  });
}

agregarMarcas();

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

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    nombre: inputMarca.value.trim(),
  };

  if (nombresMarcas.includes(dataActualizar.nombre.toLowerCase())) {
    mensajeEditar.textContent = "Error al actualizar, ya existe esa marca.";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const { error } = await actualizar(
    "marca",
    dataActualizar,
    "idmarca",
    idmarca
  );
  if (error) {
    console.log(error);
    if (error.code === "23505") {
      mensajeEditar.textContent = "Error al actualizar, ya existe esa marca.";
    }
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    mensajeEditar.textContent = "Error al actualizar el registro";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Registro actualizado correctamente";
  setTimeout(() => {
    window.location.href = "marca.html";
  }, 4000);
});
