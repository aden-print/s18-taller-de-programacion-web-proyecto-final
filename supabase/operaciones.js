import { supabaseClient } from "./supabase.js";

export async function listarDatos(tabla, idTabla, campos) {
  const respuesta = await supabaseClient
    .from(tabla)
    .select(campos)
    .order(idTabla, { ascending: true });
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
