import { listarDatos, crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const nombreMarca = document.querySelector("#nombre");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { nombre: "" };
let nombresMarca = [];

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

async function cargarMarcas() {
  const dataMarcas = await listarDatos("marca", "idmarca", "*");

  function mostrarMarcas() {
    const { data: marcas, error } = dataMarcas;
    if (error) {
      alert("Error al cargar las marcas");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    marcas.forEach((marca) => {
      nombresMarca.push(marca.nombre.trim().toLowerCase());
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${marca.idmarca}</td>
        <td class="table__cell">${marca.nombre}</td>
        <td class="table__cell">
          <a href="editarmarca.html?id=${marca.idmarca}" class="table__edit" value="${marca.idmarca}">
            Editar
          </a>
          <a href="eliminarmarca.html?id=${marca.idmarca}" class="table__delete" value="${marca.idmarca}">
            Eliminar
          </a>
        </td>
    `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarMarcas();
}
function limpiarFormulario() {
  nombreMarca.value = "";
}

nombreMarca.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { nombre } = data;

  const nombreNormalizado = nombre.trim().toLowerCase();
  btnAgregar.disabled = true;
  if (nombre.trim() === "") {
    alert("El campo marca no puede estar vacio");
    return;
  }
  if (nombresMarca.includes(nombreNormalizado)) {
    mensajeAgregar.textContent = "Error, ya existe la marca con ese nombre.";
    btnAgregar.disabled = false;
    return;
  }

  btnAgregar.value = "Guardando...";
  const { error } = await crearRegistro("marca", data);

  if (error) {
    btnAgregar.disabled = false;
    alert("Error al agregar la marca");
    btnAgregar.value = "Guardar";
    if (error.code === "23505") {
      mensajeAgregar.textContent = "Error, ya existe la marca con ese nombre.";
      return;
    }
    mensajeAgregar.textContent = "Error al agregar la marca";
    return;
  }

  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Marca agregada correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarMarcas();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
    btnAgregar.disabled = false;
    mensajeAgregar.classList.add("red");
  }, 4000);
});

cargarMarcas();
