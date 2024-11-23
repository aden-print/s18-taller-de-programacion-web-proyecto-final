import { listarDatos } from "../supabase/operaciones.js";

const dataClientes = await listarDatos(
  "cliente",
  "idcliente",
  "idcliente, dni, direccion, persona(nombres, apellidos, correo, telefono)"
);

function mostrarClientes() {
  const { data: clientes, error } = dataClientes;
  if (error) {
    alert("Error al cargar los clientes");
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

mostrarClientes();
