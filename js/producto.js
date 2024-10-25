import { listar } from "../supabase/operaciones.js";

const dataProductos = await listar("producto", "idproducto");
console.log(dataProductos);
