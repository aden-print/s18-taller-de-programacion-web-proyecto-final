import { listarDatos, crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const numerTalla = document.querySelector("#numero");
const descripcionTalla = document.querySelector("#descripcion");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { numero: "", descripcion: "" };

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

async function cargarTallas() {
  const dataTallas = await listarDatos("talla", "idtalla", "*");

  function mostrarTallas() {
    const { data: tallas, error } = dataTallas;
    if (error) {
      alert("Error al cargar las tallas");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    tallas.forEach((talla) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${talla.idtalla}</td>
        <td class="table__cell">${talla.numero}</td>
        <td class="table__cell">${
          talla.descripcion ? talla.descripcion : ""
        }</td>
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

  mostrarTallas();
}

function limpiarFormulario() {
  numerTalla.value = "";
  descripcionTalla.value = "";
}
numerTalla.addEventListener("input", leerInput);
descripcionTalla.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { numero: nombre } = data;
  if (nombre.trim() === "") {
    alert("El campo Numero no puede estar vacio");
    return;
  }

  btnAgregar.value = "Guardando...";
  const respuesta = await crearRegistro("talla", data);
  if (respuesta.error) {
    alert("Error al agregar la talla");
    mensajeAgregar.textContent = "Error al agregar la talla";
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Talla agregada correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarTallas();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
  }, 4000);
});

cargarTallas();
