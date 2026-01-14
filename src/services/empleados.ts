import { invoke } from "@tauri-apps/api/core";
import type { Empleado } from "../types/Empleado";

export async function crearEmpleado(data: {
  nombre: string;
  horas: number;
  valorHora: number;
}): Promise<void> {
  await invoke("crear_empleado", {
    nombre: data.nombre,
    horas: data.horas,
    valorHora: data.valorHora,
  });
}

export async function actualizarEmpleado(data: {
  id: number;
  nombre: string;
  horas: number;
  valorHora: number;
}): Promise<void> {
  await invoke("actualizar_empleado", {
    id: data.id,
    nombre: data.nombre,
    horas: data.horas,
    valorHora: data.valorHora,
  });
}

export async function obtenerEmpleados(): Promise<Empleado[]> {
  return await invoke<Empleado[]>("obtener_empleados");
}

export async function eliminarEmpleado(id: number): Promise<void> {
  await invoke("eliminar_empleado", { id });
}
