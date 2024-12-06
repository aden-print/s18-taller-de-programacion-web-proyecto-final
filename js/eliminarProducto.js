import {
  obtenerRegistro,
  eliminar,
  obtener_nombre,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const modal = document.querySelector(".modal-agregar");
const inputId = document.querySelector("#id");
const inputIdCategoria = document.querySelector("#idcategoria");
const inputProducto = document.querySelector("#nombre");
const inputDescripcion = document.querySelector("#descripcion");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");
const btnSi = document.querySelector(".btn-agregar");
const btnNo = document.querySelector(".btn-no");

const urlParams = new URLSearchParams(queryParams);
const idProducto = urlParams.get("id");

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
  console.log(producto);
  inputId.value = producto[0].idproducto;
  inputIdCategoria.value = await obtenerNombre(producto[0].idcategoria);
  inputProducto.value = producto[0].nombre.trim();
  inputDescripcion.value = producto[0].descripcion.trim();
}

async function obtenerNombre(id) {
  const { data: categoria, error } = await obtener_nombre(
    "categoria",
    "nombre",
    "idcategoria",
    id
  );

  if (error) {
    console.log(error);
    return;
  }

  return categoria[0].nombre;
}

cargarProducto();

btnSi.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await eliminar("producto", "idproducto", idProducto);
  btnDelete.value = "Eliminando...";
  if (error) {
    mensajeEliminar.textContent = "Error al eliminar el registro";

    if (error.code === "23503") {
      mensajeEliminar.textContent =
        "Error al eliminar el registro, tiene registros asociados";
    }

    console.log(error);
    btnDelete.value = "Eliminar";
    btnDelete.disabled = false;
    return;
  }
  mensajeEliminar.classList.remove("red");
  mensajeEliminar.textContent = "Producto eliminado correctamente";
  setTimeout(() => {
    window.location.href = "productos.html";
  }, 4000);
  modal.classList.remove("modal-show");
});

btnNo.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal-show");
});

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal-show");
});
