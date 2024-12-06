import {
  obtenerRegistro,
  actualizar,
  listarDatos,
  obtener_nombre,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const nombreProveedor = document.querySelector("#nombre");
const apelldoProveedor = document.querySelector("#apellido");
const correoProveedor = document.querySelector("#correo");
const telefonoProveedor = document.querySelector("#telefono");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idProveedor = urlParams.get("id");
const nombresCategorias = [];
let idPersona;

async function cargarCategoria() {
  const { data: proveedor, error } = await obtenerRegistro(
    "proveedor",
    "idproveedor",
    idProveedor
  );
  if (error) {
    console.log(error);
    return;
  }
  console.log(proveedor);

  inputId.value = proveedor[0].idproveedor;
  idPersona = proveedor[0].idpersona;
  nombreProveedor.value = await obtenerCampo(proveedor[0].idpersona, "nombres");
  apelldoProveedor.value = await obtenerCampo(
    proveedor[0].idpersona,
    "apellidos"
  );
  correoProveedor.value = await obtenerCampo(proveedor[0].idpersona, "correo");
  telefonoProveedor.value = await obtenerCampo(
    proveedor[0].idpersona,
    "telefono"
  );
}

cargarCategoria();

async function obtenerCampo(id, campo) {
  const { data: persona, error } = await obtener_nombre(
    "persona",
    campo,
    "idpersona",
    id
  );

  if (error) {
    console.log(error);
    return;
  }

  return persona[0][campo];
}

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
    "persona",
    dataActualizar,
    "idpersona",
    idPersona
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

async function agregarPersona() {
  const { data: personas, error } = await listarDatos(
    "persona",
    "idpersona",
    "*"
  );
  if (error) {
    console.log(error);
    return;
  }
  personas.forEach((persona) => {
    nombresPersonas.push(persona.nombre.trim().toLowerCase());
  });
}

agregarPersona();
