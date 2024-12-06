import { listarDatos } from "../supabase/operaciones.js";

async function cargarArchivos() {
  const dataArchivos = await listarDatos("inicio", "id", "*");
  const { data: productos, error } = dataArchivos;

  if (error) {
    console.log("Error al cargar los archivos");
    return;
  }

  console.log(productos);

  const gridProductos = document.querySelector(".services-grid");
  gridProductos.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");

    div.innerHTML = `<img
          src="https://dibxvkunujlbynhtwbxe.supabase.co/storage/v1/object/public/imagenes-inicio/imagenes/inicio/${
            producto.imagen
          }"
          alt="${producto.descripcion}"
          />
          <h3>${producto.titulo}</h3>
          <p>S/ ${producto.precio.toFixed(2)}</
          `;
    div.classList.add("service-item");
    gridProductos.appendChild(div);
  });
}

cargarArchivos();
