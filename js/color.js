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
const nombreColores = [];

mostrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  modal.classList.add("modal-show");
});

cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  mensajeAgregar.textContent = "";
  modal.classList.remove("modal-show");
});

btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarFormulario();
  mensajeAgregar.textContent = "";
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
      nombreColores.push(color.nombre.trim().toLowerCase());
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${color.idcolor}</td>
        <td class="table__cell">${color.nombre}</td>
        <td class="table__cell">
        <a href="editarcolor.html?id=${color.idcolor}" class="table__edit">
          Editar
        </a>
        <a href="eliminarcolor.html?id=${color.idcolor}" class="table__delete">
          Eliminar
        </a>
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
  btnAgregar.value = "Guardando...";
  btnAgregar.disabled = true;
  const { nombre } = data;
  if (nombre.trim() === "") {
    alert("El campo nombre no puede estar vacio");
    return;
  }

  if (nombreColores.includes(nombre.trim().toLowerCase())) {
    btnAgregar.disabled = false;
    mensajeAgregar.textContent = "Error, el color ya existe";
    btnAgregar.value = "Guardar";
    return;
  }

  const { error } = await crearRegistro("color", data);
  if (error) {
    console.log("Error al agregar el color");
    mensajeAgregar.textContent = "Error al agregar el color";
    btnAgregar.disabled = false;
    return;
  }
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Color agregado correctamente";
  btnAgregar.value = "Guardar";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarColores();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
    mensajeAgregar.classList.remove("red");
  }, 4000);
});
