import {
  subir_archivo,
  crearRegistro,
  eliminar_archivo,
} from "../supabase/operaciones.js";

const formulario = document.querySelector(".form-agregar");
const inputImagen = document.querySelector("#file");
const inputTitulo = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const inputPrecio = document.querySelector("#precio");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    imagen: inputImagen.files[0].name,
    titulo: inputTitulo.value.trim(),
    precio: inputPrecio.value.trim(),
    descripcion: inputDescripcion.value.trim(),
  };

  const archivo = inputImagen.files[0];

  const ruta = `imagenes/inicio/${archivo.name}`;
  const respuesta = await subir_archivo(ruta, archivo);
  if (respuesta.error) {
    console.log(respuesta.error);
    return;
  }

  const { error } = await crearRegistro("inicio", data);
  if (error) {
    console.log(error);
    const { error: errorEliminar } = await eliminar_archivo(ruta);
    if (errorEliminar) {
      console.log(errorEliminar);
      return;
    }
    console.log("Archivo eliminado correctamente");
    return;
  }
  formulario.reset();
  console.log("Producto subido correctamente");
});
