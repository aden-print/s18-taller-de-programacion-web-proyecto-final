import { supabaseClient } from "./supabase.js";

export async function listarDatos(tabla, idTabla, campos) {
  const respuesta = await supabaseClient
    .from(tabla)
    .select(campos)
    .order(idTabla, { ascending: true });
  return respuesta;
}

export async function obtenerRegistro(tabla, idColumna, idTabla) {
  const respuesta = await supabaseClient
    .from(tabla)
    .select("*")
    .eq(idColumna, idTabla);
  return respuesta;
}

export async function crearRegistro(table, data) {
  const respuesta = await supabaseClient.from(table).insert(data);
  return respuesta;
}

export async function actualizar(table, data, idColumna, idTabla) {
  const respuesta = await supabaseClient
    .from(table)
    .update(data)
    .eq(idColumna, idTabla);
  return respuesta;
}

export async function eliminar(table, idColumna, idTabla) {
  const respuesta = await supabaseClient
    .from(table)
    .delete()
    .eq(idColumna, idTabla);
  return respuesta;
}

export async function consumir_funcion(nombre_funcion, parametros) {
  const respuesta = await supabaseClient.rpc(nombre_funcion, parametros);
  return respuesta;
}

export async function subir_archivo(archivo) {
  const respuesta = await supabaseClient.storage
    .from("nombre_de_bucket")
    .upload("nombre_de_archivo", archivo);
  return respuesta;
}

export async function descargar_archivo(nombre_archivo) {
  const respuesta = await supabaseClient.storage
    .from("nombre_de_bucket")
    .download(nombre_archivo);
  return respuesta;
}

export async function eliminar_archivo(nombre_archivo) {
  const respuesta = await supabaseClient.storage
    .from("nombre_de_bucket")
    .remove(nombre_archivo);
  return respuesta;
}

export async function listar_archivos() {
  const respuesta = await supabaseClient.storage
    .from("imagenes-inicio")
    .list("imagenes/inicio", {
      limit: 100,
      offset: 0,
    });
  return respuesta;
}
