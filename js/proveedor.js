import { listarDatos, consumir_funcion } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const nombreProveedor = document.querySelector("#nombre");
const apelldoProveedor = document.querySelector("#apellido");
const correoProveedor = document.querySelector("#correo");
const telefonoProveedor = document.querySelector("#telefono");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const correosPersonas = [];
const telefonosPersonas = [];

mostrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  mensajeAgregar.textContent = "";
  modal.classList.add("modal-show");
});

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  modal.classList.remove("modal-show");
});

btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  modal.classList.remove("modal-show");
});

async function cargarProveedores() {
  const dataProveedores = await listarDatos(
    "proveedor",
    "idproveedor",
    "idproveedor, persona(nombres, apellidos, correo,telefono)"
  );

  function mostrarProveedores() {
    const { data: proveedores, error } = dataProveedores;
    if (error) {
      console.log("Error al cargar los proveedores");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    proveedores.forEach((proveedor) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td class="table__cell">${proveedor.idproveedor}</td>
          <td class="table__cell">${proveedor.persona.nombres}</td>
          <td class="table__cell">${proveedor.persona.apellidos}</td>
          <td class="table__cell">${proveedor.persona.correo}</td>
          <td class="table__cell">${proveedor.persona.telefono}</td>
          <td class="table__cell">
              <a href="editarproveedor.html?id=${proveedor.idproveedor}" class="table__edit">
                Editar
              </a>
              <a href="eliminarproveedor.html?id=${proveedor.idproveedor}" class="table__delete">
                Eliminar
              </a>
          </td>
          `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarProveedores();
}

function limpiarFormulario() {
  nombreProveedor.value = "";
  telefonoProveedor.value = "";
  correoProveedor.value = "";
  apelldoProveedor.value = "";
}

formAgregar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnAgregar.disabled = true;
  const data = {
    p_nombres: nombreProveedor.value.trim(),
    p_apellidos: apelldoProveedor.value.trim(),
    p_correo: correoProveedor.value.trim(),
    p_telefono: telefonoProveedor.value.trim(),
  };
  if (
    !data.p_nombres ||
    !data.p_apellidos ||
    !data.p_correo ||
    !data.p_telefono
  ) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "Todos los campos son obligatorios";
    return;
  }

  if (data.p_correo.indexOf("@") === -1) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "Correo inválido";
    return;
  }

  if (data.p_telefono.length !== 9) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "Teléfono inválido";
    return;
  }

  if (correosPersonas.includes(data.p_correo.toLowerCase())) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "El correo ya está registrado";
    return;
  }

  if (telefonosPersonas.includes(data.p_telefono)) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "El teléfono ya está registrado";
    mensajeAgregar.classList.add("mensaje-error");
    return;
  }

  const { error } = await consumir_funcion("insert_persona_proveedor", data);
  if (error) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "Error al agregar el proveedor";
    return;
  }
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Proveedor agregado correctamente";
  setTimeout(() => {
    mensajeAgregar.textContent = "";
    mensajeAgregar.classList.add("red");
    modal.classList.remove("modal-show");
    btnAgregar.disabled = false;
    cargarProveedores();
    limpiarFormulario();
  }, 4000);
});

cargarProveedores();

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

  personas.forEach((persona) => {
    correosPersonas.push(persona.correo.trim().toLowerCase());
    telefonosPersonas.push(persona.telefono.trim());
  });
}

cargarPersonas();
