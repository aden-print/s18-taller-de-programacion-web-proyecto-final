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
// const data = { p_nombre: "" , p_apellido: "", p_correo: "", p_telefono: ""};

mostrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
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

nombreProveedor.addEventListener("input", leerInput);
telefonoProveedor.addEventListener("input", leerInput);
correoProveedor.addEventListener("input", leerInput);
apelldoProveedor.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

btnAgregar.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = {
    p_nombres: nombreProveedor.value,
    p_apellidos: apelldoProveedor.value,
    p_correo: correoProveedor.value,
    p_telefono: telefonoProveedor.value,
  };
  if (
    !data.p_nombres ||
    !data.p_apellidos ||
    !data.p_correo ||
    !data.p_telefono
  ) {
    mensajeAgregar.textContent = "Todos los campos son obligatorios";
    mensajeAgregar.classList.add("mensaje-error");
    return;
  }

  // console.log(data);
  // return;

  const respuesta = await consumir_funcion("insert_persona_proveedor", data);
  if (respuesta.error) {
    mensajeAgregar.textContent = "Error al agregar el proveedor";
    mensajeAgregar.classList.add("mensaje-error");
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Proveedor agregado correctamente";
  setTimeout(() => {
    mensajeAgregar.textContent = "";
    mensajeAgregar.classList.remove("mensaje-exito");
    modal.classList.remove("modal-show");
    cargarProveedores();
    limpiarFormulario();
  }, 4000);
});

cargarProveedores();
