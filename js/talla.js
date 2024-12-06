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
const numeroTallas = [];

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

async function cargarTallas() {
  const dataTallas = await listarDatos("talla", "idtalla", "*");

  function mostrarTallas() {
    const { data: tallas, error } = dataTallas;
    if (error) {
      console.log("Error al cargar las tallas");
      return;
    }
    const tbody = document.querySelector(".table__body");
    tbody.innerHTML = "";
    tallas.forEach((talla) => {
      numeroTallas.push(talla.numero);
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="table__cell">${talla.idtalla}</td>
        <td class="table__cell">${talla.numero}</td>
        <td class="table__cell">${
          talla.descripcion ? talla.descripcion : ""
        }</td>
        <td class="table__cell">
          <a href="editartalla.html?id=${talla.idtalla}" class="table__edit">
            Editar
          </a>
          <a href="eliminartalla.html?id=${
            talla.idtalla
          }" class="table__delete">
            Eliminar
          </a>
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
  data[e.target.id] = e.target.value.trim();
}

formAgregar.addEventListener("submit", async function (evento) {
  evento.preventDefault();
  const { numero: nombre } = data;
  if (nombre.trim() === "") {
    alert("El campo Numero no puede estar vacio");
    return;
  }

  btnAgregar.value = "Guardando...";

  if (numeroTallas.includes(parseInt(nombre))) {
    mensajeAgregar.textContent = "Error, ya existe esa talla.";
    btnAgregar.disabled = false;
    btnAgregar.value = "Guardar";
    return;
  }

  if (parseInt(nombre) < 15 || parseInt(nombre) > 48) {
    mensajeAgregar.textContent =
      "Error, el número de talla debe estar entre 15 y 48.";
    btnAgregar.disabled = false;
    btnAgregar.value = "Guardar";
    return;
  }

  const { error } = await crearRegistro("talla", data);

  if (error) {
    btnAgregar.disabled = false;
    console.log("Error al agregar la categoria");
    btnAgregar.value = "Guardar";
    if (error.code === "23505") {
      mensajeAgregar.textContent =
        "Error al crear el registro, ya existe la este numero de talla";
      return;
    }
    mensajeAgregar.textContent = "Error al agregar la ";
    return;
  }
  btnAgregar.value = "Guardar";
  mensajeAgregar.classList.remove("red");
  mensajeAgregar.textContent = "La talla se agrego correctamente";
  setTimeout(() => {
    modal.classList.remove("modal-show");
    cargarTallas();
    limpiarFormulario();
    mensajeAgregar.classList.add("red");
    mensajeAgregar.textContent = "";
  }, 4000);
});

cargarTallas();
