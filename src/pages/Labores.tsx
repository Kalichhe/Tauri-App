import { useEffect, useState } from "react";
import { Labor } from "../types/Labor";
import {
  obtenerLabores,
  crearLabor,
  eliminarLabor,
  actualizarLabor,
} from "../services/labores";

export default function Labores() {
  const [labores, setLabores] = useState<Labor[]>([]);
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number>(0);
  const [editCodigo, setEditCodigo] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPrecio, setEditPrecio] = useState(0);

  async function cargar() {
    setLabores(await obtenerLabores());
  }

  async function guardar() {
    if (!codigo || !nombre) return;

    await crearLabor({ codigo, nombre, precio });
    setCodigo("");
    setNombre("");
    setPrecio(0);
    await cargar();
  }

  function editar(l: Labor) {
    setEditCodigo(l.codigo);
    setEditNombre(l.nombre);
    setEditPrecio(l.precio);
  }

  async function guardarEdicion() {
    if (!editCodigo) return;

    await actualizarLabor({
      codigo: editCodigo,
      nombre: editNombre,
      precio: editPrecio,
    });

    setEditCodigo(null);
    await cargar();
  }

  async function borrar(codigo: string) {
    await eliminarLabor(codigo);
    await cargar();
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <h2>Labores</h2>

      <input
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
      />

      <button onClick={guardar}>Agregar</button>

      <ul>
        {labores.map((l) => (
          <li key={l.codigo}>
            {editCodigo === l.codigo ? (
              <>
                <input
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <input
                  type="number"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(Number(e.target.value))}
                />
                <button onClick={guardarEdicion}>💾</button>
                <button onClick={() => setEditCodigo(null)}>❌</button>
              </>
            ) : (
              <>
                <b>{l.codigo}</b> – {l.nombre} – ${l.precio}
                <button onClick={() => editar(l)}>✏</button>
                <button onClick={() => borrar(l.codigo)}>🗑</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
