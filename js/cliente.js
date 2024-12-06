import { listarDatos } from "../supabase/operaciones.js";

const dataClientes = await listarDatos(
  "cliente",
  "idcliente",
  "idcliente, dni, direccion, persona(nombres, apellidos, correo, telefono)"
);

function mostrarClientes() {
  const { data: clientes, error } = dataClientes;
  if (error) {
    console.log("Error al cargar los clientes");
    return;
  }
  const tbody = document.querySelector(".table__body");
  tbody.innerHTML = "";
  clientes.forEach((cliente) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="table__cell">${cliente.idcliente}</td>
        <td class="table__cell">${cliente.persona.nombres}</td>
        <td class="table__cell">${cliente.persona.apellidos}</td>
        <td class="table__cell">${cliente.dni}</td>
        <td class="table__cell">${cliente.persona.correo}</td>
        <td class="table__cell">${cliente.persona.telefono}</td>
        <td class="table__cell">${cliente.direccion}</td>
        <td class="table__cell">
            <a class="table__edit">
              Editar
            </a>
            <a class="table__delete">
              Eliminar
            </a>
        </td>
        `;
    tr.classList.add("table__row");
    tbody.appendChild(tr);
  });
}

mostrarClientes();
