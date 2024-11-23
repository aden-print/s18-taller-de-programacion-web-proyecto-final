import { listarDatos , crearRegistro } from "../supabase/operaciones.js";

const modal = document.querySelector(".modal-agregar");
const mostrarModal = document.querySelector(".button__add");
const cerrarModal = document.querySelector(".modal-close");
const btnCancelar = document.querySelector(".btn-cancelar");
const nombreProducto = document.querySelector("#nombre");
const descripcion = document.querySelector("#descripcion");
const idcategoria = document.querySelector("#idcategoria");
const formAgregar = document.querySelector(".form-agregar");
const btnAgregar = document.querySelector(".btn-agregar");
const mensajeAgregar = document.querySelector(".mensaje-agregar");
const data = { nombre: "" , descripcion: "", idcategoria: ""};

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

async function cargarProductos() {
  const dataProductos = await listarDatos(
    "producto",
    "idproducto",
    "idproducto, nombre, descripcion, categoria(idcategoria, nombre)"
  );

  function mostrarProductos() {
    const { data: productos, error } = dataProductos;
    if (error) {
      alert("Error al cargar los productos");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    productos.forEach((producto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${producto.idproducto}</td>
      <td class="table__cell">${producto.categoria.nombre}</td>
      <td class="table__cell">${producto.nombre}</td>
      <td class="table__cell">${
        producto.descripcion ? producto.descripcion : ""
      }</td>
      <td class="table__cell">
        <button class="table__button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/edit--v1.png"
            alt="edit--v1"
          />
        </button>
        <button class="table__button">
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

  mostrarProductos();
}

async function cargarCategorias() {
  const dataCategorias = await listarDatos("categoria", "idcategoria", "*");

  function mostrarCategorias() {
    const { data: categorias, error } = dataCategorias;
    if (error) {
      alert("Error al cargar las categorias");
      return;
    }
    const select = document.querySelector("#idcategoria");
    select.innerHTML = "";
    const selccionar = document.createElement("option");
    selccionar.value = "";
    selccionar.textContent = "Seleccionar";
    select.appendChild(selccionar);
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.idcategoria;
      option.textContent = categoria.nombre;
      select.appendChild(option);
    });
  }

  mostrarCategorias();
}

function limpiarFormulario() {
  nombreProducto.value = "";
  descripcion.value = "";
  idcategoria.value = "";
  
}

function limpiarData() {
  data.nombre = "";
  data.descripcion = "";
  data.idcategoria = "";
}
nombreProducto.addEventListener("input", leerInput);
descripcion.addEventListener("input", leerInput);
idcategoria.addEventListener("change", leerInput);

function leerInput(e) {
  data[e.target.id] = e.target.value;

}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { nombre ,  idcategoria} = data;
  if (nombre.trim() === "") {
    alert("El campo nombre no puede estar vacio");
    return;
  }
  if (idcategoria.trim() === "Seleccionar") {
    alert("Debes seleccionar una categoria");
    return;
  }

  btnAgregar.value = "Guardando...";
  const respuesta = await crearRegistro("producto", data);
  if (respuesta.error) {
    alert("Error al agregar el producto");
    mensajeAgregar.textContent = "Error al agregar el producto";
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "Producto agregado correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarProductos();
    limpiarFormulario();
    limpiarData();
    mensajeAgregar.textContent = "";
  }, 4000);
});

cargarProductos();
cargarCategorias();
