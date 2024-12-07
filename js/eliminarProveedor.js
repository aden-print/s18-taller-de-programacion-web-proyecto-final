import {
  obtenerRegistro,
  consumir_funcion,
  obtener_nombre,
} from "../supabase/operaciones.js";

const queryParams = window.location.search;
const inputId = document.querySelector("#id");
const modal = document.querySelector(".modal-agregar");
const nombreProveedor = document.querySelector("#nombre");
const apelldoProveedor = document.querySelector("#apellido");
const correoProveedor = document.querySelector("#correo");
const telefonoProveedor = document.querySelector("#telefono");
const btnDelete = document.querySelector(".btn-eliminar");
const mensajeEliminar = document.querySelector(".mensaje-eliminar");
const btnSi = document.querySelector(".btn-agregar");
const btnNo = document.querySelector(".btn-no");

const urlParams = new URLSearchParams(queryParams);
const idProveedor = urlParams.get("id");

async function cargarProveedor() {
  const { data: proveedor, error } = await obtenerRegistro(
    "proveedor",
    "idproveedor",
    idProveedor
  );
  if (error) {
    console.log(error);
    return;
  }
  console.log(proveedor);

  inputId.value = proveedor[0].idproveedor;
  nombreProveedor.value = await obtenerCampo(proveedor[0].idpersona, "nombres");
  apelldoProveedor.value = await obtenerCampo(
    proveedor[0].idpersona,
    "apellidos"
  );
  correoProveedor.value = await obtenerCampo(proveedor[0].idpersona, "correo");
  telefonoProveedor.value = await obtenerCampo(
    proveedor[0].idpersona,
    "telefono"
  );
}

cargarProveedor();

async function obtenerCampo(id, campo) {
  const { data: persona, error } = await obtener_nombre(
    "persona",
    campo,
    "idpersona",
    id
  );

  if (error) {
    console.log(error);
    return;
  }

  return persona[0][campo].trim();
}

btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal-show");
});

btnSi.addEventListener("click", async (e) => {
  e.preventDefault();
  btnDelete.value = "Eliminando...";
  btnDelete.disabled = true;
  const { error } = await consumir_funcion("delete_persona_proveedor", {
    p_idproveedor: idProveedor,
  });

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
  mensajeEliminar.textContent = "Proveedor eliminado correctamente";
  mensajeEliminar.classList.remove("red");
  setTimeout(() => {
    window.location.href = "proveedor.html";
  }, 4000);
  modal.classList.remove("modal-show");
});

btnNo.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal-show");
});
