import { invoke } from "@tauri-apps/api/core";
import { Labor } from "../types/Labor";

export async function obtenerLabores(): Promise<Labor[]> {
  return await invoke("obtener_labores");
}

export async function crearLabor(labor: Labor): Promise<void> {
  await invoke("crear_labor", {
    codigo: labor.codigo,
    nombre: labor.nombre,
    precio: labor.precio,
  });
}

export async function eliminarLabor(codigo: string): Promise<void> {
  await invoke("eliminar_labor", { codigo });
}

export async function actualizarLabor(labor: {
  codigo: string;
  nombre: string;
  precio: number;
}): Promise<void> {
  await invoke("actualizar_labor", {
    codigo: labor.codigo,
    nombre: labor.nombre,
    precio: labor.precio,
  });
}
