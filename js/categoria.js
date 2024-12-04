import { listarDatos, crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const nombreCategoria = document.querySelector("#nombre");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { nombre: "" };
let dataCategoria = [];

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

async function cargarCategorias() {
  const dataCategorias = await listarDatos("categoria", "idcategoria", "*");

  function mostrarCategorias() {
    const { data: categorias, error } = dataCategorias;
    if (error) {
      console.log("Error al cargar las categorias");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    categorias.forEach((categoria) => {
      dataCategoria = { ...dataCategoria, ...categoria };
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="table__cell">${categoria.idcategoria}</td>
          <td class="table__cell">${categoria.nombre}</td>
          <td class="table__cell">
          <a href="editarcategoria.html?id=${categoria.idcategoria}" class="table__edit" value="${categoria.idcategoria}">
            Editar
          </a>
          <a href="eliminarcategoria.html?id=${categoria.idcategoria}"class="table__delete" value="${categoria.idcategoria}">
            Eliminar
          </a>
        </td>
      `;
      tr.classList.add("table__row");
      tbody.appendChild(tr);
    });
  }

  mostrarCategorias();
}

cargarCategorias();

function limpiarFormulario() {
  nombreCategoria.value = "";
}

nombreCategoria.addEventListener("input", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { nombre } = data;
  btnAgregar.disabled = true;
  if (nombre.trim() === "") {
    alert("El campo nombre no puede estar vacio");
    return;
  }

  btnAgregar.value = "Guardando...";
  const { error } = await crearRegistro("categoria", data);

  if (error) {
    btnAgregar.disabled = false;
    alert("Error al agregar la categoria");
    btnAgregar.value = "Guardar";
    if (error.code === "23505") {
      mensajeAgregar.textContent =
        "Error al crear el registro, ya existe la categoria con ese nombre.";
      return;
    }
    mensajeAgregar.textContent = "Error al agregar la categoria";
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Categoria agregada correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarCategorias();
    limpiarFormulario();
    mensajeAgregar.textContent = "";
  }, 4000);
});
