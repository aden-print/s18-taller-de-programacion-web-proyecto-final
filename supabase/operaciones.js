import { supabaseClient } from "./supabase.js";

export async function obtenerNombre(tabla, nombreColumna, idTabla) {
  const respuesta = await supabaseClient
    .from(tabla)
    .select(nombreColumna)
    .eq(idTabla, idTabla);
  return respuesta;
}

export async function listar(tabla, idTabla) {
  const respuesta = await supabaseClient
    .from(tabla)
    .select("*")
    .order(idTabla, { ascending: true });
  return respuesta;
}

export async function crear(table, data) {
  const { error } = await supabaseClient.from(table).insert(data);
  if (error) {
    throw new Error(error.message);
  }
}
