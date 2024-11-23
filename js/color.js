import { listarDatos, crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const nombreColor = document.querySelector("#nombre");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { nombre: "" };

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

async function cargarColores() {
  const dataColores = await listarDatos("color", "idcolor", "*");

  function mostrarColores() {
    const { data: colores, error } = dataColores;
    if (error) {
      alert("Error al cargar los colores");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    colores.forEach((color) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${color.idcolor}</td>
        <td class="table__cell">${color.nombre}</td>
        <td class="table__cell">
        <button class="table__edit">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/edit--v1.png"
            alt="edit--v1"
          />
        </button>
        <button class="table__delete">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/delete.png"
            alt="delete"
          />
        </button>
      </td>
    `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarColores();
}

cargarColores();

function limpiarFormulario() {
  nombreColor.value = "";
}

nombreColor.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { nombre } = data;
  if (nombre.trim() === "") {
    alert("El campo nombre no puede estar vacio");
    return;
  }

  btnAgregar.value = "Guardando...";
  const respuesta = await crearRegistro("color", data);
  if (respuesta.error) {
    alert("Error al agregar el color");
    mensajeAgregar.textContent = "Error al agregar el color";
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Color agregado correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarColores();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
  }, 4000);
});
