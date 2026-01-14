import { useEffect, useState } from "react";
import type { Empleado } from "../types/Empleado";
import {
  crearEmpleado,
  obtenerEmpleados,
  eliminarEmpleado,
  actualizarEmpleado,
} from "../services/empleados";

export default function Empleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState<number>(0);
  const [valorHora, setValorHora] = useState<number>(0);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editHoras, setEditHoras] = useState<number>(0);
  const [editValorHora, setEditValorHora] = useState<number>(0);

  async function cargar() {
    const data = await obtenerEmpleados();
    setEmpleados(data);
  }

  function iniciarEdicion(e: Empleado) {
    setEditandoId(e.id);
    setEditNombre(e.nombre);
    setEditHoras(e.horas);
    setEditValorHora(e.valor_hora);
  }

  async function guardarEdicion() {
    if (editandoId === null) return;

    await actualizarEmpleado({
      id: editandoId,
      nombre: editNombre,
      horas: editHoras,
      valorHora: editValorHora,
    });

    setEditandoId(null);
    await cargar();
  }

  async function guardar() {
    if (!nombre) return;

    await crearEmpleado({ nombre, horas, valorHora });

    setNombre("");
    setHoras(0);
    setValorHora(0);

    await cargar();
  }

  async function borrar(id: number) {
    await eliminarEmpleado(id);
    await cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Empleados</h2>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        value={horas}
        onChange={(e) => setHoras(Number(e.target.value))}
      />

      <input
        type="number"
        value={valorHora}
        onChange={(e) => setValorHora(Number(e.target.value))}
      />

      <button onClick={guardar}>Guardar</button>

      <ul>
        {empleados.map((e) => (
          <li key={e.id}>
            {editandoId === e.id ? (
              <>
                <input
                  value={editNombre}
                  onChange={(ev) => setEditNombre(ev.target.value)}
                />
                <input
                  type="number"
                  value={editHoras}
                  onChange={(ev) => setEditHoras(Number(ev.target.value))}
                />
                <input
                  type="number"
                  value={editValorHora}
                  onChange={(ev) => setEditValorHora(Number(ev.target.value))}
                />
                <button onClick={guardarEdicion}>💾</button>
                <button onClick={() => setEditandoId(null)}>❌</button>
              </>
            ) : (
              <>
                <strong>{e.nombre}</strong> — {e.horas}h × ${e.valor_hora}
                <button onClick={() => iniciarEdicion(e)}>✏</button>
                <button onClick={() => borrar(e.id)}>🗑</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
