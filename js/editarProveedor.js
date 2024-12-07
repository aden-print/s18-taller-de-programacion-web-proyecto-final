import {
  obtenerRegistro,
  consumir_funcion,
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
let idPersona;
let datosPersonas = [];

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

  return persona[0][campo].trim();
}

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    p_idproveedor: idProveedor,
    p_nombres: nombreProveedor.value.trim(),
    p_apellidos: apelldoProveedor.value.trim(),
    p_correo: correoProveedor.value.trim(),
    p_telefono: telefonoProveedor.value.trim(),
  };

  if (
    dataActualizar.p_nombres === "" ||
    dataActualizar.p_apellidos === "" ||
    dataActualizar.p_correo === "" ||
    dataActualizar.p_telefono === ""
  ) {
    mensajeEditar.textContent = "Error, campos vacíos";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const correoDuplicado = datosPersonas.some(
    (persona) =>
      persona.correo === dataActualizar.p_correo &&
      parseInt(persona.idpersona) !== parseInt(idPersona)
  );

  if (correoDuplicado) {
    mensajeEditar.textContent = "Error, correo duplicado";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const telefonoDuplicado = datosPersonas.some(
    (persona) =>
      persona.telefono === dataActualizar.p_telefono &&
      parseInt(persona.idpersona) !== parseInt(idPersona)
  );

  if (telefonoDuplicado) {
    mensajeEditar.textContent = "Error, teléfono duplicado";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  if (dataActualizar.p_correo.indexOf("@") === -1) {
    mensajeEditar.textContent = "Error, correo inválido";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const { error } = await consumir_funcion(
    "update_persona_proveedor",
    dataActualizar
  );
  if (error) {
    console.log(error);
    mensajeEditar.textContent = "Error al actualizar el registro";
    if (error.code === "23505") {
      mensajeEditar.textContent =
        "Error al actualizar, hay un campo que ya existe.";
    }
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }
  mensajeEditar.classList.remove("red");
  mensajeEditar.textContent = "Proveedor actualizado correctamente";
  setTimeout(() => {
    window.location.href = "proveedor.html";
  }, 4000);
});

async function cargarPersonas() {
  const { data: personas, error } = await listarDatos(
    "persona",
    "idpersona",
    "*"
  );

  if (error) {
    console.log("Error al cargar las personas");
    return;
  }
  datosPersonas = personas.map((persona) => ({
    idpersona: persona.idpersona,
    correo: persona.correo.trim().toLowerCase(),
    telefono: persona.telefono.trim(),
  }));
}

cargarPersonas();
