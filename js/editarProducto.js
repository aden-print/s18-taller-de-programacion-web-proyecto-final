import {
  obtenerRegistro,
  actualizar,
  listarDatos,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const inputIdCategoria = document.querySelector("#idcategoria");
const inputProducto = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const formularioEditar = document.querySelector(".form-editar");
const btnEditar = document.querySelector(".btn-editar");
const mensajeEditar = document.querySelector(".mensaje-editar");

const urlParams = new URLSearchParams(queryParams);
const idProducto = urlParams.get("id");
const nombresProductos = [];

async function cargarCategorias(idCategoriaSeleccionada) {
  const dataCategorias = await listarDatos("categoria", "idcategoria", "*");

  function mostrarCategorias() {
    const { data: categorias, error } = dataCategorias;
    if (error) {
      console.log("Error al cargar las categorias");
      return;
    }
    const select = document.querySelector("#idcategoria");
    select.innerHTML = "";
    const seleccionar = document.createElement("option");
    seleccionar.value = "";
    seleccionar.textContent = "Seleccionar";
    select.appendChild(seleccionar);
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.idcategoria;
      option.textContent = categoria.nombre;
      if (categoria.idcategoria === idCategoriaSeleccionada) {
        option.selected = true;
      }
      select.appendChild(option);
    });
  }

  mostrarCategorias();
}

async function cargarProducto() {
  const { data: producto, error } = await obtenerRegistro(
    "producto",
    "idproducto",
    idProducto
  );
  if (error) {
    console.log(error);
    return;
  }
  inputId.value = producto[0].idproducto;
  await cargarCategorias(producto[0].idcategoria);
  inputProducto.value = producto[0].nombre.trim();
  inputDescripcion.value = producto[0].descripcion.trim();
}

cargarProducto();

formularioEditar.addEventListener("submit", async (e) => {
  e.preventDefault();
  btnEditar.value = "Guardando...";
  btnEditar.disabled = true;
  const dataActualizar = {
    nombre: inputProducto.value.trim(),
  };

  if (nombresProductos.includes(dataActualizar.nombre.toLowerCase())) {
    mensajeEditar.textContent = "Error, ya existe una producto con ese nombre";
    btnEditar.disabled = false;
    btnEditar.value = "Guardar";
    return;
  }

  const { error } = await actualizar(
    "producto",
    dataActualizar,
    "idproducto",
    idProducto
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
    window.location.href = "productos.html";
  }, 4000);
});

async function agregarProductos() {
  const { data: productos, error } = await listarDatos(
    "producto",
    "idproducto",
    "*"
  );
  if (error) {
    console.log(error);
    return;
  }
  productos.forEach((producto) => {
    nombresProductos.push(producto.nombre.trim().toLowerCase());
  });
}

agregarProductos();
